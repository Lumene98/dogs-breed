import { type SubBreed } from "services/api";

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
      <button
        onClick={() => setSelectedBreed(props.breed)}
        className="border-1 h-10  whitespace-nowrap rounded-xl border-slate-400 bg-slate-800 px-2 py-2  text-sm font-medium capitalize text-slate-200 aria-selected:bg-indigo-800"
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
          className="border-1 h-10  whitespace-nowrap rounded-xl border-slate-400 bg-slate-800 px-2 py-2  text-sm font-medium capitalize text-slate-200 aria-selected:bg-indigo-800"
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
