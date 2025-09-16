export type Algorithm = 'RS256';

export type Header = {
    kid: string;
    alg: Algorithm;
    type: 'JWT';
}
export type Payload = {
    sub: Algorithm;
    iss: string;
    iat: number;
    exp: number;
    permissions: string[];
};
