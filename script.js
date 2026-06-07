/* =============================================
   모순 — 인터랙티브 웹페이지 스크립트
   =============================================
   ★ 수정 가이드
   - 카드 내용(제목·설명·인물명·인용구·쪽수)은
     아래 CARD_DATA 객체를 수정하세요.
   - 이미지 경로는 각 카드의 imgSrc 값을 수정하세요.
     예: imgSrc: 'images/mother-a.jpg'
   ============================================= */

/* =============================================
   ★ 데이터 객체 — 이 부분을 직접 수정하세요
   ============================================= */
const CARD_DATA = {

  /* ──────────────── Part 1 : 어머니 ──────────────── */
  part1: {
    role: "어머니",
    cards: [
      {
        id: "mother-a",
        choiceLabel: "선택 A",

        /* 카드 앞면 */
        imgSrc: "images/mother-a.jpg",   // 이미지 경로 수정
        title: "첫 번째 어머니",          // 카드 제목 (1줄)
        desc: "따뜻하고 헌신적이지만, 자신의 삶을 희생한 채 살아온 어머니. 그녀의 사랑은 뜨겁고 진실하다.",

        /* 카드 뒷면 */
        personName: "친엄마",             // 실제 인물 이름 (수정 가능)
        happiness: "무조건적인 사랑과 헌신. 어떤 순간에도 딸의 편에 선다.",
        unhappiness: "가난과 불안한 일상. 자신의 꿈을 포기한 채 살아가는 삶.",

        /* 결과 섹션 인용구 */
        quote: "엄마는 늘 그 자리에 있었다. 불행 속에서도, 행복처럼.",  // 인용구 수정
        page: "p.00"  // 쪽수 수정
      },
      {
        id: "mother-b",
        choiceLabel: "선택 B",

        imgSrc: "images/mother-b.jpg",
        title: "두 번째 어머니",
        desc: "우아하고 세련되었지만, 차갑고 계산적인 면이 있는 어머니. 물질적 풍요로움을 줄 수 있다.",

        personName: "새엄마",
        happiness: "풍요로운 생활과 사회적 안정. 세련된 삶의 방식.",
        unhappiness: "조건부 사랑. 감정적 거리와 냉담함.",

        quote: "그녀의 사랑엔 언제나 조건이 붙어 있었다.",
        page: "p.00"
      }
    ]
  },

  /* ──────────────── Part 2 : 아버지 ──────────────── */
  part2: {
    role: "아버지",
    cards: [
      {
        id: "father-a",
        choiceLabel: "선택 A",

        imgSrc: "images/father-a.jpg",
        title: "첫 번째 아버지",
        desc: "인정 넘치고 다정하지만, 책임감이 부족한 아버지. 함께 있으면 유쾌하나 현실은 녹록지 않다.",

        personName: "친아빠",
        happiness: "따뜻한 정과 유머. 함께하는 시간이 행복하다.",
        unhappiness: "불안정한 생계. 어른스럽지 못한 선택들.",

        quote: "아버지의 웃음은 빛났다. 하지만 그 빛은 오래가지 않았다.",
        page: "p.00"
      },
      {
        id: "father-b",
        choiceLabel: "선택 B",

        imgSrc: "images/father-b.jpg",
        title: "두 번째 아버지",
        desc: "성실하고 묵직한 존재감. 말수는 적지만 가족을 위해 묵묵히 살아가는 아버지.",

        personName: "이모부",
        happiness: "안정된 경제적 지지. 흔들리지 않는 신뢰.",
        unhappiness: "감정 표현의 부재. 쌓여가는 거리감.",

        quote: "그는 말이 없었다. 하지만 그 침묵이 집이었다.",
        page: "p.00"
      }
    ]
  },

  /* ──────────────── Part 3 : 배우자 ──────────────── */
  part3: {
    role: "배우자",
    cards: [
      {
        id: "spouse-a",
        choiceLabel: "선택 A",

        imgSrc: "images/spouse-a.jpg",
        title: "첫 번째 배우자",
        desc: "열정적이고 낭만적인 사랑을 주는 사람. 예측 불가능하지만 삶을 빛나게 한다.",

        personName: "장우",
        happiness: "삶을 불태우는 사랑. 설레고 짜릿한 감정.",
        unhappiness: "불안정한 미래. 상처와 이별의 반복.",

        quote: "장우와 함께라면 모든 것이 타올랐다. 나도, 내 마음도.",
        page: "p.00"
      },
      {
        id: "spouse-b",
        choiceLabel: "선택 B",

        imgSrc: "images/spouse-b.jpg",
        title: "두 번째 배우자",
        desc: "안정적이고 묵직한 사랑을 주는 사람. 드라마틱하지 않지만 오래도록 곁에 있다.",

        personName: "별규",
        happiness: "든든한 안정감과 신뢰. 지속 가능한 삶.",
        unhappiness: "설렘의 부재. 편안하지만 평범한 일상.",

        quote: "별규는 나를 지켜봤다. 조용히, 그러나 오래도록.",
        page: "p.00"
      }
    ]
  }
};

