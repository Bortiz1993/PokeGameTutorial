const audio = {
    Map: new Howl({
     src: '../Audio/Apotos (Day) - Sonic Unleashed [OST] (192 kbps).mp3',
        html5: true,
        volume: 0.3
    }),

    initBattle: new Howl({
        src: '../Audio/InitBattle.wav',
        html5: true,
        volume: 0.2
    }),

    battle: new Howl({
        src: '../Audio/battle.mp3',
        html5: true,
        volume: 0.2
    }),

    tackleHit: new Howl({
        src: '../Audio/tackleHit.wav',
        html5: true,
        volume: 0.2
    }),

    fireballHit: new Howl({
        src: '../Audio/fireballHit.wav',
        html5: true,
        volume: 0.2
    }),

    initFireball: new Howl({
        src: '../Audio/initFireball.wav',
        html5: true,
        volume: 0.2
    }),

    victory: new Howl({
        src: '../Audio/victory.wav',
        html5: true,
        volume: 0.4
    })
}