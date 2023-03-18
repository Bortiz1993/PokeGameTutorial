
const monsters = {
    Emby: {
        position: {
          x: 950,
          y: 890,
        },
        image: {
          src: './img/embySprite.png'
        },
        frames: {
          max: 4,
          hold: 30,
        },
        animate: true,
        name: 'Emby',
        attacks: [attacks.Tackle, attacks.Fireball]
      },

      Draggle: {
            position: {
              x: 1500,
              y: 670,
            },
            image: {
              src: './img/draggleSprite.png'
            },
            frames: {
              max: 4,
              hold: 30,
            },
            animate: true,
            isEnemy: true,
            name: 'Draggle',
            attacks: [attacks.Tackle, attacks.Iceshot]
          
      }
}