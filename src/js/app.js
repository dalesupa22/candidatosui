import "jquery";
import TweenMax from "gsap/TweenMax"; // imports TweenLite
import TimelineMax from "gsap/TimelineMax"; // imports TimelineLite

import "../sass/candidatosui.scss";

var questions = [];
var intros = [];
var index = 0;
var intro_index = 0;
var started = false;
var moving = false;


function moveToStep(step1, step2, dir)
{
    moving = true;
    if(dir)
    {
        var tll = new TimelineMax({onComplete: function(){
            moving = false;
            $(".column.step2."+step2).toggleClass("active")
            $(step1).addClass("inactive")
        }});
        //Go to step 2
        tll.staggerTo($(step1), 0.8, {x:-200,opacity:0, clearProps:'x'}, 0.4)
        tll.staggerFrom(".column.step2."+step2, 0.8, {x: 200}, 0.4, "same");
        tll.staggerTo(".column.step2."+step2, 0.8, {opacity: 1}, 0.4, "same");
    }
    else
    {
        $(step1).removeClass("inactive")
        var tll = new TimelineMax({onComplete: function(){
            moving = false;
            $(".column.step2."+step2).toggleClass("active")
            //Unselect the 
            $(".step1").find(".option.active").removeClass("active")
           
        }});
        //Go to step 1
        tll.staggerTo($(".column.step2."+step2), 0.8, {x:-200,opacity:0, clearProps:'x'}, 0.4)
        tll.staggerFrom($(step1), 0.8, {x: 200}, 0.4, "same");
        tll.staggerTo($(step1), 0.8, {opacity: 1}, 0.4, "same");
    }
    tll.play();
}

function updateProgressBar()
{
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
function showQuestion(i)
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
        $(".introdirs").removeClass("active");
        tll.staggerTo(["#intro_full .column",".introdirs"], 0.8, {x:-200,opacity:0, clearProps:'x'}, 0.4)

    }
    tll.staggerFrom("#"+questions[i]+" .column:not(.step2)", 0.8, {x: 200}, 0.4, "same");
    tll.staggerTo("#"+questions[i]+" .column:not(.step2)", 0.8, {opacity: 1}, 0.4, "same");
    if(i==index)
    {
        tll.staggerFrom("#controls .questiondirs .level-item", 0.8, {x: 200}, 0.4, "same");
        tll.staggerTo("#controls .questiondirs .level-item", 0.8, {opacity: 1}, 0.4, "same");     
        tll.staggerFrom("#progress .column:not(.step2)", 0.8, {x: 200}, 0.4, "same");
        tll.staggerTo("#progress .column:not(.step2)", 0.8, {opacity: 1}, 0.4, "same");
    }
    tll.play();

}
function showIntro(i)
{
	moving = true;
	var tll = new TimelineMax({onComplete: function(){
        $("#"+intros[intro_index]).removeClass("active");
        $("#"+intros[i]).addClass("active");
        intro_index = i;
        moving = false;
        //If the current intro is the last one, change color and text of next button
        if(intro_index == intros.length - 1)
        {
            $(".introdirs a.next").removeClass("is-linkcolor")
            $(".introdirs a.next").addClass("is-primary")
            $(".introdirs a.next span:first-of-type").text("empezar formulario")
        }
    }});

	if(i!=intro_index)
		tll.staggerTo("#"+intros[intro_index]+" > *", 0.8, {x:-200,opacity:0, clearProps:'x'}, 0.4)
    tll.staggerFrom("#"+intros[i]+" > *", 0.8, {x: 200}, 0.4, "same");
    tll.staggerTo("#"+intros[i]+" > *", 0.8, {opacity: 1}, 0.4, "same");
    tll.play();

}
var iterify = function(){
    questions.next = (function (fromIntro = false) { 
        if(fromIntro)
            showQuestion(0)
        else if (index < this.length-1 && !moving){
            var tmp = 1;
            while((index + tmp) < this.length && $("#"+questions[index + tmp]).hasClass("unavailable") )
            {
                tmp++;
            }
            if((index + tmp) < this.length)
                showQuestion(index + 1)
            return true;
        }
        
        return false;
    });
    questions.prev = (function () {
        if (index >0 && !moving){
            showQuestion(index - 1)
            return true;
        }
        return false;
    });
    intros.next = (function (first = false) { 
    	if(first)
    		showIntro(0)
    	else if (intro_index < this.length-1 && !moving){
            showIntro(intro_index + 1)
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
    $(this).find("#intro_full .slide").each(function(){
        var id = $(this).attr('id');
        index = 0;
        intros.push(id);
    });
    iterify();
    $("#progress small span:nth-of-type(2)").text(questions.length)

    $("a.intro").click(function(e){
    	e.preventDefault();
    	questions.next(true);
    	return false;
    })
    $(".questiondirs a.prev").click(function(e){
    	e.preventDefault();
    	questions.prev();
    })

    $(".questiondirs a.next").click(function(e){
    	e.preventDefault();
    	questions.next();
    })
     $(".introdirs a.next").click(function(e){
        e.preventDefault();
        if(intro_index == intros.length - 1)
        {
            questions.next(true);
            started = true
        }
        else
            intros.next();
    })


    //Create selector functionality
    $(".selector.with-select .option").click(function(e){
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

            if($(parent).hasClass("with-step"))
            {
                //Go to step 2
                moveToStep($(this).closest(".step1"),$(this).data("value"),true)
            }
        }
    });
    //Create radio functionality
    $(".selector.with-radios .option").click(function(e){
        var parent = $(this).closest(".selector")
        var radio = $(this).data("value")
        var item = $(this).data("item")
        var able = $(this).data("able")
        //if active do nothing
        if(!$(this).hasClass("active"))
        {
            //Find active one and deactivates it
            $(parent).find(".option.active").removeClass("active")
            $(this).addClass("active");
            //update input tag
            $("#"+radio).prop("checked", true);
            if(able)
                $("#"+item).removeClass("unavailable");
            else
                $("#"+item).addClass("unavailable");
        }
    });

    //Create multiple checkbox functionality
    $(".selector.with-checkboxes .option").click(function(e){
        var parent = $(this).closest(".selector")
        var checkbox = $(this).data("value")
        //if active do nothing
        if($(this).hasClass("active"))
            $("#"+checkbox).prop("checked", false);
        else
            $("#"+checkbox).prop("checked", true);

        $(this).toggleClass("active")
    });

    $("a.backstep").click(function(e){
        moveToStep($(".step1"),"active",false)
        return false;
    })


    //Show first intro
    intros.next(true);

});
$(document).keyup(function(e) {
    if(e.which == 13 && !moving && started) {
    	questions.next();
    }
    else if(e.which == 8 && started)
    	questions.prev();
});
