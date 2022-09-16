import { Check, GameController } from "phosphor-react";
import * as Dialog from "@radix-ui/react-dialog";
import * as CheckBox from "@radix-ui/react-checkbox";
import * as Select from "@radix-ui/react-select";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@radix-ui/react-icons";
import { Input } from "./Form/Input";
import { WeekButtons } from "./WeekButtons";
import { useEffect, useState, FormEvent } from "react";
import axios from "axios";

export function CreateAdModal() {
  interface Game {
    id: string;
    title: string;
    bannerUrl: string;
    _count: {
      ads: number;
    };
  }
  const [games, setGames] = useState<Game[]>([]);
  const [weekDays, setWeekDays] = useState<string[]>([]);
  const [useVoiceChannel, setu] = useState(false);
  useEffect(() => {
    axios("http://localhost:5000/games").then((response) => {
      setGames(response.data);
    });
  }, []);
  async function handleCreateAd(event: FormEvent) {
    event.preventDefault();
    console.log("enviou o form");
    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData);
    if (!data.name) {
      return;
    }
    try {
      await axios.post(`http://localhost:5000/games/${data.game}/ads`, {
        name: data.name,
        yearsPlaying: Number(data.yearsPlaying),
        discord: data.discord,
        weekDays: weekDays.map((weekDay) => +weekDay),
        hourStart: data.hourStart,
        hourEnd: data.hourEnd,
        useVoiceChannel: useVoiceChannel,
      });

      alert("Anúncio criado com sucesso");
    } catch (err) {
      console.log(err);
      alert("Erro ao criar anúncio");
    }
  }
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-black/60 inset-0 fixed">
        <Dialog.Content className="fixed bg-[#2a2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black">
          <Dialog.Title className="font-3xl font-black ">
            Publique um anúncio
          </Dialog.Title>
          <form onSubmit={handleCreateAd} className="mt-8 flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="game" className="font-semibold">
                Qual o game?
              </label>
              <select
                name="game"
                id="game"
                placeholder="Selecione o game que deseja jogar"
                className="bg-zinc-900 px-4 py-3 rounded text-sm placeholder:text-zinc-500"
                defaultValue=""
              >
                <option disabled value="">
                  Selecione o game que deseja jogar
                </option>
                {games.map((game) => {
                  return <option value={game.id}>{game.title}</option>;
                })}
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="name">Seu nome ou nickname</label>
              <Input
                name="name"
                id="name"
                placeholder="Como te chamam dentro do game?"
              ></Input>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col gap-1 ">
                {" "}
                <label htmlFor="yearsPlaying">Joga a quantos anos?</label>
                <Input
                  name="yearsPlaying"
                  id="yearsPlaying"
                  type="number"
                  placeholder="Tudo bem ser ZERO"
                ></Input>
              </div>
              <div className="flex flex-col gap-1">
                {" "}
                <label htmlFor="discord">Qual seu discord?</label>
                <Input
                  name="discord"
                  id="discord"
                  type="text"
                  placeholder="Usuário#0000"
                ></Input>
              </div>
            </div>
            <div className=" flex gap-6">
              <div className=" flex flex-col gap-2">
                <label htmlFor="weekDays">Quando costuma jogar?</label>
                <ToggleGroup.Root
                  type="multiple"
                  className="grid grid-cols-4 gap-2"
                  onValueChange={setWeekDays}
                >
                  <ToggleGroup.Item
                    value="0"
                    className={`w-8 h-8 rounded bg-zinc-900 ${
                      weekDays.includes("0") ? `bg-violet-500` : ""
                    }`}
                    title="Segunda"
                  >
                    S
                  </ToggleGroup.Item>
                  <ToggleGroup.Item
                    className={`w-8 h-8 rounded bg-zinc-900 ${
                      weekDays.includes("1") ? `bg-violet-500` : ""
                    }`}
                    title="Terça"
                    value="1"
                  >
                    T
                  </ToggleGroup.Item>
                  <ToggleGroup.Item
                    className={`w-8 h-8 rounded bg-zinc-900 ${
                      weekDays.includes("2") ? `bg-violet-500` : ""
                    }`}
                    title="Quarta"
                    value="2"
                  >
                    Q
                  </ToggleGroup.Item>
                  <ToggleGroup.Item
                    className={`w-8 h-8 rounded bg-zinc-900 ${
                      weekDays.includes("3") ? `bg-violet-500` : ""
                    }`}
                    title="Quinta"
                    value="3"
                  >
                    Q
                  </ToggleGroup.Item>
                  <ToggleGroup.Item
                    className={`w-8 h-8 rounded bg-zinc-900 ${
                      weekDays.includes("4") ? `bg-violet-500` : ""
                    }`}
                    title="Sexta"
                    value="4"
                  >
                    S
                  </ToggleGroup.Item>
                  <ToggleGroup.Item
                    className={`w-8 h-8 rounded bg-zinc-900 ${
                      weekDays.includes("5") ? `bg-violet-500` : ""
                    }`}
                    title="Sábado"
                    value="5"
                  >
                    S
                  </ToggleGroup.Item>
                  <ToggleGroup.Item
                    className={`w-8 h-8 rounded bg-zinc-900 ${
                      weekDays.includes("6") ? `bg-violet-500` : ""
                    }`}
                    title="Domingo"
                    value="6"
                  >
                    D
                  </ToggleGroup.Item>
                </ToggleGroup.Root>
              </div>
              <div className=" flex flex-col gap-2 flex-1">
                <label htmlFor="hourStart">Qual horário do dia</label>
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    name="hourStart"
                    id="hourStart"
                    type="time"
                    placeholder="De"
                  ></Input>
                  <Input
                    name="hourEnd"
                    id="hourEnd"
                    type="time"
                    placeholder="Até"
                  ></Input>
                </div>
              </div>
            </div>
            <div className="mt-2 flex gap-2 items-center text-sm">
              <label>Costume me conectar ao chat de voz</label>
              <CheckBox.Root
                checked={useVoiceChannel}
                onCheckedChange={(checked) => {
                  if (checked === true) {
                    setUseVoiceChannel(true);
                  } else {
                    setUseVoiceChannel(false);
                  }
                }}
                className="w-6 h-6 p-1 rounded bg-zinc-900"
              >
                <CheckBox.Indicator>
                  <Check className="w-4 h-4 text-emerald-400"></Check>
                </CheckBox.Indicator>
              </CheckBox.Root>
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
  );
}
