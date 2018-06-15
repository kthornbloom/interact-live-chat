/* 
Created by: Kenrick Beckett

Name: Chat Engine
*/

var instanse = false;
var state;
var mes;
var file;

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
						'file': file
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
					'file': file
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
						'file': file
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
									body: data.text[i],
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
					'file': file
				 },
			 dataType: "json",
			 success: function(data){
				 updateChat();
			 },
		});
}