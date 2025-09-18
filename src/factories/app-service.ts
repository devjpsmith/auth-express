import AppService from '../services/app-service';
import AppRepository from '../repositories/app-repository';
import ClientGenerator from '../services/client-generator';
import {Config, JsonDB} from 'node-json-db';

export default function (): AppService {
    return new AppService(
        new AppRepository(new JsonDB(new Config(
            'test-db', false, true
        ))),
        new ClientGenerator()
    )
}
