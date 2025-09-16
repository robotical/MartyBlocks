// rtttl-player.js
// A tiny WebAudio RTTTL player for browsers / Scratch GUI

export function createRTTTLPlayer({ audioContext } = {}) {
  /** Singleton context per player */
  let ctx = audioContext || null;
  let masterGain = null;
  let scheduled = [];     // nodes to stop on cancel
  let playing = false;
  let endTimer = null;

  function getCtx() {
    if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
    if (ctx.state === 'suspended') ctx.resume();
    return ctx;
  }

  const NOTE_INDEX = { c:0,'c#':1,d:2,'d#':3,e:4,f:5,'f#':6,g:7,'g#':8,a:9,'a#':10,b:11 };
  function noteToFreq(noteName, octave) {
    const idx = NOTE_INDEX[noteName.toLowerCase()];
    if (idx == null) return null;
    const midi = (octave + 1) * 12 + idx;           // C4=60
    return 440 * Math.pow(2, (midi - 69) / 12);
  }

  function parseRTTTL(str) {
    const parts = str.split(':');
    if (parts.length < 3) throw new Error('Invalid RTTTL: expected name:defaults:notes');
    const name = parts[0].trim();
    const defaults = Object.fromEntries(
      parts[1].split(',').map(s => s.trim().split('=').map(x => x.trim().toLowerCase()))
    );
    const d = parseInt(defaults.d ?? '4', 10);
    const o = parseInt(defaults.o ?? '6', 10);
    const b = parseInt(defaults.b ?? '63', 10);
    const whole = (60 / b) * 4; // sec

    const noteToks = parts.slice(2).join(':').split(',').map(s => s.trim()).filter(Boolean);
    const events = noteToks.map(tok => {
      let i = 0;

      // duration denominator
      let num = '';
      while (i < tok.length && /\d/.test(tok[i])) num += tok[i++];
      const denom = num ? parseInt(num, 10) : d;

      if (!tok[i]) throw new Error('Empty note token');
      let sym = tok[i].toLowerCase();

      // rest
      if (sym === 'p') {
        i++;
        let dotted = false;
        if (tok[i] === '.') { dotted = true; i++; }
        if (/[0-7]/.test(tok[i])) i++; // consume octave if given
        let dur = whole / denom;
        if (dotted) dur *= 1.5;
        return { type: 'rest', duration: dur };
      }

      // note
      if (!/[a-g]/.test(sym)) throw new Error(`Bad note '${sym}'`);
      i++;
      if (tok[i] === '#') { sym += '#'; i++; }
      let dotted = false;
      if (tok[i] === '.') { dotted = true; i++; }
      let oct = o;
      if (/[0-7]/.test(tok[i])) { oct = parseInt(tok[i], 10); i++; }

      let dur = whole / denom;
      if (dotted) dur *= 1.5;
      const freq = noteToFreq(sym, oct);
      if (freq == null) throw new Error(`Bad note ${sym}${oct}`);
      return { type: 'note', freq, duration: dur };
    });

    return { name, defaults: { d, o, b }, whole, events };
  }

  function clearScheduled() {
    scheduled.forEach(node => {
      try { node.stop(0); } catch {}
      try { node.disconnect(); } catch {}
    });
    scheduled = [];
  }

  async function play(rtttl, opts = {}) {
    const { gapPct = 10, waveform = 'sine', volume = 0.9 } = opts;
    const ac = getCtx();

    // prepare master gain
    if (!masterGain) {
      masterGain = ac.createGain();
      masterGain.connect(ac.destination);
    }
    masterGain.gain.setValueAtTime(Math.max(0, Math.min(1, volume)), ac.currentTime);

    // parse & schedule
    const { events } = parseRTTTL(rtttl);
    playing = true;
    clearScheduled();
    if (endTimer) { clearTimeout(endTimer); endTimer = null; }

    let t = ac.currentTime + 0.02; // small offset to avoid immediate click
    let lastEnd = t;

    const attack = 0.005, decay = 0.03, sustain = 0.7, release = 0.04;
    const peak = 0.8;

    for (const ev of events) {
      const gap = ev.duration * (gapPct / 100);
      const playDur = Math.max(0, ev.duration - gap);

      if (ev.type === 'rest') {
        t += ev.duration;
        lastEnd = t;
        continue;
      }

      const osc = ac.createOscillator();
      osc.type = waveform;
      const gain = ac.createGain();

      // envelope
      gain.gain.cancelScheduledValues(t);
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(peak, t + attack);
      gain.gain.linearRampToValueAtTime(peak * sustain, t + attack + decay);

      const noteEnd = t + playDur;
      gain.gain.setValueAtTime(peak * sustain, noteEnd);
      gain.gain.linearRampToValueAtTime(0.0001, noteEnd + release);

      osc.frequency.setValueAtTime(ev.freq, t);
      osc.connect(gain).connect(masterGain);
      osc.start(t);
      osc.stop(noteEnd + release + 0.005);

      scheduled.push(osc, gain);
      t += ev.duration;
      lastEnd = noteEnd + release + 0.01;
    }

    // Resolve when done (or earlier if stopped)
    await new Promise(resolve => {
      if (!playing) return resolve();
      const ms = Math.max(0, (lastEnd - ac.currentTime) * 1000 + 10);
      endTimer = setTimeout(() => {
        playing = false;
        clearScheduled();
        resolve();
      }, ms);
    });
  }

  function stop() {
    if (!playing) return;
    playing = false;
    if (endTimer) clearTimeout(endTimer);
    endTimer = null;
    clearScheduled();
    // fast fade master to avoid clicks if something is still ringing
    const ac = getCtx();
    if (masterGain) {
      const t = ac.currentTime;
      masterGain.gain.cancelScheduledValues(t);
      masterGain.gain.setValueAtTime(masterGain.gain.value, t);
      masterGain.gain.linearRampToValueAtTime(0.0001, t + 0.03);
      masterGain.gain.setValueAtTime(0.9, t + 0.05); // restore for next play
    }
  }

  return {
    play,
    stop,
    get isPlaying() { return playing; }
  };
}