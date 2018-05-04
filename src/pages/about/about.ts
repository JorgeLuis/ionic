import { Component } from '@angular/core';
import { ANIMALES } from '../../assets/data/data.animales';
import { Animal } from '../../interfaces/animales.interface';
@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  animales: Animal[] = [];

  constructor() {
    this.animales = ANIMALES.slice(0);//crea un nuevo valor
  }

  reproducir(animal:Animal){
    console.log(animal);
    let audio = new Audio();
    audio.src = animal.audio;

    audio.load();
    audio.play();
    animal.reproduciendo = true;

    setTimeout(()=> animal.reproduciendo = false, animal.duracion * 1000);
  }
}
