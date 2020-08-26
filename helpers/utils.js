module.exports = {
    createObjectFromParams,
    resolveObjectPath,
    deleteObjectFromParams,
}


function createObjectFromParams(path, value) {
    let obj = {};
    var schema = obj;  // a moving reference to internal objects within obj
    var pList = path.split('/');
    var len = pList.length;
    for (var i = 0; i < len - 1; i++) {
        var elem = pList[i];
        if (!schema[elem]) schema[elem] = {}
        schema = schema[elem];
    }

    schema[pList[len - 1]] = value;
    return obj;
}

function deleteObjectFromParams(path) {
    return createObjectFromParams(path, {});
} 

function resolveObjectPath(path, obj = self, separator = '.') {
    var properties = Array.isArray(path) ? path : path.split(separator)
    return properties.reduce((prev, curr) => prev && prev[curr], obj)
}