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
export interface TrainingList {
  id: string;
  trainer_id: string;
  name: string;
  description: string;
  created_at: Date;
  updated_at: Date;
}
export interface getTrainingDetailsInterface {
  id: string;
  exercise: ExerciseName;
  training_id: string;
  exercise_id: string;
  sets: number;
  repetitions: number;
  rest: number;
  rir: number;
  weight: number;
}
export interface ExerciseName {
  name: string;
  description: string;
}
