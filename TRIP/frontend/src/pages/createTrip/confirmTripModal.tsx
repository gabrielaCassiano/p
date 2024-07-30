import { X, User, Mail } from "lucide-react";
import { Button } from "../../components/button";
import { FormEvent } from "react";

interface ConfirmTripModalProps {
    closeConfirmTripModal: () => void;
    createTrip: (event: FormEvent<HTMLFormElement>) => void;
    setOwnerName: (ownerName: string) => void;
    setOwnerEmail: (ownerEamil: string) => void;
}


export function ConfirmTripModal({
    closeConfirmTripModal,
    createTrip,
    setOwnerName,
    setOwnerEmail,
}: ConfirmTripModalProps) {
    return (
        <div className="fixed inset-0 bg-zinc-950/80 flex items-center justify-center">
            <div className="w-[540px]  rounded-xl px-6 py-5 bg-zinc-900 space-y-5">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">
                    Confirmar criação da viagem
                  </h2>
                  <button
                    onClick={closeConfirmTripModal}
                    type="button"
                    className="size-5 text-zinc-400"
                  >
                    <X />
                  </button>
                </div>
                <p className="text-sm text-zinc-400 text-left">
                  Para concluir a criação da viagem para{" "}
                  <span className="text-zinc-100 font-bold">Florianópolis</span>
                  , Brasil nas datas de{" "}
                  <span className="text-zinc-100 font-bold">
                    16 a 27 de Agosto de 2024
                  </span>{" "}
                  preencha seus dados abaixo:
                </p>
              </div>
              <form className="space-y-2" onSubmit={createTrip}>
                <div className="py-2.5 px-4 bg-zinc-950 border-zinc-800 rounded-lg flex items-center gap-2.5">
                  <User className="text-zinc-400 size-5" />
                  <input
                    type="name"
                    placeholder="Seu nome completo"
                    className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
                    onChange={event => setOwnerName(event.target.value)}
                  />
                </div>
                <div className="py-2.5 px-4 bg-zinc-950 border-zinc-800 rounded-lg flex items-center gap-2.5">
                  <Mail className="text-zinc-400 size-5" />
                  <input
                    type="email"
                    placeholder="Seu e-mail pessoal"
                    className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
                    onChange={event => setOwnerEmail(event.target.value)}
                  />
                </div>
                <div className="pt-2"></div>
                <Button
                  type="submit"
                  variant="primary"
                  size="full"
                >
                  Confirmar criação da viagem
                </Button>
              </form>
            </div>
          </div>
    )
}