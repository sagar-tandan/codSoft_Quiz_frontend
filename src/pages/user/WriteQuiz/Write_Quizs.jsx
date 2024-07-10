import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getQuizById } from "../../../apicalls/quizs";
import { HideLoading, ShowLoading } from "../../../redux/loaderSlice";
import { message } from "antd";
import Instructions from "./Instructions";
import { addResult } from "../../../apicalls/results";

function WriteQuiz() {
  const [quizData, setQuizData] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [result, setResult] = useState(null);
  const { id } = useParams();
  const dispatch = useDispatch();
  const [view, setView] = useState("instructions");
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [timeUp, setTimeUp] = useState(false);
  const intervalIdRef = useRef(null);
  const { user } = useSelector((state) => state.users);
  const navigate = useNavigate();

  const getQuizDataById = async (id) => {
    try {
      dispatch(ShowLoading());
      const response = await getQuizById(id);
      dispatch(HideLoading());
      if (response.success) {
        setQuizData(response.data);
        setQuestions(response.data.questions);
        setSecondsLeft(response.data.duration * 60); // assuming duration is in minutes
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const calculateResult = async () => {
    try {
      let correctAnswers = [];
      let wrongAnswers = [];

      questions.forEach((question, index) => {
        if (question.correctOption === selectedOptions[index]) {
          correctAnswers.push(question);
        } else {
          wrongAnswers.push(question);
        }
      });

      let verdict = "Pass";
      if (correctAnswers.length < quizData.req) {
        verdict = "Fail";
      }

      const tempResult = {
        correctAnswers,
        wrongAnswers,
        verdict,
      };

      setResult(tempResult);
      console.log(user);
      if (!user || !user._id) {
        throw new Error("User is not defined");
      }

      dispatch(ShowLoading());
      const response = await addResult({
        quiz: id,
        result: tempResult,
        user: user._id,
      });
      dispatch(HideLoading());

      if (response.success) {
        setView("result");
      } else {
        console.log(response.message);
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      console.log(error.message);
      message.error(error.message);
    }
  };

  const startTimer = () => {
    const interval = setInterval(() => {
      setSecondsLeft((prevSeconds) => {
        if (prevSeconds > 0) {
          return prevSeconds - 1;
        } else {
          setTimeUp(true);
          clearInterval(intervalIdRef.current);
          return 0;
        }
      });
    }, 1000);
    intervalIdRef.current = interval;
  };

  useEffect(() => {
    if (timeUp && view === "questions") {
      calculateResult();
    }
  }, [timeUp]);

  useEffect(() => {
    if (id) {
      getQuizDataById(id);
    }
    return () => {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
      }
    };
  }, [id]);

  return (
    quizData && (
      <div className="mt-2">
        <div className="divider"></div>
        <h1 className="text-center">{quizData.name}</h1>
        <div className="divider"></div>
        {view === "instructions" && (
          <Instructions
            quizData={quizData}
            setQuizData={setQuizData}
            view={view}
            setView={setView}
            startTimer={startTimer}
          />
        )}
        {view === "questions" && questions.length > 0 && (
          <div className="flex flex-col gap-2 mt-2">
            <div className="flex justify-between">
              <h1 className="text-2xl">
                {selectedQuestionIndex + 1} :{" "}
                {questions[selectedQuestionIndex].name}
              </h1>
              <div className="timer">
                <span className="text-2xl">{secondsLeft}</span>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              {Object.keys(questions[selectedQuestionIndex].options).map(
                (option, index) => {
                  return (
                    <div
                      className={`flex gap-2 items-center ${
                        selectedOptions[selectedQuestionIndex] === option
                          ? "selected-option"
                          : "option"
                      }`}
                      key={index}
                      onClick={() => {
                        setSelectedOptions((prevOptions) => ({
                          ...prevOptions,
                          [selectedQuestionIndex]: option,
                        }));
                        console.log(selectedOptions);
                      }}
                    >
                      <h1 className="text-xl">
                        {option} :{" "}
                        {questions[selectedQuestionIndex].options[option]}
                      </h1>
                    </div>
                  );
                }
              )}
            </div>
            <div className="flex justify-between">
              {selectedQuestionIndex > 0 && (
                <button
                  className="primary-outlined-btn"
                  onClick={() => {
                    setSelectedQuestionIndex(selectedQuestionIndex - 1);
                  }}
                >
                  Previous
                </button>
              )}
              {selectedQuestionIndex < questions.length - 1 && (
                <button
                  className="primary-contained-btn"
                  onClick={() => {
                    setSelectedQuestionIndex(selectedQuestionIndex + 1);
                  }}
                >
                  Next
                </button>
              )}
              {selectedQuestionIndex === questions.length - 1 && (
                <button
                  className="primary-contained-btn"
                  onClick={() => {
                    clearInterval(intervalIdRef.current);
                    setTimeUp(true);
                  }}
                >
                  Submit
                </button>
              )}
            </div>
          </div>
        )}
        {view === "result" && result && (
          <div className="flex justify-center mt-2 gap-2 ">
            <div className="flex flex-col gap-2 bg p-8 rounded">
              <h1 className="text-2xl">Result</h1>
              <div className="marks">
                <h1 className="text-md">Total Score : {quizData.total}</h1>
                {/* <h1 className="text-md">Required Marks : {quizData.req}</h1> */}
                <h1 className="text-md">
                  Obtained Score : {result.correctAnswers.length}
                </h1>
                <h1 className="text-md">
                  Wrong Answers : {result.wrongAnswers.length}
                </h1>
                <h1 className="text-md">Verdict : {result.verdict}</h1>
                <div className="flex gap-2 mt-2">
                  <button
                    className="primary-outlined-btn"
                    onClick={() => {
                      setView("instructions");
                      setSelectedQuestionIndex(0);
                      setSelectedOptions({});
                      setTimeUp(false);
                      setSecondsLeft(quizData.duration * 60);
                    }}
                  >
                    Retake Quiz
                  </button>
                  <button
                    className="primary-contained-btn"
                    onClick={() => {
                      setView("review");
                    }}
                  >
                    Review Answers
                  </button>
                </div>
              </div>
            </div>
            <div className="lottie-animation">
              {result.verdict === "Pass" && (
                <lottie-player
                  src="https://assets5.lottiefiles.com/packages/lf20_uu0x8lqv.json"
                  background="transparent"
                  speed="1"
                  loop
                  autoplay
                ></lottie-player>
              )}
              {result.verdict === "Fail" && (
                <lottie-player
                  src="https://assets4.lottiefiles.com/packages/lf20_qp1spzqv.json"
                  background="transparent"
                  speed="1"
                  loop
                  autoplay
                ></lottie-player>
              )}
            </div>
          </div>
        )}
        {view === "review" && (
          <div className="flex flex-col gap-2">
            {questions.map((question, index) => {
              const isCorrect =
                question.correctOption === selectedOptions[index];
              return (
                <div
                  className={`flex flex-col gap-1 ${
                    isCorrect ? "bg-success" : "bg-error"
                  } p-2`}
                  key={index}
                >
                  <h1 className="text-xl">
                    {index + 1} : {question.name}
                  </h1>
                  <h1 className="text-md">
                    Your Answer : {selectedOptions[index]} :{" "}
                    {question.options[selectedOptions[index]]}
                  </h1>
                  <h1 className="text-md">
                    Correct Answer : {question.correctOption} :{" "}
                    {question.options[question.correctOption]}
                  </h1>
                </div>
              );
            })}
            <div className="flex justify-center gap-2">
              <button
                className="primary-outlined-btn"
                onClick={() => {
                  setView("instructions");
                  setSelectedQuestionIndex(0);
                  setSelectedOptions({});
                  setTimeUp(false);
                  setSecondsLeft(quizData.duration * 60);
                }}
              >
                Retake Quiz
              </button>
              <button
                className="primary-contained-btn"
                onClick={() => {
                  navigate("/");
                }}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    )
  );
}

export default WriteQuiz;
