'use strict';

(() => {
  const cases = window.ASKSTREAM_EXAMPLES;
  let caseIndex = 0;
  let turnIndex = 0;
  let optionType = 'action';
  let currentTime = 0;
  let referenceVisible = false;
  const choices = new Map();
  const find = selector => document.querySelector(selector);
  const video = find('#case-video');
  const scrubber = find('#case-scrubber');
  const timeText = value => `${String(Math.floor(value / 60)).padStart(2, '0')}:${String(Math.floor(value % 60)).padStart(2, '0')}`;
  const activeCase = () => cases[caseIndex];
  const activeTurn = () => activeCase().turns[turnIndex];
  const selectionKey = () => `${activeTurn().id}-${optionType}`;

  function button(text, handler, className = '') {
    const element = document.createElement('button');
    element.type = 'button';
    element.className = className;
    element.textContent = text;
    element.addEventListener('click', handler);
    return element;
  }

  function renderCasePicker() {
    const picker = find('#case-picker');
    if (picker.children.length === cases.length) {
      [...picker.children].forEach((tab, index) => tab.setAttribute('aria-pressed', String(index === caseIndex)));
      return;
    }
    picker.replaceChildren();
    cases.forEach((item, index) => {
      const tab = button('', () => selectCase(index), 'case-button');
      tab.setAttribute('aria-pressed', String(index === caseIndex));
      const code = document.createElement('strong');
      code.textContent = item.code;
      const title = document.createElement('span');
      title.textContent = item.title;
      tab.append(code, title);
      picker.append(tab);
    });
  }

  function renderRounds() {
    const picker = find('#round-picker');
    const focusedIndex = [...picker.children].indexOf(document.activeElement);
    picker.replaceChildren();
    activeCase().turns.forEach((turn, index) => {
      const tab = button('', () => selectTurn(index), 'round-button');
      tab.setAttribute('aria-pressed', String(index === turnIndex));
      const label = document.createElement('strong');
      label.textContent = `Turn ${index + 1}`;
      const time = document.createElement('span');
      time.textContent = `${timeText(turn.start)}–${timeText(turn.end)}`;
      tab.append(label, time);
      picker.append(tab);
    });
    find('#previous-round').disabled = turnIndex === 0;
    find('#next-round').disabled = turnIndex === activeCase().turns.length - 1;
    if (focusedIndex >= 0) picker.children[focusedIndex]?.focus({preventScroll: true});
  }

  function renderTimeline() {
    const item = activeCase();
    const windows = find('#timeline-windows');
    const markers = find('#timeline-markers');
    windows.replaceChildren();
    markers.replaceChildren();
    item.turns.forEach((turn, index) => {
      const intervals = [
        ['wait', turn.start, turn.ask],
        ['ask', turn.ask, turn.askEnd],
        ['wait', turn.askEnd, turn.answer],
        ['answer', turn.answer, turn.end]
      ];
      intervals.forEach(([phase, start, end]) => {
        if (end <= start) return;
        const windowButton = button('', () => seek(start), `timeline-window ${phase}-window`);
        windowButton.style.left = `${start / item.duration * 100}%`;
        windowButton.style.width = `${(end - start) / item.duration * 100}%`;
        windowButton.classList.toggle('current-turn-window', index === turnIndex);
        windowButton.setAttribute('aria-label', `Turn ${index + 1}: ${phase.toUpperCase()} window ${timeText(start)} to ${timeText(end)}`);
        windowButton.title = windowButton.getAttribute('aria-label');
        windows.append(windowButton);
      });
      const group = document.createElement('div');
      group.className = 'timestamp-group';
      group.classList.toggle('active', index === turnIndex);
      const label = document.createElement('span');
      label.className = 'timestamp-turn';
      label.textContent = `T${index + 1}`;
      group.append(label);
      [['Query', turn.start], ['Ask', turn.ask], ['Answer', turn.answer]].forEach(([kind, time]) => {
        const marker = button('', () => seek(time), `timestamp-button timestamp-${kind.toLowerCase()}`);
        const text = document.createElement('span');
        text.textContent = kind;
        const timestamp = document.createElement('time');
        timestamp.textContent = timeText(time);
        marker.append(text, timestamp);
        marker.dataset.time = time;
        marker.setAttribute('aria-label', `Turn ${index + 1} ${kind} at ${timeText(time)}`);
        group.append(marker);
      });
      markers.append(group);
    });
    const playhead = document.createElement('div');
    playhead.className = 'timeline-playhead';
    playhead.setAttribute('aria-hidden', 'true');
    windows.append(playhead);
    scrubber.max = item.duration;
    find('#total-time').textContent = timeText(item.duration);
  }

  function renderOptions() {
    const turn = activeTurn();
    const options = optionType === 'action' ? turn.actionOptions : turn.answerOptions;
    const correct = optionType === 'action' ? turn.correctAction : turn.correctAnswer;
    const list = find('#option-list');
    list.replaceChildren();
    const legend = document.createElement('legend');
    legend.className = 'sr-only';
    legend.textContent = `Choose ${optionType === 'action' ? 'an action' : 'an answer'} option for turn ${turnIndex + 1}`;
    list.append(legend);
    options.forEach((option, index) => {
      const label = document.createElement('label');
      label.className = 'option-choice';
      label.classList.toggle('selected', choices.get(selectionKey()) === index);
      label.classList.toggle('reference-correct', referenceVisible && index === correct);
      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'example-option';
      radio.value = index;
      radio.checked = choices.get(selectionKey()) === index;
      radio.addEventListener('change', () => {
        choices.set(selectionKey(), index);
        // Update classes without replacing the focused radio input.
        list.querySelectorAll('.option-choice').forEach((element, position) => {
          element.classList.toggle('selected', position === index);
        });
      });
      const letter = document.createElement('span');
      letter.className = 'option-letter';
      letter.textContent = String.fromCharCode(65 + index);
      const text = document.createElement('span');
      text.className = 'option-text';
      text.textContent = option;
      label.append(radio, letter, text);
      list.append(label);
    });
    document.querySelectorAll('[data-option-type]').forEach(tab => {
      const active = tab.dataset.optionType === optionType;
      tab.setAttribute('aria-selected', String(active));
      tab.tabIndex = active ? 0 : -1;
    });
    find('#options-panel').setAttribute('aria-labelledby', `${optionType}-options-tab`);
    find('#action-option-count').textContent = turn.actionOptions.length;
    find('#answer-option-count').textContent = turn.answerOptions.length;
  }

  function renderAnnotation() {
    const turn = activeTurn();
    find('#round-query').textContent = turn.query;
    find('#query-turn-label').textContent = `Turn ${turnIndex + 1} · ${timeText(turn.start)}`;
    find('#reference-ask').textContent = turn.actionOptions[turn.correctAction];
    find('#reference-reply').textContent = turn.userReply;
    find('#reference-answer').textContent = turn.answerOptions[turn.correctAnswer];
    find('#reference-panel').hidden = !referenceVisible;
    find('#toggle-reference').setAttribute('aria-expanded', String(referenceVisible));
    find('#toggle-reference').textContent = referenceVisible ? 'Hide reference' : 'Show reference';
    renderOptions();
  }

  function updateTime() {
    const turn = activeTurn();
    const inTurn = currentTime >= turn.start && currentTime < turn.end;
    let phase = 'BETWEEN TURNS';
    if (inTurn) {
      phase = currentTime >= turn.answer ? 'ANSWER' : currentTime >= turn.ask && currentTime < turn.askEnd ? 'ASK' : 'WAIT';
    }
    scrubber.value = currentTime;
    scrubber.setAttribute('aria-valuetext', `${timeText(currentTime)}, ${phase.toLowerCase()}`);
    scrubber.style.setProperty('--progress', `${currentTime / activeCase().duration * 100}%`);
    find('#current-time').textContent = timeText(currentTime);
    find('#video-phase').textContent = phase;
    find('#video-phase').dataset.phase = phase.toLowerCase();
    find('.timeline-playhead').style.left = `${currentTime / activeCase().duration * 100}%`;
    document.querySelectorAll('.timestamp-button').forEach(marker => {
      if (Number(marker.dataset.time) === currentTime) marker.setAttribute('aria-current', 'time');
      else marker.removeAttribute('aria-current');
    });
    find('#example-status').textContent = `${activeCase().code} · Turn ${turnIndex + 1} of ${activeCase().turns.length} · ${timeText(currentTime)} · ${phase.toLowerCase()} · Simulated annotation`;
  }

  function seek(time, syncVideo = true) {
    currentTime = Math.max(0, Math.min(activeCase().duration, Number(time)));
    const nextIndex = Math.max(0, activeCase().turns.findLastIndex(turn => turn.start <= currentTime));
    if (nextIndex !== turnIndex) {
      turnIndex = nextIndex;
      referenceVisible = false;
      renderRounds();
      renderTimeline();
      renderAnnotation();
    }
    updateTime();
    if (syncVideo && activeCase().videoSrc && video.readyState > 0) video.currentTime = currentTime;
  }

  function selectTurn(index) {
    turnIndex = index;
    referenceVisible = false;
    currentTime = activeTurn().start;
    renderRounds();
    renderTimeline();
    renderAnnotation();
    seek(currentTime);
  }

  function selectCase(index) {
    video.pause();
    caseIndex = index;
    turnIndex = 0;
    optionType = 'action';
    referenceVisible = false;
    currentTime = activeTurn().start;
    const item = activeCase();
    video.hidden = !item.videoSrc;
    find('#case-video-placeholder').hidden = Boolean(item.videoSrc);
    if (item.videoSrc) video.src = item.videoSrc;
    else video.removeAttribute('src');
    video.load();
    find('#case-title').textContent = item.title;
    find('#case-category').textContent = `${item.group} / ${item.category}`;
    find('#case-scene').textContent = item.scene;
    renderCasePicker();
    renderRounds();
    renderTimeline();
    renderAnnotation();
    updateTime();
  }

  find('#previous-round').addEventListener('click', () => selectTurn(Math.max(0, turnIndex - 1)));
  find('#next-round').addEventListener('click', () => selectTurn(Math.min(activeCase().turns.length - 1, turnIndex + 1)));
  scrubber.addEventListener('input', event => seek(event.target.value));
  video.addEventListener('timeupdate', () => seek(video.currentTime, false));
  video.addEventListener('loadedmetadata', () => { video.currentTime = currentTime; });
  document.querySelectorAll('[data-option-type]').forEach(tab => {
    tab.addEventListener('click', () => {
      optionType = tab.dataset.optionType;
      renderOptions();
    });
    tab.addEventListener('keydown', event => {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      optionType = event.key === 'Home' ? 'action' : event.key === 'End' ? 'answer' : optionType === 'action' ? 'answer' : 'action';
      renderOptions();
      find(`#${optionType}-options-tab`).focus();
    });
  });
  find('#toggle-reference').addEventListener('click', () => {
    referenceVisible = !referenceVisible;
    renderAnnotation();
  });
  selectCase(0);
})();
