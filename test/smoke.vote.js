
var _=require("../../smoke/index")
var __eql=_.__eql,__assert=_.__assert,__log=_.__log

var _=require("../prop"),Prop=_.Prop



function test0(){

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


  var Tag=Prop.def({
    __descr:{
      name:{
        set:function(k,v){
          return this.name=v}},
      __sum:{
        set:function(k,v){
          return this.__sum=v}}},
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
    _set1_:function(k,v){
      var v0=this._votes[k]||0
      this.set("__sum",this.__sum+v-v0)
      return this._votes[k]=v},
    _setN:function(path,v,i){
      __assert(path.length-i===1)
      return this._set1(path[i],v)},
    _get0:function(){
      var r={}
      for(var id in this._votes){
        r[id]=this._votes[id]}
      r.__sum=this.__sum
      if(this.name!==null){
        r.name=this.name}
      return r},
    _get1:function(k){
      if(k==="__sum"){
        return this.__sum}
      else if(k==="name"){
        return  this.name}
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
        var t=Tag.__new()
        t.set("name",k)
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
          var t=Tag.__new()
          t.set("name",tag)
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

  var wgTags1=Tags.def({
    _set1:function(k,v){
      if(k in this._tags){
        var t=this._tags[k]}
      else{
        var t=wgTag.__new()
        t.set("name",k)
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
          var t=wgTag.__new()
          t.set("name",tag)
          this._tags[tag]=t}
        return t._setN(path,v,i+1)}}})

  var wgTag=Tag.def(function(self,supr){return {
    __descr:{
      name:{
        set:function(k,v){
          //console.log("set",arguments)
          return supr.__descr.name.set.apply(this,arguments)}},
      __sum:{
        set:function(k,v){
          //console.log("set",arguments)
          return supr.__descr.__sum.set.apply(this,arguments)}}}}})

  var wgTags=Tags.def(function(self,supr){return {
    _set1:function(k,v){
      if(k in this._tags){
        var t=this._tags[k]}
      else{
        var t=wgTag.__new()
        t.set("name",k)
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
          var t=wgTag.__new()
          t.set("name",tag)
          this._tags[tag]=t}
        return t._setN(path,v,i+1)}}}})



  var a=[]
  for(var i=0;i<10000;i++){
    var tt0=wgTags.new()

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
    a.push(tt0)
  }
  window.AA=a

  //__log(tt0.get())

  // var t0=wgTag.new()

  // t0.set("name","supertag")
  // t0.set("name1",10)
  // t0.set("name2",10)
  // __log(t0.get())
  

}


function test2(){

  var Tag=Prop.def({
    __descr:{
      name:{
        set:function(k,v){
          return this.name=v}},
      __sum:{
        set:function(k,v){
          return this.__sum=v}}},
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
    _set1_:function(k,v){
      var v0=this._votes[k]||0
      this.set("__sum",this.__sum+v-v0)
      return this._votes[k]=v},
    _setN:function(path,v,i){
      __assert(path.length-i===1)
      return this._set1(path[i],v)},
    _get0:function(){
      var r={}
      for(var id in this._votes){
        r[id]=this._votes[id]}
      r.__sum=this.__sum
      if(this.name!==null){
        r.name=this.name}
      return r},
    _get1:function(k){
      if(k==="__sum"){
        return this.__sum}
      else if(k==="name"){
        return  this.name}
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
        var t=Tag.__new()
        t.set("name",k)
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
          var t=Tag.__new()
          t.set("name",tag)
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

  var wgTag=Tag.def(function(self,supr){return {
    __descr:{
      name:{
        set:function(k,v){
          //console.log("set",arguments)
          return supr.__descr.name.set.apply(this,arguments)}},
      __sum:{
        set:function(k,v){
          //console.log("set",arguments)
          return supr.__descr.__sum.set.apply(this,arguments)}}}}})

  var wgTags=Tags.def(function(self,supr){return {
    _set1:function(k,v){
      if(k in this._tags){
        var t=this._tags[k]}
      else{
        var t=wgTag.__new()
        t.set("name",k)
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
          var t=wgTag.__new()
          t.set("name",tag)
          this._tags[tag]=t}
        return t._setN(path,v,i+1)}}}})

  var Item=Prop.def(function(self,supr){return {
    text:"",
    cc:{
      p:{x:0,y:0},
      s:{x:0,y:0}},
    tags:Tags}})


  Item.extend(function(self,supr){return {
    tags:{
      _setN:function(){
        console.log("setN",arguments)
        return supr.tags._setN.apply(this,arguments)
      }
    }
  }})

  var i0=Item.new()

  var i1=Item.new()

  i0.map(i1)

  i0.set({
    text:"some",
    cc:{
      p:{x:10,y:20},
      s:{x:200,y:120}}})
  //__log(i0.get())

  i0.set(["tags","sometag","uid"],10)
  i0.set(["tags","sometag","uid1"],10)
  i0.set(["tags","sometag","uid2"],-4)
  i0.set(["tags","othertag","uid2"],24)
  i0.set(["tags","othertag","uid22"],10)
  i0.set(["tags","othertag","uid23"],4)
  i0.set(["tags","othertag","uid2k"],-7)
  i0.set("text","some not too long text line")

  __log(i0.get())
  
}


function test3(){



  
  var Tag=Prop.def({
    __descr:{
      name:{
        set:function(k,v){
          return this.name=v}},
      __sum:{
        set:function(k,v){
          return this.__sum=v}}},
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
    _set1_:function(k,v){
      var v0=this._votes[k]||0
      this.set("__sum",this.__sum+v-v0)
      return this._votes[k]=v},
    _setN:function(path,v,i){
      __assert(path.length-i===1)
      return this._set1(path[i],v)},
    _get0:function(){
      var r={}
      for(var id in this._votes){
        r[id]=this._votes[id]}
      r.__sum=this.__sum
      if(this.name!==null){
        r.name=this.name}
      return r},
    _get1:function(k){
      if(k==="__sum"){
        return this.__sum}
      else if(k==="name"){
        return  this.name}
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
        var t=Tag.__new()
        t.set("name",k)
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
          var t=Tag.__new()
          t.set("name",tag)
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

  var wgTag=Tag.def(function(self,supr){return {
    __descr:{
      name:{
        set:function(k,v){
          //console.log("set",arguments)
          return supr.__descr.name.set.apply(this,arguments)}},
      __sum:{
        set:function(k,v){
          //console.log("set",arguments)
          return supr.__descr.__sum.set.apply(this,arguments)}}}}})

  var wgTags=Tags.def(function(self,supr){return {
    _set1:function(k,v){
      if(k in this._tags){
        var t=this._tags[k]}
      else{
        var t=wgTag.__new()
        t.set("name",k)
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
          var t=wgTag.__new()
          t.set("name",tag)
          this._tags[tag]=t}
        return t._setN(path,v,i+1)}}}})

  var Item=Prop.def(function(self,supr){return {
    text:"",
    cc:{
      p:{x:0,y:0},
      s:{x:0,y:0}},
    tags:Tags}})


  var wgItem=Item.def(function(self,supr){return {
    __descr:{
      text:{
        set:function(k,v){
          self._elt.box.set("html",v)}}},
    cc:{
      s:{
        __descr:{
          x:{
            set:function(k,v){
              self._elt.box.style.width=v+"px"}},
          y:{
            set:function(k,v){
              self._elt.box.style.height=v+"px"}}}},
      p:{
        __descr:{
          x:{
            set:function(k,v){
              self._elt.box.style.left=v+"px"}},
          y:{
            set:function(k,v){
              self._elt.box.style.top=v+"px"}}}}},
    _init_elt:function(){
      this._elt={}
      var box
      box=E("div",{class:"item-box"})
      this._elt.box=box},
    _render:function(ct){
      if(!this._elt){
        this._init_elt()}
      ct.adopt(this._elt.box)}}})

  var wgItem1=Item.def(function(self,supr){return {
    __descr:{
      text:{
        set:function(k,v){
          self._elt.box.set("html",v)}}},
    cc:{
      s:{
        __descr:{
          x:{
            set:function(k,v){
              self._elt.box.style.width=v+100+"px"}},
          y:{
            set:function(k,v){
              self._elt.box.style.height=v+100+"px"}}}},
      p:{
        __descr:{
          x:{
            set:function(k,v){
              self._elt.box.style.left=v+100+"px"}},
          y:{
            set:function(k,v){
              self._elt.box.style.top=v+100+"px"}}}}},
    _init_elt:function(){
      this._elt={}
      var box
      box=E("div",{class:"item-box"})
      this._elt.box=box},
    _render:function(ct){
      if(!this._elt){
        this._init_elt()}
      ct.adopt(this._elt.box)}}})



  window.it0=wgItem.new()
  window.it1=wgItem1.new()

  it0.map(it1)
  

}

module.exports={
  run:test3
}

//test2()

