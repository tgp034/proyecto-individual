
package com.backend.backend.repository;

import com.backend.backend.entity.Comic;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource 
public interface ComicRepository extends JpaRepository<Comic, Long> {

}