import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Character, Comic, Lista } from '../../models/modelos';
import { ComicService } from '../../services/comic.service';
import { NgFor, NgIf } from '@angular/common';
import { TarjetaComponent } from '../tarjeta/tarjeta.component';
import { CabeceraComponent } from "../cabecera/cabecera.component";
import { ListaService } from '../../services/lista.service';
import { FormsModule } from '@angular/forms';
import { switchMap } from 'rxjs';

@Component({
    selector: 'app-comic-detail',
    standalone: true,
    templateUrl: './comic-detail.component.html',
    styleUrl: './comic-detail.component.scss',
    imports: [NgIf, NgFor, TarjetaComponent, CabeceraComponent, FormsModule]
})
export class ComicDetailComponent implements OnInit {

  comic!: Comic;
  creators: string[] = [];
  characters: Character[] = [];
  lists: Lista[] = [];  // Asegúrate de importar la clase Lista
  selectedList!: number;
  
  constructor(
    private route: ActivatedRoute,
    private comicService: ComicService,
    private router: Router,
    private listaService: ListaService  // Asegúrate de importar el servicio ListaService
  ) {}

  ngOnInit(): void {
    this.getComic();
    this.getCreators();
    this.getCharacters();
    this.getLists();
  }
  
  getLists(): void {
    this.listaService.getListas()
      .subscribe(lists => {
        this.lists = lists.filter(list => list.id !== 1);
        console.log("listas " + this.lists);
      });
  }

  getComic(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.comicService.getComicById(parseInt(id))
        .subscribe(comic => this.comic = comic);
    }else{
      console.error('Comic ID not found');
    }
  }

  addToFavorites(): void {
    console.log('Añadiendo a favoritos');
    console.log(this.comic);
    this.listaService.addComic(this.comic).pipe(
      switchMap(() => this.listaService.addComicToLista(1, this.comic))
    ).subscribe(
      () => console.log('Comic añadido a la lista con éxito'),
      error => console.error('Error al añadir el cómic a favoritos', error)
    );
  }
  
  addToList(): void {
    this.listaService.addComic(this.comic).pipe(
      switchMap(() => this.listaService.addComicToLista(this.selectedList, this.comic))
    ).subscribe(
      () => console.log('Comic añadido a la lista con éxito'),
      error => console.error('Error al añadir el cómic a la lista', error)
    );
  }

  getCharacters(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.comicService.getCharactersByComic(parseInt(id))
        .subscribe(characters => this.characters = characters);
    }else{
      console.error('Comic ID not found');
    }
  }

  getCreators(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.comicService.getCreatorsByComic(parseInt(id))
        .subscribe(creators => this.creators = creators);
    }else{
      console.error('Comic ID not found');
    }
  }

  onSelectCharacter(id: number) {
    this.router.navigate(['/hero', id]);
    }
}
