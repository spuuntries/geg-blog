"use strict";var DaRing=(()=>{function le(t){return t instanceof Uint8Array||ArrayBuffer.isView(t)&&t.constructor.name==="Uint8Array"}function Z(t,...e){if(!le(t))throw new Error("Uint8Array expected");if(e.length>0&&!e.includes(t.length))throw new Error("Uint8Array expected of length "+e+", got length="+t.length)}function ht(t,e=!0){if(t.destroyed)throw new Error("Hash instance has been destroyed");if(e&&t.finished)throw new Error("Hash#digest() has already been called")}function Et(t,e){Z(t);let n=e.outputLen;if(t.length<n)throw new Error("digestInto() expects output buffer of length at least "+n)}function I(...t){for(let e=0;e<t.length;e++)t[e].fill(0)}function et(t){return new DataView(t.buffer,t.byteOffset,t.byteLength)}function O(t,e){return t<<32-e|t>>>e}var ue=typeof Uint8Array.from([]).toHex=="function"&&typeof Uint8Array.fromHex=="function",he=Array.from({length:256},(t,e)=>e.toString(16).padStart(2,"0"));function Rt(t){if(Z(t),ue)return t.toHex();let e="";for(let n=0;n<t.length;n++)e+=he[t[n]];return e}function pe(t){if(typeof t!="string")throw new Error("string expected");return new Uint8Array(new TextEncoder().encode(t))}function pt(t){return typeof t=="string"&&(t=pe(t)),Z(t),t}var tt=class{};function xt(t){let e=s=>t().update(pt(s)).digest(),n=t();return e.outputLen=n.outputLen,e.blockLen=n.blockLen,e.create=()=>t(),e}function xe(t,e,n,s){if(typeof t.setBigUint64=="function")return t.setBigUint64(e,n,s);let r=BigInt(32),o=BigInt(4294967295),i=Number(n>>r&o),c=Number(n&o),f=s?4:0,h=s?0:4;t.setUint32(e+f,i,s),t.setUint32(e+h,c,s)}function _t(t,e,n){return t&e^~t&n}function Ct(t,e,n){return t&e^t&n^e&n}var P=class extends tt{constructor(e,n,s,r){super(),this.finished=!1,this.length=0,this.pos=0,this.destroyed=!1,this.blockLen=e,this.outputLen=n,this.padOffset=s,this.isLE=r,this.buffer=new Uint8Array(e),this.view=et(this.buffer)}update(e){ht(this),e=pt(e),Z(e);let{view:n,buffer:s,blockLen:r}=this,o=e.length;for(let i=0;i<o;){let c=Math.min(r-this.pos,o-i);if(c===r){let f=et(e);for(;r<=o-i;i+=r)this.process(f,i);continue}s.set(e.subarray(i,i+c),this.pos),this.pos+=c,i+=c,this.pos===r&&(this.process(n,0),this.pos=0)}return this.length+=e.length,this.roundClean(),this}digestInto(e){ht(this),Et(e,this),this.finished=!0;let{buffer:n,view:s,blockLen:r,isLE:o}=this,{pos:i}=this;n[i++]=128,I(this.buffer.subarray(i)),this.padOffset>r-i&&(this.process(s,0),i=0);for(let d=i;d<r;d++)n[d]=0;xe(s,r-8,BigInt(this.length*8),o),this.process(s,0);let c=et(e),f=this.outputLen;if(f%4)throw new Error("_sha2: outputLen should be aligned to 32bit");let h=f/4,l=this.get();if(h>l.length)throw new Error("_sha2: outputLen bigger than state");for(let d=0;d<h;d++)c.setUint32(4*d,l[d],o)}digest(){let{buffer:e,outputLen:n}=this;this.digestInto(e);let s=e.slice(0,n);return this.destroy(),s}_cloneInto(e){e||(e=new this.constructor),e.set(...this.get());let{blockLen:n,buffer:s,length:r,finished:o,destroyed:i,pos:c}=this;return e.destroyed=i,e.finished=o,e.length=r,e.pos=c,r%n&&e.buffer.set(s),e}clone(){return this._cloneInto()}},_=Uint32Array.from([1779033703,3144134277,1013904242,2773480762,1359893119,2600822924,528734635,1541459225]);var m=Uint32Array.from([1779033703,4089235720,3144134277,2227873595,1013904242,4271175723,2773480762,1595750129,1359893119,2917565137,2600822924,725511199,528734635,4215389547,1541459225,327033209]);var nt=BigInt(4294967295),Ut=BigInt(32);function ge(t,e=!1){return e?{h:Number(t&nt),l:Number(t>>Ut&nt)}:{h:Number(t>>Ut&nt)|0,l:Number(t&nt)|0}}function Tt(t,e=!1){let n=t.length,s=new Uint32Array(n),r=new Uint32Array(n);for(let o=0;o<n;o++){let{h:i,l:c}=ge(t[o],e);[s[o],r[o]]=[i,c]}return[s,r]}var gt=(t,e,n)=>t>>>n,bt=(t,e,n)=>t<<32-n|e>>>n,G=(t,e,n)=>t>>>n|e<<32-n,V=(t,e,n)=>t<<32-n|e>>>n,W=(t,e,n)=>t<<64-n|e>>>n-32,X=(t,e,n)=>t>>>n-32|e<<64-n;function k(t,e,n,s){let r=(e>>>0)+(s>>>0);return{h:t+n+(r/2**32|0)|0,l:r|0}}var Mt=(t,e,n)=>(t>>>0)+(e>>>0)+(n>>>0),It=(t,e,n,s)=>e+n+s+(t/2**32|0)|0,Gt=(t,e,n,s)=>(t>>>0)+(e>>>0)+(n>>>0)+(s>>>0),Vt=(t,e,n,s,r)=>e+n+s+r+(t/2**32|0)|0,Ft=(t,e,n,s,r)=>(t>>>0)+(e>>>0)+(n>>>0)+(s>>>0)+(r>>>0),Kt=(t,e,n,s,r,o)=>e+n+s+r+o+(t/2**32|0)|0;var ye=Uint32Array.from([1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298]),U=new Uint32Array(64),st=class extends P{constructor(e=32){super(64,e,8,!1),this.A=_[0]|0,this.B=_[1]|0,this.C=_[2]|0,this.D=_[3]|0,this.E=_[4]|0,this.F=_[5]|0,this.G=_[6]|0,this.H=_[7]|0}get(){let{A:e,B:n,C:s,D:r,E:o,F:i,G:c,H:f}=this;return[e,n,s,r,o,i,c,f]}set(e,n,s,r,o,i,c,f){this.A=e|0,this.B=n|0,this.C=s|0,this.D=r|0,this.E=o|0,this.F=i|0,this.G=c|0,this.H=f|0}process(e,n){for(let d=0;d<16;d++,n+=4)U[d]=e.getUint32(n,!1);for(let d=16;d<64;d++){let p=U[d-15],a=U[d-2],x=O(p,7)^O(p,18)^p>>>3,y=O(a,17)^O(a,19)^a>>>10;U[d]=y+U[d-7]+x+U[d-16]|0}let{A:s,B:r,C:o,D:i,E:c,F:f,G:h,H:l}=this;for(let d=0;d<64;d++){let p=O(c,6)^O(c,11)^O(c,25),a=l+p+_t(c,f,h)+ye[d]+U[d]|0,y=(O(s,2)^O(s,13)^O(s,22))+Ct(s,r,o)|0;l=h,h=f,f=c,c=i+a|0,i=o,o=r,r=s,s=a+y|0}s=s+this.A|0,r=r+this.B|0,o=o+this.C|0,i=i+this.D|0,c=c+this.E|0,f=f+this.F|0,h=h+this.G|0,l=l+this.H|0,this.set(s,r,o,i,c,f,h,l)}roundClean(){I(U)}destroy(){this.set(0,0,0,0,0,0,0,0),I(this.buffer)}};var Dt=Tt(["0x428a2f98d728ae22","0x7137449123ef65cd","0xb5c0fbcfec4d3b2f","0xe9b5dba58189dbbc","0x3956c25bf348b538","0x59f111f1b605d019","0x923f82a4af194f9b","0xab1c5ed5da6d8118","0xd807aa98a3030242","0x12835b0145706fbe","0x243185be4ee4b28c","0x550c7dc3d5ffb4e2","0x72be5d74f27b896f","0x80deb1fe3b1696b1","0x9bdc06a725c71235","0xc19bf174cf692694","0xe49b69c19ef14ad2","0xefbe4786384f25e3","0x0fc19dc68b8cd5b5","0x240ca1cc77ac9c65","0x2de92c6f592b0275","0x4a7484aa6ea6e483","0x5cb0a9dcbd41fbd4","0x76f988da831153b5","0x983e5152ee66dfab","0xa831c66d2db43210","0xb00327c898fb213f","0xbf597fc7beef0ee4","0xc6e00bf33da88fc2","0xd5a79147930aa725","0x06ca6351e003826f","0x142929670a0e6e70","0x27b70a8546d22ffc","0x2e1b21385c26c926","0x4d2c6dfc5ac42aed","0x53380d139d95b3df","0x650a73548baf63de","0x766a0abb3c77b2a8","0x81c2c92e47edaee6","0x92722c851482353b","0xa2bfe8a14cf10364","0xa81a664bbc423001","0xc24b8b70d0f89791","0xc76c51a30654be30","0xd192e819d6ef5218","0xd69906245565a910","0xf40e35855771202a","0x106aa07032bbd1b8","0x19a4c116b8d2d0c8","0x1e376c085141ab53","0x2748774cdf8eeb99","0x34b0bcb5e19b48a8","0x391c0cb3c5c95a63","0x4ed8aa4ae3418acb","0x5b9cca4f7763e373","0x682e6ff3d6b2b8a3","0x748f82ee5defb2fc","0x78a5636f43172f60","0x84c87814a1f0ab72","0x8cc702081a6439ec","0x90befffa23631e28","0xa4506cebde82bde9","0xbef9a3f7b2c67915","0xc67178f2e372532b","0xca273eceea26619c","0xd186b8c721c0c207","0xeada7dd6cde0eb1e","0xf57d4f7fee6ed178","0x06f067aa72176fba","0x0a637dc5a2c898a6","0x113f9804bef90dae","0x1b710b35131c471b","0x28db77f523047d84","0x32caab7b40c72493","0x3c9ebe0a15c9bebc","0x431d67c49c100d4c","0x4cc5d4becb3e42b6","0x597f299cfc657e2a","0x5fcb6fab3ad6faec","0x6c44198c4a475817"].map(t=>BigInt(t))),me=Dt[0],we=Dt[1],T=new Uint32Array(80),M=new Uint32Array(80),rt=class extends P{constructor(e=64){super(128,e,16,!1),this.Ah=m[0]|0,this.Al=m[1]|0,this.Bh=m[2]|0,this.Bl=m[3]|0,this.Ch=m[4]|0,this.Cl=m[5]|0,this.Dh=m[6]|0,this.Dl=m[7]|0,this.Eh=m[8]|0,this.El=m[9]|0,this.Fh=m[10]|0,this.Fl=m[11]|0,this.Gh=m[12]|0,this.Gl=m[13]|0,this.Hh=m[14]|0,this.Hl=m[15]|0}get(){let{Ah:e,Al:n,Bh:s,Bl:r,Ch:o,Cl:i,Dh:c,Dl:f,Eh:h,El:l,Fh:d,Fl:p,Gh:a,Gl:x,Hh:y,Hl:b}=this;return[e,n,s,r,o,i,c,f,h,l,d,p,a,x,y,b]}set(e,n,s,r,o,i,c,f,h,l,d,p,a,x,y,b){this.Ah=e|0,this.Al=n|0,this.Bh=s|0,this.Bl=r|0,this.Ch=o|0,this.Cl=i|0,this.Dh=c|0,this.Dl=f|0,this.Eh=h|0,this.El=l|0,this.Fh=d|0,this.Fl=p|0,this.Gh=a|0,this.Gl=x|0,this.Hh=y|0,this.Hl=b|0}process(e,n){for(let g=0;g<16;g++,n+=4)T[g]=e.getUint32(n),M[g]=e.getUint32(n+=4);for(let g=16;g<80;g++){let B=T[g-15]|0,H=M[g-15]|0,j=G(B,H,1)^G(B,H,8)^gt(B,H,7),N=V(B,H,1)^V(B,H,8)^bt(B,H,7),E=T[g-2]|0,R=M[g-2]|0,J=G(E,R,19)^W(E,R,61)^gt(E,R,6),lt=V(E,R,19)^X(E,R,61)^bt(E,R,6),Q=Gt(N,lt,M[g-7],M[g-16]),ut=Vt(Q,j,J,T[g-7],T[g-16]);T[g]=ut|0,M[g]=Q|0}let{Ah:s,Al:r,Bh:o,Bl:i,Ch:c,Cl:f,Dh:h,Dl:l,Eh:d,El:p,Fh:a,Fl:x,Gh:y,Gl:b,Hh:w,Hl:v}=this;for(let g=0;g<80;g++){let B=G(d,p,14)^G(d,p,18)^W(d,p,41),H=V(d,p,14)^V(d,p,18)^X(d,p,41),j=d&a^~d&y,N=p&x^~p&b,E=Ft(v,H,N,we[g],M[g]),R=Kt(E,w,B,j,me[g],T[g]),J=E|0,lt=G(s,r,28)^W(s,r,34)^W(s,r,39),Q=V(s,r,28)^X(s,r,34)^X(s,r,39),ut=s&o^s&c^o&c,de=r&i^r&f^i&f;w=y|0,v=b|0,y=a|0,b=x|0,a=d|0,x=p|0,{h:d,l:p}=k(h|0,l|0,R|0,J|0),h=c|0,l=f|0,c=o|0,f=i|0,o=s|0,i=r|0;let Lt=Mt(J,Q,de);s=It(Lt,R,lt,ut),r=Lt|0}({h:s,l:r}=k(this.Ah|0,this.Al|0,s|0,r|0)),{h:o,l:i}=k(this.Bh|0,this.Bl|0,o|0,i|0),{h:c,l:f}=k(this.Ch|0,this.Cl|0,c|0,f|0),{h,l}=k(this.Dh|0,this.Dl|0,h|0,l|0),{h:d,l:p}=k(this.Eh|0,this.El|0,d|0,p|0),{h:a,l:x}=k(this.Fh|0,this.Fl|0,a|0,x|0),{h:y,l:b}=k(this.Gh|0,this.Gl|0,y|0,b|0),{h:w,l:v}=k(this.Hh|0,this.Hl|0,w|0,v|0),this.set(s,r,o,i,c,f,h,l,d,p,a,x,y,b,w,v)}roundClean(){I(T,M)}destroy(){I(this.buffer),this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0)}};var zt=xt(()=>new st);var $t=xt(()=>new rt);var jt=$t;var ve={p:0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffedn,n:0x1000000000000000000000000000000014def9dea2f79cd65812631a5cf5d3edn,h:8n,a:0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffecn,d:0x52036cee2b6ffe738cc740797779e89800700a4d4141d8ab75eb4dca135978a3n,Gx:0x216936d3cd6e53fec0a4e231fdd6dc5c692cc7609525a7b2c9562d608f25d51an,Gy:0x6666666666666666666666666666666666666666666666666666666666666658n},{p:A,n:yt,Gx:Nt,Gy:Zt,a:mt,d:wt}=ve,Ae=8n,Qt=32,Be=64,S=(t="")=>{throw new Error(t)},Se=t=>typeof t=="bigint",te=t=>typeof t=="string",Oe=t=>t instanceof Uint8Array||ArrayBuffer.isView(t)&&t.constructor.name==="Uint8Array",z=(t,e)=>!Oe(t)||typeof e=="number"&&e>0&&t.length!==e?S("Uint8Array expected"):t,at=t=>new Uint8Array(t),Bt=t=>Uint8Array.from(t),ee=(t,e)=>t.toString(16).padStart(e,"0"),St=t=>Array.from(z(t)).map(e=>ee(e,2)).join(""),C={_0:48,_9:57,A:65,F:70,a:97,f:102},Pt=t=>{if(t>=C._0&&t<=C._9)return t-C._0;if(t>=C.A&&t<=C.F)return t-(C.A-10);if(t>=C.a&&t<=C.f)return t-(C.a-10)},Ot=t=>{let e="hex invalid";if(!te(t))return S(e);let n=t.length,s=n/2;if(n%2)return S(e);let r=at(s);for(let o=0,i=0;o<s;o++,i+=2){let c=Pt(t.charCodeAt(i)),f=Pt(t.charCodeAt(i+1));if(c===void 0||f===void 0)return S(e);r[o]=c*16+f}return r},He=(t,e)=>z(te(t)?Ot(t):Bt(z(t)),e),ne=()=>globalThis?.crypto,ke=()=>ne()?.subtle??S("crypto.subtle must be defined"),Wt=(...t)=>{let e=at(t.reduce((s,r)=>s+z(r).length,0)),n=0;return t.forEach(s=>{e.set(s,n),n+=s.length}),e},Le=(t=Qt)=>ne().getRandomValues(at(t)),ot=BigInt,F=(t,e,n,s="bad number: out of range")=>Se(t)&&e<=t&&t<n?t:S(s),u=(t,e=A)=>{let n=t%e;return n>=0n?n:e+n};var se=(t,e)=>{(t===0n||e<=0n)&&S("no inverse n="+t+" mod="+e);let n=u(t,e),s=e,r=0n,o=1n,i=1n,c=0n;for(;n!==0n;){let f=s/n,h=s%n,l=r-i*f,d=o-c*f;s=n,n=h,r=i,o=c,i=l,c=d}return s===1n?u(r,e):S("no inverse")};var Xt=t=>t instanceof K?t:S("Point expected"),vt=2n**256n,K=class t{static BASE;static ZERO;ex;ey;ez;et;constructor(e,n,s,r){let o=vt;this.ex=F(e,0n,o),this.ey=F(n,0n,o),this.ez=F(s,1n,o),this.et=F(r,0n,o),Object.freeze(this)}static fromAffine(e){return new t(e.x,e.y,1n,u(e.x*e.y))}static fromBytes(e,n=!1){let s=wt,r=Bt(z(e,Qt)),o=e[31];r[31]=o&-129;let i=Re(r);F(i,0n,n?vt:A);let f=u(i*i),h=u(f-1n),l=u(s*f+1n),{isValid:d,value:p}=Ce(h,l);d||S("bad point: y not sqrt");let a=(p&1n)===1n,x=(o&128)!==0;return!n&&p===0n&&x&&S("bad point: x==0, isLastByteOdd"),x!==a&&(p=u(-p)),new t(p,i,1n,u(p*i))}assertValidity(){let e=mt,n=wt,s=this;if(s.is0())throw new Error("bad point: ZERO");let{ex:r,ey:o,ez:i,et:c}=s,f=u(r*r),h=u(o*o),l=u(i*i),d=u(l*l),p=u(f*e),a=u(l*u(p+h)),x=u(d+u(n*u(f*h)));if(a!==x)throw new Error("bad point: equation left != right (1)");let y=u(r*o),b=u(i*c);if(y!==b)throw new Error("bad point: equation left != right (2)");return this}equals(e){let{ex:n,ey:s,ez:r}=this,{ex:o,ey:i,ez:c}=Xt(e),f=u(n*c),h=u(o*r),l=u(s*c),d=u(i*r);return f===h&&l===d}is0(){return this.equals(D)}negate(){return new t(u(-this.ex),this.ey,this.ez,u(-this.et))}double(){let{ex:e,ey:n,ez:s}=this,r=mt,o=u(e*e),i=u(n*n),c=u(2n*u(s*s)),f=u(r*o),h=e+n,l=u(u(h*h)-o-i),d=f+i,p=d-c,a=f-i,x=u(l*p),y=u(d*a),b=u(l*a),w=u(p*d);return new t(x,y,w,b)}add(e){let{ex:n,ey:s,ez:r,et:o}=this,{ex:i,ey:c,ez:f,et:h}=Xt(e),l=mt,d=wt,p=u(n*i),a=u(s*c),x=u(o*d*h),y=u(r*f),b=u((n+s)*(i+c)-p-a),w=u(y-x),v=u(y+x),g=u(a-l*p),B=u(b*w),H=u(v*g),j=u(b*g),N=u(w*v);return new t(B,H,N,j)}multiply(e,n=!0){if(!n&&(e===0n||this.is0()))return D;if(F(e,1n,yt),e===1n)return this;if(this.equals(Y))return Me(e).p;let s=D,r=Y;for(let o=this;e>0n;o=o.double(),e>>=1n)e&1n?s=s.add(o):n&&(r=r.add(o));return s}toAffine(){let{ex:e,ey:n,ez:s}=this;if(this.equals(D))return{x:0n,y:1n};let r=se(s,A);return u(s*r)!==1n&&S("invalid inverse"),{x:u(e*r),y:u(n*r)}}toBytes(){let{x:e,y:n}=this.assertValidity().toAffine(),s=Ee(n);return s[31]|=e&1n?128:0,s}toHex(){return St(this.toBytes())}clearCofactor(){return this.multiply(ot(Ae),!1)}isSmallOrder(){return this.clearCofactor().is0()}isTorsionFree(){let e=this.multiply(yt/2n,!1).double();return yt%2n&&(e=e.add(this)),e.is0()}static fromHex(e,n){return t.fromBytes(He(e),n)}get x(){return this.toAffine().x}get y(){return this.toAffine().y}toRawBytes(){return this.toBytes()}},Y=new K(Nt,Zt,1n,u(Nt*Zt)),D=new K(0n,1n,1n,0n);K.BASE=Y;K.ZERO=D;var Ee=t=>Ot(ee(F(t,0n,vt),Be)).reverse(),Re=t=>ot("0x"+St(Bt(z(t)).reverse())),L=(t,e)=>{let n=t;for(;e-- >0n;)n*=n,n%=A;return n},_e=t=>{let n=t*t%A*t%A,s=L(n,2n)*n%A,r=L(s,1n)*t%A,o=L(r,5n)*r%A,i=L(o,10n)*o%A,c=L(i,20n)*i%A,f=L(c,40n)*c%A,h=L(f,80n)*f%A,l=L(h,80n)*f%A,d=L(l,10n)*o%A;return{pow_p_5_8:L(d,2n)*t%A,b2:n}},Yt=0x2b8324804fc1df0b2b4d00993dfbd7a72f431806ad2fe478c4ee1b274a0ea0b0n,Ce=(t,e)=>{let n=u(e*e*e),s=u(n*n*e),r=_e(t*s).pow_p_5_8,o=u(t*n*r),i=u(e*o*o),c=o,f=u(o*Yt),h=i===t,l=i===u(-t),d=i===u(-t*Yt);return h&&(o=c),(l||d)&&(o=f),(u(o)&1n)===1n&&(o=u(-o)),{isValid:h||l,value:o}};var re={sha512Async:async(...t)=>{let e=ke(),n=Wt(...t);return at(await e.digest("SHA-512",n.buffer))},sha512Sync:void 0,bytesToHex:St,hexToBytes:Ot,concatBytes:Wt,mod:u,invert:se,randomBytes:Le};var it=8,Ue=256,oe=Math.ceil(Ue/it)+1,At=2**(it-1),Te=()=>{let t=[],e=Y,n=e;for(let s=0;s<oe;s++){n=e,t.push(n);for(let r=1;r<At;r++)n=n.add(e),t.push(n);e=n.double()}return t},qt,Jt=(t,e)=>{let n=e.negate();return t?n:e},Me=t=>{let e=qt||(qt=Te()),n=D,s=Y,r=2**it,o=r,i=ot(r-1),c=ot(it);for(let f=0;f<oe;f++){let h=Number(t&i);t>>=c,h>At&&(h-=o,t+=1n);let l=f*At,d=l,p=l+Math.abs(h)-1,a=f%2!==0,x=h<0;h===0?s=s.add(Jt(a,e[d])):n=n.add(Jt(x,e[p]))}return{p:n,f:s}};var ie=zt;re.sha512Sync=(...t)=>{let e=jt.create();for(let n of t)e.update(n);return e.digest()};function q(t){let e=new TextEncoder().encode(t);return Rt(ie(e))}function ae(t){let e=new Map;for(let n of t)e.set(n.id,n);return e}function ct(t,e){let n=new Map(t);for(let[s,r]of e)n.has(s)||n.set(s,r);return n}function Ht(t){return ae(t)}function Ge(t){let e=[...t.values()],n=new Set,s=[];function r(o){if(!n.has(o.id)){n.add(o.id);for(let i of o.seen){let c=t.get(i);c&&r(c)}s.push(o)}}e.sort((o,i)=>o.id.localeCompare(i.id));for(let o of e)r(o);return s}function ft(t){let e=Ge(t),n=new Map,s=new Map,r=new Map,o=new Set,i=new Map,c=null,f="webring",h=2,l=new Set;for(let p of e)switch(p.type){case"genesis":{let a=p;c=a,f=a.payload.name,h=a.payload.inviteBudget,n.set(a.author,{url:a.author,name:a.author,invitedBy:null,pubkey:null,isActive:!1,depth:0}),s.set(a.author,[]),i.set(a.author,0);break}case"add":{let a=p;if(!n.has(a.author)||l.has(a.author)||n.has(a.payload.target))break;let x=i.get(a.author)??0;if(x>=h)break;l.delete(a.payload.target);let y=n.get(a.author);n.set(a.payload.target,{url:a.payload.target,name:a.payload.name,invitedBy:a.author,pubkey:null,isActive:!1,depth:y.depth+1}),r.set(a.payload.target,a.author);let b=s.get(a.author)??[];b.push(a.payload.target),s.set(a.author,b),s.has(a.payload.target)||s.set(a.payload.target,[]),i.set(a.author,x+1);break}case"key-claim":{let a=p,x=n.get(a.author);if(!x||l.has(a.author))break;x.pubkey=a.payload.pubkey,x.isActive=!0,o.add(a.author);break}case"revoke":{let a=p;if(l.has(a.author)||r.get(a.payload.target)!==a.author)break;let x=[a.payload.target];for(;x.length>0;){let b=x.pop();if(l.has(b))continue;l.add(b),n.delete(b),o.delete(b);let w=r.get(b);if(w){let g=s.get(w)??[];s.set(w,g.filter(B=>B!==b))}r.delete(b);let v=s.get(b)??[];x.push(...v)}let y=i.get(a.author)??0;i.set(a.author,Math.max(0,y-1));break}case"leave":{let a=p;if(!n.has(a.author)||l.has(a.author))break;let x=r.get(a.author),y=s.get(a.author)??[];if(x){let b=s.get(x)??[];for(let v of y){r.set(v,x);let g=n.get(v);if(g){g.invitedBy=x;let B=n.get(x);B&&(g.depth=B.depth+1)}b.push(v)}s.set(x,b.filter(v=>v!==a.author));let w=i.get(x)??0;i.set(x,Math.max(0,w-1))}n.delete(a.author),o.delete(a.author),s.delete(a.author);break}}let d=new Map;for(let[p]of n){let a=i.get(p)??0;d.set(p,h-a)}return{name:f,inviteBudget:h,members:ce([...n.values()]),inviteTree:s,activeMembers:[...o],inviteSlots:d,genesis:c}}function ce(t){return[...t].sort((e,n)=>{let s=q(e.url),r=q(n.url);return s.localeCompare(r)})}function kt(t,e){if(t.length===0)return{prev:null,next:null};let n=t.findIndex(o=>o.url===e);if(n===-1)return{prev:t[t.length-1],next:t[0]};let s=t[(n-1+t.length)%t.length],r=t[(n+1)%t.length];return{prev:s,next:r}}var dt=`
  :host {
    display: block;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    --ring-bg: rgba(255, 255, 255, 0.92);
    --ring-border: rgba(0, 0, 0, 0.08);
    --ring-text: #333;
    --ring-accent: #8b5cf6;
    --ring-hover: rgba(139, 92, 246, 0.08);
    --ring-shadow: 0 1px 3px rgba(0, 0, 0, 0.08), 0 4px 12px rgba(0, 0, 0, 0.04);
    --ring-radius: 10px;
  }

  @media (prefers-color-scheme: dark) {
    :host {
      --ring-bg: rgba(28, 28, 32, 0.92);
      --ring-border: rgba(255, 255, 255, 0.08);
      --ring-text: #e4e4e7;
      --ring-accent: #a78bfa;
      --ring-hover: rgba(167, 139, 250, 0.1);
      --ring-shadow: 0 1px 3px rgba(0, 0, 0, 0.2), 0 4px 12px rgba(0, 0, 0, 0.15);
    }
  }

  .widget {
    background: var(--ring-bg);
    border: 1px solid var(--ring-border);
    border-radius: var(--ring-radius);
    box-shadow: var(--ring-shadow);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    color: var(--ring-text);
    max-width: 420px;
    margin: 0 auto;
    overflow: hidden;
  }

  .bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 4px;
    height: 42px;
  }

  .nav-link {
    text-decoration: none;
    color: var(--ring-text);
    padding: 6px 12px;
    border-radius: 6px;
    transition: background-color 0.2s ease, color 0.2s ease;
    font-size: 0.85em;
    letter-spacing: 0.02em;
    opacity: 0.8;
  }

  .nav-link:hover {
    background: var(--ring-hover);
    color: var(--ring-accent);
    opacity: 1;
  }

  .center {
    font-weight: 600;
    font-size: 0.88em;
    cursor: pointer;
    padding: 4px 10px;
    border-radius: 6px;
    transition: background-color 0.2s ease;
    display: flex;
    align-items: center;
    gap: 6px;
    user-select: none;
    letter-spacing: 0.01em;
  }

  .center:hover {
    background: var(--ring-hover);
  }

  .accent {
    color: var(--ring-accent);
    font-size: 0.75em;
  }

  .member-list {
    max-height: 0;
    overflow-y: auto;
    transition: max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    border-top: 1px solid transparent;
  }

  .member-list.expanded {
    max-height: 220px;
    border-top-color: var(--ring-border);
  }

  .member-item {
    display: block;
    padding: 9px 16px;
    text-decoration: none;
    color: var(--ring-text);
    font-size: 0.85em;
    border-bottom: 1px solid var(--ring-border);
    transition: background-color 0.15s ease;
  }

  .member-item:last-child {
    border-bottom: none;
  }

  .member-item:hover {
    background: var(--ring-hover);
  }

  .member-item.current {
    border-left: 3px solid var(--ring-accent);
    padding-left: 13px;
    font-weight: 500;
    color: var(--ring-accent);
  }

  .member-name {
    opacity: 0.5;
    font-size: 0.9em;
    margin-left: 6px;
  }

  .status-msg {
    text-align: center;
    padding: 12px;
    font-size: 0.85em;
    opacity: 0.6;
  }

  .loading-dot {
    display: inline-block;
    animation: pulse 1.4s ease-in-out infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 0.3; }
    50% { opacity: 1; }
  }
`;function $(t,e,n,s="loaded"){t.shadowRoot||t.attachShadow({mode:"open"});let r=t.shadowRoot;if(s==="loading"){r.innerHTML=`<style>${dt}</style>
      <div class="widget"><div class="status-msg"><span class="loading-dot">\xB7</span> loading ring <span class="loading-dot">\xB7</span></div></div>`;return}if(s==="error"){r.innerHTML=`<style>${dt}</style>
      <div class="widget"><div class="status-msg">ring unavailable</div></div>`;return}if(s==="empty"||!e||e.members.length===0){r.innerHTML=`<style>${dt}</style>
      <div class="widget"><div class="status-msg">ring is empty</div></div>`;return}let{prev:o,next:i}=kt(e.members,n),c=e.members.map(l=>`<a class="member-item${l.url===n?" current":""}" href="${l.url}">${l.url}<span class="member-name">${l.name}</span></a>`).join("");r.innerHTML=`
    <style>${dt}</style>
    <div class="widget">
      <div class="bar">
        <a class="nav-link" href="${o?.url||"#"}" title="${o?.name||"previous"}">\u2190 prev</a>
        <div class="center" id="ring-title">
          <span class="accent">\u2726</span> ${e.name} <span class="accent">\u2726</span>
        </div>
        <a class="nav-link" href="${i?.url||"#"}" title="${i?.name||"next"}">next \u2192</a>
      </div>
      <div class="member-list" id="member-list">
        ${c}
      </div>
    </div>
  `;let f=r.getElementById("ring-title"),h=r.getElementById("member-list");f&&h&&f.addEventListener("click",()=>{h.classList.toggle("expanded")})}async function fe(t){try{let e=new AbortController,n=setTimeout(()=>e.abort(),3e3),s=t.endsWith("/webring.json")?t:`${t.replace(/\/$/,"")}/webring.json`,r=await fetch(s,{signal:e.signal});if(clearTimeout(n),!r.ok)return null;let o=await r.json();return Array.isArray(o)?Ht(o):null}catch{return null}}async function Ve(){let t=document.currentScript||document.querySelector("script[data-ring]");if(!t)return;let e=t.getAttribute("data-ring");if(!e)return;let n=window.location.origin,s=document.createElement("div");t.parentNode?.insertBefore(s,t.nextSibling),$(s,null,n,"loading");let r=e.split(",").map(l=>l.trim()).filter(Boolean);if(r.length===0){$(s,null,n,"error");return}let o=new Set,c=(await Promise.all(r.map(l=>(o.add(l),fe(l))))).filter(l=>l!==null);if(c.length===0){$(s,null,n,"error");return}let f=c[0];for(let l=1;l<c.length;l++)f=ct(f,c[l]);for(;;){let d=ft(f).members.filter(a=>!o.has(a.url));if(d.length===0)break;let p=await Promise.all(d.map(a=>(o.add(a.url),fe(a.url))));for(let a of p)a&&(f=ct(f,a))}let h=ft(f);h.members.length===0?$(s,h,n,"empty"):$(s,h,n,"loaded")}Ve();})();
/*! Bundled license information:

@noble/hashes/esm/utils.js:
  (*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

@noble/ed25519/index.js:
  (*! noble-ed25519 - MIT License (c) 2019 Paul Miller (paulmillr.com) *)
*/
