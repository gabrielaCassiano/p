import { X, AtSign, Plus } from "lucide-react";
import type { FormEvent } from "react";
import { Button } from "../../components/button";

interface InviteGuestsModalProps {
  closeGuestsModal: () => void;
  removeEmailsToInvite: (email: string) => void;
  emailsToInvite: string[];
  addEmailsToInvite: (event: FormEvent<HTMLFormElement>) => void;
}

export function InviteGuestsModal({
  addEmailsToInvite,
  closeGuestsModal,
  emailsToInvite,
  removeEmailsToInvite,
}: InviteGuestsModalProps) {
  return (
    <div className="fixed inset-0 bg-zinc-950/80 flex items-center justify-center">
      <div className="w-[640px]  rounded-xl px-6 py-5 bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Selecionar Convidados</h2>
            <button
              onClick={closeGuestsModal}
              type="button"
              className="size-5 text-zinc-400"
            >
              <X />
            </button>
          </div>
          <p className="text-sm text-zinc-400 text-left">
            Os convidados irão receber e-mails para confirmar a participação na
            viagem.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {emailsToInvite.map((email) => {
            return (
              <div
                key={email}
                className="py-1.5 px-2.5 rounded-md bg-zinc-800 flex items-center gap-2"
              >
                <span className="text-zinc-400">{email}</span>
                <button className="size-4 text-zinc-400 flex items-center">
                  <X
                    onClick={() => {
                      removeEmailsToInvite(email);
                    }}
                  />
                </button>
              </div>
            );
          })}
        </div>
        <div className="w-full h-px bg-zinc-800" />

        <form
          onSubmit={addEmailsToInvite}
          className="py-2.5 px-4 bg-zinc-950 border-zinc-800 rounded-lg flex items-center gap-2.5"
        >
          <AtSign className="text-zinc-400 size-5" />
          <input
            type="email"
            name="email"
            placeholder="Digite o e-mail do convidado?"
            className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
          />
          <Button
            type="submit"
            variant="primary"
          >
            Convidar
            <Plus className="size-5" />
          </Button>
        </form>
      </div>
    </div>
  );
}
