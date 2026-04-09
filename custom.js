

let cur = 0;
const track    = document.getElementById('track');
const navLinks = document.querySelectorAll('.cell-nav a');
const dots     = document.querySelectorAll('.dot');

function goTo(idx, e) {
  if (e) e.preventDefault();
  if (idx < 0 || idx > 2) return;
  cur = idx;

  track.style.transform = `translateX(-${(100/3)*idx}%)`;

  navLinks.forEach((a,i) => a.classList.toggle('active', i===idx));
  dots.forEach((d,i)     => d.classList.toggle('active', i===idx));

  const panels = document.querySelectorAll('.panel');
  panels.forEach((panel, i) => {
    const elems = panel.querySelectorAll('.anim');
    if (i === idx) {
      elems.forEach(el => { el.classList.remove('in'); void el.offsetWidth; });
      requestAnimationFrame(() => elems.forEach(el => el.classList.add('in')));
    }
  });
}

document.addEventListener('keydown', e => {
  if (e.key==='ArrowRight'||e.key==='ArrowDown') goTo(cur+1);
  if (e.key==='ArrowLeft' ||e.key==='ArrowUp')   goTo(cur-1);
});

let tx = null;
const vm = document.querySelector('.cell-main');
vm.addEventListener('touchstart', e => { tx = e.touches[0].clientX; });
vm.addEventListener('touchend',   e => {
  if (tx===null) return;
  const dx = e.changedTouches[0].clientX - tx;
  if (Math.abs(dx)>50) goTo(dx<0 ? cur+1 : cur-1);
  tx = null;
});

window.addEventListener('load', () => goTo(0));

function sendMsg() {
  const email = document.getElementById('c-email').value;
  const msg   = document.getElementById('c-message').value;
  if (!email||!msg) { alert('이메일과 메시지를 입력해주세요.'); return; }
  const t = document.getElementById('toast');
  t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'), 3000);
  ['c-email','c-subject','c-message'].forEach(id=>document.getElementById(id).value='');
}
