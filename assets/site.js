'use strict';

// Paper Tables 2 (multiple-choice) and 6 (open-ended), in subtask/metric order:
// KVEM, VIM, ICM, PACM, AUQ, WUQ, UPM, UPC, S_ask, S_ans, Ask-F1.
const models = [
  {name:'GPT-5.6-Sol',group:'closed',mc:[18.10,2.93,3.05,0,15.69,17.50,18.60,26.55,18.11,23.62,20.50],oe:[6.30,3.90,2.80,0,16.20,9.96,7.63,16.52,12.05,18.80,14.69]},
  {name:'Claude Sonnet 5',group:'closed',mc:[21.48,13.01,7.60,9.70,13.28,29.42,7.93,29.53,20.87,24.37,22.48],oe:[13.59,17.62,0,4.78,12.69,12.28,0,19.73,15.88,10.99,12.99]},
  {name:'Gemini-3.8 Flash',group:'closed',mc:[37.17,17.46,33.26,17.73,31.13,43.10,64.03,81.36,44.63,62.80,52.18],oe:[27.61,29.40,35.79,0,35.87,32.12,14.41,18.43,23.34,38.97,29.19]},
  {name:'MiMo-V2.5',group:'open',mc:[28.49,3.73,16.16,0,11.48,11.83,28.66,26.18,10.48,24.38,14.66],oe:[10.15,9.29,2.57,0,7.86,8.90,6.63,0,4.73,25.72,7.99]},
  {name:'Kimi K2.6',group:'open',mc:[23.41,21.56,9.27,0,16.74,34.40,0,30.69,19.35,14.41,16.52],oe:[15.54,0,7.82,0,41.13,15.93,19.31,0,6.12,17.77,9.10]},
  {name:'Qwen-3.8 Flash',group:'open',mc:[21.03,15.81,1.29,9.94,6.28,23.20,4.64,0,31.75,12.17,17.60],oe:[6.03,10.13,1.29,0,7.30,5.52,0,0,12.54,16.03,14.07]},
  {name:'DeepSeek-V4.1-Flash',group:'open',mc:[17.68,2.33,6.27,0,17.97,19.88,6.32,15.27,18.64,20.87,19.69],oe:[6.28,5.74,0,0,26.54,7.50,10.16,11.49,10.09,17.94,12.92]},
  {name:'MOSS-VL-Realtime',group:'streaming',backbone:'Qwen3-8B',mc:[0,0,0,0,0,0,0,0,0.74,0,0],oe:[0,0,0,0,0,0,0,0,0,0,0]},
  {name:'MMDuet2',group:'streaming',backbone:'Qwen2.5-VL-3B',mc:[0,0,0,0,0,0,0,0,0,0,0],oe:[0,0,0,0,0,0,0,0,0,0,0]},
  {name:'VideoLLM-online',group:'streaming',backbone:'Llama-3-8B',mc:[0,0,0,0,0,0,0,0,0,0,0],oe:[0,0,0,0,0,0,0,0,0,0,0]},
  {name:'MiniCPM-o 4.5',group:'streaming',backbone:'Qwen3-8B',mc:[6.76,0,0,0,0,0,0,0,7.17,0.06,0.12],oe:[0,0,0,0,0,0,0,0,0,0,0]},
  {name:'TimeChat-Online',group:'streaming',backbone:'Qwen2.5-VL-7B',mc:[9.29,0,0,0,0,4.15,0,0,12.58,2.51,4.18],oe:[0,0,0,0,0,0,0,0,0,0,0]},
  {name:'JoyAI-VL-Interaction',group:'streaming',backbone:'JoyAI-VL-1.0',mc:[5.73,0,0,0,0,4.03,0,0,7.54,3.64,4.91],oe:[0,0,2.89,0,0,0,0,0,0.43,7.75,0.81]},
  {name:'AURA',group:'streaming',backbone:'Qwen3-VL-8B',mc:[8.31,4.35,0,0,5.26,2.93,0,0,10.85,5.41,7.22],oe:[4.19,5.76,0,0,6.50,0,0,0,2.77,7.25,4.01]}
];
const groupNames = {closed:'Offline closed-source',open:'Offline open-source',streaming:'Streaming proactive'};
const metricNames = ['KVEM','VIM','ICM','PACM','AUQ','WUQ','UPM','UPC','S_ask','S_ans','Ask-F1'];
let setting = 'mc';
let sortColumn = 10;
let descending = true;
const modelFilter = document.querySelector('#model-filter');

