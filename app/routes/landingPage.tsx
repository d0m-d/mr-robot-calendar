import { Link, useLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";
import { ScreeningQuestionType } from "~/helpers/types";
import { db } from "~/utils/db.server";

export const loader = async () => {
  const data = await db.screeningQuestions.findMany();
  return data;
};
type LoaderType = Awaited<ReturnType<typeof loader>>;

export default function LandingPage() {
  const data = useLoaderData<LoaderType>();
  let correctAnswers = 0;
  const [createAccountEnabled, setCreateAccountEnabled] = useState(false);

  const enableButton = () => {
    if (correctAnswers === data.length) setCreateAccountEnabled(true);
  };
  const checkAnswer = (
    question: ScreeningQuestionType,
    answerInput: string
  ) => {
    if (
      answerInput.toLowerCase().replace(/[^a-zA-Z ]/g, "") ===
      question.answer.toLowerCase()
    ) {
      correctAnswers++;
      return <p className="ml-2 mt-2 font-bold text-green-500">✓</p>;
    } else return <p className="ml-2 mt-2 text-red-500">x</p>;
  };
  return (
    <div>
      <div className="flex justify-center mb-8">
        <div className="font-sans p-4 bg-gray-100/85 border-2 border-red-500 w-11/12 mt-4 lg:w-3/4 lg:mt-16 pb-4 rounded-md">
          <h1 className="text-3xl lg:text-4xl text-center mb-4 font-medium">
            Hello, friend
          </h1>
          <h2 className="text-center text-2xl mb-4">
            To view this site, please answer the following questions:
          </h2>
          {data.map((question) => {
            const [answerValue, setAnswerValue] = useState("");
            return (
              <div className="flex justify-center" key={question.id}>
                <div className="flex-col">
                  <p className="text-xl mt-2">{question.question}</p>
                  <div className="flex justify-center">
                    <input
                      placeholder="enter answer here"
                      className="p-2 rounded-md"
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
            <button
              className={`p-2 text-xl border-2 rounded-md font-medium ${
                createAccountEnabled
                  ? "border-red-500 text-red-500 bg-gradient-to-r from-cyan-100"
                  : "text-gray-500 border-gray-500"
              }`}
              disabled={!createAccountEnabled}
            >
              <Link to="/register">Create Account</Link>
            </button>
          </div>
          <div className="text-center mt-4">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-red-500">
              Log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
