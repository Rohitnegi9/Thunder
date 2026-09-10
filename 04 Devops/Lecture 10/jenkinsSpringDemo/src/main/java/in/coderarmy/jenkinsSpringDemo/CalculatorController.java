package in.coderarmy.jenkinsSpringDemo;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class CalculatorController {

    private final CalculatorService calculatorService;

    public CalculatorController(CalculatorService calculatorService) {
        this.calculatorService = calculatorService;
    }

    @GetMapping("/health")
    public Map<String, String> health() {

        return Map.of(
                "status", "UP",
                "service", "jenkins-spring-demo",
                "version",
                System.getenv().getOrDefault("APP_VERSION", "dev")
        );
    }

    @GetMapping("/add")
    public Map<String, Integer> add(
            @RequestParam int a,
            @RequestParam int b
    ) {

        return Map.of(
                "result",
                calculatorService.add(a, b)
        );
    }
}
