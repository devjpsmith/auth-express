import AppRepository from '../repositories/app-repository';
import { App } from '../../types/app';
import ClientGenerator from './client-generator';
import { NewAppParameters } from '../../types/new-app-parameters';

export default class AppService {
    constructor(
        private readonly _appRepository: AppRepository,
        private readonly _clientGenerator: ClientGenerator
    ) { }

    private validateNewApp(arg: NewAppParameters) {
        const { name, permissions, grant_types, token_lifetime_seconds } = arg;
        if (!name) throw new Error('name is required');
        if (!permissions) throw new Error('permissions is required');
        if (!grant_types) throw new Error('grant_types is required');
        if (!token_lifetime_seconds) throw new Error('token lifetime is required');
    }

    public async getApp(clientId: string, clientSecret: string): Promise<App | undefined> {
        return await this._appRepository.find(x => x.client_id === clientId && x.client_secret === clientSecret);
    }

    public async addApp(newAppParameters: NewAppParameters)
        : Promise<App> {
        this.validateNewApp(newAppParameters);
        const { clientId, clientSecret } = this._clientGenerator.getNewClient();
        const authApp = {
            ...newAppParameters,
            client_id: clientId,
            client_secret: clientSecret,
        };
        await this._appRepository.save(authApp);
        return authApp;
    }
}