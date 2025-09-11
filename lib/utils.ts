import path from 'node:path';

function getPathToParentDirectory(dir: string): string {
    const pathParts = dir.split(path.sep);
    // return pathToParent
    if (pathParts.length > 1) {
        pathParts.pop();
        return pathParts.join(path.sep);
    }
    // return root
    if (pathParts.length === 1) return path.sep;
    // at root, return root
    return dir;
}

function getFileInParentDirectory(dir: string, filename: string): string {
    const dirName = getPathToParentDirectory(dir);
    return path.join(dirName, filename);
}

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

export {
    base64UrlEncode,
    getFileInParentDirectory,
    getPathToParentDirectory,
    urlEncode,
}
