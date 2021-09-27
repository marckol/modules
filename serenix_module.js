/* 
 * The MIT License
 *
 * Copyright 2020-2021 Marc KAMGA Olivier (kamga_marco@yahoo.com;mkamga.olivier@gmail.com)
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */



/**
 * For dynamic modules loading, serenix_js_load.js must first of all loaded
 * @doc
 */

//require serenix_js_load.js


if (typeof inBrowser === 'undefined') {
    /**
     * True value specifies that we are runing in a brower.
     * @type Boolean
     */
    var inBrowser = typeof window !== 'undefined';
}
/**
 * The global namespace/this. 
 * <ul>
 * <li>When runing in a browser, the value is window global variable.</li>
 * <li>When not runing in a browser, global value window will be setted to and the value of global variable (global||self||this) will be setted to window.</li>
 * </ul>
 * @type Object
 */
var globalNS = typeof window ==="undefined" 
    ? typeof global!=="undefined" 
        ? global : typeof self!=="undefined" ? self: this 
    : window;

if (typeof isArray !== 'function')
    isArray = Array.isArray;
/**
 * 
 * @param {Object} o  The object
 * @param {String} n  Property name
 * @returns {Boolean}
 */
function hasOwnProp(o, n) {
    return Object.prototype.hasOwnProperty.call(o, n);
}
/**
 * Check if the given value is a plain object: <b>an object that is not an array 
 * nor a function</b>.
 * Returns <b color="blue">true</b> if it's a plain object and 
 * <b color="blue">false</b> otherwise.
 *
 * @param {*} val The value to check if it's a plain object
 * @returns {Boolean}
 */
function isPlainObject(val) {
   return typeof val === 'object' 
           && Object.prototype.toString.call(val) === '[object Object]';
}
/**
 * 
 * @param {Object} o
 * @param {String} [valueType]
 * @returns {Boolean|Array}
 */
function pairKeys(o, valueType) {
    if (isArray(o)) {
        if (o.length !== 2) {
            return null;
        }
        return isOfType(o[1], valueType) ? [0, 1] : null;
    }
    var keys = Object.keys(o), name, val;
    if (keys.length !== 2) {
        return null;
    }
    if (keys.indexOf(name= "name") >= 0 || keys.indexOf(name="Name") >= 0 || keys.indexOf(name= "key") >= 0 || keys.indexOf(name="Key") >= 0) {
        if (keys.indexOf("value") >= 0) {
            val = "value";
        } else if (keys.indexOf("Value") >= 0) {
            val = "value";
        } else if (keys.indexOf("object") >= 0) {
            val = "object";
        } else if (keys.indexOf("Object") >= 0) {
            val = "Object";
        } else {
            return null;
        }
    } else {
        return null;
    }
    return isOfType(o[val], valueType) ? [name, val] : false;
}
/**
 * 
 * @param {type} v
 * @param {String|Function} type
 * @returns {Boolean}
 */
function isOfType(v, type) {
    if (type instanceof Function) {
        type = type.valueOf();
    }
    if (typeof type === 'function') {
        if (!(v instanceof type)) {
            return false;
        }
    } else if (type === 'array' || type === 'Array') {
        if (!isArray(v)) {
            return false;
        }
    } else if (type) {
        if (Object.prototype.toString.call(v) !== '[object ' + type + ']') {
            var ltyp = type.toLowerCase();
            if (typeof v !== ltyp) {
                return false;
            }
        }
    }
    return true;
}

var ofType = isOfType;

var isTypeOf = isOfType;
/**
 * 
 * @param {type} arr
 * @param {type} n
 * @returns {Boolean|Array}
 */
function isPairs(arr, n) {
    if (arguments.length < 2) {
        n = arr.length;
    }
    var keys,name, val;
    for (var i = 0; i < n; i++) {
        keys = Object.keys(arr[i]);
        if (keys.length === 2) {
            if (!name) {
                if (keys.indexOf("name") >= 0) {
                    name = "name";
                    if (keys.indexOf("value") >= 0) {
                        val = "value";
                    } else if (keys.indexOf("Value") >= 0) {
                        val = "value";
                    } else if (keys.indexOf("object") >= 0) {
                        val = "object";
                    } else if (keys.indexOf("Object") >= 0) {
                        val = "Object";
                    } else {
                        return false;
                    }
                } else if (keys.indexOf("Name") >= 0) {
                    name = "Name";
                    if (keys.indexOf("value") >= 0) {
                        val = "value";
                    } else if (keys.indexOf("Value") >= 0) {
                        val = "value";
                    } else if (keys.indexOf("object") >= 0) {
                        val = "object";
                    } else if (keys.indexOf("Object") >= 0) {
                        val = "Object";
                    } else {
                        return false;
                    }
                } else {
                    return false;
                }
            } else {
                if (keys.indexOf(name) < 0) {
                    return false;
                }
                if (keys.indexOf(val) < 0) {
                    return false;
                }
                break;
            }
        } else {
            return true;
        }
    }
    if (name) {
        return [name, val];
    }
}

if (!globalNS.DEFAULT_MODULE_EXTENSION) {
    /**
     * The default module extension: starts with '.' character
     * @type String
     */
    globalNS.DEFAULT_MODULE_EXTENSION = ".js";
}

/**
 * The modules container.
 * @type type
 */
var modules = { __bindings___: {}};




