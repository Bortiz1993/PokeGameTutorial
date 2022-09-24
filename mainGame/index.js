const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
const bodyBlack = document.querySelector("body");
bodyBlack.style.background = "black";
// console.log(battleZones)

// Canvas Dimensions
canvas.width = 1024;
canvas.height = 576;

const collisionsMap = [];
for (let i = 0; i < collisions.length; i += 70) {
  console.log(collisions);
  collisionsMap.push(collisions.slice(i, 70 + i));
}

///.length; i += 70 is the actual length of the game map.It dosent like this for loop
// var BattleZones
const battleZonesMap = [];
for (let i = 0; i < battleZonesData.length; i += 70) {
  console.log(battleZonesData);
  battleZonesMap.push(battleZonesData.slice(i, 70 + i));
}
// console.log(battleZonesMap )
//boundary coordinates and measurements

const boundaries = [];

//Player sprite starting position coordinates
const offset = {
  x: -210,
  y: -400,
};

collisionsMap.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if (symbol === 1025)
      boundaries.push(
        new Boundary({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y,
          },
        })
      );
  });
});
console.log(boundaries);

const battleZones = [];

battleZonesMap.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if (symbol === 1025)
      battleZones.push(
        new Boundary({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y,
          },
        })
      );
  });
});

const image = new Image();
image.src = "../img/PokeMap.png";

const foregroundImage = new Image();
foregroundImage.src = "../img/foregroundObjects.png";
console.log(foregroundImage.src);

const playerImageDown = new Image();
playerImageDown.src = "../img/playerDown.png";

const playerImageUp = new Image();
playerImageUp.src = "../img/playerUp.png";

const playerImageRight = new Image();
playerImageRight.src = "../img/playerRight.png";

const playerImageLeft = new Image();
playerImageLeft.src = "../img/playerLeft.png";

//This loads the map as soon as possible.
image.onload = () => {
  //x coordinate and Y coordinates
  c.drawImage(image, -785, -650);
  //Player down and canvas width divided by x coordinate 2 and y coordinate 0.
  // c.drawImage
  // (playerImageDown,
  //     0,
  //     0,
  //     playerImageDown.width / 4,
  //     playerImageDown.height,
  //  canvas.width / 2 - playerImageDown.width / 4 / 2,
  //  canvas.height / 2 - playerImageDown.height / 2,
  //  playerImageDown.width/ 4,
  //  playerImageDown.height
  //  )
  //the equation above cuts the sprite sheet into one animation and it centers the character on the center coordinate?
};

//everytime i make a different reference to sprite, it will be different thats why this Class is here.

//this might be the sprite mesurements, maybe i can make the sprite smaller instead?
const player = new Sprite({
  position: {
    x: canvas.width / 2 - 192 / 4 / 2,
    y: canvas.height / 2 - 68 / 2,
  },
  image: playerImageDown,
  frames: {
    max: 4,
  },
  sprites: {
    up: playerImageUp,
    left: playerImageLeft,
    right: playerImageRight,
    down: playerImageDown,
  },
});

//  canvas.height / 2 - this.height / 2,

const background = new Sprite({
  position: {
    x: offset.x,
    y: offset.y,
  },
  image: image,
});

const foreground = new Sprite({
  position: {
    x: offset.x,
    y: offset.y,
  },
  image: foregroundImage,
});

const keys = {
  w: {
    pressed: false,
  },
  a: {
    pressed: false,
  },
  s: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
};

//this const makes sure all objects in the game stay put.
const movables = [background, ...boundaries, foreground, ...battleZones];

function rectangularCollision({ rectangle1, rectangle2 }) {
  // console.log( rectangle2)
  return (
    rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
    rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
    rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
    rectangle1.position.y + rectangle1.height >= rectangle2.position.y
  );
}
// console.log(rectangle1.x)
// console.log(rectangle2,x)

