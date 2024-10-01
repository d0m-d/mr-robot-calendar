import { useLoaderData } from "@remix-run/react";
import { db } from "~/utils/db.server";

export const loader = async () => {
  const data = await db.drinkingCue.findMany();
  return data;
};
type LoaderType = Awaited<ReturnType<typeof loader>>;

export default function DrinkingCues() {
  const data = useLoaderData<LoaderType>();
  const wordCues = data.filter((cue) => cue.type === "word");
  const characterCues = data.filter((cue) => cue.type === "character");
  const actionCues = data.filter((cue) => cue.type === "action");
  return (
    <div>
      <div className="flex justify-center mb-8">
        <div className="bg-gray-100/95 w-11/12 lg:w-3/4 border-2 border-red-500 rounded-md lg:mt-8 p-4 lg:pb-8">
          <h1 className="lg:text-4xl text-3xl font-semibold text-center mb-2">
            Drinking Game Cues
          </h1>
          <div className="mx-4 lg:flex lg:justify-between">
            <div className="mt-8 lg:mt-0">
              <h2 className="text-xl font-semibold mb-4">Word cues</h2>

              {wordCues.map((cue) => (
                <p className="mt-2 text-lg" key={cue.id}>
                  • "{cue.cue}"
                </p>
              ))}
            </div>
            <div className="mt-8 lg:mt-0">
              <h2 className="text-xl font-semibold mb-4">Character cues</h2>

              {characterCues.map((cue) => (
                <p className="mt-2 text-lg" key={cue.id}>
                  • {cue.cue}
                </p>
              ))}
            </div>
            <div className="mt-8 lg:mt-0">
              <h2 className="text-xl font-semibold mb-4">Action cues</h2>
              {actionCues.map((cue) => (
                <p className="mt-2 text-lg" key={cue.id}>
                  • {cue.cue}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
