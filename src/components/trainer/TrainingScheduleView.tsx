import React from "react";
import { useGetTrainingDetailsbyTrainingTemplateId } from "./hooks/useGetTrainingDetailsbyTrainingId";
import { RenderTrainingDetails } from "./renders/RenderTrainingDetails";
export function TrainingScheduleView() {
  const { trainingsDetails } = useGetTrainingDetailsbyTrainingTemplateId();
  return <RenderTrainingDetails trainingsDetails={trainingsDetails} />;
}
