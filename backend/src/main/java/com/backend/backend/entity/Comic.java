package com.backend.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "comic")
public class Comic {
    @Id
    private long id;
    private String nombre;
    @Column(length = 1000)
    private String descripcion;
    private String imagen;

    public Comic() {
    }

    public Comic(String id, String nombre, String descripcion, String imagen) {
        this.id = Long.parseLong(id);
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.imagen = imagen;
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

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getImagen() {
        return imagen;
    }

    public void setImagen(ThumbnailDTO thumbnailDTO) {
        this.imagen = thumbnailDTO.getPath() + "." + thumbnailDTO.getExtension();
    }

    public ComicDTO mapComicToComicDTO(Comic comic) {
        ComicDTO comicDTO = new ComicDTO();
        comicDTO.setId(comic.getId());
        comicDTO.setTitle(comic.getNombre());
        comicDTO.setText(comic.getDescripcion());
        // Aquí asumimos que la imagen es una URL completa con la extensión
        String[] splitImage = comic.getImagen().split("\\.");
        comicDTO.setThumbnail(new ThumbnailDTO(splitImage[0], splitImage[1]));
        comicDTO.setCharacters(new CharacterDTO[0]); // Provide the size of the array
        comicDTO.setCreators(new String[0]);
        return comicDTO;
    }
}
