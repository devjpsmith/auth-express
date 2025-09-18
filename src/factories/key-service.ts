import KeyService from '../services/key-service';
import KeyRepository from '../repositories/key-repository';
import { Config, JsonDB } from 'node-json-db';
import config from '../config/app';

export default function (): KeyService {
    return new KeyService(
        new KeyRepository(
            new JsonDB(new Config(config.dbName, false, true))
        )
    )
}