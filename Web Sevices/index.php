<?php

$conn = mysqli_connect('localhost','sohamv_vmdb','vm@123','sohamv_vmdb');

if(mysqli_connect_errno()){
	echo "Failed to load db".mysqli_connect_errno();
}

$did = isset($_REQUEST['device_id']) ? ($_REQUEST['device_id']) : 1;
$name = strtoupper($_REQUEST['name']);
$price = $_REQUEST['price'];

$result = mysqli_query($conn,"Select * from `Purchase list` where `device_id`='".$did."'");
// $result = mysqli_query($conn,"INSERT INTO `Purchase list` (device_id,name,price) VALUES ($did,'".$name."',$price) ");

$resultset = array();
// echo "<pre>";
while ($row = mysqli_fetch_assoc($result)) {
	# code...
	// var_dump($row);
	$resultset[] = array('name'=>$row['name'],'price'=>$row['price']);
}

header('Content-type: application/json');
echo json_encode(array('posts'=>$resultset));

/*echo mysqli_num_rows($result);

echo mysqli_affected_rows($conn).":ROWS AFFECTED:";

echo mysql_free_result($result);

mysqli_close($conn);*/

// echo "</pre>";
?>