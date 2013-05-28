/*
 * NAME:	jQuery Twitter Feed Function
 * AUTHOR:	Jay Blanchard
 * DATE:	2011-09-25
 * 
 * USAGE:	Include to call tweets into a web page
 * 
 * NOTE:	Different than the function in the book, going after a certain #hashtag
 * NOTE:	Modified hugely to make it part of the weird news app thing.  
 */



	function getTheShite(){
		
		
		

   $.getJSON('http://search.twitter.com/search.json?rpp=150&callback=?&result_type=recent&q=%23news' ,function(data){
        for(var i=0;i<data.results.length;i++){
        	var tweeter = data.results[i].from_user;
        	var tweetText = 'batch'+batchNumber + 'i = '+ i + data.results[i].text;
		
		$('#tw').append('<li class="tweet batch' + batchNumber +' "><div class="tweetImage"><a href="http://twitter.com/'+tweeter+'" target="_blank"><img src="'+data.results[i].profile_image_url+'" width="48" border="0" /></a></div><div class="tweetBody">'+tweetText+'</div><div class = "ticksAndCrosses"><div class=\"tick\"><a href=\"#\"> &#10004</a> </div><div class=\"cross\"><a href=\"#\">X</a></div></div></div></li>');    
		
		tweets[i] = tweetText;

        }
	
	compNames = tweets;
	

	
	tweetsAvailable = data.results.length;
	
	tweetsPushedSoFar = 0;

	compIndex = 0;

	
  

                         var elementToRemove;


	var batchClassUpTo = 'batch'+batchNumber;






$('.' + batchClassUpTo ).swipe( {
						swipe:function(event, direction, distance, duration, fingerCount) {




if (direction == 'right') {
		tweetTextToInclude = $(this).find(".tweetBody").text();
		
		includeCompanyName(tweetTextToInclude, "saved");
		elementToRemove =   $(this);
	      
	       elementToRemove.slideUp();
	    setInterval(function() {
	
	    elementToRemove.remove();
	    

	    }, 2000);
	    

        } else if (direction == 'left'){
	     elementToRemove =   $(this);
	    tweetTextToInclude = elementToRemove.find(".tweetBody").text();
		includeCompanyName(tweetTextToInclude, "shot");
	    
	      
	
	    elementToRemove.remove();
	    

	   
        }


    










							
						},
					   threshold:0
					});









  
     batchNumber ++;

	

   });
   
 
   
   
   
   }
   
   
    
    
    
   
   
 
   
   
   
   	$(document).ready(function() {
	tweets = [];
		ite=0;

	
	getTheShite();
   
   
});





   
   
    
