"use strict";var DaRing=(()=>{function He(t){return t instanceof Uint8Array||ArrayBuffer.isView(t)&&t.constructor.name==="Uint8Array"}function Z(t,...e){if(!He(t))throw new Error("Uint8Array expected");if(e.length>0&&!e.includes(t.length))throw new Error("Uint8Array expected of length "+e+", got length="+t.length)}function At(t,e=!0){if(t.destroyed)throw new Error("Hash instance has been destroyed");if(e&&t.finished)throw new Error("Hash#digest() has already been called")}function jt(t,e){Z(t);let n=e.outputLen;if(t.length<n)throw new Error("digestInto() expects output buffer of length at least "+n)}function G(...t){for(let e=0;e<t.length;e++)t[e].fill(0)}function ot(t){return new DataView(t.buffer,t.byteOffset,t.byteLength)}function S(t,e){return t<<32-e|t>>>e}var Nt=typeof Uint8Array.from([]).toHex=="function"&&typeof Uint8Array.fromHex=="function",Le=Array.from({length:256},(t,e)=>e.toString(16).padStart(2,"0"));function Wt(t){if(Z(t),Nt)return t.toHex();let e="";for(let n=0;n<t.length;n++)e+=Le[t[n]];return e}var C={_0:48,_9:57,A:65,F:70,a:97,f:102};function $t(t){if(t>=C._0&&t<=C._9)return t-C._0;if(t>=C.A&&t<=C.F)return t-(C.A-10);if(t>=C.a&&t<=C.f)return t-(C.a-10)}function kt(t){if(typeof t!="string")throw new Error("hex string expected, got "+typeof t);if(Nt)return Uint8Array.fromHex(t);let e=t.length,n=e/2;if(e%2)throw new Error("hex string expected, got unpadded hex of length "+e);let r=new Uint8Array(n);for(let s=0,o=0;s<n;s++,o+=2){let a=$t(t.charCodeAt(o)),c=$t(t.charCodeAt(o+1));if(a===void 0||c===void 0){let f=t[o]+t[o+1];throw new Error('hex string expected, got non-hex character "'+f+'" at index '+o)}r[s]=a*16+c}return r}function Re(t){if(typeof t!="string")throw new Error("string expected");return new Uint8Array(new TextEncoder().encode(t))}function Ot(t){return typeof t=="string"&&(t=Re(t)),Z(t),t}var st=class{};function Bt(t){let e=r=>t().update(Ot(r)).digest(),n=t();return e.outputLen=n.outputLen,e.blockLen=n.blockLen,e.create=()=>t(),e}function Ee(t,e,n,r){if(typeof t.setBigUint64=="function")return t.setBigUint64(e,n,r);let s=BigInt(32),o=BigInt(4294967295),a=Number(n>>s&o),c=Number(n&o),f=r?4:0,l=r?0:4;t.setUint32(e+f,a,r),t.setUint32(e+l,c,r)}function Pt(t,e,n){return t&e^~t&n}function Zt(t,e,n){return t&e^t&n^e&n}var X=class extends st{constructor(e,n,r,s){super(),this.finished=!1,this.length=0,this.pos=0,this.destroyed=!1,this.blockLen=e,this.outputLen=n,this.padOffset=r,this.isLE=s,this.buffer=new Uint8Array(e),this.view=ot(this.buffer)}update(e){At(this),e=Ot(e),Z(e);let{view:n,buffer:r,blockLen:s}=this,o=e.length;for(let a=0;a<o;){let c=Math.min(s-this.pos,o-a);if(c===s){let f=ot(e);for(;s<=o-a;a+=s)this.process(f,a);continue}r.set(e.subarray(a,a+c),this.pos),this.pos+=c,a+=c,this.pos===s&&(this.process(n,0),this.pos=0)}return this.length+=e.length,this.roundClean(),this}digestInto(e){At(this),jt(e,this),this.finished=!0;let{buffer:n,view:r,blockLen:s,isLE:o}=this,{pos:a}=this;n[a++]=128,G(this.buffer.subarray(a)),this.padOffset>s-a&&(this.process(r,0),a=0);for(let d=a;d<s;d++)n[d]=0;Ee(r,s-8,BigInt(this.length*8),o),this.process(r,0);let c=ot(e),f=this.outputLen;if(f%4)throw new Error("_sha2: outputLen should be aligned to 32bit");let l=f/4,h=this.get();if(l>h.length)throw new Error("_sha2: outputLen bigger than state");for(let d=0;d<l;d++)c.setUint32(4*d,h[d],o)}digest(){let{buffer:e,outputLen:n}=this;this.digestInto(e);let r=e.slice(0,n);return this.destroy(),r}_cloneInto(e){e||(e=new this.constructor),e.set(...this.get());let{blockLen:n,buffer:r,length:s,finished:o,destroyed:a,pos:c}=this;return e.destroyed=a,e.finished=o,e.length=s,e.pos=c,s%n&&e.buffer.set(r),e}clone(){return this._cloneInto()}},_=Uint32Array.from([1779033703,3144134277,1013904242,2773480762,1359893119,2600822924,528734635,1541459225]);var A=Uint32Array.from([1779033703,4089235720,3144134277,2227873595,1013904242,4271175723,2773480762,1595750129,1359893119,2917565137,2600822924,725511199,528734635,4215389547,1541459225,327033209]);var it=BigInt(4294967295),Xt=BigInt(32);function Ce(t,e=!1){return e?{h:Number(t&it),l:Number(t>>Xt&it)}:{h:Number(t>>Xt&it)|0,l:Number(t&it)|0}}function Yt(t,e=!1){let n=t.length,r=new Uint32Array(n),s=new Uint32Array(n);for(let o=0;o<n;o++){let{h:a,l:c}=Ce(t[o],e);[r[o],s[o]]=[a,c]}return[r,s]}var St=(t,e,n)=>t>>>n,Ht=(t,e,n)=>t<<32-n|e>>>n,F=(t,e,n)=>t>>>n|e<<32-n,K=(t,e,n)=>t<<32-n|e>>>n,Y=(t,e,n)=>t<<64-n|e>>>n-32,q=(t,e,n)=>t>>>n-32|e<<64-n;function H(t,e,n,r){let s=(e>>>0)+(r>>>0);return{h:t+n+(s/2**32|0)|0,l:s|0}}var qt=(t,e,n)=>(t>>>0)+(e>>>0)+(n>>>0),Jt=(t,e,n,r)=>e+n+r+(t/2**32|0)|0,Qt=(t,e,n,r)=>(t>>>0)+(e>>>0)+(n>>>0)+(r>>>0),te=(t,e,n,r,s)=>e+n+r+s+(t/2**32|0)|0,ee=(t,e,n,r,s)=>(t>>>0)+(e>>>0)+(n>>>0)+(r>>>0)+(s>>>0),ne=(t,e,n,r,s,o)=>e+n+r+s+o+(t/2**32|0)|0;var Ue=Uint32Array.from([1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298]),T=new Uint32Array(64),at=class extends X{constructor(e=32){super(64,e,8,!1),this.A=_[0]|0,this.B=_[1]|0,this.C=_[2]|0,this.D=_[3]|0,this.E=_[4]|0,this.F=_[5]|0,this.G=_[6]|0,this.H=_[7]|0}get(){let{A:e,B:n,C:r,D:s,E:o,F:a,G:c,H:f}=this;return[e,n,r,s,o,a,c,f]}set(e,n,r,s,o,a,c,f){this.A=e|0,this.B=n|0,this.C=r|0,this.D=s|0,this.E=o|0,this.F=a|0,this.G=c|0,this.H=f|0}process(e,n){for(let d=0;d<16;d++,n+=4)T[d]=e.getUint32(n,!1);for(let d=16;d<64;d++){let p=T[d-15],i=T[d-2],x=S(p,7)^S(p,18)^p>>>3,y=S(i,17)^S(i,19)^i>>>10;T[d]=y+T[d-7]+x+T[d-16]|0}let{A:r,B:s,C:o,D:a,E:c,F:f,G:l,H:h}=this;for(let d=0;d<64;d++){let p=S(c,6)^S(c,11)^S(c,25),i=h+p+Pt(c,f,l)+Ue[d]+T[d]|0,y=(S(r,2)^S(r,13)^S(r,22))+Zt(r,s,o)|0;h=l,l=f,f=c,c=a+i|0,a=o,o=s,s=r,r=i+y|0}r=r+this.A|0,s=s+this.B|0,o=o+this.C|0,a=a+this.D|0,c=c+this.E|0,f=f+this.F|0,l=l+this.G|0,h=h+this.H|0,this.set(r,s,o,a,c,f,l,h)}roundClean(){G(T)}destroy(){this.set(0,0,0,0,0,0,0,0),G(this.buffer)}};var re=Yt(["0x428a2f98d728ae22","0x7137449123ef65cd","0xb5c0fbcfec4d3b2f","0xe9b5dba58189dbbc","0x3956c25bf348b538","0x59f111f1b605d019","0x923f82a4af194f9b","0xab1c5ed5da6d8118","0xd807aa98a3030242","0x12835b0145706fbe","0x243185be4ee4b28c","0x550c7dc3d5ffb4e2","0x72be5d74f27b896f","0x80deb1fe3b1696b1","0x9bdc06a725c71235","0xc19bf174cf692694","0xe49b69c19ef14ad2","0xefbe4786384f25e3","0x0fc19dc68b8cd5b5","0x240ca1cc77ac9c65","0x2de92c6f592b0275","0x4a7484aa6ea6e483","0x5cb0a9dcbd41fbd4","0x76f988da831153b5","0x983e5152ee66dfab","0xa831c66d2db43210","0xb00327c898fb213f","0xbf597fc7beef0ee4","0xc6e00bf33da88fc2","0xd5a79147930aa725","0x06ca6351e003826f","0x142929670a0e6e70","0x27b70a8546d22ffc","0x2e1b21385c26c926","0x4d2c6dfc5ac42aed","0x53380d139d95b3df","0x650a73548baf63de","0x766a0abb3c77b2a8","0x81c2c92e47edaee6","0x92722c851482353b","0xa2bfe8a14cf10364","0xa81a664bbc423001","0xc24b8b70d0f89791","0xc76c51a30654be30","0xd192e819d6ef5218","0xd69906245565a910","0xf40e35855771202a","0x106aa07032bbd1b8","0x19a4c116b8d2d0c8","0x1e376c085141ab53","0x2748774cdf8eeb99","0x34b0bcb5e19b48a8","0x391c0cb3c5c95a63","0x4ed8aa4ae3418acb","0x5b9cca4f7763e373","0x682e6ff3d6b2b8a3","0x748f82ee5defb2fc","0x78a5636f43172f60","0x84c87814a1f0ab72","0x8cc702081a6439ec","0x90befffa23631e28","0xa4506cebde82bde9","0xbef9a3f7b2c67915","0xc67178f2e372532b","0xca273eceea26619c","0xd186b8c721c0c207","0xeada7dd6cde0eb1e","0xf57d4f7fee6ed178","0x06f067aa72176fba","0x0a637dc5a2c898a6","0x113f9804bef90dae","0x1b710b35131c471b","0x28db77f523047d84","0x32caab7b40c72493","0x3c9ebe0a15c9bebc","0x431d67c49c100d4c","0x4cc5d4becb3e42b6","0x597f299cfc657e2a","0x5fcb6fab3ad6faec","0x6c44198c4a475817"].map(t=>BigInt(t))),Me=re[0],Te=re[1],V=new Uint32Array(80),I=new Uint32Array(80),ct=class extends X{constructor(e=64){super(128,e,16,!1),this.Ah=A[0]|0,this.Al=A[1]|0,this.Bh=A[2]|0,this.Bl=A[3]|0,this.Ch=A[4]|0,this.Cl=A[5]|0,this.Dh=A[6]|0,this.Dl=A[7]|0,this.Eh=A[8]|0,this.El=A[9]|0,this.Fh=A[10]|0,this.Fl=A[11]|0,this.Gh=A[12]|0,this.Gl=A[13]|0,this.Hh=A[14]|0,this.Hl=A[15]|0}get(){let{Ah:e,Al:n,Bh:r,Bl:s,Ch:o,Cl:a,Dh:c,Dl:f,Eh:l,El:h,Fh:d,Fl:p,Gh:i,Gl:x,Hh:y,Hl:b}=this;return[e,n,r,s,o,a,c,f,l,h,d,p,i,x,y,b]}set(e,n,r,s,o,a,c,f,l,h,d,p,i,x,y,b){this.Ah=e|0,this.Al=n|0,this.Bh=r|0,this.Bl=s|0,this.Ch=o|0,this.Cl=a|0,this.Dh=c|0,this.Dl=f|0,this.Eh=l|0,this.El=h|0,this.Fh=d|0,this.Fl=p|0,this.Gh=i|0,this.Gl=x|0,this.Hh=y|0,this.Hl=b|0}process(e,n){for(let g=0;g<16;g++,n+=4)V[g]=e.getUint32(n),I[g]=e.getUint32(n+=4);for(let g=16;g<80;g++){let w=V[g-15]|0,O=I[g-15]|0,W=F(w,O,1)^F(w,O,8)^St(w,O,7),P=K(w,O,1)^K(w,O,8)^Ht(w,O,7),R=V[g-2]|0,E=I[g-2]|0,nt=F(R,E,19)^Y(R,E,61)^St(R,E,6),wt=K(R,E,19)^q(R,E,61)^Ht(R,E,6),rt=Qt(P,wt,I[g-7],I[g-16]),vt=te(rt,W,nt,V[g-7],V[g-16]);V[g]=vt|0,I[g]=rt|0}let{Ah:r,Al:s,Bh:o,Bl:a,Ch:c,Cl:f,Dh:l,Dl:h,Eh:d,El:p,Fh:i,Fl:x,Gh:y,Gl:b,Hh:m,Hl:v}=this;for(let g=0;g<80;g++){let w=F(d,p,14)^F(d,p,18)^Y(d,p,41),O=K(d,p,14)^K(d,p,18)^q(d,p,41),W=d&i^~d&y,P=p&x^~p&b,R=ee(v,O,P,Te[g],I[g]),E=ne(R,m,w,W,Me[g],V[g]),nt=R|0,wt=F(r,s,28)^Y(r,s,34)^Y(r,s,39),rt=K(r,s,28)^q(r,s,34)^q(r,s,39),vt=r&o^r&c^o&c,Se=s&a^s&f^a&f;m=y|0,v=b|0,y=i|0,b=x|0,i=d|0,x=p|0,{h:d,l:p}=H(l|0,h|0,E|0,nt|0),l=c|0,h=f|0,c=o|0,f=a|0,o=r|0,a=s|0;let zt=qt(nt,rt,Se);r=Jt(zt,E,wt,vt),s=zt|0}({h:r,l:s}=H(this.Ah|0,this.Al|0,r|0,s|0)),{h:o,l:a}=H(this.Bh|0,this.Bl|0,o|0,a|0),{h:c,l:f}=H(this.Ch|0,this.Cl|0,c|0,f|0),{h:l,l:h}=H(this.Dh|0,this.Dl|0,l|0,h|0),{h:d,l:p}=H(this.Eh|0,this.El|0,d|0,p|0),{h:i,l:x}=H(this.Fh|0,this.Fl|0,i|0,x|0),{h:y,l:b}=H(this.Gh|0,this.Gl|0,y|0,b|0),{h:m,l:v}=H(this.Hh|0,this.Hl|0,m|0,v|0),this.set(r,s,o,a,c,f,l,h,d,p,i,x,y,b,m,v)}roundClean(){G(V,I)}destroy(){G(this.buffer),this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0)}};var se=Bt(()=>new at);var oe=Bt(()=>new ct);var ie=oe;var Ve={p:0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffedn,n:0x1000000000000000000000000000000014def9dea2f79cd65812631a5cf5d3edn,h:8n,a:0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffecn,d:0x52036cee2b6ffe738cc740797779e89800700a4d4141d8ab75eb4dca135978a3n,Gx:0x216936d3cd6e53fec0a4e231fdd6dc5c692cc7609525a7b2c9562d608f25d51an,Gy:0x6666666666666666666666666666666666666666666666666666666666666658n},{p:k,n:ft,Gx:ae,Gy:ce,a:Lt,d:Rt}=Ve,Ie=8n,J=32,Et=64,B=(t="")=>{throw new Error(t)},Ge=t=>typeof t=="bigint",ue=t=>typeof t=="string",Fe=t=>t instanceof Uint8Array||ArrayBuffer.isView(t)&&t.constructor.name==="Uint8Array",$=(t,e)=>!Fe(t)||typeof e=="number"&&e>0&&t.length!==e?B("Uint8Array expected"):t,ht=t=>new Uint8Array(t),Mt=t=>Uint8Array.from(t),xe=(t,e)=>t.toString(16).padStart(e,"0"),Tt=t=>Array.from($(t)).map(e=>xe(e,2)).join(""),U={_0:48,_9:57,A:65,F:70,a:97,f:102},fe=t=>{if(t>=U._0&&t<=U._9)return t-U._0;if(t>=U.A&&t<=U.F)return t-(U.A-10);if(t>=U.a&&t<=U.f)return t-(U.a-10)},Vt=t=>{let e="hex invalid";if(!ue(t))return B(e);let n=t.length,r=n/2;if(n%2)return B(e);let s=ht(r);for(let o=0,a=0;o<r;o++,a+=2){let c=fe(t.charCodeAt(a)),f=fe(t.charCodeAt(a+1));if(c===void 0||f===void 0)return B(e);s[o]=c*16+f}return s},lt=(t,e)=>$(ue(t)?Vt(t):Mt($(t)),e),be=()=>globalThis?.crypto,Ke=()=>be()?.subtle??B("crypto.subtle must be defined"),Ct=(...t)=>{let e=ht(t.reduce((r,s)=>r+$(s).length,0)),n=0;return t.forEach(r=>{e.set(r,n),n+=r.length}),e},De=(t=J)=>be().getRandomValues(ht(t)),dt=BigInt,D=(t,e,n,r="bad number: out of range")=>Ge(t)&&e<=t&&t<n?t:B(r),u=(t,e=k)=>{let n=t%e;return n>=0n?n:e+n},ze=t=>u(t,ft),ge=(t,e)=>{(t===0n||e<=0n)&&B("no inverse n="+t+" mod="+e);let n=u(t,e),r=e,s=0n,o=1n,a=1n,c=0n;for(;n!==0n;){let f=r/n,l=r%n,h=s-a*f,d=o-c*f;r=n,n=l,s=a,o=c,a=h,c=d}return r===1n?u(s,e):B("no inverse")},$e=t=>{let e=Gt[t];return typeof e!="function"&&B("hashes."+t+" not set"),e},le=t=>t instanceof M?t:B("Point expected"),_t=2n**256n,M=class t{static BASE;static ZERO;ex;ey;ez;et;constructor(e,n,r,s){let o=_t;this.ex=D(e,0n,o),this.ey=D(n,0n,o),this.ez=D(r,1n,o),this.et=D(s,0n,o),Object.freeze(this)}static fromAffine(e){return new t(e.x,e.y,1n,u(e.x*e.y))}static fromBytes(e,n=!1){let r=Rt,s=Mt($(e,J)),o=e[31];s[31]=o&-129;let a=It(s);D(a,0n,n?_t:k);let f=u(a*a),l=u(f-1n),h=u(r*f+1n),{isValid:d,value:p}=We(l,h);d||B("bad point: y not sqrt");let i=(p&1n)===1n,x=(o&128)!==0;return!n&&p===0n&&x&&B("bad point: x==0, isLastByteOdd"),x!==i&&(p=u(-p)),new t(p,a,1n,u(p*a))}assertValidity(){let e=Lt,n=Rt,r=this;if(r.is0())throw new Error("bad point: ZERO");let{ex:s,ey:o,ez:a,et:c}=r,f=u(s*s),l=u(o*o),h=u(a*a),d=u(h*h),p=u(f*e),i=u(h*u(p+l)),x=u(d+u(n*u(f*l)));if(i!==x)throw new Error("bad point: equation left != right (1)");let y=u(s*o),b=u(a*c);if(y!==b)throw new Error("bad point: equation left != right (2)");return this}equals(e){let{ex:n,ey:r,ez:s}=this,{ex:o,ey:a,ez:c}=le(e),f=u(n*c),l=u(o*s),h=u(r*c),d=u(a*s);return f===l&&h===d}is0(){return this.equals(z)}negate(){return new t(u(-this.ex),this.ey,this.ez,u(-this.et))}double(){let{ex:e,ey:n,ez:r}=this,s=Lt,o=u(e*e),a=u(n*n),c=u(2n*u(r*r)),f=u(s*o),l=e+n,h=u(u(l*l)-o-a),d=f+a,p=d-c,i=f-a,x=u(h*p),y=u(d*i),b=u(h*i),m=u(p*d);return new t(x,y,m,b)}add(e){let{ex:n,ey:r,ez:s,et:o}=this,{ex:a,ey:c,ez:f,et:l}=le(e),h=Lt,d=Rt,p=u(n*a),i=u(r*c),x=u(o*d*l),y=u(s*f),b=u((n+r)*(a+c)-p-i),m=u(y-x),v=u(y+x),g=u(i-h*p),w=u(b*m),O=u(v*g),W=u(b*g),P=u(m*v);return new t(w,O,P,W)}multiply(e,n=!0){if(!n&&(e===0n||this.is0()))return z;if(D(e,1n,ft),e===1n)return this;if(this.equals(j))return Qe(e).p;let r=z,s=j;for(let o=this;e>0n;o=o.double(),e>>=1n)e&1n?r=r.add(o):n&&(s=s.add(o));return r}toAffine(){let{ex:e,ey:n,ez:r}=this;if(this.equals(z))return{x:0n,y:1n};let s=ge(r,k);return u(r*s)!==1n&&B("invalid inverse"),{x:u(e*s),y:u(n*s)}}toBytes(){let{x:e,y:n}=this.assertValidity().toAffine(),r=je(n);return r[31]|=e&1n?128:0,r}toHex(){return Tt(this.toBytes())}clearCofactor(){return this.multiply(dt(Ie),!1)}isSmallOrder(){return this.clearCofactor().is0()}isTorsionFree(){let e=this.multiply(ft/2n,!1).double();return ft%2n&&(e=e.add(this)),e.is0()}static fromHex(e,n){return t.fromBytes(lt(e),n)}get x(){return this.toAffine().x}get y(){return this.toAffine().y}toRawBytes(){return this.toBytes()}},j=new M(ae,ce,1n,u(ae*ce)),z=new M(0n,1n,1n,0n);M.BASE=j;M.ZERO=z;var je=t=>Vt(xe(D(t,0n,_t),Et)).reverse(),It=t=>dt("0x"+Tt(Mt($(t)).reverse())),L=(t,e)=>{let n=t;for(;e-- >0n;)n*=n,n%=k;return n},Ne=t=>{let n=t*t%k*t%k,r=L(n,2n)*n%k,s=L(r,1n)*t%k,o=L(s,5n)*s%k,a=L(o,10n)*o%k,c=L(a,20n)*a%k,f=L(c,40n)*c%k,l=L(f,80n)*f%k,h=L(l,80n)*f%k,d=L(h,10n)*o%k;return{pow_p_5_8:L(d,2n)*t%k,b2:n}},de=0x2b8324804fc1df0b2b4d00993dfbd7a72f431806ad2fe478c4ee1b274a0ea0b0n,We=(t,e)=>{let n=u(e*e*e),r=u(n*n*e),s=Ne(t*r).pow_p_5_8,o=u(t*n*s),a=u(e*o*o),c=o,f=u(o*de),l=a===t,h=a===u(-t),d=a===u(-t*de);return l&&(o=c),(h||d)&&(o=f),(u(o)&1n)===1n&&(o=u(-o)),{isValid:l||h,value:o}},Pe=t=>ze(It(t));var Ze=(...t)=>$e("sha512Sync")(...t);var Xe=t=>t.finish(Ze(t.hashable));var ye={zip215:!0},Ye=(t,e,n,r=ye)=>{t=lt(t,Et),e=lt(e),n=lt(n,J);let{zip215:s}=r,o,a,c,f,l=Uint8Array.of();try{o=M.fromHex(n,s),a=M.fromHex(t.slice(0,J),s),c=It(t.slice(J,Et)),f=j.multiply(c,!1),l=Ct(a.toBytes(),o.toBytes(),e)}catch{}return{hashable:l,finish:d=>{if(f==null||!s&&o.isSmallOrder())return!1;let p=Pe(d);return a.add(o.multiply(p,!1)).add(f.negate()).clearCofactor().is0()}}};var me=(t,e,n,r=ye)=>Xe(Ye(t,e,n,r)),Gt={sha512Async:async(...t)=>{let e=Ke(),n=Ct(...t);return ht(await e.digest("SHA-512",n.buffer))},sha512Sync:void 0,bytesToHex:Tt,hexToBytes:Vt,concatBytes:Ct,mod:u,invert:ge,randomBytes:De};var pt=8,qe=256,we=Math.ceil(qe/pt)+1,Ut=2**(pt-1),Je=()=>{let t=[],e=j,n=e;for(let r=0;r<we;r++){n=e,t.push(n);for(let s=1;s<Ut;s++)n=n.add(e),t.push(n);e=n.double()}return t},pe,he=(t,e)=>{let n=e.negate();return t?n:e},Qe=t=>{let e=pe||(pe=Je()),n=z,r=j,s=2**pt,o=s,a=dt(s-1),c=dt(pt);for(let f=0;f<we;f++){let l=Number(t&a);t>>=c,l>Ut&&(l-=o,t+=1n);let h=f*Ut,d=h,p=h+Math.abs(l)-1,i=f%2!==0,x=l<0;l===0?r=r.add(he(i,e[d])):n=n.add(he(x,e[p]))}return{p:n,f:r}};var ve=se;Gt.sha512Sync=(...t)=>{let e=ie.create();for(let n of t)e.update(n);return e.digest()};function Q(t,e,n){try{let r=new TextEncoder().encode(t);return me(kt(e),r,kt(n))}catch{return!1}}function tt(t){let e=new TextEncoder().encode(t);return Wt(ve(e))}function en(t,e){let n=[];for(let r of e.values())r.type==="key-claim"&&r.author===t&&n.push(r.payload.pubkey);return n}function ut(t){let e={type:t.type,author:t.author,timestamp:t.timestamp,seen:[...t.seen].sort(),payload:t.type==="leave"?{}:t.payload};return JSON.stringify(e)}function Ae(t){try{let e=new URL(t);return e.protocol==="http:"||e.protocol==="https:"}catch{return!1}}function xt(t,e,n,r=!1){let s=[],o=new Map(e),a=l=>{try{return new URL(l).origin}catch{return l}},c=a(n);for(let l of t)if(l.type==="key-claim"){let h=l;if(!r&&a(h.author)!==c)continue;let d=ut(h);Q(d,h.sig,h.payload.pubkey)&&(o.set(h.id,h),s.push(h))}let f=[...e.values()].some(l=>l.type==="genesis");for(let l of t){if(l.type==="key-claim")continue;if(l.type==="genesis"){if(f&&!e.has(l.id)||!Ae(l.author))continue}else if(l.type==="add"&&!Ae(l.payload.target))continue;let h=en(l.author,o);if(h.length===0)continue;let d=ut(l),p=!1;for(let i of h)if(Q(d,l.sig,i)){p=!0;break}p&&(o.set(l.id,l),s.push(l))}return s}var Ft=new Map;function nn(t,e,n){let r=`${e}:${n}`;if(Ft.has(r))return Ft.get(r);let s=Q(t,e,n);return Ft.set(r,s),s}function Kt(){return new Map}function bt(t){let e=new Map;for(let n of t)e.set(n.id,n);return e}function gt(t,e){let n=new Map(t);for(let[r,s]of e)n.has(r)||n.set(r,s);return n}function rn(t){let e=[...t.values()],n=new Set,r=[];function s(o){if(!n.has(o.id)){n.add(o.id);for(let a of o.seen){let c=t.get(a);c&&s(c)}r.push(o)}}e.sort((o,a)=>o.id.localeCompare(a.id));for(let o of e)s(o);return r}function yt(t){let e=rn(t),n=new Map,r=new Map,s=new Map,o=new Set,a=new Map,c=null,f="webring",l=2,h=new Set;for(let p of e){if(p.type==="add"||p.type==="revoke"||p.type==="leave"){let i=n.get(p.author);if(!i||!i.pubkey)continue;let x=ut(p);if(!nn(x,p.sig,i.pubkey))continue}switch(p.type){case"genesis":{let i=p;c=i,f=i.payload.name,l=i.payload.inviteBudget,n.set(i.author,{url:i.author,name:i.author,invitedBy:null,pubkey:null,isActive:!1,depth:0}),r.set(i.author,[]),a.set(i.author,0);break}case"add":{let i=p;if(!n.has(i.author)||h.has(i.author)||n.has(i.payload.target))break;let x=a.get(i.author)??0;if(x>=l)break;h.delete(i.payload.target);let y=n.get(i.author);n.set(i.payload.target,{url:i.payload.target,name:i.payload.name,invitedBy:i.author,pubkey:null,isActive:!1,depth:y.depth+1}),s.set(i.payload.target,i.author);let b=r.get(i.author)??[];b.push(i.payload.target),r.set(i.author,b),r.has(i.payload.target)||r.set(i.payload.target,[]),a.set(i.author,x+1);break}case"key-claim":{let i=p,x=n.get(i.author);if(!x||h.has(i.author))break;x.pubkey=i.payload.pubkey,x.isActive=!0,o.add(i.author);break}case"revoke":{let i=p;if(h.has(i.author)||s.get(i.payload.target)!==i.author)break;if(i.payload.reparent){let x=i.payload.target;h.add(x),n.delete(x),o.delete(x);let y=r.get(i.author)??[];r.set(i.author,y.filter(g=>g!==x)),s.delete(x);let b=r.get(x)??[],m=r.get(i.author)??[];for(let g of b){s.set(g,i.author);let w=n.get(g);if(w){w.invitedBy=i.author;let O=n.get(i.author);O&&(w.depth=O.depth+1)}m.push(g)}r.set(i.author,m),r.delete(x);let v=a.get(i.author)??0;a.set(i.author,Math.max(0,v-1))}else{let x=[i.payload.target];for(;x.length>0;){let b=x.pop();if(h.has(b))continue;h.add(b),n.delete(b),o.delete(b);let m=s.get(b);if(m){let g=r.get(m)??[];r.set(m,g.filter(w=>w!==b))}s.delete(b);let v=r.get(b)??[];x.push(...v)}let y=a.get(i.author)??0;a.set(i.author,Math.max(0,y-1))}break}case"leave":{let i=p;if(!n.has(i.author)||h.has(i.author))break;let x=s.get(i.author),y=r.get(i.author)??[];if(x){let b=r.get(x)??[];for(let v of y){s.set(v,x);let g=n.get(v);if(g){g.invitedBy=x;let w=n.get(x);w&&(g.depth=w.depth+1)}b.push(v)}r.set(x,b.filter(v=>v!==i.author));let m=a.get(x)??0;a.set(x,Math.max(0,m-1))}n.delete(i.author),o.delete(i.author),r.delete(i.author);break}}}let d=new Map;for(let[p]of n){let i=a.get(p)??0;d.set(p,l-i)}return{name:f,inviteBudget:l,members:ke([...n.values()]),inviteTree:r,activeMembers:[...o],inviteSlots:d,genesis:c}}function ke(t){return[...t].sort((e,n)=>{let r=tt(e.url),s=tt(n.url);return r.localeCompare(s)})}function Dt(t,e){if(t.length===0)return{prev:null,next:null};let n=t.findIndex(o=>o.url===e);if(n===-1)return{prev:t[t.length-1],next:t[0]};let r=t[(n-1+t.length)%t.length],s=t[(n+1)%t.length];return{prev:r,next:s}}var mt=`
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
`;function N(t,e,n,r="loaded"){t.shadowRoot||t.attachShadow({mode:"open"});let s=t.shadowRoot,o=e?.name||"kek's ring";if(r==="loading"){s.innerHTML=`<style>${mt}</style>
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
      </div>`;return}let{prev:a,next:c}=Dt(e.members,n),f=e.members.map(i=>`<a class="member-item${i.url===n?" current":""}" href="${i.url}">${i.url}<span class="member-name">${i.name}</span></a>`).join("");s.innerHTML=`
    <style>${mt}</style>
    <div class="widget">
      <div class="titlebar">
        <span class="titlebar-text"><span class="titlebar-icon">\u{1F310}</span> ${e.name}</span>
        <button class="titlebar-btn" id="ring-toggle" title="Members">\u25BC</button>
      </div>
      <div class="bar">
        <a class="nav-btn" href="${a?.url||"#"}" title="${a?.name||"previous"}">\u25C4 Prev</a>
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
  `;let l=s.getElementById("ring-toggle"),h=s.getElementById("ring-title"),d=s.getElementById("member-list"),p=()=>d?.classList.toggle("expanded");l?.addEventListener("click",p),h?.addEventListener("click",p)}function et(t){return t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}function Oe(t){return{...t,name:et(t.name),members:t.members.map(e=>({...e,name:et(e.name),url:et(e.url)}))}}async function Be(t){try{let e=new AbortController,n=setTimeout(()=>e.abort(),3e3),r=t.endsWith("/webring.json")?t:`${t.replace(/\/$/,"")}/webring.json`,s=await fetch(r,{signal:e.signal});if(clearTimeout(n),!s.ok)return null;let o=await s.json();return Array.isArray(o)?o:null}catch{return null}}async function sn(){let t=document.currentScript||document.querySelector("script[data-ring]");if(!t)return;let e=t.getAttribute("data-ring");if(!e)return;let n=window.location.origin,r=document.createElement("div");t.parentNode?.insertBefore(r,t.nextSibling),N(r,null,n,"loading");let s=e.split(",").map(p=>p.trim()).filter(Boolean);if(s.length===0){N(r,null,n,"error");return}let o=new Set,c=(await Promise.all(s.map(async p=>{o.add(p);let i=await Be(p);return{url:p,ops:i}}))).filter(p=>p.ops!==null);if(c.length===0){N(r,null,n,"error");return}let f=Kt();for(let{url:p,ops:i}of c){let x=xt(i,f,p,!0);f=gt(f,bt(x))}for(;;){let i=yt(f).members.filter(y=>!o.has(y.url));if(i.length===0)break;let x=await Promise.all(i.map(async y=>{o.add(y.url);let b=await Be(y.url);return{url:y.url,ops:b}}));for(let{url:y,ops:b}of x)if(b){let m=xt(b,f,y,!1);f=gt(f,bt(m))}}let l=yt(f),h=Oe(l),d=et(n);h.members.length===0?N(r,h,d,"empty"):N(r,h,d,"loaded")}sn();})();
/*! Bundled license information:

@noble/hashes/esm/utils.js:
  (*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

@noble/ed25519/index.js:
  (*! noble-ed25519 - MIT License (c) 2019 Paul Miller (paulmillr.com) *)
*/
