"use strict";var DaRing=(()=>{function ke(t){return t instanceof Uint8Array||ArrayBuffer.isView(t)&&t.constructor.name==="Uint8Array"}function Z(t,...e){if(!ke(t))throw new Error("Uint8Array expected");if(e.length>0&&!e.includes(t.length))throw new Error("Uint8Array expected of length "+e+", got length="+t.length)}function mt(t,e=!0){if(t.destroyed)throw new Error("Hash instance has been destroyed");if(e&&t.finished)throw new Error("Hash#digest() has already been called")}function Dt(t,e){Z(t);let n=e.outputLen;if(t.length<n)throw new Error("digestInto() expects output buffer of length at least "+n)}function G(...t){for(let e=0;e<t.length;e++)t[e].fill(0)}function st(t){return new DataView(t.buffer,t.byteOffset,t.byteLength)}function B(t,e){return t<<32-e|t>>>e}var $t=typeof Uint8Array.from([]).toHex=="function"&&typeof Uint8Array.fromHex=="function",Be=Array.from({length:256},(t,e)=>e.toString(16).padStart(2,"0"));function zt(t){if(Z(t),$t)return t.toHex();let e="";for(let n=0;n<t.length;n++)e+=Be[t[n]];return e}var _={_0:48,_9:57,A:65,F:70,a:97,f:102};function Ft(t){if(t>=_._0&&t<=_._9)return t-_._0;if(t>=_.A&&t<=_.F)return t-(_.A-10);if(t>=_.a&&t<=_.f)return t-(_.a-10)}function wt(t){if(typeof t!="string")throw new Error("hex string expected, got "+typeof t);if($t)return Uint8Array.fromHex(t);let e=t.length,n=e/2;if(e%2)throw new Error("hex string expected, got unpadded hex of length "+e);let s=new Uint8Array(n);for(let r=0,o=0;r<n;r++,o+=2){let i=Ft(t.charCodeAt(o)),c=Ft(t.charCodeAt(o+1));if(i===void 0||c===void 0){let l=t[o]+t[o+1];throw new Error('hex string expected, got non-hex character "'+l+'" at index '+o)}s[r]=i*16+c}return s}function Se(t){if(typeof t!="string")throw new Error("string expected");return new Uint8Array(new TextEncoder().encode(t))}function vt(t){return typeof t=="string"&&(t=Se(t)),Z(t),t}var nt=class{};function At(t){let e=s=>t().update(vt(s)).digest(),n=t();return e.outputLen=n.outputLen,e.blockLen=n.blockLen,e.create=()=>t(),e}function He(t,e,n,s){if(typeof t.setBigUint64=="function")return t.setBigUint64(e,n,s);let r=BigInt(32),o=BigInt(4294967295),i=Number(n>>r&o),c=Number(n&o),l=s?4:0,d=s?0:4;t.setUint32(e+l,i,s),t.setUint32(e+d,c,s)}function jt(t,e,n){return t&e^~t&n}function Nt(t,e,n){return t&e^t&n^e&n}var X=class extends nt{constructor(e,n,s,r){super(),this.finished=!1,this.length=0,this.pos=0,this.destroyed=!1,this.blockLen=e,this.outputLen=n,this.padOffset=s,this.isLE=r,this.buffer=new Uint8Array(e),this.view=st(this.buffer)}update(e){mt(this),e=vt(e),Z(e);let{view:n,buffer:s,blockLen:r}=this,o=e.length;for(let i=0;i<o;){let c=Math.min(r-this.pos,o-i);if(c===r){let l=st(e);for(;r<=o-i;i+=r)this.process(l,i);continue}s.set(e.subarray(i,i+c),this.pos),this.pos+=c,i+=c,this.pos===r&&(this.process(n,0),this.pos=0)}return this.length+=e.length,this.roundClean(),this}digestInto(e){mt(this),Dt(e,this),this.finished=!0;let{buffer:n,view:s,blockLen:r,isLE:o}=this,{pos:i}=this;n[i++]=128,G(this.buffer.subarray(i)),this.padOffset>r-i&&(this.process(s,0),i=0);for(let f=i;f<r;f++)n[f]=0;He(s,r-8,BigInt(this.length*8),o),this.process(s,0);let c=st(e),l=this.outputLen;if(l%4)throw new Error("_sha2: outputLen should be aligned to 32bit");let d=l/4,p=this.get();if(d>p.length)throw new Error("_sha2: outputLen bigger than state");for(let f=0;f<d;f++)c.setUint32(4*f,p[f],o)}digest(){let{buffer:e,outputLen:n}=this;this.digestInto(e);let s=e.slice(0,n);return this.destroy(),s}_cloneInto(e){e||(e=new this.constructor),e.set(...this.get());let{blockLen:n,buffer:s,length:r,finished:o,destroyed:i,pos:c}=this;return e.destroyed=i,e.finished=o,e.length=r,e.pos=c,r%n&&e.buffer.set(s),e}clone(){return this._cloneInto()}},C=Uint32Array.from([1779033703,3144134277,1013904242,2773480762,1359893119,2600822924,528734635,1541459225]);var m=Uint32Array.from([1779033703,4089235720,3144134277,2227873595,1013904242,4271175723,2773480762,1595750129,1359893119,2917565137,2600822924,725511199,528734635,4215389547,1541459225,327033209]);var rt=BigInt(4294967295),Wt=BigInt(32);function Le(t,e=!1){return e?{h:Number(t&rt),l:Number(t>>Wt&rt)}:{h:Number(t>>Wt&rt)|0,l:Number(t&rt)|0}}function Pt(t,e=!1){let n=t.length,s=new Uint32Array(n),r=new Uint32Array(n);for(let o=0;o<n;o++){let{h:i,l:c}=Le(t[o],e);[s[o],r[o]]=[i,c]}return[s,r]}var Ot=(t,e,n)=>t>>>n,kt=(t,e,n)=>t<<32-n|e>>>n,K=(t,e,n)=>t>>>n|e<<32-n,F=(t,e,n)=>t<<32-n|e>>>n,Y=(t,e,n)=>t<<64-n|e>>>n-32,q=(t,e,n)=>t>>>n-32|e<<64-n;function H(t,e,n,s){let r=(e>>>0)+(s>>>0);return{h:t+n+(r/2**32|0)|0,l:r|0}}var Zt=(t,e,n)=>(t>>>0)+(e>>>0)+(n>>>0),Xt=(t,e,n,s)=>e+n+s+(t/2**32|0)|0,Yt=(t,e,n,s)=>(t>>>0)+(e>>>0)+(n>>>0)+(s>>>0),qt=(t,e,n,s,r)=>e+n+s+r+(t/2**32|0)|0,Jt=(t,e,n,s,r)=>(t>>>0)+(e>>>0)+(n>>>0)+(s>>>0)+(r>>>0),Qt=(t,e,n,s,r,o)=>e+n+s+r+o+(t/2**32|0)|0;var Re=Uint32Array.from([1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298]),M=new Uint32Array(64),ot=class extends X{constructor(e=32){super(64,e,8,!1),this.A=C[0]|0,this.B=C[1]|0,this.C=C[2]|0,this.D=C[3]|0,this.E=C[4]|0,this.F=C[5]|0,this.G=C[6]|0,this.H=C[7]|0}get(){let{A:e,B:n,C:s,D:r,E:o,F:i,G:c,H:l}=this;return[e,n,s,r,o,i,c,l]}set(e,n,s,r,o,i,c,l){this.A=e|0,this.B=n|0,this.C=s|0,this.D=r|0,this.E=o|0,this.F=i|0,this.G=c|0,this.H=l|0}process(e,n){for(let f=0;f<16;f++,n+=4)M[f]=e.getUint32(n,!1);for(let f=16;f<64;f++){let u=M[f-15],a=M[f-2],x=B(u,7)^B(u,18)^u>>>3,y=B(a,17)^B(a,19)^a>>>10;M[f]=y+M[f-7]+x+M[f-16]|0}let{A:s,B:r,C:o,D:i,E:c,F:l,G:d,H:p}=this;for(let f=0;f<64;f++){let u=B(c,6)^B(c,11)^B(c,25),a=p+u+jt(c,l,d)+Re[f]+M[f]|0,y=(B(s,2)^B(s,13)^B(s,22))+Nt(s,r,o)|0;p=d,d=l,l=c,c=i+a|0,i=o,o=r,r=s,s=a+y|0}s=s+this.A|0,r=r+this.B|0,o=o+this.C|0,i=i+this.D|0,c=c+this.E|0,l=l+this.F|0,d=d+this.G|0,p=p+this.H|0,this.set(s,r,o,i,c,l,d,p)}roundClean(){G(M)}destroy(){this.set(0,0,0,0,0,0,0,0),G(this.buffer)}};var te=Pt(["0x428a2f98d728ae22","0x7137449123ef65cd","0xb5c0fbcfec4d3b2f","0xe9b5dba58189dbbc","0x3956c25bf348b538","0x59f111f1b605d019","0x923f82a4af194f9b","0xab1c5ed5da6d8118","0xd807aa98a3030242","0x12835b0145706fbe","0x243185be4ee4b28c","0x550c7dc3d5ffb4e2","0x72be5d74f27b896f","0x80deb1fe3b1696b1","0x9bdc06a725c71235","0xc19bf174cf692694","0xe49b69c19ef14ad2","0xefbe4786384f25e3","0x0fc19dc68b8cd5b5","0x240ca1cc77ac9c65","0x2de92c6f592b0275","0x4a7484aa6ea6e483","0x5cb0a9dcbd41fbd4","0x76f988da831153b5","0x983e5152ee66dfab","0xa831c66d2db43210","0xb00327c898fb213f","0xbf597fc7beef0ee4","0xc6e00bf33da88fc2","0xd5a79147930aa725","0x06ca6351e003826f","0x142929670a0e6e70","0x27b70a8546d22ffc","0x2e1b21385c26c926","0x4d2c6dfc5ac42aed","0x53380d139d95b3df","0x650a73548baf63de","0x766a0abb3c77b2a8","0x81c2c92e47edaee6","0x92722c851482353b","0xa2bfe8a14cf10364","0xa81a664bbc423001","0xc24b8b70d0f89791","0xc76c51a30654be30","0xd192e819d6ef5218","0xd69906245565a910","0xf40e35855771202a","0x106aa07032bbd1b8","0x19a4c116b8d2d0c8","0x1e376c085141ab53","0x2748774cdf8eeb99","0x34b0bcb5e19b48a8","0x391c0cb3c5c95a63","0x4ed8aa4ae3418acb","0x5b9cca4f7763e373","0x682e6ff3d6b2b8a3","0x748f82ee5defb2fc","0x78a5636f43172f60","0x84c87814a1f0ab72","0x8cc702081a6439ec","0x90befffa23631e28","0xa4506cebde82bde9","0xbef9a3f7b2c67915","0xc67178f2e372532b","0xca273eceea26619c","0xd186b8c721c0c207","0xeada7dd6cde0eb1e","0xf57d4f7fee6ed178","0x06f067aa72176fba","0x0a637dc5a2c898a6","0x113f9804bef90dae","0x1b710b35131c471b","0x28db77f523047d84","0x32caab7b40c72493","0x3c9ebe0a15c9bebc","0x431d67c49c100d4c","0x4cc5d4becb3e42b6","0x597f299cfc657e2a","0x5fcb6fab3ad6faec","0x6c44198c4a475817"].map(t=>BigInt(t))),_e=te[0],Ce=te[1],I=new Uint32Array(80),V=new Uint32Array(80),it=class extends X{constructor(e=64){super(128,e,16,!1),this.Ah=m[0]|0,this.Al=m[1]|0,this.Bh=m[2]|0,this.Bl=m[3]|0,this.Ch=m[4]|0,this.Cl=m[5]|0,this.Dh=m[6]|0,this.Dl=m[7]|0,this.Eh=m[8]|0,this.El=m[9]|0,this.Fh=m[10]|0,this.Fl=m[11]|0,this.Gh=m[12]|0,this.Gl=m[13]|0,this.Hh=m[14]|0,this.Hl=m[15]|0}get(){let{Ah:e,Al:n,Bh:s,Bl:r,Ch:o,Cl:i,Dh:c,Dl:l,Eh:d,El:p,Fh:f,Fl:u,Gh:a,Gl:x,Hh:y,Hl:g}=this;return[e,n,s,r,o,i,c,l,d,p,f,u,a,x,y,g]}set(e,n,s,r,o,i,c,l,d,p,f,u,a,x,y,g){this.Ah=e|0,this.Al=n|0,this.Bh=s|0,this.Bl=r|0,this.Ch=o|0,this.Cl=i|0,this.Dh=c|0,this.Dl=l|0,this.Eh=d|0,this.El=p|0,this.Fh=f|0,this.Fl=u|0,this.Gh=a|0,this.Gl=x|0,this.Hh=y|0,this.Hl=g|0}process(e,n){for(let b=0;b<16;b++,n+=4)I[b]=e.getUint32(n),V[b]=e.getUint32(n+=4);for(let b=16;b<80;b++){let O=I[b-15]|0,S=V[b-15]|0,W=K(O,S,1)^K(O,S,8)^Ot(O,S,7),P=F(O,S,1)^F(O,S,8)^kt(O,S,7),E=I[b-2]|0,R=V[b-2]|0,tt=K(E,R,19)^Y(E,R,61)^Ot(E,R,6),gt=F(E,R,19)^q(E,R,61)^kt(E,R,6),et=Yt(P,gt,V[b-7],V[b-16]),yt=qt(et,W,tt,I[b-7],I[b-16]);I[b]=yt|0,V[b]=et|0}let{Ah:s,Al:r,Bh:o,Bl:i,Ch:c,Cl:l,Dh:d,Dl:p,Eh:f,El:u,Fh:a,Fl:x,Gh:y,Gl:g,Hh:w,Hl:v}=this;for(let b=0;b<80;b++){let O=K(f,u,14)^K(f,u,18)^Y(f,u,41),S=F(f,u,14)^F(f,u,18)^q(f,u,41),W=f&a^~f&y,P=u&x^~u&g,E=Jt(v,S,P,Ce[b],V[b]),R=Qt(E,w,O,W,_e[b],I[b]),tt=E|0,gt=K(s,r,28)^Y(s,r,34)^Y(s,r,39),et=F(s,r,28)^q(s,r,34)^q(s,r,39),yt=s&o^s&c^o&c,Oe=r&i^r&l^i&l;w=y|0,v=g|0,y=a|0,g=x|0,a=f|0,x=u|0,{h:f,l:u}=H(d|0,p|0,R|0,tt|0),d=c|0,p=l|0,c=o|0,l=i|0,o=s|0,i=r|0;let Kt=Zt(tt,et,Oe);s=Xt(Kt,R,gt,yt),r=Kt|0}({h:s,l:r}=H(this.Ah|0,this.Al|0,s|0,r|0)),{h:o,l:i}=H(this.Bh|0,this.Bl|0,o|0,i|0),{h:c,l}=H(this.Ch|0,this.Cl|0,c|0,l|0),{h:d,l:p}=H(this.Dh|0,this.Dl|0,d|0,p|0),{h:f,l:u}=H(this.Eh|0,this.El|0,f|0,u|0),{h:a,l:x}=H(this.Fh|0,this.Fl|0,a|0,x|0),{h:y,l:g}=H(this.Gh|0,this.Gl|0,y|0,g|0),{h:w,l:v}=H(this.Hh|0,this.Hl|0,w|0,v|0),this.set(s,r,o,i,c,l,d,p,f,u,a,x,y,g,w,v)}roundClean(){G(I,V)}destroy(){G(this.buffer),this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0)}};var ee=At(()=>new ot);var ne=At(()=>new it);var se=ne;var Ue={p:0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffedn,n:0x1000000000000000000000000000000014def9dea2f79cd65812631a5cf5d3edn,h:8n,a:0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffecn,d:0x52036cee2b6ffe738cc740797779e89800700a4d4141d8ab75eb4dca135978a3n,Gx:0x216936d3cd6e53fec0a4e231fdd6dc5c692cc7609525a7b2c9562d608f25d51an,Gy:0x6666666666666666666666666666666666666666666666666666666666666658n},{p:A,n:at,Gx:re,Gy:oe,a:Bt,d:St}=Ue,Te=8n,J=32,Ht=64,k=(t="")=>{throw new Error(t)},Me=t=>typeof t=="bigint",de=t=>typeof t=="string",Ie=t=>t instanceof Uint8Array||ArrayBuffer.isView(t)&&t.constructor.name==="Uint8Array",z=(t,e)=>!Ie(t)||typeof e=="number"&&e>0&&t.length!==e?k("Uint8Array expected"):t,dt=t=>new Uint8Array(t),_t=t=>Uint8Array.from(t),pe=(t,e)=>t.toString(16).padStart(e,"0"),Ct=t=>Array.from(z(t)).map(e=>pe(e,2)).join(""),U={_0:48,_9:57,A:65,F:70,a:97,f:102},ie=t=>{if(t>=U._0&&t<=U._9)return t-U._0;if(t>=U.A&&t<=U.F)return t-(U.A-10);if(t>=U.a&&t<=U.f)return t-(U.a-10)},Ut=t=>{let e="hex invalid";if(!de(t))return k(e);let n=t.length,s=n/2;if(n%2)return k(e);let r=dt(s);for(let o=0,i=0;o<s;o++,i+=2){let c=ie(t.charCodeAt(i)),l=ie(t.charCodeAt(i+1));if(c===void 0||l===void 0)return k(e);r[o]=c*16+l}return r},ct=(t,e)=>z(de(t)?Ut(t):_t(z(t)),e),he=()=>globalThis?.crypto,Ve=()=>he()?.subtle??k("crypto.subtle must be defined"),Lt=(...t)=>{let e=dt(t.reduce((s,r)=>s+z(r).length,0)),n=0;return t.forEach(s=>{e.set(s,n),n+=s.length}),e},Ge=(t=J)=>he().getRandomValues(dt(t)),ft=BigInt,D=(t,e,n,s="bad number: out of range")=>Me(t)&&e<=t&&t<n?t:k(s),h=(t,e=A)=>{let n=t%e;return n>=0n?n:e+n},Ke=t=>h(t,at),ue=(t,e)=>{(t===0n||e<=0n)&&k("no inverse n="+t+" mod="+e);let n=h(t,e),s=e,r=0n,o=1n,i=1n,c=0n;for(;n!==0n;){let l=s/n,d=s%n,p=r-i*l,f=o-c*l;s=n,n=d,r=i,o=c,i=p,c=f}return s===1n?h(r,e):k("no inverse")},Fe=t=>{let e=Mt[t];return typeof e!="function"&&k("hashes."+t+" not set"),e},ae=t=>t instanceof T?t:k("Point expected"),Et=2n**256n,T=class t{static BASE;static ZERO;ex;ey;ez;et;constructor(e,n,s,r){let o=Et;this.ex=D(e,0n,o),this.ey=D(n,0n,o),this.ez=D(s,1n,o),this.et=D(r,0n,o),Object.freeze(this)}static fromAffine(e){return new t(e.x,e.y,1n,h(e.x*e.y))}static fromBytes(e,n=!1){let s=St,r=_t(z(e,J)),o=e[31];r[31]=o&-129;let i=Tt(r);D(i,0n,n?Et:A);let l=h(i*i),d=h(l-1n),p=h(s*l+1n),{isValid:f,value:u}=ze(d,p);f||k("bad point: y not sqrt");let a=(u&1n)===1n,x=(o&128)!==0;return!n&&u===0n&&x&&k("bad point: x==0, isLastByteOdd"),x!==a&&(u=h(-u)),new t(u,i,1n,h(u*i))}assertValidity(){let e=Bt,n=St,s=this;if(s.is0())throw new Error("bad point: ZERO");let{ex:r,ey:o,ez:i,et:c}=s,l=h(r*r),d=h(o*o),p=h(i*i),f=h(p*p),u=h(l*e),a=h(p*h(u+d)),x=h(f+h(n*h(l*d)));if(a!==x)throw new Error("bad point: equation left != right (1)");let y=h(r*o),g=h(i*c);if(y!==g)throw new Error("bad point: equation left != right (2)");return this}equals(e){let{ex:n,ey:s,ez:r}=this,{ex:o,ey:i,ez:c}=ae(e),l=h(n*c),d=h(o*r),p=h(s*c),f=h(i*r);return l===d&&p===f}is0(){return this.equals($)}negate(){return new t(h(-this.ex),this.ey,this.ez,h(-this.et))}double(){let{ex:e,ey:n,ez:s}=this,r=Bt,o=h(e*e),i=h(n*n),c=h(2n*h(s*s)),l=h(r*o),d=e+n,p=h(h(d*d)-o-i),f=l+i,u=f-c,a=l-i,x=h(p*u),y=h(f*a),g=h(p*a),w=h(u*f);return new t(x,y,w,g)}add(e){let{ex:n,ey:s,ez:r,et:o}=this,{ex:i,ey:c,ez:l,et:d}=ae(e),p=Bt,f=St,u=h(n*i),a=h(s*c),x=h(o*f*d),y=h(r*l),g=h((n+s)*(i+c)-u-a),w=h(y-x),v=h(y+x),b=h(a-p*u),O=h(g*w),S=h(v*b),W=h(g*b),P=h(w*v);return new t(O,S,P,W)}multiply(e,n=!0){if(!n&&(e===0n||this.is0()))return $;if(D(e,1n,at),e===1n)return this;if(this.equals(j))return Ye(e).p;let s=$,r=j;for(let o=this;e>0n;o=o.double(),e>>=1n)e&1n?s=s.add(o):n&&(r=r.add(o));return s}toAffine(){let{ex:e,ey:n,ez:s}=this;if(this.equals($))return{x:0n,y:1n};let r=ue(s,A);return h(s*r)!==1n&&k("invalid inverse"),{x:h(e*r),y:h(n*r)}}toBytes(){let{x:e,y:n}=this.assertValidity().toAffine(),s=De(n);return s[31]|=e&1n?128:0,s}toHex(){return Ct(this.toBytes())}clearCofactor(){return this.multiply(ft(Te),!1)}isSmallOrder(){return this.clearCofactor().is0()}isTorsionFree(){let e=this.multiply(at/2n,!1).double();return at%2n&&(e=e.add(this)),e.is0()}static fromHex(e,n){return t.fromBytes(ct(e),n)}get x(){return this.toAffine().x}get y(){return this.toAffine().y}toRawBytes(){return this.toBytes()}},j=new T(re,oe,1n,h(re*oe)),$=new T(0n,1n,1n,0n);T.BASE=j;T.ZERO=$;var De=t=>Ut(pe(D(t,0n,Et),Ht)).reverse(),Tt=t=>ft("0x"+Ct(_t(z(t)).reverse())),L=(t,e)=>{let n=t;for(;e-- >0n;)n*=n,n%=A;return n},$e=t=>{let n=t*t%A*t%A,s=L(n,2n)*n%A,r=L(s,1n)*t%A,o=L(r,5n)*r%A,i=L(o,10n)*o%A,c=L(i,20n)*i%A,l=L(c,40n)*c%A,d=L(l,80n)*l%A,p=L(d,80n)*l%A,f=L(p,10n)*o%A;return{pow_p_5_8:L(f,2n)*t%A,b2:n}},ce=0x2b8324804fc1df0b2b4d00993dfbd7a72f431806ad2fe478c4ee1b274a0ea0b0n,ze=(t,e)=>{let n=h(e*e*e),s=h(n*n*e),r=$e(t*s).pow_p_5_8,o=h(t*n*r),i=h(e*o*o),c=o,l=h(o*ce),d=i===t,p=i===h(-t),f=i===h(-t*ce);return d&&(o=c),(p||f)&&(o=l),(h(o)&1n)===1n&&(o=h(-o)),{isValid:d||p,value:o}},je=t=>Ke(Tt(t));var Ne=(...t)=>Fe("sha512Sync")(...t);var We=t=>t.finish(Ne(t.hashable));var xe={zip215:!0},Pe=(t,e,n,s=xe)=>{t=ct(t,Ht),e=ct(e),n=ct(n,J);let{zip215:r}=s,o,i,c,l,d=Uint8Array.of();try{o=T.fromHex(n,r),i=T.fromHex(t.slice(0,J),r),c=Tt(t.slice(J,Ht)),l=j.multiply(c,!1),d=Lt(i.toBytes(),o.toBytes(),e)}catch{}return{hashable:d,finish:f=>{if(l==null||!r&&o.isSmallOrder())return!1;let u=je(f);return i.add(o.multiply(u,!1)).add(l.negate()).clearCofactor().is0()}}};var be=(t,e,n,s=xe)=>We(Pe(t,e,n,s)),Mt={sha512Async:async(...t)=>{let e=Ve(),n=Lt(...t);return dt(await e.digest("SHA-512",n.buffer))},sha512Sync:void 0,bytesToHex:Ct,hexToBytes:Ut,concatBytes:Lt,mod:h,invert:ue,randomBytes:Ge};var lt=8,Ze=256,ge=Math.ceil(Ze/lt)+1,Rt=2**(lt-1),Xe=()=>{let t=[],e=j,n=e;for(let s=0;s<ge;s++){n=e,t.push(n);for(let r=1;r<Rt;r++)n=n.add(e),t.push(n);e=n.double()}return t},fe,le=(t,e)=>{let n=e.negate();return t?n:e},Ye=t=>{let e=fe||(fe=Xe()),n=$,s=j,r=2**lt,o=r,i=ft(r-1),c=ft(lt);for(let l=0;l<ge;l++){let d=Number(t&i);t>>=c,d>Rt&&(d-=o,t+=1n);let p=l*Rt,f=p,u=p+Math.abs(d)-1,a=l%2!==0,x=d<0;d===0?s=s.add(le(a,e[f])):n=n.add(le(x,e[u]))}return{p:n,f:s}};var ye=ee;Mt.sha512Sync=(...t)=>{let e=se.create();for(let n of t)e.update(n);return e.digest()};function It(t,e,n){try{let s=new TextEncoder().encode(t);return be(wt(e),s,wt(n))}catch{return!1}}function Q(t){let e=new TextEncoder().encode(t);return zt(ye(e))}function Vt(){return new Map}function pt(t){let e=new Map;for(let n of t)e.set(n.id,n);return e}function ht(t,e){let n=new Map(t);for(let[s,r]of e)n.has(s)||n.set(s,r);return n}function Je(t){let e=[...t.values()],n=new Set,s=[];function r(o){if(!n.has(o.id)){n.add(o.id);for(let i of o.seen){let c=t.get(i);c&&r(c)}s.push(o)}}e.sort((o,i)=>o.id.localeCompare(i.id));for(let o of e)r(o);return s}function ut(t){let e=Je(t),n=new Map,s=new Map,r=new Map,o=new Set,i=new Map,c=null,l="webring",d=2,p=new Set;for(let u of e)switch(u.type){case"genesis":{let a=u;c=a,l=a.payload.name,d=a.payload.inviteBudget,n.set(a.author,{url:a.author,name:a.author,invitedBy:null,pubkey:null,isActive:!1,depth:0}),s.set(a.author,[]),i.set(a.author,0);break}case"add":{let a=u;if(!n.has(a.author)||p.has(a.author)||n.has(a.payload.target))break;let x=i.get(a.author)??0;if(x>=d)break;p.delete(a.payload.target);let y=n.get(a.author);n.set(a.payload.target,{url:a.payload.target,name:a.payload.name,invitedBy:a.author,pubkey:null,isActive:!1,depth:y.depth+1}),r.set(a.payload.target,a.author);let g=s.get(a.author)??[];g.push(a.payload.target),s.set(a.author,g),s.has(a.payload.target)||s.set(a.payload.target,[]),i.set(a.author,x+1);break}case"key-claim":{let a=u,x=n.get(a.author);if(!x||p.has(a.author))break;x.pubkey=a.payload.pubkey,x.isActive=!0,o.add(a.author);break}case"revoke":{let a=u;if(p.has(a.author)||r.get(a.payload.target)!==a.author)break;let x=[a.payload.target];for(;x.length>0;){let g=x.pop();if(p.has(g))continue;p.add(g),n.delete(g),o.delete(g);let w=r.get(g);if(w){let b=s.get(w)??[];s.set(w,b.filter(O=>O!==g))}r.delete(g);let v=s.get(g)??[];x.push(...v)}let y=i.get(a.author)??0;i.set(a.author,Math.max(0,y-1));break}case"leave":{let a=u;if(!n.has(a.author)||p.has(a.author))break;let x=r.get(a.author),y=s.get(a.author)??[];if(x){let g=s.get(x)??[];for(let v of y){r.set(v,x);let b=n.get(v);if(b){b.invitedBy=x;let O=n.get(x);O&&(b.depth=O.depth+1)}g.push(v)}s.set(x,g.filter(v=>v!==a.author));let w=i.get(x)??0;i.set(x,Math.max(0,w-1))}n.delete(a.author),o.delete(a.author),s.delete(a.author);break}}let f=new Map;for(let[u]of n){let a=i.get(u)??0;f.set(u,d-a)}return{name:l,inviteBudget:d,members:me([...n.values()]),inviteTree:s,activeMembers:[...o],inviteSlots:f,genesis:c}}function me(t){return[...t].sort((e,n)=>{let s=Q(e.url),r=Q(n.url);return s.localeCompare(r)})}function Gt(t,e){if(t.length===0)return{prev:null,next:null};let n=t.findIndex(o=>o.url===e);if(n===-1)return{prev:t[t.length-1],next:t[0]};let s=t[(n-1+t.length)%t.length],r=t[(n+1)%t.length];return{prev:s,next:r}}function we(t,e){for(let n of e.values())if(n.type==="key-claim"&&n.author===t)return n.payload.pubkey;return null}function ve(t){let e={type:t.type,author:t.author,timestamp:t.timestamp,seen:[...t.seen].sort(),payload:t.type==="leave"?{}:t.payload};return JSON.stringify(e)}function xt(t,e,n,s=!1){let r=[],o=new Map(e),i=d=>{try{return new URL(d).origin}catch{return d}},c=i(n);for(let d of t)if(d.type==="key-claim"){let p=d,f=we(p.author,e);if(f){if(f!==p.payload.pubkey)continue}else if(!s&&i(p.author)!==c)continue;let u=ve(p);It(u,p.sig,p.payload.pubkey)&&(o.set(p.id,p),r.push(p))}let l=[...e.values()].some(d=>d.type==="genesis");for(let d of t){if(d.type==="key-claim"||d.type==="genesis"&&l&&!e.has(d.id))continue;let p=we(d.author,o);if(!p)continue;let f=ve(d);It(f,d.sig,p)&&(o.set(d.id,d),r.push(d))}return r}var bt=`
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
`;function N(t,e,n,s="loaded"){t.shadowRoot||t.attachShadow({mode:"open"});let r=t.shadowRoot,o=e?.name||"kek's ring";if(s==="loading"){r.innerHTML=`<style>${bt}</style>
      <div class="widget">
        <div class="titlebar">
          <span class="titlebar-text"><span class="titlebar-icon">\u{1F310}</span> ${o}</span>
        </div>
        <div class="status-msg"><span class="loading-blink">\u25A0</span> Loading ring...</div>
      </div>`;return}if(s==="error"){r.innerHTML=`<style>${bt}</style>
      <div class="widget">
        <div class="titlebar">
          <span class="titlebar-text"><span class="titlebar-icon">\u{1F310}</span> ${o}</span>
        </div>
        <div class="status-msg">\u26A0 Ring unavailable</div>
      </div>`;return}if(s==="empty"||!e||e.members.length===0){r.innerHTML=`<style>${bt}</style>
      <div class="widget">
        <div class="titlebar">
          <span class="titlebar-text"><span class="titlebar-icon">\u{1F310}</span> ${o}</span>
        </div>
        <div class="status-msg">Ring is empty</div>
      </div>`;return}let{prev:i,next:c}=Gt(e.members,n),l=e.members.map(a=>`<a class="member-item${a.url===n?" current":""}" href="${a.url}">${a.url}<span class="member-name">${a.name}</span></a>`).join("");r.innerHTML=`
    <style>${bt}</style>
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
        <a class="nav-btn" href="${c?.url||"#"}" title="${c?.name||"next"}">Next \u25BA</a>
      </div>
      <div class="member-list" id="member-list">
        ${l}
      </div>
      <div class="statusbar">
        <span class="statusbar-panel">Ring: ${e.name}</span>
      </div>
    </div>
  `;let d=r.getElementById("ring-toggle"),p=r.getElementById("ring-title"),f=r.getElementById("member-list"),u=()=>f?.classList.toggle("expanded");d?.addEventListener("click",u),p?.addEventListener("click",u)}async function Ae(t){try{let e=new AbortController,n=setTimeout(()=>e.abort(),3e3),s=t.endsWith("/webring.json")?t:`${t.replace(/\/$/,"")}/webring.json`,r=await fetch(s,{signal:e.signal});if(clearTimeout(n),!r.ok)return null;let o=await r.json();return Array.isArray(o)?o:null}catch{return null}}async function Qe(){let t=document.currentScript||document.querySelector("script[data-ring]");if(!t)return;let e=t.getAttribute("data-ring");if(!e)return;let n=window.location.origin,s=document.createElement("div");t.parentNode?.insertBefore(s,t.nextSibling),N(s,null,n,"loading");let r=e.split(",").map(p=>p.trim()).filter(Boolean);if(r.length===0){N(s,null,n,"error");return}let o=new Set,c=(await Promise.all(r.map(async p=>{o.add(p);let f=await Ae(p);return{url:p,ops:f}}))).filter(p=>p.ops!==null);if(c.length===0){N(s,null,n,"error");return}let l=Vt();for(let{url:p,ops:f}of c){let u=xt(f,l,p,!0);l=ht(l,pt(u))}for(;;){let f=ut(l).members.filter(a=>!o.has(a.url));if(f.length===0)break;let u=await Promise.all(f.map(async a=>{o.add(a.url);let x=await Ae(a.url);return{url:a.url,ops:x}}));for(let{url:a,ops:x}of u)if(x){let y=xt(x,l,a,!1);l=ht(l,pt(y))}}let d=ut(l);d.members.length===0?N(s,d,n,"empty"):N(s,d,n,"loaded")}Qe();})();
/*! Bundled license information:

@noble/hashes/esm/utils.js:
  (*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

@noble/ed25519/index.js:
  (*! noble-ed25519 - MIT License (c) 2019 Paul Miller (paulmillr.com) *)
*/
