import React from "react";
import { useGetTrainingDetailsbyTrainingId } from "../../hooks/useGetTrainingDetailsbyTrainingId";
import { RenderTrainingDetails } from "./services/RenderTrainingDetails";
export function TrainingScheduleView() {
  const { trainingsDetails } = useGetTrainingDetailsbyTrainingId();
  return <RenderTrainingDetails trainingsDetails={trainingsDetails} />;
}
