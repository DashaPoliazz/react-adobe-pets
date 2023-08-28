import { useState, useEffect } from "react";

const cache = new Map();

export const useBreedList = (animal) => {
  const [breeds, setBreeds] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!animal) setBreeds([]);
    else if (cache.has(animal)) setBreeds(cache.get(animal));
    else {
      getBreeds(animal);
    }

    async function getBreeds(animal) {
      setIsLoading(true);

      const response = await fetch(
        `http://pets-v2.dev-apis.com/breeds?animal=${animal}`
      );

      if (!response.ok) {
        throw new Error(
          `An error has been occured trying to fetch breeds. Message: ${response}`
        );
      }

      const { breeds } = await response.json();

      cache.set(animal, breeds);
      setBreeds(breeds);
      setIsLoading(false);
    }
  }, [animal]);

  return [breeds, isLoading];
};
