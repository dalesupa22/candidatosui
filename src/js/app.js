import "jquery";
import TweenMax from "gsap/TweenMax"; // imports TweenLite
import TimelineMax from "gsap/TimelineMax"; // imports TimelineLite

import "../sass/candidatosui.scss";

var questions = [];
var index = 0;
var started = false;
var moving = false;

function updateProgressBar()
{
	console.log("HERE")
	var total = questions.length
	var newValue = ((index+1)*100)/total
	var beforeValue = $("#progress progress").val();
	var goingUp = newValue > beforeValue ? true : false;

	var update = setInterval(function() {
	    if ((goingUp && beforeValue >= newValue) || (!goingUp && beforeValue <= newValue)) {
	      $("#progress small span:first-of-type").text(index+1)
	      clearInterval(update);
	    }
	    if(goingUp)
	    	$("#progress progress").val(beforeValue++);
	    else
	    	$("#progress progress").val(beforeValue--);
		    	
	  }, 10)
}
function showSection(i)
{
	moving = true;
	var tll = new TimelineMax({onComplete: function(){
        $("#"+questions[index]).removeClass("active");
        $("#"+questions[i]).addClass("active");
        index = i;
        moving = false;
        updateProgressBar()
    }});

	if(i!=index)
		tll.staggerTo("#"+questions[index]+" .column", 0.8, {x:-200,opacity:0, clearProps:'x'}, 0.4)
    else
    {
    	//is the first question. We have to dissappear the intro part
    	tll.staggerTo("#intro .column", 0.8, {x:-200,opacity:0, clearProps:'x'}, 0.4)

    }
    tll.staggerFrom("#"+questions[i]+" .column", 0.8, {x: 200}, 0.4, "same");
    tll.staggerTo("#"+questions[i]+" .column", 0.8, {opacity: 1}, 0.4, "same");
    if(i==index)
    {
    	tll.staggerFrom("#controls .level-item", 0.8, {x: 200}, 0.4, "same");
    	tll.staggerTo("#controls .level-item", 0.8, {opacity: 1}, 0.4, "same");    	
    	tll.staggerFrom("#progress .column", 0.8, {x: 200}, 0.4, "same");
    	tll.staggerTo("#progress .column", 0.8, {opacity: 1}, 0.4, "same");
    }
    tll.play();

}
var iterify = function(){
    questions.next = (function (fromIntro = false) { 
    	if(fromIntro)
    		showSection(0)
    	else if (index < this.length-1 && !moving){
            showSection(index + 1)
            return true;
        }
        
        return false;
    });
    questions.prev = (function () {
        if (index >0 && !moving){
            showSection(index - 1)
            return true;
        }
        return false;
    });
    return questions;
}
$(document).ready(function(){
	//1. Automatic creation of questions
    $(this).find(".item").each(function(){
        var id = $(this).attr('id');
        index = 0;
        questions.push(id);
    });
    iterify();
    $("#progress small span:nth-of-type(2)").text(questions.length)

    $("a.intro").click(function(e){
    	e.preventDefault();
    	questions.next(true);
    	return false;
    })
    $("a#previous_question").click(function(e){
    	e.preventDefault();
    	questions.prev();
    })

    $("a#next_question").click(function(e){
    	e.preventDefault();
    	questions.next();
    })


    //Create selecto functionality
    $(".selector .option").click(function(e){
        var parent = $(this).closest(".selector")
        var selector = $(parent).children("select")
        //if active do nothing
        if(!$(this).hasClass("active"))
        {
            //Find active one and deactivates it
            $(parent).find(".option.active").removeClass("active")
            $(this).addClass("active");
            //update input tag
            $(selector).val($(this).data("value"))
        }
        console.log("Select tag value: "+$(selector).val())
    });

});
$(document).keyup(function(e) {
    if(e.which == 13 && !moving) {
    	if(!started)
    	{
    		questions.next(true);
    		started = true
    	}
    	else
    		questions.next();
    }
    else if(e.which == 8)
    	questions.prev();
});
