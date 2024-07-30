import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { InviteGuestsModal } from "./inviteGuestsModal";
import { ConfirmTripModal } from "./confirmTripModal";
import { DestinationDateStep } from "./steps/destinationDateStep";
import { InviteGuestStep } from "./steps/inviteGuestStep";
import { DateRange } from "react-day-picker";
import { api } from "../../lib/axios";

export function CreateTrip() {
  const navigate = useNavigate();
  const [isGuestsInputOpen, setIsGuestsInputOpen] = useState(false);
  const [isGuestsModalOpen, setIsGuestsModalOpen] = useState(false);
  const [emailsToInvite, setEmailsToInvite] = useState<string[]>([]);
  const [isConfirmTripModal, setIsConfirmTripModal] = useState(false);

  const [destination, setDestination] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [ownerEmail, setOwnerEmail] = useState("");
  const [eventStartAndEnd, setEventStartAndEnd] = useState<
    DateRange | undefined
  >();

  function openGuestsInput() {
    setIsGuestsInputOpen(true);
  }
  function closeGuestsInput() {
    setIsGuestsInputOpen(false);
  }
  function openGuestsModal() {
    setIsGuestsModalOpen(true);
  }
  function closeGuestsModal() {
    setIsGuestsModalOpen(false);
  }
  function addEmailsToInvite(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email")?.toString();

    if (!email) {
      return;
    }
    if (emailsToInvite.includes(email)) {
      return;
    }
    setEmailsToInvite([...emailsToInvite, email]);

    event.currentTarget.reset();
  }
  function removeEmailsToInvite(emailToRemove: string) {
    const newEmailList = emailsToInvite.filter(
      (email) => email != emailToRemove
    );
    setEmailsToInvite(newEmailList);
  }
  function openConfirmTripModal() {
    setIsConfirmTripModal(true);
  }
  function closeConfirmTripModal() {
    setIsConfirmTripModal(false);
  }
  async function createTrip(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (
      !eventStartAndEnd?.from ||
      !eventStartAndEnd?.to ||
      !destination ||
      !ownerName ||
      !ownerEmail ||
      emailsToInvite.length == 0
    ) {
      return;
    }

    const response = await api.post('/trips', {
      destination,
      starts_at: eventStartAndEnd.from,
      ends_at: eventStartAndEnd.to,
      emails_to_invite: emailsToInvite,
      owner_name: ownerName,
      owner_email: ownerEmail,
    });

    const { tripId } = response.data

    navigate(`/trips/${tripId}`);
  }

  return (
    <div className="h-screen flex items-center justify-center bg-bgSquare bg-no-repeat bg-center">
      <div className="max-w-3xl w-full px-6 text-center space-y-10">
        <div className="flex flex-col gap-5 items-center">
          <img className="w-45 h-12" src="/logo.svg" alt="plann.er" />
          <p className="text-zinc-300 text-lg">
            Convide seus amigos e planeje sua próxima viagem!
          </p>
        </div>
        <div className="space-y-4">
          <DestinationDateStep
            closeGuestsInput={closeGuestsInput}
            isGuestsInputOpen={isGuestsInputOpen}
            openGuestsInput={openGuestsInput}
            setDestination={setDestination}
            eventStartAndEnd={eventStartAndEnd}
            setEventStartAndEnd={setEventStartAndEnd}
          />

          {isGuestsInputOpen && (
            <InviteGuestStep
              emailsToInvite={emailsToInvite}
              openConfirmTripModal={openConfirmTripModal}
              openGuestsModal={openGuestsModal}
            />
          )}
        </div>
        <p className="text-sm text-zinc-500">
          Ao planejar sua viagem pela plann.er você automaticamente concorda com
          nossos{" "}
          <a className="text-zinc-300 underline" href="#">
            termos de uso
          </a>{" "}
          e{" "}
          <a className="text-zinc-300 underline" href="#">
            políticas de privacidade
          </a>
          .
        </p>
        {isGuestsModalOpen && (
          <InviteGuestsModal
            emailsToInvite={emailsToInvite}
            addEmailsToInvite={addEmailsToInvite}
            closeGuestsModal={closeGuestsModal}
            removeEmailsToInvite={removeEmailsToInvite}
          />
        )}
        {isConfirmTripModal && (
          <ConfirmTripModal
            closeConfirmTripModal={closeConfirmTripModal}
            createTrip={createTrip}
            setOwnerName={setOwnerName}
            setOwnerEmail={setOwnerEmail}
          />
        )}
      </div>
    </div>
  );
}
