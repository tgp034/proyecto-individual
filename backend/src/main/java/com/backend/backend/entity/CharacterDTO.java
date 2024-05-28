package com.backend.backend.entity;

public class CharacterDTO {
    private long id;
    private String name;
    private String description;
    private ThumbnailDTO thumbnail;
    private ComicDTO[] comics;

    public CharacterDTO() {
    }

    public CharacterDTO(long id, String name, String description, ThumbnailDTO thumbnail, ComicDTO[] comics) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.thumbnail = thumbnail;
        this.comics = comics;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public ThumbnailDTO getThumbnail() {
        return thumbnail;
    }

    public void setThumbnail(ThumbnailDTO thumbnail) {
        this.thumbnail = thumbnail;
    }

    public ComicDTO[] getComics() {
        return comics;
    }

    public void setComics(ComicDTO[] comics) {
        this.comics = comics;
    }
}