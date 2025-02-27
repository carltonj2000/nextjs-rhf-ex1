"use client";
import { useFieldArray, useForm } from "react-hook-form";

let renderCount = 0;

type FormValues = {
  name: string;
  age: string;
  pets: { name: string }[];
};
export default function Home() {
  // renderCount++;
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormValues>({
    mode: "onChange",
    defaultValues: {
      name: "",
      age: "",
      pets: [],
    },
  });

  const { fields, append, prepend } = useFieldArray({
    control,
    name: "pets",
  });

  console.log({ errors });
  return (
    <div>
      <h1>Render Count: {renderCount}</h1>
      <form
        onSubmit={handleSubmit((data) => {
          console.log({ data });
        })}
        className="flex flex-col gap-1 p-1"
      >
        <input
          {...register("name", { required: "First name is required" })}
          placeholder="First Name"
        />
        <p>{errors.name?.message}</p>
        <input
          {...register("age", {
            valueAsNumber: true,
            min: 7,
            required: "Age is required",
          })}
          placeholder="Age"
          type="number"
        />
        <p>{errors.age?.message}</p>

        <p>pets</p>
        <div>
          {fields.map((field, index) => {
            return (
              <input
                key={field.id}
                {...(register(`pets.${index}.name`), { required: true })}
              />
            );
          })}
        </div>
        <button type="button" onClick={() => append({ name: "append" })}>
          append
        </button>
        <button type="button" onClick={() => prepend({ name: "prepend" })}>
          prepend
        </button>
        <input type="submit" />
      </form>
    </div>
  );
}
