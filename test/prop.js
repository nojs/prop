
var _=require("no/smoke")
var __eql=_.__eql,__assert=_.__assert,__log=_.__log

var _=require("../prop"),Prop=_.Prop


function test0(){

  var A=Prop.def({
    title:"",
    text:"",
    cc:{
      p:{x:0,y:0},
      s:{x:0,y:0}}})

  var a0=A.new()

  a0.set("title","some title")
  a0.set("text","some text")
  a0.set(["cc","p","x"],10)
  a0.set(["cc","s"],{x:10,y:20})

  var s=a0.ref(["cc","s"])
  s.set()
  
  __log(a0)

  a0.set(
    {text:"some text",
     title:"some title",
     cc:{
       p:{x:120,y:420},
       s:{x:40,y:40}}})

  __log(a0)}


function test1(){

  var A=Prop.def({
    title:"",
    text:"",
    cc:{
      p:{x:0,y:0},
      s:{x:0,y:0}}})

  A.extend(function(self,supr){return {
    set:function(){
      console.log("setting:")
      console.log(arguments)
      return supr.set.apply(self,arguments)}}})

  var a0=A.new()

  a0.set("title","some title")
  a0.set("text","some text")
  a0.set(["cc","p","x"],10)
  a0.set(["cc","s"],{x:10,y:20})
  
  a0.set(
    {text:"some text",
     title:"some title",
     cc:{
       p:{x:120,y:420},
       s:{x:40,y:40}}})

  console.log("================")
  __log(a0)
  

}


function test2(){

  var A=Prop.def({
    title:"",
    text:"",
    cc:{
      p:{x:0,y:0},
      s:{x:0,y:0}}})

  A.extend(function(self,supr){return {
    set:function(){
      console.log("setting:")
      console.log(arguments)
      return supr.set.apply(self,arguments)}}})
  
  A.extend(function(self,supr){return {
    cc:{
      set:function(){
        console.log("setting cc:")
        console.log(arguments)
        return supr.cc.set.apply(self.cc,arguments)}}
  }})

  var a0=A.new()

  a0.set("title","some title")
  a0.set("text","some text")
  a0.set(["cc","p","x"],10)
  a0.set(["cc","s"],{x:10,y:20})
  
  a0.set(
    {text:"some text",
     title:"some title",
     cc:{
       p:{x:120,y:420},
       s:{x:40,y:40}}})

  console.log("================")
  __log(a0.get())
  

}


test2()

