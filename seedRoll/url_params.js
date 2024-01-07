function getQueryParam(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

var words;
var page;

function createUrl(params) {
  url = "";
  for (fields in params) {
    url += url === "" ? "?" : "&";
    url += String(fields);
    url += "=";
    url += String(params[fields]);
  }
  return url;
}

(() => {
  // get url param
  words = getQueryParam("words");
  page = getQueryParam("page");

  // set default
  if (!words) {
    words = DEFAULT_WORD_COUNT;
  }
  if (page) {
    page = BigInt(page);
  } else {
    page = BigInt(DEFAULT_PAGE);
  }

  //clamp page
  const entropy_size = words * 11 - Math.floor(words / 3);
  const MIN_PAGE = 0;
  const MAX_PAGE =
    BigInt(2) ** BigInt(entropy_size) / BigInt(PHRASE_COUNT_ON_PAGE);
  page = page < MIN_PAGE ? MIN_PAGE : page;
  page = page > MAX_PAGE ? MAX_PAGE : page;
  // console.log(MAX_PAGE);

  const previous_page_number =
    MIN_PAGE > page - BigInt(1) ? MIN_PAGE : page - BigInt(1);
  const random_page_number = random256() % MAX_PAGE;
  const next_page_number =
    MAX_PAGE < page + BigInt(1) ? MAX_PAGE : page + BigInt(1);

  // get elements
  var word_urls = document.getElementsByClassName("word-urls");
  var page_buttons = document.getElementsByClassName("page-buttons");

  // set styles
  for (url of word_urls) {
    if (parseInt(url.text) == parseInt(words)) {
      url.classList.add(...STYLE_SELECTED_WORD_COUNT_BUTTON.split(" "));
    } else {
      url.classList.add(...STYLE_UNSELECTED_WORD_COUNT_BUTTON.split(" "));
    }
  }

  // set link
  for (url of word_urls) {
    url.setAttribute(
      "href",
      createUrl({ words: parseInt(url.text), page: page })
    );
  }

  page_buttons[0].setAttribute(
    "href",
    createUrl({ words: words, page: previous_page_number })
  );
  page_buttons[1].setAttribute(
    "href",
    createUrl({ words: words, page: random_page_number })
  );
  page_buttons[2].setAttribute(
    "href",
    createUrl({ words: words, page: next_page_number })
  );

  //set percent
  const persition = 10 ** 2;
  const percent =
    Number((BigInt(100 * persition) * page) / MAX_PAGE) / (1 * persition);

  const progress_bar = document.getElementById("progress-bar");
  progress_bar.innerText = percent + "%";
  progress_bar.setAttribute("style", `width: ${percent}%`);
})();
