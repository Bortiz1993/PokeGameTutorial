class Sprite {
    constructor({ position, velocity, image, frames = { max: 1 }, sprites  }) {
      this.position = position;
      this.image = image;
      this.frames = {...frames, val: 0, elapsed: 0};
      this.image.onload = () => {
        this.width = this.image.width / this.frames.max;
        this.height = this.image.height;
      }
      this.moving = false
      this.sprites = sprites
    }
    //what code do i need to use to draw something in the canvas.
    draw() {
      // c.drawImage(this.image, this.position.x, this.position.y);
      c.drawImage(
        this.image,
        this.frames.val * this.width,
        0,
        this.image.width / this.frames.max,
        this.image.height,
        this.position.x,
        this.position.y,
        this.image.width / this.frames.max,
        this.image.height
      )
        if(!this.moving) return
        if(this.frames.max > 1){
            this.frames.elapsed++
        }

      if(this.frames.elapsed % 10 === 0){  
      if(this.frames.val < this.frames.max - 1)this.frames.val++
      else this.frames.val = 0
      }
    }
  }


  class Boundary {
    ///how many boundaries show up
  static width = 48;
  static height = 48;
  constructor({ position }) {
    this.position = position;
    //size of the square boundary //this might be the source of the problem? its either the size of the collision block or the size of my sprite
    this.width = 45;
    this.height = 32;
  }
  //renders the red boundary squares
  draw() {
    c.fillStyle = "red";
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}