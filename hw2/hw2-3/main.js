var globalLists = [];

class TodoList {
  constructor(myDiv, title) {
    this.myDiv = myDiv;
    this.myTitle = title;

    this.myList = myDiv.getElementsByTagName("LI");
    this.myHeader = myDiv.getElementsByTagName("h2")[0];
    this.myAddBtn = myDiv.getElementsByClassName("addBtn")[0];

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
    
    this.myAddBtn.addEventListener('click', function(ev) {
      console.log("??");
      // var li = document.createElement("li");
      // var inputValue = myDiv.getElementsByTagName("INPUT").value;
      // var t = document.createTextNode(inputValue);
      // li.appendChild(t);
      // if (inputValue === '') {
      //   alert("You must write something!");
      // } else {
      //   myDiv.getElementsByTagName("UL")[0].appendChild(li);
      // }
      // myDiv.getElementsByTagName("INPUT")[0].value = "";

      // var span = document.createElement("SPAN");
      // var txt = document.createTextNode("\u00D7");
      // span.className = "close";
      // span.appendChild(txt);
      // li.appendChild(span);
    
      // for (i = 0; i < close.length; i++) {
      //   close[i].onclick = function() {
      //     var div = this.parentElement;
      //     div.style.display = "none";
      //   }
      // }

    }, false);
  }

}

var myDiv = document.getElementById("list1");
globalLists.push(new TodoList(myDiv, "adrian1"));

var myDiv = document.getElementById("list2");
globalLists.push(new TodoList(myDiv, "adrian2"));