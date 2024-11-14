import { Link } from "@remix-run/react";

export default function Contact() {
  return (
    <div className="flex justify-center">
      <div className="bg-black/90 text-white w-11/12 lg:w-2/3 border-2 border-red-500 rounded-md lg:mt-8 p-4 lg:pb-8">
        <h1 className="lg:text-4xl text-3xl font-semibold text-center mb-8">
          Contact
        </h1>
        <p className="text-center mb-2 text-lg">
          This site was independently developed by a single megafan. If you have
          any issues to report, feedback, or questions, feel free to reach out
          to me and I'll address them as soon as I can.
        </p>
        <p className="text-center text-lg">
          <span className="mr-2">email:</span>
          <span className="font-semibold text-red-300">
            mrrobotcalendar@gmail.com
          </span>
        </p>
        <p className="text-center mt-8 text-lg font-medium">
          enjoying this site? consider{" "}
          <Link
            to="http://venmo.com/domida222"
            className="text-red-300 font-semibold"
          >
            donating
          </Link>
        </p>
        <p className="text-center mt-2">
          This project is a labor of love, but any amount you wish to contribute
          is deeply appreciated.
        </p>
      </div>
    </div>
  );
}
