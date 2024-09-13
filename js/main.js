/* HEADER - 배유나
–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– */

let header = $('header');
let headerTop = $('.header');

$(window).scroll(function(){
  if($(this).scrollTop() > 500){
    header.addClass('shrink');
    $('.content_wrapper').removeClass('container');
  }else {
    header.removeClass('shrink');
    $('.content_wrapper').addClass('container');
  }
});

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
$('#brand .slider').slick({
  arrows:false,
  dots: false,
  infinite: false,
  speed: 300,
  slidesToShow: 1,
  centerMode: true,
  variableWidth: true
});