(function() {
    
/**
 * 
 * @param {String} m
 * @returns {Module}
 * @class Module
 */
function Module(m) {
    if (!(this instanceof Module)) {
        return new Module(m);
    }
    if (m instanceof String) {
        m = m.valueOf();
    }
    this.__map__ = {};
    if (typeof m === 'string') {
        if (modules.__bindings___[m]) {
            throw new Error("Module already exists with the same name: '" + m + "'");
        }
        this._name = m;
        modules.__bindings___[m] = this;
    }
}
var M = Module;
/**
 * Returns the class full name.
 * @returns {String}
 */
M.getFullClassName = function() {
    return "modules.Module";
};
Object.defineProperty(M, 'fullClassName', {get: M.getFullClassName, set: function() { throw new Error("Read only property"); }});
/**
 * 
 * @type Function
 */
M.__CLASS__ = M;
/**
 * @type String
 */
M.__CLASS_NAME__ = "Module";

var p = M.prototype;
/**
 * 
 * @type Function
 */
p.__CLASS__ = M;
/**
 * @type String
 */
p.__CLASS_NAME__ = "Module";
/**
 * <p>Exports the given value/object if the variable name is specified or can be 
 * extracted from the class or function (when the first argument value is a 
 * class or a function) or exports export object entries as module 
 * variables.</p>
 * <p>To mimic javascript es6 declaration export, invoke this import method 
 * with a plain object. In this case, each entry will be individually exported 
 * as a module variable with the key as variable name and the entry value as 
 * the value of the variable.</p>
 * @param {type} e What to export (function, Object, value, array, ...) or 
 *      object to export entries a module variables.
 * @param {String|Boolean} [alias] 
 * <ul> 
 * <li>When the value is true, it specify that it's a default export: the value 
 * of the first argument is exported with the 'default' name.</li>
 * <li>When alias is a string and the argument key is true, the value of the 
 * first argument is exported with the valueof e[alias] as name.</li>
 * </ul>
 * @param {Boolean} [key=false]
 * @returns {Module}
 */
p.export = function(e, alias, key) {
    function put(name, e, self) {
        self.__map__[name] = e;
        function _get() {
            return this.__map__[_get.__name__];
        }
        _get.__name__ = name;
        Object.defineProperty(self, name , { 
            get : _get, 
            set : function() { throw new Error("Read only property"); } 
        });
    }
    var name;
    if (arguments.length > 2 && key) {
        if (typeof e !== 'object' && typeof e !== 'function') {
            throw new Error("Incorrect arguments: when the argument key is true, the first argument must be a plain object or a class or a function");
        }
        key = "" + alias;
        name = e[key]||"";
    } else {
        if (alias instanceof String || alias instanceof Boolean) {
            alias = alias.valueOf();
        } else if (arguments.length > 1 && typeof alias !== 'string') {
            throw new Error("Incorrect arguments");
        }
        if (alias === true) {
            alias = 'default';
        }
        if (alias) {
            if (typeof alias !== 'string') {
                throw new Error("Incorrect alias argument: expected string");
            }
            name = alias;
        } else if (isPlainObject(e)) {
            for (var k in e) {
                if (hasOwnProp(e, k)) {
                    put(k, e[k], this);
                }
            }
            return this;
        } else {
            if (typeof e === 'function' || e instanceof Function) {                
                if (e.__CLASS__ === e) {
                    if (typeof e.getClassFullName === 'function') {
                        name = e.getClassFullName();
                    } else if (typeof e.getFullClassName === 'function') {
                        name = e.getFullClassName();
                    } else if (typeof e.getFullName === 'function') {
                        name = e.getFullName();
                    } else if (e.__CLASS_FULL_NAME__) {
                        name = e.__CLASS_FULL_NAME__;
                    } else if (e.__FULL_NAME__) {
                        name = e.__FULL_NAME__;
                    } else if (e.__CLASS_NAME__) {
                        name = e.__CLASS_NAME__;
                    } else if (e.__NAME__) {
                        name = e.__NAME__;
                    }
                    if (!name) {
                        name = e.name;
                    }
                } else {
                    name = e.name;
                    if (!name) {
                        if (e.__CLASS__ && e.__CLASS__ !== e) {
                            var c = e.__CLASS__;
                            name = c.__CLASS_NAME__||c.__NAME__||c.CLASS_NAME||c.NAME||c.className||c.ClassName||c.name||c.Name;
                        }
                    }
                }                
            }
            if (!name) {
                name = "default";
            }
        }
    }
    put(name, e, this);
    return this;
};

/**
 * 
 * @param {Object|Array} e
 * @returns {undefined}
 */
p.exportAll = function(e) {
    
    if (arguments.length > 1) {
        e = [].slice.call(arguments);
    }
    if (isPlainObject(e)) {
        for (var name in e) {
            if (hasOwnProp(e, name)) {
                this.export(e[name], name);
            }
        }
    } else if (isArray(e)) {
        var n = e.length, pair;
        var _e = e[0];
        
        if (isArray(_e)) {            
            for (var i = 0; i < n; i++) {
                _e = e[i];
                this.export(/* value */ _e[1], /* key */ _e[0]);
            }
        } else if (Object.keys(_e).length === 1) {
            var key, keys;
            for (var i = 0; i < n; i++) {
                _e = e[i];
                keys = Object.keys(_e);
                if (keys.length !== 1) {
                    throw new Error("Incorrect argument: element/item with many keys");
                }
                key = keys[0];
                this.export(/* value */ _e[key], key);
            }
        } else if ((pair = isPairs(e, n))) {
            var name = pair[0], val = pair[1];
            for (var i = 0; i < n; i++) {
                _e = e[i];
                this.export(_e[val], _e[name]);
            }
        } else if (typeof _e === 'string' || e instanceof String) {
            n = (n - (n % 2))/2;
            var name;
            for (var i = 0; i < n; i++) {
                name = e[2*i];
                if (name instanceof String) {
                    name = name.valueOf();
                }
                if (typeof name !== 'string') {
                    throw new Error("Incorrect argument: string expected at index " + (2*i));
                }
                this.export(e[2*i + 1], name);
            }
        } else {
            for (var i = 0; i < n; i++) {
                this.export(e[i]);
            }
        }
    }
};
/**
 * 
 * @param {String} name
 * @returns {type}
 */
p.getExport = function(name) {
    return this.__map__[name];
};
/**
 * 
 * @param {String} name
 * @returns {type}
 */
p.fromName = p.getExport;
/**
 * 
 * @param {String} name
 * @returns {type}
 */
p.fromname = p.getExport;
/**
 * 
 * @param {String} name
 * @returns {type}
 */
p.forname = p.getExport;
/**
 * 
 * @param {String} name
 * @returns {type}
 */
p.get = p.getExport;

/**
 * 
 * @param {String} name
 * @returns {type}
 */
p.__get__ = p.getExport;
/**
 * Computes the module name from the path and returns the computed name.
 * @param {String} path
 * @returns {String}
 */
M.getName = function(path) {
    
    var name = path, ext = DEFAULT_MODULE_EXTENSION||"";
    if (ext) {
        if (ext[0] !== '.') {
            ext = '.' + ext;
        }
    }
    if (name.startsWith(".")) {
        return ext && name.endsWith(ext) ? name.substring(0, name.length - ext.length) : name;
    }
    if (ext) {        
        if (name.endsWith(ext)) {
            name = name.substring(0, name.length - ext.length);
        }
    }
    var dirbase = modules.__dirbase__||modules.dirbase;
    var pos;
    if (name.startsWith(dirbase)) {
        if (['/', '\\'].indexOf(name[pos = dirbase.length]) >= 0) {
            return name.substring(pos + 1);
        }
        pos = dirbase.lastIndexOf("/");
        if (pos >= 0) {
            return ".." + name.substring(pos);
        }
    }
    var tokens = dirbase.split('/'), 
            i = 0, 
            n = tokens.length, 
            str = "", 
            ofs = 0;
    for (; i < n; i++) {
        str = tokens[i] + "/";
        if (!name.startsWith(str, ofs)) {
            break;
        }
        ofs += str.length;
    }
    if (i > 0) {
        str = "";
        for ( i = n - i; i > 0; i--) {
            str += "../";
        }
        return str + name.substring(ofs);
    }
    return name;
};
/**
 * Returns the file name/path that correspond to the given module name.
 * @param {String} module The module name to get the file name/path
 * @returns {String}
 */
M.getFileName = function(module) {
    var ext = DEFAULT_MODULE_EXTENSION||"";
    if (ext) {
        if (ext[0] !== '.') {
            ext = '.' + ext;
        }
    }
    return ext ? module.endsWith(ext) ? module : module + ext : module;
};

modules.Module = Module;

//Initialize the default module
new Module("default");

})();




