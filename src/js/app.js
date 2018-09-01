import "jquery";
import "./defiant.min.js";
import TweenMax from "gsap/TweenMax"; // imports TweenLite
import TimelineMax from "gsap/TimelineMax"; // imports TimelineLite

import "../sass/candidatosui.scss";
import cities from "./t_geo_city_201807241330.json"
import states from "./t_geo_state_201807241330.json"

var questions = [];
var intros = [];
var index = 0;
var intro_index = 0;
var started = false;
var moving = false;
var in_ending = false;
var validPersonalInfo = false
var validname =  false,
validemail = false,
validphone = false,
validage = false;

//Mobile breakdown
var is_mobile = false
var selected_file = ""



function moveToStep(step1, step2, dir)
{
    if(!is_mobile)
    {
        moving = true;
        if(dir)
        {
            var tll = new TimelineMax({onComplete: function(){
                moving = false;
                $(".column.step2."+step2).addClass("active")
                $(".column.step2."+step2).removeClass("inactive")
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
                $(".column.step2."+step2).addClass("inactive")
                $(".column.step2."+step2).removeClass("active")
                //Unselect the 
                $(".step1").find(".option.active").removeClass("active")
               
            }});
            //Go to step 1
            console.log("Step1: "+step1+" Step2: "+step2)
            tll.staggerTo($(".column.step2."+step2), 0.8, {x:-200,opacity:0, clearProps:'x'}, 0.4)
            tll.staggerFrom($(step1), 0.8, {x: 200}, 0.4, "same");
            tll.staggerTo($(step1), 0.8, {opacity: 1}, 0.4, "same");
        }
        tll.play();
    }
    else{
        //is mobile, just show 
        $(".column.step2.active").hide();
        $(".column.step2."+step2).show();
        $(".column.step2."+step2).addClass('active')

        //update subtitle
        $(".step2subtitle strong").text(step2)
        if($('.step2subtitle').css('display') == 'none')
            $(".step2subtitle").show();
    }
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
    if(!is_mobile)
    {
        moving = true;
        var tll = new TimelineMax({onComplete: function(){
            $("#"+questions[index]).removeClass("active");
            $("#"+questions[i]).addClass("active");
            //Find any step2 in the question item and remove class active
            $("#"+questions[index]).find(".step2").removeClass("active")
            $("#"+questions[index]).find(".step2").addClass("inactive")
            $("#"+questions[index]).find(".step1").removeClass("inactive")
            $("#"+questions[index]).find(".step1").addClass("active")
            index = i;
            moving = false;
            updateProgressBar()
        }});

        if(i!=index)
            tll.staggerTo("#"+questions[index]+" .column:not(.step2.inactive)", 0.8, {x:-200,opacity:0, clearProps:'x'}, 0.4)
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

}
function goToEnding()
{
    if(!is_mobile)
    {
        moving = true
        var tll = new TimelineMax({onComplete: function(){
            $("#"+questions[questions.length-1]).removeClass("active");
            //Find any step2 in the question item and remove class active
            $("#"+questions[questions.length-1]).find(".step2").removeClass("active")
            $("#"+questions[questions.length-1]).find(".step2").addClass("inactive")
            $("#"+questions[questions.length-1]).find(".step1").removeClass("inactive")
            $("#"+questions[questions.length-1]).find(".step1").addClass("active")
            $("#ending").addClass("active");
            moving = false;
            in_ending = true;
        }});
        tll.staggerTo("#"+questions[questions.length-1]+" .column:not(.step2.inactive)", 0.8, {x:-200,opacity:0, clearProps:'x'}, 0.4)
        tll.staggerFrom("#ending .column", 0.8, {x: 200}, 0.4, "same");
        tll.staggerTo("#ending .column", 0.8, {opacity: 1}, 0.4, "same");
        tll.play()
    }
}
function backToQuestions(){
    moving = true
    var tll = new TimelineMax({onComplete: function(){
        $("#"+questions[index]).addClass("active");
        $("#ending").removeClass("active");
        moving = false;
        in_ending = false
    }});
    tll.staggerTo("#ending .column", 0.8, {x:-200,opacity:0, clearProps:'x'}, 0.4)
    tll.staggerFrom("#"+questions[index]+" .column:not(.step2)", 0.8, {x: 200}, 0.4, "same");
    tll.staggerTo("#"+questions[index]+" .column:not(.step2)", 0.8, {opacity: 1}, 0.4, "same");
    tll.play()
}
function showIntro(i)
{
    if(!is_mobile)
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
                $(".introdirs a.next").addClass("is-medium")
                $(".introdirs a.next span:first-of-type").text("empezar formulario")
            }
        }});

    	if(i!=intro_index)
    		tll.staggerTo("#"+intros[intro_index]+" > *", 0.8, {x:-200,opacity:0, clearProps:'x'}, 0.4)
        tll.staggerFrom("#"+intros[i]+" > *", 0.8, {x: 200}, 0.4, "same");
        tll.staggerTo("#"+intros[i]+" > *", 0.8, {opacity: 1}, 0.4, "same");
        tll.play();
    }

}
function checkValidations(i)
{
    if($("input[name='usertype']:checked").val() != 'anonymous')
    {
        if(i == 2)
        {
            $(".personalinfo input:not([type='radio'])").trigger("change")
            if(validphone && validemail && validname && validage)
            {
                validPersonalInfo = true
                return true;
            }
            else{
                validPersonalInfo = false
                return false;
            }
        }
    }
    validPersonalInfo = true
    return true; 
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
            {
                //Check validations
                showQuestion(index + 1)
            }
            return true;
        }
        else if(index == this.length-1 && !moving && !in_ending)
        {
            if(checkValidations(index))
                goToEnding();
        }
        
        return false;
    });
    questions.prev = (function () {
        if (index >0 && !moving && !in_ending){
            showQuestion(index - 1)
            return true;
        }
        else if(index == this.length-1 && !moving && in_ending)
            backToQuestions();
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
function capitalizeFirstLetter(string) 
{
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}
function getCities(stateId)
{
    $('[name="city_code"]').find('option').remove()
    let theCities = JSON.search(cities, '//*[STA_ID="'+stateId+'"]');
    for(var i = 0; i < theCities.length; i++) {
        var city = theCities[i];

        let id = city.CIT_CODE
        let name =  capitalizeFirstLetter(city.CIT_NAME)
        $("[name='city_code']").append("<option value='"+id+"'>"+name+"</option>")
    }
}
function beforeSendValidations(){
    //validates EVERYTHING
    //At least one motive is selected
    $(".errors").empty()
    $(".personalinfo input:not([type='radio'])").trigger('change')

    //check if motive selected
    checkValidations();
    var errors = [];
    if($('select[name="CATEGORY_A"] option:selected').val().length < 1)
        errors.push("Por favor selecciona por lo menos un motivo")
    else if($('select[name="CATEGORY_B"] option:selected').val().length < 1)
    {
        errors.push("Por favor selecciona que te molesta más de <strong>"+$('select[name="CATEGORY_A"] option:selected').val()+"</strong>")
        
    }
    if($("input[name='politic_b']:checked").val() == null)
        errors.push("Por favor selecciona si apoyarias o no a un politico en la pregunta 4")
    if(!validPersonalInfo && $("input[name='usertype']:checked").val() != 'anonymous')
        errors.push("Por favor llena tus datos personales")
    if($("input[name='email']").val() && !isEmail($("input[name='email']").val()))
        errors.push("Por favor ingresa un correo electrónico valido")



    return errors;
    
}

function consumeWebService(url, method, data,type = "json")
{
    $.ajax({
        url: url,
        type: method,
        dataType: type,
        data: data,
        beforeSend: function(xhr){
            //Espacio para enviar headers de auth y cosas así necesarias
            xhr.setRequestHeader('X-Test-Header', 'test-value');
        },
        statusCode: {
            404: function() {
                //Si la URL no existe
              alert( "page not found" );
            }
          }
    })

    .done(function( response) {
        //Si todo sale bien
        console.log("success");
        console.log("response")
    })
    .fail(function() {
        //Si hay un error en el llamado
        console.log("error");
    })
    .always(function() {
        //Siempre que termine el call sin importar si HTTP 200 o lo que sea
        console.log("complete");
    });
    
}
function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}
$(document).ready(function(){
    if( $(window).width() <= 768 )
        is_mobile = true

    var searcher = JSON.search(cities, '//*[CIT_CODE="43"]');

    //Put states
    for(var i = 0; i < states.length; i++) {
        var state = states[i];

        let id = state.STA_ID
        let name =  capitalizeFirstLetter(state.STA_NAME)
        $("[name='state_code']").append("<option value='"+id+"'>"+name+"</option>")
    }
    $("[name='state_code']").val($("[name='state_code'] option:first").val());

    $('[name="state_code"]').change(function() {
        getCities($(this).val())
    });

    $('[name="state_code"]').trigger("change")

    $(".personalinfo input[name='name']").on("change",function(){
        var input=$(this);
        if(input.val() || $("input[name='usertype']:checked").val() == 'anonymous')
        {
            input.removeClass("is-danger")
            validname = true
        }
        else
        {
            input.addClass("is-danger")
            validname = false
        }
        console.log("valid: "+validname)
    })
    $(".personalinfo input[name='phone']").on("change",function(){
        var input=$(this);
        if(input.val() || $("input[name='usertype']:checked").val() == 'anonymous')
        {
            input.removeClass("is-danger")
            validphone = true
        }
        else
        {
            input.addClass("is-danger")
            validphone = false
        }
        console.log("valid: "+validphone)
    })
    $(".personalinfo input[name='age']").on("change",function(){
        var input=$(this);
        if(input.val() || $("input[name='usertype']:checked").val() == 'anonymous')
        {
            input.removeClass("is-danger")
            validage = true
        }
        else
        {
            input.addClass("is-danger")
            validage = false
        }
        console.log("valid: "+validage)
    })
    $(".personalinfo input[type='email']").on("change",function(){
        var input=$(this);
        console.log("email change!")
        if(input.val() || $("input[name='usertype']:checked").val() == 'anonymous')
        {
            if(isEmail(input.val()))
            {
                input.removeClass("is-danger")
                validemail = true
            }
            else
            {
                input.addClass("is-danger")
                validemail = false
            }
        }
        else
        {
            input.addClass("is-danger")
            validemail = false
        }
        console.log("valid: "+validemail)
    })


    $('#prooffile').change(function(e){ 
        var maxSize = $(this).data('max-size');
        var fileSize = ($(this).get(0).files[0].size)/1000 // in bytes
            if(fileSize>maxSize)
                $("#fileproblem").show();
            else
                $("#fileproblem").hide();
    });

    $(".fblogin").click( function(e){
        e.preventDefault();
        FB.login(function(response){
            if(response.status == "connected")
            {
                //user said YES. Get info
                FB.api("/me?fields=id,name,email", function(userData){
                    $("input[name='fullname']").val(userData.name)
                    $("input[name='email']").val(userData.email)
                })
                
            }
        },{scope: 'public_profile, email'})
    });

    $("#pruebaservice").click(function(e){
        consumeWebService("https://prueba", "GET");
    })

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

    if(is_mobile)
    {
        //Add numeric stuff
        $( ".item .title" ).each(function( index ) {
            $(this).prepend((index+1)+") ")
        });
    }
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
        //Check if validations 
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

    $(".selector.with-select.outter-select .option:not(.disabled)").click(function(e){
        var parent = $(this).closest(".selector")
        var selector = $('select[name="CATEGORY_B"]')
        //if active do nothing
        if(!$(this).hasClass("active"))
        {
            //Find active one and deactivates it
            $(parent).find(".option.active").removeClass("active")
            $(this).addClass("active");
            //update input tag
            $(selector).val($(this).data("value"))

            if(!$(this).hasClass("notnext"))
                questions.next()
        }
    });
    //Create selector functionality
    $(".selector.with-select:not(.outter-select) .option:not(.disabled)").click(function(e){
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
            else
            {
                //Go to next question
                if(!$(this).hasClass("notnext"))
                    questions.next()
            }

        }
    });
    //Create radio functionality
    $(".selector.with-radios .option:not(.disabled)").click(function(e){
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
            $("#"+radio).trigger("change")

            if(able)
                $("#"+item).removeClass("unavailable");
            else
                $("#"+item).addClass("unavailable");

            if(!$(this).hasClass("notnext"))
                questions.next();
        }
    });

    $("[name='usertype']").change(function(e){
        if($(this).val() == "anonymous")
            $(".personalinfo input, .personalinfo select").prop('disabled', true)
        else
            $(".personalinfo input, .personalinfo select").prop('disabled', false)
        $(".personalinfo .option:not(.usertype)").toggleClass('disabled')
    })

     $("input:file").change(function(e){
          var reader = new FileReader();
          reader.onload = function() {

            var arrayBuffer = this.result,
              array = new Uint8Array(arrayBuffer),
              binaryString = String.fromCharCode.apply(null, array);

            selected_file = binaryString
          }
          reader.readAsArrayBuffer(this.files[0]);
    })

    //Create multiple checkbox functionality
    $(".selector.with-checkboxes .option:not(.disabled)").click(function(e){
        var parent = $(this).closest(".selector")
        var checkbox = $(this).data("value")
        //if active do nothing
        if($(this).hasClass("active"))
            $("#"+checkbox).prop("checked", false);
        else
        {
            $("#"+checkbox).prop("checked", true);
            if($(this).hasClass("deselectall"))
            {
                let activeitems = $(parent).find(".option.active").not(".deselectall")
                activeitems.each(function(){
                    $(this).removeClass('active')
                    let cb = $(this).data("value")
                    $("#"+cb).prop("checked", false);
                })
            }
            else{
                //Check if deselectall is active, if its then deactivates it
                let desall = (parent).find(".option.deselectall")
                if(desall && $(desall).hasClass("active"))
                {
                    $(desall).removeClass('active')
                    let cb = $(desall).data("value")
                    $("#"+cb).prop("checked", false);
                }
            }
        }
        $(this).toggleClass("active")

    });

    $("a.backstep").click(function(e){
        moveToStep($(".step1"),$(this).data("step")+".active",false)
        return false;
    })
    $("a.backsteppersonalinfo").click(function(e){
        moveToStep($(".step0"),"personalinfo",false)
        return false;
    })
    $("a.nextstep").click(function(e){
        moveToStep($(this).closest(".step0"),"personalinfo",true)
        return false;
    })


    //Show first intro
    intros.next(true);

    $("#formulario").submit(function(event) {
        event.preventDefault();

        var err = beforeSendValidations()
        if(err.length == 0)
        {
            //send
            var datos = {
                type: $("input[name='type']").val(),
                category_a: $("select[name='CATEGORY_A'] option:selected").val(),
                category_b: $("select[name='CATEGORY_B'] option:selected").val(),
                attachments: selected_file,
                politic_a: $("input[name='politic_a']").val(),
                politic_b: $("input[name='politic_b']:checked").val(),
                politic_c: $("input[name='politic_c']:checked").val(),
                anonymous: $("input[name='usertype']:checked").val() == 'anonymous',
                name: $("input[name='name']").val(),
                email: $("input[name='email']").val(),
                phone: $("input[name='phone']").val(),
                age: $("input[name='age']").val(),
                state_code: $("select[name='state_code'] option:selected").val(),
                city_code: $("select[name='city_code'] option:selected").val(),
                gender: $("input[name='gender']:checked").val(),
                ip_info: navigator.userAgent,
                date: Date.now()
            }
            datos.comments = $("textarea[name='"+datos.category_a+"_extracomment']").val()
            $.getJSON('https://api.ipify.org?format=json', function(data){
                datos.ip_address = data.ip;
                console.log(datos)
            });
            $("#formodal").addClass("is-active")
            TweenMax.to($("#formodal"), 0.6, {opacity: 1})
        }
        else{
            //show errors
            for(i=0;i<err.length;i++)
            {
                $("ul.errors").append("<li>"+err[i]+"</li>");
            }
        }
    });

    $(".modal-close, .closebtn").click(function(e)
    {
        TweenMax.to($(this).closest(".modal"), 0.8, {opacity: 0, onComplete: function(){
            TweenMax.delayedCall(0.5, function(){$(this).closest(".modal").removeClass("is-active")});
            location.reload();
            
        }})

    })
    $("#termswitch").click(function(e){
        e.preventDefault();
        $("#terms").addClass("is-active")
        TweenMax.to($("#terms"), 0.6, {opacity: 1});

        return false;
    })

});
$(document).keyup(function(e) {
    if(e.which == 13 && !moving && started) {
    	questions.next();
    }
});
