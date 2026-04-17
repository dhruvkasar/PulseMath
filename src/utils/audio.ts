export class AudioEngine {
  private ctx: AudioContext | null = null;
  private nextNoteTime: number = 0;
  private timerID: NodeJS.Timeout | null = null;
  private lookahead: number = 25.0; // ms
  private scheduleAheadTime: number = 0.1; // s
  private currentBeat: number = 0;
  private bpm: number = 100;
  private isPlaying: boolean = false;
  
  public onBeat?: (beatNumber: number, time: number) => void;

  init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
  }

  setBPM(bpm: number) {
    this.bpm = bpm;
  }

  playCorrectChime() {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, this.ctx.currentTime); // A5
    osc.frequency.exponentialRampToValueAtTime(1760, this.ctx.currentTime + 0.1); // A6
    
    gain.gain.setValueAtTime(0, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.3, this.ctx.currentTime + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.5);
    
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    
    osc.start();
    osc.stop(this.ctx.currentTime + 0.5);
  }

  playWrongBuzz() {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(150, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(80, this.ctx.currentTime + 0.3);
    
    gain.gain.setValueAtTime(0, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.3, this.ctx.currentTime + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.3);
    
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    
    osc.start();
    osc.stop(this.ctx.currentTime + 0.3);
  }

  playComboHorn() {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.type = 'square';
    osc.frequency.setValueAtTime(440, this.ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(660, this.ctx.currentTime + 0.2);
    osc.frequency.linearRampToValueAtTime(880, this.ctx.currentTime + 0.4);
    
    gain.gain.setValueAtTime(0, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.2, this.ctx.currentTime + 0.1);
    gain.gain.setValueAtTime(0.2, this.ctx.currentTime + 0.3);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.6);
    
    // Add some filter for a more "horn" like sound
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(2000, this.ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(400, this.ctx.currentTime + 0.6);
    
    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);
    
    osc.start();
    osc.stop(this.ctx.currentTime + 0.6);
  }

  private nextNote() {
    const secondsPerBeat = 60.0 / this.bpm;
    this.nextNoteTime += secondsPerBeat;
    this.currentBeat++;
  }

  private scheduleNote(beatNumber: number, time: number) {
    if (!this.ctx) return;
    
    // Play a background beat (kick drum sound)
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    // Kick drum synthesis
    osc.type = 'sine';
    // Emphasize the downbeat
    const freq = beatNumber % 4 === 0 ? 150 : 100;
    osc.frequency.setValueAtTime(freq, time);
    osc.frequency.exponentialRampToValueAtTime(0.01, time + 0.5);
    
    gain.gain.setValueAtTime(0, time);
    gain.gain.linearRampToValueAtTime(beatNumber % 4 === 0 ? 0.4 : 0.2, time + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.01, time + 0.2);
    
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    
    osc.start(time);
    osc.stop(time + 0.2);

    // Also maybe a hi-hat on the offbeats
    if (beatNumber % 2 !== 0) {
      const hatOsc = this.ctx.createOscillator();
      const hatGain = this.ctx.createGain();
      const bandpass = this.ctx.createBiquadFilter();
      
      hatOsc.type = 'square';
      hatOsc.frequency.value = 8000;
      
      bandpass.type = 'bandpass';
      bandpass.frequency.value = 10000;
      
      hatGain.gain.setValueAtTime(0, time);
      hatGain.gain.linearRampToValueAtTime(0.05, time + 0.01);
      hatGain.gain.exponentialRampToValueAtTime(0.01, time + 0.05);
      
      hatOsc.connect(bandpass);
      bandpass.connect(hatGain);
      hatGain.connect(this.ctx.destination);
      
      hatOsc.start(time);
      hatOsc.stop(time + 0.05);
    }
    
    if (this.onBeat) {
      // Fire callback slightly before the beat so UI can anticipate/sync
      const delay = Math.max(0, time - this.ctx.currentTime);
      setTimeout(() => {
        if (this.isPlaying && this.onBeat) {
            this.onBeat(beatNumber, time);
        }
      }, delay * 1000);
    }
  }

  private scheduler() {
    if (!this.ctx || !this.isPlaying) return;
    
    while (this.nextNoteTime < this.ctx.currentTime + this.scheduleAheadTime) {
      this.scheduleNote(this.currentBeat, this.nextNoteTime);
      this.nextNote();
    }
    
    this.timerID = setTimeout(() => this.scheduler(), this.lookahead);
  }

  start() {
    if (!this.ctx) this.init();
    if (this.isPlaying || !this.ctx) return;
    
    if (this.ctx.state === 'suspended') {
        this.ctx.resume();
    }
    
    this.isPlaying = true;
    this.currentBeat = 0;
    this.nextNoteTime = this.ctx.currentTime + 0.1;
    this.scheduler();
  }

  stop() {
    this.isPlaying = false;
    if (this.timerID) {
      clearTimeout(this.timerID);
      this.timerID = null;
    }
  }
}

export const audioEngine = new AudioEngine();
