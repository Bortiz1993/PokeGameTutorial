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

function animate(){
    window.requestAnimationFrame(animate)
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
console.log('animate')
}

animate()

window.addEventListener('keydown', (e) =>{
   
    switch (e.key){
        case 'w':
            console.log('presend w key')
            break

            case 'a':
                console.log('presend a key')
                break

                case 's':
                    console.log('presend s key')
                    break

                    case 'd':
                        console.log('presend d key')
                        break
    }
})
 

