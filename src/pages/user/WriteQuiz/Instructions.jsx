import React from "react";
import { useNavigate } from "react-router-dom";

function Instructions(props) {
  const { quizData, setQuizData, view, setView, startTimer } = props;
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center mt-2 gap-5">
      <h1 className="text-2xl underline text-center">Instructions</h1>
      <ul className="flex flex-col gap-1">
        <li>Quiz must be completed in {quizData.duration} minutes.</li>
        <li>
          Quiz will be submitted automatically after {quizData.duration}{" "}
          minutes.
        </li>
        <li>Once submitted, you cannot change your answer.</li>
        <li>
          Do not refresh the page and do not navigate to other pages like Home,
          Profile. If did so, you've to restart your quiz.
        </li>
        <li>
          You can use the <span className="font-bold">Previous</span> and{" "}
          <span className="font-bold">Next</span> buttons to navigate between
          questions.
        </li>
        <li>
          Total score of the quiz is{" "}
          <span className="font-bold">{quizData.total}</span>
        </li>
        {/* <li>
            Required marks of the quiz is <span className='font-bold'>
                {quizData.req}
            </span>
          </li> */}
      </ul>
      <div className="flex gap-2">
        <button className="primary-outlined-btn" onClick={() => navigate(-1)}>
          Close
        </button>
        <button
          className="primary-contained-btn"
          onClick={() => {
            startTimer();
            setView("questions");
          }}
        >
          Start Quiz
        </button>
      </div>
    </div>
  );
}

export default Instructions;
