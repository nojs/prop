
var _=require("../smoke/index"),__assert=_.__assert
var __log=_.__log


function __kind(o){
  var to=typeof o
  if(to==="object"){
    if(o===null){
      return "atom"}
    else if(typeof o.length==="number"){
      return "list"}
    else{
      return "dict"}}
  else{
    return "atom"}}


function MAP(a,f,o){
  var r=[]
  for(var i=0,l=a.length;i<l;i++){
    r.push(f.call(o,a[i],i))}
  return r}


var _Prop={
  _ref:function(k){
    if(!(k in this && __kind(this[k])==="dict"
         && typeof this[k].set==="function")){
      return undefined}
    __assert(k in this && __kind(this[k])==="dict"
             && typeof this[k].set==="function")
    return this[k]},
  _set_child:function(args,prefix){
    //console.log(JSON.stringify(arguments))
    return _set.apply(this,args)
    function _set(path,v,i){
      var tp=typeof path
      if(arguments.length===1){
        return this._map(null,[prefix,arguments[0],0])}
      else{
        if(tp==="object"){
          i=i||0
          if(path===null||path.length-i===0){
            return this._map(null,[prefix,v,0])}
          else if(path.length-i===1){
            return this._map(null,[prefix.concat([path[i]]),v,0])
            return this._set1(path[i],v)}
          else if(1<path.length-i){
            return this._map(null,[prefix.concat(path.slice(i)),v,0])
            return this._setN(path,v,i)}
          else{
            return undefined
            console.log(arguments)
            throw "bad path match"}}
        else if(tp==="string"){
          return this._map(null,[prefix.concat([path]),v,0])
          return this._set1(path,v)}}}},
  _set_map:function(map,args){
    if(this.__prefix){
      var p=this.__prefix.slice()}
    var r=this._set.apply(this,args)
    if(this.__root){
      this.__root._set_child(args,p)}
    else{
      this.__maps && this._map(map,args)}
    return r},
  _map:function(map,args){
    for(var mid in this.__maps){
      if(map!==this.__maps[mid]){
        this.__maps[mid]._set_map(this,args)}}},
  _set:function(path,v,i){
    var tp=typeof path
    if(arguments.length===1){
      return this._set0(arguments[0])}
    else{
      if(tp==="object"){
        i=i||0
        if(path===null||path.length-i===0){
          return this._set0(v)}
        else if(path.length-i===1){
          return this._set1(path[i],v)}
        else if(1<path.length-i){
          return this._setN(path,v,i)}
        else{
          return undefined
          console.log(arguments)
          throw "bad path match"}}
      else if(tp==="string"){
        return this._set1(path,v)}}},
  _set0:function(v){
    var r={}
    for(var k in v){
      r[k]=this._set1(k,v[k])}
    return r},
  _set1_0:function(k,v){
    if(!(k in this)){
      return undefined}
    __assert(k in this)
    if(__kind(this[k]==="dict")
       && typeof this[k].set==="function"){
      return this[k].set(v)}
    else{
      return this[k]=v}},
  _set1_descr:function(k,v){
    if(this.__descr && k in this.__descr
       && typeof this.__descr[k].set==="function"){
      return this.__descr[k].set.call(this,k,v)}},
  _set1_:function(k,v){
    if(__kind(this[k])==="dict"
       && typeof this[k].set==="function"){
        return this[k]._set(v)}
    else if(k in this){
      return this[k]=v}},
  _set1:function(k,v){
    var r=this._set1_descr(k,v)
    if(r!==undefined){
      return r}
    return this._set1_(k,v)},
  _setN:function(path,v,i){
    __assert(1<path.length-i)
    if(path.length-i===2){
      var p=this._ref(path[i])
      if(p){
        return p._set1(path[i+1],v)}
      else{
        return undefined}}
    else if(2<path.length-i){
      var p=this._ref(path[i])
      if(p){
        return p._setN(path,v,i+1)}
      else{
        return undefined}}},
  set:function(path,v,i){
    return this._set_map(null,arguments)},
  //================
  _get0:function(){
    var r={}
    for(var k in this){
      if(!(typeof this[k]==="function"
           || (k[0]==="_"&&k[1]==="_"))){
        r[k]=this._get1(k)}}
    return r},
  _get1:function(k){
    __assert(k in this)
    if(__kind(this[k])==="dict"
       && typeof this[k].get==="function"){
      return this[k].get()}
    else{
      if(!(typeof this[k]==="function"
           || (k[0]==="_"&&k[1]==="_"))){
        return this[k]}}},
  _getN:function(path,i){
    __assert(1<path.length-i)
    if(path.length-i===2){
      var p=this._ref(path[i])
      return p._get1(path[i+1])}
    else if(2<path.length-i){
      var p=this._ref(path[i])
      return p._getN(path,i+1)}},
  get:function(path,i){
    if(arguments.length===0){
      return this._get0()}
    else{
      var tp=typeof path
      if(tp==="object"){
        i=i||0
        if(path===null||path.length-i===0){
          return this._get0()}
        else if(path.length-i===1){
          return this._get1(path[i])}
        else if(1<path.length-i){
          return this._getN(path,i)}
        else{
          console.log(arguments)
          throw "bad path match"}}
      else if(tp==="string"){
        return this._get1(path)}}},
  //================
  map:function(e1){
    if(!this.__maps){
      this.__maps={}}
    if(!e1.__maps){
      e1.__maps={}}
    e1.__maps[this._id]=this
    this.__maps[e1._id]=e1}}


