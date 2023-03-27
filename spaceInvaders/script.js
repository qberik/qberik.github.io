class Utils {
  // Calculate the Width in pixels of a Dom element
  static elementWidth(element) {
    return (
      element.clientWidth -
      parseFloat(
        window.getComputedStyle(element, null).getPropertyValue("padding-left")
      ) -
      parseFloat(
        window.getComputedStyle(element, null).getPropertyValue("padding-right")
      )
    );
  }

  // Calculate the Height in pixels of a Dom element
  static elementHeight(element) {
    return (
      element.clientHeight -
      parseFloat(
        window.getComputedStyle(element, null).getPropertyValue("padding-top")
      ) -
      parseFloat(
        window
          .getComputedStyle(element, null)
          .getPropertyValue("padding-bottom")
      )
    );
  }
}

joke = false;
joke1 = false;
joke2 = false; // from right

class asteroid_part {}

let = aliens_len = 9;
aliens = [
  Array(aliens_len).fill(1),
  Array(aliens_len).fill(2),
  Array(aliens_len).fill(2),
  Array(aliens_len).fill(3),
  Array(aliens_len).fill(3),
];
let a1;
let a2;
let b1;
let b2;
let c1;
let c2;
var vid;
let p;

let player_pos = 0.05;
let player_top = 0.9;
let entity_w = 65 / 1000;
let entity_h = 45 / 1000;
let entity_w_spacing = 12 / 1000;
let entity_h_spacing = 30 / 1000;
let player_speed = 80 / 100;
let player_fire_cooldown = 0;
let player_fire = false;

anim_state = 0;
anim_state_pos = 1;
anim_fire = 0;
anim_fire_pos = 0.87;
anim_fire_time = 0;

fire_speed = 100 / 1000;
fire_w = 8 / 1000;
fire_h = 40 / 1000;
fire_x = 0;
fire_y = 0;
fire_anim_time = 40;
fire_time = 0;

let player_input_cooldown = 0;

aliens_x = 140 / 1000;
aliens_y = 100 / 1000;
//aliens_speed = 0.01;
aliens_direction = 0;

aliens_anim_time_speed_base = 300;
aliens_anim = true;
aliens_offset = 20 / 1000;
aliens_anim_time_speed = aliens_anim_time_speed_base;
aliens_anim_time_speed_decrease =
  ((-1 * aliens_anim_time_speed_base) / (aliens.length * aliens_len)) * 0.9;
aliens_anim_time = 0;
aliens_anim_state = true;

game_state = 0;
game_score = 0;
game_time = 0;

shoot_chance = 0.0005;

class alien_bullet {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.w = fire_w * a;
    this.h = fire_h * a;
    this.speed = fire_anim_time * 2;
    this.fire_time = 0;
    this.remove = false;
  }

  draw() {
    if (millis() > this.fire_time) {
      // console.log(this.x, this.y, this.w, this.h);
      fill(255);
      rect(this.x, this.y, this.w, this.h);
      this.fire_time = millis() + this.speed;
      this.y += this.h;
    }

    if (this.x > a) {
      this.remove = true;
    }

    let ax1 = player_pos * a;
    let ay1 = player_top * a;
    let ax2 = ax1 + entity_w * a;
    let ay2 = ay1 + entity_h * a;
    let bx1 = this.x;
    let by1 = this.y;
    let bx2 = bx1 + this.w;
    let by2 = by1 + this.h;
    if (!(ax1 > bx2 || ax2 < bx1 || ay1 > by2 || ay2 < by1)) {
      this.remove = true;
      game_state = 3;
      play_sound(100, 1, 500);
    }
  }
}

alien_bullets = [];

function preload() {
  p = loadImage("resources/p.png");

  a1 = loadImage("resources/a1.png");
  a2 = loadImage("resources/a2.png");

  b1 = loadImage("resources/b1.png");
  b2 = loadImage("resources/b2.png");

  c1 = loadImage("resources/c1.png");
  c2 = loadImage("resources/c2.png");

  pixels = loadFont("resources/SummerPixel22Regular-jE0W7.ttf");
}

