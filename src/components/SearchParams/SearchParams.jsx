import { useState, useEffect } from "react";
import { getPets } from "../../api/getPets";
import { useBreedList } from "../../hooks/useBreedList";
import { Pets } from "../Pets/Pets";

const ANIMALS = ["dog", "cat", "bird", "reptile", "rabbit"];

export const SearchParams = () => {
  const [location, setLocation] = useState("");
  const [breed, setBreed] = useState("");
  const [animal, setAnimal] = useState("");
  const [pets, setPets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [breeds, isBreedsLoading] = useBreedList(animal);

  const requestPets = async () => {
    setIsLoading(true);
    getPets(animal, location, breed)
      .then(({ pets }) => {
        console.log(pets);
        setPets(pets);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          requestPets();
        }}
      >
        <label htmlFor="location">
          Location
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            id="location"
            placeholder="Location"
          />
        </label>

        <label htmlFor="animal">
          Animal
          <select
            id="animal"
            value={animal}
            onChange={(e) => {
              setAnimal(e.target.value);
              setBreed("");
            }}
          >
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
          <select
            id="breed"
            disabled={isBreedsLoading}
            value={breed}
            onChange={(e) => {
              setBreed(e.target.value);
            }}
          >
            <option />
            {breeds.map((breed) => (
              <option value={breed}>{breed}</option>
            ))}
          </select>
        </label>
        <button type="submit">Submit</button>
      </form>
      <Pets pets={pets} />
    </div>
  );
};
