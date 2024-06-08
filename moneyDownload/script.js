function validateNumberInput(event) {
  const input = event.target.value;
  const regex = /^\d+(\.\d{0,2})?$/;
  if (!regex.test(input)) {
    event.target.value = input.slice(0, -1);
  }
}

let money_data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

function fetch_money() {
  const base_url =
    "https://raw.githubusercontent.com/qberik/qberik.github.io/main/moneyDownload/money/";

  const money_url = [
    base_url + "5000.jpg",
    base_url + "2000.jpg",
    base_url + "1000.jpg",
    base_url + "500.jpg",
    base_url + "200.jpg",
    base_url + "100.jpg",
    base_url + "50.jpg",
    base_url + "10.jpg",
    base_url + "5.jpg",
    base_url + "1.jpg",
    base_url + "0.5.jpg",
    base_url + "0.1.jpg",
    base_url + "0.05.jpg",
    base_url + "0.01.jpg",
  ];

  for (let i = 0; i < money_url.length; i++) {
    axios.get(money_url[i], { responseType: "blob" }).then((d) => {
      money_data[i] = d.data;
    });
  }
}

async function download_money(amout) {
  // Сумма в копейках по убыванию
  const money_amount = [
    500000, 200000, 100000, 50000, 20000, 10000, 5000, 1000, 500, 100, 50, 10,
    5, 1,
  ];

  const money_name = [
    "пять тысяч рублей",
    "две тысячи рублей",
    "тысяча рублей",
    "пятьсот рублей",
    "двести рублей",
    "сто рублей",
    "пятьдесят рублей",
    "десять рублей",
    "пять рублей",
    "один рубль",
    "пятьдесят копеек",
    "десять копеек",
    "пять копеек",
    "одна копейка",
  ];

  let money_count = new Array(money_amount.length).fill(0);

  // Ждём пока картинки не зафетчатся
  while (
    money_data.filter((i) => {
      return i == 0;
    }).length > 0
  ) {
    await new Promise((r) => setTimeout(r, 500));
  }

  let zip = new JSZip();

  while (amout > 0) {
    for (let i = 0; i < money_amount.length; i++) {
      if (amout - money_amount[i] >= 0) {
        amout -= money_amount[i];
        money_count[i] += 1;
        //console.log(money_name[i] + " " + money_count[i] + ".jpg");
        zip.file(money_name[i] + " " + money_count[i] + ".jpg", money_data[i], {
          binary: true,
        });
        break;
      }
    }
  }

  zip.generateAsync({ type: "blob" }).then(function (content) {
    saveAs(content, "деньги.zip");
  });
}

fetch_money();

window.onload = function (e) {
  document.getElementById("download").onclick = () => {
    value = 100 * parseFloat("0" + document.getElementById("input").value);
    if (value != 0) {
      createEmojiParticles();
      download_money(value);
    }
  };
};

function createEmojiParticle() {
  const emojis = ["💸", "💰", "🤑", "💵", "💴", "💷", "💶", "🪙", "💲", "💎"];

  const emoji = document.createElement("div");
  emoji.className = "emoji";
  emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
  emoji.style.left = `${Math.random() * 100}vw`;
  document.body.appendChild(emoji);

  emoji.addEventListener("animationend", () => {
    emoji.remove();
  });
}

function createEmojiParticles() {
  const numberOfEmojis = 40;
  for (let i = 0; i < numberOfEmojis; i++) {
    setTimeout(createEmojiParticle, i * 70);
  }
}
