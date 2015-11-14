var lastID = 0;
var defaultHashTag = 'Bitcoin';
var reloadInterval = 6;
var dump;

$(window).load(function(){
	 // init default value
	 $('#hashTagInput').val(defaultHashTag);
	 
	 // hitting enter in hashtag field hides cursor
	 $('#hashTagInput').bind('keyup', function(k){
	 	if (k.keyCode == 13){
	 		this.blur();
	 		clearScreen();
	 		printHeadline();	
	 	}
	 });

	// init status	 
	 $('#pauseButton').data('go','GO');

	// hitting clear button behavior
	 $('#clearButton').bind('click', function(){
	 	clearScreen();
	 });

	 // hitting pause button behavior
	 $('#pauseButton').bind('click', function(){
	 	// get current status
	 	var status = $(this).data('go');
		
		if (status == 'PAUSE'){
			
			// toggle status
			$(this).data('go', 'GO');
			
			// change button to toggle back to whatever we started as
			$(this).html('PAUSE');
			$(this).css('background-color', 'DarkRed');
			
			// indicate new current status
			setStatus('STANDBY', 'gray');
			
		} else {
			// toggle status
			$(this).data('go', 'PAUSE');
			
			// change button to toggle back to whatever we started as
			$(this).html('GO');
			$(this).css('background-color', 'FOrestGreen');
			
			// indicate new current status
			setStatus('PAUSED', 'gray');
		}
	 });
	 
	 // run first loop
	 printHeadline();
 	 getTweets(); 
	 
});

// display operation feedback
function setStatus(status, color){
	console.log(status, color);
	$('#statusLight').css('background-color', color);
	$('#statusLight').html(status);
}

// wait and get more tweets
function reload(){
	setTimeout(function(){
			getTweets();
		}, reloadInterval*1000);
}

// load data from server
function getTweets(){
	// check for PAUSE status
	var status = $('#pauseButton').data('go');
	if (status == 'PAUSE'){
		setStatus('PAUSED', 'gray');
		reload();
		return false;	
	}

	// get hashtag request value, clean it up before submitting
	hashtagInput = $('#hashTagInput').val();
	cleanedHashTagRequest = hashtagInput.replace(/[^a-z0-9]/gi,'');
	hashtagRequest = cleanedHashTagRequest || defaultHashTag;
	
	// go get em!
	setStatus('LOADING', 'chocolate');
	console.log('lastID: ', lastID);
	$.ajax({
		type: 'POST',
		url: 'getTweets.php',
		data: {lastID: lastID, hashtagRequest: hashtagRequest},
		dataType: 'json',
		success: function (response){
			setStatus('SUCCESS', 'DarkGreen');
			
			// server returned nothing "since" latest tweet
			if (response.tweets.length > 0 ){
				console.log(response.tweets.length);
				printTweets(response);
			} else {
				setStatus('NO NEW', 'DarkBlue');
			}
			
			// loop
			reload();
		},
		error: function (a, b, c){
			setStatus('FAIL', 'FineBrick');
			console.log(a, b, c);
			reload();
		}
	});
	return true;
}

// display new tweets
function printTweets(response){
	var tempForLog = JSON.parse(JSON.stringify(response))
	console.log(JSON.stringify(JSON.parse(tempForLog.raw), null, 4));
	console.log(tempForLog);

	// very latest tweet gets separate treatment for jumbotron
	var reverseTweets = response.tweets.reverse();
	var latestTweet = reverseTweets.pop();
	lastID = latestTweet.id;

	// take the latest tweet from jumbo (if not empty) and put it below
	if ( $('#jumboTweet').html()!= '' ){
		var tweetDiv = 	'<div class="newTweet col-sm-4"><div class="tweetText">';
		tweetDiv +=		'<h2>' + $('#jumboTweet').html() + '</h2>';
		tweetDiv +=		'<p>' + $('#jumboUser').html() + '</p>';
		tweetDiv +=		'</div></div>';
		$('#oldTweets').prepend(tweetDiv);
	}
	
	// very latest new tweet gets blown up
	if (typeof latestTweet.media !== 'undefined'){
		latestTweet.text += '<br><img class="tweetedImage" src="' + latestTweet.media + '">';
	}
	
	$('#jumboTweet').html(latestTweet.text);
	$('#jumboUser').html('<img class="userPic" src="' + latestTweet.img + '">' + latestTweet.username);

	// old tweets turn orange with fadeout/in
	$('.newTweet').removeClass('newTweet').addClass('oldTweet');
//	$('.newTweet').css('opacity',0).removeClass('newTweet').addClass('oldTweet').animate({opacity:1},500);
	
	// all other new tweets are green and added lower and smaller
	$.each(reverseTweets, function(i, tweet){
		var tweetDiv = 	'<div class="newTweet col-sm-4"><div class="tweetText">';
		tweetDiv +=		'<h2>' + tweet.text + '</h2>';
		
		if (typeof tweet.media !== 'undefined') {
			tweetDiv +=	'<br><img class="tweetedImage" src="' + tweet.media + '">';
		}
		
		tweetDiv +=		'<p><img class="userPic" src="' + tweet.img + '">' + tweet.username + '</p>';
		tweetDiv +=		'</div></div>';
		
		$('#oldTweets').prepend(tweetDiv);
	});	
}

// clean up the screen
function clearScreen(){
	$('.oldTweet, .newTweet').remove();
	$('#jumboTweet').html('');
	$('#jumboUser').html('');
	
	lastID = 0;
}

// put hashtag on top of screen
function printHeadline(){
	hashtagInput = $('#hashTagInput').val();
	cleanedHashTagRequest = hashtagInput.replace(/[^a-z0-9]/gi,'');
	hashtagRequest = cleanedHashTagRequest || defaultHashTag;
	
	$('.headline').html('#' + hashtagRequest);
}
