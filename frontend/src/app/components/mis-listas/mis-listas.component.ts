import { Component, OnInit } from '@angular/core';
import { Lista } from '../../models/modelos';
import { ListaService } from '../../services/lista.service';
import { NgFor, NgIf } from '@angular/common';
import { CabeceraComponent } from "../cabecera/cabecera.component";
import { Router } from '@angular/router';

@Component({
    selector: 'app-mis-listas',
    standalone: true,
    templateUrl: './mis-listas.component.html',
    styleUrl: './mis-listas.component.scss',
    imports: [NgFor, NgIf, CabeceraComponent]
})
export class MisListasComponent implements OnInit {
  listas!: Lista[];

  constructor(private listaService: ListaService, private router: Router) { }

  ngOnInit(): void {
    this.getListas();
  }

  getListas(): void {
    this.listaService.getListas().subscribe(listas => this.listas = listas);
  }

  add(nombre: string): void {
    this.listaService.createLista(nombre).subscribe(lista => this.listas.push(lista));
  }

  delete(lista: Lista): void {
    this.listas = this.listas.filter(l => l !== lista);
    this.listaService.deleteLista(lista.id).subscribe();
  }

  verDetalle(lista: Lista): void {
    this.router.navigate(['/lista-detalle/', lista.id]);
  }
}