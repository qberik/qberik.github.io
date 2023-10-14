const root_elem = document.getElementById("content");

// время начала и длительности пар в секундах
const half_para = 2700;
const break_para = 300;
const full_para = half_para + break_para + half_para;
const seconds_in_day = 60 * 60 * 24;

// Время начала каждой пары в секундах с начала дня
const start_time_para = [30600, 37200, 43800, 51300, 57900, 64200, 70500];

// спёр отсюда
// https://stackoverflow.com/questions/1091372/getting-the-clients-time-zone-and-offset-in-javascript
const local_timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

if (localStorage.getItem("timeZone") === null) {
  if (local_timeZone !== "Europe/Moscow") {
    // У меня в браузере часы съехали, мне нужен этот выбор

    let dialog = document.createElement("div");
    dialog.classList.add("centered");
    dialog.classList.add("text_small");
    root_elem.appendChild(dialog);

    let dialog_text = document.createElement("div");
    let dialog_item1 = document.createElement("div");
    let dialog_item2 = document.createElement("div");

    dialog_text.classList.add("spacing");
    dialog_item1.classList.add("spacing");
    dialog_item2.classList.add("spacing");

    dialog_item1.classList.add("button");
    dialog_item2.classList.add("button");

    dialog.appendChild(dialog_text);
    dialog.appendChild(dialog_item1);
    dialog.appendChild(dialog_item2);

    select_timeZone = (tz) => {
      localStorage.timeZone = tz;
      dialog.remove();
      start_clock();
    };

    dialog_text.innerText = "Какой часовой пояс?";
    dialog_item1.innerHTML += "Локальное время";
    dialog_item2.innerText += "Московсое время";

    dialog_item1.onclick = () => select_timeZone(local_timeZone);
    dialog_item2.onclick = () => select_timeZone("Europe/Moscow");
  } else {
    localStorage.timeZone = "Europe/Moscow";
    start_clock();
  }
} else {
  start_clock();
}

//localStorage.timeZone = "Europe/Moscow";

function start_clock() {
  local_date = new Date();
  // День недели с учётом временной зоны
  let format_weekday = Intl.DateTimeFormat(["en-GB"], {
    timeZone: localStorage.timeZone,
    weekday: "short",
  });
  weekday = format_weekday.format(local_date);
  // Дата-время с учётом временной зоны
  function convert_timeZone(date, tzString) {
    return new Date(
      (typeof date === "string" ? new Date(date) : date).toLocaleString(
        "en-US",
        { timeZone: tzString }
      )
    );
  }

  full_date = convert_timeZone(local_date, localStorage.timeZone);

  draw_clock = (text, time) => {
    document.getElementById("text").innerText = text;
    document.getElementById("time").innerText = time;
  };

  if (weekday === "Sun") {
    draw_clock("СЕГОДНЯ ВЫХОДНОЙ", "ПАР НЕТ");
  } else {
    // Количество секунд с начала текущего дня
    let day_seconds =
      (full_date -
        new Date(
          full_date.getFullYear(),
          full_date.getMonth(),
          full_date.getDate(),
          0,
          0,
          0,
          0
        )) /
      1000;

    // Сколько пар успело начаться
    const index_para_started = start_time_para
      .map((i) => day_seconds >= i)
      .reduce((a, i) => a + i);

    // Сколько пар успело закончится
    const index_para_ended = start_time_para
      .map((i) => day_seconds >= i + full_para)
      .reduce((a, i) => a + i);

    // На вход получает секунды, а выводит время
    const clock_from_seconds = (seconds) => {
      const h = Math.floor(seconds / (60 * 60));
      const m = Math.floor((seconds / 60) % 60);
      const s = Math.floor((seconds / 1) % 60);
      return [h, m, s]
        .map((x) => x.toString().padStart(2, "0"))
        .reduce((a, i) => a + ":" + i);
    };

    if (index_para_started !== index_para_ended) {
      // Пара идёт
      draw_clock(
        "ДО КОНЦА " + index_para_started.toString() + " ПАРЫ",
        clock_from_seconds(
          start_time_para[index_para_ended] + full_para - day_seconds
        )
      );
    } else {
      // Вне пары

      if (index_para_started === start_time_para.length) {
        // Если все пары кончились
        // нужно считать на следующий день
        draw_clock(
          "ДО НАЧАЛА 1 ПАРЫ",
          clock_from_seconds(
            start_time_para[0] + (seconds_in_day - day_seconds)
          )
        );
      } else {
        draw_clock(
          "ДО НАЧАЛА " + (index_para_started + 1).toString() + " ПАРЫ",
          clock_from_seconds(start_time_para[index_para_started] - day_seconds)
        );
      }
    }
  }
  setInterval(start_clock, 1000);
}
