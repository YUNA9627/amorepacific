/* HEADER - 배유나
–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– */

let header = $('header');
let headerTop = $('.header');

$(window).scroll(function(){
  if($(this).scrollTop() > 500){
    header.addClass('shrink');
  }else {
    header.removeClass('shrink');
  }
});

/* MAIN BANNER - 한태희
–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– */
let mainBanner = document.querySelector(".main_banner");
let video = mainBanner.querySelector(".video");
let slides = video.querySelectorAll("li");
let videos = video.querySelectorAll("video");
let videoLength = [];
let slideCount = slides.length;
let currentSlideIdx = 0;
let timer;

// 모든 비디오가 메타데이터 로드를 완료할 때까지 기다리기 위한 Promise 배열
let metadataPromises = [];

videos.forEach((item) => {
  // 각 비디오의 메타데이터가 로드될 때까지 기다리는 Promise 생성
  let metadataPromise = new Promise((resolve) => {
    item.addEventListener("loadedmetadata", function () {
      const duration = item.duration; // 재생 시간(초 단위)
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
  slides.forEach((item, idx) => {
    item.style.left = `${idx * 100}%`;
  });
}

function moveSlide(num) {
  video.style.left = `${-num * 100}%`;
  currentSlideIdx = num;
  console.log(currentSlideIdx);

  for (let sl of slides) {
    sl.classList.remove("active");
  }
  slides[currentSlideIdx].classList.add("active");
}
moveSlide(0);

function autoSlide() {
  let time = videoLength[currentSlideIdx] * 1000;
  console.log(time);
  timer = setInterval(() => {
    //let nextIdx = currentSlideIdx + 1;
    let nextIdx = (currentSlideIdx + 1) % slideCount;
    moveSlide(nextIdx);
  }, time);
}
