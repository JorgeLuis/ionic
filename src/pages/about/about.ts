import { Component } from '@angular/core';
import { ANIMALES } from '../../assets/data/data.animales';
import { Animal } from '../../interfaces/animales.interface';
import { Refresher, reorderArray } from 'ionic-angular';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  animales: Animal[] = [];
  audio = new Audio();
  audioTiempo: any;
  ordenando:boolean = false;

  constructor() {
    this.animales = ANIMALES.slice(0);//crea un nuevo valor
  }

  reproducir(animal: Animal) {

    this.pausar_audio(animal);

    if (animal.reproduciendo) {
      animal.reproduciendo = false;
      return;
    }
    console.log(animal);
    this.audio.src = animal.audio;
    this.audio.load();
    this.audio.play();
    animal.reproduciendo = true;

    this.audioTiempo = setTimeout(() => animal.reproduciendo = false, animal.duracion * 1000);
  }

  private pausar_audio(animalSelecionado: Animal) {
    clearTimeout(this.audioTiempo);
    this.audio.pause();
    this.audio.currentTime = 0;

    for (let animal of this.animales) {
      if (animal.nombre != animalSelecionado.nombre) {
        animal.reproduciendo = false;
      }
    }
  }

  borrar_animal(id: number) {
    this.animales.splice(id, 1);
  }

  recargar_animales(refresher: Refresher) {
    console.log('Inicio del refresh', refresher);

    setTimeout(() => {
      console.log('Termino el refresh');
      this.animales = ANIMALES.slice(0);
      refresher.complete();
    }, 1500);
  }

  reordenar_animales(indices:any){
      this.animales = reorderArray(this.animales, indices);
  }
}
