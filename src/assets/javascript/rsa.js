if(typeof(pidCrypt)!='undefined'&&typeof(BigInteger)!='undefined'&&typeof(SecureRandom)!='undefined'&&typeof(Arcfour)!='undefined'){function parseBigInt(str,r){return new BigInteger(str,r);}
function linebrk(s,n){var ret="";var i=0;while(i+n<s.length){ret+=s.substring(i,i+n)+"\n";i+=n;}
return ret+s.substring(i,s.length);}
function byte2Hex(b){if(b<0x10)
return"0"+b.toString(16);else
return b.toString(16);}
function pkcs1unpad2(d,n){var b=d.toByteArray();var i=0;while(i<b.length&&b[i]==0)++i;if(b.length-i!=n-1||b[i]!=2)
return null;++i;while(b[i]!=0)
if(++i>=b.length)return null;var ret="";while(++i<b.length)
ret+=String.fromCharCode(b[i]);return ret;}
function pkcs1pad2(s,n){if(n<s.length+11){alert("Message too long for RSA");return null;}
var ba=new Array();var i=s.length-1;while(i>=0&&n>0){ba[--n]=s.charCodeAt(i--);};ba[--n]=0;var rng=new SecureRandom();var x=new Array();while(n>2){x[0]=0;while(x[0]==0)rng.nextBytes(x);ba[--n]=x[0];}
ba[--n]=2;ba[--n]=0;return new BigInteger(ba);}
pidCrypt.RSA=function(){this.n=null;this.e=0;this.d=null;this.p=null;this.q=null;this.dmp1=null;this.dmq1=null;this.coeff=null;}
pidCrypt.RSA.prototype.doPrivate=function(x){if(this.p==null||this.q==null)
return x.modPow(this.d,this.n);var xp=x.mod(this.p).modPow(this.dmp1,this.p);var xq=x.mod(this.q).modPow(this.dmq1,this.q);while(xp.compareTo(xq)<0)
xp=xp.add(this.p);return xp.subtract(xq).multiply(this.coeff).mod(this.p).multiply(this.q).add(xq);}
pidCrypt.RSA.prototype.setPublic=function(N,E,radix){if(typeof(radix)=='undefined')radix=16;if(N!=null&&E!=null&&N.length>0&&E.length>0){this.n=parseBigInt(N,radix);this.e=parseInt(E,radix);}else
alert("Invalid RSA public key");}
pidCrypt.RSA.prototype.doPublic=function(x){return x.modPowInt(this.e,this.n);}
pidCrypt.RSA.prototype.encryptRaw=function(text){var m=pkcs1pad2(text,(this.n.bitLength()+7)>>3);if(m==null)return null;var c=this.doPublic(m);if(c==null)return null;var h=c.toString(16);if((h.length&1)==0)return h;else return"0"+h;}
pidCrypt.RSA.prototype.encrypt=function(text){text=pidCryptUtil.encodeBase64(text);return this.encryptRaw(text)}
pidCrypt.RSA.prototype.decryptRaw=function(ctext){var c=parseBigInt(ctext,16);var m=this.doPrivate(c);if(m==null)return null;return pkcs1unpad2(m,(this.n.bitLength()+7)>>3)}
pidCrypt.RSA.prototype.decrypt=function(ctext){var str=this.decryptRaw(ctext)
str=(str)?pidCryptUtil.decodeBase64(str):"";return str;}
pidCrypt.RSA.prototype.setPrivate=function(N,E,D,radix){if(typeof(radix)=='undefined')radix=16;if(N!=null&&E!=null&&N.length>0&&E.length>0){this.n=parseBigInt(N,radix);this.e=parseInt(E,radix);this.d=parseBigInt(D,radix);}else
alert("Invalid RSA private key");}
pidCrypt.RSA.prototype.setPrivateEx=function(N,E,D,P,Q,DP,DQ,C,radix){if(typeof(radix)=='undefined')radix=16;if(N!=null&&E!=null&&N.length>0&&E.length>0){this.n=parseBigInt(N,radix);this.e=parseInt(E,radix);this.d=parseBigInt(D,radix);this.p=parseBigInt(P,radix);this.q=parseBigInt(Q,radix);this.dmp1=parseBigInt(DP,radix);this.dmq1=parseBigInt(DQ,radix);this.coeff=parseBigInt(C,radix);}else
alert("Invalid RSA private key");}
pidCrypt.RSA.prototype.generate=function(B,E){var rng=new SecureRandom();var qs=B>>1;this.e=parseInt(E,16);var ee=new BigInteger(E,16);for(;;){for(;;){this.p=new BigInteger(B-qs,1,rng);if(this.p.subtract(BigInteger.ONE).gcd(ee).compareTo(BigInteger.ONE)==0&&this.p.isProbablePrime(10))break;}
for(;;){this.q=new BigInteger(qs,1,rng);if(this.q.subtract(BigInteger.ONE).gcd(ee).compareTo(BigInteger.ONE)==0&&this.q.isProbablePrime(10))break;}
if(this.p.compareTo(this.q)<=0){var t=this.p;this.p=this.q;this.q=t;}
var p1=this.p.subtract(BigInteger.ONE);var q1=this.q.subtract(BigInteger.ONE);var phi=p1.multiply(q1);if(phi.gcd(ee).compareTo(BigInteger.ONE)==0){this.n=this.p.multiply(this.q);this.d=ee.modInverse(phi);this.dmp1=this.d.mod(p1);this.dmq1=this.d.mod(q1);this.coeff=this.q.modInverse(this.p);break;}}}
pidCrypt.RSA.prototype.getASNData=function(tree){var params={};var data=[];var p=0;if(tree.value&&tree.type=='INTEGER')
data[p++]=tree.value;if(tree.sub)
for(var i=0;i<tree.sub.length;i++)
data=data.concat(this.getASNData(tree.sub[i]));return data;}
pidCrypt.RSA.prototype.setKeyFromASN=function(key,asntree){var keys=['N','E','D','P','Q','DP','DQ','C'];var params={};var asnData=this.getASNData(asntree);switch(key){case'Public':case'public':for(var i=0;i<asnData.length;i++)
params[keys[i]]=asnData[i].toLowerCase();this.setPublic(params.N,params.E,16);break;case'Private':case'private':for(var i=1;i<asnData.length;i++)
params[keys[i-1]]=asnData[i].toLowerCase();this.setPrivateEx(params.N,params.E,params.D,params.P,params.Q,params.DP,params.DQ,params.C,16);break;}}
pidCrypt.RSA.prototype.setPublicKeyFromASN=function(asntree){this.setKeyFromASN('public',asntree);}
pidCrypt.RSA.prototype.setPrivateKeyFromASN=function(asntree){this.setKeyFromASN('private',asntree);}
pidCrypt.RSA.prototype.getParameters=function(){var params={}
if(this.n!=null)params.n=this.n;params.e=this.e;if(this.d!=null)params.d=this.d;if(this.p!=null)params.p=this.p;if(this.q!=null)params.q=this.q;if(this.dmp1!=null)params.dmp1=this.dmp1;if(this.dmq1!=null)params.dmq1=this.dmq1;if(this.coeff!=null)params.c=this.coeff;return params;}}