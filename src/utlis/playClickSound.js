export const playClickSound = () => {
  const audio = document.getElementById("click-sound");
  if (audio) {
    audio.currentTime = 0;
    audio.play();
  }
};
