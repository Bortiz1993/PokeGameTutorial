const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
const bodyBlack = document.querySelector("body");
bodyBlack.style.background = "black";

// console.log(collisions)
canvas.width = 1024;
canvas.height = 576;

const collisionsMap = [];
for (let i = 0; i < collisions.length; i += 70) {
  console.log(collisions)
  collisionsMap.push(collisions.slice(i, 70 + i));
}
// console.log(collisions)

//boundary coordinates and measurements
class Boundary {
    ///how many boundaries show up
  static width = 48;
  static height = 48;
  constructor({ position }) {
    this.position = position;
    //size of the square boundary //this might be the source of the problem? its either the size of the collision block or the size of my sprite
    this.width = 32;
    this.height = 32;
  }
  //renders the red boundary squares
  draw() {
    c.fillStyle = "red";
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}

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

const image = new Image();
image.src = "../img/PokeMap.png";
const playerImageDown = new Image();
playerImageDown.src = "../img/playerDown.png";

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
class Sprite {
  constructor({ position, velocity, image, frames = { max: 1 } }) {
    this.position = position;
    this.image = image;
    this.frames = frames;
    this.image.onload = () => {
      this.width = this.image.width / this.frames.max;
      this.height = this.image.height;
      console.log(this.width);
      console.log(this.height);
      // console.log(this.image.width)
    };
  }
  //what code do i need to use to draw something in the canvas.
  draw() {
    // c.drawImage(this.image, this.position.x, this.position.y);
    c.drawImage(
      this.image,
      0,
      0,
      this.image.width / this.frames.max,
      this.image.height,
      this.position.x,
      this.position.y,
      this.image.width / this.frames.max,
      this.image.height
    );
  }
}

const player = new Sprite({
  position: {
    x: canvas.width / 2 - 192 / 4 / 2,
    y: canvas.height / 2 - 68 / 2,
  },
  image: playerImageDown,
  frames: {
    max: 4,
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

const movables = [background, ...boundaries];

function rectangularCollision({ rectangle1, rectangle2 }) {
    console.log(rectangle1, rectangle2)
  return (
    rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
    rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
    rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
    rectangle1.position.y + rectangle1.height >= rectangle2.position.y
  );
}

function animate() {
  window.requestAnimationFrame(animate);
  background.draw();
  boundaries.forEach((boundary) => {
    boundary.draw();
  });
  player.draw();

let moving = true;
//Player goes up, down boundary
  if (keys.w.pressed && lastKey === "w") {
    console.log(boundaries)
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: {
            ...boundary,
            position: {
              x: boundary.position.x,
              y: boundary.position.y + 3
            }
          }
        })
      ){
        console.log("collisionW");
        moving = false
        break
      }
    }
    if (moving)
    movables.forEach((movable) => {
      movable.position.y += 3;
    });
  } 
  //player goes to the left, right boundary 
  else if (keys.a.pressed && lastKey === "a") {
    for (let i = 0; i < boundaries.length; i++) {
        const boundary = boundaries[i];
        if (
          rectangularCollision({
            rectangle1: player,
            rectangle2: {
              ...boundary,
              position: {
                x: boundary.position.x + 3,
                y: boundary.position.y
              }
            }
          })
        ){
          console.log("collisionA");
          moving = false
          break
        }
      }
      if (moving)
    movables.forEach((movable) => {
      movable.position.x += 3;
    });

  }//player goes down, top boundary 
  else if (keys.s.pressed && lastKey === "s") {
    for (let i = 0; i < boundaries.length; i++) {
        const boundary = boundaries[i];
        if (
          rectangularCollision({
            rectangle1: player,
            rectangle2: {
              ...boundary,
              position: {
                x: boundary.position.x,
                y: boundary.position.y - 3
              }
            }
          })
        ){
          console.log("collisionS");
          moving = false
          break
        }
      }
      if (moving)
    movables.forEach((movable) => {
      movable.position.y -= 3;
    });

  }//player goes right, left boundary 
  else if (keys.d.pressed && lastKey === "d") {
    // let moving = true;
    for (let i = 0; i < boundaries.length; i++) {
        const boundary = boundaries[i];
        console.log(boundary)
        if (
          rectangularCollision({
            rectangle1: player,
            rectangle2: {
              ...boundary,
              position: {
                x: boundary.position.x - 3,
                y: boundary.position.y 
              }
            }
          })
        ){
          console.log("collisionD");
          moving = false
          break
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
