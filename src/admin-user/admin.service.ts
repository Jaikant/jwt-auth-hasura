import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common';
import { SignUpDto, LoginDto } from './admin.dto';
import { GraphQLClient } from "graphql-request";
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { JWTService } from 'src/auth/jwt.service';
import { GRAPHQL_URL, HASURA_ADMIN_SECRET } from 'src/config.constants';
import { registerUser, getUserByEmail } from 'src/graphql-api';

@Injectable()
export class AdminService {

  adminClient;
  // Initialize logger
  //TODO: Move this to module level
  logger: Logger = new Logger('UserLogger');


  constructor(
    private jwtService: JWTService
    ) {
      this.adminClient = new GraphQLClient(GRAPHQL_URL, {
        headers: { "x-hasura-admin-secret": HASURA_ADMIN_SECRET},  
      })
    }

  async signUp(signUpDto: SignUpDto) {
    // We need to check if user is already registered
    // We skip that for the sake of time

    // We insert the user using a mutation
    // Note that we salt and hash the password using bcrypt
    const { email, password } = signUpDto;
    const id = uuidv4();
    try {
      const { insert_User_one } = await this.adminClient.request(
        registerUser,
        {
          user: {
            id,
            email,
            password: await bcrypt.hash(password, 10),
          },
        },
      );

      const { id: userId } = insert_User_one;

      return this.jwtService.generateHasuraJWT({
        id: userId,
        defaultRole: 'user',
        allowedRoles: ['user'],
        otherClaims: {
          'X-Hasura-User-Id': userId,
        },
      });
    } catch (e) {
      this.logger.error(e);
      throw new BadRequestException('Cannot create user!');
    }
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    let foundUser = null;

    try {
      foundUser = await this.adminClient.request(
        getUserByEmail,
        {
          email,
        },
      );
    } catch (e) {
      this.logger.error(e);
      throw new BadRequestException('Cannot create user!');
    }

      let { User } = foundUser;
      // Since we filtered on a non-primary key we got an array back
      User = User[0];

      if (!User) {
        return 401;
      }

      // Check if password matches the hashed version
      const passwordMatch = await bcrypt.compare(password, User.password);

      if (passwordMatch) {
        return this.jwtService.generateHasuraJWT({
          id: User.id,
          defaultRole: 'user',
          allowedRoles: ['user'],
          otherClaims: {
            'X-Hasura-User-Id': User.id,
          },
        });
      } else {
        throw new HttpException( 'Not allowed or no user found',
        HttpStatus.FORBIDDEN);
      }
  } 
}
