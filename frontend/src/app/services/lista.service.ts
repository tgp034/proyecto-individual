import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Character, Comic, Lista } from '../models/modelos';

@Injectable({
  providedIn: 'root'
})

export class ListaService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  getListas(): Observable<Lista[]> {
    return this.http.get<Lista[]>(`${this.apiUrl}/listas`);
  }

  updateNombreLista(id: number, nuevoNombre: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/listas/${id}/updateNombre`, nuevoNombre);
  }

  createLista(nombre: string): Observable<Lista> {
    return this.http.post<Lista>(`${this.apiUrl}/listas`, nombre);
  }

  deleteLista(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/listas/${id}`);
  }

  getLista(id: number): Observable<Lista> {
    return this.http.get<Lista>(`${this.apiUrl}/listas/${id}`);
  }

  addComic(comic: Comic): Observable<void> {
    console.log('Añadiendo comic a la bbdd desde el servicio');
    return this.http.post<void>(`${this.apiUrl}/comics`, comic);
  }
  
  addCharacter(personaje: Character): Observable<void> {
    console.log('Añadiendo personaje a la bbdd desde el servicio');
    return this.http.post<void>(`${this.apiUrl}/characters`, personaje);
  }

  addComicToLista(idLista: number, comic: Comic): Observable<void> {
    console.log('Añadiendo comic a la lista desde el servicio');
    return this.http.post<void>(`${this.apiUrl}/listas/${idLista}/addComic/${comic.id}`,  { comicId: comic.id }).pipe(
        catchError(error => {
            if (error.status === 409) {
                // Handle the conflict error
                console.error('El cómic ya está en la lista');
            }
            // Re-throw the error
            return throwError(error);
        })
    );
}

  removeComicFromLista(idLista: number, comic: Comic): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/listas/${idLista}/removeComic/${comic.id}`);
  }

  addCharacterToLista(idLista: number, personaje: Character): Observable<void> {
    console.log('Añadiendo personaje a la lista desde el servicio');
    return this.http.post<void>(`${this.apiUrl}/listas/${idLista}/addPersonaje/${personaje.id}`,  { personajeId: personaje.id }).pipe(
        catchError(error => {
            if (error.status === 409) {
                // Handle the conflict error
                console.error('El personaje ya está en la lista');
            }
            // Re-throw the error
            return throwError(error);
        })
    );
}

  removeCharacterFromLista(idLista: number, personaje: Character): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/listas/${idLista}/removePersonaje/${personaje.id}`);
  }
}