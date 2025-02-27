import { MetaFunction } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Mr. Robot Filming Locations" },
    { name: "description", content: "Mr. Robot Filming Locations" },
  ];
};

export default function Map() {
  return (
    <div>
      <div className="flex justify-center mb-8">
        <div className="font-sans p-4 bg-black/90 text-white border-2 border-red-500 w-11/12 mt-4 lg:w-3/4 lg:mt-16 pb-16 rounded-md">
          <h1 className="text-3xl lg:text-4xl text-center mb-4 lg:mb-8 font-semibold">
            Filming Locations
          </h1>
          <div className="flex justify-center">
            <iframe
              src="https://www.google.com/maps/d/u/1/embed?mid=1ogjtSuTAjTzENa0qLZlFbSMvvDVZ3qw&ehbc=2E312F"
              width="1200"
              height="800"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
