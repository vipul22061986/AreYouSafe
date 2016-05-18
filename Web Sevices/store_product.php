<?php

$conn = mysqli_connect('localhost','sohamv_vmdb','vm@123','sohamv_vmdb');

if(mysqli_connect_errno()){
	echo "Failed to load db".mysqli_connect_errno();
}

$did = isset($_REQUEST['device_id']) ? ($_REQUEST['device_id']) : null;
$name = strtoupper($_REQUEST['name']);
$price = isset($_REQUEST['price']) ? intval($_REQUEST['price']) : null;

$query = "INSERT INTO `Purchase list` (device_id,name,price) VALUES ('".$did."','".$name."',$price) ";

header('Content-type: application/json');
if($result = mysqli_query($conn,$query)){
	echo json_encode(array('response'=>'success'));
}else{
	echo json_encode(array('response'=>'error'));
}

?>