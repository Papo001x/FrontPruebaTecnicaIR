export interface ProgramSubjectsByProgramResponseDTO {
  programId: number;
  programName: string;
  subjects: ProgramSubjectDetailDTO[];
}

export interface ProgramSubjectDetailDTO {
  programSubjectId: number;
  subjectId: number;
  subjectName: string;
  teacherId: number;
  teacherName: string;
  credits: number;
}

export interface ProgramSubjectDTO {
  programId: number;
  subjectId: number;
  teacherId: number;
}
