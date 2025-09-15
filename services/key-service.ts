import KeyRepository from '../repositories/key-repository';
import keyGenerator from './key-generator';
import { Key } from '../types/key';

export default class KeyService {
    constructor(private readonly _repository: KeyRepository) { }

    public async rotateKeys(): Promise<void> {
        // add a new key
        await this._repository.save({ ...keyGenerator(), id: -1 });

        // delete earliest key
        const list = await this._repository.getAll();
        if (list.length > 2) {
            const id = list[0].id;
            console.log(`Deleting key with id ${id}`);
            await this._repository.delete(id);
        }
    }

    public async getCurrentKey(): Promise<Key> {
        const list = await this._repository.getAll();
        if (list.length === 0)
            throw Error('Could not get current key');
        return list[list.length - 1];
    }

    public async getKeys(): Promise<Key[]> {
        return await this._repository.getAll();
    }
}