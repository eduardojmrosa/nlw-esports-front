import "./styles/main.css";
import { GameController, MagnifyingGlassPlus } from "phosphor-react";
import { GameBanner } from "./components/GameBanner";
import * as Dialog from "@radix-ui/react-dialog";
import logoImg from "./assets/logo-nlw-esports.svg";
import { CreateAdBanner } from "./components/CreateAddBanner";
import { useEffect, useState } from "react";
import { Input } from "./components/Form/Input";

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
    fetch("http://localhost:5000/games")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setGames(data);
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
        <CreateAdBanner />
        <Dialog.Portal>
          <Dialog.Overlay className="bg-black/60 inset-0 fixed">
            <Dialog.Content className="fixed bg-[#2a2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black">
              <Dialog.Title className="font-3xl font-black ">
                Publique um anúncio
              </Dialog.Title>
              <form className="mt-8 flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label htmlFor="game" className="font-semibold">
                    Qual o game?
                  </label>
                  <Input
                    id="game"
                    placeholder="Selecione o game que deseja jogar"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="name">Seu nome ou nickname</label>
                  <Input
                    id="name"
                    placeholder="Como te chamam dentro do game?"
                  ></Input>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="flex flex-col gap-1 ">
                    {" "}
                    <label htmlFor="yearsPlaying">Joga a quantos anos?</label>
                    <Input
                      id="yearsPlaying"
                      type="number"
                      placeholder="Tudo bem ser ZERO"
                    ></Input>
                  </div>
                  <div className="flex flex-col gap-1">
                    {" "}
                    <label htmlFor="discord">Qual seu discord?</label>
                    <Input
                      id="discord"
                      type="text"
                      placeholder="Usuário#0000"
                    ></Input>
                  </div>
                </div>
                <div className=" flex gap-6">
                  <div className=" flex flex-col gap-2">
                    <label htmlFor="weekDays">Quando costuma jogar?</label>
                    <div className="grid grid-cols-4 gap-2">
                      <button
                        className="w-8 h-8 rounded bg-zinc-900"
                        title="Segunda"
                      >
                        S
                      </button>
                      <button
                        className="w-8 h-8 rounded bg-zinc-900"
                        title="Terça"
                      >
                        T
                      </button>
                      <button
                        className="w-8 h-8 rounded bg-zinc-900"
                        title="Quarta"
                      >
                        Q
                      </button>
                      <button
                        className="w-8 h-8 rounded bg-zinc-900"
                        title="Quinta"
                      >
                        Q
                      </button>
                      <button
                        className="w-8 h-8 rounded bg-zinc-900"
                        title="Sexta"
                      >
                        S
                      </button>
                      <button
                        className="w-8 h-8 rounded bg-zinc-900"
                        title="Sábado"
                      >
                        S
                      </button>
                      <button
                        className="w-8 h-8 rounded bg-zinc-900"
                        title="Domingo"
                      >
                        D
                      </button>
                    </div>
                  </div>
                  <div className=" flex flex-col gap-2 flex-1">
                    <label htmlFor="hourStart">Qual horário do dia</label>
                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        id="hourStart"
                        type="time"
                        placeholder="De"
                      ></Input>
                      <Input id="hourEnd" type="time" placeholder="Até"></Input>
                    </div>
                  </div>
                </div>
                <div className="mt-2 flex gap-2 text-sm">
                  <label>Costume me conectar ao chat de voz</label>
                  <Input type="checkbox"></Input>
                </div>
                <footer className="mt-4 flex justify-end gap-4">
                  <Dialog.Close>
                    <button className="bg-zinc-500 px-5 h-12 hover:bg-zinc-600 rounded-md font-semibold">
                      Cancelar
                    </button>
                  </Dialog.Close>
                  <button
                    className="bg-violet-500 px-5 h-12 rounded-md hover:bg-violet-600 font-semibold flex gap-3 items-center"
                    type="submit"
                  >
                    <GameController size={24} />
                    Encontrar Duo
                  </button>
                </footer>
              </form>
            </Dialog.Content>
          </Dialog.Overlay>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}

export default App;
