import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Comic, Character } from '../models/modelos'; // Import your Comic model
import { Observable, catchError, forkJoin, map, retry } from 'rxjs';
import md5 from 'md5';

@Injectable({
  providedIn: 'root',
})
export class ComicService {
  //private readonly publicKey = '755eea7af8a20738083b67d2dab9ff6a';
  //private readonly privateKey = '8fb1a65fe9e1db4c786e02d838cd9ec6785f0697';
  private readonly publicKey = '1b55f6036e1b316e99866aed86e05495';
  private readonly privateKey = '7b12f6ad2a61f87f515a0548c01ad5c7825976f2';
  private readonly baseUrl = 'https://gateway.marvel.com/v1/public';

  private timestamp = Number(new Date());
  private hash = md5(this.timestamp + this.privateKey + this.publicKey);

  constructor(private http: HttpClient) {}

  extractIdFromResourceURI(resourceURI: string): number {
    const parts = resourceURI.split('/');
    return Number(parts[parts.length - 1]);
  }

  // Find comics by title starting with a given string
  findComicsByTitle(title: string): Observable<Comic[]> {
    const url = `${this.baseUrl}/comics?titleStartsWith=${title}&limit=5&ts=${this.timestamp}&apikey=${this.publicKey}&hash=${this.hash}`;
    return this.http.get<any>(url).pipe(
      map((response) => {
        return response.data.results.map((comic: any) => {
          return {
            id: comic.id,
            title: comic.title,
            text: comic.description,
            thumbnail: {
              path: comic.thumbnail.path,
              extension: comic.thumbnail.extension,
            },
            creators: comic.creators.items.map((creator: any) => creator.name),
            characters: comic.characters.items.map((character: any) => ({
              id: this.extractIdFromResourceURI(character.resourceURI),
              name: character.name,
              description: "",
              thumbnail: {
                path: "",
                extension: ""
              },
              comics: [] // This should be an array of Comic
            })),
          };
        });
      })
    );
  }

  //Find characters by name starting with a given string
  findCharactersByName(name: string): Observable<Character[]> {
    const url = `${this.baseUrl}/characters?nameStartsWith=${name}&limit=5&ts=${this.timestamp}&apikey=${this.publicKey}&hash=${this.hash}`;
    return this.http.get<any>(url).pipe(
      map((response) => {
        return response.data.results.map((character: any) => {
          return {
            id: character.id,
            name: character.name,
            description: character.description,
            thumbnail: {
              path: character.thumbnail.path,
              extension: character.thumbnail.extension,
            },
            comics: character.comics,
          };
        });
      })
    );
  }

  getCharactersByComic(id: number): Observable<Character[]> {
    const url = `${this.baseUrl}/comics/${id}/characters?limit=5&ts=${this.timestamp}&apikey=${this.publicKey}&hash=${this.hash}`;
    return this.http.get<any>(url).pipe(
      map((response) => {
        return response.data.results.map((character: any) => {
          return {
            id: character.id,
            name: character.name,
            description: character.description,
            thumbnail: {
              path: character.thumbnail.path,
              extension: character.thumbnail.extension,
            },
            comics: character.comics,
          };
        });
      })
    );
  }
  getCreatorsByComic(id: number): Observable<string[]> {
    const url = `${this.baseUrl}/comics/${id}/creators?limit=5&ts=${this.timestamp}&apikey=${this.publicKey}&hash=${this.hash}`;
    return this.http.get<any>(url).pipe(
      map((response) => {
        return response.data.results.map((creator: any) => {
          return creator.fullName;
        });
      })
    );
  }

  // Get a comic by id
  getComicById(id: number): Observable<Comic> {
    console.log('getComicById', id);
    const url = `${this.baseUrl}/comics/${id}?ts=${this.timestamp}&apikey=${this.publicKey}&hash=${this.hash}`;
    return this.http.get<any>(url).pipe(
      map((response) => {
        const comic = response.data.results[0];
        let text = '';
        if (comic.textObjects && comic.textObjects.length > 0) {
          text = comic.textObjects[0].text;
        }
        return {
          id: comic.id,
          title: comic.title,
          text: comic.description ? comic.description : text,
          thumbnail: {
            path: comic.thumbnail.path,
            extension: comic.thumbnail.extension,
          },
          creators: comic.creators.items.map((creator: any) => creator.name),
          characters: comic.characters.items.map((character: any) => ({
            id: this.extractIdFromResourceURI(character.resourceURI),
            name: character.name,
            description: "",
            thumbnail: {
              path: "",
              extension: ""
            },
            comics: [] // This should be an array of Comic
          })),
        } as Comic;
      }),
      catchError((error) => {
        // If there's an error, generate a new random ID and make a new request
        console.error('Error getting comic', id, error);
        const newId = Math.floor(Math.random() * 2000) + 2;
        return this.getComicById(newId);
      })
    );
  }

  // Get a list of 4 comics with random ids
  getRandomComics(): Observable<Comic[]> {
    const randomIds = Array.from({length: 4}, () => Math.floor(Math.random() * 2000) + 2);
    const requests = randomIds.map(id => this.getComicById(id));
  
    return forkJoin(requests);
  }

  //Get a character by id
  getCharacterById(id: number): Observable<Character> {
    const url = `${this.baseUrl}/characters/${id}?ts=${this.timestamp}&apikey=${this.publicKey}&hash=${this.hash}`;
    return this.http.get<any>(url).pipe(
      map((response) => {
        const character = response.data.results[0];
        return {
          id: character.id,
          name: character.name,
          description: character.description,
          thumbnail: {
            path: character.thumbnail.path,
            extension: character.thumbnail.extension,
          },
          comics: character.comics,
        };
      })
    );
  }

  //Get a list of 10 characters
  getCharacters(): Observable<Character[]> {
    const url = `${this.baseUrl}/characters?limit=5&ts=${this.timestamp}&apikey=${this.publicKey}&hash=${this.hash}`;
    return this.http.get<any>(url).pipe(
      map((response) => {
        return response.data.results.map((character: Character) => {
          return {
            id: character.id,
            name: character.name,
            description: character.description,
            thumbnail: {
              path: character.thumbnail.path,
              extension: character.thumbnail.extension,
            },
            comics: character.comics,
          };
        });
      })
    );
  }

  //Get a list of comics by character id
  getComicsByCharacter(id: number): Observable<Comic[]> {
    const url = `${this.baseUrl}/characters/${id}/comics?limit=5&ts=${this.timestamp}&apikey=${this.publicKey}&hash=${this.hash}`;
    return this.http.get<any>(url).pipe(
      map((response) => {
        return response.data.results.map((comic: any) => {
          return {
            id: comic.id,
            title: comic.title,
            text: '',
            thumbnail: {
              path: comic.thumbnail.path,
              extension: comic.thumbnail.extension,
            },
            creators: comic.creators.items.map((creator: any) => creator.name),
            characters: comic.characters.items.map((character: any) => ({
              id: this.extractIdFromResourceURI(character.resourceURI),
              name: character.name,
              description: "",
              thumbnail: {
                path: "",
                extension: ""
              },
              comics: [] // This should be an array of Comic
            })),
          };
        });
      })
    );
  }
  
}
