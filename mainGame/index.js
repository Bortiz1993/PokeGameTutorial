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
c.drawImage(image, -300, -300);
//Player down and canvas width divided by x coordinate 2 and y coordinate 0.
c.drawImage(playerImageDown,canvas.width / 2, canvas.height / 2);
}
 