/**
 * Returns the instance of Module that corresponds to the given module name.
 * <p>When there is a module with the given name it is returned; otherwise creates 
 * a new instance and returns it.</p>
 * @param {String} name  The module name to get the instanceof Module.
 * @returns {Module}
 */
modules.module = function(name) {
    var m = this.__bindings___[name];
    if (!m) {
        m = new modules.Module(name);
    }
    return m;
};



/**
 * Exports function(s), object(s), array(s) or other value(s) to the 
 * module that corresponds to the javascript file/library where this method is
 * called.
 * <p>Below are the possible call syntaxes:</p>
 * <ul>
 * <li>modules.export(String e, String from)</li>
 * <li>modules.export(Object e, String from)</li>
 * <li>modules.export(Object e)</li>
 * <li>modules.export(String from)</li>
 * <li>modules.export(Object e, Object options)</li>
 * <li>modules.export(Object e, Object|Array variables)</li>
 * <li>modules.export(type e, String alias, Boolean key)</li>
 * <li>modules.export(type e, String alias, String from)</li>
 * <li>modules.export(Array e, Boolean defaultExport)</li>
 * <li>modules.export(Array e, String alias)</li>
 * <li>modules.export(Array e)
 * <p>When modules.export is called only with one argument that is an array, 
 * if the array has elements with the characteristics below, each element will 
 * be exported individually. Otherwise, the array will be export as default: 
 * the module will have an entry named 'default' with the array as value.</p>
 * <p><b>Characteristics of individual exports</b>:</p>
 * <ul>
 * <li>Element is an array of two elements with the first element of type string:
 * <p></p>
 * </li>
 * <li>Element is an array of two elements with the first element not of 
 * type string and the second element of type string:
 * <p></p>
 * </li>
 * <li>Element is an Object with two entries where the value of the entry with key 'name', 
 * 'Name', 'key', 'Key', 'alias' or 'Alias' is the key of the pair and the 
 * value of entry with 'value', 'Value', 'export', 'Export', 'exports' or 
 * 'Exports' represents the element(s) to export.</li>
 * <li>Element is an Object with one entry:
 * <p>The value of the entry is exported with the name/key of the entry as alias/name.</p>
 * </li>
 * </ul>
 * </li>
 * </ul>
 * @param {String|Array|Object} e The element(s) to export or the module to export elements from
 * <ul>
 * <li>When one argument of type string, it represents the module to export elements from.</li>
 * <li>When many arguments, it represents the element(s) to export</li>
 * </ul>
 * @param {String} [alias]
 * @param {Boolean} [key]
 * @param {String} [from]  The aggregation module name : the module the 
 *      elements to export come from
 * @param {String} [module]  The module name where to export. Generaly, this 
 *      module name is not specified. In this case, the module name is computed 
 *      from the file name/url that called the method.
 * @returns {Object} modules object
 */
