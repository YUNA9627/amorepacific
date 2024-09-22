const $pointer = $('.pointer');
const $historyBarOn = $('.history_bar_on');
const $historyBar = $('.history_bar');
const $items = $('.item');

const pointerMaxScroll = $historyBar.height() - $pointer.height();
const historyMaxScroll = $historyBar.height() - $historyBarOn.height();
const listInnerHeight = $('.cont_list').innerHeight();


$(window).scroll(function(){
  const scrollTop = $(window).scrollTop();
  const pointerNewTop = Math.min(scrollTop, pointerMaxScroll);
  const historyNewTop = Math.min(scrollTop, pointerMaxScroll);
  
  $pointer.css('top', pointerNewTop + 'px');
  $historyBarOn.css('height', historyNewTop + 'px');
});

$(window).scroll(function(){
  var scrollPos = $(window).scrollTop() + $(window).height() / 3;

  $items.each(function(){
      var $this = $(this);
      var offsetTop = $this.offset().top;
      var offsetBottom = offsetTop + $this.outerHeight();

      if (scrollPos >= offsetTop && scrollPos < offsetBottom) {
          $this.addClass('active');
      } else {
          $this.removeClass('active');
      }

      $('.cont_list > ul').each(function(){
        var $this = $(this);
        var $child = $this.find('li');
        
        if ($child.hasClass('active')) {
          $this.addClass('active');
        } else {
          $this.removeClass('active');
        }    
      });

      $('.cont_list ul').each(function(index){
        if ($(this).hasClass('active')) {
          $('.cont_nav .inner button').removeClass('active');
          $('.cont_nav .inner button').eq(index).addClass('active');
        }
      });
    });
    $('.cont_list ul').scroll(function(){
      var index = $(this).index();
      $('.cont_list ul').removeClass('active');
      $(this).addClass('active');
      $('button .inner button').removeClass('active');
      $('.cont_nav .inner button').eq(index).addClass('active');
    });

    $('.cont_list ul').each(function(index){
      if($(this).hasClass('active')){
          $('.img_cont').eq(index).removeClass('disShowMotion');
          $('.img_cont').eq(index).addClass('showMotion');
      }else{
          $('.img_cont').eq(index).removeClass('showMotion');
          $('.img_cont').eq(index).addClass('disShowMotion');
      }
    });

  $('.cont_nav .inner button').click(function() {
    $('.cont_nav .inner button').removeClass('active');
    $(this).addClass('active');
    
    var index = $(this).index();
    var targetUl = $('.cont_list ul').eq(index);
    
    $('html, body').stop().animate({
        scrollTop: targetUl.offset().top
    }, 10);
  });
});