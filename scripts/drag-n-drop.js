"use strict";

(function(){
	console.log("working");
	
	var SiteUtils = {
		allowDrop: function(evt){
			evt.preventDefault();
		},
		dragStart: function(evt){
			var elm = document.getElementById("dragable");
			console.log("dragging", evt.target.id);
			/*
			This gets the ID from the event.target and creates a node called text, within 
			he dataTransfer object with the value of the id
			*/			
			evt.dataTransfer.setData("text", evt.target.id);						
			evt.stopPropagation();
		},
		dragOver: function(evt){
			//This function specifies where the data can be dropped (The drop zone div)
			//Use preventDefault to stop the usual behavior of DOM elements, normally you cannot drop elements into eachother
			evt.preventDefault();			
			console.log("Dragging Over");
		},
		drop: function(evt){
			//Convert the ID added the the setData method to get the element by ID
			//the drop zone divs are the evt.targets, append the DOM element to the drom zone targets
			evt.preventDefault();			
			var data = evt.dataTransfer.getData("text"), dragable = document.getElementById(data), answer = "",
			targetAnswer = evt.target.attributes["data"].value, dragableAnswer = dragable.attributes["data"].value;	
			try{
				evt.target.appendChild(dragable);
			}catch(err){
				//There was a error
			}
			answer = dragableAnswer === targetAnswer ? "Correct! The answer is "+targetAnswer : answer = "Incorrect! The answer is not "+targetAnswer;
			SiteUtils.makeDOMElement("P", answer, "body-home");			
			evt.stopPropagation();
		},
		setDragEvents: function(targ, evt){
			//Use this to set up the drag target
			var target = document.getElementById(targ);			
			if(window.addEventListener){
				console.log("dagging availble");
				target.addEventListener("dragstart", SiteUtils.dragStart, true);
			}else{
				console.log("No dragging");
			}
		},
		setDropEvents: function(targ){
			//Use this to set up the drop target/s
			var target = document.getElementById(targ);
			if(window.addEventListener){
				target.addEventListener("dragover", SiteUtils.dragOver, true);
				target.addEventListener("drop", SiteUtils.drop, true);
			}
		},
		checkMap: function(elm){
			var el = document.getElementById(elm), item;
			
			for(item in el){
				//console.log("Value of item: ", item);
			}
			//console.log(el.childNodes[0]);
		},
		makeDOMElement: function(type, data, parentElm){
			var elm = document.createElement(type), txt = document.createTextNode(data), parent = document.getElementById(parentElm);
			elm.id = "answer";
			elm.appendChild(txt);
			if(document.getElementById(elm.id)){
				parent.removeChild(document.getElementById(elm.id));
			}			
			parent.appendChild(elm);
			txt = null;
			elm = null;
		}
	};
	
	SiteUtils.setDragEvents("dragable");	
	SiteUtils.setDropEvents("drop1");
	SiteUtils.setDropEvents("drop2");
	SiteUtils.checkMap("drop1");
})();
