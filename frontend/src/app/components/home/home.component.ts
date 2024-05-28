import { Component, OnInit } from '@angular/core';
import { ComicService } from '../../services/comic.service'; // Import your ComicService
import { Comic } from '../../models/modelos'; // Import your Comic interface
import { NgFor, NgIf } from '@angular/common';
import { TarjetaComponent } from '../tarjeta/tarjeta.component';
import { Router } from '@angular/router';
import { CabeceraComponent } from "../cabecera/cabecera.component";

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    imports: [NgIf, NgFor, TarjetaComponent, CabeceraComponent]
})
export class HomeComponent implements OnInit {
  comics: Comic[] = [];
  loading: boolean = false;
  error: string = '';

  constructor(private comicService: ComicService, private router: Router) {}

  ngOnInit() {
    this.loading = true;
    this.comicService.getRandomComics()
      .subscribe(comics => {
        this.comics = comics;
        this.loading = false;
      });
  }

  onSelectComic(id: number): void {
    this.router.navigate(['/comic', id]);
  }
}
