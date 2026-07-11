export type SoundEffect = 'dice' | 'move' | 'snake' | 'ladder' | 'win';

interface AudioFile {
  url: string;
  volume: number;
}

export class AudioManager {
  private audioContext: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private sounds: Map<SoundEffect, AudioFile> = new Map();
  private volume: number = 0.7;
  private isMuted: boolean = false;

  constructor() {
    this.initAudioContext();
    this.setupSounds();
  }

  private initAudioContext(): void {
    if (typeof window !== 'undefined') {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      this.audioContext = audioContext;
      this.masterGain = audioContext.createGain();
      this.masterGain.connect(audioContext.destination);
      this.updateVolume();
    }
  }

  private setupSounds(): void {
    this.sounds.set('dice', { url: '', volume: 0.6 });
    this.sounds.set('move', { url: '', volume: 0.4 });
    this.sounds.set('snake', { url: '', volume: 0.5 });
    this.sounds.set('ladder', { url: '', volume: 0.5 });
    this.sounds.set('win', { url: '', volume: 0.7 });
  }

  setVolume(volume: number): void {
    this.volume = Math.max(0, Math.min(1, volume));
    this.updateVolume();
  }

  getVolume(): number {
    return this.volume;
  }

  setMuted(muted: boolean): void {
    this.isMuted = muted;
    this.updateVolume();
  }

  isSoundMuted(): boolean {
    return this.isMuted;
  }

  private updateVolume(): void {
    if (this.masterGain) {
      this.masterGain.gain.value = this.isMuted ? 0 : this.volume;
    }
  }

  playSound(soundEffect: SoundEffect): void {
    if (!this.audioContext || !this.masterGain) return;

    const soundConfig = this.sounds.get(soundEffect);
    if (!soundConfig) return;

    try {
      this.generateSoundWave(soundEffect, soundConfig.volume);
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  }

  private generateSoundWave(soundEffect: SoundEffect, volume: number): void {
    if (!this.audioContext || !this.masterGain) return;

    const now = this.audioContext.currentTime;
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.masterGain);

    gainNode.gain.setValueAtTime(volume * 0.3, now);

    switch (soundEffect) {
      case 'dice':
        oscillator.frequency.setValueAtTime(500, now);
        oscillator.frequency.exponentialRampToValueAtTime(300, now + 0.1);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
        oscillator.start(now);
        oscillator.stop(now + 0.15);
        break;

      case 'move':
        oscillator.frequency.setValueAtTime(400, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
        oscillator.start(now);
        oscillator.stop(now + 0.2);
        break;

      case 'snake':
        oscillator.frequency.setValueAtTime(600, now);
        oscillator.frequency.exponentialRampToValueAtTime(100, now + 0.4);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
        oscillator.start(now);
        oscillator.stop(now + 0.4);
        break;

      case 'ladder':
        oscillator.frequency.setValueAtTime(200, now);
        oscillator.frequency.exponentialRampToValueAtTime(600, now + 0.3);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
        oscillator.start(now);
        oscillator.stop(now + 0.3);
        break;

      case 'win':
        const osc1 = this.audioContext.createOscillator();
        const osc2 = this.audioContext.createOscillator();
        const gainNode1 = this.audioContext.createGain();
        const gainNode2 = this.audioContext.createGain();

        osc1.connect(gainNode1);
        osc2.connect(gainNode2);
        gainNode1.connect(this.masterGain);
        gainNode2.connect(this.masterGain);

        osc1.frequency.setValueAtTime(440, now);
        osc2.frequency.setValueAtTime(554, now);

        gainNode1.gain.setValueAtTime(volume * 0.2, now);
        gainNode2.gain.setValueAtTime(volume * 0.2, now);
        gainNode1.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
        gainNode2.gain.exponentialRampToValueAtTime(0.01, now + 0.5);

        osc1.start(now);
        osc2.start(now);
        osc1.stop(now + 0.5);
        osc2.stop(now + 0.5);
        break;
    }
  }
}
