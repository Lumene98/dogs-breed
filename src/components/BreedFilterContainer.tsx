import { type ReactNode } from "react";

interface IBreedFilterContainerProps {
  children: ReactNode;
}

const BreedFilterContainer = (props: IBreedFilterContainerProps) => {
  return (
    <div className="flex select-none flex-wrap gap-1">{props.children}</div>
  );
};

export default BreedFilterContainer;
