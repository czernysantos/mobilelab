$(function() {

  $(document).delegate('.show-near', 'click', function(e) {
    e.preventDefault();
	
    
	var $people = $('ul.list-original'),
	$peopleli = $people.children('li');

$peopleli.sort(function(a,b){
	var an = a.getAttribute('data-distance'),
		bn = b.getAttribute('data-distance');

return $(a).data('distance') > $(b).data('distance') ? 1 : -1;
addmylocation();
//	if(an > bn) {
//		return 1;
//	}
//	if(an < bn) {
//		return -1;
//	}
//	return 0;
});

$peopleli.detach().appendTo($people);
	
	   // copy list
 //   var list = $('.list-original').clone();
    
    // sort list
   // reOrder(list.find('li'), $('ul.list-sorted'));

  });
});

var geodata;
var geodatalocal;

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(success, error);
  
}

function error(msg) {  
  // console.log(msg);
  
   $(".geo")
        .show()
        .html("<p>It seams that you're phone not support GPS, please connect to WIFI or MOBILE DATA</p>"); 
	
	// getlocation_onclick();
	 var deafultlatlng = '13.164,123.822'
	 success(deafultlatlng)
	
}

function success(position) {
  
  var url = "http://maps.googleapis.com/maps/api/geocode/json?latlng=" + position.coords.latitude + "," + position.coords.longitude + "&sensor=true";
  
  geodata = position.coords;
  
  $.ajax({
    url: url,
    type: 'GET',
    dataType: 'json',
    success: function(data) {
      if(data.status === "OK")
      {
        var address = data.results[1].formatted_address;
        $(".geo")
        .show()
        .html("<p style='font-size: 10px;'>Your current location <i>" + address + "</i></p>");    
       
       // console.log(data);
        addDistances($('.list-original li'), position.coords);
		// localStorage.clear();
        ls_save('curpostion',position.coords.latitude + "," + position.coords.longitude);
        //ls_save('longitude',position.coords.longitude);
      //  ls_save('accuracy',position.coords.accuracy);
       // ls_save('altitude',position.coords.altitude);
        //ls_save('altitudeAccuracy',position.coords.altitudeAccuracy);
        //ls_save('heading',position.coords.heading);
        //ls_save('speed',position.coords.speed);
		// alert("Data saved!");
		
				
      }
    },
    error: function(jqXHR, textStatus, errorThrown) {
      //console.log(errorThrown);
    }
  });
}
function addDistances(listOriginal, geoData)
{
  $(listOriginal).each(function(){
  
  // var listainner = document.getElementById('listsdata'),
	//	items = listainner.innerHTML;

    //items = "<a href='#'>LINK</a>"; 

	
    var lat = $(this).data("lat"),
        lng = $(this).data("lng"),
        d = getDistance(lat, geodata.latitude, lng, geodata.longitude),
        km = (Math.floor(d * 100)/100),
        mi = (Math.floor((d*0.621371) * 100)/100);
		//para = document.getElementById('listsdata');
		// textstr = "Approx " + km + " km from you";
		//var el = $(document.getElementById("distance-data"))
	    // el.text(textstr);

$(this)		
    //  .attr("data-distance", d)
	       .attr("data-distance", km)
 		
var textstr = "Approx " + km + " km from you";


	//.attr("entry)		
//    $(this).append(text);
     //var theid = $(this+' li a').attr('id');
	// alert(theid);
	 //$('#'+theid).append("<p>" + textstr + "</p>");
      
  	 //var el = $(document.getElementsByClassName("distancevalstr"));
//for(var i = 0, size = el.length; i< size; i++){
   // el.append("<p>" + textstr + "</p>");
//}
      var x = $(this).attr('id');
      $('#'+x+' a').append("<p>" + textstr + "</p>");  
	  });











}
function reOrder(listOriginal, listClone) {
  $(listOriginal).sort(sortAlpha).appendTo(listClone);
}

function sortAlpha(a, b) {
  return $(a).data('distance') > $(b).data('distance') ? 1 : -1;
}

// Haversine formula
// http://www.movable-type.co.uk/scripts/latlong.html
function getDistance(lat1, lat2, lon1, lon2) {
  var R = 6371, // km
      dLat = (lat2-lat1).toRad(),
      dLon = (lon2-lon1).toRad();
  
  lat1 = parseFloat(lat1).toRad();
  lat2 = parseFloat(lat2).toRad();

  var a = Math.sin(dLat/2) * Math.sin(dLat/2) +      
          Math.sin(dLon/2) * Math.sin(dLon/2) *
          Math.cos(lat1) * Math.cos(lat2),
      c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)),
      d = R * c;
  return d;
}

// http://stackoverflow.com/a/5260472/28004  
/** Converts numeric degrees to radians **/
//if (typeof(Number.prototype.toRad) === "undefined") {
  Number.prototype.toRad = function() {
    return this * Math.PI / 180;
  };
//}  




function ls_save(key,value) {
        localStorage.setItem(key, value); 
    }
function ls_get(key,value) {
     //   localStorage.getItem(key,value);
}
function getlocation_onclick() {
       
	
};

