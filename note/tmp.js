var a = "38";
var b = false;
console.log(a+!b);

function Student(name, score) {
    this.name = name;
    this.score = score;
}

var ad = new Student("adrian", 100);
ad.id = "b03901023";
console.log(ad);

// id 會存進來嗎？不會
var by = new Student("byron", 120, "b05901011");
console.log(by);

var a = 3;
var b = a;
a = 5;
console.log(b); // pass by value

var i = { a: 3, b:12 };
var j = i;
j.a = 4;
console.log(i.a); // pass by ref

/// function 就是一種 object

var func = function add(a, b) {return a + b;};
console.log(func(3, "abc"));

// 匿名函數，不用取名，常用！
var func2 = function(t, w) {return t/10 + w;}
console.log(func2(100, 3))

var r = { 
    name:"Ric", 
    score:100,
    report: function() { console.log(this.name + "got" + this.score); } 
    }; 
r.report();
r.isPass = function() { console.log(this.score >= 60? "Yes": "No"); };  
r.isPass();

// 用 map 方式建立
var a = {name: "adrian", score:90};
console.log(a["name"]);
// a[0] 是爛掉的，map 不能用 index 取值

