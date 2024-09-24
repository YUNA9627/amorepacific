const $pointer = $('.pointer');
const $historyBarOn = $('.history_bar_on');
const $historyBar = $('.history_bar');
const $contList = $('.cont_list');
const $items = $('.item');

let pointerMaxScroll = $historyBar.height() - $pointer.height();
let historyMaxScroll = $historyBar.height() - $historyBarOn.height();
let listInnerHeight = $items.outerHeight();
let contListOffsetTop = $contList.offset().top;


function updateMeasurements() {
  // 각 아이템의 높이 및 리스트 offset 값을 갱신
  listInnerHeight = $items.outerHeight();
  contListOffsetTop = $contList.offset().top;
  pointerMaxScroll = $historyBar.height() - $pointer.height();
  historyMaxScroll = $historyBar.height() - $historyBarOn.height();
}


function history(){

  var scrollPos = $(window).scrollTop() + $(window).height() / 2;
  $items.each(function(){

    var $this = $(this);
    var offsetTop = $this.offset().top;
    var offsetBottom = offsetTop + $this.outerHeight();
    listInnerHeight = $this.outerHeight();


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
  });
}


// 리사이즈 시 높이 값과 offset 값을 다시 계산
$(window).resize(function(){
  updateMeasurements();
  history();
});


// 스크롤 시에도 동작
$(window).scroll(function(){
  history();
});


$(window).scroll(function(){
  $contList.find('ul').each(function(index){
    if($(this).find('li:first-child').hasClass('active')){
      // 첫 번째 아이템이 활성화된 경우
      $('.img_cont').eq(index).siblings().find('.first img').removeClass('show');
      $('.img_cont').eq(index).find('.false img').removeClass('show').addClass('false');
      $('.img_cont').eq(index).find('.first img').removeClass('false').addClass('show');
    } else if($(this).find('li:nth-child(3)').hasClass('active')){
      // 세 번째 아이템이 활성화된 경우
      $('.img_cont').eq(index).find('.first img').removeClass('show').addClass('false');
      $('.img_cont').eq(index).find('.false img').removeClass('false').addClass('show');
    }
  });
});


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
  let bottomHt = 280 + 110 + $('footer').height() + 'px';
  let dcw = $(document).height() - $(window).height() - $('footer').height();
  console.log(dcw);
  if($(this).scrollTop() > 600 && $(this).scrollTop() < dcw) {
    $('.history_show').addClass('visible');
    $('.cont_nav').addClass('visible');
  } else {
    $('.history_show').removeClass('visible');
    $('.cont_nav').removeClass('visible');
  }

  if(dcw >= $(this).scrollTop()){
    $('.history_show').css('bottom', bottomHt).css('top','');
  }else{
    $('.history_show').css('bottom', '0').css('top','0.5%');
  }
})