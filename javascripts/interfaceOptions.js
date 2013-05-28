

var spaceShowing = false;


function showSpace(){



$('#scrollArea').attr('class', 'span6');


$('#spaceArea').css("display", "inline-block" );

}


function hideSpace(){

$('#spaceArea').css("display", "none" );


$('#scrollArea').attr('class', 'span12');



}









 function interOptions(){
 
 $('#spaceButton').mousedown(function(event) {
 
 if (spaceShowing == false){
 
 showSpace();
 spaceShowing = true;
 $('#spaceButton').text("No, it's hideous, hide the Space Invaders interface.");
 
 } else{
 
 hideSpace();
 spaceShowing = false;
 $('#spaceButton').text("Try the Space Invaders interface again");
 
 }
 
 });
 
 }
 
 
 
  $(document).ready(function() {
  
	interOptions();
});

