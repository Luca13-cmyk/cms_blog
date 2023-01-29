export const ShimmerPostWidget = () => {
  return (
    <>
      {Array.from(Array(4).keys()).map((n: number, i: number) => {
        return (
          <div key={n + i} className="flex items-center w-full mb-4">
            <div className="w-16 flex-none">
              <div className="relative w-[60px] h-[60px] bg-gray-200 animate-pulse"></div>
            </div>
            <div className="flex-grow ml-4">
              <p className="text-gray-500 font-xs"></p>
              <div className="w-full h-5 bg-gray-200 animate-pulse"></div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export const ShimmerFeaturedPosts = () => {
  return (
    <>
      {Array.from(Array(5).keys()).map((n: number, i: number) => {
        return (
          <div
            key={n + i}
            className="relative h-[50px] bg-slate-600 animate-pulse"
          ></div>
        );
      })}
    </>
  );
};
