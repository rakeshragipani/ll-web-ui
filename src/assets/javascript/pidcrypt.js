function pidCrypt(){function getRandomBytes(len){if(!len)len=8;var bytes=new Array(len);var field=[];for(var i=0;i<256;i++)field[i]=i;for(i=0;i<bytes.length;i++)
bytes[i]=field[Math.floor(Math.random()*field.length)];return bytes}
this.setDefaults=function(){this.params.nBits=256;this.params.salt=getRandomBytes(8);this.params.salt=pidCryptUtil.byteArray2String(this.params.salt);this.params.salt=pidCryptUtil.convertToHex(this.params.salt);this.params.blockSize=16;this.params.UTF8=true;this.params.A0_PAD=true;}
this.debug=true;this.params={};this.params.dataIn='';this.params.dataOut='';this.params.decryptIn='';this.params.decryptOut='';this.params.encryptIn='';this.params.encryptOut='';this.params.key='';this.params.iv='';this.params.clear=true;this.setDefaults();this.errors='';this.warnings='';this.infos='';this.debugMsg='';this.setParams=function(pObj){if(!pObj)pObj={};for(var p in pObj)
this.params[p]=pObj[p];}
this.getParams=function(){return this.params;}
this.getParam=function(p){return this.params[p]||'';}
this.clearParams=function(){this.params={};}
this.getNBits=function(){return this.params.nBits;}
this.getOutput=function(){return this.params.dataOut;}
this.setError=function(str){this.error=str;}
this.appendError=function(str){this.errors+=str;return'';}
this.getErrors=function(){return this.errors;}
this.isError=function(){if(this.errors.length>0)
return true;return false}
this.appendInfo=function(str){this.infos+=str;return'';}
this.getInfos=function(){return this.infos;}
this.setDebug=function(flag){this.debug=flag;}
this.appendDebug=function(str){this.debugMsg+=str;return'';}
this.isDebug=function(){return this.debug;}
this.getAllMessages=function(options){var defaults={lf:'\n',clr_mes:false,verbose:15};if(!options)options=defaults;for(var d in defaults)
if(typeof(options[d])=='undefined')options[d]=defaults[d];var mes='';var tmp='';for(var p in this.params){switch(p){case'encryptOut':tmp=pidCryptUtil.toByteArray(this.params[p].toString());tmp=pidCryptUtil.fragment(tmp.join(),64,options.lf)
break;case'key':case'iv':tmp=pidCryptUtil.formatHex(this.params[p],48);break;default:tmp=pidCryptUtil.fragment(this.params[p].toString(),64,options.lf);}
mes+='<p><b>'+p+'</b>:<pre>'+tmp+'</pre></p>';}
if(this.debug)mes+='debug: '+this.debug+options.lf;if(this.errors.length>0&&((options.verbose&1)==1))mes+='Errors:'+options.lf+this.errors+options.lf;if(this.warnings.length>0&&((options.verbose&2)==2))mes+='Warnings:'+options.lf+this.warnings+options.lf;if(this.infos.length>0&&((options.verbose&4)==4))mes+='Infos:'+options.lf+this.infos+options.lf;if(this.debug&&((options.verbose&8)==8))mes+='Debug messages:'+options.lf+this.debugMsg+options.lf;if(options.clr_mes)
this.errors=this.infos=this.warnings=this.debug='';return mes;}
this.getRandomBytes=function(len){return getRandomBytes(len);}}