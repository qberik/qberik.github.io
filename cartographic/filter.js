function filterMarkersByName(name) {
  const features = getActiveFeatureGroups().getLayers();

  features.map((f) => {
    if (
      // Проверяется name и name_ru
      (f.feature.properties.name && f.feature.properties.name.includes(name)) ||
      (f.feature.properties.name_ru &&
        f.feature.properties.name_ru.includes(name))
    ) {
      showMarker(f);
    } else {
      hideMarker(f);
    }
  });
}

function isMarkerHidden(f) {
  return f._icon.style.display == "none";
}

function hideMarker(f) {
  f.setOpacity(0);
  f._icon.style.display = "none";
}

function showMarker(f) {
  f.setOpacity(100);
  f._icon.style.display = "block";
}

document.getElementById("name_filter").addEventListener("input", (e) => {
  saveFilterText(e.target.value);
  filterMarkersByName(e.target.value);
  showMarkersOnTable();
});
