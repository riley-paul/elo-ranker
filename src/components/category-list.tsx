import { Card } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import { actions } from "astro:actions";
import React from "react";

const CategoryList: React.FC = () => {
  const { data } = useQuery({
    queryKey: ["categories"],
    queryFn: actions.categories.getAll.orThrow,
  });

  return (
    <Card>
      <h1>Categories</h1>
      <ul>
        {data?.map((category) => <li key={category.id}>{category.name}</li>)}
      </ul>
    </Card>
  );
};

export default CategoryList;
