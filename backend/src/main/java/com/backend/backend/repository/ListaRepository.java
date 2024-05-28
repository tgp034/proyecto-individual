
package com.backend.backend.repository;

import com.backend.backend.entity.Lista;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource 
public interface ListaRepository extends JpaRepository<Lista, Long> {

}