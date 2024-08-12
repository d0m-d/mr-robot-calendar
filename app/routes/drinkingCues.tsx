import { Link, useLoaderData } from "@remix-run/react";
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
      <button className=" m-4 p-2 border-2 rounded-md border-red-500 text-red-500 text-xl font-medium bg-gradient-to-r from-cyan-100 to-white">
        <Link to="/">Back to Calendar</Link>
      </button>
      <div className="flex justify-center">
        <div className="bg-gray-100/85 w-11/12 lg:w-3/4 border-4 border-red-500 rounded-md mt-8 p-4">
          <h1 className="text-4xl font-semibold mb-8 text-center">
            Mr. Robot Drinking Cues
          </h1>
          <div className="mx-4 lg:flex lg:justify-between">
            <div className="mt-8 lg:mt-0">
              <h2 className="text-xl font-medium mb-4">Word cues</h2>

              {wordCues.map((cue) => (
                <p className="mt-2">• "{cue.cue}"</p>
              ))}
            </div>
            <div className="mt-8 lg:mt-0">
              <h2 className="text-xl font-medium mb-4">Action cues</h2>
              {actionCues.map((cue) => (
                <p className="mt-2">• {cue.cue}</p>
              ))}
            </div>
            <div className="mt-8 lg:mt-0">
              <h2 className="text-xl font-medium mb-4">Character cues</h2>

              {characterCues.map((cue) => (
                <p className="mt-2">• {cue.cue}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
