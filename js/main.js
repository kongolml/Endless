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
    var translated = window.getComputedStyle($('.endless-wrapper').get(0));

    var activeItem = {
        index: 0,
        row: 0,
        column: 0
    };

    var drag = {
        startDrag: false,
        dragXStart: 0,
        dragYStart: 0,
        translatedX: 0,
        translatedY: 0,
        toTranslateX: 0,
        toTranslateY: 0,
        direction: {
            left: false,
            right: false,
            up: false,
            down: false
        }
    };

    $("body").mousedown(function(e){
    	//start dragging only with left mouse button:
    	if(e.which === 1){
    		drag.startDrag = true;
	    	drag.dragXStart = e.pageX;
	    	drag.dragYStart = e.pageY;
	    	$(".endless-wrapper").addClass("dragging");
	    }
    });

    $("body").mouseup(function(e){
    	drag.startDrag = false;
    	$(".endless-wrapper").removeClass("dragging");
		var matrix = new WebKitCSSMatrix(translated.webkitTransform);
    	drag.translatedX = matrix.m41;
    	drag.translatedY = matrix.m42;

        markActive();

        activeItem.index = $(".active").index();
        activeItem.column = Math.abs(drag.translatedX/$("section").width());
        activeItem.row =  Math.abs(drag.translatedY/$("section").height());

        if( drag.direction.left ){
            //activeItem.column++;
        }

        if( drag.direction.right ){
            //activeItem.column--;
        }

        if( drag.direction.up ){
            //activeItem.row--;
        }

        if( drag.direction.down ){
            //activeItem.row++;
        }       

    	//decide if continue scrolling:
    	if( activeItem.column>0.1 ){
            activeItem.column = Math.ceil(activeItem.column);
    	} else {
    		
    	}

        finishSliding();
    	
    });

    $("body").mousemove(function(e){
    	if(drag.startDrag) {
    		drag.toTranslateX = e.pageX - drag.dragXStart + drag.translatedX;
    		drag.toTranslateY = e.pageY - drag.dragYStart + drag.translatedY;
    		doDrag(drag.toTranslateX, drag.toTranslateY);

            //direction of drag:
            var xVal = drag.dragXStart-e.pageX;
            var yVal = drag.dragYStart-e.pageY;
            if( xVal<0 ){
                drag.direction.left=false;
                drag.direction.right=true;
            } else if( xVal>0 ) {
                drag.direction.left=true;
                drag.direction.right=false;
            } else {
                drag.direction.left=false;
                drag.direction.right=false;
            }

            if( yVal<0 ){
                drag.direction.up=false;
                drag.direction.down=true;
            } else if( yVal>0 ) {
                drag.direction.up=true;
                drag.direction.down=false;
            } else {
                drag.direction.up=false;
                drag.direction.down=false;
            }
    	}
    });

    function doDrag(x, y){
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


    //Get active slide:
    function markActive(){
        var winH = $(window).height();
        var winW = $(window).width();

        var mightBeActive = [];
        var activeSlide;

        //find active slide x-coordinates:
        for(var i=0; i<$("section").length; i++){
            if( $("section").eq(i).offset().left === 0 ) {
                mightBeActive.push($("section").eq(i))
            }
        }
        
        //from potentially active slides find the one that really active:
        for(var i=0; i<mightBeActive.length; i++){
            if( mightBeActive[i].offset().top === 0 ) {
                activeSlide = mightBeActive[i];
            }
        }

        $("section").removeClass("active");
        if( activeSlide != null ){
            activeSlide.addClass("active"); 
        }
    };


    //finish sliding to the desired slide (to stick to borders):
    function finishSliding() {
        console.log("activeItem.column:"+activeItem.column)

        doDrag($("section").width()*activeItem.column);
    };


};

$("body").endless({
	sectionsInARow: 3,
    axis: "x"
});