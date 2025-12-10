import { useEffect, useState } from "react";

export default function ComicQuiz() {
  const [questions, setQuestions] = useState([]);
  const [quizStarted, setQuizStarted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [loading, setLoading] = useState(false);

  const [selected, setSelected] = useState(null); 

  const startQuiz = async () => {
    setLoading(true);

    const res = await fetch("http://localhost:4000/quiz");
    const data = await res.json();

    setQuestions(data);
    setQuizStarted(true);
    setLoading(false);
  };

  const handleAnswer = (option) => {
    if (selected) return; 

    setSelected(option);

    if (option === questions[current].answer) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
      setSelected(null);
    } else {
      setFinished(true);
    }
  };

  const restartQuiz = () => {
    setQuizStarted(false);
    setFinished(false);
    setCurrent(0);
    setScore(0);
    setSelected(null);
  };

  
  if (!quizStarted) {
    return (
      <div className="container text-center">
        <h1 className="mb-4">Comic Quiz</h1>
        <p className="lead">Test your comic book knowledge!</p>

        <button className="btn btn-primary btn-lg" onClick={startQuiz}>
          {loading ? "Loading..." : "Start Quiz"}
        </button>
      </div>
    );
  }

  
  if (finished) {
    return (
      <div className="container text-center">
        <h1 className="mb-4">Quiz Complete!</h1>
        <h2>You scored {score} / {questions.length}</h2>

        <button className="btn btn-secondary mt-3" onClick={restartQuiz}>
          Restart Quiz
        </button>
      </div>
    );
  }

  const currentQ = questions[current];


  return (
    <div className="container text-center">
      <h2 className="mb-3">Question {current + 1} / {questions.length}</h2>

      <div className="card p-4 shadow-sm mx-auto" style={{ maxWidth: "600px" }}>
        <h4>{currentQ.question}</h4>

        <div className="mt-4">
          {currentQ.options.map((opt) => {
            
            let btnClass = "btn btn-outline-primary d-block w-100 mb-2";

            if (selected) {
              if (opt === currentQ.answer) {
                btnClass = "btn btn-success d-block w-100 mb-2"; 
              } else if (opt === selected) {
                btnClass = "btn btn-danger d-block w-100 mb-2"; 
              } else {
                btnClass = "btn btn-outline-secondary d-block w-100 mb-2";
              }
            }

            return (
              <button
                key={opt}
                className={btnClass}
                onClick={() => handleAnswer(opt)}
                disabled={!!selected} 
              >
                {opt}
              </button>
            );
          })}
        </div>

        {selected && (
          <button className="btn btn-primary mt-3" onClick={nextQuestion}>
            Next Question →
          </button>
        )}
      </div>
    </div>
  );
}
