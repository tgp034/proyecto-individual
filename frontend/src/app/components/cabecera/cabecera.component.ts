import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ComicService } from '../../services/comic.service';

@Component({
  selector: 'app-cabecera',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './cabecera.component.html',
  styleUrl: './cabecera.component.scss'
})
export class CabeceraComponent {
  searchTerm!: string;

  constructor(private router: Router, private comicService: ComicService) {}

  goHome() {
    this.router.navigate(['/']);
  }

  searchComics(searchTerm: string) {
      this.router.navigate(['/resultado-busqueda', searchTerm], { queryParams: { searchComics: true } });
  }
  
  searchCharacters(searchTerm: string) {
      this.router.navigate(['/resultado-busqueda', searchTerm], { queryParams: { searchComics: false } });
  }

  goToLists() {
    this.router.navigate(['/mis-listas']);
  }
}