import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { SignUpDto, LoginDto } from './user.dto';
import { GqlClient } from 'src/graphql-client/client.service';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from "uuid";
import { gql } from "graphql-request";
import { generateJWT } from "./jwt.service";

@Injectable()
export class UserService {
  constructor(private gqlClient: GqlClient) {}

  // Initialize logger
  //TODO: Move this to module level
  logger: Logger = new Logger('UserLogger');

  async signUp(signUpDto: SignUpDto) {
    // In production app, we would check if user is already registered
    // We skip that for the sake of time

    // We insert the user using a mutation
    // Note that we salt and hash the password using bcrypt
    const { email, password } = signUpDto;
    const id = uuidv4()
    console.log(`id is ${id}`);
  
    try {
      const { insert_User_one } = await this.gqlClient.client.request(
        gql`
          mutation registerUser($user: User_insert_input!) {
            insert_User_one(object: $user) {
              id
            }
          }
        `,
        {
          user: {
            id,
            email,
            password: await bcrypt.hash(password, 10),
          },
        },
      );

      const { id: userId } = insert_User_one;

      return generateJWT({
          defaultRole: "user",
          allowedRoles: ["user"],
          otherClaims: {
            "X-Hasura-User-Id": userId,
          }
        })
  
    } catch (e) {
      this.logger.error(e);
      throw new BadRequestException('Cannot create user!');
    }
  }

  async login(loginDto: LoginDto) {}

  async viewUser(id: string) {}
}
