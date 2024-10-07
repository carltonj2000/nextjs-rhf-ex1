"use client";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  name: z.string().min(1, { message: "Required" }),
  age: z.number().min(10),
});

let renderCount = 0;

export default function Home() {
  // renderCount++;
  const { register, handleSubmit } = useForm({
    resolver: zodResolver(schema),
    shouldUseNativeValidation: true,
  });

  return (
    <div>
      <h1>Render Count: {renderCount}</h1>
      <form
        onSubmit={handleSubmit((data) => {
          console.log({ data });
        })}
        className="flex flex-col gap-1 p-1"
      >
        <input {...register("name")} placeholder="First Name" />
        <input
          {...register("age", { valueAsNumber: true })}
          placeholder="Age"
          type="number"
        />
        <input type="submit" />
      </form>
    </div>
  );
}
