package in.coderarmy.jenkinsSpringDemo;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class CalculatorServiceTest {

    private final CalculatorService service =
            new CalculatorService();

    @Test
    void shouldAddNumbers() {
        assertEquals(5, service.add(2, 3));
    }

    @Test
    void shouldSubtractNumbers() {
        assertEquals(6, service.subtract(10, 4));
    }

    @Test
    void shouldCalculateDiscount() {
        assertEquals(
                900,
                service.discount(1000, 10)
        );
    }

    @Test
    void shouldRejectInvalidDiscount() {
        assertThrows(
                IllegalArgumentException.class,
                () -> service.discount(1000, 120)
        );
    }
}
