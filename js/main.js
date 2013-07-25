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
    maxwidth: '750'
  });

  $('#ardoise-rslides .rslides').responsiveSlides({
    auto: true,
    timeout: 10000,
    speed: 800,
    maxwidth: '800'
  });

  $('#events-rslides .rslides').responsiveSlides({
    auto: false,
    timeout: 5000,
    speed: 500,
    nav: false,
    maxwidth: '750',
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

  // Switch du text titre/btn ardoise
  $('.bottom-btn a').on('click', function () {
    var $oldTitre = $('#move'),
      $this = $(this);

    switch(this.innerHTML) {
      case 'Voir notre menu du moment':
        updateBtn($oldTitre.text(), $this);
        $oldTitre.text('Notre menu du moment');
        break;
      case 'Voir nos vins du moment':
        updateBtn($oldTitre.text(), $this);
        $oldTitre.text('Nos vins du moment');
        break;
      case 'Voir notre carte du mois':
        updateBtn($oldTitre.text(), $this);
        $oldTitre.text('Notre carte du mois');
        break;
    }

    function updateBtn(oldTitre, btn) {
      if(oldTitre === 'Nos vins du moment') {
        btn.text('Voir nos vins du moment');
      } else if(oldTitre === 'Notre menu du moment') {
        btn.text('Voir notre menu du moment');
      } else {
        btn.text('Voir notre carte du mois');
      }
    }
    
  });

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
