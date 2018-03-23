var globalLists = [];

class TodoList {
  constructor(myid, title) {
    this.myDiv = document.getElementById(myid);
    this.myTitle = title;

    this.myList = this.myDiv.getElementsByTagName("LI");
    this.myHeader = this.myDiv.getElementsByTagName("h2")[0];
    this.myAddBtn = this.myDiv.getElementsByClassName("addBtn")[0];

    this.initTitle();
    this.initCloseBtn();
    this.initDeleteItem();
    this.initCheckedItem();
    this.initAddBtn();
  }
  
  initTitle(){
    this.myHeader.innerHTML = this.myTitle;
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

  initDeleteItem() {
    // Click on a close button to hide the current list item
    var close = this.myDiv.getElementsByClassName("close");
    var i;
    for (i = 0; i < close.length; i++) {
      close[i].onclick = function() {
        var div = this.parentElement;
        div.style.display = "none";
      }
    }
  }
  initCheckedItem() {
    // Add a "checked" symbol when clicking on a list item
    var list = this.myDiv.querySelector('ul');
    list.addEventListener('click', function(ev) {
      if (ev.target.tagName === 'LI') {
        ev.target.classList.toggle('checked');
      }
    }, false);
  }

  initAddBtn() {
    var tmpDiv = this.myDiv;

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
      }
      tmpDiv.getElementsByTagName("INPUT")[0].value = "";

      var close = tmpDiv.getElementsByClassName("close");
      var i;
      for (i = 0; i < close.length; i++) {
        
        close[i].onclick = function() {
          var div = this.parentElement;
          div.style.display = "none";
        }
      }

    }, false);
  }

}
// init
list_total_num = 1;
globalLists.push(new TodoList("list_1", "list_title_1"));

var btn = document.getElementById("createBtn");
btn.addEventListener('click', function(ev) {

  var div = document.getElementById("list_1");
  var listName = document.getElementById("listNameInput").value;

  clone = div.cloneNode(true); // true means clone all childNodes and all event handlers
  clone.id = "list_" + (++list_total_num);
  document.body.appendChild(clone);
  if(listName == ''){
    globalLists.push(new TodoList(clone.id, "list_title_" + list_total_num));
  } else {
    globalLists.push(new TodoList(clone.id, listName));
  }
  document.getElementById("listNameInput").value = "";
}, false);

