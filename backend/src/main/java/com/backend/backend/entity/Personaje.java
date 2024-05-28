package com.backend.backend.entity;
import jakarta.persistence.*;

@Entity
@Table(name = "personaje")
public class Personaje {

    @Id
    private long id;

    private String nombre;
    private String descripcion;
    private String imagen;

    public Personaje() {
    }

    public Personaje(String nombre, String descripcion, String imagen) {
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

    public void setImagen(ThumbnailDTO imagen) {
        this.imagen = imagen.getPath() + "." + imagen.getExtension();
    }

    public CharacterDTO mapPersonajeToCharacterDTO(Personaje personaje) {
        CharacterDTO characterDTO = new CharacterDTO();
        characterDTO.setId(personaje.getId());
        characterDTO.setName(personaje.getNombre());
        characterDTO.setDescription(personaje.getDescripcion());
        // Aquí asumimos que la imagen es una URL completa con la extensión
        String[] splitImage = personaje.getImagen().split("\\.");
        characterDTO.setThumbnail(new ThumbnailDTO(splitImage[0], splitImage[1]));
        characterDTO.setComics(new ComicDTO[0]);
        return characterDTO;
    }
}