/* =============================================
   전역 상태
   ============================================= */
const state = {
  currentPart: 1,
  selections: {
    part1: null,  // 선택된 카드 데이터
    part2: null,
    part3: null
  }
};

/* =============================================
   초기화
   ============================================= */
document.addEventListener("DOMContentLoaded", () => {
  buildCards("part1");
  buildCards("part2");
  buildCards("part3");
  bindNavEvents();
  bindNextButtons();
  bindStartButton();
  bindResetButton();
  handleNavbarScroll();
});

/* =============================================
   내비게이션 스크롤 효과
   ============================================= */
function handleNavbarScroll() {
  const navbar = document.getElementById("navbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 60) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });
}

/* =============================================
   시작 버튼
   ============================================= */
function bindStartButton() {
  const btn = document.getElementById("startBtn");
  btn.addEventListener("click", () => {
    smoothScrollTo("part1");
  });
}

/* =============================================
   초기화(다시하기) 버튼
   ============================================= */
function bindResetButton() {
  const btn = document.getElementById("resetBtn");
  btn.addEventListener("click", () => {
    // 상태 초기화
    state.selections.part1 = null;
    state.selections.part2 = null;
    state.selections.part3 = null;
    state.currentPart = 1;

    // 결과 섹션 숨기기
    document.getElementById("result").classList.remove("visible");

    // 카드 재빌드
    buildCards("part1");
    buildCards("part2");
    buildCards("part3");

    // 버튼 비활성화
    document.getElementById("next-part1").disabled = true;
    document.getElementById("next-part2").disabled = true;
    document.getElementById("next-part3").disabled = true;

    // Part 1만 표시
    showPart(1);

    // 인트로로 스크롤
    smoothScrollTo("intro");
  });
}

/* =============================================
   카드 빌드 함수
   ============================================= */
function buildCards(partKey) {
  const partData = CARD_DATA[partKey];
  const container = document.getElementById("cards-" + partKey);
  container.innerHTML = "";

  partData.cards.forEach((card) => {
    const wrap = createCardElement(card, partKey);
    container.appendChild(wrap);
  });
}

/* 카드 DOM 생성 */
function createCardElement(card, partKey) {
  const wrap = document.createElement("div");
  wrap.className = "card-wrap";
  wrap.dataset.id = card.id;
  wrap.dataset.part = partKey;

  wrap.innerHTML = `
    <div class="card-inner" id="inner-${card.id}">

      <!-- 앞면 -->
      <div class="card-face card-front">
        <!-- 이미지 영역 -->
        <div class="card-img-area">
          <img
            src="${card.imgSrc}"
            alt="${card.title}"
            onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"
          />
          <!-- 이미지 로드 실패 시 플레이스홀더 -->
          <div class="card-img-placeholder" style="display:none;">
            <span>이미지</span>
          </div>
          <span class="card-choice-label">${card.choiceLabel}</span>
        </div>

        <!-- 텍스트 영역 -->
        <div class="card-text-area">
          <p class="card-name">${card.title}</p>
          <p class="card-desc">${card.desc}</p>
          <button class="card-select-btn" data-id="${card.id}" data-part="${partKey}">선택하기</button>
        </div>
      </div>

      <!-- 뒷면 -->
      <div class="card-face card-back">
        <div class="card-back-content">
          <p class="card-back-title">${card.title}</p>

          <div class="back-section">
            <p class="back-section-label">행복</p>
            <p class="back-section-text">${card.happiness}</p>
          </div>

          <div class="back-section">
            <p class="back-section-label">불행</p>
            <p class="back-section-text">${card.unhappiness}</p>
          </div>

          <button class="back-select-btn" data-id="${card.id}" data-part="${partKey}">이 사람을 선택하기</button>
        </div>
      </div>

    </div>
  `;

  /* 카드 클릭 → 뒤집기 */
  const inner = wrap.querySelector(".card-inner");
  wrap.addEventListener("click", (e) => {
    // 버튼 클릭은 flip 없이 선택 처리
    if (e.target.classList.contains("card-select-btn") || e.target.classList.contains("back-select-btn")) {
      return;
    }
    inner.classList.toggle("flipped");
  });

  /* 앞면 "선택하기" 버튼 */
  wrap.querySelector(".card-select-btn").addEventListener("click", (e) => {
    e.stopPropagation();
    selectCard(card, partKey);
  });

  /* 뒷면 "이 사람을 선택하기" 버튼 */
  wrap.querySelector(".back-select-btn").addEventListener("click", (e) => {
    e.stopPropagation();
    selectCard(card, partKey);
  });

  return wrap;
}

/* =============================================
   카드 선택 처리
   ============================================= */
function selectCard(card, partKey) {
  // 상태 저장
  state.selections[partKey] = card;

  // 같은 파트의 모든 카드 wrap 업데이트
  const allWraps = document.querySelectorAll(`[data-part="${partKey}"]`);

  // card-wrap 기준으로 처리
  const container = document.getElementById("cards-" + partKey);
  const cardWraps = container.querySelectorAll(".card-wrap");

  cardWraps.forEach((wrap) => {
    if (wrap.dataset.id === card.id) {
      wrap.classList.add("selected");
      wrap.classList.remove("dimmed");
    } else {
      wrap.classList.remove("selected");
      wrap.classList.add("dimmed");
    }
  });

  // 다음 버튼 활성화
  const nextBtn = document.getElementById("next-" + partKey);
  if (nextBtn) nextBtn.disabled = false;
}

/* =============================================
   다음/이전 버튼 바인딩
   ============================================= */
function bindNextButtons() {
  /* Part 1 → Part 2 */
  document.getElementById("next-part1").addEventListener("click", () => {
    showPart(2);
    smoothScrollTo("part2");
  });

  /* Part 2 → Part 3 */
  document.getElementById("next-part2").addEventListener("click", () => {
    showPart(3);
    smoothScrollTo("part3");
  });

  /* Part 3 → 결과 */
  document.getElementById("next-part3").addEventListener("click", () => {
    showResult();
    smoothScrollTo("result");
  });

  /* 이전 버튼 */
  document.getElementById("prev-part2").addEventListener("click", () => {
    showPart(1);
    smoothScrollTo("part1");
  });
  document.getElementById("prev-part3").addEventListener("click", () => {
    showPart(2);
    smoothScrollTo("part2");
  });
}

/* =============================================
   파트 표시/숨기기
   ============================================= */
function showPart(num) {
  state.currentPart = num;
  [1, 2, 3].forEach((n) => {
    const el = document.getElementById("part" + n);
    if (n === num) {
      el.classList.remove("part-hidden");
      // 약간의 딜레이 후 애니메이션 클래스 추가
      setTimeout(() => el.classList.add("part-visible"), 50);
    } else {
      el.classList.add("part-hidden");
      el.classList.remove("part-visible");
    }
  });
}

/* =============================================
   결과 섹션 표시
   ============================================= */
function showResult() {
  const resultSection = document.getElementById("result");
  resultSection.classList.add("visible");

  // 제목 생성
  const names = [
    state.selections.part1?.personName || "?",
    state.selections.part2?.personName || "?",
    state.selections.part3?.personName || "?"
  ];
  document.getElementById("result-title").innerHTML = `
    당신이 선택한 가족 구성원은 소설 『모순』의
    <em>'${names[0]}, ${names[1]}, ${names[2]}'</em> 입니다.
  `;

  // 결과 카드 3장
  const resultCards = document.getElementById("result-cards");
  resultCards.innerHTML = "";
  const roles = ["어머니", "아버지", "배우자"];
  const selKeys = ["part1", "part2", "part3"];

  selKeys.forEach((key, idx) => {
    const sel = state.selections[key];
    if (!sel) return;
    const item = document.createElement("div");
    item.className = "result-card-item";
    item.innerHTML = `
      <img
        src="${sel.imgSrc}"
        alt="${sel.personName}"
        class="result-card-img"
        onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"
      />
      <div class="result-card-placeholder" style="display:none;">
        <span>이미지</span>
      </div>
      <div class="result-card-info">
        <p class="result-card-role">${roles[idx]}</p>
        <p class="result-card-name">${sel.personName}</p>
      </div>
    `;
    resultCards.appendChild(item);
  });

  // 인용구
  const resultQuotes = document.getElementById("result-quotes");
  resultQuotes.innerHTML = "";

  selKeys.forEach((key, idx) => {
    const sel = state.selections[key];
    if (!sel) return;
    const item = document.createElement("div");
    item.className = "result-quote-item";
    item.innerHTML = `
      <img
        src="${sel.imgSrc}"
        alt="${sel.personName}"
        class="result-quote-img-thumb"
        onerror="this.style.display='none';this.nextElementSibling.style.display='block'"
      />
      <div class="result-quote-img-placeholder" style="display:none;"></div>
      <div class="result-quote-body">
        <p class="result-quote-role">${roles[idx]}</p>
        <p class="result-quote-name">${sel.personName}</p>
        <p class="result-quote-text">"${sel.quote}"</p>
        <p class="result-quote-page">${sel.page}</p>
      </div>
    `;
    resultQuotes.appendChild(item);
  });
}

/* =============================================
   내비 링크 이벤트
   ============================================= */
function bindNavEvents() {
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      if (href.startsWith("#")) {
        e.preventDefault();
        const target = href.slice(1);
        smoothScrollTo(target);
      }
    });
  });
}

/* =============================================
   부드러운 스크롤 유틸
   ============================================= */
function smoothScrollTo(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const offset = 70; // 내비 높이
  const top = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: "smooth" });
}
