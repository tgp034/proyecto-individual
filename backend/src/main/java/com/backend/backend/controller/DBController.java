package com.backend.backend.controller;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.backend.repository.ComicRepository;
import com.backend.backend.repository.ListaRepository;
import com.backend.backend.repository.PersonajeRepository;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import com.backend.backend.entity.CharacterDTO;
import com.backend.backend.entity.Comic;
import com.backend.backend.entity.ComicDTO;
import com.backend.backend.entity.Lista;
import com.backend.backend.entity.Personaje;
import com.backend.backend.entity.ThumbnailDTO;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class DBController {

    private final PersonajeRepository personajeRepository;
    private final ComicRepository comicRepository;
    private final ListaRepository listaRepository;

    public DBController(PersonajeRepository personajeRepository, ComicRepository comicRepository, ListaRepository listaRepository) {
        this.personajeRepository = personajeRepository;
        this.comicRepository = comicRepository;
        this.listaRepository = listaRepository;
    }

    public ComicDTO mapComicToComicDTO(Comic comic) {
        ComicDTO comicDTO = new ComicDTO();
        comicDTO.setId(comic.getId());
        comicDTO.setTitle(comic.getNombre());
        comicDTO.setText(comic.getDescripcion());
        // Aquí asumimos que la imagen es una URL completa con la extensión
        String[] splitImage = comic.getImagen().split(".jpg");
        comicDTO.setThumbnail(new ThumbnailDTO(splitImage[0], "jpg"));
        comicDTO.setCharacters(new CharacterDTO[0]);
        comicDTO.setCreators(new String[0]);
        return comicDTO;
    }

    public CharacterDTO mapPersonajeToCharacterDTO(Personaje personaje) {
        CharacterDTO characterDTO = new CharacterDTO();
        characterDTO.setId(personaje.getId());
        characterDTO.setName(personaje.getNombre());
        characterDTO.setDescription(personaje.getDescripcion());
        // Aquí asumimos que la imagen es una URL completa con la extensión
        String[] splitImage = personaje.getImagen().split(".jpg");
        characterDTO.setThumbnail(new ThumbnailDTO(splitImage[0], "jpg"));
        characterDTO.setComics(new ComicDTO[0]);
        return characterDTO;
    }

    @GetMapping("/firstAppearance/{characterName}")
    public String getFirstAppearance(@PathVariable String characterName) {
        String firstAppearance = "No hay información disponible";
    
        try {
            // Fetch the Wikipedia page
            Document doc = Jsoup.connect("https://es.wikipedia.org/wiki/" + characterName).get();
    
            // Select the first appearance element
            Elements firstAppearanceElements = doc.getElementsByClass("infobox").get(0).getElementsByTag("tbody").get(0).getElementsByTag("tr");
    
            for (Element row : firstAppearanceElements) {
                if (row.text().startsWith("Primera aparición")) {
                    firstAppearance = row.getElementsByTag("td").first().text();
                    break;
                }
            }
        } catch (IOException e) {
            e.printStackTrace(); // Basic error handling, can be improved based on the context
        }
    
        return firstAppearance;
    }

    @GetMapping("/characters")
    public List<Personaje> getCharacters() {
        return (List<Personaje>) personajeRepository.findAll();
    }

    @GetMapping("/characters/{id}")
    public Personaje getCharacter(@PathVariable Long id) {
        return personajeRepository.findById(id).orElse(null);
    }

    @PostMapping("/characters")
    public Personaje createCharacter(@RequestBody CharacterDTO characterDTO) {
        Personaje personaje = new Personaje();
        personaje.setId(characterDTO.getId());
        personaje.setNombre(characterDTO.getName());
        personaje.setDescripcion(characterDTO.getDescription());
        personaje.setImagen(characterDTO.getThumbnail()); 
        // Aquí puedes manejar cómo se mapean los otros campos, como 'comics'

        return personajeRepository.save(personaje);
    }

    @DeleteMapping("/characters/{id}")
    public ResponseEntity<?> deleteCharacter(@PathVariable Long id) {
        personajeRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/comics")
    public List<Comic> getComics() {
        return (List<Comic>) comicRepository.findAll();
    }

    @GetMapping("/comics/{id}")
    public Comic getComic(@PathVariable Long id) {
        return comicRepository.findById(id).orElse(null);
    }

    @PostMapping("/comics")
    public Comic createComic(@RequestBody ComicDTO comicDTO) {
        Comic comic = new Comic();
        comic.setId(comicDTO.getId());
        comic.setNombre(comicDTO.getTitle());
        comic.setDescripcion(comicDTO.getText());
        comic.setImagen(comicDTO.getThumbnail()); 
        return comicRepository.save(comic);
    }
    
    @DeleteMapping("/comics/{id}")
    public ResponseEntity<?> deleteComic(@PathVariable Long id) {
        comicRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/listas")
    public List<Lista> getListas() {
        return (List<Lista>) listaRepository.findAll();
    }

    @GetMapping("/listas/{id}")
    public Map<String, Object> getLista(@PathVariable Long id) {
        Lista lista = listaRepository.findById(id).orElse(null);
        if (lista == null) {
            return null;
        }

        List<ComicDTO> comicDTOs = lista.getComics().stream()
                .map(this::mapComicToComicDTO)
                .collect(Collectors.toList());

        List<CharacterDTO> characterDTOs = lista.getPersonajes().stream()
                .map(this::mapPersonajeToCharacterDTO)
                .collect(Collectors.toList());

        Map<String, Object> response = new HashMap<>();
        response.put("id", lista.getId());
        response.put("nombre", lista.getNombre());
        response.put("comics", comicDTOs);
        response.put("personajes", characterDTOs);

        return response;
    }

    @PostMapping("/listas")
    public Lista createLista(@RequestBody String nombre) {
        Lista lista = new Lista(nombre);
        return listaRepository.save(lista);
    }

    @DeleteMapping("/listas/{id}")
    public ResponseEntity<?> deleteLista(@PathVariable Long id) {
        listaRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/listas/{id}/updateNombre")
    public ResponseEntity<Lista> updateNombreLista(@PathVariable Long id, @RequestBody String nuevoNombre) {
        Lista lista = listaRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Lista not found for this id :: " + id));
        lista.setNombre(nuevoNombre);
        final Lista updatedLista = listaRepository.save(lista);
        return ResponseEntity.ok(updatedLista);
    }

    @PostMapping("/listas/{idLista}/addPersonaje/{personajeId}")
    public ResponseEntity<Void> addPersonajeToLista(@PathVariable Integer idLista, @PathVariable Integer personajeId) {
        Lista lista = listaRepository.findById((long) idLista)
            .orElseThrow(() -> new ResourceNotFoundException("Lista not found for this id :: " + idLista));
        Personaje personaje = personajeRepository.findById((long) personajeId)
            .orElseThrow(() -> new ResourceNotFoundException("Personaje not found for this id :: " + personajeId));
    
        // Check if the personaje is already in the list
        if (lista.getPersonajes().contains(personaje)) {
            return new ResponseEntity<>(HttpStatus.CONFLICT); // Return a 409 Conflict status code
        }
    
        lista.getPersonajes().add(personaje);
        listaRepository.save(lista);
        return new ResponseEntity<>(HttpStatus.OK); // Return a 200 OK status code
    }

    @PostMapping("/listas/{idLista}/addComic/{comicId}")
    public ResponseEntity<Void> addComicToLista(@PathVariable Integer idLista, @PathVariable Integer comicId) {
        Lista lista = listaRepository.findById((long) idLista)
                .orElseThrow(() -> new ResourceNotFoundException("Lista not found for this id :: " + idLista));
        Comic comic = comicRepository.findById((long) comicId)
                .orElseThrow(() -> new ResourceNotFoundException("Comic not found for this id :: " + comicId));

        // Check if the comic is already in the list
        if (lista.getComics().contains(comic)) {
            return new ResponseEntity<>(HttpStatus.CONFLICT); // Return a 409 Conflict status code
        }

        lista.getComics().add(comic);
        listaRepository.save(lista);
        return new ResponseEntity<>(HttpStatus.OK); // Return a 200 OK status code
    }

    @DeleteMapping("/listas/{listaId}/removePersonaje/{personajeId}")
    public Lista removePersonajeFromLista(@PathVariable Long listaId, @PathVariable Long personajeId) {
        Lista lista = listaRepository.findById(listaId).orElseThrow(() -> new RuntimeException("Lista no encontrada"));
        Personaje personaje = personajeRepository.findById(personajeId).orElseThrow(() -> new RuntimeException("Personaje no encontrado"));
    
        lista.removePersonaje(personaje);
        
        return listaRepository.save(lista);
    }

    @DeleteMapping("/listas/{listaId}/removeComic/{comicId}")
    public Lista removeComicFromLista(@PathVariable Long listaId, @PathVariable Long comicId) {
        Lista lista = listaRepository.findById(listaId).orElseThrow(() -> new RuntimeException("Lista no encontrada"));
        Comic comic = comicRepository.findById(comicId).orElseThrow(() -> new RuntimeException("Comic no encontrado"));
    
        lista.removeComic(comic);

        return listaRepository.save(lista);
    }

}
