import { CircleCheck } from "lucide-react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface Activities {
  id: string;
  date: string;
  activities: {
    id: string;
    title: string;
    occurs_at: string;
  }[];
}

export function Activities() {
  const { tripId } = useParams();
  const [activities, setActivities] = useState<Activities[]>([]);

  useEffect(() => {
    api
      .get(`/trips/${tripId}/activities`)
      .then((reponse) => setActivities(reponse.data.activities));
  }, [tripId]);


  return (
    <>
      <div className="space-y-2.5">
        {activities.map((dayAndWeek) => {
          return (
            <div key={dayAndWeek.date} className="space-y-2.5">
              <div className="flex gap-2 items-baseline font-semibold">
                    <span className="text-xl text-zinc-300">
                    Dia {format(dayAndWeek.date, "d")}
                    </span>
                    <span className="text-xs text-zinc-500">
                    {format(dayAndWeek.date, "EEEE", { locale: ptBR })}
                    </span>
                </div>
                {dayAndWeek.activities.length > 0 ? (
                  <div>
                    {dayAndWeek.activities.map((activity) => {
                      return (
                        <div key={activity.id} className="space-y-2.5">
                          <div className="px-4 py-2.5 bg-zinc-900 rounded-xl flex items-center gap-3">
                            <CircleCheck className="size-5 text-lime-300" />
                            <span className="text-zinc-100">
                              {activity.title}
                            </span>
                            <span className="text-zinc-400 text-sm ml-auto">
                              {format(activity.occurs_at, "HH:mm")}h
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-zinc-500 text-sm">
                    Nenhuma atividade cadastrada nessa data.
                  </p>
                )}
              </div>
          );
        })}
      </div>
    </>
  );
}