export function Logo() {
  return (
    <div className="flex gap-3 justify-center items-center">
      <img src="/misc/logo.svg" alt="logo" className="w-11.5 h-[37.29px]" />
      <div>
        <div className="flex">
          <h1 className="text-white text-[20px] font-semibold leading-7">
            Nom
          </h1>
          <h1 className="text-[#EF4444] text-[20px] font-semibold leading-7">
            Nom
          </h1>
        </div>
        <h1 className="text-white text-[12px] font-normal leading-4">
          Swift delivery
        </h1>
      </div>
    </div>
  );
}
