
class Animal {
    constructor(name, species){
        this.name = name
        this.species = species
    }
}

class Feline extends Animal {
    constructor({
        name,
        species
     } ){
    super(
        name,
        species
     )
    this.mice_caught = 0
}
 hunting() {
    const chance = Math.round(Math.random() * 10)
    if(chance > 5){
        this.mice_caught++
    }
    console.log(this)
}
}
var cat = new Feline({name:'Kat', species: 'cat'})


document.getElementById('wrapper').addEventListener('click', function(e){
    console.log('current', e.currentTarget)
    console.log('target', e.target)
 
    cat.hunting()
})
