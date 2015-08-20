for(var i=0; i<=$("section").length; i++){
	$("section").eq(i).css("background-color", "rgb("+Math.floor((Math.random() * 255) + 1)+", "+Math.floor((Math.random() * 255) + 1)+", "+Math.floor((Math.random() * 255) + 1)+")");
};


$.fn.endless = function(options) {

    var settings = $.extend({
        sectionsInARow: 1,
        axis: 'both',
        transition: 400
    }, options );


    //set container width:
    this.css({
    	width: settings.sectionsInARow+"00vw",
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
    	//start dragging only with left mouse button:
    	if(e.which === 1){
    		startDrag = true;
	    	dragXStart = e.pageX;
	    	dragYStart = e.pageY;
	    	$(".endless-wrapper").addClass("dragging");
	    }
    });

    $("body").mouseup(function(e){
    	startDrag = false;
    	$(".endless-wrapper").removeClass("dragging");
		var matrix = new WebKitCSSMatrix(translated.webkitTransform);
    	translatedX = matrix.m41;
    	translatedY = matrix.m42;

    	//decide if continue scrolling:
    	if( Math.abs(dragXStart-e.pageX)/($("section").width()/100)>5 ){
            //calculate missing distanse to scroll:
    	} else {
    		
    	}
    	
    });

    $("body").mousemove(function(e){
    	if(startDrag) {
    		toTranslateX = e.pageX - dragXStart + translatedX;
    		toTranslateY = e.pageY - dragYStart + translatedY;
    		drag(toTranslateX, toTranslateY);
    	}
    });

    function drag(x, y){
    	//check if dragging is within the container:
    	if(x>0){
    		x=0
    	};

    	if(y>0){
    		y=0
    	};

    	if ( (-x)>$(".endless-wrapper").width()-$("section").width() ) {
    		x=-($(".endless-wrapper").width()-$("section").width());
    	};

    	if ( (-y)>$(".endless-wrapper").height()-$("section").height() ) {
    		y=-($(".endless-wrapper").height()-$("section").height());
    	};

    	switch(settings.axis){
    		case "x":
    		$(".endless-wrapper").css({
    			"transform": "translate3d("+x+"px, 0px, 0px)",
    			"-webkit-transform": "translate3d("+x+"px, 0px, 0px)"
    		});
    		break;

    		case "y":
    		$(".endless-wrapper").css({
    			"transform": "translate3d(0px, "+y+"px, 0px)",
    			"-webkit-transform": "translate3d(0px, "+y+"px, 0px)"
    		});
    		break;

    		default:
    		$(".endless-wrapper").css({
    			"transform": "translate3d("+x+"px, "+y+"px, 0px)",
    			"-webkit-transform": "translate3d("+x+"px, "+y+"px, 0px)"
    		});
    	}

    };


    //TODO: get active slide:
    function markActive(){
        var winH = $(window).height();
        var winW = $(window).width();

        //find acctive slide x-coordinates:
        for(var i=0; i<=$("section").length; i++){
            if( $("section").eq(i).offset().left != 0 ) {
                console.log("not $('section').eq("+i+")")
            } else {
                console.log("its $('section').eq("+i+")")
            }
        }
    };






};

$("body").endless({
	sectionsInARow: 3,
});