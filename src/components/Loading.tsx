const Loading = () => {
  return (
    <div className="fixed bottom-4 flex h-6 w-6 items-center justify-center rounded-2xl bg-slate-400">
      <span className="animate-spin font-bold text-white after:content-['.']"></span>
    </div>
  );
};

export default Loading;
