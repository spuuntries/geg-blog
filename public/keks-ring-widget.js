"use strict";var DaRing=(()=>{function Ce(t){return t instanceof Uint8Array||ArrayBuffer.isView(t)&&t.constructor.name==="Uint8Array"}function Y(t,...e){if(!Ce(t))throw new Error("Uint8Array expected");if(e.length>0&&!e.includes(t.length))throw new Error("Uint8Array expected of length "+e+", got length="+t.length)}function kt(t,e=!0){if(t.destroyed)throw new Error("Hash instance has been destroyed");if(e&&t.finished)throw new Error("Hash#digest() has already been called")}function Zt(t,e){Y(t);let n=e.outputLen;if(t.length<n)throw new Error("digestInto() expects output buffer of length at least "+n)}function F(...t){for(let e=0;e<t.length;e++)t[e].fill(0)}function at(t){return new DataView(t.buffer,t.byteOffset,t.byteLength)}function B(t,e){return t<<32-e|t>>>e}var Xt=typeof Uint8Array.from([]).toHex=="function"&&typeof Uint8Array.fromHex=="function",Ee=Array.from({length:256},(t,e)=>e.toString(16).padStart(2,"0"));function Yt(t){if(Y(t),Xt)return t.toHex();let e="";for(let n=0;n<t.length;n++)e+=Ee[t[n]];return e}var E={_0:48,_9:57,A:65,F:70,a:97,f:102};function Wt(t){if(t>=E._0&&t<=E._9)return t-E._0;if(t>=E.A&&t<=E.F)return t-(E.A-10);if(t>=E.a&&t<=E.f)return t-(E.a-10)}function Ot(t){if(typeof t!="string")throw new Error("hex string expected, got "+typeof t);if(Xt)return Uint8Array.fromHex(t);let e=t.length,n=e/2;if(e%2)throw new Error("hex string expected, got unpadded hex of length "+e);let r=new Uint8Array(n);for(let s=0,o=0;s<n;s++,o+=2){let i=Wt(t.charCodeAt(o)),f=Wt(t.charCodeAt(o+1));if(i===void 0||f===void 0){let c=t[o]+t[o+1];throw new Error('hex string expected, got non-hex character "'+c+'" at index '+o)}r[s]=i*16+f}return r}function _e(t){if(typeof t!="string")throw new Error("string expected");return new Uint8Array(new TextEncoder().encode(t))}function St(t){return typeof t=="string"&&(t=_e(t)),Y(t),t}var it=class{};function Bt(t){let e=r=>t().update(St(r)).digest(),n=t();return e.outputLen=n.outputLen,e.blockLen=n.blockLen,e.create=()=>t(),e}function Ue(t,e,n,r){if(typeof t.setBigUint64=="function")return t.setBigUint64(e,n,r);let s=BigInt(32),o=BigInt(4294967295),i=Number(n>>s&o),f=Number(n&o),c=r?4:0,l=r?0:4;t.setUint32(e+c,i,r),t.setUint32(e+l,f,r)}function qt(t,e,n){return t&e^~t&n}function Jt(t,e,n){return t&e^t&n^e&n}var q=class extends it{constructor(e,n,r,s){super(),this.finished=!1,this.length=0,this.pos=0,this.destroyed=!1,this.blockLen=e,this.outputLen=n,this.padOffset=r,this.isLE=s,this.buffer=new Uint8Array(e),this.view=at(this.buffer)}update(e){kt(this),e=St(e),Y(e);let{view:n,buffer:r,blockLen:s}=this,o=e.length;for(let i=0;i<o;){let f=Math.min(s-this.pos,o-i);if(f===s){let c=at(e);for(;s<=o-i;i+=s)this.process(c,i);continue}r.set(e.subarray(i,i+f),this.pos),this.pos+=f,i+=f,this.pos===s&&(this.process(n,0),this.pos=0)}return this.length+=e.length,this.roundClean(),this}digestInto(e){kt(this),Zt(e,this),this.finished=!0;let{buffer:n,view:r,blockLen:s,isLE:o}=this,{pos:i}=this;n[i++]=128,F(this.buffer.subarray(i)),this.padOffset>s-i&&(this.process(r,0),i=0);for(let d=i;d<s;d++)n[d]=0;Ue(r,s-8,BigInt(this.length*8),o),this.process(r,0);let f=at(e),c=this.outputLen;if(c%4)throw new Error("_sha2: outputLen should be aligned to 32bit");let l=c/4,h=this.get();if(l>h.length)throw new Error("_sha2: outputLen bigger than state");for(let d=0;d<l;d++)f.setUint32(4*d,h[d],o)}digest(){let{buffer:e,outputLen:n}=this;this.digestInto(e);let r=e.slice(0,n);return this.destroy(),r}_cloneInto(e){e||(e=new this.constructor),e.set(...this.get());let{blockLen:n,buffer:r,length:s,finished:o,destroyed:i,pos:f}=this;return e.destroyed=i,e.finished=o,e.length=s,e.pos=f,s%n&&e.buffer.set(r),e}clone(){return this._cloneInto()}},_=Uint32Array.from([1779033703,3144134277,1013904242,2773480762,1359893119,2600822924,528734635,1541459225]);var A=Uint32Array.from([1779033703,4089235720,3144134277,2227873595,1013904242,4271175723,2773480762,1595750129,1359893119,2917565137,2600822924,725511199,528734635,4215389547,1541459225,327033209]);var ct=BigInt(4294967295),Qt=BigInt(32);function Ve(t,e=!1){return e?{h:Number(t&ct),l:Number(t>>Qt&ct)}:{h:Number(t>>Qt&ct)|0,l:Number(t&ct)|0}}function te(t,e=!1){let n=t.length,r=new Uint32Array(n),s=new Uint32Array(n);for(let o=0;o<n;o++){let{h:i,l:f}=Ve(t[o],e);[r[o],s[o]]=[i,f]}return[r,s]}var Ht=(t,e,n)=>t>>>n,Lt=(t,e,n)=>t<<32-n|e>>>n,K=(t,e,n)=>t>>>n|e<<32-n,z=(t,e,n)=>t<<32-n|e>>>n,J=(t,e,n)=>t<<64-n|e>>>n-32,Q=(t,e,n)=>t>>>n-32|e<<64-n;function H(t,e,n,r){let s=(e>>>0)+(r>>>0);return{h:t+n+(s/2**32|0)|0,l:s|0}}var ee=(t,e,n)=>(t>>>0)+(e>>>0)+(n>>>0),ne=(t,e,n,r)=>e+n+r+(t/2**32|0)|0,re=(t,e,n,r)=>(t>>>0)+(e>>>0)+(n>>>0)+(r>>>0),se=(t,e,n,r,s)=>e+n+r+s+(t/2**32|0)|0,oe=(t,e,n,r,s)=>(t>>>0)+(e>>>0)+(n>>>0)+(r>>>0)+(s>>>0),ie=(t,e,n,r,s,o)=>e+n+r+s+o+(t/2**32|0)|0;var Te=Uint32Array.from([1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298]),M=new Uint32Array(64),ft=class extends q{constructor(e=32){super(64,e,8,!1),this.A=_[0]|0,this.B=_[1]|0,this.C=_[2]|0,this.D=_[3]|0,this.E=_[4]|0,this.F=_[5]|0,this.G=_[6]|0,this.H=_[7]|0}get(){let{A:e,B:n,C:r,D:s,E:o,F:i,G:f,H:c}=this;return[e,n,r,s,o,i,f,c]}set(e,n,r,s,o,i,f,c){this.A=e|0,this.B=n|0,this.C=r|0,this.D=s|0,this.E=o|0,this.F=i|0,this.G=f|0,this.H=c|0}process(e,n){for(let d=0;d<16;d++,n+=4)M[d]=e.getUint32(n,!1);for(let d=16;d<64;d++){let p=M[d-15],a=M[d-2],x=B(p,7)^B(p,18)^p>>>3,y=B(a,17)^B(a,19)^a>>>10;M[d]=y+M[d-7]+x+M[d-16]|0}let{A:r,B:s,C:o,D:i,E:f,F:c,G:l,H:h}=this;for(let d=0;d<64;d++){let p=B(f,6)^B(f,11)^B(f,25),a=h+p+qt(f,c,l)+Te[d]+M[d]|0,y=(B(r,2)^B(r,13)^B(r,22))+Jt(r,s,o)|0;h=l,l=c,c=f,f=i+a|0,i=o,o=s,s=r,r=a+y|0}r=r+this.A|0,s=s+this.B|0,o=o+this.C|0,i=i+this.D|0,f=f+this.E|0,c=c+this.F|0,l=l+this.G|0,h=h+this.H|0,this.set(r,s,o,i,f,c,l,h)}roundClean(){F(M)}destroy(){this.set(0,0,0,0,0,0,0,0),F(this.buffer)}};var ae=te(["0x428a2f98d728ae22","0x7137449123ef65cd","0xb5c0fbcfec4d3b2f","0xe9b5dba58189dbbc","0x3956c25bf348b538","0x59f111f1b605d019","0x923f82a4af194f9b","0xab1c5ed5da6d8118","0xd807aa98a3030242","0x12835b0145706fbe","0x243185be4ee4b28c","0x550c7dc3d5ffb4e2","0x72be5d74f27b896f","0x80deb1fe3b1696b1","0x9bdc06a725c71235","0xc19bf174cf692694","0xe49b69c19ef14ad2","0xefbe4786384f25e3","0x0fc19dc68b8cd5b5","0x240ca1cc77ac9c65","0x2de92c6f592b0275","0x4a7484aa6ea6e483","0x5cb0a9dcbd41fbd4","0x76f988da831153b5","0x983e5152ee66dfab","0xa831c66d2db43210","0xb00327c898fb213f","0xbf597fc7beef0ee4","0xc6e00bf33da88fc2","0xd5a79147930aa725","0x06ca6351e003826f","0x142929670a0e6e70","0x27b70a8546d22ffc","0x2e1b21385c26c926","0x4d2c6dfc5ac42aed","0x53380d139d95b3df","0x650a73548baf63de","0x766a0abb3c77b2a8","0x81c2c92e47edaee6","0x92722c851482353b","0xa2bfe8a14cf10364","0xa81a664bbc423001","0xc24b8b70d0f89791","0xc76c51a30654be30","0xd192e819d6ef5218","0xd69906245565a910","0xf40e35855771202a","0x106aa07032bbd1b8","0x19a4c116b8d2d0c8","0x1e376c085141ab53","0x2748774cdf8eeb99","0x34b0bcb5e19b48a8","0x391c0cb3c5c95a63","0x4ed8aa4ae3418acb","0x5b9cca4f7763e373","0x682e6ff3d6b2b8a3","0x748f82ee5defb2fc","0x78a5636f43172f60","0x84c87814a1f0ab72","0x8cc702081a6439ec","0x90befffa23631e28","0xa4506cebde82bde9","0xbef9a3f7b2c67915","0xc67178f2e372532b","0xca273eceea26619c","0xd186b8c721c0c207","0xeada7dd6cde0eb1e","0xf57d4f7fee6ed178","0x06f067aa72176fba","0x0a637dc5a2c898a6","0x113f9804bef90dae","0x1b710b35131c471b","0x28db77f523047d84","0x32caab7b40c72493","0x3c9ebe0a15c9bebc","0x431d67c49c100d4c","0x4cc5d4becb3e42b6","0x597f299cfc657e2a","0x5fcb6fab3ad6faec","0x6c44198c4a475817"].map(t=>BigInt(t))),Ie=ae[0],Ge=ae[1],T=new Uint32Array(80),I=new Uint32Array(80),lt=class extends q{constructor(e=64){super(128,e,16,!1),this.Ah=A[0]|0,this.Al=A[1]|0,this.Bh=A[2]|0,this.Bl=A[3]|0,this.Ch=A[4]|0,this.Cl=A[5]|0,this.Dh=A[6]|0,this.Dl=A[7]|0,this.Eh=A[8]|0,this.El=A[9]|0,this.Fh=A[10]|0,this.Fl=A[11]|0,this.Gh=A[12]|0,this.Gl=A[13]|0,this.Hh=A[14]|0,this.Hl=A[15]|0}get(){let{Ah:e,Al:n,Bh:r,Bl:s,Ch:o,Cl:i,Dh:f,Dl:c,Eh:l,El:h,Fh:d,Fl:p,Gh:a,Gl:x,Hh:y,Hl:g}=this;return[e,n,r,s,o,i,f,c,l,h,d,p,a,x,y,g]}set(e,n,r,s,o,i,f,c,l,h,d,p,a,x,y,g){this.Ah=e|0,this.Al=n|0,this.Bh=r|0,this.Bl=s|0,this.Ch=o|0,this.Cl=i|0,this.Dh=f|0,this.Dl=c|0,this.Eh=l|0,this.El=h|0,this.Fh=d|0,this.Fl=p|0,this.Gh=a|0,this.Gl=x|0,this.Hh=y|0,this.Hl=g|0}process(e,n){for(let b=0;b<16;b++,n+=4)T[b]=e.getUint32(n),I[b]=e.getUint32(n+=4);for(let b=16;b<80;b++){let v=T[b-15]|0,O=I[b-15]|0,Z=K(v,O,1)^K(v,O,8)^Ht(v,O,7),X=z(v,O,1)^z(v,O,8)^Lt(v,O,7),R=T[b-2]|0,C=I[b-2]|0,st=K(R,C,19)^J(R,C,61)^Ht(R,C,6),vt=z(R,C,19)^Q(R,C,61)^Lt(R,C,6),ot=re(X,vt,I[b-7],I[b-16]),At=se(ot,Z,st,T[b-7],T[b-16]);T[b]=At|0,I[b]=ot|0}let{Ah:r,Al:s,Bh:o,Bl:i,Ch:f,Cl:c,Dh:l,Dl:h,Eh:d,El:p,Fh:a,Fl:x,Gh:y,Gl:g,Hh:m,Hl:w}=this;for(let b=0;b<80;b++){let v=K(d,p,14)^K(d,p,18)^J(d,p,41),O=z(d,p,14)^z(d,p,18)^Q(d,p,41),Z=d&a^~d&y,X=p&x^~p&g,R=oe(w,O,X,Ge[b],I[b]),C=ie(R,m,v,Z,Ie[b],T[b]),st=R|0,vt=K(r,s,28)^J(r,s,34)^J(r,s,39),ot=z(r,s,28)^Q(r,s,34)^Q(r,s,39),At=r&o^r&f^o&f,Re=s&i^s&c^i&c;m=y|0,w=g|0,y=a|0,g=x|0,a=d|0,x=p|0,{h:d,l:p}=H(l|0,h|0,C|0,st|0),l=f|0,h=c|0,f=o|0,c=i|0,o=r|0,i=s|0;let Pt=ee(st,ot,Re);r=ne(Pt,C,vt,At),s=Pt|0}({h:r,l:s}=H(this.Ah|0,this.Al|0,r|0,s|0)),{h:o,l:i}=H(this.Bh|0,this.Bl|0,o|0,i|0),{h:f,l:c}=H(this.Ch|0,this.Cl|0,f|0,c|0),{h:l,l:h}=H(this.Dh|0,this.Dl|0,l|0,h|0),{h:d,l:p}=H(this.Eh|0,this.El|0,d|0,p|0),{h:a,l:x}=H(this.Fh|0,this.Fl|0,a|0,x|0),{h:y,l:g}=H(this.Gh|0,this.Gl|0,y|0,g|0),{h:m,l:w}=H(this.Hh|0,this.Hl|0,m|0,w|0),this.set(r,s,o,i,f,c,l,h,d,p,a,x,y,g,m,w)}roundClean(){F(T,I)}destroy(){F(this.buffer),this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0)}};var ce=Bt(()=>new ft);var fe=Bt(()=>new lt);var le=fe;var Fe={p:0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffedn,n:0x1000000000000000000000000000000014def9dea2f79cd65812631a5cf5d3edn,h:8n,a:0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffecn,d:0x52036cee2b6ffe738cc740797779e89800700a4d4141d8ab75eb4dca135978a3n,Gx:0x216936d3cd6e53fec0a4e231fdd6dc5c692cc7609525a7b2c9562d608f25d51an,Gy:0x6666666666666666666666666666666666666666666666666666666666666658n},{p:k,n:dt,Gx:de,Gy:pe,a:Rt,d:Ct}=Fe,Ke=8n,tt=32,Et=64,S=(t="")=>{throw new Error(t)},ze=t=>typeof t=="bigint",ye=t=>typeof t=="string",$e=t=>t instanceof Uint8Array||ArrayBuffer.isView(t)&&t.constructor.name==="Uint8Array",j=(t,e)=>!$e(t)||typeof e=="number"&&e>0&&t.length!==e?S("Uint8Array expected"):t,xt=t=>new Uint8Array(t),Mt=t=>Uint8Array.from(t),me=(t,e)=>t.toString(16).padStart(e,"0"),Tt=t=>Array.from(j(t)).map(e=>me(e,2)).join(""),U={_0:48,_9:57,A:65,F:70,a:97,f:102},he=t=>{if(t>=U._0&&t<=U._9)return t-U._0;if(t>=U.A&&t<=U.F)return t-(U.A-10);if(t>=U.a&&t<=U.f)return t-(U.a-10)},It=t=>{let e="hex invalid";if(!ye(t))return S(e);let n=t.length,r=n/2;if(n%2)return S(e);let s=xt(r);for(let o=0,i=0;o<r;o++,i+=2){let f=he(t.charCodeAt(i)),c=he(t.charCodeAt(i+1));if(f===void 0||c===void 0)return S(e);s[o]=f*16+c}return s},pt=(t,e)=>j(ye(t)?It(t):Mt(j(t)),e),we=()=>globalThis?.crypto,De=()=>we()?.subtle??S("crypto.subtle must be defined"),_t=(...t)=>{let e=xt(t.reduce((r,s)=>r+j(s).length,0)),n=0;return t.forEach(r=>{e.set(r,n),n+=r.length}),e},Ne=(t=tt)=>we().getRandomValues(xt(t)),ht=BigInt,$=(t,e,n,r="bad number: out of range")=>ze(t)&&e<=t&&t<n?t:S(r),u=(t,e=k)=>{let n=t%e;return n>=0n?n:e+n},je=t=>u(t,dt),ve=(t,e)=>{(t===0n||e<=0n)&&S("no inverse n="+t+" mod="+e);let n=u(t,e),r=e,s=0n,o=1n,i=1n,f=0n;for(;n!==0n;){let c=r/n,l=r%n,h=s-i*c,d=o-f*c;r=n,n=l,s=i,o=f,i=h,f=d}return r===1n?u(s,e):S("no inverse")},Pe=t=>{let e=Ft[t];return typeof e!="function"&&S("hashes."+t+" not set"),e},ue=t=>t instanceof V?t:S("Point expected"),Ut=2n**256n,V=class t{static BASE;static ZERO;ex;ey;ez;et;constructor(e,n,r,s){let o=Ut;this.ex=$(e,0n,o),this.ey=$(n,0n,o),this.ez=$(r,1n,o),this.et=$(s,0n,o),Object.freeze(this)}static fromAffine(e){return new t(e.x,e.y,1n,u(e.x*e.y))}static fromBytes(e,n=!1){let r=Ct,s=Mt(j(e,tt)),o=e[31];s[31]=o&-129;let i=Gt(s);$(i,0n,n?Ut:k);let c=u(i*i),l=u(c-1n),h=u(r*c+1n),{isValid:d,value:p}=Xe(l,h);d||S("bad point: y not sqrt");let a=(p&1n)===1n,x=(o&128)!==0;return!n&&p===0n&&x&&S("bad point: x==0, isLastByteOdd"),x!==a&&(p=u(-p)),new t(p,i,1n,u(p*i))}assertValidity(){let e=Rt,n=Ct,r=this;if(r.is0())throw new Error("bad point: ZERO");let{ex:s,ey:o,ez:i,et:f}=r,c=u(s*s),l=u(o*o),h=u(i*i),d=u(h*h),p=u(c*e),a=u(h*u(p+l)),x=u(d+u(n*u(c*l)));if(a!==x)throw new Error("bad point: equation left != right (1)");let y=u(s*o),g=u(i*f);if(y!==g)throw new Error("bad point: equation left != right (2)");return this}equals(e){let{ex:n,ey:r,ez:s}=this,{ex:o,ey:i,ez:f}=ue(e),c=u(n*f),l=u(o*s),h=u(r*f),d=u(i*s);return c===l&&h===d}is0(){return this.equals(N)}negate(){return new t(u(-this.ex),this.ey,this.ez,u(-this.et))}double(){let{ex:e,ey:n,ez:r}=this,s=Rt,o=u(e*e),i=u(n*n),f=u(2n*u(r*r)),c=u(s*o),l=e+n,h=u(u(l*l)-o-i),d=c+i,p=d-f,a=c-i,x=u(h*p),y=u(d*a),g=u(h*a),m=u(p*d);return new t(x,y,m,g)}add(e){let{ex:n,ey:r,ez:s,et:o}=this,{ex:i,ey:f,ez:c,et:l}=ue(e),h=Rt,d=Ct,p=u(n*i),a=u(r*f),x=u(o*d*l),y=u(s*c),g=u((n+r)*(i+f)-p-a),m=u(y-x),w=u(y+x),b=u(a-h*p),v=u(g*m),O=u(w*b),Z=u(g*b),X=u(m*w);return new t(v,O,X,Z)}multiply(e,n=!0){if(!n&&(e===0n||this.is0()))return N;if($(e,1n,dt),e===1n)return this;if(this.equals(P))return nn(e).p;let r=N,s=P;for(let o=this;e>0n;o=o.double(),e>>=1n)e&1n?r=r.add(o):n&&(s=s.add(o));return r}toAffine(){let{ex:e,ey:n,ez:r}=this;if(this.equals(N))return{x:0n,y:1n};let s=ve(r,k);return u(r*s)!==1n&&S("invalid inverse"),{x:u(e*s),y:u(n*s)}}toBytes(){let{x:e,y:n}=this.assertValidity().toAffine(),r=We(n);return r[31]|=e&1n?128:0,r}toHex(){return Tt(this.toBytes())}clearCofactor(){return this.multiply(ht(Ke),!1)}isSmallOrder(){return this.clearCofactor().is0()}isTorsionFree(){let e=this.multiply(dt/2n,!1).double();return dt%2n&&(e=e.add(this)),e.is0()}static fromHex(e,n){return t.fromBytes(pt(e),n)}get x(){return this.toAffine().x}get y(){return this.toAffine().y}toRawBytes(){return this.toBytes()}},P=new V(de,pe,1n,u(de*pe)),N=new V(0n,1n,1n,0n);V.BASE=P;V.ZERO=N;var We=t=>It(me($(t,0n,Ut),Et)).reverse(),Gt=t=>ht("0x"+Tt(Mt(j(t)).reverse())),L=(t,e)=>{let n=t;for(;e-- >0n;)n*=n,n%=k;return n},Ze=t=>{let n=t*t%k*t%k,r=L(n,2n)*n%k,s=L(r,1n)*t%k,o=L(s,5n)*s%k,i=L(o,10n)*o%k,f=L(i,20n)*i%k,c=L(f,40n)*f%k,l=L(c,80n)*c%k,h=L(l,80n)*c%k,d=L(h,10n)*o%k;return{pow_p_5_8:L(d,2n)*t%k,b2:n}},xe=0x2b8324804fc1df0b2b4d00993dfbd7a72f431806ad2fe478c4ee1b274a0ea0b0n,Xe=(t,e)=>{let n=u(e*e*e),r=u(n*n*e),s=Ze(t*r).pow_p_5_8,o=u(t*n*s),i=u(e*o*o),f=o,c=u(o*xe),l=i===t,h=i===u(-t),d=i===u(-t*xe);return l&&(o=f),(h||d)&&(o=c),(u(o)&1n)===1n&&(o=u(-o)),{isValid:l||h,value:o}},Ye=t=>je(Gt(t));var qe=(...t)=>Pe("sha512Sync")(...t);var Je=t=>t.finish(qe(t.hashable));var Ae={zip215:!0},Qe=(t,e,n,r=Ae)=>{t=pt(t,Et),e=pt(e),n=pt(n,tt);let{zip215:s}=r,o,i,f,c,l=Uint8Array.of();try{o=V.fromHex(n,s),i=V.fromHex(t.slice(0,tt),s),f=Gt(t.slice(tt,Et)),c=P.multiply(f,!1),l=_t(i.toBytes(),o.toBytes(),e)}catch{}return{hashable:l,finish:d=>{if(c==null||!s&&o.isSmallOrder())return!1;let p=Ye(d);return i.add(o.multiply(p,!1)).add(c.negate()).clearCofactor().is0()}}};var ke=(t,e,n,r=Ae)=>Je(Qe(t,e,n,r)),Ft={sha512Async:async(...t)=>{let e=De(),n=_t(...t);return xt(await e.digest("SHA-512",n.buffer))},sha512Sync:void 0,bytesToHex:Tt,hexToBytes:It,concatBytes:_t,mod:u,invert:ve,randomBytes:Ne};var ut=8,tn=256,Oe=Math.ceil(tn/ut)+1,Vt=2**(ut-1),en=()=>{let t=[],e=P,n=e;for(let r=0;r<Oe;r++){n=e,t.push(n);for(let s=1;s<Vt;s++)n=n.add(e),t.push(n);e=n.double()}return t},ge,be=(t,e)=>{let n=e.negate();return t?n:e},nn=t=>{let e=ge||(ge=en()),n=N,r=P,s=2**ut,o=s,i=ht(s-1),f=ht(ut);for(let c=0;c<Oe;c++){let l=Number(t&i);t>>=f,l>Vt&&(l-=o,t+=1n);let h=c*Vt,d=h,p=h+Math.abs(l)-1,a=c%2!==0,x=l<0;l===0?r=r.add(be(a,e[d])):n=n.add(be(x,e[p]))}return{p:n,f:r}};var Se=ce;Ft.sha512Sync=(...t)=>{let e=le.create();for(let n of t)e.update(n);return e.digest()};function et(t,e,n){try{let r=new TextEncoder().encode(t);return ke(Ot(e),r,Ot(n))}catch{return!1}}function nt(t){let e=new TextEncoder().encode(t);return Yt(Se(e))}function sn(t,e){let n=[];for(let r of e.values())r.type==="key-claim"&&r.author===t&&n.push(r.payload.pubkey);return n}function gt(t){let e={type:t.type,author:t.author,timestamp:t.timestamp,seen:[...t.seen].sort(),payload:t.type==="leave"?{}:t.payload};return JSON.stringify(e)}function Be(t){try{let e=new URL(t);return e.protocol==="http:"||e.protocol==="https:"}catch{return!1}}function bt(t,e,n,r=!1){let s=[],o=new Map(e),i=l=>{try{return new URL(l).origin}catch{return l}},f=i(n);for(let l of t)if(l.type==="key-claim"){let h=l;if(!r&&i(h.author)!==f)continue;let d=gt(h);et(d,h.sig,h.payload.pubkey)&&(o.set(h.id,h),s.push(h))}let c=[...e.values()].some(l=>l.type==="genesis");for(let l of t){if(l.type==="key-claim")continue;if(l.type==="genesis"){if(c&&!e.has(l.id)||!Be(l.author))continue}else if(l.type==="add"&&!Be(l.payload.target))continue;let h=sn(l.author,o);if(h.length===0)continue;let d=gt(l),p=!1;for(let a of h)if(et(d,l.sig,a)){p=!0;break}p&&(o.set(l.id,l),s.push(l))}return s}var Kt=new Map;function on(t,e,n){let r=`${e}:${n}`;if(Kt.has(r))return Kt.get(r);let s=et(t,e,n);return Kt.set(r,s),s}function zt(){return new Map}function rt(t){let e=new Map;for(let n of t)e.set(n.id,n);return e}function yt(t,e){let n=new Map(t);for(let[r,s]of e)n.has(r)||n.set(r,s);return n}function $t(t){return[...t.values()].sort((e,n)=>e.id.localeCompare(n.id))}function Dt(t){return rt(t)}function an(t){let e=[...t.values()],n=new Set,r=[];function s(o){if(!n.has(o.id)){n.add(o.id);for(let i of o.seen){let f=t.get(i);f&&s(f)}r.push(o)}}e.sort((o,i)=>o.id.localeCompare(i.id));for(let o of e)s(o);return r}function W(t){let e=an(t),n=new Map,r=new Map,s=new Map,o=new Set,i=new Map,f=null,c="webring",l=2,h=new Set;for(let p of e){if(p.type==="add"||p.type==="revoke"||p.type==="leave"){let a=n.get(p.author);if(!a||!a.pubkey)continue;let x=gt(p);if(!on(x,p.sig,a.pubkey))continue}switch(p.type){case"genesis":{let a=p;f=a,c=a.payload.name,l=a.payload.inviteBudget,n.set(a.author,{url:a.author,name:a.author,invitedBy:null,pubkey:null,isActive:!1,depth:0}),r.set(a.author,[]),i.set(a.author,0);break}case"add":{let a=p;if(!n.has(a.author)||h.has(a.author)||n.has(a.payload.target))break;let x=i.get(a.author)??0;if(x>=l)break;h.delete(a.payload.target);let y=n.get(a.author);n.set(a.payload.target,{url:a.payload.target,name:a.payload.name,invitedBy:a.author,pubkey:null,isActive:!1,depth:y.depth+1}),s.set(a.payload.target,a.author);let g=r.get(a.author)??[];g.push(a.payload.target),r.set(a.author,g),r.has(a.payload.target)||r.set(a.payload.target,[]),i.set(a.author,x+1);break}case"key-claim":{let a=p,x=n.get(a.author);if(!x||h.has(a.author))break;x.pubkey=a.payload.pubkey,x.isActive=!0,o.add(a.author);break}case"revoke":{let a=p;if(h.has(a.author)||s.get(a.payload.target)!==a.author)break;if(a.payload.reparent){let x=a.payload.target;h.add(x),n.delete(x),o.delete(x);let y=r.get(a.author)??[];r.set(a.author,y.filter(b=>b!==x)),s.delete(x);let g=r.get(x)??[],m=r.get(a.author)??[];for(let b of g){s.set(b,a.author);let v=n.get(b);if(v){v.invitedBy=a.author;let O=n.get(a.author);O&&(v.depth=O.depth+1)}m.push(b)}r.set(a.author,m),r.delete(x);let w=i.get(a.author)??0;i.set(a.author,Math.max(0,w-1))}else{let x=[a.payload.target];for(;x.length>0;){let g=x.pop();if(h.has(g))continue;h.add(g),n.delete(g),o.delete(g);let m=s.get(g);if(m){let b=r.get(m)??[];r.set(m,b.filter(v=>v!==g))}s.delete(g);let w=r.get(g)??[];x.push(...w)}let y=i.get(a.author)??0;i.set(a.author,Math.max(0,y-1))}break}case"leave":{let a=p;if(!n.has(a.author)||h.has(a.author))break;let x=s.get(a.author),y=r.get(a.author)??[];if(x){let g=r.get(x)??[];for(let w of y){s.set(w,x);let b=n.get(w);if(b){b.invitedBy=x;let v=n.get(x);v&&(b.depth=v.depth+1)}g.push(w)}r.set(x,g.filter(w=>w!==a.author));let m=i.get(x)??0;i.set(x,Math.max(0,m-1))}n.delete(a.author),o.delete(a.author),r.delete(a.author);break}}}let d=new Map;for(let[p]of n){let a=i.get(p)??0;d.set(p,l-a)}return{name:c,inviteBudget:l,members:He([...n.values()]),inviteTree:r,activeMembers:[...o],inviteSlots:d,genesis:f}}function He(t){return[...t].sort((e,n)=>{let r=nt(e.url),s=nt(n.url);return r.localeCompare(s)})}function Nt(t,e){if(t.length===0)return{prev:null,next:null};let n=t.findIndex(o=>o.url===e);if(n===-1)return{prev:t[t.length-1],next:t[0]};let r=t[(n-1+t.length)%t.length],s=t[(n+1)%t.length];return{prev:r,next:s}}function jt(t){return t.toString().toLowerCase().trim().replace(/\s+/g,"-").replace(/[^\w\-]+/g,"").replace(/\-\-+/g,"-").replace(/^-+/,"").replace(/-+$/,"")}var mt=`
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
`;function G(t,e,n,r="loaded"){t.shadowRoot||t.attachShadow({mode:"open"});let s=t.shadowRoot,o=e?.name||"kek's ring";if(r==="loading"){s.innerHTML=`<style>${mt}</style>
      <div class="widget">
        <div class="titlebar">
          <span class="titlebar-text"><span class="titlebar-icon">\u{1F310}</span> ${o}</span>
        </div>
        <div class="status-msg"><span class="loading-blink">\u25A0</span> Loading ring...</div>
      </div>`;return}if(r==="error"){s.innerHTML=`<style>${mt}</style>
      <div class="widget">
        <div class="titlebar">
          <span class="titlebar-text"><span class="titlebar-icon">\u{1F310}</span> ${o}</span>
        </div>
        <div class="status-msg">\u26A0 Ring unavailable</div>
      </div>`;return}if(r==="empty"||!e||e.members.length===0){s.innerHTML=`<style>${mt}</style>
      <div class="widget">
        <div class="titlebar">
          <span class="titlebar-text"><span class="titlebar-icon">\u{1F310}</span> ${o}</span>
        </div>
        <div class="status-msg">Ring is empty</div>
      </div>`;return}let{prev:i,next:f}=Nt(e.members,n),c=e.members.map(a=>`<a class="member-item${a.url===n?" current":""}" href="${a.url}">${a.url}<span class="member-name">${a.name}</span></a>`).join("");s.innerHTML=`
    <style>${mt}</style>
    <div class="widget">
      <div class="titlebar">
        <span class="titlebar-text"><span class="titlebar-icon">\u{1F310}</span> ${e.name}</span>
        <button class="titlebar-btn" id="ring-toggle" title="Members">\u25BC</button>
      </div>
      <div class="bar">
        <a class="nav-btn" href="${i?.url||"#"}" title="${i?.name||"previous"}">\u25C4 Prev</a>
        <div class="divider"></div>
        <div class="center-label" id="ring-title">${e.members.length} site${e.members.length!==1?"s":""}</div>
        <div class="divider"></div>
        <a class="nav-btn" href="${f?.url||"#"}" title="${f?.name||"next"}">Next \u25BA</a>
      </div>
      <div class="member-list" id="member-list">
        ${c}
      </div>
      <div class="statusbar">
        <span class="statusbar-panel">Ring: ${e.name}</span>
      </div>
    </div>
  `;let l=s.getElementById("ring-toggle"),h=s.getElementById("ring-title"),d=s.getElementById("member-list"),p=()=>d?.classList.toggle("expanded");l?.addEventListener("click",p),h?.addEventListener("click",p)}function D(t){return t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}function wt(t){return{...t,name:D(t.name),members:t.members.map(e=>({...e,name:D(e.name),url:D(e.url)}))}}async function Le(t,e){try{let n=new AbortController,r=setTimeout(()=>n.abort(),3e3),s=`${t.replace(/\/$/,"")}/${e}.json`,o=await fetch(s,{signal:n.signal});if(clearTimeout(r),!o.ok)return null;let i=await o.json();return Array.isArray(i)?i:null}catch{return null}}async function cn(){let t=document.currentScript||document.querySelector("script[data-ring]");if(!t)return;let e=t.getAttribute("data-ring-name");if(!e){let g=document.createElement("div");t.parentNode?.insertBefore(g,t.nextSibling),g.innerHTML='<div style="color:red;padding:10px;border:1px solid red;border-radius:4px;font-family:sans-serif;font-size:12px;">da-ring error: missing data-ring-name attribute</div>';return}let n=jt(e),r=t.getAttribute("data-ring");if(!r)return;let s=window.location.origin,o=document.createElement("div");t.parentNode?.insertBefore(o,t.nextSibling);let i=r.split(",").map(g=>g.trim()).filter(Boolean);if(i.length===0){G(o,null,s,"error");return}let f=`da-ring-cache-${n}`,c=zt(),l=!1;try{let g=localStorage.getItem(f);if(g){let m=JSON.parse(g);if(Array.isArray(m)){c=Dt(m);let w=W(c),b=wt(w),v=D(s);G(o,b,v,b.members.length===0?"empty":"loaded"),l=!0}}}catch{}l||G(o,null,s,"loading");let h=new Set,p=(await Promise.all(i.map(async g=>{h.add(g);let m=await Le(g,n);return{url:g,ops:m}}))).filter(g=>g.ops!==null);if(p.length===0&&!l){G(o,null,s,"error");return}for(let{url:g,ops:m}of p){let w=bt(m,c,g,!0);c=yt(c,rt(w))}if(!l){let g=W(c),m=wt(g),w=D(s);G(o,m,w,m.members.length===0?"empty":"loaded")}for(;;){let m=W(c).members.filter(b=>!h.has(b.url));if(m.length===0)break;let w=await Promise.all(m.map(async b=>{h.add(b.url);let v=await Le(b.url,n);return{url:b.url,ops:v}}));for(let{url:b,ops:v}of w)if(v){let O=bt(v,c,b,!1);c=yt(c,rt(O))}}let a=W(c),x=wt(a),y=D(s);x.members.length===0?G(o,x,y,"empty"):G(o,x,y,"loaded");try{let g=$t(c);localStorage.setItem(f,JSON.stringify(g))}catch{}}cn();})();
/*! Bundled license information:

@noble/hashes/esm/utils.js:
  (*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

@noble/ed25519/index.js:
  (*! noble-ed25519 - MIT License (c) 2019 Paul Miller (paulmillr.com) *)
*/
