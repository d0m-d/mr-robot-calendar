import { Link, MetaFunction } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Mr. Robot Episode Calendar" },
    { name: "description", content: "Mr. Robot Episode Calendar" },
  ];
};

export default function Index() {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 top-32 md:top-0 confirm-dialog">
      <div className="px-4 min-h-screen md:flex md:items-center md:justify-center">
        <div className="bg-black text-white rounded-lg md:max-w-fit md:mx-auto p-4 inset-x-0 md:bottom-0 z-50 mb-4 md:relative shadow-lg border-4 border-red-500 text-center">
          <div className="mt-4 flex justify-center">
            {" "}
            <img src="/riskaheadposter2.jpg" className="rounded-md" />
          </div>

          <h1 className="text-4xl mt-4 font-semibold">CAUTION!</h1>

          <div className="text-xl font-medium p-2">
            This website is full of spoilers. Please only proceed if you have
            watched the ENTIRE series!
          </div>
          <div className="flex justify-center mt-2">
            <Link to="/calendar">
              <button
                className={
                  "p-2 text-xl border-2 rounded-md font-medium border-red-500 text-red-500 bg-black"
                }
              >
                Enter Site
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
