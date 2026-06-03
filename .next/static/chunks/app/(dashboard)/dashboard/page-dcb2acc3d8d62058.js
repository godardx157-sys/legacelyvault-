(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[903],{3539:function(e,t,r){Promise.resolve().then(r.bind(r,1307)),Promise.resolve().then(r.t.bind(r,231,23))},1307:function(e,t,r){"use strict";r.d(t,{CheckInButton:function(){return a}});var n=r(7437),i=r(2265);/**
 * @license lucide-react v0.383.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let s=(0,r(8030).Z)("CircleCheckBig",[["path",{d:"M22 11.08V12a10 10 0 1 1-5.93-9.14",key:"g774vq"}],["path",{d:"m9 11 3 3L22 4",key:"1pflzl"}]]);function a(){let[e,t]=(0,i.useState)(!1),[r,a]=(0,i.useState)(!1),o=async()=>{a(!0),await fetch("/api/checkin",{method:"POST"}),a(!1),t(!0)};return e?(0,n.jsxs)("span",{className:"flex items-center gap-2 text-green-700 text-sm",children:[(0,n.jsx)(s,{size:16})," Pr\xe9sence confirm\xe9e !"]}):(0,n.jsx)("button",{onClick:o,disabled:r,className:"px-4 py-2 rounded-lg text-white text-sm transition-all hover:opacity-90 disabled:opacity-60",style:{background:"var(--gold)"},children:r?"En cours...":"✓ Je suis l\xe0"})}},8030:function(e,t,r){"use strict";r.d(t,{Z:function(){return c}});var n=r(2265);/**
 * @license lucide-react v0.383.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let i=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),s=function(){for(var e=arguments.length,t=Array(e),r=0;r<e;r++)t[r]=arguments[r];return t.filter((e,t,r)=>!!e&&r.indexOf(e)===t).join(" ")};/**
 * @license lucide-react v0.383.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var a={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.383.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let o=(0,n.forwardRef)((e,t)=>{let{color:r="currentColor",size:i=24,strokeWidth:o=2,absoluteStrokeWidth:c,className:l="",children:u,iconNode:d,...h}=e;return(0,n.createElement)("svg",{ref:t,...a,width:i,height:i,stroke:r,strokeWidth:c?24*Number(o)/Number(i):o,className:s("lucide",l),...h},[...d.map(e=>{let[t,r]=e;return(0,n.createElement)(t,r)}),...Array.isArray(u)?u:[u]])}),c=(e,t)=>{let r=(0,n.forwardRef)((r,a)=>{let{className:c,...l}=r;return(0,n.createElement)(o,{ref:a,iconNode:t,className:s("lucide-".concat(i(e)),c),...l})});return r.displayName="".concat(e),r}}},function(e){e.O(0,[231,971,23,744],function(){return e(e.s=3539)}),_N_E=e.O()}]);