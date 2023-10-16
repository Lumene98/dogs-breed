const Chip = (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className="whitespace-nowrap rounded-xl border border-slate-600 px-3 py-1 text-lg font-medium capitalize text-slate-200 aria-selected:border-0 aria-selected:bg-indigo-800"
      {...props}
    />
  );
};

export default Chip;
