modules.import('*', 'module2.js', 'ext');

function N() {
    this._value = 125;
    if (arguments.length > 0) {
        this._value = arguments[0];
    }
   this.isString = function() {
       return ext.isString(this._value);
   };
   
}

modules.export(N);

console.log('125 is string: ' + new N().isString());

var O = modules.get("externals/module3").N;

var d = new O(new Date());

console.log('Date is string: ' + d.isString());

var s = new N(new Date().toString());

console.log('"' + s._value + '" is string: ' + s.isString());

modules.export(function(o, type) {
    return typeof o === 'function' || o instanceof Function;    
}, 'isFunc');

/**
 * 
 * @param {String} login
 * @param {String} name
 * @param {String} pwd
 * @returns {c}
 */
var c = function(login, name, pwd){
    if (arguments.length === 1 && isPlainObjec(login)) {
        this._name = login.name||"";
        this._login = login.login;
        this._password = login.password||login.pwd||"";
    } else {
        this._name = name||"";
        this._login = login;
        this._password = pwd||"";
    }
};

c.__CLASS__ = c;
c.__CLASS_NAME__= 'User';



/**
 * 
 * @returns {type}
 */
c.prototype.getName = function() {
    return this._name||"";
};

/**
 * 
 * @param {type} name
 * @returns {c.prototype}
 */
c.prototype.setName = function(name) {
    this._name = name;
    return this;
};
/**
 * 
 * @returns {type}
 */
c.prototype.getLogin = function() {
    if (!this._login) {
        this._login = this._name||"";
    }
    return this._login;
};

/**
 * 
 * @param {type} login
 * @returns {c.prototype}
 */
c.prototype.setLogin = function(login) {
    this._login = login;
    return this;
};
/**
 * 
 * @returns {type}
 */
c.prototype.getPassword = function() {
    return this._password||"";
};

/**
 * 
 * @param {type} password
 * @returns {c.prototype}
 */
c.prototype.setPassword = function(password) {
    this._password = password;
    return this;
};
/**
 * 
 * @returns {String}
 */
c.prototype.toString = function() {
    return (this._login||"") + "[" + this._name + ":" + (this._password||"") + "]";
};

//Export the class c (anonymous function) with the name 'User' in module3
modules.export(c);



/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
modules.export(/a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/, 'unicodeRegExp');
modules.export(/a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/, 'UNICODE_LETTERS_REGEXP');
