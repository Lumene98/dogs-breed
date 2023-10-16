import { type SubBreed } from "services/api";
import Chip from "./Chip";

interface IBreedSelectorProps {
  subBreeds: SubBreed;
  breed: string;
  setSelectedBreed: React.Dispatch<React.SetStateAction<string>>;
  selectedBreed: string;
}

const BreedSelector = (props: IBreedSelectorProps) => {
  const setSelectedBreed = (breed: string, subBreed?: string) => {
    props.setSelectedBreed((oldBreed) => {
      let newBreed = "";

      if (subBreed) {
        newBreed = breed + "/" + subBreed;
      } else {
        newBreed = breed;
      }

      if (newBreed === oldBreed) {
        return "";
      } else {
        return newBreed;
      }
    });
  };

  if (props.subBreeds.length == 0) {
    return (
      <Chip
        onClick={() => setSelectedBreed(props.breed)}
        aria-selected={props.selectedBreed === props.breed}
      >
        {props.breed}
      </Chip>
    );
  }

  return (
    <>
      {props.subBreeds.map((subBreed) => (
        <Chip
          onClick={() => setSelectedBreed(props.breed, subBreed)}
          key={props.breed + "_" + subBreed}
          aria-selected={props.selectedBreed === props.breed + "/" + subBreed}
        >
          {props.breed + " " + subBreed}
        </Chip>
      ))}
    </>
  );
};

export default BreedSelector;
