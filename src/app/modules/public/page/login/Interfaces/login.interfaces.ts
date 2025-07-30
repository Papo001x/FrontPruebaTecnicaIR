import { UserResponseDTO } from "../../../../../core/interfaces/user.interfaces";

export interface LoginDTO {
    email: string;
    password: string;
}

export interface LoginResponseDTO {
  token: string;
  userResponseDTO: UserResponseDTO;
} 