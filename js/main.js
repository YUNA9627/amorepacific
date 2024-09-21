/* HEADER - 배유나
–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– */

$(window).scroll(function(){
  if($(this).scrollTop() > 500){
    header.addClass('shrink');
    sideBtn.addClass('on');
  }else {
    header.removeClass('shrink');
    sideBtn.removeClass('on');
  }
});

var prevST = 0;
$(window).scroll(function(){
  currentST = $(this).scrollTop();
  if(currentST > prevST){
    header.css('top', '-145px');
  }else {
    header.css('top', '0');
  }
  prevST = currentST;
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
    //console.error('Autoplay failed:', error);
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
    progressBar.style.width = value+'px';  // 비디오 진행에 맞춰 게이지 업데이트
    progressBar.style.transition = '0.5s linear';
  });
  // 비디오가 끝나면 게이지를 다시 0으로
  video.addEventListener("ended", function () {
    progressBar.style.width = 0;
    progressBar.style.transition = 'none';
  });
})

$('.m_control').click(function(){
  $(this).toggleClass('play pause');
  if ($(this).hasClass('pause')) {
    clearInterval(timer);
    $slides.eq(currentSlideIdx).find('video').get(0).pause();
  } else {
    $slides.eq(currentSlideIdx).find('video').get(0).play().catch(error => {
      console.error('자동 재생 실패:', error);
    });
    autoSlide();
  }
})


/* SPACE - 홍은진
–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– */
const space = $('.space');
const spaceOST = space.offset().top - 500;
let excuted = false;

/*
윈도우에 스크롤이 생기면 할 일
  스크롤양이 300보다 크면 notepads에 active 추가
  아니라면 active 제거
*/

$(window).scroll(function(){
  if($(this).scrollTop() > spaceOST){
    if(!excuted){
      space.addClass('active');
      
      excuted = true;
    } //else{
    //   space.removeClass('active');
    // }
  }
});

/* BRANDS - 강현주
–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– */
 let brandButton = $('#brand .slider').slick({
  arrows:false,
  dots: false,
  infinite:false,
  speed: 300,
  slidesToShow: 1,
  centerMode: false,
  variableWidth: true
});
$('.button .prev').click(function(){
  brandButton.slick('slickPrev');
})
$('.button .next').click(function(){
  brandButton.slick('slickNext');
})


let brandSlides = $('.brand_row').slick({
  slidesToShow: 4,
  slidesToScroll: 1,
  infinite: true,
  arrows: false,
  dots: false,
  autoplay: true,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 4
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 3
      }
    },
    {
      breakpoint: 576,
      settings: {
        slidesToShow: 2
      }
    }
  ]
});
$('.slider li a').click(function(e){
  e.preventDefault();
  let target = $(this).attr('href');
  let targetIdx =  $(target).attr('data-id');
  brandSlides.slick('slickGoTo',targetIdx);

  $('.slider li a').removeClass('active');
  $(this).addClass('active');
})

$('.brand_row li').mouseenter(function() {
  $('.brand_row li').removeClass('slick-current'); // 모든 li에서 active 클래스 제거
  $(this).addClass('slick-current');    // 현재 hover한 li에 active 클래스 추가
});
$('.brand_row li').mouseleave(function() {
  $('.brand_row li').removeClass('slick-current'); // 모든 li에서 active 클래스 제거
  // $(this).addClass('slick-current');    // 현재 hover한 li에 active 클래스 추가
});





/* SNS - 배유나
–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– */

$('.video_slide video').each(function() {
  $(this).on('mouseover', function() {
    this.play();
  }).on('mouseout', function() {
    this.pause();
    this.currentTime = 0;
  });
});

$('.sns_slide').slick({
  slidesToShow: 4,
  slidesToScroll: 1,
  infinite: true,
  arrows: true,
  prevArrow: '<button class="slick-prev"><i class="bi bi-chevron-left"></i></button>',
  nextArrow: '<button class="slick-next"><i class="bi bi-chevron-right"></i></button>',
  dots: false,
  // autoplay: true,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2
      }
    },
    {
      breakpoint: 576,
      settings: {
        slidesToShow: 1
      }
    }
  ]
});

$('.slick-prev').append('<i class="icon-class"></i>');