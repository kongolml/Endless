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

    $("section").wrapAll('<div class="endless-wrapper"></div>');


    //catch drag:
    var startDrag = false;
    var dragXStart, dragYStart;
    var translated = window.getComputedStyle($('.endless-wrapper').get(0));
    var translatedX = 0;
    var translatedY = 0;

    var toTranslateX = 0;
    var toTranslateY = 0;

    $("body").mousedown(function(e){
    	startDrag = true;
    	dragXStart = e.pageX;
    	dragYStart = e.pageY;
    	$(".endless-wrapper").addClass("dragging");
    });

    $("body").mouseup(function(e){
    	startDrag = false;
    	$(".endless-wrapper").removeClass("dragging");
		var matrix = new WebKitCSSMatrix(translated.webkitTransform);
    	translatedX = matrix.m41;
    	translatedY = matrix.m42;
    });

    function drag(x, y){
    	$(".endless-wrapper").css({
    		"transform": "translate3d("+x+"px, "+y+"px, 0px)",
    		"-webkit-transform": "translate3d("+x+"px, "+y+"px, 0px)"
    	});
    };

    $("body").mousemove(function(e){
    	if(startDrag) {
    		toTranslateX = e.pageX - dragXStart + translatedX;
    		toTranslateY = e.pageY - dragYStart + translatedY;
    		drag(toTranslateX, toTranslateY);
    	}
    });






};

$("body").endless({
	bodyWidth: 2
});