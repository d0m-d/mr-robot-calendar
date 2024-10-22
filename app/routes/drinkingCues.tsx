import { useLoaderData } from "@remix-run/react";
import { db } from "~/utils/db.server";

export const loader = async () => {
  const data = await db.drinkingCue.findMany();
  return data;
};
type LoaderType = Awaited<ReturnType<typeof loader>>;

export default function DrinkingCues() {
  const data = useLoaderData<LoaderType>();
  const wordCues = data
    .filter((cue) => cue.type === "word")
    .sort((a, b) => a.cue.localeCompare(b.cue));
  const characterCues = data
    .filter((cue) => cue.type === "character")
    .sort((a, b) => a.cue.localeCompare(b.cue));
  const actionCues = data
    .filter((cue) => cue.type === "action")
    .sort((a, b) => a.cue.localeCompare(b.cue));
  return (
    <div>
      <div className="flex justify-center mb-8">
        <div className="bg-gray-100/95 w-11/12 lg:w-3/4 border-2 border-red-500 rounded-md lg:mt-8 p-4 lg:pb-8">
          <h1 className="lg:text-4xl text-3xl font-semibold text-center mb-4">
            Drinking Game Cues
          </h1>
          <div className="mx-4 lg:flex lg:justify-between">
            <div className="mt-8 lg:mt-0 lg:w-1/3">
              <h2 className="text-xl font-semibold mb-4 underline">
                Word cues
              </h2>

              {wordCues.map((cue) => (
                <p className="mt-2 text-lg font-medium" key={cue.id}>
                  • "{cue.cue}"
                </p>
              ))}
            </div>
            <div className="mt-8 lg:mt-0 lg:w-1/3">
              <h2 className="text-xl font-semibold mb-4 underline">
                Character cues
              </h2>

              {characterCues.map((cue) => (
                <p className="mt-2 text-lg font-medium" key={cue.id}>
                  • {cue.cue}
                </p>
              ))}
            </div>
            <div className="mt-8 lg:mt-0 lg:w-1/3">
              <h2 className="text-xl font-semibold mb-4 underline">
                Action cues
              </h2>
              {actionCues.map((cue) => (
                <div key={cue.id}>
                  <p className="mt-2 text-lg font-medium">• {cue.cue}</p>
                  {cue.notes && (
                    <p className="ml-8 italic w-7/8 lg:w-3/4 text-sm text-cyan-900">
                      {cue.notes}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
