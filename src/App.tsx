import { useRef, type ReactElement, useState } from "react";
import "./styles/global.css";
import {
  useFetchBreeds,
  useFetchImages,
  useInfiniteScrolling,
} from "util/hooks";
import Loading from "components/Loading";
import BreedSelector from "components/BreedSelector";
import Modal from "components/Modal";
import BreedFilterContainer from "components/BreedFilterContainer";
import OpenModalButton from "components/OpenModalButton";

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
  const [openModal, setOpenModal] = useState(false);

  useInfiniteScrolling({
    observedElementRef: observedRef,
    loadMore,
    eof,
  });

  return (
    <main
      className={`overflow-none m-auto flex h-screen flex-col justify-center md:max-w-2xl ${
        openModal ? "active-modal" : ""
      }`}
    >
      {imagesLoading && <Loading></Loading>}
      <div className="flex h-screen w-full flex-col">
        <OpenModalButton onClick={() => setOpenModal(true)} />
        <Modal setOpen={setOpenModal} open={openModal}>
          <BreedFilterContainer>
            {breeds &&
              Object.keys(breeds).map((breed, i) => (
                <BreedSelector
                  setSelectedBreed={setSelectedBreed}
                  subBreeds={breeds[breed]}
                  breed={breed}
                  selectedBreed={selectedBreed}
                  key={i}
                />
              ))}
          </BreedFilterContainer>
        </Modal>
        <div className="flex flex-wrap justify-between gap-8">
          {images.map((image, i) => (
            <img
              className="h-48 w-48 rounded-xl"
              src={image}
              key={image + "_" + i}
            ></img>
          ))}
          <div className="h-2 w-2" ref={observedRef}></div>
          <div className="h-40 w-full"></div>
        </div>
      </div>
    </main>
  );
}

export default App;
