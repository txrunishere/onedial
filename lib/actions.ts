"use server";

import { LoginSchema, RegisterSchema } from "./schema";
import { z } from "zod";

type RegisterUserActionProps = z.infer<typeof RegisterSchema>;

type LoginUserActionProps = z.infer<typeof LoginSchema>;

export const registerUserAction = async (data: RegisterUserActionProps) => {};

export const loginUserAction = async (data: LoginUserActionProps) => {};