function renderResults() {
  const visible = models.filter(model => modelFilter.value === 'all' || model.group === modelFilter.value);
  visible.sort((a,b) => (descending ? -1 : 1) * (a[setting][sortColumn] - b[setting][sortColumn]) || a.name.localeCompare(b.name));
  const maximums = metricNames.map((_,column) => Math.max(...visible.map(model => model[setting][column])));
  const body = document.querySelector('#results-body');
  body.replaceChildren();
  visible.forEach((model,index) => {
    const row = document.createElement('tr');
    if (model[setting][10] === maximums[10]) row.classList.add('best-row');
    const rank = document.createElement('td');
    const rankBadge = document.createElement('span');
    rankBadge.className = `rank-badge${index < 3 ? ' rank-' + (index + 1) : ''}`;
    rankBadge.textContent = index + 1;
    rank.append(rankBadge);
    row.append(rank);
    const name = document.createElement('th');
    name.scope = 'row';
    name.className = 'model-cell';
    name.append(document.createTextNode(model.name));
    const detail = document.createElement('small');
    detail.textContent = model.backbone ? `${groupNames[model.group]} · ${model.backbone}` : groupNames[model.group];
    name.append(detail);
    row.append(name);
    model[setting].forEach((value,column) => {
      const cell = document.createElement('td');
      cell.textContent = value.toFixed(2);
      if (column === 10) {
        cell.classList.add('score-cell');
        const score = document.createElement('span');
        score.className = 'score-value';
        score.textContent = value.toFixed(2);
        const bar = document.createElement('span');
        bar.className = 'score-bar';
        bar.style.setProperty('--score', `${value}%`);
        bar.setAttribute('aria-hidden', 'true');
        cell.replaceChildren(score, bar);
      }
      if (value > 0 && value === maximums[column]) cell.classList.add('best-number');
      row.append(cell);
    });
    body.append(row);
  });
  document.querySelectorAll('[data-sort]').forEach(button => {
    const active = Number(button.dataset.sort) === sortColumn;
    button.querySelector('.sort-arrow').textContent = active ? (descending ? '↓' : '↑') : '↕';
    button.setAttribute('aria-label', `Sort by ${metricNames[Number(button.dataset.sort)]}${active ? `, currently ${descending ? 'descending' : 'ascending'}` : ''}`);
    button.closest('th').removeAttribute('aria-sort');
    if (active) button.closest('th').setAttribute('aria-sort', descending ? 'descending' : 'ascending');
  });
  document.querySelector('#visible-model-count').textContent = visible.length;
  document.querySelector('#best-score').replaceChildren(document.createTextNode(maximums[10].toFixed(2)));
  const percent = document.createElement('span');
  percent.textContent = '%';
  document.querySelector('#best-score').append(percent);
  const label = setting === 'mc' ? 'Multiple-choice' : 'Open-ended';
  document.querySelector('#results-status').textContent = `${visible.length} models · ${label} · Paper Table ${setting === 'mc' ? '2' : '6'}`;
  document.querySelector('#table-description').textContent = `Sorted by ${metricNames[sortColumn]} (${descending ? 'highest first' : 'lowest first'}). Select a column heading to sort.`;
}

document.querySelectorAll('[data-setting]').forEach(button => {
  button.addEventListener('click', () => {
    setting = button.dataset.setting;
    document.querySelectorAll('[data-setting]').forEach(tab => {
      tab.classList.toggle('active',tab === button);
      tab.setAttribute('aria-pressed',String(tab === button));
    });
    renderResults();
  });
});
document.querySelectorAll('[data-sort]').forEach(button => {
  button.addEventListener('click', () => {
    const next = Number(button.dataset.sort);
    descending = next === sortColumn ? !descending : true;
    sortColumn = next;
    renderResults();
  });
});
modelFilter.addEventListener('change',renderResults);
renderResults();

document.querySelector('#copy-citation').addEventListener('click', async () => {
  const text = document.querySelector('#citation-code').textContent;
  const status = document.querySelector('#copy-status');
  try {
    if (!navigator.clipboard || !window.isSecureContext) throw new Error('Clipboard unavailable');
    await navigator.clipboard.writeText(text);
    status.textContent = 'Citation copied to clipboard.';
  } catch {
    const range = document.createRange();
    range.selectNodeContents(document.querySelector('#citation-code'));
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    status.textContent = 'Citation selected. Press Ctrl+C (or ⌘C) to copy.';
  }
});

const backToTop = document.querySelector('.back-to-top');
const coverObserver = new IntersectionObserver(entries => {
  backToTop.hidden = entries[0].isIntersecting;
  document.querySelector('.cover').classList.toggle('is-offscreen', !entries[0].isIntersecting);
});
coverObserver.observe(document.querySelector('.cover'));


// Visitors can pause the decorative motion; offscreen tabs and reduced-motion
// preferences stop it as well.
const cover = document.querySelector('.cover');
const coverMotion = document.querySelector('#cover-motion');
coverMotion.addEventListener('click', () => {
  const paused = cover.classList.toggle('motion-paused');
  coverMotion.setAttribute('aria-pressed', String(paused));
  coverMotion.setAttribute('aria-label', paused ? 'Resume cover animation' : 'Pause cover animation');
  coverMotion.querySelector('.motion-symbol').textContent = paused ? '▷' : 'Ⅱ';
  coverMotion.querySelector('.motion-text').textContent = paused ? 'Resume motion' : 'Pause motion';
});
document.addEventListener('visibilitychange', () => {
  cover.classList.toggle('is-offscreen', document.hidden || cover.getBoundingClientRect().bottom <= 0);
});
