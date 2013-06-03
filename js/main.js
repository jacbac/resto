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

  var Page = (function() {
    
    var config = {
        $bookBlock : $( '#bb-bookblock' ),
        $navNext : $( '#bb-nav-next' ),
        $navPrev : $( '#bb-nav-prev' )
      },
      init = function() {
        config.$bookBlock.bookblock( {
          orientation : 'horizontal',
          speed : 700
        } );
        initEvents();
      },
      initEvents = function() {

        var $slides = config.$bookBlock.children();
        
        // add navigation events
        config.$navNext.on( 'click touchstart', function() {
          config.$bookBlock.bookblock( 'next' );
          return false;
        } );

        config.$navPrev.on( 'click touchstart', function() {
          config.$bookBlock.bookblock( 'prev' );
          return false;
        } );

        // add keyboard events
        $( document ).keydown( function(e) {
          var keyCode = e.keyCode || e.which,
            arrow = {
              left : 37,
              up : 38,
              right : 39,
              down : 40
            };

          switch (keyCode) {
            case arrow.up:
              config.$bookBlock.bookblock( 'prev' );
              e.preventDefault();
              break;
            case arrow.down:
              config.$bookBlock.bookblock( 'next' );
              e.preventDefault();
              break;
          }

        } );
      };

      return { init : init };

  })();

  Page.init();
  
  /**
   * Google Map API v3
   */
  var map;
  function initialize() {
    var myLatlng = new google.maps.LatLng(47.220486,-1.562864);

    var mapOptions = {
      zoom: 13,
      center: myLatlng,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    
    map = new google.maps.Map(document.getElementById('big-map'),
        mapOptions);

    var marker = new google.maps.Marker({
        position: myLatlng,
        map: map,
        title: 'Restaurant Pierrot Gourmet'
    });
  }

   //        '<h4>Restaurant Pierrot Gourmet</h4><p>28 Place Viarme<br />44100 Nantes</p><p>Parking place Viarme gratuit<br />le midi entre 12h-14h et le soir après 19h</p>'

  google.maps.event.addDomListener(window, 'load', initialize);

});