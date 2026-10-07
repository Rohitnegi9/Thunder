package in.coderarmy.demo;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/notes")
public class NoteController {

    private final NoteRepository noteRepository;

    public NoteController(NoteRepository noteRepository) {
        this.noteRepository = noteRepository;
    }

    @PostMapping
    public Note createNote(@RequestParam String text) {

        Note note = new Note(text);

        return noteRepository.save(note);
    }
}