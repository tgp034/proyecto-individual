import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Comic } from '../../models/modelos';
import { Character } from '../../models/modelos';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-tarjeta',
  standalone: true,
  imports: [NgIf],
  templateUrl: './tarjeta.component.html',
  styleUrl: './tarjeta.component.scss'
})
export class TarjetaComponent {
  @Input() title!: string;
  @Input() image!: string;
  @Input() comic!: Comic;
  @Input() character!: Character; // Nueva entrada para el personaje
  @Output() selectComic = new EventEmitter<number>();
  @Output() selectCharacter = new EventEmitter<number>(); // Nuevo emisor de eventos para el personaje
  isFavorite = false;

  onSelectComic(): void {
    this.selectComic.emit(this.comic.id);
  }

  onSelectCharacter(): void {
    this.selectCharacter.emit(this.character.id); // Nuevo método para seleccionar un personaje
  }
}