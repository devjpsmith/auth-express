import { GrantType } from './grant-type';

export type App = {
    name: string;
    client_id: string;
    client_secret: string | null;
    token_lifetime_seconds: number;
    permissions: string[] | null;
    redirect_uri: string | null;
    grant_types: GrantType[];
}
