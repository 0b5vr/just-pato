export class SamplePlayer {
  public readonly audio: AudioContext;
  private _buffer: AudioBuffer | null = null;
  private _currentNode: AudioBufferSourceNode | null = null;

  constructor(audio: AudioContext, url?: string) {
    this.audio = audio;

    if (url) {
      this.loadSample(url);
    }
  }

  async loadSample(url: string) {
    const res = await fetch(url);
    const ab = await res.arrayBuffer();
    this._buffer = await this.audio.decodeAudioData(ab);
  }

  play() {
    this.audio.resume();

    stop();

    if (this._buffer == null) {
      throw new Error('SamplePlayer: Sample is not loaded');
    }

    this._currentNode = this.audio.createBufferSource();
    this._currentNode.buffer = this._buffer;
    this._currentNode.connect(this.audio.destination);
    this._currentNode.start();
  }

  stop() {
    if (this._currentNode != null) {
      this._currentNode.stop();
    }
    this._currentNode = null;
  }
}
