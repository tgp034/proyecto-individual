
package com.backend.backend.repository;

import com.backend.backend.entity.Personaje;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource 
public interface PersonajeRepository extends JpaRepository<Personaje, Long> {

}