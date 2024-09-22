

  function initializePagination(tbodySelector, paginationSelector) {
      var rowsPerPage = 10; // 한 페이지에 표시할 행 수
      var rows = $(tbodySelector).find('tr'); // 모든 tr 요소
      var rowsCount = rows.length; // 총 행 수
      var pageCount = Math.ceil(rowsCount / rowsPerPage); // 총 페이지 수

      const numbers = $(paginationSelector).find('#numbers');
      const prevBtn = $(paginationSelector).find('.prev-btn');
      const nextBtn = $(paginationSelector).find('.next-btn');
      const maxPageNum = 3;
      let pageActiveIdx = 0;

      let numberHTML = '';
      for (let i = 1; i <= pageCount; i++) {
          numberHTML += `<li><a href="#">${i}</a></li>`;
      }
      numbers.html(numberHTML);

      const numberBtn = numbers.find('a');
      const pageGroupCount = Math.ceil(pageCount / maxPageNum);

      function displayRow(num) {
          rows.hide(); // 모든 행을 숨김
          let start = rowsPerPage * num;
          let end = start + rowsPerPage;
          rows.slice(start, end).show(); // 선택한 범위의 행을 표시
      }

      displayRow(0); // 처음에 첫 페이지 내용만 표시

      numberBtn.each(function (idx) {
          $(this).on('click', function (e) {
              e.preventDefault();
              displayRow(idx); // 클릭한 페이지 번호에 맞는 행 표시

              numberBtn.removeClass('active'); // 모든 페이지 번호의 활성 상태 제거
              $(this).addClass('active'); // 클릭한 페이지 번호 활성화
          });
      });

      function displayPagination(num) {
          numberBtn.hide(); // 모든 페이지 번호 숨기기
          let start = maxPageNum * num;
          let end = start + maxPageNum;

          numberBtn.slice(start, end).show(); // 해당 페이지 범위의 번호만 표시

          numberBtn.removeClass('active'); // 모든 페이지 번호에서 활성 상태 제거
          numberBtn.eq(start).addClass('active'); // 첫 번째 페이지 활성화
          displayRow(start); // 첫 번째 페이지 표시

          pageActiveIdx = num;

          prevBtn.prop('disabled', pageActiveIdx === 0); // 첫 번째 페이지일 때 이전 버튼 비활성화
          nextBtn.prop('disabled', pageActiveIdx === pageGroupCount - 1); // 마지막 페이지일 때 다음 버튼 비활성화
      }

      displayPagination(0); // 처음에 첫 페이지 번호만 표시

      nextBtn.on('click', function () {
          if (pageActiveIdx < pageGroupCount - 1) {
              displayPagination(pageActiveIdx + 1); // 다음 페이지 그룹으로 이동
          }
      });

      prevBtn.on('click', function () {
          if (pageActiveIdx > 0) {
              displayPagination(pageActiveIdx - 1); // 이전 페이지 그룹으로 이동
          }
      });
  }

  // Bootstrap 탭 전환 이벤트 감지
  $('button[data-bs-toggle="tab"]').on('shown.bs.tab', function (e) {
      var target = $(e.target).attr("data-bs-target"); // 활성화된 탭의 ID
      if (target === '#result') {
          initializePagination('#result tbody', '#result .pagination');
      } else if (target === '#business') {
          initializePagination('#business tbody', '#business .pagination');
      } else if (target === '#sales') {
          initializePagination('#sales tbody', '#sales .pagination');
      } else if (target === '#report') {
          initializePagination('#report tbody', '#report .pagination');
      }
  });

  // 페이지 로드 시 첫 번째 탭에 대해 초기화
  initializePagination('#result tbody', '#result .pagination');

  var mixer = mixitup('.product_list');

  document.querySelectorAll('.dropdown-item').forEach(function(button) {
      button.addEventListener('click', function() {
          var filterValue = button.getAttribute('data-filter') || 'all';
          mixer.filter(filterValue);
      });
  });


