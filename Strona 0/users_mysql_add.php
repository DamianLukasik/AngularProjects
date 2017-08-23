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

	if ((isset($_GET ['name'])) && (isset($_GET ['lastname']))){
        	$name = $_GET ['name'];
		$lastname = $_GET['lastname'];
		$dateBirthday = date("Y-m-d");
        	$add = "INSERT INTO employee (firstName, lastName, dateBirthday) VALUES ('".$name."', '".$lastname."', '".$dateBirthday."')";
        	$result = $conn->query($add);
    	}

	$conn->close();

	echo($outp);
?>

