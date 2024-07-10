const DEFAULT_POSITION = {
  center: {
    lat: 55.74722770885281,
    lng: 37.600195979999995,
  },
  zoom: 11,
};
const DEFAULT_LAYER = "portals.csv";

const GEOJSON_FILE_URL =
  "https://raw.githubusercontent.com/benbalter/dc-wifi-social/master/bars.geojson";

const CSV_FILE_URL =
  "https://raw.githubusercontent.com/nextgis/metro4all/master/data/msk/portals.csv";

const PRESENTAION_SWITCH_DELAY = 2000;

const PLAY_ICON_HTML =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="absolute size-full p-1 presentaion-control-button-icon" > <path d="M6.3 2.84A1.5 1.5 0 0 0 4 4.11v11.78a1.5 1.5 0 0 0 2.3 1.27l9.344-5.891a1.5 1.5 0 0 0 0-2.538L6.3 2.841Z" /> </svg>';

const STOP_ICON_HTML =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="absolute size-full p-1 presentaion-control-button-icon hidden"> <path d="M5.75 3a.75.75 0 0 0-.75.75v12.5c0 .414.336.75.75.75h1.5a.75.75 0 0 0 .75-.75V3.75A.75.75 0 0 0 7.25 3h-1.5ZM12.75 3a.75.75 0 0 0-.75.75v12.5c0 .414.336.75.75.75h1.5a.75.75 0 0 0 .75-.75V3.75a.75.75 0 0 0-.75-.75h-1.5Z" /> </svg>';
