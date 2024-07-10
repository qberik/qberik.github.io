async function fetchGeoJson(URL) {
  const res = await fetch(URL);
  const data = await res.json();

  L.geoJson(data, {
    onEachFeature: function (feature, layer) {
      layer
        .addTo(dc_wifi_social)
        .bindPopup(
          Object.entries(feature.properties)
            .map(([key, value]) => `${key}: ${value}`)
            .join(", <br/>")
        )
        .on("click", function (e) {
          map.flyTo(e.latlng, 15);
        });
    },
  });
}

async function fetchCSV(URL) {
  const res = await fetch(URL);
  const csv_text = await res.text();

  const csv = CSVToArray(csv_text, ";");

  csv
    .slice(1, -1)
    .slice(0, 200)
    .map((point) => {
      const marker = L.marker([point[6], point[7]]).bindPopup(
        "<h1>" + point[2] + "</h1><p>name: " + point[3] + "</p>"
      );
      marker.feature = {
        properties: {
          id_entrance: point[0],
          meetcode: point[1],
          name_ru: point[2],
          name: point[3],
          id_station: point[4],
          direction: point[5],
          max_width: point[8],
          min_step: point[9],
          min_step_ramp: point[10],
          lift: point[11],
          lift_minus_step: point[12],
          min_rail_width: point[13],
          max_rail_width: point[14],
          max_angle: point[15],
          escalator: point[16],
          time: point[17],
        },
      };
      marker
        .addTo(metro4all)
        .bindPopup(
          Object.entries(marker.feature.properties)
            .map(([key, value]) => `${key}: ${value}`)
            .join(", ")
        )
        .on("click", function (e) {
          map.flyTo(e.latlng, 15);
        });
    });
}

function CSVToArray(strData, strDelimiter) {
  // взял отсюда
  // https://www.bennadel.com/blog/1504-ask-ben-parsing-csv-strings-with-javascript-exec-regular-expression-command.htm
  strDelimiter = strDelimiter || ",";
  var objPattern = new RegExp(
    "(\\" +
      strDelimiter +
      "|\\r?\\n|\\r|^)" +
      '(?:"([^"]*(?:""[^"]*)*)"|' +
      '([^"\\' +
      strDelimiter +
      "\\r\\n]*))",
    "gi"
  );
  var arrData = [[]];
  var arrMatches = null;
  while ((arrMatches = objPattern.exec(strData))) {
    var strMatchedDelimiter = arrMatches[1];
    if (strMatchedDelimiter.length && strMatchedDelimiter != strDelimiter) {
      arrData.push([]);
    }
    if (arrMatches[2]) {
      var strMatchedValue = arrMatches[2].replace(new RegExp('""', "g"), '"');
    } else {
      var strMatchedValue = arrMatches[3];
    }
    arrData[arrData.length - 1].push(strMatchedValue);
  }
  return arrData;
}
