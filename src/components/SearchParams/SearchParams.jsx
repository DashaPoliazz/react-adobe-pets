import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useBreedList } from "../../hooks/useBreedList";
import { Pets } from "../Pets/Pets";
import { getAnimals } from "../../api/getAnimals";

const ANIMALS = ["dog", "cat", "bird", "reptile", "rabbit"];

export const SearchParams = () => {
  const [requestParams, setRequestParams] = useState({
    location: "",
    animal: "",
    breed: "",
  });
  const [breeds, isBreedsLoading] = useBreedList(requestParams.animal);
  const animals = useQuery(["search", requestParams], getAnimals);

  const pets = animals?.data?.pets ?? [];

  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const obj = {
            animal: formData.get("animal") ?? "",
            breed: formData.get("breed") ?? "",
            location: formData.get("location") ?? "",
          };
          setRequestParams(obj);
        }}
      >
        <label htmlFor="location">
          Location
          <input name="location" id="location" placeholder="Location" />
        </label>

        <label htmlFor="animal">
          Animal
          <select id="animal" name="animal">
            <option />
            {ANIMALS.map((animal) => (
              <option value={animal} key={animal}>
                {animal}
              </option>
            ))}
          </select>
        </label>

        <label htmlFor="breed">
          Breed
          <select id="breed" disabled={isBreedsLoading}>
            <option />
            {breeds.map((breed) => (
              <option value={breed} key={breed}>
                {breed}
              </option>
            ))}
          </select>
        </label>
        <button type="submit">Submit</button>
      </form>
      <Pets pets={pets} />
    </div>
  );
};
