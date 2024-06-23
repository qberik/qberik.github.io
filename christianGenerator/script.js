// https://github.com/search?q=api.unsplash.com+Client-ID&type=code
// своровал отсюда кучу ключей, ибо лимиты задолбали,
// ребят сорян, но не надо было их в коде хранить
const UNSPLASH_API_KEYS = [
  "-_FXpmDosD2QfRpTR8zmWlMgyhSbY4IUnR5l2Zeiab0",
  "6rZCOA2q0Iez89FCa9yn7dVMwZIgwNYP3EmOYQZMkSs",
  "B8ESLPW9i2WoL_NeKQMqdHuDREz41AUzulEKkDzxzi8",
  "GCsG0yOG3rE9M-rn2h88IZy6VWNf0WzxBp3mYfs8JPs",
  "S4VRKM4DomJ3UQmRYPnke5aGDI8EbyILsZFiBLKglPw",
  "d-Yj2ad9DYZCGqGZ1kadzNI_gWoF3yt24b6NWDxia2I",
  "eyVUaVX4MgLfbnTCKOMCTfbXPr5W7qER348qnHpDRgI",
  "its6Qjn9K1vQBl1O8plr1iEX6zXYt7Zn3IBD1MK1GLo",
  "klMeLuvFR1zMevDjTISl4Z4bxrpxq1RbmeL1xMtxIx8",
  "4dc0c9edd3f8399861773bf78562a506e26384e3c5d582c06359e3e1c4b70c33",
  "611dc2767c8fcc33f0013f0c03634373b5c864669a77f37b7133f9377bf52f8e",
  "6463359ac22d145576915c2fd1d28838f53e80174b2e95fc0b86026b6c7d6955",
];

let UNSPLASH_API_KEYS_INDEX = 0;

const load_unsplash_image = () => {
  const imgElement = document.getElementById("left-image");
  const request = new XMLHttpRequest();
  const url = "https://api.unsplash.com/photos/random";

  request.open("GET", url, true);
  request.setRequestHeader(
    "Authorization",
    "Client-ID " + UNSPLASH_API_KEYS[UNSPLASH_API_KEYS_INDEX]
  );

  request.onreadystatechange = function () {
    if (request.readyState === 4 && request.status === 403) {
      // Если упёрлись в лимит, то берём следующий ключ
      UNSPLASH_API_KEYS_INDEX += 1;
      load_unsplash_image();
    } else if (request.readyState === 4 && request.status === 200) {
      const response = JSON.parse(request.responseText);
      const imageUrl = response.urls.regular;
      imgElement.src = imageUrl;
    } else if (request.readyState === 4) {
      console.error(
        "АШИБКА ПРИ ПОЛУЧЕНИИ КАРТИНКИ С АНСПЛЕША",
        request.statusText
      );
    }
  };

  request.send();
};

let IMAGE_LEFT_ASPECT_RATIO = 1;
let IMAGE_RIGHT_ASPECT_RATIO = 1;

const resize_images = () => {
  const h = 92 / (IMAGE_LEFT_ASPECT_RATIO + IMAGE_RIGHT_ASPECT_RATIO);
  const img1 = document.getElementById("left-image");
  const img2 = document.getElementById("right-image");
  img1.style.height = h + "vw";
  img1.style.width = IMAGE_LEFT_ASPECT_RATIO * h + "vw";
  img2.style.height = h + "vw";
  img2.style.width = IMAGE_RIGHT_ASPECT_RATIO * h + "vw";
};

(startup = () => {
  document.getElementById("stok-button").addEventListener("click", (e) => {
    load_unsplash_image();
  });

  document.getElementById("download-button").addEventListener("click", (e) => {
    html2canvas(document.getElementById("image"), {
      logging: true,
      allowTaint: true,
      useCORS: true,
    }).then((canvas) => {
      let link = document.createElement("a");
      link.download = "cristian_bale_meme.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    });
  });

  document
    .getElementById("left-image-file")
    .addEventListener("change", function (event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
          const img = document.getElementById("left-image");
          img.src = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    });

  document
    .getElementById("left-image-url")
    .addEventListener("input", function (event) {
      const url = event.target.value;
      if (url) {
        const img = document.getElementById("left-image");
        img.src = url;
      }
    });

  document
    .getElementById("right-image-file")
    .addEventListener("change", function (event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
          const img = document.getElementById("right-image");
          img.src = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    });

  document
    .getElementById("right-image-url")
    .addEventListener("input", function (event) {
      const url = event.target.value;
      if (url) {
        const img = document.getElementById("right-image");
        img.src = url;
      }
    });

  document.getElementById("right-image").addEventListener("load", (e) => {
    IMAGE_RIGHT_ASPECT_RATIO = e.target.naturalWidth / e.target.naturalHeight;
    resize_images();
  });

  document.getElementById("left-image").addEventListener("load", (e) => {
    IMAGE_LEFT_ASPECT_RATIO = e.target.naturalWidth / e.target.naturalHeight;
    resize_images();
  });

  document
    .getElementById("down-text-edit")
    .addEventListener("input", function (event) {
      const text = event.target.value.replace(/(?:\r\n|\r|\n)/g, "<br />");
      if (text) {
        document.getElementById("down-text").innerHTML = text;
      }
    });

  document.getElementById("left-image").src = "res/placeholder.svg";
  document.getElementById("right-image").src = "res/default_christian.jpg";
})();
