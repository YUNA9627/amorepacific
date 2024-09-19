function historyScroll() {
  gsap.registerPlugin(ScrollTrigger);

  const progressBar = gsap.timeline();
  const pointerEl = gsap.timeline();
  const yearTrigger = $('.year_img');
  const yearLayout = $('.year_ctn');
  const yearCount = yearTrigger.length;
  const yearSection = $('.historyContainer .tabContents');
  const secCount = yearSection.length;
  let yearNav = [];
  let secNav = [];
  // let docHeight = $('.historyContainer').height();
      

  yearLayout.each((idx) => {
    if(idx % 2 !== 0) {
      yearLayout.eq(idx).addClass('even');
    }
  });

  ScrollTrigger.create({
    animation: progressBar,
    trigger: ".history_bar",
    start: "top 300",
    end: "bottom center",
    scrub: 0.3
  });

  ScrollTrigger.create({
    animation: pointerEl,
    trigger: ".history_bar",
    start: "top 300",
    end: "bottom center",
    scrub: 0.3
  });

  progressBar.from(".history_bar_on", {height:0, ease: "none"})
  pointerEl.from(".pointer", {top:0, ease: "none"})

  function checkYearTopOffset () {
    let arr = [];
    for(let i = 0; i < yearCount; i++){
      arr[i] = yearTrigger.eq(i).offset().top;
    }
    return arr;
  }}