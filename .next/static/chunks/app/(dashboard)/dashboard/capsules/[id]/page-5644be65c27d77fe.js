(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[360],{8176:function(e,t,r){Promise.resolve().then(r.bind(r,8882)),Promise.resolve().then(r.t.bind(r,231,23))},8882:function(e,t,r){"use strict";r.d(t,{DeleteCapsuleButton:function(){return o}});var n=r(7437),s=r(2265),a=r(6463),u=r(883);function o(e){let{capsuleId:t}=e,r=(0,a.useRouter)(),[o,i]=(0,s.useState)(!1),[c,l]=(0,s.useState)(!1),d=async()=>{l(!0),await fetch("/api/capsules/".concat(t),{method:"DELETE"}),r.push("/dashboard/capsules")};return o?(0,n.jsxs)("div",{className:"flex items-center gap-3",children:[(0,n.jsx)("p",{className:"text-vault-600 text-sm",children:"Confirmer la suppression ?"}),(0,n.jsx)("button",{onClick:d,disabled:c,className:"px-4 py-2 rounded-lg bg-red-600 text-white text-sm hover:bg-red-700 transition-colors disabled:opacity-60",children:c?"...":"Supprimer"}),(0,n.jsx)("button",{onClick:()=>i(!1),className:"px-4 py-2 rounded-lg border border-vault-300 text-vault-600 text-sm hover:bg-vault-50 transition-colors",children:"Annuler"})]}):(0,n.jsxs)("button",{onClick:()=>i(!0),className:"flex items-center gap-2 text-red-500 hover:text-red-700 text-sm transition-colors",children:[(0,n.jsx)(u.Z,{size:16})," Supprimer cette capsule"]})}},8030:function(e,t,r){"use strict";r.d(t,{Z:function(){return i}});var n=r(2265);/**
 * @license lucide-react v0.383.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let s=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),a=function(){for(var e=arguments.length,t=Array(e),r=0;r<e;r++)t[r]=arguments[r];return t.filter((e,t,r)=>!!e&&r.indexOf(e)===t).join(" ")};/**
 * @license lucide-react v0.383.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var u={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.383.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let o=(0,n.forwardRef)((e,t)=>{let{color:r="currentColor",size:s=24,strokeWidth:o=2,absoluteStrokeWidth:i,className:c="",children:l,iconNode:d,...h}=e;return(0,n.createElement)("svg",{ref:t,...u,width:s,height:s,stroke:r,strokeWidth:i?24*Number(o)/Number(s):o,className:a("lucide",c),...h},[...d.map(e=>{let[t,r]=e;return(0,n.createElement)(t,r)}),...Array.isArray(l)?l:[l]])}),i=(e,t)=>{let r=(0,n.forwardRef)((r,u)=>{let{className:i,...c}=r;return(0,n.createElement)(o,{ref:u,iconNode:t,className:a("lucide-".concat(s(e)),i),...c})});return r.displayName="".concat(e),r}},883:function(e,t,r){"use strict";r.d(t,{Z:function(){return n}});/**
 * @license lucide-react v0.383.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let n=(0,r(8030).Z)("Trash2",[["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6",key:"4alrt4"}],["path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2",key:"v07s0e"}],["line",{x1:"10",x2:"10",y1:"11",y2:"17",key:"1uufr5"}],["line",{x1:"14",x2:"14",y1:"11",y2:"17",key:"xtxkd"}]])},6463:function(e,t,r){"use strict";var n=r(1169);r.o(n,"usePathname")&&r.d(t,{usePathname:function(){return n.usePathname}}),r.o(n,"useRouter")&&r.d(t,{useRouter:function(){return n.useRouter}}),r.o(n,"useSearchParams")&&r.d(t,{useSearchParams:function(){return n.useSearchParams}})}},function(e){e.O(0,[231,971,23,744],function(){return e(e.s=8176)}),_N_E=e.O()}]);