const Loading = () => {
  return (
    <div className="fixed left-1/2 top-4 flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-600">
      <span className="animate-spin font-bold text-white after:content-['.']"></span>
    </div>
  );
};

export default Loading;
