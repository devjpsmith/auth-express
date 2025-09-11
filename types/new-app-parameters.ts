import { GrantType } from './grant-type';

export type NewAppParameters = {
    name: string;
    permissions: string[];
    grant_types: GrantType[];
    redirect_uri: string | null;
    token_lifetime_seconds: number;
}