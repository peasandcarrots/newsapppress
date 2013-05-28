//This file does a whole lot of things, including dealing with the tweet scroll, but also their colorization, etc.  
//Very messy, so still need to neaten everything up.


bayesianScore = 1;



function toInteger(number){ 
  return Math.round(  
    Number(number)    
  ); 
};



function autoScroll() {
   	var itemHeight = $('#tw li').outerHeight();
   		
    var moveFactor = parseInt($('#tw').css('top')) - itemHeight;
       $('#tw').animate(
           {'top' : moveFactor}, 'slow', 'linear', function(){
             
        	   $("#tw li:last").after($("#tw li:first"));
               $('#tw').css({'top' : '-6em'});
       });
       
   timeToScroll = 0;
       
       
   };
   



   
   function colouriseByBayesianScore(){
      
   
   
for (i=3; i<8; i++){   
  

  

selectorCriteria =  '#tw li:nth-child(' + i + ') .tweetBody';

selectedTweet = "#tw li:nth-child(" + i + ")";


textFromTweet3 = $(selectorCriteria).text();

boringProp = calculateBayesianScore(textFromTweet3);



if(boringProp < 0.05){
	addTopScorers(textFromTweet3);
	
	
	}




normalisedBoringness = boringProp * 255;


tmpo = 0;
r = 0;
g = 0;
b = 0;
if(normalisedBoringness <= 255 && normalisedBoringness >= 235){
    tmpo=255-normalisedBoringness;
    r=255-tmpo;
    g=tmpo*12;
}else if(normalisedBoringness <= 234 && normalisedBoringness >= 200){
    tmpo=234-normalisedBoringness;
    r=255-(tmpo*8);
    g=255;
}else if(normalisedBoringness <= 199 && normalisedBoringness >= 150){
    tmpo=199-normalisedBoringness;
    g=255;
    b=tmpo*5;
    
}else if(normalisedBoringness <= 149 && normalisedBoringness >= 10){

    tmpo=149-normalisedBoringness;
    g=255-(tmpo*5);
    b=255;
}else{
  
    b=255;

}





rgbValues = "rgb(" + toInteger(r) + ", " + toInteger(g) + ", " + toInteger(b) + ")";

if (boringProp){
  

  
$(selectedTweet).css( "background-color", rgbValues ) ;
}



    



}

     
      
   }
