import{i as d,a as L,n as w,t as P}from"./@vueuse_shared@8.4.2_vue@3.2.33.4de507e3.js";import{c as T,u as C}from"./@vue_reactivity@3.2.33.599d4d8e.js";import{k as O}from"./@vue_runtime-core@3.2.33.2fd12dd6.js";function f(i){var t;const e=C(i);return(t=e==null?void 0:e.$el)!=null?t:e}const y=d?window:void 0;d&&window.document;d&&window.navigator;d&&window.location;function v(...i){let t,e,o,s;if(L(i[0])?([e,o,s]=i,t=y):[t,e,o,s]=i,!t)return w;let l=w;const c=O(()=>f(t),r=>{l(),r&&(r.addEventListener(e,o,s),l=()=>{r.removeEventListener(e,o,s),l=w})},{immediate:!0,flush:"post"}),u=()=>{c(),l()};return P(u),u}function K(i,t,e={}){const{window:o=y,ignore:s,capture:l=!0}=e;if(!o)return;const c=T(!0);let u;const r=n=>{o.clearTimeout(u);const a=f(i),h=n.composedPath();!a||a===n.target||h.includes(a)||!c.value||s&&s.length>0&&s.some(k=>{const p=f(k);return p&&(n.target===p||h.includes(p))})||t(n)},E=[v(o,"click",r,{passive:!0,capture:l}),v(o,"pointerdown",n=>{const a=f(i);c.value=!!a&&!n.composedPath().includes(a)},{passive:!0}),v(o,"pointerup",n=>{u=o.setTimeout(()=>r(n),50)},{passive:!0})];return()=>E.forEach(n=>n())}const m=typeof globalThis!="undefined"?globalThis:typeof window!="undefined"?window:typeof global!="undefined"?global:typeof self!="undefined"?self:{},g="__vueuse_ssr_handlers__";m[g]=m[g]||{};m[g];var _,b;d&&(window==null?void 0:window.navigator)&&((_=window==null?void 0:window.navigator)==null?void 0:_.platform)&&/iP(ad|hone|od)/.test((b=window==null?void 0:window.navigator)==null?void 0:b.platform);export{K as o};