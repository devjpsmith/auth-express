import RepositoryBase from '../repositories/repository-base';
import { Key } from '../types/key';

export default class KeyRepository extends RepositoryBase<Key> {
    protected readonly _path: string = '/keys';

    public async getAll(): Promise<Key[]> {
        const list = await super.getAll();
        return list.sort((a, b) => a.id > b.id ? 1 : -1);
    }

    public async save(key: Key): Promise<Key> {
        const list = await this.getAll();
        if (list.length === 0) key.id = 1;
        else key.id = list[list.length - 1].id + 1;
        console.log(JSON.stringify(list, null, 2));
        console.log(`Creating key with id ${key.id}`);
        return super.save(key);
    }

    public async delete(id: number): Promise<void> {
        const list = await this.getAll();
        const newList = list.filter(item => item.id !== id);
        await this._db.push(this._path, newList);
        await this._db.save();
    }
}