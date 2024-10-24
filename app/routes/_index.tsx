import { Link, MetaFunction, useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { ScreeningQuestionType } from "~/helpers/types";
import { db } from "~/utils/db.server";

export const meta: MetaFunction = () => {
  return [
    { title: "Mr. Robot Episode Calendar" },
    { name: "description", content: "Mr. Robot Episode Calendar" },
  ];
};

export const loader = async () => {
  const data = await db.screeningQuestions.findMany();
  return data;
};
type LoaderType = Awaited<ReturnType<typeof loader>>;

export default function Index() {
  const data = useLoaderData<LoaderType>();
  let correctAnswers = 0;
  const [enterSiteEnabled, setEnterSiteEnabled] = useState(false);

  const enableButton = () => {
    if (correctAnswers === data.length) setEnterSiteEnabled(true);
  };
  const checkAnswer = (
    question: ScreeningQuestionType,
    answerInput: string
  ) => {
    if (
      answerInput
        .toLowerCase()
        .replace(/[^a-zA-Z ]/g, "")
        .trim() === question.answer.toLowerCase()
    ) {
      correctAnswers++;
      return <p className="ml-2 mt-2 font-bold text-green-500">✓</p>;
    } else return <p className="ml-2 mt-2 text-red-500">x</p>;
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 confirm-dialog top-32 md:top-0">
      <div className="px-4 min-h-screen md:flex md:items-center md:justify-center">
        <div className="bg-black text-white rounded-lg md:max-w-fit md:mx-auto p-4 lg:p-8 fixed inset-x-0 md:bottom-0 z-50 mb-4 mx-4 md:relative shadow-lg border-4 border-red-500">
          {/* <h1 className="text-center text-3xl font-medium mb-2">
            Hello, friend
          </h1> */}
          <h1 className="text-center text-2xl mb-4">
            To view this site, please answer the following questions:
          </h1>
          {data.map((question) => {
            const [answerValue, setAnswerValue] = useState("");
            return (
              <div className="flex justify-center" key={question.id}>
                <div className="flex-col">
                  <p className="text-xl mt-2 text-center">
                    {question.question}
                  </p>
                  <div className="flex justify-center">
                    <input
                      placeholder="enter answer here"
                      className="p-2 my-2 border-2 border-red-500 rounded-md text-center bg-black"
                      value={answerValue}
                      onChange={(e) => setAnswerValue(e.target.value)}
                      onBlur={enableButton}
                    />
                    {answerValue !== "" && checkAnswer(question, answerValue)}
                  </div>
                </div>
              </div>
            );
          })}
          <div className="flex justify-center mt-8">
            <Link to="/calendar">
              <button
                disabled={!enterSiteEnabled}
                className={`p-2 text-xl border-2 rounded-md font-medium ${
                  enterSiteEnabled
                    ? "border-red-500 text-red-500 bg-black"
                    : "text-gray-500 border-gray-500"
                }`}
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
