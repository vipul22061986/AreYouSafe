// JavaScript Document

			src = 'https://maps.googleapis.com/maps/api/js?signed_in=true&callback=initMap';


			function initMap() {
				var myLatLng = {lat: 42.1238065, lng: -80.092094};
	  			var map = new google.maps.Map(document.getElementById('re_routing_map'), {
    			zoom: 16,
    			center: myLatLng
  			});

  			var marker = new google.maps.Marker({
		    position: myLatLng,
		    map: map,
		    title: 'Hello World!'
  		});
			}
			
			  