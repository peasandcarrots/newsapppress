$(function() {
  window.keydown = {};
  
  function keyName(event) {

  	console.log("jQ is now" +jQuery);	
  	console.log("hotkeys is now" +jQuery.hotkeys);
    return jQuery.hotkeys.specialKeys[event.which] ||
      String.fromCharCode(event.which).toLowerCase();
  }
  
  $(document).bind("keydown", function(event) {
    keydown[keyName(event)] = true;
  });
  
  $(document).bind("keyup", function(event) {
    keydown[keyName(event)] = false;
  });
});
