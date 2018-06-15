<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="theme-color" content="tomato">
<title>Chat</title>
<link rel="stylesheet" href="style.css" type="text/css" />
</head>

<body onload="setInterval('chat.update()', 1000)">
	<div class="wrap">
<div id="bg"></div>
<div class="wrapper">
	<div id="chat-area"></div>
	
	<form id="send-message-area">
		<textarea id="sendie" maxlength = '100' placeholder="Your Message"></textarea>
	</form>
</div>
</div>

	<script
  src="https://code.jquery.com/jquery-3.3.1.min.js"
  integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
  crossorigin="anonymous"></script>
	<script type="text/javascript" src="chat.js"></script>
	<script type="text/javascript">
	
		// ask user for name with popup prompt    
		var name = prompt("Enter your chat name:", "Guest");
		$('head').append('<style type="text/css">.'+name+'{text-align:right;} .'+name+' .message {background:tomato;margin-right:auto;margin-left:15px;} .'+name+' .message:before{left:auto;right:4px}</style>');
		
		// default name is 'Guest'
		if (!name || name === ' ') {
		   name = "Guest";  
		}
		
		// strip tags
		name = name.replace(/(<([^>]+)>)/ig,"");
		
		// display name on page
		$("#name-area").html("You are: <span>" + name + "</span>");
		
		// kick off chat
		var chat =  new Chat();
		$(function() {
		
			 chat.getState(); 
			 
			 // watch textarea for key presses
			 $("#sendie").keydown(function(event) {  
			 
				 var key = event.which;  
		   
				 //all keys including return.  
				 if (key >= 33) {
				   
					 var maxLength = $(this).attr("maxlength");  
					 var length = this.value.length;  
					 
					 // don't allow new content if length is maxed out
					 if (length >= maxLength) {  
						 event.preventDefault();  
					 }  
				  }  
});
			 // watch textarea for release of key press
			 $('#sendie').keyup(function(e) {   
								 
				  if (e.keyCode == 13) { 
				  
					var text = $(this).val();
					var maxLength = $(this).attr("maxlength");  
					var length = text.length; 
					 
					// send 
					if (length <= maxLength + 1) { 
					 
						chat.send(text, name);  
						$(this).val("");
						
					} else {
					
						$(this).val(text.substring(0, maxLength));
						
					}   
					
					
				  }
			 });
			
		});
	</script>

</body>

</html>