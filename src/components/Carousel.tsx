import { type ReactNode } from "react";

interface ICarouselProps {
  children: ReactNode;
}

const Carousel = (props: ICarouselProps) => {
  return (
    <div className=" fixed bottom-2 flex  h-14 flex-shrink-0 overflow-x-scroll rounded-xl bg-slate-600 md:max-w-2xl">
      <div className="flex touch-pan-x flex-row flex-nowrap items-center justify-center gap-1 px-1">
        {props.children}
      </div>
    </div>
  );
};

export default Carousel;
