# Auth Express

This project is a sample authentication server. It allows a user to register an application, then request an access token for the application. It's a simple API and so it doesn't authenticate the user registering the application and so the applications are not tied to specific users; therefore, I didn't make an endpoint to GET registered applications. This sample app also doesn't have a real database - it's using a JSON file to persist data. I've only implemented the `client_credentials` flow so far since I haven't created a front-end for this yet.

### Getting started

I'm using PNPM as my package manager. If you prefer to use your own package manager, like NPM, just substitute the related commands.

In the root of the project run:
```shell
# npm install
pnpm i
```

#### Adding initial keys
This next step will create the initial RSA keys and create an internal app (for admin tasks)

```shell
# npm run ts-node generate-keys
pnpm ts-node generate-keys
```
This will add a `private_key`, `public_key`, and `jwk_json` entry to the database. The private key is required to sign the JWT access token and the public key is used to verify the signature. The public key is only used here to generate the `jwk.json` contents, which are then provided through the `/.well-known/jwk.json` endpoint to applications wanting to verify the token.

To begin the application server, run:
```shell
# npm run dev-start
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
To use the WebStorm http-client, you'll need to create a `http-client.private.env.json` file and set the two secret variables using the values returned from the `generate-keys` script under the development environment. In WebStorm, with the tests http file open, select the `development` environment before making requests.
Example file:
```json
{
  "development": {
    "admin_client_secret": "[your client_id]",
    "admin_client_secret": "[your client_secret]"
  }
}
```

Using the test file, you can first register an app at the `/register` endpoint. The `client_id` and `client_secret` are saved to variables which can be used in the next request to `/oauth/token`. The `access_token` returned can be put into the `jwt.io` and as long as the server is running and the `/.well-known` endpoints can be reached, the web page should be able to validate the token.