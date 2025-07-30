
import { UserResponseDTO } from './user.interfaces';

export interface ProgramSubjectByUserResponseDTO {
  userId: number;
  programSubjectDetail: UserProgramSubjectDetailDTO[];
}

export interface UserProgramSubjectDetailDTO {
  programSubjectId: number;
  subjectId: number;
  subjectName: string;
  teacherId: number;
  teacherName: string;
  credits: number;
  id: number;
}

export interface UsersByProgramSubjectIdResponseDTO {
  programSubjectId: number;
  users: UserResponseDTO[];
}

export interface UserProgramSubjectDTO {
  studentId: number;
  programSubjectId: number;
}
