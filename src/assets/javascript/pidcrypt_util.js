pidCryptUtil={};pidCryptUtil.encodeBase64=function(str,utf8encode){if(!str)str="";var b64="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";utf8encode=(typeof utf8encode=='undefined')?false:utf8encode;var o1,o2,o3,bits,h1,h2,h3,h4,e=[],pad='',c,plain,coded;plain=utf8encode?pidCryptUtil.encodeUTF8(str):str;c=plain.length%3;if(c>0){while(c++<3){pad+='=';plain+='\0';}}
for(c=0;c<plain.length;c+=3){o1=plain.charCodeAt(c);o2=plain.charCodeAt(c+1);o3=plain.charCodeAt(c+2);bits=o1<<16|o2<<8|o3;h1=bits>>18&0x3f;h2=bits>>12&0x3f;h3=bits>>6&0x3f;h4=bits&0x3f;e[c/3]=b64.charAt(h1)+b64.charAt(h2)+b64.charAt(h3)+b64.charAt(h4);}
coded=e.join('');coded=coded.slice(0,coded.length-pad.length)+pad;return coded;}
pidCryptUtil.decodeBase64=function(str,utf8decode){if(!str)str="";var b64="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";utf8decode=(typeof utf8decode=='undefined')?false:utf8decode;var o1,o2,o3,h1,h2,h3,h4,bits,d=[],plain,coded;coded=utf8decode?pidCryptUtil.decodeUTF8(str):str;for(var c=0;c<coded.length;c+=4){h1=b64.indexOf(coded.charAt(c));h2=b64.indexOf(coded.charAt(c+1));h3=b64.indexOf(coded.charAt(c+2));h4=b64.indexOf(coded.charAt(c+3));bits=h1<<18|h2<<12|h3<<6|h4;o1=bits>>>16&0xff;o2=bits>>>8&0xff;o3=bits&0xff;d[c/4]=String.fromCharCode(o1,o2,o3);if(h4==0x40)d[c/4]=String.fromCharCode(o1,o2);if(h3==0x40)d[c/4]=String.fromCharCode(o1);}
plain=d.join('');plain=utf8decode?pidCryptUtil.decodeUTF8(plain):plain
return plain;}
pidCryptUtil.encodeUTF8=function(str){if(!str)str="";str=str.replace(/[\u0080-\u07ff]/g,function(c){var cc=c.charCodeAt(0);return String.fromCharCode(0xc0|cc>>6,0x80|cc&0x3f);});str=str.replace(/[\u0800-\uffff]/g,function(c){var cc=c.charCodeAt(0);return String.fromCharCode(0xe0|cc>>12,0x80|cc>>6&0x3F,0x80|cc&0x3f);});return str;}
pidCryptUtil.decodeUTF8=function(str){if(!str)str="";str=str.replace(/[\u00c0-\u00df][\u0080-\u00bf]/g,function(c){var cc=(c.charCodeAt(0)&0x1f)<<6|c.charCodeAt(1)&0x3f;return String.fromCharCode(cc);});str=str.replace(/[\u00e0-\u00ef][\u0080-\u00bf][\u0080-\u00bf]/g,function(c){var cc=((c.charCodeAt(0)&0x0f)<<12)|((c.charCodeAt(1)&0x3f)<<6)|(c.charCodeAt(2)&0x3f);return String.fromCharCode(cc);});return str;}
pidCryptUtil.convertToHex=function(str){if(!str)str="";var hs='';var hv='';for(var i=0;i<str.length;i++){hv=str.charCodeAt(i).toString(16);hs+=(hv.length==1)?'0'+hv:hv;}
return hs;}
pidCryptUtil.convertFromHex=function(str){if(!str)str="";var s="";for(var i=0;i<str.length;i+=2){s+=String.fromCharCode(parseInt(str.substring(i,i+2),16));}
return s}
pidCryptUtil.stripLineFeeds=function(str){if(!str)str="";var s='';s=str.replace(/\n/g,'');s=s.replace(/\r/g,'');return s;}
pidCryptUtil.toByteArray=function(str){if(!str)str="";var ba=[];for(var i=0;i<str.length;i++)
ba[i]=str.charCodeAt(i);return ba;}
pidCryptUtil.fragment=function(str,length,lf){if(!str)str="";if(!length||length>=str.length)return str;if(!lf)lf='\n'
var tmp='';for(var i=0;i<str.length;i+=length)
tmp+=str.substr(i,length)+lf;return tmp;}
pidCryptUtil.formatHex=function(str,length){if(!str)str="";if(!length)length=45;var str_new='';var j=0;var hex=str.toLowerCase();for(var i=0;i<hex.length;i+=2)
str_new+=hex.substr(i,2)+':';hex=this.fragment(str_new,length);return hex;}
pidCryptUtil.byteArray2String=function(b){var s='';for(var i=0;i<b.length;i++){s+=String.fromCharCode(b[i]);}
return s;}