var t={pxPerM:20,CONSTS:{g:9.8,m:10,k:100,r0:10},steps:30,samplingFrequency:10,trailLength:100,timewarp:1};function L(e){return(+e*100).toFixed(2)+"%"}function M(e){return Math.round(e)+""}function w(e){return e+""}function oe(e){return e.replace(/\.([1-9]*)0+(%?)$/,".$1$2").replace(".%","%").replace(/\.$/,"")}function T(e,o,n,r=!1){if(e){if(n.title=o,n.classList.contains("active")||n.classList.add("active"),!r)throw new Error(o)}else n.classList.contains("active")&&(n.classList.remove("active"),n.title="Warning not active");return e}function E(e,o){return(o-e)/e}function se(e){return(o,n)=>{let r=n.length,a=r/2;if(!Number.isInteger(a))throw new Error("Expected even number of inputs, "+n);let g=n.slice(0,a),l=n.slice(a),m=e(o,g,l),h=new Array(r);for(let p=0;p<a;p++)h[p]=l[p];for(let p=a;p<r;p++)h[p]=m[p-a];return h}}function ce(e,o,n,r,a){let g=a(e,r),l=a(e,y(r,b(g,n/2))),m=a(e,y(r,b(l,n/2))),h=a(e,y(r,b(m,n)));return y(r,y(y(b(g,n/6),b(l,n/3)),y(b(m,n/3),b(h,n/6))))}function y(e,o){let n=new Array(e.length);for(let r=0,a=n.length;r<a;r++)n[r]=e[r]+o[r];return n}function b(e,o){let n=new Array(e.length);for(let r=0,a=n.length;r<a;r++)n[r]=e[r]*o;return n}function me(e,[o,n],[r,a]){let g=o*a*a+e.g*Math.cos(n)-e.k/e.m*(o-e.r0),l=-2*r*a/o-e.g*Math.sin(n)/o;return[g,l]}function N(e,o){return[e*Math.sin(o),e*Math.cos(o)]}function q(e,o,n,r){let a=n*n+e*r*(e*r),g=.5*t.CONSTS.m*a,l=t.CONSTS.g*t.CONSTS.m*-e*Math.cos(o),m=.5*t.CONSTS.k*(e-t.CONSTS.r0)*(e-t.CONSTS.r0);return[g+l+m,g,l,m]}function ue(){let e=se(me);return(o,n,r)=>ce(t.CONSTS,o,n,r,e)}window.IS_DEV&&new EventSource("/esbuild").addEventListener("change",()=>location.reload());document.addEventListener("DOMContentLoaded",async()=>{let e=C(),o,n=[t.CONSTS.r0*.8,Math.PI+1e-7,0,0],r=q(n[0],n[1],n[2],n[3]),a=N(n[0],n[1]),g=ue(),l=!1,m=!0,h,p,H=!1,k=!0,I=document.querySelector("span.fps"),O=document.querySelector("span.energy"),P=document.querySelector("span.energy-change"),F=document.querySelector("span.ke"),W=document.querySelector("span.ke-change"),$=document.querySelector("span.gpe"),R=document.querySelector("span.gpe-change"),G=document.querySelector("span.pe"),A=document.querySelector("span.pe-change"),B=document.querySelector("span.r"),U=document.querySelector("span.theta"),D=document.querySelector("span.rdot"),J=document.querySelector("span.thetadot"),Y=document.querySelector("span.panel-hung-warn"),ie=document.querySelector("span.not-rendered-warn"),le=document.querySelector("span.settings-too-quick-warn"),Z=document.querySelector("span.energy-change-warn"),z=document.querySelector("span.fps-warn"),Q=document.querySelector("span.pause-warn"),_=document.querySelector("span.time-warp"),j=document.querySelector("span.g"),K=document.querySelector("span.trail-length"),V=document.querySelector("span.k"),X=document.querySelector("span.m"),ee=document.querySelector("span.scale"),ne=document.querySelector("span.r0");if(!I||!O||!P||!F||!W||!$||!R||!G||!A||!Y||!Z||!z||!_||!j||!K||!Q||!V||!X||!ee||!ne||!B||!U||!D||!J)throw new Error("Could not get display panel");document.querySelector("button[name=pause]")?.addEventListener("click",s=>{H=!H,s.target.innerHTML=H?"Play":"Pause"}),document.querySelector("input[name=trail-length]")?.addEventListener("input",s=>{s&&(K.innerHTML=w((t.trailLength=1e3*t.timewarp*+s.target?.value||t.trailLength)/1e3/t.timewarp))}),document.querySelector("input[name=time-warp]")?.addEventListener("input",s=>{if(!s)return;let u=t.timewarp;_.innerHTML=oe(L(t.timewarp=Math.pow(2,parseFloat(s.target?.value))||t.timewarp)),t.trailLength/=u,t.trailLength*=t.timewarp}),document.querySelector("input[name=g]")?.addEventListener("input",s=>j.innerHTML=w(x("g",+s.target.value))),document.querySelector("input[name=r0]")?.addEventListener("input",s=>ne.innerHTML=w(x("r0",+s.target.value))),document.querySelector("input[name=k]")?.addEventListener("input",s=>V.innerHTML=M(x("k",+s.target.value))),document.querySelector("input[name=m]")?.addEventListener("input",s=>X.innerHTML=M(x("m",+s.target.value))),document.querySelector("input[name=scale]")?.addEventListener("input",s=>{ee.innerHTML=w(t.pxPerM=+s.target.value||t.pxPerM),e=C(),te()}),document.querySelector("button.update")?.addEventListener("click",s=>{let u=q(n[0],n[1],n[2],n[3]);re(!0,NaN,u,E(r[0],u[0]))}),window.addEventListener("resize",()=>e=C()),document.querySelector("button.reset-ctx")?.addEventListener("click",()=>e=C()),requestAnimationFrame(function s(u){if(requestAnimationFrame(s),cancelIdleCallback(h),cancelIdleCallback(p),l=!1,T(H,"Simulation paused",Q,!0))return;if(T(!m&&!H,"Stats panel disconnected, close some programs or slow down time warp",Y,!0),T(!k&&!H,"Renderer disconnected, close some programs or slow down time warp",ie,!0),m=!1,k=!1,!o)return o=u;let c=(o-(o=u))/-1e3;T(c>.5,"Critically low frame rate detected (or maybe you were changing windows too much). Close some programs.",z)&&(e=C());let i=n.slice(),S=n.slice(),d,f=0,ae=Math.floor(t.steps*t.timewarp);for(let v=0;v<ae;v++){if(S=g(u,c/t.steps,S),l)return;(t.timewarp>=1&&Math.round(v*Math.round(t.timewarp))%t.samplingFrequency==0||v==ae-1)&&(d=q(i[0],i[1],i[2],i[3]),f=(d[0]-r[0])/d[0]/c,T(Math.abs(f)>=.05||isNaN(f),`Large energy change ${L(f)} detected, ignoring this frame.`,Z,!0)||(i=S,a.push(...N(i[0],i[1]))))}if(l){m=!0,k=!0;return}n=i,h=requestIdleCallback(()=>re(!1,c,d,f)),p=requestIdleCallback(te)});function te(){for(k=!0,e.clearRect(-innerWidth/2,-innerHeight/2,innerWidth,innerHeight);a.length>t.trailLength;)a=a.slice(2);for(let c=0;c<a.length;c+=2){let i=a[c],S=a[c+1],d=c/a.length,f=.5-d;e.strokeStyle=`rgb(${d<.5?f*510:0}, ${d<=.5?d*510:(1+f)*255}, ${d<.5?0:-f*510})`,e.beginPath(),e.moveTo(a[c>0?c-2:0],a[c>0?c-1:1]),e.lineTo(i,S),e.stroke()}let s=a[a.length-2],u=a[a.length-1];e.strokeStyle="#000",e.beginPath(),e.moveTo(s,u),e.lineTo(0,0),e.stroke(),e.beginPath(),e.arc(s,u,Math.min(Math.max(.5,t.CONSTS.m/t.pxPerM),5),0,2*Math.PI),e.fill()}function re(s,u,c,i){!s&&m||(m=!0,I.innerHTML=isNaN(u)?"[Unknown]":M(1/u),O.innerHTML=M(c[0]),P.innerHTML=isNaN(u)?"[Unknown]":L(i*u),F.innerHTML=M(c[1]),W.innerHTML=L(E(r[1],c[1])),$.innerHTML=M(c[2]),R.innerHTML=L(E(r[2],c[2])),G.innerHTML=M(c[3]),A.innerHTML=L(E(r[3],c[3])),B.innerHTML=(n[0]/t.CONSTS.r0).toFixed(2),U.innerHTML=(n[1]/Math.PI%2).toFixed(2),D.innerHTML=(n[2]/t.CONSTS.r0).toFixed(2),J.innerHTML=(n[3]/Math.PI%2).toFixed(2),r=null,r=c)}function x(s,u){let c=JSON.parse(JSON.stringify(t.CONSTS));t.CONSTS[s]=u;let i=q(n[0],n[1],n[2],n[3]),S=E(r[0],i[0]),d=`Large energy change detected (${L(S)}) after changing of settings. Please change them slowly.`;if(T(isNaN(S)||Math.abs(S)>=.05,d,le,!0))throw t.CONSTS=c,document.querySelector(`input[name=${s}]`).value=w(t.CONSTS[s]),new Error(d);return r=i,u}});function C(){let e=document.querySelector("canvas");if(!e)throw alert("Your browser is too old!"),new Error("Browser does not support `2d` canvas context");e.height=innerHeight,e.width=innerWidth;let o=e?.getContext("2d");if(!o)throw alert("Your browser is too old!"),new Error("Browser does not support `2d` canvas context");return o.setTransform(t.pxPerM,0,0,t.pxPerM,innerWidth/2,innerHeight/2),o.lineWidth=1/t.pxPerM,o}