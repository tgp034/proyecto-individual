package com.backend.backend.entity;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.*;

@Entity
@Table(name = "lista")
public class Lista {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String nombre;

    @ManyToMany
    @JoinTable(
        name = "lista_personaje",
        joinColumns = @JoinColumn(name = "lista_id"),
        inverseJoinColumns = @JoinColumn(name = "personaje_id")
    )
    private List<Personaje> personajes;

    @ManyToMany
    @JoinTable(
        name = "lista_comic",
        joinColumns = @JoinColumn(name = "lista_id"),
        inverseJoinColumns = @JoinColumn(name = "comic_id")
    )
    private List<Comic> comics;

    public Lista() {
    }

    public Lista(String nombre) {
        this.nombre = nombre;
        this.personajes = new ArrayList<Personaje>();
        this.comics = new ArrayList<Comic>();
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public List<Personaje> getPersonajes() {
        return personajes;
    }

    public void setPersonajes(List<Personaje> personajes) {
        this.personajes = personajes;
    }

    public void addPersonaje(Personaje personaje) {
        this.personajes.add(personaje);
    }

    public List<Comic> getComics() {
        return comics;
    }

    public void setComics(List<Comic> comics) {
        this.comics = comics;
    }

    public void addComic(Comic comic) {
        this.comics.add(comic);
    }

    public void removePersonaje(Personaje personaje) {
        this.personajes.remove(personaje);
    }

    public void removeComic(Comic comic) {
        this.comics.remove(comic);
    }
}
