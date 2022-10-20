class Sprite {
     constructor({ position, image, frames = { max: 1, hold: 10 }, sprites, animate = false, isEnemy = false  }) {
      this.position = position;
      this.image = image;
      this.frames = {...frames, val: 0, elapsed: 0};
      this.image.onload = () => {
        this.width = this.image.width / this.frames.max;
        this.height = this.image.height;
      }
      this.animate = animate
      this.sprites = sprites
      this.opacity = 1
      this.health = 100
      this.isEnemy = isEnemy
    }
    //what code do i need to use to draw something in the canvas.
    draw() {
      c.save()
      c.globalAlpha = this.opacity
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
      c.restore()
      //all of this code below animates a sprite sheet.
        if(!this.animate) return
        if(this.frames.max > 1){
            this.frames.elapsed++
        }

      if(this.frames.elapsed % this.frames.hold === 0){  
      if(this.frames.val < this.frames.max - 1)this.frames.val++
      else this.frames.val = 0
      }
    }
    attack({attack, recipient, renderedSprites}){
      switch (attack.name){
        case 'Fireball':
          const fireballImage = new Image()
          fireballImage.src = '../img/fireball.png'
          const fireball = new Sprite ({
            position: {
              x: this.position.x,
              y: this.position.y
            },
            image: fireballImage
          })
          renderedSprites.push(fireball)
          break

        case 'Tackle':
          const tl = gsap.timeline()
          //this depletes the health every time.
          this.health -= attack.damage
    
          let movementDistance = 20
          if(this.isEnemy) movementDistance = -20
    
          let healthBar = '#draggleHealthBar'
          if(this.isEnemy) healthBar = '#playerHealthBar'
    
          tl.to(this.position,{
            x: this.position.x - movementDistance
          })
          .to(this.position, {
            x: this.position.x + movementDistance * 2,
            duration: 0.1,
            onComplete: () => {
              // this is what happens when enemy gets hit.
              gsap.to(healthBar, {
                width: this.health - attack.damage + '%'
              })
              gsap.to(recipient.position, {
                x: recipient.position.x + 10,
                yoyo: true,
                repeat: 5,
                duration: 0.08
              })
              gsap.to(recipient, {
               
                opacity:0,
                repeat: 5,
                yoyo: true,
                duration: 0.08,
                onComplete: () => {
                  console.log('done?')
                }
              })
                // console.log('done')
            }
          })
          .to(this.position, {
            x: this.position.x
          })
        break;
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
    this.width = 48;
    this.height = 48;
    // this.battle = battle;

  }
  //renders the red boundary squares
  draw() {
    c.fillStyle = "rgba(0, 0, 0, 0.5)";
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}