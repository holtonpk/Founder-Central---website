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
        "The editing time for our Short Video service is typically 5-7 business days, but it may vary based on project specifics. We aim for a balance of efficiency and quality, ensuring engaging videos within a reasonable timeframe.",
    },
    {
      id: 3,
      question: "Why do I need short form videos or a ghostwriter?",
      answer:
        "Attention: In today's fast-paced digital world, short form videos grab attention quickly, making them more shareable and engaging. Extracting short clips from your long form content will allow you to drive a new audience from short form to your long form content. Brand Authority: A professional ghostwriter helps establish you as a thought leader in you industry which will lead to more inbound leads for your business and new lucrative connections. Time Efficiency: As a founder or startup, your time is your biggest asset. All of our services are crafted to help you share your insights and personal brand with the world in the most efficient way possible, whilst ensuring consistent, quality content for your social media.",
    },
    {
      id: 4,
      question: "What is a personal brand and why do I need one?",
      answer:
        "A personal brand is the unique combination of your insights, experiences, and personality that define an your professional identity. It's how your peers perceive and remember you in the industry you are in. Advantages include enhanced credibility in your space, differentiation in a competitive market, and increased opportunities for new connections with other change makers and industry vets. A personal brand is the unique combination of your insights, experiences, and personality that define an your professional identity. It's how your peers perceive and remember you in the industry you are in. Advantages include enhanced credibility in your space, differentiation in a competitive market, and increased opportunities for new connections with other change makers and industry vets. ",
    },
  ];
  return (
    <div className="container w-[90%]  pb-20">
      <div className="flex flex-col items-center gap-2">
        {/* <h2 className="text-theme-blue text-2xl uppercase font-body  ">
          FREQUENT QUESTIONS
        </h2> */}
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
      <div className="grid grid-cols-[90%_1fr] justify-between">
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
