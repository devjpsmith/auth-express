# Auth Express

This project is a sample authentication server. It allows a user to register an application, then request an access token for the application. It's a simple API and so it doesn't authenticate the user registering the application and so the applications are not tied to specific users; therefore, I didn't make an endpoint to GET registered applications. This sample app also doesn't have a real database - it's using a JSON file to persist data. I've only implemented the `client_credentials` flow so far since I haven't created a front-end for this yet.

### Getting started

I'm using PNPM as my package manager.

In the root of the project run:
```shell
pnpm i
```
Once all packages are installed, set an environment variable for your Key Identifier. Any set of random letters and number will do.
```shell
# feel free to use this or change it. It's not sensitive data
export KEY_ID=01K4X5P3KQ9S16Z6H3KQ6KCDN6
```

Before running the server, several files need to be generated. Run:
```shell
pnpm generate-keys
```
This will create a `private.key`, `public.key`, and `jwk.json` file. The private key is required to sign the JWT access token and the public key is used to verify the signature. The public key is only used here to generate the `jwk.json` contents, which are then provided through the `/.well-known/jwk.json` endpoint to applications wanting to verify the token.

To begin the application server, run:
```shell
pnpm dev-start
```
You don't need to create your database first. When you make the first request, the `test-db.json` file will be created and the data saved.

I've made a couple test files for making requests. The `WebStorm.tests.http` file works in the WebStorm IDE and `Auth Express.postman_collection.json` can be imported into Postman.
```
/auth-express
    /http
        /test.http
        /Auth Express.postman_collection.json
```
Using the test file, you can first register an app at the `/register` endpoint. The `client_id` and `client_secret` are saved to variables which can be used in the next request to `/oauth/token`. The `access_token` returned can be put into the `jwt.io` and as long as the server is running and the `/.well-known` endpoints can be reached, the web page should be able to validate the token.