import { App } from '../types/app';
import IAuthAppRepository from '../interfaces/app-repository'
import RepositoryBase from './repository-base';

export default class AppRepository extends RepositoryBase<App> implements IAuthAppRepository {
    protected readonly _path = '/apps';

    public async list(): Promise<App[]> {
        return await this._db.getObjectDefault<App[]>(this._path, []);
    }
}
