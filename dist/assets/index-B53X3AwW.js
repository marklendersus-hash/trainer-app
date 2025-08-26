(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function t(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function n(s){if(s.ep)return;s.ep=!0;const i=t(s);fetch(s.href,i)}})();let T={isLoggedIn:!1,spieler:[],trainingseinheiten:[],matchtage:[],feiertage:[],holidaysFetched:{},teamInfo:{name:"Mein Team",name2:"",emblemUrl:null,trainingSchedule:{}},currentPage:"login",currentId:null,currentDate:new Date,loading:!0,filter:"",sortBy:"name",sortAsc:!0,statsFilter:"matches",navigationStack:[],initialFormData:"",formationPlayers:{},showTrainingsOnHomeCalendar:!0,showMatchesOnHomeCalendar:!0,showGeburtstageOnHomeCalendar:!0,isModalOpen:!1,trainingListView:"all",matchtagListView:"all"};const oy=(r,e,t)=>{const{collection:n,doc:s}=t;window.spielerCollection=n(r,`artifacts/${e}/public/data/spieler`),window.trainingCollection=n(r,`artifacts/${e}/public/data/trainingseinheiten`),window.matchtageCollection=n(r,`artifacts/${e}/public/data/spieltage`),window.configDoc=s(r,`artifacts/${e}/public/data/config/team`)},ay=r=>{T.filter=r},cy=r=>{T.statsFilter=r},ly=r=>{T.sortBy===r?T.sortAsc=!T.sortAsc:(T.sortBy=r,r==="matches"||r==="training"?T.sortAsc=!1:T.sortAsc=!0)},uy=(r,e)=>{r==="trainings"?T.showTrainingsOnHomeCalendar=e:r==="matches"?T.showMatchesOnHomeCalendar=e:r==="geburtstage"&&(T.showGeburtstageOnHomeCalendar=e)},hy=r=>{T.trainingListView=r},dy=r=>{T.matchtagListView=r},fy=()=>{};var Th={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vf=function(r){const e=[];let t=0;for(let n=0;n<r.length;n++){let s=r.charCodeAt(n);s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):(s&64512)===55296&&n+1<r.length&&(r.charCodeAt(n+1)&64512)===56320?(s=65536+((s&1023)<<10)+(r.charCodeAt(++n)&1023),e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},gy=function(r){const e=[];let t=0,n=0;for(;t<r.length;){const s=r[t++];if(s<128)e[n++]=String.fromCharCode(s);else if(s>191&&s<224){const i=r[t++];e[n++]=String.fromCharCode((s&31)<<6|i&63)}else if(s>239&&s<365){const i=r[t++],o=r[t++],c=r[t++],l=((s&7)<<18|(i&63)<<12|(o&63)<<6|c&63)-65536;e[n++]=String.fromCharCode(55296+(l>>10)),e[n++]=String.fromCharCode(56320+(l&1023))}else{const i=r[t++],o=r[t++];e[n++]=String.fromCharCode((s&15)<<12|(i&63)<<6|o&63)}}return e.join("")},Tf={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(r,e){if(!Array.isArray(r))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,n=[];for(let s=0;s<r.length;s+=3){const i=r[s],o=s+1<r.length,c=o?r[s+1]:0,l=s+2<r.length,u=l?r[s+2]:0,f=i>>2,g=(i&3)<<4|c>>4;let p=(c&15)<<2|u>>6,E=u&63;l||(E=64,o||(p=64)),n.push(t[f],t[g],t[p],t[E])}return n.join("")},encodeString(r,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(r):this.encodeByteArray(vf(r),e)},decodeString(r,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(r):gy(this.decodeStringToByteArray(r,e))},decodeStringToByteArray(r,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,n=[];for(let s=0;s<r.length;){const i=t[r.charAt(s++)],c=s<r.length?t[r.charAt(s)]:0;++s;const u=s<r.length?t[r.charAt(s)]:64;++s;const g=s<r.length?t[r.charAt(s)]:64;if(++s,i==null||c==null||u==null||g==null)throw new my;const p=i<<2|c>>4;if(n.push(p),u!==64){const E=c<<4&240|u>>2;if(n.push(E),g!==64){const A=u<<6&192|g;n.push(A)}}}return n},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let r=0;r<this.ENCODED_VALS.length;r++)this.byteToCharMap_[r]=this.ENCODED_VALS.charAt(r),this.charToByteMap_[this.byteToCharMap_[r]]=r,this.byteToCharMapWebSafe_[r]=this.ENCODED_VALS_WEBSAFE.charAt(r),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[r]]=r,r>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(r)]=r,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(r)]=r)}}};class my extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const py=function(r){const e=vf(r);return Tf.encodeByteArray(e,!0)},ko=function(r){return py(r).replace(/\./g,"")},Ef=function(r){try{return Tf.decodeString(r,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Af(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _y=()=>Af().__FIREBASE_DEFAULTS__,yy=()=>{if(typeof process>"u"||typeof Th>"u")return;const r=Th.__FIREBASE_DEFAULTS__;if(r)return JSON.parse(r)},wy=()=>{if(typeof document>"u")return;let r;try{r=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=r&&Ef(r[1]);return e&&JSON.parse(e)},ra=()=>{try{return fy()||_y()||yy()||wy()}catch(r){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${r}`);return}},Sf=r=>ra()?.emulatorHosts?.[r],Iy=r=>{const e=Sf(r);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const n=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),n]:[e.substring(0,t),n]},Rf=()=>ra()?.config,Pf=r=>ra()?.[`_${r}`];/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class by{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,n)=>{t?this.reject(t):this.resolve(n),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,n))}}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ir(r){try{return(r.startsWith("http://")||r.startsWith("https://")?new URL(r).hostname:r).endsWith(".cloudworkstations.dev")}catch{return!1}}async function sl(r){return(await fetch(r,{credentials:"include"})).ok}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function vy(r,e){if(r.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},n=e||"demo-project",s=r.iat||0,i=r.sub||r.user_id;if(!i)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o={iss:`https://securetoken.google.com/${n}`,aud:n,iat:s,exp:s+3600,auth_time:s,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}},...r};return[ko(JSON.stringify(t)),ko(JSON.stringify(o)),""].join(".")}const qs={};function Ty(){const r={prod:[],emulator:[]};for(const e of Object.keys(qs))qs[e]?r.emulator.push(e):r.prod.push(e);return r}function Ey(r){let e=document.getElementById(r),t=!1;return e||(e=document.createElement("div"),e.setAttribute("id",r),t=!0),{created:t,element:e}}let Eh=!1;function xf(r,e){if(typeof window>"u"||typeof document>"u"||!ir(window.location.host)||qs[r]===e||qs[r]||Eh)return;qs[r]=e;function t(p){return`__firebase__banner__${p}`}const n="__firebase__banner",i=Ty().prod.length>0;function o(){const p=document.getElementById(n);p&&p.remove()}function c(p){p.style.display="flex",p.style.background="#7faaf0",p.style.position="fixed",p.style.bottom="5px",p.style.left="5px",p.style.padding=".5em",p.style.borderRadius="5px",p.style.alignItems="center"}function l(p,E){p.setAttribute("width","24"),p.setAttribute("id",E),p.setAttribute("height","24"),p.setAttribute("viewBox","0 0 24 24"),p.setAttribute("fill","none"),p.style.marginLeft="-6px"}function u(){const p=document.createElement("span");return p.style.cursor="pointer",p.style.marginLeft="16px",p.style.fontSize="24px",p.innerHTML=" &times;",p.onclick=()=>{Eh=!0,o()},p}function f(p,E){p.setAttribute("id",E),p.innerText="Learn more",p.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",p.setAttribute("target","__blank"),p.style.paddingLeft="5px",p.style.textDecoration="underline"}function g(){const p=Ey(n),E=t("text"),A=document.getElementById(E)||document.createElement("span"),D=t("learnmore"),k=document.getElementById(D)||document.createElement("a"),B=t("preprendIcon"),j=document.getElementById(B)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(p.created){const F=p.element;c(F),f(k,D);const Q=u();l(j,B),F.append(j,A,k,Q),document.body.appendChild(F)}i?(A.innerText="Preview backend disconnected.",j.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`):(j.innerHTML=`<g clip-path="url(#clip0_6083_34804)">
<path d="M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6083_34804">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`,A.innerText="Preview backend running in this workspace."),A.setAttribute("id",E)}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",g):g()}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Pe(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Ay(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Pe())}function Cf(){const r=ra()?.forceEnvironment;if(r==="node")return!0;if(r==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function Sy(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function Ry(){const r=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof r=="object"&&r.id!==void 0}function Py(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function xy(){const r=Pe();return r.indexOf("MSIE ")>=0||r.indexOf("Trident/")>=0}function Df(){return!Cf()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function kf(){return!Cf()&&!!navigator.userAgent&&(navigator.userAgent.includes("Safari")||navigator.userAgent.includes("WebKit"))&&!navigator.userAgent.includes("Chrome")}function Vf(){try{return typeof indexedDB=="object"}catch{return!1}}function Cy(){return new Promise((r,e)=>{try{let t=!0;const n="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(n);s.onsuccess=()=>{s.result.close(),t||self.indexedDB.deleteDatabase(n),r(!0)},s.onupgradeneeded=()=>{t=!1},s.onerror=()=>{e(s.error?.message||"")}}catch(t){e(t)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Dy="FirebaseError";class Ut extends Error{constructor(e,t,n){super(t),this.code=e,this.customData=n,this.name=Dy,Object.setPrototypeOf(this,Ut.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,yi.prototype.create)}}class yi{constructor(e,t,n){this.service=e,this.serviceName=t,this.errors=n}create(e,...t){const n=t[0]||{},s=`${this.service}/${e}`,i=this.errors[e],o=i?ky(i,n):"Error",c=`${this.serviceName}: ${o} (${s}).`;return new Ut(s,c,n)}}function ky(r,e){return r.replace(Vy,(t,n)=>{const s=e[n];return s!=null?String(s):`<${n}?>`})}const Vy=/\{\$([^}]+)}/g;function Ny(r){for(const e in r)if(Object.prototype.hasOwnProperty.call(r,e))return!1;return!0}function dt(r,e){if(r===e)return!0;const t=Object.keys(r),n=Object.keys(e);for(const s of t){if(!n.includes(s))return!1;const i=r[s],o=e[s];if(Ah(i)&&Ah(o)){if(!dt(i,o))return!1}else if(i!==o)return!1}for(const s of n)if(!t.includes(s))return!1;return!0}function Ah(r){return r!==null&&typeof r=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wi(r){const e=[];for(const[t,n]of Object.entries(r))Array.isArray(n)?n.forEach(s=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(n));return e.length?"&"+e.join("&"):""}function My(r,e){const t=new Oy(r,e);return t.subscribe.bind(t)}class Oy{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(n=>{this.error(n)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,n){let s;if(e===void 0&&t===void 0&&n===void 0)throw new Error("Missing Observer.");Ly(e,["next","error","complete"])?s=e:s={next:e,error:t,complete:n},s.next===void 0&&(s.next=sc),s.error===void 0&&(s.error=sc),s.complete===void 0&&(s.complete=sc);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),i}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(n){typeof console<"u"&&console.error&&console.error(n)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function Ly(r,e){if(typeof r!="object"||r===null)return!1;for(const t of e)if(t in r&&typeof r[t]=="function")return!0;return!1}function sc(){}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pe(r){return r&&r._delegate?r._delegate:r}class Wn{constructor(e,t,n){this.name=e,this.instanceFactory=t,this.type=n,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Mn="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fy{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const n=new by;if(this.instancesDeferred.set(t,n),this.isInitialized(t)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:t});s&&n.resolve(s)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){const t=this.normalizeInstanceIdentifier(e?.identifier),n=e?.optional??!1;if(this.isInitialized(t)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:t})}catch(s){if(n)return null;throw s}else{if(n)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(By(e))try{this.getOrInitializeService({instanceIdentifier:Mn})}catch{}for(const[t,n]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(t);try{const i=this.getOrInitializeService({instanceIdentifier:s});n.resolve(i)}catch{}}}}clearInstance(e=Mn){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Mn){return this.instances.has(e)}getOptions(e=Mn){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,n=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(n))throw Error(`${this.name}(${n}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:n,options:t});for(const[i,o]of this.instancesDeferred.entries()){const c=this.normalizeInstanceIdentifier(i);n===c&&o.resolve(s)}return s}onInit(e,t){const n=this.normalizeInstanceIdentifier(t),s=this.onInitCallbacks.get(n)??new Set;s.add(e),this.onInitCallbacks.set(n,s);const i=this.instances.get(n);return i&&e(i,n),()=>{s.delete(e)}}invokeOnInitCallbacks(e,t){const n=this.onInitCallbacks.get(t);if(n)for(const s of n)try{s(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let n=this.instances.get(e);if(!n&&this.component&&(n=this.component.instanceFactory(this.container,{instanceIdentifier:Uy(e),options:t}),this.instances.set(e,n),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(n,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,n)}catch{}return n||null}normalizeInstanceIdentifier(e=Mn){return this.component?this.component.multipleInstances?e:Mn:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Uy(r){return r===Mn?void 0:r}function By(r){return r.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $y{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new Fy(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var X;(function(r){r[r.DEBUG=0]="DEBUG",r[r.VERBOSE=1]="VERBOSE",r[r.INFO=2]="INFO",r[r.WARN=3]="WARN",r[r.ERROR=4]="ERROR",r[r.SILENT=5]="SILENT"})(X||(X={}));const qy={debug:X.DEBUG,verbose:X.VERBOSE,info:X.INFO,warn:X.WARN,error:X.ERROR,silent:X.SILENT},jy=X.INFO,zy={[X.DEBUG]:"log",[X.VERBOSE]:"log",[X.INFO]:"info",[X.WARN]:"warn",[X.ERROR]:"error"},Gy=(r,e,...t)=>{if(e<r.logLevel)return;const n=new Date().toISOString(),s=zy[e];if(s)console[s](`[${n}]  ${r.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class il{constructor(e){this.name=e,this._logLevel=jy,this._logHandler=Gy,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in X))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?qy[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,X.DEBUG,...e),this._logHandler(this,X.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,X.VERBOSE,...e),this._logHandler(this,X.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,X.INFO,...e),this._logHandler(this,X.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,X.WARN,...e),this._logHandler(this,X.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,X.ERROR,...e),this._logHandler(this,X.ERROR,...e)}}const Ky=(r,e)=>e.some(t=>r instanceof t);let Sh,Rh;function Hy(){return Sh||(Sh=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Wy(){return Rh||(Rh=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Nf=new WeakMap,bc=new WeakMap,Mf=new WeakMap,ic=new WeakMap,ol=new WeakMap;function Qy(r){const e=new Promise((t,n)=>{const s=()=>{r.removeEventListener("success",i),r.removeEventListener("error",o)},i=()=>{t(ln(r.result)),s()},o=()=>{n(r.error),s()};r.addEventListener("success",i),r.addEventListener("error",o)});return e.then(t=>{t instanceof IDBCursor&&Nf.set(t,r)}).catch(()=>{}),ol.set(e,r),e}function Jy(r){if(bc.has(r))return;const e=new Promise((t,n)=>{const s=()=>{r.removeEventListener("complete",i),r.removeEventListener("error",o),r.removeEventListener("abort",o)},i=()=>{t(),s()},o=()=>{n(r.error||new DOMException("AbortError","AbortError")),s()};r.addEventListener("complete",i),r.addEventListener("error",o),r.addEventListener("abort",o)});bc.set(r,e)}let vc={get(r,e,t){if(r instanceof IDBTransaction){if(e==="done")return bc.get(r);if(e==="objectStoreNames")return r.objectStoreNames||Mf.get(r);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return ln(r[e])},set(r,e,t){return r[e]=t,!0},has(r,e){return r instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in r}};function Yy(r){vc=r(vc)}function Xy(r){return r===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const n=r.call(oc(this),e,...t);return Mf.set(n,e.sort?e.sort():[e]),ln(n)}:Wy().includes(r)?function(...e){return r.apply(oc(this),e),ln(Nf.get(this))}:function(...e){return ln(r.apply(oc(this),e))}}function Zy(r){return typeof r=="function"?Xy(r):(r instanceof IDBTransaction&&Jy(r),Ky(r,Hy())?new Proxy(r,vc):r)}function ln(r){if(r instanceof IDBRequest)return Qy(r);if(ic.has(r))return ic.get(r);const e=Zy(r);return e!==r&&(ic.set(r,e),ol.set(e,r)),e}const oc=r=>ol.get(r);function ew(r,e,{blocked:t,upgrade:n,blocking:s,terminated:i}={}){const o=indexedDB.open(r,e),c=ln(o);return n&&o.addEventListener("upgradeneeded",l=>{n(ln(o.result),l.oldVersion,l.newVersion,ln(o.transaction),l)}),t&&o.addEventListener("blocked",l=>t(l.oldVersion,l.newVersion,l)),c.then(l=>{i&&l.addEventListener("close",()=>i()),s&&l.addEventListener("versionchange",u=>s(u.oldVersion,u.newVersion,u))}).catch(()=>{}),c}const tw=["get","getKey","getAll","getAllKeys","count"],nw=["put","add","delete","clear"],ac=new Map;function Ph(r,e){if(!(r instanceof IDBDatabase&&!(e in r)&&typeof e=="string"))return;if(ac.get(e))return ac.get(e);const t=e.replace(/FromIndex$/,""),n=e!==t,s=nw.includes(t);if(!(t in(n?IDBIndex:IDBObjectStore).prototype)||!(s||tw.includes(t)))return;const i=async function(o,...c){const l=this.transaction(o,s?"readwrite":"readonly");let u=l.store;return n&&(u=u.index(c.shift())),(await Promise.all([u[t](...c),s&&l.done]))[0]};return ac.set(e,i),i}Yy(r=>({...r,get:(e,t,n)=>Ph(e,t)||r.get(e,t,n),has:(e,t)=>!!Ph(e,t)||r.has(e,t)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rw{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(sw(t)){const n=t.getImmediate();return`${n.library}/${n.version}`}else return null}).filter(t=>t).join(" ")}}function sw(r){return r.getComponent()?.type==="VERSION"}const Tc="@firebase/app",xh="0.14.1";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vt=new il("@firebase/app"),iw="@firebase/app-compat",ow="@firebase/analytics-compat",aw="@firebase/analytics",cw="@firebase/app-check-compat",lw="@firebase/app-check",uw="@firebase/auth",hw="@firebase/auth-compat",dw="@firebase/database",fw="@firebase/data-connect",gw="@firebase/database-compat",mw="@firebase/functions",pw="@firebase/functions-compat",_w="@firebase/installations",yw="@firebase/installations-compat",ww="@firebase/messaging",Iw="@firebase/messaging-compat",bw="@firebase/performance",vw="@firebase/performance-compat",Tw="@firebase/remote-config",Ew="@firebase/remote-config-compat",Aw="@firebase/storage",Sw="@firebase/storage-compat",Rw="@firebase/firestore",Pw="@firebase/ai",xw="@firebase/firestore-compat",Cw="firebase",Dw="12.1.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vo="[DEFAULT]",kw={[Tc]:"fire-core",[iw]:"fire-core-compat",[aw]:"fire-analytics",[ow]:"fire-analytics-compat",[lw]:"fire-app-check",[cw]:"fire-app-check-compat",[uw]:"fire-auth",[hw]:"fire-auth-compat",[dw]:"fire-rtdb",[fw]:"fire-data-connect",[gw]:"fire-rtdb-compat",[mw]:"fire-fn",[pw]:"fire-fn-compat",[_w]:"fire-iid",[yw]:"fire-iid-compat",[ww]:"fire-fcm",[Iw]:"fire-fcm-compat",[bw]:"fire-perf",[vw]:"fire-perf-compat",[Tw]:"fire-rc",[Ew]:"fire-rc-compat",[Aw]:"fire-gcs",[Sw]:"fire-gcs-compat",[Rw]:"fire-fst",[xw]:"fire-fst-compat",[Pw]:"fire-vertex","fire-js":"fire-js",[Cw]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const No=new Map,Vw=new Map,Ec=new Map;function Ch(r,e){try{r.container.addComponent(e)}catch(t){Vt.debug(`Component ${e.name} failed to register with FirebaseApp ${r.name}`,t)}}function Vr(r){const e=r.name;if(Ec.has(e))return Vt.debug(`There were multiple attempts to register component ${e}.`),!1;Ec.set(e,r);for(const t of No.values())Ch(t,r);for(const t of Vw.values())Ch(t,r);return!0}function Ii(r,e){const t=r.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),r.container.getProvider(e)}function Nw(r,e,t=Vo){Ii(r,e).clearInstance(t)}function st(r){return r==null?!1:r.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Mw={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},un=new yi("app","Firebase",Mw);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ow{constructor(e,t,n){this._isDeleted=!1,this._options={...e},this._config={...t},this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=n,this.container.addComponent(new Wn("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw un.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ts=Dw;function Of(r,e={}){let t=r;typeof e!="object"&&(e={name:e});const n={name:Vo,automaticDataCollectionEnabled:!0,...e},s=n.name;if(typeof s!="string"||!s)throw un.create("bad-app-name",{appName:String(s)});if(t||(t=Rf()),!t)throw un.create("no-options");const i=No.get(s);if(i){if(dt(t,i.options)&&dt(n,i.config))return i;throw un.create("duplicate-app",{appName:s})}const o=new $y(s);for(const l of Ec.values())o.addComponent(l);const c=new Ow(t,n,o);return No.set(s,c),c}function Lf(r=Vo){const e=No.get(r);if(!e&&r===Vo&&Rf())return Of();if(!e)throw un.create("no-app",{appName:r});return e}function hn(r,e,t){let n=kw[r]??r;t&&(n+=`-${t}`);const s=n.match(/\s|\//),i=e.match(/\s|\//);if(s||i){const o=[`Unable to register library "${n}" with version "${e}":`];s&&o.push(`library name "${n}" contains illegal characters (whitespace or "/")`),s&&i&&o.push("and"),i&&o.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Vt.warn(o.join(" "));return}Vr(new Wn(`${n}-version`,()=>({library:n,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Lw="firebase-heartbeat-database",Fw=1,Zs="firebase-heartbeat-store";let cc=null;function Ff(){return cc||(cc=ew(Lw,Fw,{upgrade:(r,e)=>{switch(e){case 0:try{r.createObjectStore(Zs)}catch(t){console.warn(t)}}}}).catch(r=>{throw un.create("idb-open",{originalErrorMessage:r.message})})),cc}async function Uw(r){try{const t=(await Ff()).transaction(Zs),n=await t.objectStore(Zs).get(Uf(r));return await t.done,n}catch(e){if(e instanceof Ut)Vt.warn(e.message);else{const t=un.create("idb-get",{originalErrorMessage:e?.message});Vt.warn(t.message)}}}async function Dh(r,e){try{const n=(await Ff()).transaction(Zs,"readwrite");await n.objectStore(Zs).put(e,Uf(r)),await n.done}catch(t){if(t instanceof Ut)Vt.warn(t.message);else{const n=un.create("idb-set",{originalErrorMessage:t?.message});Vt.warn(n.message)}}}function Uf(r){return`${r.name}!${r.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Bw=1024,$w=30;class qw{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new zw(t),this._heartbeatsCachePromise=this._storage.read().then(n=>(this._heartbeatsCache=n,n))}async triggerHeartbeat(){try{const t=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),n=kh();if(this._heartbeatsCache?.heartbeats==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null)||this._heartbeatsCache.lastSentHeartbeatDate===n||this._heartbeatsCache.heartbeats.some(s=>s.date===n))return;if(this._heartbeatsCache.heartbeats.push({date:n,agent:t}),this._heartbeatsCache.heartbeats.length>$w){const s=Gw(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(s,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(e){Vt.warn(e)}}async getHeartbeatsHeader(){try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null||this._heartbeatsCache.heartbeats.length===0)return"";const e=kh(),{heartbeatsToSend:t,unsentEntries:n}=jw(this._heartbeatsCache.heartbeats),s=ko(JSON.stringify({version:2,heartbeats:t}));return this._heartbeatsCache.lastSentHeartbeatDate=e,n.length>0?(this._heartbeatsCache.heartbeats=n,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}catch(e){return Vt.warn(e),""}}}function kh(){return new Date().toISOString().substring(0,10)}function jw(r,e=Bw){const t=[];let n=r.slice();for(const s of r){const i=t.find(o=>o.agent===s.agent);if(i){if(i.dates.push(s.date),Vh(t)>e){i.dates.pop();break}}else if(t.push({agent:s.agent,dates:[s.date]}),Vh(t)>e){t.pop();break}n=n.slice(1)}return{heartbeatsToSend:t,unsentEntries:n}}class zw{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Vf()?Cy().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await Uw(this.app);return t?.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const n=await this.read();return Dh(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??n.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const n=await this.read();return Dh(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??n.lastSentHeartbeatDate,heartbeats:[...n.heartbeats,...e.heartbeats]})}else return}}function Vh(r){return ko(JSON.stringify({version:2,heartbeats:r})).length}function Gw(r){if(r.length===0)return-1;let e=0,t=r[0].date;for(let n=1;n<r.length;n++)r[n].date<t&&(t=r[n].date,e=n);return e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Kw(r){Vr(new Wn("platform-logger",e=>new rw(e),"PRIVATE")),Vr(new Wn("heartbeat",e=>new qw(e),"PRIVATE")),hn(Tc,xh,r),hn(Tc,xh,"esm2020"),hn("fire-js","")}Kw("");var Hw="firebase",Ww="12.1.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */hn(Hw,Ww,"app");var Nh=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var dn,Bf;(function(){var r;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(w,_){function y(){}y.prototype=_.prototype,w.D=_.prototype,w.prototype=new y,w.prototype.constructor=w,w.C=function(v,b,S){for(var I=Array(arguments.length-2),Et=2;Et<arguments.length;Et++)I[Et-2]=arguments[Et];return _.prototype[b].apply(v,I)}}function t(){this.blockSize=-1}function n(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(n,t),n.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(w,_,y){y||(y=0);var v=Array(16);if(typeof _=="string")for(var b=0;16>b;++b)v[b]=_.charCodeAt(y++)|_.charCodeAt(y++)<<8|_.charCodeAt(y++)<<16|_.charCodeAt(y++)<<24;else for(b=0;16>b;++b)v[b]=_[y++]|_[y++]<<8|_[y++]<<16|_[y++]<<24;_=w.g[0],y=w.g[1],b=w.g[2];var S=w.g[3],I=_+(S^y&(b^S))+v[0]+3614090360&4294967295;_=y+(I<<7&4294967295|I>>>25),I=S+(b^_&(y^b))+v[1]+3905402710&4294967295,S=_+(I<<12&4294967295|I>>>20),I=b+(y^S&(_^y))+v[2]+606105819&4294967295,b=S+(I<<17&4294967295|I>>>15),I=y+(_^b&(S^_))+v[3]+3250441966&4294967295,y=b+(I<<22&4294967295|I>>>10),I=_+(S^y&(b^S))+v[4]+4118548399&4294967295,_=y+(I<<7&4294967295|I>>>25),I=S+(b^_&(y^b))+v[5]+1200080426&4294967295,S=_+(I<<12&4294967295|I>>>20),I=b+(y^S&(_^y))+v[6]+2821735955&4294967295,b=S+(I<<17&4294967295|I>>>15),I=y+(_^b&(S^_))+v[7]+4249261313&4294967295,y=b+(I<<22&4294967295|I>>>10),I=_+(S^y&(b^S))+v[8]+1770035416&4294967295,_=y+(I<<7&4294967295|I>>>25),I=S+(b^_&(y^b))+v[9]+2336552879&4294967295,S=_+(I<<12&4294967295|I>>>20),I=b+(y^S&(_^y))+v[10]+4294925233&4294967295,b=S+(I<<17&4294967295|I>>>15),I=y+(_^b&(S^_))+v[11]+2304563134&4294967295,y=b+(I<<22&4294967295|I>>>10),I=_+(S^y&(b^S))+v[12]+1804603682&4294967295,_=y+(I<<7&4294967295|I>>>25),I=S+(b^_&(y^b))+v[13]+4254626195&4294967295,S=_+(I<<12&4294967295|I>>>20),I=b+(y^S&(_^y))+v[14]+2792965006&4294967295,b=S+(I<<17&4294967295|I>>>15),I=y+(_^b&(S^_))+v[15]+1236535329&4294967295,y=b+(I<<22&4294967295|I>>>10),I=_+(b^S&(y^b))+v[1]+4129170786&4294967295,_=y+(I<<5&4294967295|I>>>27),I=S+(y^b&(_^y))+v[6]+3225465664&4294967295,S=_+(I<<9&4294967295|I>>>23),I=b+(_^y&(S^_))+v[11]+643717713&4294967295,b=S+(I<<14&4294967295|I>>>18),I=y+(S^_&(b^S))+v[0]+3921069994&4294967295,y=b+(I<<20&4294967295|I>>>12),I=_+(b^S&(y^b))+v[5]+3593408605&4294967295,_=y+(I<<5&4294967295|I>>>27),I=S+(y^b&(_^y))+v[10]+38016083&4294967295,S=_+(I<<9&4294967295|I>>>23),I=b+(_^y&(S^_))+v[15]+3634488961&4294967295,b=S+(I<<14&4294967295|I>>>18),I=y+(S^_&(b^S))+v[4]+3889429448&4294967295,y=b+(I<<20&4294967295|I>>>12),I=_+(b^S&(y^b))+v[9]+568446438&4294967295,_=y+(I<<5&4294967295|I>>>27),I=S+(y^b&(_^y))+v[14]+3275163606&4294967295,S=_+(I<<9&4294967295|I>>>23),I=b+(_^y&(S^_))+v[3]+4107603335&4294967295,b=S+(I<<14&4294967295|I>>>18),I=y+(S^_&(b^S))+v[8]+1163531501&4294967295,y=b+(I<<20&4294967295|I>>>12),I=_+(b^S&(y^b))+v[13]+2850285829&4294967295,_=y+(I<<5&4294967295|I>>>27),I=S+(y^b&(_^y))+v[2]+4243563512&4294967295,S=_+(I<<9&4294967295|I>>>23),I=b+(_^y&(S^_))+v[7]+1735328473&4294967295,b=S+(I<<14&4294967295|I>>>18),I=y+(S^_&(b^S))+v[12]+2368359562&4294967295,y=b+(I<<20&4294967295|I>>>12),I=_+(y^b^S)+v[5]+4294588738&4294967295,_=y+(I<<4&4294967295|I>>>28),I=S+(_^y^b)+v[8]+2272392833&4294967295,S=_+(I<<11&4294967295|I>>>21),I=b+(S^_^y)+v[11]+1839030562&4294967295,b=S+(I<<16&4294967295|I>>>16),I=y+(b^S^_)+v[14]+4259657740&4294967295,y=b+(I<<23&4294967295|I>>>9),I=_+(y^b^S)+v[1]+2763975236&4294967295,_=y+(I<<4&4294967295|I>>>28),I=S+(_^y^b)+v[4]+1272893353&4294967295,S=_+(I<<11&4294967295|I>>>21),I=b+(S^_^y)+v[7]+4139469664&4294967295,b=S+(I<<16&4294967295|I>>>16),I=y+(b^S^_)+v[10]+3200236656&4294967295,y=b+(I<<23&4294967295|I>>>9),I=_+(y^b^S)+v[13]+681279174&4294967295,_=y+(I<<4&4294967295|I>>>28),I=S+(_^y^b)+v[0]+3936430074&4294967295,S=_+(I<<11&4294967295|I>>>21),I=b+(S^_^y)+v[3]+3572445317&4294967295,b=S+(I<<16&4294967295|I>>>16),I=y+(b^S^_)+v[6]+76029189&4294967295,y=b+(I<<23&4294967295|I>>>9),I=_+(y^b^S)+v[9]+3654602809&4294967295,_=y+(I<<4&4294967295|I>>>28),I=S+(_^y^b)+v[12]+3873151461&4294967295,S=_+(I<<11&4294967295|I>>>21),I=b+(S^_^y)+v[15]+530742520&4294967295,b=S+(I<<16&4294967295|I>>>16),I=y+(b^S^_)+v[2]+3299628645&4294967295,y=b+(I<<23&4294967295|I>>>9),I=_+(b^(y|~S))+v[0]+4096336452&4294967295,_=y+(I<<6&4294967295|I>>>26),I=S+(y^(_|~b))+v[7]+1126891415&4294967295,S=_+(I<<10&4294967295|I>>>22),I=b+(_^(S|~y))+v[14]+2878612391&4294967295,b=S+(I<<15&4294967295|I>>>17),I=y+(S^(b|~_))+v[5]+4237533241&4294967295,y=b+(I<<21&4294967295|I>>>11),I=_+(b^(y|~S))+v[12]+1700485571&4294967295,_=y+(I<<6&4294967295|I>>>26),I=S+(y^(_|~b))+v[3]+2399980690&4294967295,S=_+(I<<10&4294967295|I>>>22),I=b+(_^(S|~y))+v[10]+4293915773&4294967295,b=S+(I<<15&4294967295|I>>>17),I=y+(S^(b|~_))+v[1]+2240044497&4294967295,y=b+(I<<21&4294967295|I>>>11),I=_+(b^(y|~S))+v[8]+1873313359&4294967295,_=y+(I<<6&4294967295|I>>>26),I=S+(y^(_|~b))+v[15]+4264355552&4294967295,S=_+(I<<10&4294967295|I>>>22),I=b+(_^(S|~y))+v[6]+2734768916&4294967295,b=S+(I<<15&4294967295|I>>>17),I=y+(S^(b|~_))+v[13]+1309151649&4294967295,y=b+(I<<21&4294967295|I>>>11),I=_+(b^(y|~S))+v[4]+4149444226&4294967295,_=y+(I<<6&4294967295|I>>>26),I=S+(y^(_|~b))+v[11]+3174756917&4294967295,S=_+(I<<10&4294967295|I>>>22),I=b+(_^(S|~y))+v[2]+718787259&4294967295,b=S+(I<<15&4294967295|I>>>17),I=y+(S^(b|~_))+v[9]+3951481745&4294967295,w.g[0]=w.g[0]+_&4294967295,w.g[1]=w.g[1]+(b+(I<<21&4294967295|I>>>11))&4294967295,w.g[2]=w.g[2]+b&4294967295,w.g[3]=w.g[3]+S&4294967295}n.prototype.u=function(w,_){_===void 0&&(_=w.length);for(var y=_-this.blockSize,v=this.B,b=this.h,S=0;S<_;){if(b==0)for(;S<=y;)s(this,w,S),S+=this.blockSize;if(typeof w=="string"){for(;S<_;)if(v[b++]=w.charCodeAt(S++),b==this.blockSize){s(this,v),b=0;break}}else for(;S<_;)if(v[b++]=w[S++],b==this.blockSize){s(this,v),b=0;break}}this.h=b,this.o+=_},n.prototype.v=function(){var w=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);w[0]=128;for(var _=1;_<w.length-8;++_)w[_]=0;var y=8*this.o;for(_=w.length-8;_<w.length;++_)w[_]=y&255,y/=256;for(this.u(w),w=Array(16),_=y=0;4>_;++_)for(var v=0;32>v;v+=8)w[y++]=this.g[_]>>>v&255;return w};function i(w,_){var y=c;return Object.prototype.hasOwnProperty.call(y,w)?y[w]:y[w]=_(w)}function o(w,_){this.h=_;for(var y=[],v=!0,b=w.length-1;0<=b;b--){var S=w[b]|0;v&&S==_||(y[b]=S,v=!1)}this.g=y}var c={};function l(w){return-128<=w&&128>w?i(w,function(_){return new o([_|0],0>_?-1:0)}):new o([w|0],0>w?-1:0)}function u(w){if(isNaN(w)||!isFinite(w))return g;if(0>w)return k(u(-w));for(var _=[],y=1,v=0;w>=y;v++)_[v]=w/y|0,y*=4294967296;return new o(_,0)}function f(w,_){if(w.length==0)throw Error("number format error: empty string");if(_=_||10,2>_||36<_)throw Error("radix out of range: "+_);if(w.charAt(0)=="-")return k(f(w.substring(1),_));if(0<=w.indexOf("-"))throw Error('number format error: interior "-" character');for(var y=u(Math.pow(_,8)),v=g,b=0;b<w.length;b+=8){var S=Math.min(8,w.length-b),I=parseInt(w.substring(b,b+S),_);8>S?(S=u(Math.pow(_,S)),v=v.j(S).add(u(I))):(v=v.j(y),v=v.add(u(I)))}return v}var g=l(0),p=l(1),E=l(16777216);r=o.prototype,r.m=function(){if(D(this))return-k(this).m();for(var w=0,_=1,y=0;y<this.g.length;y++){var v=this.i(y);w+=(0<=v?v:4294967296+v)*_,_*=4294967296}return w},r.toString=function(w){if(w=w||10,2>w||36<w)throw Error("radix out of range: "+w);if(A(this))return"0";if(D(this))return"-"+k(this).toString(w);for(var _=u(Math.pow(w,6)),y=this,v="";;){var b=Q(y,_).g;y=B(y,b.j(_));var S=((0<y.g.length?y.g[0]:y.h)>>>0).toString(w);if(y=b,A(y))return S+v;for(;6>S.length;)S="0"+S;v=S+v}},r.i=function(w){return 0>w?0:w<this.g.length?this.g[w]:this.h};function A(w){if(w.h!=0)return!1;for(var _=0;_<w.g.length;_++)if(w.g[_]!=0)return!1;return!0}function D(w){return w.h==-1}r.l=function(w){return w=B(this,w),D(w)?-1:A(w)?0:1};function k(w){for(var _=w.g.length,y=[],v=0;v<_;v++)y[v]=~w.g[v];return new o(y,~w.h).add(p)}r.abs=function(){return D(this)?k(this):this},r.add=function(w){for(var _=Math.max(this.g.length,w.g.length),y=[],v=0,b=0;b<=_;b++){var S=v+(this.i(b)&65535)+(w.i(b)&65535),I=(S>>>16)+(this.i(b)>>>16)+(w.i(b)>>>16);v=I>>>16,S&=65535,I&=65535,y[b]=I<<16|S}return new o(y,y[y.length-1]&-2147483648?-1:0)};function B(w,_){return w.add(k(_))}r.j=function(w){if(A(this)||A(w))return g;if(D(this))return D(w)?k(this).j(k(w)):k(k(this).j(w));if(D(w))return k(this.j(k(w)));if(0>this.l(E)&&0>w.l(E))return u(this.m()*w.m());for(var _=this.g.length+w.g.length,y=[],v=0;v<2*_;v++)y[v]=0;for(v=0;v<this.g.length;v++)for(var b=0;b<w.g.length;b++){var S=this.i(v)>>>16,I=this.i(v)&65535,Et=w.i(b)>>>16,ps=w.i(b)&65535;y[2*v+2*b]+=I*ps,j(y,2*v+2*b),y[2*v+2*b+1]+=S*ps,j(y,2*v+2*b+1),y[2*v+2*b+1]+=I*Et,j(y,2*v+2*b+1),y[2*v+2*b+2]+=S*Et,j(y,2*v+2*b+2)}for(v=0;v<_;v++)y[v]=y[2*v+1]<<16|y[2*v];for(v=_;v<2*_;v++)y[v]=0;return new o(y,0)};function j(w,_){for(;(w[_]&65535)!=w[_];)w[_+1]+=w[_]>>>16,w[_]&=65535,_++}function F(w,_){this.g=w,this.h=_}function Q(w,_){if(A(_))throw Error("division by zero");if(A(w))return new F(g,g);if(D(w))return _=Q(k(w),_),new F(k(_.g),k(_.h));if(D(_))return _=Q(w,k(_)),new F(k(_.g),_.h);if(30<w.g.length){if(D(w)||D(_))throw Error("slowDivide_ only works with positive integers.");for(var y=p,v=_;0>=v.l(w);)y=te(y),v=te(v);var b=U(y,1),S=U(v,1);for(v=U(v,2),y=U(y,2);!A(v);){var I=S.add(v);0>=I.l(w)&&(b=b.add(y),S=I),v=U(v,1),y=U(y,1)}return _=B(w,b.j(_)),new F(b,_)}for(b=g;0<=w.l(_);){for(y=Math.max(1,Math.floor(w.m()/_.m())),v=Math.ceil(Math.log(y)/Math.LN2),v=48>=v?1:Math.pow(2,v-48),S=u(y),I=S.j(_);D(I)||0<I.l(w);)y-=v,S=u(y),I=S.j(_);A(S)&&(S=p),b=b.add(S),w=B(w,I)}return new F(b,w)}r.A=function(w){return Q(this,w).h},r.and=function(w){for(var _=Math.max(this.g.length,w.g.length),y=[],v=0;v<_;v++)y[v]=this.i(v)&w.i(v);return new o(y,this.h&w.h)},r.or=function(w){for(var _=Math.max(this.g.length,w.g.length),y=[],v=0;v<_;v++)y[v]=this.i(v)|w.i(v);return new o(y,this.h|w.h)},r.xor=function(w){for(var _=Math.max(this.g.length,w.g.length),y=[],v=0;v<_;v++)y[v]=this.i(v)^w.i(v);return new o(y,this.h^w.h)};function te(w){for(var _=w.g.length+1,y=[],v=0;v<_;v++)y[v]=w.i(v)<<1|w.i(v-1)>>>31;return new o(y,w.h)}function U(w,_){var y=_>>5;_%=32;for(var v=w.g.length-y,b=[],S=0;S<v;S++)b[S]=0<_?w.i(S+y)>>>_|w.i(S+y+1)<<32-_:w.i(S+y);return new o(b,w.h)}n.prototype.digest=n.prototype.v,n.prototype.reset=n.prototype.s,n.prototype.update=n.prototype.u,Bf=n,o.prototype.add=o.prototype.add,o.prototype.multiply=o.prototype.j,o.prototype.modulo=o.prototype.A,o.prototype.compare=o.prototype.l,o.prototype.toNumber=o.prototype.m,o.prototype.toString=o.prototype.toString,o.prototype.getBits=o.prototype.i,o.fromNumber=u,o.fromString=f,dn=o}).apply(typeof Nh<"u"?Nh:typeof self<"u"?self:typeof window<"u"?window:{});var oo=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var $f,Fs,qf,yo,Ac,jf,zf,Gf;(function(){var r,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(a,h,d){return a==Array.prototype||a==Object.prototype||(a[h]=d.value),a};function t(a){a=[typeof globalThis=="object"&&globalThis,a,typeof window=="object"&&window,typeof self=="object"&&self,typeof oo=="object"&&oo];for(var h=0;h<a.length;++h){var d=a[h];if(d&&d.Math==Math)return d}throw Error("Cannot find global object")}var n=t(this);function s(a,h){if(h)e:{var d=n;a=a.split(".");for(var m=0;m<a.length-1;m++){var P=a[m];if(!(P in d))break e;d=d[P]}a=a[a.length-1],m=d[a],h=h(m),h!=m&&h!=null&&e(d,a,{configurable:!0,writable:!0,value:h})}}function i(a,h){a instanceof String&&(a+="");var d=0,m=!1,P={next:function(){if(!m&&d<a.length){var C=d++;return{value:h(C,a[C]),done:!1}}return m=!0,{done:!0,value:void 0}}};return P[Symbol.iterator]=function(){return P},P}s("Array.prototype.values",function(a){return a||function(){return i(this,function(h,d){return d})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var o=o||{},c=this||self;function l(a){var h=typeof a;return h=h!="object"?h:a?Array.isArray(a)?"array":h:"null",h=="array"||h=="object"&&typeof a.length=="number"}function u(a){var h=typeof a;return h=="object"&&a!=null||h=="function"}function f(a,h,d){return a.call.apply(a.bind,arguments)}function g(a,h,d){if(!a)throw Error();if(2<arguments.length){var m=Array.prototype.slice.call(arguments,2);return function(){var P=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(P,m),a.apply(h,P)}}return function(){return a.apply(h,arguments)}}function p(a,h,d){return p=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?f:g,p.apply(null,arguments)}function E(a,h){var d=Array.prototype.slice.call(arguments,1);return function(){var m=d.slice();return m.push.apply(m,arguments),a.apply(this,m)}}function A(a,h){function d(){}d.prototype=h.prototype,a.aa=h.prototype,a.prototype=new d,a.prototype.constructor=a,a.Qb=function(m,P,C){for(var L=Array(arguments.length-2),ue=2;ue<arguments.length;ue++)L[ue-2]=arguments[ue];return h.prototype[P].apply(m,L)}}function D(a){const h=a.length;if(0<h){const d=Array(h);for(let m=0;m<h;m++)d[m]=a[m];return d}return[]}function k(a,h){for(let d=1;d<arguments.length;d++){const m=arguments[d];if(l(m)){const P=a.length||0,C=m.length||0;a.length=P+C;for(let L=0;L<C;L++)a[P+L]=m[L]}else a.push(m)}}class B{constructor(h,d){this.i=h,this.j=d,this.h=0,this.g=null}get(){let h;return 0<this.h?(this.h--,h=this.g,this.g=h.next,h.next=null):h=this.i(),h}}function j(a){return/^[\s\xa0]*$/.test(a)}function F(){var a=c.navigator;return a&&(a=a.userAgent)?a:""}function Q(a){return Q[" "](a),a}Q[" "]=function(){};var te=F().indexOf("Gecko")!=-1&&!(F().toLowerCase().indexOf("webkit")!=-1&&F().indexOf("Edge")==-1)&&!(F().indexOf("Trident")!=-1||F().indexOf("MSIE")!=-1)&&F().indexOf("Edge")==-1;function U(a,h,d){for(const m in a)h.call(d,a[m],m,a)}function w(a,h){for(const d in a)h.call(void 0,a[d],d,a)}function _(a){const h={};for(const d in a)h[d]=a[d];return h}const y="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function v(a,h){let d,m;for(let P=1;P<arguments.length;P++){m=arguments[P];for(d in m)a[d]=m[d];for(let C=0;C<y.length;C++)d=y[C],Object.prototype.hasOwnProperty.call(m,d)&&(a[d]=m[d])}}function b(a){var h=1;a=a.split(":");const d=[];for(;0<h&&a.length;)d.push(a.shift()),h--;return a.length&&d.push(a.join(":")),d}function S(a){c.setTimeout(()=>{throw a},0)}function I(){var a=Na;let h=null;return a.g&&(h=a.g,a.g=a.g.next,a.g||(a.h=null),h.next=null),h}class Et{constructor(){this.h=this.g=null}add(h,d){const m=ps.get();m.set(h,d),this.h?this.h.next=m:this.g=m,this.h=m}}var ps=new B(()=>new A_,a=>a.reset());class A_{constructor(){this.next=this.g=this.h=null}set(h,d){this.h=h,this.g=d,this.next=null}reset(){this.next=this.g=this.h=null}}let _s,ys=!1,Na=new Et,Tu=()=>{const a=c.Promise.resolve(void 0);_s=()=>{a.then(S_)}};var S_=()=>{for(var a;a=I();){try{a.h.call(a.g)}catch(d){S(d)}var h=ps;h.j(a),100>h.h&&(h.h++,a.next=h.g,h.g=a)}ys=!1};function Kt(){this.s=this.s,this.C=this.C}Kt.prototype.s=!1,Kt.prototype.ma=function(){this.s||(this.s=!0,this.N())},Kt.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function Le(a,h){this.type=a,this.g=this.target=h,this.defaultPrevented=!1}Le.prototype.h=function(){this.defaultPrevented=!0};var R_=(function(){if(!c.addEventListener||!Object.defineProperty)return!1;var a=!1,h=Object.defineProperty({},"passive",{get:function(){a=!0}});try{const d=()=>{};c.addEventListener("test",d,h),c.removeEventListener("test",d,h)}catch{}return a})();function ws(a,h){if(Le.call(this,a?a.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,a){var d=this.type=a.type,m=a.changedTouches&&a.changedTouches.length?a.changedTouches[0]:null;if(this.target=a.target||a.srcElement,this.g=h,h=a.relatedTarget){if(te){e:{try{Q(h.nodeName);var P=!0;break e}catch{}P=!1}P||(h=null)}}else d=="mouseover"?h=a.fromElement:d=="mouseout"&&(h=a.toElement);this.relatedTarget=h,m?(this.clientX=m.clientX!==void 0?m.clientX:m.pageX,this.clientY=m.clientY!==void 0?m.clientY:m.pageY,this.screenX=m.screenX||0,this.screenY=m.screenY||0):(this.clientX=a.clientX!==void 0?a.clientX:a.pageX,this.clientY=a.clientY!==void 0?a.clientY:a.pageY,this.screenX=a.screenX||0,this.screenY=a.screenY||0),this.button=a.button,this.key=a.key||"",this.ctrlKey=a.ctrlKey,this.altKey=a.altKey,this.shiftKey=a.shiftKey,this.metaKey=a.metaKey,this.pointerId=a.pointerId||0,this.pointerType=typeof a.pointerType=="string"?a.pointerType:P_[a.pointerType]||"",this.state=a.state,this.i=a,a.defaultPrevented&&ws.aa.h.call(this)}}A(ws,Le);var P_={2:"touch",3:"pen",4:"mouse"};ws.prototype.h=function(){ws.aa.h.call(this);var a=this.i;a.preventDefault?a.preventDefault():a.returnValue=!1};var $i="closure_listenable_"+(1e6*Math.random()|0),x_=0;function C_(a,h,d,m,P){this.listener=a,this.proxy=null,this.src=h,this.type=d,this.capture=!!m,this.ha=P,this.key=++x_,this.da=this.fa=!1}function qi(a){a.da=!0,a.listener=null,a.proxy=null,a.src=null,a.ha=null}function ji(a){this.src=a,this.g={},this.h=0}ji.prototype.add=function(a,h,d,m,P){var C=a.toString();a=this.g[C],a||(a=this.g[C]=[],this.h++);var L=Oa(a,h,m,P);return-1<L?(h=a[L],d||(h.fa=!1)):(h=new C_(h,this.src,C,!!m,P),h.fa=d,a.push(h)),h};function Ma(a,h){var d=h.type;if(d in a.g){var m=a.g[d],P=Array.prototype.indexOf.call(m,h,void 0),C;(C=0<=P)&&Array.prototype.splice.call(m,P,1),C&&(qi(h),a.g[d].length==0&&(delete a.g[d],a.h--))}}function Oa(a,h,d,m){for(var P=0;P<a.length;++P){var C=a[P];if(!C.da&&C.listener==h&&C.capture==!!d&&C.ha==m)return P}return-1}var La="closure_lm_"+(1e6*Math.random()|0),Fa={};function Eu(a,h,d,m,P){if(Array.isArray(h)){for(var C=0;C<h.length;C++)Eu(a,h[C],d,m,P);return null}return d=Ru(d),a&&a[$i]?a.K(h,d,u(m)?!!m.capture:!1,P):D_(a,h,d,!1,m,P)}function D_(a,h,d,m,P,C){if(!h)throw Error("Invalid event type");var L=u(P)?!!P.capture:!!P,ue=Ba(a);if(ue||(a[La]=ue=new ji(a)),d=ue.add(h,d,m,L,C),d.proxy)return d;if(m=k_(),d.proxy=m,m.src=a,m.listener=d,a.addEventListener)R_||(P=L),P===void 0&&(P=!1),a.addEventListener(h.toString(),m,P);else if(a.attachEvent)a.attachEvent(Su(h.toString()),m);else if(a.addListener&&a.removeListener)a.addListener(m);else throw Error("addEventListener and attachEvent are unavailable.");return d}function k_(){function a(d){return h.call(a.src,a.listener,d)}const h=V_;return a}function Au(a,h,d,m,P){if(Array.isArray(h))for(var C=0;C<h.length;C++)Au(a,h[C],d,m,P);else m=u(m)?!!m.capture:!!m,d=Ru(d),a&&a[$i]?(a=a.i,h=String(h).toString(),h in a.g&&(C=a.g[h],d=Oa(C,d,m,P),-1<d&&(qi(C[d]),Array.prototype.splice.call(C,d,1),C.length==0&&(delete a.g[h],a.h--)))):a&&(a=Ba(a))&&(h=a.g[h.toString()],a=-1,h&&(a=Oa(h,d,m,P)),(d=-1<a?h[a]:null)&&Ua(d))}function Ua(a){if(typeof a!="number"&&a&&!a.da){var h=a.src;if(h&&h[$i])Ma(h.i,a);else{var d=a.type,m=a.proxy;h.removeEventListener?h.removeEventListener(d,m,a.capture):h.detachEvent?h.detachEvent(Su(d),m):h.addListener&&h.removeListener&&h.removeListener(m),(d=Ba(h))?(Ma(d,a),d.h==0&&(d.src=null,h[La]=null)):qi(a)}}}function Su(a){return a in Fa?Fa[a]:Fa[a]="on"+a}function V_(a,h){if(a.da)a=!0;else{h=new ws(h,this);var d=a.listener,m=a.ha||a.src;a.fa&&Ua(a),a=d.call(m,h)}return a}function Ba(a){return a=a[La],a instanceof ji?a:null}var $a="__closure_events_fn_"+(1e9*Math.random()>>>0);function Ru(a){return typeof a=="function"?a:(a[$a]||(a[$a]=function(h){return a.handleEvent(h)}),a[$a])}function Fe(){Kt.call(this),this.i=new ji(this),this.M=this,this.F=null}A(Fe,Kt),Fe.prototype[$i]=!0,Fe.prototype.removeEventListener=function(a,h,d,m){Au(this,a,h,d,m)};function Ke(a,h){var d,m=a.F;if(m)for(d=[];m;m=m.F)d.push(m);if(a=a.M,m=h.type||h,typeof h=="string")h=new Le(h,a);else if(h instanceof Le)h.target=h.target||a;else{var P=h;h=new Le(m,a),v(h,P)}if(P=!0,d)for(var C=d.length-1;0<=C;C--){var L=h.g=d[C];P=zi(L,m,!0,h)&&P}if(L=h.g=a,P=zi(L,m,!0,h)&&P,P=zi(L,m,!1,h)&&P,d)for(C=0;C<d.length;C++)L=h.g=d[C],P=zi(L,m,!1,h)&&P}Fe.prototype.N=function(){if(Fe.aa.N.call(this),this.i){var a=this.i,h;for(h in a.g){for(var d=a.g[h],m=0;m<d.length;m++)qi(d[m]);delete a.g[h],a.h--}}this.F=null},Fe.prototype.K=function(a,h,d,m){return this.i.add(String(a),h,!1,d,m)},Fe.prototype.L=function(a,h,d,m){return this.i.add(String(a),h,!0,d,m)};function zi(a,h,d,m){if(h=a.i.g[String(h)],!h)return!0;h=h.concat();for(var P=!0,C=0;C<h.length;++C){var L=h[C];if(L&&!L.da&&L.capture==d){var ue=L.listener,Ne=L.ha||L.src;L.fa&&Ma(a.i,L),P=ue.call(Ne,m)!==!1&&P}}return P&&!m.defaultPrevented}function Pu(a,h,d){if(typeof a=="function")d&&(a=p(a,d));else if(a&&typeof a.handleEvent=="function")a=p(a.handleEvent,a);else throw Error("Invalid listener argument");return 2147483647<Number(h)?-1:c.setTimeout(a,h||0)}function xu(a){a.g=Pu(()=>{a.g=null,a.i&&(a.i=!1,xu(a))},a.l);const h=a.h;a.h=null,a.m.apply(null,h)}class N_ extends Kt{constructor(h,d){super(),this.m=h,this.l=d,this.h=null,this.i=!1,this.g=null}j(h){this.h=arguments,this.g?this.i=!0:xu(this)}N(){super.N(),this.g&&(c.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function Is(a){Kt.call(this),this.h=a,this.g={}}A(Is,Kt);var Cu=[];function Du(a){U(a.g,function(h,d){this.g.hasOwnProperty(d)&&Ua(h)},a),a.g={}}Is.prototype.N=function(){Is.aa.N.call(this),Du(this)},Is.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var qa=c.JSON.stringify,M_=c.JSON.parse,O_=class{stringify(a){return c.JSON.stringify(a,void 0)}parse(a){return c.JSON.parse(a,void 0)}};function ja(){}ja.prototype.h=null;function ku(a){return a.h||(a.h=a.i())}function Vu(){}var bs={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function za(){Le.call(this,"d")}A(za,Le);function Ga(){Le.call(this,"c")}A(Ga,Le);var Cn={},Nu=null;function Gi(){return Nu=Nu||new Fe}Cn.La="serverreachability";function Mu(a){Le.call(this,Cn.La,a)}A(Mu,Le);function vs(a){const h=Gi();Ke(h,new Mu(h))}Cn.STAT_EVENT="statevent";function Ou(a,h){Le.call(this,Cn.STAT_EVENT,a),this.stat=h}A(Ou,Le);function He(a){const h=Gi();Ke(h,new Ou(h,a))}Cn.Ma="timingevent";function Lu(a,h){Le.call(this,Cn.Ma,a),this.size=h}A(Lu,Le);function Ts(a,h){if(typeof a!="function")throw Error("Fn must not be null and must be a function");return c.setTimeout(function(){a()},h)}function Es(){this.g=!0}Es.prototype.xa=function(){this.g=!1};function L_(a,h,d,m,P,C){a.info(function(){if(a.g)if(C)for(var L="",ue=C.split("&"),Ne=0;Ne<ue.length;Ne++){var ne=ue[Ne].split("=");if(1<ne.length){var Ue=ne[0];ne=ne[1];var Be=Ue.split("_");L=2<=Be.length&&Be[1]=="type"?L+(Ue+"="+ne+"&"):L+(Ue+"=redacted&")}}else L=null;else L=C;return"XMLHTTP REQ ("+m+") [attempt "+P+"]: "+h+`
`+d+`
`+L})}function F_(a,h,d,m,P,C,L){a.info(function(){return"XMLHTTP RESP ("+m+") [ attempt "+P+"]: "+h+`
`+d+`
`+C+" "+L})}function dr(a,h,d,m){a.info(function(){return"XMLHTTP TEXT ("+h+"): "+B_(a,d)+(m?" "+m:"")})}function U_(a,h){a.info(function(){return"TIMEOUT: "+h})}Es.prototype.info=function(){};function B_(a,h){if(!a.g)return h;if(!h)return null;try{var d=JSON.parse(h);if(d){for(a=0;a<d.length;a++)if(Array.isArray(d[a])){var m=d[a];if(!(2>m.length)){var P=m[1];if(Array.isArray(P)&&!(1>P.length)){var C=P[0];if(C!="noop"&&C!="stop"&&C!="close")for(var L=1;L<P.length;L++)P[L]=""}}}}return qa(d)}catch{return h}}var Ki={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},Fu={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},Ka;function Hi(){}A(Hi,ja),Hi.prototype.g=function(){return new XMLHttpRequest},Hi.prototype.i=function(){return{}},Ka=new Hi;function Ht(a,h,d,m){this.j=a,this.i=h,this.l=d,this.R=m||1,this.U=new Is(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new Uu}function Uu(){this.i=null,this.g="",this.h=!1}var Bu={},Ha={};function Wa(a,h,d){a.L=1,a.v=Yi(At(h)),a.m=d,a.P=!0,$u(a,null)}function $u(a,h){a.F=Date.now(),Wi(a),a.A=At(a.v);var d=a.A,m=a.R;Array.isArray(m)||(m=[String(m)]),th(d.i,"t",m),a.C=0,d=a.j.J,a.h=new Uu,a.g=wh(a.j,d?h:null,!a.m),0<a.O&&(a.M=new N_(p(a.Y,a,a.g),a.O)),h=a.U,d=a.g,m=a.ca;var P="readystatechange";Array.isArray(P)||(P&&(Cu[0]=P.toString()),P=Cu);for(var C=0;C<P.length;C++){var L=Eu(d,P[C],m||h.handleEvent,!1,h.h||h);if(!L)break;h.g[L.key]=L}h=a.H?_(a.H):{},a.m?(a.u||(a.u="POST"),h["Content-Type"]="application/x-www-form-urlencoded",a.g.ea(a.A,a.u,a.m,h)):(a.u="GET",a.g.ea(a.A,a.u,null,h)),vs(),L_(a.i,a.u,a.A,a.l,a.R,a.m)}Ht.prototype.ca=function(a){a=a.target;const h=this.M;h&&St(a)==3?h.j():this.Y(a)},Ht.prototype.Y=function(a){try{if(a==this.g)e:{const Be=St(this.g);var h=this.g.Ba();const mr=this.g.Z();if(!(3>Be)&&(Be!=3||this.g&&(this.h.h||this.g.oa()||ch(this.g)))){this.J||Be!=4||h==7||(h==8||0>=mr?vs(3):vs(2)),Qa(this);var d=this.g.Z();this.X=d;t:if(qu(this)){var m=ch(this.g);a="";var P=m.length,C=St(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){Dn(this),As(this);var L="";break t}this.h.i=new c.TextDecoder}for(h=0;h<P;h++)this.h.h=!0,a+=this.h.i.decode(m[h],{stream:!(C&&h==P-1)});m.length=0,this.h.g+=a,this.C=0,L=this.h.g}else L=this.g.oa();if(this.o=d==200,F_(this.i,this.u,this.A,this.l,this.R,Be,d),this.o){if(this.T&&!this.K){t:{if(this.g){var ue,Ne=this.g;if((ue=Ne.g?Ne.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!j(ue)){var ne=ue;break t}}ne=null}if(d=ne)dr(this.i,this.l,d,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,Ja(this,d);else{this.o=!1,this.s=3,He(12),Dn(this),As(this);break e}}if(this.P){d=!0;let at;for(;!this.J&&this.C<L.length;)if(at=$_(this,L),at==Ha){Be==4&&(this.s=4,He(14),d=!1),dr(this.i,this.l,null,"[Incomplete Response]");break}else if(at==Bu){this.s=4,He(15),dr(this.i,this.l,L,"[Invalid Chunk]"),d=!1;break}else dr(this.i,this.l,at,null),Ja(this,at);if(qu(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),Be!=4||L.length!=0||this.h.h||(this.s=1,He(16),d=!1),this.o=this.o&&d,!d)dr(this.i,this.l,L,"[Invalid Chunked Response]"),Dn(this),As(this);else if(0<L.length&&!this.W){this.W=!0;var Ue=this.j;Ue.g==this&&Ue.ba&&!Ue.M&&(Ue.j.info("Great, no buffering proxy detected. Bytes received: "+L.length),nc(Ue),Ue.M=!0,He(11))}}else dr(this.i,this.l,L,null),Ja(this,L);Be==4&&Dn(this),this.o&&!this.J&&(Be==4?mh(this.j,this):(this.o=!1,Wi(this)))}else sy(this.g),d==400&&0<L.indexOf("Unknown SID")?(this.s=3,He(12)):(this.s=0,He(13)),Dn(this),As(this)}}}catch{}finally{}};function qu(a){return a.g?a.u=="GET"&&a.L!=2&&a.j.Ca:!1}function $_(a,h){var d=a.C,m=h.indexOf(`
`,d);return m==-1?Ha:(d=Number(h.substring(d,m)),isNaN(d)?Bu:(m+=1,m+d>h.length?Ha:(h=h.slice(m,m+d),a.C=m+d,h)))}Ht.prototype.cancel=function(){this.J=!0,Dn(this)};function Wi(a){a.S=Date.now()+a.I,ju(a,a.I)}function ju(a,h){if(a.B!=null)throw Error("WatchDog timer not null");a.B=Ts(p(a.ba,a),h)}function Qa(a){a.B&&(c.clearTimeout(a.B),a.B=null)}Ht.prototype.ba=function(){this.B=null;const a=Date.now();0<=a-this.S?(U_(this.i,this.A),this.L!=2&&(vs(),He(17)),Dn(this),this.s=2,As(this)):ju(this,this.S-a)};function As(a){a.j.G==0||a.J||mh(a.j,a)}function Dn(a){Qa(a);var h=a.M;h&&typeof h.ma=="function"&&h.ma(),a.M=null,Du(a.U),a.g&&(h=a.g,a.g=null,h.abort(),h.ma())}function Ja(a,h){try{var d=a.j;if(d.G!=0&&(d.g==a||Ya(d.h,a))){if(!a.K&&Ya(d.h,a)&&d.G==3){try{var m=d.Da.g.parse(h)}catch{m=null}if(Array.isArray(m)&&m.length==3){var P=m;if(P[0]==0){e:if(!d.u){if(d.g)if(d.g.F+3e3<a.F)ro(d),to(d);else break e;tc(d),He(18)}}else d.za=P[1],0<d.za-d.T&&37500>P[2]&&d.F&&d.v==0&&!d.C&&(d.C=Ts(p(d.Za,d),6e3));if(1>=Ku(d.h)&&d.ca){try{d.ca()}catch{}d.ca=void 0}}else Vn(d,11)}else if((a.K||d.g==a)&&ro(d),!j(h))for(P=d.Da.g.parse(h),h=0;h<P.length;h++){let ne=P[h];if(d.T=ne[0],ne=ne[1],d.G==2)if(ne[0]=="c"){d.K=ne[1],d.ia=ne[2];const Ue=ne[3];Ue!=null&&(d.la=Ue,d.j.info("VER="+d.la));const Be=ne[4];Be!=null&&(d.Aa=Be,d.j.info("SVER="+d.Aa));const mr=ne[5];mr!=null&&typeof mr=="number"&&0<mr&&(m=1.5*mr,d.L=m,d.j.info("backChannelRequestTimeoutMs_="+m)),m=d;const at=a.g;if(at){const io=at.g?at.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(io){var C=m.h;C.g||io.indexOf("spdy")==-1&&io.indexOf("quic")==-1&&io.indexOf("h2")==-1||(C.j=C.l,C.g=new Set,C.h&&(Xa(C,C.h),C.h=null))}if(m.D){const rc=at.g?at.g.getResponseHeader("X-HTTP-Session-Id"):null;rc&&(m.ya=rc,de(m.I,m.D,rc))}}d.G=3,d.l&&d.l.ua(),d.ba&&(d.R=Date.now()-a.F,d.j.info("Handshake RTT: "+d.R+"ms")),m=d;var L=a;if(m.qa=yh(m,m.J?m.ia:null,m.W),L.K){Hu(m.h,L);var ue=L,Ne=m.L;Ne&&(ue.I=Ne),ue.B&&(Qa(ue),Wi(ue)),m.g=L}else fh(m);0<d.i.length&&no(d)}else ne[0]!="stop"&&ne[0]!="close"||Vn(d,7);else d.G==3&&(ne[0]=="stop"||ne[0]=="close"?ne[0]=="stop"?Vn(d,7):ec(d):ne[0]!="noop"&&d.l&&d.l.ta(ne),d.v=0)}}vs(4)}catch{}}var q_=class{constructor(a,h){this.g=a,this.map=h}};function zu(a){this.l=a||10,c.PerformanceNavigationTiming?(a=c.performance.getEntriesByType("navigation"),a=0<a.length&&(a[0].nextHopProtocol=="hq"||a[0].nextHopProtocol=="h2")):a=!!(c.chrome&&c.chrome.loadTimes&&c.chrome.loadTimes()&&c.chrome.loadTimes().wasFetchedViaSpdy),this.j=a?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function Gu(a){return a.h?!0:a.g?a.g.size>=a.j:!1}function Ku(a){return a.h?1:a.g?a.g.size:0}function Ya(a,h){return a.h?a.h==h:a.g?a.g.has(h):!1}function Xa(a,h){a.g?a.g.add(h):a.h=h}function Hu(a,h){a.h&&a.h==h?a.h=null:a.g&&a.g.has(h)&&a.g.delete(h)}zu.prototype.cancel=function(){if(this.i=Wu(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const a of this.g.values())a.cancel();this.g.clear()}};function Wu(a){if(a.h!=null)return a.i.concat(a.h.D);if(a.g!=null&&a.g.size!==0){let h=a.i;for(const d of a.g.values())h=h.concat(d.D);return h}return D(a.i)}function j_(a){if(a.V&&typeof a.V=="function")return a.V();if(typeof Map<"u"&&a instanceof Map||typeof Set<"u"&&a instanceof Set)return Array.from(a.values());if(typeof a=="string")return a.split("");if(l(a)){for(var h=[],d=a.length,m=0;m<d;m++)h.push(a[m]);return h}h=[],d=0;for(m in a)h[d++]=a[m];return h}function z_(a){if(a.na&&typeof a.na=="function")return a.na();if(!a.V||typeof a.V!="function"){if(typeof Map<"u"&&a instanceof Map)return Array.from(a.keys());if(!(typeof Set<"u"&&a instanceof Set)){if(l(a)||typeof a=="string"){var h=[];a=a.length;for(var d=0;d<a;d++)h.push(d);return h}h=[],d=0;for(const m in a)h[d++]=m;return h}}}function Qu(a,h){if(a.forEach&&typeof a.forEach=="function")a.forEach(h,void 0);else if(l(a)||typeof a=="string")Array.prototype.forEach.call(a,h,void 0);else for(var d=z_(a),m=j_(a),P=m.length,C=0;C<P;C++)h.call(void 0,m[C],d&&d[C],a)}var Ju=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function G_(a,h){if(a){a=a.split("&");for(var d=0;d<a.length;d++){var m=a[d].indexOf("="),P=null;if(0<=m){var C=a[d].substring(0,m);P=a[d].substring(m+1)}else C=a[d];h(C,P?decodeURIComponent(P.replace(/\+/g," ")):"")}}}function kn(a){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,a instanceof kn){this.h=a.h,Qi(this,a.j),this.o=a.o,this.g=a.g,Ji(this,a.s),this.l=a.l;var h=a.i,d=new Ps;d.i=h.i,h.g&&(d.g=new Map(h.g),d.h=h.h),Yu(this,d),this.m=a.m}else a&&(h=String(a).match(Ju))?(this.h=!1,Qi(this,h[1]||"",!0),this.o=Ss(h[2]||""),this.g=Ss(h[3]||"",!0),Ji(this,h[4]),this.l=Ss(h[5]||"",!0),Yu(this,h[6]||"",!0),this.m=Ss(h[7]||"")):(this.h=!1,this.i=new Ps(null,this.h))}kn.prototype.toString=function(){var a=[],h=this.j;h&&a.push(Rs(h,Xu,!0),":");var d=this.g;return(d||h=="file")&&(a.push("//"),(h=this.o)&&a.push(Rs(h,Xu,!0),"@"),a.push(encodeURIComponent(String(d)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),d=this.s,d!=null&&a.push(":",String(d))),(d=this.l)&&(this.g&&d.charAt(0)!="/"&&a.push("/"),a.push(Rs(d,d.charAt(0)=="/"?W_:H_,!0))),(d=this.i.toString())&&a.push("?",d),(d=this.m)&&a.push("#",Rs(d,J_)),a.join("")};function At(a){return new kn(a)}function Qi(a,h,d){a.j=d?Ss(h,!0):h,a.j&&(a.j=a.j.replace(/:$/,""))}function Ji(a,h){if(h){if(h=Number(h),isNaN(h)||0>h)throw Error("Bad port number "+h);a.s=h}else a.s=null}function Yu(a,h,d){h instanceof Ps?(a.i=h,Y_(a.i,a.h)):(d||(h=Rs(h,Q_)),a.i=new Ps(h,a.h))}function de(a,h,d){a.i.set(h,d)}function Yi(a){return de(a,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),a}function Ss(a,h){return a?h?decodeURI(a.replace(/%25/g,"%2525")):decodeURIComponent(a):""}function Rs(a,h,d){return typeof a=="string"?(a=encodeURI(a).replace(h,K_),d&&(a=a.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),a):null}function K_(a){return a=a.charCodeAt(0),"%"+(a>>4&15).toString(16)+(a&15).toString(16)}var Xu=/[#\/\?@]/g,H_=/[#\?:]/g,W_=/[#\?]/g,Q_=/[#\?@]/g,J_=/#/g;function Ps(a,h){this.h=this.g=null,this.i=a||null,this.j=!!h}function Wt(a){a.g||(a.g=new Map,a.h=0,a.i&&G_(a.i,function(h,d){a.add(decodeURIComponent(h.replace(/\+/g," ")),d)}))}r=Ps.prototype,r.add=function(a,h){Wt(this),this.i=null,a=fr(this,a);var d=this.g.get(a);return d||this.g.set(a,d=[]),d.push(h),this.h+=1,this};function Zu(a,h){Wt(a),h=fr(a,h),a.g.has(h)&&(a.i=null,a.h-=a.g.get(h).length,a.g.delete(h))}function eh(a,h){return Wt(a),h=fr(a,h),a.g.has(h)}r.forEach=function(a,h){Wt(this),this.g.forEach(function(d,m){d.forEach(function(P){a.call(h,P,m,this)},this)},this)},r.na=function(){Wt(this);const a=Array.from(this.g.values()),h=Array.from(this.g.keys()),d=[];for(let m=0;m<h.length;m++){const P=a[m];for(let C=0;C<P.length;C++)d.push(h[m])}return d},r.V=function(a){Wt(this);let h=[];if(typeof a=="string")eh(this,a)&&(h=h.concat(this.g.get(fr(this,a))));else{a=Array.from(this.g.values());for(let d=0;d<a.length;d++)h=h.concat(a[d])}return h},r.set=function(a,h){return Wt(this),this.i=null,a=fr(this,a),eh(this,a)&&(this.h-=this.g.get(a).length),this.g.set(a,[h]),this.h+=1,this},r.get=function(a,h){return a?(a=this.V(a),0<a.length?String(a[0]):h):h};function th(a,h,d){Zu(a,h),0<d.length&&(a.i=null,a.g.set(fr(a,h),D(d)),a.h+=d.length)}r.toString=function(){if(this.i)return this.i;if(!this.g)return"";const a=[],h=Array.from(this.g.keys());for(var d=0;d<h.length;d++){var m=h[d];const C=encodeURIComponent(String(m)),L=this.V(m);for(m=0;m<L.length;m++){var P=C;L[m]!==""&&(P+="="+encodeURIComponent(String(L[m]))),a.push(P)}}return this.i=a.join("&")};function fr(a,h){return h=String(h),a.j&&(h=h.toLowerCase()),h}function Y_(a,h){h&&!a.j&&(Wt(a),a.i=null,a.g.forEach(function(d,m){var P=m.toLowerCase();m!=P&&(Zu(this,m),th(this,P,d))},a)),a.j=h}function X_(a,h){const d=new Es;if(c.Image){const m=new Image;m.onload=E(Qt,d,"TestLoadImage: loaded",!0,h,m),m.onerror=E(Qt,d,"TestLoadImage: error",!1,h,m),m.onabort=E(Qt,d,"TestLoadImage: abort",!1,h,m),m.ontimeout=E(Qt,d,"TestLoadImage: timeout",!1,h,m),c.setTimeout(function(){m.ontimeout&&m.ontimeout()},1e4),m.src=a}else h(!1)}function Z_(a,h){const d=new Es,m=new AbortController,P=setTimeout(()=>{m.abort(),Qt(d,"TestPingServer: timeout",!1,h)},1e4);fetch(a,{signal:m.signal}).then(C=>{clearTimeout(P),C.ok?Qt(d,"TestPingServer: ok",!0,h):Qt(d,"TestPingServer: server error",!1,h)}).catch(()=>{clearTimeout(P),Qt(d,"TestPingServer: error",!1,h)})}function Qt(a,h,d,m,P){try{P&&(P.onload=null,P.onerror=null,P.onabort=null,P.ontimeout=null),m(d)}catch{}}function ey(){this.g=new O_}function ty(a,h,d){const m=d||"";try{Qu(a,function(P,C){let L=P;u(P)&&(L=qa(P)),h.push(m+C+"="+encodeURIComponent(L))})}catch(P){throw h.push(m+"type="+encodeURIComponent("_badmap")),P}}function Xi(a){this.l=a.Ub||null,this.j=a.eb||!1}A(Xi,ja),Xi.prototype.g=function(){return new Zi(this.l,this.j)},Xi.prototype.i=(function(a){return function(){return a}})({});function Zi(a,h){Fe.call(this),this.D=a,this.o=h,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}A(Zi,Fe),r=Zi.prototype,r.open=function(a,h){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=a,this.A=h,this.readyState=1,Cs(this)},r.send=function(a){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const h={headers:this.u,method:this.B,credentials:this.m,cache:void 0};a&&(h.body=a),(this.D||c).fetch(new Request(this.A,h)).then(this.Sa.bind(this),this.ga.bind(this))},r.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,xs(this)),this.readyState=0},r.Sa=function(a){if(this.g&&(this.l=a,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=a.headers,this.readyState=2,Cs(this)),this.g&&(this.readyState=3,Cs(this),this.g)))if(this.responseType==="arraybuffer")a.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof c.ReadableStream<"u"&&"body"in a){if(this.j=a.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;nh(this)}else a.text().then(this.Ra.bind(this),this.ga.bind(this))};function nh(a){a.j.read().then(a.Pa.bind(a)).catch(a.ga.bind(a))}r.Pa=function(a){if(this.g){if(this.o&&a.value)this.response.push(a.value);else if(!this.o){var h=a.value?a.value:new Uint8Array(0);(h=this.v.decode(h,{stream:!a.done}))&&(this.response=this.responseText+=h)}a.done?xs(this):Cs(this),this.readyState==3&&nh(this)}},r.Ra=function(a){this.g&&(this.response=this.responseText=a,xs(this))},r.Qa=function(a){this.g&&(this.response=a,xs(this))},r.ga=function(){this.g&&xs(this)};function xs(a){a.readyState=4,a.l=null,a.j=null,a.v=null,Cs(a)}r.setRequestHeader=function(a,h){this.u.append(a,h)},r.getResponseHeader=function(a){return this.h&&this.h.get(a.toLowerCase())||""},r.getAllResponseHeaders=function(){if(!this.h)return"";const a=[],h=this.h.entries();for(var d=h.next();!d.done;)d=d.value,a.push(d[0]+": "+d[1]),d=h.next();return a.join(`\r
`)};function Cs(a){a.onreadystatechange&&a.onreadystatechange.call(a)}Object.defineProperty(Zi.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(a){this.m=a?"include":"same-origin"}});function rh(a){let h="";return U(a,function(d,m){h+=m,h+=":",h+=d,h+=`\r
`}),h}function Za(a,h,d){e:{for(m in d){var m=!1;break e}m=!0}m||(d=rh(d),typeof a=="string"?d!=null&&encodeURIComponent(String(d)):de(a,h,d))}function be(a){Fe.call(this),this.headers=new Map,this.o=a||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}A(be,Fe);var ny=/^https?$/i,ry=["POST","PUT"];r=be.prototype,r.Ha=function(a){this.J=a},r.ea=function(a,h,d,m){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+a);h=h?h.toUpperCase():"GET",this.D=a,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():Ka.g(),this.v=this.o?ku(this.o):ku(Ka),this.g.onreadystatechange=p(this.Ea,this);try{this.B=!0,this.g.open(h,String(a),!0),this.B=!1}catch(C){sh(this,C);return}if(a=d||"",d=new Map(this.headers),m)if(Object.getPrototypeOf(m)===Object.prototype)for(var P in m)d.set(P,m[P]);else if(typeof m.keys=="function"&&typeof m.get=="function")for(const C of m.keys())d.set(C,m.get(C));else throw Error("Unknown input type for opt_headers: "+String(m));m=Array.from(d.keys()).find(C=>C.toLowerCase()=="content-type"),P=c.FormData&&a instanceof c.FormData,!(0<=Array.prototype.indexOf.call(ry,h,void 0))||m||P||d.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[C,L]of d)this.g.setRequestHeader(C,L);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{ah(this),this.u=!0,this.g.send(a),this.u=!1}catch(C){sh(this,C)}};function sh(a,h){a.h=!1,a.g&&(a.j=!0,a.g.abort(),a.j=!1),a.l=h,a.m=5,ih(a),eo(a)}function ih(a){a.A||(a.A=!0,Ke(a,"complete"),Ke(a,"error"))}r.abort=function(a){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=a||7,Ke(this,"complete"),Ke(this,"abort"),eo(this))},r.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),eo(this,!0)),be.aa.N.call(this)},r.Ea=function(){this.s||(this.B||this.u||this.j?oh(this):this.bb())},r.bb=function(){oh(this)};function oh(a){if(a.h&&typeof o<"u"&&(!a.v[1]||St(a)!=4||a.Z()!=2)){if(a.u&&St(a)==4)Pu(a.Ea,0,a);else if(Ke(a,"readystatechange"),St(a)==4){a.h=!1;try{const L=a.Z();e:switch(L){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var h=!0;break e;default:h=!1}var d;if(!(d=h)){var m;if(m=L===0){var P=String(a.D).match(Ju)[1]||null;!P&&c.self&&c.self.location&&(P=c.self.location.protocol.slice(0,-1)),m=!ny.test(P?P.toLowerCase():"")}d=m}if(d)Ke(a,"complete"),Ke(a,"success");else{a.m=6;try{var C=2<St(a)?a.g.statusText:""}catch{C=""}a.l=C+" ["+a.Z()+"]",ih(a)}}finally{eo(a)}}}}function eo(a,h){if(a.g){ah(a);const d=a.g,m=a.v[0]?()=>{}:null;a.g=null,a.v=null,h||Ke(a,"ready");try{d.onreadystatechange=m}catch{}}}function ah(a){a.I&&(c.clearTimeout(a.I),a.I=null)}r.isActive=function(){return!!this.g};function St(a){return a.g?a.g.readyState:0}r.Z=function(){try{return 2<St(this)?this.g.status:-1}catch{return-1}},r.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},r.Oa=function(a){if(this.g){var h=this.g.responseText;return a&&h.indexOf(a)==0&&(h=h.substring(a.length)),M_(h)}};function ch(a){try{if(!a.g)return null;if("response"in a.g)return a.g.response;switch(a.H){case"":case"text":return a.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in a.g)return a.g.mozResponseArrayBuffer}return null}catch{return null}}function sy(a){const h={};a=(a.g&&2<=St(a)&&a.g.getAllResponseHeaders()||"").split(`\r
`);for(let m=0;m<a.length;m++){if(j(a[m]))continue;var d=b(a[m]);const P=d[0];if(d=d[1],typeof d!="string")continue;d=d.trim();const C=h[P]||[];h[P]=C,C.push(d)}w(h,function(m){return m.join(", ")})}r.Ba=function(){return this.m},r.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function Ds(a,h,d){return d&&d.internalChannelParams&&d.internalChannelParams[a]||h}function lh(a){this.Aa=0,this.i=[],this.j=new Es,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=Ds("failFast",!1,a),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=Ds("baseRetryDelayMs",5e3,a),this.cb=Ds("retryDelaySeedMs",1e4,a),this.Wa=Ds("forwardChannelMaxRetries",2,a),this.wa=Ds("forwardChannelRequestTimeoutMs",2e4,a),this.pa=a&&a.xmlHttpFactory||void 0,this.Xa=a&&a.Tb||void 0,this.Ca=a&&a.useFetchStreams||!1,this.L=void 0,this.J=a&&a.supportsCrossDomainXhr||!1,this.K="",this.h=new zu(a&&a.concurrentRequestLimit),this.Da=new ey,this.P=a&&a.fastHandshake||!1,this.O=a&&a.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=a&&a.Rb||!1,a&&a.xa&&this.j.xa(),a&&a.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&a&&a.detectBufferingProxy||!1,this.ja=void 0,a&&a.longPollingTimeout&&0<a.longPollingTimeout&&(this.ja=a.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}r=lh.prototype,r.la=8,r.G=1,r.connect=function(a,h,d,m){He(0),this.W=a,this.H=h||{},d&&m!==void 0&&(this.H.OSID=d,this.H.OAID=m),this.F=this.X,this.I=yh(this,null,this.W),no(this)};function ec(a){if(uh(a),a.G==3){var h=a.U++,d=At(a.I);if(de(d,"SID",a.K),de(d,"RID",h),de(d,"TYPE","terminate"),ks(a,d),h=new Ht(a,a.j,h),h.L=2,h.v=Yi(At(d)),d=!1,c.navigator&&c.navigator.sendBeacon)try{d=c.navigator.sendBeacon(h.v.toString(),"")}catch{}!d&&c.Image&&(new Image().src=h.v,d=!0),d||(h.g=wh(h.j,null),h.g.ea(h.v)),h.F=Date.now(),Wi(h)}_h(a)}function to(a){a.g&&(nc(a),a.g.cancel(),a.g=null)}function uh(a){to(a),a.u&&(c.clearTimeout(a.u),a.u=null),ro(a),a.h.cancel(),a.s&&(typeof a.s=="number"&&c.clearTimeout(a.s),a.s=null)}function no(a){if(!Gu(a.h)&&!a.s){a.s=!0;var h=a.Ga;_s||Tu(),ys||(_s(),ys=!0),Na.add(h,a),a.B=0}}function iy(a,h){return Ku(a.h)>=a.h.j-(a.s?1:0)?!1:a.s?(a.i=h.D.concat(a.i),!0):a.G==1||a.G==2||a.B>=(a.Va?0:a.Wa)?!1:(a.s=Ts(p(a.Ga,a,h),ph(a,a.B)),a.B++,!0)}r.Ga=function(a){if(this.s)if(this.s=null,this.G==1){if(!a){this.U=Math.floor(1e5*Math.random()),a=this.U++;const P=new Ht(this,this.j,a);let C=this.o;if(this.S&&(C?(C=_(C),v(C,this.S)):C=this.S),this.m!==null||this.O||(P.H=C,C=null),this.P)e:{for(var h=0,d=0;d<this.i.length;d++){t:{var m=this.i[d];if("__data__"in m.map&&(m=m.map.__data__,typeof m=="string")){m=m.length;break t}m=void 0}if(m===void 0)break;if(h+=m,4096<h){h=d;break e}if(h===4096||d===this.i.length-1){h=d+1;break e}}h=1e3}else h=1e3;h=dh(this,P,h),d=At(this.I),de(d,"RID",a),de(d,"CVER",22),this.D&&de(d,"X-HTTP-Session-Id",this.D),ks(this,d),C&&(this.O?h="headers="+encodeURIComponent(String(rh(C)))+"&"+h:this.m&&Za(d,this.m,C)),Xa(this.h,P),this.Ua&&de(d,"TYPE","init"),this.P?(de(d,"$req",h),de(d,"SID","null"),P.T=!0,Wa(P,d,null)):Wa(P,d,h),this.G=2}}else this.G==3&&(a?hh(this,a):this.i.length==0||Gu(this.h)||hh(this))};function hh(a,h){var d;h?d=h.l:d=a.U++;const m=At(a.I);de(m,"SID",a.K),de(m,"RID",d),de(m,"AID",a.T),ks(a,m),a.m&&a.o&&Za(m,a.m,a.o),d=new Ht(a,a.j,d,a.B+1),a.m===null&&(d.H=a.o),h&&(a.i=h.D.concat(a.i)),h=dh(a,d,1e3),d.I=Math.round(.5*a.wa)+Math.round(.5*a.wa*Math.random()),Xa(a.h,d),Wa(d,m,h)}function ks(a,h){a.H&&U(a.H,function(d,m){de(h,m,d)}),a.l&&Qu({},function(d,m){de(h,m,d)})}function dh(a,h,d){d=Math.min(a.i.length,d);var m=a.l?p(a.l.Na,a.l,a):null;e:{var P=a.i;let C=-1;for(;;){const L=["count="+d];C==-1?0<d?(C=P[0].g,L.push("ofs="+C)):C=0:L.push("ofs="+C);let ue=!0;for(let Ne=0;Ne<d;Ne++){let ne=P[Ne].g;const Ue=P[Ne].map;if(ne-=C,0>ne)C=Math.max(0,P[Ne].g-100),ue=!1;else try{ty(Ue,L,"req"+ne+"_")}catch{m&&m(Ue)}}if(ue){m=L.join("&");break e}}}return a=a.i.splice(0,d),h.D=a,m}function fh(a){if(!a.g&&!a.u){a.Y=1;var h=a.Fa;_s||Tu(),ys||(_s(),ys=!0),Na.add(h,a),a.v=0}}function tc(a){return a.g||a.u||3<=a.v?!1:(a.Y++,a.u=Ts(p(a.Fa,a),ph(a,a.v)),a.v++,!0)}r.Fa=function(){if(this.u=null,gh(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var a=2*this.R;this.j.info("BP detection timer enabled: "+a),this.A=Ts(p(this.ab,this),a)}},r.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,He(10),to(this),gh(this))};function nc(a){a.A!=null&&(c.clearTimeout(a.A),a.A=null)}function gh(a){a.g=new Ht(a,a.j,"rpc",a.Y),a.m===null&&(a.g.H=a.o),a.g.O=0;var h=At(a.qa);de(h,"RID","rpc"),de(h,"SID",a.K),de(h,"AID",a.T),de(h,"CI",a.F?"0":"1"),!a.F&&a.ja&&de(h,"TO",a.ja),de(h,"TYPE","xmlhttp"),ks(a,h),a.m&&a.o&&Za(h,a.m,a.o),a.L&&(a.g.I=a.L);var d=a.g;a=a.ia,d.L=1,d.v=Yi(At(h)),d.m=null,d.P=!0,$u(d,a)}r.Za=function(){this.C!=null&&(this.C=null,to(this),tc(this),He(19))};function ro(a){a.C!=null&&(c.clearTimeout(a.C),a.C=null)}function mh(a,h){var d=null;if(a.g==h){ro(a),nc(a),a.g=null;var m=2}else if(Ya(a.h,h))d=h.D,Hu(a.h,h),m=1;else return;if(a.G!=0){if(h.o)if(m==1){d=h.m?h.m.length:0,h=Date.now()-h.F;var P=a.B;m=Gi(),Ke(m,new Lu(m,d)),no(a)}else fh(a);else if(P=h.s,P==3||P==0&&0<h.X||!(m==1&&iy(a,h)||m==2&&tc(a)))switch(d&&0<d.length&&(h=a.h,h.i=h.i.concat(d)),P){case 1:Vn(a,5);break;case 4:Vn(a,10);break;case 3:Vn(a,6);break;default:Vn(a,2)}}}function ph(a,h){let d=a.Ta+Math.floor(Math.random()*a.cb);return a.isActive()||(d*=2),d*h}function Vn(a,h){if(a.j.info("Error code "+h),h==2){var d=p(a.fb,a),m=a.Xa;const P=!m;m=new kn(m||"//www.google.com/images/cleardot.gif"),c.location&&c.location.protocol=="http"||Qi(m,"https"),Yi(m),P?X_(m.toString(),d):Z_(m.toString(),d)}else He(2);a.G=0,a.l&&a.l.sa(h),_h(a),uh(a)}r.fb=function(a){a?(this.j.info("Successfully pinged google.com"),He(2)):(this.j.info("Failed to ping google.com"),He(1))};function _h(a){if(a.G=0,a.ka=[],a.l){const h=Wu(a.h);(h.length!=0||a.i.length!=0)&&(k(a.ka,h),k(a.ka,a.i),a.h.i.length=0,D(a.i),a.i.length=0),a.l.ra()}}function yh(a,h,d){var m=d instanceof kn?At(d):new kn(d);if(m.g!="")h&&(m.g=h+"."+m.g),Ji(m,m.s);else{var P=c.location;m=P.protocol,h=h?h+"."+P.hostname:P.hostname,P=+P.port;var C=new kn(null);m&&Qi(C,m),h&&(C.g=h),P&&Ji(C,P),d&&(C.l=d),m=C}return d=a.D,h=a.ya,d&&h&&de(m,d,h),de(m,"VER",a.la),ks(a,m),m}function wh(a,h,d){if(h&&!a.J)throw Error("Can't create secondary domain capable XhrIo object.");return h=a.Ca&&!a.pa?new be(new Xi({eb:d})):new be(a.pa),h.Ha(a.J),h}r.isActive=function(){return!!this.l&&this.l.isActive(this)};function Ih(){}r=Ih.prototype,r.ua=function(){},r.ta=function(){},r.sa=function(){},r.ra=function(){},r.isActive=function(){return!0},r.Na=function(){};function so(){}so.prototype.g=function(a,h){return new et(a,h)};function et(a,h){Fe.call(this),this.g=new lh(h),this.l=a,this.h=h&&h.messageUrlParams||null,a=h&&h.messageHeaders||null,h&&h.clientProtocolHeaderRequired&&(a?a["X-Client-Protocol"]="webchannel":a={"X-Client-Protocol":"webchannel"}),this.g.o=a,a=h&&h.initMessageHeaders||null,h&&h.messageContentType&&(a?a["X-WebChannel-Content-Type"]=h.messageContentType:a={"X-WebChannel-Content-Type":h.messageContentType}),h&&h.va&&(a?a["X-WebChannel-Client-Profile"]=h.va:a={"X-WebChannel-Client-Profile":h.va}),this.g.S=a,(a=h&&h.Sb)&&!j(a)&&(this.g.m=a),this.v=h&&h.supportsCrossDomainXhr||!1,this.u=h&&h.sendRawJson||!1,(h=h&&h.httpSessionIdParam)&&!j(h)&&(this.g.D=h,a=this.h,a!==null&&h in a&&(a=this.h,h in a&&delete a[h])),this.j=new gr(this)}A(et,Fe),et.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},et.prototype.close=function(){ec(this.g)},et.prototype.o=function(a){var h=this.g;if(typeof a=="string"){var d={};d.__data__=a,a=d}else this.u&&(d={},d.__data__=qa(a),a=d);h.i.push(new q_(h.Ya++,a)),h.G==3&&no(h)},et.prototype.N=function(){this.g.l=null,delete this.j,ec(this.g),delete this.g,et.aa.N.call(this)};function bh(a){za.call(this),a.__headers__&&(this.headers=a.__headers__,this.statusCode=a.__status__,delete a.__headers__,delete a.__status__);var h=a.__sm__;if(h){e:{for(const d in h){a=d;break e}a=void 0}(this.i=a)&&(a=this.i,h=h!==null&&a in h?h[a]:void 0),this.data=h}else this.data=a}A(bh,za);function vh(){Ga.call(this),this.status=1}A(vh,Ga);function gr(a){this.g=a}A(gr,Ih),gr.prototype.ua=function(){Ke(this.g,"a")},gr.prototype.ta=function(a){Ke(this.g,new bh(a))},gr.prototype.sa=function(a){Ke(this.g,new vh)},gr.prototype.ra=function(){Ke(this.g,"b")},so.prototype.createWebChannel=so.prototype.g,et.prototype.send=et.prototype.o,et.prototype.open=et.prototype.m,et.prototype.close=et.prototype.close,Gf=function(){return new so},zf=function(){return Gi()},jf=Cn,Ac={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},Ki.NO_ERROR=0,Ki.TIMEOUT=8,Ki.HTTP_ERROR=6,yo=Ki,Fu.COMPLETE="complete",qf=Fu,Vu.EventType=bs,bs.OPEN="a",bs.CLOSE="b",bs.ERROR="c",bs.MESSAGE="d",Fe.prototype.listen=Fe.prototype.K,Fs=Vu,be.prototype.listenOnce=be.prototype.L,be.prototype.getLastError=be.prototype.Ka,be.prototype.getLastErrorCode=be.prototype.Ba,be.prototype.getStatus=be.prototype.Z,be.prototype.getResponseJson=be.prototype.Oa,be.prototype.getResponseText=be.prototype.oa,be.prototype.send=be.prototype.ea,be.prototype.setWithCredentials=be.prototype.Ha,$f=be}).apply(typeof oo<"u"?oo:typeof self<"u"?self:typeof window<"u"?window:{});const Mh="@firebase/firestore",Oh="4.9.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ke{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}ke.UNAUTHENTICATED=new ke(null),ke.GOOGLE_CREDENTIALS=new ke("google-credentials-uid"),ke.FIRST_PARTY=new ke("first-party-uid"),ke.MOCK_USER=new ke("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ns="12.0.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gn=new il("@firebase/firestore");function vr(){return gn.logLevel}function Kf(r){gn.setLogLevel(r)}function N(r,...e){if(gn.logLevel<=X.DEBUG){const t=e.map(al);gn.debug(`Firestore (${ns}): ${r}`,...t)}}function ve(r,...e){if(gn.logLevel<=X.ERROR){const t=e.map(al);gn.error(`Firestore (${ns}): ${r}`,...t)}}function nt(r,...e){if(gn.logLevel<=X.WARN){const t=e.map(al);gn.warn(`Firestore (${ns}): ${r}`,...t)}}function al(r){if(typeof r=="string")return r;try{/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/return(function(t){return JSON.stringify(t)})(r)}catch{return r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function q(r,e,t){let n="Unexpected state";typeof e=="string"?n=e:t=e,Hf(r,n,t)}function Hf(r,e,t){let n=`FIRESTORE (${ns}) INTERNAL ASSERTION FAILED: ${e} (ID: ${r.toString(16)})`;if(t!==void 0)try{n+=" CONTEXT: "+JSON.stringify(t)}catch{n+=" CONTEXT: "+t}throw ve(n),new Error(n)}function z(r,e,t,n){let s="Unexpected state";typeof t=="string"?s=t:n=t,r||Hf(e,s,n)}function Qw(r,e){r||q(57014,e)}function O(r,e){return r}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const x={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class V extends Ut{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ve{constructor(){this.promise=new Promise(((e,t)=>{this.resolve=e,this.reject=t}))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wf{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class Qf{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable((()=>t(ke.UNAUTHENTICATED)))}shutdown(){}}class Jw{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable((()=>t(this.token.user)))}shutdown(){this.changeListener=null}}class Yw{constructor(e){this.t=e,this.currentUser=ke.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){z(this.o===void 0,42304);let n=this.i;const s=l=>this.i!==n?(n=this.i,t(l)):Promise.resolve();let i=new Ve;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new Ve,e.enqueueRetryable((()=>s(this.currentUser)))};const o=()=>{const l=i;e.enqueueRetryable((async()=>{await l.promise,await s(this.currentUser)}))},c=l=>{N("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=l,this.o&&(this.auth.addAuthTokenListener(this.o),o())};this.t.onInit((l=>c(l))),setTimeout((()=>{if(!this.auth){const l=this.t.getImmediate({optional:!0});l?c(l):(N("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new Ve)}}),0),o()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then((n=>this.i!==e?(N("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):n?(z(typeof n.accessToken=="string",31837,{l:n}),new Wf(n.accessToken,this.currentUser)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return z(e===null||typeof e=="string",2055,{h:e}),new ke(e)}}class Xw{constructor(e,t,n){this.P=e,this.T=t,this.I=n,this.type="FirstParty",this.user=ke.FIRST_PARTY,this.A=new Map}R(){return this.I?this.I():null}get headers(){this.A.set("X-Goog-AuthUser",this.P);const e=this.R();return e&&this.A.set("Authorization",e),this.T&&this.A.set("X-Goog-Iam-Authorization-Token",this.T),this.A}}class Zw{constructor(e,t,n){this.P=e,this.T=t,this.I=n}getToken(){return Promise.resolve(new Xw(this.P,this.T,this.I))}start(e,t){e.enqueueRetryable((()=>t(ke.FIRST_PARTY)))}shutdown(){}invalidateToken(){}}class Sc{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class eI{constructor(e,t){this.V=t,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,st(e)&&e.settings.appCheckToken&&(this.p=e.settings.appCheckToken)}start(e,t){z(this.o===void 0,3512);const n=i=>{i.error!=null&&N("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${i.error.message}`);const o=i.token!==this.m;return this.m=i.token,N("FirebaseAppCheckTokenProvider",`Received ${o?"new":"existing"} token.`),o?t(i.token):Promise.resolve()};this.o=i=>{e.enqueueRetryable((()=>n(i)))};const s=i=>{N("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=i,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit((i=>s(i))),setTimeout((()=>{if(!this.appCheck){const i=this.V.getImmediate({optional:!0});i?s(i):N("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}}),0)}getToken(){if(this.p)return Promise.resolve(new Sc(this.p));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then((t=>t?(z(typeof t.token=="string",44558,{tokenResult:t}),this.m=t.token,new Sc(t.token)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}class tI{getToken(){return Promise.resolve(new Sc(""))}invalidateToken(){}start(e,t){}shutdown(){}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function nI(r){const e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(r);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let n=0;n<r;n++)t[n]=Math.floor(256*Math.random());return t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sa{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=62*Math.floor(4.129032258064516);let n="";for(;n.length<20;){const s=nI(40);for(let i=0;i<s.length;++i)n.length<20&&s[i]<t&&(n+=e.charAt(s[i]%62))}return n}}function K(r,e){return r<e?-1:r>e?1:0}function Rc(r,e){const t=Math.min(r.length,e.length);for(let n=0;n<t;n++){const s=r.charAt(n),i=e.charAt(n);if(s!==i)return lc(s)===lc(i)?K(s,i):lc(s)?1:-1}return K(r.length,e.length)}const rI=55296,sI=57343;function lc(r){const e=r.charCodeAt(0);return e>=rI&&e<=sI}function Nr(r,e,t){return r.length===e.length&&r.every(((n,s)=>t(n,e[s])))}function Jf(r){return r+"\0"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pc="__name__";class ft{constructor(e,t,n){t===void 0?t=0:t>e.length&&q(637,{offset:t,range:e.length}),n===void 0?n=e.length-t:n>e.length-t&&q(1746,{length:n,range:e.length-t}),this.segments=e,this.offset=t,this.len=n}get length(){return this.len}isEqual(e){return ft.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof ft?e.forEach((n=>{t.push(n)})):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,n=this.limit();t<n;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const n=Math.min(e.length,t.length);for(let s=0;s<n;s++){const i=ft.compareSegments(e.get(s),t.get(s));if(i!==0)return i}return K(e.length,t.length)}static compareSegments(e,t){const n=ft.isNumericId(e),s=ft.isNumericId(t);return n&&!s?-1:!n&&s?1:n&&s?ft.extractNumericId(e).compare(ft.extractNumericId(t)):Rc(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return dn.fromString(e.substring(4,e.length-2))}}class J extends ft{construct(e,t,n){return new J(e,t,n)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const n of e){if(n.indexOf("//")>=0)throw new V(x.INVALID_ARGUMENT,`Invalid segment (${n}). Paths must not contain // in them.`);t.push(...n.split("/").filter((s=>s.length>0)))}return new J(t)}static emptyPath(){return new J([])}}const iI=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class ge extends ft{construct(e,t,n){return new ge(e,t,n)}static isValidIdentifier(e){return iI.test(e)}canonicalString(){return this.toArray().map((e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),ge.isValidIdentifier(e)||(e="`"+e+"`"),e))).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===Pc}static keyField(){return new ge([Pc])}static fromServerFormat(e){const t=[];let n="",s=0;const i=()=>{if(n.length===0)throw new V(x.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(n),n=""};let o=!1;for(;s<e.length;){const c=e[s];if(c==="\\"){if(s+1===e.length)throw new V(x.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const l=e[s+1];if(l!=="\\"&&l!=="."&&l!=="`")throw new V(x.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);n+=l,s+=2}else c==="`"?(o=!o,s++):c!=="."||o?(n+=c,s++):(i(),s++)}if(i(),o)throw new V(x.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new ge(t)}static emptyPath(){return new ge([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class M{constructor(e){this.path=e}static fromPath(e){return new M(J.fromString(e))}static fromName(e){return new M(J.fromString(e).popFirst(5))}static empty(){return new M(J.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&J.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return J.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new M(new J(e.slice()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function cl(r,e,t){if(!t)throw new V(x.INVALID_ARGUMENT,`Function ${r}() cannot be called with an empty ${e}.`)}function Yf(r,e,t,n){if(e===!0&&n===!0)throw new V(x.INVALID_ARGUMENT,`${r} and ${t} cannot be used together.`)}function Lh(r){if(!M.isDocumentKey(r))throw new V(x.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${r} has ${r.length}.`)}function Fh(r){if(M.isDocumentKey(r))throw new V(x.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${r} has ${r.length}.`)}function Xf(r){return typeof r=="object"&&r!==null&&(Object.getPrototypeOf(r)===Object.prototype||Object.getPrototypeOf(r)===null)}function ia(r){if(r===void 0)return"undefined";if(r===null)return"null";if(typeof r=="string")return r.length>20&&(r=`${r.substring(0,20)}...`),JSON.stringify(r);if(typeof r=="number"||typeof r=="boolean")return""+r;if(typeof r=="object"){if(r instanceof Array)return"an array";{const e=(function(n){return n.constructor?n.constructor.name:null})(r);return e?`a custom ${e} object`:"an object"}}return typeof r=="function"?"a function":q(12329,{type:typeof r})}function Y(r,e){if("_delegate"in r&&(r=r._delegate),!(r instanceof e)){if(e.name===r.constructor.name)throw new V(x.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=ia(r);throw new V(x.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return r}function Zf(r,e){if(e<=0)throw new V(x.INVALID_ARGUMENT,`Function ${r}() requires a positive number, but it was: ${e}.`)}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Se(r,e){const t={typeString:r};return e&&(t.value=e),t}function or(r,e){if(!Xf(r))throw new V(x.INVALID_ARGUMENT,"JSON must be an object");let t;for(const n in e)if(e[n]){const s=e[n].typeString,i="value"in e[n]?{value:e[n].value}:void 0;if(!(n in r)){t=`JSON missing required field: '${n}'`;break}const o=r[n];if(s&&typeof o!==s){t=`JSON field '${n}' must be a ${s}.`;break}if(i!==void 0&&o!==i.value){t=`Expected '${n}' field to equal '${i.value}'`;break}}if(t)throw new V(x.INVALID_ARGUMENT,t);return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Uh=-62135596800,Bh=1e6;class se{static now(){return se.fromMillis(Date.now())}static fromDate(e){return se.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),n=Math.floor((e-1e3*t)*Bh);return new se(t,n)}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new V(x.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new V(x.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<Uh)throw new V(x.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new V(x.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/Bh}_compareTo(e){return this.seconds===e.seconds?K(this.nanoseconds,e.nanoseconds):K(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:se._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(or(e,se._jsonSchema))return new se(e.seconds,e.nanoseconds)}valueOf(){const e=this.seconds-Uh;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}se._jsonSchemaVersion="firestore/timestamp/1.0",se._jsonSchema={type:Se("string",se._jsonSchemaVersion),seconds:Se("number"),nanoseconds:Se("number")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class G{static fromTimestamp(e){return new G(e)}static min(){return new G(new se(0,0))}static max(){return new G(new se(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Mr=-1;class Or{constructor(e,t,n,s){this.indexId=e,this.collectionGroup=t,this.fields=n,this.indexState=s}}function xc(r){return r.fields.find((e=>e.kind===2))}function On(r){return r.fields.filter((e=>e.kind!==2))}function oI(r,e){let t=K(r.collectionGroup,e.collectionGroup);if(t!==0)return t;for(let n=0;n<Math.min(r.fields.length,e.fields.length);++n)if(t=aI(r.fields[n],e.fields[n]),t!==0)return t;return K(r.fields.length,e.fields.length)}Or.UNKNOWN_ID=-1;class zn{constructor(e,t){this.fieldPath=e,this.kind=t}}function aI(r,e){const t=ge.comparator(r.fieldPath,e.fieldPath);return t!==0?t:K(r.kind,e.kind)}class Lr{constructor(e,t){this.sequenceNumber=e,this.offset=t}static empty(){return new Lr(0,rt.min())}}function eg(r,e){const t=r.toTimestamp().seconds,n=r.toTimestamp().nanoseconds+1,s=G.fromTimestamp(n===1e9?new se(t+1,0):new se(t,n));return new rt(s,M.empty(),e)}function tg(r){return new rt(r.readTime,r.key,Mr)}class rt{constructor(e,t,n){this.readTime=e,this.documentKey=t,this.largestBatchId=n}static min(){return new rt(G.min(),M.empty(),Mr)}static max(){return new rt(G.max(),M.empty(),Mr)}}function ll(r,e){let t=r.readTime.compareTo(e.readTime);return t!==0?t:(t=M.comparator(r.documentKey,e.documentKey),t!==0?t:K(r.largestBatchId,e.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ng="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class rg{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach((e=>e()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function vn(r){if(r.code!==x.FAILED_PRECONDITION||r.message!==ng)throw r;N("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class R{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e((t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)}),(t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)}))}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&q(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new R(((n,s)=>{this.nextCallback=i=>{this.wrapSuccess(e,i).next(n,s)},this.catchCallback=i=>{this.wrapFailure(t,i).next(n,s)}}))}toPromise(){return new Promise(((e,t)=>{this.next(e,t)}))}wrapUserFunction(e){try{const t=e();return t instanceof R?t:R.resolve(t)}catch(t){return R.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction((()=>e(t))):R.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction((()=>e(t))):R.reject(t)}static resolve(e){return new R(((t,n)=>{t(e)}))}static reject(e){return new R(((t,n)=>{n(e)}))}static waitFor(e){return new R(((t,n)=>{let s=0,i=0,o=!1;e.forEach((c=>{++s,c.next((()=>{++i,o&&i===s&&t()}),(l=>n(l)))})),o=!0,i===s&&t()}))}static or(e){let t=R.resolve(!1);for(const n of e)t=t.next((s=>s?R.resolve(s):n()));return t}static forEach(e,t){const n=[];return e.forEach(((s,i)=>{n.push(t.call(this,s,i))})),this.waitFor(n)}static mapArray(e,t){return new R(((n,s)=>{const i=e.length,o=new Array(i);let c=0;for(let l=0;l<i;l++){const u=l;t(e[u]).next((f=>{o[u]=f,++c,c===i&&n(o)}),(f=>s(f)))}}))}static doWhile(e,t){return new R(((n,s)=>{const i=()=>{e()===!0?t().next((()=>{i()}),s):n()};i()}))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tt="SimpleDb";class oa{static open(e,t,n,s){try{return new oa(t,e.transaction(s,n))}catch(i){throw new js(t,i)}}constructor(e,t){this.action=e,this.transaction=t,this.aborted=!1,this.S=new Ve,this.transaction.oncomplete=()=>{this.S.resolve()},this.transaction.onabort=()=>{t.error?this.S.reject(new js(e,t.error)):this.S.resolve()},this.transaction.onerror=n=>{const s=ul(n.target.error);this.S.reject(new js(e,s))}}get D(){return this.S.promise}abort(e){e&&this.S.reject(e),this.aborted||(N(tt,"Aborting transaction:",e?e.message:"Client-initiated abort"),this.aborted=!0,this.transaction.abort())}C(){const e=this.transaction;this.aborted||typeof e.commit!="function"||e.commit()}store(e){const t=this.transaction.objectStore(e);return new lI(t)}}class wt{static delete(e){return N(tt,"Removing database:",e),Fn(Af().indexedDB.deleteDatabase(e)).toPromise()}static v(){if(!Vf())return!1;if(wt.F())return!0;const e=Pe(),t=wt.M(e),n=0<t&&t<10,s=sg(e),i=0<s&&s<4.5;return!(e.indexOf("MSIE ")>0||e.indexOf("Trident/")>0||e.indexOf("Edge/")>0||n||i)}static F(){return typeof process<"u"&&process.__PRIVATE_env?.__PRIVATE_USE_MOCK_PERSISTENCE==="YES"}static O(e,t){return e.store(t)}static M(e){const t=e.match(/i(?:phone|pad|pod) os ([\d_]+)/i),n=t?t[1].split("_").slice(0,2).join("."):"-1";return Number(n)}constructor(e,t,n){this.name=e,this.version=t,this.N=n,this.B=null,wt.M(Pe())===12.2&&ve("Firestore persistence suffers from a bug in iOS 12.2 Safari that may cause your app to stop working. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.")}async L(e){return this.db||(N(tt,"Opening database:",this.name),this.db=await new Promise(((t,n)=>{const s=indexedDB.open(this.name,this.version);s.onsuccess=i=>{const o=i.target.result;t(o)},s.onblocked=()=>{n(new js(e,"Cannot upgrade IndexedDB schema while another tab is open. Close all tabs that access Firestore and reload this page to proceed."))},s.onerror=i=>{const o=i.target.error;o.name==="VersionError"?n(new V(x.FAILED_PRECONDITION,"A newer version of the Firestore SDK was previously used and so the persisted data is not compatible with the version of the SDK you are now using. The SDK will operate with persistence disabled. If you need persistence, please re-upgrade to a newer version of the SDK or else clear the persisted IndexedDB data for your app to start fresh.")):o.name==="InvalidStateError"?n(new V(x.FAILED_PRECONDITION,"Unable to open an IndexedDB connection. This could be due to running in a private browsing session on a browser whose private browsing sessions do not support IndexedDB: "+o)):n(new js(e,o))},s.onupgradeneeded=i=>{N(tt,'Database "'+this.name+'" requires upgrade from version:',i.oldVersion);const o=i.target.result;this.N.k(o,s.transaction,i.oldVersion,this.version).next((()=>{N(tt,"Database upgrade to version "+this.version+" complete")}))}}))),this.q&&(this.db.onversionchange=t=>this.q(t)),this.db}$(e){this.q=e,this.db&&(this.db.onversionchange=t=>e(t))}async runTransaction(e,t,n,s){const i=t==="readonly";let o=0;for(;;){++o;try{this.db=await this.L(e);const c=oa.open(this.db,e,i?"readonly":"readwrite",n),l=s(c).next((u=>(c.C(),u))).catch((u=>(c.abort(u),R.reject(u)))).toPromise();return l.catch((()=>{})),await c.D,l}catch(c){const l=c,u=l.name!=="FirebaseError"&&o<3;if(N(tt,"Transaction failed with error:",l.message,"Retrying:",u),this.close(),!u)return Promise.reject(l)}}}close(){this.db&&this.db.close(),this.db=void 0}}function sg(r){const e=r.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}class cI{constructor(e){this.U=e,this.K=!1,this.W=null}get isDone(){return this.K}get G(){return this.W}set cursor(e){this.U=e}done(){this.K=!0}j(e){this.W=e}delete(){return Fn(this.U.delete())}}class js extends V{constructor(e,t){super(x.UNAVAILABLE,`IndexedDB transaction '${e}' failed: ${t}`),this.name="IndexedDbTransactionError"}}function Tn(r){return r.name==="IndexedDbTransactionError"}class lI{constructor(e){this.store=e}put(e,t){let n;return t!==void 0?(N(tt,"PUT",this.store.name,e,t),n=this.store.put(t,e)):(N(tt,"PUT",this.store.name,"<auto-key>",e),n=this.store.put(e)),Fn(n)}add(e){return N(tt,"ADD",this.store.name,e,e),Fn(this.store.add(e))}get(e){return Fn(this.store.get(e)).next((t=>(t===void 0&&(t=null),N(tt,"GET",this.store.name,e,t),t)))}delete(e){return N(tt,"DELETE",this.store.name,e),Fn(this.store.delete(e))}count(){return N(tt,"COUNT",this.store.name),Fn(this.store.count())}J(e,t){const n=this.options(e,t),s=n.index?this.store.index(n.index):this.store;if(typeof s.getAll=="function"){const i=s.getAll(n.range);return new R(((o,c)=>{i.onerror=l=>{c(l.target.error)},i.onsuccess=l=>{o(l.target.result)}}))}{const i=this.cursor(n),o=[];return this.H(i,((c,l)=>{o.push(l)})).next((()=>o))}}Y(e,t){const n=this.store.getAll(e,t===null?void 0:t);return new R(((s,i)=>{n.onerror=o=>{i(o.target.error)},n.onsuccess=o=>{s(o.target.result)}}))}Z(e,t){N(tt,"DELETE ALL",this.store.name);const n=this.options(e,t);n.X=!1;const s=this.cursor(n);return this.H(s,((i,o,c)=>c.delete()))}ee(e,t){let n;t?n=e:(n={},t=e);const s=this.cursor(n);return this.H(s,t)}te(e){const t=this.cursor({});return new R(((n,s)=>{t.onerror=i=>{const o=ul(i.target.error);s(o)},t.onsuccess=i=>{const o=i.target.result;o?e(o.primaryKey,o.value).next((c=>{c?o.continue():n()})):n()}}))}H(e,t){const n=[];return new R(((s,i)=>{e.onerror=o=>{i(o.target.error)},e.onsuccess=o=>{const c=o.target.result;if(!c)return void s();const l=new cI(c),u=t(c.primaryKey,c.value,l);if(u instanceof R){const f=u.catch((g=>(l.done(),R.reject(g))));n.push(f)}l.isDone?s():l.G===null?c.continue():c.continue(l.G)}})).next((()=>R.waitFor(n)))}options(e,t){let n;return e!==void 0&&(typeof e=="string"?n=e:t=e),{index:n,range:t}}cursor(e){let t="next";if(e.reverse&&(t="prev"),e.index){const n=this.store.index(e.index);return e.X?n.openKeyCursor(e.range,t):n.openCursor(e.range,t)}return this.store.openCursor(e.range,t)}}function Fn(r){return new R(((e,t)=>{r.onsuccess=n=>{const s=n.target.result;e(s)},r.onerror=n=>{const s=ul(n.target.error);t(s)}}))}let $h=!1;function ul(r){const e=wt.M(Pe());if(e>=12.2&&e<13){const t="An internal error was encountered in the Indexed Database server";if(r.message.indexOf(t)>=0){const n=new V("internal",`IOS_INDEXEDDB_BUG1: IndexedDb has thrown '${t}'. This is likely due to an unavoidable bug in iOS. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.`);return $h||($h=!0,setTimeout((()=>{throw n}),0)),n}}return r}const zs="IndexBackfiller";class uI{constructor(e,t){this.asyncQueue=e,this.ne=t,this.task=null}start(){this.re(15e3)}stop(){this.task&&(this.task.cancel(),this.task=null)}get started(){return this.task!==null}re(e){N(zs,`Scheduled in ${e}ms`),this.task=this.asyncQueue.enqueueAfterDelay("index_backfill",e,(async()=>{this.task=null;try{const t=await this.ne.ie();N(zs,`Documents written: ${t}`)}catch(t){Tn(t)?N(zs,"Ignoring IndexedDB error during index backfill: ",t):await vn(t)}await this.re(6e4)}))}}class hI{constructor(e,t){this.localStore=e,this.persistence=t}async ie(e=50){return this.persistence.runTransaction("Backfill Indexes","readwrite-primary",(t=>this.se(t,e)))}se(e,t){const n=new Set;let s=t,i=!0;return R.doWhile((()=>i===!0&&s>0),(()=>this.localStore.indexManager.getNextCollectionGroupToUpdate(e).next((o=>{if(o!==null&&!n.has(o))return N(zs,`Processing collection: ${o}`),this.oe(e,o,s).next((c=>{s-=c,n.add(o)}));i=!1})))).next((()=>t-s))}oe(e,t,n){return this.localStore.indexManager.getMinOffsetFromCollectionGroup(e,t).next((s=>this.localStore.localDocuments.getNextDocuments(e,t,s,n).next((i=>{const o=i.changes;return this.localStore.indexManager.updateIndexEntries(e,o).next((()=>this._e(s,i))).next((c=>(N(zs,`Updating offset: ${c}`),this.localStore.indexManager.updateCollectionGroup(e,t,c)))).next((()=>o.size))}))))}_e(e,t){let n=e;return t.changes.forEach(((s,i)=>{const o=tg(i);ll(o,n)>0&&(n=o)})),new rt(n.readTime,n.documentKey,Math.max(t.batchId,e.largestBatchId))}}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qe{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=n=>this.ae(n),this.ue=n=>t.writeSequenceNumber(n))}ae(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.ue&&this.ue(e),e}}Qe.ce=-1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fn=-1;function bi(r){return r==null}function ei(r){return r===0&&1/r==-1/0}function ig(r){return typeof r=="number"&&Number.isInteger(r)&&!ei(r)&&r<=Number.MAX_SAFE_INTEGER&&r>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Mo="";function ze(r){let e="";for(let t=0;t<r.length;t++)e.length>0&&(e=qh(e)),e=dI(r.get(t),e);return qh(e)}function dI(r,e){let t=e;const n=r.length;for(let s=0;s<n;s++){const i=r.charAt(s);switch(i){case"\0":t+="";break;case Mo:t+="";break;default:t+=i}}return t}function qh(r){return r+Mo+""}function pt(r){const e=r.length;if(z(e>=2,64408,{path:r}),e===2)return z(r.charAt(0)===Mo&&r.charAt(1)==="",56145,{path:r}),J.emptyPath();const t=e-2,n=[];let s="";for(let i=0;i<e;){const o=r.indexOf(Mo,i);switch((o<0||o>t)&&q(50515,{path:r}),r.charAt(o+1)){case"":const c=r.substring(i,o);let l;s.length===0?l=c:(s+=c,l=s,s=""),n.push(l);break;case"":s+=r.substring(i,o),s+="\0";break;case"":s+=r.substring(i,o+1);break;default:q(61167,{path:r})}i=o+2}return new J(n)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ln="remoteDocuments",vi="owner",pr="owner",ti="mutationQueues",fI="userId",ct="mutations",jh="batchId",qn="userMutationsIndex",zh=["userId","batchId"];/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wo(r,e){return[r,ze(e)]}function og(r,e,t){return[r,ze(e),t]}const gI={},Fr="documentMutations",Oo="remoteDocumentsV14",mI=["prefixPath","collectionGroup","readTime","documentId"],Io="documentKeyIndex",pI=["prefixPath","collectionGroup","documentId"],ag="collectionGroupIndex",_I=["collectionGroup","readTime","prefixPath","documentId"],ni="remoteDocumentGlobal",Cc="remoteDocumentGlobalKey",Ur="targets",cg="queryTargetsIndex",yI=["canonicalId","targetId"],Br="targetDocuments",wI=["targetId","path"],hl="documentTargetsIndex",II=["path","targetId"],Lo="targetGlobalKey",Gn="targetGlobal",ri="collectionParents",bI=["collectionId","parent"],$r="clientMetadata",vI="clientId",aa="bundles",TI="bundleId",ca="namedQueries",EI="name",dl="indexConfiguration",AI="indexId",Dc="collectionGroupIndex",SI="collectionGroup",Gs="indexState",RI=["indexId","uid"],lg="sequenceNumberIndex",PI=["uid","sequenceNumber"],Ks="indexEntries",xI=["indexId","uid","arrayValue","directionalValue","orderedDocumentKey","documentKey"],ug="documentKeyIndex",CI=["indexId","uid","orderedDocumentKey"],la="documentOverlays",DI=["userId","collectionPath","documentId"],kc="collectionPathOverlayIndex",kI=["userId","collectionPath","largestBatchId"],hg="collectionGroupOverlayIndex",VI=["userId","collectionGroup","largestBatchId"],fl="globals",NI="name",dg=[ti,ct,Fr,Ln,Ur,vi,Gn,Br,$r,ni,ri,aa,ca],MI=[...dg,la],fg=[ti,ct,Fr,Oo,Ur,vi,Gn,Br,$r,ni,ri,aa,ca,la],gg=fg,gl=[...gg,dl,Gs,Ks],OI=gl,mg=[...gl,fl],LI=mg;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vc extends rg{constructor(e,t){super(),this.le=e,this.currentSequenceNumber=t}}function Ce(r,e){const t=O(r);return wt.O(t.le,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Gh(r){let e=0;for(const t in r)Object.prototype.hasOwnProperty.call(r,t)&&e++;return e}function En(r,e){for(const t in r)Object.prototype.hasOwnProperty.call(r,t)&&e(t,r[t])}function pg(r,e){const t=[];for(const n in r)Object.prototype.hasOwnProperty.call(r,n)&&t.push(e(r[n],n,r));return t}function _g(r){for(const e in r)if(Object.prototype.hasOwnProperty.call(r,e))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class he{constructor(e,t){this.comparator=e,this.root=t||Me.EMPTY}insert(e,t){return new he(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,Me.BLACK,null,null))}remove(e){return new he(this.comparator,this.root.remove(e,this.comparator).copy(null,null,Me.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const n=this.comparator(e,t.key);if(n===0)return t.value;n<0?t=t.left:n>0&&(t=t.right)}return null}indexOf(e){let t=0,n=this.root;for(;!n.isEmpty();){const s=this.comparator(e,n.key);if(s===0)return t+n.left.size;s<0?n=n.left:(t+=n.left.size+1,n=n.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal(((t,n)=>(e(t,n),!1)))}toString(){const e=[];return this.inorderTraversal(((t,n)=>(e.push(`${t}:${n}`),!1))),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new ao(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new ao(this.root,e,this.comparator,!1)}getReverseIterator(){return new ao(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new ao(this.root,e,this.comparator,!0)}}class ao{constructor(e,t,n,s){this.isReverse=s,this.nodeStack=[];let i=1;for(;!e.isEmpty();)if(i=t?n(e.key,t):1,t&&s&&(i*=-1),i<0)e=this.isReverse?e.left:e.right;else{if(i===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class Me{constructor(e,t,n,s,i){this.key=e,this.value=t,this.color=n??Me.RED,this.left=s??Me.EMPTY,this.right=i??Me.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,n,s,i){return new Me(e??this.key,t??this.value,n??this.color,s??this.left,i??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,n){let s=this;const i=n(e,s.key);return s=i<0?s.copy(null,null,null,s.left.insert(e,t,n),null):i===0?s.copy(null,t,null,null,null):s.copy(null,null,null,null,s.right.insert(e,t,n)),s.fixUp()}removeMin(){if(this.left.isEmpty())return Me.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let n,s=this;if(t(e,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(e,t),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),t(e,s.key)===0){if(s.right.isEmpty())return Me.EMPTY;n=s.right.min(),s=s.copy(n.key,n.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(e,t))}return s.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,Me.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,Me.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw q(43730,{key:this.key,value:this.value});if(this.right.isRed())throw q(14113,{key:this.key,value:this.value});const e=this.left.check();if(e!==this.right.check())throw q(27949);return e+(this.isRed()?0:1)}}Me.EMPTY=null,Me.RED=!0,Me.BLACK=!1;Me.EMPTY=new class{constructor(){this.size=0}get key(){throw q(57766)}get value(){throw q(16141)}get color(){throw q(16727)}get left(){throw q(29726)}get right(){throw q(36894)}copy(e,t,n,s,i){return this}insert(e,t,n){return new Me(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ae{constructor(e){this.comparator=e,this.data=new he(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal(((t,n)=>(e(t),!1)))}forEachInRange(e,t){const n=this.data.getIteratorFrom(e[0]);for(;n.hasNext();){const s=n.getNext();if(this.comparator(s.key,e[1])>=0)return;t(s.key)}}forEachWhile(e,t){let n;for(n=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();n.hasNext();)if(!e(n.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new Kh(this.data.getIterator())}getIteratorFrom(e){return new Kh(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach((n=>{t=t.add(n)})),t}isEqual(e){if(!(e instanceof ae)||this.size!==e.size)return!1;const t=this.data.getIterator(),n=e.data.getIterator();for(;t.hasNext();){const s=t.getNext().key,i=n.getNext().key;if(this.comparator(s,i)!==0)return!1}return!0}toArray(){const e=[];return this.forEach((t=>{e.push(t)})),e}toString(){const e=[];return this.forEach((t=>e.push(t))),"SortedSet("+e.toString()+")"}copy(e){const t=new ae(this.comparator);return t.data=e,t}}class Kh{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}function _r(r){return r.hasNext()?r.getNext():void 0}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Je{constructor(e){this.fields=e,e.sort(ge.comparator)}static empty(){return new Je([])}unionWith(e){let t=new ae(ge.comparator);for(const n of this.fields)t=t.add(n);for(const n of e)t=t.add(n);return new Je(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return Nr(this.fields,e.fields,((t,n)=>t.isEqual(n)))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yg extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function FI(){return typeof atob<"u"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ie{constructor(e){this.binaryString=e}static fromBase64String(e){const t=(function(s){try{return atob(s)}catch(i){throw typeof DOMException<"u"&&i instanceof DOMException?new yg("Invalid base64 string: "+i):i}})(e);return new Ie(t)}static fromUint8Array(e){const t=(function(s){let i="";for(let o=0;o<s.length;++o)i+=String.fromCharCode(s[o]);return i})(e);return new Ie(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return(function(t){return btoa(t)})(this.binaryString)}toUint8Array(){return(function(t){const n=new Uint8Array(t.length);for(let s=0;s<t.length;s++)n[s]=t.charCodeAt(s);return n})(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return K(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}Ie.EMPTY_BYTE_STRING=new Ie("");const UI=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function Nt(r){if(z(!!r,39018),typeof r=="string"){let e=0;const t=UI.exec(r);if(z(!!t,46558,{timestamp:r}),t[1]){let s=t[1];s=(s+"000000000").substr(0,9),e=Number(s)}const n=new Date(r);return{seconds:Math.floor(n.getTime()/1e3),nanos:e}}return{seconds:_e(r.seconds),nanos:_e(r.nanos)}}function _e(r){return typeof r=="number"?r:typeof r=="string"?Number(r):0}function Mt(r){return typeof r=="string"?Ie.fromBase64String(r):Ie.fromUint8Array(r)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wg="server_timestamp",Ig="__type__",bg="__previous_value__",vg="__local_write_time__";function ua(r){return(r?.mapValue?.fields||{})[Ig]?.stringValue===wg}function ha(r){const e=r.mapValue.fields[bg];return ua(e)?ha(e):e}function si(r){const e=Nt(r.mapValue.fields[vg].timestampValue);return new se(e.seconds,e.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class BI{constructor(e,t,n,s,i,o,c,l,u,f){this.databaseId=e,this.appId=t,this.persistenceKey=n,this.host=s,this.ssl=i,this.forceLongPolling=o,this.autoDetectLongPolling=c,this.longPollingOptions=l,this.useFetchStreams=u,this.isUsingEmulator=f}}const ii="(default)";class mn{constructor(e,t){this.projectId=e,this.database=t||ii}static empty(){return new mn("","")}get isDefaultDatabase(){return this.database===ii}isEqual(e){return e instanceof mn&&e.projectId===this.projectId&&e.database===this.database}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ml="__type__",Tg="__max__",an={mapValue:{fields:{__type__:{stringValue:Tg}}}},pl="__vector__",qr="value",bo={nullValue:"NULL_VALUE"};function pn(r){return"nullValue"in r?0:"booleanValue"in r?1:"integerValue"in r||"doubleValue"in r?2:"timestampValue"in r?3:"stringValue"in r?5:"bytesValue"in r?6:"referenceValue"in r?7:"geoPointValue"in r?8:"arrayValue"in r?9:"mapValue"in r?ua(r)?4:Eg(r)?9007199254740991:da(r)?10:11:q(28295,{value:r})}function Tt(r,e){if(r===e)return!0;const t=pn(r);if(t!==pn(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return r.booleanValue===e.booleanValue;case 4:return si(r).isEqual(si(e));case 3:return(function(s,i){if(typeof s.timestampValue=="string"&&typeof i.timestampValue=="string"&&s.timestampValue.length===i.timestampValue.length)return s.timestampValue===i.timestampValue;const o=Nt(s.timestampValue),c=Nt(i.timestampValue);return o.seconds===c.seconds&&o.nanos===c.nanos})(r,e);case 5:return r.stringValue===e.stringValue;case 6:return(function(s,i){return Mt(s.bytesValue).isEqual(Mt(i.bytesValue))})(r,e);case 7:return r.referenceValue===e.referenceValue;case 8:return(function(s,i){return _e(s.geoPointValue.latitude)===_e(i.geoPointValue.latitude)&&_e(s.geoPointValue.longitude)===_e(i.geoPointValue.longitude)})(r,e);case 2:return(function(s,i){if("integerValue"in s&&"integerValue"in i)return _e(s.integerValue)===_e(i.integerValue);if("doubleValue"in s&&"doubleValue"in i){const o=_e(s.doubleValue),c=_e(i.doubleValue);return o===c?ei(o)===ei(c):isNaN(o)&&isNaN(c)}return!1})(r,e);case 9:return Nr(r.arrayValue.values||[],e.arrayValue.values||[],Tt);case 10:case 11:return(function(s,i){const o=s.mapValue.fields||{},c=i.mapValue.fields||{};if(Gh(o)!==Gh(c))return!1;for(const l in o)if(o.hasOwnProperty(l)&&(c[l]===void 0||!Tt(o[l],c[l])))return!1;return!0})(r,e);default:return q(52216,{left:r})}}function oi(r,e){return(r.values||[]).find((t=>Tt(t,e)))!==void 0}function _n(r,e){if(r===e)return 0;const t=pn(r),n=pn(e);if(t!==n)return K(t,n);switch(t){case 0:case 9007199254740991:return 0;case 1:return K(r.booleanValue,e.booleanValue);case 2:return(function(i,o){const c=_e(i.integerValue||i.doubleValue),l=_e(o.integerValue||o.doubleValue);return c<l?-1:c>l?1:c===l?0:isNaN(c)?isNaN(l)?0:-1:1})(r,e);case 3:return Hh(r.timestampValue,e.timestampValue);case 4:return Hh(si(r),si(e));case 5:return Rc(r.stringValue,e.stringValue);case 6:return(function(i,o){const c=Mt(i),l=Mt(o);return c.compareTo(l)})(r.bytesValue,e.bytesValue);case 7:return(function(i,o){const c=i.split("/"),l=o.split("/");for(let u=0;u<c.length&&u<l.length;u++){const f=K(c[u],l[u]);if(f!==0)return f}return K(c.length,l.length)})(r.referenceValue,e.referenceValue);case 8:return(function(i,o){const c=K(_e(i.latitude),_e(o.latitude));return c!==0?c:K(_e(i.longitude),_e(o.longitude))})(r.geoPointValue,e.geoPointValue);case 9:return Wh(r.arrayValue,e.arrayValue);case 10:return(function(i,o){const c=i.fields||{},l=o.fields||{},u=c[qr]?.arrayValue,f=l[qr]?.arrayValue,g=K(u?.values?.length||0,f?.values?.length||0);return g!==0?g:Wh(u,f)})(r.mapValue,e.mapValue);case 11:return(function(i,o){if(i===an.mapValue&&o===an.mapValue)return 0;if(i===an.mapValue)return 1;if(o===an.mapValue)return-1;const c=i.fields||{},l=Object.keys(c),u=o.fields||{},f=Object.keys(u);l.sort(),f.sort();for(let g=0;g<l.length&&g<f.length;++g){const p=Rc(l[g],f[g]);if(p!==0)return p;const E=_n(c[l[g]],u[f[g]]);if(E!==0)return E}return K(l.length,f.length)})(r.mapValue,e.mapValue);default:throw q(23264,{he:t})}}function Hh(r,e){if(typeof r=="string"&&typeof e=="string"&&r.length===e.length)return K(r,e);const t=Nt(r),n=Nt(e),s=K(t.seconds,n.seconds);return s!==0?s:K(t.nanos,n.nanos)}function Wh(r,e){const t=r.values||[],n=e.values||[];for(let s=0;s<t.length&&s<n.length;++s){const i=_n(t[s],n[s]);if(i)return i}return K(t.length,n.length)}function jr(r){return Nc(r)}function Nc(r){return"nullValue"in r?"null":"booleanValue"in r?""+r.booleanValue:"integerValue"in r?""+r.integerValue:"doubleValue"in r?""+r.doubleValue:"timestampValue"in r?(function(t){const n=Nt(t);return`time(${n.seconds},${n.nanos})`})(r.timestampValue):"stringValue"in r?r.stringValue:"bytesValue"in r?(function(t){return Mt(t).toBase64()})(r.bytesValue):"referenceValue"in r?(function(t){return M.fromName(t).toString()})(r.referenceValue):"geoPointValue"in r?(function(t){return`geo(${t.latitude},${t.longitude})`})(r.geoPointValue):"arrayValue"in r?(function(t){let n="[",s=!0;for(const i of t.values||[])s?s=!1:n+=",",n+=Nc(i);return n+"]"})(r.arrayValue):"mapValue"in r?(function(t){const n=Object.keys(t.fields||{}).sort();let s="{",i=!0;for(const o of n)i?i=!1:s+=",",s+=`${o}:${Nc(t.fields[o])}`;return s+"}"})(r.mapValue):q(61005,{value:r})}function vo(r){switch(pn(r)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const e=ha(r);return e?16+vo(e):16;case 5:return 2*r.stringValue.length;case 6:return Mt(r.bytesValue).approximateByteSize();case 7:return r.referenceValue.length;case 9:return(function(n){return(n.values||[]).reduce(((s,i)=>s+vo(i)),0)})(r.arrayValue);case 10:case 11:return(function(n){let s=0;return En(n.fields,((i,o)=>{s+=i.length+vo(o)})),s})(r.mapValue);default:throw q(13486,{value:r})}}function Qn(r,e){return{referenceValue:`projects/${r.projectId}/databases/${r.database}/documents/${e.path.canonicalString()}`}}function Mc(r){return!!r&&"integerValue"in r}function ai(r){return!!r&&"arrayValue"in r}function Qh(r){return!!r&&"nullValue"in r}function Jh(r){return!!r&&"doubleValue"in r&&isNaN(Number(r.doubleValue))}function To(r){return!!r&&"mapValue"in r}function da(r){return(r?.mapValue?.fields||{})[ml]?.stringValue===pl}function Hs(r){if(r.geoPointValue)return{geoPointValue:{...r.geoPointValue}};if(r.timestampValue&&typeof r.timestampValue=="object")return{timestampValue:{...r.timestampValue}};if(r.mapValue){const e={mapValue:{fields:{}}};return En(r.mapValue.fields,((t,n)=>e.mapValue.fields[t]=Hs(n))),e}if(r.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(r.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=Hs(r.arrayValue.values[t]);return e}return{...r}}function Eg(r){return(((r.mapValue||{}).fields||{}).__type__||{}).stringValue===Tg}const Ag={mapValue:{fields:{[ml]:{stringValue:pl},[qr]:{arrayValue:{}}}}};function $I(r){return"nullValue"in r?bo:"booleanValue"in r?{booleanValue:!1}:"integerValue"in r||"doubleValue"in r?{doubleValue:NaN}:"timestampValue"in r?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"stringValue"in r?{stringValue:""}:"bytesValue"in r?{bytesValue:""}:"referenceValue"in r?Qn(mn.empty(),M.empty()):"geoPointValue"in r?{geoPointValue:{latitude:-90,longitude:-180}}:"arrayValue"in r?{arrayValue:{}}:"mapValue"in r?da(r)?Ag:{mapValue:{}}:q(35942,{value:r})}function qI(r){return"nullValue"in r?{booleanValue:!1}:"booleanValue"in r?{doubleValue:NaN}:"integerValue"in r||"doubleValue"in r?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"timestampValue"in r?{stringValue:""}:"stringValue"in r?{bytesValue:""}:"bytesValue"in r?Qn(mn.empty(),M.empty()):"referenceValue"in r?{geoPointValue:{latitude:-90,longitude:-180}}:"geoPointValue"in r?{arrayValue:{}}:"arrayValue"in r?Ag:"mapValue"in r?da(r)?{mapValue:{}}:an:q(61959,{value:r})}function Yh(r,e){const t=_n(r.value,e.value);return t!==0?t:r.inclusive&&!e.inclusive?-1:!r.inclusive&&e.inclusive?1:0}function Xh(r,e){const t=_n(r.value,e.value);return t!==0?t:r.inclusive&&!e.inclusive?1:!r.inclusive&&e.inclusive?-1:0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Oe{constructor(e){this.value=e}static empty(){return new Oe({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let n=0;n<e.length-1;++n)if(t=(t.mapValue.fields||{})[e.get(n)],!To(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=Hs(t)}setAll(e){let t=ge.emptyPath(),n={},s=[];e.forEach(((o,c)=>{if(!t.isImmediateParentOf(c)){const l=this.getFieldsMap(t);this.applyChanges(l,n,s),n={},s=[],t=c.popLast()}o?n[c.lastSegment()]=Hs(o):s.push(c.lastSegment())}));const i=this.getFieldsMap(t);this.applyChanges(i,n,s)}delete(e){const t=this.field(e.popLast());To(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return Tt(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let n=0;n<e.length;++n){let s=t.mapValue.fields[e.get(n)];To(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},t.mapValue.fields[e.get(n)]=s),t=s}return t.mapValue.fields}applyChanges(e,t,n){En(t,((s,i)=>e[s]=i));for(const s of n)delete e[s]}clone(){return new Oe(Hs(this.value))}}function Sg(r){const e=[];return En(r.fields,((t,n)=>{const s=new ge([t]);if(To(n)){const i=Sg(n.mapValue).fields;if(i.length===0)e.push(s);else for(const o of i)e.push(s.child(o))}else e.push(s)})),new Je(e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fe{constructor(e,t,n,s,i,o,c){this.key=e,this.documentType=t,this.version=n,this.readTime=s,this.createTime=i,this.data=o,this.documentState=c}static newInvalidDocument(e){return new fe(e,0,G.min(),G.min(),G.min(),Oe.empty(),0)}static newFoundDocument(e,t,n,s){return new fe(e,1,t,G.min(),n,s,0)}static newNoDocument(e,t){return new fe(e,2,t,G.min(),G.min(),Oe.empty(),0)}static newUnknownDocument(e,t){return new fe(e,3,t,G.min(),G.min(),Oe.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(G.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=Oe.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=Oe.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=G.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof fe&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new fe(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yn{constructor(e,t){this.position=e,this.inclusive=t}}function Zh(r,e,t){let n=0;for(let s=0;s<r.position.length;s++){const i=e[s],o=r.position[s];if(i.field.isKeyField()?n=M.comparator(M.fromName(o.referenceValue),t.key):n=_n(o,t.data.field(i.field)),i.dir==="desc"&&(n*=-1),n!==0)break}return n}function ed(r,e){if(r===null)return e===null;if(e===null||r.inclusive!==e.inclusive||r.position.length!==e.position.length)return!1;for(let t=0;t<r.position.length;t++)if(!Tt(r.position[t],e.position[t]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ci{constructor(e,t="asc"){this.field=e,this.dir=t}}function jI(r,e){return r.dir===e.dir&&r.field.isEqual(e.field)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rg{}class Z extends Rg{constructor(e,t,n){super(),this.field=e,this.op=t,this.value=n}static create(e,t,n){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,n):new zI(e,t,n):t==="array-contains"?new HI(e,n):t==="in"?new Vg(e,n):t==="not-in"?new WI(e,n):t==="array-contains-any"?new QI(e,n):new Z(e,t,n)}static createKeyFieldInFilter(e,t,n){return t==="in"?new GI(e,n):new KI(e,n)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&t.nullValue===void 0&&this.matchesComparison(_n(t,this.value)):t!==null&&pn(this.value)===pn(t)&&this.matchesComparison(_n(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return q(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class ie extends Rg{constructor(e,t){super(),this.filters=e,this.op=t,this.Pe=null}static create(e,t){return new ie(e,t)}matches(e){return zr(this)?this.filters.find((t=>!t.matches(e)))===void 0:this.filters.find((t=>t.matches(e)))!==void 0}getFlattenedFilters(){return this.Pe!==null||(this.Pe=this.filters.reduce(((e,t)=>e.concat(t.getFlattenedFilters())),[])),this.Pe}getFilters(){return Object.assign([],this.filters)}}function zr(r){return r.op==="and"}function Oc(r){return r.op==="or"}function _l(r){return Pg(r)&&zr(r)}function Pg(r){for(const e of r.filters)if(e instanceof ie)return!1;return!0}function Lc(r){if(r instanceof Z)return r.field.canonicalString()+r.op.toString()+jr(r.value);if(_l(r))return r.filters.map((e=>Lc(e))).join(",");{const e=r.filters.map((t=>Lc(t))).join(",");return`${r.op}(${e})`}}function xg(r,e){return r instanceof Z?(function(n,s){return s instanceof Z&&n.op===s.op&&n.field.isEqual(s.field)&&Tt(n.value,s.value)})(r,e):r instanceof ie?(function(n,s){return s instanceof ie&&n.op===s.op&&n.filters.length===s.filters.length?n.filters.reduce(((i,o,c)=>i&&xg(o,s.filters[c])),!0):!1})(r,e):void q(19439)}function Cg(r,e){const t=r.filters.concat(e);return ie.create(t,r.op)}function Dg(r){return r instanceof Z?(function(t){return`${t.field.canonicalString()} ${t.op} ${jr(t.value)}`})(r):r instanceof ie?(function(t){return t.op.toString()+" {"+t.getFilters().map(Dg).join(" ,")+"}"})(r):"Filter"}class zI extends Z{constructor(e,t,n){super(e,t,n),this.key=M.fromName(n.referenceValue)}matches(e){const t=M.comparator(e.key,this.key);return this.matchesComparison(t)}}class GI extends Z{constructor(e,t){super(e,"in",t),this.keys=kg("in",t)}matches(e){return this.keys.some((t=>t.isEqual(e.key)))}}class KI extends Z{constructor(e,t){super(e,"not-in",t),this.keys=kg("not-in",t)}matches(e){return!this.keys.some((t=>t.isEqual(e.key)))}}function kg(r,e){return(e.arrayValue?.values||[]).map((t=>M.fromName(t.referenceValue)))}class HI extends Z{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return ai(t)&&oi(t.arrayValue,this.value)}}class Vg extends Z{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&oi(this.value.arrayValue,t)}}class WI extends Z{constructor(e,t){super(e,"not-in",t)}matches(e){if(oi(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&t.nullValue===void 0&&!oi(this.value.arrayValue,t)}}class QI extends Z{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!ai(t)||!t.arrayValue.values)&&t.arrayValue.values.some((n=>oi(this.value.arrayValue,n)))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class JI{constructor(e,t=null,n=[],s=[],i=null,o=null,c=null){this.path=e,this.collectionGroup=t,this.orderBy=n,this.filters=s,this.limit=i,this.startAt=o,this.endAt=c,this.Te=null}}function Fc(r,e=null,t=[],n=[],s=null,i=null,o=null){return new JI(r,e,t,n,s,i,o)}function Jn(r){const e=O(r);if(e.Te===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map((n=>Lc(n))).join(","),t+="|ob:",t+=e.orderBy.map((n=>(function(i){return i.field.canonicalString()+i.dir})(n))).join(","),bi(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map((n=>jr(n))).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map((n=>jr(n))).join(",")),e.Te=t}return e.Te}function Ti(r,e){if(r.limit!==e.limit||r.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<r.orderBy.length;t++)if(!jI(r.orderBy[t],e.orderBy[t]))return!1;if(r.filters.length!==e.filters.length)return!1;for(let t=0;t<r.filters.length;t++)if(!xg(r.filters[t],e.filters[t]))return!1;return r.collectionGroup===e.collectionGroup&&!!r.path.isEqual(e.path)&&!!ed(r.startAt,e.startAt)&&ed(r.endAt,e.endAt)}function Fo(r){return M.isDocumentKey(r.path)&&r.collectionGroup===null&&r.filters.length===0}function Uo(r,e){return r.filters.filter((t=>t instanceof Z&&t.field.isEqual(e)))}function td(r,e,t){let n=bo,s=!0;for(const i of Uo(r,e)){let o=bo,c=!0;switch(i.op){case"<":case"<=":o=$I(i.value);break;case"==":case"in":case">=":o=i.value;break;case">":o=i.value,c=!1;break;case"!=":case"not-in":o=bo}Yh({value:n,inclusive:s},{value:o,inclusive:c})<0&&(n=o,s=c)}if(t!==null){for(let i=0;i<r.orderBy.length;++i)if(r.orderBy[i].field.isEqual(e)){const o=t.position[i];Yh({value:n,inclusive:s},{value:o,inclusive:t.inclusive})<0&&(n=o,s=t.inclusive);break}}return{value:n,inclusive:s}}function nd(r,e,t){let n=an,s=!0;for(const i of Uo(r,e)){let o=an,c=!0;switch(i.op){case">=":case">":o=qI(i.value),c=!1;break;case"==":case"in":case"<=":o=i.value;break;case"<":o=i.value,c=!1;break;case"!=":case"not-in":o=an}Xh({value:n,inclusive:s},{value:o,inclusive:c})>0&&(n=o,s=c)}if(t!==null){for(let i=0;i<r.orderBy.length;++i)if(r.orderBy[i].field.isEqual(e)){const o=t.position[i];Xh({value:n,inclusive:s},{value:o,inclusive:t.inclusive})>0&&(n=o,s=t.inclusive);break}}return{value:n,inclusive:s}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bt{constructor(e,t=null,n=[],s=[],i=null,o="F",c=null,l=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=n,this.filters=s,this.limit=i,this.limitType=o,this.startAt=c,this.endAt=l,this.Ie=null,this.Ee=null,this.de=null,this.startAt,this.endAt}}function Ng(r,e,t,n,s,i,o,c){return new Bt(r,e,t,n,s,i,o,c)}function rs(r){return new Bt(r)}function rd(r){return r.filters.length===0&&r.limit===null&&r.startAt==null&&r.endAt==null&&(r.explicitOrderBy.length===0||r.explicitOrderBy.length===1&&r.explicitOrderBy[0].field.isKeyField())}function yl(r){return r.collectionGroup!==null}function Rr(r){const e=O(r);if(e.Ie===null){e.Ie=[];const t=new Set;for(const i of e.explicitOrderBy)e.Ie.push(i),t.add(i.field.canonicalString());const n=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(o){let c=new ae(ge.comparator);return o.filters.forEach((l=>{l.getFlattenedFilters().forEach((u=>{u.isInequality()&&(c=c.add(u.field))}))})),c})(e).forEach((i=>{t.has(i.canonicalString())||i.isKeyField()||e.Ie.push(new ci(i,n))})),t.has(ge.keyField().canonicalString())||e.Ie.push(new ci(ge.keyField(),n))}return e.Ie}function Ge(r){const e=O(r);return e.Ee||(e.Ee=Og(e,Rr(r))),e.Ee}function Mg(r){const e=O(r);return e.de||(e.de=Og(e,r.explicitOrderBy)),e.de}function Og(r,e){if(r.limitType==="F")return Fc(r.path,r.collectionGroup,e,r.filters,r.limit,r.startAt,r.endAt);{e=e.map((s=>{const i=s.dir==="desc"?"asc":"desc";return new ci(s.field,i)}));const t=r.endAt?new yn(r.endAt.position,r.endAt.inclusive):null,n=r.startAt?new yn(r.startAt.position,r.startAt.inclusive):null;return Fc(r.path,r.collectionGroup,e,r.filters,r.limit,t,n)}}function Uc(r,e){const t=r.filters.concat([e]);return new Bt(r.path,r.collectionGroup,r.explicitOrderBy.slice(),t,r.limit,r.limitType,r.startAt,r.endAt)}function Bo(r,e,t){return new Bt(r.path,r.collectionGroup,r.explicitOrderBy.slice(),r.filters.slice(),e,t,r.startAt,r.endAt)}function Ei(r,e){return Ti(Ge(r),Ge(e))&&r.limitType===e.limitType}function Lg(r){return`${Jn(Ge(r))}|lt:${r.limitType}`}function Tr(r){return`Query(target=${(function(t){let n=t.path.canonicalString();return t.collectionGroup!==null&&(n+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(n+=`, filters: [${t.filters.map((s=>Dg(s))).join(", ")}]`),bi(t.limit)||(n+=", limit: "+t.limit),t.orderBy.length>0&&(n+=`, orderBy: [${t.orderBy.map((s=>(function(o){return`${o.field.canonicalString()} (${o.dir})`})(s))).join(", ")}]`),t.startAt&&(n+=", startAt: ",n+=t.startAt.inclusive?"b:":"a:",n+=t.startAt.position.map((s=>jr(s))).join(",")),t.endAt&&(n+=", endAt: ",n+=t.endAt.inclusive?"a:":"b:",n+=t.endAt.position.map((s=>jr(s))).join(",")),`Target(${n})`})(Ge(r))}; limitType=${r.limitType})`}function Ai(r,e){return e.isFoundDocument()&&(function(n,s){const i=s.key.path;return n.collectionGroup!==null?s.key.hasCollectionId(n.collectionGroup)&&n.path.isPrefixOf(i):M.isDocumentKey(n.path)?n.path.isEqual(i):n.path.isImmediateParentOf(i)})(r,e)&&(function(n,s){for(const i of Rr(n))if(!i.field.isKeyField()&&s.data.field(i.field)===null)return!1;return!0})(r,e)&&(function(n,s){for(const i of n.filters)if(!i.matches(s))return!1;return!0})(r,e)&&(function(n,s){return!(n.startAt&&!(function(o,c,l){const u=Zh(o,c,l);return o.inclusive?u<=0:u<0})(n.startAt,Rr(n),s)||n.endAt&&!(function(o,c,l){const u=Zh(o,c,l);return o.inclusive?u>=0:u>0})(n.endAt,Rr(n),s))})(r,e)}function Fg(r){return r.collectionGroup||(r.path.length%2==1?r.path.lastSegment():r.path.get(r.path.length-2))}function Ug(r){return(e,t)=>{let n=!1;for(const s of Rr(r)){const i=YI(s,e,t);if(i!==0)return i;n=n||s.field.isKeyField()}return 0}}function YI(r,e,t){const n=r.field.isKeyField()?M.comparator(e.key,t.key):(function(i,o,c){const l=o.data.field(i),u=c.data.field(i);return l!==null&&u!==null?_n(l,u):q(42886)})(r.field,e,t);switch(r.dir){case"asc":return n;case"desc":return-1*n;default:return q(19790,{direction:r.dir})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $t{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),n=this.inner[t];if(n!==void 0){for(const[s,i]of n)if(this.equalsFn(s,e))return i}}has(e){return this.get(e)!==void 0}set(e,t){const n=this.mapKeyFn(e),s=this.inner[n];if(s===void 0)return this.inner[n]=[[e,t]],void this.innerSize++;for(let i=0;i<s.length;i++)if(this.equalsFn(s[i][0],e))return void(s[i]=[e,t]);s.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),n=this.inner[t];if(n===void 0)return!1;for(let s=0;s<n.length;s++)if(this.equalsFn(n[s][0],e))return n.length===1?delete this.inner[t]:n.splice(s,1),this.innerSize--,!0;return!1}forEach(e){En(this.inner,((t,n)=>{for(const[s,i]of n)e(s,i)}))}isEmpty(){return _g(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const XI=new he(M.comparator);function Ye(){return XI}const Bg=new he(M.comparator);function Us(...r){let e=Bg;for(const t of r)e=e.insert(t.key,t);return e}function $g(r){let e=Bg;return r.forEach(((t,n)=>e=e.insert(t,n.overlayedDocument))),e}function _t(){return Ws()}function qg(){return Ws()}function Ws(){return new $t((r=>r.toString()),((r,e)=>r.isEqual(e)))}const ZI=new he(M.comparator),eb=new ae(M.comparator);function W(...r){let e=eb;for(const t of r)e=e.add(t);return e}const tb=new ae(K);function wl(){return tb}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Il(r,e){if(r.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:ei(e)?"-0":e}}function jg(r){return{integerValue:""+r}}function zg(r,e){return ig(e)?jg(e):Il(r,e)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fa{constructor(){this._=void 0}}function nb(r,e,t){return r instanceof Gr?(function(s,i){const o={fields:{[Ig]:{stringValue:wg},[vg]:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return i&&ua(i)&&(i=ha(i)),i&&(o.fields[bg]=i),{mapValue:o}})(t,e):r instanceof Yn?Kg(r,e):r instanceof Xn?Hg(r,e):(function(s,i){const o=Gg(s,i),c=sd(o)+sd(s.Ae);return Mc(o)&&Mc(s.Ae)?jg(c):Il(s.serializer,c)})(r,e)}function rb(r,e,t){return r instanceof Yn?Kg(r,e):r instanceof Xn?Hg(r,e):t}function Gg(r,e){return r instanceof Kr?(function(n){return Mc(n)||(function(i){return!!i&&"doubleValue"in i})(n)})(e)?e:{integerValue:0}:null}class Gr extends fa{}class Yn extends fa{constructor(e){super(),this.elements=e}}function Kg(r,e){const t=Wg(e);for(const n of r.elements)t.some((s=>Tt(s,n)))||t.push(n);return{arrayValue:{values:t}}}class Xn extends fa{constructor(e){super(),this.elements=e}}function Hg(r,e){let t=Wg(e);for(const n of r.elements)t=t.filter((s=>!Tt(s,n)));return{arrayValue:{values:t}}}class Kr extends fa{constructor(e,t){super(),this.serializer=e,this.Ae=t}}function sd(r){return _e(r.integerValue||r.doubleValue)}function Wg(r){return ai(r)&&r.arrayValue.values?r.arrayValue.values.slice():[]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Si{constructor(e,t){this.field=e,this.transform=t}}function sb(r,e){return r.field.isEqual(e.field)&&(function(n,s){return n instanceof Yn&&s instanceof Yn||n instanceof Xn&&s instanceof Xn?Nr(n.elements,s.elements,Tt):n instanceof Kr&&s instanceof Kr?Tt(n.Ae,s.Ae):n instanceof Gr&&s instanceof Gr})(r.transform,e.transform)}class ib{constructor(e,t){this.version=e,this.transformResults=t}}class ye{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new ye}static exists(e){return new ye(void 0,e)}static updateTime(e){return new ye(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function Eo(r,e){return r.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(r.updateTime):r.exists===void 0||r.exists===e.isFoundDocument()}class ga{}function Qg(r,e){if(!r.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return r.isNoDocument()?new is(r.key,ye.none()):new ss(r.key,r.data,ye.none());{const t=r.data,n=Oe.empty();let s=new ae(ge.comparator);for(let i of e.fields)if(!s.has(i)){let o=t.field(i);o===null&&i.length>1&&(i=i.popLast(),o=t.field(i)),o===null?n.delete(i):n.set(i,o),s=s.add(i)}return new qt(r.key,n,new Je(s.toArray()),ye.none())}}function ob(r,e,t){r instanceof ss?(function(s,i,o){const c=s.value.clone(),l=od(s.fieldTransforms,i,o.transformResults);c.setAll(l),i.convertToFoundDocument(o.version,c).setHasCommittedMutations()})(r,e,t):r instanceof qt?(function(s,i,o){if(!Eo(s.precondition,i))return void i.convertToUnknownDocument(o.version);const c=od(s.fieldTransforms,i,o.transformResults),l=i.data;l.setAll(Jg(s)),l.setAll(c),i.convertToFoundDocument(o.version,l).setHasCommittedMutations()})(r,e,t):(function(s,i,o){i.convertToNoDocument(o.version).setHasCommittedMutations()})(0,e,t)}function Qs(r,e,t,n){return r instanceof ss?(function(i,o,c,l){if(!Eo(i.precondition,o))return c;const u=i.value.clone(),f=ad(i.fieldTransforms,l,o);return u.setAll(f),o.convertToFoundDocument(o.version,u).setHasLocalMutations(),null})(r,e,t,n):r instanceof qt?(function(i,o,c,l){if(!Eo(i.precondition,o))return c;const u=ad(i.fieldTransforms,l,o),f=o.data;return f.setAll(Jg(i)),f.setAll(u),o.convertToFoundDocument(o.version,f).setHasLocalMutations(),c===null?null:c.unionWith(i.fieldMask.fields).unionWith(i.fieldTransforms.map((g=>g.field)))})(r,e,t,n):(function(i,o,c){return Eo(i.precondition,o)?(o.convertToNoDocument(o.version).setHasLocalMutations(),null):c})(r,e,t)}function ab(r,e){let t=null;for(const n of r.fieldTransforms){const s=e.data.field(n.field),i=Gg(n.transform,s||null);i!=null&&(t===null&&(t=Oe.empty()),t.set(n.field,i))}return t||null}function id(r,e){return r.type===e.type&&!!r.key.isEqual(e.key)&&!!r.precondition.isEqual(e.precondition)&&!!(function(n,s){return n===void 0&&s===void 0||!(!n||!s)&&Nr(n,s,((i,o)=>sb(i,o)))})(r.fieldTransforms,e.fieldTransforms)&&(r.type===0?r.value.isEqual(e.value):r.type!==1||r.data.isEqual(e.data)&&r.fieldMask.isEqual(e.fieldMask))}class ss extends ga{constructor(e,t,n,s=[]){super(),this.key=e,this.value=t,this.precondition=n,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class qt extends ga{constructor(e,t,n,s,i=[]){super(),this.key=e,this.data=t,this.fieldMask=n,this.precondition=s,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function Jg(r){const e=new Map;return r.fieldMask.fields.forEach((t=>{if(!t.isEmpty()){const n=r.data.field(t);e.set(t,n)}})),e}function od(r,e,t){const n=new Map;z(r.length===t.length,32656,{Re:t.length,Ve:r.length});for(let s=0;s<t.length;s++){const i=r[s],o=i.transform,c=e.data.field(i.field);n.set(i.field,rb(o,c,t[s]))}return n}function ad(r,e,t){const n=new Map;for(const s of r){const i=s.transform,o=t.data.field(s.field);n.set(s.field,nb(i,o,e))}return n}class is extends ga{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class bl extends ga{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vl{constructor(e,t,n,s){this.batchId=e,this.localWriteTime=t,this.baseMutations=n,this.mutations=s}applyToRemoteDocument(e,t){const n=t.mutationResults;for(let s=0;s<this.mutations.length;s++){const i=this.mutations[s];i.key.isEqual(e.key)&&ob(i,e,n[s])}}applyToLocalView(e,t){for(const n of this.baseMutations)n.key.isEqual(e.key)&&(t=Qs(n,e,t,this.localWriteTime));for(const n of this.mutations)n.key.isEqual(e.key)&&(t=Qs(n,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const n=qg();return this.mutations.forEach((s=>{const i=e.get(s.key),o=i.overlayedDocument;let c=this.applyToLocalView(o,i.mutatedFields);c=t.has(s.key)?null:c;const l=Qg(o,c);l!==null&&n.set(s.key,l),o.isValidDocument()||o.convertToNoDocument(G.min())})),n}keys(){return this.mutations.reduce(((e,t)=>e.add(t.key)),W())}isEqual(e){return this.batchId===e.batchId&&Nr(this.mutations,e.mutations,((t,n)=>id(t,n)))&&Nr(this.baseMutations,e.baseMutations,((t,n)=>id(t,n)))}}class Tl{constructor(e,t,n,s){this.batch=e,this.commitVersion=t,this.mutationResults=n,this.docVersions=s}static from(e,t,n){z(e.mutations.length===n.length,58842,{me:e.mutations.length,fe:n.length});let s=(function(){return ZI})();const i=e.mutations;for(let o=0;o<i.length;o++)s=s.insert(i[o].key,n[o].version);return new Tl(e,t,n,s)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class El{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yg{constructor(e,t,n){this.alias=e,this.aggregateType=t,this.fieldPath=n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cb{constructor(e,t){this.count=e,this.unchangedNames=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Ae,ee;function Xg(r){switch(r){case x.OK:return q(64938);case x.CANCELLED:case x.UNKNOWN:case x.DEADLINE_EXCEEDED:case x.RESOURCE_EXHAUSTED:case x.INTERNAL:case x.UNAVAILABLE:case x.UNAUTHENTICATED:return!1;case x.INVALID_ARGUMENT:case x.NOT_FOUND:case x.ALREADY_EXISTS:case x.PERMISSION_DENIED:case x.FAILED_PRECONDITION:case x.ABORTED:case x.OUT_OF_RANGE:case x.UNIMPLEMENTED:case x.DATA_LOSS:return!0;default:return q(15467,{code:r})}}function Zg(r){if(r===void 0)return ve("GRPC error has no .code"),x.UNKNOWN;switch(r){case Ae.OK:return x.OK;case Ae.CANCELLED:return x.CANCELLED;case Ae.UNKNOWN:return x.UNKNOWN;case Ae.DEADLINE_EXCEEDED:return x.DEADLINE_EXCEEDED;case Ae.RESOURCE_EXHAUSTED:return x.RESOURCE_EXHAUSTED;case Ae.INTERNAL:return x.INTERNAL;case Ae.UNAVAILABLE:return x.UNAVAILABLE;case Ae.UNAUTHENTICATED:return x.UNAUTHENTICATED;case Ae.INVALID_ARGUMENT:return x.INVALID_ARGUMENT;case Ae.NOT_FOUND:return x.NOT_FOUND;case Ae.ALREADY_EXISTS:return x.ALREADY_EXISTS;case Ae.PERMISSION_DENIED:return x.PERMISSION_DENIED;case Ae.FAILED_PRECONDITION:return x.FAILED_PRECONDITION;case Ae.ABORTED:return x.ABORTED;case Ae.OUT_OF_RANGE:return x.OUT_OF_RANGE;case Ae.UNIMPLEMENTED:return x.UNIMPLEMENTED;case Ae.DATA_LOSS:return x.DATA_LOSS;default:return q(39323,{code:r})}}(ee=Ae||(Ae={}))[ee.OK=0]="OK",ee[ee.CANCELLED=1]="CANCELLED",ee[ee.UNKNOWN=2]="UNKNOWN",ee[ee.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",ee[ee.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",ee[ee.NOT_FOUND=5]="NOT_FOUND",ee[ee.ALREADY_EXISTS=6]="ALREADY_EXISTS",ee[ee.PERMISSION_DENIED=7]="PERMISSION_DENIED",ee[ee.UNAUTHENTICATED=16]="UNAUTHENTICATED",ee[ee.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",ee[ee.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",ee[ee.ABORTED=10]="ABORTED",ee[ee.OUT_OF_RANGE=11]="OUT_OF_RANGE",ee[ee.UNIMPLEMENTED=12]="UNIMPLEMENTED",ee[ee.INTERNAL=13]="INTERNAL",ee[ee.UNAVAILABLE=14]="UNAVAILABLE",ee[ee.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Bc=null;/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function em(){return new TextEncoder}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const lb=new dn([4294967295,4294967295],0);function cd(r){const e=em().encode(r),t=new Bf;return t.update(e),new Uint8Array(t.digest())}function ld(r){const e=new DataView(r.buffer),t=e.getUint32(0,!0),n=e.getUint32(4,!0),s=e.getUint32(8,!0),i=e.getUint32(12,!0);return[new dn([t,n],0),new dn([s,i],0)]}class Al{constructor(e,t,n){if(this.bitmap=e,this.padding=t,this.hashCount=n,t<0||t>=8)throw new Bs(`Invalid padding: ${t}`);if(n<0)throw new Bs(`Invalid hash count: ${n}`);if(e.length>0&&this.hashCount===0)throw new Bs(`Invalid hash count: ${n}`);if(e.length===0&&t!==0)throw new Bs(`Invalid padding when bitmap length is 0: ${t}`);this.ge=8*e.length-t,this.pe=dn.fromNumber(this.ge)}ye(e,t,n){let s=e.add(t.multiply(dn.fromNumber(n)));return s.compare(lb)===1&&(s=new dn([s.getBits(0),s.getBits(1)],0)),s.modulo(this.pe).toNumber()}we(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(this.ge===0)return!1;const t=cd(e),[n,s]=ld(t);for(let i=0;i<this.hashCount;i++){const o=this.ye(n,s,i);if(!this.we(o))return!1}return!0}static create(e,t,n){const s=e%8==0?0:8-e%8,i=new Uint8Array(Math.ceil(e/8)),o=new Al(i,s,t);return n.forEach((c=>o.insert(c))),o}insert(e){if(this.ge===0)return;const t=cd(e),[n,s]=ld(t);for(let i=0;i<this.hashCount;i++){const o=this.ye(n,s,i);this.Se(o)}}Se(e){const t=Math.floor(e/8),n=e%8;this.bitmap[t]|=1<<n}}class Bs extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ri{constructor(e,t,n,s,i){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=n,this.documentUpdates=s,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(e,t,n){const s=new Map;return s.set(e,Pi.createSynthesizedTargetChangeForCurrentChange(e,t,n)),new Ri(G.min(),s,new he(K),Ye(),W())}}class Pi{constructor(e,t,n,s,i){this.resumeToken=e,this.current=t,this.addedDocuments=n,this.modifiedDocuments=s,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(e,t,n){return new Pi(n,t,W(),W(),W())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ao{constructor(e,t,n,s){this.be=e,this.removedTargetIds=t,this.key=n,this.De=s}}class tm{constructor(e,t){this.targetId=e,this.Ce=t}}class nm{constructor(e,t,n=Ie.EMPTY_BYTE_STRING,s=null){this.state=e,this.targetIds=t,this.resumeToken=n,this.cause=s}}class ud{constructor(){this.ve=0,this.Fe=hd(),this.Me=Ie.EMPTY_BYTE_STRING,this.xe=!1,this.Oe=!0}get current(){return this.xe}get resumeToken(){return this.Me}get Ne(){return this.ve!==0}get Be(){return this.Oe}Le(e){e.approximateByteSize()>0&&(this.Oe=!0,this.Me=e)}ke(){let e=W(),t=W(),n=W();return this.Fe.forEach(((s,i)=>{switch(i){case 0:e=e.add(s);break;case 2:t=t.add(s);break;case 1:n=n.add(s);break;default:q(38017,{changeType:i})}})),new Pi(this.Me,this.xe,e,t,n)}qe(){this.Oe=!1,this.Fe=hd()}Qe(e,t){this.Oe=!0,this.Fe=this.Fe.insert(e,t)}$e(e){this.Oe=!0,this.Fe=this.Fe.remove(e)}Ue(){this.ve+=1}Ke(){this.ve-=1,z(this.ve>=0,3241,{ve:this.ve})}We(){this.Oe=!0,this.xe=!0}}class ub{constructor(e){this.Ge=e,this.ze=new Map,this.je=Ye(),this.Je=co(),this.He=co(),this.Ye=new he(K)}Ze(e){for(const t of e.be)e.De&&e.De.isFoundDocument()?this.Xe(t,e.De):this.et(t,e.key,e.De);for(const t of e.removedTargetIds)this.et(t,e.key,e.De)}tt(e){this.forEachTarget(e,(t=>{const n=this.nt(t);switch(e.state){case 0:this.rt(t)&&n.Le(e.resumeToken);break;case 1:n.Ke(),n.Ne||n.qe(),n.Le(e.resumeToken);break;case 2:n.Ke(),n.Ne||this.removeTarget(t);break;case 3:this.rt(t)&&(n.We(),n.Le(e.resumeToken));break;case 4:this.rt(t)&&(this.it(t),n.Le(e.resumeToken));break;default:q(56790,{state:e.state})}}))}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.ze.forEach(((n,s)=>{this.rt(s)&&t(s)}))}st(e){const t=e.targetId,n=e.Ce.count,s=this.ot(t);if(s){const i=s.target;if(Fo(i))if(n===0){const o=new M(i.path);this.et(t,o,fe.newNoDocument(o,G.min()))}else z(n===1,20013,{expectedCount:n});else{const o=this._t(t);if(o!==n){const c=this.ut(e),l=c?this.ct(c,e,o):1;if(l!==0){this.it(t);const u=l===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ye=this.Ye.insert(t,u)}Bc?.lt((function(f,g,p,E,A){const D={localCacheCount:f,existenceFilterCount:g.count,databaseId:p.database,projectId:p.projectId},k=g.unchangedNames;return k&&(D.bloomFilter={applied:A===0,hashCount:k?.hashCount??0,bitmapLength:k?.bits?.bitmap?.length??0,padding:k?.bits?.padding??0,mightContain:B=>E?.mightContain(B)??!1}),D})(o,e.Ce,this.Ge.ht(),c,l))}}}}ut(e){const t=e.Ce.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:n="",padding:s=0},hashCount:i=0}=t;let o,c;try{o=Mt(n).toUint8Array()}catch(l){if(l instanceof yg)return nt("Decoding the base64 bloom filter in existence filter failed ("+l.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw l}try{c=new Al(o,s,i)}catch(l){return nt(l instanceof Bs?"BloomFilter error: ":"Applying bloom filter failed: ",l),null}return c.ge===0?null:c}ct(e,t,n){return t.Ce.count===n-this.Pt(e,t.targetId)?0:2}Pt(e,t){const n=this.Ge.getRemoteKeysForTarget(t);let s=0;return n.forEach((i=>{const o=this.Ge.ht(),c=`projects/${o.projectId}/databases/${o.database}/documents/${i.path.canonicalString()}`;e.mightContain(c)||(this.et(t,i,null),s++)})),s}Tt(e){const t=new Map;this.ze.forEach(((i,o)=>{const c=this.ot(o);if(c){if(i.current&&Fo(c.target)){const l=new M(c.target.path);this.It(l).has(o)||this.Et(o,l)||this.et(o,l,fe.newNoDocument(l,e))}i.Be&&(t.set(o,i.ke()),i.qe())}}));let n=W();this.He.forEach(((i,o)=>{let c=!0;o.forEachWhile((l=>{const u=this.ot(l);return!u||u.purpose==="TargetPurposeLimboResolution"||(c=!1,!1)})),c&&(n=n.add(i))})),this.je.forEach(((i,o)=>o.setReadTime(e)));const s=new Ri(e,t,this.Ye,this.je,n);return this.je=Ye(),this.Je=co(),this.He=co(),this.Ye=new he(K),s}Xe(e,t){if(!this.rt(e))return;const n=this.Et(e,t.key)?2:0;this.nt(e).Qe(t.key,n),this.je=this.je.insert(t.key,t),this.Je=this.Je.insert(t.key,this.It(t.key).add(e)),this.He=this.He.insert(t.key,this.dt(t.key).add(e))}et(e,t,n){if(!this.rt(e))return;const s=this.nt(e);this.Et(e,t)?s.Qe(t,1):s.$e(t),this.He=this.He.insert(t,this.dt(t).delete(e)),this.He=this.He.insert(t,this.dt(t).add(e)),n&&(this.je=this.je.insert(t,n))}removeTarget(e){this.ze.delete(e)}_t(e){const t=this.nt(e).ke();return this.Ge.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}Ue(e){this.nt(e).Ue()}nt(e){let t=this.ze.get(e);return t||(t=new ud,this.ze.set(e,t)),t}dt(e){let t=this.He.get(e);return t||(t=new ae(K),this.He=this.He.insert(e,t)),t}It(e){let t=this.Je.get(e);return t||(t=new ae(K),this.Je=this.Je.insert(e,t)),t}rt(e){const t=this.ot(e)!==null;return t||N("WatchChangeAggregator","Detected inactive target",e),t}ot(e){const t=this.ze.get(e);return t&&t.Ne?null:this.Ge.At(e)}it(e){this.ze.set(e,new ud),this.Ge.getRemoteKeysForTarget(e).forEach((t=>{this.et(e,t,null)}))}Et(e,t){return this.Ge.getRemoteKeysForTarget(e).has(t)}}function co(){return new he(M.comparator)}function hd(){return new he(M.comparator)}const hb={asc:"ASCENDING",desc:"DESCENDING"},db={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},fb={and:"AND",or:"OR"};class gb{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function $c(r,e){return r.useProto3Json||bi(e)?e:{value:e}}function Hr(r,e){return r.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function rm(r,e){return r.useProto3Json?e.toBase64():e.toUint8Array()}function mb(r,e){return Hr(r,e.toTimestamp())}function Te(r){return z(!!r,49232),G.fromTimestamp((function(t){const n=Nt(t);return new se(n.seconds,n.nanos)})(r))}function Sl(r,e){return qc(r,e).canonicalString()}function qc(r,e){const t=(function(s){return new J(["projects",s.projectId,"databases",s.database])})(r).child("documents");return e===void 0?t:t.child(e)}function sm(r){const e=J.fromString(r);return z(fm(e),10190,{key:e.toString()}),e}function li(r,e){return Sl(r.databaseId,e.path)}function It(r,e){const t=sm(e);if(t.get(1)!==r.databaseId.projectId)throw new V(x.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+r.databaseId.projectId);if(t.get(3)!==r.databaseId.database)throw new V(x.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+r.databaseId.database);return new M(am(t))}function im(r,e){return Sl(r.databaseId,e)}function om(r){const e=sm(r);return e.length===4?J.emptyPath():am(e)}function jc(r){return new J(["projects",r.databaseId.projectId,"databases",r.databaseId.database]).canonicalString()}function am(r){return z(r.length>4&&r.get(4)==="documents",29091,{key:r.toString()}),r.popFirst(5)}function dd(r,e,t){return{name:li(r,e),fields:t.value.mapValue.fields}}function ma(r,e,t){const n=It(r,e.name),s=Te(e.updateTime),i=e.createTime?Te(e.createTime):G.min(),o=new Oe({mapValue:{fields:e.fields}}),c=fe.newFoundDocument(n,s,i,o);return t&&c.setHasCommittedMutations(),t?c.setHasCommittedMutations():c}function pb(r,e){return"found"in e?(function(n,s){z(!!s.found,43571),s.found.name,s.found.updateTime;const i=It(n,s.found.name),o=Te(s.found.updateTime),c=s.found.createTime?Te(s.found.createTime):G.min(),l=new Oe({mapValue:{fields:s.found.fields}});return fe.newFoundDocument(i,o,c,l)})(r,e):"missing"in e?(function(n,s){z(!!s.missing,3894),z(!!s.readTime,22933);const i=It(n,s.missing),o=Te(s.readTime);return fe.newNoDocument(i,o)})(r,e):q(7234,{result:e})}function _b(r,e){let t;if("targetChange"in e){e.targetChange;const n=(function(u){return u==="NO_CHANGE"?0:u==="ADD"?1:u==="REMOVE"?2:u==="CURRENT"?3:u==="RESET"?4:q(39313,{state:u})})(e.targetChange.targetChangeType||"NO_CHANGE"),s=e.targetChange.targetIds||[],i=(function(u,f){return u.useProto3Json?(z(f===void 0||typeof f=="string",58123),Ie.fromBase64String(f||"")):(z(f===void 0||f instanceof Buffer||f instanceof Uint8Array,16193),Ie.fromUint8Array(f||new Uint8Array))})(r,e.targetChange.resumeToken),o=e.targetChange.cause,c=o&&(function(u){const f=u.code===void 0?x.UNKNOWN:Zg(u.code);return new V(f,u.message||"")})(o);t=new nm(n,s,i,c||null)}else if("documentChange"in e){e.documentChange;const n=e.documentChange;n.document,n.document.name,n.document.updateTime;const s=It(r,n.document.name),i=Te(n.document.updateTime),o=n.document.createTime?Te(n.document.createTime):G.min(),c=new Oe({mapValue:{fields:n.document.fields}}),l=fe.newFoundDocument(s,i,o,c),u=n.targetIds||[],f=n.removedTargetIds||[];t=new Ao(u,f,l.key,l)}else if("documentDelete"in e){e.documentDelete;const n=e.documentDelete;n.document;const s=It(r,n.document),i=n.readTime?Te(n.readTime):G.min(),o=fe.newNoDocument(s,i),c=n.removedTargetIds||[];t=new Ao([],c,o.key,o)}else if("documentRemove"in e){e.documentRemove;const n=e.documentRemove;n.document;const s=It(r,n.document),i=n.removedTargetIds||[];t=new Ao([],i,s,null)}else{if(!("filter"in e))return q(11601,{Rt:e});{e.filter;const n=e.filter;n.targetId;const{count:s=0,unchangedNames:i}=n,o=new cb(s,i),c=n.targetId;t=new tm(c,o)}}return t}function ui(r,e){let t;if(e instanceof ss)t={update:dd(r,e.key,e.value)};else if(e instanceof is)t={delete:li(r,e.key)};else if(e instanceof qt)t={update:dd(r,e.key,e.data),updateMask:Tb(e.fieldMask)};else{if(!(e instanceof bl))return q(16599,{Vt:e.type});t={verify:li(r,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map((n=>(function(i,o){const c=o.transform;if(c instanceof Gr)return{fieldPath:o.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(c instanceof Yn)return{fieldPath:o.field.canonicalString(),appendMissingElements:{values:c.elements}};if(c instanceof Xn)return{fieldPath:o.field.canonicalString(),removeAllFromArray:{values:c.elements}};if(c instanceof Kr)return{fieldPath:o.field.canonicalString(),increment:c.Ae};throw q(20930,{transform:o.transform})})(0,n)))),e.precondition.isNone||(t.currentDocument=(function(s,i){return i.updateTime!==void 0?{updateTime:mb(s,i.updateTime)}:i.exists!==void 0?{exists:i.exists}:q(27497)})(r,e.precondition)),t}function zc(r,e){const t=e.currentDocument?(function(i){return i.updateTime!==void 0?ye.updateTime(Te(i.updateTime)):i.exists!==void 0?ye.exists(i.exists):ye.none()})(e.currentDocument):ye.none(),n=e.updateTransforms?e.updateTransforms.map((s=>(function(o,c){let l=null;if("setToServerValue"in c)z(c.setToServerValue==="REQUEST_TIME",16630,{proto:c}),l=new Gr;else if("appendMissingElements"in c){const f=c.appendMissingElements.values||[];l=new Yn(f)}else if("removeAllFromArray"in c){const f=c.removeAllFromArray.values||[];l=new Xn(f)}else"increment"in c?l=new Kr(o,c.increment):q(16584,{proto:c});const u=ge.fromServerFormat(c.fieldPath);return new Si(u,l)})(r,s))):[];if(e.update){e.update.name;const s=It(r,e.update.name),i=new Oe({mapValue:{fields:e.update.fields}});if(e.updateMask){const o=(function(l){const u=l.fieldPaths||[];return new Je(u.map((f=>ge.fromServerFormat(f))))})(e.updateMask);return new qt(s,i,o,t,n)}return new ss(s,i,t,n)}if(e.delete){const s=It(r,e.delete);return new is(s,t)}if(e.verify){const s=It(r,e.verify);return new bl(s,t)}return q(1463,{proto:e})}function yb(r,e){return r&&r.length>0?(z(e!==void 0,14353),r.map((t=>(function(s,i){let o=s.updateTime?Te(s.updateTime):Te(i);return o.isEqual(G.min())&&(o=Te(i)),new ib(o,s.transformResults||[])})(t,e)))):[]}function cm(r,e){return{documents:[im(r,e.path)]}}function pa(r,e){const t={structuredQuery:{}},n=e.path;let s;e.collectionGroup!==null?(s=n,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(s=n.popLast(),t.structuredQuery.from=[{collectionId:n.lastSegment()}]),t.parent=im(r,s);const i=(function(u){if(u.length!==0)return dm(ie.create(u,"and"))})(e.filters);i&&(t.structuredQuery.where=i);const o=(function(u){if(u.length!==0)return u.map((f=>(function(p){return{field:en(p.field),direction:Ib(p.dir)}})(f)))})(e.orderBy);o&&(t.structuredQuery.orderBy=o);const c=$c(r,e.limit);return c!==null&&(t.structuredQuery.limit=c),e.startAt&&(t.structuredQuery.startAt=(function(u){return{before:u.inclusive,values:u.position}})(e.startAt)),e.endAt&&(t.structuredQuery.endAt=(function(u){return{before:!u.inclusive,values:u.position}})(e.endAt)),{ft:t,parent:s}}function lm(r,e,t,n){const{ft:s,parent:i}=pa(r,e),o={},c=[];let l=0;return t.forEach((u=>{const f=n?u.alias:"aggregate_"+l++;o[f]=u.alias,u.aggregateType==="count"?c.push({alias:f,count:{}}):u.aggregateType==="avg"?c.push({alias:f,avg:{field:en(u.fieldPath)}}):u.aggregateType==="sum"&&c.push({alias:f,sum:{field:en(u.fieldPath)}})})),{request:{structuredAggregationQuery:{aggregations:c,structuredQuery:s.structuredQuery},parent:s.parent},gt:o,parent:i}}function um(r){let e=om(r.parent);const t=r.structuredQuery,n=t.from?t.from.length:0;let s=null;if(n>0){z(n===1,65062);const f=t.from[0];f.allDescendants?s=f.collectionId:e=e.child(f.collectionId)}let i=[];t.where&&(i=(function(g){const p=hm(g);return p instanceof ie&&_l(p)?p.getFilters():[p]})(t.where));let o=[];t.orderBy&&(o=(function(g){return g.map((p=>(function(A){return new ci(Er(A.field),(function(k){switch(k){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}})(A.direction))})(p)))})(t.orderBy));let c=null;t.limit&&(c=(function(g){let p;return p=typeof g=="object"?g.value:g,bi(p)?null:p})(t.limit));let l=null;t.startAt&&(l=(function(g){const p=!!g.before,E=g.values||[];return new yn(E,p)})(t.startAt));let u=null;return t.endAt&&(u=(function(g){const p=!g.before,E=g.values||[];return new yn(E,p)})(t.endAt)),Ng(e,s,o,i,c,"F",l,u)}function wb(r,e){const t=(function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return q(28987,{purpose:s})}})(e.purpose);return t==null?null:{"goog-listen-tags":t}}function hm(r){return r.unaryFilter!==void 0?(function(t){switch(t.unaryFilter.op){case"IS_NAN":const n=Er(t.unaryFilter.field);return Z.create(n,"==",{doubleValue:NaN});case"IS_NULL":const s=Er(t.unaryFilter.field);return Z.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const i=Er(t.unaryFilter.field);return Z.create(i,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const o=Er(t.unaryFilter.field);return Z.create(o,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return q(61313);default:return q(60726)}})(r):r.fieldFilter!==void 0?(function(t){return Z.create(Er(t.fieldFilter.field),(function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return q(58110);default:return q(50506)}})(t.fieldFilter.op),t.fieldFilter.value)})(r):r.compositeFilter!==void 0?(function(t){return ie.create(t.compositeFilter.filters.map((n=>hm(n))),(function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return q(1026)}})(t.compositeFilter.op))})(r):q(30097,{filter:r})}function Ib(r){return hb[r]}function bb(r){return db[r]}function vb(r){return fb[r]}function en(r){return{fieldPath:r.canonicalString()}}function Er(r){return ge.fromServerFormat(r.fieldPath)}function dm(r){return r instanceof Z?(function(t){if(t.op==="=="){if(Jh(t.value))return{unaryFilter:{field:en(t.field),op:"IS_NAN"}};if(Qh(t.value))return{unaryFilter:{field:en(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(Jh(t.value))return{unaryFilter:{field:en(t.field),op:"IS_NOT_NAN"}};if(Qh(t.value))return{unaryFilter:{field:en(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:en(t.field),op:bb(t.op),value:t.value}}})(r):r instanceof ie?(function(t){const n=t.getFilters().map((s=>dm(s)));return n.length===1?n[0]:{compositeFilter:{op:vb(t.op),filters:n}}})(r):q(54877,{filter:r})}function Tb(r){const e=[];return r.fields.forEach((t=>e.push(t.canonicalString()))),{fieldPaths:e}}function fm(r){return r.length>=4&&r.get(0)==="projects"&&r.get(2)==="databases"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rt{constructor(e,t,n,s,i=G.min(),o=G.min(),c=Ie.EMPTY_BYTE_STRING,l=null){this.target=e,this.targetId=t,this.purpose=n,this.sequenceNumber=s,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=o,this.resumeToken=c,this.expectedCount=l}withSequenceNumber(e){return new Rt(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new Rt(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new Rt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new Rt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gm{constructor(e){this.yt=e}}function Eb(r,e){let t;if(e.document)t=ma(r.yt,e.document,!!e.hasCommittedMutations);else if(e.noDocument){const n=M.fromSegments(e.noDocument.path),s=er(e.noDocument.readTime);t=fe.newNoDocument(n,s),e.hasCommittedMutations&&t.setHasCommittedMutations()}else{if(!e.unknownDocument)return q(56709);{const n=M.fromSegments(e.unknownDocument.path),s=er(e.unknownDocument.version);t=fe.newUnknownDocument(n,s)}}return e.readTime&&t.setReadTime((function(s){const i=new se(s[0],s[1]);return G.fromTimestamp(i)})(e.readTime)),t}function fd(r,e){const t=e.key,n={prefixPath:t.getCollectionPath().popLast().toArray(),collectionGroup:t.collectionGroup,documentId:t.path.lastSegment(),readTime:$o(e.readTime),hasCommittedMutations:e.hasCommittedMutations};if(e.isFoundDocument())n.document=(function(i,o){return{name:li(i,o.key),fields:o.data.value.mapValue.fields,updateTime:Hr(i,o.version.toTimestamp()),createTime:Hr(i,o.createTime.toTimestamp())}})(r.yt,e);else if(e.isNoDocument())n.noDocument={path:t.path.toArray(),readTime:Zn(e.version)};else{if(!e.isUnknownDocument())return q(57904,{document:e});n.unknownDocument={path:t.path.toArray(),version:Zn(e.version)}}return n}function $o(r){const e=r.toTimestamp();return[e.seconds,e.nanoseconds]}function Zn(r){const e=r.toTimestamp();return{seconds:e.seconds,nanoseconds:e.nanoseconds}}function er(r){const e=new se(r.seconds,r.nanoseconds);return G.fromTimestamp(e)}function Un(r,e){const t=(e.baseMutations||[]).map((i=>zc(r.yt,i)));for(let i=0;i<e.mutations.length-1;++i){const o=e.mutations[i];if(i+1<e.mutations.length&&e.mutations[i+1].transform!==void 0){const c=e.mutations[i+1];o.updateTransforms=c.transform.fieldTransforms,e.mutations.splice(i+1,1),++i}}const n=e.mutations.map((i=>zc(r.yt,i))),s=se.fromMillis(e.localWriteTimeMs);return new vl(e.batchId,s,t,n)}function $s(r){const e=er(r.readTime),t=r.lastLimboFreeSnapshotVersion!==void 0?er(r.lastLimboFreeSnapshotVersion):G.min();let n;return n=(function(i){return i.documents!==void 0})(r.query)?(function(i){const o=i.documents.length;return z(o===1,1966,{count:o}),Ge(rs(om(i.documents[0])))})(r.query):(function(i){return Ge(um(i))})(r.query),new Rt(n,r.targetId,"TargetPurposeListen",r.lastListenSequenceNumber,e,t,Ie.fromBase64String(r.resumeToken))}function mm(r,e){const t=Zn(e.snapshotVersion),n=Zn(e.lastLimboFreeSnapshotVersion);let s;s=Fo(e.target)?cm(r.yt,e.target):pa(r.yt,e.target).ft;const i=e.resumeToken.toBase64();return{targetId:e.targetId,canonicalId:Jn(e.target),readTime:t,resumeToken:i,lastListenSequenceNumber:e.sequenceNumber,lastLimboFreeSnapshotVersion:n,query:s}}function _a(r){const e=um({parent:r.parent,structuredQuery:r.structuredQuery});return r.limitType==="LAST"?Bo(e,e.limit,"L"):e}function uc(r,e){return new El(e.largestBatchId,zc(r.yt,e.overlayMutation))}function gd(r,e){const t=e.path.lastSegment();return[r,ze(e.path.popLast()),t]}function md(r,e,t,n){return{indexId:r,uid:e,sequenceNumber:t,readTime:Zn(n.readTime),documentKey:ze(n.documentKey.path),largestBatchId:n.largestBatchId}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ab{getBundleMetadata(e,t){return pd(e).get(t).next((n=>{if(n)return(function(i){return{id:i.bundleId,createTime:er(i.createTime),version:i.version}})(n)}))}saveBundleMetadata(e,t){return pd(e).put((function(s){return{bundleId:s.id,createTime:Zn(Te(s.createTime)),version:s.version}})(t))}getNamedQuery(e,t){return _d(e).get(t).next((n=>{if(n)return(function(i){return{name:i.name,query:_a(i.bundledQuery),readTime:er(i.readTime)}})(n)}))}saveNamedQuery(e,t){return _d(e).put((function(s){return{name:s.name,readTime:Zn(Te(s.readTime)),bundledQuery:s.bundledQuery}})(t))}}function pd(r){return Ce(r,aa)}function _d(r){return Ce(r,ca)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ya{constructor(e,t){this.serializer=e,this.userId=t}static wt(e,t){const n=t.uid||"";return new ya(e,n)}getOverlay(e,t){return Vs(e).get(gd(this.userId,t)).next((n=>n?uc(this.serializer,n):null))}getOverlays(e,t){const n=_t();return R.forEach(t,(s=>this.getOverlay(e,s).next((i=>{i!==null&&n.set(s,i)})))).next((()=>n))}saveOverlays(e,t,n){const s=[];return n.forEach(((i,o)=>{const c=new El(t,o);s.push(this.St(e,c))})),R.waitFor(s)}removeOverlaysForBatchId(e,t,n){const s=new Set;t.forEach((o=>s.add(ze(o.getCollectionPath()))));const i=[];return s.forEach((o=>{const c=IDBKeyRange.bound([this.userId,o,n],[this.userId,o,n+1],!1,!0);i.push(Vs(e).Z(kc,c))})),R.waitFor(i)}getOverlaysForCollection(e,t,n){const s=_t(),i=ze(t),o=IDBKeyRange.bound([this.userId,i,n],[this.userId,i,Number.POSITIVE_INFINITY],!0);return Vs(e).J(kc,o).next((c=>{for(const l of c){const u=uc(this.serializer,l);s.set(u.getKey(),u)}return s}))}getOverlaysForCollectionGroup(e,t,n,s){const i=_t();let o;const c=IDBKeyRange.bound([this.userId,t,n],[this.userId,t,Number.POSITIVE_INFINITY],!0);return Vs(e).ee({index:hg,range:c},((l,u,f)=>{const g=uc(this.serializer,u);i.size()<s||g.largestBatchId===o?(i.set(g.getKey(),g),o=g.largestBatchId):f.done()})).next((()=>i))}St(e,t){return Vs(e).put((function(s,i,o){const[c,l,u]=gd(i,o.mutation.key);return{userId:i,collectionPath:l,documentId:u,collectionGroup:o.mutation.key.getCollectionGroup(),largestBatchId:o.largestBatchId,overlayMutation:ui(s.yt,o.mutation)}})(this.serializer,this.userId,t))}}function Vs(r){return Ce(r,la)}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sb{bt(e){return Ce(e,fl)}getSessionToken(e){return this.bt(e).get("sessionToken").next((t=>{const n=t?.value;return n?Ie.fromUint8Array(n):Ie.EMPTY_BYTE_STRING}))}setSessionToken(e,t){return this.bt(e).put({name:"sessionToken",value:t.toUint8Array()})}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bn{constructor(){}Dt(e,t){this.Ct(e,t),t.vt()}Ct(e,t){if("nullValue"in e)this.Ft(t,5);else if("booleanValue"in e)this.Ft(t,10),t.Mt(e.booleanValue?1:0);else if("integerValue"in e)this.Ft(t,15),t.Mt(_e(e.integerValue));else if("doubleValue"in e){const n=_e(e.doubleValue);isNaN(n)?this.Ft(t,13):(this.Ft(t,15),ei(n)?t.Mt(0):t.Mt(n))}else if("timestampValue"in e){let n=e.timestampValue;this.Ft(t,20),typeof n=="string"&&(n=Nt(n)),t.xt(`${n.seconds||""}`),t.Mt(n.nanos||0)}else if("stringValue"in e)this.Ot(e.stringValue,t),this.Nt(t);else if("bytesValue"in e)this.Ft(t,30),t.Bt(Mt(e.bytesValue)),this.Nt(t);else if("referenceValue"in e)this.Lt(e.referenceValue,t);else if("geoPointValue"in e){const n=e.geoPointValue;this.Ft(t,45),t.Mt(n.latitude||0),t.Mt(n.longitude||0)}else"mapValue"in e?Eg(e)?this.Ft(t,Number.MAX_SAFE_INTEGER):da(e)?this.kt(e.mapValue,t):(this.qt(e.mapValue,t),this.Nt(t)):"arrayValue"in e?(this.Qt(e.arrayValue,t),this.Nt(t)):q(19022,{$t:e})}Ot(e,t){this.Ft(t,25),this.Ut(e,t)}Ut(e,t){t.xt(e)}qt(e,t){const n=e.fields||{};this.Ft(t,55);for(const s of Object.keys(n))this.Ot(s,t),this.Ct(n[s],t)}kt(e,t){const n=e.fields||{};this.Ft(t,53);const s=qr,i=n[s].arrayValue?.values?.length||0;this.Ft(t,15),t.Mt(_e(i)),this.Ot(s,t),this.Ct(n[s],t)}Qt(e,t){const n=e.values||[];this.Ft(t,50);for(const s of n)this.Ct(s,t)}Lt(e,t){this.Ft(t,37),M.fromName(e).path.forEach((n=>{this.Ft(t,60),this.Ut(n,t)}))}Ft(e,t){e.Mt(t)}Nt(e){e.Mt(2)}}Bn.Kt=new Bn;/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law | agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES | CONDITIONS OF ANY KIND, either express | implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yr=255;function Rb(r){if(r===0)return 8;let e=0;return r>>4||(e+=4,r<<=4),r>>6||(e+=2,r<<=2),r>>7||(e+=1),e}function yd(r){const e=64-(function(n){let s=0;for(let i=0;i<8;++i){const o=Rb(255&n[i]);if(s+=o,o!==8)break}return s})(r);return Math.ceil(e/8)}class Pb{constructor(){this.buffer=new Uint8Array(1024),this.position=0}Wt(e){const t=e[Symbol.iterator]();let n=t.next();for(;!n.done;)this.Gt(n.value),n=t.next();this.zt()}jt(e){const t=e[Symbol.iterator]();let n=t.next();for(;!n.done;)this.Jt(n.value),n=t.next();this.Ht()}Yt(e){for(const t of e){const n=t.charCodeAt(0);if(n<128)this.Gt(n);else if(n<2048)this.Gt(960|n>>>6),this.Gt(128|63&n);else if(t<"\uD800"||"\uDBFF"<t)this.Gt(480|n>>>12),this.Gt(128|63&n>>>6),this.Gt(128|63&n);else{const s=t.codePointAt(0);this.Gt(240|s>>>18),this.Gt(128|63&s>>>12),this.Gt(128|63&s>>>6),this.Gt(128|63&s)}}this.zt()}Zt(e){for(const t of e){const n=t.charCodeAt(0);if(n<128)this.Jt(n);else if(n<2048)this.Jt(960|n>>>6),this.Jt(128|63&n);else if(t<"\uD800"||"\uDBFF"<t)this.Jt(480|n>>>12),this.Jt(128|63&n>>>6),this.Jt(128|63&n);else{const s=t.codePointAt(0);this.Jt(240|s>>>18),this.Jt(128|63&s>>>12),this.Jt(128|63&s>>>6),this.Jt(128|63&s)}}this.Ht()}Xt(e){const t=this.en(e),n=yd(t);this.tn(1+n),this.buffer[this.position++]=255&n;for(let s=t.length-n;s<t.length;++s)this.buffer[this.position++]=255&t[s]}nn(e){const t=this.en(e),n=yd(t);this.tn(1+n),this.buffer[this.position++]=~(255&n);for(let s=t.length-n;s<t.length;++s)this.buffer[this.position++]=~(255&t[s])}rn(){this.sn(yr),this.sn(255)}_n(){this.an(yr),this.an(255)}reset(){this.position=0}seed(e){this.tn(e.length),this.buffer.set(e,this.position),this.position+=e.length}un(){return this.buffer.slice(0,this.position)}en(e){const t=(function(i){const o=new DataView(new ArrayBuffer(8));return o.setFloat64(0,i,!1),new Uint8Array(o.buffer)})(e),n=!!(128&t[0]);t[0]^=n?255:128;for(let s=1;s<t.length;++s)t[s]^=n?255:0;return t}Gt(e){const t=255&e;t===0?(this.sn(0),this.sn(255)):t===yr?(this.sn(yr),this.sn(0)):this.sn(t)}Jt(e){const t=255&e;t===0?(this.an(0),this.an(255)):t===yr?(this.an(yr),this.an(0)):this.an(e)}zt(){this.sn(0),this.sn(1)}Ht(){this.an(0),this.an(1)}sn(e){this.tn(1),this.buffer[this.position++]=e}an(e){this.tn(1),this.buffer[this.position++]=~e}tn(e){const t=e+this.position;if(t<=this.buffer.length)return;let n=2*this.buffer.length;n<t&&(n=t);const s=new Uint8Array(n);s.set(this.buffer),this.buffer=s}}class xb{constructor(e){this.cn=e}Bt(e){this.cn.Wt(e)}xt(e){this.cn.Yt(e)}Mt(e){this.cn.Xt(e)}vt(){this.cn.rn()}}class Cb{constructor(e){this.cn=e}Bt(e){this.cn.jt(e)}xt(e){this.cn.Zt(e)}Mt(e){this.cn.nn(e)}vt(){this.cn._n()}}class Ns{constructor(){this.cn=new Pb,this.ln=new xb(this.cn),this.hn=new Cb(this.cn)}seed(e){this.cn.seed(e)}Pn(e){return e===0?this.ln:this.hn}un(){return this.cn.un()}reset(){this.cn.reset()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $n{constructor(e,t,n,s){this.Tn=e,this.In=t,this.En=n,this.dn=s}An(){const e=this.dn.length,t=e===0||this.dn[e-1]===255?e+1:e,n=new Uint8Array(t);return n.set(this.dn,0),t!==e?n.set([0],this.dn.length):++n[n.length-1],new $n(this.Tn,this.In,this.En,n)}Rn(e,t,n){return{indexId:this.Tn,uid:e,arrayValue:So(this.En),directionalValue:So(this.dn),orderedDocumentKey:So(t),documentKey:n.path.toArray()}}Vn(e,t,n){const s=this.Rn(e,t,n);return[s.indexId,s.uid,s.arrayValue,s.directionalValue,s.orderedDocumentKey,s.documentKey]}}function Jt(r,e){let t=r.Tn-e.Tn;return t!==0?t:(t=wd(r.En,e.En),t!==0?t:(t=wd(r.dn,e.dn),t!==0?t:M.comparator(r.In,e.In)))}function wd(r,e){for(let t=0;t<r.length&&t<e.length;++t){const n=r[t]-e[t];if(n!==0)return n}return r.length-e.length}function So(r){return kf()?(function(t){let n="";for(let s=0;s<t.length;s++)n+=String.fromCharCode(t[s]);return n})(r):r}function Id(r){return typeof r!="string"?r:(function(t){const n=new Uint8Array(t.length);for(let s=0;s<t.length;s++)n[s]=t.charCodeAt(s);return n})(r)}class bd{constructor(e){this.mn=new ae(((t,n)=>ge.comparator(t.field,n.field))),this.collectionId=e.collectionGroup!=null?e.collectionGroup:e.path.lastSegment(),this.fn=e.orderBy,this.gn=[];for(const t of e.filters){const n=t;n.isInequality()?this.mn=this.mn.add(n):this.gn.push(n)}}get pn(){return this.mn.size>1}yn(e){if(z(e.collectionGroup===this.collectionId,49279),this.pn)return!1;const t=xc(e);if(t!==void 0&&!this.wn(t))return!1;const n=On(e);let s=new Set,i=0,o=0;for(;i<n.length&&this.wn(n[i]);++i)s=s.add(n[i].fieldPath.canonicalString());if(i===n.length)return!0;if(this.mn.size>0){const c=this.mn.getIterator().getNext();if(!s.has(c.field.canonicalString())){const l=n[i];if(!this.Sn(c,l)||!this.bn(this.fn[o++],l))return!1}++i}for(;i<n.length;++i){const c=n[i];if(o>=this.fn.length||!this.bn(this.fn[o++],c))return!1}return!0}Dn(){if(this.pn)return null;let e=new ae(ge.comparator);const t=[];for(const n of this.gn)if(!n.field.isKeyField())if(n.op==="array-contains"||n.op==="array-contains-any")t.push(new zn(n.field,2));else{if(e.has(n.field))continue;e=e.add(n.field),t.push(new zn(n.field,0))}for(const n of this.fn)n.field.isKeyField()||e.has(n.field)||(e=e.add(n.field),t.push(new zn(n.field,n.dir==="asc"?0:1)));return new Or(Or.UNKNOWN_ID,this.collectionId,t,Lr.empty())}wn(e){for(const t of this.gn)if(this.Sn(t,e))return!0;return!1}Sn(e,t){if(e===void 0||!e.field.isEqual(t.fieldPath))return!1;const n=e.op==="array-contains"||e.op==="array-contains-any";return t.kind===2===n}bn(e,t){return!!e.field.isEqual(t.fieldPath)&&(t.kind===0&&e.dir==="asc"||t.kind===1&&e.dir==="desc")}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pm(r){if(z(r instanceof Z||r instanceof ie,20012),r instanceof Z){if(r instanceof Vg){const t=r.value.arrayValue?.values?.map((n=>Z.create(r.field,"==",n)))||[];return ie.create(t,"or")}return r}const e=r.filters.map((t=>pm(t)));return ie.create(e,r.op)}function Db(r){if(r.getFilters().length===0)return[];const e=Hc(pm(r));return z(_m(e),7391),Gc(e)||Kc(e)?[e]:e.getFilters()}function Gc(r){return r instanceof Z}function Kc(r){return r instanceof ie&&_l(r)}function _m(r){return Gc(r)||Kc(r)||(function(t){if(t instanceof ie&&Oc(t)){for(const n of t.getFilters())if(!Gc(n)&&!Kc(n))return!1;return!0}return!1})(r)}function Hc(r){if(z(r instanceof Z||r instanceof ie,34018),r instanceof Z)return r;if(r.filters.length===1)return Hc(r.filters[0]);const e=r.filters.map((n=>Hc(n)));let t=ie.create(e,r.op);return t=qo(t),_m(t)?t:(z(t instanceof ie,64498),z(zr(t),40251),z(t.filters.length>1,57927),t.filters.reduce(((n,s)=>Rl(n,s))))}function Rl(r,e){let t;return z(r instanceof Z||r instanceof ie,38388),z(e instanceof Z||e instanceof ie,25473),t=r instanceof Z?e instanceof Z?(function(s,i){return ie.create([s,i],"and")})(r,e):vd(r,e):e instanceof Z?vd(e,r):(function(s,i){if(z(s.filters.length>0&&i.filters.length>0,48005),zr(s)&&zr(i))return Cg(s,i.getFilters());const o=Oc(s)?s:i,c=Oc(s)?i:s,l=o.filters.map((u=>Rl(u,c)));return ie.create(l,"or")})(r,e),qo(t)}function vd(r,e){if(zr(e))return Cg(e,r.getFilters());{const t=e.filters.map((n=>Rl(r,n)));return ie.create(t,"or")}}function qo(r){if(z(r instanceof Z||r instanceof ie,11850),r instanceof Z)return r;const e=r.getFilters();if(e.length===1)return qo(e[0]);if(Pg(r))return r;const t=e.map((s=>qo(s))),n=[];return t.forEach((s=>{s instanceof Z?n.push(s):s instanceof ie&&(s.op===r.op?n.push(...s.filters):n.push(s))})),n.length===1?n[0]:ie.create(n,r.op)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kb{constructor(){this.Cn=new Pl}addToCollectionParentIndex(e,t){return this.Cn.add(t),R.resolve()}getCollectionParents(e,t){return R.resolve(this.Cn.getEntries(t))}addFieldIndex(e,t){return R.resolve()}deleteFieldIndex(e,t){return R.resolve()}deleteAllFieldIndexes(e){return R.resolve()}createTargetIndexes(e,t){return R.resolve()}getDocumentsMatchingTarget(e,t){return R.resolve(null)}getIndexType(e,t){return R.resolve(0)}getFieldIndexes(e,t){return R.resolve([])}getNextCollectionGroupToUpdate(e){return R.resolve(null)}getMinOffset(e,t){return R.resolve(rt.min())}getMinOffsetFromCollectionGroup(e,t){return R.resolve(rt.min())}updateCollectionGroup(e,t,n){return R.resolve()}updateIndexEntries(e,t){return R.resolve()}}class Pl{constructor(){this.index={}}add(e){const t=e.lastSegment(),n=e.popLast(),s=this.index[t]||new ae(J.comparator),i=!s.has(n);return this.index[t]=s.add(n),i}has(e){const t=e.lastSegment(),n=e.popLast(),s=this.index[t];return s&&s.has(n)}getEntries(e){return(this.index[e]||new ae(J.comparator)).toArray()}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Td="IndexedDbIndexManager",lo=new Uint8Array(0);class Vb{constructor(e,t){this.databaseId=t,this.vn=new Pl,this.Fn=new $t((n=>Jn(n)),((n,s)=>Ti(n,s))),this.uid=e.uid||""}addToCollectionParentIndex(e,t){if(!this.vn.has(t)){const n=t.lastSegment(),s=t.popLast();e.addOnCommittedListener((()=>{this.vn.add(t)}));const i={collectionId:n,parent:ze(s)};return Ed(e).put(i)}return R.resolve()}getCollectionParents(e,t){const n=[],s=IDBKeyRange.bound([t,""],[Jf(t),""],!1,!0);return Ed(e).J(s).next((i=>{for(const o of i){if(o.collectionId!==t)break;n.push(pt(o.parent))}return n}))}addFieldIndex(e,t){const n=Ms(e),s=(function(c){return{indexId:c.indexId,collectionGroup:c.collectionGroup,fields:c.fields.map((l=>[l.fieldPath.canonicalString(),l.kind]))}})(t);delete s.indexId;const i=n.add(s);if(t.indexState){const o=Ir(e);return i.next((c=>{o.put(md(c,this.uid,t.indexState.sequenceNumber,t.indexState.offset))}))}return i.next()}deleteFieldIndex(e,t){const n=Ms(e),s=Ir(e),i=wr(e);return n.delete(t.indexId).next((()=>s.delete(IDBKeyRange.bound([t.indexId],[t.indexId+1],!1,!0)))).next((()=>i.delete(IDBKeyRange.bound([t.indexId],[t.indexId+1],!1,!0))))}deleteAllFieldIndexes(e){const t=Ms(e),n=wr(e),s=Ir(e);return t.Z().next((()=>n.Z())).next((()=>s.Z()))}createTargetIndexes(e,t){return R.forEach(this.Mn(t),(n=>this.getIndexType(e,n).next((s=>{if(s===0||s===1){const i=new bd(n).Dn();if(i!=null)return this.addFieldIndex(e,i)}}))))}getDocumentsMatchingTarget(e,t){const n=wr(e);let s=!0;const i=new Map;return R.forEach(this.Mn(t),(o=>this.xn(e,o).next((c=>{s&&(s=!!c),i.set(o,c)})))).next((()=>{if(s){let o=W();const c=[];return R.forEach(i,((l,u)=>{N(Td,`Using index ${(function(F){return`id=${F.indexId}|cg=${F.collectionGroup}|f=${F.fields.map((Q=>`${Q.fieldPath}:${Q.kind}`)).join(",")}`})(l)} to execute ${Jn(t)}`);const f=(function(F,Q){const te=xc(Q);if(te===void 0)return null;for(const U of Uo(F,te.fieldPath))switch(U.op){case"array-contains-any":return U.value.arrayValue.values||[];case"array-contains":return[U.value]}return null})(u,l),g=(function(F,Q){const te=new Map;for(const U of On(Q))for(const w of Uo(F,U.fieldPath))switch(w.op){case"==":case"in":te.set(U.fieldPath.canonicalString(),w.value);break;case"not-in":case"!=":return te.set(U.fieldPath.canonicalString(),w.value),Array.from(te.values())}return null})(u,l),p=(function(F,Q){const te=[];let U=!0;for(const w of On(Q)){const _=w.kind===0?td(F,w.fieldPath,F.startAt):nd(F,w.fieldPath,F.startAt);te.push(_.value),U&&(U=_.inclusive)}return new yn(te,U)})(u,l),E=(function(F,Q){const te=[];let U=!0;for(const w of On(Q)){const _=w.kind===0?nd(F,w.fieldPath,F.endAt):td(F,w.fieldPath,F.endAt);te.push(_.value),U&&(U=_.inclusive)}return new yn(te,U)})(u,l),A=this.On(l,u,p),D=this.On(l,u,E),k=this.Nn(l,u,g),B=this.Bn(l.indexId,f,A,p.inclusive,D,E.inclusive,k);return R.forEach(B,(j=>n.Y(j,t.limit).next((F=>{F.forEach((Q=>{const te=M.fromSegments(Q.documentKey);o.has(te)||(o=o.add(te),c.push(te))}))}))))})).next((()=>c))}return R.resolve(null)}))}Mn(e){let t=this.Fn.get(e);return t||(e.filters.length===0?t=[e]:t=Db(ie.create(e.filters,"and")).map((n=>Fc(e.path,e.collectionGroup,e.orderBy,n.getFilters(),e.limit,e.startAt,e.endAt))),this.Fn.set(e,t),t)}Bn(e,t,n,s,i,o,c){const l=(t!=null?t.length:1)*Math.max(n.length,i.length),u=l/(t!=null?t.length:1),f=[];for(let g=0;g<l;++g){const p=t?this.Ln(t[g/u]):lo,E=this.kn(e,p,n[g%u],s),A=this.qn(e,p,i[g%u],o),D=c.map((k=>this.kn(e,p,k,!0)));f.push(...this.createRange(E,A,D))}return f}kn(e,t,n,s){const i=new $n(e,M.empty(),t,n);return s?i:i.An()}qn(e,t,n,s){const i=new $n(e,M.empty(),t,n);return s?i.An():i}xn(e,t){const n=new bd(t),s=t.collectionGroup!=null?t.collectionGroup:t.path.lastSegment();return this.getFieldIndexes(e,s).next((i=>{let o=null;for(const c of i)n.yn(c)&&(!o||c.fields.length>o.fields.length)&&(o=c);return o}))}getIndexType(e,t){let n=2;const s=this.Mn(t);return R.forEach(s,(i=>this.xn(e,i).next((o=>{o?n!==0&&o.fields.length<(function(l){let u=new ae(ge.comparator),f=!1;for(const g of l.filters)for(const p of g.getFlattenedFilters())p.field.isKeyField()||(p.op==="array-contains"||p.op==="array-contains-any"?f=!0:u=u.add(p.field));for(const g of l.orderBy)g.field.isKeyField()||(u=u.add(g.field));return u.size+(f?1:0)})(i)&&(n=1):n=0})))).next((()=>(function(o){return o.limit!==null})(t)&&s.length>1&&n===2?1:n))}Qn(e,t){const n=new Ns;for(const s of On(e)){const i=t.data.field(s.fieldPath);if(i==null)return null;const o=n.Pn(s.kind);Bn.Kt.Dt(i,o)}return n.un()}Ln(e){const t=new Ns;return Bn.Kt.Dt(e,t.Pn(0)),t.un()}$n(e,t){const n=new Ns;return Bn.Kt.Dt(Qn(this.databaseId,t),n.Pn((function(i){const o=On(i);return o.length===0?0:o[o.length-1].kind})(e))),n.un()}Nn(e,t,n){if(n===null)return[];let s=[];s.push(new Ns);let i=0;for(const o of On(e)){const c=n[i++];for(const l of s)if(this.Un(t,o.fieldPath)&&ai(c))s=this.Kn(s,o,c);else{const u=l.Pn(o.kind);Bn.Kt.Dt(c,u)}}return this.Wn(s)}On(e,t,n){return this.Nn(e,t,n.position)}Wn(e){const t=[];for(let n=0;n<e.length;++n)t[n]=e[n].un();return t}Kn(e,t,n){const s=[...e],i=[];for(const o of n.arrayValue.values||[])for(const c of s){const l=new Ns;l.seed(c.un()),Bn.Kt.Dt(o,l.Pn(t.kind)),i.push(l)}return i}Un(e,t){return!!e.filters.find((n=>n instanceof Z&&n.field.isEqual(t)&&(n.op==="in"||n.op==="not-in")))}getFieldIndexes(e,t){const n=Ms(e),s=Ir(e);return(t?n.J(Dc,IDBKeyRange.bound(t,t)):n.J()).next((i=>{const o=[];return R.forEach(i,(c=>s.get([c.indexId,this.uid]).next((l=>{o.push((function(f,g){const p=g?new Lr(g.sequenceNumber,new rt(er(g.readTime),new M(pt(g.documentKey)),g.largestBatchId)):Lr.empty(),E=f.fields.map((([A,D])=>new zn(ge.fromServerFormat(A),D)));return new Or(f.indexId,f.collectionGroup,E,p)})(c,l))})))).next((()=>o))}))}getNextCollectionGroupToUpdate(e){return this.getFieldIndexes(e).next((t=>t.length===0?null:(t.sort(((n,s)=>{const i=n.indexState.sequenceNumber-s.indexState.sequenceNumber;return i!==0?i:K(n.collectionGroup,s.collectionGroup)})),t[0].collectionGroup)))}updateCollectionGroup(e,t,n){const s=Ms(e),i=Ir(e);return this.Gn(e).next((o=>s.J(Dc,IDBKeyRange.bound(t,t)).next((c=>R.forEach(c,(l=>i.put(md(l.indexId,this.uid,o,n))))))))}updateIndexEntries(e,t){const n=new Map;return R.forEach(t,((s,i)=>{const o=n.get(s.collectionGroup);return(o?R.resolve(o):this.getFieldIndexes(e,s.collectionGroup)).next((c=>(n.set(s.collectionGroup,c),R.forEach(c,(l=>this.zn(e,s,l).next((u=>{const f=this.jn(i,l);return u.isEqual(f)?R.resolve():this.Jn(e,i,l,u,f)})))))))}))}Hn(e,t,n,s){return wr(e).put(s.Rn(this.uid,this.$n(n,t.key),t.key))}Yn(e,t,n,s){return wr(e).delete(s.Vn(this.uid,this.$n(n,t.key),t.key))}zn(e,t,n){const s=wr(e);let i=new ae(Jt);return s.ee({index:ug,range:IDBKeyRange.only([n.indexId,this.uid,So(this.$n(n,t))])},((o,c)=>{i=i.add(new $n(n.indexId,t,Id(c.arrayValue),Id(c.directionalValue)))})).next((()=>i))}jn(e,t){let n=new ae(Jt);const s=this.Qn(t,e);if(s==null)return n;const i=xc(t);if(i!=null){const o=e.data.field(i.fieldPath);if(ai(o))for(const c of o.arrayValue.values||[])n=n.add(new $n(t.indexId,e.key,this.Ln(c),s))}else n=n.add(new $n(t.indexId,e.key,lo,s));return n}Jn(e,t,n,s,i){N(Td,"Updating index entries for document '%s'",t.key);const o=[];return(function(l,u,f,g,p){const E=l.getIterator(),A=u.getIterator();let D=_r(E),k=_r(A);for(;D||k;){let B=!1,j=!1;if(D&&k){const F=f(D,k);F<0?j=!0:F>0&&(B=!0)}else D!=null?j=!0:B=!0;B?(g(k),k=_r(A)):j?(p(D),D=_r(E)):(D=_r(E),k=_r(A))}})(s,i,Jt,(c=>{o.push(this.Hn(e,t,n,c))}),(c=>{o.push(this.Yn(e,t,n,c))})),R.waitFor(o)}Gn(e){let t=1;return Ir(e).ee({index:lg,reverse:!0,range:IDBKeyRange.upperBound([this.uid,Number.MAX_SAFE_INTEGER])},((n,s,i)=>{i.done(),t=s.sequenceNumber+1})).next((()=>t))}createRange(e,t,n){n=n.sort(((o,c)=>Jt(o,c))).filter(((o,c,l)=>!c||Jt(o,l[c-1])!==0));const s=[];s.push(e);for(const o of n){const c=Jt(o,e),l=Jt(o,t);if(c===0)s[0]=e.An();else if(c>0&&l<0)s.push(o),s.push(o.An());else if(l>0)break}s.push(t);const i=[];for(let o=0;o<s.length;o+=2){if(this.Zn(s[o],s[o+1]))return[];const c=s[o].Vn(this.uid,lo,M.empty()),l=s[o+1].Vn(this.uid,lo,M.empty());i.push(IDBKeyRange.bound(c,l))}return i}Zn(e,t){return Jt(e,t)>0}getMinOffsetFromCollectionGroup(e,t){return this.getFieldIndexes(e,t).next(Ad)}getMinOffset(e,t){return R.mapArray(this.Mn(t),(n=>this.xn(e,n).next((s=>s||q(44426))))).next(Ad)}}function Ed(r){return Ce(r,ri)}function wr(r){return Ce(r,Ks)}function Ms(r){return Ce(r,dl)}function Ir(r){return Ce(r,Gs)}function Ad(r){z(r.length!==0,28825);let e=r[0].indexState.offset,t=e.largestBatchId;for(let n=1;n<r.length;n++){const s=r[n].indexState.offset;ll(s,e)<0&&(e=s),t<s.largestBatchId&&(t=s.largestBatchId)}return new rt(e.readTime,e.documentKey,t)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Sd={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},ym=41943040;class qe{static withCacheSize(e){return new qe(e,qe.DEFAULT_COLLECTION_PERCENTILE,qe.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,t,n){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=n}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wm(r,e,t){const n=r.store(ct),s=r.store(Fr),i=[],o=IDBKeyRange.only(t.batchId);let c=0;const l=n.ee({range:o},((f,g,p)=>(c++,p.delete())));i.push(l.next((()=>{z(c===1,47070,{batchId:t.batchId})})));const u=[];for(const f of t.mutations){const g=og(e,f.key.path,t.batchId);i.push(s.delete(g)),u.push(f.key)}return R.waitFor(i).next((()=>u))}function jo(r){if(!r)return 0;let e;if(r.document)e=r.document;else if(r.unknownDocument)e=r.unknownDocument;else{if(!r.noDocument)throw q(14731);e=r.noDocument}return JSON.stringify(e).length}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */qe.DEFAULT_COLLECTION_PERCENTILE=10,qe.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,qe.DEFAULT=new qe(ym,qe.DEFAULT_COLLECTION_PERCENTILE,qe.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),qe.DISABLED=new qe(-1,0,0);class wa{constructor(e,t,n,s){this.userId=e,this.serializer=t,this.indexManager=n,this.referenceDelegate=s,this.Xn={}}static wt(e,t,n,s){z(e.uid!=="",64387);const i=e.isAuthenticated()?e.uid:"";return new wa(i,t,n,s)}checkEmpty(e){let t=!0;const n=IDBKeyRange.bound([this.userId,Number.NEGATIVE_INFINITY],[this.userId,Number.POSITIVE_INFINITY]);return Yt(e).ee({index:qn,range:n},((s,i,o)=>{t=!1,o.done()})).next((()=>t))}addMutationBatch(e,t,n,s){const i=Ar(e),o=Yt(e);return o.add({}).next((c=>{z(typeof c=="number",49019);const l=new vl(c,t,n,s),u=(function(E,A,D){const k=D.baseMutations.map((j=>ui(E.yt,j))),B=D.mutations.map((j=>ui(E.yt,j)));return{userId:A,batchId:D.batchId,localWriteTimeMs:D.localWriteTime.toMillis(),baseMutations:k,mutations:B}})(this.serializer,this.userId,l),f=[];let g=new ae(((p,E)=>K(p.canonicalString(),E.canonicalString())));for(const p of s){const E=og(this.userId,p.key.path,c);g=g.add(p.key.path.popLast()),f.push(o.put(u)),f.push(i.put(E,gI))}return g.forEach((p=>{f.push(this.indexManager.addToCollectionParentIndex(e,p))})),e.addOnCommittedListener((()=>{this.Xn[c]=l.keys()})),R.waitFor(f).next((()=>l))}))}lookupMutationBatch(e,t){return Yt(e).get(t).next((n=>n?(z(n.userId===this.userId,48,"Unexpected user for mutation batch",{userId:n.userId,batchId:t}),Un(this.serializer,n)):null))}er(e,t){return this.Xn[t]?R.resolve(this.Xn[t]):this.lookupMutationBatch(e,t).next((n=>{if(n){const s=n.keys();return this.Xn[t]=s,s}return null}))}getNextMutationBatchAfterBatchId(e,t){const n=t+1,s=IDBKeyRange.lowerBound([this.userId,n]);let i=null;return Yt(e).ee({index:qn,range:s},((o,c,l)=>{c.userId===this.userId&&(z(c.batchId>=n,47524,{tr:n}),i=Un(this.serializer,c)),l.done()})).next((()=>i))}getHighestUnacknowledgedBatchId(e){const t=IDBKeyRange.upperBound([this.userId,Number.POSITIVE_INFINITY]);let n=fn;return Yt(e).ee({index:qn,range:t,reverse:!0},((s,i,o)=>{n=i.batchId,o.done()})).next((()=>n))}getAllMutationBatches(e){const t=IDBKeyRange.bound([this.userId,fn],[this.userId,Number.POSITIVE_INFINITY]);return Yt(e).J(qn,t).next((n=>n.map((s=>Un(this.serializer,s)))))}getAllMutationBatchesAffectingDocumentKey(e,t){const n=wo(this.userId,t.path),s=IDBKeyRange.lowerBound(n),i=[];return Ar(e).ee({range:s},((o,c,l)=>{const[u,f,g]=o,p=pt(f);if(u===this.userId&&t.path.isEqual(p))return Yt(e).get(g).next((E=>{if(!E)throw q(61480,{nr:o,batchId:g});z(E.userId===this.userId,10503,"Unexpected user for mutation batch",{userId:E.userId,batchId:g}),i.push(Un(this.serializer,E))}));l.done()})).next((()=>i))}getAllMutationBatchesAffectingDocumentKeys(e,t){let n=new ae(K);const s=[];return t.forEach((i=>{const o=wo(this.userId,i.path),c=IDBKeyRange.lowerBound(o),l=Ar(e).ee({range:c},((u,f,g)=>{const[p,E,A]=u,D=pt(E);p===this.userId&&i.path.isEqual(D)?n=n.add(A):g.done()}));s.push(l)})),R.waitFor(s).next((()=>this.rr(e,n)))}getAllMutationBatchesAffectingQuery(e,t){const n=t.path,s=n.length+1,i=wo(this.userId,n),o=IDBKeyRange.lowerBound(i);let c=new ae(K);return Ar(e).ee({range:o},((l,u,f)=>{const[g,p,E]=l,A=pt(p);g===this.userId&&n.isPrefixOf(A)?A.length===s&&(c=c.add(E)):f.done()})).next((()=>this.rr(e,c)))}rr(e,t){const n=[],s=[];return t.forEach((i=>{s.push(Yt(e).get(i).next((o=>{if(o===null)throw q(35274,{batchId:i});z(o.userId===this.userId,9748,"Unexpected user for mutation batch",{userId:o.userId,batchId:i}),n.push(Un(this.serializer,o))})))})),R.waitFor(s).next((()=>n))}removeMutationBatch(e,t){return wm(e.le,this.userId,t).next((n=>(e.addOnCommittedListener((()=>{this.ir(t.batchId)})),R.forEach(n,(s=>this.referenceDelegate.markPotentiallyOrphaned(e,s))))))}ir(e){delete this.Xn[e]}performConsistencyCheck(e){return this.checkEmpty(e).next((t=>{if(!t)return R.resolve();const n=IDBKeyRange.lowerBound((function(o){return[o]})(this.userId)),s=[];return Ar(e).ee({range:n},((i,o,c)=>{if(i[0]===this.userId){const l=pt(i[1]);s.push(l)}else c.done()})).next((()=>{z(s.length===0,56720,{sr:s.map((i=>i.canonicalString()))})}))}))}containsKey(e,t){return Im(e,this.userId,t)}_r(e){return bm(e).get(this.userId).next((t=>t||{userId:this.userId,lastAcknowledgedBatchId:fn,lastStreamToken:""}))}}function Im(r,e,t){const n=wo(e,t.path),s=n[1],i=IDBKeyRange.lowerBound(n);let o=!1;return Ar(r).ee({range:i,X:!0},((c,l,u)=>{const[f,g,p]=c;f===e&&g===s&&(o=!0),u.done()})).next((()=>o))}function Yt(r){return Ce(r,ct)}function Ar(r){return Ce(r,Fr)}function bm(r){return Ce(r,ti)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tr{constructor(e){this.ar=e}next(){return this.ar+=2,this.ar}static ur(){return new tr(0)}static cr(){return new tr(-1)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nb{constructor(e,t){this.referenceDelegate=e,this.serializer=t}allocateTargetId(e){return this.lr(e).next((t=>{const n=new tr(t.highestTargetId);return t.highestTargetId=n.next(),this.hr(e,t).next((()=>t.highestTargetId))}))}getLastRemoteSnapshotVersion(e){return this.lr(e).next((t=>G.fromTimestamp(new se(t.lastRemoteSnapshotVersion.seconds,t.lastRemoteSnapshotVersion.nanoseconds))))}getHighestSequenceNumber(e){return this.lr(e).next((t=>t.highestListenSequenceNumber))}setTargetsMetadata(e,t,n){return this.lr(e).next((s=>(s.highestListenSequenceNumber=t,n&&(s.lastRemoteSnapshotVersion=n.toTimestamp()),t>s.highestListenSequenceNumber&&(s.highestListenSequenceNumber=t),this.hr(e,s))))}addTargetData(e,t){return this.Pr(e,t).next((()=>this.lr(e).next((n=>(n.targetCount+=1,this.Tr(t,n),this.hr(e,n))))))}updateTargetData(e,t){return this.Pr(e,t)}removeTargetData(e,t){return this.removeMatchingKeysForTargetId(e,t.targetId).next((()=>br(e).delete(t.targetId))).next((()=>this.lr(e))).next((n=>(z(n.targetCount>0,8065),n.targetCount-=1,this.hr(e,n))))}removeTargets(e,t,n){let s=0;const i=[];return br(e).ee(((o,c)=>{const l=$s(c);l.sequenceNumber<=t&&n.get(l.targetId)===null&&(s++,i.push(this.removeTargetData(e,l)))})).next((()=>R.waitFor(i))).next((()=>s))}forEachTarget(e,t){return br(e).ee(((n,s)=>{const i=$s(s);t(i)}))}lr(e){return Rd(e).get(Lo).next((t=>(z(t!==null,2888),t)))}hr(e,t){return Rd(e).put(Lo,t)}Pr(e,t){return br(e).put(mm(this.serializer,t))}Tr(e,t){let n=!1;return e.targetId>t.highestTargetId&&(t.highestTargetId=e.targetId,n=!0),e.sequenceNumber>t.highestListenSequenceNumber&&(t.highestListenSequenceNumber=e.sequenceNumber,n=!0),n}getTargetCount(e){return this.lr(e).next((t=>t.targetCount))}getTargetData(e,t){const n=Jn(t),s=IDBKeyRange.bound([n,Number.NEGATIVE_INFINITY],[n,Number.POSITIVE_INFINITY]);let i=null;return br(e).ee({range:s,index:cg},((o,c,l)=>{const u=$s(c);Ti(t,u.target)&&(i=u,l.done())})).next((()=>i))}addMatchingKeys(e,t,n){const s=[],i=tn(e);return t.forEach((o=>{const c=ze(o.path);s.push(i.put({targetId:n,path:c})),s.push(this.referenceDelegate.addReference(e,n,o))})),R.waitFor(s)}removeMatchingKeys(e,t,n){const s=tn(e);return R.forEach(t,(i=>{const o=ze(i.path);return R.waitFor([s.delete([n,o]),this.referenceDelegate.removeReference(e,n,i)])}))}removeMatchingKeysForTargetId(e,t){const n=tn(e),s=IDBKeyRange.bound([t],[t+1],!1,!0);return n.delete(s)}getMatchingKeysForTargetId(e,t){const n=IDBKeyRange.bound([t],[t+1],!1,!0),s=tn(e);let i=W();return s.ee({range:n,X:!0},((o,c,l)=>{const u=pt(o[1]),f=new M(u);i=i.add(f)})).next((()=>i))}containsKey(e,t){const n=ze(t.path),s=IDBKeyRange.bound([n],[Jf(n)],!1,!0);let i=0;return tn(e).ee({index:hl,X:!0,range:s},(([o,c],l,u)=>{o!==0&&(i++,u.done())})).next((()=>i>0))}At(e,t){return br(e).get(t).next((n=>n?$s(n):null))}}function br(r){return Ce(r,Ur)}function Rd(r){return Ce(r,Gn)}function tn(r){return Ce(r,Br)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pd="LruGarbageCollector",vm=1048576;function xd([r,e],[t,n]){const s=K(r,t);return s===0?K(e,n):s}class Mb{constructor(e){this.Ir=e,this.buffer=new ae(xd),this.Er=0}dr(){return++this.Er}Ar(e){const t=[e,this.dr()];if(this.buffer.size<this.Ir)this.buffer=this.buffer.add(t);else{const n=this.buffer.last();xd(t,n)<0&&(this.buffer=this.buffer.delete(n).add(t))}}get maxValue(){return this.buffer.last()[0]}}class Tm{constructor(e,t,n){this.garbageCollector=e,this.asyncQueue=t,this.localStore=n,this.Rr=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Vr(6e4)}stop(){this.Rr&&(this.Rr.cancel(),this.Rr=null)}get started(){return this.Rr!==null}Vr(e){N(Pd,`Garbage collection scheduled in ${e}ms`),this.Rr=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,(async()=>{this.Rr=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(t){Tn(t)?N(Pd,"Ignoring IndexedDB error during garbage collection: ",t):await vn(t)}await this.Vr(3e5)}))}}class Ob{constructor(e,t){this.mr=e,this.params=t}calculateTargetCount(e,t){return this.mr.gr(e).next((n=>Math.floor(t/100*n)))}nthSequenceNumber(e,t){if(t===0)return R.resolve(Qe.ce);const n=new Mb(t);return this.mr.forEachTarget(e,(s=>n.Ar(s.sequenceNumber))).next((()=>this.mr.pr(e,(s=>n.Ar(s))))).next((()=>n.maxValue))}removeTargets(e,t,n){return this.mr.removeTargets(e,t,n)}removeOrphanedDocuments(e,t){return this.mr.removeOrphanedDocuments(e,t)}collect(e,t){return this.params.cacheSizeCollectionThreshold===-1?(N("LruGarbageCollector","Garbage collection skipped; disabled"),R.resolve(Sd)):this.getCacheSize(e).next((n=>n<this.params.cacheSizeCollectionThreshold?(N("LruGarbageCollector",`Garbage collection skipped; Cache size ${n} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),Sd):this.yr(e,t)))}getCacheSize(e){return this.mr.getCacheSize(e)}yr(e,t){let n,s,i,o,c,l,u;const f=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next((g=>(g>this.params.maximumSequenceNumbersToCollect?(N("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${g}`),s=this.params.maximumSequenceNumbersToCollect):s=g,o=Date.now(),this.nthSequenceNumber(e,s)))).next((g=>(n=g,c=Date.now(),this.removeTargets(e,n,t)))).next((g=>(i=g,l=Date.now(),this.removeOrphanedDocuments(e,n)))).next((g=>(u=Date.now(),vr()<=X.DEBUG&&N("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${o-f}ms
	Determined least recently used ${s} in `+(c-o)+`ms
	Removed ${i} targets in `+(l-c)+`ms
	Removed ${g} documents in `+(u-l)+`ms
Total Duration: ${u-f}ms`),R.resolve({didRun:!0,sequenceNumbersCollected:s,targetsRemoved:i,documentsRemoved:g}))))}}function Em(r,e){return new Ob(r,e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lb{constructor(e,t){this.db=e,this.garbageCollector=Em(this,t)}gr(e){const t=this.wr(e);return this.db.getTargetCache().getTargetCount(e).next((n=>t.next((s=>n+s))))}wr(e){let t=0;return this.pr(e,(n=>{t++})).next((()=>t))}forEachTarget(e,t){return this.db.getTargetCache().forEachTarget(e,t)}pr(e,t){return this.Sr(e,((n,s)=>t(s)))}addReference(e,t,n){return uo(e,n)}removeReference(e,t,n){return uo(e,n)}removeTargets(e,t,n){return this.db.getTargetCache().removeTargets(e,t,n)}markPotentiallyOrphaned(e,t){return uo(e,t)}br(e,t){return(function(s,i){let o=!1;return bm(s).te((c=>Im(s,c,i).next((l=>(l&&(o=!0),R.resolve(!l)))))).next((()=>o))})(e,t)}removeOrphanedDocuments(e,t){const n=this.db.getRemoteDocumentCache().newChangeBuffer(),s=[];let i=0;return this.Sr(e,((o,c)=>{if(c<=t){const l=this.br(e,o).next((u=>{if(!u)return i++,n.getEntry(e,o).next((()=>(n.removeEntry(o,G.min()),tn(e).delete((function(g){return[0,ze(g.path)]})(o)))))}));s.push(l)}})).next((()=>R.waitFor(s))).next((()=>n.apply(e))).next((()=>i))}removeTarget(e,t){const n=t.withSequenceNumber(e.currentSequenceNumber);return this.db.getTargetCache().updateTargetData(e,n)}updateLimboDocument(e,t){return uo(e,t)}Sr(e,t){const n=tn(e);let s,i=Qe.ce;return n.ee({index:hl},(([o,c],{path:l,sequenceNumber:u})=>{o===0?(i!==Qe.ce&&t(new M(pt(s)),i),i=u,s=l):i=Qe.ce})).next((()=>{i!==Qe.ce&&t(new M(pt(s)),i)}))}getCacheSize(e){return this.db.getRemoteDocumentCache().getSize(e)}}function uo(r,e){return tn(r).put((function(n,s){return{targetId:0,path:ze(n.path),sequenceNumber:s}})(e,r.currentSequenceNumber))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Am{constructor(){this.changes=new $t((e=>e.toString()),((e,t)=>e.isEqual(t))),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,fe.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const n=this.changes.get(t);return n!==void 0?R.resolve(n):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fb{constructor(e){this.serializer=e}setIndexManager(e){this.indexManager=e}addEntry(e,t,n){return Nn(e).put(n)}removeEntry(e,t,n){return Nn(e).delete((function(i,o){const c=i.path.toArray();return[c.slice(0,c.length-2),c[c.length-2],$o(o),c[c.length-1]]})(t,n))}updateMetadata(e,t){return this.getMetadata(e).next((n=>(n.byteSize+=t,this.Dr(e,n))))}getEntry(e,t){let n=fe.newInvalidDocument(t);return Nn(e).ee({index:Io,range:IDBKeyRange.only(Os(t))},((s,i)=>{n=this.Cr(t,i)})).next((()=>n))}vr(e,t){let n={size:0,document:fe.newInvalidDocument(t)};return Nn(e).ee({index:Io,range:IDBKeyRange.only(Os(t))},((s,i)=>{n={document:this.Cr(t,i),size:jo(i)}})).next((()=>n))}getEntries(e,t){let n=Ye();return this.Fr(e,t,((s,i)=>{const o=this.Cr(s,i);n=n.insert(s,o)})).next((()=>n))}Mr(e,t){let n=Ye(),s=new he(M.comparator);return this.Fr(e,t,((i,o)=>{const c=this.Cr(i,o);n=n.insert(i,c),s=s.insert(i,jo(o))})).next((()=>({documents:n,Or:s})))}Fr(e,t,n){if(t.isEmpty())return R.resolve();let s=new ae(kd);t.forEach((l=>s=s.add(l)));const i=IDBKeyRange.bound(Os(s.first()),Os(s.last())),o=s.getIterator();let c=o.getNext();return Nn(e).ee({index:Io,range:i},((l,u,f)=>{const g=M.fromSegments([...u.prefixPath,u.collectionGroup,u.documentId]);for(;c&&kd(c,g)<0;)n(c,null),c=o.getNext();c&&c.isEqual(g)&&(n(c,u),c=o.hasNext()?o.getNext():null),c?f.j(Os(c)):f.done()})).next((()=>{for(;c;)n(c,null),c=o.hasNext()?o.getNext():null}))}getDocumentsMatchingQuery(e,t,n,s,i){const o=t.path,c=[o.popLast().toArray(),o.lastSegment(),$o(n.readTime),n.documentKey.path.isEmpty()?"":n.documentKey.path.lastSegment()],l=[o.popLast().toArray(),o.lastSegment(),[Number.MAX_SAFE_INTEGER,Number.MAX_SAFE_INTEGER],""];return Nn(e).J(IDBKeyRange.bound(c,l,!0)).next((u=>{i?.incrementDocumentReadCount(u.length);let f=Ye();for(const g of u){const p=this.Cr(M.fromSegments(g.prefixPath.concat(g.collectionGroup,g.documentId)),g);p.isFoundDocument()&&(Ai(t,p)||s.has(p.key))&&(f=f.insert(p.key,p))}return f}))}getAllFromCollectionGroup(e,t,n,s){let i=Ye();const o=Dd(t,n),c=Dd(t,rt.max());return Nn(e).ee({index:ag,range:IDBKeyRange.bound(o,c,!0)},((l,u,f)=>{const g=this.Cr(M.fromSegments(u.prefixPath.concat(u.collectionGroup,u.documentId)),u);i=i.insert(g.key,g),i.size===s&&f.done()})).next((()=>i))}newChangeBuffer(e){return new Ub(this,!!e&&e.trackRemovals)}getSize(e){return this.getMetadata(e).next((t=>t.byteSize))}getMetadata(e){return Cd(e).get(Cc).next((t=>(z(!!t,20021),t)))}Dr(e,t){return Cd(e).put(Cc,t)}Cr(e,t){if(t){const n=Eb(this.serializer,t);if(!(n.isNoDocument()&&n.version.isEqual(G.min())))return n}return fe.newInvalidDocument(e)}}function Sm(r){return new Fb(r)}class Ub extends Am{constructor(e,t){super(),this.Nr=e,this.trackRemovals=t,this.Br=new $t((n=>n.toString()),((n,s)=>n.isEqual(s)))}applyChanges(e){const t=[];let n=0,s=new ae(((i,o)=>K(i.canonicalString(),o.canonicalString())));return this.changes.forEach(((i,o)=>{const c=this.Br.get(i);if(t.push(this.Nr.removeEntry(e,i,c.readTime)),o.isValidDocument()){const l=fd(this.Nr.serializer,o);s=s.add(i.path.popLast());const u=jo(l);n+=u-c.size,t.push(this.Nr.addEntry(e,i,l))}else if(n-=c.size,this.trackRemovals){const l=fd(this.Nr.serializer,o.convertToNoDocument(G.min()));t.push(this.Nr.addEntry(e,i,l))}})),s.forEach((i=>{t.push(this.Nr.indexManager.addToCollectionParentIndex(e,i))})),t.push(this.Nr.updateMetadata(e,n)),R.waitFor(t)}getFromCache(e,t){return this.Nr.vr(e,t).next((n=>(this.Br.set(t,{size:n.size,readTime:n.document.readTime}),n.document)))}getAllFromCache(e,t){return this.Nr.Mr(e,t).next((({documents:n,Or:s})=>(s.forEach(((i,o)=>{this.Br.set(i,{size:o,readTime:n.get(i).readTime})})),n)))}}function Cd(r){return Ce(r,ni)}function Nn(r){return Ce(r,Oo)}function Os(r){const e=r.path.toArray();return[e.slice(0,e.length-2),e[e.length-2],e[e.length-1]]}function Dd(r,e){const t=e.documentKey.path.toArray();return[r,$o(e.readTime),t.slice(0,t.length-2),t.length>0?t[t.length-1]:""]}function kd(r,e){const t=r.path.toArray(),n=e.path.toArray();let s=0;for(let i=0;i<t.length-2&&i<n.length-2;++i)if(s=K(t[i],n[i]),s)return s;return s=K(t.length,n.length),s||(s=K(t[t.length-2],n[n.length-2]),s||K(t[t.length-1],n[n.length-1]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bb{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rm{constructor(e,t,n,s){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=n,this.indexManager=s}getDocument(e,t){let n=null;return this.documentOverlayCache.getOverlay(e,t).next((s=>(n=s,this.remoteDocumentCache.getEntry(e,t)))).next((s=>(n!==null&&Qs(n.mutation,s,Je.empty(),se.now()),s)))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next((n=>this.getLocalViewOfDocuments(e,n,W()).next((()=>n))))}getLocalViewOfDocuments(e,t,n=W()){const s=_t();return this.populateOverlays(e,s,t).next((()=>this.computeViews(e,t,s,n).next((i=>{let o=Us();return i.forEach(((c,l)=>{o=o.insert(c,l.overlayedDocument)})),o}))))}getOverlayedDocuments(e,t){const n=_t();return this.populateOverlays(e,n,t).next((()=>this.computeViews(e,t,n,W())))}populateOverlays(e,t,n){const s=[];return n.forEach((i=>{t.has(i)||s.push(i)})),this.documentOverlayCache.getOverlays(e,s).next((i=>{i.forEach(((o,c)=>{t.set(o,c)}))}))}computeViews(e,t,n,s){let i=Ye();const o=Ws(),c=(function(){return Ws()})();return t.forEach(((l,u)=>{const f=n.get(u.key);s.has(u.key)&&(f===void 0||f.mutation instanceof qt)?i=i.insert(u.key,u):f!==void 0?(o.set(u.key,f.mutation.getFieldMask()),Qs(f.mutation,u,f.mutation.getFieldMask(),se.now())):o.set(u.key,Je.empty())})),this.recalculateAndSaveOverlays(e,i).next((l=>(l.forEach(((u,f)=>o.set(u,f))),t.forEach(((u,f)=>c.set(u,new Bb(f,o.get(u)??null)))),c)))}recalculateAndSaveOverlays(e,t){const n=Ws();let s=new he(((o,c)=>o-c)),i=W();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next((o=>{for(const c of o)c.keys().forEach((l=>{const u=t.get(l);if(u===null)return;let f=n.get(l)||Je.empty();f=c.applyToLocalView(u,f),n.set(l,f);const g=(s.get(c.batchId)||W()).add(l);s=s.insert(c.batchId,g)}))})).next((()=>{const o=[],c=s.getReverseIterator();for(;c.hasNext();){const l=c.getNext(),u=l.key,f=l.value,g=qg();f.forEach((p=>{if(!i.has(p)){const E=Qg(t.get(p),n.get(p));E!==null&&g.set(p,E),i=i.add(p)}})),o.push(this.documentOverlayCache.saveOverlays(e,u,g))}return R.waitFor(o)})).next((()=>n))}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next((n=>this.recalculateAndSaveOverlays(e,n)))}getDocumentsMatchingQuery(e,t,n,s){return(function(o){return M.isDocumentKey(o.path)&&o.collectionGroup===null&&o.filters.length===0})(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):yl(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,n,s):this.getDocumentsMatchingCollectionQuery(e,t,n,s)}getNextDocuments(e,t,n,s){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,n,s).next((i=>{const o=s-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,n.largestBatchId,s-i.size):R.resolve(_t());let c=Mr,l=i;return o.next((u=>R.forEach(u,((f,g)=>(c<g.largestBatchId&&(c=g.largestBatchId),i.get(f)?R.resolve():this.remoteDocumentCache.getEntry(e,f).next((p=>{l=l.insert(f,p)}))))).next((()=>this.populateOverlays(e,u,i))).next((()=>this.computeViews(e,l,u,W()))).next((f=>({batchId:c,changes:$g(f)})))))}))}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new M(t)).next((n=>{let s=Us();return n.isFoundDocument()&&(s=s.insert(n.key,n)),s}))}getDocumentsMatchingCollectionGroupQuery(e,t,n,s){const i=t.collectionGroup;let o=Us();return this.indexManager.getCollectionParents(e,i).next((c=>R.forEach(c,(l=>{const u=(function(g,p){return new Bt(p,null,g.explicitOrderBy.slice(),g.filters.slice(),g.limit,g.limitType,g.startAt,g.endAt)})(t,l.child(i));return this.getDocumentsMatchingCollectionQuery(e,u,n,s).next((f=>{f.forEach(((g,p)=>{o=o.insert(g,p)}))}))})).next((()=>o))))}getDocumentsMatchingCollectionQuery(e,t,n,s){let i;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,n.largestBatchId).next((o=>(i=o,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,n,i,s)))).next((o=>{i.forEach(((l,u)=>{const f=u.getKey();o.get(f)===null&&(o=o.insert(f,fe.newInvalidDocument(f)))}));let c=Us();return o.forEach(((l,u)=>{const f=i.get(l);f!==void 0&&Qs(f.mutation,u,Je.empty(),se.now()),Ai(t,u)&&(c=c.insert(l,u))})),c}))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $b{constructor(e){this.serializer=e,this.Lr=new Map,this.kr=new Map}getBundleMetadata(e,t){return R.resolve(this.Lr.get(t))}saveBundleMetadata(e,t){return this.Lr.set(t.id,(function(s){return{id:s.id,version:s.version,createTime:Te(s.createTime)}})(t)),R.resolve()}getNamedQuery(e,t){return R.resolve(this.kr.get(t))}saveNamedQuery(e,t){return this.kr.set(t.name,(function(s){return{name:s.name,query:_a(s.bundledQuery),readTime:Te(s.readTime)}})(t)),R.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qb{constructor(){this.overlays=new he(M.comparator),this.qr=new Map}getOverlay(e,t){return R.resolve(this.overlays.get(t))}getOverlays(e,t){const n=_t();return R.forEach(t,(s=>this.getOverlay(e,s).next((i=>{i!==null&&n.set(s,i)})))).next((()=>n))}saveOverlays(e,t,n){return n.forEach(((s,i)=>{this.St(e,t,i)})),R.resolve()}removeOverlaysForBatchId(e,t,n){const s=this.qr.get(n);return s!==void 0&&(s.forEach((i=>this.overlays=this.overlays.remove(i))),this.qr.delete(n)),R.resolve()}getOverlaysForCollection(e,t,n){const s=_t(),i=t.length+1,o=new M(t.child("")),c=this.overlays.getIteratorFrom(o);for(;c.hasNext();){const l=c.getNext().value,u=l.getKey();if(!t.isPrefixOf(u.path))break;u.path.length===i&&l.largestBatchId>n&&s.set(l.getKey(),l)}return R.resolve(s)}getOverlaysForCollectionGroup(e,t,n,s){let i=new he(((u,f)=>u-f));const o=this.overlays.getIterator();for(;o.hasNext();){const u=o.getNext().value;if(u.getKey().getCollectionGroup()===t&&u.largestBatchId>n){let f=i.get(u.largestBatchId);f===null&&(f=_t(),i=i.insert(u.largestBatchId,f)),f.set(u.getKey(),u)}}const c=_t(),l=i.getIterator();for(;l.hasNext()&&(l.getNext().value.forEach(((u,f)=>c.set(u,f))),!(c.size()>=s)););return R.resolve(c)}St(e,t,n){const s=this.overlays.get(n.key);if(s!==null){const o=this.qr.get(s.largestBatchId).delete(n.key);this.qr.set(s.largestBatchId,o)}this.overlays=this.overlays.insert(n.key,new El(t,n));let i=this.qr.get(t);i===void 0&&(i=W(),this.qr.set(t,i)),this.qr.set(t,i.add(n.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jb{constructor(){this.sessionToken=Ie.EMPTY_BYTE_STRING}getSessionToken(e){return R.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,R.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xl{constructor(){this.Qr=new ae(De.$r),this.Ur=new ae(De.Kr)}isEmpty(){return this.Qr.isEmpty()}addReference(e,t){const n=new De(e,t);this.Qr=this.Qr.add(n),this.Ur=this.Ur.add(n)}Wr(e,t){e.forEach((n=>this.addReference(n,t)))}removeReference(e,t){this.Gr(new De(e,t))}zr(e,t){e.forEach((n=>this.removeReference(n,t)))}jr(e){const t=new M(new J([])),n=new De(t,e),s=new De(t,e+1),i=[];return this.Ur.forEachInRange([n,s],(o=>{this.Gr(o),i.push(o.key)})),i}Jr(){this.Qr.forEach((e=>this.Gr(e)))}Gr(e){this.Qr=this.Qr.delete(e),this.Ur=this.Ur.delete(e)}Hr(e){const t=new M(new J([])),n=new De(t,e),s=new De(t,e+1);let i=W();return this.Ur.forEachInRange([n,s],(o=>{i=i.add(o.key)})),i}containsKey(e){const t=new De(e,0),n=this.Qr.firstAfterOrEqual(t);return n!==null&&e.isEqual(n.key)}}class De{constructor(e,t){this.key=e,this.Yr=t}static $r(e,t){return M.comparator(e.key,t.key)||K(e.Yr,t.Yr)}static Kr(e,t){return K(e.Yr,t.Yr)||M.comparator(e.key,t.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zb{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.tr=1,this.Zr=new ae(De.$r)}checkEmpty(e){return R.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,n,s){const i=this.tr;this.tr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const o=new vl(i,t,n,s);this.mutationQueue.push(o);for(const c of s)this.Zr=this.Zr.add(new De(c.key,i)),this.indexManager.addToCollectionParentIndex(e,c.key.path.popLast());return R.resolve(o)}lookupMutationBatch(e,t){return R.resolve(this.Xr(t))}getNextMutationBatchAfterBatchId(e,t){const n=t+1,s=this.ei(n),i=s<0?0:s;return R.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return R.resolve(this.mutationQueue.length===0?fn:this.tr-1)}getAllMutationBatches(e){return R.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const n=new De(t,0),s=new De(t,Number.POSITIVE_INFINITY),i=[];return this.Zr.forEachInRange([n,s],(o=>{const c=this.Xr(o.Yr);i.push(c)})),R.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(e,t){let n=new ae(K);return t.forEach((s=>{const i=new De(s,0),o=new De(s,Number.POSITIVE_INFINITY);this.Zr.forEachInRange([i,o],(c=>{n=n.add(c.Yr)}))})),R.resolve(this.ti(n))}getAllMutationBatchesAffectingQuery(e,t){const n=t.path,s=n.length+1;let i=n;M.isDocumentKey(i)||(i=i.child(""));const o=new De(new M(i),0);let c=new ae(K);return this.Zr.forEachWhile((l=>{const u=l.key.path;return!!n.isPrefixOf(u)&&(u.length===s&&(c=c.add(l.Yr)),!0)}),o),R.resolve(this.ti(c))}ti(e){const t=[];return e.forEach((n=>{const s=this.Xr(n);s!==null&&t.push(s)})),t}removeMutationBatch(e,t){z(this.ni(t.batchId,"removed")===0,55003),this.mutationQueue.shift();let n=this.Zr;return R.forEach(t.mutations,(s=>{const i=new De(s.key,t.batchId);return n=n.delete(i),this.referenceDelegate.markPotentiallyOrphaned(e,s.key)})).next((()=>{this.Zr=n}))}ir(e){}containsKey(e,t){const n=new De(t,0),s=this.Zr.firstAfterOrEqual(n);return R.resolve(t.isEqual(s&&s.key))}performConsistencyCheck(e){return this.mutationQueue.length,R.resolve()}ni(e,t){return this.ei(e)}ei(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Xr(e){const t=this.ei(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gb{constructor(e){this.ri=e,this.docs=(function(){return new he(M.comparator)})(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const n=t.key,s=this.docs.get(n),i=s?s.size:0,o=this.ri(t);return this.docs=this.docs.insert(n,{document:t.mutableCopy(),size:o}),this.size+=o-i,this.indexManager.addToCollectionParentIndex(e,n.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const n=this.docs.get(t);return R.resolve(n?n.document.mutableCopy():fe.newInvalidDocument(t))}getEntries(e,t){let n=Ye();return t.forEach((s=>{const i=this.docs.get(s);n=n.insert(s,i?i.document.mutableCopy():fe.newInvalidDocument(s))})),R.resolve(n)}getDocumentsMatchingQuery(e,t,n,s){let i=Ye();const o=t.path,c=new M(o.child("__id-9223372036854775808__")),l=this.docs.getIteratorFrom(c);for(;l.hasNext();){const{key:u,value:{document:f}}=l.getNext();if(!o.isPrefixOf(u.path))break;u.path.length>o.length+1||ll(tg(f),n)<=0||(s.has(f.key)||Ai(t,f))&&(i=i.insert(f.key,f.mutableCopy()))}return R.resolve(i)}getAllFromCollectionGroup(e,t,n,s){q(9500)}ii(e,t){return R.forEach(this.docs,(n=>t(n)))}newChangeBuffer(e){return new Kb(this)}getSize(e){return R.resolve(this.size)}}class Kb extends Am{constructor(e){super(),this.Nr=e}applyChanges(e){const t=[];return this.changes.forEach(((n,s)=>{s.isValidDocument()?t.push(this.Nr.addEntry(e,s)):this.Nr.removeEntry(n)})),R.waitFor(t)}getFromCache(e,t){return this.Nr.getEntry(e,t)}getAllFromCache(e,t){return this.Nr.getEntries(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hb{constructor(e){this.persistence=e,this.si=new $t((t=>Jn(t)),Ti),this.lastRemoteSnapshotVersion=G.min(),this.highestTargetId=0,this.oi=0,this._i=new xl,this.targetCount=0,this.ai=tr.ur()}forEachTarget(e,t){return this.si.forEach(((n,s)=>t(s))),R.resolve()}getLastRemoteSnapshotVersion(e){return R.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return R.resolve(this.oi)}allocateTargetId(e){return this.highestTargetId=this.ai.next(),R.resolve(this.highestTargetId)}setTargetsMetadata(e,t,n){return n&&(this.lastRemoteSnapshotVersion=n),t>this.oi&&(this.oi=t),R.resolve()}Pr(e){this.si.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.ai=new tr(t),this.highestTargetId=t),e.sequenceNumber>this.oi&&(this.oi=e.sequenceNumber)}addTargetData(e,t){return this.Pr(t),this.targetCount+=1,R.resolve()}updateTargetData(e,t){return this.Pr(t),R.resolve()}removeTargetData(e,t){return this.si.delete(t.target),this._i.jr(t.targetId),this.targetCount-=1,R.resolve()}removeTargets(e,t,n){let s=0;const i=[];return this.si.forEach(((o,c)=>{c.sequenceNumber<=t&&n.get(c.targetId)===null&&(this.si.delete(o),i.push(this.removeMatchingKeysForTargetId(e,c.targetId)),s++)})),R.waitFor(i).next((()=>s))}getTargetCount(e){return R.resolve(this.targetCount)}getTargetData(e,t){const n=this.si.get(t)||null;return R.resolve(n)}addMatchingKeys(e,t,n){return this._i.Wr(t,n),R.resolve()}removeMatchingKeys(e,t,n){this._i.zr(t,n);const s=this.persistence.referenceDelegate,i=[];return s&&t.forEach((o=>{i.push(s.markPotentiallyOrphaned(e,o))})),R.waitFor(i)}removeMatchingKeysForTargetId(e,t){return this._i.jr(t),R.resolve()}getMatchingKeysForTargetId(e,t){const n=this._i.Hr(t);return R.resolve(n)}containsKey(e,t){return R.resolve(this._i.containsKey(t))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cl{constructor(e,t){this.ui={},this.overlays={},this.ci=new Qe(0),this.li=!1,this.li=!0,this.hi=new jb,this.referenceDelegate=e(this),this.Pi=new Hb(this),this.indexManager=new kb,this.remoteDocumentCache=(function(s){return new Gb(s)})((n=>this.referenceDelegate.Ti(n))),this.serializer=new gm(t),this.Ii=new $b(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.li=!1,Promise.resolve()}get started(){return this.li}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new qb,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let n=this.ui[e.toKey()];return n||(n=new zb(t,this.referenceDelegate),this.ui[e.toKey()]=n),n}getGlobalsCache(){return this.hi}getTargetCache(){return this.Pi}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Ii}runTransaction(e,t,n){N("MemoryPersistence","Starting transaction:",e);const s=new Wb(this.ci.next());return this.referenceDelegate.Ei(),n(s).next((i=>this.referenceDelegate.di(s).next((()=>i)))).toPromise().then((i=>(s.raiseOnCommittedEvent(),i)))}Ai(e,t){return R.or(Object.values(this.ui).map((n=>()=>n.containsKey(e,t))))}}class Wb extends rg{constructor(e){super(),this.currentSequenceNumber=e}}class Ia{constructor(e){this.persistence=e,this.Ri=new xl,this.Vi=null}static mi(e){return new Ia(e)}get fi(){if(this.Vi)return this.Vi;throw q(60996)}addReference(e,t,n){return this.Ri.addReference(n,t),this.fi.delete(n.toString()),R.resolve()}removeReference(e,t,n){return this.Ri.removeReference(n,t),this.fi.add(n.toString()),R.resolve()}markPotentiallyOrphaned(e,t){return this.fi.add(t.toString()),R.resolve()}removeTarget(e,t){this.Ri.jr(t.targetId).forEach((s=>this.fi.add(s.toString())));const n=this.persistence.getTargetCache();return n.getMatchingKeysForTargetId(e,t.targetId).next((s=>{s.forEach((i=>this.fi.add(i.toString())))})).next((()=>n.removeTargetData(e,t)))}Ei(){this.Vi=new Set}di(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return R.forEach(this.fi,(n=>{const s=M.fromPath(n);return this.gi(e,s).next((i=>{i||t.removeEntry(s,G.min())}))})).next((()=>(this.Vi=null,t.apply(e))))}updateLimboDocument(e,t){return this.gi(e,t).next((n=>{n?this.fi.delete(t.toString()):this.fi.add(t.toString())}))}Ti(e){return 0}gi(e,t){return R.or([()=>R.resolve(this.Ri.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Ai(e,t)])}}class zo{constructor(e,t){this.persistence=e,this.pi=new $t((n=>ze(n.path)),((n,s)=>n.isEqual(s))),this.garbageCollector=Em(this,t)}static mi(e,t){return new zo(e,t)}Ei(){}di(e){return R.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}gr(e){const t=this.wr(e);return this.persistence.getTargetCache().getTargetCount(e).next((n=>t.next((s=>n+s))))}wr(e){let t=0;return this.pr(e,(n=>{t++})).next((()=>t))}pr(e,t){return R.forEach(this.pi,((n,s)=>this.br(e,n,s).next((i=>i?R.resolve():t(s)))))}removeTargets(e,t,n){return this.persistence.getTargetCache().removeTargets(e,t,n)}removeOrphanedDocuments(e,t){let n=0;const s=this.persistence.getRemoteDocumentCache(),i=s.newChangeBuffer();return s.ii(e,(o=>this.br(e,o,t).next((c=>{c||(n++,i.removeEntry(o,G.min()))})))).next((()=>i.apply(e))).next((()=>n))}markPotentiallyOrphaned(e,t){return this.pi.set(t,e.currentSequenceNumber),R.resolve()}removeTarget(e,t){const n=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,n)}addReference(e,t,n){return this.pi.set(n,e.currentSequenceNumber),R.resolve()}removeReference(e,t,n){return this.pi.set(n,e.currentSequenceNumber),R.resolve()}updateLimboDocument(e,t){return this.pi.set(t,e.currentSequenceNumber),R.resolve()}Ti(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=vo(e.data.value)),t}br(e,t,n){return R.or([()=>this.persistence.Ai(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{const s=this.pi.get(t);return R.resolve(s!==void 0&&s>n)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qb{constructor(e){this.serializer=e}k(e,t,n,s){const i=new oa("createOrUpgrade",t);n<1&&s>=1&&((function(l){l.createObjectStore(vi)})(e),(function(l){l.createObjectStore(ti,{keyPath:fI}),l.createObjectStore(ct,{keyPath:jh,autoIncrement:!0}).createIndex(qn,zh,{unique:!0}),l.createObjectStore(Fr)})(e),Vd(e),(function(l){l.createObjectStore(Ln)})(e));let o=R.resolve();return n<3&&s>=3&&(n!==0&&((function(l){l.deleteObjectStore(Br),l.deleteObjectStore(Ur),l.deleteObjectStore(Gn)})(e),Vd(e)),o=o.next((()=>(function(l){const u=l.store(Gn),f={highestTargetId:0,highestListenSequenceNumber:0,lastRemoteSnapshotVersion:G.min().toTimestamp(),targetCount:0};return u.put(Lo,f)})(i)))),n<4&&s>=4&&(n!==0&&(o=o.next((()=>(function(l,u){return u.store(ct).J().next((g=>{l.deleteObjectStore(ct),l.createObjectStore(ct,{keyPath:jh,autoIncrement:!0}).createIndex(qn,zh,{unique:!0});const p=u.store(ct),E=g.map((A=>p.put(A)));return R.waitFor(E)}))})(e,i)))),o=o.next((()=>{(function(l){l.createObjectStore($r,{keyPath:vI})})(e)}))),n<5&&s>=5&&(o=o.next((()=>this.yi(i)))),n<6&&s>=6&&(o=o.next((()=>((function(l){l.createObjectStore(ni)})(e),this.wi(i))))),n<7&&s>=7&&(o=o.next((()=>this.Si(i)))),n<8&&s>=8&&(o=o.next((()=>this.bi(e,i)))),n<9&&s>=9&&(o=o.next((()=>{(function(l){l.objectStoreNames.contains("remoteDocumentChanges")&&l.deleteObjectStore("remoteDocumentChanges")})(e)}))),n<10&&s>=10&&(o=o.next((()=>this.Di(i)))),n<11&&s>=11&&(o=o.next((()=>{(function(l){l.createObjectStore(aa,{keyPath:TI})})(e),(function(l){l.createObjectStore(ca,{keyPath:EI})})(e)}))),n<12&&s>=12&&(o=o.next((()=>{(function(l){const u=l.createObjectStore(la,{keyPath:DI});u.createIndex(kc,kI,{unique:!1}),u.createIndex(hg,VI,{unique:!1})})(e)}))),n<13&&s>=13&&(o=o.next((()=>(function(l){const u=l.createObjectStore(Oo,{keyPath:mI});u.createIndex(Io,pI),u.createIndex(ag,_I)})(e))).next((()=>this.Ci(e,i))).next((()=>e.deleteObjectStore(Ln)))),n<14&&s>=14&&(o=o.next((()=>this.Fi(e,i)))),n<15&&s>=15&&(o=o.next((()=>(function(l){l.createObjectStore(dl,{keyPath:AI,autoIncrement:!0}).createIndex(Dc,SI,{unique:!1}),l.createObjectStore(Gs,{keyPath:RI}).createIndex(lg,PI,{unique:!1}),l.createObjectStore(Ks,{keyPath:xI}).createIndex(ug,CI,{unique:!1})})(e)))),n<16&&s>=16&&(o=o.next((()=>{t.objectStore(Gs).clear()})).next((()=>{t.objectStore(Ks).clear()}))),n<17&&s>=17&&(o=o.next((()=>{(function(l){l.createObjectStore(fl,{keyPath:NI})})(e)}))),n<18&&s>=18&&kf()&&(o=o.next((()=>{t.objectStore(Gs).clear()})).next((()=>{t.objectStore(Ks).clear()}))),o}wi(e){let t=0;return e.store(Ln).ee(((n,s)=>{t+=jo(s)})).next((()=>{const n={byteSize:t};return e.store(ni).put(Cc,n)}))}yi(e){const t=e.store(ti),n=e.store(ct);return t.J().next((s=>R.forEach(s,(i=>{const o=IDBKeyRange.bound([i.userId,fn],[i.userId,i.lastAcknowledgedBatchId]);return n.J(qn,o).next((c=>R.forEach(c,(l=>{z(l.userId===i.userId,18650,"Cannot process batch from unexpected user",{batchId:l.batchId});const u=Un(this.serializer,l);return wm(e,i.userId,u).next((()=>{}))}))))}))))}Si(e){const t=e.store(Br),n=e.store(Ln);return e.store(Gn).get(Lo).next((s=>{const i=[];return n.ee(((o,c)=>{const l=new J(o),u=(function(g){return[0,ze(g)]})(l);i.push(t.get(u).next((f=>f?R.resolve():(g=>t.put({targetId:0,path:ze(g),sequenceNumber:s.highestListenSequenceNumber}))(l))))})).next((()=>R.waitFor(i)))}))}bi(e,t){e.createObjectStore(ri,{keyPath:bI});const n=t.store(ri),s=new Pl,i=o=>{if(s.add(o)){const c=o.lastSegment(),l=o.popLast();return n.put({collectionId:c,parent:ze(l)})}};return t.store(Ln).ee({X:!0},((o,c)=>{const l=new J(o);return i(l.popLast())})).next((()=>t.store(Fr).ee({X:!0},(([o,c,l],u)=>{const f=pt(c);return i(f.popLast())}))))}Di(e){const t=e.store(Ur);return t.ee(((n,s)=>{const i=$s(s),o=mm(this.serializer,i);return t.put(o)}))}Ci(e,t){const n=t.store(Ln),s=[];return n.ee(((i,o)=>{const c=t.store(Oo),l=(function(g){return g.document?new M(J.fromString(g.document.name).popFirst(5)):g.noDocument?M.fromSegments(g.noDocument.path):g.unknownDocument?M.fromSegments(g.unknownDocument.path):q(36783)})(o).path.toArray(),u={prefixPath:l.slice(0,l.length-2),collectionGroup:l[l.length-2],documentId:l[l.length-1],readTime:o.readTime||[0,0],unknownDocument:o.unknownDocument,noDocument:o.noDocument,document:o.document,hasCommittedMutations:!!o.hasCommittedMutations};s.push(c.put(u))})).next((()=>R.waitFor(s)))}Fi(e,t){const n=t.store(ct),s=Sm(this.serializer),i=new Cl(Ia.mi,this.serializer.yt);return n.J().next((o=>{const c=new Map;return o.forEach((l=>{let u=c.get(l.userId)??W();Un(this.serializer,l).keys().forEach((f=>u=u.add(f))),c.set(l.userId,u)})),R.forEach(c,((l,u)=>{const f=new ke(u),g=ya.wt(this.serializer,f),p=i.getIndexManager(f),E=wa.wt(f,this.serializer,p,i.referenceDelegate);return new Rm(s,E,g,p).recalculateAndSaveOverlaysForDocumentKeys(new Vc(t,Qe.ce),l).next()}))}))}}function Vd(r){r.createObjectStore(Br,{keyPath:wI}).createIndex(hl,II,{unique:!0}),r.createObjectStore(Ur,{keyPath:"targetId"}).createIndex(cg,yI,{unique:!0}),r.createObjectStore(Gn)}const Xt="IndexedDbPersistence",hc=18e5,dc=5e3,fc="Failed to obtain exclusive access to the persistence layer. To allow shared access, multi-tab synchronization has to be enabled in all tabs. If you are using `experimentalForceOwningTab:true`, make sure that only one tab has persistence enabled at any given time.",Pm="main";class Dl{constructor(e,t,n,s,i,o,c,l,u,f,g=18){if(this.allowTabSynchronization=e,this.persistenceKey=t,this.clientId=n,this.Mi=i,this.window=o,this.document=c,this.xi=u,this.Oi=f,this.Ni=g,this.ci=null,this.li=!1,this.isPrimary=!1,this.networkEnabled=!0,this.Bi=null,this.inForeground=!1,this.Li=null,this.ki=null,this.qi=Number.NEGATIVE_INFINITY,this.Qi=p=>Promise.resolve(),!Dl.v())throw new V(x.UNIMPLEMENTED,"This platform is either missing IndexedDB or is known to have an incomplete implementation. Offline persistence has been disabled.");this.referenceDelegate=new Lb(this,s),this.$i=t+Pm,this.serializer=new gm(l),this.Ui=new wt(this.$i,this.Ni,new Qb(this.serializer)),this.hi=new Sb,this.Pi=new Nb(this.referenceDelegate,this.serializer),this.remoteDocumentCache=Sm(this.serializer),this.Ii=new Ab,this.window&&this.window.localStorage?this.Ki=this.window.localStorage:(this.Ki=null,f===!1&&ve(Xt,"LocalStorage is unavailable. As a result, persistence may not work reliably. In particular enablePersistence() could fail immediately after refreshing the page."))}start(){return this.Wi().then((()=>{if(!this.isPrimary&&!this.allowTabSynchronization)throw new V(x.FAILED_PRECONDITION,fc);return this.Gi(),this.zi(),this.ji(),this.runTransaction("getHighestListenSequenceNumber","readonly",(e=>this.Pi.getHighestSequenceNumber(e)))})).then((e=>{this.ci=new Qe(e,this.xi)})).then((()=>{this.li=!0})).catch((e=>(this.Ui&&this.Ui.close(),Promise.reject(e))))}Ji(e){return this.Qi=async t=>{if(this.started)return e(t)},e(this.isPrimary)}setDatabaseDeletedListener(e){this.Ui.$((async t=>{t.newVersion===null&&await e()}))}setNetworkEnabled(e){this.networkEnabled!==e&&(this.networkEnabled=e,this.Mi.enqueueAndForget((async()=>{this.started&&await this.Wi()})))}Wi(){return this.runTransaction("updateClientMetadataAndTryBecomePrimary","readwrite",(e=>ho(e).put({clientId:this.clientId,updateTimeMs:Date.now(),networkEnabled:this.networkEnabled,inForeground:this.inForeground}).next((()=>{if(this.isPrimary)return this.Hi(e).next((t=>{t||(this.isPrimary=!1,this.Mi.enqueueRetryable((()=>this.Qi(!1))))}))})).next((()=>this.Yi(e))).next((t=>this.isPrimary&&!t?this.Zi(e).next((()=>!1)):!!t&&this.Xi(e).next((()=>!0)))))).catch((e=>{if(Tn(e))return N(Xt,"Failed to extend owner lease: ",e),this.isPrimary;if(!this.allowTabSynchronization)throw e;return N(Xt,"Releasing owner lease after error during lease refresh",e),!1})).then((e=>{this.isPrimary!==e&&this.Mi.enqueueRetryable((()=>this.Qi(e))),this.isPrimary=e}))}Hi(e){return Ls(e).get(pr).next((t=>R.resolve(this.es(t))))}ts(e){return ho(e).delete(this.clientId)}async ns(){if(this.isPrimary&&!this.rs(this.qi,hc)){this.qi=Date.now();const e=await this.runTransaction("maybeGarbageCollectMultiClientState","readwrite-primary",(t=>{const n=Ce(t,$r);return n.J().next((s=>{const i=this.ss(s,hc),o=s.filter((c=>i.indexOf(c)===-1));return R.forEach(o,(c=>n.delete(c.clientId))).next((()=>o))}))})).catch((()=>[]));if(this.Ki)for(const t of e)this.Ki.removeItem(this._s(t.clientId))}}ji(){this.ki=this.Mi.enqueueAfterDelay("client_metadata_refresh",4e3,(()=>this.Wi().then((()=>this.ns())).then((()=>this.ji()))))}es(e){return!!e&&e.ownerId===this.clientId}Yi(e){return this.Oi?R.resolve(!0):Ls(e).get(pr).next((t=>{if(t!==null&&this.rs(t.leaseTimestampMs,dc)&&!this.us(t.ownerId)){if(this.es(t)&&this.networkEnabled)return!0;if(!this.es(t)){if(!t.allowTabSynchronization)throw new V(x.FAILED_PRECONDITION,fc);return!1}}return!(!this.networkEnabled||!this.inForeground)||ho(e).J().next((n=>this.ss(n,dc).find((s=>{if(this.clientId!==s.clientId){const i=!this.networkEnabled&&s.networkEnabled,o=!this.inForeground&&s.inForeground,c=this.networkEnabled===s.networkEnabled;if(i||o&&c)return!0}return!1}))===void 0))})).next((t=>(this.isPrimary!==t&&N(Xt,`Client ${t?"is":"is not"} eligible for a primary lease.`),t)))}async shutdown(){this.li=!1,this.cs(),this.ki&&(this.ki.cancel(),this.ki=null),this.ls(),this.hs(),await this.Ui.runTransaction("shutdown","readwrite",[vi,$r],(e=>{const t=new Vc(e,Qe.ce);return this.Zi(t).next((()=>this.ts(t)))})),this.Ui.close(),this.Ps()}ss(e,t){return e.filter((n=>this.rs(n.updateTimeMs,t)&&!this.us(n.clientId)))}Ts(){return this.runTransaction("getActiveClients","readonly",(e=>ho(e).J().next((t=>this.ss(t,hc).map((n=>n.clientId))))))}get started(){return this.li}getGlobalsCache(){return this.hi}getMutationQueue(e,t){return wa.wt(e,this.serializer,t,this.referenceDelegate)}getTargetCache(){return this.Pi}getRemoteDocumentCache(){return this.remoteDocumentCache}getIndexManager(e){return new Vb(e,this.serializer.yt.databaseId)}getDocumentOverlayCache(e){return ya.wt(this.serializer,e)}getBundleCache(){return this.Ii}runTransaction(e,t,n){N(Xt,"Starting transaction:",e);const s=t==="readonly"?"readonly":"readwrite",i=(function(l){return l===18?LI:l===17?mg:l===16?OI:l===15?gl:l===14?gg:l===13?fg:l===12?MI:l===11?dg:void q(60245)})(this.Ni);let o;return this.Ui.runTransaction(e,s,i,(c=>(o=new Vc(c,this.ci?this.ci.next():Qe.ce),t==="readwrite-primary"?this.Hi(o).next((l=>!!l||this.Yi(o))).next((l=>{if(!l)throw ve(`Failed to obtain primary lease for action '${e}'.`),this.isPrimary=!1,this.Mi.enqueueRetryable((()=>this.Qi(!1))),new V(x.FAILED_PRECONDITION,ng);return n(o)})).next((l=>this.Xi(o).next((()=>l)))):this.Is(o).next((()=>n(o)))))).then((c=>(o.raiseOnCommittedEvent(),c)))}Is(e){return Ls(e).get(pr).next((t=>{if(t!==null&&this.rs(t.leaseTimestampMs,dc)&&!this.us(t.ownerId)&&!this.es(t)&&!(this.Oi||this.allowTabSynchronization&&t.allowTabSynchronization))throw new V(x.FAILED_PRECONDITION,fc)}))}Xi(e){const t={ownerId:this.clientId,allowTabSynchronization:this.allowTabSynchronization,leaseTimestampMs:Date.now()};return Ls(e).put(pr,t)}static v(){return wt.v()}Zi(e){const t=Ls(e);return t.get(pr).next((n=>this.es(n)?(N(Xt,"Releasing primary lease."),t.delete(pr)):R.resolve()))}rs(e,t){const n=Date.now();return!(e<n-t)&&(!(e>n)||(ve(`Detected an update time that is in the future: ${e} > ${n}`),!1))}Gi(){this.document!==null&&typeof this.document.addEventListener=="function"&&(this.Li=()=>{this.Mi.enqueueAndForget((()=>(this.inForeground=this.document.visibilityState==="visible",this.Wi())))},this.document.addEventListener("visibilitychange",this.Li),this.inForeground=this.document.visibilityState==="visible")}ls(){this.Li&&(this.document.removeEventListener("visibilitychange",this.Li),this.Li=null)}zi(){typeof this.window?.addEventListener=="function"&&(this.Bi=()=>{this.cs();const e=/(?:Version|Mobile)\/1[456]/;Df()&&(navigator.appVersion.match(e)||navigator.userAgent.match(e))&&this.Mi.enterRestrictedMode(!0),this.Mi.enqueueAndForget((()=>this.shutdown()))},this.window.addEventListener("pagehide",this.Bi))}hs(){this.Bi&&(this.window.removeEventListener("pagehide",this.Bi),this.Bi=null)}us(e){try{const t=this.Ki?.getItem(this._s(e))!==null;return N(Xt,`Client '${e}' ${t?"is":"is not"} zombied in LocalStorage`),t}catch(t){return ve(Xt,"Failed to get zombied client id.",t),!1}}cs(){if(this.Ki)try{this.Ki.setItem(this._s(this.clientId),String(Date.now()))}catch(e){ve("Failed to set zombie client id.",e)}}Ps(){if(this.Ki)try{this.Ki.removeItem(this._s(this.clientId))}catch{}}_s(e){return`firestore_zombie_${this.persistenceKey}_${e}`}}function Ls(r){return Ce(r,vi)}function ho(r){return Ce(r,$r)}function kl(r,e){let t=r.projectId;return r.isDefaultDatabase||(t+="."+r.database),"firestore/"+e+"/"+t+"/"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vl{constructor(e,t,n,s){this.targetId=e,this.fromCache=t,this.Es=n,this.ds=s}static As(e,t){let n=W(),s=W();for(const i of t.docChanges)switch(i.type){case 0:n=n.add(i.doc.key);break;case 1:s=s.add(i.doc.key)}return new Vl(e,t.fromCache,n,s)}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jb{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xm{constructor(){this.Rs=!1,this.Vs=!1,this.fs=100,this.gs=(function(){return Df()?8:sg(Pe())>0?6:4})()}initialize(e,t){this.ps=e,this.indexManager=t,this.Rs=!0}getDocumentsMatchingQuery(e,t,n,s){const i={result:null};return this.ys(e,t).next((o=>{i.result=o})).next((()=>{if(!i.result)return this.ws(e,t,s,n).next((o=>{i.result=o}))})).next((()=>{if(i.result)return;const o=new Jb;return this.Ss(e,t,o).next((c=>{if(i.result=c,this.Vs)return this.bs(e,t,o,c.size)}))})).next((()=>i.result))}bs(e,t,n,s){return n.documentReadCount<this.fs?(vr()<=X.DEBUG&&N("QueryEngine","SDK will not create cache indexes for query:",Tr(t),"since it only creates cache indexes for collection contains","more than or equal to",this.fs,"documents"),R.resolve()):(vr()<=X.DEBUG&&N("QueryEngine","Query:",Tr(t),"scans",n.documentReadCount,"local documents and returns",s,"documents as results."),n.documentReadCount>this.gs*s?(vr()<=X.DEBUG&&N("QueryEngine","The SDK decides to create cache indexes for query:",Tr(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,Ge(t))):R.resolve())}ys(e,t){if(rd(t))return R.resolve(null);let n=Ge(t);return this.indexManager.getIndexType(e,n).next((s=>s===0?null:(t.limit!==null&&s===1&&(t=Bo(t,null,"F"),n=Ge(t)),this.indexManager.getDocumentsMatchingTarget(e,n).next((i=>{const o=W(...i);return this.ps.getDocuments(e,o).next((c=>this.indexManager.getMinOffset(e,n).next((l=>{const u=this.Ds(t,c);return this.Cs(t,u,o,l.readTime)?this.ys(e,Bo(t,null,"F")):this.vs(e,u,t,l)}))))})))))}ws(e,t,n,s){return rd(t)||s.isEqual(G.min())?R.resolve(null):this.ps.getDocuments(e,n).next((i=>{const o=this.Ds(t,i);return this.Cs(t,o,n,s)?R.resolve(null):(vr()<=X.DEBUG&&N("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),Tr(t)),this.vs(e,o,t,eg(s,Mr)).next((c=>c)))}))}Ds(e,t){let n=new ae(Ug(e));return t.forEach(((s,i)=>{Ai(e,i)&&(n=n.add(i))})),n}Cs(e,t,n,s){if(e.limit===null)return!1;if(n.size!==t.size)return!0;const i=e.limitType==="F"?t.last():t.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(s)>0)}Ss(e,t,n){return vr()<=X.DEBUG&&N("QueryEngine","Using full collection scan to execute query:",Tr(t)),this.ps.getDocumentsMatchingQuery(e,t,rt.min(),n)}vs(e,t,n,s){return this.ps.getDocumentsMatchingQuery(e,n,s).next((i=>(t.forEach((o=>{i=i.insert(o.key,o)})),i)))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Nl="LocalStore",Yb=3e8;class Xb{constructor(e,t,n,s){this.persistence=e,this.Fs=t,this.serializer=s,this.Ms=new he(K),this.xs=new $t((i=>Jn(i)),Ti),this.Os=new Map,this.Ns=e.getRemoteDocumentCache(),this.Pi=e.getTargetCache(),this.Ii=e.getBundleCache(),this.Bs(n)}Bs(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new Rm(this.Ns,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Ns.setIndexManager(this.indexManager),this.Fs.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",(t=>e.collect(t,this.Ms)))}}function Cm(r,e,t,n){return new Xb(r,e,t,n)}async function Dm(r,e){const t=O(r);return await t.persistence.runTransaction("Handle user change","readonly",(n=>{let s;return t.mutationQueue.getAllMutationBatches(n).next((i=>(s=i,t.Bs(e),t.mutationQueue.getAllMutationBatches(n)))).next((i=>{const o=[],c=[];let l=W();for(const u of s){o.push(u.batchId);for(const f of u.mutations)l=l.add(f.key)}for(const u of i){c.push(u.batchId);for(const f of u.mutations)l=l.add(f.key)}return t.localDocuments.getDocuments(n,l).next((u=>({Ls:u,removedBatchIds:o,addedBatchIds:c})))}))}))}function Zb(r,e){const t=O(r);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",(n=>{const s=e.batch.keys(),i=t.Ns.newChangeBuffer({trackRemovals:!0});return(function(c,l,u,f){const g=u.batch,p=g.keys();let E=R.resolve();return p.forEach((A=>{E=E.next((()=>f.getEntry(l,A))).next((D=>{const k=u.docVersions.get(A);z(k!==null,48541),D.version.compareTo(k)<0&&(g.applyToRemoteDocument(D,u),D.isValidDocument()&&(D.setReadTime(u.commitVersion),f.addEntry(D)))}))})),E.next((()=>c.mutationQueue.removeMutationBatch(l,g)))})(t,n,e,i).next((()=>i.apply(n))).next((()=>t.mutationQueue.performConsistencyCheck(n))).next((()=>t.documentOverlayCache.removeOverlaysForBatchId(n,s,e.batch.batchId))).next((()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(n,(function(c){let l=W();for(let u=0;u<c.mutationResults.length;++u)c.mutationResults[u].transformResults.length>0&&(l=l.add(c.batch.mutations[u].key));return l})(e)))).next((()=>t.localDocuments.getDocuments(n,s)))}))}function km(r){const e=O(r);return e.persistence.runTransaction("Get last remote snapshot version","readonly",(t=>e.Pi.getLastRemoteSnapshotVersion(t)))}function ev(r,e){const t=O(r),n=e.snapshotVersion;let s=t.Ms;return t.persistence.runTransaction("Apply remote event","readwrite-primary",(i=>{const o=t.Ns.newChangeBuffer({trackRemovals:!0});s=t.Ms;const c=[];e.targetChanges.forEach(((f,g)=>{const p=s.get(g);if(!p)return;c.push(t.Pi.removeMatchingKeys(i,f.removedDocuments,g).next((()=>t.Pi.addMatchingKeys(i,f.addedDocuments,g))));let E=p.withSequenceNumber(i.currentSequenceNumber);e.targetMismatches.get(g)!==null?E=E.withResumeToken(Ie.EMPTY_BYTE_STRING,G.min()).withLastLimboFreeSnapshotVersion(G.min()):f.resumeToken.approximateByteSize()>0&&(E=E.withResumeToken(f.resumeToken,n)),s=s.insert(g,E),(function(D,k,B){return D.resumeToken.approximateByteSize()===0||k.snapshotVersion.toMicroseconds()-D.snapshotVersion.toMicroseconds()>=Yb?!0:B.addedDocuments.size+B.modifiedDocuments.size+B.removedDocuments.size>0})(p,E,f)&&c.push(t.Pi.updateTargetData(i,E))}));let l=Ye(),u=W();if(e.documentUpdates.forEach((f=>{e.resolvedLimboDocuments.has(f)&&c.push(t.persistence.referenceDelegate.updateLimboDocument(i,f))})),c.push(Vm(i,o,e.documentUpdates).next((f=>{l=f.ks,u=f.qs}))),!n.isEqual(G.min())){const f=t.Pi.getLastRemoteSnapshotVersion(i).next((g=>t.Pi.setTargetsMetadata(i,i.currentSequenceNumber,n)));c.push(f)}return R.waitFor(c).next((()=>o.apply(i))).next((()=>t.localDocuments.getLocalViewOfDocuments(i,l,u))).next((()=>l))})).then((i=>(t.Ms=s,i)))}function Vm(r,e,t){let n=W(),s=W();return t.forEach((i=>n=n.add(i))),e.getEntries(r,n).next((i=>{let o=Ye();return t.forEach(((c,l)=>{const u=i.get(c);l.isFoundDocument()!==u.isFoundDocument()&&(s=s.add(c)),l.isNoDocument()&&l.version.isEqual(G.min())?(e.removeEntry(c,l.readTime),o=o.insert(c,l)):!u.isValidDocument()||l.version.compareTo(u.version)>0||l.version.compareTo(u.version)===0&&u.hasPendingWrites?(e.addEntry(l),o=o.insert(c,l)):N(Nl,"Ignoring outdated watch update for ",c,". Current version:",u.version," Watch version:",l.version)})),{ks:o,qs:s}}))}function tv(r,e){const t=O(r);return t.persistence.runTransaction("Get next mutation batch","readonly",(n=>(e===void 0&&(e=fn),t.mutationQueue.getNextMutationBatchAfterBatchId(n,e))))}function Wr(r,e){const t=O(r);return t.persistence.runTransaction("Allocate target","readwrite",(n=>{let s;return t.Pi.getTargetData(n,e).next((i=>i?(s=i,R.resolve(s)):t.Pi.allocateTargetId(n).next((o=>(s=new Rt(e,o,"TargetPurposeListen",n.currentSequenceNumber),t.Pi.addTargetData(n,s).next((()=>s)))))))})).then((n=>{const s=t.Ms.get(n.targetId);return(s===null||n.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(t.Ms=t.Ms.insert(n.targetId,n),t.xs.set(e,n.targetId)),n}))}async function Qr(r,e,t){const n=O(r),s=n.Ms.get(e),i=t?"readwrite":"readwrite-primary";try{t||await n.persistence.runTransaction("Release target",i,(o=>n.persistence.referenceDelegate.removeTarget(o,s)))}catch(o){if(!Tn(o))throw o;N(Nl,`Failed to update sequence numbers for target ${e}: ${o}`)}n.Ms=n.Ms.remove(e),n.xs.delete(s.target)}function Go(r,e,t){const n=O(r);let s=G.min(),i=W();return n.persistence.runTransaction("Execute query","readwrite",(o=>(function(l,u,f){const g=O(l),p=g.xs.get(f);return p!==void 0?R.resolve(g.Ms.get(p)):g.Pi.getTargetData(u,f)})(n,o,Ge(e)).next((c=>{if(c)return s=c.lastLimboFreeSnapshotVersion,n.Pi.getMatchingKeysForTargetId(o,c.targetId).next((l=>{i=l}))})).next((()=>n.Fs.getDocumentsMatchingQuery(o,e,t?s:G.min(),t?i:W()))).next((c=>(Om(n,Fg(e),c),{documents:c,Qs:i})))))}function Nm(r,e){const t=O(r),n=O(t.Pi),s=t.Ms.get(e);return s?Promise.resolve(s.target):t.persistence.runTransaction("Get target data","readonly",(i=>n.At(i,e).next((o=>o?o.target:null))))}function Mm(r,e){const t=O(r),n=t.Os.get(e)||G.min();return t.persistence.runTransaction("Get new document changes","readonly",(s=>t.Ns.getAllFromCollectionGroup(s,e,eg(n,Mr),Number.MAX_SAFE_INTEGER))).then((s=>(Om(t,e,s),s)))}function Om(r,e,t){let n=r.Os.get(e)||G.min();t.forEach(((s,i)=>{i.readTime.compareTo(n)>0&&(n=i.readTime)})),r.Os.set(e,n)}async function nv(r,e,t,n){const s=O(r);let i=W(),o=Ye();for(const u of t){const f=e.$s(u.metadata.name);u.document&&(i=i.add(f));const g=e.Us(u);g.setReadTime(e.Ks(u.metadata.readTime)),o=o.insert(f,g)}const c=s.Ns.newChangeBuffer({trackRemovals:!0}),l=await Wr(s,(function(f){return Ge(rs(J.fromString(`__bundle__/docs/${f}`)))})(n));return s.persistence.runTransaction("Apply bundle documents","readwrite",(u=>Vm(u,c,o).next((f=>(c.apply(u),f))).next((f=>s.Pi.removeMatchingKeysForTargetId(u,l.targetId).next((()=>s.Pi.addMatchingKeys(u,i,l.targetId))).next((()=>s.localDocuments.getLocalViewOfDocuments(u,f.ks,f.qs))).next((()=>f.ks))))))}async function rv(r,e,t=W()){const n=await Wr(r,Ge(_a(e.bundledQuery))),s=O(r);return s.persistence.runTransaction("Save named query","readwrite",(i=>{const o=Te(e.readTime);if(n.snapshotVersion.compareTo(o)>=0)return s.Ii.saveNamedQuery(i,e);const c=n.withResumeToken(Ie.EMPTY_BYTE_STRING,o);return s.Ms=s.Ms.insert(c.targetId,c),s.Pi.updateTargetData(i,c).next((()=>s.Pi.removeMatchingKeysForTargetId(i,n.targetId))).next((()=>s.Pi.addMatchingKeys(i,t,n.targetId))).next((()=>s.Ii.saveNamedQuery(i,e)))}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Lm="firestore_clients";function Nd(r,e){return`${Lm}_${r}_${e}`}const Fm="firestore_mutations";function Md(r,e,t){let n=`${Fm}_${r}_${t}`;return e.isAuthenticated()&&(n+=`_${e.uid}`),n}const Um="firestore_targets";function gc(r,e){return`${Um}_${r}_${e}`}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gt="SharedClientState";class Ko{constructor(e,t,n,s){this.user=e,this.batchId=t,this.state=n,this.error=s}static Ws(e,t,n){const s=JSON.parse(n);let i,o=typeof s=="object"&&["pending","acknowledged","rejected"].indexOf(s.state)!==-1&&(s.error===void 0||typeof s.error=="object");return o&&s.error&&(o=typeof s.error.message=="string"&&typeof s.error.code=="string",o&&(i=new V(s.error.code,s.error.message))),o?new Ko(e,t,s.state,i):(ve(gt,`Failed to parse mutation state for ID '${t}': ${n}`),null)}Gs(){const e={state:this.state,updateTimeMs:Date.now()};return this.error&&(e.error={code:this.error.code,message:this.error.message}),JSON.stringify(e)}}class Js{constructor(e,t,n){this.targetId=e,this.state=t,this.error=n}static Ws(e,t){const n=JSON.parse(t);let s,i=typeof n=="object"&&["not-current","current","rejected"].indexOf(n.state)!==-1&&(n.error===void 0||typeof n.error=="object");return i&&n.error&&(i=typeof n.error.message=="string"&&typeof n.error.code=="string",i&&(s=new V(n.error.code,n.error.message))),i?new Js(e,n.state,s):(ve(gt,`Failed to parse target state for ID '${e}': ${t}`),null)}Gs(){const e={state:this.state,updateTimeMs:Date.now()};return this.error&&(e.error={code:this.error.code,message:this.error.message}),JSON.stringify(e)}}class Ho{constructor(e,t){this.clientId=e,this.activeTargetIds=t}static Ws(e,t){const n=JSON.parse(t);let s=typeof n=="object"&&n.activeTargetIds instanceof Array,i=wl();for(let o=0;s&&o<n.activeTargetIds.length;++o)s=ig(n.activeTargetIds[o]),i=i.add(n.activeTargetIds[o]);return s?new Ho(e,i):(ve(gt,`Failed to parse client data for instance '${e}': ${t}`),null)}}class Ml{constructor(e,t){this.clientId=e,this.onlineState=t}static Ws(e){const t=JSON.parse(e);return typeof t=="object"&&["Unknown","Online","Offline"].indexOf(t.onlineState)!==-1&&typeof t.clientId=="string"?new Ml(t.clientId,t.onlineState):(ve(gt,`Failed to parse online state: ${e}`),null)}}class Wc{constructor(){this.activeTargetIds=wl()}zs(e){this.activeTargetIds=this.activeTargetIds.add(e)}js(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Gs(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class mc{constructor(e,t,n,s,i){this.window=e,this.Mi=t,this.persistenceKey=n,this.Js=s,this.syncEngine=null,this.onlineStateHandler=null,this.sequenceNumberHandler=null,this.Hs=this.Ys.bind(this),this.Zs=new he(K),this.started=!1,this.Xs=[];const o=n.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");this.storage=this.window.localStorage,this.currentUser=i,this.eo=Nd(this.persistenceKey,this.Js),this.no=(function(l){return`firestore_sequence_number_${l}`})(this.persistenceKey),this.Zs=this.Zs.insert(this.Js,new Wc),this.ro=new RegExp(`^${Lm}_${o}_([^_]*)$`),this.io=new RegExp(`^${Fm}_${o}_(\\d+)(?:_(.*))?$`),this.so=new RegExp(`^${Um}_${o}_(\\d+)$`),this.oo=(function(l){return`firestore_online_state_${l}`})(this.persistenceKey),this._o=(function(l){return`firestore_bundle_loaded_v2_${l}`})(this.persistenceKey),this.window.addEventListener("storage",this.Hs)}static v(e){return!(!e||!e.localStorage)}async start(){const e=await this.syncEngine.Ts();for(const n of e){if(n===this.Js)continue;const s=this.getItem(Nd(this.persistenceKey,n));if(s){const i=Ho.Ws(n,s);i&&(this.Zs=this.Zs.insert(i.clientId,i))}}this.ao();const t=this.storage.getItem(this.oo);if(t){const n=this.uo(t);n&&this.co(n)}for(const n of this.Xs)this.Ys(n);this.Xs=[],this.window.addEventListener("pagehide",(()=>this.shutdown())),this.started=!0}writeSequenceNumber(e){this.setItem(this.no,JSON.stringify(e))}getAllActiveQueryTargets(){return this.lo(this.Zs)}isActiveQueryTarget(e){let t=!1;return this.Zs.forEach(((n,s)=>{s.activeTargetIds.has(e)&&(t=!0)})),t}addPendingMutation(e){this.ho(e,"pending")}updateMutationState(e,t,n){this.ho(e,t,n),this.Po(e)}addLocalQueryTarget(e,t=!0){let n="not-current";if(this.isActiveQueryTarget(e)){const s=this.storage.getItem(gc(this.persistenceKey,e));if(s){const i=Js.Ws(e,s);i&&(n=i.state)}}return t&&this.To.zs(e),this.ao(),n}removeLocalQueryTarget(e){this.To.js(e),this.ao()}isLocalQueryTarget(e){return this.To.activeTargetIds.has(e)}clearQueryState(e){this.removeItem(gc(this.persistenceKey,e))}updateQueryState(e,t,n){this.Io(e,t,n)}handleUserChange(e,t,n){t.forEach((s=>{this.Po(s)})),this.currentUser=e,n.forEach((s=>{this.addPendingMutation(s)}))}setOnlineState(e){this.Eo(e)}notifyBundleLoaded(e){this.Ao(e)}shutdown(){this.started&&(this.window.removeEventListener("storage",this.Hs),this.removeItem(this.eo),this.started=!1)}getItem(e){const t=this.storage.getItem(e);return N(gt,"READ",e,t),t}setItem(e,t){N(gt,"SET",e,t),this.storage.setItem(e,t)}removeItem(e){N(gt,"REMOVE",e),this.storage.removeItem(e)}Ys(e){const t=e;if(t.storageArea===this.storage){if(N(gt,"EVENT",t.key,t.newValue),t.key===this.eo)return void ve("Received WebStorage notification for local change. Another client might have garbage-collected our state");this.Mi.enqueueRetryable((async()=>{if(this.started){if(t.key!==null){if(this.ro.test(t.key)){if(t.newValue==null){const n=this.Ro(t.key);return this.Vo(n,null)}{const n=this.mo(t.key,t.newValue);if(n)return this.Vo(n.clientId,n)}}else if(this.io.test(t.key)){if(t.newValue!==null){const n=this.fo(t.key,t.newValue);if(n)return this.po(n)}}else if(this.so.test(t.key)){if(t.newValue!==null){const n=this.yo(t.key,t.newValue);if(n)return this.wo(n)}}else if(t.key===this.oo){if(t.newValue!==null){const n=this.uo(t.newValue);if(n)return this.co(n)}}else if(t.key===this.no){const n=(function(i){let o=Qe.ce;if(i!=null)try{const c=JSON.parse(i);z(typeof c=="number",30636,{So:i}),o=c}catch(c){ve(gt,"Failed to read sequence number from WebStorage",c)}return o})(t.newValue);n!==Qe.ce&&this.sequenceNumberHandler(n)}else if(t.key===this._o){const n=this.bo(t.newValue);await Promise.all(n.map((s=>this.syncEngine.Do(s))))}}}else this.Xs.push(t)}))}}get To(){return this.Zs.get(this.Js)}ao(){this.setItem(this.eo,this.To.Gs())}ho(e,t,n){const s=new Ko(this.currentUser,e,t,n),i=Md(this.persistenceKey,this.currentUser,e);this.setItem(i,s.Gs())}Po(e){const t=Md(this.persistenceKey,this.currentUser,e);this.removeItem(t)}Eo(e){const t={clientId:this.Js,onlineState:e};this.storage.setItem(this.oo,JSON.stringify(t))}Io(e,t,n){const s=gc(this.persistenceKey,e),i=new Js(e,t,n);this.setItem(s,i.Gs())}Ao(e){const t=JSON.stringify(Array.from(e));this.setItem(this._o,t)}Ro(e){const t=this.ro.exec(e);return t?t[1]:null}mo(e,t){const n=this.Ro(e);return Ho.Ws(n,t)}fo(e,t){const n=this.io.exec(e),s=Number(n[1]),i=n[2]!==void 0?n[2]:null;return Ko.Ws(new ke(i),s,t)}yo(e,t){const n=this.so.exec(e),s=Number(n[1]);return Js.Ws(s,t)}uo(e){return Ml.Ws(e)}bo(e){return JSON.parse(e)}async po(e){if(e.user.uid===this.currentUser.uid)return this.syncEngine.Co(e.batchId,e.state,e.error);N(gt,`Ignoring mutation for non-active user ${e.user.uid}`)}wo(e){return this.syncEngine.vo(e.targetId,e.state,e.error)}Vo(e,t){const n=t?this.Zs.insert(e,t):this.Zs.remove(e),s=this.lo(this.Zs),i=this.lo(n),o=[],c=[];return i.forEach((l=>{s.has(l)||o.push(l)})),s.forEach((l=>{i.has(l)||c.push(l)})),this.syncEngine.Fo(o,c).then((()=>{this.Zs=n}))}co(e){this.Zs.get(e.clientId)&&this.onlineStateHandler(e.onlineState)}lo(e){let t=wl();return e.forEach(((n,s)=>{t=t.unionWith(s.activeTargetIds)})),t}}class Bm{constructor(){this.Mo=new Wc,this.xo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,n){}addLocalQueryTarget(e,t=!0){return t&&this.Mo.zs(e),this.xo[e]||"not-current"}updateQueryState(e,t,n){this.xo[e]=t}removeLocalQueryTarget(e){this.Mo.js(e)}isLocalQueryTarget(e){return this.Mo.activeTargetIds.has(e)}clearQueryState(e){delete this.xo[e]}getAllActiveQueryTargets(){return this.Mo.activeTargetIds}isActiveQueryTarget(e){return this.Mo.activeTargetIds.has(e)}start(){return this.Mo=new Wc,Promise.resolve()}handleUserChange(e,t,n){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sv{Oo(e){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Od="ConnectivityMonitor";class Ld{constructor(){this.No=()=>this.Bo(),this.Lo=()=>this.ko(),this.qo=[],this.Qo()}Oo(e){this.qo.push(e)}shutdown(){window.removeEventListener("online",this.No),window.removeEventListener("offline",this.Lo)}Qo(){window.addEventListener("online",this.No),window.addEventListener("offline",this.Lo)}Bo(){N(Od,"Network connectivity changed: AVAILABLE");for(const e of this.qo)e(0)}ko(){N(Od,"Network connectivity changed: UNAVAILABLE");for(const e of this.qo)e(1)}static v(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let fo=null;function Qc(){return fo===null?fo=(function(){return 268435456+Math.round(2147483648*Math.random())})():fo++,"0x"+fo.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pc="RestConnection",iv={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};class ov{get $o(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const t=e.ssl?"https":"http",n=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.Uo=t+"://"+e.host,this.Ko=`projects/${n}/databases/${s}`,this.Wo=this.databaseId.database===ii?`project_id=${n}`:`project_id=${n}&database_id=${s}`}Go(e,t,n,s,i){const o=Qc(),c=this.zo(e,t.toUriEncodedString());N(pc,`Sending RPC '${e}' ${o}:`,c,n);const l={"google-cloud-resource-prefix":this.Ko,"x-goog-request-params":this.Wo};this.jo(l,s,i);const{host:u}=new URL(c),f=ir(u);return this.Jo(e,c,l,n,f).then((g=>(N(pc,`Received RPC '${e}' ${o}: `,g),g)),(g=>{throw nt(pc,`RPC '${e}' ${o} failed with error: `,g,"url: ",c,"request:",n),g}))}Ho(e,t,n,s,i,o){return this.Go(e,t,n,s,i)}jo(e,t,n){e["X-Goog-Api-Client"]=(function(){return"gl-js/ fire/"+ns})(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach(((s,i)=>e[i]=s)),n&&n.headers.forEach(((s,i)=>e[i]=s))}zo(e,t){const n=iv[e];return`${this.Uo}/v1/${t}:${n}`}terminate(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class av{constructor(e){this.Yo=e.Yo,this.Zo=e.Zo}Xo(e){this.e_=e}t_(e){this.n_=e}r_(e){this.i_=e}onMessage(e){this.s_=e}close(){this.Zo()}send(e){this.Yo(e)}o_(){this.e_()}__(){this.n_()}a_(e){this.i_(e)}u_(e){this.s_(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $e="WebChannelConnection";class cv extends ov{constructor(e){super(e),this.c_=[],this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}Jo(e,t,n,s,i){const o=Qc();return new Promise(((c,l)=>{const u=new $f;u.setWithCredentials(!0),u.listenOnce(qf.COMPLETE,(()=>{try{switch(u.getLastErrorCode()){case yo.NO_ERROR:const g=u.getResponseJson();N($e,`XHR for RPC '${e}' ${o} received:`,JSON.stringify(g)),c(g);break;case yo.TIMEOUT:N($e,`RPC '${e}' ${o} timed out`),l(new V(x.DEADLINE_EXCEEDED,"Request time out"));break;case yo.HTTP_ERROR:const p=u.getStatus();if(N($e,`RPC '${e}' ${o} failed with status:`,p,"response text:",u.getResponseText()),p>0){let E=u.getResponseJson();Array.isArray(E)&&(E=E[0]);const A=E?.error;if(A&&A.status&&A.message){const D=(function(B){const j=B.toLowerCase().replace(/_/g,"-");return Object.values(x).indexOf(j)>=0?j:x.UNKNOWN})(A.status);l(new V(D,A.message))}else l(new V(x.UNKNOWN,"Server responded with status "+u.getStatus()))}else l(new V(x.UNAVAILABLE,"Connection failed."));break;default:q(9055,{l_:e,streamId:o,h_:u.getLastErrorCode(),P_:u.getLastError()})}}finally{N($e,`RPC '${e}' ${o} completed.`)}}));const f=JSON.stringify(s);N($e,`RPC '${e}' ${o} sending request:`,s),u.send(t,"POST",f,n,15)}))}T_(e,t,n){const s=Qc(),i=[this.Uo,"/","google.firestore.v1.Firestore","/",e,"/channel"],o=Gf(),c=zf(),l={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},u=this.longPollingOptions.timeoutSeconds;u!==void 0&&(l.longPollingTimeout=Math.round(1e3*u)),this.useFetchStreams&&(l.useFetchStreams=!0),this.jo(l.initMessageHeaders,t,n),l.encodeInitMessageHeaders=!0;const f=i.join("");N($e,`Creating RPC '${e}' stream ${s}: ${f}`,l);const g=o.createWebChannel(f,l);this.I_(g);let p=!1,E=!1;const A=new av({Yo:k=>{E?N($e,`Not sending because RPC '${e}' stream ${s} is closed:`,k):(p||(N($e,`Opening RPC '${e}' stream ${s} transport.`),g.open(),p=!0),N($e,`RPC '${e}' stream ${s} sending:`,k),g.send(k))},Zo:()=>g.close()}),D=(k,B,j)=>{k.listen(B,(F=>{try{j(F)}catch(Q){setTimeout((()=>{throw Q}),0)}}))};return D(g,Fs.EventType.OPEN,(()=>{E||(N($e,`RPC '${e}' stream ${s} transport opened.`),A.o_())})),D(g,Fs.EventType.CLOSE,(()=>{E||(E=!0,N($e,`RPC '${e}' stream ${s} transport closed`),A.a_(),this.E_(g))})),D(g,Fs.EventType.ERROR,(k=>{E||(E=!0,nt($e,`RPC '${e}' stream ${s} transport errored. Name:`,k.name,"Message:",k.message),A.a_(new V(x.UNAVAILABLE,"The operation could not be completed")))})),D(g,Fs.EventType.MESSAGE,(k=>{if(!E){const B=k.data[0];z(!!B,16349);const j=B,F=j?.error||j[0]?.error;if(F){N($e,`RPC '${e}' stream ${s} received error:`,F);const Q=F.status;let te=(function(_){const y=Ae[_];if(y!==void 0)return Zg(y)})(Q),U=F.message;te===void 0&&(te=x.INTERNAL,U="Unknown error status: "+Q+" with message "+F.message),E=!0,A.a_(new V(te,U)),g.close()}else N($e,`RPC '${e}' stream ${s} received:`,B),A.u_(B)}})),D(c,jf.STAT_EVENT,(k=>{k.stat===Ac.PROXY?N($e,`RPC '${e}' stream ${s} detected buffering proxy`):k.stat===Ac.NOPROXY&&N($e,`RPC '${e}' stream ${s} detected no buffering proxy`)})),setTimeout((()=>{A.__()}),0),A}terminate(){this.c_.forEach((e=>e.close())),this.c_=[]}I_(e){this.c_.push(e)}E_(e){this.c_=this.c_.filter((t=>t===e))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $m(){return typeof window<"u"?window:null}function Ro(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ar(r){return new gb(r,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ol{constructor(e,t,n=1e3,s=1.5,i=6e4){this.Mi=e,this.timerId=t,this.d_=n,this.A_=s,this.R_=i,this.V_=0,this.m_=null,this.f_=Date.now(),this.reset()}reset(){this.V_=0}g_(){this.V_=this.R_}p_(e){this.cancel();const t=Math.floor(this.V_+this.y_()),n=Math.max(0,Date.now()-this.f_),s=Math.max(0,t-n);s>0&&N("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.V_} ms, delay with jitter: ${t} ms, last attempt: ${n} ms ago)`),this.m_=this.Mi.enqueueAfterDelay(this.timerId,s,(()=>(this.f_=Date.now(),e()))),this.V_*=this.A_,this.V_<this.d_&&(this.V_=this.d_),this.V_>this.R_&&(this.V_=this.R_)}w_(){this.m_!==null&&(this.m_.skipDelay(),this.m_=null)}cancel(){this.m_!==null&&(this.m_.cancel(),this.m_=null)}y_(){return(Math.random()-.5)*this.V_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fd="PersistentStream";class qm{constructor(e,t,n,s,i,o,c,l){this.Mi=e,this.S_=n,this.b_=s,this.connection=i,this.authCredentialsProvider=o,this.appCheckCredentialsProvider=c,this.listener=l,this.state=0,this.D_=0,this.C_=null,this.v_=null,this.stream=null,this.F_=0,this.M_=new Ol(e,t)}x_(){return this.state===1||this.state===5||this.O_()}O_(){return this.state===2||this.state===3}start(){this.F_=0,this.state!==4?this.auth():this.N_()}async stop(){this.x_()&&await this.close(0)}B_(){this.state=0,this.M_.reset()}L_(){this.O_()&&this.C_===null&&(this.C_=this.Mi.enqueueAfterDelay(this.S_,6e4,(()=>this.k_())))}q_(e){this.Q_(),this.stream.send(e)}async k_(){if(this.O_())return this.close(0)}Q_(){this.C_&&(this.C_.cancel(),this.C_=null)}U_(){this.v_&&(this.v_.cancel(),this.v_=null)}async close(e,t){this.Q_(),this.U_(),this.M_.cancel(),this.D_++,e!==4?this.M_.reset():t&&t.code===x.RESOURCE_EXHAUSTED?(ve(t.toString()),ve("Using maximum backoff delay to prevent overloading the backend."),this.M_.g_()):t&&t.code===x.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.K_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.r_(t)}K_(){}auth(){this.state=1;const e=this.W_(this.D_),t=this.D_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then((([n,s])=>{this.D_===t&&this.G_(n,s)}),(n=>{e((()=>{const s=new V(x.UNKNOWN,"Fetching auth token failed: "+n.message);return this.z_(s)}))}))}G_(e,t){const n=this.W_(this.D_);this.stream=this.j_(e,t),this.stream.Xo((()=>{n((()=>this.listener.Xo()))})),this.stream.t_((()=>{n((()=>(this.state=2,this.v_=this.Mi.enqueueAfterDelay(this.b_,1e4,(()=>(this.O_()&&(this.state=3),Promise.resolve()))),this.listener.t_())))})),this.stream.r_((s=>{n((()=>this.z_(s)))})),this.stream.onMessage((s=>{n((()=>++this.F_==1?this.J_(s):this.onNext(s)))}))}N_(){this.state=5,this.M_.p_((async()=>{this.state=0,this.start()}))}z_(e){return N(Fd,`close with error: ${e}`),this.stream=null,this.close(4,e)}W_(e){return t=>{this.Mi.enqueueAndForget((()=>this.D_===e?t():(N(Fd,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve())))}}}class lv extends qm{constructor(e,t,n,s,i,o){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,n,s,o),this.serializer=i}j_(e,t){return this.connection.T_("Listen",e,t)}J_(e){return this.onNext(e)}onNext(e){this.M_.reset();const t=_b(this.serializer,e),n=(function(i){if(!("targetChange"in i))return G.min();const o=i.targetChange;return o.targetIds&&o.targetIds.length?G.min():o.readTime?Te(o.readTime):G.min()})(e);return this.listener.H_(t,n)}Y_(e){const t={};t.database=jc(this.serializer),t.addTarget=(function(i,o){let c;const l=o.target;if(c=Fo(l)?{documents:cm(i,l)}:{query:pa(i,l).ft},c.targetId=o.targetId,o.resumeToken.approximateByteSize()>0){c.resumeToken=rm(i,o.resumeToken);const u=$c(i,o.expectedCount);u!==null&&(c.expectedCount=u)}else if(o.snapshotVersion.compareTo(G.min())>0){c.readTime=Hr(i,o.snapshotVersion.toTimestamp());const u=$c(i,o.expectedCount);u!==null&&(c.expectedCount=u)}return c})(this.serializer,e);const n=wb(this.serializer,e);n&&(t.labels=n),this.q_(t)}Z_(e){const t={};t.database=jc(this.serializer),t.removeTarget=e,this.q_(t)}}class uv extends qm{constructor(e,t,n,s,i,o){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,n,s,o),this.serializer=i}get X_(){return this.F_>0}start(){this.lastStreamToken=void 0,super.start()}K_(){this.X_&&this.ea([])}j_(e,t){return this.connection.T_("Write",e,t)}J_(e){return z(!!e.streamToken,31322),this.lastStreamToken=e.streamToken,z(!e.writeResults||e.writeResults.length===0,55816),this.listener.ta()}onNext(e){z(!!e.streamToken,12678),this.lastStreamToken=e.streamToken,this.M_.reset();const t=yb(e.writeResults,e.commitTime),n=Te(e.commitTime);return this.listener.na(n,t)}ra(){const e={};e.database=jc(this.serializer),this.q_(e)}ea(e){const t={streamToken:this.lastStreamToken,writes:e.map((n=>ui(this.serializer,n)))};this.q_(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hv{}class dv extends hv{constructor(e,t,n,s){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=n,this.serializer=s,this.ia=!1}sa(){if(this.ia)throw new V(x.FAILED_PRECONDITION,"The client has already been terminated.")}Go(e,t,n,s){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([i,o])=>this.connection.Go(e,qc(t,n),s,i,o))).catch((i=>{throw i.name==="FirebaseError"?(i.code===x.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new V(x.UNKNOWN,i.toString())}))}Ho(e,t,n,s,i){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([o,c])=>this.connection.Ho(e,qc(t,n),s,o,c,i))).catch((o=>{throw o.name==="FirebaseError"?(o.code===x.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new V(x.UNKNOWN,o.toString())}))}terminate(){this.ia=!0,this.connection.terminate()}}class fv{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.oa=0,this._a=null,this.aa=!0}ua(){this.oa===0&&(this.ca("Unknown"),this._a=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,(()=>(this._a=null,this.la("Backend didn't respond within 10 seconds."),this.ca("Offline"),Promise.resolve()))))}ha(e){this.state==="Online"?this.ca("Unknown"):(this.oa++,this.oa>=1&&(this.Pa(),this.la(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.ca("Offline")))}set(e){this.Pa(),this.oa=0,e==="Online"&&(this.aa=!1),this.ca(e)}ca(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}la(e){const t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.aa?(ve(t),this.aa=!1):N("OnlineStateTracker",t)}Pa(){this._a!==null&&(this._a.cancel(),this._a=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nr="RemoteStore";class gv{constructor(e,t,n,s,i){this.localStore=e,this.datastore=t,this.asyncQueue=n,this.remoteSyncer={},this.Ta=[],this.Ia=new Map,this.Ea=new Set,this.da=[],this.Aa=i,this.Aa.Oo((o=>{n.enqueueAndForget((async()=>{An(this)&&(N(nr,"Restarting streams for network reachability change."),await(async function(l){const u=O(l);u.Ea.add(4),await os(u),u.Ra.set("Unknown"),u.Ea.delete(4),await xi(u)})(this))}))})),this.Ra=new fv(n,s)}}async function xi(r){if(An(r))for(const e of r.da)await e(!0)}async function os(r){for(const e of r.da)await e(!1)}function ba(r,e){const t=O(r);t.Ia.has(e.targetId)||(t.Ia.set(e.targetId,e),Ul(t)?Fl(t):cs(t).O_()&&Ll(t,e))}function Jr(r,e){const t=O(r),n=cs(t);t.Ia.delete(e),n.O_()&&jm(t,e),t.Ia.size===0&&(n.O_()?n.L_():An(t)&&t.Ra.set("Unknown"))}function Ll(r,e){if(r.Va.Ue(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(G.min())>0){const t=r.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(t)}cs(r).Y_(e)}function jm(r,e){r.Va.Ue(e),cs(r).Z_(e)}function Fl(r){r.Va=new ub({getRemoteKeysForTarget:e=>r.remoteSyncer.getRemoteKeysForTarget(e),At:e=>r.Ia.get(e)||null,ht:()=>r.datastore.serializer.databaseId}),cs(r).start(),r.Ra.ua()}function Ul(r){return An(r)&&!cs(r).x_()&&r.Ia.size>0}function An(r){return O(r).Ea.size===0}function zm(r){r.Va=void 0}async function mv(r){r.Ra.set("Online")}async function pv(r){r.Ia.forEach(((e,t)=>{Ll(r,e)}))}async function _v(r,e){zm(r),Ul(r)?(r.Ra.ha(e),Fl(r)):r.Ra.set("Unknown")}async function yv(r,e,t){if(r.Ra.set("Online"),e instanceof nm&&e.state===2&&e.cause)try{await(async function(s,i){const o=i.cause;for(const c of i.targetIds)s.Ia.has(c)&&(await s.remoteSyncer.rejectListen(c,o),s.Ia.delete(c),s.Va.removeTarget(c))})(r,e)}catch(n){N(nr,"Failed to remove targets %s: %s ",e.targetIds.join(","),n),await Wo(r,n)}else if(e instanceof Ao?r.Va.Ze(e):e instanceof tm?r.Va.st(e):r.Va.tt(e),!t.isEqual(G.min()))try{const n=await km(r.localStore);t.compareTo(n)>=0&&await(function(i,o){const c=i.Va.Tt(o);return c.targetChanges.forEach(((l,u)=>{if(l.resumeToken.approximateByteSize()>0){const f=i.Ia.get(u);f&&i.Ia.set(u,f.withResumeToken(l.resumeToken,o))}})),c.targetMismatches.forEach(((l,u)=>{const f=i.Ia.get(l);if(!f)return;i.Ia.set(l,f.withResumeToken(Ie.EMPTY_BYTE_STRING,f.snapshotVersion)),jm(i,l);const g=new Rt(f.target,l,u,f.sequenceNumber);Ll(i,g)})),i.remoteSyncer.applyRemoteEvent(c)})(r,t)}catch(n){N(nr,"Failed to raise snapshot:",n),await Wo(r,n)}}async function Wo(r,e,t){if(!Tn(e))throw e;r.Ea.add(1),await os(r),r.Ra.set("Offline"),t||(t=()=>km(r.localStore)),r.asyncQueue.enqueueRetryable((async()=>{N(nr,"Retrying IndexedDB access"),await t(),r.Ea.delete(1),await xi(r)}))}function Gm(r,e){return e().catch((t=>Wo(r,t,e)))}async function as(r){const e=O(r),t=wn(e);let n=e.Ta.length>0?e.Ta[e.Ta.length-1].batchId:fn;for(;wv(e);)try{const s=await tv(e.localStore,n);if(s===null){e.Ta.length===0&&t.L_();break}n=s.batchId,Iv(e,s)}catch(s){await Wo(e,s)}Km(e)&&Hm(e)}function wv(r){return An(r)&&r.Ta.length<10}function Iv(r,e){r.Ta.push(e);const t=wn(r);t.O_()&&t.X_&&t.ea(e.mutations)}function Km(r){return An(r)&&!wn(r).x_()&&r.Ta.length>0}function Hm(r){wn(r).start()}async function bv(r){wn(r).ra()}async function vv(r){const e=wn(r);for(const t of r.Ta)e.ea(t.mutations)}async function Tv(r,e,t){const n=r.Ta.shift(),s=Tl.from(n,e,t);await Gm(r,(()=>r.remoteSyncer.applySuccessfulWrite(s))),await as(r)}async function Ev(r,e){e&&wn(r).X_&&await(async function(n,s){if((function(o){return Xg(o)&&o!==x.ABORTED})(s.code)){const i=n.Ta.shift();wn(n).B_(),await Gm(n,(()=>n.remoteSyncer.rejectFailedWrite(i.batchId,s))),await as(n)}})(r,e),Km(r)&&Hm(r)}async function Ud(r,e){const t=O(r);t.asyncQueue.verifyOperationInProgress(),N(nr,"RemoteStore received new credentials");const n=An(t);t.Ea.add(3),await os(t),n&&t.Ra.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.Ea.delete(3),await xi(t)}async function Jc(r,e){const t=O(r);e?(t.Ea.delete(2),await xi(t)):e||(t.Ea.add(2),await os(t),t.Ra.set("Unknown"))}function cs(r){return r.ma||(r.ma=(function(t,n,s){const i=O(t);return i.sa(),new lv(n,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)})(r.datastore,r.asyncQueue,{Xo:mv.bind(null,r),t_:pv.bind(null,r),r_:_v.bind(null,r),H_:yv.bind(null,r)}),r.da.push((async e=>{e?(r.ma.B_(),Ul(r)?Fl(r):r.Ra.set("Unknown")):(await r.ma.stop(),zm(r))}))),r.ma}function wn(r){return r.fa||(r.fa=(function(t,n,s){const i=O(t);return i.sa(),new uv(n,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)})(r.datastore,r.asyncQueue,{Xo:()=>Promise.resolve(),t_:bv.bind(null,r),r_:Ev.bind(null,r),ta:vv.bind(null,r),na:Tv.bind(null,r)}),r.da.push((async e=>{e?(r.fa.B_(),await as(r)):(await r.fa.stop(),r.Ta.length>0&&(N(nr,`Stopping write stream with ${r.Ta.length} pending writes`),r.Ta=[]))}))),r.fa}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bl{constructor(e,t,n,s,i){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=n,this.op=s,this.removalCallback=i,this.deferred=new Ve,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch((o=>{}))}get promise(){return this.deferred.promise}static createAndSchedule(e,t,n,s,i){const o=Date.now()+n,c=new Bl(e,t,o,s,i);return c.start(n),c}start(e){this.timerHandle=setTimeout((()=>this.handleDelayElapsed()),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new V(x.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget((()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then((e=>this.deferred.resolve(e)))):Promise.resolve()))}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function ls(r,e){if(ve("AsyncQueue",`${e}: ${r}`),Tn(r))return new V(x.UNAVAILABLE,`${e}: ${r}`);throw r}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kn{static emptySet(e){return new Kn(e.comparator)}constructor(e){this.comparator=e?(t,n)=>e(t,n)||M.comparator(t.key,n.key):(t,n)=>M.comparator(t.key,n.key),this.keyedMap=Us(),this.sortedSet=new he(this.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal(((t,n)=>(e(t),!1)))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof Kn)||this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),n=e.sortedSet.getIterator();for(;t.hasNext();){const s=t.getNext().key,i=n.getNext().key;if(!s.isEqual(i))return!1}return!0}toString(){const e=[];return this.forEach((t=>{e.push(t.toString())})),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){const n=new Kn;return n.comparator=this.comparator,n.keyedMap=e,n.sortedSet=t,n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bd{constructor(){this.ga=new he(M.comparator)}track(e){const t=e.doc.key,n=this.ga.get(t);n?e.type!==0&&n.type===3?this.ga=this.ga.insert(t,e):e.type===3&&n.type!==1?this.ga=this.ga.insert(t,{type:n.type,doc:e.doc}):e.type===2&&n.type===2?this.ga=this.ga.insert(t,{type:2,doc:e.doc}):e.type===2&&n.type===0?this.ga=this.ga.insert(t,{type:0,doc:e.doc}):e.type===1&&n.type===0?this.ga=this.ga.remove(t):e.type===1&&n.type===2?this.ga=this.ga.insert(t,{type:1,doc:n.doc}):e.type===0&&n.type===1?this.ga=this.ga.insert(t,{type:2,doc:e.doc}):q(63341,{Rt:e,pa:n}):this.ga=this.ga.insert(t,e)}ya(){const e=[];return this.ga.inorderTraversal(((t,n)=>{e.push(n)})),e}}class rr{constructor(e,t,n,s,i,o,c,l,u){this.query=e,this.docs=t,this.oldDocs=n,this.docChanges=s,this.mutatedKeys=i,this.fromCache=o,this.syncStateChanged=c,this.excludesMetadataChanges=l,this.hasCachedResults=u}static fromInitialDocuments(e,t,n,s,i){const o=[];return t.forEach((c=>{o.push({type:0,doc:c})})),new rr(e,t,Kn.emptySet(t),o,n,s,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&Ei(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,n=e.docChanges;if(t.length!==n.length)return!1;for(let s=0;s<t.length;s++)if(t[s].type!==n[s].type||!t[s].doc.isEqual(n[s].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Av{constructor(){this.wa=void 0,this.Sa=[]}ba(){return this.Sa.some((e=>e.Da()))}}class Sv{constructor(){this.queries=$d(),this.onlineState="Unknown",this.Ca=new Set}terminate(){(function(t,n){const s=O(t),i=s.queries;s.queries=$d(),i.forEach(((o,c)=>{for(const l of c.Sa)l.onError(n)}))})(this,new V(x.ABORTED,"Firestore shutting down"))}}function $d(){return new $t((r=>Lg(r)),Ei)}async function $l(r,e){const t=O(r);let n=3;const s=e.query;let i=t.queries.get(s);i?!i.ba()&&e.Da()&&(n=2):(i=new Av,n=e.Da()?0:1);try{switch(n){case 0:i.wa=await t.onListen(s,!0);break;case 1:i.wa=await t.onListen(s,!1);break;case 2:await t.onFirstRemoteStoreListen(s)}}catch(o){const c=ls(o,`Initialization of query '${Tr(e.query)}' failed`);return void e.onError(c)}t.queries.set(s,i),i.Sa.push(e),e.va(t.onlineState),i.wa&&e.Fa(i.wa)&&jl(t)}async function ql(r,e){const t=O(r),n=e.query;let s=3;const i=t.queries.get(n);if(i){const o=i.Sa.indexOf(e);o>=0&&(i.Sa.splice(o,1),i.Sa.length===0?s=e.Da()?0:1:!i.ba()&&e.Da()&&(s=2))}switch(s){case 0:return t.queries.delete(n),t.onUnlisten(n,!0);case 1:return t.queries.delete(n),t.onUnlisten(n,!1);case 2:return t.onLastRemoteStoreUnlisten(n);default:return}}function Rv(r,e){const t=O(r);let n=!1;for(const s of e){const i=s.query,o=t.queries.get(i);if(o){for(const c of o.Sa)c.Fa(s)&&(n=!0);o.wa=s}}n&&jl(t)}function Pv(r,e,t){const n=O(r),s=n.queries.get(e);if(s)for(const i of s.Sa)i.onError(t);n.queries.delete(e)}function jl(r){r.Ca.forEach((e=>{e.next()}))}var Yc,qd;(qd=Yc||(Yc={})).Ma="default",qd.Cache="cache";class zl{constructor(e,t,n){this.query=e,this.xa=t,this.Oa=!1,this.Na=null,this.onlineState="Unknown",this.options=n||{}}Fa(e){if(!this.options.includeMetadataChanges){const n=[];for(const s of e.docChanges)s.type!==3&&n.push(s);e=new rr(e.query,e.docs,e.oldDocs,n,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.Oa?this.Ba(e)&&(this.xa.next(e),t=!0):this.La(e,this.onlineState)&&(this.ka(e),t=!0),this.Na=e,t}onError(e){this.xa.error(e)}va(e){this.onlineState=e;let t=!1;return this.Na&&!this.Oa&&this.La(this.Na,e)&&(this.ka(this.Na),t=!0),t}La(e,t){if(!e.fromCache||!this.Da())return!0;const n=t!=="Offline";return(!this.options.qa||!n)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}Ba(e){if(e.docChanges.length>0)return!0;const t=this.Na&&this.Na.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}ka(e){e=rr.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.Oa=!0,this.xa.next(e)}Da(){return this.options.source!==Yc.Cache}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wm{constructor(e,t){this.Qa=e,this.byteLength=t}$a(){return"metadata"in this.Qa}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jd{constructor(e){this.serializer=e}$s(e){return It(this.serializer,e)}Us(e){return e.metadata.exists?ma(this.serializer,e.document,!1):fe.newNoDocument(this.$s(e.metadata.name),this.Ks(e.metadata.readTime))}Ks(e){return Te(e)}}class Gl{constructor(e,t){this.Ua=e,this.serializer=t,this.Ka=[],this.Wa=[],this.collectionGroups=new Set,this.progress=Qm(e)}get queries(){return this.Ka}get documents(){return this.Wa}Ga(e){this.progress.bytesLoaded+=e.byteLength;let t=this.progress.documentsLoaded;if(e.Qa.namedQuery)this.Ka.push(e.Qa.namedQuery);else if(e.Qa.documentMetadata){this.Wa.push({metadata:e.Qa.documentMetadata}),e.Qa.documentMetadata.exists||++t;const n=J.fromString(e.Qa.documentMetadata.name);this.collectionGroups.add(n.get(n.length-2))}else e.Qa.document&&(this.Wa[this.Wa.length-1].document=e.Qa.document,++t);return t!==this.progress.documentsLoaded?(this.progress.documentsLoaded=t,{...this.progress}):null}za(e){const t=new Map,n=new jd(this.serializer);for(const s of e)if(s.metadata.queries){const i=n.$s(s.metadata.name);for(const o of s.metadata.queries){const c=(t.get(o)||W()).add(i);t.set(o,c)}}return t}async ja(e){const t=await nv(e,new jd(this.serializer),this.Wa,this.Ua.id),n=this.za(this.documents);for(const s of this.Ka)await rv(e,s,n.get(s.name));return this.progress.taskState="Success",{progress:this.progress,Ja:this.collectionGroups,Ha:t}}}function Qm(r){return{taskState:"Running",documentsLoaded:0,bytesLoaded:0,totalDocuments:r.totalDocuments,totalBytes:r.totalBytes}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jm{constructor(e){this.key=e}}class Ym{constructor(e){this.key=e}}class Xm{constructor(e,t){this.query=e,this.Ya=t,this.Za=null,this.hasCachedResults=!1,this.current=!1,this.Xa=W(),this.mutatedKeys=W(),this.eu=Ug(e),this.tu=new Kn(this.eu)}get nu(){return this.Ya}ru(e,t){const n=t?t.iu:new Bd,s=t?t.tu:this.tu;let i=t?t.mutatedKeys:this.mutatedKeys,o=s,c=!1;const l=this.query.limitType==="F"&&s.size===this.query.limit?s.last():null,u=this.query.limitType==="L"&&s.size===this.query.limit?s.first():null;if(e.inorderTraversal(((f,g)=>{const p=s.get(f),E=Ai(this.query,g)?g:null,A=!!p&&this.mutatedKeys.has(p.key),D=!!E&&(E.hasLocalMutations||this.mutatedKeys.has(E.key)&&E.hasCommittedMutations);let k=!1;p&&E?p.data.isEqual(E.data)?A!==D&&(n.track({type:3,doc:E}),k=!0):this.su(p,E)||(n.track({type:2,doc:E}),k=!0,(l&&this.eu(E,l)>0||u&&this.eu(E,u)<0)&&(c=!0)):!p&&E?(n.track({type:0,doc:E}),k=!0):p&&!E&&(n.track({type:1,doc:p}),k=!0,(l||u)&&(c=!0)),k&&(E?(o=o.add(E),i=D?i.add(f):i.delete(f)):(o=o.delete(f),i=i.delete(f)))})),this.query.limit!==null)for(;o.size>this.query.limit;){const f=this.query.limitType==="F"?o.last():o.first();o=o.delete(f.key),i=i.delete(f.key),n.track({type:1,doc:f})}return{tu:o,iu:n,Cs:c,mutatedKeys:i}}su(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,n,s){const i=this.tu;this.tu=e.tu,this.mutatedKeys=e.mutatedKeys;const o=e.iu.ya();o.sort(((f,g)=>(function(E,A){const D=k=>{switch(k){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return q(20277,{Rt:k})}};return D(E)-D(A)})(f.type,g.type)||this.eu(f.doc,g.doc))),this.ou(n),s=s??!1;const c=t&&!s?this._u():[],l=this.Xa.size===0&&this.current&&!s?1:0,u=l!==this.Za;return this.Za=l,o.length!==0||u?{snapshot:new rr(this.query,e.tu,i,o,e.mutatedKeys,l===0,u,!1,!!n&&n.resumeToken.approximateByteSize()>0),au:c}:{au:c}}va(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({tu:this.tu,iu:new Bd,mutatedKeys:this.mutatedKeys,Cs:!1},!1)):{au:[]}}uu(e){return!this.Ya.has(e)&&!!this.tu.has(e)&&!this.tu.get(e).hasLocalMutations}ou(e){e&&(e.addedDocuments.forEach((t=>this.Ya=this.Ya.add(t))),e.modifiedDocuments.forEach((t=>{})),e.removedDocuments.forEach((t=>this.Ya=this.Ya.delete(t))),this.current=e.current)}_u(){if(!this.current)return[];const e=this.Xa;this.Xa=W(),this.tu.forEach((n=>{this.uu(n.key)&&(this.Xa=this.Xa.add(n.key))}));const t=[];return e.forEach((n=>{this.Xa.has(n)||t.push(new Ym(n))})),this.Xa.forEach((n=>{e.has(n)||t.push(new Jm(n))})),t}cu(e){this.Ya=e.Qs,this.Xa=W();const t=this.ru(e.documents);return this.applyChanges(t,!0)}lu(){return rr.fromInitialDocuments(this.query,this.tu,this.mutatedKeys,this.Za===0,this.hasCachedResults)}}const Sn="SyncEngine";class xv{constructor(e,t,n){this.query=e,this.targetId=t,this.view=n}}class Cv{constructor(e){this.key=e,this.hu=!1}}class Dv{constructor(e,t,n,s,i,o){this.localStore=e,this.remoteStore=t,this.eventManager=n,this.sharedClientState=s,this.currentUser=i,this.maxConcurrentLimboResolutions=o,this.Pu={},this.Tu=new $t((c=>Lg(c)),Ei),this.Iu=new Map,this.Eu=new Set,this.du=new he(M.comparator),this.Au=new Map,this.Ru=new xl,this.Vu={},this.mu=new Map,this.fu=tr.cr(),this.onlineState="Unknown",this.gu=void 0}get isPrimaryClient(){return this.gu===!0}}async function kv(r,e,t=!0){const n=va(r);let s;const i=n.Tu.get(e);return i?(n.sharedClientState.addLocalQueryTarget(i.targetId),s=i.view.lu()):s=await Zm(n,e,t,!0),s}async function Vv(r,e){const t=va(r);await Zm(t,e,!0,!1)}async function Zm(r,e,t,n){const s=await Wr(r.localStore,Ge(e)),i=s.targetId,o=r.sharedClientState.addLocalQueryTarget(i,t);let c;return n&&(c=await Kl(r,e,i,o==="current",s.resumeToken)),r.isPrimaryClient&&t&&ba(r.remoteStore,s),c}async function Kl(r,e,t,n,s){r.pu=(g,p,E)=>(async function(D,k,B,j){let F=k.view.ru(B);F.Cs&&(F=await Go(D.localStore,k.query,!1).then((({documents:w})=>k.view.ru(w,F))));const Q=j&&j.targetChanges.get(k.targetId),te=j&&j.targetMismatches.get(k.targetId)!=null,U=k.view.applyChanges(F,D.isPrimaryClient,Q,te);return Xc(D,k.targetId,U.au),U.snapshot})(r,g,p,E);const i=await Go(r.localStore,e,!0),o=new Xm(e,i.Qs),c=o.ru(i.documents),l=Pi.createSynthesizedTargetChangeForCurrentChange(t,n&&r.onlineState!=="Offline",s),u=o.applyChanges(c,r.isPrimaryClient,l);Xc(r,t,u.au);const f=new xv(e,t,o);return r.Tu.set(e,f),r.Iu.has(t)?r.Iu.get(t).push(e):r.Iu.set(t,[e]),u.snapshot}async function Nv(r,e,t){const n=O(r),s=n.Tu.get(e),i=n.Iu.get(s.targetId);if(i.length>1)return n.Iu.set(s.targetId,i.filter((o=>!Ei(o,e)))),void n.Tu.delete(e);n.isPrimaryClient?(n.sharedClientState.removeLocalQueryTarget(s.targetId),n.sharedClientState.isActiveQueryTarget(s.targetId)||await Qr(n.localStore,s.targetId,!1).then((()=>{n.sharedClientState.clearQueryState(s.targetId),t&&Jr(n.remoteStore,s.targetId),Yr(n,s.targetId)})).catch(vn)):(Yr(n,s.targetId),await Qr(n.localStore,s.targetId,!0))}async function Mv(r,e){const t=O(r),n=t.Tu.get(e),s=t.Iu.get(n.targetId);t.isPrimaryClient&&s.length===1&&(t.sharedClientState.removeLocalQueryTarget(n.targetId),Jr(t.remoteStore,n.targetId))}async function Ov(r,e,t){const n=Jl(r);try{const s=await(function(o,c){const l=O(o),u=se.now(),f=c.reduce(((E,A)=>E.add(A.key)),W());let g,p;return l.persistence.runTransaction("Locally write mutations","readwrite",(E=>{let A=Ye(),D=W();return l.Ns.getEntries(E,f).next((k=>{A=k,A.forEach(((B,j)=>{j.isValidDocument()||(D=D.add(B))}))})).next((()=>l.localDocuments.getOverlayedDocuments(E,A))).next((k=>{g=k;const B=[];for(const j of c){const F=ab(j,g.get(j.key).overlayedDocument);F!=null&&B.push(new qt(j.key,F,Sg(F.value.mapValue),ye.exists(!0)))}return l.mutationQueue.addMutationBatch(E,u,B,c)})).next((k=>{p=k;const B=k.applyToLocalDocumentSet(g,D);return l.documentOverlayCache.saveOverlays(E,k.batchId,B)}))})).then((()=>({batchId:p.batchId,changes:$g(g)})))})(n.localStore,e);n.sharedClientState.addPendingMutation(s.batchId),(function(o,c,l){let u=o.Vu[o.currentUser.toKey()];u||(u=new he(K)),u=u.insert(c,l),o.Vu[o.currentUser.toKey()]=u})(n,s.batchId,t),await jt(n,s.changes),await as(n.remoteStore)}catch(s){const i=ls(s,"Failed to persist write");t.reject(i)}}async function ep(r,e){const t=O(r);try{const n=await ev(t.localStore,e);e.targetChanges.forEach(((s,i)=>{const o=t.Au.get(i);o&&(z(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1,22616),s.addedDocuments.size>0?o.hu=!0:s.modifiedDocuments.size>0?z(o.hu,14607):s.removedDocuments.size>0&&(z(o.hu,42227),o.hu=!1))})),await jt(t,n,e)}catch(n){await vn(n)}}function zd(r,e,t){const n=O(r);if(n.isPrimaryClient&&t===0||!n.isPrimaryClient&&t===1){const s=[];n.Tu.forEach(((i,o)=>{const c=o.view.va(e);c.snapshot&&s.push(c.snapshot)})),(function(o,c){const l=O(o);l.onlineState=c;let u=!1;l.queries.forEach(((f,g)=>{for(const p of g.Sa)p.va(c)&&(u=!0)})),u&&jl(l)})(n.eventManager,e),s.length&&n.Pu.H_(s),n.onlineState=e,n.isPrimaryClient&&n.sharedClientState.setOnlineState(e)}}async function Lv(r,e,t){const n=O(r);n.sharedClientState.updateQueryState(e,"rejected",t);const s=n.Au.get(e),i=s&&s.key;if(i){let o=new he(M.comparator);o=o.insert(i,fe.newNoDocument(i,G.min()));const c=W().add(i),l=new Ri(G.min(),new Map,new he(K),o,c);await ep(n,l),n.du=n.du.remove(i),n.Au.delete(e),Ql(n)}else await Qr(n.localStore,e,!1).then((()=>Yr(n,e,t))).catch(vn)}async function Fv(r,e){const t=O(r),n=e.batch.batchId;try{const s=await Zb(t.localStore,e);Wl(t,n,null),Hl(t,n),t.sharedClientState.updateMutationState(n,"acknowledged"),await jt(t,s)}catch(s){await vn(s)}}async function Uv(r,e,t){const n=O(r);try{const s=await(function(o,c){const l=O(o);return l.persistence.runTransaction("Reject batch","readwrite-primary",(u=>{let f;return l.mutationQueue.lookupMutationBatch(u,c).next((g=>(z(g!==null,37113),f=g.keys(),l.mutationQueue.removeMutationBatch(u,g)))).next((()=>l.mutationQueue.performConsistencyCheck(u))).next((()=>l.documentOverlayCache.removeOverlaysForBatchId(u,f,c))).next((()=>l.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(u,f))).next((()=>l.localDocuments.getDocuments(u,f)))}))})(n.localStore,e);Wl(n,e,t),Hl(n,e),n.sharedClientState.updateMutationState(e,"rejected",t),await jt(n,s)}catch(s){await vn(s)}}async function Bv(r,e){const t=O(r);An(t.remoteStore)||N(Sn,"The network is disabled. The task returned by 'awaitPendingWrites()' will not complete until the network is enabled.");try{const n=await(function(o){const c=O(o);return c.persistence.runTransaction("Get highest unacknowledged batch id","readonly",(l=>c.mutationQueue.getHighestUnacknowledgedBatchId(l)))})(t.localStore);if(n===fn)return void e.resolve();const s=t.mu.get(n)||[];s.push(e),t.mu.set(n,s)}catch(n){const s=ls(n,"Initialization of waitForPendingWrites() operation failed");e.reject(s)}}function Hl(r,e){(r.mu.get(e)||[]).forEach((t=>{t.resolve()})),r.mu.delete(e)}function Wl(r,e,t){const n=O(r);let s=n.Vu[n.currentUser.toKey()];if(s){const i=s.get(e);i&&(t?i.reject(t):i.resolve(),s=s.remove(e)),n.Vu[n.currentUser.toKey()]=s}}function Yr(r,e,t=null){r.sharedClientState.removeLocalQueryTarget(e);for(const n of r.Iu.get(e))r.Tu.delete(n),t&&r.Pu.yu(n,t);r.Iu.delete(e),r.isPrimaryClient&&r.Ru.jr(e).forEach((n=>{r.Ru.containsKey(n)||tp(r,n)}))}function tp(r,e){r.Eu.delete(e.path.canonicalString());const t=r.du.get(e);t!==null&&(Jr(r.remoteStore,t),r.du=r.du.remove(e),r.Au.delete(t),Ql(r))}function Xc(r,e,t){for(const n of t)n instanceof Jm?(r.Ru.addReference(n.key,e),$v(r,n)):n instanceof Ym?(N(Sn,"Document no longer in limbo: "+n.key),r.Ru.removeReference(n.key,e),r.Ru.containsKey(n.key)||tp(r,n.key)):q(19791,{wu:n})}function $v(r,e){const t=e.key,n=t.path.canonicalString();r.du.get(t)||r.Eu.has(n)||(N(Sn,"New document in limbo: "+t),r.Eu.add(n),Ql(r))}function Ql(r){for(;r.Eu.size>0&&r.du.size<r.maxConcurrentLimboResolutions;){const e=r.Eu.values().next().value;r.Eu.delete(e);const t=new M(J.fromString(e)),n=r.fu.next();r.Au.set(n,new Cv(t)),r.du=r.du.insert(t,n),ba(r.remoteStore,new Rt(Ge(rs(t.path)),n,"TargetPurposeLimboResolution",Qe.ce))}}async function jt(r,e,t){const n=O(r),s=[],i=[],o=[];n.Tu.isEmpty()||(n.Tu.forEach(((c,l)=>{o.push(n.pu(l,e,t).then((u=>{if((u||t)&&n.isPrimaryClient){const f=u?!u.fromCache:t?.targetChanges.get(l.targetId)?.current;n.sharedClientState.updateQueryState(l.targetId,f?"current":"not-current")}if(u){s.push(u);const f=Vl.As(l.targetId,u);i.push(f)}})))})),await Promise.all(o),n.Pu.H_(s),await(async function(l,u){const f=O(l);try{await f.persistence.runTransaction("notifyLocalViewChanges","readwrite",(g=>R.forEach(u,(p=>R.forEach(p.Es,(E=>f.persistence.referenceDelegate.addReference(g,p.targetId,E))).next((()=>R.forEach(p.ds,(E=>f.persistence.referenceDelegate.removeReference(g,p.targetId,E)))))))))}catch(g){if(!Tn(g))throw g;N(Nl,"Failed to update sequence numbers: "+g)}for(const g of u){const p=g.targetId;if(!g.fromCache){const E=f.Ms.get(p),A=E.snapshotVersion,D=E.withLastLimboFreeSnapshotVersion(A);f.Ms=f.Ms.insert(p,D)}}})(n.localStore,i))}async function qv(r,e){const t=O(r);if(!t.currentUser.isEqual(e)){N(Sn,"User change. New user:",e.toKey());const n=await Dm(t.localStore,e);t.currentUser=e,(function(i,o){i.mu.forEach((c=>{c.forEach((l=>{l.reject(new V(x.CANCELLED,o))}))})),i.mu.clear()})(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,n.removedBatchIds,n.addedBatchIds),await jt(t,n.Ls)}}function jv(r,e){const t=O(r),n=t.Au.get(e);if(n&&n.hu)return W().add(n.key);{let s=W();const i=t.Iu.get(e);if(!i)return s;for(const o of i){const c=t.Tu.get(o);s=s.unionWith(c.view.nu)}return s}}async function zv(r,e){const t=O(r),n=await Go(t.localStore,e.query,!0),s=e.view.cu(n);return t.isPrimaryClient&&Xc(t,e.targetId,s.au),s}async function Gv(r,e){const t=O(r);return Mm(t.localStore,e).then((n=>jt(t,n)))}async function Kv(r,e,t,n){const s=O(r),i=await(function(c,l){const u=O(c),f=O(u.mutationQueue);return u.persistence.runTransaction("Lookup mutation documents","readonly",(g=>f.er(g,l).next((p=>p?u.localDocuments.getDocuments(g,p):R.resolve(null)))))})(s.localStore,e);i!==null?(t==="pending"?await as(s.remoteStore):t==="acknowledged"||t==="rejected"?(Wl(s,e,n||null),Hl(s,e),(function(c,l){O(O(c).mutationQueue).ir(l)})(s.localStore,e)):q(6720,"Unknown batchState",{Su:t}),await jt(s,i)):N(Sn,"Cannot apply mutation batch with id: "+e)}async function Hv(r,e){const t=O(r);if(va(t),Jl(t),e===!0&&t.gu!==!0){const n=t.sharedClientState.getAllActiveQueryTargets(),s=await Gd(t,n.toArray());t.gu=!0,await Jc(t.remoteStore,!0);for(const i of s)ba(t.remoteStore,i)}else if(e===!1&&t.gu!==!1){const n=[];let s=Promise.resolve();t.Iu.forEach(((i,o)=>{t.sharedClientState.isLocalQueryTarget(o)?n.push(o):s=s.then((()=>(Yr(t,o),Qr(t.localStore,o,!0)))),Jr(t.remoteStore,o)})),await s,await Gd(t,n),(function(o){const c=O(o);c.Au.forEach(((l,u)=>{Jr(c.remoteStore,u)})),c.Ru.Jr(),c.Au=new Map,c.du=new he(M.comparator)})(t),t.gu=!1,await Jc(t.remoteStore,!1)}}async function Gd(r,e,t){const n=O(r),s=[],i=[];for(const o of e){let c;const l=n.Iu.get(o);if(l&&l.length!==0){c=await Wr(n.localStore,Ge(l[0]));for(const u of l){const f=n.Tu.get(u),g=await zv(n,f);g.snapshot&&i.push(g.snapshot)}}else{const u=await Nm(n.localStore,o);c=await Wr(n.localStore,u),await Kl(n,np(u),o,!1,c.resumeToken)}s.push(c)}return n.Pu.H_(i),s}function np(r){return Ng(r.path,r.collectionGroup,r.orderBy,r.filters,r.limit,"F",r.startAt,r.endAt)}function Wv(r){return(function(t){return O(O(t).persistence).Ts()})(O(r).localStore)}async function Qv(r,e,t,n){const s=O(r);if(s.gu)return void N(Sn,"Ignoring unexpected query state notification.");const i=s.Iu.get(e);if(i&&i.length>0)switch(t){case"current":case"not-current":{const o=await Mm(s.localStore,Fg(i[0])),c=Ri.createSynthesizedRemoteEventForCurrentChange(e,t==="current",Ie.EMPTY_BYTE_STRING);await jt(s,o,c);break}case"rejected":await Qr(s.localStore,e,!0),Yr(s,e,n);break;default:q(64155,t)}}async function Jv(r,e,t){const n=va(r);if(n.gu){for(const s of e){if(n.Iu.has(s)&&n.sharedClientState.isActiveQueryTarget(s)){N(Sn,"Adding an already active target "+s);continue}const i=await Nm(n.localStore,s),o=await Wr(n.localStore,i);await Kl(n,np(i),o.targetId,!1,o.resumeToken),ba(n.remoteStore,o)}for(const s of t)n.Iu.has(s)&&await Qr(n.localStore,s,!1).then((()=>{Jr(n.remoteStore,s),Yr(n,s)})).catch(vn)}}function va(r){const e=O(r);return e.remoteStore.remoteSyncer.applyRemoteEvent=ep.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=jv.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=Lv.bind(null,e),e.Pu.H_=Rv.bind(null,e.eventManager),e.Pu.yu=Pv.bind(null,e.eventManager),e}function Jl(r){const e=O(r);return e.remoteStore.remoteSyncer.applySuccessfulWrite=Fv.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=Uv.bind(null,e),e}function Yv(r,e,t){const n=O(r);(async function(i,o,c){try{const l=await o.getMetadata();if(await(function(E,A){const D=O(E),k=Te(A.createTime);return D.persistence.runTransaction("hasNewerBundle","readonly",(B=>D.Ii.getBundleMetadata(B,A.id))).then((B=>!!B&&B.createTime.compareTo(k)>=0))})(i.localStore,l))return await o.close(),c._completeWith((function(E){return{taskState:"Success",documentsLoaded:E.totalDocuments,bytesLoaded:E.totalBytes,totalDocuments:E.totalDocuments,totalBytes:E.totalBytes}})(l)),Promise.resolve(new Set);c._updateProgress(Qm(l));const u=new Gl(l,o.serializer);let f=await o.bu();for(;f;){const p=await u.Ga(f);p&&c._updateProgress(p),f=await o.bu()}const g=await u.ja(i.localStore);return await jt(i,g.Ha,void 0),await(function(E,A){const D=O(E);return D.persistence.runTransaction("Save bundle","readwrite",(k=>D.Ii.saveBundleMetadata(k,A)))})(i.localStore,l),c._completeWith(g.progress),Promise.resolve(g.Ja)}catch(l){return nt(Sn,`Loading bundle failed with ${l}`),c._failWith(l),Promise.resolve(new Set)}})(n,e,t).then((s=>{n.sharedClientState.notifyBundleLoaded(s)}))}class Xr{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=ar(e.databaseInfo.databaseId),this.sharedClientState=this.Du(e),this.persistence=this.Cu(e),await this.persistence.start(),this.localStore=this.vu(e),this.gcScheduler=this.Fu(e,this.localStore),this.indexBackfillerScheduler=this.Mu(e,this.localStore)}Fu(e,t){return null}Mu(e,t){return null}vu(e){return Cm(this.persistence,new xm,e.initialUser,this.serializer)}Cu(e){return new Cl(Ia.mi,this.serializer)}Du(e){return new Bm}async terminate(){this.gcScheduler?.stop(),this.indexBackfillerScheduler?.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}Xr.provider={build:()=>new Xr};class Yl extends Xr{constructor(e){super(),this.cacheSizeBytes=e}Fu(e,t){z(this.persistence.referenceDelegate instanceof zo,46915);const n=this.persistence.referenceDelegate.garbageCollector;return new Tm(n,e.asyncQueue,t)}Cu(e){const t=this.cacheSizeBytes!==void 0?qe.withCacheSize(this.cacheSizeBytes):qe.DEFAULT;return new Cl((n=>zo.mi(n,t)),this.serializer)}}class Xl extends Xr{constructor(e,t,n){super(),this.xu=e,this.cacheSizeBytes=t,this.forceOwnership=n,this.kind="persistent",this.synchronizeTabs=!1}async initialize(e){await super.initialize(e),await this.xu.initialize(this,e),await Jl(this.xu.syncEngine),await as(this.xu.remoteStore),await this.persistence.Ji((()=>(this.gcScheduler&&!this.gcScheduler.started&&this.gcScheduler.start(),this.indexBackfillerScheduler&&!this.indexBackfillerScheduler.started&&this.indexBackfillerScheduler.start(),Promise.resolve())))}vu(e){return Cm(this.persistence,new xm,e.initialUser,this.serializer)}Fu(e,t){const n=this.persistence.referenceDelegate.garbageCollector;return new Tm(n,e.asyncQueue,t)}Mu(e,t){const n=new hI(t,this.persistence);return new uI(e.asyncQueue,n)}Cu(e){const t=kl(e.databaseInfo.databaseId,e.databaseInfo.persistenceKey),n=this.cacheSizeBytes!==void 0?qe.withCacheSize(this.cacheSizeBytes):qe.DEFAULT;return new Dl(this.synchronizeTabs,t,e.clientId,n,e.asyncQueue,$m(),Ro(),this.serializer,this.sharedClientState,!!this.forceOwnership)}Du(e){return new Bm}}class rp extends Xl{constructor(e,t){super(e,t,!1),this.xu=e,this.cacheSizeBytes=t,this.synchronizeTabs=!0}async initialize(e){await super.initialize(e);const t=this.xu.syncEngine;this.sharedClientState instanceof mc&&(this.sharedClientState.syncEngine={Co:Kv.bind(null,t),vo:Qv.bind(null,t),Fo:Jv.bind(null,t),Ts:Wv.bind(null,t),Do:Gv.bind(null,t)},await this.sharedClientState.start()),await this.persistence.Ji((async n=>{await Hv(this.xu.syncEngine,n),this.gcScheduler&&(n&&!this.gcScheduler.started?this.gcScheduler.start():n||this.gcScheduler.stop()),this.indexBackfillerScheduler&&(n&&!this.indexBackfillerScheduler.started?this.indexBackfillerScheduler.start():n||this.indexBackfillerScheduler.stop())}))}Du(e){const t=$m();if(!mc.v(t))throw new V(x.UNIMPLEMENTED,"IndexedDB persistence is only available on platforms that support LocalStorage.");const n=kl(e.databaseInfo.databaseId,e.databaseInfo.persistenceKey);return new mc(t,e.asyncQueue,n,e.clientId,e.initialUser)}}class In{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=n=>zd(this.syncEngine,n,1),this.remoteStore.remoteSyncer.handleCredentialChange=qv.bind(null,this.syncEngine),await Jc(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return(function(){return new Sv})()}createDatastore(e){const t=ar(e.databaseInfo.databaseId),n=(function(i){return new cv(i)})(e.databaseInfo);return(function(i,o,c,l){return new dv(i,o,c,l)})(e.authCredentials,e.appCheckCredentials,n,t)}createRemoteStore(e){return(function(n,s,i,o,c){return new gv(n,s,i,o,c)})(this.localStore,this.datastore,e.asyncQueue,(t=>zd(this.syncEngine,t,0)),(function(){return Ld.v()?new Ld:new sv})())}createSyncEngine(e,t){return(function(s,i,o,c,l,u,f){const g=new Dv(s,i,o,c,l,u);return f&&(g.gu=!0),g})(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){await(async function(t){const n=O(t);N(nr,"RemoteStore shutting down."),n.Ea.add(5),await os(n),n.Aa.shutdown(),n.Ra.set("Unknown")})(this.remoteStore),this.datastore?.terminate(),this.eventManager?.terminate()}}In.provider={build:()=>new In};function Kd(r,e=10240){let t=0;return{async read(){if(t<r.byteLength){const n={value:r.slice(t,t+e),done:!1};return t+=e,n}return{done:!0}},async cancel(){},releaseLock(){},closed:Promise.resolve()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ta{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Ou(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Ou(this.observer.error,e):ve("Uncaught Error in snapshot listener:",e.toString()))}Nu(){this.muted=!0}Ou(e,t){setTimeout((()=>{this.muted||e(t)}),0)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xv{constructor(e,t){this.Bu=e,this.serializer=t,this.metadata=new Ve,this.buffer=new Uint8Array,this.Lu=(function(){return new TextDecoder("utf-8")})(),this.ku().then((n=>{n&&n.$a()?this.metadata.resolve(n.Qa.metadata):this.metadata.reject(new Error(`The first element of the bundle is not a metadata, it is
             ${JSON.stringify(n?.Qa)}`))}),(n=>this.metadata.reject(n)))}close(){return this.Bu.cancel()}async getMetadata(){return this.metadata.promise}async bu(){return await this.getMetadata(),this.ku()}async ku(){const e=await this.qu();if(e===null)return null;const t=this.Lu.decode(e),n=Number(t);isNaN(n)&&this.Qu(`length string (${t}) is not valid number`);const s=await this.$u(n);return new Wm(JSON.parse(s),e.length+n)}Uu(){return this.buffer.findIndex((e=>e===123))}async qu(){for(;this.Uu()<0&&!await this.Ku(););if(this.buffer.length===0)return null;const e=this.Uu();e<0&&this.Qu("Reached the end of bundle when a length string is expected.");const t=this.buffer.slice(0,e);return this.buffer=this.buffer.slice(e),t}async $u(e){for(;this.buffer.length<e;)await this.Ku()&&this.Qu("Reached the end of bundle when more is expected.");const t=this.Lu.decode(this.buffer.slice(0,e));return this.buffer=this.buffer.slice(e),t}Qu(e){throw this.Bu.cancel(),new Error(`Invalid bundle format: ${e}`)}async Ku(){const e=await this.Bu.read();if(!e.done){const t=new Uint8Array(this.buffer.length+e.value.length);t.set(this.buffer),t.set(e.value,this.buffer.length),this.buffer=t}return e.done}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zv{constructor(e,t){this.bundleData=e,this.serializer=t,this.cursor=0,this.elements=[];let n=this.bu();if(!n||!n.$a())throw new Error(`The first element of the bundle is not a metadata object, it is
         ${JSON.stringify(n?.Qa)}`);this.metadata=n;do n=this.bu(),n!==null&&this.elements.push(n);while(n!==null)}getMetadata(){return this.metadata}Wu(){return this.elements}bu(){if(this.cursor===this.bundleData.length)return null;const e=this.qu(),t=this.$u(e);return new Wm(JSON.parse(t),e)}$u(e){if(this.cursor+e>this.bundleData.length)throw new V(x.INTERNAL,"Reached the end of bundle when more is expected.");return this.bundleData.slice(this.cursor,this.cursor+=e)}qu(){const e=this.cursor;let t=this.cursor;for(;t<this.bundleData.length;){if(this.bundleData[t]==="{"){if(t===e)throw new Error("First character is a bracket and not a number");return this.cursor=t,Number(this.bundleData.slice(e,t))}t++}throw new Error("Reached the end of bundle when more is expected.")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eT{constructor(e){this.datastore=e,this.readVersions=new Map,this.mutations=[],this.committed=!1,this.lastTransactionError=null,this.writtenDocs=new Set}async lookup(e){if(this.ensureCommitNotCalled(),this.mutations.length>0)throw this.lastTransactionError=new V(x.INVALID_ARGUMENT,"Firestore transactions require all reads to be executed before all writes."),this.lastTransactionError;const t=await(async function(s,i){const o=O(s),c={documents:i.map((g=>li(o.serializer,g)))},l=await o.Ho("BatchGetDocuments",o.serializer.databaseId,J.emptyPath(),c,i.length),u=new Map;l.forEach((g=>{const p=pb(o.serializer,g);u.set(p.key.toString(),p)}));const f=[];return i.forEach((g=>{const p=u.get(g.toString());z(!!p,55234,{key:g}),f.push(p)})),f})(this.datastore,e);return t.forEach((n=>this.recordVersion(n))),t}set(e,t){this.write(t.toMutation(e,this.precondition(e))),this.writtenDocs.add(e.toString())}update(e,t){try{this.write(t.toMutation(e,this.preconditionForUpdate(e)))}catch(n){this.lastTransactionError=n}this.writtenDocs.add(e.toString())}delete(e){this.write(new is(e,this.precondition(e))),this.writtenDocs.add(e.toString())}async commit(){if(this.ensureCommitNotCalled(),this.lastTransactionError)throw this.lastTransactionError;const e=this.readVersions;this.mutations.forEach((t=>{e.delete(t.key.toString())})),e.forEach(((t,n)=>{const s=M.fromPath(n);this.mutations.push(new bl(s,this.precondition(s)))})),await(async function(n,s){const i=O(n),o={writes:s.map((c=>ui(i.serializer,c)))};await i.Go("Commit",i.serializer.databaseId,J.emptyPath(),o)})(this.datastore,this.mutations),this.committed=!0}recordVersion(e){let t;if(e.isFoundDocument())t=e.version;else{if(!e.isNoDocument())throw q(50498,{Gu:e.constructor.name});t=G.min()}const n=this.readVersions.get(e.key.toString());if(n){if(!t.isEqual(n))throw new V(x.ABORTED,"Document version changed between two reads.")}else this.readVersions.set(e.key.toString(),t)}precondition(e){const t=this.readVersions.get(e.toString());return!this.writtenDocs.has(e.toString())&&t?t.isEqual(G.min())?ye.exists(!1):ye.updateTime(t):ye.none()}preconditionForUpdate(e){const t=this.readVersions.get(e.toString());if(!this.writtenDocs.has(e.toString())&&t){if(t.isEqual(G.min()))throw new V(x.INVALID_ARGUMENT,"Can't update a document that doesn't exist.");return ye.updateTime(t)}return ye.exists(!0)}write(e){this.ensureCommitNotCalled(),this.mutations.push(e)}ensureCommitNotCalled(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tT{constructor(e,t,n,s,i){this.asyncQueue=e,this.datastore=t,this.options=n,this.updateFunction=s,this.deferred=i,this.zu=n.maxAttempts,this.M_=new Ol(this.asyncQueue,"transaction_retry")}ju(){this.zu-=1,this.Ju()}Ju(){this.M_.p_((async()=>{const e=new eT(this.datastore),t=this.Hu(e);t&&t.then((n=>{this.asyncQueue.enqueueAndForget((()=>e.commit().then((()=>{this.deferred.resolve(n)})).catch((s=>{this.Yu(s)}))))})).catch((n=>{this.Yu(n)}))}))}Hu(e){try{const t=this.updateFunction(e);return!bi(t)&&t.catch&&t.then?t:(this.deferred.reject(Error("Transaction callback must return a Promise")),null)}catch(t){return this.deferred.reject(t),null}}Yu(e){this.zu>0&&this.Zu(e)?(this.zu-=1,this.asyncQueue.enqueueAndForget((()=>(this.Ju(),Promise.resolve())))):this.deferred.reject(e)}Zu(e){if(e.name==="FirebaseError"){const t=e.code;return t==="aborted"||t==="failed-precondition"||t==="already-exists"||!Xg(t)}return!1}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bn="FirestoreClient";class nT{constructor(e,t,n,s,i){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=n,this.databaseInfo=s,this.user=ke.UNAUTHENTICATED,this.clientId=sa.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=i,this.authCredentials.start(n,(async o=>{N(bn,"Received user=",o.uid),await this.authCredentialListener(o),this.user=o})),this.appCheckCredentials.start(n,(o=>(N(bn,"Received new app check token=",o),this.appCheckCredentialListener(o,this.user))))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new Ve;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted((async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const n=ls(t,"Failed to shutdown persistence");e.reject(n)}})),e.promise}}async function _c(r,e){r.asyncQueue.verifyOperationInProgress(),N(bn,"Initializing OfflineComponentProvider");const t=r.configuration;await e.initialize(t);let n=t.initialUser;r.setCredentialChangeListener((async s=>{n.isEqual(s)||(await Dm(e.localStore,s),n=s)})),e.persistence.setDatabaseDeletedListener((()=>r.terminate())),r._offlineComponents=e}async function Hd(r,e){r.asyncQueue.verifyOperationInProgress();const t=await Zl(r);N(bn,"Initializing OnlineComponentProvider"),await e.initialize(t,r.configuration),r.setCredentialChangeListener((n=>Ud(e.remoteStore,n))),r.setAppCheckTokenChangeListener(((n,s)=>Ud(e.remoteStore,s))),r._onlineComponents=e}async function Zl(r){if(!r._offlineComponents)if(r._uninitializedComponentsProvider){N(bn,"Using user provided OfflineComponentProvider");try{await _c(r,r._uninitializedComponentsProvider._offline)}catch(e){const t=e;if(!(function(s){return s.name==="FirebaseError"?s.code===x.FAILED_PRECONDITION||s.code===x.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11})(t))throw t;nt("Error using user provided cache. Falling back to memory cache: "+t),await _c(r,new Xr)}}else N(bn,"Using default OfflineComponentProvider"),await _c(r,new Yl(void 0));return r._offlineComponents}async function Ea(r){return r._onlineComponents||(r._uninitializedComponentsProvider?(N(bn,"Using user provided OnlineComponentProvider"),await Hd(r,r._uninitializedComponentsProvider._online)):(N(bn,"Using default OnlineComponentProvider"),await Hd(r,new In))),r._onlineComponents}function sp(r){return Zl(r).then((e=>e.persistence))}function us(r){return Zl(r).then((e=>e.localStore))}function ip(r){return Ea(r).then((e=>e.remoteStore))}function eu(r){return Ea(r).then((e=>e.syncEngine))}function op(r){return Ea(r).then((e=>e.datastore))}async function Zr(r){const e=await Ea(r),t=e.eventManager;return t.onListen=kv.bind(null,e.syncEngine),t.onUnlisten=Nv.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=Vv.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=Mv.bind(null,e.syncEngine),t}function rT(r){return r.asyncQueue.enqueue((async()=>{const e=await sp(r),t=await ip(r);return e.setNetworkEnabled(!0),(function(s){const i=O(s);return i.Ea.delete(0),xi(i)})(t)}))}function sT(r){return r.asyncQueue.enqueue((async()=>{const e=await sp(r),t=await ip(r);return e.setNetworkEnabled(!1),(async function(s){const i=O(s);i.Ea.add(0),await os(i),i.Ra.set("Offline")})(t)}))}function iT(r,e){const t=new Ve;return r.asyncQueue.enqueueAndForget((async()=>(async function(s,i,o){try{const c=await(function(u,f){const g=O(u);return g.persistence.runTransaction("read document","readonly",(p=>g.localDocuments.getDocument(p,f)))})(s,i);c.isFoundDocument()?o.resolve(c):c.isNoDocument()?o.resolve(null):o.reject(new V(x.UNAVAILABLE,"Failed to get document from cache. (However, this document may exist on the server. Run again without setting 'source' in the GetOptions to attempt to retrieve the document from the server.)"))}catch(c){const l=ls(c,`Failed to get document '${i} from cache`);o.reject(l)}})(await us(r),e,t))),t.promise}function ap(r,e,t={}){const n=new Ve;return r.asyncQueue.enqueueAndForget((async()=>(function(i,o,c,l,u){const f=new Ta({next:p=>{f.Nu(),o.enqueueAndForget((()=>ql(i,g)));const E=p.docs.has(c);!E&&p.fromCache?u.reject(new V(x.UNAVAILABLE,"Failed to get document because the client is offline.")):E&&p.fromCache&&l&&l.source==="server"?u.reject(new V(x.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):u.resolve(p)},error:p=>u.reject(p)}),g=new zl(rs(c.path),f,{includeMetadataChanges:!0,qa:!0});return $l(i,g)})(await Zr(r),r.asyncQueue,e,t,n))),n.promise}function oT(r,e){const t=new Ve;return r.asyncQueue.enqueueAndForget((async()=>(async function(s,i,o){try{const c=await Go(s,i,!0),l=new Xm(i,c.Qs),u=l.ru(c.documents),f=l.applyChanges(u,!1);o.resolve(f.snapshot)}catch(c){const l=ls(c,`Failed to execute query '${i} against cache`);o.reject(l)}})(await us(r),e,t))),t.promise}function cp(r,e,t={}){const n=new Ve;return r.asyncQueue.enqueueAndForget((async()=>(function(i,o,c,l,u){const f=new Ta({next:p=>{f.Nu(),o.enqueueAndForget((()=>ql(i,g))),p.fromCache&&l.source==="server"?u.reject(new V(x.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):u.resolve(p)},error:p=>u.reject(p)}),g=new zl(c,f,{includeMetadataChanges:!0,qa:!0});return $l(i,g)})(await Zr(r),r.asyncQueue,e,t,n))),n.promise}function aT(r,e,t){const n=new Ve;return r.asyncQueue.enqueueAndForget((async()=>{try{const s=await op(r);n.resolve((async function(o,c,l){const u=O(o),{request:f,gt:g,parent:p}=lm(u.serializer,Mg(c),l);u.connection.$o||delete f.parent;const E=(await u.Ho("RunAggregationQuery",u.serializer.databaseId,p,f,1)).filter((D=>!!D.result));z(E.length===1,64727);const A=E[0].result?.aggregateFields;return Object.keys(A).reduce(((D,k)=>(D[g[k]]=A[k],D)),{})})(s,e,t))}catch(s){n.reject(s)}})),n.promise}function cT(r,e){const t=new Ta(e);return r.asyncQueue.enqueueAndForget((async()=>(function(s,i){O(s).Ca.add(i),i.next()})(await Zr(r),t))),()=>{t.Nu(),r.asyncQueue.enqueueAndForget((async()=>(function(s,i){O(s).Ca.delete(i)})(await Zr(r),t)))}}function lT(r,e,t,n){const s=(function(o,c){let l;return l=typeof o=="string"?em().encode(o):o,(function(f,g){return new Xv(f,g)})((function(f,g){if(f instanceof Uint8Array)return Kd(f,g);if(f instanceof ArrayBuffer)return Kd(new Uint8Array(f),g);if(f instanceof ReadableStream)return f.getReader();throw new Error("Source of `toByteStreamReader` has to be a ArrayBuffer or ReadableStream")})(l),c)})(t,ar(e));r.asyncQueue.enqueueAndForget((async()=>{Yv(await eu(r),s,n)}))}function uT(r,e){return r.asyncQueue.enqueue((async()=>(function(n,s){const i=O(n);return i.persistence.runTransaction("Get named query","readonly",(o=>i.Ii.getNamedQuery(o,s)))})(await us(r),e)))}function lp(r,e){return(function(n,s){return new Zv(n,s)})(r,e)}function hT(r,e){return r.asyncQueue.enqueue((async()=>(async function(n,s){const i=O(n),o=i.indexManager,c=[];return i.persistence.runTransaction("Configure indexes","readwrite",(l=>o.getFieldIndexes(l).next((u=>(function(g,p,E,A,D){g=[...g],p=[...p],g.sort(E),p.sort(E);const k=g.length,B=p.length;let j=0,F=0;for(;j<B&&F<k;){const Q=E(g[F],p[j]);Q<0?D(g[F++]):Q>0?A(p[j++]):(j++,F++)}for(;j<B;)A(p[j++]);for(;F<k;)D(g[F++])})(u,s,oI,(f=>{c.push(o.addFieldIndex(l,f))}),(f=>{c.push(o.deleteFieldIndex(l,f))})))).next((()=>R.waitFor(c)))))})(await us(r),e)))}function dT(r,e){return r.asyncQueue.enqueue((async()=>(function(n,s){O(n).Fs.Vs=s})(await us(r),e)))}function fT(r){return r.asyncQueue.enqueue((async()=>(function(t){const n=O(t),s=n.indexManager;return n.persistence.runTransaction("Delete All Indexes","readwrite",(i=>s.deleteAllFieldIndexes(i)))})(await us(r))))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function up(r){const e={};return r.timeoutSeconds!==void 0&&(e.timeoutSeconds=r.timeoutSeconds),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wd=new Map;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hp="firestore.googleapis.com",Qd=!0;class Jd{constructor(e){if(e.host===void 0){if(e.ssl!==void 0)throw new V(x.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=hp,this.ssl=Qd}else this.host=e.host,this.ssl=e.ssl??Qd;if(this.isUsingEmulator=e.emulatorOptions!==void 0,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=ym;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<vm)throw new V(x.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}Yf("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=up(e.experimentalLongPollingOptions??{}),(function(n){if(n.timeoutSeconds!==void 0){if(isNaN(n.timeoutSeconds))throw new V(x.INVALID_ARGUMENT,`invalid long polling timeout: ${n.timeoutSeconds} (must not be NaN)`);if(n.timeoutSeconds<5)throw new V(x.INVALID_ARGUMENT,`invalid long polling timeout: ${n.timeoutSeconds} (minimum allowed value is 5)`);if(n.timeoutSeconds>30)throw new V(x.INVALID_ARGUMENT,`invalid long polling timeout: ${n.timeoutSeconds} (maximum allowed value is 30)`)}})(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&(function(n,s){return n.timeoutSeconds===s.timeoutSeconds})(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class Ci{constructor(e,t,n,s){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=n,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Jd({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new V(x.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new V(x.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Jd(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=(function(n){if(!n)return new Qf;switch(n.type){case"firstParty":return new Zw(n.sessionIndex||"0",n.iamToken||null,n.authTokenFactory||null);case"provider":return n.client;default:throw new V(x.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}})(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return(function(t){const n=Wd.get(t);n&&(N("ComponentProvider","Removing Datastore"),Wd.delete(t),n.terminate())})(this),Promise.resolve()}}function dp(r,e,t,n={}){r=Y(r,Ci);const s=ir(e),i=r._getSettings(),o={...i,emulatorOptions:r._getEmulatorOptions()},c=`${e}:${t}`;s&&(sl(`https://${c}`),xf("Firestore",!0)),i.host!==hp&&i.host!==c&&nt("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const l={...i,host:c,ssl:s,emulatorOptions:n};if(!dt(l,o)&&(r._setSettings(l),n.mockUserToken)){let u,f;if(typeof n.mockUserToken=="string")u=n.mockUserToken,f=ke.MOCK_USER;else{u=vy(n.mockUserToken,r._app?.options.projectId);const g=n.mockUserToken.sub||n.mockUserToken.user_id;if(!g)throw new V(x.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");f=new ke(g)}r._authCredentials=new Jw(new Wf(u,f))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xe{constructor(e,t,n){this.converter=t,this._query=n,this.type="query",this.firestore=e}withConverter(e){return new xe(this.firestore,e,this._query)}}class oe{constructor(e,t,n){this.converter=t,this._key=n,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new ut(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new oe(this.firestore,e,this._key)}toJSON(){return{type:oe._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,t,n){if(or(t,oe._jsonSchema))return new oe(e,n||null,new M(J.fromString(t.referencePath)))}}oe._jsonSchemaVersion="firestore/documentReference/1.0",oe._jsonSchema={type:Se("string",oe._jsonSchemaVersion),referencePath:Se("string")};class ut extends xe{constructor(e,t,n){super(e,t,rs(n)),this._path=n,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new oe(this.firestore,null,new M(e))}withConverter(e){return new ut(this.firestore,e,this._path)}}function Ee(r,e,...t){if(r=pe(r),cl("collection","path",e),r instanceof Ci){const n=J.fromString(e,...t);return Fh(n),new ut(r,null,n)}{if(!(r instanceof oe||r instanceof ut))throw new V(x.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const n=r._path.child(J.fromString(e,...t));return Fh(n),new ut(r.firestore,null,n)}}function gT(r,e){if(r=Y(r,Ci),cl("collectionGroup","collection id",e),e.indexOf("/")>=0)throw new V(x.INVALID_ARGUMENT,`Invalid collection ID '${e}' passed to function collectionGroup(). Collection IDs must not contain '/'.`);return new xe(r,null,(function(n){return new Bt(J.emptyPath(),n)})(e))}function me(r,e,...t){if(r=pe(r),arguments.length===1&&(e=sa.newId()),cl("doc","path",e),r instanceof Ci){const n=J.fromString(e,...t);return Lh(n),new oe(r,null,new M(n))}{if(!(r instanceof oe||r instanceof ut))throw new V(x.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const n=r._path.child(J.fromString(e,...t));return Lh(n),new oe(r.firestore,r instanceof ut?r.converter:null,new M(n))}}function mT(r,e){return r=pe(r),e=pe(e),(r instanceof oe||r instanceof ut)&&(e instanceof oe||e instanceof ut)&&r.firestore===e.firestore&&r.path===e.path&&r.converter===e.converter}function tu(r,e){return r=pe(r),e=pe(e),r instanceof xe&&e instanceof xe&&r.firestore===e.firestore&&Ei(r._query,e._query)&&r.converter===e.converter}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yd="AsyncQueue";class Xd{constructor(e=Promise.resolve()){this.Xu=[],this.ec=!1,this.tc=[],this.nc=null,this.rc=!1,this.sc=!1,this.oc=[],this.M_=new Ol(this,"async_queue_retry"),this._c=()=>{const n=Ro();n&&N(Yd,"Visibility state changed to "+n.visibilityState),this.M_.w_()},this.ac=e;const t=Ro();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this._c)}get isShuttingDown(){return this.ec}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.uc(),this.cc(e)}enterRestrictedMode(e){if(!this.ec){this.ec=!0,this.sc=e||!1;const t=Ro();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this._c)}}enqueue(e){if(this.uc(),this.ec)return new Promise((()=>{}));const t=new Ve;return this.cc((()=>this.ec&&this.sc?Promise.resolve():(e().then(t.resolve,t.reject),t.promise))).then((()=>t.promise))}enqueueRetryable(e){this.enqueueAndForget((()=>(this.Xu.push(e),this.lc())))}async lc(){if(this.Xu.length!==0){try{await this.Xu[0](),this.Xu.shift(),this.M_.reset()}catch(e){if(!Tn(e))throw e;N(Yd,"Operation failed with retryable error: "+e)}this.Xu.length>0&&this.M_.p_((()=>this.lc()))}}cc(e){const t=this.ac.then((()=>(this.rc=!0,e().catch((n=>{throw this.nc=n,this.rc=!1,ve("INTERNAL UNHANDLED ERROR: ",Zd(n)),n})).then((n=>(this.rc=!1,n))))));return this.ac=t,t}enqueueAfterDelay(e,t,n){this.uc(),this.oc.indexOf(e)>-1&&(t=0);const s=Bl.createAndSchedule(this,e,t,n,(i=>this.hc(i)));return this.tc.push(s),s}uc(){this.nc&&q(47125,{Pc:Zd(this.nc)})}verifyOperationInProgress(){}async Tc(){let e;do e=this.ac,await e;while(e!==this.ac)}Ic(e){for(const t of this.tc)if(t.timerId===e)return!0;return!1}Ec(e){return this.Tc().then((()=>{this.tc.sort(((t,n)=>t.targetTimeMs-n.targetTimeMs));for(const t of this.tc)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.Tc()}))}dc(e){this.oc.push(e)}hc(e){const t=this.tc.indexOf(e);this.tc.splice(t,1)}}function Zd(r){let e=r.message||"";return r.stack&&(e=r.stack.includes(r.message)?r.stack:r.message+`
`+r.stack),e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Pr(r){return(function(t,n){if(typeof t!="object"||t===null)return!1;const s=t;for(const i of n)if(i in s&&typeof s[i]=="function")return!0;return!1})(r,["next","error","complete"])}class fp{constructor(){this._progressObserver={},this._taskCompletionResolver=new Ve,this._lastProgress={taskState:"Running",totalBytes:0,totalDocuments:0,bytesLoaded:0,documentsLoaded:0}}onProgress(e,t,n){this._progressObserver={next:e,error:t,complete:n}}catch(e){return this._taskCompletionResolver.promise.catch(e)}then(e,t){return this._taskCompletionResolver.promise.then(e,t)}_completeWith(e){this._updateProgress(e),this._progressObserver.complete&&this._progressObserver.complete(),this._taskCompletionResolver.resolve(e)}_failWith(e){this._lastProgress.taskState="Error",this._progressObserver.next&&this._progressObserver.next(this._lastProgress),this._progressObserver.error&&this._progressObserver.error(e),this._taskCompletionResolver.reject(e)}_updateProgress(e){this._lastProgress=e,this._progressObserver.next&&this._progressObserver.next(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pT=-1;class le extends Ci{constructor(e,t,n,s){super(e,t,n,s),this.type="firestore",this._queue=new Xd,this._persistenceKey=s?.name||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new Xd(e),this._firestoreClient=void 0,await e}}}function _T(r,e,t){t||(t=ii);const n=Ii(r,"firestore");if(n.isInitialized(t)){const s=n.getImmediate({identifier:t}),i=n.getOptions(t);if(dt(i,e))return s;throw new V(x.FAILED_PRECONDITION,"initializeFirestore() has already been called with different options. To avoid this error, call initializeFirestore() with the same options as when it was originally called, or call getFirestore() to return the already initialized instance.")}if(e.cacheSizeBytes!==void 0&&e.localCache!==void 0)throw new V(x.INVALID_ARGUMENT,"cache and cacheSizeBytes cannot be specified at the same time as cacheSizeBytes willbe deprecated. Instead, specify the cache size in the cache object");if(e.cacheSizeBytes!==void 0&&e.cacheSizeBytes!==-1&&e.cacheSizeBytes<vm)throw new V(x.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");return e.host&&ir(e.host)&&sl(e.host),n.initialize({options:e,instanceIdentifier:t})}function gp(r,e){const t=typeof r=="object"?r:Lf(),n=typeof r=="string"?r:e||ii,s=Ii(t,"firestore").getImmediate({identifier:n});if(!s._initialized){const i=Iy("firestore");i&&dp(s,...i)}return s}function we(r){if(r._terminated)throw new V(x.FAILED_PRECONDITION,"The client has already been terminated.");return r._firestoreClient||mp(r),r._firestoreClient}function mp(r){const e=r._freezeSettings(),t=(function(s,i,o,c){return new BI(s,i,o,c.host,c.ssl,c.experimentalForceLongPolling,c.experimentalAutoDetectLongPolling,up(c.experimentalLongPollingOptions),c.useFetchStreams,c.isUsingEmulator)})(r._databaseId,r._app?.options.appId||"",r._persistenceKey,e);r._componentsProvider||e.localCache?._offlineComponentProvider&&e.localCache?._onlineComponentProvider&&(r._componentsProvider={_offline:e.localCache._offlineComponentProvider,_online:e.localCache._onlineComponentProvider}),r._firestoreClient=new nT(r._authCredentials,r._appCheckCredentials,r._queue,t,r._componentsProvider&&(function(s){const i=s?._online.build();return{_offline:s?._offline.build(i),_online:i}})(r._componentsProvider))}function yT(r,e){nt("enableIndexedDbPersistence() will be deprecated in the future, you can use `FirestoreSettings.cache` instead.");const t=r._freezeSettings();return pp(r,In.provider,{build:n=>new Xl(n,t.cacheSizeBytes,e?.forceOwnership)}),Promise.resolve()}async function wT(r){nt("enableMultiTabIndexedDbPersistence() will be deprecated in the future, you can use `FirestoreSettings.cache` instead.");const e=r._freezeSettings();pp(r,In.provider,{build:t=>new rp(t,e.cacheSizeBytes)})}function pp(r,e,t){if((r=Y(r,le))._firestoreClient||r._terminated)throw new V(x.FAILED_PRECONDITION,"Firestore has already been started and persistence can no longer be enabled. You can only enable persistence before calling any other methods on a Firestore object.");if(r._componentsProvider||r._getSettings().localCache)throw new V(x.FAILED_PRECONDITION,"SDK cache is already specified.");r._componentsProvider={_online:e,_offline:t},mp(r)}function IT(r){if(r._initialized&&!r._terminated)throw new V(x.FAILED_PRECONDITION,"Persistence can only be cleared before a Firestore instance is initialized or after it is terminated.");const e=new Ve;return r._queue.enqueueAndForgetEvenWhileRestricted((async()=>{try{await(async function(n){if(!wt.v())return Promise.resolve();const s=n+Pm;await wt.delete(s)})(kl(r._databaseId,r._persistenceKey)),e.resolve()}catch(t){e.reject(t)}})),e.promise}function bT(r){return(function(t){const n=new Ve;return t.asyncQueue.enqueueAndForget((async()=>Bv(await eu(t),n))),n.promise})(we(r=Y(r,le)))}function vT(r){return rT(we(r=Y(r,le)))}function TT(r){return sT(we(r=Y(r,le)))}function ET(r){return Nw(r.app,"firestore",r._databaseId.database),r._delete()}function Zc(r,e){const t=we(r=Y(r,le)),n=new fp;return lT(t,r._databaseId,e,n),n}function _p(r,e){return uT(we(r=Y(r,le)),e).then((t=>t?new xe(r,null,t.query):null))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class es{constructor(e="count",t){this._internalFieldPath=t,this.type="AggregateField",this.aggregateType=e}}class yp{constructor(e,t,n){this._userDataWriter=t,this._data=n,this.type="AggregateQuerySnapshot",this.query=e}data(){return this._userDataWriter.convertObjectMap(this._data)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class We{constructor(e){this._byteString=e}static fromBase64String(e){try{return new We(Ie.fromBase64String(e))}catch(t){throw new V(x.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new We(Ie.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:We._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(or(e,We._jsonSchema))return We.fromBase64String(e.bytes)}}We._jsonSchemaVersion="firestore/bytes/1.0",We._jsonSchema={type:Se("string",We._jsonSchemaVersion),bytes:Se("string")};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rn{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new V(x.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new ge(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}function AT(){return new Rn(Pc)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pn{constructor(e){this._methodName=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ht{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new V(x.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new V(x.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return K(this._lat,e._lat)||K(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:ht._jsonSchemaVersion}}static fromJSON(e){if(or(e,ht._jsonSchema))return new ht(e.latitude,e.longitude)}}ht._jsonSchemaVersion="firestore/geoPoint/1.0",ht._jsonSchema={type:Se("string",ht._jsonSchemaVersion),latitude:Se("number"),longitude:Se("number")};/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ot{constructor(e){this._values=(e||[]).map((t=>t))}toArray(){return this._values.map((e=>e))}isEqual(e){return(function(n,s){if(n.length!==s.length)return!1;for(let i=0;i<n.length;++i)if(n[i]!==s[i])return!1;return!0})(this._values,e._values)}toJSON(){return{type:ot._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(or(e,ot._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every((t=>typeof t=="number")))return new ot(e.vectorValues);throw new V(x.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}ot._jsonSchemaVersion="firestore/vectorValue/1.0",ot._jsonSchema={type:Se("string",ot._jsonSchemaVersion),vectorValues:Se("object")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ST=/^__.*__$/;class RT{constructor(e,t,n){this.data=e,this.fieldMask=t,this.fieldTransforms=n}toMutation(e,t){return this.fieldMask!==null?new qt(e,this.data,this.fieldMask,t,this.fieldTransforms):new ss(e,this.data,t,this.fieldTransforms)}}class wp{constructor(e,t,n){this.data=e,this.fieldMask=t,this.fieldTransforms=n}toMutation(e,t){return new qt(e,this.data,this.fieldMask,t,this.fieldTransforms)}}function Ip(r){switch(r){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw q(40011,{Ac:r})}}class Aa{constructor(e,t,n,s,i,o){this.settings=e,this.databaseId=t,this.serializer=n,this.ignoreUndefinedProperties=s,i===void 0&&this.Rc(),this.fieldTransforms=i||[],this.fieldMask=o||[]}get path(){return this.settings.path}get Ac(){return this.settings.Ac}Vc(e){return new Aa({...this.settings,...e},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}mc(e){const t=this.path?.child(e),n=this.Vc({path:t,fc:!1});return n.gc(e),n}yc(e){const t=this.path?.child(e),n=this.Vc({path:t,fc:!1});return n.Rc(),n}wc(e){return this.Vc({path:void 0,fc:!0})}Sc(e){return Qo(e,this.settings.methodName,this.settings.bc||!1,this.path,this.settings.Dc)}contains(e){return this.fieldMask.find((t=>e.isPrefixOf(t)))!==void 0||this.fieldTransforms.find((t=>e.isPrefixOf(t.field)))!==void 0}Rc(){if(this.path)for(let e=0;e<this.path.length;e++)this.gc(this.path.get(e))}gc(e){if(e.length===0)throw this.Sc("Document fields must not be empty");if(Ip(this.Ac)&&ST.test(e))throw this.Sc('Document fields cannot begin and end with "__"')}}class PT{constructor(e,t,n){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=n||ar(e)}Cc(e,t,n,s=!1){return new Aa({Ac:e,methodName:t,Dc:n,path:ge.emptyPath(),fc:!1,bc:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function cr(r){const e=r._freezeSettings(),t=ar(r._databaseId);return new PT(r._databaseId,!!e.ignoreUndefinedProperties,t)}function Sa(r,e,t,n,s,i={}){const o=r.Cc(i.merge||i.mergeFields?2:0,e,t,s);cu("Data must be an object, but it was:",o,n);const c=Tp(n,o);let l,u;if(i.merge)l=new Je(o.fieldMask),u=o.fieldTransforms;else if(i.mergeFields){const f=[];for(const g of i.mergeFields){const p=hi(e,g,t);if(!o.contains(p))throw new V(x.INVALID_ARGUMENT,`Field '${p}' is specified in your field mask but missing from your input data.`);Ap(f,p)||f.push(p)}l=new Je(f),u=o.fieldTransforms.filter((g=>l.covers(g.field)))}else l=null,u=o.fieldTransforms;return new RT(new Oe(c),l,u)}class Di extends Pn{_toFieldTransform(e){if(e.Ac!==2)throw e.Ac===1?e.Sc(`${this._methodName}() can only appear at the top level of your update data`):e.Sc(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof Di}}function bp(r,e,t){return new Aa({Ac:3,Dc:e.settings.Dc,methodName:r._methodName,fc:t},e.databaseId,e.serializer,e.ignoreUndefinedProperties)}class nu extends Pn{_toFieldTransform(e){return new Si(e.path,new Gr)}isEqual(e){return e instanceof nu}}class ru extends Pn{constructor(e,t){super(e),this.vc=t}_toFieldTransform(e){const t=bp(this,e,!0),n=this.vc.map((i=>lr(i,t))),s=new Yn(n);return new Si(e.path,s)}isEqual(e){return e instanceof ru&&dt(this.vc,e.vc)}}class su extends Pn{constructor(e,t){super(e),this.vc=t}_toFieldTransform(e){const t=bp(this,e,!0),n=this.vc.map((i=>lr(i,t))),s=new Xn(n);return new Si(e.path,s)}isEqual(e){return e instanceof su&&dt(this.vc,e.vc)}}class iu extends Pn{constructor(e,t){super(e),this.Fc=t}_toFieldTransform(e){const t=new Kr(e.serializer,zg(e.serializer,this.Fc));return new Si(e.path,t)}isEqual(e){return e instanceof iu&&this.Fc===e.Fc}}function ou(r,e,t,n){const s=r.Cc(1,e,t);cu("Data must be an object, but it was:",s,n);const i=[],o=Oe.empty();En(n,((l,u)=>{const f=Ra(e,l,t);u=pe(u);const g=s.yc(f);if(u instanceof Di)i.push(f);else{const p=lr(u,g);p!=null&&(i.push(f),o.set(f,p))}}));const c=new Je(i);return new wp(o,c,s.fieldTransforms)}function au(r,e,t,n,s,i){const o=r.Cc(1,e,t),c=[hi(e,n,t)],l=[s];if(i.length%2!=0)throw new V(x.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let p=0;p<i.length;p+=2)c.push(hi(e,i[p])),l.push(i[p+1]);const u=[],f=Oe.empty();for(let p=c.length-1;p>=0;--p)if(!Ap(u,c[p])){const E=c[p];let A=l[p];A=pe(A);const D=o.yc(E);if(A instanceof Di)u.push(E);else{const k=lr(A,D);k!=null&&(u.push(E),f.set(E,k))}}const g=new Je(u);return new wp(f,g,o.fieldTransforms)}function vp(r,e,t,n=!1){return lr(t,r.Cc(n?4:3,e))}function lr(r,e){if(Ep(r=pe(r)))return cu("Unsupported field value:",e,r),Tp(r,e);if(r instanceof Pn)return(function(n,s){if(!Ip(s.Ac))throw s.Sc(`${n._methodName}() can only be used with update() and set()`);if(!s.path)throw s.Sc(`${n._methodName}() is not currently supported inside arrays`);const i=n._toFieldTransform(s);i&&s.fieldTransforms.push(i)})(r,e),null;if(r===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),r instanceof Array){if(e.settings.fc&&e.Ac!==4)throw e.Sc("Nested arrays are not supported");return(function(n,s){const i=[];let o=0;for(const c of n){let l=lr(c,s.wc(o));l==null&&(l={nullValue:"NULL_VALUE"}),i.push(l),o++}return{arrayValue:{values:i}}})(r,e)}return(function(n,s){if((n=pe(n))===null)return{nullValue:"NULL_VALUE"};if(typeof n=="number")return zg(s.serializer,n);if(typeof n=="boolean")return{booleanValue:n};if(typeof n=="string")return{stringValue:n};if(n instanceof Date){const i=se.fromDate(n);return{timestampValue:Hr(s.serializer,i)}}if(n instanceof se){const i=new se(n.seconds,1e3*Math.floor(n.nanoseconds/1e3));return{timestampValue:Hr(s.serializer,i)}}if(n instanceof ht)return{geoPointValue:{latitude:n.latitude,longitude:n.longitude}};if(n instanceof We)return{bytesValue:rm(s.serializer,n._byteString)};if(n instanceof oe){const i=s.databaseId,o=n.firestore._databaseId;if(!o.isEqual(i))throw s.Sc(`Document reference is for database ${o.projectId}/${o.database} but should be for database ${i.projectId}/${i.database}`);return{referenceValue:Sl(n.firestore._databaseId||s.databaseId,n._key.path)}}if(n instanceof ot)return(function(o,c){return{mapValue:{fields:{[ml]:{stringValue:pl},[qr]:{arrayValue:{values:o.toArray().map((u=>{if(typeof u!="number")throw c.Sc("VectorValues must only contain numeric values.");return Il(c.serializer,u)}))}}}}}})(n,s);throw s.Sc(`Unsupported field value: ${ia(n)}`)})(r,e)}function Tp(r,e){const t={};return _g(r)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):En(r,((n,s)=>{const i=lr(s,e.mc(n));i!=null&&(t[n]=i)})),{mapValue:{fields:t}}}function Ep(r){return!(typeof r!="object"||r===null||r instanceof Array||r instanceof Date||r instanceof se||r instanceof ht||r instanceof We||r instanceof oe||r instanceof Pn||r instanceof ot)}function cu(r,e,t){if(!Ep(t)||!Xf(t)){const n=ia(t);throw n==="an object"?e.Sc(r+" a custom object"):e.Sc(r+" "+n)}}function hi(r,e,t){if((e=pe(e))instanceof Rn)return e._internalPath;if(typeof e=="string")return Ra(r,e);throw Qo("Field path arguments must be of type string or ",r,!1,void 0,t)}const xT=new RegExp("[~\\*/\\[\\]]");function Ra(r,e,t){if(e.search(xT)>=0)throw Qo(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,r,!1,void 0,t);try{return new Rn(...e.split("."))._internalPath}catch{throw Qo(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,r,!1,void 0,t)}}function Qo(r,e,t,n,s){const i=n&&!n.isEmpty(),o=s!==void 0;let c=`Function ${e}() called with invalid data`;t&&(c+=" (via `toFirestore()`)"),c+=". ";let l="";return(i||o)&&(l+=" (found",i&&(l+=` in field ${n}`),o&&(l+=` in document ${s}`),l+=")"),new V(x.INVALID_ARGUMENT,c+r+l)}function Ap(r,e){return r.some((t=>t.isEqual(e)))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class di{constructor(e,t,n,s,i){this._firestore=e,this._userDataWriter=t,this._key=n,this._document=s,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new oe(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new CT(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const t=this._document.data.field(Pa("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}}class CT extends di{data(){return super.data()}}function Pa(r,e){return typeof e=="string"?Ra(r,e):e instanceof Rn?e._internalPath:e._delegate._internalPath}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Sp(r){if(r.limitType==="L"&&r.explicitOrderBy.length===0)throw new V(x.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class lu{}class hs extends lu{}function xr(r,e,...t){let n=[];e instanceof lu&&n.push(e),n=n.concat(t),(function(i){const o=i.filter((l=>l instanceof ur)).length,c=i.filter((l=>l instanceof ds)).length;if(o>1||o>0&&c>0)throw new V(x.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")})(n);for(const s of n)r=s._apply(r);return r}class ds extends hs{constructor(e,t,n){super(),this._field=e,this._op=t,this._value=n,this.type="where"}static _create(e,t,n){return new ds(e,t,n)}_apply(e){const t=this._parse(e);return xp(e._query,t),new xe(e.firestore,e.converter,Uc(e._query,t))}_parse(e){const t=cr(e.firestore);return(function(i,o,c,l,u,f,g){let p;if(u.isKeyField()){if(f==="array-contains"||f==="array-contains-any")throw new V(x.INVALID_ARGUMENT,`Invalid Query. You can't perform '${f}' queries on documentId().`);if(f==="in"||f==="not-in"){tf(g,f);const A=[];for(const D of g)A.push(ef(l,i,D));p={arrayValue:{values:A}}}else p=ef(l,i,g)}else f!=="in"&&f!=="not-in"&&f!=="array-contains-any"||tf(g,f),p=vp(c,o,g,f==="in"||f==="not-in");return Z.create(u,f,p)})(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value)}}function el(r,e,t){const n=e,s=Pa("where",r);return ds._create(s,n,t)}class ur extends lu{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new ur(e,t)}_parse(e){const t=this._queryConstraints.map((n=>n._parse(e))).filter((n=>n.getFilters().length>0));return t.length===1?t[0]:ie.create(t,this._getOperator())}_apply(e){const t=this._parse(e);return t.getFilters().length===0?e:((function(s,i){let o=s;const c=i.getFlattenedFilters();for(const l of c)xp(o,l),o=Uc(o,l)})(e._query,t),new xe(e.firestore,e.converter,Uc(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}function DT(...r){return r.forEach((e=>Cp("or",e))),ur._create("or",r)}function kT(...r){return r.forEach((e=>Cp("and",e))),ur._create("and",r)}class xa extends hs{constructor(e,t){super(),this._field=e,this._direction=t,this.type="orderBy"}static _create(e,t){return new xa(e,t)}_apply(e){const t=(function(s,i,o){if(s.startAt!==null)throw new V(x.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(s.endAt!==null)throw new V(x.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new ci(i,o)})(e._query,this._field,this._direction);return new xe(e.firestore,e.converter,(function(s,i){const o=s.explicitOrderBy.concat([i]);return new Bt(s.path,s.collectionGroup,o,s.filters.slice(),s.limit,s.limitType,s.startAt,s.endAt)})(e._query,t))}}function Rp(r,e="asc"){const t=e,n=Pa("orderBy",r);return xa._create(n,t)}class ki extends hs{constructor(e,t,n){super(),this.type=e,this._limit=t,this._limitType=n}static _create(e,t,n){return new ki(e,t,n)}_apply(e){return new xe(e.firestore,e.converter,Bo(e._query,this._limit,this._limitType))}}function VT(r){return Zf("limit",r),ki._create("limit",r,"F")}function NT(r){return Zf("limitToLast",r),ki._create("limitToLast",r,"L")}class Vi extends hs{constructor(e,t,n){super(),this.type=e,this._docOrFields=t,this._inclusive=n}static _create(e,t,n){return new Vi(e,t,n)}_apply(e){const t=Pp(e,this.type,this._docOrFields,this._inclusive);return new xe(e.firestore,e.converter,(function(s,i){return new Bt(s.path,s.collectionGroup,s.explicitOrderBy.slice(),s.filters.slice(),s.limit,s.limitType,i,s.endAt)})(e._query,t))}}function MT(...r){return Vi._create("startAt",r,!0)}function OT(...r){return Vi._create("startAfter",r,!1)}class Ni extends hs{constructor(e,t,n){super(),this.type=e,this._docOrFields=t,this._inclusive=n}static _create(e,t,n){return new Ni(e,t,n)}_apply(e){const t=Pp(e,this.type,this._docOrFields,this._inclusive);return new xe(e.firestore,e.converter,(function(s,i){return new Bt(s.path,s.collectionGroup,s.explicitOrderBy.slice(),s.filters.slice(),s.limit,s.limitType,s.startAt,i)})(e._query,t))}}function LT(...r){return Ni._create("endBefore",r,!1)}function FT(...r){return Ni._create("endAt",r,!0)}function Pp(r,e,t,n){if(t[0]=pe(t[0]),t[0]instanceof di)return(function(i,o,c,l,u){if(!l)throw new V(x.NOT_FOUND,`Can't use a DocumentSnapshot that doesn't exist for ${c}().`);const f=[];for(const g of Rr(i))if(g.field.isKeyField())f.push(Qn(o,l.key));else{const p=l.data.field(g.field);if(ua(p))throw new V(x.INVALID_ARGUMENT,'Invalid query. You are trying to start or end a query using a document for which the field "'+g.field+'" is an uncommitted server timestamp. (Since the value of this field is unknown, you cannot start/end a query with it.)');if(p===null){const E=g.field.canonicalString();throw new V(x.INVALID_ARGUMENT,`Invalid query. You are trying to start or end a query using a document for which the field '${E}' (used as the orderBy) does not exist.`)}f.push(p)}return new yn(f,u)})(r._query,r.firestore._databaseId,e,t[0]._document,n);{const s=cr(r.firestore);return(function(o,c,l,u,f,g){const p=o.explicitOrderBy;if(f.length>p.length)throw new V(x.INVALID_ARGUMENT,`Too many arguments provided to ${u}(). The number of arguments must be less than or equal to the number of orderBy() clauses`);const E=[];for(let A=0;A<f.length;A++){const D=f[A];if(p[A].field.isKeyField()){if(typeof D!="string")throw new V(x.INVALID_ARGUMENT,`Invalid query. Expected a string for document ID in ${u}(), but got a ${typeof D}`);if(!yl(o)&&D.indexOf("/")!==-1)throw new V(x.INVALID_ARGUMENT,`Invalid query. When querying a collection and ordering by documentId(), the value passed to ${u}() must be a plain document ID, but '${D}' contains a slash.`);const k=o.path.child(J.fromString(D));if(!M.isDocumentKey(k))throw new V(x.INVALID_ARGUMENT,`Invalid query. When querying a collection group and ordering by documentId(), the value passed to ${u}() must result in a valid document path, but '${k}' is not because it contains an odd number of segments.`);const B=new M(k);E.push(Qn(c,B))}else{const k=vp(l,u,D);E.push(k)}}return new yn(E,g)})(r._query,r.firestore._databaseId,s,e,t,n)}}function ef(r,e,t){if(typeof(t=pe(t))=="string"){if(t==="")throw new V(x.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!yl(e)&&t.indexOf("/")!==-1)throw new V(x.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${t}' contains a '/' character.`);const n=e.path.child(J.fromString(t));if(!M.isDocumentKey(n))throw new V(x.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${n}' is not because it has an odd number of segments (${n.length}).`);return Qn(r,new M(n))}if(t instanceof oe)return Qn(r,t._key);throw new V(x.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${ia(t)}.`)}function tf(r,e){if(!Array.isArray(r)||r.length===0)throw new V(x.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function xp(r,e){const t=(function(s,i){for(const o of s)for(const c of o.getFlattenedFilters())if(i.indexOf(c.op)>=0)return c.op;return null})(r.filters,(function(s){switch(s){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}})(e.op));if(t!==null)throw t===e.op?new V(x.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new V(x.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${t.toString()}' filters.`)}function Cp(r,e){if(!(e instanceof ds||e instanceof ur))throw new V(x.INVALID_ARGUMENT,`Function ${r}() requires AppliableConstraints created with a call to 'where(...)', 'or(...)', or 'and(...)'.`)}class uu{convertValue(e,t="none"){switch(pn(e)){case 0:return null;case 1:return e.booleanValue;case 2:return _e(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(Mt(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw q(62114,{value:e})}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const n={};return En(e,((s,i)=>{n[s]=this.convertValue(i,t)})),n}convertVectorValue(e){const t=e.fields?.[qr].arrayValue?.values?.map((n=>_e(n.doubleValue)));return new ot(t)}convertGeoPoint(e){return new ht(_e(e.latitude),_e(e.longitude))}convertArray(e,t){return(e.values||[]).map((n=>this.convertValue(n,t)))}convertServerTimestamp(e,t){switch(t){case"previous":const n=ha(e);return n==null?null:this.convertValue(n,t);case"estimate":return this.convertTimestamp(si(e));default:return null}}convertTimestamp(e){const t=Nt(e);return new se(t.seconds,t.nanos)}convertDocumentKey(e,t){const n=J.fromString(e);z(fm(n),9688,{name:e});const s=new mn(n.get(1),n.get(3)),i=new M(n.popFirst(5));return s.isEqual(t)||ve(`Document ${i} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ca(r,e,t){let n;return n=r?t&&(t.merge||t.mergeFields)?r.toFirestore(e,t):r.toFirestore(e):e,n}class hu extends uu{constructor(e){super(),this.firestore=e}convertBytes(e){return new We(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new oe(this.firestore,null,t)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function UT(r){return new es("sum",hi("sum",r))}function BT(r){return new es("avg",hi("average",r))}function Dp(){return new es("count")}function $T(r,e){return r instanceof es&&e instanceof es&&r.aggregateType===e.aggregateType&&r._internalFieldPath?.canonicalString()===e._internalFieldPath?.canonicalString()}function qT(r,e){return tu(r.query,e.query)&&dt(r.data(),e.data())}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kp="NOT SUPPORTED";class Pt{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class Xe extends di{constructor(e,t,n,s,i,o){super(e,t,n,s,o),this._firestore=e,this._firestoreImpl=e,this.metadata=i}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new Ys(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const n=this._document.data.field(Pa("DocumentSnapshot.get",e));if(n!==null)return this._userDataWriter.convertValue(n,t.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new V(x.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e=this._document,t={};return t.type=Xe._jsonSchemaVersion,t.bundle="",t.bundleSource="DocumentSnapshot",t.bundleName=this._key.toString(),!e||!e.isValidDocument()||!e.isFoundDocument()?t:(this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields,"previous"),t.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),t)}}function jT(r,e,t){if(or(e,Xe._jsonSchema)){if(e.bundle===kp)throw new V(x.INVALID_ARGUMENT,"The provided JSON object was created in a client environment, which is not supported.");const n=ar(r._databaseId),s=lp(e.bundle,n),i=s.Wu(),o=new Gl(s.getMetadata(),n);for(const f of i)o.Ga(f);const c=o.documents;if(c.length!==1)throw new V(x.INVALID_ARGUMENT,`Expected bundle data to contain 1 document, but it contains ${c.length} documents.`);const l=ma(n,c[0].document),u=new M(J.fromString(e.bundleName));return new Xe(r,new hu(r),u,l,new Pt(!1,!1),t||null)}}Xe._jsonSchemaVersion="firestore/documentSnapshot/1.0",Xe._jsonSchema={type:Se("string",Xe._jsonSchemaVersion),bundleSource:Se("string","DocumentSnapshot"),bundleName:Se("string"),bundle:Se("string")};class Ys extends Xe{data(e={}){return super.data(e)}}class Ze{constructor(e,t,n,s){this._firestore=e,this._userDataWriter=t,this._snapshot=s,this.metadata=new Pt(s.hasPendingWrites,s.fromCache),this.query=n}get docs(){const e=[];return this.forEach((t=>e.push(t))),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach((n=>{e.call(t,new Ys(this._firestore,this._userDataWriter,n.key,n,new Pt(this._snapshot.mutatedKeys.has(n.key),this._snapshot.fromCache),this.query.converter))}))}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new V(x.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=(function(s,i){if(s._snapshot.oldDocs.isEmpty()){let o=0;return s._snapshot.docChanges.map((c=>{const l=new Ys(s._firestore,s._userDataWriter,c.doc.key,c.doc,new Pt(s._snapshot.mutatedKeys.has(c.doc.key),s._snapshot.fromCache),s.query.converter);return c.doc,{type:"added",doc:l,oldIndex:-1,newIndex:o++}}))}{let o=s._snapshot.oldDocs;return s._snapshot.docChanges.filter((c=>i||c.type!==3)).map((c=>{const l=new Ys(s._firestore,s._userDataWriter,c.doc.key,c.doc,new Pt(s._snapshot.mutatedKeys.has(c.doc.key),s._snapshot.fromCache),s.query.converter);let u=-1,f=-1;return c.type!==0&&(u=o.indexOf(c.doc.key),o=o.delete(c.doc.key)),c.type!==1&&(o=o.add(c.doc),f=o.indexOf(c.doc.key)),{type:GT(c.type),doc:l,oldIndex:u,newIndex:f}}))}})(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new V(x.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e={};e.type=Ze._jsonSchemaVersion,e.bundleSource="QuerySnapshot",e.bundleName=sa.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const t=[],n=[],s=[];return this.docs.forEach((i=>{i._document!==null&&(t.push(i._document),n.push(this._userDataWriter.convertObjectMap(i._document.data.value.mapValue.fields,"previous")),s.push(i.ref.path))})),e.bundle=(this._firestore,this.query._query,e.bundleName,"NOT SUPPORTED"),e}}function zT(r,e,t){if(or(e,Ze._jsonSchema)){if(e.bundle===kp)throw new V(x.INVALID_ARGUMENT,"The provided JSON object was created in a client environment, which is not supported.");const n=ar(r._databaseId),s=lp(e.bundle,n),i=s.Wu(),o=new Gl(s.getMetadata(),n);for(const p of i)o.Ga(p);if(o.queries.length!==1)throw new V(x.INVALID_ARGUMENT,`Snapshot data expected 1 query but found ${o.queries.length} queries.`);const c=_a(o.queries[0].bundledQuery),l=o.documents;let u=new Kn;l.map((p=>{const E=ma(n,p.document);u=u.add(E)}));const f=rr.fromInitialDocuments(c,u,W(),!1,!1),g=new xe(r,t||null,c);return new Ze(r,new hu(r),g,f)}}function GT(r){switch(r){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return q(61501,{type:r})}}function KT(r,e){return r instanceof Xe&&e instanceof Xe?r._firestore===e._firestore&&r._key.isEqual(e._key)&&(r._document===null?e._document===null:r._document.isEqual(e._document))&&r._converter===e._converter:r instanceof Ze&&e instanceof Ze&&r._firestore===e._firestore&&tu(r.query,e.query)&&r.metadata.isEqual(e.metadata)&&r._snapshot.isEqual(e._snapshot)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zt(r){r=Y(r,oe);const e=Y(r.firestore,le);return ap(we(e),r._key).then((t=>du(e,r,t)))}Ze._jsonSchemaVersion="firestore/querySnapshot/1.0",Ze._jsonSchema={type:Se("string",Ze._jsonSchemaVersion),bundleSource:Se("string","QuerySnapshot"),bundleName:Se("string"),bundle:Se("string")};class xn extends uu{constructor(e){super(),this.firestore=e}convertBytes(e){return new We(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new oe(this.firestore,null,t)}}function HT(r){r=Y(r,oe);const e=Y(r.firestore,le),t=we(e),n=new xn(e);return iT(t,r._key).then((s=>new Xe(e,n,r._key,s,new Pt(s!==null&&s.hasLocalMutations,!0),r.converter)))}function WT(r){r=Y(r,oe);const e=Y(r.firestore,le);return ap(we(e),r._key,{source:"server"}).then((t=>du(e,r,t)))}function fi(r){r=Y(r,xe);const e=Y(r.firestore,le),t=we(e),n=new xn(e);return Sp(r._query),cp(t,r._query).then((s=>new Ze(e,n,r,s)))}function QT(r){r=Y(r,xe);const e=Y(r.firestore,le),t=we(e),n=new xn(e);return oT(t,r._query).then((s=>new Ze(e,n,r,s)))}function JT(r){r=Y(r,xe);const e=Y(r.firestore,le),t=we(e),n=new xn(e);return cp(t,r._query,{source:"server"}).then((s=>new Ze(e,n,r,s)))}function hr(r,e,t){r=Y(r,oe);const n=Y(r.firestore,le),s=Ca(r.converter,e,t);return gs(n,[Sa(cr(n),"setDoc",r._key,s,r.converter!==null,t).toMutation(r._key,ye.none())])}function Gt(r,e,t,...n){r=Y(r,oe);const s=Y(r.firestore,le),i=cr(s);let o;return o=typeof(e=pe(e))=="string"||e instanceof Rn?au(i,"updateDoc",r._key,e,t,n):ou(i,"updateDoc",r._key,e),gs(s,[o.toMutation(r._key,ye.exists(!0))])}function fs(r){return gs(Y(r.firestore,le),[new is(r._key,ye.none())])}function Vp(r,e){const t=Y(r.firestore,le),n=me(r),s=Ca(r.converter,e);return gs(t,[Sa(cr(r.firestore),"addDoc",n._key,s,r.converter!==null,{}).toMutation(n._key,ye.exists(!1))]).then((()=>n))}function jn(r,...e){r=pe(r);let t={includeMetadataChanges:!1,source:"default"},n=0;typeof e[n]!="object"||Pr(e[n])||(t=e[n++]);const s={includeMetadataChanges:t.includeMetadataChanges,source:t.source};if(Pr(e[n])){const l=e[n];e[n]=l.next?.bind(l),e[n+1]=l.error?.bind(l),e[n+2]=l.complete?.bind(l)}let i,o,c;if(r instanceof oe)o=Y(r.firestore,le),c=rs(r._key.path),i={next:l=>{e[n]&&e[n](du(o,r,l))},error:e[n+1],complete:e[n+2]};else{const l=Y(r,xe);o=Y(l.firestore,le),c=l._query;const u=new xn(o);i={next:f=>{e[n]&&e[n](new Ze(o,u,l,f))},error:e[n+1],complete:e[n+2]},Sp(r._query)}return(function(u,f,g,p){const E=new Ta(p),A=new zl(f,E,g);return u.asyncQueue.enqueueAndForget((async()=>$l(await Zr(u),A))),()=>{E.Nu(),u.asyncQueue.enqueueAndForget((async()=>ql(await Zr(u),A)))}})(we(o),c,s,i)}function YT(r,e,...t){const n=pe(r),s=(function(l){const u={bundle:"",bundleName:"",bundleSource:""},f=["bundle","bundleName","bundleSource"];for(const g of f){if(!(g in l)){u.error=`snapshotJson missing required field: ${g}`;break}const p=l[g];if(typeof p!="string"){u.error=`snapshotJson field '${g}' must be a string.`;break}if(p.length===0){u.error=`snapshotJson field '${g}' cannot be an empty string.`;break}g==="bundle"?u.bundle=p:g==="bundleName"?u.bundleName=p:g==="bundleSource"&&(u.bundleSource=p)}return u})(e);if(s.error)throw new V(x.INVALID_ARGUMENT,s.error);let i,o=0;if(typeof t[o]!="object"||Pr(t[o])||(i=t[o++]),s.bundleSource==="QuerySnapshot"){let c=null;if(typeof t[o]=="object"&&Pr(t[o])){const l=t[o++];c={next:l.next,error:l.error,complete:l.complete}}else c={next:t[o++],error:t[o++],complete:t[o++]};return(function(u,f,g,p,E){let A,D=!1;return Zc(u,f.bundle).then((()=>_p(u,f.bundleName))).then((B=>{B&&!D&&(E&&B.withConverter(E),A=jn(B,g||{},p))})).catch((B=>(p.error&&p.error(B),()=>{}))),()=>{D||(D=!0,A&&A())}})(n,s,i,c,t[o])}if(s.bundleSource==="DocumentSnapshot"){let c=null;if(typeof t[o]=="object"&&Pr(t[o])){const l=t[o++];c={next:l.next,error:l.error,complete:l.complete}}else c={next:t[o++],error:t[o++],complete:t[o++]};return(function(u,f,g,p,E){let A,D=!1;return Zc(u,f.bundle).then((()=>{if(!D){const B=new oe(u,E||null,M.fromPath(f.bundleName));A=jn(B,g||{},p)}})).catch((B=>(p.error&&p.error(B),()=>{}))),()=>{D||(D=!0,A&&A())}})(n,s,i,c,t[o])}throw new V(x.INVALID_ARGUMENT,`unsupported bundle source: ${s.bundleSource}`)}function XT(r,e){return cT(we(r=Y(r,le)),Pr(e)?e:{next:e})}function gs(r,e){return(function(n,s){const i=new Ve;return n.asyncQueue.enqueueAndForget((async()=>Ov(await eu(n),s,i))),i.promise})(we(r),e)}function du(r,e,t){const n=t.docs.get(e._key),s=new xn(r);return new Xe(r,s,e._key,n,new Pt(t.hasPendingWrites,t.fromCache),e.converter)}function ZT(r){return Np(r,{count:Dp()})}function Np(r,e){const t=Y(r.firestore,le),n=we(t),s=pg(e,((i,o)=>new Yg(o,i.aggregateType,i._internalFieldPath)));return aT(n,r._query,s).then((i=>(function(c,l,u){const f=new xn(c);return new yp(l,f,u)})(t,r,i)))}class eE{constructor(e){this.kind="memory",this._onlineComponentProvider=In.provider,this._offlineComponentProvider=e?.garbageCollector?e.garbageCollector._offlineComponentProvider:{build:()=>new Yl(void 0)}}toJSON(){return{kind:this.kind}}}class tE{constructor(e){let t;this.kind="persistent",e?.tabManager?(e.tabManager._initialize(e),t=e.tabManager):(t=Mp(void 0),t._initialize(e)),this._onlineComponentProvider=t._onlineComponentProvider,this._offlineComponentProvider=t._offlineComponentProvider}toJSON(){return{kind:this.kind}}}class nE{constructor(){this.kind="memoryEager",this._offlineComponentProvider=Xr.provider}toJSON(){return{kind:this.kind}}}class rE{constructor(e){this.kind="memoryLru",this._offlineComponentProvider={build:()=>new Yl(e)}}toJSON(){return{kind:this.kind}}}function sE(){return new nE}function iE(r){return new rE(r?.cacheSizeBytes)}function oE(r){return new eE(r)}function aE(r){return new tE(r)}class cE{constructor(e){this.forceOwnership=e,this.kind="persistentSingleTab"}toJSON(){return{kind:this.kind}}_initialize(e){this._onlineComponentProvider=In.provider,this._offlineComponentProvider={build:t=>new Xl(t,e?.cacheSizeBytes,this.forceOwnership)}}}class lE{constructor(){this.kind="PersistentMultipleTab"}toJSON(){return{kind:this.kind}}_initialize(e){this._onlineComponentProvider=In.provider,this._offlineComponentProvider={build:t=>new rp(t,e?.cacheSizeBytes)}}}function Mp(r){return new cE(r?.forceOwnership)}function uE(){return new lE}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hE={maxAttempts:5};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Op{constructor(e,t){this._firestore=e,this._commitHandler=t,this._mutations=[],this._committed=!1,this._dataReader=cr(e)}set(e,t,n){this._verifyNotCommitted();const s=cn(e,this._firestore),i=Ca(s.converter,t,n),o=Sa(this._dataReader,"WriteBatch.set",s._key,i,s.converter!==null,n);return this._mutations.push(o.toMutation(s._key,ye.none())),this}update(e,t,n,...s){this._verifyNotCommitted();const i=cn(e,this._firestore);let o;return o=typeof(t=pe(t))=="string"||t instanceof Rn?au(this._dataReader,"WriteBatch.update",i._key,t,n,s):ou(this._dataReader,"WriteBatch.update",i._key,t),this._mutations.push(o.toMutation(i._key,ye.exists(!0))),this}delete(e){this._verifyNotCommitted();const t=cn(e,this._firestore);return this._mutations=this._mutations.concat(new is(t._key,ye.none())),this}commit(){return this._verifyNotCommitted(),this._committed=!0,this._mutations.length>0?this._commitHandler(this._mutations):Promise.resolve()}_verifyNotCommitted(){if(this._committed)throw new V(x.FAILED_PRECONDITION,"A write batch can no longer be used after commit() has been called.")}}function cn(r,e){if((r=pe(r)).firestore!==e)throw new V(x.INVALID_ARGUMENT,"Provided document reference is from a different Firestore instance.");return r}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dE{constructor(e,t){this._firestore=e,this._transaction=t,this._dataReader=cr(e)}get(e){const t=cn(e,this._firestore),n=new hu(this._firestore);return this._transaction.lookup([t._key]).then((s=>{if(!s||s.length!==1)return q(24041);const i=s[0];if(i.isFoundDocument())return new di(this._firestore,n,i.key,i,t.converter);if(i.isNoDocument())return new di(this._firestore,n,t._key,null,t.converter);throw q(18433,{doc:i})}))}set(e,t,n){const s=cn(e,this._firestore),i=Ca(s.converter,t,n),o=Sa(this._dataReader,"Transaction.set",s._key,i,s.converter!==null,n);return this._transaction.set(s._key,o),this}update(e,t,n,...s){const i=cn(e,this._firestore);let o;return o=typeof(t=pe(t))=="string"||t instanceof Rn?au(this._dataReader,"Transaction.update",i._key,t,n,s):ou(this._dataReader,"Transaction.update",i._key,t),this._transaction.update(i._key,o),this}delete(e){const t=cn(e,this._firestore);return this._transaction.delete(t._key),this}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lp extends dE{constructor(e,t){super(e,t),this._firestore=e}get(e){const t=cn(e,this._firestore),n=new xn(this._firestore);return super.get(e).then((s=>new Xe(this._firestore,n,t._key,s._document,new Pt(!1,!1),t.converter)))}}function fE(r,e,t){r=Y(r,le);const n={...hE,...t};return(function(i){if(i.maxAttempts<1)throw new V(x.INVALID_ARGUMENT,"Max attempts must be at least 1")})(n),(function(i,o,c){const l=new Ve;return i.asyncQueue.enqueueAndForget((async()=>{const u=await op(i);new tT(i.asyncQueue,u,c,o,l).ju()})),l.promise})(we(r),(s=>e(new Lp(r,s))),n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gE(){return new Di("deleteField")}function mE(){return new nu("serverTimestamp")}function pE(...r){return new ru("arrayUnion",r)}function _E(...r){return new su("arrayRemove",r)}function yE(r){return new iu("increment",r)}function wE(r){return new ot(r)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Hn(r){return we(r=Y(r,le)),new Op(r,(e=>gs(r,e)))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function IE(r,e){const t=we(r=Y(r,le));if(!t._uninitializedComponentsProvider||t._uninitializedComponentsProvider._offline.kind==="memory")return nt("Cannot enable indexes when persistence is disabled"),Promise.resolve();const n=(function(i){const o=typeof i=="string"?(function(u){try{return JSON.parse(u)}catch(f){throw new V(x.INVALID_ARGUMENT,"Failed to parse JSON: "+f?.message)}})(i):i,c=[];if(Array.isArray(o.indexes))for(const l of o.indexes){const u=nf(l,"collectionGroup"),f=[];if(Array.isArray(l.fields))for(const g of l.fields){const p=Ra("setIndexConfiguration",nf(g,"fieldPath"));g.arrayConfig==="CONTAINS"?f.push(new zn(p,2)):g.order==="ASCENDING"?f.push(new zn(p,0)):g.order==="DESCENDING"&&f.push(new zn(p,1))}c.push(new Or(Or.UNKNOWN_ID,u,f,Lr.empty()))}return c})(e);return hT(t,n)}function nf(r,e){if(typeof r[e]!="string")throw new V(x.INVALID_ARGUMENT,"Missing string value for: "+e);return r[e]}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fp{constructor(e){this._firestore=e,this.type="PersistentCacheIndexManager"}}function bE(r){r=Y(r,le);const e=rf.get(r);if(e)return e;if(we(r)._uninitializedComponentsProvider?._offline.kind!=="persistent")return null;const n=new Fp(r);return rf.set(r,n),n}function vE(r){Up(r,!0)}function TE(r){Up(r,!1)}function EE(r){fT(we(r._firestore)).then((e=>N("deleting all persistent cache indexes succeeded"))).catch((e=>nt("deleting all persistent cache indexes failed",e)))}function Up(r,e){dT(we(r._firestore),e).then((t=>N(`setting persistent cache index auto creation isEnabled=${e} succeeded`))).catch((t=>nt(`setting persistent cache index auto creation isEnabled=${e} failed`,t)))}const rf=new WeakMap;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function AE(r){const e=we(Y(r.firestore,le)),t=e._onlineComponents?.datastore.serializer;return t===void 0?null:pa(t,Ge(r._query)).ft}function SE(r,e){const t=pg(e,((i,o)=>new Yg(o,i.aggregateType,i._internalFieldPath))),n=we(Y(r.firestore,le)),s=n._onlineComponents?.datastore.serializer;return s===void 0?null:lm(s,Mg(r._query),t,!0).request}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class RE{constructor(){throw new Error("instances of this class should not be created")}static onExistenceFilterMismatch(e){return fu.instance.onExistenceFilterMismatch(e)}}class fu{constructor(){this.Mc=new Map}static get instance(){return go||(go=new fu,(function(t){if(Bc)throw new Error("a TestingHooksSpi instance is already set");Bc=t})(go)),go}lt(e){this.Mc.forEach((t=>t(e)))}onExistenceFilterMismatch(e){const t=Symbol(),n=this.Mc;return n.set(t,e),()=>n.delete(t)}}let go=null;(function(e,t=!0){(function(s){ns=s})(ts),Vr(new Wn("firestore",((n,{instanceIdentifier:s,options:i})=>{const o=n.getProvider("app").getImmediate(),c=new le(new Yw(n.getProvider("auth-internal")),new eI(o,n.getProvider("app-check-internal")),(function(u,f){if(!Object.prototype.hasOwnProperty.apply(u.options,["projectId"]))throw new V(x.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new mn(u.options.projectId,f)})(o,s),o);return i={useFetchStreams:t,...i},c._setSettings(i),c}),"PUBLIC").setMultipleInstances(!0)),hn(Mh,Oh,e),hn(Mh,Oh,"esm2020")})();const PE=Object.freeze(Object.defineProperty({__proto__:null,AbstractUserDataWriter:uu,AggregateField:es,AggregateQuerySnapshot:yp,Bytes:We,CACHE_SIZE_UNLIMITED:pT,CollectionReference:ut,DocumentReference:oe,DocumentSnapshot:Xe,FieldPath:Rn,FieldValue:Pn,Firestore:le,FirestoreError:V,GeoPoint:ht,LoadBundleTask:fp,PersistentCacheIndexManager:Fp,Query:xe,QueryCompositeFilterConstraint:ur,QueryConstraint:hs,QueryDocumentSnapshot:Ys,QueryEndAtConstraint:Ni,QueryFieldFilterConstraint:ds,QueryLimitConstraint:ki,QueryOrderByConstraint:xa,QuerySnapshot:Ze,QueryStartAtConstraint:Vi,SnapshotMetadata:Pt,Timestamp:se,Transaction:Lp,VectorValue:ot,WriteBatch:Op,_AutoId:sa,_ByteString:Ie,_DatabaseId:mn,_DocumentKey:M,_EmptyAppCheckTokenProvider:tI,_EmptyAuthCredentialsProvider:Qf,_FieldPath:ge,_TestingHooks:RE,_cast:Y,_debugAssert:Qw,_internalAggregationQueryToProtoRunAggregationQueryRequest:SE,_internalQueryToProtoQueryTarget:AE,_isBase64Available:FI,_logWarn:nt,_validateIsNotUsedTogether:Yf,addDoc:Vp,aggregateFieldEqual:$T,aggregateQuerySnapshotEqual:qT,and:kT,arrayRemove:_E,arrayUnion:pE,average:BT,clearIndexedDbPersistence:IT,collection:Ee,collectionGroup:gT,connectFirestoreEmulator:dp,count:Dp,deleteAllPersistentCacheIndexes:EE,deleteDoc:fs,deleteField:gE,disableNetwork:TT,disablePersistentCacheIndexAutoCreation:TE,doc:me,documentId:AT,documentSnapshotFromJSON:jT,enableIndexedDbPersistence:yT,enableMultiTabIndexedDbPersistence:wT,enableNetwork:vT,enablePersistentCacheIndexAutoCreation:vE,endAt:FT,endBefore:LT,ensureFirestoreConfigured:we,executeWrite:gs,getAggregateFromServer:Np,getCountFromServer:ZT,getDoc:zt,getDocFromCache:HT,getDocFromServer:WT,getDocs:fi,getDocsFromCache:QT,getDocsFromServer:JT,getFirestore:gp,getPersistentCacheIndexManager:bE,increment:yE,initializeFirestore:_T,limit:VT,limitToLast:NT,loadBundle:Zc,memoryEagerGarbageCollector:sE,memoryLocalCache:oE,memoryLruGarbageCollector:iE,namedQuery:_p,onSnapshot:jn,onSnapshotResume:YT,onSnapshotsInSync:XT,or:DT,orderBy:Rp,persistentLocalCache:aE,persistentMultipleTabManager:uE,persistentSingleTabManager:Mp,query:xr,queryEqual:tu,querySnapshotFromJSON:zT,refEqual:mT,runTransaction:fE,serverTimestamp:mE,setDoc:hr,setIndexConfiguration:IE,setLogLevel:Kf,snapshotEqual:KT,startAfter:OT,startAt:MT,sum:UT,terminate:ET,updateDoc:Gt,vector:wE,waitForPendingWrites:bT,where:el,writeBatch:Hn},Symbol.toStringTag,{value:"Module"}));function Bp(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const xE=Bp,$p=new yi("auth","Firebase",Bp());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jo=new il("@firebase/auth");function CE(r,...e){Jo.logLevel<=X.WARN&&Jo.warn(`Auth (${ts}): ${r}`,...e)}function Po(r,...e){Jo.logLevel<=X.ERROR&&Jo.error(`Auth (${ts}): ${r}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ot(r,...e){throw gu(r,...e)}function bt(r,...e){return gu(r,...e)}function qp(r,e,t){const n={...xE(),[e]:t};return new yi("auth","Firebase",n).create(e,{appName:r.name})}function kt(r){return qp(r,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function gu(r,...e){if(typeof r!="string"){const t=e[0],n=[...e.slice(1)];return n[0]&&(n[0].appName=r.name),r._errorFactory.create(t,...n)}return $p.create(r,...e)}function H(r,e,...t){if(!r)throw gu(e,...t)}function xt(r){const e="INTERNAL ASSERTION FAILED: "+r;throw Po(e),new Error(e)}function Lt(r,e){r||xt(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tl(){return typeof self<"u"&&self.location?.href||""}function DE(){return sf()==="http:"||sf()==="https:"}function sf(){return typeof self<"u"&&self.location?.protocol||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function kE(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(DE()||Ry()||"connection"in navigator)?navigator.onLine:!0}function VE(){if(typeof navigator>"u")return null;const r=navigator;return r.languages&&r.languages[0]||r.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mi{constructor(e,t){this.shortDelay=e,this.longDelay=t,Lt(t>e,"Short delay should be less than long delay!"),this.isMobile=Ay()||Py()}get(){return kE()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function mu(r,e){Lt(r.emulator,"Emulator should always be set here");const{url:t}=r.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jp{static initialize(e,t,n){this.fetchImpl=e,t&&(this.headersImpl=t),n&&(this.responseImpl=n)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;xt("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;xt("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;xt("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const NE={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ME=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],OE=new Mi(3e4,6e4);function Oi(r,e){return r.tenantId&&!e.tenantId?{...e,tenantId:r.tenantId}:e}async function ms(r,e,t,n,s={}){return zp(r,s,async()=>{let i={},o={};n&&(e==="GET"?o=n:i={body:JSON.stringify(n)});const c=wi({key:r.config.apiKey,...o}).slice(1),l=await r._getAdditionalHeaders();l["Content-Type"]="application/json",r.languageCode&&(l["X-Firebase-Locale"]=r.languageCode);const u={method:e,headers:l,...i};return Sy()||(u.referrerPolicy="no-referrer"),r.emulatorConfig&&ir(r.emulatorConfig.host)&&(u.credentials="include"),jp.fetch()(await Gp(r,r.config.apiHost,t,c),u)})}async function zp(r,e,t){r._canInitEmulator=!1;const n={...NE,...e};try{const s=new LE(r),i=await Promise.race([t(),s.promise]);s.clearNetworkTimeout();const o=await i.json();if("needConfirmation"in o)throw mo(r,"account-exists-with-different-credential",o);if(i.ok&&!("errorMessage"in o))return o;{const c=i.ok?o.errorMessage:o.error.message,[l,u]=c.split(" : ");if(l==="FEDERATED_USER_ID_ALREADY_LINKED")throw mo(r,"credential-already-in-use",o);if(l==="EMAIL_EXISTS")throw mo(r,"email-already-in-use",o);if(l==="USER_DISABLED")throw mo(r,"user-disabled",o);const f=n[l]||l.toLowerCase().replace(/[_\s]+/g,"-");if(u)throw qp(r,f,u);Ot(r,f)}}catch(s){if(s instanceof Ut)throw s;Ot(r,"network-request-failed",{message:String(s)})}}async function pu(r,e,t,n,s={}){const i=await ms(r,e,t,n,s);return"mfaPendingCredential"in i&&Ot(r,"multi-factor-auth-required",{_serverResponse:i}),i}async function Gp(r,e,t,n){const s=`${e}${t}?${n}`,i=r,o=i.config.emulator?mu(r.config,s):`${r.config.apiScheme}://${s}`;return ME.includes(t)&&(await i._persistenceManagerAvailable,i._getPersistenceType()==="COOKIE")?i._getPersistence()._getFinalTarget(o).toString():o}class LE{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,n)=>{this.timer=setTimeout(()=>n(bt(this.auth,"network-request-failed")),OE.get())})}}function mo(r,e,t){const n={appName:r.name};t.email&&(n.email=t.email),t.phoneNumber&&(n.phoneNumber=t.phoneNumber);const s=bt(r,e,n);return s.customData._tokenResponse=t,s}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function FE(r,e){return ms(r,"POST","/v1/accounts:delete",e)}async function Yo(r,e){return ms(r,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xs(r){if(r)try{const e=new Date(Number(r));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function UE(r,e=!1){const t=pe(r),n=await t.getIdToken(e),s=_u(n);H(s&&s.exp&&s.auth_time&&s.iat,t.auth,"internal-error");const i=typeof s.firebase=="object"?s.firebase:void 0,o=i?.sign_in_provider;return{claims:s,token:n,authTime:Xs(yc(s.auth_time)),issuedAtTime:Xs(yc(s.iat)),expirationTime:Xs(yc(s.exp)),signInProvider:o||null,signInSecondFactor:i?.sign_in_second_factor||null}}function yc(r){return Number(r)*1e3}function _u(r){const[e,t,n]=r.split(".");if(e===void 0||t===void 0||n===void 0)return Po("JWT malformed, contained fewer than 3 sections"),null;try{const s=Ef(t);return s?JSON.parse(s):(Po("Failed to decode base64 JWT payload"),null)}catch(s){return Po("Caught error parsing JWT payload as JSON",s?.toString()),null}}function of(r){const e=_u(r);return H(e,"internal-error"),H(typeof e.exp<"u","internal-error"),H(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function gi(r,e,t=!1){if(t)return e;try{return await e}catch(n){throw n instanceof Ut&&BE(n)&&r.auth.currentUser===r&&await r.auth.signOut(),n}}function BE({code:r}){return r==="auth/user-disabled"||r==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $E{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){if(e){const t=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),t}else{this.errorBackoff=3e4;const n=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,n)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){e?.code==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nl{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=Xs(this.lastLoginAt),this.creationTime=Xs(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Xo(r){const e=r.auth,t=await r.getIdToken(),n=await gi(r,Yo(e,{idToken:t}));H(n?.users.length,e,"internal-error");const s=n.users[0];r._notifyReloadListener(s);const i=s.providerUserInfo?.length?Kp(s.providerUserInfo):[],o=jE(r.providerData,i),c=r.isAnonymous,l=!(r.email&&s.passwordHash)&&!o?.length,u=c?l:!1,f={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:o,metadata:new nl(s.createdAt,s.lastLoginAt),isAnonymous:u};Object.assign(r,f)}async function qE(r){const e=pe(r);await Xo(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function jE(r,e){return[...r.filter(n=>!e.some(s=>s.providerId===n.providerId)),...e]}function Kp(r){return r.map(({providerId:e,...t})=>({providerId:e,uid:t.rawId||"",displayName:t.displayName||null,email:t.email||null,phoneNumber:t.phoneNumber||null,photoURL:t.photoUrl||null}))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function zE(r,e){const t=await zp(r,{},async()=>{const n=wi({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:i}=r.config,o=await Gp(r,s,"/v1/token",`key=${i}`),c=await r._getAdditionalHeaders();c["Content-Type"]="application/x-www-form-urlencoded";const l={method:"POST",headers:c,body:n};return r.emulatorConfig&&ir(r.emulatorConfig.host)&&(l.credentials="include"),jp.fetch()(o,l)});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function GE(r,e){return ms(r,"POST","/v2/accounts:revokeToken",Oi(r,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cr{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){H(e.idToken,"internal-error"),H(typeof e.idToken<"u","internal-error"),H(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):of(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){H(e.length!==0,"internal-error");const t=of(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(H(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:n,refreshToken:s,expiresIn:i}=await zE(e,t);this.updateTokensAndExpiration(n,s,Number(i))}updateTokensAndExpiration(e,t,n){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+n*1e3}static fromJSON(e,t){const{refreshToken:n,accessToken:s,expirationTime:i}=t,o=new Cr;return n&&(H(typeof n=="string","internal-error",{appName:e}),o.refreshToken=n),s&&(H(typeof s=="string","internal-error",{appName:e}),o.accessToken=s),i&&(H(typeof i=="number","internal-error",{appName:e}),o.expirationTime=i),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Cr,this.toJSON())}_performRefresh(){return xt("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Zt(r,e){H(typeof r=="string"||typeof r>"u","internal-error",{appName:e})}class lt{constructor({uid:e,auth:t,stsTokenManager:n,...s}){this.providerId="firebase",this.proactiveRefresh=new $E(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=t,this.stsTokenManager=n,this.accessToken=n.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new nl(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(e){const t=await gi(this,this.stsTokenManager.getToken(this.auth,e));return H(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return UE(this,e)}reload(){return qE(this)}_assign(e){this!==e&&(H(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>({...t})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new lt({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return t.metadata._copy(this.metadata),t}_onReload(e){H(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let n=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),n=!0),t&&await Xo(this),await this.auth._persistUserIfCurrent(this),n&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(st(this.auth.app))return Promise.reject(kt(this.auth));const e=await this.getIdToken();return await gi(this,FE(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){const n=t.displayName??void 0,s=t.email??void 0,i=t.phoneNumber??void 0,o=t.photoURL??void 0,c=t.tenantId??void 0,l=t._redirectEventId??void 0,u=t.createdAt??void 0,f=t.lastLoginAt??void 0,{uid:g,emailVerified:p,isAnonymous:E,providerData:A,stsTokenManager:D}=t;H(g&&D,e,"internal-error");const k=Cr.fromJSON(this.name,D);H(typeof g=="string",e,"internal-error"),Zt(n,e.name),Zt(s,e.name),H(typeof p=="boolean",e,"internal-error"),H(typeof E=="boolean",e,"internal-error"),Zt(i,e.name),Zt(o,e.name),Zt(c,e.name),Zt(l,e.name),Zt(u,e.name),Zt(f,e.name);const B=new lt({uid:g,auth:e,email:s,emailVerified:p,displayName:n,isAnonymous:E,photoURL:o,phoneNumber:i,tenantId:c,stsTokenManager:k,createdAt:u,lastLoginAt:f});return A&&Array.isArray(A)&&(B.providerData=A.map(j=>({...j}))),l&&(B._redirectEventId=l),B}static async _fromIdTokenResponse(e,t,n=!1){const s=new Cr;s.updateFromServerResponse(t);const i=new lt({uid:t.localId,auth:e,stsTokenManager:s,isAnonymous:n});return await Xo(i),i}static async _fromGetAccountInfoResponse(e,t,n){const s=t.users[0];H(s.localId!==void 0,"internal-error");const i=s.providerUserInfo!==void 0?Kp(s.providerUserInfo):[],o=!(s.email&&s.passwordHash)&&!i?.length,c=new Cr;c.updateFromIdToken(n);const l=new lt({uid:s.localId,auth:e,stsTokenManager:c,isAnonymous:o}),u={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:i,metadata:new nl(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!i?.length};return Object.assign(l,u),l}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const af=new Map;function Ct(r){Lt(r instanceof Function,"Expected a class definition");let e=af.get(r);return e?(Lt(e instanceof r,"Instance stored in cache mismatched with class"),e):(e=new r,af.set(r,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hp{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}Hp.type="NONE";const cf=Hp;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xo(r,e,t){return`firebase:${r}:${e}:${t}`}class Dr{constructor(e,t,n){this.persistence=e,this.auth=t,this.userKey=n;const{config:s,name:i}=this.auth;this.fullUserKey=xo(this.userKey,s.apiKey,i),this.fullPersistenceKey=xo("persistence",s.apiKey,i),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const t=await Yo(this.auth,{idToken:e}).catch(()=>{});return t?lt._fromGetAccountInfoResponse(this.auth,t,e):null}return lt._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,n="authUser"){if(!t.length)return new Dr(Ct(cf),e,n);const s=(await Promise.all(t.map(async u=>{if(await u._isAvailable())return u}))).filter(u=>u);let i=s[0]||Ct(cf);const o=xo(n,e.config.apiKey,e.name);let c=null;for(const u of t)try{const f=await u._get(o);if(f){let g;if(typeof f=="string"){const p=await Yo(e,{idToken:f}).catch(()=>{});if(!p)break;g=await lt._fromGetAccountInfoResponse(e,p,f)}else g=lt._fromJSON(e,f);u!==i&&(c=g),i=u;break}}catch{}const l=s.filter(u=>u._shouldAllowMigration);return!i._shouldAllowMigration||!l.length?new Dr(i,e,n):(i=l[0],c&&await i._set(o,c.toJSON()),await Promise.all(t.map(async u=>{if(u!==i)try{await u._remove(o)}catch{}})),new Dr(i,e,n))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function lf(r){const e=r.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Yp(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(Wp(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Zp(e))return"Blackberry";if(e_(e))return"Webos";if(Qp(e))return"Safari";if((e.includes("chrome/")||Jp(e))&&!e.includes("edge/"))return"Chrome";if(Xp(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,n=r.match(t);if(n?.length===2)return n[1]}return"Other"}function Wp(r=Pe()){return/firefox\//i.test(r)}function Qp(r=Pe()){const e=r.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function Jp(r=Pe()){return/crios\//i.test(r)}function Yp(r=Pe()){return/iemobile/i.test(r)}function Xp(r=Pe()){return/android/i.test(r)}function Zp(r=Pe()){return/blackberry/i.test(r)}function e_(r=Pe()){return/webos/i.test(r)}function yu(r=Pe()){return/iphone|ipad|ipod/i.test(r)||/macintosh/i.test(r)&&/mobile/i.test(r)}function KE(r=Pe()){return yu(r)&&!!window.navigator?.standalone}function HE(){return xy()&&document.documentMode===10}function t_(r=Pe()){return yu(r)||Xp(r)||e_(r)||Zp(r)||/windows phone/i.test(r)||Yp(r)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function n_(r,e=[]){let t;switch(r){case"Browser":t=lf(Pe());break;case"Worker":t=`${lf(Pe())}-${r}`;break;default:t=r}const n=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${ts}/${n}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class WE{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const n=i=>new Promise((o,c)=>{try{const l=e(i);o(l)}catch(l){c(l)}});n.onAbort=t,this.queue.push(n);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const n of this.queue)await n(e),n.onAbort&&t.push(n.onAbort)}catch(n){t.reverse();for(const s of t)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:n?.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function QE(r,e={}){return ms(r,"GET","/v2/passwordPolicy",Oi(r,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const JE=6;class YE{constructor(e){const t=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=t.minPasswordLength??JE,t.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=t.maxPasswordLength),t.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=t.containsLowercaseCharacter),t.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=t.containsUppercaseCharacter),t.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=t.containsNumericCharacter),t.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=t.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=e.allowedNonAlphanumericCharacters?.join("")??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const t={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,t),this.validatePasswordCharacterOptions(e,t),t.isValid&&(t.isValid=t.meetsMinPasswordLength??!0),t.isValid&&(t.isValid=t.meetsMaxPasswordLength??!0),t.isValid&&(t.isValid=t.containsLowercaseLetter??!0),t.isValid&&(t.isValid=t.containsUppercaseLetter??!0),t.isValid&&(t.isValid=t.containsNumericCharacter??!0),t.isValid&&(t.isValid=t.containsNonAlphanumericCharacter??!0),t}validatePasswordLengthOptions(e,t){const n=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;n&&(t.meetsMinPasswordLength=e.length>=n),s&&(t.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let n;for(let s=0;s<e.length;s++)n=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(t,n>="a"&&n<="z",n>="A"&&n<="Z",n>="0"&&n<="9",this.allowedNonAlphanumericCharacters.includes(n))}updatePasswordCharacterOptionsStatuses(e,t,n,s,i){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=n)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class XE{constructor(e,t,n,s){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=n,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new uf(this),this.idTokenSubscription=new uf(this),this.beforeStateQueue=new WE(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=$p,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion,this._persistenceManagerAvailable=new Promise(i=>this._resolvePersistenceManagerAvailable=i)}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=Ct(t)),this._initializationPromise=this.queue(async()=>{if(!this._deleted&&(this.persistenceManager=await Dr.create(this,e),this._resolvePersistenceManagerAvailable?.(),!this._deleted)){if(this._popupRedirectResolver?._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=this.currentUser?.uid||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await Yo(this,{idToken:e}),n=await lt._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(n)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){if(st(this.app)){const i=this.app.settings.authIdToken;return i?new Promise(o=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(i).then(o,o))}):this.directlySetCurrentUser(null)}const t=await this.assertedPersistence.getCurrentUser();let n=t,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const i=this.redirectUser?._redirectEventId,o=n?._redirectEventId,c=await this.tryRedirectSignIn(e);(!i||i===o)&&c?.user&&(n=c.user,s=!0)}if(!n)return this.directlySetCurrentUser(null);if(!n._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(n)}catch(i){n=t,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(i))}return n?this.reloadAndSetCurrentUserOrClear(n):this.directlySetCurrentUser(null)}return H(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===n._redirectEventId?this.directlySetCurrentUser(n):this.reloadAndSetCurrentUserOrClear(n)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await Xo(e)}catch(t){if(t?.code!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=VE()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(st(this.app))return Promise.reject(kt(this));const t=e?pe(e):null;return t&&H(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&H(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return st(this.app)?Promise.reject(kt(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return st(this.app)?Promise.reject(kt(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(Ct(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await QE(this),t=new YE(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new yi("auth","Firebase",e())}onAuthStateChanged(e,t,n){return this.registerStateListener(this.authStateSubscription,e,t,n)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,n){return this.registerStateListener(this.idTokenSubscription,e,t,n)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const n=this.onAuthStateChanged(()=>{n(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),n={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(n.tenantId=this.tenantId),await GE(this,n)}}toJSON(){return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:this._currentUser?.toJSON()}}async _setRedirectUser(e,t){const n=await this.getOrInitRedirectPersistenceManager(t);return e===null?n.removeCurrentUser():n.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&Ct(e)||this._popupRedirectResolver;H(t,this,"argument-error"),this.redirectPersistenceManager=await Dr.create(this,[Ct(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){return this._isInitialized&&await this.queue(async()=>{}),this._currentUser?._redirectEventId===e?this._currentUser:this.redirectUser?._redirectEventId===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const e=this.currentUser?.uid??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,n,s){if(this._deleted)return()=>{};const i=typeof t=="function"?t:t.next.bind(t);let o=!1;const c=this._isInitialized?Promise.resolve():this._initializationPromise;if(H(c,this,"internal-error"),c.then(()=>{o||i(this.currentUser)}),typeof t=="function"){const l=e.addObserver(t,n,s);return()=>{o=!0,l()}}else{const l=e.addObserver(t);return()=>{o=!0,l()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return H(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=n_(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){const e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const t=await this.heartbeatServiceProvider.getImmediate({optional:!0})?.getHeartbeatsHeader();t&&(e["X-Firebase-Client"]=t);const n=await this._getAppCheckToken();return n&&(e["X-Firebase-AppCheck"]=n),e}async _getAppCheckToken(){if(st(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=await this.appCheckServiceProvider.getImmediate({optional:!0})?.getToken();return e?.error&&CE(`Error while retrieving App Check token: ${e.error}`),e?.token}}function Li(r){return pe(r)}class uf{constructor(e){this.auth=e,this.observer=null,this.addObserver=My(t=>this.observer=t)}get next(){return H(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let wu={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function ZE(r){wu=r}function e0(r){return wu.loadJS(r)}function t0(){return wu.gapiScript}function n0(r){return`__${r}${Math.floor(Math.random()*1e6)}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function r0(r,e){const t=Ii(r,"auth");if(t.isInitialized()){const s=t.getImmediate(),i=t.getOptions();if(dt(i,e??{}))return s;Ot(s,"already-initialized")}return t.initialize({options:e})}function s0(r,e){const t=e?.persistence||[],n=(Array.isArray(t)?t:[t]).map(Ct);e?.errorMap&&r._updateErrorMap(e.errorMap),r._initializeWithPersistence(n,e?.popupRedirectResolver)}function i0(r,e,t){const n=Li(r);H(/^https?:\/\//.test(e),n,"invalid-emulator-scheme");const s=!1,i=r_(e),{host:o,port:c}=o0(e),l=c===null?"":`:${c}`,u={url:`${i}//${o}${l}/`},f=Object.freeze({host:o,port:c,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:s})});if(!n._canInitEmulator){H(n.config.emulator&&n.emulatorConfig,n,"emulator-config-failed"),H(dt(u,n.config.emulator)&&dt(f,n.emulatorConfig),n,"emulator-config-failed");return}n.config.emulator=u,n.emulatorConfig=f,n.settings.appVerificationDisabledForTesting=!0,ir(o)?(sl(`${i}//${o}${l}`),xf("Auth",!0)):a0()}function r_(r){const e=r.indexOf(":");return e<0?"":r.substr(0,e+1)}function o0(r){const e=r_(r),t=/(\/\/)?([^?#/]+)/.exec(r.substr(e.length));if(!t)return{host:"",port:null};const n=t[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(n);if(s){const i=s[1];return{host:i,port:hf(n.substr(i.length+1))}}else{const[i,o]=n.split(":");return{host:i,port:hf(o)}}}function hf(r){if(!r)return null;const e=Number(r);return isNaN(e)?null:e}function a0(){function r(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",r):r())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class s_{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return xt("not implemented")}_getIdTokenResponse(e){return xt("not implemented")}_linkToIdToken(e,t){return xt("not implemented")}_getReauthenticationResolver(e){return xt("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function kr(r,e){return pu(r,"POST","/v1/accounts:signInWithIdp",Oi(r,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const c0="http://localhost";class sr extends s_{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new sr(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):Ot("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:n,signInMethod:s,...i}=t;if(!n||!s)return null;const o=new sr(n,s);return o.idToken=i.idToken||void 0,o.accessToken=i.accessToken||void 0,o.secret=i.secret,o.nonce=i.nonce,o.pendingToken=i.pendingToken||null,o}_getIdTokenResponse(e){const t=this.buildRequest();return kr(e,t)}_linkToIdToken(e,t){const n=this.buildRequest();return n.idToken=t,kr(e,n)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,kr(e,t)}buildRequest(){const e={requestUri:c0,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=wi(t)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class i_{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fi extends i_{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nn extends Fi{constructor(){super("facebook.com")}static credential(e){return sr._fromParams({providerId:nn.PROVIDER_ID,signInMethod:nn.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return nn.credentialFromTaggedObject(e)}static credentialFromError(e){return nn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return nn.credential(e.oauthAccessToken)}catch{return null}}}nn.FACEBOOK_SIGN_IN_METHOD="facebook.com";nn.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rn extends Fi{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return sr._fromParams({providerId:rn.PROVIDER_ID,signInMethod:rn.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return rn.credentialFromTaggedObject(e)}static credentialFromError(e){return rn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:n}=e;if(!t&&!n)return null;try{return rn.credential(t,n)}catch{return null}}}rn.GOOGLE_SIGN_IN_METHOD="google.com";rn.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sn extends Fi{constructor(){super("github.com")}static credential(e){return sr._fromParams({providerId:sn.PROVIDER_ID,signInMethod:sn.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return sn.credentialFromTaggedObject(e)}static credentialFromError(e){return sn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return sn.credential(e.oauthAccessToken)}catch{return null}}}sn.GITHUB_SIGN_IN_METHOD="github.com";sn.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class on extends Fi{constructor(){super("twitter.com")}static credential(e,t){return sr._fromParams({providerId:on.PROVIDER_ID,signInMethod:on.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return on.credentialFromTaggedObject(e)}static credentialFromError(e){return on.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:n}=e;if(!t||!n)return null;try{return on.credential(t,n)}catch{return null}}}on.TWITTER_SIGN_IN_METHOD="twitter.com";on.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function l0(r,e){return pu(r,"POST","/v1/accounts:signUp",Oi(r,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ft{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,n,s=!1){const i=await lt._fromIdTokenResponse(e,n,s),o=df(n);return new Ft({user:i,providerId:o,_tokenResponse:n,operationType:t})}static async _forOperation(e,t,n){await e._updateTokensIfNecessary(n,!0);const s=df(n);return new Ft({user:e,providerId:s,_tokenResponse:n,operationType:t})}}function df(r){return r.providerId?r.providerId:"phoneNumber"in r?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function u0(r){if(st(r.app))return Promise.reject(kt(r));const e=Li(r);if(await e._initializationPromise,e.currentUser?.isAnonymous)return new Ft({user:e.currentUser,providerId:null,operationType:"signIn"});const t=await l0(e,{returnSecureToken:!0}),n=await Ft._fromIdTokenResponse(e,"signIn",t,!0);return await e._updateCurrentUser(n.user),n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zo extends Ut{constructor(e,t,n,s){super(t.code,t.message),this.operationType=n,this.user=s,Object.setPrototypeOf(this,Zo.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:t.customData._serverResponse,operationType:n}}static _fromErrorAndOperation(e,t,n,s){return new Zo(e,t,n,s)}}function o_(r,e,t,n){return(e==="reauthenticate"?t._getReauthenticationResolver(r):t._getIdTokenResponse(r)).catch(i=>{throw i.code==="auth/multi-factor-auth-required"?Zo._fromErrorAndOperation(r,i,e,n):i})}async function h0(r,e,t=!1){const n=await gi(r,e._linkToIdToken(r.auth,await r.getIdToken()),t);return Ft._forOperation(r,"link",n)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function d0(r,e,t=!1){const{auth:n}=r;if(st(n.app))return Promise.reject(kt(n));const s="reauthenticate";try{const i=await gi(r,o_(n,s,e,r),t);H(i.idToken,n,"internal-error");const o=_u(i.idToken);H(o,n,"internal-error");const{sub:c}=o;return H(r.uid===c,n,"user-mismatch"),Ft._forOperation(r,s,i)}catch(i){throw i?.code==="auth/user-not-found"&&Ot(n,"user-mismatch"),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function f0(r,e,t=!1){if(st(r.app))return Promise.reject(kt(r));const n="signIn",s=await o_(r,n,e),i=await Ft._fromIdTokenResponse(r,n,s);return t||await r._updateCurrentUser(i.user),i}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function g0(r,e){return pu(r,"POST","/v1/accounts:signInWithCustomToken",Oi(r,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function m0(r,e){if(st(r.app))return Promise.reject(kt(r));const t=Li(r),n=await g0(t,{token:e,returnSecureToken:!0}),s=await Ft._fromIdTokenResponse(t,"signIn",n);return await t._updateCurrentUser(s.user),s}function p0(r,e,t,n){return pe(r).onIdTokenChanged(e,t,n)}function _0(r,e,t){return pe(r).beforeAuthStateChanged(e,t)}const ea="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class a_{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(ea,"1"),this.storage.removeItem(ea),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const y0=1e3,w0=10;class c_ extends a_{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=t_(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const n=this.storage.getItem(t),s=this.localCache[t];n!==s&&e(t,s,n)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((o,c,l)=>{this.notifyListeners(o,l)});return}const n=e.key;t?this.detachListener():this.stopPolling();const s=()=>{const o=this.storage.getItem(n);!t&&this.localCache[n]===o||this.notifyListeners(n,o)},i=this.storage.getItem(n);HE()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,w0):s()}notifyListeners(e,t){this.localCache[e]=t;const n=this.listeners[e];if(n)for(const s of Array.from(n))s(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,n)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:n}),!0)})},y0)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}c_.type="LOCAL";const I0=c_;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class l_ extends a_{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}l_.type="SESSION";const u_=l_;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function b0(r){return Promise.all(r.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Da{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(s=>s.isListeningto(e));if(t)return t;const n=new Da(e);return this.receivers.push(n),n}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:n,eventType:s,data:i}=t.data,o=this.handlersMap[s];if(!o?.size)return;t.ports[0].postMessage({status:"ack",eventId:n,eventType:s});const c=Array.from(o).map(async u=>u(t.origin,i)),l=await b0(c);t.ports[0].postMessage({status:"done",eventId:n,eventType:s,response:l})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}Da.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Iu(r="",e=10){let t="";for(let n=0;n<e;n++)t+=Math.floor(Math.random()*10);return r+t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class v0{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,n=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let i,o;return new Promise((c,l)=>{const u=Iu("",20);s.port1.start();const f=setTimeout(()=>{l(new Error("unsupported_event"))},n);o={messageChannel:s,onMessage(g){const p=g;if(p.data.eventId===u)switch(p.data.status){case"ack":clearTimeout(f),i=setTimeout(()=>{l(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),c(p.data.response);break;default:clearTimeout(f),clearTimeout(i),l(new Error("invalid_response"));break}}},this.handlers.add(o),s.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:u,data:t},[s.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function vt(){return window}function T0(r){vt().location.href=r}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function h_(){return typeof vt().WorkerGlobalScope<"u"&&typeof vt().importScripts=="function"}async function E0(){if(!navigator?.serviceWorker)return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function A0(){return navigator?.serviceWorker?.controller||null}function S0(){return h_()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const d_="firebaseLocalStorageDb",R0=1,ta="firebaseLocalStorage",f_="fbase_key";class Ui{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function ka(r,e){return r.transaction([ta],e?"readwrite":"readonly").objectStore(ta)}function P0(){const r=indexedDB.deleteDatabase(d_);return new Ui(r).toPromise()}function rl(){const r=indexedDB.open(d_,R0);return new Promise((e,t)=>{r.addEventListener("error",()=>{t(r.error)}),r.addEventListener("upgradeneeded",()=>{const n=r.result;try{n.createObjectStore(ta,{keyPath:f_})}catch(s){t(s)}}),r.addEventListener("success",async()=>{const n=r.result;n.objectStoreNames.contains(ta)?e(n):(n.close(),await P0(),e(await rl()))})})}async function ff(r,e,t){const n=ka(r,!0).put({[f_]:e,value:t});return new Ui(n).toPromise()}async function x0(r,e){const t=ka(r,!1).get(e),n=await new Ui(t).toPromise();return n===void 0?null:n.value}function gf(r,e){const t=ka(r,!0).delete(e);return new Ui(t).toPromise()}const C0=800,D0=3;class g_{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await rl(),this.db)}async _withRetries(e){let t=0;for(;;)try{const n=await this._openDb();return await e(n)}catch(n){if(t++>D0)throw n;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return h_()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Da._getInstance(S0()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){if(this.activeServiceWorker=await E0(),!this.activeServiceWorker)return;this.sender=new v0(this.activeServiceWorker);const e=await this.sender._send("ping",{},800);e&&e[0]?.fulfilled&&e[0]?.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||A0()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await rl();return await ff(e,ea,"1"),await gf(e,ea),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(n=>ff(n,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(n=>x0(n,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>gf(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const i=ka(s,!1).getAll();return new Ui(i).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],n=new Set;if(e.length!==0)for(const{fbase_key:s,value:i}of e)n.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(i)&&(this.notifyListeners(s,i),t.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!n.has(s)&&(this.notifyListeners(s,null),t.push(s));return t}notifyListeners(e,t){this.localCache[e]=t;const n=this.listeners[e];if(n)for(const s of Array.from(n))s(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),C0)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}g_.type="LOCAL";const k0=g_;new Mi(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function V0(r,e){return e?Ct(e):(H(r._popupRedirectResolver,r,"argument-error"),r._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bu extends s_{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return kr(e,this._buildIdpRequest())}_linkToIdToken(e,t){return kr(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return kr(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function N0(r){return f0(r.auth,new bu(r),r.bypassAuthState)}function M0(r){const{auth:e,user:t}=r;return H(t,e,"internal-error"),d0(t,new bu(r),r.bypassAuthState)}async function O0(r){const{auth:e,user:t}=r;return H(t,e,"internal-error"),h0(t,new bu(r),r.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class m_{constructor(e,t,n,s,i=!1){this.auth=e,this.resolver=n,this.user=s,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(n){this.reject(n)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:n,postBody:s,tenantId:i,error:o,type:c}=e;if(o){this.reject(o);return}const l={auth:this.auth,requestUri:t,sessionId:n,tenantId:i||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(c)(l))}catch(u){this.reject(u)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return N0;case"linkViaPopup":case"linkViaRedirect":return O0;case"reauthViaPopup":case"reauthViaRedirect":return M0;default:Ot(this.auth,"internal-error")}}resolve(e){Lt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){Lt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const L0=new Mi(2e3,1e4);class Sr extends m_{constructor(e,t,n,s,i){super(e,t,s,i),this.provider=n,this.authWindow=null,this.pollId=null,Sr.currentPopupAction&&Sr.currentPopupAction.cancel(),Sr.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return H(e,this.auth,"internal-error"),e}async onExecution(){Lt(this.filter.length===1,"Popup operations only handle one event");const e=Iu();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(bt(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){return this.authWindow?.associatedEvent||null}cancel(){this.reject(bt(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,Sr.currentPopupAction=null}pollUserCancellation(){const e=()=>{if(this.authWindow?.window?.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(bt(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,L0.get())};e()}}Sr.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const F0="pendingRedirect",Co=new Map;class U0 extends m_{constructor(e,t,n=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,n),this.eventId=null}async execute(){let e=Co.get(this.auth._key());if(!e){try{const n=await B0(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(n)}catch(t){e=()=>Promise.reject(t)}Co.set(this.auth._key(),e)}return this.bypassAuthState||Co.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function B0(r,e){const t=j0(e),n=q0(r);if(!await n._isAvailable())return!1;const s=await n._get(t)==="true";return await n._remove(t),s}function $0(r,e){Co.set(r._key(),e)}function q0(r){return Ct(r._redirectPersistence)}function j0(r){return xo(F0,r.config.apiKey,r.name)}async function z0(r,e,t=!1){if(st(r.app))return Promise.reject(kt(r));const n=Li(r),s=V0(n,e),o=await new U0(n,s,t).execute();return o&&!t&&(delete o.user._redirectEventId,await n._persistUserIfCurrent(o.user),await n._setRedirectUser(null,e)),o}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const G0=600*1e3;class K0{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(n=>{this.isEventForConsumer(e,n)&&(t=!0,this.sendToConsumer(e,n),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!H0(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){if(e.error&&!p_(e)){const n=e.error.code?.split("auth/")[1]||"internal-error";t.onError(bt(this.auth,n))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const n=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&n}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=G0&&this.cachedEventUids.clear(),this.cachedEventUids.has(mf(e))}saveEventToCache(e){this.cachedEventUids.add(mf(e)),this.lastProcessedEventTime=Date.now()}}function mf(r){return[r.type,r.eventId,r.sessionId,r.tenantId].filter(e=>e).join("-")}function p_({type:r,error:e}){return r==="unknown"&&e?.code==="auth/no-auth-event"}function H0(r){switch(r.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return p_(r);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function W0(r,e={}){return ms(r,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Q0=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,J0=/^https?/;async function Y0(r){if(r.config.emulator)return;const{authorizedDomains:e}=await W0(r);for(const t of e)try{if(X0(t))return}catch{}Ot(r,"unauthorized-domain")}function X0(r){const e=tl(),{protocol:t,hostname:n}=new URL(e);if(r.startsWith("chrome-extension://")){const o=new URL(r);return o.hostname===""&&n===""?t==="chrome-extension:"&&r.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&o.hostname===n}if(!J0.test(t))return!1;if(Q0.test(r))return n===r;const s=r.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(n)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Z0=new Mi(3e4,6e4);function pf(){const r=vt().___jsl;if(r?.H){for(const e of Object.keys(r.H))if(r.H[e].r=r.H[e].r||[],r.H[e].L=r.H[e].L||[],r.H[e].r=[...r.H[e].L],r.CP)for(let t=0;t<r.CP.length;t++)r.CP[t]=null}}function eA(r){return new Promise((e,t)=>{function n(){pf(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{pf(),t(bt(r,"network-request-failed"))},timeout:Z0.get()})}if(vt().gapi?.iframes?.Iframe)e(gapi.iframes.getContext());else if(vt().gapi?.load)n();else{const s=n0("iframefcb");return vt()[s]=()=>{gapi.load?n():t(bt(r,"network-request-failed"))},e0(`${t0()}?onload=${s}`).catch(i=>t(i))}}).catch(e=>{throw Do=null,e})}let Do=null;function tA(r){return Do=Do||eA(r),Do}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nA=new Mi(5e3,15e3),rA="__/auth/iframe",sA="emulator/auth/iframe",iA={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},oA=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function aA(r){const e=r.config;H(e.authDomain,r,"auth-domain-config-required");const t=e.emulator?mu(e,sA):`https://${r.config.authDomain}/${rA}`,n={apiKey:e.apiKey,appName:r.name,v:ts},s=oA.get(r.config.apiHost);s&&(n.eid=s);const i=r._getFrameworks();return i.length&&(n.fw=i.join(",")),`${t}?${wi(n).slice(1)}`}async function cA(r){const e=await tA(r),t=vt().gapi;return H(t,r,"internal-error"),e.open({where:document.body,url:aA(r),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:iA,dontclear:!0},n=>new Promise(async(s,i)=>{await n.restyle({setHideOnLeave:!1});const o=bt(r,"network-request-failed"),c=vt().setTimeout(()=>{i(o)},nA.get());function l(){vt().clearTimeout(c),s(n)}n.ping(l).then(l,()=>{i(o)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const lA={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},uA=500,hA=600,dA="_blank",fA="http://localhost";class _f{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function gA(r,e,t,n=uA,s=hA){const i=Math.max((window.screen.availHeight-s)/2,0).toString(),o=Math.max((window.screen.availWidth-n)/2,0).toString();let c="";const l={...lA,width:n.toString(),height:s.toString(),top:i,left:o},u=Pe().toLowerCase();t&&(c=Jp(u)?dA:t),Wp(u)&&(e=e||fA,l.scrollbars="yes");const f=Object.entries(l).reduce((p,[E,A])=>`${p}${E}=${A},`,"");if(KE(u)&&c!=="_self")return mA(e||"",c),new _f(null);const g=window.open(e||"",c,f);H(g,r,"popup-blocked");try{g.focus()}catch{}return new _f(g)}function mA(r,e){const t=document.createElement("a");t.href=r,t.target=e;const n=document.createEvent("MouseEvent");n.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(n)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pA="__/auth/handler",_A="emulator/auth/handler",yA=encodeURIComponent("fac");async function yf(r,e,t,n,s,i){H(r.config.authDomain,r,"auth-domain-config-required"),H(r.config.apiKey,r,"invalid-api-key");const o={apiKey:r.config.apiKey,appName:r.name,authType:t,redirectUrl:n,v:ts,eventId:s};if(e instanceof i_){e.setDefaultLanguage(r.languageCode),o.providerId=e.providerId||"",Ny(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[f,g]of Object.entries({}))o[f]=g}if(e instanceof Fi){const f=e.getScopes().filter(g=>g!=="");f.length>0&&(o.scopes=f.join(","))}r.tenantId&&(o.tid=r.tenantId);const c=o;for(const f of Object.keys(c))c[f]===void 0&&delete c[f];const l=await r._getAppCheckToken(),u=l?`#${yA}=${encodeURIComponent(l)}`:"";return`${wA(r)}?${wi(c).slice(1)}${u}`}function wA({config:r}){return r.emulator?mu(r,_A):`https://${r.authDomain}/${pA}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wc="webStorageSupport";class IA{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=u_,this._completeRedirectFn=z0,this._overrideRedirectResult=$0}async _openPopup(e,t,n,s){Lt(this.eventManagers[e._key()]?.manager,"_initialize() not called before _openPopup()");const i=await yf(e,t,n,tl(),s);return gA(e,i,Iu())}async _openRedirect(e,t,n,s){await this._originValidation(e);const i=await yf(e,t,n,tl(),s);return T0(i),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:s,promise:i}=this.eventManagers[t];return s?Promise.resolve(s):(Lt(i,"If manager is not set, promise should be"),i)}const n=this.initAndGetManager(e);return this.eventManagers[t]={promise:n},n.catch(()=>{delete this.eventManagers[t]}),n}async initAndGetManager(e){const t=await cA(e),n=new K0(e);return t.register("authEvent",s=>(H(s?.authEvent,e,"invalid-auth-event"),{status:n.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:n},this.iframes[e._key()]=t,n}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(wc,{type:wc},s=>{const i=s?.[0]?.[wc];i!==void 0&&t(!!i),Ot(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=Y0(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return t_()||Qp()||yu()}}const bA=IA;var wf="@firebase/auth",If="1.11.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vA{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){return this.assertAuthConfigured(),this.auth.currentUser?.uid||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(n=>{e(n?.stsTokenManager.accessToken||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){H(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function TA(r){switch(r){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function EA(r){Vr(new Wn("auth",(e,{options:t})=>{const n=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),i=e.getProvider("app-check-internal"),{apiKey:o,authDomain:c}=n.options;H(o&&!o.includes(":"),"invalid-api-key",{appName:n.name});const l={apiKey:o,authDomain:c,clientPlatform:r,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:n_(r)},u=new XE(n,s,i,l);return s0(u,t),u},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,n)=>{e.getProvider("auth-internal").initialize()})),Vr(new Wn("auth-internal",e=>{const t=Li(e.getProvider("auth").getImmediate());return(n=>new vA(n))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),hn(wf,If,TA(r)),hn(wf,If,"esm2020")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const AA=300,SA=Pf("authIdTokenMaxAge")||AA;let bf=null;const RA=r=>async e=>{const t=e&&await e.getIdTokenResult(),n=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(n&&n>SA)return;const s=t?.token;bf!==s&&(bf=s,await fetch(r,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function PA(r=Lf()){const e=Ii(r,"auth");if(e.isInitialized())return e.getImmediate();const t=r0(r,{popupRedirectResolver:bA,persistence:[k0,I0,u_]}),n=Pf("authTokenSyncURL");if(n&&typeof isSecureContext=="boolean"&&isSecureContext){const i=new URL(n,location.origin);if(location.origin===i.origin){const o=RA(i.toString());_0(t,o,()=>o(t.currentUser)),p0(t,c=>o(c))}}const s=Sf("auth");return s&&i0(t,`http://${s}`),t}function xA(){return document.getElementsByTagName("head")?.[0]??document}ZE({loadJS(r){return new Promise((e,t)=>{const n=document.createElement("script");n.setAttribute("src",r),n.onload=e,n.onerror=s=>{const i=bt("internal-error");i.customData=s,t(i)},n.type="text/javascript",n.charset="UTF-8",xA().appendChild(n)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});EA("Browser");const CA={apiKey:"AIzaSyBCjgKFLqMWg4OC1zaFLner1pyE_4vFNnU",authDomain:"trainer-app-2025-08.firebaseapp.com",projectId:"trainer-app-2025-08",storageBucket:"trainer-app-2025-08.firebasestorage.app",messagingSenderId:"8465381059",appId:"1:8465381059:web:4785e9728abfc79f3e1476"},DA="Version 2025-08-26-000",ce=typeof __app_id<"u"?__app_id:"default-app-id",__=Of(CA),re=gp(__),Ic=PA(__);Kf("debug");async function y_(r,e){if(!r||r.size===0)return null;const t="/api/upload";try{const n=await fetch(t,{method:"POST",headers:{"Content-Type":r.type,"x-file-name":r.name},body:r}),s=await n.json();if(!n.ok)throw new Error(s.message||"Upload fehlgeschlagen");return s.url}catch(n){return console.error("Fehler beim Upload zu B2 via Serverless Function:",n),e.showModal("Upload Fehler",`Die Datei konnte nicht hochgeladen werden: ${n.message}`,[{text:"OK",class:"bg-red-500"}]),null}}async function Va(r,e){if(!r||!r.includes("https://"))return;const t="/api/delete-file";try{const n=await fetch(t,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({url:r})});if(!n.ok){const s=await n.json();throw new Error(s.message||`Server error: ${n.status}`)}console.log("File deletion requested for:",r)}catch(n){console.error("Fehler bei der Anforderung zum Löschen der Datei aus B2:",n),e.showModal("Hintergrund-Fehler","Die alte Bilddatei konnte nicht vom Speicher gelöscht werden. Dies beeinträchtigt nicht die App-Funktionalität.",[{text:"OK",class:"bg-yellow-500"}])}}const kA=async(r,e,t,n)=>{n.showModal("Speichern...",'<div class="animate-pulse">Spielerdaten werden verarbeitet...</div>',[]);try{let s=null;const i=Ee(re,`artifacts/${ce}/public/data/spieler`);if(e&&t&&t.size>0){const o=await zt(me(i,e));o.exists()&&o.data().fotoUrl&&(s=o.data().fotoUrl)}if(t&&t.size>0){const o=await y_(t,n);if(o)r.fotoUrl=o;else throw new Error("Spielerfoto konnte nicht hochgeladen werden.")}e?(await Gt(me(i,e),r),s&&await Va(s,n),n.showModal("Erfolg","Spieler erfolgreich aktualisiert!",[{text:"OK",class:"bg-green-500",onClick:()=>n.goBack()}])):(await Vp(i,r),n.showModal("Erfolg","Spieler erfolgreich hinzugefügt!",[{text:"OK",class:"bg-green-500",onClick:()=>n.navigateTo("spielerUebersicht",null,!0)}]))}catch(s){console.error("saveSpieler: FEHLER beim Speichern:",s),n.showModal("Fehler",`Fehler beim Speichern des Spielers: ${s.message||"Unbekannter Fehler"}.`,[{text:"OK",class:"bg-red-500"}])}},VA=async(r,e)=>{e.showModal("Speichern...",'<div class="animate-pulse">Mannschaftsinfo wird gespeichert...</div>',[]);const t=new FormData(r),n={name:t.get("name"),name2:t.get("name2"),emblemUrl:T.teamInfo.emblemUrl||null},s=t.get("emblem");try{let i=null;const o=me(re,`artifacts/${ce}/public/data/config/team`);if(s&&s.size>0){const c=await zt(o);c.exists()&&c.data().emblemUrl&&(i=c.data().emblemUrl);const l=await y_(s,e);if(l)n.emblemUrl=l;else throw new Error("Vereinsemblem konnte nicht hochgeladen werden.")}await hr(o,n,{merge:!0}),i&&await Va(i,e),e.showModal("Gespeichert","Mannschaftsinfo erfolgreich aktualisiert.",[{text:"OK",class:"bg-green-500"}])}catch(i){console.error("saveMannschaftInfo: FEHLER beim Speichern der Mannschaftsinfo:",i),e.showModal("Fehler",`Konnte Mannschaftsinfo nicht speichern: ${i.message||"Unbekannter Fehler"}.`,[{text:"OK",class:"bg-red-500"}])}},NA=async(r,e)=>{const t=Ee(re,`artifacts/${ce}/public/data/spieler`),n=me(t,r);e.showModal("Spieler löschen?","Möchten Sie diesen Spieler wirklich endgültig löschen?",[{text:"Abbrechen",class:"bg-gray-500"},{text:"Ja, löschen",class:"bg-red-600",onClick:async()=>{try{const s=await zt(n);s.exists()&&s.data().fotoUrl&&await Va(s.data().fotoUrl,e),await fs(n),e.showModal("Gelöscht","Spieler wurde gelöscht.",[{text:"OK",class:"bg-blue-500",onClick:()=>e.navigateTo("spielerUebersicht",null,!0)}])}catch(s){e.showModal("Fehler",`Fehler beim Löschen des Spielers: ${s.message||"Unbekannter Fehler"}.`,[{text:"OK",class:"bg-red-500"}])}}}])},MA=async(r,e,t,n)=>{const s=Ee(re,`artifacts/${ce}/public/data/trainingseinheiten`),i=me(s,r);try{(await zt(i)).exists()?await Gt(i,{[`teilnehmer.${e}`]:t}):await hr(i,{teilnehmer:{[e]:t}})}catch(o){console.error("setAnwesenheit: FEHLER beim Setzen der Anwesenheit:",o),n.showModal("Fehler",`Fehler beim Speichern der Anwesenheit: ${o.message||"Unbekannter Fehler"}.`,[{text:"OK",class:"bg-red-500"}])}},OA=async(r,e,t)=>{const n=Ee(re,`artifacts/${ce}/public/data/trainingseinheiten`),s=me(n,r);t.showModal("Speichern...",'<div class="animate-pulse">Trainingsdetails werden gespeichert...</div>',[]);try{const i=await zt(s),o={time:e.time||null};i.exists()?await Gt(s,o):await hr(s,o),t.showModal("Gespeichert","Trainingsdetails wurden gespeichert!",[{text:"OK",class:"bg-green-500",onClick:()=>t.goBack()}])}catch(i){t.showModal("Fehler",`Fehler beim Speichern der Trainingsdetails: ${i.message||"Unbekannter Fehler"}.`,[{text:"OK",class:"bg-red-500"}])}},LA=async(r,e)=>{const t=Ee(re,`artifacts/${ce}/public/data/trainingseinheiten`),n=T.trainingseinheiten.find(c=>c.id===r);if(!n)return;const s=!n.cancelled,i=s?"abgesagt":"reaktiviert",o=me(t,r);try{await Gt(o,{cancelled:s}),e.showModal("Erfolg",`Training wurde erfolgreich ${i}.`,[{text:"OK",class:"bg-green-500"}])}catch(c){e.showModal("Fehler",`Das Training konnte nicht ${i} werden: ${c.message||"Unbekannter Fehler"}.`,[{text:"OK",class:"bg-red-500"}])}},FA=async(r,e)=>{const t=Ee(re,`artifacts/${ce}/public/data/trainingseinheiten`);e.showModal("Training löschen?","Möchten Sie diesen Trainingstag wirklich löschen?",[{text:"Abbrechen",class:"bg-gray-500"},{text:"Ja, löschen",class:"bg-red-600",onClick:async()=>{try{await fs(me(t,r)),e.showModal("Gelöscht","Trainingstag wurde gelöscht.",[{text:"OK",class:"bg-blue-500",onClick:()=>e.navigateTo("home",null,!0)}])}catch(n){e.showModal("Fehler",`Fehler beim Löschen des Trainingstags: ${n.message||"Unbekannter Fehler"}.`,[{text:"OK",class:"bg-red-500"}])}}}])},UA=async(r,e,t)=>{const n=Ee(re,`artifacts/${ce}/public/data/spieltage`),s=me(n,r);t.showModal("Speichern...",'<div class="animate-pulse">Matchdaten werden gespeichert...</div>',[]);try{const i=await zt(s),o={gegner:e.gegner,spielort:e.spielort,toreHeim:e.toreHeim,toreAuswaerts:e.toreAuswaerts,spielArt:e.spielArt,time:e.time||null};i.exists()?await Gt(s,o):await hr(s,o),t.showModal("Gespeichert","Matchdaten wurden gespeichert!",[{text:"OK",class:"bg-green-500",onClick:()=>t.goBack()}])}catch(i){t.showModal("Fehler",`Fehler beim Speichern des Matchtags: ${i.message||"Unbekannter Fehler"}.`,[{text:"OK",class:"bg-red-500"}])}},BA=async(r,e,t,n,s)=>{const i=Ee(re,`artifacts/${ce}/public/data/spieltage`),o=me(i,r),c=`aufstellung.${e}.${t}`;(t==="spielminuten"||t==="tore"||t==="vorlagen")&&(n=n===""?null:parseInt(n));try{(await zt(o)).exists()?await Gt(o,{[c]:n}):await hr(o,{aufstellung:{[e]:{[t]:n}}})}catch(l){s.showModal("Fehler",`Fehler beim Update der Aufstellung: ${l.message||"Unbekannter Fehler"}.`,[{text:"OK",class:"bg-red-500"}])}},$A=async(r,e)=>{const t=Ee(re,`artifacts/${ce}/public/data/spieltage`),n=T.matchtage.find(c=>c.id===r);if(!n)return;const s=!n.cancelled,i=s?"abgesagt":"reaktiviert",o=me(t,r);try{await Gt(o,{cancelled:s}),e.showModal("Erfolg",`Match wurde erfolgreich ${i}.`,[{text:"OK",class:"bg-green-500"}])}catch(c){e.showModal("Fehler",`Das Match konnte nicht ${i} werden: ${c.message||"Unbekannter Fehler"}.`,[{text:"OK",class:"bg-red-500"}])}},qA=async(r,e)=>{const t=Ee(re,`artifacts/${ce}/public/data/spieltage`);e.showModal("Matchtag löschen?","Möchten Sie diesen Matchtag wirklich löschen?",[{text:"Abbrechen",class:"bg-gray-500"},{text:"Ja, löschen",class:"bg-red-600",onClick:async()=>{try{await fs(me(t,r)),e.showModal("Gelöscht","Matchtag wurde gelöscht.",[{text:"OK",class:"bg-blue-500",onClick:()=>e.navigateTo("home",null,!0)}])}catch(n){e.showModal("Fehler",`Fehler beim Löschen des Matchtags: ${n.message||"Unbekannter Fehler"}.`,[{text:"OK",class:"bg-red-500"}])}}}])},jA=async(r,e)=>{const t=me(re,`artifacts/${ce}/public/data/config/team`),n=Ee(re,`artifacts/${ce}/public/data/trainingseinheiten`);e.showModal("Speichern...",'<div class="animate-pulse">Trainingsplan wird gespeichert...</div>',[]);const s=new FormData(r),i={};s.getAll("wochentag").forEach(l=>{const u=s.get(`zeit_${l}`);u&&(i[l]=u)});const c=s.get("trainingEndDate");try{await hr(t,{trainingSchedule:i,trainingEndDate:c},{merge:!0}),await w_(i,c,n,re),e.showModal("Gespeichert","Trainingsplan erfolgreich aktualisiert und Kalender wurde synchronisiert.",[{text:"OK",class:"bg-green-500"}])}catch(l){e.showModal("Fehler",`Konnte Trainingsplan nicht speichern: ${l.message||"Unbekannter Fehler"}.`,[{text:"OK",class:"bg-red-500"}])}},w_=async(r,e,t,n)=>{if(!e||Object.keys(r).length===0){const p=xr(t,el("autogenerated","==",!0)),E=await fi(p);if(E.empty)return;const A=Hn(n);E.forEach(D=>A.delete(D.ref)),await A.commit();return}const s=xr(t,el("autogenerated","==",!0)),i=await fi(s),o=Hn(n);i.forEach(p=>o.delete(p.ref)),await o.commit();const c=Hn(n),l=new Date;l.setHours(0,0,0,0);const u=new Date(e);u.setHours(0,0,0,0);const f={0:"Sonntag",1:"Montag",2:"Dienstag",3:"Mittwoch",4:"Donnerstag",5:"Freitag",6:"Samstag"};let g=l;for(;g<=u;){const p=f[g.getDay()];if(r[p]){const E=`${g.getFullYear()}-${(g.getMonth()+1).toString().padStart(2,"0")}-${g.getDate().toString().padStart(2,"0")}`,A=me(t,E),D={teilnehmer:{},autogenerated:!0,time:r[p]};c.set(A,D,{merge:!0})}g.setDate(g.getDate()+1)}await c.commit()},zA=(r,e)=>{let t={};switch(r){case"spieler":t={spieler:T.spieler};break;case"training":t={trainingseinheiten:T.trainingseinheiten};break;case"matchtage":t={matchtage:T.matchtage};break;default:t={teamInfo:T.teamInfo,spieler:T.spieler,trainingseinheiten:T.trainingseinheiten,matchtage:T.matchtage};break}const n=JSON.stringify(t,null,2),s=new Blob([n],{type:"application/json"}),i=URL.createObjectURL(s),o=document.createElement("a");o.href=i,o.download=`trainer-app-backup-${r}-${new Date().toISOString().slice(0,10)}.json`,document.body.appendChild(o),o.click(),document.body.removeChild(o),e.closeModal()},GA=async(r,e)=>{const t=Ee(re,`artifacts/${ce}/public/data/spieler`),n=Ee(re,`artifacts/${ce}/public/data/trainingseinheiten`),s=Ee(re,`artifacts/${ce}/public/data/spieltage`),i=me(re,`artifacts/${ce}/public/data/config/team`);e.showModal("Importieren...",'<div class="animate-pulse">Daten werden importiert...</div>',[]);try{const o=JSON.parse(r),c=Hn(re);if(o.teamInfo&&c.set(i,o.teamInfo,{merge:!0}),o.spieler&&Array.isArray(o.spieler))for(const u of o.spieler){const f=u.id?me(t,u.id):me(t),{id:g,...p}=u;c.set(f,p,{merge:!0})}if(o.trainingseinheiten&&Array.isArray(o.trainingseinheiten))for(const u of o.trainingseinheiten){const f=me(n,u.id),{id:g,...p}=u;c.set(f,p,{merge:!0})}const l=o.matchtage||o.spieltage;if(l&&Array.isArray(l))for(const u of l){const f=me(s,u.id),{id:g,...p}=u;c.set(f,p,{merge:!0})}await c.commit(),e.showModal("Import abgeschlossen","Daten erfolgreich importiert!",[{text:"OK",class:"bg-blue-500"}])}catch(o){e.showModal("Importfehler",`Ein Fehler ist beim Importieren der Daten aufgetreten: ${o.message||"Unbekannter Fehler"}.`,[{text:"OK",class:"bg-red-500"}])}},KA=async r=>{const e=Ee(re,`artifacts/${ce}/public/data/spieler`),t=Ee(re,`artifacts/${ce}/public/data/trainingseinheiten`),n=Ee(re,`artifacts/${ce}/public/data/spieltage`),s=me(re,`artifacts/${ce}/public/data/config/team`);r.showModal("Löschen...",'<div class="animate-pulse">Alle Daten werden gelöscht...</div>',[]);try{const i=[e,t,n];for(const o of i){const c=await fi(o),l=Hn(re);c.docs.forEach(u=>l.delete(u.ref)),await l.commit()}await fs(s),r.showModal("Gelöscht","Alle Daten wurden gelöscht.",[{text:"OK",class:"bg-blue-500"}])}catch(i){r.showModal("Fehler",`Fehler beim Löschen aller Daten: ${i.message||"Unbekannter Fehler"}.`,[{text:"OK",class:"bg-red-500"}])}},HA=async(r,e,t)=>{t.showModal("Löschen...",`<div class="animate-pulse">${e} werden gelöscht...</div>`,[]);try{const n=await fi(r),s=Hn(re);n.docs.forEach(i=>s.delete(i.ref)),await s.commit(),t.showModal("Gelöscht",`${e} wurden gelöscht.`,[{text:"OK",class:"bg-blue-500"}])}catch(n){t.showModal("Fehler",`Fehler beim Löschen von ${e}: ${n.message||"Unbekannter Fehler"}.`,[{text:"OK",class:"bg-red-500"}])}},WA=async r=>{r.showModal("Löschen...",'<div class="animate-pulse">Mannschaftsinfo wird gelöscht...</div>',[]);const e=me(re,`artifacts/${ce}/public/data/config/team`);try{await fs(e),r.showModal("Gelöscht","Die Mannschaftsinfo wurde gelöscht.",[{text:"OK",class:"bg-blue-500"}])}catch(t){r.showModal("Fehler",`Fehler beim Löschen der Mannschaftsinfo: ${t.message||"Unbekannter Fehler"}.`,[{text:"OK",class:"bg-red-500"}])}},QA=async r=>{r.showModal("Vereinsemblem löschen?","Möchten Sie das Vereinsemblem wirklich löschen? Das Emblem wird sofort entfernt und kann nicht wiederhergestellt werden.",[{text:"Abbrechen",class:"bg-gray-500"},{text:"Ja, löschen",class:"bg-red-600",onClick:async()=>{r.showModal("Löschen...",'<div class="animate-pulse">Emblem wird gelöscht...</div>',[]);const e=me(re,`artifacts/${ce}/public/data/config/team`);try{const t=await zt(e);t.exists()&&t.data().emblemUrl&&await Va(t.data().emblemUrl,r),await Gt(e,{emblemUrl:null}),r.showModal("Gelöscht","Das Vereinsemblem wurde entfernt.",[{text:"OK",class:"bg-blue-500"}])}catch(t){r.showModal("Fehler",`Fehler beim Löschen des Emblems: ${t.message||"Unbekannter Fehler"}.`,[{text:"OK",class:"bg-red-500"}])}}}])},JA=r=>{const e=T.teamInfo.name||r,t=T.teamInfo.name2||"",n=T.teamInfo.emblemUrl?`<img src="${T.teamInfo.emblemUrl}" class="w-8 h-8 rounded-full object-cover mr-3 flex-shrink-0" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
           <div class="w-8 h-8 rounded-full bg-gray-500 flex-shrink-0 mr-3 hidden items-center justify-center"></div>`:'<div class="w-8 h-8 rounded-full bg-gray-500 flex-shrink-0 mr-3 flex items-center justify-center"></div>',s=e.length>15?"text-base font-bold":"text-lg font-bold";return`
    <header class="bg-gray-800 text-gray-200 p-4 sticky top-0 z-50 flex items-center justify-between text-center h-16 border-b-2 border-green-500">
        ${T.isLoggedIn?`<button onclick="window.app.navigateTo('einstellungen', null, true)" class="flex flex-col items-center justify-center text-gray-400 hover:text-green-400 w-12 h-12 rounded-full hover:bg-gray-700 transition-colors absolute top-2 left-2" title="Einstellungen"><i class="fas fa-cog text-xl"></i></button>`:""}
        <div class="flex items-center justify-center flex-grow">
            ${n}
            <div>
                <h1 class="${s} whitespace-nowrap">${e}</h1>
                ${t?`<h2 class="text-sm text-gray-400 leading-tight whitespace-nowrap">${t}</h2>`:""}
            </div>
        </div>
        ${T.isLoggedIn?'<button onclick="window.app.logout()" class="flex flex-col items-center justify-center text-gray-400 hover:text-green-400 w-12 h-12 rounded-full hover:bg-gray-700 transition-colors absolute top-2 right-2" title="Ausloggen"><i class="fas fa-sign-out-alt text-xl"></i></button>':""}
    </header>`},YA=()=>{if(T.currentPage==="login"||!T.isLoggedIn)return"";const r=T.navigationStack.length>0&&T.currentPage!=="home",e="w-16 h-16",t=(s,i,o)=>{const l={home:["home","eventDetail"],spielerUebersicht:["spielerUebersicht","spielerDetail","spielerForm"],trainingUebersicht:["trainingUebersicht","trainingDetail"],matchtagUebersicht:["matchtagUebersicht","matchtagDetail"],einstellungen:["einstellungen"]}[s]?.includes(T.currentPage);return`<div class="flex-1 flex justify-center items-center">
                    <button onclick="window.app.navigateTo('${s}', null, true)" class="flex flex-col items-center justify-center text-gray-400 hover:text-green-400 ${e} rounded-full hover:bg-gray-700 transition-colors ${l?"text-green-400":""}" title="${o}">
                        <i class="fas ${i} text-xl"></i>
                        <span class="text-xs mt-1">${o}</span>
                    </button>
                </div>`};return`
        <div class="fixed bottom-0 left-0 right-0 z-40 p-4">
            <div class="bg-gradient-to-b from-gray-700 to-gray-800 border border-gray-600/75 shadow-lg rounded-full px-2 py-2 w-full max-w-sm mx-auto">
                <div class="flex justify-around items-center">
                    ${r?`<div class="flex-1 flex justify-center items-center"><button onclick="window.app.goBack()" class="flex flex-col items-center justify-center text-gray-400 hover:text-green-400 ${e} rounded-full hover:bg-gray-700 transition-colors" title="Zurück"><i class="fas fa-arrow-left text-xl"></i><span class="text-xs mt-1">Zurück</span></button></div>`:t("home","fa-home","Home")}
                    ${t("trainingUebersicht","fa-running","Training")}
                    ${t("matchtagUebersicht","fa-futbol","Matches")}
                    ${t("spielerUebersicht","fa-users","Spieler")}
                </div>
            </div>
        </div>`},yt=r=>{if(!r||typeof r!="string")return null;const e=r.split("-");return e.length!==3?null:new Date(e[0],parseInt(e[1],10)-1,parseInt(e[2],10))},it=r=>{const e=new Date(r),t=e.getFullYear(),n=`${e.getMonth()+1}`.padStart(2,"0"),s=`${e.getDate()}`.padStart(2,"0");return`${t}-${n}-${s}`},Bi=r=>{const e=yt(r);return e?e.toLocaleDateString("de-DE",{weekday:"short",year:"numeric",month:"numeric",day:"numeric"}):r},XA=r=>{if(!r)return null;const e=new Date,t=yt(r);if(!t)return null;let n=e.getFullYear()-t.getFullYear();const s=e.getMonth()-t.getMonth();return(s<0||s===0&&e.getDate()<t.getDate())&&n--,n},je=r=>{const e=new Date;if(e.setHours(0,0,0,0),r.verletztBis){const t=yt(r.verletztBis);if(t&&e<=t)return"Verletzt"}if(r.urlaubVon&&r.urlaubBis){const t=yt(r.urlaubVon),n=yt(r.urlaubBis);if(t&&n&&e>=t&&e<=n)return"Urlaub"}return r.status||"Aktiv"},mi=r=>{const e={Aktiv:{color:"bg-green-500"},Verletzt:{color:"bg-red-500"},Gesperrt:{color:"bg-yellow-500"},Urlaub:{color:"bg-blue-500"},Krank:{color:"bg-orange-500"},Inaktiv:{color:"bg-gray-400"}};return`<span class="inline-block w-3 h-3 ${(e[r]||e.Inaktiv).color} rounded-full" title="${r}"></span>`},pi=(r,e)=>{const t=it(new Date);return e.trainingseinheiten.filter(n=>!n.cancelled&&n.id<=t&&n.teilnehmer?.[r]==="Anwesend").length},_i=(r,e)=>{const t=it(new Date);return e.matchtage.filter(n=>!n.cancelled&&n.id<=t&&(n.aufstellung?.[r]?.position==="Startelf"||n.aufstellung?.[r]?.position==="Ersatzbank")).length},vu=(r,e)=>{const t=it(new Date);return e.matchtage.filter(n=>!n.cancelled&&n.id<=t).reduce((n,s)=>{const i=s.aufstellung?.[r]?.spielminuten;return n+(i?parseInt(i,10):0)},0)},I_=(r,e)=>{const t=it(new Date);return e.matchtage.filter(n=>!n.cancelled&&n.id<=t).reduce((n,s)=>{const i=s.aufstellung?.[r]?.tore;return n+(i?parseInt(i,10):0)},0)},b_=(r,e)=>{const t=it(new Date);return e.matchtage.filter(n=>!n.cancelled&&n.id<=t).reduce((n,s)=>{const i=s.aufstellung?.[r]?.vorlagen;return n+(i?parseInt(i,10):0)},0)},po=async(r,e)=>{if(!e.holidaysFetched[r])try{const t=await fetch(`https://date.nager.at/api/v3/PublicHolidays/${r}/DE`);if(!t.ok){console.error("Fehler beim Abrufen der Feiertage:",t.status,t.statusText);return}const i=(await t.json()).filter(o=>o.counties===null||o.counties.includes("DE-BW")).map(o=>({date:o.date,name:o.localName}));e.feiertage=[...e.feiertage,...i],e.holidaysFetched[r]=!0}catch(t){console.error("Fehler bei der Feiertags-API:",t)}},ZA=r=>{const e=T.currentDate.getMonth(),t=T.currentDate.getFullYear(),n=["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"],s=new Date(t,e,1),i=new Date(t,e+1,0),o=(s.getDay()+6)%7;let c="";for(let A=0;A<o;A++)c+='<div class="border rounded-lg dark:border-gray-700"></div>';for(let A=1;A<=i.getDate();A++){const D=new Date(t,e,A),k=it(D),B=new Date;B.setHours(0,0,0,0);let j="kalender-tag border dark:border-gray-700 rounded-lg p-2 flex flex-col justify-start items-center cursor-pointer";it(B)===k&&(j+=" heute");const F=T.trainingseinheiten.find(S=>S.id===k),Q=F&&F.cancelled,te=F&&!F.cancelled,U=T.matchtage.find(S=>S.id===k),w=U&&U.cancelled,_=U&&!U.cancelled,y=T.spieler.some(S=>S.geburtstag&&S.geburtstag.slice(5)===k.slice(5)),v=T.feiertage.some(S=>S.date===k),b=D<B;b&&(j+=" bg-gray-700/50"),c+=`<div class="${j}" onclick="window.app.handleCalendarDayClick('${k}')">
                        <span class="${v&&!b?"text-red-500 font-bold":""} ${b?"text-gray-500":""}">${A}</span>
                        <div class="event-icons mt-1 flex flex-col items-center space-y-1">
                            ${y&&T.showGeburtstageOnHomeCalendar?`<i class="fas fa-birthday-cake ${b?"text-gray-500":"text-pink-500"}"></i>`:""}
                            ${Q?`<i class="fas fa-times-circle ${b?"text-gray-500":"text-blue-500"}" title="Training Abgesagt"></i>`:""}
                            ${w?`<i class="fas fa-times-circle ${b?"text-gray-500":"text-yellow-500"}" title="Match Abgesagt"></i>`:""}
                            ${te&&T.showTrainingsOnHomeCalendar?`<i class="fas fa-running ${b?"text-gray-500":"text-blue-500"}"></i>`:""}
                            ${_&&T.showMatchesOnHomeCalendar?`<i class="fas fa-futbol ${b?"text-gray-500":"text-yellow-500"}"></i>`:""}
                        </div>
                    </div>`}const l=it(new Date),u=[];T.trainingseinheiten.forEach(A=>{!A.cancelled&&A.id>=l&&u.push({date:A.id,type:"Training",title:A.time?`Training (${A.time})`:"Training"})}),T.matchtage.forEach(A=>{!A.cancelled&&A.id>=l&&u.push({date:A.id,type:"Match",title:`Match gegen ${A.gegner||"Unbekannt"}`})}),T.spieler.forEach(A=>{if(A.geburtstag){const D=`${new Date().getFullYear()}-${A.geburtstag.slice(5)}`;D>=l&&u.push({date:D,type:"Geburtstag",title:A.name})}});const f=u.sort((A,D)=>A.date.localeCompare(D.date)),g={};f.forEach(A=>{A.type==="Training"&&!T.showTrainingsOnHomeCalendar||A.type==="Match"&&!T.showMatchesOnHomeCalendar||A.type==="Geburtstag"&&!T.showGeburtstageOnHomeCalendar||(g[A.date]||(g[A.date]=[]),g[A.date].push(A))});const p=Object.entries(g).slice(0,10),E=new Date().getMonth()===e&&new Date().getFullYear()===t;return`
        <div class="p-4 rounded-xl border border-gray-700">
            <div class="flex justify-between items-center mb-4">
                <button onclick="window.app.changeMonth(-1)" class="px-4 py-2 bg-gray-700 rounded-lg btn"><i class="fas fa-chevron-left"></i></button>
                <div class="text-center">
                    <h3 class="text-lg font-bold">${n[e]} ${t}</h3>
                    ${E?"":'<button onclick="window.app.goToToday()" class="text-xs text-blue-500 hover:underline">Heute</button>'}
                </div>
                <button onclick="window.app.changeMonth(1)" class="px-4 py-2 bg-gray-700 rounded-lg btn"><i class="fas fa-chevron-right"></i></button>
            </div>
            <div class="grid grid-cols-7 gap-2 text-center">
                ${["Mo","Di","Mi","Do","Fr","Sa","So"].map(A=>`<div class="font-semibold">${A}</div>`).join("")}
                ${c}
            </div>
            <div class="flex justify-center flex-wrap gap-x-4 gap-y-2 mt-4 text-sm">
                <label class="flex items-center cursor-pointer">
                    <input type="checkbox" class="form-checkbox h-4 w-4 text-blue-600 rounded" 
                           ${T.showTrainingsOnHomeCalendar?"checked":""} 
                           onchange="window.app.setHomeCalendarFilter('trainings', this.checked)">
                    <span class="ml-2 text-gray-300">Training</span>
                </label>
                <label class="flex items-center cursor-pointer">
                    <input type="checkbox" class="form-checkbox h-4 w-4 text-yellow-600 rounded" 
                           ${T.showMatchesOnHomeCalendar?"checked":""} 
                           onchange="window.app.setHomeCalendarFilter('matches', this.checked)">
                    <span class="ml-2 text-gray-300">Matches</span>
                </label>
                <label class="flex items-center cursor-pointer">
                    <input type="checkbox" class="form-checkbox h-4 w-4 text-pink-600 rounded" 
                           ${T.showGeburtstageOnHomeCalendar?"checked":""} 
                           onchange="window.app.setHomeCalendarFilter('geburtstage', this.checked)">
                    <span class="ml-2 text-gray-300">Geburtstage</span>
                </label>
            </div>
        </div>
        <div class="p-4 rounded-xl border border-gray-700">
            <h2 class="text-lg font-bold mb-2 text-center"><i class="fas fa-calendar-alt mr-2"></i>Nächste Termine</h2>
            <div class="space-y-2">
                ${p.length>0?p.map(([A,D])=>{const k=yt(A),B=it(new Date)===A;return`
                    <div class="flex items-center py-1 px-2 rounded-lg hover:bg-gray-700/50 cursor-pointer" onclick="window.app.showEventDetailModal('${A}')">
                        <div class="text-center mr-4 flex-shrink-0 w-16">
                            <p class="font-bold ${B?"text-green-400":""}">${k.toLocaleDateString("de-DE",{weekday:"short"})}</p>
                            <p class="text-2xl font-bold ${B?"text-green-400":""}">${k.getDate()}</p>
                            <p class="text-sm text-gray-400">${k.toLocaleDateString("de-DE",{month:"short"})}</p>
                        </div>
                        <div class="flex-grow border-l dark:border-gray-600 pl-4">
                            ${D.map(j=>{let F;switch(j.type){case"Training":F='<i class="fas fa-running text-blue-500"></i>';break;case"Match":F='<i class="fas fa-futbol text-yellow-500"></i>';break;case"Geburtstag":F='<i class="fas fa-birthday-cake text-pink-500"></i>';break;default:F="<span></span>"}return`
                                <div class="flex items-center gap-3 mb-2">
                                    <span class="text-xl w-6 text-center">${F}</span>
                                    <p class="font-semibold text-gray-200">${j.title}</p>
                                </div>
                                `}).join("")}
                        </div>
                    </div>
                    `}).join('<hr class="my-2 dark:border-gray-700">'):'<p class="text-center text-gray-400">Keine anstehenden Termine.</p>'}
            </div>
        </div>
    `},v_=()=>"475569",T_=()=>"E2E8F0",eS=(r,e)=>{const t=pi(r.id,T),n=e>0?Math.round(t/e*100):0,s=r.fotoUrl?`<img src="${r.fotoUrl}" class="profile-img rounded-full" onerror="this.src='https://placehold.co/48x48/${v_()}/${T_()}?text=${r.name.charAt(0)}';">`:`<div class="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center text-2xl">${r.position==="Torwart",""}</div>`;return`
        <div onclick="window.app.navigateTo('spielerDetail', '${r.id}')" class="p-4 rounded-xl flex items-center space-x-4 cursor-pointer hover:bg-gray-700/50 card border border-gray-700">
            ${s}
            <div class="flex-grow">
                <p class="font-bold">${r.name} <span class="text-gray-400 font-normal">#${r.nummer||"?"}</span></p>
                <div class="text-sm text-gray-400 mt-1">
                    <p class="flex items-center space-x-2">
                        ${mi(je(r))}
                        <span>${je(r)}</span>
                    </p>
                    <p class="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm items-center">
                        <span title="Trainingseinheiten" class="flex items-center gap-1"><i class="fas fa-running text-blue-500"></i> ${t}/${e} (${n}%)</span>
                        <span title="Matches" class="flex items-center gap-1"><i class="fas fa-futbol text-yellow-500"></i> ${_i(r.id,T)}</span>
                        <span title="Spielminuten" class="flex items-center gap-1"><i class="fas fa-clock text-gray-500"></i> ${vu(r.id,T)} min</span>
                    </p>
                </div>
            </div>
            <i class="fas fa-chevron-right text-gray-400"></i>
        </div>
    `},tS=r=>{let e=T.spieler.filter(c=>c.name.toLowerCase().includes(T.filter.toLowerCase()));const t={Aktiv:1,Verletzt:2,Gesperrt:3,Urlaub:4,Krank:5,Inaktiv:6};e.sort((c,l)=>{let u,f;switch(T.sortBy){case"name":return u=c.name.toLowerCase(),f=l.name.toLowerCase(),T.sortAsc?u.localeCompare(f):f.localeCompare(u);case"status":u=t[je(c)]||99,f=t[je(l)]||99;break;case"matches":u=_i(c.id,T),f=_i(l.id,T);break;case"training":u=pi(c.id,T),f=pi(l.id,T);break}return u===f?c.name.toLowerCase().localeCompare(l.name.toLowerCase()):T.sortAsc?u-f:f-u});const n=(c,l)=>{const u=T.sortBy===c,f=(u&&T.sortAsc,"");return`<button onclick="window.app.setSort('${c}')" class="px-3 py-1 text-sm rounded-full btn ${u?"bg-green-600 text-white":"bg-gray-700"}">${l} ${f}</button>`},s=it(new Date),o=T.trainingseinheiten.filter(c=>!c.cancelled&&c.id<=s).length;return`
        <div class="p-4 rounded-xl border border-gray-700">
            <button onclick="window.app.navigateTo('spielerForm')" class="w-full py-3 font-medium text-white uppercase bg-green-600 rounded-lg shadow-lg hover:bg-green-700 btn flex items-center justify-center gap-2">
                <i class="fas fa-plus"></i>
                Neuen Spieler hinzufügen
            </button>
        </div>
        <div class="p-4 rounded-xl border border-gray-700">
            <h3 class="text-sm font-bold text-gray-400 mb-2">Sortieren nach:</h3>
            <div class="flex justify-center flex-wrap gap-2">
                ${n("name","Name")}
                ${n("status","Status")}
                ${n("matches","Matches")}
                ${n("training","Training")}
            </div>
        </div>
        <div class="space-y-3">
            ${e.length>0?e.map(c=>eS(c,o)).join(""):`
            <div class="p-6 rounded-xl text-center text-gray-400 border border-gray-700">
                <p>Noch keine Spieler vorhanden.</p>
                <p class="mt-2">Fügen Sie einen neuen Spieler über den <span class="inline-block mx-1 px-2 py-1 bg-green-900 text-green-300 rounded-md font-bold">+</span> Button hinzu oder importieren Sie Daten in den Einstellungen.</p>
            </div>
            `}
        </div>
    `},nS=r=>{const e=T.spieler.find(o=>o.id===T.currentId);if(!e)return'<div class="p-4 text-center">Spieler nicht gefunden.</div>';const t=e.fotoUrl?`<img id="fotoDetail" src="${e.fotoUrl}" class="profile-img-detail rounded-full mx-auto" onerror="this.src='https://placehold.co/120x120/${v_()}/${T_()}?text=${e.name.charAt(0)}';">`:`<div class="w-32 h-32 rounded-full bg-gray-700 flex items-center justify-center text-6xl mx-auto">${e.position==="Torwart",""}</div>`;let n="";const s=je(e);if(s==="Verletzt"&&e.verletztBis){const o=yt(e.verletztBis);o&&(n=`<p class="text-red-500 text-sm mt-1">Verletzt bis: ${o.toLocaleDateString("de-DE")}</p>`)}else if(s==="Urlaub"&&e.urlaubVon&&e.urlaubBis){const o=yt(e.urlaubVon),c=yt(e.urlaubBis);o&&c&&(n=`<p class="text-blue-500 text-sm mt-1">Im Urlaub: ${o.toLocaleDateString("de-DE")} - ${c.toLocaleDateString("de-DE")}</p>`)}const i=yt(e.geburtstag);return`
        <div class="p-6 rounded-xl text-center border border-gray-700">
            ${t}
            <h2 class="text-2xl font-bold mt-4">${e.name} #${e.nummer||"?"}</h2>
            <p class="text-gray-400">${e.position}</p>
            <div class="mt-2 flex justify-center items-center space-x-2">
                ${mi(s)}
                <span>${s}</span>
            </div>
            ${n}
        </div>
        <div class="p-6 rounded-xl space-y-3 border border-gray-700">
            <h3 class="font-bold text-lg border-b dark:border-gray-700 pb-2">Informationen</h3>
            <p><strong>Alter:</strong> ${XA(e.geburtstag)||"N/A"}</p>
            <p><strong>Geburtstag:</strong> ${i?i.toLocaleDateString("de-DE"):"N/A"}</p>
            <p><strong>Telefon:</strong> ${e.telefon||"N/A"}</p>
            <p><strong>Email:</strong> ${e.email||"N/A"}</p>
            <p><strong>Notizen:</strong></p>
            <p class="bg-gray-700 p-3 rounded-lg">${e.notiz||"Keine Notizen."}</p>
        </div>
        <div class="p-6 rounded-xl space-y-3 border border-gray-700">
            <h3 class="font-bold text-lg border-b dark:border-gray-700 pb-2">Statistiken</h3>
            <p><strong>Trainings:</strong> ${pi(e.id,T)}</p>
            <p><strong>Matches:</strong> ${_i(e.id,T)}</p>
            <p><strong>Minuten:</strong> ${vu(e.id,T)}</p>
            <p><strong>Tore:</strong> ${I_(e.id,T)}</p>
            <p><strong>Vorlagen:</strong> ${b_(e.id,T)}</p>
        </div>
        <div class="flex space-x-4 mt-4">
            <button onclick="window.app.navigateTo('spielerForm', '${e.id}')" class="flex-1 py-3 font-medium text-white uppercase bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 btn">Bearbeiten</button>
            <button onclick="window.app.deleteSpieler('${e.id}')" class="flex-1 py-3 font-medium text-white uppercase bg-red-600 rounded-lg shadow-lg hover:bg-red-700 btn">Löschen</button>
        </div>
    `},rS=r=>{const t=!!T.currentId?T.spieler.find(s=>s.id===T.currentId):{},n=t.fotoUrl?`<img id="fotoVorschau" src="${t.fotoUrl}" class="w-24 h-24 rounded-full mx-auto object-cover">`:'<img id="fotoVorschau" src="#" alt="Vorschau" class="w-24 h-24 rounded-full mx-auto object-cover hidden">';return`
        <form id="spielerForm">
            <div class="p-6 rounded-xl space-y-3 border border-gray-700">
                <h2 class="text-xl font-bold text-center">Stammdaten</h2>
                <input type="hidden" name="id" value="${t.id||""}">
                <div>
                    <label class="font-semibold">Profilfoto</label>
                    ${n}
                    <input type="file" name="foto" id="fotoUpload" accept="image/*" class="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100 mt-2 dark:text-gray-400 dark:file:bg-gray-700 dark:file:text-gray-300 dark:hover:file:bg-gray-600">
                </div>
                <div>
                    <label class="font-semibold">Name</label>
                    <input type="text" name="name" value="${t.name||""}" class="w-full p-2 mt-1 bg-gray-100 dark:bg-gray-700 dark:text-gray-200 rounded-lg" required>
                </div>
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="font-semibold">Nummer</label>
                        <input type="number" name="nummer" value="${t.nummer||""}" class="w-full p-2 mt-1 bg-gray-100 dark:bg-gray-700 dark:text-gray-200 rounded-lg">
                    </div>
                    <div>
                        <label class="font-semibold">Geburtstag</label>
                        <input type="date" name="geburtstag" value="${t.geburtstag||""}" class="w-full p-2 mt-1 bg-gray-100 dark:bg-gray-700 dark:text-gray-200 rounded-lg">
                    </div>
                </div>
                <div>
                    <label class="font-semibold">Position</label>
                    <select name="position" class="w-full p-2 mt-1 bg-gray-100 dark:bg-gray-700 dark:text-gray-200 rounded-lg">
                        <option value="Torwart" ${t.position==="Torwart"?"selected":""}>Torwart</option>
                        <option value="Abwehr" ${t.position==="Abwehr"?"selected":""}>Abwehr</option>
                        <option value="Mittelfeld" ${t.position==="Mittelfeld"?"selected":""}>Mittelfeld</option>
                        <option value="Sturm" ${t.position==="Sturm"?"selected":""}>Sturm</option>
                    </select>
                </div>
            </div>

            <div class="p-6 rounded-xl space-y-3 border border-gray-700">
                <h2 class="text-xl font-bold text-center">Status & Abwesenheiten</h2>
                <div>
                    <label class="font-semibold">Manueller Status</label>
                    <select name="status" class="w-full p-2 mt-1 bg-gray-100 dark:bg-gray-700 dark:text-gray-200 rounded-lg">
                        <option value="Aktiv" ${t.status==="Aktiv"?"selected":""}>Aktiv</option>
                        <option value="Inaktiv" ${t.status==="Inaktiv"?"selected":""}>Inaktiv</option>
                        <option value="Gesperrt" ${t.status==="Gesperrt"?"selected":""}>Gesperrt</option>
                        <option value="Krank" ${t.status==="Krank"?"selected":""}>Krank</option>
                        <option value="Urlaub" ${t.status==="Urlaub"?"selected":""}>Urlaub</option>
                        <option value="Verletzt" ${t.status==="Verletzt"?"selected":""}>Verletzt</option>
                    </select>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label class="text-sm">Urlaub von</label>
                        <div class="flex items-center gap-2">
                            <input type="date" name="urlaubVon" id="urlaubVonInput" value="${t.urlaubVon||""}" class="flex-grow p-2 mt-1 bg-gray-100 dark:bg-gray-700 dark:text-gray-200 rounded-lg">
                            <button type="button" onclick="window.app.clearDateField('urlaubVonInput')" class="p-2 mt-1 bg-red-100 text-red-600 rounded-lg btn" title="Datum löschen"><i class="fas fa-times"></i></button>
                        </div>
                    </div>
                    <div>
                        <label class="text-sm">Urlaub bis</label>
                        <div class="flex items-center gap-2">
                            <input type="date" name="urlaubBis" id="urlaubBisInput" value="${t.urlaubBis||""}" class="flex-grow p-2 mt-1 bg-gray-100 dark:bg-gray-700 dark:text-gray-200 rounded-lg">
                            <button type="button" onclick="window.app.clearDateField('urlaubBisInput')" class="p-2 mt-1 bg-red-100 text-red-600 rounded-lg btn" title="Datum löschen"><i class="fas fa-times"></i></button>
                        </div>
                    </div>
                </div>
                <div class="mt-2">
                    <label class="font-semibold">Verletzt bis</label>
                    <div class="flex items-center gap-2">
                        <input type="date" name="verletztBis" id="verletztBisInput" value="${t.verletztBis||""}" class="flex-grow p-2 mt-1 bg-gray-100 dark:bg-gray-700 dark:text-gray-200 rounded-lg">
                        <button type="button" onclick="window.app.clearDateField('verletztBisInput')" class="p-2 mt-1 bg-red-100 text-red-600 rounded-lg btn" title="Datum löschen"><i class="fas fa-times"></i></button>
                        </div>
                </div>
            </div>

            <div class="p-6 rounded-xl space-y-3 border border-gray-700">
                <h2 class="text-xl font-bold text-center">Notizen</h2>
                <div>
                    <textarea name="notiz" rows="3" class="w-full p-2 mt-1 bg-gray-100 dark:bg-gray-700 dark:text-gray-200 rounded-lg">${t.notiz||""}</textarea>
                </div>
            </div>
            <button type="submit" class="w-full py-3 mt-4 font-medium text-white uppercase bg-green-600 rounded-lg shadow-lg hover:bg-green-700 btn">Speichern</button>
        </form>
    `},sS=(r,e)=>{const t=Object.values(r.teilnehmer||{}).filter(l=>l==="Anwesend").length,n=e>0?Math.round(t/e*100):0,s=r.cancelled;let i=`${n}% Anwesenheit`,o="text-blue-400",c="fa-running";return s?(i="Abgesagt",o="text-red-500",c="fa-times-circle"):e===0?(i="Keine aktiven Spieler",o="text-gray-400"):n===100?o="text-green-400":n<50&&(o="text-orange-500"),`
        <div data-id="${r.id}" class="flex justify-between items-center p-3 rounded-lg hover:bg-gray-700/50 cursor-pointer training-card">
            <div>
                <p class="font-semibold">${Bi(r.id)} ${r.time?`(${r.time} Uhr)`:""}</p>
                <p class="text-sm ${o} flex items-center gap-1"><i class="fas ${c}"></i> ${i}</p>
            </div>
            <i class="fas fa-chevron-right text-gray-400"></i>
        </div>
    `},iS=r=>{const e=r.cancelled;let t=`vs ${r.gegner||"Unbekannt"}`,n="text-gray-400",s="fa-futbol";if(e)t="Abgesagt",n="text-red-500",s="fa-times-circle";else if(r.toreHeim!==null&&r.toreHeim!==void 0&&r.toreAuswaerts!==null&&r.toreAuswaerts!==void 0){const i=r.spielort==="Heim"?r.toreHeim:r.toreAuswaerts,o=r.spielort==="Heim"?r.toreAuswaerts:r.toreHeim;t=`${i} : ${o} gegen ${r.gegner||"Unbekannt"}`,i>o?n="text-green-400":i<o?n="text-red-500":n="text-yellow-500"}return`
        <div data-id="${r.id}" class="flex justify-between items-center p-3 rounded-lg hover:bg-gray-700/50 cursor-pointer match-card">
            <div>
                <p class="font-semibold">${Bi(r.id)} ${r.time?`(${r.time} Uhr)`:""}</p>
                <p class="text-sm ${n} flex items-center gap-1"><i class="fas ${s}"></i> ${t}</p>
            </div>
            <i class="fas fa-chevron-right text-gray-400"></i>
        </div>
    `},E_=(r,e,t,n)=>`
        <div class="flex justify-between items-center p-2 rounded-lg ${e<3?n:""}">
            <div>
                <span class="font-semibold text-gray-400 w-8 inline-block">${e+1}.</span>
                <button data-id="${r.id}" class="hover:text-blue-400 spieler-link">${r.name}</button>
            </div>
            <span class="font-bold px-2 py-1 rounded-full text-sm">${t}</span>
        </div>
    `,oS=r=>{let t=`<div class="p-4 rounded-xl border border-gray-700">
        <button id="add-training-btn" class="w-full py-3 font-medium text-white uppercase bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 btn flex items-center justify-center gap-2">
            <i class="fas fa-plus"></i>
            Training hinzufügen
        </button>
    </div>`;t+=`
        <div class="p-4 rounded-xl border border-gray-700 mb-4">
            <div class="flex justify-between items-center gap-2">
                <button id="show-all-trainings-btn" class="px-4 py-2 rounded-lg btn ${T.trainingListView==="all"?"bg-blue-600 text-white":"bg-gray-700"}">Alle Trainingseinheiten</button>
                <button id="show-top10-trainings-btn" class="px-4 py-2 rounded-lg btn ${T.trainingListView==="top10"?"bg-blue-600 text-white":"bg-gray-700"}">Top 10 Training-Statistik</button>
            </div>
        </div>
    `;const n=it(new Date),i=T.trainingseinheiten.filter(l=>!l.cancelled&&l.id<=n).length,o=T.spieler.filter(l=>je(l)!=="Inaktiv").length,c=T.spieler.map(l=>({...l,trainingCount:pi(l.id,T)})).filter(l=>l.trainingCount>0).sort((l,u)=>u.trainingCount-l.trainingCount).slice(0,10);return T.trainingListView==="top10"?t+=`
        <div class="p-4 rounded-xl border border-gray-700">
            <h2 class="text-lg font-bold mb-4 text-center">Top 10 Training-Statistik</h2>
            <div class="space-y-2">
                ${c.length>0?c.map((l,u)=>E_(l,u,`${l.trainingCount}/${i} (${i>0?Math.round(l.trainingCount/i*100):0}%)`,"bg-green-900/50")).join(""):'<p class="text-center text-gray-400">Noch keine Trainingsdaten vorhanden.</p>'}
            </div>
        </div>
        `:T.trainingListView==="all"&&(t+=`
        <div class="p-4 rounded-xl border border-gray-700">
            <h2 class="text-lg font-bold mb-4 text-center">Alle Trainingseinheiten</h2>
            <div class="space-y-2">
                ${[...T.trainingseinheiten].sort((l,u)=>l.id.localeCompare(u.id)).map(l=>sS(l,o)).join("")}
            </div>
        </div>
        `),t},aS=r=>{let t=`<div class="p-4 rounded-xl border border-gray-700">
        <button id="add-match-btn" class="w-full py-3 font-medium text-white uppercase bg-yellow-500 rounded-lg shadow-lg hover:bg-yellow-600 btn flex items-center justify-center gap-2">
            <i class="fas fa-plus"></i>
            Match hinzufügen
        </button>
    </div>`;t+=`
        <div class="p-4 rounded-xl border border-gray-700 mb-4">
            <div class="flex justify-between items-center gap-2">
                <button id="show-all-matches-btn" class="px-4 py-2 rounded-lg btn ${T.matchtagListView==="all"?"bg-yellow-500 text-white":"bg-gray-700"}">Alle Matchtage</button>
                <button id="show-top10-matches-btn" class="px-4 py-2 rounded-lg btn ${T.matchtagListView==="top10"?"bg-yellow-500 text-white":"bg-gray-700"}">Top 10 Match-Statistik</button>
            </div>
        </div>
    `;const n={matches:i=>_i(i,T),minuten:i=>vu(i,T),tore:i=>I_(i,T),vorlagen:i=>b_(i,T)},s=T.spieler.map(i=>({...i,stat:n[T.statsFilter](i.id)})).filter(i=>i.stat>0).sort((i,o)=>o.stat-i.stat).slice(0,10);return T.matchtagListView==="top10"?t+=`
        <div class="p-4 rounded-xl border border-gray-700">
            <h2 class="text-lg font-bold mb-4 text-center"> Top 10 Match-Statistik</h2>
            <div class="flex justify-center flex-wrap gap-2 mb-4">
                <button id="filter-matches-btn" class="px-3 py-1 text-sm rounded-full btn ${T.statsFilter==="matches"?"bg-yellow-500 text-white":"bg-gray-700"}">Matches</button>
                <button id="filter-minuten-btn" class="px-3 py-1 text-sm rounded-full btn ${T.statsFilter==="minuten"?"bg-yellow-500 text-white":"bg-gray-700"}">Minuten</button>
                <button id="filter-tore-btn" class="px-3 py-1 text-sm rounded-full btn ${T.statsFilter==="tore"?"bg-yellow-500 text-white":"bg-gray-700"}">Tore</button>
                <button id="filter-vorlagen-btn" class="px-3 py-1 text-sm rounded-full btn ${T.statsFilter==="vorlagen"?"bg-yellow-500 text-white":"bg-gray-700"}">Vorlagen</button>
            </div>
            <div class="space-y-2">
                ${s.length>0?s.map((i,o)=>E_(i,o,i.stat,"bg-yellow-900/50")).join(""):'<p class="text-center text-gray-400">Noch keine Matchdaten vorhanden.</p>'}
            </div>
        </div>
        `:T.matchtagListView==="all"&&(t+=`
        <div class="p-4 rounded-xl border border-gray-700">
            <h2 class="text-lg font-bold mb-4 text-center">Alle Matchtage</h2>
            <div class="space-y-2">
                ${[...T.matchtage].sort((i,o)=>i.id.localeCompare(o.id)).map(i=>iS(i)).join("")}
                ${T.matchtage.length===0?'<p class="text-center text-gray-400">Noch keine Matchtage vorhanden.</p>':""}
            </div>
        </div>
        `),t},cS=r=>{const e=T.trainingseinheiten.find(o=>o.id===T.currentId)||{teilnehmer:{},time:""},t={Aktiv:1,Urlaub:2,Verletzt:3,Krank:4,Gesperrt:5,Inaktiv:6},n=T.spieler.filter(o=>je(o)!=="Inaktiv").sort((o,c)=>(t[je(o)]||99)-(t[je(c)]||99)),s={anwesend:0,abwesend:0,unentschuldigt:0,verletzt:0,urlaub:0,krank:0,gesperrt:0};n.forEach(o=>{const c=je(o),l=e.teilnehmer?.[o.id];["Verletzt","Urlaub","Krank","Gesperrt"].includes(c)?s[c.toLowerCase()]++:l==="Anwesend"?s.anwesend++:l==="Abwesend"?s.abwesend++:l==="Unentschuldigt"&&s.unentschuldigt++});const i=(o,c,l)=>`
        <div class="${l} p-2 rounded-lg text-white">
            <p class="font-bold text-lg">${c}</p>
            <p class="text-xs">${o}</p>
        </div>
    `;return`
        <div class="p-4 rounded-xl border border-gray-700">
            <h2 class="text-xl font-bold text-center">Anwesenheit am ${Bi(T.currentId)}</h2>
            <form id="trainingDetailForm" class="space-y-4">
                <input type="hidden" name="id" value="${T.currentId}">
                <div>
                    <label class="font-semibold">Uhrzeit</label>
                    <input type="time" name="time" value="${e.time||""}" class="w-full p-2 mt-1 bg-gray-700 text-gray-200 rounded-lg">
                </div>
                <button type="submit" class="w-full py-2 bg-blue-600 text-white rounded-lg btn">Trainingsdetails speichern</button>
            </form>
            
            <div class="grid grid-cols-3 sm:grid-cols-6 gap-2 text-center mb-4 text-xs mt-4 border-t border-gray-700 pt-4">
                ${i("Anwesend",s.anwesend,"bg-green-500")}
                ${i("Abwesend",s.abwesend,"bg-red-500")}
                ${i("Unentsch.",s.unentschuldigt,"bg-gray-500")}
                ${i("Verletzt",s.verletzt,"bg-purple-500")}
                ${i("Krank",s.krank,"bg-orange-500")}
                ${i("Urlaub",s.urlaub,"bg-blue-500")}
            </div>

            <div class="space-y-3 border-t border-gray-700 pt-4">
                ${n.map(o=>{const c=je(o),l=["Urlaub","Verletzt","Krank","Gesperrt"].includes(c);return`
                    <div class="flex items-center justify-between p-2 rounded-lg hover:bg-gray-700/50">
                        <button data-id="${o.id}" class="font-semibold text-left hover:text-blue-400 flex items-center cursor-pointer spieler-link">${mi(c)} <span class="ml-2">${o.name}</span></button>
                        ${l?`<div class="text-sm italic text-gray-400">${c}</div>`:`
                        <div class="flex space-x-1">
                            <button data-status="Anwesend" data-spieler-id="${o.id}" class="w-8 h-8 rounded-full text-sm font-bold anwesenheit-btn ${e.teilnehmer?.[o.id]==="Anwesend"?"bg-green-500 text-white":"bg-gray-600"}" title="Anwesend">A</button>
                            <button data-status="Abwesend" data-spieler-id="${o.id}" class="w-8 h-8 rounded-full text-sm font-bold anwesenheit-btn ${e.teilnehmer?.[o.id]==="Abwesend"?"bg-red-500 text-white":"bg-gray-600"}" title="Abwesend">B</button>
                            <button data-status="Unentschuldigt" data-spieler-id="${o.id}" class="w-8 h-8 rounded-full text-sm font-bold anwesenheit-btn ${e.teilnehmer?.[o.id]==="Unentschuldigt"?"bg-gray-500 text-white":"bg-gray-600"}" title="Unentschuldigt">U</button>
                        </div>
                        `}
                    </div>
                    `}).join("")}
            </div>
            <div class="flex space-x-2 mt-6">
                <button id="toggle-training-cancellation" class="flex-1 py-2 ${e.cancelled?"bg-green-500":"bg-yellow-500"} text-white rounded-lg btn">${e.cancelled?"Training Reaktivieren":"Training Absagen"}</button>
                <button id="delete-training-btn" class="flex-1 py-2 bg-red-600 text-white rounded-lg btn">Training löschen</button>
            </div>
        </div>
    `},lS=r=>{const e=T.matchtage.find(o=>o.id===T.currentId)||{aufstellung:{},gegner:"",toreHeim:null,toreAuswaerts:null,spielort:"Heim",time:""},t={startelf:[],ersatzbank:[],nichtImKader:[],nichtVerfuegbar:[]};T.spieler.filter(o=>je(o)!=="Inaktiv").forEach(o=>{const c=e.aufstellung?.[o.id]?.position,l=je(o);["Verletzt","Urlaub","Krank","Gesperrt"].includes(l)?t.nichtVerfuegbar.push(o):c==="Startelf"?t.startelf.push(o):c==="Ersatzbank"?t.ersatzbank.push(o):t.nichtImKader.push(o)});const s=o=>{const c=e.aufstellung?.[o.id]||{},l=c.position||"Nicht dabei",u=l==="Startelf"||l==="Ersatzbank";return`
            <div class="p-2 rounded-lg border border-gray-700">
                <div class="flex justify-between items-center">
                    <button data-id="${o.id}" class="font-semibold text-left hover:text-blue-400 flex items-center cursor-pointer spieler-link">${mi(je(o))} <span class="ml-2">${o.name}</span></button>
                    <div class="flex space-x-1">
                        <button data-position="Startelf" data-spieler-id="${o.id}" class="px-2 py-1 text-xs rounded btn match-position-btn ${l==="Startelf"?"bg-green-500 text-white":"bg-gray-600"}" title="Startelf">S11</button>
                        <button data-position="Ersatzbank" data-spieler-id="${o.id}" class="px-2 py-1 text-xs rounded btn match-position-btn ${l==="Ersatzbank"?"bg-yellow-500 text-white":"bg-gray-600"}" title="Ersatzbank">Bank</button>
                        <button data-position="Nicht dabei" data-spieler-id="${o.id}" class="px-2 py-1 text-xs rounded btn match-position-btn ${l==="Nicht dabei"||!l?"bg-gray-400 text-white":"bg-gray-600"}" title="Nicht im Kader">Kader</button>
                    </div>
                </div>
                ${u?`
                <div class="flex flex-wrap items-center gap-2 mt-2 border-t border-gray-700 pt-2">
                    <input type="number" placeholder="Min" data-field="spielminuten" data-spieler-id="${o.id}" value="${c.spielminuten||""}" class="w-14 p-1 border rounded-md bg-gray-700 text-gray-200 border-gray-600 match-stat-input" title="Minuten">
                    <input type="number" placeholder="T" data-field="tore" data-spieler-id="${o.id}" value="${c.tore||""}" class="w-12 p-1 border rounded-md bg-gray-700 text-gray-200 border-gray-600 match-stat-input" title="Tore">
                    <input type="number" placeholder="V" data-field="vorlagen" data-spieler-id="${o.id}" value="${c.vorlagen||""}" class="w-12 p-1 border rounded-md bg-gray-700 text-gray-200 border-gray-600 match-stat-input" title="Vorlagen">
                </div>
                `:""}
            </div>
        `},i=(o,c,l=!0)=>`
        <div>
            <h4 class="font-bold text-lg mb-2">${o} (${c.length})</h4>
            <div class="space-y-2">
                ${l?c.map(s).join(""):c.map(u=>`
                        <div class="p-2 rounded-lg border bg-gray-700/50 text-gray-400 border-gray-700">
                            <button data-id="${u.id}" class="font-semibold text-left hover:text-blue-400 flex items-center cursor-pointer spieler-link">${mi(je(u))} <span class="ml-2">${u.name}</span> <span class="italic ml-2">(${je(u)})</span></button>
                        </div>
                    `).join("")}
            </div>
        </div>
    `;return`
        <div class="p-4 rounded-xl border border-gray-700">
            <h2 class="text-xl font-bold mb-4">Matchdaten für ${Bi(T.currentId)}</h2>
            <form id="matchtagForm" class="space-y-4">
                <input type="hidden" name="id" value="${T.currentId}">
                <div>
                    <label class="font-semibold">Spielort</label>
                    <div class="flex gap-2 mt-1">
                        <input type="hidden" name="spielort" value="${e.spielort||"Heim"}">
                        <button type="button" id="heimBtn" class="flex-1 py-2 rounded-lg btn ${e.spielort!=="Auswärts"?"bg-green-600 text-white":"bg-gray-700"}">Heim</button>
                        <button type="button" id="auswaertsBtn" class="flex-1 py-2 rounded-lg btn ${e.spielort==="Auswärts"?"bg-green-600 text-white":"bg-gray-700"}">Auswärts</button>
                    </div>
                </div>
                <div>
                    <label class="font-semibold">Gegner</label>
                    <input type="text" name="gegner" value="${e.gegner||""}" class="w-full p-2 mt-1 bg-gray-700 text-gray-200 rounded-lg">
                </div>
                <div class="flex items-center gap-4">
                    <div class="flex-1">
                        <label class="font-semibold text-sm">Tore Heim</label>
                        <input type="number" name="toreHeim" value="${e.toreHeim===null||e.toreHeim===void 0?"":e.toreHeim}" class="w-full p-2 mt-1 bg-gray-700 text-gray-200 rounded-lg text-center">
                    </div>
                    <span class="text-2xl font-bold mt-6">:</span>
                    <div class="flex-1">
                        <label class="font-semibold text-sm">Tore Gast</label>
                        <input type="number" name="toreAuswaerts" value="${e.toreAuswaerts===null||e.toreAuswaerts===void 0?"":e.toreAuswaerts}" class="w-full p-2 mt-1 bg-gray-700 text-gray-200 rounded-lg text-center">
                    </div>
                </div>
                <div>
                    <label class="font-semibold">Uhrzeit</label>
                    <input type="time" name="time" value="${e.time||""}" class="w-full p-2 mt-1 bg-gray-700 text-gray-200 rounded-lg">
                </div>
                <div>
                    <label class="font-semibold">Matchart</label>
                    <select name="spielArt" class="w-full p-2 mt-1 bg-gray-700 text-gray-200 rounded-lg">
                        <option value="Ligamatch" ${e.spielArt==="Ligamatch"||e.spielArt==="Ligaspiel"?"selected":""}>Ligamatch</option>
                        <option value="Freundschaftsmatch" ${e.spielArt==="Freundschaftsmatch"||e.spielArt==="Freundschaftsspiel"?"selected":""}>Freundschaftsmatch</option>
                        <option value="Pokalmatch" ${e.spielArt==="Pokalmatch"||e.spielArt==="Pokalspiel"?"selected":""}>Pokalmatch</option>
                    </select>
                </div>
                <button type="submit" class="w-full py-2 bg-blue-600 text-white rounded-lg btn">Matchdaten speichern</button>
            </form>
        </div>
        
        <div class="p-4 rounded-xl border border-gray-700 space-y-4">
            ${i("Startelf",t.startelf)}
            ${i("Ersatzbank",t.ersatzbank)}
            ${i("Nicht im Kader",t.nichtImKader)}
            ${Array.isArray(t.nichtVerfuegbar)&&t.nichtVerfuegbar.length>0?i("Nicht verfügbar",t.nichtVerfuegbar,!1):""}
        </div>
        <div class="flex space-x-2 mt-6">
            <button id="toggle-match-cancellation" class="flex-1 py-2 ${e.cancelled?"bg-green-500":"bg-yellow-500"} text-white rounded-lg btn">${e.cancelled?"Match reaktivieren":"Match absagen"}</button>
            <button id="delete-match-btn" class="flex-1 py-2 bg-red-600 text-white rounded-lg btn">Matchtag löschen</button>
        </div>
    `},uS=()=>{const r=T.teamInfo.emblemUrl?`<img id="emblemVorschau" src="${T.teamInfo.emblemUrl}" class="w-24 h-24 rounded-full mx-auto object-cover">`:'<img id="emblemVorschau" src="#" alt="Vorschau" class="w-24 h-24 rounded-full mx-auto object-cover hidden">';return`
        <div class="p-6 rounded-xl border border-gray-700">
            <h2 class="text-xl font-bold text-center">Darstellung</h2>
            <p class="text-center text-gray-400">Der Dunkelmodus ist standardmäßig aktiviert.</p>
        </div>
        <div class="p-6 rounded-xl border border-gray-700">
            <h2 class="text-xl font-bold text-center">Mannschaft</h2>
            <form id="mannschaftForm" class="space-y-3">
                <div>
                    <label class="font-semibold text-sm">Mannschaftsname</label>
                    <input type="text" name="name" value="${T.teamInfo.name||""}" class="w-full p-2 mt-1 bg-gray-700 text-gray-200 rounded-lg">
                </div>
                <div>
                    <label class="font-semibold text-sm">Mannschaftsname (Zeile 2)</label>
                    <input type="text" name="name2" value="${T.teamInfo.name2||""}" class="w-full p-2 mt-1 bg-gray-700 text-gray-200 rounded-lg">
                </div>
                <div>
                    <label class="font-semibold text-sm">Vereinsemblem</label>
                    ${r}
                    <input type="file" name="emblem" id="emblemUpload" accept="image/*" class="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gray-700 file:text-gray-300 hover:file:bg-gray-600 mt-2">
                    ${T.teamInfo.emblemUrl?'<button type="button" onclick="window.app.deleteMannschaftEmblem()" class="w-full py-2 mt-2 font-medium text-white uppercase bg-red-600 rounded-lg shadow-lg hover:bg-red-700 btn">Emblem löschen</button>':""}
                </div>
                <button type="submit" class="w-full py-3 mt-4 font-medium text-white uppercase bg-green-600 rounded-lg shadow-lg hover:bg-green-700 btn">Mannschaftsinfo Speichern</button>
            </form>
        </div>
        <div class="p-6 rounded-xl border border-gray-700">
            <h2 class="text-xl font-bold text-center">Regelmäßige Trainingseinheiten</h2>
            <form id="trainingsForm" class="space-y-3">
                ${["Montag","Dienstag","Mittwoch","Donnerstag","Freitag","Samstag","Sonntag"].map(e=>{const t=T.teamInfo.trainingSchedule||{},n=!!t[e],s=t[e]||"";return`
                            <div class="flex items-center justify-between p-2 rounded-lg hover:bg-gray-700/50">
                                <label for="training_${e}" class="flex items-center space-x-3 flex-grow cursor-pointer">
                                    <input type="checkbox" id="training_${e}" name="wochentag" value="${e}" ${n?"checked":""} class="h-5 w-5 rounded text-green-600 focus:ring-green-500">
                                    <span>${e}</span>
                                </label>
                                <input type="time" name="zeit_${e}" value="${s}" class="p-1 bg-gray-700 text-gray-200 rounded-lg w-32 border border-gray-600 focus:ring-green-500 focus:border-green-500">
                            </div>
                            `}).join("")}
                <div class="border-t border-gray-700 pt-4">
                    <label for="trainingEndDate" class="font-semibold text-sm">Trainings automatisch eintragen bis:</label>
                    <input type="date" id="trainingEndDate" name="trainingEndDate" value="${T.teamInfo.trainingEndDate||""}" class="w-full p-2 mt-1 bg-gray-700 text-gray-200 rounded-lg">
                </div>
                <button type="submit" class="w-full py-3 mt-4 font-medium text-white uppercase bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 btn">Trainingsplan Speichern & Kalender Aktualisieren</button>
            </form>
        </div>
        <div class="p-6 rounded-xl border border-gray-700">
            <h2 class="text-xl font-bold text-center">Datenverwaltung</h2>
            <input type="file" id="jsonImportInput" accept=".json" class="hidden">
            <div class="flex gap-2 mb-4">
                <button onclick="window.app.importData()" class="flex-1 py-3 font-medium text-white uppercase bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 btn">Daten Import.</button>
                <button onclick="window.app.showExportOptionsModal()" class="flex-1 py-3 font-medium text-white uppercase bg-gray-600 rounded-lg shadow-lg hover:bg-gray-700 btn">Daten Export.</button>
            </div>
            <button onclick="window.app.showDeleteOptionsModal()" class="w-full py-3 font-medium text-white uppercase bg-red-600 rounded-lg shadow-lg hover:bg-red-700 btn">Daten löschen</button>
        </div>
    `},_o=document.getElementById("app-container"),Re=r=>{if(_o.innerHTML="",T.loading){_o.innerHTML='<div class="flex justify-center items-center h-screen"><div class="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-green-500"></div></div>';return}let e="",t="";switch(T.currentPage){case"login":e=`
                <div class="min-h-screen flex flex-col justify-center items-center p-4 bg-gray-900">
                    <div class="w-full max-w-md">
                        <div class="bg-gray-800/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg text-center">
                            <div class="flex justify-center mb-6">
                                ${T.teamInfo.emblemUrl?`<img src="${T.teamInfo.emblemUrl}" class="w-20 h-20 rounded-full object-cover shadow-md" onerror="this.style.display='none';">`:'<div class="w-20 h-20 rounded-full bg-gray-600 flex items-center justify-center text-4xl text-gray-500 shadow-md"></div>'}
                            </div>
                            <h1 class="text-2xl font-bold text-gray-200 mb-2">Willkommen</h1>
                            <p class="text-gray-400 mb-8">${T.teamInfo.name2||"Bitte melden Sie sich an"}</p>
                            <form id="loginForm" class="space-y-6">
                                <div class="relative">
                                    <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"><i class="fas fa-envelope"></i></span>
                                    <input type="email" id="email" name="email" class="w-full p-3 pl-12 text-gray-300 bg-gray-700 rounded-lg focus:outline-none focus:bg-gray-600 focus:ring-2 focus:ring-green-500 transition-all" value="trainer@demo.com" placeholder="Benutzer (E-Mail)" required>
                                </div>
                                <div class="relative">
                                    <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"><i class="fas fa-lock"></i></span>
                                    <input type="password" id="password" name="password" class="w-full p-3 pl-12 text-gray-300 bg-gray-700 rounded-lg focus:outline-none focus:bg-gray-600 focus:ring-2 focus:ring-green-500 transition-all" value="1234" placeholder="Passwort" required>
                                </div>
                                <div>
                                    <button type="submit" class="w-full py-3 mt-6 font-medium tracking-widest text-white uppercase bg-gradient-to-r from-green-500 to-green-600 rounded-lg shadow-lg focus:outline-none hover:from-green-600 hover:to-green-700 hover:shadow-xl btn">Anmelden</button>
                                </div>
                            </form>
                        </div>
                        <p class="text-center text-gray-400 text-xs mt-4">${r.getCurrentVersion()}</p>
                    </div>
                `;break;case"home":t="Home Übersicht",e=ZA();break;case"spielerUebersicht":t="Spielerübersicht",e=tS();break;case"spielerDetail":t="Spieler Detail",e=nS();break;case"spielerForm":t="Spieler bearbeiten",e=rS();break;case"trainingUebersicht":t="Training",e=oS();break;case"trainingDetail":t="Training Details",e=cS();break;case"matchtagUebersicht":t="Matchtage",e=aS();break;case"matchtagDetail":t="Matchtag Details",e=lS();break;case"einstellungen":t="Einstellungen",e=uS();break;default:t="Fehler",e="<p>Seite nicht gefunden.</p>"}T.currentPage==="login"?_o.innerHTML=e:_o.innerHTML=`${JA(t)}${YA()}<main class="p-4 space-y-4 pb-24">${e}</main>`,r.addEventListeners()},Dt=document.getElementById("modal-container"),mt=(r,e,t=[{text:"Schließen",class:"bg-blue-600"}])=>{T.isModalOpen=!0,Dt.innerHTML="";const n=document.createElement("div");n.className="modal-backdrop";const s=()=>{n.classList.remove("visible"),setTimeout(()=>{Dt.contains(n)&&Dt.removeChild(n),T.isModalOpen=!1},300)};let i=t.map(o=>`<button class="flex-1 py-2 ${o.class} text-white rounded-lg btn">${o.text}</button>`).join("");n.innerHTML=`
        <div class="modal-content text-center">
            <h3 class="text-lg font-bold mb-4">${r}</h3>
            <div class="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">${e}</div>
            <div class="flex flex-col space-y-2 mt-6">
                ${i}
            </div>
        </div>
    `,t.length>0&&n.querySelectorAll("button").forEach((o,c)=>{o.onclick=()=>{t[c].onClick&&t[c].onClick(),s()}}),Dt.appendChild(n),setTimeout(()=>n.classList.add("visible"),10)},na=()=>{const r=Dt.querySelector(".modal-backdrop");r&&(r.classList.remove("visible"),setTimeout(()=>{Dt.contains(r)&&Dt.removeChild(r),T.isModalOpen=!1},300))},hS=(r,e)=>{T.isModalOpen=!0,Dt.innerHTML="";const t=document.createElement("div");t.className="modal-backdrop";const n=r==="training"?"Neues Training Hinzufügen":"Neuen Matchtag Hinzufügen",s=r==="training"?"trainingDetail":"matchtagDetail",i=it(new Date);t.innerHTML=`
        <div class="modal-content text-center">
            <h3 class="text-lg font-bold mb-4">${n}</h3>
            <p class="mb-2 text-left">Bitte wählen Sie ein Datum aus:</p>
            <input type="date" id="newEventDateInput" class="w-full p-2 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600" value="${i}">
            <div id="modalError" class="text-red-500 text-sm mt-2 h-4"></div>
            <div class="flex space-x-2 mt-4">
                <button id="modalCancelBtn" class="flex-1 py-2 bg-gray-500 text-white rounded-lg btn">Abbrechen</button>
                <button id="modalConfirmBtn" class="flex-1 py-2 bg-green-600 text-white rounded-lg btn">Weiter</button>
            </div>
        </div>
    `,Dt.appendChild(t),setTimeout(()=>t.classList.add("visible"),10),document.getElementById("modalCancelBtn").onclick=()=>na(),document.getElementById("modalConfirmBtn").onclick=()=>{const o=document.getElementById("newEventDateInput"),c=document.getElementById("modalError");if(o.value){c.textContent="";try{e.navigateTo(s,o.value),na()}catch(l){c.textContent=`Ein Fehler ist aufgetreten: ${l.message}`}}else c.textContent="Bitte ein gültiges Datum auswählen."}},dS=r=>{mt("Welche Daten möchten Sie löschen?","Diese Aktion kann nicht rückgängig gemacht werden.",[{text:"Alle App-Daten",class:"bg-red-600",onClick:()=>r.confirmDeletion("all")},{text:"Nur Spielerdaten",class:"bg-yellow-600",onClick:()=>r.confirmDeletion("spieler")},{text:"Nur Trainingsdaten",class:"bg-yellow-600",onClick:()=>r.confirmDeletion("training")},{text:"Nur Matchdaten",class:"bg-yellow-600",onClick:()=>r.confirmDeletion("matchtage")},{text:"Nur Mannschaftsinfo",class:"bg-yellow-600",onClick:()=>r.confirmDeletion("mannschaft")},{text:"Abbrechen",class:"bg-gray-500"}])},fS=r=>{mt("Welche Daten möchten Sie exportieren?","Wählen Sie die zu exportierenden Daten aus.",[{text:"Alle Daten",class:"bg-green-600",onClick:()=>r.exportData("all")},{text:"Nur Spielerdaten",class:"bg-green-600",onClick:()=>r.exportData("spieler")},{text:"Nur Trainingsdaten",class:"bg-green-600",onClick:()=>r.exportData("training")},{text:"Nur Matchdaten",class:"bg-green-600",onClick:()=>r.exportData("matchtage")},{text:"Abbrechen",class:"bg-gray-500"}])},gS=(r,e)=>{let t="Bestätigung",n="",s=null;switch(r){case"all":t="Alle Daten löschen?",n="Möchten Sie wirklich ALLE Daten (Spieler, Trainings, Matchtage, Team-Info) unwiderruflich löschen? Dies kann nicht rückgängig gemacht werden!",s=()=>e.deleteAllData();break;case"spieler":t="Spielerdaten löschen?",n="Möchten Sie wirklich alle Spielerdaten löschen?",s=()=>e.deleteCollectionData(window.spielerCollection,"Spielerdaten");break;case"training":t="Trainingsdaten löschen?",n="Möchten Sie wirklich alle Trainingsdaten löschen?",s=()=>e.deleteCollectionData(window.trainingCollection,"Trainingsdaten");break;case"matchtage":t="Matchdaten löschen?",n="Möchten Sie wirklich alle Matchdaten löschen?",s=()=>e.deleteCollectionData(window.matchtageCollection,"Matchdaten");break;case"mannschaft":t="Mannschaftsinfo löschen?",n="Möchten Sie wirklich die Mannschaftsinfo löschen?",s=()=>e.deleteMannschaftInfo();break}s&&mt(t,n,[{text:"Abbrechen",class:"bg-gray-500"},{text:"Ja, löschen",class:"bg-red-600",onClick:s}])},mS=(r,e)=>{mt("Neues Ereignis erstellen","Was möchten Sie für diesen Tag erstellen?",[{text:"Training",class:"bg-blue-600",onClick:()=>e.navigateTo("trainingDetail",r)},{text:"Match",class:"bg-yellow-600",onClick:()=>e.navigateTo("matchtagDetail",r)},{text:"Abbrechen",class:"bg-gray-500"}])},pS=(r,e)=>{const t=T.trainingseinheiten.find(l=>l.id===r&&!l.cancelled),n=T.matchtage.find(l=>l.id===r&&!l.cancelled),s=T.spieler.filter(l=>l.geburtstag&&l.geburtstag.slice(5)===r.slice(5));let i=`Details für ${Bi(r)}`,o='<div class="space-y-1 text-left">',c=[];if(s.length>0&&(o+=`<p><i class="fas fa-birthday-cake fa-fw text-pink-500 mr-2"></i><strong>Geburtstag:</strong> ${s.map(l=>l.name).join(", ")}</p>`),t&&(o+=`<p><i class="fas fa-running fa-fw text-blue-500 mr-2"></i><strong>Training:</strong> ${t.time||"Nicht festgelegt"}</p>`,c.push({text:"Training bearbeiten",class:"bg-blue-600",onClick:()=>e.navigateTo("trainingDetail",r)})),n){let l=`Gegner: ${n.gegner||"?"} (${n.spielort||"?"})`;n.toreHeim!==null&&n.toreAuswaerts!==null&&(l+=` | Ergebnis: ${n.toreHeim}:${n.toreAuswaerts}`),o+=`<p><i class="fas fa-futbol fa-fw text-yellow-500 mr-2"></i><strong>Match:</strong> ${l}</p>`,c.push({text:"Match bearbeiten",class:"bg-yellow-600",onClick:()=>e.navigateTo("matchtagDetail",r)})}o+="</div>",!t&&!n&&s.length>0&&(c.push({text:"Training erstellen",class:"bg-green-600",onClick:()=>e.navigateTo("trainingDetail",r)}),c.push({text:"Match erstellen",class:"bg-green-600",onClick:()=>e.navigateTo("matchtagDetail",r)})),c.push({text:"Schließen",class:"bg-gray-500"}),mt(i,o,c)},_S=(r,e)=>{const t=T.trainingseinheiten.find(i=>i.id===r&&!i.cancelled),n=T.matchtage.find(i=>i.id===r&&!i.cancelled),s=T.spieler.some(i=>i.geburtstag&&i.geburtstag.slice(5)===r.slice(5));t||n||s?pS(r,e):mS(r,e)},$={getCurrentVersion:()=>DA,applyTheme:()=>{document.documentElement.classList.add("dark")},init:async()=>{$.applyTheme(),T.loading=!0,Re($);try{if(typeof __initial_auth_token<"u"?await m0(Ic,__initial_auth_token):await u0(Ic),T.userId=Ic.currentUser?.uid,!T.userId)throw new Error("User could not be authenticated.");oy(re,ce,PE),sessionStorage.getItem("trainerAppLoggedIn")==="true"?(T.isLoggedIn=!0,T.currentPage="home",$.setupListeners(),await po(new Date().getFullYear(),T)):(T.isLoggedIn=!1,T.currentPage="login")}catch(r){console.error("Firebase Auth Error",r),mt("Authentifizierungsfehler","Die Anmeldung bei Firebase ist fehlgeschlagen. Bitte überprüfen Sie Ihre Firebase-Einstellungen.",[{text:"OK",class:"bg-red-500"}])}finally{T.loading=!1,Re($)}},setupListeners:()=>{window.spielerCollection=Ee(re,`artifacts/${ce}/public/data/spieler`),window.trainingCollection=Ee(re,`artifacts/${ce}/public/data/trainingseinheiten`),window.matchtageCollection=Ee(re,`artifacts/${ce}/public/data/spieltage`);const r=me(re,`artifacts/${ce}/public/data/config/team`);jn(xr(window.spielerCollection,Rp("name")),e=>{T.spieler=e.docs.map(t=>({id:t.id,...t.data()})),T.isLoggedIn&&Re($)}),jn(xr(window.trainingCollection),e=>{T.trainingseinheiten=e.docs.map(t=>({id:t.id,...t.data()})),T.isLoggedIn&&Re($)}),jn(xr(window.matchtageCollection),e=>{T.matchtage=e.docs.map(t=>({id:t.id,...t.data()})),T.isLoggedIn&&Re($)}),jn(r,e=>{e.exists()&&(T.teamInfo={trainingSchedule:{},...e.data()}),T.isLoggedIn&&Re($)})},login:async(r,e)=>{r==="trainer@demo.com"&&e==="1234"?(sessionStorage.setItem("trainerAppLoggedIn","true"),T.isLoggedIn=!0,T.currentPage="home",T.loading=!0,Re($),$.setupListeners(),await po(new Date().getFullYear(),T),T.loading=!1,Re($)):mt("Anmeldung fehlgeschlagen","Anmeldung fehlgeschlagen. Bitte überprüfen Sie Ihre Eingaben.",[{text:"OK",class:"bg-red-500"}])},logout:()=>{sessionStorage.removeItem("trainerAppLoggedIn"),Object.assign(T,{isLoggedIn:!1,spieler:[],trainingseinheiten:[],matchtage:[],feiertage:[],holidaysFetched:{},teamInfo:{name:"Mein Team",name2:"",emblemUrl:null,trainingSchedule:{}},currentPage:"login",currentId:null,currentDate:new Date,loading:!1,filter:"",sortBy:"status",sortAsc:!0,statsFilter:"matches",navigationStack:[],initialFormData:"",formationPlayers:{},showTrainingsOnHomeCalendar:!0,showMatchesOnHomeCalendar:!0,isModalOpen:!1}),Re($)},navigateTo:(r,e=null,t=!1)=>{const n=()=>{!t&&T.currentPage!==r&&T.navigationStack.push({page:T.currentPage,id:T.currentId}),t&&(T.navigationStack=[]),T.currentPage=r,T.currentId=e,r!=="spielerUebersicht"&&(T.filter=""),r==="home"&&(T.currentDate=new Date),Re($),window.scrollTo(0,0)};if(!["spielerForm"].includes(T.currentPage)){n();return}const s=document.getElementById("spielerForm");s&&new URLSearchParams(new FormData(s)).toString()!==T.initialFormData?mt("Ungespeicherte Änderungen","Möchten Sie die Seite verlassen und die Änderungen verwerfen?",[{text:"Abbrechen",class:"bg-gray-500"},{text:"Verwerfen",class:"bg-red-600",onClick:n}]):n()},goBack:()=>{const r=()=>{const t=T.navigationStack.pop();t?(T.currentPage=t.page,T.currentId=t.id,Re($),window.scrollTo(0,0)):$.navigateTo("home",null,!0)};if(T.isModalOpen){na();return}if(!["spielerForm"].includes(T.currentPage)){r();return}const e=document.getElementById("spielerForm");e&&new URLSearchParams(new FormData(e)).toString()!==T.initialFormData?mt("Ungespeicherte Änderungen","Möchten Sie die Seite verlassen und die Änderungen verwerfen?",[{text:"Abbrechen",class:"bg-gray-500"},{text:"Verwerfen",class:"bg-red-600",onClick:r}]):r()},changeMonth:async r=>{T.currentDate.setMonth(T.currentDate.getMonth()+r),await po(T.currentDate.getFullYear(),T),Re($)},goToToday:async()=>{T.currentDate=new Date,await po(new Date().getFullYear(),T),Re($)},setFilter:r=>{ay(r),Re($)},setStatsFilter:r=>{cy(r),Re($)},setSort:r=>{ly(r),Re($)},setHomeCalendarFilter:(r,e)=>{uy(r,e),Re($)},setTrainingListView:r=>{hy(r),Re($)},setMatchtagListView:r=>{dy(r),Re($)},saveSpieler:(r,e,t)=>kA(r,e,t,$),deleteSpieler:r=>NA(r,$),setAnwesenheit:(r,e,t)=>MA(r,e,t,$),toggleTrainingCancellation:r=>LA(r,$),deleteTraining:r=>FA(r,$),saveMatchtag:(r,e)=>UA(r,e,$),updateSpielerMatchDetails:(r,e,t,n)=>BA(r,e,t,n,$),toggleMatchCancellation:r=>$A(r,$),deleteMatchtag:r=>qA(r,$),saveMannschaftInfo:r=>VA(r,$),saveTrainingSchedule:r=>jA(r,$),generateRecurringTrainings:(r,e)=>w_(r,e,$),exportData:(r="all")=>zA(r,$),importData:()=>{document.getElementById("jsonImportInput").click()},importJSONData:r=>GA(r,$),showDeleteOptionsModal:()=>dS($),showExportOptionsModal:()=>fS($),confirmDeletion:r=>gS(r,$),deleteAllData:()=>KA($),deleteCollectionData:(r,e)=>HA(r,e,$),deleteMannschaftInfo:()=>WA($),deleteMannschaftEmblem:()=>QA($),clearDateField:r=>{document.getElementById(r).value=""},saveTrainingDetails:(r,e)=>OA(r,e,$),handleCalendarDayClick:r=>_S(r,$),showAddEventModal:r=>hS(r,$),closeModal:()=>na(),showModal:(r,e,t)=>mt(r,e,t),addEventListeners:()=>{const r=document.getElementById("loginForm");r&&r.addEventListener("submit",U=>{U.preventDefault();const w=U.target.email.value,_=U.target.password.value;$.login(w,_)});const e=document.getElementById("spielerForm");if(e){T.initialFormData=new URLSearchParams(new FormData(e)).toString();const U=document.getElementById("fotoUpload");U&&U.addEventListener("change",w=>{const _=w.target.files[0];if(_){const y=new FileReader;y.onload=v=>{const b=document.getElementById("fotoVorschau");b.src=v.target.result,b.classList.remove("hidden")},y.readAsDataURL(_)}}),e.addEventListener("submit",w=>{w.preventDefault();const _=new FormData(w.target),y=Object.fromEntries(_.entries()),v=y.id,b=y.foto;delete y.id,delete y.foto,Object.keys(y).forEach(S=>{y[S]===""&&(y[S]=null)}),y.nummer&&(y.nummer=parseInt(y.nummer)),$.saveSpieler(y,v,b)})}const t=document.getElementById("matchtagForm");if(t){t.addEventListener("submit",y=>{y.preventDefault();const v=new FormData(y.target),b=Object.fromEntries(v.entries());$.saveMatchtag(b.id,{gegner:b.gegner,spielort:b.spielort,toreHeim:b.toreHeim===""?null:parseInt(b.toreHeim),toreAuswaerts:b.toreAuswaerts===""?null:parseInt(b.toreAuswaerts),spielArt:b.spielArt,time:b.time||null})});const U=document.getElementById("heimBtn"),w=document.getElementById("auswaertsBtn"),_=document.querySelector('input[name="spielort"]');U&&w&&_&&(U.addEventListener("click",()=>{_.value="Heim",U.classList.add("bg-green-600","text-white"),U.classList.remove("bg-gray-200","dark:bg-gray-700"),w.classList.remove("bg-green-600","text-white"),w.classList.add("bg-gray-200","dark:bg-gray-700")}),w.addEventListener("click",()=>{_.value="Auswärts",w.classList.add("bg-green-600","text-white"),w.classList.remove("bg-gray-200","dark:bg-gray-700"),U.classList.remove("bg-green-600","text-white"),U.classList.add("bg-gray-200","dark:bg-gray-700")}))}const n=document.getElementById("trainingDetailForm");n&&n.addEventListener("submit",U=>{U.preventDefault();const w=new FormData(U.target),_=Object.fromEntries(w.entries());$.saveTrainingDetails(_.id,{time:_.time})});const s=document.getElementById("mannschaftForm");s&&s.addEventListener("submit",U=>{U.preventDefault(),$.saveMannschaftInfo(U.target)});const i=document.getElementById("emblemUpload");i&&i.addEventListener("change",U=>{const w=U.target.files[0];if(w){const _=new FileReader;_.onload=y=>{const v=document.getElementById("emblemVorschau");v&&(v.src=y.target.result,v.classList.remove("hidden"))},_.readAsDataURL(w)}});const o=document.getElementById("trainingsForm");o&&o.addEventListener("submit",U=>{U.preventDefault(),$.saveTrainingSchedule(U.target)});const c=document.getElementById("jsonImportInput");c&&c.addEventListener("change",U=>{const w=U.target.files[0];if(w){const _=new FileReader;_.onload=y=>{$.importJSONData(y.target.result)},_.readAsText(w)}});const l=document.getElementById("add-training-btn");l&&l.addEventListener("click",()=>$.showAddEventModal("training"));const u=document.getElementById("add-match-btn");u&&u.addEventListener("click",()=>$.showAddEventModal("match"));const f=document.getElementById("show-all-trainings-btn");f&&f.addEventListener("click",()=>$.setTrainingListView("all"));const g=document.getElementById("show-top10-trainings-btn");g&&g.addEventListener("click",()=>$.setTrainingListView("top10"));const p=document.getElementById("show-all-matches-btn");p&&p.addEventListener("click",()=>$.setMatchtagListView("all"));const E=document.getElementById("show-top10-matches-btn");E&&E.addEventListener("click",()=>$.setMatchtagListView("top10"));const A=document.getElementById("filter-matches-btn");A&&A.addEventListener("click",()=>$.setStatsFilter("matches"));const D=document.getElementById("filter-minuten-btn");D&&D.addEventListener("click",()=>$.setStatsFilter("minuten"));const k=document.getElementById("filter-tore-btn");k&&k.addEventListener("click",()=>$.setStatsFilter("tore"));const B=document.getElementById("filter-vorlagen-btn");B&&B.addEventListener("click",()=>$.setStatsFilter("vorlagen")),document.querySelectorAll(".training-card").forEach(U=>{U.addEventListener("click",w=>$.navigateTo("trainingDetail",w.currentTarget.dataset.id))}),document.querySelectorAll(".match-card").forEach(U=>{U.addEventListener("click",w=>$.navigateTo("matchtagDetail",w.currentTarget.dataset.id))}),document.querySelectorAll(".spieler-link").forEach(U=>{U.addEventListener("click",w=>{w.preventDefault(),$.navigateTo("spielerDetail",w.currentTarget.dataset.id)})}),document.querySelectorAll(".anwesenheit-btn").forEach(U=>{U.addEventListener("click",w=>{$.setAnwesenheit(T.currentId,w.currentTarget.dataset.spielerId,w.currentTarget.dataset.status)})}),document.querySelectorAll(".match-position-btn").forEach(U=>{U.addEventListener("click",w=>{$.updateSpielerMatchDetails(T.currentId,w.currentTarget.dataset.spielerId,"position",w.currentTarget.dataset.position)})}),document.querySelectorAll(".match-stat-input").forEach(U=>{U.addEventListener("change",w=>{$.updateSpielerMatchDetails(T.currentId,w.currentTarget.dataset.spielerId,w.currentTarget.dataset.field,w.currentTarget.value)})});const j=document.getElementById("toggle-training-cancellation");j&&j.addEventListener("click",()=>$.toggleTrainingCancellation(T.currentId));const F=document.getElementById("delete-training-btn");F&&F.addEventListener("click",()=>$.deleteTraining(T.currentId));const Q=document.getElementById("toggle-match-cancellation");Q&&Q.addEventListener("click",()=>$.toggleMatchCancellation(T.currentId));const te=document.getElementById("delete-match-btn");te&&te.addEventListener("click",()=>$.deleteMatchtag(T.currentId))}};window.app=$;window.app.init();
//# sourceMappingURL=index-B53X3AwW.js.map
