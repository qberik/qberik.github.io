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
  (-1 * aliens_anim_time_speed_base) / (aliens.length * aliens_len);
aliens_anim_time = 0;
aliens_anim_state = true;

game_state = 0;
game_score = 0;
game_time = 0;

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

function setup() {
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
  // console.log(aliens);

  //document.getElementById("canvas").appendChild(button);

  // put setup code here
}

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

    for (let i = 0; i < aliens.length; i++) {
      for (let j = 0; j < aliens[i].length; j++) {
        if (aliens[i][j] != 0) {
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

    if (millis() > aliens_anim_time) {
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
        fire_x = player_pos + entity_w / 2;
        fire_y = player_top - fire_h;
        console.log("a");
      }
    }

    //collision detection
    if (player_fire) {
      if (millis() > fire_time) {
        console.log(fire_x, fire_y);
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
            by1 = fire_y;
            bx2 = bx1 + fire_w;
            by2 = by1 + fire_h;
            if (!(ax1 > bx2 || ax2 < bx1 || ay1 > by2 || ay2 < by1)) {
              game_score += (4 - aliens[i][j]) * 10;
              aliens[i][j] = 0;
              player_fire = false;
              hit = true;
              aliens_anim_time_speed += aliens_anim_time_speed_decrease;
            }
          }
        }
      }
    }

    all_kill = true;
    for (let i = 0; i < aliens.length; i++) {
      for (let j = 0; j < aliens[i].length; j++) {
        if (aliens[i][j] != 0) {
          all_kill = false;
        }
      }
    }
    if (all_kill) {
      game_state = 2;
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
    }
  }
  if (game_state == 3) {
    textSize(0.1 * a);
    text("YOU LOSE", 0.31 * a, 0.2 * a);
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
    }
  }
}
