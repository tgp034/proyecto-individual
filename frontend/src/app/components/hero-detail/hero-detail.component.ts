import { Component, OnInit } from '@angular/core';
import { Character, Comic } from '../../models/modelos';
import { ActivatedRoute, Router } from '@angular/router';
import { ComicService } from '../../services/comic.service';
import { NgFor, NgIf } from '@angular/common';
import { TarjetaComponent } from '../tarjeta/tarjeta.component';
import { CabeceraComponent } from "../cabecera/cabecera.component";
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-hero-detail',
    standalone: true,
    templateUrl: './hero-detail.component.html',
    styleUrl: './hero-detail.component.scss',
    imports: [NgFor, NgIf, TarjetaComponent, CabeceraComponent]
})
export class HeroDetailComponent implements OnInit {
  character!: Character;
  comics!: Comic[];
  firstAppearance!: string;

  constructor(
    private route: ActivatedRoute,
    private comicService: ComicService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.comicService.getCharacterById(parseInt(id)).subscribe(hero => {
        this.character = hero;
        if (this.character.description === null || this.character.description === '' || this.character.description === undefined)
          this.character.description = 'No hay información disponible';
        
        this.getFirstAppearance(this.character.name).subscribe(result => {
          this.firstAppearance = result;
          console.log(this.firstAppearance);
        });
      });
      this.comicService.getComicsByCharacter(parseInt(id)).subscribe(comics => this.comics = comics);
    }
  }

  onSelectComic(id: number): void {
    this.router.navigate(['/comic', id]);
  }

  getFirstAppearance(name: string): Observable<string> {
    const nameWithoutParenthesis = name.split('(')[0].trim();
    return this.http.get(`http://localhost:8080/api/firstAppearance/${nameWithoutParenthesis}`, {responseType: 'text'});
}

}
