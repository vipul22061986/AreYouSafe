  // JavaScript Document
  $(document).ready(function()
	  {
		  document.addEventListener("deviceready", onDeviceReady, false);
		  onDeviceReady();
		  
	  });
	  
	  function onDeviceReady() {
	  device_id = device.uuid;
  }
		  
	/**	var kmlTrack = "LocationHistory.kml";
		//create the map
		var map = new google.maps.Map(document.getElementById("map-canvas_community"), {
			center: new google.maps.LatLng(42.1251, -80.0862),
			zoom: 15,
			mapTypeId: google.maps.MapTypeId.DRIVING
		});
		
		infowindow = new google.maps.InfoWindow({});
		
		//instantiate the geoxml library
		geoXml = new geoXML3.parser({
			map: map,
			infoWindow: infowindow,
			singleInfoWindow: true,
			zoom: true,
			markerOptions: {optimized: false},
			createMarker: function() {},
			//the function called after parsing the kml file
			afterParse: useTheData
		});
		
		geoXml.parse(kmlTrack);
		
		
		//placing a marker on the map
		function createMarker(map, coords, title) {
			var marker = new google.maps.Marker({
				position: coords,
				map: map,
				title: title,
				draggable: false
			});
			return marker;
		}
		
		//Search places having coordinates inside the boxes
		function findPlaces(boxes) {
			var data = "";
			for (var i = 0; i < boxes.length; i++) {
				//form the query string that will be sent via ajax
				if (data != "") {
					data += "&";
				}
				data += "boxes[]=" + boxes[i].getNorthEast().lat() + ":" + boxes[i].getNorthEast().lng() + "-" + boxes[i].getSouthWest().lat() + ":" + boxes[i].getSouthWest().lng();
			}
		
			if (data != "") {
				//make an ajax request to query the database
				//the JSON response
				var response = '[{"title":"Dodona Site","latitude":"39.546135","longitude":"20.785105"},{"title":"Perama Cave","latitude":"39.695000","longitude":"20.846457"},{"title":"Trikorfo Castle","latitude":"39.298645","longitude":"20.367601"}]';
				var places= JSON.parse(response);
				for (i in places) {
					var coords = new google.maps.LatLng(places[i].latitude, places[i].longitude);
					createMarker(map, coords, places[i].title);
				}
			}
		}
		
		function useTheData(doc) {
			var boxes, placemark;
			var distance = 1.6; // km
			var geoXmlDoc = doc[0];
			//instantiate the RouteBoxer library
			var routeBoxer = new RouteBoxer();
			var currentBounds = map.getBounds();
		
			if (!currentBounds) {
				currentBounds = new google.maps.LatLngBounds();
			}
		
			for (var i = 0; i < geoXmlDoc.placemarks.length; i++) {
				placemark = geoXmlDoc.placemarks[i];
				if (placemark.track) {
					if (placemark.track.coordinates.length > 0) {
						var path = [];
						var maxPointsCount = 50;
						//if we have too many points on the track, we skip some
						if (placemark.track.coordinates.length > maxPointsCount) {
							var step = Math.ceil(placemark.track.coordinates.length / maxPointsCount);
							for (var i = 0; i < placemark.track.coordinates.length; i += step) {
								path.push(placemark.track.coordinates[i]);
							}
						} else {
							path = placemark.track.coordinates;
						}
		
						//Display the track using a polyline
						polyline = new google.maps.Polyline(pathOptions = {
							path: path,
							geodesic: true,
							strokeColor: '#FF0000',
							strokeWeight: 2,
							strokeOpacity: 1.0,
							opacity: 0.4,
							map: map
						});
		
						boxes = routeBoxer.box(path, distance);
						findPlaces(boxes, map);
					}
				}
			}
		} **/

		  var map, heatmap;
		// Onload handler to fire off the app.
		  google.maps.event.addDomListener(window, 'load', initialize);
		  	  
		  function initialize() {
			  //alert("initialize");
			  var options = {maximumAge: 4000, timeout: 8000, enableHighAccuracy: true };
				  navigator.geolocation.getCurrentPosition(onSuccessFindMe, onFailFindMe, options);
				  function onSuccessFindMe(position){
					   gpsLatitude = Number((position.coords.latitude).toFixed(4));
					   gpsLongitude = Number((position.coords.longitude).toFixed(4));
					   
					 // alert(gpsLatitude + ","+ gpsLongitude + "," + device_id);
						 // the map's options
			  var mapOptions = {
				  zoom: 12,
				  center: new google.maps.LatLng(gpsLatitude, gpsLongitude),
				  mapTypeId: google.maps.MapTypeId.ROADMAP
			  };
			
			 var latLngs = [];	
			  $.ajax({
					  type:"GET", 
					  url: "http://gannondataservicecenter.com/goeriecrimedata/webservice.php/getalldata", 
					  dataType: "json",
					  success: function(data) {
						  var test = data.data;
							  //alert(JSON.stringify(test) + " response of crime data");
							  $.each(test, function(i, test){
							  //alert(test.lat +","+ test.lng);
							  latLngs.push(new google.maps.LatLng(test.lat, test.lng));	
							  });  // for each end for data
						  }, 
					  error: function(jqXHR) {
							  alert(jqXHR.status + "error");
						  }
				  });
				    
			// the map and where to place it
			
			map = new google.maps.Map(document.getElementById('map-canvas_community'), mapOptions);
			
			var pointArray = new google.maps.MVCArray(latLngs);
		   
			// what data for the heatmap and how to display it
			heatmap = new google.maps.visualization.HeatmapLayer({
			  data: pointArray,
			  radius: 15,
			  opacity : 0.6
			});
   
			// placing the heatmap on the map
			setTimeout(function(){
				  	heatmap.setMap(map);
				  }, 3000);
			
			//alert(device_id + "....." + gpsLatitude + "....." + gpsLongitude);
			
					  var geocoder;
					  var html='';
					  $.ajax({
					  type:"GET",
					  url:"http://gannondataservicecenter.com/virtualmall/lat_long.php?device_id="+device_id+"&lat="+gpsLatitude+"&long="+gpsLongitude, 
					  dataType: "json",
					  success: function(data) {
							  // alert(JSON.stringify(data) + "response of 1st WS");
							   $.ajax({
								  type:"GET", 
								  url: "http://gannondataservicecenter.com/virtualmall/lat_long_list.php?device_id="+device_id, 
								  dataType: "json",
								  success: function(data) {
									  //var test = data.list;
										 // alert(JSON.stringify(data) + "response of 2nd WS");
										  //$.each(test, function(i, test){
										 // alert(test.lat +"===="+ test.long);
									//	latLngs.push(new google.maps.markLatLng(test.lat, test.long));
									for(var i = 0; i < data.list.length; i++) {
										var marker = new google.maps.Marker({
										position: {lat: Number(data['list'][i]['lat'], 4), lng: Number(data['list'][i]['long'], 4)},
										map: map
									  });
									}
									 
										  //});  // for each end for data
									  }, 
								  error: function(jqXHR) {
										  alert(jqXHR.status + "error");
									  }
							  });
							  },
					  error: function(jqXHR) {
									  alert("error "+JSON.stringify(jqXHR));
							  }
				   });
				  }
				  function onFailFindMe(){
					  $.mobile.loading("hide");
					  navigator.notification.vibrate(500);
					  navigator.notification.alert(
					  'Failed loading maps. Please ensure that your gps is turned on!',  // message
					  '',            // title
					  'Please enable GPS of device'                  // buttonName
				  );
  
				  }
		  }
		
		   
		  function CONTINUE(){
			   $.mobile.loading("show", {
						text : "Loading please wait...",
						textVisible : true,
						theme : "c"
				});
			  setTimeout(function(){
				/*$.mobile.changePage("#home", {
				  transition : "none"
			  }); */
			  	location.replace("#home");
			  }, 5000);
		  }
		  
		  
		  $("#community").on("tap", function(){
				 google.maps.event.trigger(map, 'resize');
				 
			  });
		  
		  <!--/******** Route code *************/
		  
		  
	  function REROUTING() {
		  
		   var markers = [
			  {
				  "title": 'My home',  
				  "lat": '42.123635',
				  "lng": '-80.0945457',
				  "description": '822 CHESTNUT STREET.'
			  }
		  ,
			  {
				  "title": 'Gannon University',
				  "lat": '42.1281274',
				  "lng": '-80.0887744',
				  "description": '109 University Square, Erie, PA 16501.'
			  }
		  ,
		  {
				  "title": 'Myrtle Street',
				  "lat": '42.1263958',
				  "lng": '-80.0889078',
				  "description": '600 Myrtle Street'
			  }
		  ,
			  {
				  "title": 'Palumbo Academic Center, Gannon University',
				  "lat": '42.1265736',
				  "lng": '-80.0876248',
				  "description": 'Peach St, Erie, PA 16501'
			  }
		  ,
			  {
				  "title": 'Arbys',
				  "lat": '42.1227216',
				  "lng": '-80.0848685',
				  "description": 'Arbys, West 12th Street, Erie, PA'
			  }
		  ,
			  {
				  "title": 'Gannon Rec Center',
				  "lat": '42.1306701',
				  "lng": '-80.0914854',
				  "description": 'West 4th Street, Erie, PA'
			  }
			  
	  ];
	  
		  var mapOptions = {
			  zoom: 12,
			  center: new google.maps.LatLng(gpsLatitude, gpsLongitude),
			  mapTypeId: google.maps.MapTypeId.ROADMAP
		  };
		  var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
		  var infoWindow = new google.maps.InfoWindow();
		  var lat_lng = new Array();
		  var latlngbounds = new google.maps.LatLngBounds();
		  for (i = 0; i < markers.length; i++) {
			  var data = markers[i]
			  var myLatlng = new google.maps.LatLng(data.lat, data.lng);
			  lat_lng.push(myLatlng);
			  var marker = new google.maps.Marker({
				  position: myLatlng,
				  map: map,
				  title: data.title
			  });
			  latlngbounds.extend(marker.position);
			  (function (marker, data) {
				  google.maps.event.addListener(marker, "click", function (e) {
					  infoWindow.setContent(data.description);
					  infoWindow.open(map, marker);
				  });
			  })(marker, data);
		  }
		  map.setCenter(latlngbounds.getCenter());
		  map.fitBounds(latlngbounds);
   
		  //***********ROUTING****************//
   
		  //Initialize the Path Array
		  var path = new google.maps.MVCArray();
   
		  //Initialize the Direction Service
		  var service = new google.maps.DirectionsService();
   
		  //Set the Path Stroke Color
		  var poly = new google.maps.Polyline({ map: map, strokeColor: '#4986E7' });
   
		  //Loop and Draw Path Route between the Points on MAP
		  for (var i = 0; i < lat_lng.length; i++) {
			  if ((i + 1) < lat_lng.length) {
				  var src = lat_lng[i];
				  var des = lat_lng[i + 1];
				  path.push(src);
				  poly.setPath(path);
				  service.route({
					  origin: src,
					  destination: des,
					  travelMode: google.maps.DirectionsTravelMode.DRIVING
				  }, function (result, status) {
					  if (status == google.maps.DirectionsStatus.OK) {
						  for (var i = 0, len = result.routes[0].overview_path.length; i < len; i++) {
							  path.push(result.routes[0].overview_path[i]);
						  }
					  }
				  });
			  }
		  }
	  }
  
  	function LOGIN() {
			//window.location.href="https://www.google.com/maps/timeline";
			var ref = cordova.InAppBrowser.open('https://www.google.com/maps/timeline', '_blank', 'location=yes');
			$("#login").css("display", "none");
			$("#logout").css("display", "block");			
		}
	function LOGOUT() {
			$("#logout").css("display", "none");
			$("#login").css("display", "block");
			$("#text-1").val('');
		} 
  
	  
	  