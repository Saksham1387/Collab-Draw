import { z } from "zod";

export const CreateUserSchema = z.object({
  username: z.string().min(3).max(20),
  password: z.string(),
  email: z.string(),
});

export const SigninSchema = z.object({
  email: z.string().min(3).max(50),
  password: z.string(),
});

export const CreateRoomSchema = z.object({
  name: z.string().min(3).max(20),
});

export const ResetPasswordSchema = z.object({
  email: z.string(),
});

export const ResetPasswordConfirmSchema = z.object({
  token: z.string(),
  password: z.string(),
});
