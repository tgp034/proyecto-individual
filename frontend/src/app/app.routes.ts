import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component'; 
import { ComicDetailComponent } from './components/comic-detail/comic-detail.component';
import { HeroDetailComponent } from './components/hero-detail/hero-detail.component';
import { ResultadoBusquedaComponent } from './components/resultado-busqueda/resultado-busqueda.component';
import { MisListasComponent } from './components/mis-listas/mis-listas.component';
import { DetalleListaComponent } from './detalle-lista/detalle-lista.component';

export const routes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'comic/:id', component: ComicDetailComponent},
    {path: 'hero/:id', component: HeroDetailComponent },
    {path: 'resultado-busqueda/:searchTerm', component: ResultadoBusquedaComponent},
    {path: 'mis-listas', component: MisListasComponent},
    {path: 'lista-detalle/:id', component: DetalleListaComponent}
];
