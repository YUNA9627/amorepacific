const $pointer = $('.pointer');
const $historyBarOn = $('.history_bar_on');
const $historyBar = $('.history_bar');
const $items = $('.item');
const $contList = $('.cont_list');

const pointerMaxScroll = $historyBar.height() - $pointer.height();
const historyMaxScroll = $historyBar.height() - $historyBarOn.height();
const listInnerHeight = $contList.innerHeight();
const contListOffsetTop = $contList.offset().top;

$(window).scroll(function(){
  const scrollTop = $(window).scrollTop();
  
  if (scrollTop > contListOffsetTop) {
    const pointerNewTop = Math.min(scrollTop - contListOffsetTop, pointerMaxScroll);
    const historyNewTop = Math.min(scrollTop - contListOffsetTop, historyMaxScroll);
    
    $pointer.css('top', pointerNewTop + 'px');
    $historyBarOn.css('height', historyNewTop + 'px');
  }else {
    $pointer.css('top','0px');
    $historyBarOn.css('height','0px');
  }

  var scrollPos = $(window).scrollTop() + $(window).height() / 3;

  $items.each(function(){
      var $this = $(this);
      var offsetTop = $this.offset().top;
      var offsetBottom = offsetTop + $this.innerHeight() - 30;

      if (scrollPos >= offsetTop && scrollPos < offsetBottom) {
          $this.addClass('active');
          $('.cont_nav').addClass('visible');
      } else {
          $this.removeClass('active');
          $('.cont_nav').removeClass('visible');
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
});

$(window).scroll(function(){
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

    $('.img_cont').each(function(){
      if($(this).hasClass('showMotion')){
        $(this).find('.first > img').removeClass('false');
        $(this).find('.first > img').addClass('show');
      }else{
        $(this).find('.first > img').removeClass('show');
        $(this).find('.first > img').addClass('false');
      }
    })

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

$(window).scroll(function(){
  if($(this).scrollTop() > 450){
    $('.history_show').addClass('visible');
    $('.cont_nav').addClass('visible');
  }else{
    $('.history_show').removeClass('visible');
    $('.cont_nav').removeClass('visible');
  }
})