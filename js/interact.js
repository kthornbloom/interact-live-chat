/* 
Created by: Kenrick Beckett

Name: Chat Engine
*/

var instanse = false;
var state;
var mes;
var file;

url = new URL(window.location.href);

if (url.searchParams.get('chatid')) {
	var chatid = url.searchParams.get('chatid');
} else {
	var chatid = new Date().getTime();
	var url = document.location.href+"?chatid="+chatid;
	document.location = url;
}

function Chat () {
	this.update = updateChat;
	this.send = sendChat;
	this.getState = getStateOfChat;
}



//gets the state of the chat
function getStateOfChat(){
	if(!instanse){
		 instanse = true;
		 $.ajax({
				 type: "POST",
				 url: "process.php",
				 data: {  
							'function': 'getState',
						'file': file,
						'chatid':chatid
						},
				 dataType: "json",
			
				 success: function(data){
					 state = data.state;
					 instanse = false;
				 },
			});
	}	 
}

// Chat History
function initChat(){
		
		$.ajax({
			type: "POST",
			url: "process.php",
			data: {
						'function': 'update',
					'state': state,
					'file': file,
					'chatid':chatid
					},
			dataType: "json",
			success: function(data){
				if(data.text){
					$.each(data.text, function(index, value) {
						$('#chat-area').append(value);
					});
					document.getElementById('chat-area').scrollTop = document.getElementById('chat-area').scrollHeight;
				}
			 }
		});
}
initChat();

//Updates the chat
function updateChat(){
	 if(!instanse){
		 instanse = true;
			 $.ajax({
				 type: "POST",
				 url: "process.php",
				 data: {  
						'function': 'update',
						'state': state,
						'file': file,
						'chatid':chatid
						},
				 dataType: "json",
				 success: function(data){
					 if(data.text){
						for (var i = 0; i < data.text.length; i++) {
							$('#chat-area').append($(data.text[i]));
							document.getElementById('chat-area').scrollTop = document.getElementById('chat-area').scrollHeight;
							if(window.Notification && Notification.permission !== "denied") {
								Notification.requestPermission(function(status) {  // status is "granted", if accepted by user
								var n = new Notification('New Message', {
									icon: 'chat.png' // optional
								}); 
							});
						}
						}
					 }
					 
					 instanse = false;
					 state = data.state;
				 },
			});
	 }
	 else {
		 setTimeout(updateChat, 1500);
	 }
}

//send the message
function sendChat(message, nickname){
		updateChat();
		 $.ajax({
			 type: "POST",
			 url: "process.php",
			 data: {  
					'function': 'send',
					'message': message,
					'nickname': nickname,
					'file': file,
					'chatid':chatid
				 },
			 dataType: "json",
			 success: function(data){
				 updateChat();
			 },
		});
}