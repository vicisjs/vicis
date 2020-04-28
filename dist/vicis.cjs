"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const e=["boolean","flag","numeric","integer","string","json"];function _classPrivateFieldGet(e,t){var r=t.get(e);if(!r)throw new TypeError("attempted to get private field on non-instance");return r.get?r.get.call(e):r.value}function _classPrivateFieldSet(e,t,r){var i=t.get(e);if(!i)throw new TypeError("attempted to set private field on non-instance");if(i.set)i.set.call(e,r);else{if(!i.writable)throw new TypeError("attempted to set read only private field");i.value=r}return r}function arrayBasicIntersect(e,t){if(!e.length||!t.length)return[];const r=new Set(t);return[...new Set(e)].filter(e=>r.has(e))}function arrayHasSame(e,t){if(!e.length||!t.length)return!1;const r=new Set(t);return Boolean([...new Set(e)].filter(e=>r.has(e)).length)}function checkIsObjectLike(e){return e&&"object"==typeof e&&!Array.isArray(e)}function isFunction(e){return"[object Function]"===Object.prototype.toString.call(e)&&!/^class\s/.test(Function.prototype.toString.call(e))}function objectGetKeys(e){return Object.keys(e).sort((e,t)=>e.localeCompare(t))}const t=["cast","defaults","defined","exclude","omit","order","pick","sort","rename","replace","required","transform"];function isString(e){return"string"==typeof e}function objectIsEmpty(e){return 0===Object.keys(e).length}function jsonStringify(e){return JSON.stringify(e)}function castConfig(t){if(!checkIsObjectLike(t))throw new TypeError("Cast should be an object");return objectIsEmpty(t)?{}:(Object.keys(t).forEach(r=>{if(!isString(t[r]))throw new TypeError(`'Cast' expect object values to be strings. Not a string at key: '${jsonStringify(t[r])}'.`);if(!e.includes(t[r]))throw new TypeError(`'Cast' has unknown type in {${r}: "${t[r]}"}.`)}),t)}function castToString(e){if(null==e)return"";if("string"==typeof e)return e;const t=e.toString();return"0"===t&&Object.is(e,-0)?"-0":t}const r="boolean",i="flag",s="numeric",a="integer",n="string",c="json";function jsonParse(e){return JSON.parse(e)}function objectToPlain(e){return function objectDeserialize(e){return isString(e)?jsonParse(e):e}(function objectSerialize(e){let t;const{toJSON:r,toObject:i}=e;return t=isFunction(i)?e.toObject():isFunction(r)?e.toJSON():e,isString(t)?t:jsonStringify(t)}(e))}function castData(e,t){return objectIsEmpty(e)||Object.keys(e).forEach(o=>{const l=e[o];if(!(o in t))throw new Error(`Field '${o}' suppose to be converted to ${l}.`);switch(l){case r:t[o]=Boolean(t[o]);break;case i:t[o]=function convertToFlag(e,t=!1,r=!1){if(null==e)return t;if("boolean"==typeof e)return e;const i=e.toString().toLocaleLowerCase().trim();return 0===i.length?t:"true"===i||"1"===i||"false"!==i&&"0"!==i&&r}(t[o]);break;case s:{const e=Number(t[o]);if(Number.isFinite(e))t[o]=e;else{const e=Number.parseFloat(castToString(t[o]).trim());Number.isFinite(e)?t[o]=e:t[o]=0}break}case a:{const e=Number(t[o]);if(Number.isFinite(e))t[o]=Math.trunc(e);else{const r=Number.parseFloat(castToString(t[o]).trim());Number.isFinite(r)?t[o]=Math.trunc(e):t[o]=0}break}case n:t[o]=castToString(t[o]);break;case c:t[o]=objectToPlain(t[o]);break;default:throw new Error("Unknown value convert error")}}),t}function castToJson(e,t=!1){return t?function objectKeysSort(e,t=!0){if(!e||"object"!=typeof e||Array.isArray(e))return e;const r=Object.keys(e);return r.length?r.reduce((r,i)=>(t&&e[i]&&"object"==typeof e[i]&&!Array.isArray(e[i])?r[i]=objectKeysSort(e[i],t):r[i]=e[i],r),Object.create(Object.getPrototypeOf(e))):e}(jsonParse(jsonStringify(e)),!0):jsonParse(jsonStringify(e))}function clone(e){switch(typeOf(e)){case"array":return e.slice();case"object":return Object.assign({},e);case"date":return new e.constructor(Number(e));case"map":return new Map(e);case"set":return new Set(e);case"buffer":return function cloneBuffer(e){const t=e.length;let r;r=Buffer.allocUnsafe?Buffer.allocUnsafe(t):Buffer.from(t);return e.copy(r),r}(e);case"symbol":return function cloneSymbol(e){if(Symbol.prototype.valueOf)return Object(Symbol.prototype.valueOf.call(e));return{}}(e);case"arraybuffer":return function cloneArrayBuffer(e){const t=new e.constructor(e.byteLength);return new Uint8Array(t).set(new Uint8Array(e)),t}(e);case"float32array":case"float64array":case"int16array":case"int32array":case"int8array":case"uint16array":case"uint32array":case"uint8clampedarray":case"uint8array":return function cloneTypedArray(e){return new e.constructor(e.buffer,e.byteOffset,e.length)}(e);case"regexp":return function cloneRegExp(e){let t;t=void 0!==e.flags?e.flags:/\w+$/.exec(e)||void 0;const r=new e.constructor(e.source,t);return r.lastIndex=e.lastIndex,r}(e);case"error":return Object.create(e);default:return e}}function typeOf(e){if(void 0===e)return"undefined";if(null===e)return"null";if(!0===e||!1===e||e instanceof Boolean)return"boolean";if("string"==typeof e||e instanceof String)return"string";if("number"==typeof e||e instanceof Number)return"number";if("function"==typeof e||e instanceof Function)return"function";if(void 0!==Array.isArray&&Array.isArray(e))return"array";if(e instanceof RegExp)return"regexp";if(e instanceof Date)return"date";const t=toString.call(e);return"[object RegExp]"===t?"regexp":"[object Date]"===t?"date":"[object Arguments]"===t?"arguments":"[object Error]"===t?"error":function isBuffer(e){return null!==e&&Boolean(e.constructor)&&"function"==typeof e.constructor.isBuffer&&e.constructor.isBuffer(e)}(e)?"buffer":"[object Set]"===t?"set":"[object WeakSet]"===t?"weakset":"[object Map]"===t?"map":"[object WeakMap]"===t?"weakmap":"[object Symbol]"===t?"symbol":"[object Int8Array]"===t?"int8array":"[object Uint8Array]"===t?"uint8array":"[object Uint8ClampedArray]"===t?"uint8clampedarray":"[object Int16Array]"===t?"int16array":"[object Uint16Array]"===t?"uint16array":"[object Int32Array]"===t?"int32array":"[object Uint32Array]"===t?"uint32array":"[object Float32Array]"===t?"float32array":"[object Float64Array]"===t?"float64array":"object"}function isObjectObject(e){return!0===function isObject(e){return"object"==typeof e&&null!==e}(e)&&"[object Object]"===Object.prototype.toString.call(e)}function cloneDeep(e,t){switch(typeOf(e)){case"object":return function cloneObjectDeep(e,t){if("function"==typeof t)return t(e);if(t||function isPlainObject(e){let t,r;return!1!==isObjectObject(e)&&(t=e.constructor,"function"==typeof t&&(r=t.prototype,!1!==isObjectObject(r)&&!1!==r.hasOwnProperty("isPrototypeOf")))}(e)){const r=new e.constructor;for(let i in e)r[i]=cloneDeep(e[i],t);return r}return e}(e,t);case"array":return function cloneArrayDeep(e,t){const r=new e.constructor(e.length);for(let i=0;i<e.length;i++)r[i]=cloneDeep(e[i],t);return r}(e,t);default:return clone(e)}}function clone$1(e){return function checkIsPrimitive(e){return Object(e)!==e}(e)?e:cloneDeep(e)}function defaultsConfig(e){if(!checkIsObjectLike(e))throw new TypeError("'Defaults' should be an object");return e}function defaultsData(e,t){return objectIsEmpty(e)||Object.keys(e).forEach(r=>{r in t&&void 0!==t[r]||(t[r]=e[r])}),t}function arrayGetUnique(e,t=!0){if(e.length<2)return e;let r=[...new Set(e)];if(r.includes(0)){const t=e.filter(e=>0===e);t.length>1&&t.some(e=>1/e===Number.NEGATIVE_INFINITY)&&r.push(-0)}if(r.filter(e=>"string"==typeof e).length){const t=e.filter(e=>"string"==typeof e);if(t.length>1){const e=[...new Set(t.map(e=>e.normalize()))];e.forEach(e=>{delete r[r.indexOf(e)]});const i=[];for(let e=0;e<r.length;e++)e in r&&i.push(r[e]);r=i.concat(e)}}return t?r.sort():r}function arrayIsEmpty(e){return 0===e.length}function definedConfig(e){if(!Array.isArray(e))throw new TypeError("'Defined' should be an array");return arrayIsEmpty(e)?[]:arrayGetUnique(e).map(e=>{if(!isString(e))throw new TypeError(`'Defined' expect array of strings. Value: '${jsonStringify(e)}'.`);return e})}function definedData(e,t){const r=definedConfig(e);return arrayIsEmpty(r)||r.forEach(e=>{if(!(e in t))throw new Error(`Field '${e}' must be defined.`);if(void 0===t[e])throw new Error(`Field '${e}' should have value.`)}),t}function isRegExp(e){return e instanceof RegExp}function excludeConfig(e){if(!Array.isArray(e))throw new TypeError("'Exclude' should be an array");return arrayIsEmpty(e)?[]:arrayGetUnique(e).map(e=>{if(!isString(e)&&!isRegExp(e))throw new TypeError(`'Exclude' expect array of strings or regular expressions. Value: '${jsonStringify(e)}'.`);return e})}function omitConfig(e){if(!Array.isArray(e))throw new TypeError("'Omit' should be an array");return arrayIsEmpty(e)?[]:arrayGetUnique(e).map(e=>{if(!isString(e))throw new TypeError(`'Omit' expect array of strings. Value: '${jsonStringify(e)}'.`);return e})}function orderConfig(e){if(!Array.isArray(e))throw new TypeError("'Order' should be an array");return arrayIsEmpty(e)?[]:arrayGetUnique(e,!1).map(e=>{if(!isString(e))throw new TypeError(`'Order' expect array of strings. Value: '${jsonStringify(e)}'.`);return e})}function objectKeysOrder(e,t=[],r=!1){if(!Array.isArray(t)||0===t.length)return e;const i=t.filter(e=>"string"==typeof e);let s=new Set(Object.keys(e));const a={};return i.forEach(t=>{s.delete(t),t in e&&(a[t]=e[t])}),s=[...s],r&&(s=s.sort((e,t)=>e.localeCompare(t))),s.forEach(t=>a[t]=e[t]),a}function pickConfig(e){if(!Array.isArray(e))throw new TypeError("'Pick' should be an array");return arrayIsEmpty(e)?[]:arrayGetUnique(e).map(e=>{if(!isString(e))throw new TypeError(`'Pick' expect array of strings. Value: '${jsonStringify(e)}'.`);return e})}function pickData(e,t){if(arrayIsEmpty(e))return t;const r={};return Object.keys(t).forEach(i=>{e.includes(i)&&(r[i]=t[i])}),r}function renameConfig(e){if(!checkIsObjectLike(e))throw new TypeError("'Rename' should be an object");if(objectIsEmpty(e))return{};Object.keys(e).forEach(e=>{if(!isString(e))throw new TypeError(`'Rename' expect object values to be strings. Not a string at key: '${e}'.`)});const t=Object.values(e),r=arrayGetUnique(t);if(t.length!==r.length)throw new TypeError(`'Rename' has similar values: '${jsonStringify(r)}'.`);return e}function renameData(e,t){if(objectIsEmpty(e))return t;const r=Object.keys(e).sort((e,t)=>e.localeCompare(t)),i={};return r.forEach(r=>{if(!(r in t))throw new Error(`Field '${r}' suppose to be renamed.`);i[e[r]]=t[r]}),r.forEach(e=>{delete t[e]}),Object.assign(t,i),t}function replaceConfig(e){if(!checkIsObjectLike(e))throw new TypeError("'Replace' should be an object");return e}function replaceData(e,t){return objectIsEmpty(e)||Object.keys(e).forEach(r=>{t[r]=e[r]}),t}function requiredConfig(e){if(!Array.isArray(e))throw new TypeError("'Required' should be an array");return arrayIsEmpty(e)?[]:arrayGetUnique(e).map(e=>{if(!isString(e))throw new TypeError(`'Required' expect array of strings. Value: '${jsonStringify(e)}'.`);return e})}function requiredData(e,t){return arrayIsEmpty(e)||e.forEach(e=>{if(!(e in t))throw new Error(`Field '${e}' is required.`)}),t}function transformConfig(e){if(!checkIsObjectLike(e))throw new TypeError("'Transform' should be an object");return objectIsEmpty(e)?{}:(Object.keys(e).forEach(t=>{if(!function checkIsCallable(e){return!!e&&(!!isFunction(e)||!!("toFunction"in e&&isFunction(e.toFunction)&&isFunction(e.toFunction())))}(e[t]))throw new TypeError(`'Transform' expect object values to be functions. Not a function at key: '${t}'.`)}),e)}function transformData(e,t){return objectIsEmpty(e)||Object.keys(e).forEach(r=>{if(!(r in t))throw new Error(`Field '${r}' suppose to be transformed.`);isFunction(e[r])?t[r]=e[r](t[r],r,clone$1(t)):t[r]=e[r].toFunction()(t[r],r,clone$1(t))}),t}class VicisParameter{constructor(){o.set(this,{writable:!0,value:void 0}),l.set(this,{writable:!0,value:void 0}),u.set(this,{writable:!0,value:void 0}),f.set(this,{writable:!0,value:!1}),h.set(this,{writable:!0,value:!1}),d.set(this,{writable:!0,value:void 0}),y.set(this,{writable:!0,value:void 0}),p.set(this,{writable:!0,value:void 0})}get boolean(){return _classPrivateFieldSet(this,o,r),this}get flag(){return _classPrivateFieldSet(this,o,i),this}get integer(){return _classPrivateFieldSet(this,o,a),this}get numeric(){return _classPrivateFieldSet(this,o,s),this}get string(){return _classPrivateFieldSet(this,o,n),this}get json(){return _classPrivateFieldSet(this,o,c),this}get defined(){return _classPrivateFieldSet(this,u,!0),this}get required(){return _classPrivateFieldSet(this,d,!0),this}replace(e){return _classPrivateFieldSet(this,p,e),_classPrivateFieldSet(this,h,!0),this}default(e){return _classPrivateFieldSet(this,l,e),_classPrivateFieldSet(this,f,!0),this}transform(e){return _classPrivateFieldSet(this,y,e),this}toObject(){return{cast:_classPrivateFieldGet(this,o),defaults:_classPrivateFieldGet(this,l),defined:_classPrivateFieldGet(this,u),hasDefaults:_classPrivateFieldGet(this,f),hasValue:_classPrivateFieldGet(this,h),required:_classPrivateFieldGet(this,d),transform:_classPrivateFieldGet(this,y),value:_classPrivateFieldGet(this,p)}}}var o=new WeakMap,l=new WeakMap,u=new WeakMap,f=new WeakMap,h=new WeakMap,d=new WeakMap,y=new WeakMap,p=new WeakMap;class ValidationError extends Error{constructor(e){super(e),this.name="ValidationError"}}class Vicis{constructor(e={},t){v.set(this,{writable:!0,value:{}}),b.set(this,{writable:!0,value:[]}),F.set(this,{writable:!0,value:[]}),g.set(this,{writable:!0,value:[]}),m.set(this,{writable:!0,value:[]}),P.set(this,{writable:!0,value:[]}),w.set(this,{writable:!0,value:[]}),_.set(this,{writable:!0,value:!1}),j.set(this,{writable:!0,value:{}}),S.set(this,{writable:!0,value:{}}),G.set(this,{writable:!0,value:[]}),E.set(this,{writable:!0,value:{}}),k.set(this,{writable:!0,value:{}}),O.set(this,{writable:!0,value:void 0}),I.set(this,{writable:!0,value:void 0}),x.set(this,{writable:!0,value:void 0}),_classPrivateFieldSet(this,I,function validateConfig(){const e=objectGetKeys(_classPrivateFieldGet(this,v)),t=objectGetKeys(_classPrivateFieldGet(this,j)),r=objectGetKeys(_classPrivateFieldGet(this,S)),i=objectGetKeys(_classPrivateFieldGet(this,E));if(arrayHasSame(_classPrivateFieldGet(this,m),e))throw new ValidationError(`'omit' has same keys as 'cast': ${arrayBasicIntersect(_classPrivateFieldGet(this,m),e)}.`);if(arrayHasSame(_classPrivateFieldGet(this,m),_classPrivateFieldGet(this,F)))throw new ValidationError(`'omit' has same keys as 'defined': ${arrayBasicIntersect(_classPrivateFieldGet(this,m),_classPrivateFieldGet(this,F))}.`);if(arrayHasSame(_classPrivateFieldGet(this,m),_classPrivateFieldGet(this,w)))throw new ValidationError(`'omit' has same keys as 'pick': ${arrayBasicIntersect(_classPrivateFieldGet(this,m),_classPrivateFieldGet(this,w))}.`);if(arrayHasSame(_classPrivateFieldGet(this,m),t))throw new ValidationError(`'omit' has same keys as 'rename': ${arrayBasicIntersect(_classPrivateFieldGet(this,m),t)}.`);if(arrayHasSame(_classPrivateFieldGet(this,m),r))throw new ValidationError(`'omit' has same keys as 'replace': ${arrayBasicIntersect(_classPrivateFieldGet(this,m),r)}.`);if(arrayHasSame(_classPrivateFieldGet(this,m),_classPrivateFieldGet(this,G)))throw new ValidationError(`'omit' has same keys as 'required': ${arrayBasicIntersect(_classPrivateFieldGet(this,m),_classPrivateFieldGet(this,G))}.`);if(arrayHasSame(_classPrivateFieldGet(this,m),i))throw new ValidationError(`'omit' has same keys as 'transform': ${arrayBasicIntersect(_classPrivateFieldGet(this,m),i)}.`);if(arrayHasSame(_classPrivateFieldGet(this,m),i))throw new ValidationError(`'omit' has same keys as 'transform': ${arrayBasicIntersect(_classPrivateFieldGet(this,m),i)}.`);if(arrayHasSame(e,r))throw new ValidationError(`'cast' has same keys as 'replace': ${arrayBasicIntersect(e,r)}.`);if(arrayHasSame(e,i))throw new ValidationError(`'cast' has same keys as 'transform': ${arrayBasicIntersect(e,i)}.`);if(arrayHasSame(r,i))throw new ValidationError(`'replace' has same keys as 'transform': ${arrayBasicIntersect(r,i)}.`);return this}.bind(this)),_classPrivateFieldSet(this,x,function validateData(){return void 0===_classPrivateFieldGet(this,O)||("toObject"in _classPrivateFieldGet(this,O)&&isFunction(_classPrivateFieldGet(this,O).toObject)?_classPrivateFieldSet(this,k,_classPrivateFieldGet(this,O).toObject()):"toJSON"in _classPrivateFieldGet(this,O)&&isFunction(_classPrivateFieldGet(this,O).toJSON)?_classPrivateFieldSet(this,k,_classPrivateFieldGet(this,O).toJSON()):_classPrivateFieldSet(this,k,_classPrivateFieldGet(this,O)),_classPrivateFieldSet(this,k,function omitData(e,t){if(arrayIsEmpty(e))return t;const r={};return Object.keys(t).forEach(i=>{e.includes(i)||(r[i]=t[i])}),r}(_classPrivateFieldGet(this,m),_classPrivateFieldGet(this,k))),_classPrivateFieldSet(this,k,requiredData(_classPrivateFieldGet(this,G),_classPrivateFieldGet(this,k))),_classPrivateFieldSet(this,k,definedData(_classPrivateFieldGet(this,F),_classPrivateFieldGet(this,k))),_classPrivateFieldSet(this,k,castData(_classPrivateFieldGet(this,v),_classPrivateFieldGet(this,k))),_classPrivateFieldSet(this,k,transformData(_classPrivateFieldGet(this,E),_classPrivateFieldGet(this,k))),_classPrivateFieldSet(this,k,replaceData(_classPrivateFieldGet(this,S),_classPrivateFieldGet(this,k))),_classPrivateFieldSet(this,k,renameData(_classPrivateFieldGet(this,j),_classPrivateFieldGet(this,k))),_classPrivateFieldSet(this,k,defaultsData(_classPrivateFieldGet(this,b),_classPrivateFieldGet(this,k))),_classPrivateFieldSet(this,k,pickData(_classPrivateFieldGet(this,w),_classPrivateFieldGet(this,k))),_classPrivateFieldSet(this,k,function excludeData(e,t){if(arrayIsEmpty(e))return t;const r=e.filter(isString);if(r.length&&Object.keys(t).forEach(e=>{r.includes(e)&&delete t[e]}),0===objectGetKeys(t).length)return t;const i=e.filter(isRegExp);return i.length&&i.forEach(e=>{Object.keys(t).forEach(r=>{e.test(r)&&delete t[r]})}),t}(_classPrivateFieldGet(this,g),_classPrivateFieldGet(this,k))),_classPrivateFieldSet(this,k,castToJson(_classPrivateFieldGet(this,k),_classPrivateFieldGet(this,_))),_classPrivateFieldSet(this,k,function orderData(e,t,r=!1){return arrayIsEmpty(e)?t:objectKeysOrder(t,e,r)}(_classPrivateFieldGet(this,P),_classPrivateFieldGet(this,k),_classPrivateFieldGet(this,_)))),this}.bind(this)),this.config(e),void 0!==t&&this.data(t)}static factory(e={},t){return new Vicis(e,t)}static from(e,t={}){return Vicis.factory(t,e).getData()}static fromArray(e,t={}){const r=Vicis.factory(t);return Array.from(e).map(e=>r.data(e).getData())}static get BOOLEAN(){return"boolean"}static get FLAG(){return"flag"}static get NUMERIC(){return"numeric"}static get INTEGER(){return"integer"}static get STRING(){return"string"}static get JSON(){return"json"}getConfig(){return clone$1({cast:_classPrivateFieldGet(this,v),defaults:_classPrivateFieldGet(this,b),defined:_classPrivateFieldGet(this,F),exclude:_classPrivateFieldGet(this,g),omit:_classPrivateFieldGet(this,m),order:_classPrivateFieldGet(this,P),pick:_classPrivateFieldGet(this,w),sort:_classPrivateFieldGet(this,_),rename:_classPrivateFieldGet(this,j),replace:_classPrivateFieldGet(this,S),required:_classPrivateFieldGet(this,G),transform:_classPrivateFieldGet(this,E)})}resetConfig(){return _classPrivateFieldSet(this,v,{}),_classPrivateFieldSet(this,b,{}),_classPrivateFieldSet(this,F,[]),_classPrivateFieldSet(this,g,[]),_classPrivateFieldSet(this,m,[]),_classPrivateFieldSet(this,P,[]),_classPrivateFieldSet(this,w,[]),_classPrivateFieldSet(this,_,!1),_classPrivateFieldSet(this,j,{}),_classPrivateFieldSet(this,S,{}),_classPrivateFieldSet(this,G,[]),_classPrivateFieldSet(this,E,{}),this}config(e={}){if(isFunction(e)&&(e=function convertFunctionToConfig(e){if(!isFunction(e))throw new TypeError("Callable must be a function");const t=e(new Proxy(new Object(null),{get:function(e,t){return t in e||(e[t]=new VicisParameter),e[t]}})),r={cast:{},defaults:{},defined:[],pick:[],required:[],replace:{},transform:{}};return Object.keys(t).forEach(e=>{r.pick.push(e);const i={};if(t[e]instanceof VicisParameter)i[e]=t[e].toObject();else{const r=new VicisParameter;r.replace(t[e]),i[e]=r.toObject()}delete t[e],i[e].cast&&(r.cast[e]=i[e].cast),i[e].defined&&r.defined.push(e),i[e].required&&r.required.push(e),i[e].transform&&(r.transform[e]=i[e].transform),i[e].hasDefaults&&(r.defaults[e]=i[e].defaults),i[e].hasValue&&(r.replace[e]=i[e].value)}),Object.keys(r.cast).length||delete r.cast,Object.keys(r.defaults).length||delete r.defaults,r.defined.length||delete r.defined,r.pick.length||delete r.pick,r.required.length||delete r.required,Object.keys(r.replace).length||delete r.replace,Object.keys(r.transform).length||delete r.transform,r}(e)),!checkIsObjectLike(e))throw new TypeError("Config should be an object");const r=function arrayGetDifference(e,t){const r=new Set(t);return e.filter(e=>!r.has(e))}(objectGetKeys(e),t);if(r.length)throw new TypeError(`Config has unknown fields: '${r.join("', '")}'.`);return this.resetConfig(),this.sort(e.sort),this.omit(e.omit),this.cast(e.cast),this.defined(e.defined),this.pick(e.pick),this.rename(e.rename),this.replace(e.replace),this.required(e.required),this.transform(e.transform),this.defaults(e.defaults),this.exclude(e.exclude),this.order(e.order),_classPrivateFieldGet(this,I).call(this),_classPrivateFieldGet(this,x).call(this),this}cast(e={}){return _classPrivateFieldSet(this,v,castConfig(e)),_classPrivateFieldGet(this,I).call(this),_classPrivateFieldGet(this,x).call(this),this}defaults(e={}){return _classPrivateFieldSet(this,b,defaultsConfig(e)),_classPrivateFieldGet(this,I).call(this),_classPrivateFieldGet(this,x).call(this),this}defined(e=[]){return _classPrivateFieldSet(this,F,definedConfig(e)),_classPrivateFieldGet(this,I).call(this),_classPrivateFieldGet(this,x).call(this),this}exclude(e=[]){return _classPrivateFieldSet(this,g,excludeConfig(e)),_classPrivateFieldGet(this,I).call(this),_classPrivateFieldGet(this,x).call(this),this}omit(e=[]){return _classPrivateFieldSet(this,m,omitConfig(e)),_classPrivateFieldGet(this,I).call(this),_classPrivateFieldGet(this,x).call(this),this}order(e=[]){return _classPrivateFieldSet(this,P,orderConfig(e)),_classPrivateFieldGet(this,I).call(this),_classPrivateFieldGet(this,x).call(this),this}pick(e=[]){return _classPrivateFieldSet(this,w,pickConfig(e)),_classPrivateFieldGet(this,I).call(this),_classPrivateFieldGet(this,x).call(this),this}rename(e={}){return _classPrivateFieldSet(this,j,renameConfig(e)),_classPrivateFieldGet(this,I).call(this),_classPrivateFieldGet(this,x).call(this),this}replace(e={}){return _classPrivateFieldSet(this,S,replaceConfig(e)),_classPrivateFieldGet(this,I).call(this),_classPrivateFieldGet(this,x).call(this),this}required(e=[]){return _classPrivateFieldSet(this,G,requiredConfig(e)),_classPrivateFieldGet(this,I).call(this),_classPrivateFieldGet(this,x).call(this),this}sort(e=!1){if("boolean"!=typeof e)throw new TypeError("'sort' should be a boolean");return _classPrivateFieldSet(this,_,e),_classPrivateFieldGet(this,x).call(this),this}transform(e={}){return _classPrivateFieldSet(this,E,transformConfig(e)),_classPrivateFieldGet(this,I).call(this),_classPrivateFieldGet(this,x).call(this),this}getData(){return clone$1(_classPrivateFieldGet(this,k))}data(e){if(!checkIsObjectLike(e))throw new TypeError("Data should be an object");return _classPrivateFieldSet(this,O,e),_classPrivateFieldGet(this,x).call(this),this}clear(){return _classPrivateFieldSet(this,k,{}),_classPrivateFieldSet(this,O,void 0),this}toJSON(){return this.getData()}toString(){return jsonStringify(this.toJSON())}fromArray(e){return Array.from(e).map(e=>this.data(e).toJSON())}}var v=new WeakMap,b=new WeakMap,F=new WeakMap,g=new WeakMap,m=new WeakMap,P=new WeakMap,w=new WeakMap,_=new WeakMap,j=new WeakMap,S=new WeakMap,G=new WeakMap,E=new WeakMap,k=new WeakMap,O=new WeakMap,I=new WeakMap,x=new WeakMap;exports.TYPES_ENUM=e,exports.Vicis=Vicis,exports.cast=function cast(e,t={}){const r=castConfig(t);return objectIsEmpty(r)?e:castData(r,e)},exports.defaults=function defaults(e,t={}){return objectIsEmpty(defaultsConfig(t))?e:defaultsData(t,e)},exports.defined=function defined(e,t=[]){return arrayIsEmpty(t)?e:definedData(t,e)},exports.exclude=function exclude(e,t=[]){const r=excludeConfig(t);if(arrayIsEmpty(r))return e;const i=r.filter(isString);if(i.length&&Object.keys(e).forEach(t=>{i.includes(t)&&delete e[t]}),0===objectGetKeys(e).length)return e;const s=r.filter(isRegExp);return s.length&&s.forEach(t=>{Object.keys(e).forEach(r=>{t.test(r)&&delete e[r]})}),e},exports.omit=function omit(e,t=[]){const r=omitConfig(t);if(arrayIsEmpty(r))return e;const i={};return Object.keys(e).forEach(t=>{r.includes(t)||(i[t]=e[t])}),i},exports.order=function order(e,t=[],r=!1){return arrayIsEmpty(orderConfig(t))?e:objectKeysOrder(e,t,r)},exports.pick=function pick(e,t=[]){const r=pickConfig(t);return arrayIsEmpty(r)?e:pickData(r,e)},exports.rename=function rename(e,t={}){const r=renameConfig(t);return objectIsEmpty(r)?e:renameData(r,e)},exports.replace=function replace(e,t={}){const r=replaceConfig(t);return objectIsEmpty(r)?e:replaceData(r,e)},exports.required=function required(e,t=[]){const r=requiredConfig(t);return arrayIsEmpty(r)?e:requiredData(r,e)},exports.transform=function transform(e,t={}){const r=transformConfig(t);return objectIsEmpty(r)?e:transformData(r,e)};
//# sourceMappingURL=vicis.cjs.map
