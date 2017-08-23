<?php

if (isset($_POST['firstName'])) {

    	$firstName = $_POST['firstName'];
	$lastName = $_POST['lastName'];
	$sex = $_POST['sex'];

	$postdata = file_get_contents("data.json");
	$request = json_decode($postdata);

	$firstName = $request->firstName;
	$lastName = $request->lastName;
	$sex = $request->sex;

    	echo "success";
}
