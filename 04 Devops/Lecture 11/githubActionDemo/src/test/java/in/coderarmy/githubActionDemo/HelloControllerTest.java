package in.coderarmy.githubActionDemo;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class HelloControllerTest {

    @Test
    void shouldReturnHelloMessage() {

        HelloController controller = new HelloController();

        String result = controller.hello();

        assertEquals(
                "Hello from Coder Army! Welcome back",
                result
        );
    }
}