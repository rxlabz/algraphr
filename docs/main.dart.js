(function(){var supportsDirectProtoAccess=function(){var z=function(){}
z.prototype={p:{}}
var y=new z()
if(!(y.__proto__&&y.__proto__.p===z.prototype.p))return false
try{if(typeof navigator!="undefined"&&typeof navigator.userAgent=="string"&&navigator.userAgent.indexOf("Chrome/")>=0)return true
if(typeof version=="function"&&version.length==0){var x=version()
if(/^\d+\.\d+\.\d+\.\d+$/.test(x))return true}}catch(w){}return false}()
function map(a){a=Object.create(null)
a.x=0
delete a.x
return a}var A=map()
var B=map()
var C=map()
var D=map()
var E=map()
var F=map()
var G=map()
var H=map()
var J=map()
var K=map()
var L=map()
var M=map()
var N=map()
var O=map()
var P=map()
var Q=map()
var R=map()
var S=map()
var T=map()
var U=map()
var V=map()
var W=map()
var X=map()
var Y=map()
var Z=map()
function I(){}init()
function setupProgram(a,b){"use strict"
function generateAccessor(a9,b0,b1){var g=a9.split("-")
var f=g[0]
var e=f.length
var d=f.charCodeAt(e-1)
var c
if(g.length>1)c=true
else c=false
d=d>=60&&d<=64?d-59:d>=123&&d<=126?d-117:d>=37&&d<=43?d-27:0
if(d){var a0=d&3
var a1=d>>2
var a2=f=f.substring(0,e-1)
var a3=f.indexOf(":")
if(a3>0){a2=f.substring(0,a3)
f=f.substring(a3+1)}if(a0){var a4=a0&2?"r":""
var a5=a0&1?"this":"r"
var a6="return "+a5+"."+f
var a7=b1+".prototype.g"+a2+"="
var a8="function("+a4+"){"+a6+"}"
if(c)b0.push(a7+"$reflectable("+a8+");\n")
else b0.push(a7+a8+";\n")}if(a1){var a4=a1&2?"r,v":"v"
var a5=a1&1?"this":"r"
var a6=a5+"."+f+"=v"
var a7=b1+".prototype.s"+a2+"="
var a8="function("+a4+"){"+a6+"}"
if(c)b0.push(a7+"$reflectable("+a8+");\n")
else b0.push(a7+a8+";\n")}}return f}function defineClass(a2,a3){var g=[]
var f="function "+a2+"("
var e=""
var d=""
for(var c=0;c<a3.length;c++){if(c!=0)f+=", "
var a0=generateAccessor(a3[c],g,a2)
d+="'"+a0+"',"
var a1="p_"+a0
f+=a1
e+="this."+a0+" = "+a1+";\n"}if(supportsDirectProtoAccess)e+="this."+"$deferredAction"+"();"
f+=") {\n"+e+"}\n"
f+=a2+".builtin$cls=\""+a2+"\";\n"
f+="$desc=$collectedClasses."+a2+"[1];\n"
f+=a2+".prototype = $desc;\n"
if(typeof defineClass.name!="string")f+=a2+".name=\""+a2+"\";\n"
f+=a2+"."+"$__fields__"+"=["+d+"];\n"
f+=g.join("")
return f}init.createNewIsolate=function(){return new I()}
init.classIdExtractor=function(c){return c.constructor.name}
init.classFieldsExtractor=function(c){var g=c.constructor.$__fields__
if(!g)return[]
var f=[]
f.length=g.length
for(var e=0;e<g.length;e++)f[e]=c[g[e]]
return f}
init.instanceFromClassId=function(c){return new init.allClasses[c]()}
init.initializeEmptyInstance=function(c,d,e){init.allClasses[c].apply(d,e)
return d}
var z=supportsDirectProtoAccess?function(c,d){var g=c.prototype
g.__proto__=d.prototype
g.constructor=c
g["$is"+c.name]=c
return convertToFastObject(g)}:function(){function tmp(){}return function(a0,a1){tmp.prototype=a1.prototype
var g=new tmp()
convertToSlowObject(g)
var f=a0.prototype
var e=Object.keys(f)
for(var d=0;d<e.length;d++){var c=e[d]
g[c]=f[c]}g["$is"+a0.name]=a0
g.constructor=a0
a0.prototype=g
return g}}()
function finishClasses(a4){var g=init.allClasses
a4.combinedConstructorFunction+="return [\n"+a4.constructorsList.join(",\n  ")+"\n]"
var f=new Function("$collectedClasses",a4.combinedConstructorFunction)(a4.collected)
a4.combinedConstructorFunction=null
for(var e=0;e<f.length;e++){var d=f[e]
var c=d.name
var a0=a4.collected[c]
var a1=a0[0]
a0=a0[1]
g[c]=d
a1[c]=d}f=null
var a2=init.finishedClasses
function finishClass(c1){if(a2[c1])return
a2[c1]=true
var a5=a4.pending[c1]
if(a5&&a5.indexOf("+")>0){var a6=a5.split("+")
a5=a6[0]
var a7=a6[1]
finishClass(a7)
var a8=g[a7]
var a9=a8.prototype
var b0=g[c1].prototype
var b1=Object.keys(a9)
for(var b2=0;b2<b1.length;b2++){var b3=b1[b2]
if(!u.call(b0,b3))b0[b3]=a9[b3]}}if(!a5||typeof a5!="string"){var b4=g[c1]
var b5=b4.prototype
b5.constructor=b4
b5.$isc=b4
b5.$deferredAction=function(){}
return}finishClass(a5)
var b6=g[a5]
if(!b6)b6=existingIsolateProperties[a5]
var b4=g[c1]
var b5=z(b4,b6)
if(a9)b5.$deferredAction=mixinDeferredActionHelper(a9,b5)
if(Object.prototype.hasOwnProperty.call(b5,"%")){var b7=b5["%"].split(";")
if(b7[0]){var b8=b7[0].split("|")
for(var b2=0;b2<b8.length;b2++){init.interceptorsByTag[b8[b2]]=b4
init.leafTags[b8[b2]]=true}}if(b7[1]){b8=b7[1].split("|")
if(b7[2]){var b9=b7[2].split("|")
for(var b2=0;b2<b9.length;b2++){var c0=g[b9[b2]]
c0.$nativeSuperclassTag=b8[0]}}for(b2=0;b2<b8.length;b2++){init.interceptorsByTag[b8[b2]]=b4
init.leafTags[b8[b2]]=false}}b5.$deferredAction()}if(b5.$isf)b5.$deferredAction()}var a3=Object.keys(a4.pending)
for(var e=0;e<a3.length;e++)finishClass(a3[e])}function finishAddStubsHelper(){var g=this
while(!g.hasOwnProperty("$deferredAction"))g=g.__proto__
delete g.$deferredAction
var f=Object.keys(g)
for(var e=0;e<f.length;e++){var d=f[e]
var c=d.charCodeAt(0)
var a0
if(d!=="^"&&d!=="$reflectable"&&c!==43&&c!==42&&(a0=g[d])!=null&&a0.constructor===Array&&d!=="<>")addStubs(g,a0,d,false,[])}convertToFastObject(g)
g=g.__proto__
g.$deferredAction()}function mixinDeferredActionHelper(c,d){var g
if(d.hasOwnProperty("$deferredAction"))g=d.$deferredAction
return function foo(){var f=this
while(!f.hasOwnProperty("$deferredAction"))f=f.__proto__
if(g)f.$deferredAction=g
else{delete f.$deferredAction
convertToFastObject(f)}c.$deferredAction()
f.$deferredAction()}}function processClassData(b1,b2,b3){b2=convertToSlowObject(b2)
var g
var f=Object.keys(b2)
var e=false
var d=supportsDirectProtoAccess&&b1!="c"
for(var c=0;c<f.length;c++){var a0=f[c]
var a1=a0.charCodeAt(0)
if(a0==="m"){processStatics(init.statics[b1]=b2.m,b3)
delete b2.m}else if(a1===43){w[g]=a0.substring(1)
var a2=b2[a0]
if(a2>0)b2[g].$reflectable=a2}else if(a1===42){b2[g].$defaultValues=b2[a0]
var a3=b2.$methodsWithOptionalArguments
if(!a3)b2.$methodsWithOptionalArguments=a3={}
a3[a0]=g}else{var a4=b2[a0]
if(a0!=="^"&&a4!=null&&a4.constructor===Array&&a0!=="<>")if(d)e=true
else addStubs(b2,a4,a0,false,[])
else g=a0}}if(e)b2.$deferredAction=finishAddStubsHelper
var a5=b2["^"],a6,a7,a8=a5
var a9=a8.split(";")
a8=a9[1]?a9[1].split(","):[]
a7=a9[0]
a6=a7.split(":")
if(a6.length==2){a7=a6[0]
var b0=a6[1]
if(b0)b2.$signature=function(b4){return function(){return init.types[b4]}}(b0)}if(a7)b3.pending[b1]=a7
b3.combinedConstructorFunction+=defineClass(b1,a8)
b3.constructorsList.push(b1)
b3.collected[b1]=[m,b2]
i.push(b1)}function processStatics(a3,a4){var g=Object.keys(a3)
for(var f=0;f<g.length;f++){var e=g[f]
if(e==="^")continue
var d=a3[e]
var c=e.charCodeAt(0)
var a0
if(c===43){v[a0]=e.substring(1)
var a1=a3[e]
if(a1>0)a3[a0].$reflectable=a1
if(d&&d.length)init.typeInformation[a0]=d}else if(c===42){m[a0].$defaultValues=d
var a2=a3.$methodsWithOptionalArguments
if(!a2)a3.$methodsWithOptionalArguments=a2={}
a2[e]=a0}else if(typeof d==="function"){m[a0=e]=d
h.push(e)
init.globalFunctions[e]=d}else if(d.constructor===Array)addStubs(m,d,e,true,h)
else{a0=e
processClassData(e,d,a4)}}}function addStubs(b2,b3,b4,b5,b6){var g=0,f=b3[g],e
if(typeof f=="string")e=b3[++g]
else{e=f
f=b4}var d=[b2[b4]=b2[f]=e]
e.$stubName=b4
b6.push(b4)
for(g++;g<b3.length;g++){e=b3[g]
if(typeof e!="function")break
if(!b5)e.$stubName=b3[++g]
d.push(e)
if(e.$stubName){b2[e.$stubName]=e
b6.push(e.$stubName)}}for(var c=0;c<d.length;g++,c++)d[c].$callName=b3[g]
var a0=b3[g]
b3=b3.slice(++g)
var a1=b3[0]
var a2=a1>>1
var a3=(a1&1)===1
var a4=a1===3
var a5=a1===1
var a6=b3[1]
var a7=a6>>1
var a8=(a6&1)===1
var a9=a2+a7!=d[0].length
var b0=b3[2]
if(typeof b0=="number")b3[2]=b0+b
var b1=2*a7+a2+3
if(a0){e=tearOff(d,b3,b5,b4,a9)
b2[b4].$getter=e
e.$getterStub=true
if(b5){init.globalFunctions[b4]=e
b6.push(a0)}b2[a0]=e
d.push(e)
e.$stubName=a0
e.$callName=null}}Function.prototype.$1=function(c){return this(c)}
Function.prototype.$3=function(c,d,e){return this(c,d,e)}
Function.prototype.$0=function(){return this()}
Function.prototype.$2=function(c,d){return this(c,d)}
Function.prototype.$4=function(c,d,e,f){return this(c,d,e,f)}
function tearOffGetter(c,d,e,f){return f?new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"(x) {"+"if (c === null) c = "+"H.bW"+"("+"this, funcs, reflectionInfo, false, [x], name);"+"return new c(this, funcs[0], x, name);"+"}")(c,d,e,H,null):new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"() {"+"if (c === null) c = "+"H.bW"+"("+"this, funcs, reflectionInfo, false, [], name);"+"return new c(this, funcs[0], null, name);"+"}")(c,d,e,H,null)}function tearOff(c,d,e,f,a0){var g
return e?function(){if(g===void 0)g=H.bW(this,c,d,true,[],f).prototype
return g}:tearOffGetter(c,d,f,a0)}var y=0
if(!init.libraries)init.libraries=[]
if(!init.mangledNames)init.mangledNames=map()
if(!init.mangledGlobalNames)init.mangledGlobalNames=map()
if(!init.statics)init.statics=map()
if(!init.typeInformation)init.typeInformation=map()
if(!init.globalFunctions)init.globalFunctions=map()
var x=init.libraries
var w=init.mangledNames
var v=init.mangledGlobalNames
var u=Object.prototype.hasOwnProperty
var t=a.length
var s=map()
s.collected=map()
s.pending=map()
s.constructorsList=[]
s.combinedConstructorFunction="function $reflectable(fn){fn.$reflectable=1;return fn};\n"+"var $desc;\n"
for(var r=0;r<t;r++){var q=a[r]
var p=q[0]
var o=q[1]
var n=q[2]
var m=q[3]
var l=q[4]
var k=!!q[5]
var j=l&&l["^"]
if(j instanceof Array)j=j[0]
var i=[]
var h=[]
processStatics(l,s)
x.push([p,o,i,h,n,j,k,m])}finishClasses(s)}I.a9=function(){}
var dart=[["","",,H,{"^":"",jP:{"^":"c;a"}}],["","",,J,{"^":"",
j:function(a){return void 0},
bo:function(a,b,c,d){return{i:a,p:b,e:c,x:d}},
bm:function(a){var z,y,x,w
z=a[init.dispatchPropertyName]
if(z==null)if($.c0==null){H.iC()
z=a[init.dispatchPropertyName]}if(z!=null){y=z.p
if(!1===y)return z.i
if(!0===y)return a
x=Object.getPrototypeOf(a)
if(y===x)return z.i
if(z.e===x)throw H.b(new P.d3("Return interceptor for "+H.a(y(a,z))))}w=H.iM(a)
if(w==null){if(typeof a=="function")return C.C
y=Object.getPrototypeOf(a)
if(y==null||y===Object.prototype)return C.E
else return C.F}return w},
f:{"^":"c;",
q:function(a,b){return a===b},
gu:function(a){return H.a6(a)},
j:["cj",function(a){return H.aO(a)}],
"%":"Blob|DOMError|File|FileError|MediaError|MediaKeyError|NavigatorUserMediaError|PositionError|SQLError|SVGAnimatedLength|SVGAnimatedLengthList|SVGAnimatedNumber|SVGAnimatedNumberList|SVGAnimatedString|WebGLRenderingContext"},
f_:{"^":"f;",
j:function(a){return String(a)},
gu:function(a){return a?519018:218159},
$isbi:1},
f1:{"^":"f;",
q:function(a,b){return null==b},
j:function(a){return"null"},
gu:function(a){return 0}},
bx:{"^":"f;",
gu:function(a){return 0},
j:["ck",function(a){return String(a)}],
$isf2:1},
fi:{"^":"bx;"},
aQ:{"^":"bx;"},
aK:{"^":"bx;",
j:function(a){var z=a[$.$get$ce()]
return z==null?this.ck(a):J.ac(z)},
$signature:function(){return{func:1,opt:[,,,,,,,,,,,,,,,,]}}},
aH:{"^":"f;",
aY:function(a,b){if(!!a.immutable$list)throw H.b(new P.t(b))},
aX:function(a,b){if(!!a.fixed$length)throw H.b(new P.t(b))},
O:function(a,b){this.aX(a,"add")
a.push(b)},
V:function(a,b){var z
this.aX(a,"addAll")
for(z=J.N(b);z.k();)a.push(z.gl())},
p:function(a,b){var z,y
z=a.length
for(y=0;y<z;++y){b.$1(a[y])
if(a.length!==z)throw H.b(new P.y(a))}},
a8:function(a,b){return H.e(new H.b7(a,b),[null,null])},
b0:function(a,b){var z,y,x,w
z=a.length
y=new Array(z)
y.fixed$length=Array
for(x=0;x<a.length;++x){w=H.a(a[x])
if(x>=z)return H.h(y,x)
y[x]=w}return y.join(b)},
a6:function(a,b,c){var z,y,x
z=a.length
for(y=b,x=0;x<z;++x){y=c.$2(y,a[x])
if(a.length!==z)throw H.b(new P.y(a))}return y},
A:function(a,b){if(b>>>0!==b||b>=a.length)return H.h(a,b)
return a[b]},
gd5:function(a){if(a.length>0)return a[0]
throw H.b(H.cq())},
ba:function(a,b,c,d,e){var z,y,x
this.aY(a,"set range")
P.bI(b,c,a.length,null,null,null)
z=c-b
if(z===0)return
if(e<0)H.r(P.J(e,0,null,"skipCount",null))
if(e+z>d.length)throw H.b(H.eZ())
if(e<b)for(y=z-1;y>=0;--y){x=e+y
if(x<0||x>=d.length)return H.h(d,x)
a[b+y]=d[x]}else for(y=0;y<z;++y){x=e+y
if(x<0||x>=d.length)return H.h(d,x)
a[b+y]=d[x]}},
d4:function(a,b,c,d){var z
this.aY(a,"fill range")
P.bI(b,c,a.length,null,null,null)
for(z=b;z<c;++z)a[z]=d},
de:function(a,b,c){var z
if(c>=a.length)return-1
for(z=c;z<a.length;++z)if(J.A(a[z],b))return z
return-1},
bL:function(a,b){return this.de(a,b,0)},
B:function(a,b){var z
for(z=0;z<a.length;++z)if(J.A(a[z],b))return!0
return!1},
j:function(a){return P.b5(a,"[","]")},
gn:function(a){return new J.bs(a,a.length,0,null)},
gu:function(a){return H.a6(a)},
gi:function(a){return a.length},
si:function(a,b){this.aX(a,"set length")
if(b<0)throw H.b(P.J(b,0,null,"newLength",null))
a.length=b},
h:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.b(H.x(a,b))
if(b>=a.length||b<0)throw H.b(H.x(a,b))
return a[b]},
t:function(a,b,c){this.aY(a,"indexed set")
if(typeof b!=="number"||Math.floor(b)!==b)throw H.b(H.x(a,b))
if(b>=a.length||b<0)throw H.b(H.x(a,b))
a[b]=c},
$isP:1,
$asP:I.a9,
$isi:1,
$asi:null,
$isk:1},
jO:{"^":"aH;"},
bs:{"^":"c;a,b,c,d",
gl:function(){return this.d},
k:function(){var z,y,x
z=this.a
y=z.length
if(this.b!==y)throw H.b(H.dQ(z))
x=this.c
if(x>=y){this.d=null
return!1}this.d=z[x]
this.c=x+1
return!0}},
aI:{"^":"f;",
b6:function(a,b){return a%b},
bC:function(a){return Math.abs(a)},
dv:function(a){if(a>0){if(a!==1/0)return Math.round(a)}else if(a>-1/0)return 0-Math.round(0-a)
throw H.b(new P.t(""+a+".round()"))},
dw:function(a){if(a<0)return-Math.round(-a)
else return Math.round(a)},
bY:function(a,b){var z,y,x,w
H.aV(b)
if(b<2||b>36)throw H.b(P.J(b,2,36,"radix",null))
z=a.toString(b)
if(C.d.a4(z,z.length-1)!==41)return z
y=/^([\da-z]+)(?:\.([\da-z]+))?\(e\+(\d+)\)$/.exec(z)
if(y==null)H.r(new P.t("Unexpected toString result: "+z))
x=J.C(y)
z=x.h(y,1)
w=+x.h(y,3)
if(x.h(y,2)!=null){z+=x.h(y,2)
w-=x.h(y,2).length}return z+C.d.c6("0",w)},
j:function(a){if(a===0&&1/a<0)return"-0.0"
else return""+a},
gu:function(a){return a&0x1FFFFFFF},
C:function(a,b){if(typeof b!=="number")throw H.b(H.L(b))
return a+b},
M:function(a,b){if(typeof b!=="number")throw H.b(H.L(b))
return a-b},
a1:function(a,b){return(a|0)===a?a/b|0:this.cQ(a,b)},
cQ:function(a,b){var z=a/b
if(z>=-2147483648&&z<=2147483647)return z|0
if(z>0){if(z!==1/0)return Math.floor(z)}else if(z>-1/0)return Math.ceil(z)
throw H.b(new P.t("Result of truncating division is "+H.a(z)+": "+H.a(a)+" ~/ "+b))},
bz:function(a,b){var z
if(a>0)z=b>31?0:a>>>b
else{z=b>31?31:b
z=a>>z>>>0}return z},
ab:function(a,b){if(typeof b!=="number")throw H.b(H.L(b))
return a<b},
an:function(a,b){if(typeof b!=="number")throw H.b(H.L(b))
return a>b},
az:function(a,b){if(typeof b!=="number")throw H.b(H.L(b))
return a>=b},
$isM:1},
cr:{"^":"aI;",$isaF:1,$isM:1,$iso:1},
f0:{"^":"aI;",$isaF:1,$isM:1},
aJ:{"^":"f;",
a4:function(a,b){if(b<0)throw H.b(H.x(a,b))
if(b>=a.length)throw H.b(H.x(a,b))
return a.charCodeAt(b)},
cU:function(a,b,c){H.bj(b)
H.aV(c)
if(c>b.length)throw H.b(P.J(c,0,b.length,null,null))
return new H.hT(b,a,c)},
cT:function(a,b){return this.cU(a,b,0)},
C:function(a,b){if(typeof b!=="string")throw H.b(P.ca(b,null,null))
return a+b},
dt:function(a,b,c,d){var z
H.bj(c)
H.aV(d)
z=a.length
if(d>z)H.r(P.J(d,0,z,"startIndex",null))
return H.j_(a,b,c,d)},
ds:function(a,b,c){return this.dt(a,b,c,0)},
aB:function(a,b,c){H.aV(b)
if(c==null)c=a.length
H.aV(c)
if(b<0)throw H.b(P.aP(b,null,null))
if(typeof c!=="number")return H.E(c)
if(b>c)throw H.b(P.aP(b,null,null))
if(c>a.length)throw H.b(P.aP(c,null,null))
return a.substring(b,c)},
bb:function(a,b){return this.aB(a,b,null)},
dB:function(a){var z,y,x,w,v
z=a.trim()
y=z.length
if(y===0)return z
if(this.a4(z,0)===133){x=J.f3(z,1)
if(x===y)return""}else x=0
w=y-1
v=this.a4(z,w)===133?J.f4(z,w):y
if(x===0&&v===y)return z
return z.substring(x,v)},
c6:function(a,b){var z,y
if(0>=b)return""
if(b===1||a.length===0)return a
if(b!==b>>>0)throw H.b(C.t)
for(z=a,y="";!0;){if((b&1)===1)y=z+y
b=b>>>1
if(b===0)break
z+=z}return y},
cW:function(a,b,c){if(c>a.length)throw H.b(P.J(c,0,a.length,null,null))
return H.iZ(a,b,c)},
B:function(a,b){return this.cW(a,b,0)},
j:function(a){return a},
gu:function(a){var z,y,x
for(z=a.length,y=0,x=0;x<z;++x){y=536870911&y+a.charCodeAt(x)
y=536870911&y+((524287&y)<<10>>>0)
y^=y>>6}y=536870911&y+((67108863&y)<<3>>>0)
y^=y>>11
return 536870911&y+((16383&y)<<15>>>0)},
gi:function(a){return a.length},
h:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.b(H.x(a,b))
if(b>=a.length||b<0)throw H.b(H.x(a,b))
return a[b]},
$isP:1,
$asP:I.a9,
$isY:1,
m:{
cs:function(a){if(a<256)switch(a){case 9:case 10:case 11:case 12:case 13:case 32:case 133:case 160:return!0
default:return!1}switch(a){case 5760:case 6158:case 8192:case 8193:case 8194:case 8195:case 8196:case 8197:case 8198:case 8199:case 8200:case 8201:case 8202:case 8232:case 8233:case 8239:case 8287:case 12288:case 65279:return!0
default:return!1}},
f3:function(a,b){var z,y
for(z=a.length;b<z;){y=C.d.a4(a,b)
if(y!==32&&y!==13&&!J.cs(y))break;++b}return b},
f4:function(a,b){var z,y
for(;b>0;b=z){z=b-1
y=C.d.a4(a,z)
if(y!==32&&y!==13&&!J.cs(y))break}return b}}}}],["","",,H,{"^":"",
cq:function(){return new P.bb("No element")},
eZ:function(){return new P.bb("Too few elements")},
aL:{"^":"u;",
gn:function(a){return new H.ct(this,this.gi(this),0,null)},
p:function(a,b){var z,y
z=this.gi(this)
for(y=0;y<z;++y){b.$1(this.A(0,y))
if(z!==this.gi(this))throw H.b(new P.y(this))}},
B:function(a,b){var z,y
z=this.gi(this)
for(y=0;y<z;++y){if(J.A(this.A(0,y),b))return!0
if(z!==this.gi(this))throw H.b(new P.y(this))}return!1},
a8:function(a,b){return H.e(new H.b7(this,b),[H.v(this,"aL",0),null])},
a6:function(a,b,c){var z,y,x
z=this.gi(this)
for(y=b,x=0;x<z;++x){y=c.$2(y,this.A(0,x))
if(z!==this.gi(this))throw H.b(new P.y(this))}return y},
ak:function(a,b){var z,y,x
z=H.e([],[H.v(this,"aL",0)])
C.a.si(z,this.gi(this))
for(y=0;y<this.gi(this);++y){x=this.A(0,y)
if(y>=z.length)return H.h(z,y)
z[y]=x}return z},
aa:function(a){return this.ak(a,!0)},
$isk:1},
ct:{"^":"c;a,b,c,d",
gl:function(){return this.d},
k:function(){var z,y,x,w
z=this.a
y=J.C(z)
x=y.gi(z)
if(this.b!==x)throw H.b(new P.y(z))
w=this.c
if(w>=x){this.d=null
return!1}this.d=y.A(z,w);++this.c
return!0}},
cu:{"^":"u;a,b",
gn:function(a){var z=new H.fb(null,J.N(this.a),this.b)
z.$builtinTypeInfo=this.$builtinTypeInfo
return z},
gi:function(a){return J.V(this.a)},
A:function(a,b){return this.b.$1(J.aY(this.a,b))},
$asu:function(a,b){return[b]},
m:{
aM:function(a,b,c,d){if(!!J.j(a).$isk)return H.e(new H.cg(a,b),[c,d])
return H.e(new H.cu(a,b),[c,d])}}},
cg:{"^":"cu;a,b",$isk:1},
fb:{"^":"b6;a,b,c",
k:function(){var z=this.b
if(z.k()){this.a=this.c.$1(z.gl())
return!0}this.a=null
return!1},
gl:function(){return this.a}},
b7:{"^":"aL;a,b",
gi:function(a){return J.V(this.a)},
A:function(a,b){return this.b.$1(J.aY(this.a,b))},
$asaL:function(a,b){return[b]},
$asu:function(a,b){return[b]},
$isk:1},
bd:{"^":"u;a,b",
gn:function(a){var z=new H.h2(J.N(this.a),this.b)
z.$builtinTypeInfo=this.$builtinTypeInfo
return z}},
h2:{"^":"b6;a,b",
k:function(){var z,y
for(z=this.a,y=this.b;z.k();)if(y.$1(z.gl())===!0)return!0
return!1},
gl:function(){return this.a.gl()}},
cO:{"^":"u;a,b",
gn:function(a){var z=new H.fR(J.N(this.a),this.b)
z.$builtinTypeInfo=this.$builtinTypeInfo
return z},
m:{
fQ:function(a,b,c){if(b<0)throw H.b(P.aq(b))
if(!!J.j(a).$isk)return H.e(new H.eB(a,b),[c])
return H.e(new H.cO(a,b),[c])}}},
eB:{"^":"cO;a,b",
gi:function(a){var z,y
z=J.V(this.a)
y=this.b
if(z>y)return y
return z},
$isk:1},
fR:{"^":"b6;a,b",
k:function(){if(--this.b>=0)return this.a.k()
this.b=-1
return!1},
gl:function(){if(this.b<0)return
return this.a.gl()}},
cL:{"^":"u;a,b",
gn:function(a){var z=new H.fv(J.N(this.a),this.b)
z.$builtinTypeInfo=this.$builtinTypeInfo
return z},
bc:function(a,b,c){var z=this.b
if(z<0)H.r(P.J(z,0,null,"count",null))},
m:{
fu:function(a,b,c){var z
if(!!J.j(a).$isk){z=H.e(new H.eA(a,b),[c])
z.bc(a,b,c)
return z}return H.ft(a,b,c)},
ft:function(a,b,c){var z=H.e(new H.cL(a,b),[c])
z.bc(a,b,c)
return z}}},
eA:{"^":"cL;a,b",
gi:function(a){var z=J.V(this.a)-this.b
if(z>=0)return z
return 0},
$isk:1},
fv:{"^":"b6;a,b",
k:function(){var z,y
for(z=this.a,y=0;y<this.b;++y)z.k()
this.b=0
return z.k()},
gl:function(){return this.a.gl()}},
ck:{"^":"c;",
si:function(a,b){throw H.b(new P.t("Cannot change the length of a fixed-length list"))},
V:function(a,b){throw H.b(new P.t("Cannot add to a fixed-length list"))}}}],["","",,H,{"^":"",
aT:function(a,b){var z=a.af(b)
if(!init.globalState.d.cy)init.globalState.f.aj()
return z},
dN:function(a,b){var z,y,x,w,v,u
z={}
z.a=b
if(b==null){b=[]
z.a=b
y=b}else y=b
if(!J.j(y).$isi)throw H.b(P.aq("Arguments to main must be a List: "+H.a(y)))
init.globalState=new H.hH(0,0,1,null,null,null,null,null,null,null,null,null,a)
y=init.globalState
x=self.window==null
w=self.Worker
v=x&&!!self.postMessage
y.x=v
v=!v
if(v)w=w!=null&&$.$get$co()!=null
else w=!0
y.y=w
y.r=x&&v
y.f=new H.hk(P.bA(null,H.aR),0)
y.z=H.e(new H.a3(0,null,null,null,null,null,0),[P.o,H.bN])
y.ch=H.e(new H.a3(0,null,null,null,null,null,0),[P.o,null])
if(y.x===!0){x=new H.hG()
y.Q=x
self.onmessage=function(c,d){return function(e){c(d,e)}}(H.eS,x)
self.dartPrint=self.dartPrint||function(c){return function(d){if(self.console&&self.console.log)self.console.log(d)
else self.postMessage(c(d))}}(H.hI)}if(init.globalState.x===!0)return
y=init.globalState.a++
x=H.e(new H.a3(0,null,null,null,null,null,0),[P.o,H.b9])
w=P.aw(null,null,null,P.o)
v=new H.b9(0,null,!1)
u=new H.bN(y,x,w,init.createNewIsolate(),v,new H.ad(H.bp()),new H.ad(H.bp()),!1,!1,[],P.aw(null,null,null,null),null,null,!1,!0,P.aw(null,null,null,null))
w.O(0,0)
u.be(0,v)
init.globalState.e=u
init.globalState.d=u
y=H.aX()
x=H.ak(y,[y]).T(a)
if(x)u.af(new H.iX(z,a))
else{y=H.ak(y,[y,y]).T(a)
if(y)u.af(new H.iY(z,a))
else u.af(a)}init.globalState.f.aj()},
eW:function(){var z=init.currentScript
if(z!=null)return String(z.src)
if(init.globalState.x===!0)return H.eX()
return},
eX:function(){var z,y
z=new Error().stack
if(z==null){z=function(){try{throw new Error()}catch(x){return x.stack}}()
if(z==null)throw H.b(new P.t("No stack trace"))}y=z.match(new RegExp("^ *at [^(]*\\((.*):[0-9]*:[0-9]*\\)$","m"))
if(y!=null)return y[1]
y=z.match(new RegExp("^[^@]*@(.*):[0-9]*$","m"))
if(y!=null)return y[1]
throw H.b(new P.t('Cannot extract URI from "'+H.a(z)+'"'))},
eS:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=new H.bf(!0,[]).X(b.data)
y=J.C(z)
switch(y.h(z,"command")){case"start":init.globalState.b=y.h(z,"id")
x=y.h(z,"functionName")
w=x==null?init.globalState.cx:init.globalFunctions[x]()
v=y.h(z,"args")
u=new H.bf(!0,[]).X(y.h(z,"msg"))
t=y.h(z,"isSpawnUri")
s=y.h(z,"startPaused")
r=new H.bf(!0,[]).X(y.h(z,"replyTo"))
y=init.globalState.a++
q=H.e(new H.a3(0,null,null,null,null,null,0),[P.o,H.b9])
p=P.aw(null,null,null,P.o)
o=new H.b9(0,null,!1)
n=new H.bN(y,q,p,init.createNewIsolate(),o,new H.ad(H.bp()),new H.ad(H.bp()),!1,!1,[],P.aw(null,null,null,null),null,null,!1,!0,P.aw(null,null,null,null))
p.O(0,0)
n.be(0,o)
init.globalState.f.a.N(new H.aR(n,new H.eT(w,v,u,t,s,r),"worker-start"))
init.globalState.d=n
init.globalState.f.aj()
break
case"spawn-worker":break
case"message":if(y.h(z,"port")!=null)y.h(z,"port").S(y.h(z,"msg"))
init.globalState.f.aj()
break
case"close":init.globalState.ch.a9(0,$.$get$cp().h(0,a))
a.terminate()
init.globalState.f.aj()
break
case"log":H.eR(y.h(z,"msg"))
break
case"print":if(init.globalState.x===!0){y=init.globalState.Q
q=P.av(["command","print","msg",z])
q=new H.ah(!0,P.aA(null,P.o)).E(q)
y.toString
self.postMessage(q)}else P.aa(y.h(z,"msg"))
break
case"error":throw H.b(y.h(z,"msg"))}},
eR:function(a){var z,y,x,w
if(init.globalState.x===!0){y=init.globalState.Q
x=P.av(["command","log","msg",a])
x=new H.ah(!0,P.aA(null,P.o)).E(x)
y.toString
self.postMessage(x)}else try{self.console.log(a)}catch(w){H.G(w)
z=H.D(w)
throw H.b(P.b4(z))}},
eU:function(a,b,c,d,e,f){var z,y,x,w
z=init.globalState.d
y=z.a
$.cG=$.cG+("_"+y)
$.cH=$.cH+("_"+y)
y=z.e
x=init.globalState.d.a
w=z.f
f.S(["spawned",new H.bg(y,x),w,z.r])
x=new H.eV(a,b,c,d,z)
if(e===!0){z.bD(w,w)
init.globalState.f.a.N(new H.aR(z,x,"start isolate"))}else x.$0()},
i2:function(a){return new H.bf(!0,[]).X(new H.ah(!1,P.aA(null,P.o)).E(a))},
iX:{"^":"d:1;a,b",
$0:function(){this.b.$1(this.a.a)}},
iY:{"^":"d:1;a,b",
$0:function(){this.b.$2(this.a.a,null)}},
hH:{"^":"c;a,b,c,d,e,f,r,x,y,z,Q,ch,cx",m:{
hI:function(a){var z=P.av(["command","print","msg",a])
return new H.ah(!0,P.aA(null,P.o)).E(z)}}},
bN:{"^":"c;a,b,c,di:d<,cX:e<,f,r,x,y,z,Q,ch,cx,cy,db,dx",
bD:function(a,b){if(!this.f.q(0,a))return
if(this.Q.O(0,b)&&!this.y)this.y=!0
this.aT()},
dq:function(a){var z,y,x,w,v,u
if(!this.y)return
z=this.Q
z.a9(0,a)
if(z.a===0){for(z=this.z;y=z.length,y!==0;){if(0>=y)return H.h(z,-1)
x=z.pop()
y=init.globalState.f.a
w=y.b
v=y.a
u=v.length
w=(w-1&u-1)>>>0
y.b=w
if(w<0||w>=u)return H.h(v,w)
v[w]=x
if(w===y.c)y.bk();++y.d}this.y=!1}this.aT()},
cS:function(a,b){var z,y,x
if(this.ch==null)this.ch=[]
for(z=J.j(a),y=0;x=this.ch,y<x.length;y+=2)if(z.q(a,x[y])){z=this.ch
x=y+1
if(x>=z.length)return H.h(z,x)
z[x]=b
return}x.push(a)
this.ch.push(b)},
dn:function(a){var z,y,x
if(this.ch==null)return
for(z=J.j(a),y=0;x=this.ch,y<x.length;y+=2)if(z.q(a,x[y])){z=this.ch
x=y+2
z.toString
if(typeof z!=="object"||z===null||!!z.fixed$length)H.r(new P.t("removeRange"))
P.bI(y,x,z.length,null,null,null)
z.splice(y,x-y)
return}},
cf:function(a,b){if(!this.r.q(0,a))return
this.db=b},
d8:function(a,b,c){var z=J.j(b)
if(!z.q(b,0))z=z.q(b,1)&&!this.cy
else z=!0
if(z){a.S(c)
return}z=this.cx
if(z==null){z=P.bA(null,null)
this.cx=z}z.N(new H.hB(a,c))},
d7:function(a,b){var z
if(!this.r.q(0,a))return
z=J.j(b)
if(!z.q(b,0))z=z.q(b,1)&&!this.cy
else z=!0
if(z){this.b1()
return}z=this.cx
if(z==null){z=P.bA(null,null)
this.cx=z}z.N(this.gdj())},
d9:function(a,b){var z,y,x
z=this.dx
if(z.a===0){if(this.db===!0&&this===init.globalState.e)return
if(self.console&&self.console.error)self.console.error(a,b)
else{P.aa(a)
if(b!=null)P.aa(b)}return}y=new Array(2)
y.fixed$length=Array
y[0]=J.ac(a)
y[1]=b==null?null:J.ac(b)
for(x=new P.aS(z,z.r,null,null),x.c=z.e;x.k();)x.d.S(y)},
af:function(a){var z,y,x,w,v,u,t
z=init.globalState.d
init.globalState.d=this
$=this.d
y=null
x=this.cy
this.cy=!0
try{y=a.$0()}catch(u){t=H.G(u)
w=t
v=H.D(u)
this.d9(w,v)
if(this.db===!0){this.b1()
if(this===init.globalState.e)throw u}}finally{this.cy=x
init.globalState.d=z
if(z!=null)$=z.gdi()
if(this.cx!=null)for(;t=this.cx,!t.gF(t);)this.cx.bS().$0()}return y},
bO:function(a){return this.b.h(0,a)},
be:function(a,b){var z=this.b
if(z.aZ(a))throw H.b(P.b4("Registry: ports must be registered only once."))
z.t(0,a,b)},
aT:function(){var z=this.b
if(z.gi(z)-this.c.a>0||this.y||!this.x)init.globalState.z.t(0,this.a,this)
else this.b1()},
b1:[function(){var z,y,x,w,v
z=this.cx
if(z!=null)z.a3(0)
for(z=this.b,y=z.gc_(z),y=y.gn(y);y.k();)y.gl().cv()
z.a3(0)
this.c.a3(0)
init.globalState.z.a9(0,this.a)
this.dx.a3(0)
if(this.ch!=null){for(x=0;z=this.ch,y=z.length,x<y;x+=2){w=z[x]
v=x+1
if(v>=y)return H.h(z,v)
w.S(z[v])}this.ch=null}},"$0","gdj",0,0,2]},
hB:{"^":"d:2;a,b",
$0:function(){this.a.S(this.b)}},
hk:{"^":"c;a,b",
cY:function(){var z=this.a
if(z.b===z.c)return
return z.bS()},
bW:function(){var z,y,x
z=this.cY()
if(z==null){if(init.globalState.e!=null)if(init.globalState.z.aZ(init.globalState.e.a))if(init.globalState.r===!0){y=init.globalState.e.b
y=y.gF(y)}else y=!1
else y=!1
else y=!1
if(y)H.r(P.b4("Program exited with open ReceivePorts."))
y=init.globalState
if(y.x===!0){x=y.z
x=x.gF(x)&&y.f.b===0}else x=!1
if(x){y=y.Q
x=P.av(["command","close"])
x=new H.ah(!0,H.e(new P.dd(0,null,null,null,null,null,0),[null,P.o])).E(x)
y.toString
self.postMessage(x)}return!1}z.dl()
return!0},
bv:function(){if(self.window!=null)new H.hl(this).$0()
else for(;this.bW(););},
aj:function(){var z,y,x,w,v
if(init.globalState.x!==!0)this.bv()
else try{this.bv()}catch(x){w=H.G(x)
z=w
y=H.D(x)
w=init.globalState.Q
v=P.av(["command","error","msg",H.a(z)+"\n"+H.a(y)])
v=new H.ah(!0,P.aA(null,P.o)).E(v)
w.toString
self.postMessage(v)}}},
hl:{"^":"d:2;a",
$0:function(){if(!this.a.bW())return
P.fY(C.i,this)}},
aR:{"^":"c;a,b,c",
dl:function(){var z=this.a
if(z.y){z.z.push(this)
return}z.af(this.b)}},
hG:{"^":"c;"},
eT:{"^":"d:1;a,b,c,d,e,f",
$0:function(){H.eU(this.a,this.b,this.c,this.d,this.e,this.f)}},
eV:{"^":"d:2;a,b,c,d,e",
$0:function(){var z,y,x,w
z=this.e
z.x=!0
if(this.d!==!0)this.a.$1(this.c)
else{y=this.a
x=H.aX()
w=H.ak(x,[x,x]).T(y)
if(w)y.$2(this.b,this.c)
else{x=H.ak(x,[x]).T(y)
if(x)y.$1(this.b)
else y.$0()}}z.aT()}},
d5:{"^":"c;"},
bg:{"^":"d5;b,a",
S:function(a){var z,y,x
z=init.globalState.z.h(0,this.a)
if(z==null)return
y=this.b
if(y.gbn())return
x=H.i2(a)
if(z.gcX()===y){y=J.C(x)
switch(y.h(x,0)){case"pause":z.bD(y.h(x,1),y.h(x,2))
break
case"resume":z.dq(y.h(x,1))
break
case"add-ondone":z.cS(y.h(x,1),y.h(x,2))
break
case"remove-ondone":z.dn(y.h(x,1))
break
case"set-errors-fatal":z.cf(y.h(x,1),y.h(x,2))
break
case"ping":z.d8(y.h(x,1),y.h(x,2),y.h(x,3))
break
case"kill":z.d7(y.h(x,1),y.h(x,2))
break
case"getErrors":y=y.h(x,1)
z.dx.O(0,y)
break
case"stopErrors":y=y.h(x,1)
z.dx.a9(0,y)
break}return}init.globalState.f.a.N(new H.aR(z,new H.hK(this,x),"receive"))},
q:function(a,b){if(b==null)return!1
return b instanceof H.bg&&J.A(this.b,b.b)},
gu:function(a){return this.b.gaM()}},
hK:{"^":"d:1;a,b",
$0:function(){var z=this.a.b
if(!z.gbn())z.cs(this.b)}},
bO:{"^":"d5;b,c,a",
S:function(a){var z,y,x
z=P.av(["command","message","port",this,"msg",a])
y=new H.ah(!0,P.aA(null,P.o)).E(z)
if(init.globalState.x===!0){init.globalState.Q.toString
self.postMessage(y)}else{x=init.globalState.ch.h(0,this.b)
if(x!=null)x.postMessage(y)}},
q:function(a,b){if(b==null)return!1
return b instanceof H.bO&&J.A(this.b,b.b)&&J.A(this.a,b.a)&&J.A(this.c,b.c)},
gu:function(a){var z,y,x
z=this.b
if(typeof z!=="number")return z.cg()
y=this.a
if(typeof y!=="number")return y.cg()
x=this.c
if(typeof x!=="number")return H.E(x)
return(z<<16^y<<8^x)>>>0}},
b9:{"^":"c;aM:a<,b,bn:c<",
cv:function(){this.c=!0
this.b=null},
cs:function(a){if(this.c)return
this.b.$1(a)},
$isfj:1},
cR:{"^":"c;a,b,c",
a2:function(){if(self.setTimeout!=null){if(this.b)throw H.b(new P.t("Timer in event loop cannot be canceled."))
var z=this.c
if(z==null)return;--init.globalState.f.b
if(this.a)self.clearTimeout(z)
else self.clearInterval(z)
this.c=null}else throw H.b(new P.t("Canceling a timer."))},
cp:function(a,b){if(self.setTimeout!=null){++init.globalState.f.b
this.c=self.setInterval(H.a8(new H.fV(this,b),0),a)}else throw H.b(new P.t("Periodic timer."))},
co:function(a,b){var z,y
if(a===0)z=self.setTimeout==null||init.globalState.x===!0
else z=!1
if(z){this.c=1
z=init.globalState.f
y=init.globalState.d
z.a.N(new H.aR(y,new H.fW(this,b),"timer"))
this.b=!0}else if(self.setTimeout!=null){++init.globalState.f.b
this.c=self.setTimeout(H.a8(new H.fX(this,b),0),a)}else throw H.b(new P.t("Timer greater than 0."))},
m:{
fT:function(a,b){var z=new H.cR(!0,!1,null)
z.co(a,b)
return z},
fU:function(a,b){var z=new H.cR(!1,!1,null)
z.cp(a,b)
return z}}},
fW:{"^":"d:2;a,b",
$0:function(){this.a.c=null
this.b.$0()}},
fX:{"^":"d:2;a,b",
$0:function(){this.a.c=null;--init.globalState.f.b
this.b.$0()}},
fV:{"^":"d:1;a,b",
$0:function(){this.b.$1(this.a)}},
ad:{"^":"c;aM:a<",
gu:function(a){var z=this.a
if(typeof z!=="number")return z.dE()
z=C.m.bz(z,0)^C.m.a1(z,4294967296)
z=(~z>>>0)+(z<<15>>>0)&4294967295
z=((z^z>>>12)>>>0)*5&4294967295
z=((z^z>>>4)>>>0)*2057&4294967295
return(z^z>>>16)>>>0},
q:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(b instanceof H.ad){z=this.a
y=b.a
return z==null?y==null:z===y}return!1}},
ah:{"^":"c;a,b",
E:[function(a){var z,y,x,w,v
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
z=this.b
y=z.h(0,a)
if(y!=null)return["ref",y]
z.t(0,a,z.gi(z))
z=J.j(a)
if(!!z.$iscw)return["buffer",a]
if(!!z.$isbD)return["typed",a]
if(!!z.$isP)return this.ca(a)
if(!!z.$iseQ){x=this.gc7()
w=a.gbM()
w=H.aM(w,x,H.v(w,"u",0),null)
w=P.W(w,!0,H.v(w,"u",0))
z=z.gc_(a)
z=H.aM(z,x,H.v(z,"u",0),null)
return["map",w,P.W(z,!0,H.v(z,"u",0))]}if(!!z.$isf2)return this.cb(a)
if(!!z.$isf)this.bZ(a)
if(!!z.$isfj)this.am(a,"RawReceivePorts can't be transmitted:")
if(!!z.$isbg)return this.cc(a)
if(!!z.$isbO)return this.cd(a)
if(!!z.$isd){v=a.$static_name
if(v==null)this.am(a,"Closures can't be transmitted:")
return["function",v]}if(!!z.$isad)return["capability",a.a]
if(!(a instanceof P.c))this.bZ(a)
return["dart",init.classIdExtractor(a),this.c9(init.classFieldsExtractor(a))]},"$1","gc7",2,0,0],
am:function(a,b){throw H.b(new P.t(H.a(b==null?"Can't transmit:":b)+" "+H.a(a)))},
bZ:function(a){return this.am(a,null)},
ca:function(a){var z=this.c8(a)
if(!!a.fixed$length)return["fixed",z]
if(!a.fixed$length)return["extendable",z]
if(!a.immutable$list)return["mutable",z]
if(a.constructor===Array)return["const",z]
this.am(a,"Can't serialize indexable: ")},
c8:function(a){var z,y,x
z=[]
C.a.si(z,a.length)
for(y=0;y<a.length;++y){x=this.E(a[y])
if(y>=z.length)return H.h(z,y)
z[y]=x}return z},
c9:function(a){var z
for(z=0;z<a.length;++z)C.a.t(a,z,this.E(a[z]))
return a},
cb:function(a){var z,y,x,w
if(!!a.constructor&&a.constructor!==Object)this.am(a,"Only plain JS Objects are supported:")
z=Object.keys(a)
y=[]
C.a.si(y,z.length)
for(x=0;x<z.length;++x){w=this.E(a[z[x]])
if(x>=y.length)return H.h(y,x)
y[x]=w}return["js-object",z,y]},
cd:function(a){if(this.a)return["sendport",a.b,a.a,a.c]
return["raw sendport",a]},
cc:function(a){if(this.a)return["sendport",init.globalState.b,a.a,a.b.gaM()]
return["raw sendport",a]}},
bf:{"^":"c;a,b",
X:[function(a){var z,y,x,w,v,u
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
if(typeof a!=="object"||a===null||a.constructor!==Array)throw H.b(P.aq("Bad serialized message: "+H.a(a)))
switch(C.a.gd5(a)){case"ref":if(1>=a.length)return H.h(a,1)
z=a[1]
y=this.b
if(z>>>0!==z||z>=y.length)return H.h(y,z)
return y[z]
case"buffer":if(1>=a.length)return H.h(a,1)
x=a[1]
this.b.push(x)
return x
case"typed":if(1>=a.length)return H.h(a,1)
x=a[1]
this.b.push(x)
return x
case"fixed":if(1>=a.length)return H.h(a,1)
x=a[1]
this.b.push(x)
y=H.e(this.ae(x),[null])
y.fixed$length=Array
return y
case"extendable":if(1>=a.length)return H.h(a,1)
x=a[1]
this.b.push(x)
return H.e(this.ae(x),[null])
case"mutable":if(1>=a.length)return H.h(a,1)
x=a[1]
this.b.push(x)
return this.ae(x)
case"const":if(1>=a.length)return H.h(a,1)
x=a[1]
this.b.push(x)
y=H.e(this.ae(x),[null])
y.fixed$length=Array
return y
case"map":return this.d0(a)
case"sendport":return this.d1(a)
case"raw sendport":if(1>=a.length)return H.h(a,1)
x=a[1]
this.b.push(x)
return x
case"js-object":return this.d_(a)
case"function":if(1>=a.length)return H.h(a,1)
x=init.globalFunctions[a[1]]()
this.b.push(x)
return x
case"capability":if(1>=a.length)return H.h(a,1)
return new H.ad(a[1])
case"dart":y=a.length
if(1>=y)return H.h(a,1)
w=a[1]
if(2>=y)return H.h(a,2)
v=a[2]
u=init.instanceFromClassId(w)
this.b.push(u)
this.ae(v)
return init.initializeEmptyInstance(w,u,v)
default:throw H.b("couldn't deserialize: "+H.a(a))}},"$1","gcZ",2,0,0],
ae:function(a){var z,y,x
z=J.C(a)
y=0
while(!0){x=z.gi(a)
if(typeof x!=="number")return H.E(x)
if(!(y<x))break
z.t(a,y,this.X(z.h(a,y)));++y}return a},
d0:function(a){var z,y,x,w,v,u
z=a.length
if(1>=z)return H.h(a,1)
y=a[1]
if(2>=z)return H.h(a,2)
x=a[2]
w=P.bz()
this.b.push(w)
y=J.eb(y,this.gcZ()).aa(0)
for(z=J.C(y),v=J.C(x),u=0;u<z.gi(y);++u){if(u>=y.length)return H.h(y,u)
w.t(0,y[u],this.X(v.h(x,u)))}return w},
d1:function(a){var z,y,x,w,v,u,t
z=a.length
if(1>=z)return H.h(a,1)
y=a[1]
if(2>=z)return H.h(a,2)
x=a[2]
if(3>=z)return H.h(a,3)
w=a[3]
if(J.A(y,init.globalState.b)){v=init.globalState.z.h(0,x)
if(v==null)return
u=v.bO(w)
if(u==null)return
t=new H.bg(u,x)}else t=new H.bO(y,w,x)
this.b.push(t)
return t},
d_:function(a){var z,y,x,w,v,u,t
z=a.length
if(1>=z)return H.h(a,1)
y=a[1]
if(2>=z)return H.h(a,2)
x=a[2]
w={}
this.b.push(w)
z=J.C(y)
v=J.C(x)
u=0
while(!0){t=z.gi(y)
if(typeof t!=="number")return H.E(t)
if(!(u<t))break
w[z.h(y,u)]=this.X(v.h(x,u));++u}return w}}}],["","",,H,{"^":"",
es:function(){throw H.b(new P.t("Cannot modify unmodifiable Map"))},
dD:function(a){return init.getTypeFromName(a)},
iq:function(a){return init.types[a]},
iL:function(a,b){var z
if(b!=null){z=b.x
if(z!=null)return z}return!!J.j(a).$isa2},
a:function(a){var z
if(typeof a==="string")return a
if(typeof a==="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
z=J.ac(a)
if(typeof z!=="string")throw H.b(H.L(a))
return z},
a6:function(a){var z=a.$identityHash
if(z==null){z=Math.random()*0x3fffffff|0
a.$identityHash=z}return z},
cF:function(a,b){throw H.b(new P.cl(a,null,null))},
bH:function(a,b,c){var z,y
H.bj(a)
z=/^\s*[+-]?((0x[a-f0-9]+)|(\d+)|([a-z0-9]+))\s*$/i.exec(a)
if(z==null)return H.cF(a,c)
if(3>=z.length)return H.h(z,3)
y=z[3]
if(y!=null)return parseInt(a,10)
if(z[2]!=null)return parseInt(a,16)
return H.cF(a,c)},
cE:function(a,b){throw H.b(new P.cl("Invalid double",a,null))},
b8:function(a,b){var z,y
H.bj(a)
if(!/^\s*[+-]?(?:Infinity|NaN|(?:\.\d+|\d+(?:\.\d*)?)(?:[eE][+-]?\d+)?)\s*$/.test(a))return H.cE(a,b)
z=parseFloat(a)
if(isNaN(z)){y=C.d.dB(a)
if(y==="NaN"||y==="+NaN"||y==="-NaN")return z
return H.cE(a,b)}return z},
bG:function(a){var z,y,x,w,v,u,t,s
z=J.j(a)
y=z.constructor
if(typeof y=="function"){x=y.name
w=typeof x==="string"?x:null}else w=null
if(w==null||z===C.v||!!J.j(a).$isaQ){v=C.n(a)
if(v==="Object"){u=a.constructor
if(typeof u=="function"){t=String(u).match(/^\s*function\s*([\w$]*)\s*\(/)
s=t==null?null:t[1]
if(typeof s==="string"&&/^\w+$/.test(s))w=s}if(w==null)w=v}else w=v}w=w
if(w.length>1&&C.d.a4(w,0)===36)w=C.d.bb(w,1)
return function(b,c){return b.replace(/[^<,> ]+/g,function(d){return c[d]||d})}(w+H.dC(H.bZ(a),0,null),init.mangledGlobalNames)},
aO:function(a){return"Instance of '"+H.bG(a)+"'"},
bF:function(a,b){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.b(H.L(a))
return a[b]},
cI:function(a,b,c){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.b(H.L(a))
a[b]=c},
E:function(a){throw H.b(H.L(a))},
h:function(a,b){if(a==null)J.V(a)
throw H.b(H.x(a,b))},
x:function(a,b){var z,y
if(typeof b!=="number"||Math.floor(b)!==b)return new P.a0(!0,b,"index",null)
z=J.V(a)
if(!(b<0)){if(typeof z!=="number")return H.E(z)
y=b>=z}else y=!0
if(y)return P.au(b,a,"index",null,z)
return P.aP(b,"index",null)},
L:function(a){return new P.a0(!0,a,null,null)},
aV:function(a){if(typeof a!=="number"||Math.floor(a)!==a)throw H.b(H.L(a))
return a},
bj:function(a){if(typeof a!=="string")throw H.b(H.L(a))
return a},
b:function(a){var z
if(a==null)a=new P.cC()
z=new Error()
z.dartException=a
if("defineProperty" in Object){Object.defineProperty(z,"message",{get:H.dS})
z.name=""}else z.toString=H.dS
return z},
dS:function(){return J.ac(this.dartException)},
r:function(a){throw H.b(a)},
dQ:function(a){throw H.b(new P.y(a))},
G:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=new H.j3(a)
if(a==null)return
if(typeof a!=="object")return a
if("dartException" in a)return z.$1(a.dartException)
else if(!("message" in a))return a
y=a.message
if("number" in a&&typeof a.number=="number"){x=a.number
w=x&65535
if((C.b.bz(x,16)&8191)===10)switch(w){case 438:return z.$1(H.by(H.a(y)+" (Error "+w+")",null))
case 445:case 5007:v=H.a(y)+" (Error "+w+")"
return z.$1(new H.cB(v,null))}}if(a instanceof TypeError){u=$.$get$cT()
t=$.$get$cU()
s=$.$get$cV()
r=$.$get$cW()
q=$.$get$d_()
p=$.$get$d0()
o=$.$get$cY()
$.$get$cX()
n=$.$get$d2()
m=$.$get$d1()
l=u.G(y)
if(l!=null)return z.$1(H.by(y,l))
else{l=t.G(y)
if(l!=null){l.method="call"
return z.$1(H.by(y,l))}else{l=s.G(y)
if(l==null){l=r.G(y)
if(l==null){l=q.G(y)
if(l==null){l=p.G(y)
if(l==null){l=o.G(y)
if(l==null){l=r.G(y)
if(l==null){l=n.G(y)
if(l==null){l=m.G(y)
v=l!=null}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0
if(v)return z.$1(new H.cB(y,l==null?null:l.method))}}return z.$1(new H.h1(typeof y==="string"?y:""))}if(a instanceof RangeError){if(typeof y==="string"&&y.indexOf("call stack")!==-1)return new P.cM()
y=function(b){try{return String(b)}catch(k){}return null}(a)
return z.$1(new P.a0(!1,null,null,typeof y==="string"?y.replace(/^RangeError:\s*/,""):y))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof y==="string"&&y==="too much recursion")return new P.cM()
return a},
D:function(a){var z
if(a==null)return new H.de(a,null)
z=a.$cachedTrace
if(z!=null)return z
return a.$cachedTrace=new H.de(a,null)},
iR:function(a){if(a==null||typeof a!='object')return J.H(a)
else return H.a6(a)},
dx:function(a,b){var z,y,x,w
z=a.length
for(y=0;y<z;y=w){x=y+1
w=x+1
b.t(0,a[y],a[x])}return b},
iF:function(a,b,c,d,e,f,g){switch(c){case 0:return H.aT(b,new H.iG(a))
case 1:return H.aT(b,new H.iH(a,d))
case 2:return H.aT(b,new H.iI(a,d,e))
case 3:return H.aT(b,new H.iJ(a,d,e,f))
case 4:return H.aT(b,new H.iK(a,d,e,f,g))}throw H.b(P.b4("Unsupported number of arguments for wrapped closure"))},
a8:function(a,b){var z
if(a==null)return
z=a.$identity
if(!!z)return z
z=function(c,d,e,f){return function(g,h,i,j){return f(c,e,d,g,h,i,j)}}(a,b,init.globalState.d,H.iF)
a.$identity=z
return z},
eq:function(a,b,c,d,e,f){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=b[0]
y=z.$callName
if(!!J.j(c).$isi){z.$reflectionInfo=c
x=H.fm(z).r}else x=c
w=d?Object.create(new H.fw().constructor.prototype):Object.create(new H.bt(null,null,null,null).constructor.prototype)
w.$initialize=w.constructor
if(d)v=function(){this.$initialize()}
else{u=$.O
$.O=J.U(u,1)
u=new Function("a,b,c,d"+u,"this.$initialize(a,b,c,d"+u+")")
v=u}w.constructor=v
v.prototype=w
u=!d
if(u){t=e.length==1&&!0
s=H.cd(a,z,t)
s.$reflectionInfo=c}else{w.$static_name=f
s=z
t=!1}if(typeof x=="number")r=function(g,h){return function(){return g(h)}}(H.iq,x)
else if(u&&typeof x=="function"){q=t?H.cc:H.bu
r=function(g,h){return function(){return g.apply({$receiver:h(this)},arguments)}}(x,q)}else throw H.b("Error in reflectionInfo.")
w.$signature=r
w[y]=s
for(u=b.length,p=1;p<u;++p){o=b[p]
n=o.$callName
if(n!=null){m=d?o:H.cd(a,o,t)
w[n]=m}}w["call*"]=s
w.$requiredArgCount=z.$requiredArgCount
w.$defaultValues=z.$defaultValues
return v},
en:function(a,b,c,d){var z=H.bu
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,z)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,z)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,z)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,z)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,z)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,z)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,z)}},
cd:function(a,b,c){var z,y,x,w,v,u,t
if(c)return H.ep(a,b)
z=b.$stubName
y=b.length
x=a[z]
w=b==null?x==null:b===x
v=!w||y>=27
if(v)return H.en(y,!w,z,b)
if(y===0){w=$.O
$.O=J.U(w,1)
u="self"+H.a(w)
w="return function(){var "+u+" = this."
v=$.ar
if(v==null){v=H.b2("self")
$.ar=v}return new Function(w+H.a(v)+";return "+u+"."+H.a(z)+"();}")()}t="abcdefghijklmnopqrstuvwxyz".split("").splice(0,y).join(",")
w=$.O
$.O=J.U(w,1)
t+=H.a(w)
w="return function("+t+"){return this."
v=$.ar
if(v==null){v=H.b2("self")
$.ar=v}return new Function(w+H.a(v)+"."+H.a(z)+"("+t+");}")()},
eo:function(a,b,c,d){var z,y
z=H.bu
y=H.cc
switch(b?-1:a){case 0:throw H.b(new H.fn("Intercepted function with no arguments."))
case 1:return function(e,f,g){return function(){return f(this)[e](g(this))}}(c,z,y)
case 2:return function(e,f,g){return function(h){return f(this)[e](g(this),h)}}(c,z,y)
case 3:return function(e,f,g){return function(h,i){return f(this)[e](g(this),h,i)}}(c,z,y)
case 4:return function(e,f,g){return function(h,i,j){return f(this)[e](g(this),h,i,j)}}(c,z,y)
case 5:return function(e,f,g){return function(h,i,j,k){return f(this)[e](g(this),h,i,j,k)}}(c,z,y)
case 6:return function(e,f,g){return function(h,i,j,k,l){return f(this)[e](g(this),h,i,j,k,l)}}(c,z,y)
default:return function(e,f,g,h){return function(){h=[g(this)]
Array.prototype.push.apply(h,arguments)
return e.apply(f(this),h)}}(d,z,y)}},
ep:function(a,b){var z,y,x,w,v,u,t,s
z=H.ej()
y=$.cb
if(y==null){y=H.b2("receiver")
$.cb=y}x=b.$stubName
w=b.length
v=a[x]
u=b==null?v==null:b===v
t=!u||w>=28
if(t)return H.eo(w,!u,x,b)
if(w===1){y="return function(){return this."+H.a(z)+"."+H.a(x)+"(this."+H.a(y)+");"
u=$.O
$.O=J.U(u,1)
return new Function(y+H.a(u)+"}")()}s="abcdefghijklmnopqrstuvwxyz".split("").splice(0,w-1).join(",")
y="return function("+s+"){return this."+H.a(z)+"."+H.a(x)+"(this."+H.a(y)+", "+s+");"
u=$.O
$.O=J.U(u,1)
return new Function(y+H.a(u)+"}")()},
bW:function(a,b,c,d,e,f){var z
b.fixed$length=Array
if(!!J.j(c).$isi){c.fixed$length=Array
z=c}else z=c
return H.eq(a,b,z,!!d,e,f)},
iT:function(a,b){var z=J.C(b)
throw H.b(H.el(H.bG(a),z.aB(b,3,z.gi(b))))},
iE:function(a,b){var z
if(a!=null)z=(typeof a==="object"||typeof a==="function")&&J.j(a)[b]
else z=!0
if(z)return a
H.iT(a,b)},
j2:function(a){throw H.b(new P.eu("Cyclic initialization for static "+H.a(a)))},
ak:function(a,b,c){return new H.fo(a,b,c,null)},
dq:function(a,b){var z=a.builtin$cls
if(b==null||b.length===0)return new H.fq(z)
return new H.fp(z,b,null)},
aX:function(){return C.r},
bp:function(){return(Math.random()*0x100000000>>>0)+(Math.random()*0x100000000>>>0)*4294967296},
e:function(a,b){a.$builtinTypeInfo=b
return a},
bZ:function(a){if(a==null)return
return a.$builtinTypeInfo},
dz:function(a,b){return H.dO(a["$as"+H.a(b)],H.bZ(a))},
v:function(a,b,c){var z=H.dz(a,b)
return z==null?null:z[c]},
q:function(a,b){var z=H.bZ(a)
return z==null?null:z[b]},
c3:function(a,b){if(a==null)return"dynamic"
else if(typeof a==="object"&&a!==null&&a.constructor===Array)return a[0].builtin$cls+H.dC(a,1,b)
else if(typeof a=="function")return a.builtin$cls
else if(typeof a==="number"&&Math.floor(a)===a)return C.b.j(a)
else return},
dC:function(a,b,c){var z,y,x,w,v,u
if(a==null)return""
z=new P.bJ("")
for(y=b,x=!0,w=!0,v="";y<a.length;++y){if(x)x=!1
else z.a=v+", "
u=a[y]
if(u!=null)w=!1
v=z.a+=H.a(H.c3(u,c))}return w?"":"<"+H.a(z)+">"},
dO:function(a,b){if(typeof a=="function"){a=a.apply(null,b)
if(a==null)return a
if(typeof a==="object"&&a!==null&&a.constructor===Array)return a
if(typeof a=="function")return a.apply(null,b)}return b},
i9:function(a,b){var z,y
if(a==null||b==null)return!0
z=a.length
for(y=0;y<z;++y)if(!H.F(a[y],b[y]))return!1
return!0},
aW:function(a,b,c){return a.apply(b,H.dz(b,c))},
F:function(a,b){var z,y,x,w,v
if(a===b)return!0
if(a==null||b==null)return!0
if('func' in b)return H.dA(a,b)
if('func' in a)return b.builtin$cls==="jI"
z=typeof a==="object"&&a!==null&&a.constructor===Array
y=z?a[0]:a
x=typeof b==="object"&&b!==null&&b.constructor===Array
w=x?b[0]:b
if(w!==y){if(!('$is'+H.c3(w,null) in y.prototype))return!1
v=y.prototype["$as"+H.a(H.c3(w,null))]}else v=null
if(!z&&v==null||!x)return!0
z=z?a.slice(1):null
x=x?b.slice(1):null
return H.i9(H.dO(v,z),x)},
dm:function(a,b,c){var z,y,x,w,v
z=b==null
if(z&&a==null)return!0
if(z)return c
if(a==null)return!1
y=a.length
x=b.length
if(c){if(y<x)return!1}else if(y!==x)return!1
for(w=0;w<x;++w){z=a[w]
v=b[w]
if(!(H.F(z,v)||H.F(v,z)))return!1}return!0},
i8:function(a,b){var z,y,x,w,v,u
if(b==null)return!0
if(a==null)return!1
z=Object.getOwnPropertyNames(b)
z.fixed$length=Array
y=z
for(z=y.length,x=0;x<z;++x){w=y[x]
if(!Object.hasOwnProperty.call(a,w))return!1
v=b[w]
u=a[w]
if(!(H.F(v,u)||H.F(u,v)))return!1}return!0},
dA:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
if(!('func' in a))return!1
if("v" in a){if(!("v" in b)&&"ret" in b)return!1}else if(!("v" in b)){z=a.ret
y=b.ret
if(!(H.F(z,y)||H.F(y,z)))return!1}x=a.args
w=b.args
v=a.opt
u=b.opt
t=x!=null?x.length:0
s=w!=null?w.length:0
r=v!=null?v.length:0
q=u!=null?u.length:0
if(t>s)return!1
if(t+r<s+q)return!1
if(t===s){if(!H.dm(x,w,!1))return!1
if(!H.dm(v,u,!0))return!1}else{for(p=0;p<t;++p){o=x[p]
n=w[p]
if(!(H.F(o,n)||H.F(n,o)))return!1}for(m=p,l=0;m<s;++l,++m){o=v[l]
n=w[m]
if(!(H.F(o,n)||H.F(n,o)))return!1}for(m=0;m<q;++l,++m){o=v[l]
n=u[m]
if(!(H.F(o,n)||H.F(n,o)))return!1}}return H.i8(a.named,b.named)},
kL:function(a){var z=$.c_
return"Instance of "+(z==null?"<Unknown>":z.$1(a))},
kG:function(a){return H.a6(a)},
kE:function(a,b,c){Object.defineProperty(a,b,{value:c,enumerable:false,writable:true,configurable:true})},
iM:function(a){var z,y,x,w,v,u
z=$.c_.$1(a)
y=$.bl[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.bn[z]
if(x!=null)return x
w=init.interceptorsByTag[z]
if(w==null){z=$.dl.$2(a,z)
if(z!=null){y=$.bl[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.bn[z]
if(x!=null)return x
w=init.interceptorsByTag[z]}}if(w==null)return
x=w.prototype
v=z[0]
if(v==="!"){y=H.c2(x)
$.bl[z]=y
Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}if(v==="~"){$.bn[z]=x
return x}if(v==="-"){u=H.c2(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}if(v==="+")return H.dJ(a,x)
if(v==="*")throw H.b(new P.d3(z))
if(init.leafTags[z]===true){u=H.c2(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}else return H.dJ(a,x)},
dJ:function(a,b){var z=Object.getPrototypeOf(a)
Object.defineProperty(z,init.dispatchPropertyName,{value:J.bo(b,z,null,null),enumerable:false,writable:true,configurable:true})
return b},
c2:function(a){return J.bo(a,!1,null,!!a.$isa2)},
iQ:function(a,b,c){var z=b.prototype
if(init.leafTags[a]===true)return J.bo(z,!1,null,!!z.$isa2)
else return J.bo(z,c,null,null)},
iC:function(){if(!0===$.c0)return
$.c0=!0
H.iD()},
iD:function(){var z,y,x,w,v,u,t,s
$.bl=Object.create(null)
$.bn=Object.create(null)
H.ir()
z=init.interceptorsByTag
y=Object.getOwnPropertyNames(z)
if(typeof window!="undefined"){window
x=function(){}
for(w=0;w<y.length;++w){v=y[w]
u=$.dL.$1(v)
if(u!=null){t=H.iQ(v,z[v],u)
if(t!=null){Object.defineProperty(u,init.dispatchPropertyName,{value:t,enumerable:false,writable:true,configurable:true})
x.prototype=u}}}}for(w=0;w<y.length;++w){v=y[w]
if(/^[A-Za-z_]/.test(v)){s=z[v]
z["!"+v]=s
z["~"+v]=s
z["-"+v]=s
z["+"+v]=s
z["*"+v]=s}}},
ir:function(){var z,y,x,w,v,u,t
z=C.z()
z=H.aj(C.w,H.aj(C.B,H.aj(C.o,H.aj(C.o,H.aj(C.A,H.aj(C.x,H.aj(C.y(C.n),z)))))))
if(typeof dartNativeDispatchHooksTransformer!="undefined"){y=dartNativeDispatchHooksTransformer
if(typeof y=="function")y=[y]
if(y.constructor==Array)for(x=0;x<y.length;++x){w=y[x]
if(typeof w=="function")z=w(z)||z}}v=z.getTag
u=z.getUnknownTag
t=z.prototypeForTag
$.c_=new H.is(v)
$.dl=new H.it(u)
$.dL=new H.iu(t)},
aj:function(a,b){return a(b)||b},
iZ:function(a,b,c){var z
if(typeof b==="string")return a.indexOf(b,c)>=0
else{z=J.e1(b,C.d.bb(a,c))
return!z.gF(z)}},
j_:function(a,b,c,d){var z=a.indexOf(b,d)
if(z<0)return a
return H.j0(a,z,z+b.length,c)},
j0:function(a,b,c,d){var z,y
z=a.substring(0,b)
y=a.substring(c)
return z+d+y},
er:{"^":"c;",
j:function(a){return P.cv(this)},
t:function(a,b,c){return H.es()}},
eJ:{"^":"er;a",
aL:function(){var z=this.$map
if(z==null){z=new H.a3(0,null,null,null,null,null,0)
z.$builtinTypeInfo=this.$builtinTypeInfo
H.dx(this.a,z)
this.$map=z}return z},
h:function(a,b){return this.aL().h(0,b)},
p:function(a,b){this.aL().p(0,b)},
gi:function(a){var z=this.aL()
return z.gi(z)}},
fl:{"^":"c;a,b,c,d,e,f,r,x",m:{
fm:function(a){var z,y,x
z=a.$reflectionInfo
if(z==null)return
z.fixed$length=Array
z=z
y=z[0]
x=z[1]
return new H.fl(a,z,(y&1)===1,y>>1,x>>1,(x&1)===1,z[2],null)}}},
h_:{"^":"c;a,b,c,d,e,f",
G:function(a){var z,y,x
z=new RegExp(this.a).exec(a)
if(z==null)return
y=Object.create(null)
x=this.b
if(x!==-1)y.arguments=z[x+1]
x=this.c
if(x!==-1)y.argumentsExpr=z[x+1]
x=this.d
if(x!==-1)y.expr=z[x+1]
x=this.e
if(x!==-1)y.method=z[x+1]
x=this.f
if(x!==-1)y.receiver=z[x+1]
return y},
m:{
R:function(a){var z,y,x,w,v,u
a=a.replace(String({}),'$receiver$').replace(/[[\]{}()*+?.\\^$|]/g,"\\$&")
z=a.match(/\\\$[a-zA-Z]+\\\$/g)
if(z==null)z=[]
y=z.indexOf("\\$arguments\\$")
x=z.indexOf("\\$argumentsExpr\\$")
w=z.indexOf("\\$expr\\$")
v=z.indexOf("\\$method\\$")
u=z.indexOf("\\$receiver\\$")
return new H.h_(a.replace(new RegExp('\\\\\\$arguments\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$argumentsExpr\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$expr\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$method\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$receiver\\\\\\$','g'),'((?:x|[^x])*)'),y,x,w,v,u)},
bc:function(a){return function($expr$){var $argumentsExpr$='$arguments$'
try{$expr$.$method$($argumentsExpr$)}catch(z){return z.message}}(a)},
cZ:function(a){return function($expr$){try{$expr$.$method$}catch(z){return z.message}}(a)}}},
cB:{"^":"z;a,b",
j:function(a){var z=this.b
if(z==null)return"NullError: "+H.a(this.a)
return"NullError: method not found: '"+H.a(z)+"' on null"}},
f6:{"^":"z;a,b,c",
j:function(a){var z,y
z=this.b
if(z==null)return"NoSuchMethodError: "+H.a(this.a)
y=this.c
if(y==null)return"NoSuchMethodError: method not found: '"+H.a(z)+"' ("+H.a(this.a)+")"
return"NoSuchMethodError: method not found: '"+H.a(z)+"' on '"+H.a(y)+"' ("+H.a(this.a)+")"},
m:{
by:function(a,b){var z,y
z=b==null
y=z?null:b.method
return new H.f6(a,y,z?null:b.receiver)}}},
h1:{"^":"z;a",
j:function(a){var z=this.a
return z.length===0?"Error":"Error: "+z}},
j3:{"^":"d:0;a",
$1:function(a){if(!!J.j(a).$isz)if(a.$thrownJsError==null)a.$thrownJsError=this.a
return a}},
de:{"^":"c;a,b",
j:function(a){var z,y
z=this.b
if(z!=null)return z
z=this.a
y=z!==null&&typeof z==="object"?z.stack:null
z=y==null?"":y
this.b=z
return z}},
iG:{"^":"d:1;a",
$0:function(){return this.a.$0()}},
iH:{"^":"d:1;a,b",
$0:function(){return this.a.$1(this.b)}},
iI:{"^":"d:1;a,b,c",
$0:function(){return this.a.$2(this.b,this.c)}},
iJ:{"^":"d:1;a,b,c,d",
$0:function(){return this.a.$3(this.b,this.c,this.d)}},
iK:{"^":"d:1;a,b,c,d,e",
$0:function(){return this.a.$4(this.b,this.c,this.d,this.e)}},
d:{"^":"c;",
j:function(a){return"Closure '"+H.bG(this)+"'"},
gc2:function(){return this},
gc2:function(){return this}},
cP:{"^":"d;"},
fw:{"^":"cP;",
j:function(a){var z=this.$static_name
if(z==null)return"Closure of unknown static method"
return"Closure '"+z+"'"}},
bt:{"^":"cP;a,b,c,d",
q:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof H.bt))return!1
return this.a===b.a&&this.b===b.b&&this.c===b.c},
gu:function(a){var z,y
z=this.c
if(z==null)y=H.a6(this.a)
else y=typeof z!=="object"?J.H(z):H.a6(z)
z=H.a6(this.b)
if(typeof y!=="number")return y.dF()
return(y^z)>>>0},
j:function(a){var z=this.c
if(z==null)z=this.a
return"Closure '"+H.a(this.d)+"' of "+H.aO(z)},
m:{
bu:function(a){return a.a},
cc:function(a){return a.c},
ej:function(){var z=$.ar
if(z==null){z=H.b2("self")
$.ar=z}return z},
b2:function(a){var z,y,x,w,v
z=new H.bt("self","target","receiver","name")
y=Object.getOwnPropertyNames(z)
y.fixed$length=Array
x=y
for(y=x.length,w=0;w<y;++w){v=x[w]
if(z[v]===a)return v}}}},
ek:{"^":"z;a",
j:function(a){return this.a},
m:{
el:function(a,b){return new H.ek("CastError: Casting value of type "+H.a(a)+" to incompatible type "+H.a(b))}}},
fn:{"^":"z;a",
j:function(a){return"RuntimeError: "+H.a(this.a)}},
ba:{"^":"c;"},
fo:{"^":"ba;a,b,c,d",
T:function(a){var z=this.cD(a)
return z==null?!1:H.dA(z,this.J())},
cD:function(a){var z=J.j(a)
return"$signature" in z?z.$signature():null},
J:function(){var z,y,x,w,v,u,t
z={func:"dynafunc"}
y=this.a
x=J.j(y)
if(!!x.$iskr)z.v=true
else if(!x.$iscf)z.ret=y.J()
y=this.b
if(y!=null&&y.length!==0)z.args=H.cK(y)
y=this.c
if(y!=null&&y.length!==0)z.opt=H.cK(y)
y=this.d
if(y!=null){w=Object.create(null)
v=H.dw(y)
for(x=v.length,u=0;u<x;++u){t=v[u]
w[t]=y[t].J()}z.named=w}return z},
j:function(a){var z,y,x,w,v,u,t,s
z=this.b
if(z!=null)for(y=z.length,x="(",w=!1,v=0;v<y;++v,w=!0){u=z[v]
if(w)x+=", "
x+=H.a(u)}else{x="("
w=!1}z=this.c
if(z!=null&&z.length!==0){x=(w?x+", ":x)+"["
for(y=z.length,w=!1,v=0;v<y;++v,w=!0){u=z[v]
if(w)x+=", "
x+=H.a(u)}x+="]"}else{z=this.d
if(z!=null){x=(w?x+", ":x)+"{"
t=H.dw(z)
for(y=t.length,w=!1,v=0;v<y;++v,w=!0){s=t[v]
if(w)x+=", "
x+=H.a(z[s].J())+" "+s}x+="}"}}return x+(") -> "+H.a(this.a))},
m:{
cK:function(a){var z,y,x
a=a
z=[]
for(y=a.length,x=0;x<y;++x)z.push(a[x].J())
return z}}},
cf:{"^":"ba;",
j:function(a){return"dynamic"},
J:function(){return}},
fq:{"^":"ba;a",
J:function(){var z,y
z=this.a
y=H.dD(z)
if(y==null)throw H.b("no type for '"+z+"'")
return y},
j:function(a){return this.a}},
fp:{"^":"ba;a,b,c",
J:function(){var z,y,x,w
z=this.c
if(z!=null)return z
z=this.a
y=[H.dD(z)]
if(0>=y.length)return H.h(y,0)
if(y[0]==null)throw H.b("no type for '"+z+"<...>'")
for(z=this.b,x=z.length,w=0;w<z.length;z.length===x||(0,H.dQ)(z),++w)y.push(z[w].J())
this.c=y
return y},
j:function(a){var z=this.b
return this.a+"<"+(z&&C.a).b0(z,", ")+">"}},
a3:{"^":"c;a,b,c,d,e,f,r",
gi:function(a){return this.a},
gF:function(a){return this.a===0},
gbM:function(){return H.e(new H.f8(this),[H.q(this,0)])},
gc_:function(a){return H.aM(this.gbM(),new H.f5(this),H.q(this,0),H.q(this,1))},
aZ:function(a){var z
if(typeof a==="number"&&(a&0x3ffffff)===a){z=this.c
if(z==null)return!1
return this.cA(z,a)}else return this.df(a)},
df:function(a){var z=this.d
if(z==null)return!1
return this.ah(this.as(z,this.ag(a)),a)>=0},
h:function(a,b){var z,y,x
if(typeof b==="string"){z=this.b
if(z==null)return
y=this.ac(z,b)
return y==null?null:y.gZ()}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null)return
y=this.ac(x,b)
return y==null?null:y.gZ()}else return this.dg(b)},
dg:function(a){var z,y,x
z=this.d
if(z==null)return
y=this.as(z,this.ag(a))
x=this.ah(y,a)
if(x<0)return
return y[x].gZ()},
t:function(a,b,c){var z,y,x,w,v,u
if(typeof b==="string"){z=this.b
if(z==null){z=this.aO()
this.b=z}this.bd(z,b,c)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null){y=this.aO()
this.c=y}this.bd(y,b,c)}else{x=this.d
if(x==null){x=this.aO()
this.d=x}w=this.ag(b)
v=this.as(x,w)
if(v==null)this.aS(x,w,[this.aP(b,c)])
else{u=this.ah(v,b)
if(u>=0)v[u].sZ(c)
else v.push(this.aP(b,c))}}},
a9:function(a,b){if(typeof b==="string")return this.bu(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.bu(this.c,b)
else return this.dh(b)},
dh:function(a){var z,y,x,w
z=this.d
if(z==null)return
y=this.as(z,this.ag(a))
x=this.ah(y,a)
if(x<0)return
w=y.splice(x,1)[0]
this.bA(w)
return w.gZ()},
a3:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
p:function(a,b){var z,y
z=this.e
y=this.r
for(;z!=null;){b.$2(z.a,z.b)
if(y!==this.r)throw H.b(new P.y(this))
z=z.c}},
bd:function(a,b,c){var z=this.ac(a,b)
if(z==null)this.aS(a,b,this.aP(b,c))
else z.sZ(c)},
bu:function(a,b){var z
if(a==null)return
z=this.ac(a,b)
if(z==null)return
this.bA(z)
this.bi(a,b)
return z.gZ()},
aP:function(a,b){var z,y
z=new H.f7(a,b,null,null)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.d=y
y.c=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
bA:function(a){var z,y
z=a.gcK()
y=a.c
if(z==null)this.e=y
else z.c=y
if(y==null)this.f=z
else y.d=z;--this.a
this.r=this.r+1&67108863},
ag:function(a){return J.H(a)&0x3ffffff},
ah:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.A(a[y].gbK(),b))return y
return-1},
j:function(a){return P.cv(this)},
ac:function(a,b){return a[b]},
as:function(a,b){return a[b]},
aS:function(a,b,c){a[b]=c},
bi:function(a,b){delete a[b]},
cA:function(a,b){return this.ac(a,b)!=null},
aO:function(){var z=Object.create(null)
this.aS(z,"<non-identifier-key>",z)
this.bi(z,"<non-identifier-key>")
return z},
$iseQ:1},
f5:{"^":"d:0;a",
$1:function(a){return this.a.h(0,a)}},
f7:{"^":"c;bK:a<,Z:b@,c,cK:d<"},
f8:{"^":"u;a",
gi:function(a){return this.a.a},
gn:function(a){var z,y
z=this.a
y=new H.f9(z,z.r,null,null)
y.c=z.e
return y},
B:function(a,b){return this.a.aZ(b)},
p:function(a,b){var z,y,x
z=this.a
y=z.e
x=z.r
for(;y!=null;){b.$1(y.a)
if(x!==z.r)throw H.b(new P.y(z))
y=y.c}},
$isk:1},
f9:{"^":"c;a,b,c,d",
gl:function(){return this.d},
k:function(){var z=this.a
if(this.b!==z.r)throw H.b(new P.y(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.c
return!0}}}},
is:{"^":"d:0;a",
$1:function(a){return this.a(a)}},
it:{"^":"d:8;a",
$2:function(a,b){return this.a(a,b)}},
iu:{"^":"d:9;a",
$1:function(a){return this.a(a)}},
fP:{"^":"c;a,b,c",
h:function(a,b){if(b!==0)H.r(P.aP(b,null,null))
return this.c}},
hT:{"^":"u;a,b,c",
gn:function(a){return new H.hU(this.a,this.b,this.c,null)},
$asu:function(){return[P.fd]}},
hU:{"^":"c;a,b,c,d",
k:function(){var z,y,x,w,v,u,t
z=this.c
y=this.b
x=y.length
w=this.a
v=w.length
if(z+x>v){this.d=null
return!1}u=w.indexOf(y,z)
if(u<0){this.c=v+1
this.d=null
return!1}t=u+x
this.d=new H.fP(u,w,y)
this.c=t===this.c?t+1:t
return!0},
gl:function(){return this.d}}}],["","",,H,{"^":"",
dw:function(a){var z=H.e(a?Object.keys(a):[],[null])
z.fixed$length=Array
return z}}],["","",,H,{"^":"",
iS:function(a){if(typeof dartPrint=="function"){dartPrint(a)
return}if(typeof console=="object"&&typeof console.log!="undefined"){console.log(a)
return}if(typeof window=="object")return
if(typeof print=="function"){print(a)
return}throw"Unable to print message: "+String(a)}}],["","",,H,{"^":"",cw:{"^":"f;",$iscw:1,"%":"ArrayBuffer"},bD:{"^":"f;",$isbD:1,"%":"DataView;ArrayBufferView;bB|cx|cz|bC|cy|cA|a4"},bB:{"^":"bD;",
gi:function(a){return a.length},
$isa2:1,
$asa2:I.a9,
$isP:1,
$asP:I.a9},bC:{"^":"cz;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.r(H.x(a,b))
return a[b]},
t:function(a,b,c){if(b>>>0!==b||b>=a.length)H.r(H.x(a,b))
a[b]=c}},cx:{"^":"bB+af;",$isi:1,
$asi:function(){return[P.aF]},
$isk:1},cz:{"^":"cx+ck;"},a4:{"^":"cA;",
t:function(a,b,c){if(b>>>0!==b||b>=a.length)H.r(H.x(a,b))
a[b]=c},
$isi:1,
$asi:function(){return[P.o]},
$isk:1},cy:{"^":"bB+af;",$isi:1,
$asi:function(){return[P.o]},
$isk:1},cA:{"^":"cy+ck;"},jV:{"^":"bC;",$isi:1,
$asi:function(){return[P.aF]},
$isk:1,
"%":"Float32Array"},jW:{"^":"bC;",$isi:1,
$asi:function(){return[P.aF]},
$isk:1,
"%":"Float64Array"},jX:{"^":"a4;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.r(H.x(a,b))
return a[b]},
$isi:1,
$asi:function(){return[P.o]},
$isk:1,
"%":"Int16Array"},jY:{"^":"a4;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.r(H.x(a,b))
return a[b]},
$isi:1,
$asi:function(){return[P.o]},
$isk:1,
"%":"Int32Array"},jZ:{"^":"a4;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.r(H.x(a,b))
return a[b]},
$isi:1,
$asi:function(){return[P.o]},
$isk:1,
"%":"Int8Array"},k_:{"^":"a4;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.r(H.x(a,b))
return a[b]},
$isi:1,
$asi:function(){return[P.o]},
$isk:1,
"%":"Uint16Array"},k0:{"^":"a4;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.r(H.x(a,b))
return a[b]},
$isi:1,
$asi:function(){return[P.o]},
$isk:1,
"%":"Uint32Array"},k1:{"^":"a4;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)H.r(H.x(a,b))
return a[b]},
$isi:1,
$asi:function(){return[P.o]},
$isk:1,
"%":"CanvasPixelArray|Uint8ClampedArray"},k2:{"^":"a4;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)H.r(H.x(a,b))
return a[b]},
$isi:1,
$asi:function(){return[P.o]},
$isk:1,
"%":";Uint8Array"}}],["","",,P,{"^":"",
h5:function(){var z,y,x
z={}
if(self.scheduleImmediate!=null)return P.ia()
if(self.MutationObserver!=null&&self.document!=null){y=self.document.createElement("div")
x=self.document.createElement("span")
z.a=null
new self.MutationObserver(H.a8(new P.h7(z),1)).observe(y,{childList:true})
return new P.h6(z,y,x)}else if(self.setImmediate!=null)return P.ib()
return P.ic()},
ks:[function(a){++init.globalState.f.b
self.scheduleImmediate(H.a8(new P.h8(a),0))},"$1","ia",2,0,4],
kt:[function(a){++init.globalState.f.b
self.setImmediate(H.a8(new P.h9(a),0))},"$1","ib",2,0,4],
ku:[function(a){P.bK(C.i,a)},"$1","ic",2,0,4],
df:function(a,b){var z=H.aX()
z=H.ak(z,[z,z]).T(a)
if(z){b.toString
return a}else{b.toString
return a}},
i5:function(){var z,y
for(;z=$.ai,z!=null;){$.aC=null
y=z.b
$.ai=y
if(y==null)$.aB=null
z.a.$0()}},
kD:[function(){$.bQ=!0
try{P.i5()}finally{$.aC=null
$.bQ=!1
if($.ai!=null)$.$get$bL().$1(P.dn())}},"$0","dn",0,0,2],
dj:function(a){var z=new P.d4(a,null)
if($.ai==null){$.aB=z
$.ai=z
if(!$.bQ)$.$get$bL().$1(P.dn())}else{$.aB.b=z
$.aB=z}},
i7:function(a){var z,y,x
z=$.ai
if(z==null){P.dj(a)
$.aC=$.aB
return}y=new P.d4(a,null)
x=$.aC
if(x==null){y.b=z
$.aC=y
$.ai=y}else{y.b=x.b
x.b=y
$.aC=y
if(y.b==null)$.aB=y}},
dM:function(a){var z=$.l
if(C.c===z){P.bh(null,null,C.c,a)
return}z.toString
P.bh(null,null,z,z.aV(a,!0))},
bS:function(a,b,c){var z,y,x,w,v,u,t
try{b.$1(a.$0())}catch(u){t=H.G(u)
z=t
y=H.D(u)
$.l.toString
x=null
if(x==null)c.$2(z,y)
else{t=J.ap(x)
w=t
v=x.gL()
c.$2(w,v)}}},
hY:function(a,b,c,d){var z=a.a2()
if(!!J.j(z).$isa1)z.ay(new P.i_(b,c,d))
else b.a_(c,d)},
bP:function(a,b){return new P.hZ(a,b)},
i0:function(a,b,c){var z=a.a2()
if(!!J.j(z).$isa1)z.ay(new P.i1(b,c))
else b.I(c)},
hX:function(a,b,c){$.l.toString
a.aC(b,c)},
fY:function(a,b){var z=$.l
if(z===C.c){z.toString
return P.bK(a,b)}return P.bK(a,z.aV(b,!0))},
fZ:function(a,b){var z,y
z=$.l
if(z===C.c){z.toString
return P.cS(a,b)}y=z.bE(b,!0)
$.l.toString
return P.cS(a,y)},
bK:function(a,b){var z=C.b.a1(a.a,1000)
return H.fT(z<0?0:z,b)},
cS:function(a,b){var z=C.b.a1(a.a,1000)
return H.fU(z<0?0:z,b)},
aU:function(a,b,c,d,e){var z={}
z.a=d
P.i7(new P.i6(z,e))},
dg:function(a,b,c,d){var z,y
y=$.l
if(y===c)return d.$0()
$.l=c
z=y
try{y=d.$0()
return y}finally{$.l=z}},
di:function(a,b,c,d,e){var z,y
y=$.l
if(y===c)return d.$1(e)
$.l=c
z=y
try{y=d.$1(e)
return y}finally{$.l=z}},
dh:function(a,b,c,d,e,f){var z,y
y=$.l
if(y===c)return d.$2(e,f)
$.l=c
z=y
try{y=d.$2(e,f)
return y}finally{$.l=z}},
bh:function(a,b,c,d){var z=C.c!==c
if(z)d=c.aV(d,!(!z||!1))
P.dj(d)},
h7:{"^":"d:0;a",
$1:function(a){var z,y;--init.globalState.f.b
z=this.a
y=z.a
z.a=null
y.$0()}},
h6:{"^":"d:10;a,b,c",
$1:function(a){var z,y;++init.globalState.f.b
this.a.a=a
z=this.b
y=this.c
z.firstChild?z.removeChild(y):z.appendChild(y)}},
h8:{"^":"d:1;a",
$0:function(){--init.globalState.f.b
this.a.$0()}},
h9:{"^":"d:1;a",
$0:function(){--init.globalState.f.b
this.a.$0()}},
a1:{"^":"c;"},
he:{"^":"c;"},
hV:{"^":"he;a"},
d9:{"^":"c;aQ:a<,b,c,d,e",
gcR:function(){return this.b.b},
gbJ:function(){return(this.c&1)!==0},
gdd:function(){return(this.c&2)!==0},
gbI:function(){return this.c===8},
da:function(a){return this.b.b.b8(this.d,a)},
dk:function(a){if(this.c!==6)return!0
return this.b.b.b8(this.d,J.ap(a))},
d6:function(a){var z,y,x,w
z=this.e
y=H.aX()
y=H.ak(y,[y,y]).T(z)
x=J.m(a)
w=this.b
if(y)return w.b.dz(z,x.gY(a),a.gL())
else return w.b.b8(z,x.gY(a))},
dc:function(){return this.b.b.bU(this.d)}},
T:{"^":"c;ad:a@,b,cP:c<",
gcI:function(){return this.a===2},
gaN:function(){return this.a>=4},
bX:function(a,b){var z,y
z=$.l
if(z!==C.c){z.toString
if(b!=null)b=P.df(b,z)}y=H.e(new P.T(0,z,null),[null])
this.aD(new P.d9(null,y,b==null?1:3,a,b))
return y},
ax:function(a){return this.bX(a,null)},
ay:function(a){var z,y
z=$.l
y=new P.T(0,z,null)
y.$builtinTypeInfo=this.$builtinTypeInfo
if(z!==C.c)z.toString
this.aD(new P.d9(null,y,8,a,null))
return y},
aD:function(a){var z,y
z=this.a
if(z<=1){a.a=this.c
this.c=a}else{if(z===2){y=this.c
if(!y.gaN()){y.aD(a)
return}this.a=y.a
this.c=y.c}z=this.b
z.toString
P.bh(null,null,z,new P.hp(this,a))}},
bt:function(a){var z,y,x,w,v
z={}
z.a=a
if(a==null)return
y=this.a
if(y<=1){x=this.c
this.c=a
if(x!=null){for(w=a;w.gaQ()!=null;)w=w.a
w.a=x}}else{if(y===2){v=this.c
if(!v.gaN()){v.bt(a)
return}this.a=v.a
this.c=v.c}z.a=this.at(a)
y=this.b
y.toString
P.bh(null,null,y,new P.hu(z,this))}},
aR:function(){var z=this.c
this.c=null
return this.at(z)},
at:function(a){var z,y,x
for(z=a,y=null;z!=null;y=z,z=x){x=z.gaQ()
z.a=y}return y},
I:function(a){var z
if(!!J.j(a).$isa1)P.da(a,this)
else{z=this.aR()
this.a=4
this.c=a
P.ay(this,z)}},
a_:[function(a,b){var z=this.aR()
this.a=8
this.c=new P.b1(a,b)
P.ay(this,z)},function(a){return this.a_(a,null)},"dG","$2","$1","gao",2,2,11,0],
$isa1:1,
m:{
hq:function(a,b){var z,y,x,w
b.sad(1)
try{a.bX(new P.hr(b),new P.hs(b))}catch(x){w=H.G(x)
z=w
y=H.D(x)
P.dM(new P.ht(b,z,y))}},
da:function(a,b){var z,y,x
for(;a.gcI();)a=a.c
z=a.gaN()
y=b.c
if(z){b.c=null
x=b.at(y)
b.a=a.a
b.c=a.c
P.ay(b,x)}else{b.a=2
b.c=a
a.bt(y)}},
ay:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o
z={}
z.a=a
for(y=a;!0;){x={}
w=y.a===8
if(b==null){if(w){v=y.c
z=y.b
y=J.ap(v)
x=v.gL()
z.toString
P.aU(null,null,z,y,x)}return}for(;b.gaQ()!=null;b=u){u=b.a
b.a=null
P.ay(z.a,b)}t=z.a.c
x.a=w
x.b=t
y=!w
if(!y||b.gbJ()||b.gbI()){s=b.gcR()
if(w){r=z.a.b
r.toString
r=r==null?s==null:r===s
if(!r)s.toString
else r=!0
r=!r}else r=!1
if(r){y=z.a
v=y.c
y=y.b
x=J.ap(v)
r=v.gL()
y.toString
P.aU(null,null,y,x,r)
return}q=$.l
if(q==null?s!=null:q!==s)$.l=s
else q=null
if(b.gbI())new P.hx(z,x,w,b).$0()
else if(y){if(b.gbJ())new P.hw(x,b,t).$0()}else if(b.gdd())new P.hv(z,x,b).$0()
if(q!=null)$.l=q
y=x.b
r=J.j(y)
if(!!r.$isa1){p=b.b
if(!!r.$isT)if(y.a>=4){o=p.c
p.c=null
b=p.at(o)
p.a=y.a
p.c=y.c
z.a=y
continue}else P.da(y,p)
else P.hq(y,p)
return}}p=b.b
b=p.aR()
y=x.a
x=x.b
if(!y){p.a=4
p.c=x}else{p.a=8
p.c=x}z.a=p
y=p}}}},
hp:{"^":"d:1;a,b",
$0:function(){P.ay(this.a,this.b)}},
hu:{"^":"d:1;a,b",
$0:function(){P.ay(this.b,this.a.a)}},
hr:{"^":"d:0;a",
$1:function(a){var z=this.a
z.a=0
z.I(a)}},
hs:{"^":"d:12;a",
$2:function(a,b){this.a.a_(a,b)},
$1:function(a){return this.$2(a,null)}},
ht:{"^":"d:1;a,b,c",
$0:function(){this.a.a_(this.b,this.c)}},
hx:{"^":"d:2;a,b,c,d",
$0:function(){var z,y,x,w,v,u,t
z=null
try{z=this.d.dc()}catch(w){v=H.G(w)
y=v
x=H.D(w)
if(this.c){v=J.ap(this.a.a.c)
u=y
u=v==null?u==null:v===u
v=u}else v=!1
u=this.b
if(v)u.b=this.a.a.c
else u.b=new P.b1(y,x)
u.a=!0
return}if(!!J.j(z).$isa1){if(z instanceof P.T&&z.gad()>=4){if(z.gad()===8){v=this.b
v.b=z.gcP()
v.a=!0}return}t=this.a.a
v=this.b
v.b=z.ax(new P.hy(t))
v.a=!1}}},
hy:{"^":"d:0;a",
$1:function(a){return this.a}},
hw:{"^":"d:2;a,b,c",
$0:function(){var z,y,x,w
try{this.a.b=this.b.da(this.c)}catch(x){w=H.G(x)
z=w
y=H.D(x)
w=this.a
w.b=new P.b1(z,y)
w.a=!0}}},
hv:{"^":"d:2;a,b,c",
$0:function(){var z,y,x,w,v,u,t,s
try{z=this.a.a.c
w=this.c
if(w.dk(z)===!0&&w.e!=null){v=this.b
v.b=w.d6(z)
v.a=!1}}catch(u){w=H.G(u)
y=w
x=H.D(u)
w=this.a
v=J.ap(w.a.c)
t=y
s=this.b
if(v==null?t==null:v===t)s.b=w.a.c
else s.b=new P.b1(y,x)
s.a=!0}}},
d4:{"^":"c;a,b"},
Q:{"^":"c;",
a8:function(a,b){return H.e(new P.hJ(b,this),[H.v(this,"Q",0),null])},
a6:function(a,b,c){var z,y
z={}
y=H.e(new P.T(0,$.l,null),[null])
z.a=b
z.b=null
z.b=this.P(new P.fE(z,this,c,y),!0,new P.fF(z,y),new P.fG(y))
return y},
B:function(a,b){var z,y
z={}
y=H.e(new P.T(0,$.l,null),[P.bi])
z.a=null
z.a=this.P(new P.fA(z,this,b,y),!0,new P.fB(y),y.gao())
return y},
p:function(a,b){var z,y
z={}
y=H.e(new P.T(0,$.l,null),[null])
z.a=null
z.a=this.P(new P.fJ(z,this,b,y),!0,new P.fK(y),y.gao())
return y},
gi:function(a){var z,y
z={}
y=H.e(new P.T(0,$.l,null),[P.o])
z.a=0
this.P(new P.fL(z),!0,new P.fM(z,y),y.gao())
return y},
aa:function(a){var z,y
z=H.e([],[H.v(this,"Q",0)])
y=H.e(new P.T(0,$.l,null),[[P.i,H.v(this,"Q",0)]])
this.P(new P.fN(this,z),!0,new P.fO(z,y),y.gao())
return y}},
fE:{"^":"d;a,b,c,d",
$1:function(a){var z=this.a
P.bS(new P.fC(z,this.c,a),new P.fD(z),P.bP(z.b,this.d))},
$signature:function(){return H.aW(function(a){return{func:1,args:[a]}},this.b,"Q")}},
fC:{"^":"d:1;a,b,c",
$0:function(){return this.b.$2(this.a.a,this.c)}},
fD:{"^":"d:0;a",
$1:function(a){this.a.a=a}},
fG:{"^":"d:5;a",
$2:function(a,b){this.a.a_(a,b)}},
fF:{"^":"d:1;a,b",
$0:function(){this.b.I(this.a.a)}},
fA:{"^":"d;a,b,c,d",
$1:function(a){var z,y
z=this.a
y=this.d
P.bS(new P.fy(this.c,a),new P.fz(z,y),P.bP(z.a,y))},
$signature:function(){return H.aW(function(a){return{func:1,args:[a]}},this.b,"Q")}},
fy:{"^":"d:1;a,b",
$0:function(){return J.A(this.b,this.a)}},
fz:{"^":"d:13;a,b",
$1:function(a){if(a===!0)P.i0(this.a.a,this.b,!0)}},
fB:{"^":"d:1;a",
$0:function(){this.a.I(!1)}},
fJ:{"^":"d;a,b,c,d",
$1:function(a){P.bS(new P.fH(this.c,a),new P.fI(),P.bP(this.a.a,this.d))},
$signature:function(){return H.aW(function(a){return{func:1,args:[a]}},this.b,"Q")}},
fH:{"^":"d:1;a,b",
$0:function(){return this.a.$1(this.b)}},
fI:{"^":"d:0;",
$1:function(a){}},
fK:{"^":"d:1;a",
$0:function(){this.a.I(null)}},
fL:{"^":"d:0;a",
$1:function(a){++this.a.a}},
fM:{"^":"d:1;a,b",
$0:function(){this.b.I(this.a.a)}},
fN:{"^":"d;a,b",
$1:function(a){this.b.push(a)},
$signature:function(){return H.aW(function(a){return{func:1,args:[a]}},this.a,"Q")}},
fO:{"^":"d:1;a,b",
$0:function(){this.b.I(this.a)}},
fx:{"^":"c;"},
ky:{"^":"c;"},
ha:{"^":"c;ad:e@",
b4:function(a,b){var z=this.e
if((z&8)!==0)return
this.e=(z+128|4)>>>0
if(z<128&&this.r!=null)this.r.bF()
if((z&4)===0&&(this.e&32)===0)this.bl(this.gbp())},
bR:function(a){return this.b4(a,null)},
bT:function(){var z=this.e
if((z&8)!==0)return
if(z>=128){z-=128
this.e=z
if(z<128){if((z&64)!==0){z=this.r
z=!z.gF(z)}else z=!1
if(z)this.r.aA(this)
else{z=(this.e&4294967291)>>>0
this.e=z
if((z&32)===0)this.bl(this.gbr())}}}},
a2:function(){var z=(this.e&4294967279)>>>0
this.e=z
if((z&8)!==0)return this.f
this.aG()
return this.f},
aG:function(){var z=(this.e|8)>>>0
this.e=z
if((z&64)!==0)this.r.bF()
if((this.e&32)===0)this.r=null
this.f=this.bo()},
aF:["cl",function(a){var z=this.e
if((z&8)!==0)return
if(z<32)this.bw(a)
else this.aE(H.e(new P.hh(a,null),[null]))}],
aC:["cm",function(a,b){var z=this.e
if((z&8)!==0)return
if(z<32)this.by(a,b)
else this.aE(new P.hj(a,b,null))}],
cu:function(){var z=this.e
if((z&8)!==0)return
z=(z|2)>>>0
this.e=z
if(z<32)this.bx()
else this.aE(C.u)},
bq:[function(){},"$0","gbp",0,0,2],
bs:[function(){},"$0","gbr",0,0,2],
bo:function(){return},
aE:function(a){var z,y
z=this.r
if(z==null){z=H.e(new P.hS(null,null,0),[null])
this.r=z}z.O(0,a)
y=this.e
if((y&64)===0){y=(y|64)>>>0
this.e=y
if(y<128)this.r.aA(this)}},
bw:function(a){var z=this.e
this.e=(z|32)>>>0
this.d.b9(this.a,a)
this.e=(this.e&4294967263)>>>0
this.aH((z&4)!==0)},
by:function(a,b){var z,y
z=this.e
y=new P.hc(this,a,b)
if((z&1)!==0){this.e=(z|16)>>>0
this.aG()
z=this.f
if(!!J.j(z).$isa1)z.ay(y)
else y.$0()}else{y.$0()
this.aH((z&4)!==0)}},
bx:function(){var z,y
z=new P.hb(this)
this.aG()
this.e=(this.e|16)>>>0
y=this.f
if(!!J.j(y).$isa1)y.ay(z)
else z.$0()},
bl:function(a){var z=this.e
this.e=(z|32)>>>0
a.$0()
this.e=(this.e&4294967263)>>>0
this.aH((z&4)!==0)},
aH:function(a){var z,y
if((this.e&64)!==0){z=this.r
z=z.gF(z)}else z=!1
if(z){z=(this.e&4294967231)>>>0
this.e=z
if((z&4)!==0)if(z<128){z=this.r
z=z==null||z.gF(z)}else z=!1
else z=!1
if(z)this.e=(this.e&4294967291)>>>0}for(;!0;a=y){z=this.e
if((z&8)!==0){this.r=null
return}y=(z&4)!==0
if(a===y)break
this.e=(z^32)>>>0
if(y)this.bq()
else this.bs()
this.e=(this.e&4294967263)>>>0}z=this.e
if((z&64)!==0&&z<128)this.r.aA(this)},
cq:function(a,b,c,d){var z=this.d
z.toString
this.a=a
this.b=P.df(b,z)
this.c=c}},
hc:{"^":"d:2;a,b,c",
$0:function(){var z,y,x,w,v,u
z=this.a
y=z.e
if((y&8)!==0&&(y&16)===0)return
z.e=(y|32)>>>0
y=z.b
x=H.ak(H.aX(),[H.dq(P.c),H.dq(P.ag)]).T(y)
w=z.d
v=this.b
u=z.b
if(x)w.dA(u,v,this.c)
else w.b9(u,v)
z.e=(z.e&4294967263)>>>0}},
hb:{"^":"d:2;a",
$0:function(){var z,y
z=this.a
y=z.e
if((y&16)===0)return
z.e=(y|42)>>>0
z.d.bV(z.c)
z.e=(z.e&4294967263)>>>0}},
d6:{"^":"c;aw:a@"},
hh:{"^":"d6;b,a",
b5:function(a){a.bw(this.b)}},
hj:{"^":"d6;Y:b>,L:c<,a",
b5:function(a){a.by(this.b,this.c)}},
hi:{"^":"c;",
b5:function(a){a.bx()},
gaw:function(){return},
saw:function(a){throw H.b(new P.bb("No events after a done."))}},
hL:{"^":"c;ad:a@",
aA:function(a){var z=this.a
if(z===1)return
if(z>=1){this.a=1
return}P.dM(new P.hM(this,a))
this.a=1},
bF:function(){if(this.a===1)this.a=3}},
hM:{"^":"d:1;a,b",
$0:function(){var z,y,x,w
z=this.a
y=z.a
z.a=0
if(y===3)return
x=z.b
w=x.gaw()
z.b=w
if(w==null)z.c=null
x.b5(this.b)}},
hS:{"^":"hL;b,c,a",
gF:function(a){return this.c==null},
O:function(a,b){var z=this.c
if(z==null){this.c=b
this.b=b}else{z.saw(b)
this.c=b}}},
i_:{"^":"d:1;a,b,c",
$0:function(){return this.a.a_(this.b,this.c)}},
hZ:{"^":"d:14;a,b",
$2:function(a,b){P.hY(this.a,this.b,a,b)}},
i1:{"^":"d:1;a,b",
$0:function(){return this.a.I(this.b)}},
bM:{"^":"Q;",
P:function(a,b,c,d){return this.cB(a,d,c,!0===b)},
bN:function(a,b,c){return this.P(a,null,b,c)},
cB:function(a,b,c,d){return P.ho(this,a,b,c,d,H.v(this,"bM",0),H.v(this,"bM",1))},
bm:function(a,b){b.aF(a)},
cH:function(a,b,c){c.aC(a,b)},
$asQ:function(a,b){return[b]}},
d8:{"^":"ha;x,y,a,b,c,d,e,f,r",
aF:function(a){if((this.e&2)!==0)return
this.cl(a)},
aC:function(a,b){if((this.e&2)!==0)return
this.cm(a,b)},
bq:[function(){var z=this.y
if(z==null)return
z.bR(0)},"$0","gbp",0,0,2],
bs:[function(){var z=this.y
if(z==null)return
z.bT()},"$0","gbr",0,0,2],
bo:function(){var z=this.y
if(z!=null){this.y=null
return z.a2()}return},
dH:[function(a){this.x.bm(a,this)},"$1","gcE",2,0,function(){return H.aW(function(a,b){return{func:1,v:true,args:[a]}},this.$receiver,"d8")}],
dJ:[function(a,b){this.x.cH(a,b,this)},"$2","gcG",4,0,15],
dI:[function(){this.cu()},"$0","gcF",0,0,2],
cr:function(a,b,c,d,e,f,g){var z,y
z=this.gcE()
y=this.gcG()
this.y=this.x.a.bN(z,this.gcF(),y)},
m:{
ho:function(a,b,c,d,e,f,g){var z=$.l
z=H.e(new P.d8(a,null,null,null,null,z,e?1:0,null,null),[f,g])
z.cq(b,c,d,e)
z.cr(a,b,c,d,e,f,g)
return z}}},
hJ:{"^":"bM;b,a",
bm:function(a,b){var z,y,x,w,v
z=null
try{z=this.b.$1(a)}catch(w){v=H.G(w)
y=v
x=H.D(w)
P.hX(b,y,x)
return}b.aF(z)}},
cQ:{"^":"c;"},
b1:{"^":"c;Y:a>,L:b<",
j:function(a){return H.a(this.a)},
$isz:1},
hW:{"^":"c;"},
i6:{"^":"d:1;a,b",
$0:function(){var z,y,x
z=this.a
y=z.a
if(y==null){x=new P.cC()
z.a=x
z=x}else z=y
y=this.b
if(y==null)throw H.b(z)
x=H.b(z)
x.stack=J.ac(y)
throw x}},
hO:{"^":"hW;",
bV:function(a){var z,y,x,w
try{if(C.c===$.l){x=a.$0()
return x}x=P.dg(null,null,this,a)
return x}catch(w){x=H.G(w)
z=x
y=H.D(w)
return P.aU(null,null,this,z,y)}},
b9:function(a,b){var z,y,x,w
try{if(C.c===$.l){x=a.$1(b)
return x}x=P.di(null,null,this,a,b)
return x}catch(w){x=H.G(w)
z=x
y=H.D(w)
return P.aU(null,null,this,z,y)}},
dA:function(a,b,c){var z,y,x,w
try{if(C.c===$.l){x=a.$2(b,c)
return x}x=P.dh(null,null,this,a,b,c)
return x}catch(w){x=H.G(w)
z=x
y=H.D(w)
return P.aU(null,null,this,z,y)}},
aV:function(a,b){if(b)return new P.hP(this,a)
else return new P.hQ(this,a)},
bE:function(a,b){return new P.hR(this,a)},
h:function(a,b){return},
bU:function(a){if($.l===C.c)return a.$0()
return P.dg(null,null,this,a)},
b8:function(a,b){if($.l===C.c)return a.$1(b)
return P.di(null,null,this,a,b)},
dz:function(a,b,c){if($.l===C.c)return a.$2(b,c)
return P.dh(null,null,this,a,b,c)}},
hP:{"^":"d:1;a,b",
$0:function(){return this.a.bV(this.b)}},
hQ:{"^":"d:1;a,b",
$0:function(){return this.a.bU(this.b)}},
hR:{"^":"d:0;a,b",
$1:function(a){return this.a.b9(this.b,a)}}}],["","",,P,{"^":"",
bz:function(){return H.e(new H.a3(0,null,null,null,null,null,0),[null,null])},
av:function(a){return H.dx(a,H.e(new H.a3(0,null,null,null,null,null,0),[null,null]))},
eY:function(a,b,c){var z,y
if(P.bR(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}z=[]
y=$.$get$aD()
y.push(a)
try{P.i4(a,z)}finally{if(0>=y.length)return H.h(y,-1)
y.pop()}y=P.cN(b,z,", ")+c
return y.charCodeAt(0)==0?y:y},
b5:function(a,b,c){var z,y,x
if(P.bR(a))return b+"..."+c
z=new P.bJ(b)
y=$.$get$aD()
y.push(a)
try{x=z
x.a=P.cN(x.ga0(),a,", ")}finally{if(0>=y.length)return H.h(y,-1)
y.pop()}y=z
y.a=y.ga0()+c
y=z.ga0()
return y.charCodeAt(0)==0?y:y},
bR:function(a){var z,y
for(z=0;y=$.$get$aD(),z<y.length;++z)if(a===y[z])return!0
return!1},
i4:function(a,b){var z,y,x,w,v,u,t,s,r,q
z=a.gn(a)
y=0
x=0
while(!0){if(!(y<80||x<3))break
if(!z.k())return
w=H.a(z.gl())
b.push(w)
y+=w.length+2;++x}if(!z.k()){if(x<=5)return
if(0>=b.length)return H.h(b,-1)
v=b.pop()
if(0>=b.length)return H.h(b,-1)
u=b.pop()}else{t=z.gl();++x
if(!z.k()){if(x<=4){b.push(H.a(t))
return}v=H.a(t)
if(0>=b.length)return H.h(b,-1)
u=b.pop()
y+=v.length+2}else{s=z.gl();++x
for(;z.k();t=s,s=r){r=z.gl();++x
if(x>100){while(!0){if(!(y>75&&x>3))break
if(0>=b.length)return H.h(b,-1)
y-=b.pop().length+2;--x}b.push("...")
return}}u=H.a(t)
v=H.a(s)
y+=v.length+u.length+4}}if(x>b.length+2){y+=5
q="..."}else q=null
while(!0){if(!(y>80&&b.length>3))break
if(0>=b.length)return H.h(b,-1)
y-=b.pop().length+2
if(q==null){y+=5
q="..."}}if(q!=null)b.push(q)
b.push(u)
b.push(v)},
aw:function(a,b,c,d){return H.e(new P.hC(0,null,null,null,null,null,0),[d])},
cv:function(a){var z,y,x
z={}
if(P.bR(a))return"{...}"
y=new P.bJ("")
try{$.$get$aD().push(a)
x=y
x.a=x.ga0()+"{"
z.a=!0
J.e4(a,new P.fc(z,y))
z=y
z.a=z.ga0()+"}"}finally{z=$.$get$aD()
if(0>=z.length)return H.h(z,-1)
z.pop()}z=y.ga0()
return z.charCodeAt(0)==0?z:z},
dd:{"^":"a3;a,b,c,d,e,f,r",
ag:function(a){return H.iR(a)&0x3ffffff},
ah:function(a,b){var z,y,x
if(a==null)return-1
z=a.length
for(y=0;y<z;++y){x=a[y].gbK()
if(x==null?b==null:x===b)return y}return-1},
m:{
aA:function(a,b){return H.e(new P.dd(0,null,null,null,null,null,0),[a,b])}}},
hC:{"^":"hA;a,b,c,d,e,f,r",
gn:function(a){var z=new P.aS(this,this.r,null,null)
z.c=this.e
return z},
gi:function(a){return this.a},
B:function(a,b){var z,y
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null)return!1
return z[b]!=null}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null)return!1
return y[b]!=null}else return this.cz(b)},
cz:function(a){var z=this.d
if(z==null)return!1
return this.ar(z[this.ap(a)],a)>=0},
bO:function(a){var z
if(!(typeof a==="string"&&a!=="__proto__"))z=typeof a==="number"&&(a&0x3ffffff)===a
else z=!0
if(z)return this.B(0,a)?a:null
else return this.cJ(a)},
cJ:function(a){var z,y,x
z=this.d
if(z==null)return
y=z[this.ap(a)]
x=this.ar(y,a)
if(x<0)return
return J.c5(y,x).gbj()},
p:function(a,b){var z,y
z=this.e
y=this.r
for(;z!=null;){b.$1(z.a)
if(y!==this.r)throw H.b(new P.y(this))
z=z.b}},
O:function(a,b){var z,y,x
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null){y=Object.create(null)
y["<non-identifier-key>"]=y
delete y["<non-identifier-key>"]
this.b=y
z=y}return this.bf(z,b)}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null){y=Object.create(null)
y["<non-identifier-key>"]=y
delete y["<non-identifier-key>"]
this.c=y
x=y}return this.bf(x,b)}else return this.N(b)},
N:function(a){var z,y,x
z=this.d
if(z==null){z=P.hE()
this.d=z}y=this.ap(a)
x=z[y]
if(x==null)z[y]=[this.aI(a)]
else{if(this.ar(x,a)>=0)return!1
x.push(this.aI(a))}return!0},
a9:function(a,b){if(typeof b==="string"&&b!=="__proto__")return this.bg(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.bg(this.c,b)
else return this.cL(b)},
cL:function(a){var z,y,x
z=this.d
if(z==null)return!1
y=z[this.ap(a)]
x=this.ar(y,a)
if(x<0)return!1
this.bh(y.splice(x,1)[0])
return!0},
a3:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
bf:function(a,b){if(a[b]!=null)return!1
a[b]=this.aI(b)
return!0},
bg:function(a,b){var z
if(a==null)return!1
z=a[b]
if(z==null)return!1
this.bh(z)
delete a[b]
return!0},
aI:function(a){var z,y
z=new P.hD(a,null,null)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.c=y
y.b=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
bh:function(a){var z,y
z=a.gcw()
y=a.b
if(z==null)this.e=y
else z.b=y
if(y==null)this.f=z
else y.c=z;--this.a
this.r=this.r+1&67108863},
ap:function(a){return J.H(a)&0x3ffffff},
ar:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.A(a[y].gbj(),b))return y
return-1},
$isk:1,
m:{
hE:function(){var z=Object.create(null)
z["<non-identifier-key>"]=z
delete z["<non-identifier-key>"]
return z}}},
hD:{"^":"c;bj:a<,b,cw:c<"},
aS:{"^":"c;a,b,c,d",
gl:function(){return this.d},
k:function(){var z=this.a
if(this.b!==z.r)throw H.b(new P.y(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.b
return!0}}}},
hA:{"^":"fr;"},
ax:{"^":"fg;"},
fg:{"^":"c+af;",$isi:1,$asi:null,$isk:1},
af:{"^":"c;",
gn:function(a){return new H.ct(a,this.gi(a),0,null)},
A:function(a,b){return this.h(a,b)},
p:function(a,b){var z,y
z=this.gi(a)
for(y=0;y<z;++y){b.$1(this.h(a,y))
if(z!==this.gi(a))throw H.b(new P.y(a))}},
B:function(a,b){var z,y
z=this.gi(a)
for(y=0;y<this.gi(a);++y){if(J.A(this.h(a,y),b))return!0
if(z!==this.gi(a))throw H.b(new P.y(a))}return!1},
dC:function(a,b){return H.e(new H.bd(a,b),[H.v(a,"af",0)])},
a8:function(a,b){return H.e(new H.b7(a,b),[null,null])},
a6:function(a,b,c){var z,y,x
z=this.gi(a)
for(y=b,x=0;x<z;++x){y=c.$2(y,this.h(a,x))
if(z!==this.gi(a))throw H.b(new P.y(a))}return y},
ak:function(a,b){var z,y,x
z=H.e([],[H.v(a,"af",0)])
C.a.si(z,this.gi(a))
for(y=0;y<this.gi(a);++y){x=this.h(a,y)
if(y>=z.length)return H.h(z,y)
z[y]=x}return z},
aa:function(a){return this.ak(a,!0)},
V:function(a,b){var z,y,x,w
z=this.gi(a)
for(y=J.N(b);y.k();z=w){x=y.gl()
w=z+1
this.si(a,w)
this.t(a,z,x)}},
j:function(a){return P.b5(a,"[","]")},
$isi:1,
$asi:null,
$isk:1},
fc:{"^":"d:5;a,b",
$2:function(a,b){var z,y
z=this.a
if(!z.a)this.b.a+=", "
z.a=!1
z=this.b
y=z.a+=H.a(a)
z.a=y+": "
z.a+=H.a(b)}},
fa:{"^":"aL;a,b,c,d",
gn:function(a){return new P.hF(this,this.c,this.d,this.b,null)},
p:function(a,b){var z,y,x
z=this.d
for(y=this.b;y!==this.c;y=(y+1&this.a.length-1)>>>0){x=this.a
if(y<0||y>=x.length)return H.h(x,y)
b.$1(x[y])
if(z!==this.d)H.r(new P.y(this))}},
gF:function(a){return this.b===this.c},
gi:function(a){return(this.c-this.b&this.a.length-1)>>>0},
A:function(a,b){var z,y,x,w
z=(this.c-this.b&this.a.length-1)>>>0
if(typeof b!=="number")return H.E(b)
if(0>b||b>=z)H.r(P.au(b,this,"index",null,z))
y=this.a
x=y.length
w=(this.b+b&x-1)>>>0
if(w<0||w>=x)return H.h(y,w)
return y[w]},
a3:function(a){var z,y,x,w,v
z=this.b
y=this.c
if(z!==y){for(x=this.a,w=x.length,v=w-1;z!==y;z=(z+1&v)>>>0){if(z<0||z>=w)return H.h(x,z)
x[z]=null}this.c=0
this.b=0;++this.d}},
j:function(a){return P.b5(this,"{","}")},
bS:function(){var z,y,x,w
z=this.b
if(z===this.c)throw H.b(H.cq());++this.d
y=this.a
x=y.length
if(z>=x)return H.h(y,z)
w=y[z]
y[z]=null
this.b=(z+1&x-1)>>>0
return w},
N:function(a){var z,y,x
z=this.a
y=this.c
x=z.length
if(y<0||y>=x)return H.h(z,y)
z[y]=a
x=(y+1&x-1)>>>0
this.c=x
if(this.b===x)this.bk();++this.d},
bk:function(){var z,y,x,w
z=new Array(this.a.length*2)
z.fixed$length=Array
y=H.e(z,[H.q(this,0)])
z=this.a
x=this.b
w=z.length-x
C.a.ba(y,0,w,z,x)
C.a.ba(y,w,w+this.b,this.a,0)
this.b=0
this.c=this.a.length
this.a=y},
cn:function(a,b){var z=new Array(8)
z.fixed$length=Array
this.a=H.e(z,[b])},
$isk:1,
m:{
bA:function(a,b){var z=H.e(new P.fa(null,0,0,0),[b])
z.cn(a,b)
return z}}},
hF:{"^":"c;a,b,c,d,e",
gl:function(){return this.e},
k:function(){var z,y,x
z=this.a
if(this.c!==z.d)H.r(new P.y(z))
y=this.d
if(y===this.b){this.e=null
return!1}z=z.a
x=z.length
if(y>=x)return H.h(z,y)
this.e=z[y]
this.d=(y+1&x-1)>>>0
return!0}},
fs:{"^":"c;",
a8:function(a,b){return H.e(new H.cg(this,b),[H.q(this,0),null])},
j:function(a){return P.b5(this,"{","}")},
p:function(a,b){var z
for(z=new P.aS(this,this.r,null,null),z.c=this.e;z.k();)b.$1(z.d)},
a6:function(a,b,c){var z,y
for(z=new P.aS(this,this.r,null,null),z.c=this.e,y=b;z.k();)y=c.$2(y,z.d)
return y},
A:function(a,b){var z,y,x
if(typeof b!=="number"||Math.floor(b)!==b)throw H.b(P.c9("index"))
if(b<0)H.r(P.J(b,0,null,"index",null))
for(z=new P.aS(this,this.r,null,null),z.c=this.e,y=0;z.k();){x=z.d
if(b===y)return x;++y}throw H.b(P.au(b,this,"index",null,y))},
$isk:1},
fr:{"^":"fs;"}}],["","",,P,{"^":"",
ch:function(a){if(typeof a==="number"||typeof a==="boolean"||null==a)return J.ac(a)
if(typeof a==="string")return JSON.stringify(a)
return P.eC(a)},
eC:function(a){var z=J.j(a)
if(!!z.$isd)return z.j(a)
return H.aO(a)},
b4:function(a){return new P.hn(a)},
W:function(a,b,c){var z,y
z=H.e([],[c])
for(y=J.N(a);y.k();)z.push(y.gl())
if(b)return z
z.fixed$length=Array
return z},
aa:function(a){var z=H.a(a)
H.iS(z)},
bi:{"^":"c;"},
"+bool":0,
jl:{"^":"c;"},
aF:{"^":"M;"},
"+double":0,
ae:{"^":"c;a",
C:function(a,b){return new P.ae(C.b.C(this.a,b.gaq()))},
M:function(a,b){return new P.ae(C.b.M(this.a,b.gaq()))},
ab:function(a,b){return C.b.ab(this.a,b.gaq())},
an:function(a,b){return C.b.an(this.a,b.gaq())},
az:function(a,b){return C.b.az(this.a,b.gaq())},
q:function(a,b){if(b==null)return!1
if(!(b instanceof P.ae))return!1
return this.a===b.a},
gu:function(a){return this.a&0x1FFFFFFF},
j:function(a){var z,y,x,w,v
z=new P.ez()
y=this.a
if(y<0)return"-"+new P.ae(-y).j(0)
x=z.$1(C.b.b6(C.b.a1(y,6e7),60))
w=z.$1(C.b.b6(C.b.a1(y,1e6),60))
v=new P.ey().$1(C.b.b6(y,1e6))
return""+C.b.a1(y,36e8)+":"+H.a(x)+":"+H.a(w)+"."+H.a(v)},
bC:function(a){return new P.ae(Math.abs(this.a))},
m:{
ex:function(a,b,c,d,e,f){return new P.ae(864e8*a+36e8*b+6e7*e+1e6*f+1000*d+c)}}},
ey:{"^":"d:6;",
$1:function(a){if(a>=1e5)return""+a
if(a>=1e4)return"0"+a
if(a>=1000)return"00"+a
if(a>=100)return"000"+a
if(a>=10)return"0000"+a
return"00000"+a}},
ez:{"^":"d:6;",
$1:function(a){if(a>=10)return""+a
return"0"+a}},
z:{"^":"c;",
gL:function(){return H.D(this.$thrownJsError)}},
cC:{"^":"z;",
j:function(a){return"Throw of null."}},
a0:{"^":"z;a,b,c,d",
gaK:function(){return"Invalid argument"+(!this.a?"(s)":"")},
gaJ:function(){return""},
j:function(a){var z,y,x,w,v,u
z=this.c
y=z!=null?" ("+H.a(z)+")":""
z=this.d
x=z==null?"":": "+H.a(z)
w=this.gaK()+y+x
if(!this.a)return w
v=this.gaJ()
u=P.ch(this.b)
return w+v+": "+H.a(u)},
m:{
aq:function(a){return new P.a0(!1,null,null,a)},
ca:function(a,b,c){return new P.a0(!0,a,b,c)},
c9:function(a){return new P.a0(!1,null,a,"Must not be null")}}},
cJ:{"^":"a0;e,f,a,b,c,d",
gaK:function(){return"RangeError"},
gaJ:function(){var z,y,x
z=this.e
if(z==null){z=this.f
y=z!=null?": Not less than or equal to "+H.a(z):""}else{x=this.f
if(x==null)y=": Not greater than or equal to "+H.a(z)
else{if(typeof x!=="number")return x.an()
if(typeof z!=="number")return H.E(z)
if(x>z)y=": Not in range "+z+".."+x+", inclusive"
else y=x<z?": Valid value range is empty":": Only valid value is "+z}}return y},
m:{
aP:function(a,b,c){return new P.cJ(null,null,!0,a,b,"Value not in range")},
J:function(a,b,c,d,e){return new P.cJ(b,c,!0,a,d,"Invalid value")},
bI:function(a,b,c,d,e,f){if(0>a||a>c)throw H.b(P.J(a,0,c,"start",f))
if(a>b||b>c)throw H.b(P.J(b,a,c,"end",f))
return b}}},
eK:{"^":"a0;e,i:f>,a,b,c,d",
gaK:function(){return"RangeError"},
gaJ:function(){if(J.c4(this.b,0))return": index must not be negative"
var z=this.f
if(z===0)return": no indices are valid"
return": index should be less than "+H.a(z)},
m:{
au:function(a,b,c,d,e){var z=e!=null?e:J.V(b)
return new P.eK(b,z,!0,a,c,"Index out of range")}}},
t:{"^":"z;a",
j:function(a){return"Unsupported operation: "+this.a}},
d3:{"^":"z;a",
j:function(a){var z=this.a
return z!=null?"UnimplementedError: "+H.a(z):"UnimplementedError"}},
bb:{"^":"z;a",
j:function(a){return"Bad state: "+this.a}},
y:{"^":"z;a",
j:function(a){var z=this.a
if(z==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+H.a(P.ch(z))+"."}},
fh:{"^":"c;",
j:function(a){return"Out of Memory"},
gL:function(){return},
$isz:1},
cM:{"^":"c;",
j:function(a){return"Stack Overflow"},
gL:function(){return},
$isz:1},
eu:{"^":"z;a",
j:function(a){return"Reading static variable '"+this.a+"' during its initialization"}},
hn:{"^":"c;a",
j:function(a){var z=this.a
if(z==null)return"Exception"
return"Exception: "+H.a(z)}},
cl:{"^":"c;a,b,c",
j:function(a){var z,y,x
z=this.a
y=z!=null&&""!==z?"FormatException: "+H.a(z):"FormatException"
x=this.b
if(typeof x!=="string")return y
if(x.length>78)x=J.eh(x,0,75)+"..."
return y+"\n"+H.a(x)}},
eD:{"^":"c;a,b",
j:function(a){return"Expando:"+H.a(this.a)},
h:function(a,b){var z,y
z=this.b
if(typeof z!=="string"){if(b==null||typeof b==="boolean"||typeof b==="number"||typeof b==="string")H.r(P.ca(b,"Expandos are not allowed on strings, numbers, booleans or null",null))
return z.get(b)}y=H.bF(b,"expando$values")
return y==null?null:H.bF(y,z)},
t:function(a,b,c){var z,y
z=this.b
if(typeof z!=="string")z.set(b,c)
else{y=H.bF(b,"expando$values")
if(y==null){y=new P.c()
H.cI(b,"expando$values",y)}H.cI(y,z,c)}}},
o:{"^":"M;"},
"+int":0,
u:{"^":"c;",
a8:function(a,b){return H.aM(this,b,H.v(this,"u",0),null)},
B:function(a,b){var z
for(z=this.gn(this);z.k();)if(J.A(z.gl(),b))return!0
return!1},
p:function(a,b){var z
for(z=this.gn(this);z.k();)b.$1(z.gl())},
a6:function(a,b,c){var z,y
for(z=this.gn(this),y=b;z.k();)y=c.$2(y,z.gl())
return y},
ak:function(a,b){return P.W(this,!0,H.v(this,"u",0))},
aa:function(a){return this.ak(a,!0)},
gi:function(a){var z,y
z=this.gn(this)
for(y=0;z.k();)++y
return y},
gF:function(a){return!this.gn(this).k()},
A:function(a,b){var z,y,x
if(typeof b!=="number"||Math.floor(b)!==b)throw H.b(P.c9("index"))
if(b<0)H.r(P.J(b,0,null,"index",null))
for(z=this.gn(this),y=0;z.k();){x=z.gl()
if(b===y)return x;++y}throw H.b(P.au(b,this,"index",null,y))},
j:function(a){return P.eY(this,"(",")")}},
b6:{"^":"c;"},
i:{"^":"c;",$asi:null,$isk:1},
"+List":0,
k4:{"^":"c;",
j:function(a){return"null"}},
"+Null":0,
M:{"^":"c;"},
"+num":0,
c:{"^":";",
q:function(a,b){return this===b},
gu:function(a){return H.a6(this)},
j:function(a){return H.aO(this)},
toString:function(){return this.j(this)}},
fd:{"^":"c;"},
ag:{"^":"c;"},
Y:{"^":"c;"},
"+String":0,
bJ:{"^":"c;a0:a<",
gi:function(a){return this.a.length},
j:function(a){var z=this.a
return z.charCodeAt(0)==0?z:z},
m:{
cN:function(a,b,c){var z=J.N(b)
if(!z.k())return a
if(c.length===0){do a+=H.a(z.gl())
while(z.k())}else{a+=H.a(z.gl())
for(;z.k();)a=a+c+H.a(z.gl())}return a}}}}],["","",,W,{"^":"",
j8:function(){return window},
ei:function(a,b,c){var z={}
z.type=b
return new Blob(a,z)},
d7:function(a,b){return document.createElement(a)},
a7:function(a,b){a=536870911&a+b
a=536870911&a+((524287&a)<<10>>>0)
return a^a>>>6},
db:function(a){a=536870911&a+((67108863&a)<<3>>>0)
a^=a>>>11
return 536870911&a+((16383&a)<<15>>>0)},
i3:function(a){var z
if(a==null)return
if("postMessage" in a){z=W.hg(a)
if(!!J.j(z).$isI)return z
return}else return a},
K:function(a){var z=$.l
if(z===C.c)return a
return z.bE(a,!0)},
p:{"^":"B;","%":"HTMLAppletElement|HTMLBRElement|HTMLContentElement|HTMLDListElement|HTMLDataListElement|HTMLDetailsElement|HTMLDialogElement|HTMLDirectoryElement|HTMLDivElement|HTMLFieldSetElement|HTMLFontElement|HTMLFrameElement|HTMLHRElement|HTMLHeadElement|HTMLHeadingElement|HTMLHtmlElement|HTMLKeygenElement|HTMLLabelElement|HTMLLegendElement|HTMLLinkElement|HTMLMapElement|HTMLMarqueeElement|HTMLMenuElement|HTMLMetaElement|HTMLModElement|HTMLOListElement|HTMLOptGroupElement|HTMLParagraphElement|HTMLPictureElement|HTMLPreElement|HTMLQuoteElement|HTMLShadowElement|HTMLSpanElement|HTMLStyleElement|HTMLTableCaptionElement|HTMLTableCellElement|HTMLTableColElement|HTMLTableDataCellElement|HTMLTableElement|HTMLTableHeaderCellElement|HTMLTableRowElement|HTMLTableSectionElement|HTMLTemplateElement|HTMLTitleElement|HTMLUListElement|HTMLUnknownElement|PluginPlaceholderElement;HTMLElement"},
ja:{"^":"p;R:target=",
j:function(a){return String(a)},
$isf:1,
"%":"HTMLAnchorElement"},
jc:{"^":"p;R:target=",
j:function(a){return String(a)},
$isf:1,
"%":"HTMLAreaElement"},
jd:{"^":"p;R:target=","%":"HTMLBaseElement"},
je:{"^":"p;",
gb3:function(a){return H.e(new W.Z(a,"load",!1),[H.q(C.f,0)])},
$isI:1,
$isf:1,
"%":"HTMLBodyElement"},
jf:{"^":"p;H:value=","%":"HTMLButtonElement"},
jg:{"^":"p;v:height},w:width}",
c5:function(a,b,c){return a.getContext(b)},
c4:function(a,b){return this.c5(a,b,null)},
"%":"HTMLCanvasElement"},
jh:{"^":"f;",
d2:function(a,b,c,d){return a.drawImage(b,c,d)},
"%":"CanvasRenderingContext2D"},
em:{"^":"w;i:length=",$isf:1,"%":"CDATASection|Comment|Text;CharacterData"},
jj:{"^":"as;av:client=","%":"CrossOriginConnectEvent"},
jk:{"^":"eL;i:length=","%":"CSS2Properties|CSSStyleDeclaration|MSStyleCSSProperties"},
eL:{"^":"f+et;"},
et:{"^":"c;"},
ev:{"^":"w;",
gau:function(a){if(a._docChildren==null)a._docChildren=new P.cj(a,new W.be(a))
return a._docChildren},
ga7:function(a){var z,y
z=W.d7("div",null)
y=J.m(z)
y.cV(z,this.bH(a,!0))
return y.ga7(z)},
$isf:1,
"%":";DocumentFragment"},
jm:{"^":"f;",
j:function(a){return String(a)},
"%":"DOMException"},
ew:{"^":"f;",
j:function(a){return"Rectangle ("+H.a(a.left)+", "+H.a(a.top)+") "+H.a(this.gw(a))+" x "+H.a(this.gv(a))},
q:function(a,b){var z
if(b==null)return!1
z=J.j(b)
if(!z.$isX)return!1
return a.left===z.gai(b)&&a.top===z.gal(b)&&this.gw(a)===z.gw(b)&&this.gv(a)===z.gv(b)},
gu:function(a){var z,y,x,w
z=a.left
y=a.top
x=this.gw(a)
w=this.gv(a)
return W.db(W.a7(W.a7(W.a7(W.a7(0,z&0x1FFFFFFF),y&0x1FFFFFFF),x&0x1FFFFFFF),w&0x1FFFFFFF))},
gaW:function(a){return a.bottom},
gv:function(a){return a.height},
gai:function(a){return a.left},
gb7:function(a){return a.right},
gal:function(a){return a.top},
gw:function(a){return a.width},
$isX:1,
$asX:I.a9,
"%":";DOMRectReadOnly"},
hd:{"^":"ax;a,b",
B:function(a,b){return J.c6(this.b,b)},
gi:function(a){return this.b.length},
h:function(a,b){var z=this.b
if(b>>>0!==b||b>=z.length)return H.h(z,b)
return z[b]},
t:function(a,b,c){var z=this.b
if(b>>>0!==b||b>=z.length)return H.h(z,b)
this.a.replaceChild(c,z[b])},
si:function(a,b){throw H.b(new P.t("Cannot resize element lists"))},
gn:function(a){var z=this.aa(this)
return new J.bs(z,z.length,0,null)},
V:function(a,b){var z,y
for(z=J.N(b instanceof W.be?P.W(b,!0,null):b),y=this.a;z.k();)y.appendChild(z.gl())},
$asax:function(){return[W.B]},
$asi:function(){return[W.B]}},
B:{"^":"w;",
gau:function(a){return new W.hd(a,a.children)},
gav:function(a){return P.fk(a.clientLeft,a.clientTop,a.clientWidth,a.clientHeight,null)},
j:function(a){return a.localName},
ga7:function(a){return a.innerHTML},
c3:function(a,b){return a.getAttribute(b)},
ce:function(a,b,c){return a.setAttribute(b,c)},
gbP:function(a){return H.e(new W.Z(a,"change",!1),[H.q(C.j,0)])},
gb2:function(a){return H.e(new W.Z(a,"click",!1),[H.q(C.k,0)])},
gb3:function(a){return H.e(new W.Z(a,"load",!1),[H.q(C.f,0)])},
gbQ:function(a){return H.e(new W.Z(a,"mousemove",!1),[H.q(C.l,0)])},
$isB:1,
$isw:1,
$isc:1,
$isf:1,
$isI:1,
"%":";Element"},
jo:{"^":"p;v:height},K:src},w:width}","%":"HTMLEmbedElement"},
jp:{"^":"as;Y:error=","%":"ErrorEvent"},
as:{"^":"f;",
gR:function(a){return W.i3(a.target)},
$isc:1,
"%":"AnimationEvent|AnimationPlayerEvent|ApplicationCacheErrorEvent|AudioProcessingEvent|AutocompleteErrorEvent|BeforeInstallPromptEvent|BeforeUnloadEvent|ClipboardEvent|CloseEvent|CustomEvent|DefaultSessionStartEvent|DeviceLightEvent|DeviceMotionEvent|DeviceOrientationEvent|ExtendableEvent|FetchEvent|FontFaceSetLoadEvent|GamepadEvent|GeofencingEvent|HashChangeEvent|IDBVersionChangeEvent|MIDIConnectionEvent|MIDIMessageEvent|MediaEncryptedEvent|MediaKeyEvent|MediaKeyMessageEvent|MediaQueryListEvent|MediaStreamEvent|MediaStreamTrackEvent|MessageEvent|NotificationEvent|OfflineAudioCompletionEvent|PageTransitionEvent|PeriodicSyncEvent|PopStateEvent|ProgressEvent|PromiseRejectionEvent|PushEvent|RTCDTMFToneChangeEvent|RTCDataChannelEvent|RTCIceCandidateEvent|RTCPeerConnectionIceEvent|RelatedEvent|ResourceProgressEvent|SecurityPolicyViolationEvent|ServicePortConnectEvent|ServiceWorkerMessageEvent|SpeechRecognitionEvent|SpeechSynthesisEvent|StorageEvent|SyncEvent|TrackEvent|TransitionEvent|WebGLContextEvent|WebKitTransitionEvent|XMLHttpRequestProgressEvent;Event|InputEvent"},
I:{"^":"f;",
ct:function(a,b,c,d){return a.addEventListener(b,H.a8(c,1),!1)},
cM:function(a,b,c,d){return a.removeEventListener(b,H.a8(c,1),!1)},
$isI:1,
"%":"CrossOriginServiceWorkerClient|MediaStream;EventTarget"},
jH:{"^":"p;i:length=,R:target=","%":"HTMLFormElement"},
jJ:{"^":"eO;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.b(P.au(b,a,null,null,null))
return a[b]},
t:function(a,b,c){throw H.b(new P.t("Cannot assign element of immutable List."))},
si:function(a,b){throw H.b(new P.t("Cannot resize immutable List."))},
A:function(a,b){if(b>>>0!==b||b>=a.length)return H.h(a,b)
return a[b]},
$isi:1,
$asi:function(){return[W.w]},
$isk:1,
$isa2:1,
$asa2:function(){return[W.w]},
$isP:1,
$asP:function(){return[W.w]},
"%":"HTMLCollection|HTMLFormControlsCollection|HTMLOptionsCollection"},
eM:{"^":"f+af;",$isi:1,
$asi:function(){return[W.w]},
$isk:1},
eO:{"^":"eM+cn;",$isi:1,
$asi:function(){return[W.w]},
$isk:1},
jK:{"^":"p;v:height},K:src},w:width}","%":"HTMLIFrameElement"},
jL:{"^":"p;v:height},K:src},w:width}","%":"HTMLImageElement"},
jN:{"^":"p;bG:checked=,v:height},K:src},H:value=,w:width}",$isB:1,$isf:1,$isI:1,"%":"HTMLInputElement"},
jQ:{"^":"p;H:value=","%":"HTMLLIElement"},
fe:{"^":"p;Y:error=,K:src}","%":"HTMLAudioElement;HTMLMediaElement"},
jT:{"^":"p;bG:checked=","%":"HTMLMenuItemElement"},
jU:{"^":"p;H:value=","%":"HTMLMeterElement"},
aN:{"^":"h0;",
gav:function(a){return H.e(new P.a5(a.clientX,a.clientY),[null])},
$isaN:1,
$isc:1,
"%":"DragEvent|MouseEvent|PointerEvent|WheelEvent"},
k3:{"^":"f;",$isf:1,"%":"Navigator"},
be:{"^":"ax;a",
V:function(a,b){var z,y,x,w
z=J.j(b)
if(!!z.$isbe){z=b.a
y=this.a
if(z!==y)for(x=z.childNodes.length,w=0;w<x;++w)y.appendChild(z.firstChild)
return}for(z=z.gn(b),y=this.a;z.k();)y.appendChild(z.gl())},
t:function(a,b,c){var z,y
z=this.a
y=z.childNodes
if(b>>>0!==b||b>=y.length)return H.h(y,b)
z.replaceChild(c,y[b])},
gn:function(a){return C.p.gn(this.a.childNodes)},
gi:function(a){return this.a.childNodes.length},
si:function(a,b){throw H.b(new P.t("Cannot set length on immutable List."))},
h:function(a,b){var z=this.a.childNodes
if(b>>>0!==b||b>=z.length)return H.h(z,b)
return z[b]},
$asax:function(){return[W.w]},
$asi:function(){return[W.w]}},
w:{"^":"I;",
dm:function(a){var z=a.parentNode
if(z!=null)z.removeChild(a)},
du:function(a,b){var z,y
try{z=a.parentNode
J.dZ(z,b,a)}catch(y){H.G(y)}return a},
j:function(a){var z=a.nodeValue
return z==null?this.cj(a):z},
cV:function(a,b){return a.appendChild(b)},
bH:function(a,b){return a.cloneNode(!0)},
B:function(a,b){return a.contains(b)},
cN:function(a,b,c){return a.replaceChild(b,c)},
$isw:1,
$isc:1,
"%":"Attr|Document|HTMLDocument|XMLDocument;Node"},
ff:{"^":"eP;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.b(P.au(b,a,null,null,null))
return a[b]},
t:function(a,b,c){throw H.b(new P.t("Cannot assign element of immutable List."))},
si:function(a,b){throw H.b(new P.t("Cannot resize immutable List."))},
A:function(a,b){if(b>>>0!==b||b>=a.length)return H.h(a,b)
return a[b]},
$isi:1,
$asi:function(){return[W.w]},
$isk:1,
$isa2:1,
$asa2:function(){return[W.w]},
$isP:1,
$asP:function(){return[W.w]},
"%":"NodeList|RadioNodeList"},
eN:{"^":"f+af;",$isi:1,
$asi:function(){return[W.w]},
$isk:1},
eP:{"^":"eN+cn;",$isi:1,
$asi:function(){return[W.w]},
$isk:1},
k5:{"^":"p;v:height},w:width}","%":"HTMLObjectElement"},
k6:{"^":"p;H:value=","%":"HTMLOptionElement"},
k7:{"^":"p;H:value=","%":"HTMLOutputElement"},
k8:{"^":"p;H:value=","%":"HTMLParamElement"},
ka:{"^":"em;R:target=","%":"ProcessingInstruction"},
kb:{"^":"p;H:value=","%":"HTMLProgressElement"},
kd:{"^":"p;K:src}","%":"HTMLScriptElement"},
kf:{"^":"p;i:length=,H:value=","%":"HTMLSelectElement"},
kg:{"^":"ev;a7:innerHTML=",
bH:function(a,b){return a.cloneNode(!0)},
"%":"ShadowRoot"},
kh:{"^":"p;K:src}","%":"HTMLSourceElement"},
ki:{"^":"as;Y:error=","%":"SpeechRecognitionError"},
kl:{"^":"p;H:value=","%":"HTMLTextAreaElement"},
kn:{"^":"p;K:src}","%":"HTMLTrackElement"},
h0:{"^":"as;","%":"CompositionEvent|FocusEvent|KeyboardEvent|SVGZoomEvent|TextEvent|TouchEvent;UIEvent"},
kp:{"^":"fe;v:height},w:width}","%":"HTMLVideoElement"},
h3:{"^":"I;",
gaU:function(a){var z=H.e(new P.hV(H.e(new P.T(0,$.l,null),[P.M])),[P.M])
this.cC(a)
this.cO(a,W.K(new W.h4(z)))
return z.a},
cO:function(a,b){return a.requestAnimationFrame(H.a8(b,1))},
cC:function(a){if(!!(a.requestAnimationFrame&&a.cancelAnimationFrame))return;(function(b){var z=['ms','moz','webkit','o']
for(var y=0;y<z.length&&!b.requestAnimationFrame;++y){b.requestAnimationFrame=b[z[y]+'RequestAnimationFrame']
b.cancelAnimationFrame=b[z[y]+'CancelAnimationFrame']||b[z[y]+'CancelRequestAnimationFrame']}if(b.requestAnimationFrame&&b.cancelAnimationFrame)return
b.requestAnimationFrame=function(c){return window.setTimeout(function(){c(Date.now())},16)}
b.cancelAnimationFrame=function(c){clearTimeout(c)}})(a)},
$isf:1,
$isI:1,
"%":"DOMWindow|Window"},
h4:{"^":"d:0;a",
$1:function(a){var z=this.a.a
if(z.a!==0)H.r(new P.bb("Future already completed"))
z.I(a)}},
kv:{"^":"f;aW:bottom=,v:height=,ai:left=,b7:right=,al:top=,w:width=",
j:function(a){return"Rectangle ("+H.a(a.left)+", "+H.a(a.top)+") "+H.a(a.width)+" x "+H.a(a.height)},
q:function(a,b){var z,y,x
if(b==null)return!1
z=J.j(b)
if(!z.$isX)return!1
y=a.left
x=z.gai(b)
if(y==null?x==null:y===x){y=a.top
x=z.gal(b)
if(y==null?x==null:y===x){y=a.width
x=z.gw(b)
if(y==null?x==null:y===x){y=a.height
z=z.gv(b)
z=y==null?z==null:y===z}else z=!1}else z=!1}else z=!1
return z},
gu:function(a){var z,y,x,w
z=J.H(a.left)
y=J.H(a.top)
x=J.H(a.width)
w=J.H(a.height)
return W.db(W.a7(W.a7(W.a7(W.a7(0,z),y),x),w))},
$isX:1,
$asX:I.a9,
"%":"ClientRect"},
kw:{"^":"w;",$isf:1,"%":"DocumentType"},
kx:{"^":"ew;",
gv:function(a){return a.height},
gw:function(a){return a.width},
"%":"DOMRect"},
kz:{"^":"p;",$isI:1,$isf:1,"%":"HTMLFrameSetElement"},
b3:{"^":"c;a"},
hm:{"^":"Q;",
P:function(a,b,c,d){var z=new W.S(0,this.a,this.b,W.K(a),!1)
z.$builtinTypeInfo=this.$builtinTypeInfo
z.D()
return z},
bN:function(a,b,c){return this.P(a,null,b,c)}},
Z:{"^":"hm;a,b,c"},
S:{"^":"fx;a,b,c,d,e",
a2:function(){if(this.b==null)return
this.bB()
this.b=null
this.d=null
return},
b4:function(a,b){if(this.b==null)return;++this.a
this.bB()},
bR:function(a){return this.b4(a,null)},
bT:function(){if(this.b==null||this.a<=0)return;--this.a
this.D()},
D:function(){var z,y,x
z=this.d
y=z!=null
if(y&&this.a<=0){x=this.b
x.toString
if(y)J.dX(x,this.c,z,!1)}},
bB:function(){var z,y,x
z=this.d
y=z!=null
if(y){x=this.b
x.toString
if(y)J.dY(x,this.c,z,!1)}}},
cn:{"^":"c;",
gn:function(a){return new W.eI(a,this.gi(a),-1,null)},
V:function(a,b){throw H.b(new P.t("Cannot add to immutable List."))},
$isi:1,
$asi:null,
$isk:1},
eI:{"^":"c;a,b,c,d",
k:function(){var z,y
z=this.c+1
y=this.b
if(z<y){this.d=J.c5(this.a,z)
this.c=z
return!0}this.d=null
this.c=y
return!1},
gl:function(){return this.d}},
hf:{"^":"c;a",$isI:1,$isf:1,m:{
hg:function(a){if(a===window)return a
else return new W.hf(a)}}}}],["","",,P,{"^":"",cj:{"^":"ax;a,b",
gU:function(){var z=this.b
z=z.dC(z,new P.eF())
return H.aM(z,new P.eG(),H.v(z,"u",0),null)},
p:function(a,b){C.a.p(P.W(this.gU(),!1,W.B),b)},
t:function(a,b,c){var z=this.gU()
J.ec(z.b.$1(J.aY(z.a,b)),c)},
si:function(a,b){var z=J.V(this.gU().a)
if(b>=z)return
else if(b<0)throw H.b(P.aq("Invalid list length"))
this.dr(0,b,z)},
V:function(a,b){var z,y
for(z=J.N(b),y=this.b.a;z.k();)y.appendChild(z.gl())},
B:function(a,b){return!1},
dr:function(a,b,c){var z=this.gU()
z=H.fu(z,b,H.v(z,"u",0))
C.a.p(P.W(H.fQ(z,c-b,H.v(z,"u",0)),!0,null),new P.eH())},
gi:function(a){return J.V(this.gU().a)},
h:function(a,b){var z=this.gU()
return z.b.$1(J.aY(z.a,b))},
gn:function(a){var z=P.W(this.gU(),!1,W.B)
return new J.bs(z,z.length,0,null)},
$asax:function(){return[W.B]},
$asi:function(){return[W.B]}},eF:{"^":"d:0;",
$1:function(a){return!!J.j(a).$isB}},eG:{"^":"d:0;",
$1:function(a){return H.iE(a,"$isB")}},eH:{"^":"d:0;",
$1:function(a){return J.b_(a)}}}],["","",,P,{"^":""}],["","",,P,{"^":"",
az:function(a,b){a=536870911&a+b
a=536870911&a+((524287&a)<<10>>>0)
return a^a>>>6},
dc:function(a){a=536870911&a+((67108863&a)<<3>>>0)
a^=a>>>11
return 536870911&a+((16383&a)<<15>>>0)},
dH:function(a,b){var z
if(typeof a!=="number")throw H.b(P.aq(a))
if(typeof b!=="number")throw H.b(P.aq(b))
if(a>b)return a
if(a<b)return b
if(typeof b==="number"){if(typeof a==="number")if(a===0)return a+b
if(isNaN(b))return b
return a}if(b===0)z=a===0?1/a<0:a<0
else z=!1
if(z)return b
return a},
a5:{"^":"c;c0:a>,c1:b>",
j:function(a){return"Point("+H.a(this.a)+", "+H.a(this.b)+")"},
q:function(a,b){var z,y
if(b==null)return!1
if(!(b instanceof P.a5))return!1
z=this.a
y=b.a
if(z==null?y==null:z===y){z=this.b
y=b.b
y=z==null?y==null:z===y
z=y}else z=!1
return z},
gu:function(a){var z,y
z=J.H(this.a)
y=J.H(this.b)
return P.dc(P.az(P.az(0,z),y))},
C:function(a,b){var z=J.m(b)
z=new P.a5(J.U(this.a,z.gc0(b)),J.U(this.b,z.gc1(b)))
z.$builtinTypeInfo=this.$builtinTypeInfo
return z},
M:function(a,b){var z,y,x,w
z=this.a
y=J.c8(b)
if(typeof z!=="number")return z.M()
if(typeof y!=="number")return H.E(y)
x=this.b
w=b.b
if(typeof x!=="number")return x.M()
if(typeof w!=="number")return H.E(w)
w=new P.a5(z-y,x-w)
w.$builtinTypeInfo=this.$builtinTypeInfo
return w}},
hN:{"^":"c;",
gb7:function(a){var z=this.a
if(typeof z!=="number")return z.C()
return z+this.c},
gaW:function(a){var z=this.b
if(typeof z!=="number")return z.C()
return z+this.d},
j:function(a){return"Rectangle ("+H.a(this.a)+", "+H.a(this.b)+") "+this.c+" x "+this.d},
q:function(a,b){var z,y,x,w
if(b==null)return!1
z=J.j(b)
if(!z.$isX)return!1
y=this.a
x=z.gai(b)
if(y==null?x==null:y===x){x=this.b
w=z.gal(b)
if(x==null?w==null:x===w){if(typeof y!=="number")return y.C()
if(y+this.c===z.gb7(b)){if(typeof x!=="number")return x.C()
z=x+this.d===z.gaW(b)}else z=!1}else z=!1}else z=!1
return z},
gu:function(a){var z,y,x,w
z=this.a
y=J.H(z)
x=this.b
w=J.H(x)
if(typeof z!=="number")return z.C()
if(typeof x!=="number")return x.C()
return P.dc(P.az(P.az(P.az(P.az(0,y),w),z+this.c&0x1FFFFFFF),x+this.d&0x1FFFFFFF))}},
X:{"^":"hN;ai:a>,al:b>,w:c>,v:d>",$asX:null,m:{
fk:function(a,b,c,d,e){var z,y
if(typeof c!=="number")return c.ab()
if(c<0)z=-c*0
else z=c
if(typeof d!=="number")return d.ab()
if(d<0)y=-d*0
else y=d
return H.e(new P.X(a,b,z,y),[e])}}}}],["","",,P,{"^":"",j9:{"^":"at;R:target=",$isf:1,"%":"SVGAElement"},jb:{"^":"n;",$isf:1,"%":"SVGAnimateElement|SVGAnimateMotionElement|SVGAnimateTransformElement|SVGAnimationElement|SVGSetElement"},ji:{"^":"bw;a5:cx=,W:cy=","%":"SVGCircleElement"},jn:{"^":"bw;a5:cx=,W:cy=","%":"SVGEllipseElement"},jq:{"^":"n;",$isf:1,"%":"SVGFEBlendElement"},jr:{"^":"n;",$isf:1,"%":"SVGFEColorMatrixElement"},js:{"^":"n;",$isf:1,"%":"SVGFEComponentTransferElement"},jt:{"^":"n;",$isf:1,"%":"SVGFECompositeElement"},ju:{"^":"n;",$isf:1,"%":"SVGFEConvolveMatrixElement"},jv:{"^":"n;",$isf:1,"%":"SVGFEDiffuseLightingElement"},jw:{"^":"n;",$isf:1,"%":"SVGFEDisplacementMapElement"},jx:{"^":"n;",$isf:1,"%":"SVGFEFloodElement"},jy:{"^":"n;",$isf:1,"%":"SVGFEGaussianBlurElement"},jz:{"^":"n;",$isf:1,"%":"SVGFEImageElement"},jA:{"^":"n;",$isf:1,"%":"SVGFEMergeElement"},jB:{"^":"n;",$isf:1,"%":"SVGFEMorphologyElement"},jC:{"^":"n;",$isf:1,"%":"SVGFEOffsetElement"},jD:{"^":"n;",$isf:1,"%":"SVGFESpecularLightingElement"},jE:{"^":"n;",$isf:1,"%":"SVGFETileElement"},jF:{"^":"n;",$isf:1,"%":"SVGFETurbulenceElement"},jG:{"^":"n;",$isf:1,"%":"SVGFilterElement"},bw:{"^":"at;","%":"SVGLineElement|SVGPathElement|SVGPolylineElement|SVGRectElement;SVGGeometryElement"},at:{"^":"n;",$isf:1,"%":"SVGClipPathElement|SVGDefsElement|SVGForeignObjectElement|SVGGElement|SVGSwitchElement;SVGGraphicsElement"},jM:{"^":"at;",$isf:1,"%":"SVGImageElement"},jR:{"^":"n;",$isf:1,"%":"SVGMarkerElement"},jS:{"^":"n;",$isf:1,"%":"SVGMaskElement"},k9:{"^":"n;",$isf:1,"%":"SVGPatternElement"},bE:{"^":"bw;",$isbE:1,$isB:1,$isw:1,$isc:1,"%":"SVGPolygonElement"},kc:{"^":"hz;a5:cx=,W:cy=","%":"SVGRadialGradientElement"},ke:{"^":"n;",$isf:1,"%":"SVGScriptElement"},n:{"^":"B;",
gau:function(a){return new P.cj(a,new W.be(a))},
ga7:function(a){var z,y,x
z=W.d7("div",null)
y=a.cloneNode(!0)
x=J.m(z)
J.e0(x.gau(z),J.e6(y))
return x.ga7(z)},
gbP:function(a){return H.e(new W.Z(a,"change",!1),[H.q(C.j,0)])},
gb2:function(a){return H.e(new W.Z(a,"click",!1),[H.q(C.k,0)])},
gb3:function(a){return H.e(new W.Z(a,"load",!1),[H.q(C.f,0)])},
gbQ:function(a){return H.e(new W.Z(a,"mousemove",!1),[H.q(C.l,0)])},
$isI:1,
$isf:1,
"%":"SVGComponentTransferFunctionElement|SVGDescElement|SVGDiscardElement|SVGFEDistantLightElement|SVGFEFuncAElement|SVGFEFuncBElement|SVGFEFuncGElement|SVGFEFuncRElement|SVGFEMergeNodeElement|SVGFEPointLightElement|SVGFESpotLightElement|SVGMetadataElement|SVGStopElement|SVGStyleElement|SVGTitleElement;SVGElement"},kj:{"^":"at;",$isf:1,"%":"SVGSVGElement"},kk:{"^":"n;",$isf:1,"%":"SVGSymbolElement"},fS:{"^":"at;","%":"SVGTSpanElement|SVGTextElement|SVGTextPositioningElement;SVGTextContentElement"},km:{"^":"fS;",$isf:1,"%":"SVGTextPathElement"},ko:{"^":"at;",$isf:1,"%":"SVGUseElement"},kq:{"^":"n;",$isf:1,"%":"SVGViewElement"},hz:{"^":"n;",$isf:1,"%":"SVGLinearGradientElement;SVGGradientElement"},kA:{"^":"n;",$isf:1,"%":"SVGCursorElement"},kB:{"^":"n;",$isf:1,"%":"SVGFEDropShadowElement"},kC:{"^":"n;",$isf:1,"%":"SVGMPathElement"}}],["","",,P,{"^":""}],["","",,P,{"^":""}],["","",,P,{"^":""}],["","",,X,{"^":"",
iU:function(a,b){H.e(new H.bd(a,new X.iV(b)),[H.q(a,0)]).p(0,new X.iW())},
dP:function(a,b){var z,y,x,w,v,u,t,s
z=window.innerWidth
y=window.innerHeight
x=document
w=x.createElement("img")
if(z!=null)J.ef(w,z)
if(y!=null)J.ee(w,y)
v=J.ea(b,"2d")
x=J.e7(a)
u=W.ei(['<svg xmlns="http://www.w3.org/2000/svg" width="'+H.a(z)+'"\n     height="'+H.a(y)+'"> '+H.a(x)+"</svg>"],"image/svg+xml;charset=utf-8",null)
t=(self.URL||self.webkitURL).createObjectURL(u)
x=J.m(w)
s=x.gb3(w)
H.e(new W.S(0,s.a,s.b,W.K(new X.j1(w,v)),!1),[H.q(s,0)]).D()
x.sK(w,t);(self.URL||self.webkitURL).revokeObjectURL(H.aO(u))},
dv:function(a){return J.e3(a,"",new X.id())},
ih:function(a){var z,y,x
z=6-a.length
if(z<=0)return a
y=new Array(z)
y.fixed$length=Array
C.a.d4(y,0,z,"0")
P.aa("l   "+z)
x=H.e(new H.b7(y,new X.ii()),[null,null]).aa(0)
C.a.O(x,a)
P.aa("fillHexa \xbb l.toString() "+C.a.b0(x,""))
return C.a.b0(x,"")},
cD:{"^":"c;a",
j:function(a){return C.D.h(0,this.a)}},
bv:{"^":"c;d3:a<,a5:c>,W:d>"},
aG:{"^":"bv;e,a,b,c,d",
b_:function(){var z=J.U(this.d,this.e)
this.d=z
z=""+J.ed(z)+"px"
this.a.setAttribute("cy",z)
this.e*=1.03},
ci:function(a){C.h.gaU(window).ax(new X.eE(this))}},
eE:{"^":"d:16;a",
$1:function(a){return this.a.b_()}},
iV:{"^":"d:0;a",
$1:function(a){var z,y
z=P.dH(H.b8(J.b0(J.e9(a,"y2"),"px",""),null),H.b8(J.b0(a.getAttribute("y1"),"px",""),null))
y=this.a
if(typeof y!=="number")return H.E(y)
return z>=y}},
iW:{"^":"d:0;",
$1:function(a){return J.b_(a)}},
j1:{"^":"d:0;a,b",
$1:function(a){return J.e2(this.b,this.a,0,0)}},
id:{"^":"d:17;",
$2:function(a,b){var z=J.m(b)
return J.U(a,H.a(J.a_(z.ga5(b)))+","+H.a(J.a_(z.gW(b)))+" ")}},
ii:{"^":"d:0;",
$1:function(a){return a}}}],["","",,F,{"^":"",
kH:[function(){var z,y,x
z=document.querySelector("canvas")
z.setAttribute("width",H.a(window.innerWidth)+"px")
z.setAttribute("height",H.a(window.innerHeight)+"px")
$.bV=z
z=document.querySelector("svg")
z.setAttribute("width",H.a(window.innerWidth)+"px")
z.setAttribute("height",H.a(window.innerHeight)+"px")
$.ab=z
z=document.querySelector("body")
y=J.m(z)
x=y.gbQ(z)
H.e(new W.S(0,x.a,x.b,W.K(F.iP()),!1),[H.q(x,0)]).D()
z=y.gb2(z)
H.e(new W.S(0,z.a,z.b,W.K(F.iN()),!1),[H.q(z,0)]).D()
z=window.innerHeight
$.cm=z
if(typeof z!=="number")return z.M()
$.bU=z-30
$.dE=z-100
F.iv()
C.h.gaU(window).ax(F.dF())},"$0","dG",0,0,2],
iv:function(){var z,y,x,w
$.dI=document.querySelector("#menu")
$.dp=document.querySelector("#bt-close")
$.bT=document.querySelector("#bt-open")
z=document.querySelector("#chk-capture")
$.du=z
z=J.aZ(z)
H.e(new W.S(0,z.a,z.b,W.K(new F.iw()),!1),[H.q(z,0)]).D()
y=document.querySelector("#sld-r")
z=J.aZ(y)
H.e(new W.S(0,z.a,z.b,W.K(new F.ix(y)),!1),[H.q(z,0)]).D()
x=document.querySelector("#sld-g")
z=J.aZ(x)
H.e(new W.S(0,z.a,z.b,W.K(new F.iy(x)),!1),[H.q(z,0)]).D()
w=document.querySelector("#sld-b")
z=J.aZ(w)
H.e(new W.S(0,z.a,z.b,W.K(new F.iz(w)),!1),[H.q(z,0)]).D()
z=J.c7($.dp)
H.e(new W.S(0,z.a,z.b,W.K(new F.iA()),!1),[H.q(z,0)]).D()
z=J.c7($.bT)
H.e(new W.S(0,z.a,z.b,W.K(new F.iB()),!1),[H.q(z,0)]).D()},
dT:function(){var z,y,x
z=$.dI.style
y=$.dB
x=y?"none":"flex"
z.display=x
z=$.bT.style
x=y?"block":"none"
z.display=x
$.dB=!y},
kI:[function(a){var z=J.m(a)
if(J.A(z.gR(a),$.ab)||C.p.B($.ab.childNodes,z.gR(a)))X.dP($.ab,$.bV)},"$1","iN",2,0,3],
kJ:[function(a){X.dP($.ab,$.bV)},"$1","iO",2,0,19],
kK:[function(a){var z,y,x,w,v,u,t,s,r,q,p,o
z=J.m(a)
y=J.c8(z.gav(a))
z=J.e8(z.gav(a))
x=$.$get$an()
w=x.length
if(w===0)v=64
else{u=w-1
if(u<0)return H.h(x,u)
u=J.e_(J.dW(x[u].c,y))
if(typeof u!=="number")return u.dD()
v=P.dH(32-u/2,1)}if(typeof z!=="number")return z.M()
t=F.dk(H.e(new P.a5(y,z-v),[null]),C.q)
s=F.dk(H.e(new P.a5(y,z+v),[null]),C.e)
z=$.$get$an()
y=z.length
if(y>1&&$.$get$ao().length>1){x=y-2
if(x<0)return H.h(z,x)
r=z[x]
x=$.$get$ao()
z=x.length
y=z-2
if(y<0)return H.h(x,y)
q=x[y]
p=X.dv([r,t,s,q])
$.$get$dK().push(p)
y=document
o=y.createElementNS("http://www.w3.org/2000/svg","polygon")
o.setAttribute("stroke","#333333")
o.setAttribute("fill","#00ff00")
o.setAttribute("points",p)
$.$get$aE().t(0,[r,t,s,q],o)
$.ab.appendChild(o)}},"$1","iP",2,0,3],
dk:function(a,b){var z,y,x,w,v,u
z=document
y=z.createElementNS("http://www.w3.org/2000/svg","circle")
y.setAttribute("r","1px")
y.setAttribute("cx",H.a(J.a_(a.a))+"px")
y.setAttribute("cy",H.a(J.a_(a.b))+"px")
y.setAttribute("fill","#1A1A1A")
y.setAttribute("fill-opacity","0.2")
x=new X.aG(2,null,null,0,0)
z=document
x.a=z.createElementNS("http://www.w3.org/2000/svg","circle")
x.a=y
x.c=H.b8(J.b0(y.getAttribute("cx"),"px",""),null)
x.d=H.b8(J.b0(y.getAttribute("cy"),"px",""),null)
$.ab.appendChild(y)
x.ci(0)
w=b===C.e?$.$get$ao():$.$get$an()
w.push(x)
z=w.length
if(z>1){z=w[z-1]
z=H.e(new P.a5(z.a.getAttribute("cx"),z.a.getAttribute("cy")),[null])
v=H.e(new P.a5(x.a.getAttribute("cx"),x.a.getAttribute("cy")),[null])
u=document
y=u.createElementNS("http://www.w3.org/2000/svg","line")
y.setAttribute("stroke","#FF0")
y.setAttribute("stroke-width",C.b.j(1))
y.setAttribute("x1",H.a(z.a))
y.setAttribute("x2",H.a(v.a))
y.setAttribute("y1",H.a(z.b))
y.setAttribute("y2",H.a(v.b))
y.setAttribute("stroke","#1A1A1A")
$.$get$c1().push(y)
$.ab.appendChild(y)
$.$get$bk().t(0,x,y)}return x},
kF:[function(a){C.a.p(F.bX($.$get$an()),new F.ie())
C.a.p(F.bX($.$get$ao()),new F.ig())
P.aa(""+$.$get$an().length+" "+$.$get$ao().length)
X.iU($.$get$c1(),$.dE)
F.dy($.$get$an(),C.q)
F.dy($.$get$ao(),C.e)
F.j6()
C.h.gaU(window).ax(F.dF())},"$1","dF",2,0,20],
dy:function(a,b){var z,y
z=[]
y=H.e(new H.bd(a,new F.il()),[H.q(a,0)])
C.a.p(P.W(y,!0,H.v(y,"u",0)),new F.im(b,z))
C.a.p(z,new F.io())
F.j4(F.bX(a))},
j4:function(a){C.a.p(a,new F.j5(a))},
bX:function(a){var z=a.length
if(z!==0){if(0>=z)return H.h(a,0)
P.aa("filterPoints  c.cy "+H.a(a[0].d))}z=H.e(new H.bd(a,new F.ij()),[H.q(a,0)])
return P.W(z,!0,H.v(z,"u",0))},
j6:function(){var z,y
z={}
z.a=0
y=$.$get$aE()
y=y.gi(y)
z.b=0
$.$get$aE().p(0,new F.j7(z,1/y/3))},
iw:{"^":"d:0;",
$1:function(a){if(J.e5($.du)===!0)$.dR=P.fZ(P.ex(0,0,0,999,0,0),F.iO())
else $.dR.a2()}},
ix:{"^":"d:0;a",
$1:function(a){var z=H.bH(J.br(this.a),null,null)
$.dt=z
return z}},
iy:{"^":"d:0;a",
$1:function(a){var z=H.bH(J.br(this.a),null,null)
$.ds=z
return z}},
iz:{"^":"d:0;a",
$1:function(a){var z=H.bH(J.br(this.a),null,null)
$.dr=z
return z}},
iA:{"^":"d:3;",
$1:function(a){return F.dT()}},
iB:{"^":"d:3;",
$1:function(a){return F.dT()}},
ie:{"^":"d:0;",
$1:function(a){return a.b_()}},
ig:{"^":"d:0;",
$1:function(a){return a.b_()}},
il:{"^":"d:0;",
$1:function(a){return J.dU(J.bq(a),$.bU)}},
im:{"^":"d:0;a,b",
$1:function(a){J.b_(a.gd3())
if(this.a===C.e)$.$get$aE().p(0,new F.ik(this.b,a))}},
ik:{"^":"d:7;a,b",
$2:function(a,b){if(J.c6(a,this.b)===!0){J.b_(b)
this.a.push(a)}}},
io:{"^":"d:0;",
$1:function(a){return $.$get$aE().a9(0,a)}},
j5:{"^":"d:18;a",
$1:function(a){var z,y,x
if($.$get$bk().h(0,a)!=null&&J.dV(J.bq(a),0)){z=this.a
if(C.a.bL(z,a)>0){y=C.a.bL(z,a)-1
if(y<0||y>=z.length)return H.h(z,y)
x=z[y]
y=$.$get$bk().h(0,a)
z=J.m(x)
y.setAttribute("x1",H.a(J.a_(z.ga5(x)))+"px")
y.setAttribute("y1",H.a(J.a_(z.gW(x))-1)+"px")
z=J.m(a)
y.setAttribute("x2",H.a(J.a_(z.ga5(a)))+"px")
y.setAttribute("y2",H.a(J.a_(z.gW(a))+2)+"px")}}}},
ij:{"^":"d:0;",
$1:function(a){return J.c4(J.bq(a),$.bU)}},
j7:{"^":"d:7;a,b",
$2:function(a,b){var z,y,x,w,v,u,t
z=this.a
z.a=z.a+this.b
J.eg(b,"points",X.dv(a))
y=z.b
x=$.dt
if(typeof x!=="number")return H.E(x)
w=(y>>>16&255)+x
if(w>255)w=255
x=$.ds
if(typeof x!=="number")return H.E(x)
v=(y>>>8&255)+x
if(v>255)v=255
x=$.dr
if(typeof x!=="number")return H.E(x)
u=(y&255)+x
if(u>255)u=255
t=(w<<16|v<<8|u)>>>0
z.b=t
P.aa("updatePolygons  fillCol.toRadixString(16) "+C.b.bY(t,16))
b.setAttribute("fill","#"+X.ih(C.b.bY(z.b,16)))}}},1]]
setupProgram(dart,0)
J.j=function(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.cr.prototype
return J.f0.prototype}if(typeof a=="string")return J.aJ.prototype
if(a==null)return J.f1.prototype
if(typeof a=="boolean")return J.f_.prototype
if(a.constructor==Array)return J.aH.prototype
if(typeof a!="object"){if(typeof a=="function")return J.aK.prototype
return a}if(a instanceof P.c)return a
return J.bm(a)}
J.C=function(a){if(typeof a=="string")return J.aJ.prototype
if(a==null)return a
if(a.constructor==Array)return J.aH.prototype
if(typeof a!="object"){if(typeof a=="function")return J.aK.prototype
return a}if(a instanceof P.c)return a
return J.bm(a)}
J.al=function(a){if(a==null)return a
if(a.constructor==Array)return J.aH.prototype
if(typeof a!="object"){if(typeof a=="function")return J.aK.prototype
return a}if(a instanceof P.c)return a
return J.bm(a)}
J.am=function(a){if(typeof a=="number")return J.aI.prototype
if(a==null)return a
if(!(a instanceof P.c))return J.aQ.prototype
return a}
J.ip=function(a){if(typeof a=="number")return J.aI.prototype
if(typeof a=="string")return J.aJ.prototype
if(a==null)return a
if(!(a instanceof P.c))return J.aQ.prototype
return a}
J.bY=function(a){if(typeof a=="string")return J.aJ.prototype
if(a==null)return a
if(!(a instanceof P.c))return J.aQ.prototype
return a}
J.m=function(a){if(a==null)return a
if(typeof a!="object"){if(typeof a=="function")return J.aK.prototype
return a}if(a instanceof P.c)return a
return J.bm(a)}
J.U=function(a,b){if(typeof a=="number"&&typeof b=="number")return a+b
return J.ip(a).C(a,b)}
J.A=function(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.j(a).q(a,b)}
J.dU=function(a,b){if(typeof a=="number"&&typeof b=="number")return a>=b
return J.am(a).az(a,b)}
J.dV=function(a,b){if(typeof a=="number"&&typeof b=="number")return a>b
return J.am(a).an(a,b)}
J.c4=function(a,b){if(typeof a=="number"&&typeof b=="number")return a<b
return J.am(a).ab(a,b)}
J.dW=function(a,b){if(typeof a=="number"&&typeof b=="number")return a-b
return J.am(a).M(a,b)}
J.c5=function(a,b){if(typeof b==="number")if(a.constructor==Array||typeof a=="string"||H.iL(a,a[init.dispatchPropertyName]))if(b>>>0===b&&b<a.length)return a[b]
return J.C(a).h(a,b)}
J.dX=function(a,b,c,d){return J.m(a).ct(a,b,c,d)}
J.dY=function(a,b,c,d){return J.m(a).cM(a,b,c,d)}
J.dZ=function(a,b,c){return J.m(a).cN(a,b,c)}
J.e_=function(a){return J.am(a).bC(a)}
J.e0=function(a,b){return J.al(a).V(a,b)}
J.e1=function(a,b){return J.bY(a).cT(a,b)}
J.c6=function(a,b){return J.C(a).B(a,b)}
J.e2=function(a,b,c,d){return J.m(a).d2(a,b,c,d)}
J.aY=function(a,b){return J.al(a).A(a,b)}
J.e3=function(a,b,c){return J.al(a).a6(a,b,c)}
J.e4=function(a,b){return J.al(a).p(a,b)}
J.e5=function(a){return J.m(a).gbG(a)}
J.e6=function(a){return J.m(a).gau(a)}
J.bq=function(a){return J.m(a).gW(a)}
J.ap=function(a){return J.m(a).gY(a)}
J.H=function(a){return J.j(a).gu(a)}
J.e7=function(a){return J.m(a).ga7(a)}
J.N=function(a){return J.al(a).gn(a)}
J.V=function(a){return J.C(a).gi(a)}
J.aZ=function(a){return J.m(a).gbP(a)}
J.c7=function(a){return J.m(a).gb2(a)}
J.br=function(a){return J.m(a).gH(a)}
J.c8=function(a){return J.m(a).gc0(a)}
J.e8=function(a){return J.m(a).gc1(a)}
J.e9=function(a,b){return J.m(a).c3(a,b)}
J.ea=function(a,b){return J.m(a).c4(a,b)}
J.eb=function(a,b){return J.al(a).a8(a,b)}
J.b_=function(a){return J.al(a).dm(a)}
J.b0=function(a,b,c){return J.bY(a).ds(a,b,c)}
J.ec=function(a,b){return J.m(a).du(a,b)}
J.ed=function(a){return J.am(a).dv(a)}
J.a_=function(a){return J.am(a).dw(a)}
J.ee=function(a,b){return J.m(a).sv(a,b)}
J.ef=function(a,b){return J.m(a).sw(a,b)}
J.eg=function(a,b,c){return J.m(a).ce(a,b,c)}
J.eh=function(a,b,c){return J.bY(a).aB(a,b,c)}
J.ac=function(a){return J.j(a).j(a)}
var $=I.p
C.v=J.f.prototype
C.a=J.aH.prototype
C.b=J.cr.prototype
C.m=J.aI.prototype
C.d=J.aJ.prototype
C.C=J.aK.prototype
C.p=W.ff.prototype
C.E=J.fi.prototype
C.F=J.aQ.prototype
C.h=W.h3.prototype
C.r=new H.cf()
C.t=new P.fh()
C.u=new P.hi()
C.c=new P.hO()
C.i=new P.ae(0)
C.j=H.e(new W.b3("change"),[W.as])
C.k=H.e(new W.b3("click"),[W.aN])
C.f=H.e(new W.b3("load"),[W.as])
C.l=H.e(new W.b3("mousemove"),[W.aN])
C.w=function(hooks) {
  if (typeof dartExperimentalFixupGetTag != "function") return hooks;
  hooks.getTag = dartExperimentalFixupGetTag(hooks.getTag);
}
C.x=function(hooks) {
  var userAgent = typeof navigator == "object" ? navigator.userAgent : "";
  if (userAgent.indexOf("Firefox") == -1) return hooks;
  var getTag = hooks.getTag;
  var quickMap = {
    "BeforeUnloadEvent": "Event",
    "DataTransfer": "Clipboard",
    "GeoGeolocation": "Geolocation",
    "Location": "!Location",
    "WorkerMessageEvent": "MessageEvent",
    "XMLDocument": "!Document"};
  function getTagFirefox(o) {
    var tag = getTag(o);
    return quickMap[tag] || tag;
  }
  hooks.getTag = getTagFirefox;
}
C.n=function getTagFallback(o) {
  var constructor = o.constructor;
  if (typeof constructor == "function") {
    var name = constructor.name;
    if (typeof name == "string" &&
        name.length > 2 &&
        name !== "Object" &&
        name !== "Function.prototype") {
      return name;
    }
  }
  var s = Object.prototype.toString.call(o);
  return s.substring(8, s.length - 1);
}
C.o=function(hooks) { return hooks; }

