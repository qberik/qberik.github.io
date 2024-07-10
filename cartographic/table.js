function setTableHeader(lables) {
  const table_header = document.getElementById("thead");
  table_header.innerHTML = "";

  const tr = document.createElement("tr");
  table_header.appendChild(tr);
  tr.className += "border-b transition-colors hover:bg-gray-200/50";

  lables.map((l) => {
    const th = document.createElement("th");
    tr.appendChild(th);
    th.className += "h-12 px-4 text-left align-middle font-medium";
    th.innerText = l;
  });
}

function insertTableRow(data) {
  const table_body = document.getElementById("tbody");

  const tr = document.createElement("tr");
  table_body.appendChild(tr);
  tr.className += "border-b transition-colors hover:bg-gray-200/50";

  data.map((d) => {
    const td = document.createElement("td");
    tr.appendChild(td);
    td.className += "p-4 align-middle";
    td.innerText = d;
  });

  return tr;
}

function clearTableBody() {
  const table_body = document.getElementById("tbody");
  table_body.innerHTML = "";
}

function showMarkersOnTable() {
  clearTableBody();
  const features = getActiveFeatureGroups().getLayers();
  if (features.length > 0) {
    const feature_with_most_properties = features.reduce((m, i) =>
      Object.keys(i.feature.properties).length >
      Object.keys(m.feature.properties).length
        ? i
        : m
    );
    setTableHeader(
      Object.keys(feature_with_most_properties.feature.properties)
    );
    features.map((f) => {
      if (!isMarkerHidden(f)) {
        insertTableRow(Object.values(f.feature.properties)).addEventListener(
          "click",
          () => {
            if (!presentationStarted) {
              f.openPopup();
              map.setView(f.getLatLng(), 15);
            }
          }
        );
      }
    });
  }
}
