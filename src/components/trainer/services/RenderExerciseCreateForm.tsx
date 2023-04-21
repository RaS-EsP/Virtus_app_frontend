import React from "react";
import { Categories } from "../trainerInterface";

export const RenderExerciseCreateForm = ({
  inputForm,
  handleChangeForm,
  categories,
  HandleSubmitForm,
}: {
  inputForm: any;
  handleChangeForm: any;
  categories: any;
  HandleSubmitForm: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
}) => {
  return (
    <form onSubmit={HandleSubmitForm}>
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        value={inputForm.name}
        onChange={handleChangeForm}
        name="name"
        id="name"
      />
      <label htmlFor="video_link">Video Link:</label>
      <input
        type="text"
        value={inputForm.video_link}
        onChange={handleChangeForm}
        name="video_link"
        id="video_link"
      />
      <label htmlFor="description">Description:</label>
      <textarea
        value={inputForm.description}
        onChange={handleChangeForm}
        name="description"
        id="description"
      />
      <label htmlFor="categories">Category:</label>
      <select
        name="category"
        id="categories"
        value={inputForm.category}
        onChange={handleChangeForm}
      >
        <option value="">Choose a category</option>
        {categories.map((category: Categories, index: number) => (
          <option key={index} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>

      <button type="submit">Create Exercise</button>
    </form>
  );
};
