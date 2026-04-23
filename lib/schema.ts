import { z } from "zod";

export const RegisterSchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),

    email: z.string().email("Invalid email address"),

    alias: z
      .string()
      .min(6, "Alias must be at least 6 characters")
      .regex(
        /^[a-zA-Z0-9._-]+$/,
        "Alias can only contain letters, numbers, ., _, -",
      ),

    pin: z
      .string()
      .length(6, "PIN must be exactly 6 digits")
      .regex(/^\d+$/, "PIN must contain only numbers"),

    confirmPin: z.string(),
  })
  .refine((data) => data.pin === data.confirmPin, {
    message: "PINs do not match",
    path: ["confirmPin"],
  })
  .required();

export const LoginSchema = z.object({
  alias: z
    .string()
    .min(6, "Alias must be at least 6 characters")
    .regex(
      /^[a-zA-Z0-9._-]+$/,
      "Alias can only contain letters, numbers, ., _, -",
    ),

  pin: z
    .string()
    .length(6, "PIN must be exactly 6 digits")
    .regex(/^\d+$/, "PIN must contain only numbers"),
});

export const AddContactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name is too long")
    .regex(/^[a-zA-Z\s'-]+$/, "Name contains invalid characters"),

  phone: z
    .string()
    .trim()
    .regex(/^\+?[1-9]\d{7,14}$/, "Invalid phone number format"),

  messageTemplate: z
    .string()
    .trim()
    .min(1, "Message cannot be empty")
    .max(500, "Message is too long"),
});
