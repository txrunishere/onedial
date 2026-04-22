"use server";

import { LoginSchema, RegisterSchema } from "./schema";
import { z } from "zod";
import prisma from "./prisma";
import bcrypt from "bcrypt";

type RegisterUserActionProps = z.infer<typeof RegisterSchema>;

type LoginUserActionProps = z.infer<typeof LoginSchema>;

// export const registerUserAction = async (data: RegisterUserActionProps) => {
//   const { success, error, data: parsedData } = RegisterSchema.safeParse(data);

//   if (!success) {
//     return {
//       success: false,
//       error: JSON.stringify(error.flatten().fieldErrors),
//     };
//   }

//   try {
//     const response = await prisma.user.create({
//       data: {
//         alias: parsedData.alias,
//         firstName: parsedData.firstName,
//         email: parsedData.email,
//         pin: parseInt(parsedData.pin),
//         defaultMessage: `

//         `,
//       },
//     });

//     if (response) {
//       return {
//         success: true,
//         user: response,
//       };
//     }

//     return {
//       success: false,
//       error: "Unable to register user",
//     };
//   } catch (error: unknown) {
//     console.error("User Register error:", error);

//     if ((error as any).code === "P2002") {
//       return {
//         success: false,
//         error: "User already exists!",
//       };
//     }

//     return {
//       success: false,
//       error:
//         error instanceof Error
//           ? error.message
//           : "Something went wrong while register user",
//     };
//   }
// };

export const registerUserAction = async (data: RegisterUserActionProps) => {
  const result = RegisterSchema.safeParse(data);

  if (!result.success) {
    return {
      success: false,
      error: result.error.flatten().fieldErrors,
    };
  }

  const parsedData = result.data;

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email: parsedData.email },
    });

    if (existingUser) {
      return { success: false, error: "User already exists!" };
    }

    const hashedPin = await bcrypt.hash(parsedData.pin, 10);

    const user = await prisma.user.create({
      data: {
        alias: parsedData.alias,
        firstName: parsedData.firstName,
        email: parsedData.email,
        pin: hashedPin,
        defaultMessage: `Hi, it's ${parsedData.firstName}. My phone isn't available, it's either flat, lost, broken or stolen. I'm sending this from a borrowed device. Please call me back on this number.`,
      },
    });

    const { pin, ...safeUser } = user;

    return {
      success: true,
      user: safeUser,
    };
  } catch (error) {
    console.error("User Register error:", error);

    return {
      success: false,
      error: "Something went wrong while registering user",
    };
  }
};

export const loginUserAction = async (data: LoginUserActionProps) => {
  const result = LoginSchema.safeParse(data);

  if (!result.success) {
    return {
      success: false,
      error: result.error.flatten().fieldErrors,
    };
  }

  const parsedData = result.data;

  try {
    const user = await prisma.user.findUnique({
      where: {
        alias: parsedData.alias,
      },
      include: { contacts: true },
    });

    if (!user) {
      return {
        success: false,
        error: "User not found",
      };
    }

    const userPin = await bcrypt.compare(parsedData.pin, user.pin);

    if (!userPin) {
      return {
        success: false,
        error: "Invalid password",
      };
    }

    return {
      success: true,
      user,
    };
  } catch (error) {
    console.error("User Login error:", error);

    return {
      success: false,
      error: "Something went wrong while login user",
    };
  }
};
