/**
 * Controlador de recorrido automático en español (sin términos en inglés).
 */
window.DataStoryApp = window.DataStoryApp || {};

window.DataStoryApp.StorytellingModule = (function () {
  let isPlaying = false;
  let playTimer = null;
  const DURATION_MS = 9000;

  function toggleAutoPlay(onNextChapter) {
    const btn = document.getElementById("btnAutoPlay");
    if (isPlaying) {
      stopAutoPlay();
    } else {
      isPlaying = true;
      if (btn) {
        btn.innerHTML = '<i class="fa-solid fa-pause"></i> Pausar recorrido';
      }
      playTimer = setInterval(() => {
        if (onNextChapter) onNextChapter();
      }, DURATION_MS);
    }
  }

  function stopAutoPlay() {
    isPlaying = false;
    clearInterval(playTimer);
    playTimer = null;
    const btn = document.getElementById("btnAutoPlay");
    if (btn) {
      btn.innerHTML = '<i class="fa-solid fa-play"></i> Recorrido automático';
    }
  }

  return { toggleAutoPlay, stopAutoPlay };
})();
