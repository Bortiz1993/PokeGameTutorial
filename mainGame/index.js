const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
// const bodyBlack = document.querySelector("body");
// bodyBlack.style.background = "black";


// Canvas Dimensions
canvas.width = 1024;
canvas.height = 576;

const collisionsMap = [];
for (let i = 0; i < collisions2.length; i += 70) {
  // console.log(collisions2);
  collisionsMap.push(collisions2.slice(i, 70 + i));
}

///.length; i += 70 is the actual length of the game map.It dosent like this for loop?
const battleZonesMap = [];
for (let i = 0; i < battleZonesData2.length; i += 70) {
  // console.log(battleZonesData2);
  battleZonesMap.push(battleZonesData2.slice(i, 70 + i));
}
//boundary coordinates and measurements

const charactersMap = []
for (let i = 0; i < charactersMapData.length; i += 70){
  charactersMap.push(charactersMapData.slice(i, 70 + i))
}
console.log(charactersMap)

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

const characters = []
const villagerImg = new Image()
villagerImg.src = './img/ChrisImages/villager.png'

const oldManImg = new Image()
oldManImg.src = './img/ChrisImages/oldMan.png'

charactersMap.forEach((row, i) => {
  row.forEach((symbol, j) => {
    //1026 for villager position
    if(symbol === 1026){
      characters.push(
        new Character({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y
          },
          image: villagerImg,
          frames: {
            max: 4,
            hold: 200
          },
          scale: 1,
          animate: true,
          dialogue: ['Hello', 'Mister, be careful with a creature named Draggle!', 'It has ice attacks!']
        })
      )
    }
    //1031 === oldman
    else if (symbol === 1031) {
      characters.push(
        new Character({
          position: {
            x: j * Boundary.width + offset.x + 10,
            y: i * Boundary.height + offset.y + 5
          },
          image: oldManImg,
          frames: {
            max: 4,
            hold: 10
          },
          scale: 3,
          dialogue: ['My back hurts!', 'Yeah I know I am old:(', 'The Draggle is scared of a RED attack but I cant remember what it was called?']
        })
      )
    }
    //if the symbol dose not equal zero, push the boundaries?
if(symbol !== 0){
  boundaries.push(
    new Boundary({
      position: {
        x: j * Boundary.width + offset.x + 3,
        y: i * Boundary.height + offset.y + 20
      }
    })
  )
}
  })
})



const image = new Image();
image.src = "./img/ChrisImages/pelletTown.png";
console.log(image)

const foregroundImage = new Image();
foregroundImage.src = "./img/ChrisImages/foregroundObjects2.png";
// console.log(foregroundImage.src);

const playerImageDown = new Image();
playerImageDown.src = "./img/playerDown.png";

const playerImageUp = new Image();
playerImageUp.src = "./img/playerUp.png";

const playerImageRight = new Image();
playerImageRight.src = "./img/playerRight.png";

const playerImageLeft = new Image();
playerImageLeft.src = "./img/playerLeft.png";

//This loads the map as soon as possible.
// image.onload = () => {
  //x coordinate and Y coordinates
  // c.drawImage(image, -785, -650);
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
// };

//everytime i make a different reference to sprite, it will be different thats why this Class is here.

//this might be the sprite measurements, maybe i can make the sprite smaller instead?
const player = new Sprite({
  position: {
    x: canvas.width / 2 - 192 / 4 / 2,
    ///x position 1024 divided by 2 minus 192 divided by 4 divided by 2 = player.position.x = 40
    y: canvas.height / 2 - 68 / 2,
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
  }
}

//this const makes sure all objects in the game stay put.
const movables = [
  background,
  ...boundaries,
  foreground,
  ...battleZones,
  ...characters
]

const renderables = [
  background,
  ...boundaries,
  ...battleZones,
  ...characters,
  player,
  foreground
]

const battle = {
  initiated: false,
};

function animate() {
  const animationId = window.requestAnimationFrame(animate)
  // console.log(animationId);
  renderables.forEach((renderable) => {
    renderable.draw()

  })

  //this if statement makes sure we are touching the tiles from all directions.
  //This basically activates the battle.
  let moving = true
  player.animate = false

  if (battle.initiated) return;

  if (keys.w.pressed || keys.a.pressed || keys.d.pressed || keys.s.pressed) {
    for (let i = 0; i < battleZones.length; i++) {
      const battleZone = battleZones[i];
      // if(battleZone.battle){
      ///make hardcoded if statements for the battle being initiated.maybe put BigPatch in one variable and Small patch in another?
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
                  duration: 0.4
                })
              }
            })
            //activate a new animation loop
          }
        })
        break
      }
    }
  }

  //Player goes up, down boundary
  // player.animate = false;
  if (keys.w.pressed && lastKey === "w") {
    player.animate = true;
    player.image = player.sprites.up;

    checkForCharacterCollision({
      characters,
      player,
      characterOffset: {x: 0, y: 3}
    })
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
            }
          }
        })
      ) {
        console.log("collisionW");
        moving = false;
        break;
      }
    }

    if (moving)
      movables.forEach((movable) => {
        movable.position.y += 3
      })
  }
  //player goes to the left, right boundary
  else if (keys.a.pressed && lastKey === "a") {
    player.animate = true;
    player.image = player.sprites.left;

    checkForCharacterCollision({
      characters,
      player,
      characterOffset: {x: 3, y: 0 }
    })

    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i]
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
      ) {
        console.log("collisionA");
        moving = false
        break
      }
    }

    if (moving)
      movables.forEach((movable) => {
        movable.position.x += 3;
      });
  } //player goes down, top boundary
  else if (keys.s.pressed && lastKey === "s") {
    player.animate = true
    player.image = player.sprites.down

    checkForCharacterCollision({
      characters,
      player,
      characterOffset: {x: 0, y: -3}
    })

    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i]
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: {
            ...boundary,
            position: {
              x: boundary.position.x,
              y: boundary.position.y - 3,
            }
          }
        })
      ) {
        console.log("collisionS");
        moving = false
        break
      }
    }
    if (moving)
      movables.forEach((movable) => {
        movable.position.y -= 3
      })

  } //player goes right, left boundary
  else if (keys.d.pressed && lastKey === "d") {
    player.animate = true;
    player.image = player.sprites.right

    checkForCharacterCollision({
      characters,
      player,
      characterOffset: {x: -3, y: 0}
    })

    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i]
      // console.log(boundary)
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

let lastKey = ''
window.addEventListener("keydown", (e) => {
  if (player.isInteracting) {
    switch (e.key) {
      case ' ':
        player.interactionAsset.dialogueIndex++

        const {dialogueIndex, dialogue} = player.interactionAsset
        if(dialogueIndex <= dialogue.length - 1) {
          document.querySelector('#characterDialogueBox').innerHTML =
          player.interactionAsset.dialogue[dialogueIndex]
          return
        }

        //finish conversation with NPC
        player.isInteracting = false
        player.interactionAsset.dialogueIndex = 0
        document.querySelector('#characterDialogueBox').style.display = 'none'

        break
    }
    return
  }

  switch (e.key){
    case ' ':
      if(!player.interactionAsset) return

      //beginning of NPC conversation
      const firstMessage = player.interactionAsset.dialogue[0]
      document.querySelector('#characterDialogueBox').innerHTML = firstMessage
      document.querySelector('#characterDialogueBox').style.display = 'flex'
      player.isInteracting = true
      break

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
})

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