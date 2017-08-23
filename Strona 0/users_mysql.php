<?php
	header("Access-Control-Allow-Origin: *");
	header('Content-Type: text/html; charset=utf-8');

	$conn = new mysqli("localhost", "root", "123", "test");
	
	/* check connection */
	if (mysqli_connect_errno()) {
	    printf("Connect failed: %s\n", mysqli_connect_error());
	    exit();
	}
	//printf("Initial character set: %s\n", $mysqli->character_set_name());

	/* change character set to utf8 */
	if (!$conn->set_charset("utf8")) {
	    	printf("Error loading character set utf8: %s\n", $conn->error);
	    	exit();
	} else {
	      //printf("Current character set: %s\n", $mysqli->character_set_name());	
		$result = $conn->query("SELECT id, firstName, lastName FROM user");

		if ($conn->connect_error) {
	    		die("Connection failed: " . $conn->connect_error);
		} 	
		$outp = "";
		while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
		    if ($outp != "") {$outp .= ",";}
		    $outp .= '{"id":"'.$rs["id"].'",';
		    $outp .= '"firstName":"'.$rs["firstName"].'",';
		    $outp .= '"lastName":"'.$rs["lastName"].'"}';
		}
		$outp ='{"records":['.$outp.']}';
	}
	$conn->close();

	echo($outp);
?>

