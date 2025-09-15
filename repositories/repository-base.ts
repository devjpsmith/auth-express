import {JsonDB} from 'node-json-db';

export default abstract class RepositoryBase<T> {
    protected abstract readonly _path: string;

    constructor(protected readonly _db: JsonDB) {
    }

    public async getAll(): Promise<T[]> {
        return this._db.getObjectDefault<T[]>(this._path, []);
    }

    public async save(entity: T): Promise<T> {
        const list = await this._db.getObjectDefault<T[]>(this._path, []);
        list.push(entity);
        await this._db.push(this._path, list);
        await this._db.save();
        return entity;
    }

    public async find(query: (x: T) => boolean): Promise<T | undefined> {
        const list = await this._db.getObjectDefault<T[]>(this._path, []);
        return list.find(query);
    }
}