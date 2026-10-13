/* Asset Sentinel UI. Data comes from the CloudPage: window.__REPORT_DATA__, __REPORT_META__, __REPORT_ERROR__ */
(function(){
var h=React.createElement, useState=React.useState, useEffect=React.useEffect, useRef=React.useRef;
var RAW=(window.__REPORT_DATA__||[]).slice().sort(function(a,b){return a.ChangedAt<b.ChangedAt?1:a.ChangedAt>b.ChangedAt?-1:0}),META=window.__REPORT_META__||{},ERR=window.__REPORT_ERROR__||"";

var LOGO=META.logo||"";
function useReveal(){var r=useRef();useEffect(function(){var el=r.current;if(!el)return;var io=new IntersectionObserver(function(e){if(e[0].isIntersecting){el.classList.add("in");io.disconnect()}},{threshold:.12});io.observe(el);return function(){io.disconnect()}},[]);return r}
function Rv(p){var r=useReveal();return h("div",{ref:r,className:"rv "+(p.cls||""),style:{transitionDelay:(p.d||0)+"ms"}},p.children)}
function useCount(n){var s=useState(0),v=s[0],set=s[1];useEffect(function(){var t0=null,id;function f(t){if(!t0)t0=t;var p=Math.min((t-t0)/900,1);set(Math.round(n*(1-Math.pow(1-p,3))));if(p<1)id=requestAnimationFrame(f)}id=requestAnimationFrame(f);return function(){cancelAnimationFrame(id)}},[n]);return v}
function Stat(p){var v=useCount(p.n);return h(Rv,{cls:"stat",d:p.d},h("b",null,v),h("span",null,p.label))}
function ago(iso){var m=Math.round((Date.now()-new Date(iso))/6e4);return m<60?m+"m ago":Math.round(m/60)+"h ago"}

function Row(p){
var r=p.r,s=useState(false),open=s[0],set=s[1],a=r.Action==="Activated",c=a?"a":"d",ex=r.Extra||{};
var fields=[["Journey",r.Journey||"—"],["Tactic",r.Tactic||"—"],["Changed",new Date(r.ChangedAt).toLocaleString()]].concat(Object.keys(ex).map(function(k){return[k,ex[k]]}));
return h("div",{className:"row"+(open?" open":""),style:{animationDelay:Math.min(p.i*60,600)+"ms"}},
h("button",{className:"head",onClick:function(){set(!open)},"aria-expanded":open},
h("div",{className:"ico "+c},a?"↑":"↓"),
h("div",{style:{minWidth:0}},h("div",{className:"nm"},r.EmailName),h("div",{className:"meta"},(r.Journey||"—")+" · "+(r.Tactic||"—")+" · "+ago(r.ChangedAt))),
h("span",{className:"pill "+c},a?"Inactive → Active":"Active → Inactive"),
h("svg",{className:"chev",width:16,height:16,viewBox:"0 0 16 16",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round"},h("path",{d:"M3 6l5 5 5-5"}))),
h("div",{className:"more"},h("div",null,h("div",{className:"grid"},fields.map(function(f){return h("div",{key:f[0]},h("small",null,f[0]),h("p",null,f[1]))})))));
}

function Logo(p){return h("svg",{width:p.s,height:p.s,viewBox:"0 0 24 24"},h("path",{d:"M12 2l8 3v6c0 5-3.4 9.3-8 11-4.6-1.7-8-6-8-11V5l8-3z",fill:p.f}),h("path",{d:"M8.5 12l2.5 2.5 4.5-5",stroke:p.c,strokeWidth:2,fill:"none",strokeLinecap:"round",strokeLinejoin:"round"}))}
function Skel(){return h("div",{className:"list"},[0,1,2,3].map(function(i){return h("div",{key:i,className:"row skr"},h("div",{className:"sk ico"}),h("div",null,h("div",{className:"sk l1"}),h("div",{className:"sk l2"})),h("div",{className:"sk l3"}))}))}
function Splash(p){return h("div",{className:"splash"+(p.out?" out":"")},h("div",null,LOGO?h("div",{className:"lpill"},h("img",{src:LOGO,alt:"Amgen"})):null,h(Logo,{s:72,f:"#fff",c:"#0063C3"}),h("p",null,"Asset Sentinel"),h("div",{className:"bar"},h("i")),h("small",null,"Scanning asset status changes…")))}
function App(){
var f=useState("All"),flt=f[0],setF=f[1],q=useState(""),qs=q[0],setQ=q[1],b=useState(true),boot=b[0],setBoot=b[1],y=useState(true),busy=y[0],setBusy=y[1];
useEffect(function(){var t=setTimeout(function(){setBusy(false)},1500),t2=setTimeout(function(){setBoot(false)},2100);return function(){clearTimeout(t);clearTimeout(t2)}},[]);
function refresh(){setBusy(true);location.reload()}
var tabs=["All","Activated","Deactivated"];
var act=RAW.filter(function(r){return r.Action==="Activated"}).length;
var rows=RAW.filter(function(r){return(flt==="All"||r.Action===flt)&&(r.EmailName+r.Journey+r.Tactic).toLowerCase().indexOf(qs.toLowerCase())>-1});
return h("div",null,
boot&&h(Splash,{out:!busy}),
h("nav",null,h("div",{className:"brand"},LOGO?h("img",{src:LOGO,alt:"Amgen",className:"blogo"}):null,LOGO?h("span",{className:"vr"}):null,h(Logo,{s:22,f:"#0063C3",c:"#fff"}),"Asset Sentinel"),h("div",{className:"nav-r"},h("button",{className:"rf",onClick:refresh,disabled:busy},busy?"Refreshing…":"Refresh"),h("span",{className:"live"},h("span",{className:"dot"}),"Last 24 hours"+(META.updated?" \u00b7 Updated "+new Date(META.updated).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}):"")))),
h("section",{className:"hero"},h("div",{className:"in"},
h(Rv,null,h("p",{className:"eyebrow"},"Asset Sentinel")),
h(Rv,{d:100},h("h1",null,"Every status change.",h("br"),"Always in sight.")),
h(Rv,{d:200},h("p",{className:"sub"},"Emails that switched between active and inactive in the last 24 hours, with the journey and tactic behind each one.")))),
h("div",{className:"wrap"},
h("div",{className:"stats"},busy?[0,1,2].map(function(i){return h("div",{key:i,className:"stat sk",style:{height:118}})}):[h(Stat,{key:1,n:RAW.length,label:"Total changes",d:0}),h(Stat,{key:2,n:act,label:"Activated",d:120}),h(Stat,{key:3,n:RAW.length-act,label:"Deactivated",d:240})]),
h(Rv,{cls:"tools"},
h("div",{className:"seg"},h("i",{style:{transform:"translateX("+tabs.indexOf(flt)*100+"%)"}}),tabs.map(function(t){return h("button",{key:t,className:t===flt?"on":"",onClick:function(){setF(t)}},t)})),
h("input",{className:"search",placeholder:"Search email, journey, tactic",value:qs,onChange:function(e){setQ(e.target.value)}})),
busy?h(Skel):rows.length?h("div",{className:"list",key:flt+qs},rows.map(function(r,i){return h(Row,{key:r.EmailName+r.ChangedAt,r:r,i:i})})):h("div",{className:"empty"},ERR?"We could not load the report. Please refresh or contact the admin.":RAW.length?"No changes match your filters.":"No status changes in the last 24 hours."),
h("div",{className:"foot"},"Showing "+rows.length+" of "+RAW.length+" changes")));
}
ReactDOM.createRoot(document.getElementById("root")).render(h(App));
})();
