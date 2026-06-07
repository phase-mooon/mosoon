/* =============================================
   모순 — 인터랙티브 독서 경험 페이지
   script.js
   ★ 이 파일의 cardData 객체에서 카드 내용을 수정하세요
============================================= */

/* =============================================
   ★★★ 데이터 객체 — 여기서 내용을 수정하세요 ★★★
   각 part > A/B 카드:
     frontTitle : 앞면 제목 (1줄)
     frontDesc  : 앞면 설명 (2~3줄)
     backTitle  : 뒷면 제목
     backDesc   : 뒷면 설명 (모순 특성)
     personName : 실제 인물 이름 (결과 화면에 표시)
     quote      : 결과 화면 인용구
     page       : 인용 쪽수 (예: "p.52")
     imgSrc     : 이미지 파일 경로 (img 태그 src)
============================================= */
const cardData = {
  part1: {
    role: "어머니",
    A: {
      frontTitle: "불행을 자주 이야기하는 사람",
      frontDesc:  "수정중",
      backTitle:  "하지만 누구보다\n질기게 살아가는 사람",
      backDesc:   "수정중",
      personName: "엄마",        /* ★ 실제 인물명으로 수정 */
      quote:      "인용구.",
      page:       "p.00",
      imgSrc:     "mother-A.jpg" /* ★ 실제 이미지 경로로 수정 */
    },
    B: {
      frontTitle: "불행을 자주 이야기하는 사람",
      frontDesc:  "수정중",
      backTitle:  "하지만 누구보다\n질기게 살아가는 사람",
      backDesc:   "수정중",
      personName: "엄마",        /* ★ 실제 인물명으로 수정 */
      quote:      "인용구.",
      page:       "p.00",
      imgSrc:     "mother-A.jpg" /* ★ 실제 이미지 경로로 수정 */
    },
  },
  part2: {
    role: "아버지",
    A: {
      frontTitle: "원칙과 책임을 중시하는 사람",
      frontDesc:  "가족을 위해 묵묵히\n자신의 자리를 지키는 사람",
      backTitle:  "하지만 표현에\n서툰 사람",
      backDesc:   "사랑하지만 말로 전하지 못하는\n따뜻하고 서툰 존재",
      personName: "아버지",      /* ★ 실제 인물명으로 수정 */
      quote:      "말하지 않아도 알 거라 생각했다.",
      page:       "p.00",
      imgSrc:     "father-A.jpg"
    },
    B: {
      frontTitle: "이모부 — 자유로운 영혼",
      frontDesc:  "세상의 규칙에 얽매이지 않고\n자신만의 방식으로 사는 사람",
      backTitle:  "하지만 책임을\n회피하는 사람",
      backDesc:   "자유를 사랑하나 그 뒤에\n남겨진 상처들이 있는 존재",
      personName: "이모부",      /* ★ 실제 인물명으로 수정 */
      quote:      "자유는 아름답다. 그러나 혼자일 때만.",
      page:       "p.00",
      imgSrc:     "father-B.jpg"
    }
  },
  part3: {
    role: "배우자",
    A: {
      frontTitle: "장우 — 안정적인 사랑",
      frontDesc:  "늘 곁에 있어주고\n흔들리지 않는 사랑을 주는 사람",
      backTitle:  "하지만 때로\n답답함을 주는 사람",
      backDesc:   "변함없는 사랑이 오히려\n숨막히는 느낌을 줄 수 있는 존재",
      personName: "장우",        /* ★ 실제 인물명으로 수정 */
      quote:      "나는 그저 네 곁에 있는 것만으로 충분하다.",
      page:       "p.00",
      imgSrc:     "spouse-A.jpg"
    },
    B: {
      frontTitle: "별규 — 열정적인 사랑",
      frontDesc:  "뜨겁고 강렬한 감정으로\n삶에 활기를 불어넣는 사람",
      backTitle:  "하지만 불안정한\n감정을 가진 사람",
      backDesc:   "사랑의 온도가 너무 높아\n언제 식을지 모르는 불꽃 같은 존재",
      personName: "별규",        /* ★ 실제 인물명으로 수정 */
      quote:      "사랑은 타오를 때 가장 아름답다.",
      page:       "p.00",
      imgSrc:     "spouse-B.jpg"
    }
  }
};

/* =============================================
   선택 상태 관리
============================================= */
// 각 part에서 선택된 카드를 저장
const selections = { part1: null, part2: null, part3: null };

// 플립 상태 저장 (part-choice → true/false)
const flipState = {};

