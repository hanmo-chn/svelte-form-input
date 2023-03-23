const isEmpty = (s:any):boolean => {
    if (s == null) {
        return true;
    } else if (typeof s == 'string') {
        return s.trim().length == 0;
    } else {
        return true;
    }
}

export default {isEmpty}