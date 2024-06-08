import { Component, OnInit } from '@angular/core';
import { Comic, Lista } from '../models/modelos';
import { ActivatedRoute } from '@angular/router';
import { ListaService } from '../services/lista.service';
import { TarjetaComponent } from '../components/tarjeta/tarjeta.component';
import { CabeceraComponent } from '../components/cabecera/cabecera.component';
import { NgFor } from '@angular/common';
import { Router } from '@angular/router';

@Component({
    selector: 'app-detalle-lista',
    standalone: true,
    templateUrl: './detalle-lista.component.html',
    styleUrl: './detalle-lista.component.scss',
    imports: [TarjetaComponent, CabeceraComponent, NgFor]
})
export class DetalleListaComponent implements OnInit {
  lista!: Lista;

  constructor(
    private route: ActivatedRoute,
    private listaService: ListaService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getLista();
  }

  getLista(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.listaService.getLista(Number(id)).subscribe(lista => {
        this.lista = lista;
        console.log('Received from service:', lista);
      });
    }
  }

  onSelectComic(id: number) {
    console.log('Comic ID:', id);
    this.router.navigate(['/comic', id]);
  }

  onSelectCharacter(id: number) {
    this.router.navigate(['/hero', id]);
  }

  eliminarComic(comic: Comic): void {
    if (this.lista && this.lista.id) {
      this.listaService.removeComicFromLista(this.lista.id, comic).subscribe(() => {
        // Actualizar la lista de comics después de eliminar
        this.lista.comics = this.lista.comics.filter(c => c.id !== comic.id);
      });
    }
  }
}