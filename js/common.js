/* HEADER - 배유나
–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– */

let header = $('header');
let headerTop = $('.header');
let sideBtn = $('.side_btn');
let goToTop = $('.go_to_top');

$(window).scroll(function(){
  if($(this).scrollTop() > 500){
    header.addClass('shrink');
    sideBtn.addClass('on');
  }else {
    header.removeClass('shrink');
    sideBtn.removeClass('on');
  }

  let fOffsetTop = $('.footer_box').offset().top;

  if($(this).scrollTop() >= fOffsetTop - $(window).innerHeight()){
    let bottom = $(window).scrollTop() - fOffsetTop + $(window).innerHeight() + 20
    sideBtn.css({"bottom" : bottom});
  } else {
    sideBtn.css({"bottom" : "20px"});
  }
});

goToTop.click(function(e){
  e.preventDefault();
    $('html, body').animate({
        scrollTop: 0
    }, 200);
  $('html, body').css('scroll-behavior', 'smooth');
})

$('.search-button').click(function(){
  header.toggleClass('open');
  if(header.hasClass('open')){
    $('.hamburger-button').css({"visibility":"hidden"});
  }else{
    $('.hamburger-button').css({"visibility":"visible"});
  }
});

$('.header_overlay').click(function(){
  header.removeClass('open');
  if(!header.hasClass('open')){
    $('.hamburger-button').css({"visibility":"visible"});
  }
});

$('.hamburger-button').click(function(){
  $(this).addClass('navOpen');
  if($(this).hasClass('navOpen')){
    $('aside').addClass('navOpen');
    $('html').addClass('navOpen');
  }
})

$('.content_wrap .x-button').click(function(){
  $('.hamburger-button').removeClass('navOpen');
  if(!$('.hamburger-button').hasClass('navOpen')){
    $('aside').removeClass('navOpen');
    $('html').removeClass('navOpen');
  }
})

$('.gnb-item').mouseenter(function(){
  $(this).addClass('active');
  $('.header_overlay').addClass('active');
})

$('.gnb-item').mouseleave(function(){
  $(this).removeClass('active');
  $('.header_overlay').removeClass('active');
})

$('.resize_gnb .gnb_item').click(function(){
  $(this).toggleClass('re-active');

})

var prevST = 0;
$(window).scroll(function(){
  currentST = $(this).scrollTop();
  if(currentST > prevST){
    header.css('top', '-145px');
  }else {
    header.css('top', '0');
  }
  prevST = currentST;
})

let apiUrl = `https://apis.data.go.kr/1160100/service/GetStockSecuritiesInfoService/getStockPriceInfo?serviceKey=bAyCLfuK3Qtrz6nJ9J%2BsVV7zH2dC1T86Gjo0QfMo6trW7eXUGhI2FW0YepT6264Q64dx4g%2FX%2B%2FJt0DKzGBL%2Bxw%3D%3D&numOfRows=10&resultType=json&basDt=20240912&itmsNm=%EC%95%84%EB%AA%A8%EB%A0%88%ED%8D%BC%EC%8B%9C%ED%94%BD`;

$.get(apiUrl, function(response) {

  const items = response.response.body.items.item;

  let tableContent = '';
  items.forEach(item => {
    let NumClpr = Number(item.clpr).toLocaleString();
    let NumVs = Number(item.vs).toLocaleString();
    let NumFltRt = Number(item.fltRt).toLocaleString(); 
    function formatDate(dateStr) {
      const year = dateStr.slice(0, 4);
      const month = dateStr.slice(4, 6);
      const day = dateStr.slice(6, 8);

      const shortYear = year.slice(2);

      return `${shortYear}/${month}/${day}`;
    }

      tableContent += `
          <div class="stock-cell">
            <h4>아모레퍼시픽</h4>
            <span>${formatDate(item.basDt)}</span>
          </div>
          <div class="stock-cell">
            <i class="price">${NumClpr}</i>
            <span class="state">
              <b>-${NumVs}</b>
              <i>(-${NumFltRt}%)</i>
            </span>
          </div>
      `;
  });
  $('#stock-box').html(tableContent);
})