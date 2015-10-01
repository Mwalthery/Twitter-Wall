<?
	
	require_once('twitterAPI_secret_tokens.php');
	
// ^ this file should look like this, but with your actual keys:
//
//	$settings = array(
//		'consumer_key' => 'XXXXXXXXXX',
//		'consumer_secret' => 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
//		'oauth_access_token' => 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
//		'oauth_access_token_secret' => 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
//	);
//
// ---------------------------------------------------------------------------
	
	require_once('functions.php');
	require_once('TwitterAPIExchange.php');
	
	if (empty($_REQUEST['hashtagRequest']))
		$hashtagRequest='Bitcoin';
	else
		$hashtagRequest=$_REQUEST['hashtagRequest'];
	
	if (empty($_REQUEST['lastID']))
		$lastID=0;
	else
		$lastID=$_REQUEST['lastID'];
	
	$url = 'https://api.twitter.com/1.1/search/tweets.json';
	$requestMethod = 'GET';	
	$getfield = '?q=#' . $hashtagRequest . '-filter:retweets&since_id=' . $lastID;
	
	$twitter = new TwitterAPIExchange($settings);
	$rawResponse = $twitter->setGetfield($getfield)
				 ->buildOauth($url, $requestMethod)
	             ->performRequest();
	                
    $responseObject = json_decode($rawResponse);
    
    $response = array();
    $response['tweets'] = array();
	$response['raw'] = $rawResponse;
	
	//if (!empty($responseObject->statuses)){
		foreach ($responseObject->statuses as $tweet){
	
			$thisTweet = array();
		
			$thisTweet['text'] = (string)$tweet->text;
			$thisTweet['timestamp'] = $tweet->created_at;
			$thisTweet['username'] = $tweet->user->screen_name;
			$thisTweet['img'] = $tweet->user->profile_image_url;
			$thisTweet['id'] = $tweet->id_str;
		//  $thisTweet['raw'] = $tweet;
		
			array_push($response['tweets'], $thisTweet);
	
		}
//	}    
	//	$response['lastID'] = $lastID;
	//	$response['hashtagRequest'] = $hashtagRequest;
    
	echo json_encode($response);	            
	     
?>