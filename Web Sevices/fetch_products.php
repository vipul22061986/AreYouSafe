<?php

$conn = mysqli_connect('localhost','sohamv_vmdb','vm@123','sohamv_vmdb');

if(mysqli_connect_errno()){
	echo "Failed to load db".mysqli_connect_errno();
}

$did = isset($_REQUEST['device_id']) ? ($_REQUEST['device_id']) : '1';

$result = mysqli_query($conn,"Select * from `Purchase list` where `device_id`='".$did."'");

$resultset = array();

while ($row = mysqli_fetch_assoc($result)) {
	# code...
	$resultset[] = array('name'=>$row['name'],'price'=>$row['price']);
}

header('Content-type: application/json');
echo json_encode(array('posts'=>$resultset));

mysqli_close($conn);
?>