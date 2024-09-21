
  var rowsPerPage = 10; // 한 페이지에 표시할 행 수
  var rows = $('tbody tr'); // 모든 tr 요소
  var rowsCount = rows.length; // 총 행 수
  var pageCount = Math.ceil(rowsCount / rowsPerPage); // 총 페이지 수
  const numbers = document.querySelector('#numbers');
  const maxPageNum = 3;
  let pageActiveIdx = 0;
  const prevBtn = document.querySelector('.pagination .bi-chevron-left');
  const nextBtn = document.querySelector('.pagination .bi-chevron-right');
  let currentPage = 1;
  const totalPages = 5;

let numberHTML = '';
for(let i = 1; i<=pageCount;i++){
  numberHTML += `<li><a href="">${i}</a></li>`;
}
numbers.innerHTML = numberHTML;

const numberBtn = numbers.querySelectorAll('a');
const pageGroupCount = Math.ceil(pageCount/maxPageNum); //4
console.log(pageGroupCount);

function displayRow(num){
  for(item of rows){
    item.style.display = 'none';
  }
  let start = rowsPerPage * num;
  let end = start + rowsPerPage;
  let rowsArray =  [...rows];
  let newRows = rowsArray.slice(start,end);
  for(let item of newRows){
    item.style.display = '';
  }
}
displayRow(0);

numberBtn.forEach((item,idx)=>{
  item.addEventListener('click',(e)=>{
    e.preventDefault();
    displayRow(idx);

    for(let item of numberBtn){
      item.classList.remove('active');
    }
    item.classList.add('active');
    
  })
})

function displayPagination(num){
  /* 모든 페이지 안보이도록 */
  for(item of numberBtn){
    item.style.display = 'none';
  }

  let start = maxPageNum * num;
  let end = start + maxPageNum;

  let pArray =  [...numberBtn];
  let np = pArray.slice(start,end);
  for(let item of np){
    item.style.display = '';
  }

  for(item of numberBtn){
    item.classList.remove('active');
  }
  numberBtn[start].classList.add('active');
  displayRow(start);

  pageActiveIdx = num;


  prevBtn.disabled = pageActiveIdx === 0;
  nextBtn.disabled = pageActiveIdx === pageGroupCount - 1;
//  if( pageActiveIdx === 0){
//   prevBtn.style.display = 'none';
//  } else{
//   prevBtn.style.display = 'block';
//  }

//  if( pageActiveIdx === pageGroupCount -1){
//   nextBtn.style.display = 'none';
//  } else{
//   nextBtn.style.display = 'block';
//  }
}
displayPagination(0);

// nextBtn.addEventListener('click',(num)=>{
//   displayPagination(pageActiveIdx+1);
// })
nextBtn.addEventListener('click', (num) => {
  if (pageActiveIdx < pageGroupCount - 1) {
    displayPagination(pageActiveIdx + 1);
  }
});

prevBtn.addEventListener('click', (num) => {
  if (pageActiveIdx > 0) {
    displayPagination(pageActiveIdx - 1);
  }
});


