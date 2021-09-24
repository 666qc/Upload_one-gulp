// function fn(){
//     let sum = 0;
//     for(let i = 0; i < arguments.length; i++){
//         sum += arguments[i];
//     }
//     // 返回 sum
//     return sum
//  }
//  let allSum = fn(1, 2, 3, 4);
//  console.log(allSum)    // 得到10

//  function fn() {
//     // 此为局部变量
//     let a = 5;
//     console.log(a)
// }
// fn();
// console.log(a) // 此处报错，无法访问

// (function (){
//     //由于没有执行该匿名函数，所以不会执行匿名函数体内的语句。
//     console.log("666");
// })

// (function (){
//     console.log("666"); // 此处会打印666
// })()

// // 页面加载完触发
// window.onload = function(){
//     let test = document.getElementById("test");   
//     test.addEventListener("click",myfun2);   
//     test.addEventListener("click",myfun1);
// }
// function myfun1(){  
//     alert("你好1");
// }
// function myfun2(){ 
//     alert("你好2");
// }

// // 对象定义
// let person = {
//     firstName:"ouyang",
//     lastName:"xiu",
//     age:18
// };

// // 循环对象
// for(let key in person){
// 	console.log(key);	// 键名
// 	console.log(person[key])	// 键值
// // }

// let obj = {};
// let obj2 = Object.create(null);
// console.log(obj);
// console.log(obj2)

// // 创建构造函数
// function Person(name, age) {
//     this.age = age;
//     this.name= name;
//     this.fn = function(){
//         console.log(this.name)
//     }
// }

// // 创建实例
// let person1 = new Person("小明", 18);
// let person2 = new Person("小红", 20);
// person1.fn(); // 继承父级的方法
// person2.fn();
// console.log(person1)
// console.log(person2)

// function Person(name, age, sex) {
//     // sex为新属性
//     this.sex = sex;
//     this.age = age;
//     this.name= name;
//     this.fn = function(){
//         console.log(this.name)
//     }
//  }

//  function Person(name, age, sex) {
//     // sex为新属性
//     this.sex = sex;
//     this.age = age;
//     this.name= name;
//     this.fn = function(){
//         console.log(this.name)
//     }
// }
Person.prototype.newVal = "我是新添加在原型上的值";
let person1 = new Person("小明", 18);

console.log(person1)


function Person(name) {
    this.name = name
    this.sayName= function () {
        console.log(`我是 ${this.name}!`)
    }
}


function myNew(that, ...args) {
    const obj = Object.create(null)
    obj.__proto__ = that.prototype
    const res = that.call(obj, ...args)
    return res instanceof Object ? res : obj
}
let person= myNew(Person, '小明')
person.sayWorld(); // 我是小明


//apply()
let obj = {
    name : "小明",
    func1: function () {
        console.log(this.name)
    },
    func2: function () {
        setTimeout(  function () {
            this.func1()
        }.apply(name),1000);
    }
};
obj.func2()            // 小明
    
//call()
let obj2 = {
    name : "小红",
    func1: function () {
        console.log(this.name)
    },
    func2: function () {
        setTimeout(  function () {
            this.func1()
        }.call(name),1000);
    }
};
obj2.func2()            // 小红

//bind()
let obj3 = {
    name : "小猪",
    func1: function () {
        console.log(this.name)
    },
    func2: function () {
        setTimeout(  function () {
            this.func1()
        }.bind(name)(),1000);
    }
};
obj3.func2()            // 小猪

// 防抖节流
let telInput = document.querySelector('input');
telInput.addEventListener('input', function(e) {
        //如果直接每次发请求，会导致性能问题
        //数据请求
        let timeOut = null;
        if(timeOut){
			clearTimeout(timeOut)
		}else{
			timeOut = setTimeout(()=>{
			  $.ajax({})
			  },2000)
	    }
})

//节流
let throttle = function(func, delay) {            
    　　let prev = Date.now();            
    　　return function() {                
    　　　　var context = this;                
    　　　　var args = arguments;                
    　　　　var now = Date.now();                
    　　　　if (now - prev >= delay) {                    
    　　　　　　func.apply(context, args);                    
    　　　　　　prev = Date.now();                
    　　　　}            
    　　}        
    }        
    function demo() {            
    　　//do something
        //ajax({})
        //...      
    }        
    box.addEventListener('touchmove', throttle(demo, 2000));
    
    // 获得页面url参数的值
    function getQueryString(name) { 
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
        var r = window.location.search.substr(1).match(reg); 
        if (r != null) return unescape(r[2]); 
        return null; 
      } 
      