<?php

$conn = mysqli_connect('localhost','sohamv_vmdb','vm@123','sohamv_vmdb');

if(mysqli_connect_errno()){
	echo "Failed to load db".mysqli_connect_errno();
}

$did = isset($_REQUEST['device_id']) ? intval($_REQUEST['device_id']) : null;

$result = mysqli_query($conn,"Select * from `Position Map` where `device_id`=$did and `count`>3 ");

$list = array();
foreach ($result as $key) {
	$list[] = array('lat'=>$key['lat'],'long'=>$key['longi'],'count'=>$key['count']);
}

header('Content-type: application/json');
echo json_encode(array('response'=>'success','list'=>$list));

?>