"use strict";var DaRing=(()=>{function le(t){return t instanceof Uint8Array||ArrayBuffer.isView(t)&&t.constructor.name==="Uint8Array"}function W(t,...e){if(!le(t))throw new Error("Uint8Array expected");if(e.length>0&&!e.includes(t.length))throw new Error("Uint8Array expected of length "+e+", got length="+t.length)}function ht(t,e=!0){if(t.destroyed)throw new Error("Hash instance has been destroyed");if(e&&t.finished)throw new Error("Hash#digest() has already been called")}function Et(t,e){W(t);let n=e.outputLen;if(t.length<n)throw new Error("digestInto() expects output buffer of length at least "+n)}function I(...t){for(let e=0;e<t.length;e++)t[e].fill(0)}function et(t){return new DataView(t.buffer,t.byteOffset,t.byteLength)}function B(t,e){return t<<32-e|t>>>e}var pe=typeof Uint8Array.from([]).toHex=="function"&&typeof Uint8Array.fromHex=="function",he=Array.from({length:256},(t,e)=>e.toString(16).padStart(2,"0"));function Rt(t){if(W(t),pe)return t.toHex();let e="";for(let n=0;n<t.length;n++)e+=he[t[n]];return e}function ue(t){if(typeof t!="string")throw new Error("string expected");return new Uint8Array(new TextEncoder().encode(t))}function ut(t){return typeof t=="string"&&(t=ue(t)),W(t),t}var tt=class{};function xt(t){let e=r=>t().update(ut(r)).digest(),n=t();return e.outputLen=n.outputLen,e.blockLen=n.blockLen,e.create=()=>t(),e}function xe(t,e,n,r){if(typeof t.setBigUint64=="function")return t.setBigUint64(e,n,r);let s=BigInt(32),i=BigInt(4294967295),o=Number(n>>s&i),c=Number(n&i),f=r?4:0,h=r?0:4;t.setUint32(e+f,o,r),t.setUint32(e+h,c,r)}function _t(t,e,n){return t&e^~t&n}function Ct(t,e,n){return t&e^t&n^e&n}var P=class extends tt{constructor(e,n,r,s){super(),this.finished=!1,this.length=0,this.pos=0,this.destroyed=!1,this.blockLen=e,this.outputLen=n,this.padOffset=r,this.isLE=s,this.buffer=new Uint8Array(e),this.view=et(this.buffer)}update(e){ht(this),e=ut(e),W(e);let{view:n,buffer:r,blockLen:s}=this,i=e.length;for(let o=0;o<i;){let c=Math.min(s-this.pos,i-o);if(c===s){let f=et(e);for(;s<=i-o;o+=s)this.process(f,o);continue}r.set(e.subarray(o,o+c),this.pos),this.pos+=c,o+=c,this.pos===s&&(this.process(n,0),this.pos=0)}return this.length+=e.length,this.roundClean(),this}digestInto(e){ht(this),Et(e,this),this.finished=!0;let{buffer:n,view:r,blockLen:s,isLE:i}=this,{pos:o}=this;n[o++]=128,I(this.buffer.subarray(o)),this.padOffset>s-o&&(this.process(r,0),o=0);for(let d=o;d<s;d++)n[d]=0;xe(r,s-8,BigInt(this.length*8),i),this.process(r,0);let c=et(e),f=this.outputLen;if(f%4)throw new Error("_sha2: outputLen should be aligned to 32bit");let h=f/4,l=this.get();if(h>l.length)throw new Error("_sha2: outputLen bigger than state");for(let d=0;d<h;d++)c.setUint32(4*d,l[d],i)}digest(){let{buffer:e,outputLen:n}=this;this.digestInto(e);let r=e.slice(0,n);return this.destroy(),r}_cloneInto(e){e||(e=new this.constructor),e.set(...this.get());let{blockLen:n,buffer:r,length:s,finished:i,destroyed:o,pos:c}=this;return e.destroyed=o,e.finished=i,e.length=s,e.pos=c,s%n&&e.buffer.set(r),e}clone(){return this._cloneInto()}},_=Uint32Array.from([1779033703,3144134277,1013904242,2773480762,1359893119,2600822924,528734635,1541459225]);var m=Uint32Array.from([1779033703,4089235720,3144134277,2227873595,1013904242,4271175723,2773480762,1595750129,1359893119,2917565137,2600822924,725511199,528734635,4215389547,1541459225,327033209]);var nt=BigInt(4294967295),Ut=BigInt(32);function be(t,e=!1){return e?{h:Number(t&nt),l:Number(t>>Ut&nt)}:{h:Number(t>>Ut&nt)|0,l:Number(t&nt)|0}}function Tt(t,e=!1){let n=t.length,r=new Uint32Array(n),s=new Uint32Array(n);for(let i=0;i<n;i++){let{h:o,l:c}=be(t[i],e);[r[i],s[i]]=[o,c]}return[r,s]}var bt=(t,e,n)=>t>>>n,gt=(t,e,n)=>t<<32-n|e>>>n,G=(t,e,n)=>t>>>n|e<<32-n,V=(t,e,n)=>t<<32-n|e>>>n,Z=(t,e,n)=>t<<64-n|e>>>n-32,X=(t,e,n)=>t>>>n-32|e<<64-n;function H(t,e,n,r){let s=(e>>>0)+(r>>>0);return{h:t+n+(s/2**32|0)|0,l:s|0}}var Mt=(t,e,n)=>(t>>>0)+(e>>>0)+(n>>>0),It=(t,e,n,r)=>e+n+r+(t/2**32|0)|0,Gt=(t,e,n,r)=>(t>>>0)+(e>>>0)+(n>>>0)+(r>>>0),Vt=(t,e,n,r,s)=>e+n+r+s+(t/2**32|0)|0,Ft=(t,e,n,r,s)=>(t>>>0)+(e>>>0)+(n>>>0)+(r>>>0)+(s>>>0),Kt=(t,e,n,r,s,i)=>e+n+r+s+i+(t/2**32|0)|0;var ye=Uint32Array.from([1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298]),U=new Uint32Array(64),rt=class extends P{constructor(e=32){super(64,e,8,!1),this.A=_[0]|0,this.B=_[1]|0,this.C=_[2]|0,this.D=_[3]|0,this.E=_[4]|0,this.F=_[5]|0,this.G=_[6]|0,this.H=_[7]|0}get(){let{A:e,B:n,C:r,D:s,E:i,F:o,G:c,H:f}=this;return[e,n,r,s,i,o,c,f]}set(e,n,r,s,i,o,c,f){this.A=e|0,this.B=n|0,this.C=r|0,this.D=s|0,this.E=i|0,this.F=o|0,this.G=c|0,this.H=f|0}process(e,n){for(let d=0;d<16;d++,n+=4)U[d]=e.getUint32(n,!1);for(let d=16;d<64;d++){let u=U[d-15],a=U[d-2],x=B(u,7)^B(u,18)^u>>>3,y=B(a,17)^B(a,19)^a>>>10;U[d]=y+U[d-7]+x+U[d-16]|0}let{A:r,B:s,C:i,D:o,E:c,F:f,G:h,H:l}=this;for(let d=0;d<64;d++){let u=B(c,6)^B(c,11)^B(c,25),a=l+u+_t(c,f,h)+ye[d]+U[d]|0,y=(B(r,2)^B(r,13)^B(r,22))+Ct(r,s,i)|0;l=h,h=f,f=c,c=o+a|0,o=i,i=s,s=r,r=a+y|0}r=r+this.A|0,s=s+this.B|0,i=i+this.C|0,o=o+this.D|0,c=c+this.E|0,f=f+this.F|0,h=h+this.G|0,l=l+this.H|0,this.set(r,s,i,o,c,f,h,l)}roundClean(){I(U)}destroy(){this.set(0,0,0,0,0,0,0,0),I(this.buffer)}};var Dt=Tt(["0x428a2f98d728ae22","0x7137449123ef65cd","0xb5c0fbcfec4d3b2f","0xe9b5dba58189dbbc","0x3956c25bf348b538","0x59f111f1b605d019","0x923f82a4af194f9b","0xab1c5ed5da6d8118","0xd807aa98a3030242","0x12835b0145706fbe","0x243185be4ee4b28c","0x550c7dc3d5ffb4e2","0x72be5d74f27b896f","0x80deb1fe3b1696b1","0x9bdc06a725c71235","0xc19bf174cf692694","0xe49b69c19ef14ad2","0xefbe4786384f25e3","0x0fc19dc68b8cd5b5","0x240ca1cc77ac9c65","0x2de92c6f592b0275","0x4a7484aa6ea6e483","0x5cb0a9dcbd41fbd4","0x76f988da831153b5","0x983e5152ee66dfab","0xa831c66d2db43210","0xb00327c898fb213f","0xbf597fc7beef0ee4","0xc6e00bf33da88fc2","0xd5a79147930aa725","0x06ca6351e003826f","0x142929670a0e6e70","0x27b70a8546d22ffc","0x2e1b21385c26c926","0x4d2c6dfc5ac42aed","0x53380d139d95b3df","0x650a73548baf63de","0x766a0abb3c77b2a8","0x81c2c92e47edaee6","0x92722c851482353b","0xa2bfe8a14cf10364","0xa81a664bbc423001","0xc24b8b70d0f89791","0xc76c51a30654be30","0xd192e819d6ef5218","0xd69906245565a910","0xf40e35855771202a","0x106aa07032bbd1b8","0x19a4c116b8d2d0c8","0x1e376c085141ab53","0x2748774cdf8eeb99","0x34b0bcb5e19b48a8","0x391c0cb3c5c95a63","0x4ed8aa4ae3418acb","0x5b9cca4f7763e373","0x682e6ff3d6b2b8a3","0x748f82ee5defb2fc","0x78a5636f43172f60","0x84c87814a1f0ab72","0x8cc702081a6439ec","0x90befffa23631e28","0xa4506cebde82bde9","0xbef9a3f7b2c67915","0xc67178f2e372532b","0xca273eceea26619c","0xd186b8c721c0c207","0xeada7dd6cde0eb1e","0xf57d4f7fee6ed178","0x06f067aa72176fba","0x0a637dc5a2c898a6","0x113f9804bef90dae","0x1b710b35131c471b","0x28db77f523047d84","0x32caab7b40c72493","0x3c9ebe0a15c9bebc","0x431d67c49c100d4c","0x4cc5d4becb3e42b6","0x597f299cfc657e2a","0x5fcb6fab3ad6faec","0x6c44198c4a475817"].map(t=>BigInt(t))),me=Dt[0],we=Dt[1],T=new Uint32Array(80),M=new Uint32Array(80),st=class extends P{constructor(e=64){super(128,e,16,!1),this.Ah=m[0]|0,this.Al=m[1]|0,this.Bh=m[2]|0,this.Bl=m[3]|0,this.Ch=m[4]|0,this.Cl=m[5]|0,this.Dh=m[6]|0,this.Dl=m[7]|0,this.Eh=m[8]|0,this.El=m[9]|0,this.Fh=m[10]|0,this.Fl=m[11]|0,this.Gh=m[12]|0,this.Gl=m[13]|0,this.Hh=m[14]|0,this.Hl=m[15]|0}get(){let{Ah:e,Al:n,Bh:r,Bl:s,Ch:i,Cl:o,Dh:c,Dl:f,Eh:h,El:l,Fh:d,Fl:u,Gh:a,Gl:x,Hh:y,Hl:g}=this;return[e,n,r,s,i,o,c,f,h,l,d,u,a,x,y,g]}set(e,n,r,s,i,o,c,f,h,l,d,u,a,x,y,g){this.Ah=e|0,this.Al=n|0,this.Bh=r|0,this.Bl=s|0,this.Ch=i|0,this.Cl=o|0,this.Dh=c|0,this.Dl=f|0,this.Eh=h|0,this.El=l|0,this.Fh=d|0,this.Fl=u|0,this.Gh=a|0,this.Gl=x|0,this.Hh=y|0,this.Hl=g|0}process(e,n){for(let b=0;b<16;b++,n+=4)T[b]=e.getUint32(n),M[b]=e.getUint32(n+=4);for(let b=16;b<80;b++){let k=T[b-15]|0,O=M[b-15]|0,j=G(k,O,1)^G(k,O,8)^bt(k,O,7),N=V(k,O,1)^V(k,O,8)^gt(k,O,7),E=T[b-2]|0,R=M[b-2]|0,J=G(E,R,19)^Z(E,R,61)^bt(E,R,6),lt=V(E,R,19)^X(E,R,61)^gt(E,R,6),Q=Gt(N,lt,M[b-7],M[b-16]),pt=Vt(Q,j,J,T[b-7],T[b-16]);T[b]=pt|0,M[b]=Q|0}let{Ah:r,Al:s,Bh:i,Bl:o,Ch:c,Cl:f,Dh:h,Dl:l,Eh:d,El:u,Fh:a,Fl:x,Gh:y,Gl:g,Hh:w,Hl:v}=this;for(let b=0;b<80;b++){let k=G(d,u,14)^G(d,u,18)^Z(d,u,41),O=V(d,u,14)^V(d,u,18)^X(d,u,41),j=d&a^~d&y,N=u&x^~u&g,E=Ft(v,O,N,we[b],M[b]),R=Kt(E,w,k,j,me[b],T[b]),J=E|0,lt=G(r,s,28)^Z(r,s,34)^Z(r,s,39),Q=V(r,s,28)^X(r,s,34)^X(r,s,39),pt=r&i^r&c^i&c,de=s&o^s&f^o&f;w=y|0,v=g|0,y=a|0,g=x|0,a=d|0,x=u|0,{h:d,l:u}=H(h|0,l|0,R|0,J|0),h=c|0,l=f|0,c=i|0,f=o|0,i=r|0,o=s|0;let Lt=Mt(J,Q,de);r=It(Lt,R,lt,pt),s=Lt|0}({h:r,l:s}=H(this.Ah|0,this.Al|0,r|0,s|0)),{h:i,l:o}=H(this.Bh|0,this.Bl|0,i|0,o|0),{h:c,l:f}=H(this.Ch|0,this.Cl|0,c|0,f|0),{h,l}=H(this.Dh|0,this.Dl|0,h|0,l|0),{h:d,l:u}=H(this.Eh|0,this.El|0,d|0,u|0),{h:a,l:x}=H(this.Fh|0,this.Fl|0,a|0,x|0),{h:y,l:g}=H(this.Gh|0,this.Gl|0,y|0,g|0),{h:w,l:v}=H(this.Hh|0,this.Hl|0,w|0,v|0),this.set(r,s,i,o,c,f,h,l,d,u,a,x,y,g,w,v)}roundClean(){I(T,M)}destroy(){I(this.buffer),this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0)}};var zt=xt(()=>new rt);var $t=xt(()=>new st);var jt=$t;var ve={p:0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffedn,n:0x1000000000000000000000000000000014def9dea2f79cd65812631a5cf5d3edn,h:8n,a:0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffecn,d:0x52036cee2b6ffe738cc740797779e89800700a4d4141d8ab75eb4dca135978a3n,Gx:0x216936d3cd6e53fec0a4e231fdd6dc5c692cc7609525a7b2c9562d608f25d51an,Gy:0x6666666666666666666666666666666666666666666666666666666666666658n},{p:A,n:yt,Gx:Nt,Gy:Wt,a:mt,d:wt}=ve,Ae=8n,Qt=32,ke=64,S=(t="")=>{throw new Error(t)},Se=t=>typeof t=="bigint",te=t=>typeof t=="string",Be=t=>t instanceof Uint8Array||ArrayBuffer.isView(t)&&t.constructor.name==="Uint8Array",z=(t,e)=>!Be(t)||typeof e=="number"&&e>0&&t.length!==e?S("Uint8Array expected"):t,at=t=>new Uint8Array(t),kt=t=>Uint8Array.from(t),ee=(t,e)=>t.toString(16).padStart(e,"0"),St=t=>Array.from(z(t)).map(e=>ee(e,2)).join(""),C={_0:48,_9:57,A:65,F:70,a:97,f:102},Pt=t=>{if(t>=C._0&&t<=C._9)return t-C._0;if(t>=C.A&&t<=C.F)return t-(C.A-10);if(t>=C.a&&t<=C.f)return t-(C.a-10)},Bt=t=>{let e="hex invalid";if(!te(t))return S(e);let n=t.length,r=n/2;if(n%2)return S(e);let s=at(r);for(let i=0,o=0;i<r;i++,o+=2){let c=Pt(t.charCodeAt(o)),f=Pt(t.charCodeAt(o+1));if(c===void 0||f===void 0)return S(e);s[i]=c*16+f}return s},Oe=(t,e)=>z(te(t)?Bt(t):kt(z(t)),e),ne=()=>globalThis?.crypto,He=()=>ne()?.subtle??S("crypto.subtle must be defined"),Zt=(...t)=>{let e=at(t.reduce((r,s)=>r+z(s).length,0)),n=0;return t.forEach(r=>{e.set(r,n),n+=r.length}),e},Le=(t=Qt)=>ne().getRandomValues(at(t)),it=BigInt,F=(t,e,n,r="bad number: out of range")=>Se(t)&&e<=t&&t<n?t:S(r),p=(t,e=A)=>{let n=t%e;return n>=0n?n:e+n};var re=(t,e)=>{(t===0n||e<=0n)&&S("no inverse n="+t+" mod="+e);let n=p(t,e),r=e,s=0n,i=1n,o=1n,c=0n;for(;n!==0n;){let f=r/n,h=r%n,l=s-o*f,d=i-c*f;r=n,n=h,s=o,i=c,o=l,c=d}return r===1n?p(s,e):S("no inverse")};var Xt=t=>t instanceof K?t:S("Point expected"),vt=2n**256n,K=class t{static BASE;static ZERO;ex;ey;ez;et;constructor(e,n,r,s){let i=vt;this.ex=F(e,0n,i),this.ey=F(n,0n,i),this.ez=F(r,1n,i),this.et=F(s,0n,i),Object.freeze(this)}static fromAffine(e){return new t(e.x,e.y,1n,p(e.x*e.y))}static fromBytes(e,n=!1){let r=wt,s=kt(z(e,Qt)),i=e[31];s[31]=i&-129;let o=Re(s);F(o,0n,n?vt:A);let f=p(o*o),h=p(f-1n),l=p(r*f+1n),{isValid:d,value:u}=Ce(h,l);d||S("bad point: y not sqrt");let a=(u&1n)===1n,x=(i&128)!==0;return!n&&u===0n&&x&&S("bad point: x==0, isLastByteOdd"),x!==a&&(u=p(-u)),new t(u,o,1n,p(u*o))}assertValidity(){let e=mt,n=wt,r=this;if(r.is0())throw new Error("bad point: ZERO");let{ex:s,ey:i,ez:o,et:c}=r,f=p(s*s),h=p(i*i),l=p(o*o),d=p(l*l),u=p(f*e),a=p(l*p(u+h)),x=p(d+p(n*p(f*h)));if(a!==x)throw new Error("bad point: equation left != right (1)");let y=p(s*i),g=p(o*c);if(y!==g)throw new Error("bad point: equation left != right (2)");return this}equals(e){let{ex:n,ey:r,ez:s}=this,{ex:i,ey:o,ez:c}=Xt(e),f=p(n*c),h=p(i*s),l=p(r*c),d=p(o*s);return f===h&&l===d}is0(){return this.equals(D)}negate(){return new t(p(-this.ex),this.ey,this.ez,p(-this.et))}double(){let{ex:e,ey:n,ez:r}=this,s=mt,i=p(e*e),o=p(n*n),c=p(2n*p(r*r)),f=p(s*i),h=e+n,l=p(p(h*h)-i-o),d=f+o,u=d-c,a=f-o,x=p(l*u),y=p(d*a),g=p(l*a),w=p(u*d);return new t(x,y,w,g)}add(e){let{ex:n,ey:r,ez:s,et:i}=this,{ex:o,ey:c,ez:f,et:h}=Xt(e),l=mt,d=wt,u=p(n*o),a=p(r*c),x=p(i*d*h),y=p(s*f),g=p((n+r)*(o+c)-u-a),w=p(y-x),v=p(y+x),b=p(a-l*u),k=p(g*w),O=p(v*b),j=p(g*b),N=p(w*v);return new t(k,O,N,j)}multiply(e,n=!0){if(!n&&(e===0n||this.is0()))return D;if(F(e,1n,yt),e===1n)return this;if(this.equals(Y))return Me(e).p;let r=D,s=Y;for(let i=this;e>0n;i=i.double(),e>>=1n)e&1n?r=r.add(i):n&&(s=s.add(i));return r}toAffine(){let{ex:e,ey:n,ez:r}=this;if(this.equals(D))return{x:0n,y:1n};let s=re(r,A);return p(r*s)!==1n&&S("invalid inverse"),{x:p(e*s),y:p(n*s)}}toBytes(){let{x:e,y:n}=this.assertValidity().toAffine(),r=Ee(n);return r[31]|=e&1n?128:0,r}toHex(){return St(this.toBytes())}clearCofactor(){return this.multiply(it(Ae),!1)}isSmallOrder(){return this.clearCofactor().is0()}isTorsionFree(){let e=this.multiply(yt/2n,!1).double();return yt%2n&&(e=e.add(this)),e.is0()}static fromHex(e,n){return t.fromBytes(Oe(e),n)}get x(){return this.toAffine().x}get y(){return this.toAffine().y}toRawBytes(){return this.toBytes()}},Y=new K(Nt,Wt,1n,p(Nt*Wt)),D=new K(0n,1n,1n,0n);K.BASE=Y;K.ZERO=D;var Ee=t=>Bt(ee(F(t,0n,vt),ke)).reverse(),Re=t=>it("0x"+St(kt(z(t)).reverse())),L=(t,e)=>{let n=t;for(;e-- >0n;)n*=n,n%=A;return n},_e=t=>{let n=t*t%A*t%A,r=L(n,2n)*n%A,s=L(r,1n)*t%A,i=L(s,5n)*s%A,o=L(i,10n)*i%A,c=L(o,20n)*o%A,f=L(c,40n)*c%A,h=L(f,80n)*f%A,l=L(h,80n)*f%A,d=L(l,10n)*i%A;return{pow_p_5_8:L(d,2n)*t%A,b2:n}},Yt=0x2b8324804fc1df0b2b4d00993dfbd7a72f431806ad2fe478c4ee1b274a0ea0b0n,Ce=(t,e)=>{let n=p(e*e*e),r=p(n*n*e),s=_e(t*r).pow_p_5_8,i=p(t*n*s),o=p(e*i*i),c=i,f=p(i*Yt),h=o===t,l=o===p(-t),d=o===p(-t*Yt);return h&&(i=c),(l||d)&&(i=f),(p(i)&1n)===1n&&(i=p(-i)),{isValid:h||l,value:i}};var se={sha512Async:async(...t)=>{let e=He(),n=Zt(...t);return at(await e.digest("SHA-512",n.buffer))},sha512Sync:void 0,bytesToHex:St,hexToBytes:Bt,concatBytes:Zt,mod:p,invert:re,randomBytes:Le};var ot=8,Ue=256,ie=Math.ceil(Ue/ot)+1,At=2**(ot-1),Te=()=>{let t=[],e=Y,n=e;for(let r=0;r<ie;r++){n=e,t.push(n);for(let s=1;s<At;s++)n=n.add(e),t.push(n);e=n.double()}return t},qt,Jt=(t,e)=>{let n=e.negate();return t?n:e},Me=t=>{let e=qt||(qt=Te()),n=D,r=Y,s=2**ot,i=s,o=it(s-1),c=it(ot);for(let f=0;f<ie;f++){let h=Number(t&o);t>>=c,h>At&&(h-=i,t+=1n);let l=f*At,d=l,u=l+Math.abs(h)-1,a=f%2!==0,x=h<0;h===0?r=r.add(Jt(a,e[d])):n=n.add(Jt(x,e[u]))}return{p:n,f:r}};var oe=zt;se.sha512Sync=(...t)=>{let e=jt.create();for(let n of t)e.update(n);return e.digest()};function q(t){let e=new TextEncoder().encode(t);return Rt(oe(e))}function ae(t){let e=new Map;for(let n of t)e.set(n.id,n);return e}function ct(t,e){let n=new Map(t);for(let[r,s]of e)n.has(r)||n.set(r,s);return n}function Ot(t){return ae(t)}function Ge(t){let e=[...t.values()],n=new Set,r=[];function s(i){if(!n.has(i.id)){n.add(i.id);for(let o of i.seen){let c=t.get(o);c&&s(c)}r.push(i)}}e.sort((i,o)=>i.id.localeCompare(o.id));for(let i of e)s(i);return r}function ft(t){let e=Ge(t),n=new Map,r=new Map,s=new Map,i=new Set,o=new Map,c=null,f="webring",h=2,l=new Set;for(let u of e)switch(u.type){case"genesis":{let a=u;c=a,f=a.payload.name,h=a.payload.inviteBudget,n.set(a.author,{url:a.author,name:a.author,invitedBy:null,pubkey:null,isActive:!1,depth:0}),r.set(a.author,[]),o.set(a.author,0);break}case"add":{let a=u;if(!n.has(a.author)||l.has(a.author)||n.has(a.payload.target))break;let x=o.get(a.author)??0;if(x>=h)break;l.delete(a.payload.target);let y=n.get(a.author);n.set(a.payload.target,{url:a.payload.target,name:a.payload.name,invitedBy:a.author,pubkey:null,isActive:!1,depth:y.depth+1}),s.set(a.payload.target,a.author);let g=r.get(a.author)??[];g.push(a.payload.target),r.set(a.author,g),r.has(a.payload.target)||r.set(a.payload.target,[]),o.set(a.author,x+1);break}case"key-claim":{let a=u,x=n.get(a.author);if(!x||l.has(a.author))break;x.pubkey=a.payload.pubkey,x.isActive=!0,i.add(a.author);break}case"revoke":{let a=u;if(l.has(a.author)||s.get(a.payload.target)!==a.author)break;let x=[a.payload.target];for(;x.length>0;){let g=x.pop();if(l.has(g))continue;l.add(g),n.delete(g),i.delete(g);let w=s.get(g);if(w){let b=r.get(w)??[];r.set(w,b.filter(k=>k!==g))}s.delete(g);let v=r.get(g)??[];x.push(...v)}let y=o.get(a.author)??0;o.set(a.author,Math.max(0,y-1));break}case"leave":{let a=u;if(!n.has(a.author)||l.has(a.author))break;let x=s.get(a.author),y=r.get(a.author)??[];if(x){let g=r.get(x)??[];for(let v of y){s.set(v,x);let b=n.get(v);if(b){b.invitedBy=x;let k=n.get(x);k&&(b.depth=k.depth+1)}g.push(v)}r.set(x,g.filter(v=>v!==a.author));let w=o.get(x)??0;o.set(x,Math.max(0,w-1))}n.delete(a.author),i.delete(a.author),r.delete(a.author);break}}let d=new Map;for(let[u]of n){let a=o.get(u)??0;d.set(u,h-a)}return{name:f,inviteBudget:h,members:ce([...n.values()]),inviteTree:r,activeMembers:[...i],inviteSlots:d,genesis:c}}function ce(t){return[...t].sort((e,n)=>{let r=q(e.url),s=q(n.url);return r.localeCompare(s)})}function Ht(t,e){if(t.length===0)return{prev:null,next:null};let n=t.findIndex(i=>i.url===e);if(n===-1)return{prev:t[t.length-1],next:t[0]};let r=t[(n-1+t.length)%t.length],s=t[(n+1)%t.length];return{prev:r,next:s}}var dt=`
  @font-face {
    font-family: 'W95';
    src: local('MS Sans Serif'), local('Microsoft Sans Serif'), local('Tahoma'), local('Arial');
  }

  :host {
    display: block;
    font-family: 'W95', 'MS Sans Serif', 'Microsoft Sans Serif', Tahoma, Arial, sans-serif;
    font-size: 11px;
    --win-bg: #c0c0c0;
    --win-text: #000;
    --win-title: #000080;
    --win-title-text: #fff;
    --win-title-inactive: #808080;
    --win-highlight: #000080;
    --win-highlight-text: #fff;
    --win-light: #dfdfdf;
    --win-dark: #808080;
    --win-darker: #404040;
    --win-white: #fff;
  }

  .widget {
    background: var(--win-bg);
    border-top: 2px solid var(--win-white);
    border-left: 2px solid var(--win-white);
    border-right: 2px solid var(--win-darker);
    border-bottom: 2px solid var(--win-darker);
    max-width: 380px;
    margin: 0 auto;
    padding: 2px;
    color: var(--win-text);
  }

  .titlebar {
    background: linear-gradient(90deg, var(--win-title), #1084d0);
    color: var(--win-title-text);
    font-weight: 700;
    font-size: 11px;
    padding: 2px 4px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 2px;
    user-select: none;
    letter-spacing: 0.02em;
  }

  .titlebar-text {
    display: flex;
    align-items: center;
    gap: 4px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .titlebar-icon {
    font-size: 10px;
  }

  .titlebar-btn {
    background: var(--win-bg);
    border-top: 1px solid var(--win-white);
    border-left: 1px solid var(--win-white);
    border-right: 1px solid var(--win-darker);
    border-bottom: 1px solid var(--win-darker);
    width: 16px;
    height: 14px;
    font-size: 8px;
    line-height: 12px;
    text-align: center;
    cursor: pointer;
    color: var(--win-text);
    padding: 0;
    font-family: inherit;
  }

  .titlebar-btn:active {
    border-top: 1px solid var(--win-darker);
    border-left: 1px solid var(--win-darker);
    border-right: 1px solid var(--win-white);
    border-bottom: 1px solid var(--win-white);
  }

  .bar {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2px;
    padding: 4px 3px;
    background: var(--win-bg);
  }

  .nav-btn {
    text-decoration: none;
    color: var(--win-text);
    background: var(--win-bg);
    border-top: 2px solid var(--win-white);
    border-left: 2px solid var(--win-white);
    border-right: 2px solid var(--win-darker);
    border-bottom: 2px solid var(--win-darker);
    padding: 3px 12px;
    font-size: 11px;
    font-family: inherit;
    cursor: pointer;
    text-align: center;
    min-width: 60px;
  }

  .nav-btn:hover {
    /* no fancy hover, this is win95 baby */
  }

  .nav-btn:active {
    border-top: 2px solid var(--win-darker);
    border-left: 2px solid var(--win-darker);
    border-right: 2px solid var(--win-white);
    border-bottom: 2px solid var(--win-white);
    padding: 4px 11px 2px 13px;
  }

  .divider {
    width: 2px;
    height: 22px;
    border-left: 1px solid var(--win-dark);
    border-right: 1px solid var(--win-white);
    margin: 0 2px;
  }

  .center-label {
    font-weight: 700;
    font-size: 11px;
    padding: 3px 8px;
    cursor: pointer;
    user-select: none;
    color: var(--win-text);
    background: var(--win-bg);
    border-top: 2px solid var(--win-white);
    border-left: 2px solid var(--win-white);
    border-right: 2px solid var(--win-darker);
    border-bottom: 2px solid var(--win-darker);
    text-align: center;
    min-width: 80px;
  }

  .center-label:active {
    border-top: 2px solid var(--win-darker);
    border-left: 2px solid var(--win-darker);
    border-right: 2px solid var(--win-white);
    border-bottom: 2px solid var(--win-white);
  }

  .member-list {
    max-height: 0;
    overflow-y: auto;
    overflow-x: hidden;
    transition: max-height 0.15s ease-out;
  }

  .member-list.expanded {
    max-height: 200px;
    border-top: 1px solid var(--win-dark);
    border-left: 1px solid var(--win-dark);
    border-right: 1px solid var(--win-white);
    border-bottom: 1px solid var(--win-white);
    background: var(--win-white);
    margin: 0 3px 3px 3px;
  }

  .member-item {
    display: block;
    padding: 2px 4px;
    text-decoration: none;
    color: var(--win-text);
    font-size: 11px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    cursor: pointer;
  }

  .member-item:hover {
    background: var(--win-highlight);
    color: var(--win-highlight-text);
  }

  .member-item.current {
    background: var(--win-highlight);
    color: var(--win-highlight-text);
  }

  .member-name {
    margin-left: 6px;
    opacity: 0.6;
  }

  .member-item:hover .member-name,
  .member-item.current .member-name {
    opacity: 0.8;
  }

  .status-msg {
    text-align: center;
    padding: 8px;
    font-size: 11px;
  }

  .statusbar {
    background: var(--win-bg);
    border-top: 1px solid var(--win-dark);
    padding: 2px 4px;
    font-size: 10px;
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .statusbar-panel {
    border-top: 1px solid var(--win-dark);
    border-left: 1px solid var(--win-dark);
    border-right: 1px solid var(--win-white);
    border-bottom: 1px solid var(--win-white);
    padding: 1px 4px;
    flex: 1;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .loading-blink {
    animation: blink95 1s step-start infinite;
  }

  @keyframes blink95 {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }
`;function $(t,e,n,r="loaded"){t.shadowRoot||t.attachShadow({mode:"open"});let s=t.shadowRoot,i=e?.name||"kek's ring";if(r==="loading"){s.innerHTML=`<style>${dt}</style>
      <div class="widget">
        <div class="titlebar">
          <span class="titlebar-text"><span class="titlebar-icon">\u{1F310}</span> ${i}</span>
        </div>
        <div class="status-msg"><span class="loading-blink">\u25A0</span> Loading ring...</div>
      </div>`;return}if(r==="error"){s.innerHTML=`<style>${dt}</style>
      <div class="widget">
        <div class="titlebar">
          <span class="titlebar-text"><span class="titlebar-icon">\u{1F310}</span> ${i}</span>
        </div>
        <div class="status-msg">\u26A0 Ring unavailable</div>
      </div>`;return}if(r==="empty"||!e||e.members.length===0){s.innerHTML=`<style>${dt}</style>
      <div class="widget">
        <div class="titlebar">
          <span class="titlebar-text"><span class="titlebar-icon">\u{1F310}</span> ${i}</span>
        </div>
        <div class="status-msg">Ring is empty</div>
      </div>`;return}let{prev:o,next:c}=Ht(e.members,n),f=e.members.map(a=>`<a class="member-item${a.url===n?" current":""}" href="${a.url}">${a.url}<span class="member-name">${a.name}</span></a>`).join("");s.innerHTML=`
    <style>${dt}</style>
    <div class="widget">
      <div class="titlebar">
        <span class="titlebar-text"><span class="titlebar-icon">\u{1F310}</span> ${e.name}</span>
        <button class="titlebar-btn" id="ring-toggle" title="Members">\u25BC</button>
      </div>
      <div class="bar">
        <a class="nav-btn" href="${o?.url||"#"}" title="${o?.name||"previous"}">\u25C4 Prev</a>
        <div class="divider"></div>
        <div class="center-label" id="ring-title">${e.members.length} site${e.members.length!==1?"s":""}</div>
        <div class="divider"></div>
        <a class="nav-btn" href="${c?.url||"#"}" title="${c?.name||"next"}">Next \u25BA</a>
      </div>
      <div class="member-list" id="member-list">
        ${f}
      </div>
      <div class="statusbar">
        <span class="statusbar-panel">Ring: ${e.name}</span>
      </div>
    </div>
  `;let h=s.getElementById("ring-toggle"),l=s.getElementById("ring-title"),d=s.getElementById("member-list"),u=()=>d?.classList.toggle("expanded");h?.addEventListener("click",u),l?.addEventListener("click",u)}async function fe(t){try{let e=new AbortController,n=setTimeout(()=>e.abort(),3e3),r=t.endsWith("/webring.json")?t:`${t.replace(/\/$/,"")}/webring.json`,s=await fetch(r,{signal:e.signal});if(clearTimeout(n),!s.ok)return null;let i=await s.json();return Array.isArray(i)?Ot(i):null}catch{return null}}async function Ve(){let t=document.currentScript||document.querySelector("script[data-ring]");if(!t)return;let e=t.getAttribute("data-ring");if(!e)return;let n=window.location.origin,r=document.createElement("div");t.parentNode?.insertBefore(r,t.nextSibling),$(r,null,n,"loading");let s=e.split(",").map(l=>l.trim()).filter(Boolean);if(s.length===0){$(r,null,n,"error");return}let i=new Set,c=(await Promise.all(s.map(l=>(i.add(l),fe(l))))).filter(l=>l!==null);if(c.length===0){$(r,null,n,"error");return}let f=c[0];for(let l=1;l<c.length;l++)f=ct(f,c[l]);for(;;){let d=ft(f).members.filter(a=>!i.has(a.url));if(d.length===0)break;let u=await Promise.all(d.map(a=>(i.add(a.url),fe(a.url))));for(let a of u)a&&(f=ct(f,a))}let h=ft(f);h.members.length===0?$(r,h,n,"empty"):$(r,h,n,"loaded")}Ve();})();
/*! Bundled license information:

@noble/hashes/esm/utils.js:
  (*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

@noble/ed25519/index.js:
  (*! noble-ed25519 - MIT License (c) 2019 Paul Miller (paulmillr.com) *)
*/
