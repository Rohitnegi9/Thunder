const {
    add,
    subtract,
    calculateDiscount,
    multiply
} = require("../src/math");

describe("Math utilities", () => {

    test("adds two numbers", () => {
        expect(add(2, 3)).toBe(5);
    });

    test("subtracts two numbers", () => {
        expect(subtract(10, 4)).toBe(6);
    });

    test("calculates discount correctly", () => {
        expect(calculateDiscount(1000, 10)).toBe(900);
    });

    test("rejects invalid discounts", () => {
        expect(() => calculateDiscount(1000, 120))
            .toThrow("Invalid price or discount");
    });


    test("multiply two numbers", () => {
        expect(multiply(10, 2)).toBe(20);
    });
});