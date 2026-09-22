# assets/audio/  (all optional)

Nothing autoplays. Sounds only start after the visitor taps something.

| File (suggested) | Enable in `birthdayConfig.audio` | Played when |
| --- | --- | --- |
| `music.mp3`  | `music: "assets/audio/music.mp3"`     | A small ♪ button appears; music plays only when tapped |
| `paper.mp3`  | `envelope: "assets/audio/paper.mp3"`  | An envelope opens |
| `blow.mp3`   | `blow: "assets/audio/blow.mp3"`       | The candle goes out |
| `cheer.mp3`  | `cheer: "assets/audio/cheer.mp3"`     | Confetti bursts |

Use MP3 (best compatibility) or M4A. Keep music under ~3 MB.
Leave a path as `""` to disable that sound. Missing files are ignored silently.
