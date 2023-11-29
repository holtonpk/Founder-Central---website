"use client";
import React from "react";
import {Icons} from "../../components/icons";
import "./style.css";

type QuestionObject = {
  id: number;
  question: string;
  answer: string;
};
const FAQ = () => {
  const [expanded, setExpanded] = React.useState<number>(1);

  const questions: QuestionObject[] = [
    {
      id: 1,
      question: "Why choose founder central?",
      answer:
        "We are a team of experienced entrepreneurs who have built successful businesses in the past. We have also worked with 100s of businesses in the past 5 years. We understand the challenges of building a business and we are here to help you build a successful business.",
    },
    {
      id: 2,
      question: "How long does editing take?",
      answer:
        "We are a team of experienced entrepreneurs who have built successful businesses in the past. We have also worked with 100s of businesses in the past 5 years. We understand the challenges of building a business and we are here to help you build a successful business.",
    },
    {
      id: 3,
      question: "How can digital marketing help my business?",
      answer:
        "We are a team of experienced entrepreneurs who have built successful businesses in the past. We have also worked with 100s of businesses in the past 5 years. We understand the challenges of building a business and we are here to help you build a successful business.",
    },
    {
      id: 4,
      question: "What is a brand and what are the advantages of having one?",
      answer:
        "We are a team of experienced entrepreneurs who have built successful businesses in the past. We have also worked with 100s of businesses in the past 5 years. We understand the challenges of building a business and we are here to help you build a successful business.",
    },
  ];
  return (
    <div className="container w-[90%]  pb-20">
      <div className="flex flex-col items-center gap-2">
        <h2 className="text-theme-blue text-2xl uppercase font-body  ">
          FREQUENT QUESTIONS
        </h2>
        <h2 className="text-theme-blue text-6xl font-head capitalize font-bold  ">
          F.A.Q
        </h2>
      </div>
      <div className="flex h-fit gap-4 flex-col mt-10">
        {questions.map((question, i) => (
          <Question
            question={question}
            expanded={expanded}
            setExpanded={setExpanded}
            key={i}
          />
        ))}
      </div>
    </div>
  );
};

export default FAQ;

const Question = ({
  question,
  expanded,
  setExpanded,
}: {
  question: QuestionObject;
  expanded: number;
  setExpanded: React.Dispatch<React.SetStateAction<number>>;
}) => {
  return (
    <div
      onClick={() => setExpanded(question.id)}
      className="bg-white p-6 shadow-lg flex flex-col w-full cursor-pointer"
    >
      <div className="flex flex-row justify-between">
        <h1
          className={`font-bold font-head
         ${expanded === question.id ? "text-theme-blue" : "text-black"}

        `}
        >
          {question.question}
        </h1>

        <span
          className={`bg-theme-blue text-white justify-center items-center flex h-6 w-6 text-base rounded-full aspect-square
          ${expanded !== question.id ? "appear" : "disappear"}`}
        >
          <Icons.add className="h-4 w-4" />
        </span>
      </div>

      <div
        className={`flex flex-col overflow-hidden
        ${expanded === question.id ? "grow-height" : "shrink-height"}
        `}
      >
        <p className="text-gray-500 font-body mt-2">{question.answer}</p>
      </div>
    </div>
  );
};
