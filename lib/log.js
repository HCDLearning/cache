function Logger () {
	
}

function init(){
	['Trace','Debug','Info','Warn','Error','Fatal', 'Mark'].forEach(
	  function(levelString) {	    
	    Logger[levelString.toLowerCase()] = function () {
	      
	    	var args = Array.prototype.slice.call(arguments);
	        console.log.apply(console, args);
	    };
	  }
	);
}

init();

module.exports = Logger;