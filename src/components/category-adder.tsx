import { Button, TextField } from "@radix-ui/themes";
import React from "react";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { actions } from "astro:actions";

const schema = z.object({ name: z.string().nonempty() });
type Schema = z.infer<typeof schema>;

const CategoryAdder: React.FC = () => {
  const queryClient = useQueryClient();

  const createCategory = useMutation({
    mutationFn: actions.categories.create.orThrow,
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });

  const { control, handleSubmit, reset } = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: { name: "" },
  });

  const onSubmit = handleSubmit((data) => {
    createCategory.mutate(data);
    reset();
  });

  return (
    <form onSubmit={onSubmit} className="flex w-full gap-3">
      <Controller
        control={control}
        name="name"
        render={({ field }) => (
          <TextField.Root
            size="3"
            className="flex-1"
            placeholder="What would you like to compare?"
            {...field}
          />
        )}
      />
      <input type="submit" hidden />
      <Button type="submit" size="3" variant="soft">
        Let's go!
        <i className="fas fa-arrow-right"></i>
      </Button>
    </form>
  );
};

export default CategoryAdder;
