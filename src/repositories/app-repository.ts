import { App } from '../../types/app';
import RepositoryBase from './repository-base';

export default class AppRepository extends RepositoryBase<App> {
    protected readonly _path = '/apps';

    public async list(): Promise<App[]> {
        return await this._db.getObjectDefault<App[]>(this._path, []);
    }
}
