(() => {
  if (localStorage.getItem("theme") === "light") {
    toggle_theme();
    localStorage.setItem("theme", "light");
  }
})();

function toggle_theme() {
  document.body.classList.toggle("dark");
  document.body.classList.toggle("bg-gray-800");
  document.getElementById("theme_icon_sun").classList.toggle("collapse");
  document.getElementById("theme_icon_moon").classList.toggle("collapse");
  localStorage.setItem(
    "theme",
    localStorage.getItem("theme") === "light" ? "dark" : "light"
  );
}
