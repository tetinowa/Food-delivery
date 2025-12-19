import { Header } from "./_components/header";

export default function Home() {
  return (
    <div>
      <Header />
      <div className="bg-[#404040] w-full h-1000 flex flex-col gap-[88px] items-center">
        <img src="/misc/Container.png"></img>
        <div className="w-[1264px] flex flex-col  gap-[54px]">
          <div>
            <h1 className="font-semibold text-[30px] leading-[36px] text-white">
              Appetisers
            </h1>
          </div>
          <div className="grid grid-cols-3">
            <div className="rounded-[20px] p-4 gap-5 bg-white flex flex-col">
              <div className=""></div>
              <img
                src="placeholderfood.png"
                className="w-[365.3px] h-[210px]"
              ></img>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
