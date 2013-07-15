$(document).ready(function(){

  /**
   * Local Scroll @ http://flesler.blogspot.fr/2007/10/jquerylocalscroll-10.html
   */  
  $.localScroll();

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
    maxwidth: '600'
  });

  $('#events-rslides .rslides').responsiveSlides({
    auto: false,
    timeout: 5000,
    speed: 500,
    nav: true,
    maxwidth: '600',
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
