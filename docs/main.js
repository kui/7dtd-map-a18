!function(e){function t(t){for(var n,o,s=t[0],r=t[1],d=0,l=[];d<s.length;d++)o=s[d],a[o]&&l.push(a[o][0]),a[o]=0;for(n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n]);for(i&&i(t);l.length;)l.shift()()}var n={},a={2:0};function o(t){if(n[t])return n[t].exports;var a=n[t]={i:t,l:!1,exports:{}};return e[t].call(a.exports,a,a.exports,o),a.l=!0,a.exports}o.e=function(e){var t=[],n=a[e];if(0!==n)if(n)t.push(n[2]);else{var s=new Promise(function(t,o){n=a[e]=[t,o]});t.push(n[2]=s);var r,d=document.getElementsByTagName("head")[0],i=document.createElement("script");i.charset="utf-8",i.timeout=120,o.nc&&i.setAttribute("nonce",o.nc),i.src=function(e){return o.p+""+({0:"block-labels",1:"block-prefab-index"}[e]||e)+".js"}(e),r=function(t){i.onerror=i.onload=null,clearTimeout(l);var n=a[e];if(0!==n){if(n){var o=t&&("load"===t.type?"missing":t.type),s=t&&t.target&&t.target.src,r=new Error("Loading chunk "+e+" failed.\n("+o+": "+s+")");r.type=o,r.request=s,n[1](r)}a[e]=void 0}};var l=setTimeout(function(){r({type:"timeout",target:i})},12e4);i.onerror=i.onload=r,d.appendChild(i)}return Promise.all(t)},o.m=e,o.c=n,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)o.d(n,a,function(t){return e[t]}.bind(null,a));return n},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="",o.oe=function(e){throw console.error(e),e};var s=window.webpackJsonp=window.webpackJsonp||[],r=s.push.bind(s);s.push=t,s=s.slice();for(var d=0;d<s.length;d++)t(s[d]);var i=r;o(o.s=127)}({127:function(e,t,n){"use strict";async function a(e,t){const n=await async function(e,t){return new Promise((n,a)=>{const o=new e.Image;o.addEventListener("load",()=>n(o)),o.addEventListener("error",a),o.src=t})}(e,t);return e.createImageBitmap(n)}async function o(e,t){if(!t)return null;const n=await async function(e,t){return new Promise((n,a)=>{const o=new e.FileReader;o.onerror=a,o.onload=(()=>n(o.result)),o.readAsDataURL(t)})}(e,t);return a(e,n)}async function s(e,t){if(!t)return[];const n=await async function(e,t){return new Promise((n,a)=>{const o=new e.FileReader;o.onerror=a,o.onload=(()=>n(o.result)),o.readAsText(t)})}(e,t);return r(e,n)}function r(e,t){const n=(new e.DOMParser).parseFromString(t,"text/xml");return Array.from(n.getElementsByTagName("decoration")).map(e=>{const t=e.getAttribute("position").split(",");return{name:e.getAttribute("name"),x:parseInt(t[0],10),y:parseInt(t[2],10)}})}function d(){const e=document.getElementById("controller"),t=document.getElementById("cood_we"),d=document.getElementById("cood_ns"),i=document.getElementById("download"),l=document.getElementById("reset_flag"),c=document.getElementById("show_biomes"),u=document.getElementById("biomes"),m=document.getElementById("show_splat3"),f=document.getElementById("splat3"),p=document.getElementById("show_radiation"),g=document.getElementById("radiation"),h=document.getElementById("show_prefabs"),w=document.getElementById("prefabs"),y=document.getElementById("scale"),b=document.getElementById("sign_size"),v=document.getElementById("brightness"),E=document.getElementById("prefabs_filter"),L=document.getElementById("prefabs_filter_presets"),k=document.getElementById("blocks_filter"),I=document.getElementById("blocks_filter_presets"),B=document.getElementById("prefabs_num"),M=document.getElementById("prefabs_list"),_=document.getElementById("map"),x=document.getElementById("sample_load"),C=new Worker("map-renderer.js"),T=new Worker("prefabs-filter.js"),P=_.transferControlToOffscreen();C.postMessage({canvas:P,showBiomes:c.checked,showSplat3:m.checked,showRad:p.checked,showPrefabs:h.checked,signSize:b.value,brightness:`${v.value}%`,scale:y.value},[P]),(async()=>{const e=await n.e(1).then(n.t.bind(null,130,3));T.postMessage({blockPrefabIndex:e.default})})(),(async()=>{const e=await n.e(0).then(n.t.bind(null,131,3));T.postMessage({blockLabels:e.default})})(),u.addEventListener("input",async()=>{console.log("Load biome");const e=await o(window,u.files[0]);e&&C.postMessage({biomesImg:e},[e])}),f.addEventListener("input",async()=>{console.log("Load splat3");const e=await o(window,f.files[0]);e&&C.postMessage({splat3Img:e},[e])}),g.addEventListener("input",async()=>{console.log("Load radiation");const e=await A(window,g.files[0]);e&&C.postMessage({radImg:e},[e])}),w.addEventListener("input",async()=>{console.log("Load prefabs");const e=await s(window,w.files[0]);T.postMessage({all:e})}),["input","focus"].forEach(e=>{E.addEventListener(e,async()=>{console.log("Update prefab list"),T.postMessage({prefabsFilterString:E.value})}),k.addEventListener(e,async()=>{console.log("Update prefab list"),T.postMessage({blocksFilterString:k.value})})}),[c,m,p,h,b,v,y].forEach(e=>{e.addEventListener("input",()=>{C.postMessage({showBiomes:c.checked,showSplat3:m.checked,showRad:p.checked,showPrefabs:h.checked,signSize:b.value,brightness:`${v.value}%`,scale:y.value})})}),T.addEventListener("message",e=>{e.data.prefabs&&C.postMessage({prefabs:e.data.prefabs})}),document.addEventListener("drop",async e=>{e.dataTransfer.types.includes("Files")&&(e.preventDefault(),await Promise.all(Array.from(e.dataTransfer.files).map(j)))}),Array.from(L.getElementsByTagName("button")).forEach(e=>{e.addEventListener("click",()=>{E.value=e.dataset.filter||e.textContent,E.dispatchEvent(new Event("input"))})}),Array.from(I.getElementsByTagName("button")).forEach(e=>{e.addEventListener("click",()=>{k.value=e.dataset.filter||e.textContent,k.dispatchEvent(new Event("input"))})}),_.addEventListener("click",async e=>{const t=N(e);T.postMessage({markCoords:t}),C.postMessage({markCoords:t})}),l.addEventListener("click",async()=>{T.postMessage({markCoords:null}),C.postMessage({markCoords:null})}),x.addEventListener("click",()=>{(async()=>{const[e,t,n]=await Promise.all([a(window,"sample_world/biomes.png"),a(window,"sample_world/splat3.png"),D(window,"sample_world/radiation.png")]);C.postMessage({biomesImg:e,splat3Img:t,radImg:n},[e,t,n])})(),(async()=>{const e=await async function(e,t){if(!t)return[];const n=await e.fetch(t);return r(e,await n.text())}(window,"sample_world/prefabs.xml");T.postMessage({all:e})})()}),T.addEventListener("message",e=>{console.log(e.data);const{prefabs:t,status:n}=e.data;if(B.innerHTML=n,!t)return;const a=document.createElement("ul");t.forEach(e=>{const t=document.createElement("li");if(t.innerHTML=`\n        ${e.dist?`${function(e){if(e<1e3)return`${e}m`;return`${(e/1e3).toFixed(2)}km`}(e.dist)}, `:""}\n        <a href="prefabs/${e.name}.html" target="_blank">\n          ${e.highlightedName||e.name}\n        </a>\n        (${e.x}, ${e.y})\n      `,e.matchedBlocks&&e.matchedBlocks.length>0){const n=document.createElement("ul");e.matchedBlocks.forEach(e=>{const t=document.createElement("li");t.innerHTML=`${e.count}x ${e.highlightedLabel} <small>${e.highlightedName}</small>`,n.appendChild(t)}),t.appendChild(n)}a.appendChild(t)}),M.replaceChild(a,M.firstChild)});let S=null,$={width:0,height:0};_.addEventListener("click",e=>{S=e}),l.addEventListener("click",()=>{S=null}),new MutationObserver(t=>{if(!t.find(e=>"width"===e.attributeName))return;if(!t.find(e=>"height"===e.attributeName))return;const n={width:_.width,height:_.height};if(!S)return void($=n);S={offsetX:S.offsetX*n.width/$.width,offsetY:S.offsetY*n.height/$.height};const a=_.getBoundingClientRect(),o=document.documentElement.getBoundingClientRect(),s=a.left-o.left,r=a.top-o.top,d=S.offsetX+s,i=S.offsetY+r,l={left:d-e.offsetLeft/2,top:i-window.innerHeight/2};window.scrollTo(l),$=n}).observe(_,{attributes:!0}),Array.from(document.querySelectorAll("[data-source-input")).forEach(e=>{const t=document.querySelector(`#${e.dataset.sourceInput}`);e.textContent=t.value,t.addEventListener("input",()=>{e.textContent=t.value})});let O={width:0,height:0};async function j(e){if("biomes.png"===e.name){console.log("Load biome");const t=await o(window,e);C.postMessage({biomesImg:t},[t]),u.value=""}else if("splat3.png"===e.name){console.log("Load splat3");const t=await o(window,e);C.postMessage({splat3Img:t},[t]),f.value=""}else if("radiation.png"===e.name){console.log("Load radiation");const t=await A(window,e);C.postMessage({radImg:t},[t]),g.value=""}else if("prefabs.xml"===e.name){console.log("Update prefab list");const t=await s(window,e);T.postMessage({all:t}),w.value=""}else console.warn("Unknown file: %s, %s",e.name,e.type)}async function A(e,t){return F(e,await o(e,t))}async function D(e,t){return F(e,await a(e,t))}async function F(e,t){const n=e.document.createElement("canvas");n.width=t.width,n.height=t.height;const a=n.getContext("2d");return a.filter='url("#rad_filter")',a.drawImage(t,0,0),createImageBitmap(n)}function N({offsetX:e,offsetY:t}){return{x:-Math.round((.5-e/_.width)*O.width),y:Math.round((.5-t/_.height)*O.height)}}C.addEventListener("message",e=>{e.data.mapSizes&&({mapSizes:O}=e.data)}),_.addEventListener("mousemove",e=>{const{x:n,y:a}=N(e);t.textContent=n,d.textContent=a}),_.addEventListener("mouseout",()=>{t.textContent="-",d.textContent="-"}),i.addEventListener("click",()=>{const e=document.createElement("a");e.href=_.toDataURL("image/png"),e.download="7DtD-renderer.png",e.click()}),["input","focus"].forEach(e=>{E.addEventListener(e,()=>{document.body.classList.remove("disable-prefabs-filter"),document.body.classList.add("disable-blocks-filter")}),k.addEventListener(e,()=>{document.body.classList.remove("disable-blocks-filter"),document.body.classList.add("disable-prefabs-filter")})}),document.addEventListener("dragenter",e=>{e.dataTransfer.types.includes("Files")&&(e.preventDefault(),document.body.classList.add("dragovered"))}),document.addEventListener("dragover",e=>{e.dataTransfer.types.includes("Files")&&(e.preventDefault(),e.dataTransfer.dropEffect="copy",document.body.classList.add("dragovered"))}),document.addEventListener("dragleave",e=>{0===e.clientX&&0===e.clientY&&(e.preventDefault(),document.body.classList.remove("dragovered"))}),document.addEventListener("drop",async e=>{e.dataTransfer.types.includes("Files")&&(e.preventDefault(),document.body.classList.remove("dragovered"))})}n.r(t),"loading"===document.readyState?document.addEventListener("DOMContentLoaded",d):d()}});