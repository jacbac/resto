$(document).ready(function(){
  
  // slides.js
  $(function(){
    $("#slides-big").slidesjs({
      width: 600,
      height: 300,
      navigation: {
        active: false,
        effect: "fade"
      },
      pagination: {
        effect: "fade"
      },
	    effect: {
	      fade: {
	        speed: 800
      	}
      }
    });

    $("#slides-expo").slidesjs({
      width: 600,
      height: 300,
      navigation: {
        active: false,
        effect: "fade"
      },
      pagination: {
        effect: "fade"
      },
	    effect: {
	      fade: {
	        speed: 800
      	}
      }
    });
  });

  /**
   * Big Intro Map with Pointers
   */
   var bigMap = new GMaps({
      div: '#big-map',
      lat: 47.220486,
      lng: -1.562864,
      zoom: 13,
      zoomControl : true,
      zoomControlOpt: {
        style : 'SMALL',
        position: 'TOP_LEFT'
      },
      panControl : false,
    });

    bigMap.addMarker({
      lat: 47.220486,
      lng: -1.562864,
      title: 'Pierrot Gourmet',
      infoWindow: {
        content: 
          '<h4>Restaurant Pierrot Gourmet</h4><p>28 Place Viarme<br />44100 Nantes</p><p>Parking place Viarme gratuit<br />le midi entre 12h-14h et le soir après 19h</p>'
      }
    });


});