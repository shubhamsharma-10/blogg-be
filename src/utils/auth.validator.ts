import zod from 'zod';

export const signupSchema = zod.object({
    firstname: zod.string().min(2, "First name must be at least 2 characters long"),
    lastname: zod.string().min(2, "Last name must be at least 2 characters long"),
    email: zod.string().email("Invalid email address"),
    password: zod.string().min(6, "Password must be at least 6 characters long").max(20, "Password must be at most 20 characters long"),
})

export const signinSchema = zod.object({
    email: zod.string().email("Invalid email address"),
    password: zod.string().min(6, "Password must be at least 6 characters long").max(20, "Password must be at most 20 characters long"),
})