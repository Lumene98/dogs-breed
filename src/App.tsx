import { useRef, type ReactElement } from "react";
import "./styles/global.css";
import {
  useFetchBreeds,
  useFetchImages,
  useInfiniteScrolling,
} from "util/hooks";
import { Loading } from "components/Loading";

function App(): ReactElement {
  useFetchBreeds();
  const { images, loadMore, loading } = useFetchImages("");
  const observedRef = useRef<HTMLDivElement | null>(null);


  useInfiniteScrolling({
    observedElementRef: observedRef,
    loadMore,
  });

  return (
    <main className="overflow-none flex h-screen justify-center">
      {loading && <Loading></Loading>}
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
