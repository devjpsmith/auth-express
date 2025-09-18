function urlEncode(str: string): string {
    return str.replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '')
}

function base64UrlEncode(str: string): string {
    const base64 = Buffer.from(str)
        .toString('base64');
    return urlEncode(base64);
}

/*
* Reverses urlEncoding. Assumes the encoded string is base64
* */
function urlDecodeToBase64(str: string): string {
    return str.replace(/_/g, '/')
        .replace(/-/g, '+')
        .concat('=='.slice(0, (4 - (str.length % 4)) % 4));
}

export {
    base64UrlEncode,
    urlEncode,
    urlDecodeToBase64
}
