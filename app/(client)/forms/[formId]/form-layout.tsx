"use client";
import React, {createRef, useEffect} from "react";
import {set, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import * as z from "zod";
import {Icons} from "@/app/(client)/components/icons";
import {Button} from "@/app/(client)/components/ui/button";
import {LinkButton} from "@/app/(client)/components/ui/link";
import {Input} from "@/app/(client)/components/ui/input";
import {Textarea} from "@/app/(client)/components/ui/textarea";
import {Label} from "@/app/(client)/components/ui/label";
import Image from "next/image";
import Confetti from "react-confetti";
import {motion} from "framer-motion";

import {
  RadioGroup,
  RadioGroupItem,
} from "@/app/(client)/components/ui/radio-group";
import {useToast} from "@/app/(client)/components/ui/use-toast";
import {useStorage} from "@/context/storage";

type Answer = {
  id: string;
  question: string;
  value: string | undefined;
  error: boolean;
  required: boolean;
};

const FormPageLayout = () => {
  const {toast} = useToast();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [completed, setComplete] = React.useState<boolean>(false);
  const nameRef = createRef<HTMLInputElement>();
  const [nameError, setNameError] = React.useState<boolean>(false);
  const [answers, setAnswers] = React.useState<Answer[]>(
    survey.questions.map((question: Question) => {
      return {
        id: question.id,
        question: question.question,
        value: undefined,
        error: false,
        required: question.required,
      };
    })
  );

  const {SubmitFormResponse} = useStorage()!;

  async function handleSubmit(e: React.BaseSyntheticEvent) {
    e.preventDefault();
    setIsLoading(true);
    let answersLocal = answers;
    answersLocal.map((answer, i) => {
      if (answer.value == undefined && answer.required == true) {
        // set the error state to true for the object
        answersLocal[i] = {...answer, error: true};
      }
    });
    console.log("name ref", nameRef.current?.value);
    if (!nameRef.current?.value || nameRef.current?.value === "") {
      console.log("name ref errpr", nameRef.current?.value);
      toast({
        variant: "destructive",
        title: "Please fill in the required fields",
        description: "Double check that you have filled in all the fields.",
      });
      setNameError(true);
      setIsLoading(false);
      return;
    } else {
      setNameError(false);
    }
    if (answersLocal.some((answer) => answer.error == true)) {
      setAnswers([...answersLocal]);
      toast({
        variant: "destructive",
        title: "Please fill in the required fields",
        description: "Double check that you have filled in all the fields.",
      });
      setNameError(true);
      setIsLoading(false);
      return;
    }

    // format response as { question.id: {question: question.question, answer: question.value}, { question.id: {question: question.question, answer: question.value} }

    const formResponse = answersLocal.map((question) => {
      return {id: question.id, q: question.question, a: question.value};
    });

    await SubmitFormResponse(
      survey.id,
      nameRef.current ? nameRef.current.value : "",
      {results: formResponse}
    );
    setComplete(true);
    setIsLoading(false);
  }
  // const router = useRouter();
  const reset = () => {
    setComplete(false);
    // router.refresh();
  };

  return (
    <div className="flex min-h-screen flex-col bg-background ">
      {completed && (
        <div className=" z-[120] fixed ">
          <div className="fixed z-40 pointer-events-none">
            <Confetti
              className="z-40 fixed"
              width={window.innerWidth}
              height={window.innerHeight}
              colors={["#4DA4E0", "#EE217F", "#8E6CB6", "#FFBD59"]}
            />
          </div>
          <div className="fixed max-w-[90%] flex items-center flex-col z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] bg-white rounded-lg h-fit p-8 border border-border animate-in fade-in-0 zoom-in-95 slide-in-from-left-1/2 slide-in-from-top-[48%]">
            <h1 className="text-theme-blue text-4xl text-center font-bold">
              Thanks for your feedback!
            </h1>
            <p className="text-center w-full text-sm mt-3">
              Your collaboration is instrumental in shaping the essence of
              Founder Central.
            </p>
            <div className="flex items-center flex-col md:flex-row gap-4 md:gap-6 md:ml-auto mt-6 md:mt-10 w-full md:w-fit">
              <Button
                onClick={reset}
                variant="blueOutline"
                className="w-full md:w-fit"
              >
                Submit another response
              </Button>
              <LinkButton
                href={"https://www.foundercentral.co/"}
                variant="blue"
                className="w-full md:w-fit"
              >
                Founders Central Home
              </LinkButton>
            </div>
          </div>
          <div
            onClick={reset}
            className="h-screen w-screen fixed bg-white/10 blurBack animate-in fade-in-0"
          />
        </div>
      )}
      <div className="container flex flex-col items-center p-6">
        <div className="h-[80px] w-[80px] md:h-[100px] md:w-[100px]">
          <motion.div
            initial={{scale: 0}}
            animate={{rotate: 360, scale: 1}}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
            className="relative h-[80px] w-[80px] md:h-[100px] md:w-[100px]"
          >
            <Image
              src="/image/logo.png"
              alt="logo"
              objectFit="contain"
              fill
              className="shadow-lg rounded-full"
            />
          </motion.div>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-10 md:w-[60%] pb-10  mt-4"
        >
          <div className="flex flex-col gap-10 rounded-lg bg-white shadow-lg p-6">
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">Name</Label>
              {nameError && (
                <h2 className="text-red-500">{"*please enter your name"}</h2>
              )}
              <Input
                ref={nameRef}
                placeholder="enter your name"
                autoComplete="name"
                className="focus:border-theme-blue"
              />
            </div>
            {survey.questions.map((question, i) => (
              <div key={i} className="flex flex-col gap-4 ">
                <h1 className="font-bold">{question.question}</h1>
                {question.type == "multiple_choice" && (
                  <MultiChoiceQuestion
                    key={i}
                    question={question}
                    i={i}
                    answers={answers}
                    setAnswers={setAnswers}
                  />
                )}
                {question.type == "open_ended" && (
                  <OpenEndedQuestion
                    key={i}
                    question={question}
                    i={i}
                    answers={answers}
                    setAnswers={setAnswers}
                  />
                )}
              </div>
            ))}
          </div>
          <Button type="submit" variant="blue">
            Submit
            {isLoading && (
              <Icons.spinner className="ml-2 h-4 w-4 animate-spin" />
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

const MultiChoiceQuestion = ({
  question,
  i,
  answers,
  setAnswers,
}: {
  question: MultipleChoiceQuestion;
  i: number;
  answers: Answer[];
  setAnswers: React.Dispatch<React.SetStateAction<Answer[]>>;
}) => {
  const followUpRef = createRef<HTMLInputElement>();

  const selectItem = (value: string) => {
    let answersLocal = answers;
    if (followUpRef.current) {
      answersLocal[i] = {
        ...answersLocal[i],
        value: value + ": " + followUpRef.current.value,
        error: false,
      };
    } else {
      answersLocal[i] = {...answersLocal[i], value: value, error: false};
    }
    setAnswers([...answersLocal]);
  };

  return (
    <>
      {answers[i].error == true && (
        <h2 className="text-red-500">{"*please select an answer"}</h2>
      )}
      <RadioGroup
        onValueChange={selectItem}
        className="flex flex-col space-y-2 "
      >
        {question.options.map((option, i) => (
          <div key={i} className="flex items-center space-x-2">
            <RadioGroupItem
              className="fill-theme-blue"
              key={i}
              id={option.option}
              value={option.option}
            />
            {option.type == "single_choice" && (
              <Label htmlFor={option.option}>{option.option}</Label>
            )}
            {option.type == "follow_up_question" && (
              <Input
                ref={followUpRef}
                onChange={(e) => {
                  let answersLocal = answers;
                  answersLocal[i] = {
                    ...answersLocal[i],
                    value: option.option + ": " + e.target.value,
                    error: e.target.value == "",
                  };
                  setAnswers([...answersLocal]);
                }}
                className="focus:border-theme-blue"
                type="text"
                name="question"
                placeholder={option.follow_up_question_placeholder}
              />
            )}
          </div>
        ))}
      </RadioGroup>
    </>
  );
};

const OpenEndedQuestion = ({
  question,
  i,
  answers,
  setAnswers,
}: {
  question: OpenEndedQuestion;
  i: number;
  answers: Answer[];
  setAnswers: React.Dispatch<React.SetStateAction<Answer[]>>;
}) => {
  const valueChange = (e: React.BaseSyntheticEvent) => {
    let answersLocal = answers;
    answersLocal[i] = {
      ...answersLocal[i],
      value: e.target.value,
      error: e.target.value == "",
    };
    setAnswers([...answersLocal]);
  };
  return (
    <>
      {answers[i].error == true && (
        <h2 className="text-red-500">{"*please fill in your answer"}</h2>
      )}
      <Textarea
        onChange={valueChange}
        name="question"
        placeholder="Type your answer here"
        className={`${answers[i].error == true ? "border-red-500" : ""}`}
      />
    </>
  );
};

export default FormPageLayout;

type QuestionOption = {
  option: string;
  follow_up_question_placeholder?: string;
  type: "single_choice" | "follow_up_question";
};

type MultipleChoiceQuestion = {
  id: string;
  question: string;
  type: "multiple_choice";
  options: QuestionOption[];
  required: boolean;
};

type OpenEndedQuestion = {
  id: string;
  question: string;
  type: "open_ended";
  required: boolean;
};

type Question = MultipleChoiceQuestion | OpenEndedQuestion;

type Survey = {
  id: string;
  questions: Question[];
};

const survey: Survey = {
  id: "1",
  questions: [
    {
      id: "1",

      question:
        "Which stage of your entrepreneurship journey are you in right now?",
      type: "multiple_choice",
      options: [
        {
          type: "single_choice",
          option: "Haven't started yet but hoping to make the jump soon.",
        },
        {
          type: "single_choice",
          option: "Started working on something but can’t go full time yet.",
        },
        {
          type: "single_choice",
          option:
            "Already quit my day job and became a full-time entrepreneur.",
        },
        {type: "single_choice", option: "Other (open-ended blank form)"},
      ],
      required: true,
    },
    {
      id: "2",
      question:
        "After buying the book ‘The 50 Greatest Business Success Stories’ would you be interested in automatically being added to the weekly newsletter list?",
      type: "multiple_choice",
      options: [
        {type: "single_choice", option: "Yes"},
        {
          type: "follow_up_question",
          option: "No",
          follow_up_question_placeholder: "No (Why not?)",
        },
      ],
      required: true,
    },
    {
      id: "3",
      question:
        "We're considering two newsletter formats. Which one do you prefer, or do you like both equally?",
      type: "multiple_choice",
      options: [
        {
          type: "single_choice",
          option:
            "Option 1: A newsletter where you can ask or answer questions from founders like yourself to learn what’s working for them, the common hurdles to avoid, and even share your own insights.",
        },
        {
          type: "single_choice",
          option:
            "Option 2: An email that gives you a compilation of the best insights from the top business newsletters each week, so you don’t have to keep up with all of them.",
        },
        {type: "single_choice", option: "I would love both."},
      ],
      required: true,
    },
    {
      id: "4",
      question:
        "If you were our ONLY newsletter reader, describe the perfect email that you would like to get each week?",
      type: "open_ended",
      required: true,
    },
    {
      id: "5",
      question:
        "What do you currently spend the most money on to boost your success?",
      type: "multiple_choice",
      options: [
        {type: "single_choice", option: "Business Books"},
        {
          type: "single_choice",
          option: "Technology (software, hardware, servers, etc.)",
        },
        {
          type: "single_choice",
          option: "Networking events with like-minded individuals",
        },
        {type: "single_choice", option: "Advertising"},
        {
          option: "Other",
          follow_up_question_placeholder: "Other (explain)",
          type: "follow_up_question",
        },
      ],
      required: true,
    },
  ],
};
