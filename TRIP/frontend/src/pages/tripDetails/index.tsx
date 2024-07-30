import { useState } from "react";
import { CreateActivityModal } from "./createActivityModal";
import { ImportantLinks } from "./importantLinks";
import { Guests } from "./guests";
import { Activities } from "./activities";
import { DestinationHeader } from "./destinationHeader";
import { ActivityRegister } from "./activityRegister";

export function TripDetails() {
  const [isCreateActivityModalOpen, setIsCreateActivityModalOpen] =
    useState(false);

  function openCreateActivityModal() {
    setIsCreateActivityModalOpen(true);
  }
  function closeCreateActivityModal() {
    setIsCreateActivityModalOpen(false);
  }

  return (
    <div className="max-w-6xl px-40 py-10 mx-auto space-y-8">
      <div className="px-4 h-16 bg-zinc-900 rounded-xl flex items-center justify-between ">
        <DestinationHeader />
      </div>

      <main className="flex gap-16 px-">
        <div className="flex-1 space-y-6">
          <div className="flex items-center justify-between ">
            <ActivityRegister 
              openCreateActivityModal={openCreateActivityModal}
            />
          </div>
          <div className="space-y-8">
              <Activities />
          </div>
        </div>
        <div className="w-80 space-y-6">
          <div className="space-y-6">
            <ImportantLinks />
          </div>
          <div className="space-y-6">
            <Guests />
          </div>
          <div className="w-full h-px bg-zinc-800" />
          <div></div>
          
        </div>
      </main>
      {isCreateActivityModalOpen && (
        <CreateActivityModal 
        closeCreateActivityModal={closeCreateActivityModal}
        />
      )}
    </div>
  );
}
