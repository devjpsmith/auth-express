import { App } from '../types/app';

export default interface AppRepository {
    save(authApp: App): Promise<App>;
    list(): Promise<App[]>;
    find(query: (x: App) => boolean): Promise<App | undefined>;
}
