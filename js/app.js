/* global $,document,console,quizMaster */
$(document).ready(function() {


 });

 function getUrlVars()
{
	var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
	
    return vars;
}
 function confirmCallback(buttonIndex) {
		   if(buttonIndex == 1) {
			  navigator.app.exitApp();
		   return true;
		}
 }
function areYouSure(text1, text2, callback) {

  $("#sure .sure-1").text(text1);
  $("#sure .sure-2").text(text2);

  $("#sure #sure-do").on("click.sure", function() {
	  
    callback();
	
    $(this).off("click.sure");
  });

  $.mobile.changePage("#sure");
}
$(document).on('click', '#exit', function () 
     { 
	 navigator.notification.confirm('Maidaan chhodkar bhaag rahe ho thakur?',confirmCallback);

  
	 }); 

$(document).on('click', '.goback', function () 
     {
	//window.plugins.AdMob.createInterstitialView();
quizMaster.backHandler();

 });
 $(document).on('click', '.gobackint', function () 
     {
	//window.plugins.AdMob.createInterstitialView();
quizMaster.backHandler2();

 });
 $(document).on('click', '#next', function () 
     {
		 
	 if(answed == "T"){

$("#success").popup("open").trigger("create");

   setTimeout(function(){
              $("#success").popup("close");
            }, 1000);
   
	 }
   else if(answed == "F"){


  $("#fail").popup("open").trigger("create");
setTimeout(function(){
              $("#fail").popup("close");
            }, 1000);
   }
   answed ="";
     }); 
	$(document).on("pageshow", "#quizPage", function() {
		
		//$("#pop").hide(); 
			 

		window.sessionStorage.clear();
		//initialize the quiz
	var qvar = getUrlVars();
	console.log("q"+qvar['sec']+".json");
	
		quizMaster.execute("q"+qvar['sec']+".json", ".quizdisplay", function(result) {
				
		});
	});
	$(function() {
  setTimeout(hideSplash, 2000);
});

function hideSplash() {
  $.mobile.changePage("#index", "fade");
}
	$(document).on('pagebeforeshow', '#index', function(){ 
	//window.plugins.AdMob.createInterstitialView();
	//window.plugins.AdMob.showInterstitialAd(true,function(){},function(e){alert(JSON.stringify(e));});
 var $this = $( this ),
        theme = $this.jqmData( "theme" ) || $.mobile.loader.prototype.options.theme,
        msgText = $this.jqmData( "msgtext" ) || $.mobile.loader.prototype.options.text,
        textVisible = $this.jqmData( "textvisible" ) || $.mobile.loader.prototype.options.textVisible,
        textonly = !!$this.jqmData( "textonly" );
        html = $this.jqmData( "html" ) || "";
    $.mobile.loading( "show", {
            text: msgText,
            textVisible: textVisible,
            theme: theme,
            textonly: textonly,
            html: html
    });
});