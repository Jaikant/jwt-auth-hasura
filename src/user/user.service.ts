import {
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { GraphQLClient } from "graphql-request";
import { gql } from 'graphql-request';
import { GRAPHQL_URL } from 'src/config.constants';
import { getUserName } from '../graphql-api'
@Injectable()
export class UserService {

  gqlClient;
  constructor() {
      this.gqlClient = new GraphQLClient(GRAPHQL_URL)
    }

  async viewUser(id: string, authorization: string) {
    const requestHeaders = { 
      authorization,
    };
    const variables = { id };
    let { User } = await this.gqlClient.request(
      getUserName,
      variables,
      requestHeaders,
    );
    // Since we filtered on a non-primary key we got an array back
    User = User[0];

    if (!User) {
      throw new HttpException( 'Not allowed or no user found',
        HttpStatus.FORBIDDEN);
    } 

    return(User);
  }
}
