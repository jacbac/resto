/**
 * https://github.com/codrops/PageTransitions
 */
var PageTransitions = (function() {

  var $main = $('#pt-main'),
    $pages = $main.children('div.pt-page'),
    $btn = $('.pt-touch-button'),
    pagesCount = $pages.length,
    current = 0,
    isAnimating = false,
    endCurrPage = false,
    endNextPage = false,
    animEndEventNames = {
      'WebkitAnimation' : 'webkitAnimationEnd',
      'OAnimation' : 'oAnimationEnd',
      'msAnimation' : 'MSAnimationEnd',
      'animation' : 'animationend'
    },
    // animation end event name
    animEndEventName = animEndEventNames[ Modernizr.prefixed('animation') ],
    // support css animations
    support = Modernizr.cssanimations;
  
  function init() {
    $pages.each(function() {
      var $page = $(this);
      $page.data('originalClassList', $page.attr('class'));
    });

    $pages.eq(current).addClass('pt-page-current');

    $btn.on('click', function() {
      if(isAnimating ) {
        return false;
      }
      var $txt = $(this).txt();
      switch($txt) {
        case 'Voir notre menu du moment':
          nextPage(1);
          break;
        case 'Voir notre carte du mois':
          nextPage(2);
          break;          
        case 'Voir nos vins du moment':
          nextPage(3);
          break;
      }
    } );
  }

  function nextPage(num) {
    if(isAnimating)  {
      return false;
    }
    isAnimating = true;
    
    var $currPage = $pages.eq(current);
    if(current < pagesCount - 1) {
      ++current;
    }
    else {
      current = 0;
    }

    var $nextPage = $pages.eq(current).addClass('pt-page-current'),
      outClass = 'pt-page-flipOutRight',
      inClass = 'pt-page-flipInLeft pt-page-delay500';

    $currPage.addClass(outClass).on(animEndEventName, function() {
      $currPage.off(animEndEventName);
      endCurrPage = true;
      if(endNextPage) {
        onEndAnimation($currPage, $nextPage);
      }
    });

    $nextPage.addClass(inClass).on(animEndEventName, function() {
      $nextPage.off(animEndEventName);
      endNextPage = true;
      if(endCurrPage) {
        onEndAnimation($currPage, $nextPage);
      }
    });

    if(!support) {
      onEndAnimation($currPage, $nextPage);
    }
  }

  function onEndAnimation($outpage, $inpage) {
    endCurrPage = false;
    endNextPage = false;
    resetPage($outpage, $inpage);
    isAnimating = false;
  }

  function resetPage($outpage, $inpage) {
    $outpage.attr('class', $outpage.data('originalClassList'));
    $inpage.attr('class', $inpage.data('originalClassList') + ' pt-page-current');
  }

  init();

  return {init:init};

})();