var Prop={
  _defs:[],
  def:function(d){
    var P1=this.clone()
    return P1.extend(d)},
  new:function(){
    var it=this.__new()
    it._id=__uid()
    return it},
  clone:function(){
    var P1={__proto__:this}
    P1._defs=MAP(this._defs,function(d,i){return d})
    return P1},
  extend:function(d){
    this._defs.push(d)
    return this},
  __new:function(inst){
    return __new(inst,this._defs)}}

var uu=[]
var dbg=0

function __new(inst,dd,_supr,_k,_root,_prefix){
  var supr=_Prop
  if(!inst){
    inst={__proto__:_Prop}
    _root=inst
    _prefix=[]}
  MAP(dd,function(d,i){
    if(typeof d==="function"){
      d=d(inst,supr)}
    __assert(__kind(d)==="dict")
    __ext(inst,d)
    supr=d})
  if(_supr){
    __assert(_k && _k in _supr)
    _supr[_k]=supr}
  dbg&&console.log("return:!!!!!!!!!!!!!!!!!")
  dbg&&__log(inst)
  return inst
  //================
  function __ext(i0,e0){
    var id=__uid()
    dbg&&uu.push(id)
    dbg&&console.log(uu,">>>>>>>")
    dbg&&console.log("i0 ===========")
    dbg&&__log(i0)
    dbg&&console.log("e0 ===========")
    dbg&&__log(e0)
    for(var k in e0){
      if(__kind(e0[k])==="dict"){
        dbg&&console.log("enter",k)
        var e0k=e0[k]
        if(k in i0){
          __assert(__kind(i0[k])==="dict")}
        else{
          if(k[0]==="_" && k[1]==="_"){
            if(dbg){
              i0[k]={_id:__uid()}}
            else{
              i0[k]={}}}
          else{
            if(dbg){
              i0[k]={id:__uid(),
                     __proto__:_Prop,
                     __root:_root,
                     __prefix:_prefix.concat([k])}}
            else{
              i0[k]={__proto__:_Prop,
                     __root:_root,
                     __prefix:_prefix.concat([k])}}}}
        if(typeof e0k.__new==="function"){
          __new(i0[k],e0k._defs,e0,k,_root,_prefix.concat([k]))}
        else{
          __ext(i0[k],e0k)}}
      else{
        __assert(__kind(i0[k])!=="dict")}}
    dbg&&console.log(uu)
    dbg&&console.log("---- i0 ===========")
    dbg&&__log(i0)
    dbg&&console.log("---- i0.p ===========")
    dbg&&__log(i0.__proto__)
    dbg&&console.log("---- e0 ===========")
    dbg&&__log(e0)
    e0.__proto__=i0.__proto__
    i0.__proto__=e0
    dbg&&console.log("<<<<<<",uu.pop())}}


function __uid(){
  return (Math.random()*0x100000000).toString(36)}


module.exports={
  __uid:__uid,
  Prop:Prop}



