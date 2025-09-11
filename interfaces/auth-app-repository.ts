import { AuthApp } from '../types/auth-app';

export default interface AuthAppRepository {
    save(authApp: AuthApp): Promise<void>;
    list(): Promise<AuthApp[]>;
    get(query: (x: AuthApp) => boolean): Promise<AuthApp | undefined>;
}
