import { useRef, type ReactElement } from "react";
import "./styles/global.css";
import {
  useFetchBreeds,
  useFetchImages,
  useInfiniteScrolling,
} from "util/hooks";

function App(): ReactElement {
  useFetchBreeds();
  const { images, loadMore } = useFetchImages("");
  const observedRef = useRef(null);
  useInfiniteScrolling({
    observedElementRef: observedRef,
    loadMore,
  });

  return (
    <main className="overflow-none flex h-screen justify-center">
      <div className="flex h-full w-full flex-wrap gap-8 md:max-w-2xl">
        {images.map((image, i) => (
          <img className="h-48 w-48" src={image} key={image + "_" + i}></img>
        ))}
        <div ref={observedRef}></div>
      </div>
    </main>
  );
}

export default App;
