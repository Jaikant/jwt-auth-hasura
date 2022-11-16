import { GraphQLClient } from "graphql-request";
import {
  Injectable,
} from '@nestjs/common';

@Injectable()
export class GqlClient {
  client;
  constructor() {
    this.client = new GraphQLClient("http://localhost:8080/v1/graphql", {
      headers: { "x-hasura-admin-secret": "myadminsecretkey"},
    });
  }
}