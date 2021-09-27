/* 
 * The MIT License
 *
 * Copyright 2021 Marc KAMGA Olivier <kamga_marco@yahoo.com;mkamga.olivier@gmail.com>.
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


(function() {
    
    var _global = typeof window !== 'undefined' 
                    ? window : typeof global !== 'undefined' 
                        ? global: typeof self !== 'undefined' 
                            ? self : this;
    /**
     * 
     * @param {String} ns
     * @returns {String}
     */
    function normalizeNS(ns) {
        var _ns =  ns.replace(/(?:\/|[ \t-])+/g, '.');
        if (_ns.startsWith('.')) {
            return _ns.substring(1);
        } else if (_ns.startsWith('..')) {
            return _ns.substring(2);
        }
        return _ns;
    }

    /**
     * Binds the object returned by the call of the factory to the given namespace 
     * and also to module only when using AMD or nodejs.
     * @param {Object} window The global namespace where to directly add 
     *      the object/value to bind
     * @param {Function} factory  The factory must return the object/value to bind
     * @param {String} name  The name of the sub module when SereniX exits and/or 
     *      Namespace class exists and Namespace.__CLASS__ exists. 
     *      When the function called withonly three arguments, the value represents 
     *      the full name of the object to  or the path.
     * @param {String} [path]  The path relatively to the module to bind
     * @returns {function}
     */
    function nsbind(window, factory, name, path)  {
        'use strict';

        function bind(own, sub, obj) {
            var tokens = sub.split('.'), 
                    i = 0, 
                    n = tokens.length - 1, 
                    pkg = own, tok;
            if (n > 1) {
                while (i < n && !(pkg = own[tok = tokens[i++]])) {
                    own[tok] = pkg = {};
                } 
                pkg[tokens[i]] = obj;
            } else {
                throw new Error("Incorrect object sub-namespace");
            }
        }

        var sub, i;
        if (path) {
            sub = (name||path).replace(/(?:\/|[ \t-])+/g, '.');
        } else {
            if ((i = name.startsWith("./")) >= 0) {
                path = name;
                sub = name.subtring(i + 2).replace(/\//g, '.');
            } else if ((i = name.lastIndexOf("/")) >= 0) {
                sub = name.replace(/\//g, '.');
                path = name;
            } else if ((i = name.lastIndexOf(".")) >= 0) {
                path = name.replace(/\./g, '/');
                sub = name.subtring(0, i);
            } else {
                sub = name;
                path = name;
            }
        }
        if (!sub.startsWith('.')) {
            sub = '.' + sub;
        } else if (sub.startsWith('..')) {
            sub = sub.substring(1);
        }


        if (typeof define === 'function' && define.amd) {
            define([path], function() { return factory(window);});
        } else if (typeof module === 'object' && module.exports) {
            module.exports = window.EventManager = factory(require(path));
        } else if (typeof SereniX === 'undefined') {
            if (typeof Namespace === 'function' && Namespace.__CLASS__) {
                Namespace.window('SereniX' + sub, [factory(window)]);
            } else {
                window.SereniX = {};
                bind(window.SereniX, sub, factory(window)) ;
            }
        } else {        
            if (typeof Namespace === 'function' && Namespace.__CLASS__ && SereniX instanceof Namespace) {
                Namespace.window('SereniX' + sub, [factory(window)]);
            } else {
                bind(SereniX, sub, factory(window)) ;
            }
        }
        return nsbind;
    }

    /**
     * 
     * @param {String} name
     * @returns {Object}
     */
    function requireObj(name) {   
        if (typeof define === 'function' && define.amd) {
            //TODO
            //define([path], function() { return factory(name);});
            throw new Error("Not yet implemented");
        } else if (typeof module === 'object' && module.exports) {
            return require(name);
        }
        return (function(own, sub) {
            var tokens = sub.split('.'), 
                    i = 0, 
                    n = tokens.length, 
                    obj, tok;
            if (n > 1) {
                while (i < n && (obj = own[tok = tokens[i++]])) {
                    own = obj;
                }
                if (i < n) {
                    throw new Error("Can not access property " + tok + "' for undefined value");
                }
                return obj;
            } else {
                throw new Error("Incorrect object sub-namespace");
            }
        })(typeof SereniX !== 'undefined' 
                ? SereniX : _global, normalizeNS(name));
    }
    _global.requireObj = requireObj;
    _global.nsbind = nsbind;
})();