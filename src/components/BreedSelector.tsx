import { type SubBreed } from "services/api";

interface BreedSelectorProps {
  subBreeds: SubBreed;
  breed: string;
  setSelectedBreed: React.Dispatch<React.SetStateAction<string>>;
  selectedBreed: string;
}

const BreedSelector = (props: BreedSelectorProps) => {
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
      <button
        onClick={() => setSelectedBreed(props.breed)}
        className="rounded-md bg-blue-500 px-4 py-2 text-sm font-semibold text-white aria-selected:bg-indigo-500"
        aria-selected={props.selectedBreed === props.breed}
      >
        {props.breed}
      </button>
    );
  }

  return (
    <>
      {props.subBreeds.map((subBreed) => (
        <button
          onClick={() => setSelectedBreed(props.breed, subBreed)}
          className="rounded-md bg-blue-500 px-4 py-2 text-sm font-semibold text-white aria-selected:bg-indigo-500"
          key={props.breed + "_" + subBreed}
          aria-selected={props.selectedBreed === props.breed + "/" + subBreed}
        >
          {props.breed + " " + subBreed}
        </button>
      ))}
    </>
  );
};

export default BreedSelector;
