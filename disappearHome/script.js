let is_start_animation = false;

document.body.addEventListener(
  "click",
  () => {
    if (!is_start_animation) {
      is_start_animation = true;
      start_animation();
    }
  },
  true
);

function start_animation() {
  var audio = new Audio("res/win95_sound.wav");
  audio.play();
  document.getElementById("end_image").classList.remove("hidden");
  document.getElementById("start_image").classList.add("animate-fade");
}