function animate() {
  window.requestAnimationFrame(animate);
  background.draw();
  boundaries.forEach((boundary) => {
    boundary.draw();
  });

  battleZones.forEach((battleZone) => {
    battleZone.draw();
  });

  player.draw();
  foreground.draw();

  //this if statement makes sure we are touching the tiles from all directions.

  if (keys.w.pressed || keys.a.pressed || keys.d.pressed || keys.s.pressed) {
    for (let i = 0; i < battleZones.length; i++) {
      const battleZone = battleZones[i];
      const overlappingArea =
        (Math.min(
          player.position.x + player.width,
          battleZone.position.x + battleZone.width
           ) -
          Math.max(player.position.x, battleZone.position.x)
          ) *
        (
          Math.min(
          player.position.y + player.height,
          battleZone.position.y + battleZone.height
        ) -
          Math.max(player.position.y, battleZone.position.y));
      console.log(overlappingArea, "209");
      console.log((player.width * player.height) / 2);
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: battleZone,
          ///this might be causing problems?
        }) &&
        overlappingArea > (player.width * player.height) / 2 &&
        Math.random() < 0.8
      ) {
        //ends the loop
        console.log("battleZoneCollision");
        break;
      }
    }
  }

  let moving = true;
  //Player goes up, down boundary
  player.moving = false;
  if (keys.w.pressed && lastKey === "w") {
    player.moving = true;
    player.image = player.sprites.up;
    // console.log(boundaries)
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: {
            ...boundary,
            position: {
              x: boundary.position.x,
              y: boundary.position.y + 3,
            },
          },
        })
      ) {
        console.log("collisionW");
        moving = false;
        break;
      }
    }

    if (moving)
      movables.forEach((movable) => {
        movable.position.y += 3;
      });
  }
  //player goes to the left, right boundary
  else if (keys.a.pressed && lastKey === "a") {
    player.moving = true;
    player.image = player.sprites.left;
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: {
            ...boundary,
            position: {
              x: boundary.position.x + 3,
              y: boundary.position.y,
            },
          },
        })
      ) {
        console.log("collisionA");
        moving = false;
        break;
      }
    }
    if (moving)
      movables.forEach((movable) => {
        movable.position.x += 3;
      });
  } //player goes down, top boundary
  else if (keys.s.pressed && lastKey === "s") {
    player.moving = true;
    player.image = player.sprites.down;
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: {
            ...boundary,
            position: {
              x: boundary.position.x,
              y: boundary.position.y - 3,
            },
          },
        })
      ) {
        console.log("collisionS");
        moving = false;
        break;
      }
    }
    if (moving)
      movables.forEach((movable) => {
        movable.position.y -= 3;
      });
  } //player goes right, left boundary
  else if (keys.d.pressed && lastKey === "d") {
    player.moving = true;
    player.image = player.sprites.right;
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];
      // console.log(boundary)
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: {
            ...boundary,
            position: {
              x: boundary.position.x - 3,
              y: boundary.position.y,
            },
          },
        })
      ) {
        console.log("collisionD");
        moving = false;
        break;
      }
    }
    if (moving)
      movables.forEach((movable) => {
        movable.position.x -= 3;
      });
  }
}

animate();
let lastKey = "";

window.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "w":
      keys.w.pressed = true;
      lastKey = "w";
      // console.log('presend w key')
      break;

    case "a":
      keys.a.pressed = true;
      lastKey = "a";
      // console.log('presend a key')
      break;

    case "s":
      keys.s.pressed = true;
      lastKey = "s";
      // console.log('presend s key')
      break;

    case "d":
      keys.d.pressed = true;
      lastKey = "d";
      // console.log('presend d key', keys.d.pressed)
      break;
  }
  // console.log(keys);
});

window.addEventListener("keyup", (e) => {
  switch (e.key) {
    case "w":
      keys.w.pressed = false;
      // console.log('presend w key')
      break;

    case "a":
      keys.a.pressed = false;
      // console.log('presend a key')
      break;

    case "s":
      keys.s.pressed = false;
      // console.log('presend s key')
      break;

    case "d":
      keys.d.pressed = false;
      // console.log('presend d key')
      break;
  }
});
