import { Config, JsonDB } from 'node-json-db';
import { AuthApp } from '../types/auth-app';
import IAuthAppRepository from '../interfaces/auth-app-repository'

export default class AuthAppRepository implements IAuthAppRepository {
    constructor(
        private readonly _db = new JsonDB(new Config(
            'test-db', false, false
        )),
        private readonly _path = '/auth_apps'
    ) {}

    public async save(authApp: AuthApp): Promise<void> {
        const authAppList = await this.list();
        authAppList.push(authApp);
        await this._db.push(this._path, authAppList);
        await this._db.save();
    }

    public async list(): Promise<AuthApp[]> {
        return await this._db.getObjectDefault<AuthApp[]>('/auth_apps', []);
    }

    public async get(query: (x: AuthApp) => boolean): Promise<AuthApp | undefined> {
        const authAppList = await this._db.getObjectDefault<AuthApp[]>(this._path, []);
        return authAppList.find(query);
    }
}