/* =============================================
   초기화: 카드 텍스트 렌더링
============================================= */
function initCards() {
  const parts = ["part1", "part2", "part3"];
  const choices = ["A", "B"];

  parts.forEach(part => {
    choices.forEach(choice => {
      const data = cardData[part][choice];

      // 앞면
      const frontTitle = document.getElementById(`front-title-${part}-${choice}`);
      const frontDesc  = document.getElementById(`front-desc-${part}-${choice}`);
      if (frontTitle) frontTitle.textContent = data.frontTitle;
      if (frontDesc)  frontDesc.textContent  = data.frontDesc;

      // 뒷면
      const backTitle = document.getElementById(`back-title-${part}-${choice}`);
      const backDesc  = document.getElementById(`back-desc-${part}-${choice}`);
      if (backTitle) backTitle.textContent = data.backTitle;
      if (backDesc)  backDesc.textContent  = data.backDesc;

      // 이미지 src 설정
      const card = document.getElementById(`card-${part}-${choice}`);
      if (card) {
        const img = card.querySelector('.card-image-area img');
        if (img) img.src = data.imgSrc;
      }
    });
  });
}

/* =============================================
   카드 플립
   - 카드 클릭 시 앞/뒷면 토글
   - 선택 상태와 독립적
============================================= */
function flipCard(part, choice) {
  const key = `${part}-${choice}`;
  const cardInner = document.querySelector(`#card-${part}-${choice} .card-inner`);
  if (!cardInner) return;

  flipState[key] = !flipState[key];
  if (flipState[key]) {
    cardInner.classList.add('flipped');
  } else {
    cardInner.classList.remove('flipped');
  }
}

/* =============================================
   카드 선택
   - 선택 버튼 클릭 → 해당 카드 selected, 반대 카드 dimmed
   - 자동으로 다음 섹션으로 스크롤
============================================= */
function selectCard(part, choice) {
  // 선택 저장
  selections[part] = choice;

  // 같은 part의 두 카드 모두에 상태 적용
  ["A", "B"].forEach(c => {
    const outer = document.getElementById(`card-${part}-${c}`);
    if (!outer) return;
    outer.classList.remove("selected", "dimmed");
    if (c === choice) {
      outer.classList.add("selected");
    } else {
      outer.classList.add("dimmed");
    }
  });

  // 딜레이 후 다음 섹션으로 스크롤
  setTimeout(() => {
    if (part === "part1") scrollToSection("part2");
    else if (part === "part2") scrollToSection("part3");
    else if (part === "part3") showResult();
  }, 400);
}

/* =============================================
   섹션 스크롤
============================================= */
function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

/* =============================================
   결과 페이지 생성
============================================= */
function showResult() {
  // 결과 섹션으로 스크롤
  scrollToSection("result");

  // 이름 나열
  const names = ["part1", "part2", "part3"].map(p => {
    const c = selections[p];
    return c ? cardData[p][c].personName : "미선택";
  });
  const namesEl = document.getElementById("result-names");
  if (namesEl) {
    namesEl.textContent =
      `당신이 선택한 가족 구성원은 소설 『모순』의 '${names[0]}, ${names[1]}, ${names[2]}' 입니다.`;
  }

  // 결과 카드 3장 동적 생성
  const resultCards = document.getElementById("result-cards");
  if (!resultCards) return;
  resultCards.innerHTML = "";

  const partOrder = [
    { part: "part1", label: "어머니" },
    { part: "part2", label: "아버지" },
    { part: "part3", label: "배우자" }
  ];

  partOrder.forEach(({ part, label }) => {
    const c = selections[part];
    if (!c) return;
    const data = cardData[part][c];

    const item = document.createElement("div");
    item.className = "result-card-item";
    item.innerHTML = `
      <p class="result-card-role">${label}</p>
      <p class="result-card-name">${data.personName}</p>
      <p class="result-card-quote">
        "${data.quote}"
        <span class="result-card-page">${data.page}</span>
      </p>
    `;
    resultCards.appendChild(item);
  });
}

/* =============================================
   북트레일러 — 썸네일 클릭 시 iframe으로 교체
============================================= */
function playVideo() {
  const box = document.getElementById("video-box");
  if (!box) return;
  // ★ 유튜브 ID: 0qFoU6-WsAU
  box.innerHTML = `
    <iframe
      src="https://www.youtube.com/embed/0qFoU6-WsAU?autoplay=1"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
      title="모순 북트레일러">
    </iframe>
  `;
}

/* =============================================
   페이지 로드 시 실행
============================================= */
document.addEventListener("DOMContentLoaded", () => {
  initCards();
});
