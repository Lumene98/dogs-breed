import { useEffect, useState } from "react";
import { type Breeds, getBreeds, getImages } from "services/api";

export const useFetchBreeds = () => {
  const [breeds, setBreeds] = useState<Breeds | Record<string, never>>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchBreeds = async () => {
      const { message, status } = await getBreeds();
      setLoading(false);

      if (status !== "success") {
        console.error(status);
        setError(status);
      } else {
        setBreeds(message);
      }
    };

    if (!loading) {
      setLoading(true);
      fetchBreeds().catch((e) => {
        console.log(e);
      });
    }
  }, []);

  return { breeds, error, loading };
};

export const useFetchImages = (breed: string) => {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [refetch, setRefetch] = useState(0);

  useEffect(() => {
    const fetchImages = async () => {
      const { message, status } = await getImages(breed);
      setLoading(false);

      if (status !== "success") {
        console.error(status);
        setError(status);
      } else {
        setImages((prev) => [...prev, ...message]);
      }
    };

    if (!loading) {
      setLoading(true);
      fetchImages().catch((e) => {
        console.log(e);
      });
    }
  }, [refetch]);

  const loadMore = () => {
    setRefetch(Math.random());
  };

  return { images, error, loading, loadMore };
};

interface UseInfiniteScrollingProps {
  observedElementRef: React.MutableRefObject<Element | null>;
  loadMore: () => void;
}

export const useInfiniteScrolling = (props: UseInfiniteScrollingProps) => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          props.loadMore();
        }
      },
      { threshold: 1 },
    );

    if (props.observedElementRef?.current) {
      observer.observe(props.observedElementRef?.current);
    }

    return () => {
      if (props.observedElementRef?.current) {
        observer.unobserve(props.observedElementRef?.current);
      }
    };
  }, [props.observedElementRef]);
};
