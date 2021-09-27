modules.export('*', 'module1');

modules.export({ name: 'KAMGA', 'firstName' : 'Emmanuel'}, 'child');


modules.export(function(o, type) {
    return Object.prototype.toString(o) === '[object ' + type + ']';    
}, 'isTypeOf');


