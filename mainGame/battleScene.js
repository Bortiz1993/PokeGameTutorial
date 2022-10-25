//This code block creates a sprite and gives it the coordinates of where to start in the browser.
const battleBackgroundImage = new Image();
battleBackgroundImage.src = "../img/battleBackground.png";
const battleBackground = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  image: battleBackgroundImage,
});


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

//button and attack action functionality. Grabs all buttons, place objects inside of this button.{attack buttons}
document.querySelectorAll('button').forEach((button) => {
  button.addEventListener('click', (e) => {
    // console.log(e.currentTarget.innerHTML)

    //emby attack options, depends on what you click?
    const selectedAttack = attacks[e.currentTarget.innerHTML]
    emby.attack({
    attack: selectedAttack,
    recipient: draggle,
    renderedSprites
  })

  if(draggle.health <= 0){
    queue.push(() => {
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

  queue.push(() => {
    draggle.attack({
        attack: randomAttack,
        recipient: emby,
        renderedSprites
    })

    if(emby.health <= 0){
      queue.push(() => {
        emby.faint()
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
  })
})

button.addEventListener('mouseenter', (e) =>{
    const selectedAttack = attacks[e.currentTarget.innerHTML]
    document.querySelector('#attackType').innerHTML = selectedAttack.type
    document.querySelector('#attackType').style.color = selectedAttack.color
})
})

}
console.log(emby)
console.log(draggle)
console.log(renderedSprites)

function animateBattle() {
  battleAnimationId = window.requestAnimationFrame(animateBattle);
  battleBackground.draw();

  console.log(battleAnimationId)

  renderedSprites.forEach((sprite) => {
    sprite.draw()
  })
  // console.log("animating battle");
}

animate();
// initBattle();
// animateBattle();


///an event listener for the dialogue box.
document.querySelector('#dialogueBox').addEventListener('click', (e) =>{
    if(queue.length > 0 ){
        queue[0]()
        queue.shift()
    } else e.currentTarget.style.display = 'none';
    // console.log('clicked Dialogue!')
})