let osc;
function setup() {
  vid = document.createElement("video");
  vid.setAttribute(
    "src",
    "https://github.com/ShatteredDisk/rickroll/raw/master/rickroll.mp4"
  );
  // print(document.getElementsByClassName("videodiv")[0]);
  // print();
  vid.setAttribute("preload", "");
  vid.setAttribute("class", "webvideo");
  // document.getElementsById("body").appendChild(vid);

  p5Div = document.getElementById("canvas");
  const p5Canvas = createCanvas(
    Utils.elementWidth(p5Div),
    Utils.elementHeight(p5Div)
  );
  a = Utils.elementWidth(p5Div);
  console.log("a=", a);
  p5Canvas.parent(p5Div);

  background(255);
  textFont(pixels);
  osc = new p5.Oscillator("square");
  pulse = new p5.Oscillator("square");
  pulse3 = new p5.Oscillator("square");

  if (Math.random() <= 0.7) {
    joke = true;
  }
  // console.log(aliens);

  //document.getElementById("canvas").appendChild(button);

  // put setup code here
  // osc = new p5.Oscillator("square");
}
video_time = 1000000;
bg_sound = 120;
play_sound = function (f, a, t) {
  // osc =
  osc.freq(f);
  osc.amp(a);
  osc.start();
  osc.stop(t / 1000);
};
play_sound2 = function (f, a, t) {
  // osc =
  pulse.freq(f);
  pulse.amp(a);
  pulse.start();
  pulse.stop(t / 1000);
};
play_sound3 = function (f, a, t) {
  // osc =
  pulse3.freq(f);
  pulse3.amp(a);
  pulse3.start();
  pulse3.stop(t / 1000);
};

function easeInOutQuint(x) {
  return x < 0.5 ? 16 * x * x * x * x * x : 1 - Math.pow(-2 * x + 2, 5) / 2;
}

