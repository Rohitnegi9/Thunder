import {z} from zod;

// name, age, email, password
export const signupSchema = z.object({
    name: 
        z.string()
        .trim()
        .min(3, "Minumum length of name should be 3")
        .max(30, "Maximum length of name should be 30"),
    age: 
        z.number()
        .min(10,"Minium age should be 10")
        .max(100,"Maximum age should be 100")
        .optional(),
        // "rohit@gmail.com"
    email: z.preprocess(
        (value)=> typeof value == "string" ? value.trim().toLowerCase():"",
        z.email("Email must be valid")
    ),
    password: 
            z.string()
            .min(8)
            .max(30)
            .regex(/[A-Z]/,"Your password should have atleast one capital letter")
            .regex(/[a-z]/,"Your password should have atleast one small letter")
            .regex(/[0-9]/,"Your password should have atleast 1 number")
            .regex(/[~?@.,<>,{}:'!^#()&-+]/,"Your password should have atleast one special character")
});


export const loginSchema = z.object({
    email: z.preprocess(
        (value)=> typeof value == "string" ? value.trim().toLowerCase():"",
        z.email("Email must be valid")
    ),
    password: 
            z.string()
            .min(8)
            .max(30)
            .regex(/[A-Z]/,"Your password should have atleast one capital letter")
            .regex(/[a-z]/,"Your password should have atleast one small letter")
            .regex(/[0-9]/,"Your password should have atleast 1 number")
            .regex(/[~?@.,<>,{}:'!^#()&-+]/,"Your password should have atleast one special character")
})

