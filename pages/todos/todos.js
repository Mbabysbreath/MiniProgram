// pages/todos/todos.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    newList:'',
    todos:[
      // {name:'Learning HTML',complated:false},
      // {name:'Learning WEAPP',complated:true},
      // {name:'JavaScript',complated:false}
    ],
    leftCount:0,
    allCompleted:false
  },
  //2.拿到文本框里的值
//2.1由于小程序的数据绑定是单向的，所以必须给文本注册改变事件
inputChangeHandle:function(e){
  // console.log("文本内容改变")
  // console.log(e.detail)获取对象
  // console.log(e.detail),
  this.setData({
    newList:e.detail.value
  })
  // console.log(e.detail.value)
},
/**
 *1. 用户点击按钮时，执行一段代码
 *
 */
addToHandle:function(){
  //当添加按钮点击事件发生时执行的函数
  // console.log("触发添加按钮")
  // console.log(this.data.newList)
  //判空，直接返回，什么都不做
  if(!this.data.newList) return
  var todoTem=this.data.todos
    todoTem.push({
    name:this.data.newList,
    complated:false
  })
  //必须显示的通过setData来改变数据，这样界面才会变化
  this.setData({
    //3.将这个值添加到列表中
    //将数据添加到任务列表
    todos:todoTem,
    //添加成功后将输入框的内容清空
    newList:'',
    leftCount:this.data.leftCount+1
  })
},
toggleTodoHandle:function(e){
  //切换当前点中的item的完成状态,
  //在wxml文件中给选中的每一项设置一个属性：index,将数组的下标值赋给变量Index
  // console.log(e.currentTarget) 获取事件源对象
  var item=this.data.todos[e.currentTarget.dataset.index]
  item.complated=!item.complated
  //根据当前任务的完成状态决定增加一个或者减少一个
  var leftCount=this.data.leftCount+(item.complated?-1:1)
  this.setData({
   todos:this.data.todos,
   leftCount:leftCount
  })
},
/**
 * 删除任务 
 */
// 需要注意冒泡的问题
removeTodoHandle:function(e){
  var todosTem=this.data.todos
  var index=e.currentTarget.dataset.index
  var item=this.data.todos[index]
  var leftCount=this.data.leftCount+(item.complated?0:-1)
  todosTem.splice(index,1)//可以移除指定数组下标的元素,返回的是一个数组
  this.setData({
    todos:todosTem,
    leftCount:leftCount
  })
},
/**
 * 全部选中任务
 */
toggleAllHandle(){
  //this在这里永远指向的是当前页面对象
  this.data.allCompleted=!this.data.allCompleted
  var todos=this.data.todos
  var that=this
  var leftCount=this.data.allCompleted?0:this.data.todos.length
  todos.forEach(function(item){
    item.complated=that.data.allCompleted
  })
  this.setData({
    todos:todos,
    leftCount:leftCount
  })
},
clearHandle1(){
  var todos=[]
  this.data.todos.forEach(function(item){
      if(!item.complated){
        todos.push(item)
      }
  })
  this.setData({
    todos:todos
  })
},
/**
 * 另一种方式：使用filter替换forEach()
 */
clearHandle2(){
  var todos=this.data.todos.filter(function(item){
    return !item.complated
  })
  this.setData({
    todos:todos
  })
}


})