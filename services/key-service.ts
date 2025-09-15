import KeyRepository from '../interfaces/key-repository';
import keyGenerator from './key-generator';

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
}