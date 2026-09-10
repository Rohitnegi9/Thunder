package in.coderarmy.jenkinsSpringDemo;

import org.springframework.stereotype.Service;

@Service
public class CalculatorService {

    public int add(int a, int b) {
        return a + b;
    }

    public int subtract(int a, int b) {
        return a - b;
    }

    public double discount(double price, double percentage) {

        if (price < 0 || percentage < 0 || percentage > 100) {
            throw new IllegalArgumentException("Invalid input");
        }

        return price - (price * percentage / 100);
    }
}
