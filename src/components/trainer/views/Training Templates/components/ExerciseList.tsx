import React from "react";
import { Exercise } from "../../../../../Interfaces";
import { DotsMenu } from "../../../../../img/icons/3DotsMenu";

export const ExerciseList = ({
  filteredExercises,
  AddToTrainingTemplate,
}: any) => {
  return (
    <>
      <ul className=" grid grid-cols-1 sm:grid-cols-2    gap-2 justify-items-center  ">
        {filteredExercises.map((exercise: Exercise, index: number) => (
          <li key={index}>
            <div className="relative ">
              {exercise.video_link.startsWith("https://youtu.be/") ? (
                <img
                  onClick={() => AddToTrainingTemplate(exercise, index)}
                  className="w-[320px] h-[180px] rounded-xl drop-shadow-lg cursor-pointer hover:brightness-75"
                  src={`https://img.youtube.com/vi/${exercise.video_link.substr(
                    "https://youtu.be/".length
                  )}/mqdefault.jpg`}
                  alt={`Youtube video ${exercise.video_link.substr(
                    "https://youtu.be/".length
                  )}`}
                />
              ) : (
                <img
                  onClick={() => AddToTrainingTemplate(exercise, index)}
                  className="w-[320px] h-[180px] rounded-xl drop-shadow-lg cursor-pointer hover:brightness-75   "
                  src={`https://img.youtube.com/vi/${
                    exercise.video_link.split("v=")[1]
                  }/mqdefault.jpg`}
                  alt={`Youtube video ${exercise.video_link.split("v=")[1]}`}
                />
              )}
              <div className="absolute bg-FirstColor bg-opacity-50 rounded-lg px-1 left-2  top-1 flex items-center justify-center">
                <h2 className="text-white  text-sm font-bold">
                  {exercise.name}
                </h2>
              </div>
              <div className="absolute  cursor-pointer bg-SecondColor  rounded-full px-2 right-2  top-1 ">
                <DotsMenu />
              </div>
              <div className="absolute bottom-1 left-1">
                {exercise.categories.map((cat: any, index: number) => (
                  <div
                    key={index}
                    className="inline-block mx-[2px] opacity-80  bg-FirstColor rounded-xl px-2 py-1"
                  >
                    <h2 className="text-white text-xs font-bold">{cat.name}</h2>
                  </div>
                ))}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};
