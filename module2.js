//Export all in module1 (file module1.js) to module2
modules.export('*', 'module1');

//Export the object as 'child' in module2
modules.export({ name: 'KAMGA', 'firstName' : 'Emmanuel'}, 'child');

//Export the function to in module2 with the name 'isTypeOf'
modules.export(function(o, type) {
    return Object.prototype.toString(o) === '[object ' + type + ']';    
}, 'isTypeOf');


