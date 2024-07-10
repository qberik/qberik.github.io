var map = L.map("map", {
  // attributionControl: false,
  closePopupOnClick: false,
}).setView(DEFAULT_POSITION.center, DEFAULT_POSITION.zoom);

var map_layer = L.tileLayer(
  "https://tile.openstreetmap.org/{z}/{x}/{y}.png"
).addTo(map);

var metro4all = L.featureGroup({});
var dc_wifi_social = L.featureGroup({});

var groupedOverlays = {
  Маркеры: {
    "portals.csv": metro4all,
    "bars.geojson": dc_wifi_social,
  },
};

L.Control.Button = L.Control.extend({
  options: {
    position: "topleft",
  },
  onAdd: function (map) {
    var container = L.DomUtil.create("div", "leaflet-bar leaflet-control");
    var button = L.DomUtil.create(
      "a",
      "leaflet-control-button presentaion-control-button relative",
      container
    );
    button.innerHTML += PLAY_ICON_HTML;
    button.innerHTML += STOP_ICON_HTML;

    container.title = "Presentaion toggle";
    return container;
  },
  onRemove: function (map) {},
});
var control = new L.Control.Button();
control.addTo(map);

L.control
  .groupedLayers({}, groupedOverlays, {
    exclusiveGroups: [Object.keys(groupedOverlays)[0]],
  })
  .addTo(map);

function getFeatureGroupByName(name) {
  return Object.values(groupedOverlays)[0][name];
}

function getActiveFeatureGroups() {
  return Object.values(Object.values(groupedOverlays)[0]).filter((f) => {
    return map.hasLayer(f);
  })[0];
}
