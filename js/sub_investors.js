
  var rowsPerPage = 10; // 한 페이지에 표시할 행 수
  var rows = $('tbody tr'); // 모든 tr 요소
  var totalRows = rows.length; // 총 행 수
  var totalPages = Math.ceil(totalRows / rowsPerPage); // 총 페이지 수

  // 처음 페이지 설정
  function showPage(page) {
    var start = (page - 1) * rowsPerPage;
    var end = start + rowsPerPage;

    rows.hide(); // 모든 행을 숨김
    rows.slice(start, end).show(); // 해당 페이지의 행만 표시

    $('.pagination li').removeClass('active'); // 모든 페이지 버튼에서 active 제거
    $('.pagination li').eq(page).addClass('active'); // 현재 페이지 버튼에 active 추가
  }

  // 페이지 네비게이션 클릭 이벤트
  $('.pagination li a').on('click', function(e) {
    e.preventDefault();

    var page = $(this).parent().index(); // 클릭한 페이지 번호 가져오기

    if ($(this).attr('aria-label') === 'Previous') {
      page = $('.pagination li.active').index() - 1;
      if (page < 1) page = 1;
    } else if ($(this).attr('aria-label') === 'Next') {
      page = $('.pagination li.active').index() + 1;
      if (page > totalPages) page = totalPages;
    }

    showPage(page);
  });

  // 초기화 - 첫 번째 페이지 보여줌
  showPage(1);



