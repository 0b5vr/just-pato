import { SamplePlayer } from './SamplePlayer';
import clickMp3 from './assets/click.mp3';
import kyuinMp3 from './assets/kyuin.mp3';
import stopMp3 from './assets/stop.mp3';

const audio = new AudioContext();

const players: Record<string, SamplePlayer> = {
  click: new SamplePlayer(audio, clickMp3),
  kyuin: new SamplePlayer(audio, kyuinMp3),
  stop: new SamplePlayer(audio, stopMp3),
};

export function resumeAudio() {
  audio.resume();
}

export function playSample(name: string) {
  const player = players[name];

  if (player == null) {
    throw new Error('playSample: Unknown sample');
  }

  player.play();
}

export function stopAllSamples() {
  for (const player of Object.values(players)) {
    player.stop();
  }
}
