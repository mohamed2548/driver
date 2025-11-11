const slider = document.getElementById('slider');
const card = document.getElementById('card');
const label = document.getElementById('label');

function lerp(a,b,t){return a + (b-a)*t}

function update(v){
  const t = v/100;
  let state = 'bad';
  let text = 'سيئ';
  if (t >= 0.34 && t < 0.67){ state = 'mid'; text = 'ليس سيئًا'; }
  else if (t >= 0.67){ state = 'good'; text = 'جيد'; }

  card.dataset.state = state;
  label.textContent = text;

  const left = card.querySelector('.eye--left');
  const right = card.querySelector('.eye--right');
  const mouth = card.querySelector('.mouth');

  const shift = lerp(26, 22, Math.abs(0.5 - t) * 2);
  left.style.left = state === 'good' ? `18%` : `${shift}%`;
  right.style.right = state === 'good' ? `18%` : `${shift}%`;

  const rot = state === 'good' ? 0 : 180;
  const y = state === 'good' ? 8 : (state === 'mid' ? 10 : 8);
  mouth.style.transform = `translateY(${y}px) rotate(${rot}deg)`;
}

slider.addEventListener('input', e => update(+e.target.value));
update(+slider.value);
