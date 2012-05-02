
var _=require("no/smoke")
var __eql=_.__eql,__assert=_.__assert,__log=_.__log

var _=require("../prop"),Prop=_.Prop



function test0(){

  var Item={
    text:"",
    cc:{
      p:{x:0,y:0},
      s:{x:0,y:0}}}

  Item.extend({
    __descr:{
      text:{
        set:function(k,v){
          return this.text=v}},
    }
  })
  
  var Vote=Prop.def({
    __sum:0,
    _votes:{},
    _set0:function(v){
      if(v===null){
        this._votes={}
        this.__sum=0}
      else{
        var r={}
        for(var k in v){
          if(k!=="__sum"){
            r[k]=this._set1(k,v[k])}}
        return r}},
    _set1:function(k,v){
      var v0=this._votes[k]||0
      this.__sum+=v-v0
      return this._votes[k]=v},
    _setN:function(path,v,i){
      __assert(path.length-i===1)
      return this._set1(path[i],v)},
    _get0:function(){
      var r={}
      for(var id in this._votes){
        r[id]=this._votes[id]}
      r.__sum=this.__sum
      return r},
    _get1:function(k){
      if(k==="__sum"){
        return this.__sum}
      else{
        if(k in this._votes){
          return this._votes[k]}
        else{
          return 0}}},
    _getN:function(path,i){
      __assert(path.length-i===1)
      return this._get1(path[i])}
  })


  var v0=Vote.new()

  v0.set("uid1",10)
  v0.set("uid2",20)
  v0.set("uid3",30)
  v0.set("uid4",40)
  v0.set("uid5",50)

  v0.set("uid4",-23)

  __log(v0.get())
  
}


function test1(){


  {

    _set:function(){match(arguments){
      [V]:{
        var r={}
        for(var k in V){
          if(k!=="__sum"){
            r[k]=this.set(k,V[k])}}
        return r}
      [Str(K),V]:{
        var v0=this._votes[K]||0
        this.__sum+=V-v0
        return this._votes[K]=V}
      [[Str(K),Tail..],V]:{
        return this._ref(K).set(Tail,V)}}}
  }

  {
    _set:function(){match(arguments){
      [null]:{
        this._votes={}
        this.__sum=0}
      _:{return _next()}}}
  }

  {

    var c={
      title:""
      text:""
      cc:{
        p:{x:0,y:0}
        s:{x:0,y:0}}}

    c.extend(function(self,supr){return {
      cc:{
        _set1:function(k,v){
          this._sum+=v
          return this._vals[k]=v}
        _setN:function(path,v,i){
          
        }
      }
    }})
    

  }
  
  
  
  var Tag=Prop.def({
    __sum:0,
    _votes:{},
    name:null,
    _set0:function(v){
      if(v===null){
        this._votes={}
        this.__sum=0
        return null}
      else{
        var r={}
        for(var k in v){
          if(k!=="__sum"){
            r[k]=this._set1(k,v[k])}}
        return r}},
    _set1:function(k,v){
      var v0=this._votes[k]||0
      this.__sum+=v-v0
      return this._votes[k]=v},
    _setN:function(path,v,i){
      __assert(path.length-i===1)
      return this._set1(path[i],v)},
    _get0:function(){
      var r={}
      for(var id in this._votes){
        r[id]=this._votes[id]}
      r.__sum=this.__sum
      return r},
    _get1:function(k){
      if(k==="__sum"){
        return this.__sum}
      else{
        if(k in this._votes){
          return this._votes[k]}
        else{
          return 0}}},
    _getN:function(path,i){
      __assert(path.length-i===1)
      return this._get1(path[i])}})


  var Tags=Prop.def({
    _tags:{},
    _set0:function(v){
      if(v===null){
        this._tags={}}
      else{
        var r={}
        for(var tn in v){
          r[tn]=this._set1(tn,v[tn])}
        return r}},
    _set1:function(k,v){
      if(k in this._tags){
        var t=this._tags[k]}
      else{
        var t=Vote.__new()
        this._tags[k]=t}
      return t._set0(v)},
    _setN:function(path,v,i){
      if(path.length-i===0){
        return this._set0(v)}
      else if(path.length-i===1){
        return this._set1(path[i],v)}
      else{
        __assert(2<=path.length-i)
        var tag=path[i]
        if(tag in this._tags){
          var t=this._tags[tag]}
        else{
          var t=Vote.__new()
          this._tags[tag]=t}
        return t._setN(path,v,i+1)}},
    _get0:function(){
      var r={}
      for(var tn in this._tags){
        r[tn]=this._tags[tn]._get0()}
      this._id && (r._id=this._id)
      return r},
    _get1:function(k){
      if(k in this._votes){
        return this._votes[k]}
      else{
        return null}},
    _getN:function(path,i){
      if(path.length-i===0){
        return this._get0()}
      else if(path.length-i===1){
        return this._get1(path[i])}
      else{
        __assert(2<=path.length-i)
        var tag=path[i]
        if(tag in this._tags){
          var t=this._tags[tag]
          return t._getN(path,i+1)}
        else{
          throw "no path found"}}}})

  var wgTag=Vote.def({
    _elt:{},
    _elt_init:function(){
      var box,name,ctrl
      box=E("div",{class:"tag-box"})
        .adopt(name=E("div",{class:"tag-name"}))
        .adopt(ctrl=E("div",{class:"controls"}))
      this._elt={
        box:box,
        name:name,
        ctrl:ctrl}},
    _set1:function(k,v){
      if(k==="name"){
        this._elt.name.set("html",v)}
      else if(k==="")
    }
  })

  var wgTag={
    name:{
      set:function(v){}}
    
  }
  
  var wgTags=Tags.def({
    _set0:function(v){
      if(v===null){
        this._tags={}}
      else{
        var r={}
        for(var tn in v){
          r[tn]=this._set1(tn,v[tn])}
        return r}},
    _set1:function(k,v){
      if(k in this._tags){
        var t=this._tags[k]}
      else{
        var t=Vote.__new()
        this._tags[k]=t}
      return t._set0(v)},
    _setN:function(path,v,i){
      if(path.length-i===0){
        return this._set0(v)}
      else if(path.length-i===1){
        return this._set1(path[i],v)}
      else{
        __assert(2<=path.length-i)
        var tag=path[i]
        if(tag in this._tags){
          var t=this._tags[tag]}
        else{
          var t=Vote.__new()
          this._tags[tag]=t}
        return t._setN(path,v,i+1)}}})

  var tt0=Tags.new()

  tt0.set(["tagname","uid1"],10)
  tt0.set(["othertag","uid2"],20)
  tt0.set({
    some:{
      uid1:10,
      uid2:20},
    other:{
      uid4:38,
      uid8:22},
    more:{
      uid89:21,
      uid23:33}})

  __log(tt0.get())

}





test1()

