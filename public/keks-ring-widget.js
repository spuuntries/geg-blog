"use strict";var DaRing=(()=>{function He(t){return t instanceof Uint8Array||ArrayBuffer.isView(t)&&t.constructor.name==="Uint8Array"}function Y(t,...e){if(!He(t))throw new Error("Uint8Array expected");if(e.length>0&&!e.includes(t.length))throw new Error("Uint8Array expected of length "+e+", got length="+t.length)}function kt(t,e=!0){if(t.destroyed)throw new Error("Hash instance has been destroyed");if(e&&t.finished)throw new Error("Hash#digest() has already been called")}function Wt(t,e){Y(t);let n=e.outputLen;if(t.length<n)throw new Error("digestInto() expects output buffer of length at least "+n)}function F(...t){for(let e=0;e<t.length;e++)t[e].fill(0)}function it(t){return new DataView(t.buffer,t.byteOffset,t.byteLength)}function S(t,e){return t<<32-e|t>>>e}var Zt=typeof Uint8Array.from([]).toHex=="function"&&typeof Uint8Array.fromHex=="function",Le=Array.from({length:256},(t,e)=>e.toString(16).padStart(2,"0"));function Pt(t){if(Y(t),Zt)return t.toHex();let e="";for(let n=0;n<t.length;n++)e+=Le[t[n]];return e}var _={_0:48,_9:57,A:65,F:70,a:97,f:102};function Nt(t){if(t>=_._0&&t<=_._9)return t-_._0;if(t>=_.A&&t<=_.F)return t-(_.A-10);if(t>=_.a&&t<=_.f)return t-(_.a-10)}function Ot(t){if(typeof t!="string")throw new Error("hex string expected, got "+typeof t);if(Zt)return Uint8Array.fromHex(t);let e=t.length,n=e/2;if(e%2)throw new Error("hex string expected, got unpadded hex of length "+e);let r=new Uint8Array(n);for(let s=0,o=0;s<n;s++,o+=2){let a=Nt(t.charCodeAt(o)),c=Nt(t.charCodeAt(o+1));if(a===void 0||c===void 0){let l=t[o]+t[o+1];throw new Error('hex string expected, got non-hex character "'+l+'" at index '+o)}r[s]=a*16+c}return r}function Ee(t){if(typeof t!="string")throw new Error("string expected");return new Uint8Array(new TextEncoder().encode(t))}function Bt(t){return typeof t=="string"&&(t=Ee(t)),Y(t),t}var ot=class{};function St(t){let e=r=>t().update(Bt(r)).digest(),n=t();return e.outputLen=n.outputLen,e.blockLen=n.blockLen,e.create=()=>t(),e}function Re(t,e,n,r){if(typeof t.setBigUint64=="function")return t.setBigUint64(e,n,r);let s=BigInt(32),o=BigInt(4294967295),a=Number(n>>s&o),c=Number(n&o),l=r?4:0,d=r?0:4;t.setUint32(e+l,a,r),t.setUint32(e+d,c,r)}function Xt(t,e,n){return t&e^~t&n}function Yt(t,e,n){return t&e^t&n^e&n}var q=class extends ot{constructor(e,n,r,s){super(),this.finished=!1,this.length=0,this.pos=0,this.destroyed=!1,this.blockLen=e,this.outputLen=n,this.padOffset=r,this.isLE=s,this.buffer=new Uint8Array(e),this.view=it(this.buffer)}update(e){kt(this),e=Bt(e),Y(e);let{view:n,buffer:r,blockLen:s}=this,o=e.length;for(let a=0;a<o;){let c=Math.min(s-this.pos,o-a);if(c===s){let l=it(e);for(;s<=o-a;a+=s)this.process(l,a);continue}r.set(e.subarray(a,a+c),this.pos),this.pos+=c,a+=c,this.pos===s&&(this.process(n,0),this.pos=0)}return this.length+=e.length,this.roundClean(),this}digestInto(e){kt(this),Wt(e,this),this.finished=!0;let{buffer:n,view:r,blockLen:s,isLE:o}=this,{pos:a}=this;n[a++]=128,F(this.buffer.subarray(a)),this.padOffset>s-a&&(this.process(r,0),a=0);for(let f=a;f<s;f++)n[f]=0;Re(r,s-8,BigInt(this.length*8),o),this.process(r,0);let c=it(e),l=this.outputLen;if(l%4)throw new Error("_sha2: outputLen should be aligned to 32bit");let d=l/4,p=this.get();if(d>p.length)throw new Error("_sha2: outputLen bigger than state");for(let f=0;f<d;f++)c.setUint32(4*f,p[f],o)}digest(){let{buffer:e,outputLen:n}=this;this.digestInto(e);let r=e.slice(0,n);return this.destroy(),r}_cloneInto(e){e||(e=new this.constructor),e.set(...this.get());let{blockLen:n,buffer:r,length:s,finished:o,destroyed:a,pos:c}=this;return e.destroyed=a,e.finished=o,e.length=s,e.pos=c,s%n&&e.buffer.set(r),e}clone(){return this._cloneInto()}},C=Uint32Array.from([1779033703,3144134277,1013904242,2773480762,1359893119,2600822924,528734635,1541459225]);var A=Uint32Array.from([1779033703,4089235720,3144134277,2227873595,1013904242,4271175723,2773480762,1595750129,1359893119,2917565137,2600822924,725511199,528734635,4215389547,1541459225,327033209]);var at=BigInt(4294967295),qt=BigInt(32);function _e(t,e=!1){return e?{h:Number(t&at),l:Number(t>>qt&at)}:{h:Number(t>>qt&at)|0,l:Number(t&at)|0}}function Jt(t,e=!1){let n=t.length,r=new Uint32Array(n),s=new Uint32Array(n);for(let o=0;o<n;o++){let{h:a,l:c}=_e(t[o],e);[r[o],s[o]]=[a,c]}return[r,s]}var Ht=(t,e,n)=>t>>>n,Lt=(t,e,n)=>t<<32-n|e>>>n,K=(t,e,n)=>t>>>n|e<<32-n,D=(t,e,n)=>t<<32-n|e>>>n,J=(t,e,n)=>t<<64-n|e>>>n-32,Q=(t,e,n)=>t>>>n-32|e<<64-n;function H(t,e,n,r){let s=(e>>>0)+(r>>>0);return{h:t+n+(s/2**32|0)|0,l:s|0}}var Qt=(t,e,n)=>(t>>>0)+(e>>>0)+(n>>>0),te=(t,e,n,r)=>e+n+r+(t/2**32|0)|0,ee=(t,e,n,r)=>(t>>>0)+(e>>>0)+(n>>>0)+(r>>>0),ne=(t,e,n,r,s)=>e+n+r+s+(t/2**32|0)|0,re=(t,e,n,r,s)=>(t>>>0)+(e>>>0)+(n>>>0)+(r>>>0)+(s>>>0),se=(t,e,n,r,s,o)=>e+n+r+s+o+(t/2**32|0)|0;var Ue=Uint32Array.from([1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298]),T=new Uint32Array(64),ct=class extends q{constructor(e=32){super(64,e,8,!1),this.A=C[0]|0,this.B=C[1]|0,this.C=C[2]|0,this.D=C[3]|0,this.E=C[4]|0,this.F=C[5]|0,this.G=C[6]|0,this.H=C[7]|0}get(){let{A:e,B:n,C:r,D:s,E:o,F:a,G:c,H:l}=this;return[e,n,r,s,o,a,c,l]}set(e,n,r,s,o,a,c,l){this.A=e|0,this.B=n|0,this.C=r|0,this.D=s|0,this.E=o|0,this.F=a|0,this.G=c|0,this.H=l|0}process(e,n){for(let f=0;f<16;f++,n+=4)T[f]=e.getUint32(n,!1);for(let f=16;f<64;f++){let h=T[f-15],i=T[f-2],x=S(h,7)^S(h,18)^h>>>3,y=S(i,17)^S(i,19)^i>>>10;T[f]=y+T[f-7]+x+T[f-16]|0}let{A:r,B:s,C:o,D:a,E:c,F:l,G:d,H:p}=this;for(let f=0;f<64;f++){let h=S(c,6)^S(c,11)^S(c,25),i=p+h+Xt(c,l,d)+Ue[f]+T[f]|0,y=(S(r,2)^S(r,13)^S(r,22))+Yt(r,s,o)|0;p=d,d=l,l=c,c=a+i|0,a=o,o=s,s=r,r=i+y|0}r=r+this.A|0,s=s+this.B|0,o=o+this.C|0,a=a+this.D|0,c=c+this.E|0,l=l+this.F|0,d=d+this.G|0,p=p+this.H|0,this.set(r,s,o,a,c,l,d,p)}roundClean(){F(T)}destroy(){this.set(0,0,0,0,0,0,0,0),F(this.buffer)}};var oe=Jt(["0x428a2f98d728ae22","0x7137449123ef65cd","0xb5c0fbcfec4d3b2f","0xe9b5dba58189dbbc","0x3956c25bf348b538","0x59f111f1b605d019","0x923f82a4af194f9b","0xab1c5ed5da6d8118","0xd807aa98a3030242","0x12835b0145706fbe","0x243185be4ee4b28c","0x550c7dc3d5ffb4e2","0x72be5d74f27b896f","0x80deb1fe3b1696b1","0x9bdc06a725c71235","0xc19bf174cf692694","0xe49b69c19ef14ad2","0xefbe4786384f25e3","0x0fc19dc68b8cd5b5","0x240ca1cc77ac9c65","0x2de92c6f592b0275","0x4a7484aa6ea6e483","0x5cb0a9dcbd41fbd4","0x76f988da831153b5","0x983e5152ee66dfab","0xa831c66d2db43210","0xb00327c898fb213f","0xbf597fc7beef0ee4","0xc6e00bf33da88fc2","0xd5a79147930aa725","0x06ca6351e003826f","0x142929670a0e6e70","0x27b70a8546d22ffc","0x2e1b21385c26c926","0x4d2c6dfc5ac42aed","0x53380d139d95b3df","0x650a73548baf63de","0x766a0abb3c77b2a8","0x81c2c92e47edaee6","0x92722c851482353b","0xa2bfe8a14cf10364","0xa81a664bbc423001","0xc24b8b70d0f89791","0xc76c51a30654be30","0xd192e819d6ef5218","0xd69906245565a910","0xf40e35855771202a","0x106aa07032bbd1b8","0x19a4c116b8d2d0c8","0x1e376c085141ab53","0x2748774cdf8eeb99","0x34b0bcb5e19b48a8","0x391c0cb3c5c95a63","0x4ed8aa4ae3418acb","0x5b9cca4f7763e373","0x682e6ff3d6b2b8a3","0x748f82ee5defb2fc","0x78a5636f43172f60","0x84c87814a1f0ab72","0x8cc702081a6439ec","0x90befffa23631e28","0xa4506cebde82bde9","0xbef9a3f7b2c67915","0xc67178f2e372532b","0xca273eceea26619c","0xd186b8c721c0c207","0xeada7dd6cde0eb1e","0xf57d4f7fee6ed178","0x06f067aa72176fba","0x0a637dc5a2c898a6","0x113f9804bef90dae","0x1b710b35131c471b","0x28db77f523047d84","0x32caab7b40c72493","0x3c9ebe0a15c9bebc","0x431d67c49c100d4c","0x4cc5d4becb3e42b6","0x597f299cfc657e2a","0x5fcb6fab3ad6faec","0x6c44198c4a475817"].map(t=>BigInt(t))),Me=oe[0],Te=oe[1],V=new Uint32Array(80),I=new Uint32Array(80),ft=class extends q{constructor(e=64){super(128,e,16,!1),this.Ah=A[0]|0,this.Al=A[1]|0,this.Bh=A[2]|0,this.Bl=A[3]|0,this.Ch=A[4]|0,this.Cl=A[5]|0,this.Dh=A[6]|0,this.Dl=A[7]|0,this.Eh=A[8]|0,this.El=A[9]|0,this.Fh=A[10]|0,this.Fl=A[11]|0,this.Gh=A[12]|0,this.Gl=A[13]|0,this.Hh=A[14]|0,this.Hl=A[15]|0}get(){let{Ah:e,Al:n,Bh:r,Bl:s,Ch:o,Cl:a,Dh:c,Dl:l,Eh:d,El:p,Fh:f,Fl:h,Gh:i,Gl:x,Hh:y,Hl:g}=this;return[e,n,r,s,o,a,c,l,d,p,f,h,i,x,y,g]}set(e,n,r,s,o,a,c,l,d,p,f,h,i,x,y,g){this.Ah=e|0,this.Al=n|0,this.Bh=r|0,this.Bl=s|0,this.Ch=o|0,this.Cl=a|0,this.Dh=c|0,this.Dl=l|0,this.Eh=d|0,this.El=p|0,this.Fh=f|0,this.Fl=h|0,this.Gh=i|0,this.Gl=x|0,this.Hh=y|0,this.Hl=g|0}process(e,n){for(let b=0;b<16;b++,n+=4)V[b]=e.getUint32(n),I[b]=e.getUint32(n+=4);for(let b=16;b<80;b++){let w=V[b-15]|0,O=I[b-15]|0,P=K(w,O,1)^K(w,O,8)^Ht(w,O,7),X=D(w,O,1)^D(w,O,8)^Lt(w,O,7),E=V[b-2]|0,R=I[b-2]|0,rt=K(E,R,19)^J(E,R,61)^Ht(E,R,6),vt=D(E,R,19)^Q(E,R,61)^Lt(E,R,6),st=ee(X,vt,I[b-7],I[b-16]),At=ne(st,P,rt,V[b-7],V[b-16]);V[b]=At|0,I[b]=st|0}let{Ah:r,Al:s,Bh:o,Bl:a,Ch:c,Cl:l,Dh:d,Dl:p,Eh:f,El:h,Fh:i,Fl:x,Gh:y,Gl:g,Hh:m,Hl:v}=this;for(let b=0;b<80;b++){let w=K(f,h,14)^K(f,h,18)^J(f,h,41),O=D(f,h,14)^D(f,h,18)^Q(f,h,41),P=f&i^~f&y,X=h&x^~h&g,E=re(v,O,X,Te[b],I[b]),R=se(E,m,w,P,Me[b],V[b]),rt=E|0,vt=K(r,s,28)^J(r,s,34)^J(r,s,39),st=D(r,s,28)^Q(r,s,34)^Q(r,s,39),At=r&o^r&c^o&c,Se=s&a^s&l^a&l;m=y|0,v=g|0,y=i|0,g=x|0,i=f|0,x=h|0,{h:f,l:h}=H(d|0,p|0,R|0,rt|0),d=c|0,p=l|0,c=o|0,l=a|0,o=r|0,a=s|0;let jt=Qt(rt,st,Se);r=te(jt,R,vt,At),s=jt|0}({h:r,l:s}=H(this.Ah|0,this.Al|0,r|0,s|0)),{h:o,l:a}=H(this.Bh|0,this.Bl|0,o|0,a|0),{h:c,l}=H(this.Ch|0,this.Cl|0,c|0,l|0),{h:d,l:p}=H(this.Dh|0,this.Dl|0,d|0,p|0),{h:f,l:h}=H(this.Eh|0,this.El|0,f|0,h|0),{h:i,l:x}=H(this.Fh|0,this.Fl|0,i|0,x|0),{h:y,l:g}=H(this.Gh|0,this.Gl|0,y|0,g|0),{h:m,l:v}=H(this.Hh|0,this.Hl|0,m|0,v|0),this.set(r,s,o,a,c,l,d,p,f,h,i,x,y,g,m,v)}roundClean(){F(V,I)}destroy(){F(this.buffer),this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0)}};var ie=St(()=>new ct);var ae=St(()=>new ft);var ce=ae;var Ve={p:0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffedn,n:0x1000000000000000000000000000000014def9dea2f79cd65812631a5cf5d3edn,h:8n,a:0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffecn,d:0x52036cee2b6ffe738cc740797779e89800700a4d4141d8ab75eb4dca135978a3n,Gx:0x216936d3cd6e53fec0a4e231fdd6dc5c692cc7609525a7b2c9562d608f25d51an,Gy:0x6666666666666666666666666666666666666666666666666666666666666658n},{p:k,n:lt,Gx:fe,Gy:le,a:Et,d:Rt}=Ve,Ie=8n,tt=32,_t=64,B=(t="")=>{throw new Error(t)},Ge=t=>typeof t=="bigint",be=t=>typeof t=="string",Fe=t=>t instanceof Uint8Array||ArrayBuffer.isView(t)&&t.constructor.name==="Uint8Array",j=(t,e)=>!Fe(t)||typeof e=="number"&&e>0&&t.length!==e?B("Uint8Array expected"):t,ut=t=>new Uint8Array(t),Tt=t=>Uint8Array.from(t),ge=(t,e)=>t.toString(16).padStart(e,"0"),Vt=t=>Array.from(j(t)).map(e=>ge(e,2)).join(""),U={_0:48,_9:57,A:65,F:70,a:97,f:102},de=t=>{if(t>=U._0&&t<=U._9)return t-U._0;if(t>=U.A&&t<=U.F)return t-(U.A-10);if(t>=U.a&&t<=U.f)return t-(U.a-10)},It=t=>{let e="hex invalid";if(!be(t))return B(e);let n=t.length,r=n/2;if(n%2)return B(e);let s=ut(r);for(let o=0,a=0;o<r;o++,a+=2){let c=de(t.charCodeAt(a)),l=de(t.charCodeAt(a+1));if(c===void 0||l===void 0)return B(e);s[o]=c*16+l}return s},dt=(t,e)=>j(be(t)?It(t):Tt(j(t)),e),ye=()=>globalThis?.crypto,Ke=()=>ye()?.subtle??B("crypto.subtle must be defined"),Ct=(...t)=>{let e=ut(t.reduce((r,s)=>r+j(s).length,0)),n=0;return t.forEach(r=>{e.set(r,n),n+=r.length}),e},De=(t=tt)=>ye().getRandomValues(ut(t)),pt=BigInt,$=(t,e,n,r="bad number: out of range")=>Ge(t)&&e<=t&&t<n?t:B(r),u=(t,e=k)=>{let n=t%e;return n>=0n?n:e+n},$e=t=>u(t,lt),me=(t,e)=>{(t===0n||e<=0n)&&B("no inverse n="+t+" mod="+e);let n=u(t,e),r=e,s=0n,o=1n,a=1n,c=0n;for(;n!==0n;){let l=r/n,d=r%n,p=s-a*l,f=o-c*l;r=n,n=d,s=a,o=c,a=p,c=f}return r===1n?u(s,e):B("no inverse")},ze=t=>{let e=Ft[t];return typeof e!="function"&&B("hashes."+t+" not set"),e},pe=t=>t instanceof M?t:B("Point expected"),Ut=2n**256n,M=class t{static BASE;static ZERO;ex;ey;ez;et;constructor(e,n,r,s){let o=Ut;this.ex=$(e,0n,o),this.ey=$(n,0n,o),this.ez=$(r,1n,o),this.et=$(s,0n,o),Object.freeze(this)}static fromAffine(e){return new t(e.x,e.y,1n,u(e.x*e.y))}static fromBytes(e,n=!1){let r=Rt,s=Tt(j(e,tt)),o=e[31];s[31]=o&-129;let a=Gt(s);$(a,0n,n?Ut:k);let l=u(a*a),d=u(l-1n),p=u(r*l+1n),{isValid:f,value:h}=We(d,p);f||B("bad point: y not sqrt");let i=(h&1n)===1n,x=(o&128)!==0;return!n&&h===0n&&x&&B("bad point: x==0, isLastByteOdd"),x!==i&&(h=u(-h)),new t(h,a,1n,u(h*a))}assertValidity(){let e=Et,n=Rt,r=this;if(r.is0())throw new Error("bad point: ZERO");let{ex:s,ey:o,ez:a,et:c}=r,l=u(s*s),d=u(o*o),p=u(a*a),f=u(p*p),h=u(l*e),i=u(p*u(h+d)),x=u(f+u(n*u(l*d)));if(i!==x)throw new Error("bad point: equation left != right (1)");let y=u(s*o),g=u(a*c);if(y!==g)throw new Error("bad point: equation left != right (2)");return this}equals(e){let{ex:n,ey:r,ez:s}=this,{ex:o,ey:a,ez:c}=pe(e),l=u(n*c),d=u(o*s),p=u(r*c),f=u(a*s);return l===d&&p===f}is0(){return this.equals(z)}negate(){return new t(u(-this.ex),this.ey,this.ez,u(-this.et))}double(){let{ex:e,ey:n,ez:r}=this,s=Et,o=u(e*e),a=u(n*n),c=u(2n*u(r*r)),l=u(s*o),d=e+n,p=u(u(d*d)-o-a),f=l+a,h=f-c,i=l-a,x=u(p*h),y=u(f*i),g=u(p*i),m=u(h*f);return new t(x,y,m,g)}add(e){let{ex:n,ey:r,ez:s,et:o}=this,{ex:a,ey:c,ez:l,et:d}=pe(e),p=Et,f=Rt,h=u(n*a),i=u(r*c),x=u(o*f*d),y=u(s*l),g=u((n+r)*(a+c)-h-i),m=u(y-x),v=u(y+x),b=u(i-p*h),w=u(g*m),O=u(v*b),P=u(g*b),X=u(m*v);return new t(w,O,X,P)}multiply(e,n=!0){if(!n&&(e===0n||this.is0()))return z;if($(e,1n,lt),e===1n)return this;if(this.equals(N))return Qe(e).p;let r=z,s=N;for(let o=this;e>0n;o=o.double(),e>>=1n)e&1n?r=r.add(o):n&&(s=s.add(o));return r}toAffine(){let{ex:e,ey:n,ez:r}=this;if(this.equals(z))return{x:0n,y:1n};let s=me(r,k);return u(r*s)!==1n&&B("invalid inverse"),{x:u(e*s),y:u(n*s)}}toBytes(){let{x:e,y:n}=this.assertValidity().toAffine(),r=je(n);return r[31]|=e&1n?128:0,r}toHex(){return Vt(this.toBytes())}clearCofactor(){return this.multiply(pt(Ie),!1)}isSmallOrder(){return this.clearCofactor().is0()}isTorsionFree(){let e=this.multiply(lt/2n,!1).double();return lt%2n&&(e=e.add(this)),e.is0()}static fromHex(e,n){return t.fromBytes(dt(e),n)}get x(){return this.toAffine().x}get y(){return this.toAffine().y}toRawBytes(){return this.toBytes()}},N=new M(fe,le,1n,u(fe*le)),z=new M(0n,1n,1n,0n);M.BASE=N;M.ZERO=z;var je=t=>It(ge($(t,0n,Ut),_t)).reverse(),Gt=t=>pt("0x"+Vt(Tt(j(t)).reverse())),L=(t,e)=>{let n=t;for(;e-- >0n;)n*=n,n%=k;return n},Ne=t=>{let n=t*t%k*t%k,r=L(n,2n)*n%k,s=L(r,1n)*t%k,o=L(s,5n)*s%k,a=L(o,10n)*o%k,c=L(a,20n)*a%k,l=L(c,40n)*c%k,d=L(l,80n)*l%k,p=L(d,80n)*l%k,f=L(p,10n)*o%k;return{pow_p_5_8:L(f,2n)*t%k,b2:n}},he=0x2b8324804fc1df0b2b4d00993dfbd7a72f431806ad2fe478c4ee1b274a0ea0b0n,We=(t,e)=>{let n=u(e*e*e),r=u(n*n*e),s=Ne(t*r).pow_p_5_8,o=u(t*n*s),a=u(e*o*o),c=o,l=u(o*he),d=a===t,p=a===u(-t),f=a===u(-t*he);return d&&(o=c),(p||f)&&(o=l),(u(o)&1n)===1n&&(o=u(-o)),{isValid:d||p,value:o}},Ze=t=>$e(Gt(t));var Pe=(...t)=>ze("sha512Sync")(...t);var Xe=t=>t.finish(Pe(t.hashable));var we={zip215:!0},Ye=(t,e,n,r=we)=>{t=dt(t,_t),e=dt(e),n=dt(n,tt);let{zip215:s}=r,o,a,c,l,d=Uint8Array.of();try{o=M.fromHex(n,s),a=M.fromHex(t.slice(0,tt),s),c=Gt(t.slice(tt,_t)),l=N.multiply(c,!1),d=Ct(a.toBytes(),o.toBytes(),e)}catch{}return{hashable:d,finish:f=>{if(l==null||!s&&o.isSmallOrder())return!1;let h=Ze(f);return a.add(o.multiply(h,!1)).add(l.negate()).clearCofactor().is0()}}};var ve=(t,e,n,r=we)=>Xe(Ye(t,e,n,r)),Ft={sha512Async:async(...t)=>{let e=Ke(),n=Ct(...t);return ut(await e.digest("SHA-512",n.buffer))},sha512Sync:void 0,bytesToHex:Vt,hexToBytes:It,concatBytes:Ct,mod:u,invert:me,randomBytes:De};var ht=8,qe=256,Ae=Math.ceil(qe/ht)+1,Mt=2**(ht-1),Je=()=>{let t=[],e=N,n=e;for(let r=0;r<Ae;r++){n=e,t.push(n);for(let s=1;s<Mt;s++)n=n.add(e),t.push(n);e=n.double()}return t},ue,xe=(t,e)=>{let n=e.negate();return t?n:e},Qe=t=>{let e=ue||(ue=Je()),n=z,r=N,s=2**ht,o=s,a=pt(s-1),c=pt(ht);for(let l=0;l<Ae;l++){let d=Number(t&a);t>>=c,d>Mt&&(d-=o,t+=1n);let p=l*Mt,f=p,h=p+Math.abs(d)-1,i=l%2!==0,x=d<0;d===0?r=r.add(xe(i,e[f])):n=n.add(xe(x,e[h]))}return{p:n,f:r}};var ke=ie;Ft.sha512Sync=(...t)=>{let e=ce.create();for(let n of t)e.update(n);return e.digest()};function et(t,e,n){try{let r=new TextEncoder().encode(t);return ve(Ot(e),r,Ot(n))}catch{return!1}}function nt(t){let e=new TextEncoder().encode(t);return Pt(ke(e))}function en(t,e){let n=[];for(let r of e.values())r.type==="key-claim"&&r.author===t&&n.push(r.payload.pubkey);return n}function xt(t){let e={type:t.type,author:t.author,timestamp:t.timestamp,seen:[...t.seen].sort(),payload:t.type==="leave"?{}:t.payload};return JSON.stringify(e)}function W(t){try{let e=new URL(t);return e.protocol==="http:"||e.protocol==="https:"}catch{return!1}}function bt(t,e,n,r=!1){let s=[],o=new Map(e),a=d=>{try{return new URL(d).origin}catch{return d}},c=a(n);for(let d of t)if(d.type==="key-claim"){let p=d;if(!W(p.author)||!r&&a(p.author)!==c)continue;let f=xt(p);et(f,p.sig,p.payload.pubkey)&&(o.set(p.id,p),s.push(p))}let l=[...e.values()].some(d=>d.type==="genesis");for(let d of t){if(d.type==="key-claim"||d.type==="genesis"&&(l&&!e.has(d.id)||!W(d.author))||d.type==="add"&&!W(d.payload.target))continue;let p=en(d.author,o);if(p.length===0)continue;let f=xt(d),h=!1;for(let i of p)if(et(f,d.sig,i)){h=!0;break}h&&(o.set(d.id,d),s.push(d))}return s}var Kt=new Map;function nn(t,e,n){let r=`${e}:${n}`;if(Kt.has(r))return Kt.get(r);let s=et(t,e,n);return Kt.set(r,s),s}function Dt(){return new Map}function gt(t){let e=new Map;for(let n of t)e.set(n.id,n);return e}function yt(t,e){let n=new Map(t);for(let[r,s]of e)n.has(r)||n.set(r,s);return n}function rn(t){let e=[...t.values()],n=new Set,r=[];function s(o){if(!n.has(o.id)){n.add(o.id);for(let a of o.seen){let c=t.get(a);c&&s(c)}r.push(o)}}e.sort((o,a)=>o.id.localeCompare(a.id));for(let o of e)s(o);return r}function mt(t){let e=rn(t),n=new Map,r=new Map,s=new Map,o=new Set,a=new Map,c=null,l="webring",d=2,p=new Set;for(let h of e){if(h.type==="add"||h.type==="revoke"||h.type==="leave"){let i=n.get(h.author);if(!i||!i.pubkey)continue;let x=xt(h);if(!nn(x,h.sig,i.pubkey))continue}switch(h.type){case"genesis":{let i=h;c=i,l=i.payload.name,d=i.payload.inviteBudget,n.set(i.author,{url:i.author,name:i.author,invitedBy:null,pubkey:null,isActive:!1,depth:0}),r.set(i.author,[]),a.set(i.author,0);break}case"add":{let i=h;if(!n.has(i.author)||p.has(i.author)||n.has(i.payload.target))break;let x=a.get(i.author)??0;if(x>=d)break;p.delete(i.payload.target);let y=n.get(i.author);n.set(i.payload.target,{url:i.payload.target,name:i.payload.name,invitedBy:i.author,pubkey:null,isActive:!1,depth:y.depth+1}),s.set(i.payload.target,i.author);let g=r.get(i.author)??[];g.push(i.payload.target),r.set(i.author,g),r.has(i.payload.target)||r.set(i.payload.target,[]),a.set(i.author,x+1);break}case"key-claim":{let i=h,x=n.get(i.author);if(!x||p.has(i.author))break;x.pubkey=i.payload.pubkey,x.isActive=!0,o.add(i.author);break}case"revoke":{let i=h;if(p.has(i.author)||s.get(i.payload.target)!==i.author)break;if(i.payload.reparent){let x=i.payload.target;p.add(x),n.delete(x),o.delete(x);let y=r.get(i.author)??[];r.set(i.author,y.filter(b=>b!==x)),s.delete(x);let g=r.get(x)??[],m=r.get(i.author)??[];for(let b of g){s.set(b,i.author);let w=n.get(b);if(w){w.invitedBy=i.author;let O=n.get(i.author);O&&(w.depth=O.depth+1)}m.push(b)}r.set(i.author,m),r.delete(x);let v=a.get(i.author)??0;a.set(i.author,Math.max(0,v-1))}else{let x=[i.payload.target];for(;x.length>0;){let g=x.pop();if(p.has(g))continue;p.add(g),n.delete(g),o.delete(g);let m=s.get(g);if(m){let b=r.get(m)??[];r.set(m,b.filter(w=>w!==g))}s.delete(g);let v=r.get(g)??[];x.push(...v)}let y=a.get(i.author)??0;a.set(i.author,Math.max(0,y-1))}break}case"leave":{let i=h;if(!n.has(i.author)||p.has(i.author))break;let x=s.get(i.author),y=r.get(i.author)??[];if(x){let g=r.get(x)??[];for(let v of y){s.set(v,x);let b=n.get(v);if(b){b.invitedBy=x;let w=n.get(x);w&&(b.depth=w.depth+1)}g.push(v)}r.set(x,g.filter(v=>v!==i.author));let m=a.get(x)??0;a.set(x,Math.max(0,m-1))}n.delete(i.author),o.delete(i.author),r.delete(i.author);break}}}let f=new Map;for(let[h]of n){let i=a.get(h)??0;f.set(h,d-i)}return{name:l,inviteBudget:d,members:Oe([...n.values()]),inviteTree:r,activeMembers:[...o],inviteSlots:f,genesis:c}}function Oe(t){return[...t].sort((e,n)=>{let r=nt(e.url),s=nt(n.url);return r.localeCompare(s)})}function $t(t,e){if(t.length===0)return{prev:null,next:null};let n=t.findIndex(o=>o.url===e);if(n===-1)return{prev:t[t.length-1],next:t[0]};let r=t[(n-1+t.length)%t.length],s=t[(n+1)%t.length];return{prev:r,next:s}}function G(t){return t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function zt(t){return W(t)?t:"#"}var wt=`
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
`;function Z(t,e,n,r="loaded"){t.shadowRoot||t.attachShadow({mode:"open"});let s=t.shadowRoot,o=e?.name||"kek's ring";if(r==="loading"){s.innerHTML=`<style>${wt}</style>
      <div class="widget">
        <div class="titlebar">
          <span class="titlebar-text"><span class="titlebar-icon">\u{1F310}</span> ${o}</span>
        </div>
        <div class="status-msg"><span class="loading-blink">\u25A0</span> Loading ring...</div>
      </div>`;return}if(r==="error"){s.innerHTML=`<style>${wt}</style>
      <div class="widget">
        <div class="titlebar">
          <span class="titlebar-text"><span class="titlebar-icon">\u{1F310}</span> ${o}</span>
        </div>
        <div class="status-msg">\u26A0 Ring unavailable</div>
      </div>`;return}if(r==="empty"||!e||e.members.length===0){s.innerHTML=`<style>${wt}</style>
      <div class="widget">
        <div class="titlebar">
          <span class="titlebar-text"><span class="titlebar-icon">\u{1F310}</span> ${o}</span>
        </div>
        <div class="status-msg">Ring is empty</div>
      </div>`;return}let{prev:a,next:c}=$t(e.members,n),l=e.members.map(i=>{let x=i.url===n,y=G(i.url);return`<a class="member-item${x?" current":""}" href="${G(zt(i.url))}">${y}<span class="member-name">${G(i.name)}</span></a>`}).join("");s.innerHTML=`
    <style>${wt}</style>
    <div class="widget">
      <div class="titlebar">
        <span class="titlebar-text"><span class="titlebar-icon">\u{1F310}</span> ${e.name}</span>
        <button class="titlebar-btn" id="ring-toggle" title="Members">\u25BC</button>
      </div>
      <div class="bar">
        <a class="nav-link" href="${G(zt(a?.url||"#"))}" title="${G(a?.name||"previous")}">\u2190 prev</a>
        <div class="center" id="ring-title">
          <span class="accent">\u2726</span> ${G(e.name)} <span class="accent">\u2726</span>
        </div>
        <a class="nav-link" href="${G(zt(c?.url||"#"))}" title="${G(c?.name||"next")}">next \u2192</a>
      </div>
      <div class="member-list" id="member-list">
        ${l}
      </div>
      <div class="statusbar">
        <span class="statusbar-panel">Ring: ${e.name}</span>
      </div>
    </div>
  `;let d=s.getElementById("ring-toggle"),p=s.getElementById("ring-title"),f=s.getElementById("member-list"),h=()=>f?.classList.toggle("expanded");d?.addEventListener("click",h),p?.addEventListener("click",h)}async function Be(t){try{let e=new AbortController,n=setTimeout(()=>e.abort(),3e3),r=t.endsWith("/webring.json")?t:`${t.replace(/\/$/,"")}/webring.json`,s=await fetch(r,{signal:e.signal});if(clearTimeout(n),!s.ok)return null;let o=await s.json();return Array.isArray(o)?o:null}catch{return null}}async function sn(){let t=document.currentScript||document.querySelector("script[data-ring]");if(!t)return;let e=t.getAttribute("data-ring");if(!e)return;let n=window.location.origin,r=document.createElement("div");t.parentNode?.insertBefore(r,t.nextSibling),Z(r,null,n,"loading");let s=e.split(",").map(p=>p.trim()).filter(Boolean);if(s.length===0){Z(r,null,n,"error");return}let o=new Set,c=(await Promise.all(s.map(async p=>{o.add(p);let f=await Be(p);return{url:p,ops:f}}))).filter(p=>p.ops!==null);if(c.length===0){Z(r,null,n,"error");return}let l=Dt();for(let{url:p,ops:f}of c){let h=bt(f,l,p,!0);l=yt(l,gt(h))}for(;;){let f=mt(l).members.filter(i=>!o.has(i.url));if(f.length===0)break;let h=await Promise.all(f.map(async i=>{o.add(i.url);let x=await Be(i.url);return{url:i.url,ops:x}}));for(let{url:i,ops:x}of h)if(x){let y=bt(x,l,i,!1);l=yt(l,gt(y))}}let d=mt(l);d.members.length===0?Z(r,d,n,"empty"):Z(r,d,n,"loaded")}sn();})();
/*! Bundled license information:

@noble/hashes/esm/utils.js:
  (*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

@noble/ed25519/index.js:
  (*! noble-ed25519 - MIT License (c) 2019 Paul Miller (paulmillr.com) *)
*/
