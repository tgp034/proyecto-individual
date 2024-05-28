package com.backend.backend.entity;

public class ThumbnailDTO {
    private String path;
    private String extension;

    public ThumbnailDTO() {
    }

    public ThumbnailDTO(String path, String extension) {
        this.path = path;
        this.extension = extension;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public String getExtension() {
        return extension;
    }

    public void setExtension(String extension) {
        this.extension = extension;
    }
}

