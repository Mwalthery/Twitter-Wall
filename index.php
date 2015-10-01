<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
		<meta name="description" content="">
		<meta name="author" content="">
		<link rel="icon" href="images/favicon.ico">

		<title>Twitter Wall</title>

		<!-- Bootstrap core CSS -->
		<link href="css/bootstrap.min.css" rel="stylesheet">
		<!-- Bootstrap theme -->
		<link href="css/bootstrap-theme.min.css" rel="stylesheet">

		<!-- Custom styles for this template -->
		<link href="css/theme.css" rel="stylesheet">
		<link href="css/twall.css" rel="stylesheet">

		<!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
		<!--[if lt IE 9]>
		<script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
		<script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
		<![endif]-->
	</head>

	<body role="document">

		<div class="container theme-showcase" role="main">

			<!-- Main jumbotron for a primary marketing message or call to action -->
			<div id="jumbo" class="jumbotron">
				<h1 id="jumboTweet">Welcome to Twitter Wall</h1>
				<p id="jumboUser">@MatthewZipkin</p>
			</div>

			<!-- old tweet stack up here -->		
			<div id="oldTweets" class="row"></div>

			</div> <!-- /container -->


		<div class="control">
			
			<div class="controlObject">
				<div class="controlButton" id="statusLight">STANDBY</div>
			</div>
			
			<div class="controlObject">
				<div class="controlButton" id="pauseButton">PAUSE</div>
			</div>
			
			<div class="controlObject">			
					<span>#</span><input id="hashTagInput" type="text" class="form-control" aria-describedby="basic-addon1">
			</div>
			
		</div>



		<!-- Bootstrap core JavaScript
		================================================== -->
		<!-- Placed at the end of the document so the pages load faster -->
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
		<script src="js/bootstrap.min.js"></script>
		<script src="js/twall.js"></script>
		<!-- IE10 viewport hack for Surface/desktop Windows 8 bug -->
		<script src="js/ie10-viewport-bug-workaround.js"></script>
	</body>
</html>
