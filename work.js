<script>
const rows = [
  {
    id: 'ux', label: 'UX/UI', num: '01',
    cards: [
      { title: 'Wireframe', sub: '화면 구조 설계' },
      { title: 'Prototype', sub: '인터랙션 시뮬레이션' },
      { title: 'Design system', sub: '컴포넌트 라이브러리' },
      { title: 'Usability test', sub: '사용성 검증' },
      { title: 'Accessibility', sub: '접근성 가이드' },
      { title: 'Motion design', sub: '전환 애니메이션' },
      { title: 'Responsive', sub: '다양한 해상도 대응' },
      { title: 'Dark mode', sub: '테마 시스템 구축' },
    ]
  },
  {
    id: 'ai', label: 'AI', num: '02',
    cards: [
      { title: 'LLM integration', sub: '언어 모델 연동' },
      { title: 'Prompt design', sub: '프롬프트 엔지니어링' },
      { title: 'RAG pipeline', sub: '검색 증강 생성' },
      { title: 'Fine-tuning', sub: '도메인 특화 학습' },
      { title: 'Embedding', sub: '벡터 검색 시스템' },
      { title: 'Agent workflow', sub: '자율 작업 자동화' },
      { title: 'Evaluation', sub: '모델 성능 평가' },
      { title: 'Safety layer', sub: '출력 필터링 설계' },
    ]
  },
  {
    id: 'ct', label: 'Contents', num: '03',
    cards: [
      { title: 'Copywriting', sub: '브랜드 텍스트 작성' },
      { title: 'SEO strategy', sub: '검색 최적화 콘텐츠' },
      { title: 'SNS posts', sub: '소셜 채널 운영' },
      { title: 'Video script', sub: '영상 스크립트 기획' },
      { title: 'Blog articles', sub: '롱폼 콘텐츠 제작' },
      { title: 'Email campaign', sub: '뉴스레터 설계' },
      { title: 'Localization', sub: '다국어 콘텐츠 변환' },
      { title: 'Analytics', sub: '콘텐츠 성과 측정' },
    ]
  },
  {
    id: 'pk', label: 'Package', num: '04',
    cards: [
      { title: 'Starter', sub: '개인 프로젝트 시작' },
      { title: 'Pro', sub: '팀 협업 기능 포함' },
      { title: 'Business', sub: '조직 전체 배포' },
      { title: 'Enterprise', sub: '전용 인프라 제공' },
      { title: 'API access', sub: '개발자 직접 연동' },
      { title: 'White-label', sub: '브랜드 커스터마이징' },
      { title: 'Support+', sub: '전담 매니저 배정' },
      { title: 'Custom', sub: '요구사항 맞춤 구성' },
    ]
  }
];
 
const VISIBLE = 4;
const TOTAL_STEPS = rows[0].cards.length - VISIBLE + 1;
const DURATION = 2400;
 
const gridEl = document.getElementById('grid');
const dotsEl = document.getElementById('dots');
const progressEl = document.getElementById('progress');
const tracks = [];
 
rows.forEach((row, ri) => {
  const rowEl = document.createElement('div');
  rowEl.className = 'grid-row';
 
  const lblWrap = document.createElement('div');
  lblWrap.className = 'row-label-wrap';
  lblWrap.innerHTML = `<span class="row-num">${row.num}</span><span class="row-label ${row.id}">${row.label}</span>`;
  rowEl.appendChild(lblWrap);
 
  const track = document.createElement('div');
  track.className = 'slider-track';
  const inner = document.createElement('div');
  inner.className = 'slider-inner';
 
  row.cards.forEach((c, ci) => {
    const card = document.createElement('div');
    card.className = `card ${row.id}`;
    card.innerHTML = `
      <div class="card-top">
        <span class="card-index">${String(ci + 1).padStart(2, '0')}</span>
        <span class="card-dot"></span>
      </div>
      <div>
        <div class="card-title">${c.title}</div>
        <div class="card-sub">${c.sub}</div>
      </div>`;
    inner.appendChild(card);
  });
 
  track.appendChild(inner);
  rowEl.appendChild(track);
  gridEl.appendChild(rowEl);
  tracks.push(inner);
});
 
for (let i = 0; i < TOTAL_STEPS; i++) {
  const d = document.createElement('div');
  d.className = 'dot' + (i === 0 ? ' active' : '');
  d.addEventListener('click', () => { goTo(i); resetTimer(); });
  dotsEl.appendChild(d);
}
 
let cur = 0, paused = false, timer, progTimer;
 
function goTo(idx) {
  cur = (idx + TOTAL_STEPS) % TOTAL_STEPS;
  tracks.forEach(inner => {
    const cardW = inner.children[0].offsetWidth;
    inner.style.transform = `translateX(-${cur * (cardW + 10)}px)`;
  });
  document.querySelectorAll('.dot').forEach((d, i) => d.classList.toggle('active', i === cur));
}
 
function startProgress() {
  progressEl.classList.remove('animating');
  progressEl.style.transition = 'none';
  progressEl.style.width = '0%';
  clearTimeout(progTimer);
  progTimer = setTimeout(() => {
    progressEl.style.transition = `width ${DURATION}ms linear`;
    progressEl.classList.add('animating');
  }, 20);
}
 
function resetTimer() {
  clearInterval(timer);
  if (!paused) {
    startProgress();
    timer = setInterval(() => { goTo(cur + 1); startProgress(); }, DURATION);
  }
}
 
document.getElementById('prev').addEventListener('click', () => { goTo(cur - 1); resetTimer(); });
document.getElementById('next').addEventListener('click', () => { goTo(cur + 1); resetTimer(); });
document.getElementById('pause').addEventListener('click', function () {
  paused = !paused;
  this.textContent = paused ? 'PLAY' : 'PAUSE';
  this.classList.toggle('active-play', !paused);
  if (paused) {
    clearInterval(timer);
    progressEl.style.transition = 'none';
  } else {
    resetTimer();
  }
});
 
function updateClock() {
  const now = new Date();
  document.getElementById('clock').textContent =
    now.toLocaleTimeString('ko-KR', { hour12: false });
}
setInterval(updateClock, 1000);
updateClock();
 
goTo(0);
resetTimer();
</script>