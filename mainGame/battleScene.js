//This code block creates a sprite and gives it the coordinates of where to start in the browser.
const battleBackgroundImage = new Image();
battleBackgroundImage.src = "./img/GreenForestBattle.png";
const battleBackground = new Sprite({
  position: {
    x: window.visualViewport.pageLeft,
    y: window.visualViewport.pageTop - 20,
  },
  image: battleBackgroundImage,
});
console.log(window.visualViewport)


let draggle
let emby
let renderedSprites
let battleAnimationId
let queue

// console.log(emby)
// console.log(draggle)

function initBattle()  {
document.querySelector('#userInterface').style.display = 'block'
document.querySelector('#dialogueBox').style.display = 'none'
document.querySelector('#draggleHealthBar').style.width = '100%'
document.querySelector('#playerHealthBar').style.width = '100%'
document.querySelector('#attacksBox').replaceChildren()

  draggle = new Monsters(monsters.Draggle)
  emby = new Monsters(monsters.Emby)
  renderedSprites = [draggle, emby]
  queue = []

emby.attacks.forEach((attack) =>{
  const button = document.createElement('button')
  button.innerHTML = attack.name
  document.querySelector('#attacksBox').append(button)

})

  //emby attack options, depends on what you click?
  document.querySelectorAll('button').forEach((button) => {
    const debounce = (func, delay) =>{
      let debounceTimer
      return function() {
        const context = this
        const args = arguments
        clearTimeout(debounceTimer)
        debounceTimer
        = setTimeout(() => func.apply(context, args), delay)
      }
    }
  const embyEvent =  (e)  => {
      console.log(e, "is this one working 68?")

   const selectedAttack = attacks[e.target.innerHTML]
   //we changed the currentTarget to target in the event(e) object.
   emby.attack({
   attack: selectedAttack,
   recipient: draggle,
   renderedSprites
 })
//if draggle gets defeated, do this?
 if(draggle.health <= 0) {
   queue.push(() => {
     console.log(draggle.position.y)
     draggle.faint()
     })

   queue.push(() => {
     //fades back to black
     gsap.to('#overlappingDIV', {
       opacity: 1,
       onComplete: () => {
         cancelAnimationFrame(battleAnimationId)
         animate()
         document.querySelector('#userInterface').style.display = 'none'
         gsap.to('#overlappingDIV', {
           opacity: 0
         })
         battle.initiated = false
         audio.Map.play()
       }
     })
   })
 }   

//draggle or enemy attack options?
const randomAttack =
draggle.attacks[Math.floor(Math.random() * draggle.attacks.length)]

randomAttack.damage = 80
queue.push(() => {
draggle.attack({
   attack: randomAttack,
   recipient: emby,
   renderedSprites
})
//if emby dies, do this?
if(emby.health <= 0){
 queue.push(() => {
  emby.faint()
    //fades back to black
    gsap.to('#gameover', {
      opacity: 1,
      yoyo: true,
      onComplete: () => {
        cancelAnimationFrame(battleAnimationId)
        // animate()
        gsap.to('#userInterface', {
          opacity: 0
        })
        document.querySelector('#userInterface').style.display = 'none'
        gsap.to('#canvas', {
          opacity: 0
        })

        // gsap.to('#overlappingDIV',{
        //   opacity: 0
        // })
  
        document.querySelector('#canvas').remove()
        document.querySelector('#gameover').style.display = 'flex'
        document.querySelector('#gameover').innerHTML = monsters.Emby.name + " has faded into nothing, "
         + "\n"+ "try again?"
        var gameoverLayer = document.querySelector('#gameover')
        gameoverLayer.style.width = `${window.innerWidth}px`
        gameoverLayer.style.height = `${window.innerHeight}px`
        gameoverLayer.style.background = 'green'
        gameoverLayer.style.top = `${window.visualViewport.pageTop}px`
        gameoverLayer.style.left = `${window.visualViewport.pageLeft}px`
        gameoverLayer.style.position = 'absolute'
        // gameoverLayer.style.border = 'solid white 10px'
        gameoverLayer.style.justifyContent = 'center'
        gameoverLayer.style.alignItems = 'center'

        // gsap.to('#overlappingGameOver', {
        //   opacity: 1
        // })
        battle.initiated = false
        // audio.Map.play()
      }
    })
  //  var current = window.location.href
  //  console.log(current)
  //  var path = current.split('mainGame')
  //  setTimeout(() => {
  //   window.location.href = `${path[0]}mainGame/end.html`
  //  }, 500)
  
//  })
// //  queue.push(() => {

  
 })
}
})
}
 
    button.addEventListener('click', debounce(function(e) {
      console.log(e, "this event is at 154")
      embyEvent(e)
      // alert("Hello\nNo matter how many times you" +
      //     "click the debounce button, I get " +
      //     "executed once every 3 seconds!!")
                      }, 500));

//button and attack action functionality. Grabs all buttons, place objects inside of this button.{attack buttons}
button.addEventListener('mouseenter', (e) => {
    const selectedAttack = attacks[e.currentTarget.innerHTML]
    document.querySelector('#attackType').innerHTML = selectedAttack.type
    document.querySelector('#attackType').style.color = selectedAttack.color
})
})
}

///figure out where the position of the monster sprites?

function animateBattle() {
  battleAnimationId = window.requestAnimationFrame(animateBattle);
  battleBackground.draw(window.visualViewport.width, window.visualViewport.height, 8, 8);
  
  renderedSprites.forEach((sprite) => {
    sprite.draw()
  })
  // console.log("animating battle");
}

animate();
// initBattle();
// animateBattle();


///an event listener for the dialogue box.
document.querySelector('#dialogueBox').addEventListener('click', (e) => {
    if(queue.length > 0 ){
        queue[0]()
        queue.shift()
    } else e.currentTarget.style.display = 'none';
    // console.log('clicked Dialogue!')
}) 