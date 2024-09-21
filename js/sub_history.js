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

$(window).on('scroll', function() {
  var scrollPos = $(window).scrollTop() + $(window).height() / 3; // 뷰포트 중앙 위치

  $items.each(function(){
      var $this = $(this);
      var offsetTop = $this.offset().top;
      var offsetBottom = offsetTop + $this.outerHeight();

      if (scrollPos >= offsetTop && scrollPos < offsetBottom) {
          $this.addClass('active');
      } else {
          $this.removeClass('active');
      }
  });
});

$(window).scroll(function(){
  const $imgCont = $('.img_cont');
  const $ul = $('.cont_list').find('ul');
  
  $('.img_cont').addClass('disShowMotion');
  
  $ul.each(function() {
    var innerHeight = $(this).innerHeight();
    var $this = $(this);
    var offsetTop = $this.offset().top;
  });
});