function draw() {
  background(0);
  fill(255);
  if (game_state == 0) {
    textSize(0.1 * a);
    text("SPACE INVADERS", 0.18 * a, 0.2 * a);

    textSize(0.06 * a);
    text("PRESS SPACE TO START", 0.23 * a, 0.6 * a);

    if (keyIsDown(32)) {
      play_sound(600, 0.5, 100);
      // osc.start();
      game_state = 1;
      player_fire_cooldown = millis() + 200;
    }
  } else if (game_state == 1) {
    textSize(0.1 * a);
    text("SCORE:" + String(game_score), 0.02 * a, 0.07 * a);
    // rect(a * player_pos, a * player_top, a * entity_w, a * entity_h);
    image(p, a * player_pos, a * player_top, a * entity_w, a * entity_h);

    if (player_fire) {
      rect(a * fire_x, a * fire_y, a * fire_w, a * fire_h);
    }

    for (let i = 0; i < alien_bullets.length; i++) {
      alien_bullets[i].draw();
    }

    if (joke2) {
      if (anim_state == 0) {
        //asdasdasd
        anim_state_pos -= 0.015;
        if (anim_state_pos <= 0.85) {
          anim_state = 1;
          anim_fire_time = millis() + 1000;
        }
      } else if (anim_state == 1) {
        if (millis() < anim_fire_time) {
          anim_state = 2;
          anim_fire = true;
        }
      } else if (anim_state == 2) {
        anim_fire_pos -= 0.01;
        if (anim_fire_pos - entity_w < player_pos) {
          game_state = 3;
          play_sound(100, 1, 500);
          video_time = millis() + 1000;
        }
      }

      if (anim_fire) {
        rect(
          anim_fire_pos * a,
          (player_top + entity_h / 2) * a,
          fire_h * a,
          fire_w * a
        );
      }
      if (aliens_anim_state) {
        image(
          a1,
          anim_state_pos * a + entity_w * a,
          player_top * a,
          a * entity_w,
          a * entity_h
        );
      } else {
        image(
          a2,
          anim_state_pos * a + entity_w * a,
          player_top * a,
          a * entity_w,
          a * entity_h
        );
      }
    }

    for (let i = 0; i < aliens.length; i++) {
      for (let j = 0; j < aliens[i].length; j++) {
        if (aliens[i][j] != 0) {
          // console.log("A");
          // console.log(Math.random() <= shoot_chance);
          if (Math.random() <= shoot_chance) {
            // console.log("a");
            alien_bullets.push(
              new alien_bullet(
                aliens_x * a + (entity_w + entity_w_spacing) * j * a,
                aliens_y * a + (entity_h + entity_h_spacing) * i * a
              )
            );
          }

          if (aliens[i][j] == 1) {
            if (aliens_anim_state) {
              image(
                b1,
                aliens_x * a + (entity_w + entity_w_spacing) * j * a,
                aliens_y * a + (entity_h + entity_h_spacing) * i * a,
                a * entity_w,
                a * entity_h
              );
            } else {
              image(
                b2,
                aliens_x * a + (entity_w + entity_w_spacing) * j * a,
                aliens_y * a + (entity_h + entity_h_spacing) * i * a,
                a * entity_w,
                a * entity_h
              );
            }
          } else if (aliens[i][j] == 2) {
            if (aliens_anim_state) {
              image(
                a1,
                aliens_x * a + (entity_w + entity_w_spacing) * j * a,
                aliens_y * a + (entity_h + entity_h_spacing) * i * a,
                a * entity_w,
                a * entity_h
              );
            } else {
              image(
                a2,
                aliens_x * a + (entity_w + entity_w_spacing) * j * a,
                aliens_y * a + (entity_h + entity_h_spacing) * i * a,
                a * entity_w,
                a * entity_h
              );
            }
          } else if (aliens[i][j] == 3) {
            if (aliens_anim_state) {
              image(
                c1,
                aliens_x * a + (entity_w + entity_w_spacing) * j * a,
                aliens_y * a + (entity_h + entity_h_spacing) * i * a,
                a * entity_w,
                a * entity_h
              );
            } else {
              image(
                c2,
                aliens_x * a + (entity_w + entity_w_spacing) * j * a,
                aliens_y * a + (entity_h + entity_h_spacing) * i * a,
                a * entity_w,
                a * entity_h
              );
            }
          }

          // rect(
          //   aliens_x * a + (entity_w + entity_w_spacing) * j * a,
          //   aliens_y * a + (entity_h + entity_h_spacing) * i * a,
          //   a * entity_w,
          //   a * entity_h
          // );
        }
      }
    }

    // console.log(alien_bullets);

    for (let i = 0; i < alien_bullets.length; i++) {
      if (alien_bullets[i].remove) {
        //alien_bullets[i].splice(i, 1);
      }
    }

    if (millis() > aliens_anim_time) {
      play_sound(bg_sound, 0.5, 100);
      bg_sound -= 20;
      if (bg_sound < 60) {
        bg_sound = 120;
      }
      if (aliens_direction < 10) {
        if (aliens_x >= 0.3) {
          aliens_direction = 13;
        }
        if (aliens_x <= 0.019999999999999992) {
          aliens_direction = 12;
        }
      }

      // enemy animation
      if (aliens_direction % 10 == 0 && aliens_anim) {
        aliens_x += aliens_offset;
        aliens_direction %= 10;
        aliens_anim_state = !aliens_anim_state;
      } else if (aliens_direction % 10 == 1) {
        aliens_x -= aliens_offset;
        aliens_direction %= 10;
        aliens_anim_state = !aliens_anim_state;
      } else {
        aliens_y += aliens_offset;
        aliens_direction -= 2;
        aliens_anim_state = !aliens_anim_state;
      }

      aliens_anim_time = millis() + aliens_anim_time_speed;
    }

    if (millis() > player_input_cooldown) {
      if (keyIsDown(LEFT_ARROW)) {
        if (player_pos > 0.05) {
          player_pos -= 0.02 * player_speed;
        }
      }

      if (keyIsDown(RIGHT_ARROW)) {
        if (player_pos < 0.95 - entity_w) {
          player_pos += 0.02 * player_speed;
        }
      }
      player_input_cooldown = millis() + 30;
    }

    if (keyIsDown(32)) {
      if (!player_fire && millis() > player_fire_cooldown) {
        player_fire = true;
        play_sound2(400, 1, 60);
        fire_x = player_pos + entity_w / 2;
        fire_y = player_top - fire_h;
        //console.log("a");
      }
    }

    //collision detection
    if (player_fire) {
      if (millis() > fire_time) {
        fire_y -= 0.05;
        fire_time = millis() + fire_anim_time;
      }

      if (fire_y + fire_h < 0) {
        player_fire = false;
      }
      let hit = false;
      for (let i = 0; i < aliens.length; i++) {
        for (let j = 0; j < aliens[i].length; j++) {
          if (aliens[i][j] != 0 && !hit) {
            ax1 = aliens_x + (entity_w + entity_w_spacing) * j;
            ay1 = aliens_y + (entity_h + entity_h_spacing) * i;
            ax2 = ax1 + entity_w;
            ay2 = ay1 + entity_h;
            bx1 = fire_x;
            by1 = fire_y - fire_h * 2;
            bx2 = bx1 + fire_w;
            by2 = by1 + fire_h;
            if (!(ax1 > bx2 || ax2 < bx1 || ay1 > by2 || ay2 < by1)) {
              game_score += (4 - aliens[i][j]) * 10;
              aliens[i][j] = 0;
              player_fire = false;
              hit = true;
              aliens_anim_time_speed += aliens_anim_time_speed_decrease;
              // play_sound2(800, 1, 30);
              // play_sound2(900, 1, 30);
              play_sound3(1000, 1, 100);
            }
          }
        }
      }
    }

    alient_count = 0;
    all_kill = true;
    for (let i = 0; i < aliens.length; i++) {
      for (let j = 0; j < aliens[i].length; j++) {
        if (aliens[i][j] != 0) {
          all_kill = false;
          alient_count += 1;
        }
      }
    }
    if (joke && alient_count < 5) {
      joke2 = true;
    }
    if (all_kill) {
      game_state = 2;
      play_sound(600, 1, 500);
      game_time = millis() + 1000;
    }

    for (let i = 0; i < aliens.length; i++) {
      for (let j = 0; j < aliens[i].length; j++) {
        if (aliens[i][j] != 0) {
          if (
            aliens_y + (entity_h + entity_h_spacing) * i >=
            player_top - entity_h
          ) {
            game_state = 3;
            play_sound(100, 1, 500);
          }
        }
      }
    }
  }
  if (game_state == 2) {
    textSize(0.1 * a);
    text("YOU WIN", 0.35 * a, 0.2 * a);
    text("SCORE:" + String(game_score), 0.25 * a, 0.4 * a);
    textSize(0.06 * a);
    text("PRESS SPACE TO RESTART", 0.21 * a, 0.6 * a);

    if (keyIsDown(32) && millis() > game_time) {
      game_state = 1;
      player_fire_cooldown = millis() + 200;
      game_score = 0;
      aliens = [
        Array(aliens_len).fill(1),
        Array(aliens_len).fill(2),
        Array(aliens_len).fill(2),
        Array(aliens_len).fill(3),
        Array(aliens_len).fill(3),
      ];

      aliens_x = 140 / 1000;
      aliens_y = 100 / 1000;
      aliens_speed = 0.3;
      aliens_direction = 0;

      aliens_anim = true;
      aliens_offset = 20 / 1000;
      aliens_anim_time_speed = aliens_anim_time_speed_base;
      aliens_anim_time = 0;
      aliens_anim_state = true;
      alien_bullets = [];
      anim_state = 0;
      anim_state_pos = 1;
      anim_fire = 0;
      anim_fire_pos = 0.87;
      anim_fire_time = 0;
    }
  }
  if (game_state == 3) {
    if (joke && millis() > video_time) {
      document.getElementsByClassName("videodiv")[0].appendChild(vid);
      vid.play();
    }
    textSize(0.1 * a);
    text("YOU LOSE", 0.31 * a, 0.2 * a);
    text("SCORE:" + String(game_score), 0.25 * a, 0.4 * a);
    textSize(0.06 * a);
    text("PRESS SPACE TO RESTART", 0.21 * a, 0.6 * a);
    if (!(joke && millis() > video_time)) {
      if (keyIsDown(32) && millis() > game_time) {
        game_state = 1;
        player_fire_cooldown = millis() + 200;
        game_score = 0;
        aliens = [
          Array(aliens_len).fill(1),
          Array(aliens_len).fill(2),
          Array(aliens_len).fill(2),
          Array(aliens_len).fill(3),
          Array(aliens_len).fill(3),
        ];

        aliens_x = 140 / 1000;
        aliens_y = 100 / 1000;
        aliens_speed = 0.3;
        aliens_direction = 0;

        aliens_anim = true;
        aliens_offset = 20 / 1000;
        aliens_anim_time_speed = aliens_anim_time_speed_base;
        aliens_anim_time = 0;
        aliens_anim_state = true;
        alien_bullets = [];
        anim_state = 0;
        anim_state_pos = 1;
        anim_fire = 0;
        anim_fire_pos = 0.87;
        anim_fire_time = 0;
      }
    }
  }
}
