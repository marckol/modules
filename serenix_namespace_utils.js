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

if (typeof window.addNamespaceElt !== 'function') {
    /**
     * 
     */
    window.addNamespaceElt = (function() {
        var _ns = false, nsFunc;
        if (window.SereniX 
                && typeof (_ns = SereniX.Namespace) === 'function'
                && typeof (_ns.ns||_ns.namespace) === 'function') {
            nsFunc = _ns.ns||_ns.namespace;
            function __addElt__(ns, elt) {
                var c = __addElt__._owner, func = __addElt__.nsFunc;
                func.apply(c, [ns]).addElement(elt);
            };
            __addElt__.nsFunc = nsFunc;
            __addElt__._owner = _ns;
            return __addElt__;
        } else if (typeof (_ns = window.Namespace) === 'function' 
                && typeof (_ns.ns||_ns.namespace) === 'function') {
            nsFunc = _ns.ns||_ns.namespace;
            function __addElt__(ns, elt) {
                var c = __addElt__._owner, func = __addElt__.nsFunc;
                func.apply(c, [ns]).addElement(elt);
            };
            __addElt__.nsFunc = nsFunc;
            __addElt__._owner = _ns;
            return __addElt__;
        } else {
            
            nsFunc = function(namespace) {
                var n = namespace.length, ofs = 0, i, owner = window, _o;
                for (;;) {
                    i = namespace.indexOf(".", ofs);
                    if (i < 0) {
                        _o = owner[namespace.substring(ofs)];
                        if (!_o) {
                            _o = owner[namespace.substring(ofs)] = {};
                        }
                        return _o;
                    } else {
                        _o = owner[namespace.substring(ofs, i)];
                        if (!_o) {
                            _o = owner[namespace.substring(ofs, i)] = {};
                        }
                        owner = _o;
                        ofs = i + 1;
                    }
                }
            };
            var addElt = function __addElt__(ns, elt) {
                var name = elt.___NAME__||elt.__CLASS_NAME__;
                if (typeof name !== 'string') {
                    name = elt.__CLASS__;
                    if (typeof name === 'function') {
                        name = name.__CLASS_NAME__||name.__NAME__;
                    }
                    if (typeof name !== 'string') {
                        name = elt["className"]||elt["name"];
                    }
                }
                if (typeof name !== 'string' || name === '') {
                    throw "Undefined element's name";
                }
                var _ns = __addElt__.nsFunc(ns);
                _ns[name] = elt;
                elt.__NAMESPACE__ = _ns;
                elt.__NAMESPACE_NAME__ = ns;
            };
             addElt.nsFunc = __addElt__.nsFunc = nsFunc;
            return __addElt__;
        }
    })();
    /**
     * 
     * 
     */
    window.addNsElt = addNamespaceElt;
}





