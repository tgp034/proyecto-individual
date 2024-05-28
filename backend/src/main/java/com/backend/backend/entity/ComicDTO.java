package com.backend.backend.entity;

public class ComicDTO {
    private long id;
    private String title;
    private String text;
    private ThumbnailDTO thumbnail;
    private String[] creators;
    private CharacterDTO[] characters;
    private boolean favorito;
    // getters and setters

    public ComicDTO() {
    }

    public ComicDTO(long id, String title, String text, ThumbnailDTO thumbnail, String[] creators, CharacterDTO[] characters, boolean favorito) {
        this.id = id;
        this.title = title;
        this.text = text;
        this.thumbnail = thumbnail;
        this.creators = creators;
        this.characters = characters;
        this.favorito = favorito;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public ThumbnailDTO getThumbnail() {
        return thumbnail;
    }

    public void setThumbnail(ThumbnailDTO thumbnail) {
        this.thumbnail = thumbnail;
    }

    public String[] getCreators() {
        return creators;
    }

    public void setCreators(String[] creators) {
        this.creators = creators;
    }

    public CharacterDTO[] getCharacters() {
        return characters;
    }

    public void setCharacters(CharacterDTO[] characters) {
        this.characters = characters;
    }

    public boolean isFavorito() {
        return favorito;
    }

    public void setFavorito(boolean favorito) {
        this.favorito = favorito;
    }
}