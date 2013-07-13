$(document).ready(function(){

  // Switch text ardoise // TODO toggle() ?
  $('.pt-trig-bottom a').click(function () {
    if($('#move').text() === 'Nos vins du moment') {
      $('#move').text('Notre menu du moment');
      $(this).text('Voir nos vins du moment');
    } else {
      $('#move').text('Nos vins du moment');
      $(this).text('Voir notre menu du moment');
    }
  });

  if($(window).width() > 768){
    $('.pt-trig-bottom .pt-touch-button').attr('href', '#carte');
  }

  // Load JSON data
  $('.slidesjs-navigation').click(function(){
    $('.pres-events h3').empty();
    $('.pres-events p').empty();
    $.getJSON('data/events.json', function(data){
      $('.pres-events h3').append(data[0].titre);
      $('.pres-events .date').append(data[0].date);
      $('.pres-events .test').append(data[0].paragraphe[0].text);
      $('.pres-events .hidden-phone').append(data[0].paragraphe[1].text);
    });
  });

  function getResults(date) {
      $.getJSON(url, null, function(results) {
          searchResults(results, locationType)
      });
  }

  // rslides - http://responsiveslides.com/
  $('#presentation-rslides .rslides').responsiveSlides({
    auto: true,
    timeout: 10000,
    speed: 800,
    nav: true,
    maxwidth: '600',
  });

  $('#events-rslides .rslides').responsiveSlides({
    auto: false,
    timeout: 5000,
    speed: 500,
    nav: true,
    maxwidth: '600',
    before: function(){
      // image de départ via son id number
      var num = $('.rslides2_on').attr('id').slice(-1);
      console.log(num);
      var i = parseInt(num)+1;
      $.getJSON('data/events.json', function(data){
        console.log(data);
        console.log(i);
        $('.events-text h3').empty().append(data[i].titre);
        $('.events-text .date').empty().append(data[i].date);
        $('.events-text .test').empty().append(data[i].paragraphe[0].text);
        $('.events-text .hidden-phone').empty().append(data[i].paragraphe[1].text);
      });
    },
    after: function(){
    }
  });

  // ardoise
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
    var mapOptions = {
      zoom: 13,
      center: new google.maps.LatLng(47.216303,-1.556454),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    map = new google.maps.Map(document.getElementById('big-map'),
        mapOptions);

    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(47.220486,-1.562864),
        map: map,
        animation: google.maps.Animation.DROP,
        title: 'Restaurant Pierrot Gourmet'
    });
    google.maps.event.addListener(marker, 'click', toggleBounce);
  }

  function toggleBounce() {

    if (marker.getAnimation() != null) {
      marker.setAnimation(null);
    } else {
      marker.setAnimation(google.maps.Animation.BOUNCE);
    }
  }

   //'<h4>Restaurant Pierrot Gourmet</h4><p>28 Place Viarme<br />44100 Nantes</p><p>Parking place Viarme gratuit<br />le midi entre 12h-14h et le soir après 19h</p>'

  google.maps.event.addDomListener(window, 'load', initialize);

});