modules.export = function(e, alias, key, from, module) {
    var variables, varsList, object, destructuring;
    if (arguments.length === 2) {
        var o = arguments[1];
        if (e === '*') {
            if (typeof o === 'string') {
                from = o;
                alias = "";
                key = false;
            } else if (isPlainObject(o)) {
                alias = o.alias||o.Alias||o.identifier||o.Identifier||o.name||o.Name;
                from = o.from||o.from||o.src||o.Src||"";
                key = false;
            }
        } else {
            if (isPlainObject(o)) {
                from = o.from||o.From||o.aggregateFrom||o.aggFrom||o.aggModule||"";
                alias = o.alias||o.Alias||o.name||o.Name||"";
                key = o.key||o.Key||false;
                module = o.to||o.To||o.module||o.Module||o.toModule||"";
            }
            if (isPlainObject(e)) {
                object = e;
                if (isArray(arguments[1])) {
                    varsList = arguments[1];              
                } else if (isPlainObject(arguments[1])) {
                    variables = arguments[1];
                }
            }
        }
    } else if (arguments.length === 3) {
        if (typeof arguments[2] === 'boolean') {
            from = "";
        } else if (typeof key === 'Boolean') {
            from = "";
            key = key.valueOf();
        } else if (typeof key === 'string') {
            from = key;
            key = false;
        } else if (typeof key === 'string') {
            from = key.valueOf();
            key = false;
        }
    } else if (arguments.length > 3) {
        if (typeof arguments[3] === 'boolean') {
            var _from = key;
            key = from;
            from = _from;
        } else if (arguments[3] instanceof Boolean) {
            var _from = key;
            key = from.valueOf();
            from = _from;
        } else {
            if (arguments[3] instanceof String) {
                from = arguments[3].valueOf();
            }
            
            if (arguments[2] instanceof String) {
                key = arguments[2].valueOf();
            }
            if (typeof key === 'string' || typeof from === 'string') {
                module = from;
                from = key;
                key = false;
            } else if (typeof key === 'string') {
                if ((object = isPlainObject(e)) && isArray(arguments[1])) {
                    object = e;
                    alias = key;
                    varsList = arguments[1]; 
                    if (typeof arguments[3] === 'boolean') {
                        destructuring = arguments[3];
                    } else {
                        destructuring = true;
                    }
                    from = null;                    
                    key = false;
                    variables = {};
                    var v, _keys, k, pkeys;
                    for (var i = 0, len = varsList.length; i < len; i++) {
                        v= varsList[i];
                        if (v instanceof String) {
                            v = v.valueOf();
                            if (typeof v === 'string') {
                                variables[v] = v;
                            } else if (isArray(v)) {
                                variables[v[0]] = v[1]||"";
                            } else if (isPlainObject(v)) {
                                _keys = Object.keys(v);
                                if (_keys.length === 1) {
                                    variables[k = _keys[0]] = v[k]||"";
                                }  else if ((pkeys = pairKeys(v, 'String'))) {
                                    variables[v[pkeys[0]]] = String(v[pkeys[1]]);
                                } else {
                                    throw new Error("Incorrect variables");
                                }
                            }
                        }
                    }
                } else if (object && isPlainObject(arguments[1])) {
                    object = e;
                    alias = key;
                    variables = arguments[1];                    
                    if (typeof arguments[3] === 'boolean') {
                        destructuring = arguments[3];
                    } else {
                        destructuring = true;
                    }
                    from = null;                    
                    key = false;
                } else {
                    object = false;
                    from = key;
                    key = false;
                    if (module instanceof String) {
                        module = module.valueOf();
                    }
                    if (typeof module !== 'string') {
                        module = "";
                    }
                }
            }
        }
    }
    var Module = modules.Module;
    if (!module) { //if module where to export not specify
        try {
            if (window.__module_name__ && typeof window.__module_name__ === 'string') {
                module = window.__module_name__;
            } else {
                var l = null;
                l.toString(); //throw exception
            }
        } catch(ex) { //in the catch block, computes module name that is a 
                      //transformation of the path of the current/running 
                      //module file
            var err = new Error(), //instantiate an error to get the stack trace
                    stacktrace = "stacktrace", 
                    stack = "stack", 
                    str = "",
                    path; //the path of the module file
            
            //Get the stack trace string from the instiated error
            
            if (err.stack) {
                str = err.stack||"";
            } else if(stacktrace in ex) { // Opera
                str = ex.stacktrace||"";
            } else if(stack in ex) { // WebKit, Blink and IE10
                str = ex.stack||"";
            } else if (typeof e.printStacktrace === 'function') {
                str = e.printStacktrace();
            }  else if (typeof e.printStackTrace === 'function') {
                str = e.printStackTrace();
            }
            
            
            if (str.indexOf("://") >= 0) {
                var tokens = str.split("://"),
                    n = tokens.length, 
                    i = 1,
                    tok,
                    arr;
                var re = /[:]\d+[:]\d+/g;
                for (; i < n; i++) {
                    tok = tokens[i];
                    arr = tok.split(re);
                    if (arr.length > 1) {
                        tok = decodeURIComponent(arr[0]);
                        if (!path) {
                            path = tok;
                        } else if (path !== tok) {
                            path = tok;
                            break;
                        }
                    }
                }
            }
            module = Module.getName(path); //get the module name from the path
        } // end computing module name that is a transformation of the path of the current/running module file
    } 
    var m = this.module(module); //create a Module instance
    if (from) {
        //get the from/source module used for aggregation
        var fmod = modules.getModule(Module.getName(from)).__map__;
        if (e === '*') {
            for (var k in fmod) {
                if (hasOwnProp(fmod, k)) {
                    m.export(fmod[k],k);
                }
            }
        } else if (isArray(e)) {
            var i=0, n = e.length, v;
            if (n > 0) {
                v=e[0];
                if (isArray(v)) {
                    for (; i < n; i++) {
                        v = e[i];
                        m.export(fmod[v[0]], v[1]);
                    }
                } else if (isPlainObject(v)) {
                    var keys = Object.keys(v), k;
                    if (keys.length === 1 && typeof (k = v[keys[0]]) === 'string' || k instanceof String) {
                        for (; i < n; i++) {
                            v = e[i];
                            keys = Object.keys(v);
                            k = keys[0].toString();
                            m.export(fmod[k], v[k]||k);
                        }
                    } else if (hasOwnProp(v, 'name')) {
                        var al;
                        for (; i < n; i++) {
                            v = e[i];
                            k = v[name];
                            al = v.alias||v.identifier;
                            m.export(fmod[k], al||k);
                        }
                    } else {
                        throw new Error("Incorrect exports list");
                    }
                }  else {
                    throw new Error("Incorrect exports list");
                }
                
            }
        } else if (isPlainObject(e)) {
            var al;
            for (var k in e) {
                al = e[k];
                if (al instanceof String) {
                    al =al.valueOf();
                }
                if (typeof al !== 'string') {
                    throw new Error("Incorrect alias");
                }
                if (hasOwnProp(fmod, k)) {
                    m.export(fmod[k], al);
                }
            }
        }
    } else if (variables) {
        if (destructuring) {
            for (var k in variables) {
                if (hasOwnProp(variables, k) && hasOwnProp(e, k)) {
                    m.export(object[k], variables[k]||k);
                }
            }
        } else {
            for (var k in e) {
                if (hasOwnProp(e, k)) {
                    m.export(object[k], variables[k]||k);
                }
            }
        }
    } else if (alias) {
        m.export(e, alias, key);
    } else if (isArray(e)) {
        var keys, k, ndx, msg = "incorrect export";
        for (var i = 0, _e, n = e.length; i < n; i++) {
            _e = e[i];
            if (isArray(_e)) {
                if (typeof _e[0] === 'string') {
                    m.export(_e[1], /*alias*/_e[0], /*key*/false);
                } else if (typeof _e[1] === 'string') {
                    m.export(_e[0], /*alias*/_e[1], /*key*/false);
                } else {
                    throw new Error(msg);
                }
            } else if (isPlainObject(_e)) {
                keys = Object.keys(_e);
                switch(keys.length) {
                    case 2:
                        if ((ndx = keys.indexOf(k = 'name')) >= 0 
                                || (ndx = keys.indexOf(k = 'Name')) >= 0 
                                || (ndx = keys.indexOf(k = 'key')) >= 0 
                                || (ndx = keys.indexOf(k = 'Key')) >= 0) {
                            m.export(_e[keys[ndx === 0 ? 1 : 0]], /*alias*/_e[k], /*key*/false);
                        } else {
                            throw new Error(msg);
                        }
                        break;
                    case 1:
                        m.export(_e[keys[0]], /*alias*/keys[0], /*key*/false);
                        break;
                    default:
                        throw new Error(msg);
                }
            } else if (typeof _e === 'function') {
                k = _e.__CLASS_NAME__||_e.__NAME__||_e.name;
                if (k) {
                    m.export(_e, k, false);
                } else {
                    throw new Error(msg);
                }
            }
        }
    } else {
        m.export(e);
    }
    return this;
};
/**
 * 
 * @param {String} moduleName
 * @returns {Object}
 */
