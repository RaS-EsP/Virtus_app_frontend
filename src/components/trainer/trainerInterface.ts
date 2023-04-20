export interface Training {
  name: string;
  description: string;
}
export interface Exercise {
  id: string;
  name: string;
  description: string;
  video_link: string;
  trainer_id: string;
}

export interface TrainingDetails {
  trainingName: string;
  trainingDescription: string;
  exerciseDetails: ExerciseDetails[];
}
export interface ExerciseDetails {
  exerciseId: string;
  sets: number;
  reps: number;
  rir: number;
  rest: number;
  weight: number;
}
export interface Props {
  ExercisesDetailTable: Exercise[];
}
