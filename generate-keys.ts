import buildKeyService from './src/factories/key-service';
import buildAppService from './src/factories/app-service';

const keyService = buildKeyService();
const appService = buildAppService();

keyService.rotateKeys()
    .then(() => appService.addApp({
        name: 'internal-service',
        permissions: [ 'internal' ],
        grant_types: [ 'client_credentials' ],
        token_lifetime_seconds: 8 * 60 * 60,
        redirect_uri: null
    }))
    .then((app) => console.log(app));
