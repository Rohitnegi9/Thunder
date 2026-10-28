package in.coderarmy.kubernetesDemo;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class NoteController {

    private final NoteRepository repository;

    public NoteController(NoteRepository repository) {
        this.repository = repository;
    }

    @PostMapping("/notes")
    public Note create(@RequestParam String text) {
        return repository.save(new Note(text));
    }

    @GetMapping("/notes")
    public List<Note> getAll() {
        return repository.findAll();
    }

    @GetMapping("/whoami")
    public String whoAmI() {
        String hostname =
                System.getenv().getOrDefault("HOSTNAME", "local-machine");

        return "Handled by: " + hostname;
    }

    @GetMapping("/version")
    public String version() {

        String version =
                System.getenv().getOrDefault("APP_VERSION", "local");

        return "Application version: " + version;
    }
}