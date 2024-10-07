"use client";
import { useForm } from "react-hook-form";

let renderCount = 0;

export default function Home() {
  // renderCount++;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      age: "",
    },
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
        <input type="submit" />
      </form>
    </div>
  );
}
