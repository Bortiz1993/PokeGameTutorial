const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
const bodyBlack = document.querySelector("body");
bodyBlack.style.background = "black";


// Canvas Dimensions
canvas.width = 1024;
canvas.height = 576;

const collisionsMap = [];
for (let i = 0; i < collisions2.length; i += 70) {
  console.log(collisions2);
  collisionsMap.push(collisions2.slice(i, 70 + i));
}

///.length; i += 70 is the actual length of the game map.It dosent like this for loop?
const battleZonesMap = [];
for (let i = 0; i < battleZonesData2.length; i += 70) {
  console.log(battleZonesData2);
  battleZonesMap.push(battleZonesData2.slice(i, 70 + i));
}
//boundary coordinates and measurements

const boundaries = [];

//Player sprite starting position coordinates
const offset = {
  x: -735,
  y: -650,
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
          // battle: false
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
          // battle: true
        })
      );
  });
});

const image = new Image();
image.src = "./img/ChrisImages/PelletTown.png";

const foregroundImage = new Image();
foregroundImage.src = "./img/ChrisImages/foregroundObjects2.png";
console.log(foregroundImage.src);

const playerImageDown = new Image();
playerImageDown.src = "./img/playerDown.png";

const playerImageUp = new Image();
playerImageUp.src = "./img/playerUp.png";

const playerImageRight = new Image();
playerImageRight.src = "./img/playerRight.png";

const playerImageLeft = new Image();
playerImageLeft.src = "./img/playerLeft.png";

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

//this might be the sprite measurements, maybe i can make the sprite smaller instead?
const player = new Sprite({
  position: {
    x: canvas.width / 2 - 192 / 4 / 2,
    ///x position 1024 divided by 2 minus 192 divided by 4 divided by 2 = player.position.x = 40
    y: canvas.height / 2 - 37 / 2,
    /// y position 576 divided by 2 minus 37 divided by 2 = player.position.y = 125.5
    ///this height might be the reason why the character cannot move and it affects the battle patch activation?
  },
  image: playerImageDown,
  frames: {
    max: 4,
    hold: 10,
  },
  sprites: {
    up: playerImageUp,
    left: playerImageLeft,
    right: playerImageRight,
    down: playerImageDown,
  },
});

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
const battle = {
  initiated: false,
};

function animate() {
  const animationId = window.requestAnimationFrame(animate);
  // console.log(animationId);
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
  //This basically activates the battle.
  let moving = true;
  player.animate = false;
  if (battle.initiated) return;

  if (keys.w.pressed || keys.a.pressed || keys.d.pressed || keys.s.pressed) {
    for (let i = 0; i < battleZones.length; i++) {
      const battleZone = battleZones[i];
      // console.log(battleZone)
      // if(battleZone.battle){
      ///make hardcoded if statements for the battle being initiated.maybe put BigPatch in one variable and Small patch in another?

      // console.log(battleZone.position.x, "BATTLE X", battleZone.position.y, "BATTLE Y")
      // console.log(player.position.x, "playerPOSITION X", player.position.y, "playerPOSITION Y")
      const overlappingArea =
        (Math.min(
          player.position.x + player.width,
          //   // 40 + 48 = 88
          battleZone.position.x + battleZone.width
          //   //battleZone is random, usually around 800 + 48 = 848 minus?
        ) -
          //     //40 and 800 times?
          Math.max(player.position.x, battleZone.position.x)) *
        (Math.min(
          player.position.y + player.height,
          //   // 125.5 + 68
          battleZone.position.y + battleZone.height
          //   //usually random around 400 + 48 minus?
        ) -
          Math.max(player.position.y, battleZone.position.y));
      //125.5 and random around 400
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: battleZone,
          ///this might be causing problems?
        }) &&
        overlappingArea > (player.width * player.height) / 2 &&
        Math.random() < 0.01
      ) {
        //ends the loop
        console.log("activate battle!");
        //deactivate current animation loop
        window.cancelAnimationFrame(animationId);

        // This causes the music to stop, initbattle starts battle music       
        audio.Map.stop()
        audio.initBattle.play()
        audio.battle.play()


        battle.initiated = true
        gsap.to("#overlappingDIV", {
          opacity: 1,
          repeat: 3,
          yoyo: true,
          duration: 0.4,
          onComplete() {
            gsap.to("#overlappingDIV", {
              opacity: 1,
              duration: 0.4,
              onComplete() {
                initBattle();
                animateBattle();
                gsap.to("#overlappingDIV", {
                  opacity: 0,
                  duration: 0.4,
                });
              },
            });
            //activate a new animation loop
          },
        });
        break;
      }
    }
  }

  //Player goes up, down boundary
  player.animate = false;
  if (keys.w.pressed && lastKey === "w") {
    player.animate = true;
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
    player.animate = true;
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
    player.animate = true;
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
    player.animate = true;
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

// let click = false
// addEventListener('click', () => {
//  if(!click) {
//   audio.Map.play()
  
//   click = true
//   // audio.Map.restart()
//  }
// })