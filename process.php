<?php

$function = $_POST['function'];

$log = array();
$chatid = $_POST['chatid'];
switch ($function) {
	
	case ('getState'):
		if (file_exists('chat'.$chatid.'.txt')) {
			$lines = file('chat'.$chatid.'.txt');
		}
		$log['state'] = count($lines);
		break;
	
	case ('update'):
		if (isset($_POST['state'])){ 
			$state = $_POST['state'];
		}
		if (file_exists('chat'.$chatid.'.txt')) {
			$lines = file('chat'.$chatid.'.txt');
		}
		$count = count($lines);
		if ($state == $count) {
			$log['state'] = $state;
			$log['text']  = false;
			
		} else {
			$text         = array();
			$log['state'] = $state + count($lines) - $state;
			foreach ($lines as $line_num => $line) {
				if ($line_num >= $state) {
					$text[] = $line = str_replace("\n", "", $line);
				}
				
			}
			$log['text'] = $text;
		}
		
		break;
	
	case ('send'):
		$nickname  = htmlentities(strip_tags($_POST['nickname']));
		$reg_exUrl = "/(http|https|ftp|ftps)\:\/\/[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(\/\S*)?/";
		$message   = htmlentities(strip_tags($_POST['message']));
		if (($message) != "\n") {
			
			if (preg_match($reg_exUrl, $message, $url)) {
				$message = preg_replace($reg_exUrl, '<a href="' . $url[0] . '" target="_blank">' . $url[0] . '</a>', $message);
			}
			
			
			fwrite(fopen('chat'.$chatid.'.txt', 'a'), "<div class='" . $nickname . "'><div class='name'>" . $nickname . "</div><div class='message'>" . $message = str_replace("\n", " ", $message) . "</div></div>" . "\n");
		}
		break;

	case ('sysMessage'):
		$message   = ($_POST['message']);		
		fwrite(fopen('chat'.$chatid.'.txt', 'a'), "<div class='system-message-wrap'><div class='system-message'>" . $message . "</div></div>" . "\n");
		break;
		
}

echo json_encode($log);

?>