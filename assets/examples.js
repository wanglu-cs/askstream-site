'use strict';

(() => {
  const cases = window.ASKSTREAM_EXAMPLES;
  let caseIndex = 0;
  let turnIndex = 0;
  let optionType = 'action';
  let currentTime = 0;
  let referenceVisible = false;
  const choices = new Map();
  const writtenAnswers = new Map();
  const writtenQuestions = new Map();
  let loadingVideo = false;
  let resumeAfterLoad = false;
  const find = selector => document.querySelector(selector);
  const video = find('#case-video');
  const scrubber = find('#case-scrubber');
  const timeText = value => {
    const ticks = Math.round(value * 100);
    return `${String(Math.floor(ticks / 6000)).padStart(2, '0')}:${((ticks % 6000) / 100).toFixed(2).padStart(5, '0')}`;
  };
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
      const intervals = Object.entries(turn.windows).filter(([, value]) => value).map(([phase, value]) => [
        {waiting: 'wait', asking: 'ask', answering: 'answer'}[phase], value.start_s, value.end_s
      ]);
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
      const timestamps = [['Query', turn.start], ['Ask', turn.ask]];
      if (turn.answer !== null) timestamps.push(['Answer', turn.answer]);
      timestamps.forEach(([kind, time]) => {
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
      if (turn.answer === null) {
        const note = document.createElement('span');
        note.className = 'conditional-answer';
        note.textContent = 'Answer after reply';
        group.append(note);
      }
      markers.append(group);
    });
    const playhead = document.createElement('div');
    playhead.className = 'timeline-playhead';
    playhead.setAttribute('aria-hidden', 'true');
    windows.append(playhead);
    scrubber.max = item.duration;
    markers.style.gridTemplateColumns = `repeat(${Math.min(item.turns.length, 3)}, minmax(0, 1fr))`;
    find('#total-time').textContent = timeText(item.duration);
  }

  function renderOptions() {
    const turn = activeTurn();
    const openQuestion = optionType === 'action' && turn.actionMode === 'open';
    const options = optionType === 'action' ? turn.actionOptions : turn.answerOptions;
    const correct = optionType === 'action' ? turn.correctActions : [turn.correctAnswer];
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
      label.classList.toggle('reference-correct', referenceVisible && correct.includes(index));
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
      if (optionType === 'answer' && turn.answerImages[index]) {
        const img = document.createElement('img');
        img.src = turn.answerImages[index];
        img.alt = option;
        img.loading = 'lazy';
        img.className = 'option-image';
        label.append(img);
      }
      list.append(label);
    });
    if (openQuestion || (optionType === 'answer' && turn.answerMode === 'open')) {
      const responses = openQuestion ? writtenQuestions : writtenAnswers;
      const fieldId = openQuestion ? 'open-question' : 'open-answer';
      const label = document.createElement('label');
      label.textContent = openQuestion ? 'Ask for the personalized definitions needed to answer the query.' : 'Write the reminder you would give.';
      label.htmlFor = fieldId;
      const input = document.createElement('textarea');
      input.id = fieldId;
      input.rows = 3;
      input.value = responses.get(turn.id) || '';
      input.addEventListener('input', () => responses.set(turn.id, input.value));
      list.append(label, input);
    }
    document.querySelectorAll('[data-option-type]').forEach(tab => {
      const active = tab.dataset.optionType === optionType;
      tab.setAttribute('aria-selected', String(active));
      tab.tabIndex = active ? 0 : -1;
    });
    find('#options-panel').setAttribute('aria-labelledby', `${optionType}-options-tab`);
    find('#action-option-count').textContent = turn.actionMode === 'open' ? 'Open' : turn.actionOptions.length;
    find('#action-tab-label').textContent = turn.actionMode === 'open' ? 'Your question' : 'Action options';
    find('#answer-option-count').textContent = turn.answerMode === 'open' ? 'Open' : turn.answerOptions.length;
    find('#answer-tab-label').textContent = turn.answerMode === 'open' ? 'Your answer' : 'Answer options';
  }

  function clearEvidence() {
    find('#evidence-media').querySelectorAll('video').forEach(media => media.pause());
    find('#evidence-media').replaceChildren();
  }

  function renderEvidence() {
    const turn = activeTurn();
    const panel = find('#evidence-panel');
    // Revealing reference answers must not reset or hide the evidence players.
    if (panel.dataset.turnId === turn.id) return;
    clearEvidence();
    panel.dataset.turnId = turn.id;
    const code = activeCase().code;
    const titles = {KVEM: 'Revealed video', VIM: 'All gold views',
      PACM: 'Action definition', ICM: 'Concept definition'};
    const notes = {
      KVEM: 'The requested region is revealed in this video. Other annotated masks remain in place.',
      VIM: 'Every camera accepted as a gold view for this turn is shown below.',
      PACM: 'Watch the original demonstration that defines the personalized action.',
      ICM: 'The task image and user-provided definition establish the personalized concept.',
      AUQ: 'The user clarifies the intended subject and reminder.',
      WUQ: 'The user confirms the corrected premise and question.',
      UPM: 'The user supplies the missing preference.',
      UPC: 'The user supplies the current preference that replaces the earlier one.'
    };
    find('#evidence-title').textContent = `Evidence · ${titles[code] || 'User reply'}`;
    find('#evidence-turn-label').textContent = `Turn ${turnIndex + 1}`;
    find('#evidence-note').textContent = notes[code];
    find('#evidence-reply').hidden = !turn.userReply;
    find('#evidence-reply-label').textContent = code === 'ICM' ? 'Concept definition' : 'User reply';
    find('#evidence-reply-text').textContent = turn.userReply;
    turn.evidence.forEach((item, index) => {
      const figure = document.createElement('figure');
      const media = document.createElement(item.kind === 'image' ? 'img' : 'video');
      media.src = item.src;
      const label = `${item.label} for ${code}, turn ${turnIndex + 1}`;
      if (item.kind === 'image') media.alt = label;
      else {
        media.controls = true;
        media.playsInline = true;
        media.preload = 'metadata';
        media.muted = true;
        media.dataset.synchronized = String(item.synchronized);
        media.setAttribute('aria-label', label);
        if (item.synchronized) media.addEventListener('loadedmetadata', () => {
          media.currentTime = Math.min(media.duration - 0.05, Math.max(turn.ask + 0.5, currentTime));
        }, {once: true});
      }
      const caption = document.createElement('figcaption');
      caption.textContent = item.label;
      figure.append(media, caption);
      find('#evidence-media').append(figure);
    });
  }

  function syncEvidence() {
    find('#evidence-media').querySelectorAll('video[data-synchronized="true"]').forEach(media => {
      if (media.readyState > 0 && currentTime >= activeTurn().ask && Math.abs(media.currentTime - currentTime) > 0.5) {
        media.currentTime = Math.min(currentTime, media.duration - 0.05);
      }
      if (!video.paused && media.paused && currentTime >= activeTurn().ask) media.play().catch(() => {});
    });
  }

  function renderAnnotation() {
    const turn = activeTurn();
    find('#round-query').textContent = turn.query;
    find('#query-turn-label').textContent = `Turn ${turnIndex + 1} · ${timeText(turn.start)}`;
    find('#reference-ask').textContent = turn.actionMode === 'open' ? turn.referenceAsk : turn.correctActions.map(index => turn.actionOptions[index]).join('\nOR\n');
    find('#reference-answer').textContent = turn.answerMode === 'open' ? turn.referenceAnswer : turn.answerOptions[turn.correctAnswer];
    find('#historical-preference').hidden = !turn.historicalPreference;
    find('#preference-text').textContent = turn.historicalPreference || '';
    find('#timing-note').textContent = turn.actionMode === 'open'
      ? 'Ask for the concept definition as soon as the query appears. After receiving it, wait for the event in the video before answering.'
      : turn.answer === null
      ? 'Within this ASK window, answering becomes valid one evaluation tick after a correct question receives its reply. There is no fixed ANSWER timestamp.'
      : 'Colored windows are the original annotations. ASK marks an eligible interval, not a recorded model action. Answer after receiving the reply and reaching the ANSWER window.';
    find('#reference-panel').hidden = !referenceVisible;
    find('#toggle-reference').setAttribute('aria-expanded', String(referenceVisible));
    find('#toggle-reference').textContent = referenceVisible ? 'Hide reference' : 'Show reference';
    renderOptions();
    renderEvidence();
  }

  function updateTime() {
    const turn = activeTurn();
    const inTurn = currentTime >= turn.start && currentTime < turn.end;
    let phase = currentTime >= activeCase().duration ? 'END OF EXCERPT' : 'OUTSIDE WINDOWS';
    if (inTurn) {
      const within = interval => interval && currentTime >= interval.start_s && currentTime < interval.end_s;
      if (within(turn.windows.answering)) phase = 'ANSWER';
      else if (within(turn.windows.asking)) phase = turn.answer === null ? 'ASK → ANSWER AFTER REPLY' : 'ASK';
      else if (within(turn.windows.waiting)) phase = 'WAIT';
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
    find('#example-status').textContent = `${activeCase().sourceId} · Turn ${turnIndex + 1} of ${activeCase().turns.length} · ${phase.toLowerCase()} · Benchmark annotation`;
  }

  function loadMainVideo() {
    const src = activeTurn().videoSrc;
    if (video.getAttribute('src') === src) return;
    resumeAfterLoad = !video.paused;
    loadingVideo = true;
    video.pause();
    video.poster = activeCase().poster;
    video.src = src;
    video.setAttribute('aria-label', `${activeCase().scene}, turn ${turnIndex + 1}`);
    find('#video-error').hidden = true;
    find('#video-download').href = src;
    video.load();
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
      loadMainVideo();
    }
    updateTime();
    if (syncVideo && !loadingVideo && video.readyState > 0) video.currentTime = currentTime;
    syncEvidence();
  }

  function selectTurn(index) {
    turnIndex = index;
    referenceVisible = false;
    currentTime = activeTurn().start;
    renderRounds();
    renderTimeline();
    renderAnnotation();
    loadMainVideo();
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
    loadMainVideo();
    find('#case-title').textContent = item.title;
    find('#case-category').textContent = `${item.group} / ${item.category}`;
    find('#case-count').textContent = `${item.turns.length} annotated turn${item.turns.length === 1 ? '' : 's'}`;
    const source = find('#case-source');
    source.textContent = `${item.scene} · ${item.sourceDataset} · ${item.sourceId} · Source excerpt 00:00–${timeText(item.duration)}`;
    if (item.sourceUrl) {
      const link = document.createElement('a');
      link.href = item.sourceUrl;
      link.textContent = 'Original source';
      link.target = '_blank';
      link.rel = 'noopener';
      source.append(document.createTextNode(' · '), link);
    }
    renderCasePicker();
    renderRounds();
    renderTimeline();
    renderAnnotation();
    seek(currentTime);
  }

  find('#previous-round').addEventListener('click', () => selectTurn(Math.max(0, turnIndex - 1)));
  find('#next-round').addEventListener('click', () => selectTurn(Math.min(activeCase().turns.length - 1, turnIndex + 1)));
  scrubber.addEventListener('input', event => seek(event.target.value));
  video.addEventListener('timeupdate', () => { if (!loadingVideo) seek(video.currentTime, false); });
  video.addEventListener('loadedmetadata', () => {
    loadingVideo = false;
    video.currentTime = Math.min(currentTime, video.duration);
    if (resumeAfterLoad) video.play().catch(() => {});
    resumeAfterLoad = false;
  });
  video.addEventListener('pause', () => find('#evidence-media').querySelectorAll('video').forEach(media => media.pause()));
  video.addEventListener('error', () => { loadingVideo = false; find('#video-error').hidden = false; });
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
