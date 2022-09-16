import "./styles/main.css";
import { GameBanner } from "./components/GameBanner";
import * as Dialog from "@radix-ui/react-dialog";
import logoImg from "./assets/logo-nlw-esports.svg";
import { CreateAdBanner } from "./components/CreateAddBanner";
import { useEffect, useState } from "react";
import { CreateAdModal } from "./components/CreateAdModal";
import axios from "axios";

interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  };
}

function App() {
  const [games, setGames] = useState<Game[]>([]);
  useEffect(() => {
    axios("http://localhost:5000/games").then((response) => {
      setGames(response.data);
    });
  }, []);
  return (
    <div className="max-w-[1000px] mx-auto flex flex-col items-center m-20 ">
      <img src={logoImg}></img>
      <h1 className="text-6xl text-white font-black m-20">
        Seu {""}
        <span className=" text-transparent bg-nlw-gradient bg-clip-text ">
          duo
        </span>
        {""} está aqui.
      </h1>

      <div className="grid grid-cols-6 gap-6">
        {games.map((game) => {
          return (
            <GameBanner
              key={game.id}
              bannerUrl={game.bannerUrl}
              title={game.title}
              adsCount={game._count.ads}
            />
          );
        })}
      </div>
      <Dialog.Root>
        <CreateAdModal />
        <CreateAdBanner />
      </Dialog.Root>
    </div>
  );
}

export default App;