modules.getModule = function(moduleName) {
    var module = modules.__bindings___[moduleName];            
    if (!module) {
        var jsFileName = modules.Module.getFileName(moduleName);
        if (typeof jsSyncLoad === 'function') {
            console.log("Loading " + jsFileName + " ..." );
            //load the module's javascrip file synchronously
            jsSyncLoad(jsFileName); 
            console.log("Loading of " + jsFileName + " ended" );
            module = modules.__bindings___[moduleName];
            if (!module) {
                throw new Error("'" + jsFileName + "' is not a module");
            }
        } else {
            throw new Error("The javascript file '" + jsFileName + "' not loaded");
        }
    }
    return module;
};

(function() {
    
    var Module = modules.Module;
    
    function loadAndProcess(e, moduleName, ns, onSuccess, onFail) {
        if (onSuccess) {
            function proc() {
                onSuccess(processModule(modules.__bindings___[proc.moduleName].__map__, e, ns));
            }
            proc.moduleName = moduleName; 
            asyncLoad(jsFileName, proc, onFail);
        } else {
            var jsFileName = Module.getFileName(moduleName);
            if (typeof jsSyncLoad === 'function') {
                console.log("Loading " + jsFileName + " ..." );
                //load the module's javascrip file synchronously
                jsSyncLoad(jsFileName); 
                console.log("Loading of " + jsFileName + " ended" );
                module = modules.__bindings___[moduleName];
                if (!module) {
                    throw new Error("'" + jsFileName + "' is not a module");
                }
                processModule(module.__map__, e, ns);
            } else {
                throw new Error("The javascript file '" + jsFileName + "' not loaded");
            }
        }
    }
    /**
     * 
     * @private
     * @param {type} e
     * @param {type} moduleName
     * @param {type} ns
     * @returns {undefined}
     */
    function syncLoadAndProcess(e, moduleName, ns) {
        var jsFileName;
        jsSyncLoad(jsFileName = Module.getFileName(moduleName));
        module = modules.__bindings___[moduleName];
        if (!module) {
            throw new Error("'" + jsFileName + "' is not a module");
        }
        processModule(module.__map__, e, ns);
    }
    
    /**
     * 
     * @private
     * @param {Array&lt;String&gt;} from   The list of modules (names 
     *      and/or file names) from whom get elments (object (s), 
     *      function(s), variable(s) and/or value(s)) to import.
     * @param {type} index  The module index
     * @param {type} onEnd  The function to execute after all the 
     *      modules proceeded
     * @param {Function} onFail
     * @param {type} ns  The namespace
     * @returns {undefined}
     */
    function _loop(from, index, onEnd, onFail, ns) {
        if (index < from.length) {
            //get the current module name and increment the module index
            var moduleName = Module.getName(from[index++]);
            var module = modules.__bindings___[moduleName];
            if (module) {
                processModule(module.__map__, e, ns);
                _loop(from, index, onEnd, onFail, ns);
            } else {
                function proc() {
                    processModule(modules.__bindings___[proc.moduleName].__map__, e, proc.ns);
                    _loop(proc.from, proc.next, proc.onEnd, proc.onFail, proc.ns);
                }
                proc.from = from;
                proc.moduleName = moduleName;
                proc.next = index;
                proc.onEnd = onEnd;
                proc.onFail = onFail;
                proc.ns = ns;
                jsAsyncLoad(Module.getFileName(moduleName), proc, onFail);                      
            }
        } else {
            onEnd(ns);
        }
    }
    /**
     * 
     * @private
     * @param {type} module
     * @param {type} e
     * @param {type} ns
     * @returns {serenix_module_L830.processModule.module|Number}
     */
    function processModule(module, e, ns) {       
        if( e === 'default') {
            var _i = module[e];
            if (ns) {
                ns[e] = _i;
            }
            return _i;
        }
        if (e === '*') {
            for (var n in module) {
                if (hasOwnProp(module, n)) {
                    ns[n] = module[n];
                }
            }
            return ns;
        }
        
        var ODVars;
        if (typeof SereniX === 'undefined') {
            ODVars = window.ODVariables;
        } else if (isPlainObject(SereniX)) {
            ODVars = SereniX.ODVariables||window.ODVariables;
        }
        if (isArray(e)) {
            var k, _name, keys;
            for (var i = 0, n = e.length; i < n; i++) {
                k = e[i];
                if (k instanceof String) {
                    k = k.valueOf();
                }
                if (typeof k === 'string') {
                    ns[k] = module[k];
                } else if (isPlainObject(k)) {
                    keys = Object.keys(k);
                    if (keys.length === 1) {
                        _name = keys[0];
                        ns[k[_name]] = module[_name];
                    } else {
                        _name = k.name||k.Name||k._name||k.property||k.Property;
                        if (!_name) {
                            throw new Error("Incorrect key");
                        }
                        ns[k.identifier||k.Identifier||k.alias||k.Alias||_name] = module[_name];
                    }
                } else if (isArray(k)) {
                    if (k.length < 2) {
                        throw new Error("Incorrect array key");
                    }
                    ns[k[1]] = module[k[0]];
                }
            }
            return ns;
        } else if (typeof ODVars === 'function' && e instanceof ODVars) {
            var entries = e.getEntries(), n = entries.length, entry, name, defVal, alias, v;
            for (var i = 0; i < n; i++) {
                entry = entries[i];
                name = entry.getName();
                alias = entry.getAlias();
                v = module[name];
                defVal = entry.getDefaultValue();
                ns[alias||name] = (typeof v === 'undefined' || v === null) && typeof defVal === 'undefined' ? defVal : v;
            }
        } else if (isPlainObject(e)) {
            var v, key, defVal;
            for (var name in e) {
                v=e[name];
                if ((v instanceof String) || (v instanceof Boolean)) {
                    v = v.valueOf();
                }

                if (typeof v === 'string') { //the alias (variable name)
                    ns[v||name] = module[name];
                } else if (isPlainObject(v)) {
                    key = v.alias||v.name||v.aliasName||v.variableName||v.variable||v.varName;
                    defVal = v.defaultValue||v.DefaultValue;
                    v = module[name];
                    ns[key||name] = (typeof v === 'undefined' || v === null) && typeof defVal === 'undefined' ? defVal : v;
                } else if (typeof v === 'boolean') {
                    //TODO
                }
            }
            return ns;
        } else if (typeof e === 'string') {
            var i = ns[e] = module[e];
            return i;
        }
    }
    function forname(name) {
        var ns = globalNS, i, o = 0, key, _ns;
        for (;;) {
            i = name.indexOf(".", o);
            if (i < 0) {
                key = name.substring(o);
                _ns = ns[key];
                if (!_ns) {
                    _ns = ns[key] = {};
                }
                return _ns;
            }
            key = name.substring(o, i);
            _ns = ns[key];
            if (!_ns) {
                _ns = ns[key] = {};
            }
            ns = _ns;
            o = i + 1;
        }
    }
    
    function _namespace(ns) {
        if (ns instanceof String) {
            ns = ns.valueOf();
        }
        return typeof ns === 'string' && ns 
                ? forname(ns) 
                : !ns || (typeof ns !== 'object' && typeof ns !== 'function') ? globalNS 
                : ns;
    }
    /**
     * 
     * @private
     * @param {type} e
     * @param {String|Array} from
     * @param {Object} ns
     * @param {Function} onSuccess
     * @param {Function} onFail
     * @param {Boolean} processOnEnd Execute onEnd callback after the loop ?
     * @returns {serenix_module_L830.processModule.module|Number}
     */
    function _import(e, from, ns, onSuccess, onFail, processOnEnd) {//(typeof from !== 'string')        
        var module, moduleName;
        if (isArray(from)){
            if (e !== '*') {
                throw new Error("Incorrect arguments");
            }
            if (onSuccess) {
                if (!onFail) {
                    onFail = function() {
                        var msg = "Module(s) processing failure";
                        console(msg);
                        throw new Error(msg);
                    };
                }
                _loop(0, from, onSuccess, ns, processOnEnd);
            } else {
                for (var i = 0, count = from.length; i < count; i++) {
                    moduleName = modules.Module.getName(from[i]);
                    module = modules.__bindings___[moduleName];
                    if (module) {
                        processModule(module.__map__, e, ns);
                    } else {
                        syncLoadAndProcess(e, moduleName, ns);
                    }            
                }
            }
        } else {
            moduleName = modules.Module.getName(from);
            module = modules.__bindings___[moduleName];
            if (module) {
                return processModule(module.__map__, e, ns);
            } else {
                loadAndProcess(e, moduleName, ns, onSuccess, onFail);
            }
        }
        return ns;
    }
/**
 * <div>
 * The <b>import</b> method is used to import read only live bindings which are 
 * exported by any other module(s).
 * <ul>
 * <li>When the method is called with only one string argument, the argument 
 * represents the module(s) to import from.</li>
 * <li>When the first argument is a plain object with 'from' or 'From' 
 * property/field, it represents on set of exports of a module to import.
 * In this case, all followings arguments that are plain objects with
 * 'from' or 'From' property/field are other sets of a modules to import.  
 * <p>The sets of modules to import are stopped when an argument of different 
 * with other characteristics is encountered or when end of arguments.</p>
 * </li>
 * </ul>
 * </div>
 * <div>
 * <p><b>Notes</b>:</p>
 * <ul>
 * <li>To make non already loaded module(s), to be loaded asynchronously, at 
 * least the onSucess callback must be specified.</li>
 * <li>For dynamic modules loading, serenix_js_load.js library must 
 * first of all be loaded for the use of jsSyncLoad function or jsAsyncLoad 
 * function.</li>
 * </ul>
 * </div>
 * @param {String|Array|Object} e  Exports to be imported: the name(s) and/or 
 *      name(s) with default value(s) of the exports.
 * @param {String|Array&lt;String&gt;} [from]  The module(s) to import from. 
 *      <p>This is often a relative or absolute path name to the .js file 
 *      containing the module.</p>
 *      <p>This is optional only if the first argument is a plain object with 
 *      valid field 'from', 'module' or 'modules'<br>
 *      Multiple modules in the clause from accepted if the exports value is the
 *      string '*'</p>
 * @param {String|Object} [ns]  The namespace where import variables are created/setted. 
 *      If not specify, variables are created/setted in the global namespace 
 *      (window when runing in a browser, otherwise global, self or global this).
 * @param {Function|Object} [process] On sucess callback or process object with on success callback and/or on fail callback
 * <ul>
 * <li>when this argument is a function, it represents the onSucess callback used/eecuted after asynchronous modules loading.</li>
 * <li>When this argument is a plain object, onSuccess and onFail callbacks are obtained as follow:
 *      <ul>
 *      <li>onSuccess = process.onSucess||process.sucess||process.then||process.on</li>
 *      <li>onFail = process.onFail||process.onFailure||process.fail||process.failure||process['else']||process.off</li>
 *      </ul>
 * </li>
 * </ul>
 * @param {Function} [onFail] The function to execute if the import failed 
 *      when loading one module
 *      <p>When process argument is a plain object and this onFail function 
 *      argument is specify, this function will be eecuted in case of failure 
 *      and ignore the a onFail function specified in the object 'process',</p> 
 * @returns {Object}
 */
modules.import = function(e, from, ns, process, onFail) {
    
    if (arguments.length === 0) {
        throw new Error("At leat one argument expected");
    }
    
    if ((arguments.length === 1 && !e) || (arguments.length > 1 && !from) ) {
        throw new Error("Incorrect 'from' clause or expected 'from' clause");
    }
    
    
    var _onSuccess, _onFail = onFail;
    
    function setCallBacks() {        
        if (typeof process === 'function') {
            _onSuccess = process;
            if (arguments.length > 4 && typeof arguments[4] === 'function') {
                _onFail = arguments[4];
            }
        } else if (typeof process === 'function') {
            _onSuccess = process;
        } else if (isPlainObject(process) && (typeof (onSuccess = process.onSucess||process.sucess||process.onLoad||process.afterLoad||process.then||process.on) === 'function')) {
            if (typeof _onFail !== 'function') {
                _onFail = process.onFail||process.onFailure||process.fail||process.failure||process['else']||process.off;
            }
        } else {
            _onSuccess = null;
        }
    }
    
    var defaultExport;
    if (arguments.length === 1) {
        if (typeof e === 'string') {
            from = e;
            e = "*";
            ns = "";
        } else if (isPlainObject(e)) {
            var o = e;
            from = o.from||o.From||o.module||o.moduleName||o.Module||o.ModuleName;
            ns = o.ns||o.Name||o.namespace||o.Namespace||o.to||o.To||"";
            e = o.exports||o.export||o.Exports||o.Export||o.entities;
            defaultExport = o.defaultExport||o.DefaultExport;
            if (defaultExport) {
                if (typeof defaultExport !== 'string' || defaultExport === '*') {
                    throw new Error("Incorrect default export value");
                }
            }
            process = e.process||e.Process||e.onSuccess||e.success||e.onLoad||e.afterLoad||e.on;
            _onFail = e.onFail||e.onFailure||e.fail||e.off;
        } else {
            from = "";
            ns = "";
        }
    } else if (isPlainObject(e) && (hasOwnProp(e, 'from') || hasOwnProp(e, 'From'))) {
        var fromList = [e], i = 1, aLen = arguments.length, f, _process;
        for (; i < aLen; i++) {
            f = arguments[i];
            if (isPlainObject(f) && (hasOwnProp(f, 'from') || hasOwnProp(f, 'From'))) {
                fromList[i] = arguments[i];
            } else if (typeof f === 'string') {
                if (ns) {
                    break;
                }
                ns = f;
            } else if (isPlainObject(f)) {
                if (_onSuccess) {
                    break;
                } else if (ns) {
                    _onSuccess = f.onSuccess||f.onEnd||f.afterLoad||f.process||f.on;
                    if (typeof _onSuccess !== 'function') {
                        _onSuccess = undefined;
                        break;
                    }
                    _process = f;
                } else if (!(_onSuccess = f.onSuccess||f.onEnd||f.afterLoad||f.process||f.on)) {
                    ns = f;
                }
            } else if (typeof f === 'function') {
                if (_onSuccess) {
                    _onFail = f;
                    break;
                } else {
                    _onSuccess = f;
                }
            }
        }
        for (var i = 0, n = fromList.length; i <= n; i++) {
            f = fromList[i];
            _import(
                f.exports||f.export||f.elements||f.variables||f.entities||f.element||"*", 
                f.from||f.From, 
                ns, //namespace
                _onSuccess, //on success callback
                _onFail, //on fail callback
                i === n //execute on success callback after the loop?
            );
        }
        return ns;
    } else if (arguments.length > 2) {
        var $2;
        if (typeof arguments[1] === 'boolean') {
            defaultExport = arguments[1];
        } else if (typeof ($2 = arguments[2]) === 'string') { 
            if (isPlainObject(from)) {
                ns = from;
                from = $2;
            }
        } else if (typeof $2 === 'boolean') {
            defaultExport = $2;
            from = arguments[1];
            ns = "";
            if (e instanceof String) {
                e = e.valueOf();
            }
            if (defaultExport) {
                if (!e || typeof e !== 'string' || e === '*') {
                    throw new Error("Incorrect exports argument");
                }
            }            
        } else {
            defaultExport = false;
        }
    }
    
  
    if (e instanceof String) {
        e = e.valueOf();
    }
    ns = _namespace(ns);
    
    setCallBacks();
    
    return _import(e, from, ns, _onSuccess, _onFail, true);
};


})();
/**
 * Returns the names of all modules from whom elements (function(s), 
 * object(s),...) has been exported.
 * @returns {Array}
 */
