$(document).ready(function(){

  // Collapse nav menu on click
  $('.nav li a').on('click', function() {
    $('.collapse').collapse('hide');
  });

  /**
   * Smooth Scroll
   */  
  $('.nav li a').on('click', function() {
    var size = $(document).width(),
      minus = 100,
      href = $(this).attr('href');
    if(size < 768)
      minus = 80;
    $('html, body').animate( {
      scrollTop: $(href).offset().top - minus
    }, 1200);    
  });

  $('.btn').on('click', function() {
    $('html, body').animate( {
      scrollTop: $('#move').offset().top - 60
    }, 800); 
  });

  /**
   * Hisrc @ https://github.com/teleject/hisrc
   */  
  $(".hisrc img").hisrc();

  /**
   * RSlides @ http://responsiveslides.com/
   */
  $('#presentation-rslides .rslides').responsiveSlides({
    auto: true,
    timeout: 10000,
    speed: 800,
    nav: true,
    maxwidth: '800'
  });

  $('#ardoise-rslides .rslides').responsiveSlides({
    auto: false,
    timeout: 10000,
    speed: 800,
    pager: true,
    maxwidth: '800',
    before: function(){
      var $actualBtn = $('li.rslides_here'); 
      $actualBtn.hide();
      switch ($actualBtn.text()) {
        case 'Voir l\'ardoise du jour':
          $('li.rslides2_s2, li.rslides2_s3').show();
          break;
        case 'Voir l\'ardoise du mois':
          $('li.rslides2_s1, li.rslides2_s3').show();
          break;
        case 'Voir nos vins du moment':
          $('li.rslides2_s1, li.rslides2_s2').show();
          break;
      }
    }
  });

  // Switch du text slide-btn
  $('li.rslides_here').hide();
  $('a.rslides2_s1').text('Voir l\'ardoise du jour');  //onload hide first
  $('a.rslides2_s2').text('Voir l\'ardoise du mois');
  $('a.rslides2_s3').text('Voir nos vins du moment');

  $('#events-rslides .rslides').responsiveSlides({
    auto: false,
    timeout: 5000,
    speed: 500,
    nav: false,
    maxwidth: '800',
    before: function(){
      var num = $('.rslides2_on').attr('id').slice(-1); // image d'origine
      var i = parseInt(num)+1;
      $.getJSON('data/events.json', function(data){
        $('.events-text h3').empty().append(data[i].titre);
        $('.events-text .date').empty().append(data[i].date);
        $('.events-text .para-first').empty().append(data[i].paragraphe[0].text);
        $('.events-text .para-last').empty().append(data[i].paragraphe[1].text);
      });
    }
  });

  /**
   * Google Map API v3
   */
  var map;
  function initialize() {
    var mapOptions = {
      zoom: 13,
      panControl: false,
      center: new google.maps.LatLng(47.216303,-1.556454),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    map = new google.maps.Map(document.getElementById('big-map'), mapOptions);

    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(47.220486,-1.562864),
        map: map,
        animation: google.maps.Animation.DROP,
        title: 'Restaurant Pierrot Gourmet - Cliquer pour zoomer'
    });

    // google.maps.event.addListener(marker, 'click', toggleBounce);
    google.maps.event.addListener(marker, 'click', function() {
      map.setZoom(16);
      map.setCenter(marker.getPosition());
    });
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
