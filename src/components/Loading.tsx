export const Loading = () => {
  return (
    <div className="fixed bottom-4 flex h-6 w-6 items-center justify-center rounded-2xl bg-white">
      <span className="animate-spin font-bold text-gray-700 after:content-['.']"></span>
    </div>
  );
};
