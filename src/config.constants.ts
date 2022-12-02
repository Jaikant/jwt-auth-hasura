// These should go into the environment variables and then get imported using the nestjs config 
export const GRAPHQL_URL = 'http://localhost:8080/v1/graphql';
export const JWT_SECRET_TYPE = "HS256";
export const JWT_SECRET_KEY = "This-is-a-generic-hs256-secret-key-and-it-should-be-changed";
export const HASURA_ADMIN_SECRET = "myadminsecretkey";