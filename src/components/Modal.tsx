import { type ReactNode, type Dispatch, type SetStateAction } from "react";

interface IModalProps {
  children: ReactNode;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const Modal = (props: IModalProps) => {
  return (
    <>
      {props.open && (
        <div className="overflow-none modal-padding fixed left-0 top-0 z-50 flex h-screen w-screen bg-slate-800 bg-opacity-80 backdrop-blur-sm">
          <div className="mx-auto flex max-h-[60vh] w-full max-w-3xl flex-col rounded-xl border border-slate-600 bg-slate-800 shadow">
            <header className="flex p-4 text-xl">
              <span className="flex-1">Choose breed</span>
              <button
                onClick={() => props.setOpen(false)}
                className="rounded-md bg-slate-600 p-2 text-xs font-bold uppercase"
              >
                Close
              </button>
            </header>
            <div className="mx-4 mb-4 block h-full overflow-x-scroll">
              {props.children}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
