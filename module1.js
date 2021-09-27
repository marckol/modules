modules.export(function isString(o) {
    return typeof o === 'string' || o instanceof String;
});

modules.export(function isInt(o) {
    return Number.isInteger(o);
});