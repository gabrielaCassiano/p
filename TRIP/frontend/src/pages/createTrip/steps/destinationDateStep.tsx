import { MapPin, Calendar, ArrowRight, Settings2, X } from "lucide-react";
import { Button } from "../../../components/button";
import { useState } from "react";
import { DateRange, DayPicker } from "react-day-picker";
import { format } from "date-fns";
import "react-day-picker/style.css";

interface DestinationDateStep {
  isGuestsInputOpen: boolean;
  closeGuestsInput: () => void;
  openGuestsInput: () => void;
  setDestination: (destination: string) => void;
  setEventStartAndEnd: (dates: DateRange | undefined) => void;
  eventStartAndEnd: DateRange | undefined;
}

export function DestinationDateStep({
  closeGuestsInput,
  isGuestsInputOpen,
  openGuestsInput,
  setDestination,
  setEventStartAndEnd,
  eventStartAndEnd,
}: DestinationDateStep) {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const displayedDate =
    eventStartAndEnd && eventStartAndEnd.from && eventStartAndEnd.to
      ? format(eventStartAndEnd.from, "d' de 'LLL")
          .concat(" até ")
          .concat(format(eventStartAndEnd.to, "d' de 'LLL"))
      : null;

  function openDatePicker() {
    setIsDatePickerOpen(true);
  }
  function closeDatePicker() {
    setIsDatePickerOpen(false);
  }
  return (
    <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center gap-4 justify-between">
      <div className="flex items-center gap-2 flex-1 ">
        <MapPin className="size-5 text-zinc-400 flex-shrink-0" />
        <input
          disabled={isGuestsInputOpen}
          type="text"
          placeholder="Para onde voce vai?"
          className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
          onChange={(event) => setDestination(event.target.value)}
        />
      </div>

      <button
        onClick={openDatePicker}
        disabled={isGuestsInputOpen}
        className="flex items-center gap-2 text-left"
      >
        <Calendar className="size-5 text-zinc-400" />
        <span className="bg-transparent text-lg text-zinc-400 outline-none">
          {displayedDate || "Quando?"}
        </span>
      </button>

      {isDatePickerOpen && (
        <div className="fixed inset-0 bg-zinc-950/80 flex items-center justify-center">
          <div className="  rounded-xl px-6 py-5 bg-zinc-900 space-y-5">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Selecione a data</h2>
                <button
                  onClick={closeDatePicker}
                  type="button"
                  className="size-5 text-zinc-400"
                >
                  <X />
                </button>
              </div>
            </div>
            <DayPicker
              mode="range"
              selected={eventStartAndEnd}
              onSelect={setEventStartAndEnd}
            />
          </div>
        </div>
      )}

      <div className="w-px h-6 bg-zinc-800" />

      {isGuestsInputOpen ? (
        <Button onClick={closeGuestsInput} variant="secondary">
          Alterar local/data
          <Settings2 className="size-5" />
        </Button>
      ) : (
        <Button onClick={openGuestsInput} variant="primary">
          Continuar
          <ArrowRight className="size-5" />
        </Button>
      )}
    </div>
  );
}
