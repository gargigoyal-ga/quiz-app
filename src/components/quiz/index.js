import React, { useState } from "react";
//components
import Steps from "../steps";

//styles
import "../../assets/css/style.css";
import "../../assets/css/form.scss";
function Index() {
  //quiz1
  const [q1step, setQ1step] = useState(0);
  const [q1usersSelection, setQ1usersSelection] = useState({});
  const [q1Timer, setq1Timer] = useState(0);
  const [q1CurrentQues, setq1CurrentQues] = useState(0);
  const [q1Questions,setQ1Questions]=useState([])

  //quiz2
  const [q2step, setQ2Step] = useState(0);
  const [q2usersSelection, setQ2usersSelection] = useState({});
  const [q2Timer, setq2Timer] = useState(0);
  const [q2CurrentQues, setq2CurrentQues] = useState(0);
  const [q2Questions, setQ2Questions] = useState([]);


  const q1resetFunc = () => {
    q1step == 0 ? setQ1step(1) : setQ1step(0);
    setQ1usersSelection({});
    setq1Timer(0);
    setq1CurrentQues(0);
    setQ1Questions([])
  };
  const q2resetFunc = () => {
    q2step == 0 ? setQ2Step(1) : setQ2Step(0);
    setQ2usersSelection({});
    setq2Timer(0);
    setq2CurrentQues(0);
    setQ2Questions([]);
  };

  return (
    <main className="main-wrapper">
      <section className="quiz-section">
        <h1 className="h1-title">Welcome to the Quiz Let's start</h1>
        <section className="quiz-block">
          {/* ========quiz 1========= */}
          <div className="quiz-boxes quiz-box1">
            <Steps
              name="Quiz 1"
              step={q1step}
              setStep={setQ1step}
              userSelection={q1usersSelection}
              setUserSelection={setQ1usersSelection}
              timer={q1Timer}
              setTimer={setq1Timer}
              currentQues={q1CurrentQues}
              setCurrentQues={setq1CurrentQues}
              questions={q1Questions}
              setQuestions={setQ1Questions}
              resetFunc={q1resetFunc}
            />
          </div>
          {/* ========quiz 2========= */}
          <div className="quiz-boxes quiz-box2">
            <Steps
              name="Quiz 2"
              step={q2step}
              setStep={setQ2Step}
              userSelection={q2usersSelection}
              setUserSelection={setQ2usersSelection}
              timer={q2Timer}
              setTimer={setq2Timer}
              currentQues={q1CurrentQues}
              setCurrentQues={setq1CurrentQues}
              questions={q2Questions}
              setQuestions={setQ2Questions}
              resetFunc={q2resetFunc}
            />
          </div>
        </section>
      </section>
    </main>
  );
}

export default Index;
