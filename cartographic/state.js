function getMapPosition() {
  return { center: map.getCenter(), zoom: map.getZoom() };
}

function setMapPosition(map_state) {
  const { center, zoom } = map_state;

  map.setView(center, zoom);
}

function getMapState() {
  return JSON.parse(localStorage.getItem("map_position")) || DEFAULT_POSITION;
}

function saveMapState() {
  localStorage.setItem(
    "map_position",
    JSON.stringify({ center: map.getCenter(), zoom: map.getZoom() })
  );
}

function getSelectedLayer() {
  return localStorage.getItem("selected_layer") || DEFAULT_LAYER;
}

function saveSelectedLayer(layer_index) {
  localStorage.setItem("selected_layer", layer_index);
}

function getFilterText() {
  return localStorage.getItem("filter_text") || "";
}

function saveFilterText(filter_text) {
  localStorage.setItem("filter_text", filter_text);
}
