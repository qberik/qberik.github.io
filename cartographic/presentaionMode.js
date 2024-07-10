let presentationStarted;

async function startPresentation() {
  if (!presentationStarted) {
    map.dragging.disable();
    map.scrollWheelZoom.disable();
    map.doubleClickZoom.disable();

    presentationStarted = true;
    let funcs = Promise.resolve();

    const features = getActiveFeatureGroups().getLayers();

    features.forEach((feature) => {
      if (!isMarkerHidden(feature)) {
        funcs = funcs.then(() => {
          if (!presentationStarted) {
            throw new Error();
          }
          feature.openPopup();
          map.setView(feature.getLatLng(), 15);
          return new Promise((r) => setTimeout(r, PRESENTAION_SWITCH_DELAY));
        });
      }
    });

    funcs.then(() => {
      togglePresentationButton();
    });

    try {
      await funcs;
    } catch (e) {
      console.log(e);
    }
  }
}

function stopPresentaion() {
  map.dragging.enable();
  map.closePopup();
  map.scrollWheelZoom.enable();
  map.doubleClickZoom.enable();
  presentationStarted = false;
}

function togglePresentationButton() {
  Array.from(
    document.getElementsByClassName("presentaion-control-button-icon")
  ).map((i) => {
    i.classList.toggle("hidden");
  });
  presentationStarted ? stopPresentaion() : startPresentation();
}

document
  .getElementsByClassName("presentaion-control-button")[0]
  .addEventListener("click", () => {
    togglePresentationButton();
  });

document
  .getElementById("name_filter")
  .addEventListener("keydown", function (e) {
    if (presentationStarted) {
      togglePresentationButton();
    }
  });
