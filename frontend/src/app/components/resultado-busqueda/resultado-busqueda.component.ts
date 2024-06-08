import { Component, Input, OnInit } from '@angular/core';
import { Character, Comic } from '../../models/modelos';
import { CabeceraComponent } from '../cabecera/cabecera.component';
import { NgFor, NgIf } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { TarjetaComponent } from '../tarjeta/tarjeta.component';
import { Router } from '@angular/router';
import { ComicService } from '../../services/comic.service';

@Component({
  selector: 'app-resultado-busqueda',
  standalone: true,
  templateUrl: './resultado-busqueda.component.html',
  styleUrl: './resultado-busqueda.component.scss',
  imports: [CabeceraComponent, NgIf, NgFor, TarjetaComponent],
})
export class ResultadoBusquedaComponent implements OnInit {
  searchTerm!: string;
  comics!: Comic[];
  characters!: Character[];
  searchComics!: boolean;
  noResults = false;

  constructor(
    private route: ActivatedRoute,
    private comicService: ComicService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.searchTerm = params['searchTerm'];
      this.searchComics = this.route.snapshot.queryParamMap.get('searchComics') === 'true';
      if (this.searchComics) {
        this.comicService.findComicsByTitle(this.searchTerm).subscribe(comics => {
          this.comics = comics;
          this.characters = [];
          this.noResults = comics.length === 0;
        });
      } else {
        this.comicService.findCharactersByName(this.searchTerm).subscribe(characters => {
          this.characters = characters;
          this.comics = [];
          this.noResults = characters.length === 0;
        });
      }
    });
  }

  onSelectComic(id: number) {
    this.router.navigate(['/comic', id]);
  }

  onSelectCharacter(id: number) {
    this.router.navigate(['/hero', id]);
  }
}
