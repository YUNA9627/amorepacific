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
    $('.content_wrapper').removeClass('container');
  }else {
    header.removeClass('shrink');
    $('.content_wrapper').addClass('container');
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

$('.searchBtn').click(function(){
  header.toggleClass('open');
});

$('.header_overlay').click(function(){
  header.removeClass('open');
});

$('.hamburger-button').click(function(){
  $(this).toggleClass('active');
})

$('.gnb-item').mouseenter(function(){
  $(this).addClass('active');
  $('.header_overlay').addClass('active');
})

$('.gnb-item').mouseleave(function(){
  $(this).removeClass('active');
  $('.header_overlay').removeClass('active');
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
  // Assuming response is the JSON data provided
  const items = response.response.body.items.item;

  // Populate the table with data
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

/* MAIN BANNER - 한태희
–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– */
let $mainBanner = $(".main_banner");
let $video = $mainBanner.find(".video");
let $slides = $video.find("li");
let $videos = $video.find("video");
let videoLength = [];
let slideCount = $slides.length;
let currentSlideIdx = 0;
let timer;

console.log($videos);
// 모든 비디오가 메타데이터 로드를 완료할 때까지 기다리기 위한 Promise 배열
let metadataPromises = [];

$videos.each(function () {
  let $this = $(this);
  // 각 비디오의 메타데이터가 로드될 때까지 기다리는 Promise 생성
  let metadataPromise = new Promise((resolve) => {
    $this.on("loadedmetadata", function () {
      const duration = this.duration; // 재생 시간(초 단위)
      videoLength.push(duration);
      resolve(); // 메타데이터 로드 완료
    });
  });
  metadataPromises.push(metadataPromise);
});

// 모든 비디오의 메타데이터가 로드된 후 videoLength 출력
Promise.all(metadataPromises).then(() => {
  console.log(videoLength); // 모든 비디오의 재생 시간 출력
  autoSlide();
});

if (slideCount > 1) {
  $slides.each(function (idx) {
    $(this).css("left", `${idx * 100}%`);
  });
}

function moveSlide(num) {
  $video.css("left", `${-num * 100}%`);
  currentSlideIdx = num;
  console.log(currentSlideIdx);

  $slides.removeClass("active").find('video').each(function () {
    this.pause();
    this.currentTime = 0;
  });
  
  $slides.eq(currentSlideIdx).addClass("active").find('video').prop("muted", true).get(0).play().catch(error => {
    console.error('Autoplay failed:', error);
    // Handle the error (e.g., ask user to start playback manually)
  });
}
moveSlide(0);

function autoSlide() {
  let time = videoLength[currentSlideIdx] * 1000;
  console.log(time);
  timer = setInterval(() => {
    let nextIdx = (currentSlideIdx + 1) % slideCount;
    moveSlide(nextIdx);
  }, time);
}


var videos = document.querySelectorAll(".video video");
var progressBars = document.querySelectorAll(".progress-btn span");


// 각 비디오에 대해 progressbar 업데이트
videos.forEach(function(video, index) {
  var progressBar = progressBars[index];


  // 비디오가 재생될 때
  video.addEventListener("timeupdate", function () {
    var value = (video.currentTime / video.duration) * 100;
    progressBar.style.width= value+'px';  // 비디오 진행에 맞춰 게이지 업데이트
  });
  // 비디오가 끝나면 게이지를 다시 0으로
  video.addEventListener("ended", function () {
    progressBar.style.width= 0;
  });
})


/* BRANDS - 강현주
–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– */
 let brandButton = $('#brand .slider').slick({
  arrows:false,
  dots: false,
  infinite:true,
  speed: 300,
  slidesToShow: 1,
  centerMode: true,
  variableWidth: true
});
$('.button .prev').click(function(){
  brandButton.slick('slickPrev');
})
$('.button .next').click(function(){
  brandButton.slick('slickNext');
})
