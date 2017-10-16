/* global $,window */
var answed = "";
var quizMaster = (function () {
	var name;
	var data;
	var loaded = false;
	var displayDom;
	var successCbAlias;
	var larr = {};
	var count = 0;
	var num = 0;
	var dt = "";
	
	function nextDumb() {
		
		if(dt.length-1 == num)
			num=0;
		else
		num = num+1;
		displayDumb("mv.json");
		
	}
	
	function shuffle() {
		console.log(num);
		num =Math.floor(Math.random()*dt.length);
		
		displayDumb("mv.json");
		
	}

	function nextHandler(e) {
		e.preventDefault();
console.log("asdf");
		var status = getUserStatus();
console.log(status);
		//if we aren't on the intro, then we need to ensure you picked something
		if(status.question >= 0) {
			var checked = $("input[type=radio]:checked", displayDom);
			if(checked.length === 0) {
				//for now, an ugly alert
				window.alert("Tum jawaab diye bina nahi jaa sakte!");
				return;
			} else {
				status.answers[status.question] = checked.val();
				
				if(checked.val()== data.questions[status.question].correct){
					
					answed = "T";
				
				}else{
					
					answed = "F";
				}
				
			}
		} 
		status.question++;
		storeUserStatus(status);
		
		displayQuiz(successCbAlias);
	}
	
		
	function sleepFor( sleepDuration ){
    var now = new Date().getTime();
    while(new Date().getTime() < now + sleepDuration){ /* do nothing */ } 
}

	function displayQuiz(successCb) {
	
		//We copy this out so our event can use it later. This feels wrong
		successCbAlias = successCb;
		var current = getQuiz();
		var html;
		

		if(current.state === "introduction") {
			
			html = "<h2>Introduction</h2><p>" + current.introduction + "</p>" + nextButton();
			displayDom.html(html).trigger('create');
			$('#flbk').show();
			window.plugins.AdMob.createBannerView();
			console.log(current.state);
		} else if(current.state === "inprogress") {
			$('#flbk').show();
			console.log(current.state);
			console.log(current.state);
			html = "<h2>" + current.question.question + "</h2><form><div data-role='fieldcontain'><fieldset data-role='controlgroup'>";
			ans ="";
			for(var i=0; i<current.question.answers.length; i++) {
				html += "<input type='radio' name='quizMasterAnswer' id='quizMasterAnswer_"+i+"' value='"+i+"'/><label for='quizMasterAnswer_"+i+"'>" + current.question.answers[i] + "</label>";
				ans += i+1;
				ans += ": "+current.question.answers[i]+" ";
			}
			var share='Fully Filmy Quiz- Please Help: '+current.question.question.replace(/'/g, "\\'")+" -"+ans;
			var blank ='';
			html += "</fieldset></div></form>" + nextButton() + '<button onclick="window.plugins.socialsharing.share(\''+share+'\')">Ask A Friend</button>';
			
			
			displayDom.html(html).trigger('create');
			 
		} else if(current.state === "complete") {
			var perc = current.correct/data.questions.length*100;
			var perf = "";
			if(perc == 100){
				perf = "Blockbuster";
			}
			else if(perc >= 80){
				perf = "Superhit";
			}
			else if(perc >= 60){
				perf = "Hit";
			}else if(perc >= 40){
				perf = "Average";
			}else if(perc >= 20){
				perf = "Flop";
			}else if(perc < 20){
				perf = "Super Flop";
			}
				$('#flbk').hide();
			html = "<h2>The End!</h2><p>The "+ data.introduction + " quiz is now complete. You got "+current.correct+" correct out of "+data.questions.length+".</p><p>Your performance was <b>"+perf+"</b></p><p><a href='#' class='gobackint' data-role='button' data-ajax='false' data-inline='true'>Flashback</a></p>";
			loaded = false;
			displayDom.html(html).trigger('create');
			removeUserStatus();
			successCb(current);
			//window.sessionStorage.clear();
		}
		
		
		//Remove previous if there...
		//Note - used click since folks will be demoing in the browser, use touchend instead
		displayDom.off("click", ".quizMasterNext",nextHandler);
		//Then restore it
		displayDom.on("click", ".quizMasterNext",nextHandler);
	
	}
	
	
	
	function displayDumb(successCb) {
	
		//We copy this out so our event can use it later. This feels wrong
			$('#flbk').show();
			
			
			if(dt ==""){
				if(typeof data === "string")
				dt= JSON.parse(data);
			else
				dt= data;
				window.plugins.AdMob.createBannerView();
			}
			html = "<h2>" + dt[num] + "</h2><form><div data-role='fieldcontain'><fieldset data-role='controlgroup'>";
			
			//var share='Fully Filmy Quiz- Please Help: '+current.question.question.replace(/'/g, "\\'");
			var blank ='';
			html += "</fieldset></div></form>" + nextButtonD()+shufButtonD();
			
			
			displayDom.html(html).trigger('create');
			 
			
		//Remove previous if there...
		//Note - used click since folks will be demoing in the browser, use touchend instead
		displayDom.off("click", ".quizMasterNextD",nextDumb);
		//Then restore it
		displayDom.on("click", ".quizMasterNextD",nextDumb);
		displayDom.off("click", ".shufD",shuffle);
		//Then restore it
		displayDom.on("click", ".shufD",shuffle);
	
	}
	
	function getKey() {
		return "quizMaster_"+name;	
	}
	
	function getQuestion(x) {
		return data.questions[x];	
	}
	
	function getQuiz() {
		//Were we taking the quiz already?
		
		var status = getUserStatus();
		if(typeof data === 'string')			
		data = JSON.parse(data);
		if(!status) {
			status = {question:-1,answers:[]};
			storeUserStatus(status);
		}
		//If a quiz doesn't have an intro, just go right to the question
		
		if(status.question === -1 && !data.introduction) {
			status.question = 0;
			storeUserStatus(status);
		}

		var result = {
			currentQuestionNumber:status.question
		};
		
		
		var diff =data.questions.length - 5;
		
		for(var i = data.questions.length-1;i>=10;i--){
			var ab =Math.floor(Math.random()*data.questions.length);
			
		  data.questions.splice(ab, 1);
		  
		}
		
		if(status.question == -1) {
			result.state = "introduction";
			result.introduction = data.introduction;

		} else if(status.question < data.questions.length) {
			
			result.state = "inprogress";
			result.question = getQuestion(status.question);	
			
		} else {
			
			result.state = "complete";
			result.correct = 0;
			
			for(var i=0; i < data.questions.length; i++) {
				
				if(data.questions[i].correct == status.answers[i]) {
					
					result.correct++;	
				}
			}
			
		}
		
		return result;
	}
	
	function getUserStatus() {
		
		var existing = window.sessionStorage.getItem(getKey());
		
		if(existing) {
			
			return JSON.parse(existing);
		} else {
		
			return null;
		}
	}
	
	function nextButton() {
		return "<a href='' id='next' class='quizMasterNext' data-role='button'>Next</a>";	
	}
	function nextButtonD() {
		return "<a href='' id='nextD' class='quizMasterNextD' data-role='button'>Next</a>";	
	}
	function shufButtonD() {
		return "<a href='' id='shufD' class='shufD' data-role='button'>Shuffle</a>";	
	}
	
	function removeUserStatus(s) {
		window.sessionStorage.removeItem(getKey());	
	}
	
	function storeUserStatus(s) {
		window.sessionStorage.setItem(getKey(), JSON.stringify(s));
	}
	
	return {
		backHandler: function() {
		//e.preventDefault();
		
		//$.mobile.changePage( "index.html", { transition: "slideup", changeHash: false });
		loaded= false;


	 
		window.sessionStorage.clear();	
		
		
	//indow.plugins.AdMob.createInterstitialView();
		$.mobile.changePage( "index.html?back=1", { transition: "slideup", changeHash: false });
		
	},backHandler2: function() {
		//e.preventDefault();
		
		//$.mobile.changePage( "index.html", { transition: "slideup", changeHash: false });
		loaded= false;


	 
		window.sessionStorage.clear();	
		count++;
		if(count==3){
		count =0;
	window.plugins.AdMob.createInterstitialView();
		}
		$.mobile.changePage( "index.html?back=1", { transition: "slideup", changeHash: false });
		
	},
		execute: function( url, dom, cb ) {
			//We cache the ajax load so we can do it only once 
			if(url == 'qd.json'){
				if(!loaded) {
				
				$.get(url, function(res, code) {
					
					//Possibly do validation here to ensure basic stuff is present
					name = url;
					data = res;
					
					displayDom = $(dom);
					
					loaded = true;
					displayDumb(cb);
				});
				
			} else {
				
				displayDumb(cb);
			}
			}else{
			if(!loaded) {
				
				$.get(url, function(res, code) {
					
					//Possibly do validation here to ensure basic stuff is present
					name = url;
					data = res;
					
					displayDom = $(dom);
					
					loaded = true;
					displayQuiz(cb);
				});
				
			} else {
				
				displayQuiz(cb);
			}
			
			}
		}
	};
}());