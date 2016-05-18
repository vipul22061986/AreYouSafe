<?php

$conn = mysqli_connect('localhost','sohamv_vmdb','vm@123','sohamv_vmdb');

if(mysqli_connect_errno()){
	echo "Failed to load db".mysqli_connect_errno();
}

$did = isset($_REQUEST['device_id']) ? ($_REQUEST['device_id']) : null;
// $name = strtoupper($_REQUEST['name']);
$lat = $_REQUEST['lat'];
$long = $_REQUEST['long'];

$result = mysqli_query($conn,"Select * from `Position Map` where `device_id`='".$did."' and `lat`='".$lat."' and `longi`='".$long."' ");

if(mysqli_num_rows($result)==1){
	$row = mysqli_fetch_assoc($result);
	$newcount = $row['count']+1;
	$query = "UPDATE `Position Map` set `count`=$newcount where `device_id`='".$did."' and `lat`='".$lat."' and `longi`='".$long."' ";
}else{
	$newcount = 1;
	$query = "INSERT INTO `Position Map` (device_id,lat,longi,count) VALUES ('".$did."','".$lat."','".$long."',$newcount) ";
}

header('Content-type: application/json');
if($result = mysqli_query($conn,$query)){
	// echo json_encode(array('response'=>'success','count'=>$newcount));
	echo json_encode(array('response'=>'success'));
}else{
	echo json_encode(array('response'=>'error'));
}

?>