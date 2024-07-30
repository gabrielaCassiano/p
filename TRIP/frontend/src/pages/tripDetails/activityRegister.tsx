import { Plus } from "lucide-react";
import { Button } from "../../components/button";

interface ActivityRegisterProps {
  openCreateActivityModal: () => void;
}

export function ActivityRegister({
  openCreateActivityModal,
}: ActivityRegisterProps) {
  return (
    <>
      <h2 className="text-3xl font-semibold">Atividades</h2>
      <Button
        onClick={openCreateActivityModal}
        type="button"
        variant="primary"
        // className="bg-lime-300 text-lime-950 py-2 px-5 flex items-center gap-2 rounded-lg font-medium hover:bg-lime-200"
      >
        <Plus className="size-5" />
        Cadastrar Atividade
      </Button>
    </>
  );
}
