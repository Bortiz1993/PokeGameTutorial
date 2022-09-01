const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d')
const bodyBlack = document.querySelector('body')
bodyBlack.style.background = 'black';

canvas.width = 1024
canvas.height = 576

c.fillStyle = 'white'
c.fillRect(0,0, canvas.width, canvas.height);

const image = new Image()
image.src = "../img/PokeMap.png"
const playerImageDown = new Image()
playerImageDown.src = "../img/playerDown.png"

//This loads the map as soon as possible.
//I want the player image to load here
image.onload = () => {
    //x coordinate and Y coordinates
c.drawImage(image, -215, -400);
//Player down and canvas width divided by x coordinate 2 and y coordinate 0.
c.drawImage
(playerImageDown,
    0,
    0,
    playerImageDown.width / 4,
    playerImageDown.height,
 canvas.width / 2 - playerImageDown.width / 4 / 2,
 canvas.height / 2 - playerImageDown.height / 2,
 playerImageDown.width/ 4,
 playerImageDown.height
 )
 //the equation above cuts the sprite sheet into one animation and it centers the character on the center coordinate?
}

//everytime i make a different reference to sprite, it will be different thats why this Class is here.
class Sprite {
    constructor( {position,velocity, image}){
        this.position = position
        this.image = image
    }
    //what code do i need to use to draw something in the canvas.
    draw(){
        c.drawImage(this.image, -785, -650);
    }
}

const background = new Sprite({
    position: {
        x: -785,
        y: -650
    },
    image: image
})

const keys = {
    w:{
        pressed: false
    },
    a:{
        pressed: false
    },
    s:{
        pressed: false
    },
    d:{
        pressed: false
    }
}

function animate(){
    window.requestAnimationFrame(animate)
    background.draw
//Player down and canvas width divided by x coordinate 2 and y coordinate 0.
c.drawImage
(playerImageDown,
    0,
    0,
    playerImageDown.width / 4,
    playerImageDown.height,
 canvas.width / 2 - playerImageDown.width / 4 / 2,
 canvas.height / 2 - playerImageDown.height / 2,
 playerImageDown.width/ 4,
 playerImageDown.height
 )
 //Listen if the keydowns are being pressed and it gives the illusion that the player is moving.
//  if()
// console.log('animate')
}

animate()

window.addEventListener('keydown', (e) =>{
   
    switch (e.key){
        case 'w':
            keys.w.pressed = true
            // console.log('presend w key')
            break

            case 'a':
                keys.a.pressed = true
                // console.log('presend a key')
                break

                case 's':
                    keys.s.pressed = true
                    // console.log('presend s key')
                    break

                    case 'd':
                        keys.d.pressed = true
                        // console.log('presend d key')
                        break
                    
    }
    console.log(keys)
})

window.addEventListener('keyup', (e) =>{
   
    switch (e.key){
        case 'w':
            keys.w.pressed = false
            // console.log('presend w key')
            break

            case 'a':
                keys.a.pressed = false
                // console.log('presend a key')
                break

                case 's':
                    keys.s.pressed = false
                    // console.log('presend s key')
                    break

                    case 'd':
                        keys.d.pressed = false
                        // console.log('presend d key')
                        break
                    
    }
})
 

