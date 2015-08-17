for(var i=0; i<=$("section").length; i++){
	$("section").eq(i).css("background-color", "rgb("+Math.floor((Math.random() * 255) + 1)+", "+Math.floor((Math.random() * 255) + 1)+", "+Math.floor((Math.random() * 255) + 1)+")");
};


$.fn.endless = function(options) {

    var settings = $.extend({
        bodyWidth: 1,
        sectionsInARow: 1
    }, options );


    //set container width:
    this.css({
    	width: settings.bodyWidth+"00vw",
    });


    //dragging of the field:
    var startDrag = false;

    $("body").mousedown(function(grabbed){
    	startDrag = true;
    	var grabbedX = grabbed.pageX;
    	var grabbedY = grabbed.pageY;

    	$("body").mousemove(function(dragged){
    		if(startDrag){
    			console.log("dragged")
    		}
    	})
    });

    $("body").mouseup(function(grabbed){
    	startDrag = false;
    });

};

$("body").endless({
	bodyWidth: 2
});