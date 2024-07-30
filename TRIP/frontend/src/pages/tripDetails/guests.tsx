import { CheckCircle, CircleDashed, UserCog } from "lucide-react";
import { Button } from "../../components/button";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";
interface Participant {
  id: string 
  email: string,
  name: string | null,
  is_confirmed: boolean,

}


export function Guests() {
  const {tripId} = useParams();
  const [participants, setParticipants] = useState<Participant[]>([])


  useEffect(() => {
  api.get(`/trips/${tripId}/participants`).then(reponse => setParticipants(reponse.data.participants))
  }, [tripId])

  return (
    <>
      <h2 className="font-semibold text-xl">Convidados</h2>
      <div className="space-y-5">
      {participants.map((guest) => {
        const nameToShow = guest.name || (guest.email.split('@')[0]);
        return (
          <div key={guest.id} className="flex items-center justify-between gap-4">
            <div className="space-y-1.5">
              <span className="block font-medium text-zinc-100">
                {nameToShow}
              </span>
              <span className="block text-xs text-zinc-400 truncate">
                  {guest.email}
              </span>
            </div>
            {guest.is_confirmed ? (
              <CheckCircle className="size-5 text-lime-300 shrink-0" />
              ) : (
              <CircleDashed className="size-5 text-zinc-400 shrink-0" />
            )}

          </div>
        )
      })}
      </div>
      <Button variant="secondary" size="full">
        <UserCog className="size 4" />
        Gerenciar convidados
      </Button>
    </>
  );
}
