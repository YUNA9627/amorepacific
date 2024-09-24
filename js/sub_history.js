const $pointer = $('.pointer');
const $historyBarOn = $('.history_bar_on');
const $historyBar = $('.history_bar');
const $contList = $('.cont_list');
const $items = $('.item');

const pointerMaxScroll = $historyBar.height() - $pointer.height();
const historyMaxScroll = $historyBar.height() - $historyBarOn.height();
const listInnerHeight = $items.outerHeight();
const contListOffsetTop = $contList.offset().top;


$(window).scroll(function(){

  var scrollPos = $(window).scrollTop() + $(window).height() / 3;

  $items.each(function(){
    var $this = $(this);
    var offsetTop = $this.offset().top;
    var offsetBottom = offsetTop + $this.outerHeight();

    if (scrollPos > offsetTop && scrollPos < offsetBottom) {
      let newTop = scrollPos - contListOffsetTop - listInnerHeight;
      let newHeight = scrollPos - contListOffsetTop - listInnerHeight;
      
      $this.addClass('active');
      $('.cont_nav').addClass('visible');
    
      $pointer.css('top', Math.max(newTop, 0) + 'px');
      $historyBarOn.css('height', Math.max(newHeight, 0) + 'px');
    } else {
        $this.removeClass('active');
        $('.cont_nav').removeClass('visible');
    }

    $('.cont_list ul').each(function(){
      var $this = $(this);
      var $child = $this.find('.item');
      
      if ($child.hasClass('active')) {
        $this.addClass('active');
      } else {
        $this.removeClass('active');
      }    
      });

    // const scrollTop = $(window).scrollTop();
  
    // if (scrollTop > contListOffsetTop) {
    //   const pointerNewTop = scrollTop - contListOffsetTop;
    //   const historyNewTop = scrollTop - contListOffsetTop;
      
    //   $pointer.css('top', pointerNewTop + 'px');
    //   $historyBarOn.css('height', historyNewTop + 'px');
    // }else {
    //   $pointer.css('top','0px');
    //   $historyBarOn.css('height','0px');
    // }
  });
});

$(window).scroll(function(){
  $contList.find('ul').each(function(index){
    if($(this).find('li:first-child').hasClass('active')){
      $('.img_cont').eq(index).find('.false img').removeClass('show');
      $('.img_cont').eq(index).find('.false img').addClass('false');
      $('.img_cont').eq(index).find('.first img').removeClass('false');
      $('.img_cont').eq(index).find('.first img').addClass('show');
    }else if($(this).find('li:nth-child(3)').hasClass('active')){
      $('.img_cont').eq(index).find('.first img').removeClass('show');
      $('.img_cont').eq(index).find('.first img').addClass('false');
      $('.img_cont').eq(index).find('.false img').removeClass('false');
      $('.img_cont').eq(index).find('.false img').addClass('show');
    }
  })
})

$(window).scroll(function(){
  $('.cont_list ul').each(function(index) {
    if ($(this).hasClass('active')) {
      $('.cont_nav .inner button').removeClass('active');
      $('.cont_nav .inner button').eq(index).addClass('active');
    }
  });
    
  $('.cont_list ul').scroll(function() {
    var index = $(this).index();
    $('.cont_list ul').removeClass('active');
    $(this).addClass('active');
    $('.cont_nav .inner button').removeClass('active').eq(index).addClass('active');
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
        scrollTop: targetUl.offset().top - 300
      }, 100);
  });
});

$(window).scroll(function(){
  if($(this).scrollTop() > 600 && $(this).scrollTop() < 18000) {
    $('.history_show').addClass('visible');
    $('.cont_nav').addClass('visible');
  } else {
    $('.history_show').removeClass('visible');
    $('.cont_nav').removeClass('visible');
  }
})