modules.getNames = function() {
    return Object.keys(this.__bindings___);
};
/**
 * 
 * @param {String} moduleName
 * @returns {modules.Module}
 */
modules.get = function(moduleName) {
    return modules.__bindings___[moduleName];
};

(function() {
    
    
    /**
     * 
     * @returns {String}
     */
    var getScriptLocation = function() {
        if (document.currentScript) { 
            var script = document.currentScript;
            return script.src||script.getAttribute('src');
        }
        try {
            var l = null;
            l.toString();
        } catch (ex) {
            var err = new Error(), loc;
            if (err.stack) {
                loc =  err.stack.match(/([^ \n])*([a-z]*:\/\/\/?)*?[a-z0-9\/\\]*\.js/ig)[0].trim();
            }
            var fileName = "fileName", 
                stacktrace = "stacktrace", 
                stack = "stack",
                matcher = function(stack, matchedLoc) { 
                    return loc = matchedLoc; 
                };
            if(fileName in ex) { // Firefox
               loc = ex[fileName];
            } else if(stacktrace in ex) { // Opera
                ex[stacktrace].replace(/called from line \d+, column \d+ in (.*):/gm, matcher);
            } else if(stack in ex) { // WebKit, Blink and IE10
               ex[stack].replace(/at.*?\(?(\S+):\d+:\d+\)?$/g, matcher);
            }
            if (loc.startsWith('(')) {
                loc = loc.substring(1);
            }
            return decodeURIComponent(loc);
        }
    };
        
    var ro = function() { throw new Error("Read only property"); },
        desc = { 
            get: function() {
                if (modules.__dirbase__ && typeof modules.__dirbase__ === 'string') {
                    return modules.__dirbase__;
                }
                var loc = getScriptLocation();
                var ofs = loc.indexOf("://");
                ofs= ofs < 0 ? 0 : ofs + 3;
                var pos = loc.lastIndexOf("/");
                return modules.__dirbase__ = decodeURIComponent(loc.substring(ofs, pos));
            }, 
            set: ro 
        };    
    Object.defineProperties(modules, {
        names : { get: modules.getNames, set: ro},
        dirbase : desc,
        dir_base : desc,
        dirBase : desc,
        DIR_BASE : desc,
        DIRBASE : desc
    });
})();

