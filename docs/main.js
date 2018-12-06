!function(e){var t={};function n(s){if(t[s])return t[s].exports;var a=t[s]={i:s,l:!1,exports:{}};return e[s].call(a.exports,a,a.exports,n),a.l=!0,a.exports}n.m=e,n.c=t,n.d=function(e,t,s){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:s})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var s=Object.create(null);if(n.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)n.d(s,a,function(t){return e[t]}.bind(null,a));return s},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";n.r(t);class s{constructor(e,t){this.window=e,this.canvas=t,this.showBiomes=!0,this.showSplat3=!0,this.showRad=!0,this.showPrefabs=!0,this.biomesImg=null,this.splat3Img=null,this.radImg=null,this.updateRequest=null,this.brightness="100%",this.scale="0.1",this.signSize=200,this.prefabs=[],this.signChar="✗",this.mapWidth=0,this.mapHeight=0}get width(){return Math.max(this.biomesImg?this.biomesImg.width:0,this.splat3Img?this.splat3Img.width:0)}get height(){return Math.max(this.biomesImg?this.biomesImg.height:0,this.splat3Img?this.splat3Img.height:0)}update(){this.updateRequest||(this.updateRequest=this.window.requestAnimationFrame(()=>this.updateImmediately()))}updateImmediately(){console.log(this),this.canvas.width=this.width*this.scale,this.canvas.height=this.height*this.scale;const e=this.canvas.getContext("2d");e.scale(this.scale,this.scale),e.filter=`brightness(${this.brightness})`,this.biomesImg&&this.showBiomes&&e.drawImage(this.biomesImg,0,0,this.width,this.height),this.splat3Img&&this.showSplat3&&e.drawImage(this.splat3Img,0,0,this.width,this.height),this.radImg&&this.showRad&&(e.filter="url(#rad_filter)",e.imageSmoothingEnabled=!1,e.drawImage(this.radImg,0,0,this.width,this.height),e.imageSmoothingEnabled=!0),e.filter="none",this.showPrefabs&&function(e,t){t.font=`${e.signSize}px sans-serif`,t.lineWidth=Math.round(.08*e.signSize),t.strokeStyle="white",t.fillStyle="red",t.textAlign="center",t.textBaseline="middle",t.shadowColor="black";const n=e.width/2,s=e.height/2;e.prefabs.forEach(a=>{const i=n+a.x,o=s-a.y;t.shadowBlur=20,t.strokeText(e.signChar,i,o),t.shadowBlur=0,t.fillText(e.signChar,i,o)})}(this,e),this.updateRequest=null,console.log("update")}async setBiomes(e){const t=await a(this,e);t&&(this.biomesImg=t)}async setSplat3(e){const t=await a(this,e);t&&(this.splat3Img=t)}async setRad(e){const t=await a(this,e);t&&(this.radImg=t)}}async function a(e,t){if(!t)return null;const n=await async function(e,t){return new Promise((n,s)=>{const a=new e.window.FileReader;a.onerror=s,a.onload=(()=>n(a.result)),a.readAsDataURL(t)})}(e,t),s=await async function(e,t){return new Promise((n,s)=>{const a=new e.window.Image;a.addEventListener("load",()=>n(a)),a.addEventListener("error",s),a.src=t})}(e,n);return e.window.createImageBitmap(s)}class i{constructor(e,t,n){this.window=e,this.all=[],this.filtered=[],this.filterString="",this.resultSpan=t,this.listDiv=n}update(){0===this.all.length?this.resultSpan.textContent="No prefabs":0===this.filterString.trim().length?this.resultSpan.textContent="All prefabs":this.resultSpan.textContent=`Hit ${this.filtered.length} prefabs`;const e=this.window.document.createElement("ul");this.filtered.forEach(t=>{const n=this.window.document.createElement("li");n.textContent=`${t.name} (${t.x}, ${t.y})`,e.appendChild(n)}),this.listDiv.replaceChild(e,this.listDiv.firstChild)}setFilterString(e){this.filterString=e,this.filtered=e?this.all.filter(t=>t.name.includes(e)):this.all,this.filtered.sort((e,t)=>e.name>t.name?1:e.name<t.name?-1:0)}async setFile(e){this.all=await async function(e,t){if(!t)return[];const n=await async function(e,t){return new Promise((n,s)=>{const a=new e.FileReader;a.onerror=s,a.onload=(()=>n(a.result)),a.readAsText(t)})}(e,t);if(!n)return[];const s=(new e.DOMParser).parseFromString(n,"text/xml");return Array.from(s.getElementsByTagName("decoration")).map(e=>{const t=e.getAttribute("position").split(",");return{name:e.getAttribute("name"),x:parseInt(t[0],10),y:parseInt(t[2],10)}})}(this.window,e),this.setFilterString(this.filterString)}}function o(){const e=document.getElementById("cood_we"),t=document.getElementById("cood_ns"),n=document.getElementById("download"),a=document.getElementById("show_biomes"),o=document.getElementById("biomes"),r=document.getElementById("show_splat3"),d=document.getElementById("splat3"),l=document.getElementById("show_radiation"),c=document.getElementById("radiation"),h=document.getElementById("show_prefabs"),u=document.getElementById("prefabs"),m=document.getElementById("scale"),p=document.getElementById("sign_size"),g=document.getElementById("brightness"),f=document.getElementById("prefabs_filter"),w=document.getElementById("prefabs_filter_presets"),y=document.getElementById("prefabs_num"),b=document.getElementById("prefabs_list"),v=document.getElementById("map"),E=new s(window,v),I=new i(window,y,b);async function x(e){"biomes.png"===e.name?(console.log("Load biome"),"image/png"!==e.type&&console.warn("Unexpected biomes.png file type: %s",e.type),await E.setBiomes(e),o.value=""):"splat3.png"===e.name?(console.log("Load splat3"),"image/png"!==e.type&&console.warn("Unexpected splat3.png file type: %s",e.type),await E.setSplat3(e),d.value=""):"radiation.png"===e.name?(console.log("Load radiation"),"image/png"!==e.type&&console.warn("Unexpected splat3.png file type: %s",e.type),await E.setRad(e),c.value=""):"prefabs.xml"===e.name?(console.log("Update prefab list"),"text/xml"!==e.type&&console.warn("Unexpected prefabs.xml file type: %s",e.type),await I.setFile(e),E.prefabs=I.filtered,u.value=""):console.warn("Unknown file: %s, %s",e.name,e.type)}o.addEventListener("input",async()=>{console.log("Load biome"),await E.setBiomes(o.files[0]),E.update()}),d.addEventListener("input",async()=>{console.log("Load splat3"),await E.setSplat3(d.files[0]),E.update()}),c.addEventListener("input",async()=>{console.log("Load radiation"),await E.setRad(c.files[0]),E.update()}),u.addEventListener("input",async()=>{console.log("Load prefabs"),await I.setFile(u.files[0]),E.prefabs=I.filtered,E.update(),I.update()}),f.addEventListener("input",()=>{console.log("Update prefab list"),I.setFilterString(f.value),E.prefabs=I.filtered,E.update(),I.update()}),E.showSplat3=r.checked,E.showRad=l.checked,E.showPrefabs=h.checked,E.signSize=p.value,E.brightness=`${g.value}%`,E.scale=m.value,[a,r,l,h,p,g,m].forEach(e=>{e.addEventListener("input",()=>{E.showBiomes=a.checked,E.showSplat3=r.checked,E.showRad=l.checked,E.showPrefabs=h.checked,E.signSize=p.value,E.brightness=`${g.value}%`,E.scale=m.value,E.update()})}),document.addEventListener("dragenter",e=>{e.dataTransfer.types.includes("Files")&&(e.preventDefault(),document.body.classList.add("dragovered"))}),document.addEventListener("dragover",e=>{e.dataTransfer.types.includes("Files")&&(e.preventDefault(),e.dataTransfer.dropEffect="copy",document.body.classList.add("dragovered"))}),document.addEventListener("dragleave",e=>{0===e.clientX&&0===e.clientY&&(e.preventDefault(),document.body.classList.remove("dragovered"))}),document.addEventListener("drop",async e=>{e.dataTransfer.types.includes("Files")&&(e.preventDefault(),document.body.classList.remove("dragovered"),await Promise.all(Array.from(e.dataTransfer.files).map(x)),E.update(),I.update())}),Array.from(w.getElementsByTagName("button")).forEach(e=>{e.addEventListener("click",()=>{f.value=e.dataset.filter||e.textContent,I.setFilterString(f.value),E.prefabs=I.filtered,E.update(),I.update()})}),Array.from(document.querySelectorAll("[data-source-input")).forEach(e=>{const t=document.querySelector(`#${e.dataset.sourceInput}`);e.textContent=t.value,t.addEventListener("input",()=>{e.textContent=t.value})}),v.addEventListener("mousemove",n=>{e.textContent=-Math.round((.5-n.offsetX/v.width)*E.width),t.textContent=Math.round((.5-n.offsetY/v.height)*E.height)}),v.addEventListener("mouseout",()=>{e.textContent="-",t.textContent="-"}),n.addEventListener("click",()=>{const e=document.createElement("a");e.href=v.toDataURL("image/png");const t=f.value?`-${f.value}`:"";e.download=`7DtD-renderer${t}.png`,e.click()}),E.update(),I.update()}"loading"===document.readyState?document.addEventListener("DOMContentLoaded",o):o()}]);