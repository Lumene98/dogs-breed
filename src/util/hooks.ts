import { useEffect, useState } from "react";
import { type IBreeds, getBreeds, getImages } from "services/api";

export const useFetchBreeds = () => {
  const [breeds, setBreeds] = useState<IBreeds | Record<string, never>>({});
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
      const { message, status } = await getImages(breed, 12);
      setLoading(false);

      if (status !== "success") {
        console.error(status);
        setError(status);
      } else {
        setImages((prev) => [...prev, ...message]);
      }
    };

    setLoading(true);
    fetchImages().catch((e) => {
      console.log(e);
    });
  }, [refetch]);

  const loadMore = () => {
    setRefetch(Math.random());
  };

  useEffect(() => {
    setImages([]);
    loadMore();
  }, [breed]);

  return { images, error, loading, loadMore, eof: breed !== "" };
};

interface IUseInfiniteScrollingProps {
  observedElementRef: React.MutableRefObject<HTMLDivElement | null>;
  loadMore: () => void;
  eof: boolean;
}

export const useInfiniteScrolling = (props: IUseInfiniteScrollingProps) => {
  const [visible, setVisible] = useState(0);
  useEffect(() => {
    if (visible != 0 && !props.eof) {
      props.loadMore();
    }
  }, [visible]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(Math.random() + 0.1);
        } else {
          setVisible(0);
        }
      },
      { threshold: 0.5 },
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
