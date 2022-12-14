
class Sprite {
     constructor({
      position,
      velocity, 
      image,
      frames = { max: 1, hold: 10 },
      sprites, 
      animate = false,
      rotation = 0,
      scale = 1 
    }) {
      this.position = position;
      this.image = new Image()
      this.frames = {...frames, val: 0, elapsed: 0};
      this.image.onload = () => {
        this.width = (this.image.width / this.frames.max) * scale
        this.height = this.image.height * scale
      }
      this.image.src = image.src
      this.animate = animate
      this.sprites = sprites
      this.opacity = 1
      this.rotation = rotation
      this.scale = scale
     
    }
    //this is the code that I need to use to draw something in the canvas.
    draw() {
      c.save()
      c.translate(
      this.position.x + this.width / 2, 
      this.position.y + this.height / 2
      )
      c.rotate(this.rotation)
      c.translate(
        -this.position.x - this.width / 2,
        -this.position.y - this.height / 2
      )
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
    }

       class Monsters extends Sprite {
        constructor({
          position,
          velocity,
           image,
            frames = { max: 1, hold: 10 },
             sprites,
              animate = false,
               rotation = 0,
                isEnemy = false,
                 name,
                 attacks 
                }){
                  super({
                    position,
                    velocity,
                    image,
                    frames,
                    sprites,
                    animate,
                    rotation
                  })
          this.health = 100
          this.isEnemy = isEnemy
          this.name = name
          this.attacks = attacks
        
        }

        // monster gets defeated
        faint(){
          document.querySelector('#dialogueBox').innerHTML = this.name + ' fainted! '
          
        gsap.to(this.position, {
          //animation goes downwards.
          y: this.position.y + 20 - 20
        })
        // onComplete = () =>{
        //   gsap.to(this.position,{
        //     y: this.position.y - 20})
        // its working but its probably the wrong spot? 
        // }

        gsap.to(this, {
          opacity: 0,
        })
        audio.battle.stop()
        audio.victory.play()
        }
        
        // draggleBattlePosition(){
        //   gsap.to(this.position, {
        //     y: this.position.y - 20
        //   })
        // }

        //code for the dialogue box
        attack({attack, recipient, renderedSprites}){
          document.querySelector('#dialogueBox').style.display = 'block'
          document.querySelector('#dialogueBox').innerHTML = this.name + ' used ' + attack.name  
          //placing the code in line 44-48 makes it globally avaliable inside here:
          let healthBar = '#draggleHealthBar'
          if(this.isEnemy) healthBar = '#playerHealthBar'
    
          let rotation = 1
          if(this.isEnemy) rotation = -2.2
          //i just added this, not sure what it does?

          recipient.health -= attack.damage
    
          switch (attack.name){
            case 'Iceshot':
              audio.iceShot.play()
            const iceshotImage = new Image()
            iceshotImage.src = './img/iceshot.png'
            const iceshot = new Sprite ({
              position: {
                x: this.position.x,
                y: this.position.y
              },
              image: iceshotImage,
              frames:{
                max: 1,
                animate: true,
                rotation
              }
            })
            renderedSprites.splice(1,0, iceshot)
            gsap.to(iceshot.position,{
              x: recipient.position.x,
              y: recipient.position.y,
              onComplete: () => {
                
                gsap.to(healthBar, {
                  //we changed this
                  width: recipient.health + '%'
                })
                gsap.to(recipient.position, {
                  x: recipient.position.x + 10,
                  yoyo: true,
                  repeat: 5,
                  duration: 0.08,

                })
                gsap.to( recipient, {
                  opacity:0,
                  repeat: 5,
                  yoyo: true,
                  duration: 0.08
                })
                renderedSprites.splice(1, 1)
              }
            })
            break
            case 'Fireball':
              audio.initFireball.play()
              const fireballImage = new Image()
              fireballImage.src = './img/fireball.png'
              const fireball = new Sprite ({
                position: {
                  x: this.position.x,
                  y: this.position.y
                },
                image: fireballImage,
                frames: {
                  max: 4,
                  hold: 10
    
                },
                animate: true,
                rotation
              })
             
              renderedSprites.splice(1,0, fireball)
    
              gsap.to(fireball.position,{
                x: recipient.position.x,
                y: recipient.position.y,
                onComplete: () => {
                  //enemy gets hit with fireball
                  audio.fireballHit.play()
                  gsap.to(healthBar, {
                    //we changed this
                    width: recipient.health + '%'
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
                    duration: 0.08
                  })
                  renderedSprites.splice(1, 1)
                }
              })
              break
    
            case 'Tackle':
              const tl = gsap.timeline()
              //this depletes the health every time.
              let movementDistance = 20
              if(this.isEnemy) movementDistance = -20
        
              tl.to(this.position,{
                x: this.position.x - movementDistance
              })
              .to(this.position, {
                x: this.position.x + movementDistance * 2,
                duration: 0.1,
                onComplete: () => {
                  // this is what happens when enemy gets hit.
                  audio.tackleHit.play()

                  gsap.to(healthBar, {
                    width: recipient.health + '%'
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

//I believe this class is the set up for any NPC?
class Character extends Sprite {
  constructor({
    position,
    velocity,
    image,
    frames = { max: 1, hold: 10},
    sprites,
    animate = false,
    rotation = 0,
    scale = 1,
    dialogue = ['']
  }){
    super({
      position,
      velocity,
      image,
      frames,
      sprites,
      animate,
      rotation,
      scale
    })
    this.dialogue = dialogue
    this.dialogueIndex = 0
  }
}