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

	if (isset($_GET ['deleteID'])){
        	$id = $_GET ['deleteID'];
        	$delete = "DELETE FROM user WHERE id='$id'";
        	$result = $conn->query($delete);
    	}

	$conn->close();

	echo($outp);
?>