C.y=function(getTagFallback) {
  return function(hooks) {
    if (typeof navigator != "object") return hooks;
    var ua = navigator.userAgent;
    if (ua.indexOf("DumpRenderTree") >= 0) return hooks;
    if (ua.indexOf("Chrome") >= 0) {
      function confirm(p) {
        return typeof window == "object" && window[p] && window[p].name == p;
      }
      if (confirm("Window") && confirm("HTMLElement")) return hooks;
    }
    hooks.getTag = getTagFallback;
  };
}
C.A=function(hooks) {
  var userAgent = typeof navigator == "object" ? navigator.userAgent : "";
  if (userAgent.indexOf("Trident/") == -1) return hooks;
  var getTag = hooks.getTag;
  var quickMap = {
    "BeforeUnloadEvent": "Event",
    "DataTransfer": "Clipboard",
    "HTMLDDElement": "HTMLElement",
    "HTMLDTElement": "HTMLElement",
    "HTMLPhraseElement": "HTMLElement",
    "Position": "Geoposition"
  };
  function getTagIE(o) {
    var tag = getTag(o);
    var newTag = quickMap[tag];
    if (newTag) return newTag;
    if (tag == "Object") {
      if (window.DataView && (o instanceof window.DataView)) return "DataView";
    }
    return tag;
  }
  function prototypeForTagIE(tag) {
    var constructor = window[tag];
    if (constructor == null) return null;
    return constructor.prototype;
  }
  hooks.getTag = getTagIE;
  hooks.prototypeForTag = prototypeForTagIE;
}
C.z=function() {
  function typeNameInChrome(o) {
    var constructor = o.constructor;
    if (constructor) {
      var name = constructor.name;
      if (name) return name;
    }
    var s = Object.prototype.toString.call(o);
    return s.substring(8, s.length - 1);
  }
  function getUnknownTag(object, tag) {
    if (/^HTML[A-Z].*Element$/.test(tag)) {
      var name = Object.prototype.toString.call(object);
      if (name == "[object Object]") return null;
      return "HTMLElement";
    }
  }
  function getUnknownTagGenericBrowser(object, tag) {
    if (self.HTMLElement && object instanceof HTMLElement) return "HTMLElement";
    return getUnknownTag(object, tag);
  }
  function prototypeForTag(tag) {
    if (typeof window == "undefined") return null;
    if (typeof window[tag] == "undefined") return null;
    var constructor = window[tag];
    if (typeof constructor != "function") return null;
    return constructor.prototype;
  }
  function discriminator(tag) { return null; }
  var isBrowser = typeof navigator == "object";
  return {
    getTag: typeNameInChrome,
    getUnknownTag: isBrowser ? getUnknownTagGenericBrowser : getUnknownTag,
    prototypeForTag: prototypeForTag,
    discriminator: discriminator };
}
C.B=function(hooks) {
  var getTag = hooks.getTag;
  var prototypeForTag = hooks.prototypeForTag;
  function getTagFixed(o) {
    var tag = getTag(o);
    if (tag == "Document") {
      if (!!o.xmlVersion) return "!Document";
      return "!HTMLDocument";
    }
    return tag;
  }
  function prototypeForTagFixed(tag) {
    if (tag == "Document") return null;
    return prototypeForTag(tag);
  }
  hooks.getTag = getTagFixed;
  hooks.prototypeForTag = prototypeForTagFixed;
}
C.D=new H.eJ([0,"Position.Top",1,"Position.Bottom",2,"Position.Left",3,"Position.Right"])
C.q=new X.cD(0)
C.e=new X.cD(1)
$.cG="$cachedFunction"
$.cH="$cachedInvocation"
$.O=0
$.ar=null
$.cb=null
$.c_=null
$.dl=null
$.dL=null
$.bl=null
$.bn=null
$.c0=null
$.ai=null
$.aB=null
$.aC=null
$.bQ=!1
$.l=C.c
$.ci=0
$.bV=null
$.ab=null
$.bU=null
$.dE=null
$.dR=null
$.dI=null
$.dp=null
$.bT=null
$.du=null
$.dt=0
$.ds=0
$.dr=0
$.dB=!1
$=null
init.isHunkLoaded=function(a){return!!$dart_deferred_initializers$[a]}
init.deferredInitialized=new Object(null)
init.isHunkInitialized=function(a){return init.deferredInitialized[a]}
init.initializeLoadedHunk=function(a){$dart_deferred_initializers$[a]($globals$,$)
init.deferredInitialized[a]=true}
init.deferredLibraryUris={}
init.deferredLibraryHashes={};(function(a){for(var z=0;z<a.length;){var y=a[z++]
var x=a[z++]
var w=a[z++]
I.$lazy(y,x,w)}})(["ce","$get$ce",function(){return init.getIsolateTag("_$dart_dartClosure")},"co","$get$co",function(){return H.eW()},"cp","$get$cp",function(){if(typeof WeakMap=="function")var z=new WeakMap()
else{z=$.ci
$.ci=z+1
z="expando$key$"+z}return new P.eD(null,z)},"cT","$get$cT",function(){return H.R(H.bc({
toString:function(){return"$receiver$"}}))},"cU","$get$cU",function(){return H.R(H.bc({$method$:null,
toString:function(){return"$receiver$"}}))},"cV","$get$cV",function(){return H.R(H.bc(null))},"cW","$get$cW",function(){return H.R(function(){var $argumentsExpr$='$arguments$'
try{null.$method$($argumentsExpr$)}catch(z){return z.message}}())},"d_","$get$d_",function(){return H.R(H.bc(void 0))},"d0","$get$d0",function(){return H.R(function(){var $argumentsExpr$='$arguments$'
try{(void 0).$method$($argumentsExpr$)}catch(z){return z.message}}())},"cY","$get$cY",function(){return H.R(H.cZ(null))},"cX","$get$cX",function(){return H.R(function(){try{null.$method$}catch(z){return z.message}}())},"d2","$get$d2",function(){return H.R(H.cZ(void 0))},"d1","$get$d1",function(){return H.R(function(){try{(void 0).$method$}catch(z){return z.message}}())},"bL","$get$bL",function(){return P.h5()},"aD","$get$aD",function(){return[]},"cm","$get$cm",function(){return W.j8().innerHeight},"an","$get$an",function(){return[]},"ao","$get$ao",function(){return[]},"c1","$get$c1",function(){return[]},"bk","$get$bk",function(){return P.bz()},"aE","$get$aE",function(){return P.bz()},"dK","$get$dK",function(){return[]}])
I=I.$finishIsolateConstructor(I)
$=new I()
init.metadata=[null]
init.types=[{func:1,args:[,]},{func:1},{func:1,v:true},{func:1,args:[W.aN]},{func:1,v:true,args:[{func:1,v:true}]},{func:1,args:[,,]},{func:1,ret:P.Y,args:[P.o]},{func:1,args:[[P.i,X.bv],P.bE]},{func:1,args:[,P.Y]},{func:1,args:[P.Y]},{func:1,args:[{func:1,v:true}]},{func:1,v:true,args:[,],opt:[P.ag]},{func:1,args:[,],opt:[,]},{func:1,args:[P.bi]},{func:1,args:[,P.ag]},{func:1,v:true,args:[,P.ag]},{func:1,args:[P.M]},{func:1,args:[P.Y,X.aG]},{func:1,args:[X.aG]},{func:1,args:[P.cQ]},{func:1,v:true,args:[P.M]}]
function convertToFastObject(a){function MyClass(){}MyClass.prototype=a
new MyClass()
return a}function convertToSlowObject(a){a.__MAGIC_SLOW_PROPERTY=1
delete a.__MAGIC_SLOW_PROPERTY
return a}A=convertToFastObject(A)
B=convertToFastObject(B)
C=convertToFastObject(C)
D=convertToFastObject(D)
E=convertToFastObject(E)
F=convertToFastObject(F)
G=convertToFastObject(G)
H=convertToFastObject(H)
J=convertToFastObject(J)
K=convertToFastObject(K)
L=convertToFastObject(L)
M=convertToFastObject(M)
N=convertToFastObject(N)
O=convertToFastObject(O)
P=convertToFastObject(P)
Q=convertToFastObject(Q)
R=convertToFastObject(R)
S=convertToFastObject(S)
T=convertToFastObject(T)
U=convertToFastObject(U)
V=convertToFastObject(V)
W=convertToFastObject(W)
X=convertToFastObject(X)
Y=convertToFastObject(Y)
Z=convertToFastObject(Z)
function init(){I.p=Object.create(null)
init.allClasses=map()
init.getTypeFromName=function(a){return init.allClasses[a]}
init.interceptorsByTag=map()
init.leafTags=map()
init.finishedClasses=map()
I.$lazy=function(a,b,c,d,e){if(!init.lazies)init.lazies=Object.create(null)
init.lazies[a]=b
e=e||I.p
var z={}
var y={}
e[a]=z
e[b]=function(){var x=this[a]
try{if(x===z){this[a]=y
try{x=this[a]=c()}finally{if(x===z)this[a]=null}}else if(x===y)H.j2(d||a)
return x}finally{this[b]=function(){return this[a]}}}}
I.$finishIsolateConstructor=function(a){var z=a.p
function Isolate(){var y=Object.keys(z)
for(var x=0;x<y.length;x++){var w=y[x]
this[w]=z[w]}var v=init.lazies
var u=v?Object.keys(v):[]
for(var x=0;x<u.length;x++)this[v[u[x]]]=null
function ForceEfficientMap(){}ForceEfficientMap.prototype=this
new ForceEfficientMap()
for(var x=0;x<u.length;x++){var t=v[u[x]]
this[t]=z[t]}}Isolate.prototype=a.prototype
Isolate.prototype.constructor=Isolate
Isolate.p=z
Isolate.a9=a.a9
return Isolate}}!function(){var z=function(a){var t={}
t[a]=1
return Object.keys(convertToFastObject(t))[0]}
init.getIsolateTag=function(a){return z("___dart_"+a+init.isolateTag)}
var y="___dart_isolate_tags_"
var x=Object[y]||(Object[y]=Object.create(null))
var w="_ZxYxX"
for(var v=0;;v++){var u=z(w+"_"+v+"_")
if(!(u in x)){x[u]=1
init.isolateTag=u
break}}init.dispatchPropertyName=init.getIsolateTag("dispatch_record")}();(function(a){if(typeof document==="undefined"){a(null)
return}if(typeof document.currentScript!='undefined'){a(document.currentScript)
return}var z=document.scripts
function onLoad(b){for(var x=0;x<z.length;++x)z[x].removeEventListener("load",onLoad,false)
a(b.target)}for(var y=0;y<z.length;++y)z[y].addEventListener("load",onLoad,false)})(function(a){init.currentScript=a
if(typeof dartMainRunner==="function")dartMainRunner(function(b){H.dN(F.dG(),b)},[])
else (function(b){H.dN(F.dG(),b)})([])})})()