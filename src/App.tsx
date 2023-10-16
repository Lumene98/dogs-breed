import { useRef, type ReactElement, useState } from "react";
import "./styles/global.css";
import {
  useFetchBreeds,
  useFetchImages,
  useInfiniteScrolling,
} from "util/hooks";
import Loading from "components/Loading";
import BreedSelector from "components/BreedSelector";
import Carousel from "components/Carousel";

function App(): ReactElement {
  const { breeds } = useFetchBreeds();
  const [selectedBreed, setSelectedBreed] = useState("");
  const {
    images,
    loadMore,
    loading: imagesLoading,
    eof,
  } = useFetchImages(selectedBreed);
  const observedRef = useRef<HTMLDivElement | null>(null);

  useInfiniteScrolling({
    observedElementRef: observedRef,
    loadMore,
    eof,
  });

  return (
    <main className="overflow-none m-auto flex h-screen flex-col justify-center md:max-w-2xl">
      {imagesLoading && <Loading></Loading>}
      <div className="flex h-screen w-full flex-col">
        <Carousel>
          {breeds &&
            Object.keys(breeds).map((breed) => (
              <BreedSelector
                setSelectedBreed={setSelectedBreed}
                subBreeds={breeds[breed]}
                breed={breed}
                selectedBreed={selectedBreed}
              />
            ))}
        </Carousel>
        <div className="flex flex-wrap gap-8">
          {images.map((image, i) => (
            <img
              className="h-48 w-48 rounded-xl"
              src={image}
              key={image + "_" + i}
            ></img>
          ))}
          <div className="h-2 w-2" ref={observedRef}></div>
        </div>
      </div>
    </main>
  );
}

export default App;
