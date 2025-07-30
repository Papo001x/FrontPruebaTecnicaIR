export interface UserResponseDTO {
  id: number;
  name: string;
  lastName: string;
  email: string;
  roleId: number;
  roleName: string;
  programId?: number;
  programName?: number;
}

export interface UserDTO {
  name: string;
  lastName: string;
  email: string;
  password: string;
  roleId: number;
  programId?: number;
  programName?: number;
}
