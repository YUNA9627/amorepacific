let mainBanner = document.querySelector('.main_banner');
let video = mainBanner.querySelector('.video');
let slides = video.querySelectorAll('li');
let slideCount = slides.length
let currentSlideIdx = 0,
timer

if(slideCount > 1){
  slides.forEach((item, idx)=>{
    item.style.left = `${idx*100}%`;   
  });
}

function moveSlide(num){
  video.style.left = `${-num*100}%`;
  currentSlideIdx = num;
  console.log(currentSlideIdx);

  for(let sl of slides){
    sl.classList.remove('active');
  }
  slides[currentSlideIdx].classList.add('active');
}
moveSlide(0);

function autoSlide(){
  timer = setInterval(()=>{
    //let nextIdx = currentSlideIdx + 1;
    let nextIdx = (currentSlideIdx + 1) % slideCount;
    moveSlide(nextIdx);
  },15000);
}
autoSlide();