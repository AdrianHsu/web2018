var globalLists = [];

var global_not_done = 0;
var globalNotDone = document.getElementById("globalnotdone");
var global_done = 0;
var globalDone = document.getElementById("globaldone");

class TodoList {
  constructor(myid, title) {
    this.myDiv = document.getElementById(myid);
    this.myTitle = title;

    this.myList = this.myDiv.getElementsByTagName("LI");
    this.myHeader = this.myDiv.getElementsByClassName("header")[0];
    this.myH2 = this.myDiv.getElementsByTagName("h2")[0];
    this.myAddBtn = this.myDiv.getElementsByClassName("addBtn")[0];

    this.notDoneNum = 0;
    this.doneNum = 0;

    this.initTitle();
    this.initCloseBtn();
    // this.initDeleteItem();
    this.initCheckedItem();
    this.initAddBtn();
    
  }
  
  initTitle(){

    this.myH2.innerHTML = this.myTitle;
    var tmpDiv = this.myDiv;
    var tmpH2 = this.myH2;

    var mod = this.myDiv.getElementsByClassName("modify")[0];
    var p = "";
    mod.addEventListener('click', function(ev){
      p = prompt("Please enter title", tmpH2.innerHTML);
      if(p != "")
        tmpH2.innerHTML = p;
      
    }, false);
  }

  addDeleteBtn() {
    var tmpDiv = this.myDiv;
    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "closeList";
    span.appendChild(txt);
    var obj = this;

    // this.myHeader.appendChild(span);
    this.myHeader.insertBefore(span, this.myHeader.childNodes[1])

    this.myDiv.getElementsByClassName("closeList")[0];
    span.addEventListener('click', function(ev) {
      // console.log("/");
      tmpDiv.style.display = 'none';
      global_not_done -= obj.notDoneNum;
      globalNotDone.innerHTML = "NOT DONE: " + global_not_done;
      console.log(obj.doneNum);
      global_done -= obj.doneNum;
      globalDone.innerHTML = "DONE: " + global_done;
    }, false);

  }

  initCloseBtn() {
    // Create a "close" button and append it to each list item
    var i;
    for (i = 0; i < this.myList.length; i++) {
      var span = document.createElement("SPAN");
      var txt = document.createTextNode("\u00D7");
      span.className = "close";
      span.appendChild(txt);
      this.myList[i].appendChild(span);
    }
  }

  resetNum() {
    var obj = this;
    var close = this.myDiv.getElementsByClassName("close");
    var tmpHeader = this.myHeader;

    global_not_done -= obj.notDoneNum;
    global_done -= obj.doneNum;
    obj.notDoneNum = 0;
    obj.doneNum = 0;

    var i;
    for(i = 0; i < close.length; i++) {
      
      var div = close[i].parentElement;
      if(div.style.display == "none") {
        
        continue;
      } 
      
      if(div.className == "checked") {
        obj.doneNum++;
      } else {
        obj.notDoneNum++;
      } 
    }
    tmpHeader.getElementsByTagName("text")[0].innerHTML = "not yet done: " + obj.notDoneNum;
    global_not_done += obj.notDoneNum;
    globalNotDone.innerHTML = "NOT DONE: " + global_not_done;
    global_done += obj.doneNum;
    globalDone.innerHTML = "DONE: " + global_done;
       
  }

  initDeleteItem() {
    // Click on a close button to hide the current list item
    var close = this.myDiv.getElementsByClassName("close");
    var i;
    var tmpDiv = this.myDiv;

    var obj = this;
    var tmpHeader = this.myHeader;
    
    for (i = 0; i < close.length; i++) {
      
      close[i].addEventListener('click', function(ev) {
        
        var div = this.parentElement;
        div.style.display = "none";

        obj.resetNum();
      }, false);
    }
  }
  initCheckedItem() {
    // Add a "checked" symbol when clicking on a list item
    var list = this.myDiv.querySelector('ul');
    var obj = this;
    var tmpHeader = this.myHeader;

    list.addEventListener('click', function(ev) {
      if (ev.target.tagName === 'LI') {
        var t = ev.target.classList.toggle('checked');
        if(t) {// true
          obj.notDoneNum--;
          global_not_done--;
          tmpHeader.getElementsByTagName("text")[0].innerHTML = "not yet done: " + obj.notDoneNum;
          globalNotDone.innerHTML = "NOT DONE: " + global_not_done;

          obj.doneNum++;
          global_done++;
          globalDone.innerHTML = "DONE: " + global_done;
        } else {
          obj.notDoneNum++;
          global_not_done++;
          tmpHeader.getElementsByTagName("text")[0].innerHTML = "not yet done: " + obj.notDoneNum;
          globalNotDone.innerHTML = "NOT DONE: " + global_not_done;
          
          obj.doneNum--;
          global_done--;
          globalDone.innerHTML = "DONE: " + global_done;
        }
      }
    }, false);
  }


  initAddBtn() {
    var tmpDiv = this.myDiv;
    var tmpHeader = this.myHeader;
    var obj = this;

    this.myAddBtn.addEventListener('click', function(ev) {
      var li = document.createElement("li");
      var inputValue = tmpDiv.getElementsByTagName("INPUT")[0].value;
      var t = document.createTextNode(inputValue);
      li.appendChild(t);
      
      var span = document.createElement("SPAN");
      var txt = document.createTextNode("\u00D7");

      span.className = "close";
      span.appendChild(txt);
      li.appendChild(span);

      if (inputValue === '') {
        alert("You must write something!");
      } else {
        tmpDiv.getElementsByTagName("UL")[0].appendChild(li);
        obj.notDoneNum++;
        global_not_done++;
        tmpHeader.getElementsByTagName("text")[0].innerHTML = "not yet done: " + obj.notDoneNum;
        globalNotDone.innerHTML = "NOT DONE: " + global_not_done;

        
      }
      tmpDiv.getElementsByTagName("INPUT")[0].value = "";

      obj.initDeleteItem();

    }, false);
  }

}
// init
list_total_num = 0;
var model = new TodoList("list_0", "list_title_0");
// model.addDeleteBtn();
document.getElementById("list_0").style.display = 'none'; //this model is not pushed into globalLists

var btn = document.getElementById("createBtn");
btn.addEventListener('click', function(ev) {

  var div = document.getElementById("list_0");
  var listName = document.getElementById("listNameInput").value;
 
  clone = div.cloneNode(true); // true means clone all childNodes and all event handlers
  clone.id = "list_" + (++list_total_num);
  clone.style.display = ''; // to disable 'none'
  document.body.appendChild(clone);
  if(listName == ''){
    globalLists.push(new TodoList(clone.id, "list_title_" + list_total_num));
  } else {
    globalLists.push(new TodoList(clone.id, listName));
  }
  globalLists[globalLists.length - 1].addDeleteBtn();

  document.getElementById("listNameInput").value = "";
}, false);

