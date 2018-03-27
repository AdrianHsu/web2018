var date = document.getElementById("day1").getElementsByClassName("date")[0];
var mybtn = document.getElementById("mybtn");

mybtn.addEventListener("click", function() {
	var newbutton = document.createElement("div");
	var btntext = document.createTextNode("NEW");
	newbutton.appendChild(btntext);
	newbutton.className="button_new";
	var att = document.createAttribute("onclick");
	att.value = "creatediv()"
	newbutton.setAttributeNode(att);
	date.appendChild(newbutton);
});


function creatediv() {
	var newdiv = document.createElement("div");
	newdiv.setAttribute("class", "unit");
	newdiv.innerHTML = document.getElementById("newunit").innerHTML;
	document.getElementById("day1").appendChild(newdiv);
}



