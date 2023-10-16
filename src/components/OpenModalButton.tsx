interface IOpenModalButtonProps {
  onClick: () => void;
}

const OpenModalButton = (props: IOpenModalButtonProps) => {
  return (
    <button
      className="filter-button fixed bottom-5 mx-2 rounded-xl bg-indigo-500 py-4 font-semibold hover:bg-indigo-400"
      onClick={props.onClick}
    >
      Filter
    </button>
  );
};

export default OpenModalButton;
