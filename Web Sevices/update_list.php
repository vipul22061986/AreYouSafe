<?php

$conn = mysqli_connect('localhost','sohamv_vmdb','vm@123','sohamv_vmdb');

if(mysqli_connect_errno()){
	echo "Failed to load db".mysqli_connect_errno();
}

$did = isset($_REQUEST['device_id']) ? ($_REQUEST['device_id']) : null;
$name = strtoupper($_REQUEST['name']);

$result = mysqli_query($conn,"Select * from `Product list` where `device_id`='".$did."' and `name`='".$name."' ");

if(mysqli_num_rows($result)==1){
	$row = mysqli_fetch_assoc($result);
	$newcount = $row['count']+1;
	$query = "UPDATE `Product list` set `count`=$newcount where `device_id`='".$did."' and `name`='".$name."' ";
}else{
	$newcount = 1;
	$query = "INSERT INTO `Product list` (device_id,name,count) VALUES ('".$did."','".$name."',$newcount) ";
}

header('Content-type: application/json');
if($result = mysqli_query($conn,$query)){
	echo json_encode(array('response'=>'success','count'=>$newcount));
}else{
	echo json_encode(array('response'=>'error'));
}

?>