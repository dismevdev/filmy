/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
		
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
		document.addEventListener('resume', this.onDeviceResume, false);
		
			document.addEventListener('backbutton', backButtonCallback, false);
		  
		function backButtonCallback() {
			navigator.notification.confirm('Maidaan chhodkar bhaag rahe ho thakur?',confirmCallback);
		}
		function confirmCallback(buttonIndex) {
		   if(buttonIndex == 1) {
			  navigator.app.exitApp();
		   return true;
		}
 }
		
		
		if(( /(ipad|iphone|ipod|android|windows phone)/i.test(navigator.userAgent) )) {
            document.addEventListener('deviceready', this.test, false);
        } else {
            this.test();
        }
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    	onDeviceReady: function () {  
        //app.receivedEvent ('deviceready'); 
		console.log('deviceready');
		app.branchInit();
		 var md = cordova.require("cordova/plugin_list").metadata;
		AppRate.preferences.storeAppURL = {

  android: 'market://details?id=com.bollywood.unique'
};

AppRate.promptForRating(false);
		//console.log(md);
		
       
    },
  onDeviceResume: function() {
    app.branchInit();
  },
	
	initAd: function (){
    },
	 initApp: function() {
        this.initAd();
        // display the banner at startup
        //window.plugins.AdMob.createBannerView();
      
        // display the interstitial at startup
        //window.plugins.AdMob.createInterstitialView();
    },
	test: function(){
		
		
	  if ( window.plugins && window.plugins.AdMob ) {
		  
    	    var ad_units = {
				ios : {
					banner: 'iosca-app-pub-6869992474017983/4806197152',
					interstitial: 'iosca-app-pub-6869992474017983/7563979554'
				},
				android : {
					banner: 'ca-app-pub-9119012238480128/6612521064',
					interstitial: 'ca-app-pub-9119012238480128/2914230468'
				},
				wp8 : {
					banner: 'wpca-app-pub-6869992474017983/8878394753',
					interstitial: 'wpca-app-pub-6869992474017983/1355127956'
				}
    	    };
    	    var admobid = "";
			
    	    if( /(android)/i.test(navigator.userAgent) ) {
    	    	admobid = ad_units.android;
				
    	    } else if(/(iphone|ipad)/i.test(navigator.userAgent)) {
    	    	admobid = ad_units.ios;
				
    	    } else {
    	    	admobid = ad_units.wp8;
			
    	    }
            window.plugins.AdMob.setOptions( {
                publisherId: admobid.banner,
                interstitialAdId: admobid.interstitial,
                bannerAtTop: true, // set to true, to put banner at top
                overlap: false, // set to true, to allow banner overlap webview
                offsetTopBar: false, // set to true to avoid ios7 status bar overlap
                isTesting: false, // receiving test ad
                autoShow: true // auto show interstitial ad when loaded
            });
            //this.rtest();
            
        } else {
            console.log( 'admob plugin not ready' );
        }	
      
	},
branchInit: function() {
    // Branch initialization
    Branch.initSession(function(data) {
      if (data['+clicked_branch_link']) {
        // read deep link data on click
        //alert('Deep Link Data: ' + JSON.stringify(data))
      }
    });
  }
	
};