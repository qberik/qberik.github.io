map_state = getMapState();
setMapPosition(map_state);

Promise.all([fetchGeoJson(GEOJSON_FILE_URL), fetchCSV(CSV_FILE_URL)]).then(
  () => {
    saved_layer_name = getSelectedLayer();
    getFeatureGroupByName(saved_layer_name).addTo(map);

    document.getElementById("name_filter").value = getFilterText();
    filterMarkersByName(getFilterText());

    showMarkersOnTable();

    map.on("overlayadd", (e) => {
      saveSelectedLayer(e.name);
      if (presentationStarted) {
        togglePresentationButton();
      }

      getFeatureGroupByName(e.name)
        .getLayers()
        .map((f) => {
          showMarker(f);
        });
      filterMarkersByName(document.getElementById("name_filter").value);
      showMarkersOnTable();
      map.fitBounds(getFeatureGroupByName(e.name).getBounds());
    });

    map.on("zoom", () => {
      saveMapState();
    });

    map.on("move", () => {
      saveMapState();
    });
  }
);
