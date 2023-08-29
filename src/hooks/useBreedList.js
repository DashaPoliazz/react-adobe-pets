import { useQuery } from "@tanstack/react-query";
import { getBreedList } from "../api/getBreedList";

export const useBreedList = (animal) => {
  const { data, isLoading } = useQuery(["breeds", animal], getBreedList);

  return [data?.breeds ?? [], isLoading];
};
