export function isDetailedSoc(socCode: string) : boolean {
    return !socCode.endsWith('0');
}

export function listAncestors(socCode: string) : string[] {
    const ancestors: string[] = [];

    ancestors.push('00-0000')
    if (socCode === '00-0000') {
        return ancestors;
    }

    ancestors.push(`${socCode.substring(0, 2)}-0000`);
    if (socCode.endsWith('0000')) {
        return ancestors;
    }

    ancestors.push(`${socCode.substring(0, 5)}00`);
    if (socCode.endsWith('00')) {
        return ancestors;
    }

    ancestors.push(`${socCode.substring(0, 6)}0`);
    if (socCode.endsWith('0')) {
        return ancestors;
    }

    ancestors.push(socCode);
    return ancestors;
}