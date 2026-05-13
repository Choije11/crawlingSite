document.addEventListener("DOMContentLoaded", function() {
  const pagination = document.getElementById('pagination');
  const searchForm = document.getElementById('search-form');
  const categoryList = document.getElementById('category-list');

  // URL 파라미터 통합 업데이트 함수
  function updateURL(newParams) {
    const url = new URL(window.location.href);
    
    for (const key in newParams) {
      const value = newParams[key];
      if (value === 'all' || !value) {
        url.searchParams.delete(key);
      } else {
        url.searchParams.set(key, value);
      }
    }
    
    // 주소창 업데이트 (새로고침 없이, 위로 튀지 않음)
    window.history.pushState({}, '', url);
    console.log("Current URL:", url.search);
  }

  // 1. 페이지네이션 클릭 처리
  if (pagination) {
    pagination.addEventListener('click', function(e) {
      const anchor = e.target.closest('a');
      if (!anchor) return;

      // 기본 동작(상단 이동) 방지
      e.preventDefault();

      const pageNum = anchor.getAttribute('data-page');
      if (pageNum) {
        updateURL({ page: pageNum });
        
        // UI 활성화 변경
        document.querySelectorAll('.pagination li').forEach(li => li.classList.remove('active'));
        anchor.parentElement.classList.add('active');
      }
    });
  }

  // 2. 검색 처리
  if (searchForm) {
    searchForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const keyword = this.keyword.value;
      updateURL({ keyword: keyword, page: 1 }); // 검색 시 페이지 1로 리셋
    });
  }

  // 3. 카테고리 클릭 처리
  if (categoryList) {
    categoryList.addEventListener('click', function(e) {
      const anchor = e.target.closest('a');
      if (!anchor) return;
      e.preventDefault();

      const cat = anchor.getAttribute('data-filter-cat');
      
      // UI 변경
      categoryList.querySelectorAll('a').forEach(a => a.classList.remove('active'));
      anchor.classList.add('active');

      updateURL({ category: cat, page: 1 });
    });
  }
});