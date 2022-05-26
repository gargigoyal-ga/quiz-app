import React, { useEffect } from "react";
//components
import { Button } from "@mui/material";
//styles
import "../assets/css/style.css";
import "../assets/css/form.scss";
//range slider
import PropTypes from "prop-types";
import Slider, { SliderThumb } from "@mui/material/Slider";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
// checkbox
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
const label = { inputProps: { "aria-label": "Checkbox demo" } };
function ValueLabelComponent(props) {
  const { children, value } = props;
  return (
    <Tooltip enterTouchDelay={0} placement="top" title={value}>
      {children}
    </Tooltip>
  );
}
ValueLabelComponent.propTypes = {
  children: PropTypes.element.isRequired,
  value: PropTypes.number.isRequired,
};

const Schema = Yup.object().shape({
  numbersRange: Yup.string().required("This field is required."),
  NoOfQuestions: Yup.number()
    .positive("This must be Positive")
    .min(10, "min 10 questions required")
    .max(20, "max 20 questions required")
    .required("This field is required."),
  operators: Yup.array().required("This field is required.").min(2),
});

function Step1({
  name,
  step,
  setStep,
  userSelection,
  setUserSelection,
  timer,
  setTimer,
  currentQues,
  setCurrentQues,
  questions,
  setQuestions,
  resetFunc,
}) {
  const [age, setAge] = React.useState("");
  const [interval, setin] = React.useState("");
  const [currentData, setCurrentData] = React.useState("");
  const [userAns, setUserAns] = React.useState("");
  const [score, setScore] = React.useState(0);

  const operators = ["+", "-", "*", "/"];
  const handleChange = (event) => {
    setAge(event.target.value);
  };

  //Math.floor(Math.random() * allAsteroidsData.length)
  // Timer
  useEffect(() => {
    if (timer == 5) {
      nextQuestion();
    }
  }, [timer]);
  const timerFunction = () => {
    const newInterval = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);
    setin(newInterval);
  };

  const nextQuestion = () => {
    clearInterval(interval);
    setTimer(0);
    setUserAns("");
    step != 3 && setCurrentQues(currentQues + 1);
    step != 3 && timerFunction();
    step != 3 &&
      setQuestions([
        ...questions,
        {
          ...currentData,
          userAns: userAns,
          result: userAns ? (Number(currentData.ans) === Number(userAns)):false,
        },
      ]);
    Number(currentData.ans) === Number(userAns) &&
      setScore(`${eval(Number(score) + 1)}`);
    
  };

  //random function

  useEffect(() => {
    if (userSelection.operators) {
      const item = userSelection;
      randomNumGenerator(item);
      if (currentQues == item.NoOfQuestions) {
        nextQuestion();
        setStep(3);
      }
    }
  }, [currentQues]);

  const randomNumGenerator = (item) => {
    const operator =
      item.operators[Math.floor(Math.random() * item.operators.length)];
    const digit1 = Math.floor(Math.random() * item.numbersRange);
    const digit2 = Math.floor(Math.random() * (item.numbersRange -.11 +1));
    const Answer = eval(digit1 + operator + digit2);
    setCurrentData({
      operator: operator,
      digit1: digit1,
      digit2: digit2,
      ans: Answer,
    });
  };

  return (
    <>
      <div className="quix-head">
        <h3 className="quiz-title">{name}</h3>
        <div className="customBtn">
          <Button
            color="success"
            variant="contained"
            onClick={() => {
              // step == 0 ? setStep(1) : setStep(0);
              setScore(0);
              clearInterval(interval);
              resetFunc();
            }}
          >
            {step ? "Reset " : "Start "}
            {name}
          </Button>
        </div>
      </div>
      {/* ========step 1 start========= */}
      {step == 1 && (
        <Formik
          enableReinitialize
          initialValues={{
            NoOfQuestions: 20,
            operators: operators,
            numbersRange: 10,
          }}
          validationSchema={Schema}
          onSubmit={(values, actions) => {
            setUserSelection(values);
            setStep(2);
            setCurrentQues(1);
            timerFunction();
          }}
        >
          {(formikProps) => {
            const {
              values,
              setFieldValue,
              handleChange,
              touched,
              errors,
              resetForm,
              initialValues,
              handleSubmit,
            } = formikProps;
            return (
              <Form translate="no" noValidate autoComplete="off">
                <section className="card-form quiz-step2">
                  <div className="form-row">
                    <h4 className="h4-title">How many question</h4>
                    <div className="customInput">
                      <input
                        className="form-control"
                        type="number"
                        id="NoOfQuestions"
                        name="NoOfQuestions"
                        step="5"
                        min="10"
                        max="20"
                        value={values.NoOfQuestions}
                        error={
                          touched.NoOfQuestions && Boolean(errors.NoOfQuestions)
                        }
                        onChange={handleChange}
                      />
                      <span className="errorMsg">
                        <ErrorMessage name="NoOfQuestions" />
                      </span>
                    </div>
                  </div>

                  <div className="form-row customRangeSlider">
                    <h4 className="h4-title">Range</h4>
                    <Box sx={{ width: 320 }}>
                      <Slider
                        id="numbersRange"
                        name="numbersRange"
                        valueLabelDisplay="auto"
                        components={{
                          ValueLabel: ValueLabelComponent,
                        }}
                        aria-label="custom thumb label"
                        value={values.numbersRange}
                        min={5}
                        max={15}
                        error={
                          touched.numbersRange && Boolean(errors.numbersRange)
                        }
                        onChange={handleChange}
                      />
                      <span className="errorMsg">
                        <ErrorMessage name="numbersRange" />
                      </span>
                    </Box>
                  </div>
                  <div className="form-row customCheckbox">
                    <h4 className="h4-title">Operator</h4>
                    <div className="customCheckboxgrp">
                      <div className="checkboxgrp">
                        {operators.map((operator, index) => {
                          return (
                            <FormControl sx={{ m: 2 }} component="fieldset">
                              <FormGroup aria-label="position" row>
                                <FormControlLabel
                                  value="end"
                                  control={
                                    <Checkbox
                                      checked={values.operators.includes(
                                        operator
                                      )}
                                      onChange={(e) => {
                                        const checkedOperators =
                                          values.operators;
                                        const filteredOperator =
                                          values.operators.filter(
                                            (op) => op != operator
                                          );
                                        e.target.checked
                                          ? setFieldValue("operators", [
                                              ...checkedOperators,
                                              operator,
                                            ])
                                          : setFieldValue(
                                              "operators",
                                              filteredOperator
                                            );
                                      }}
                                    />
                                  }
                                  label={operator}
                                  labelPlacement="end"
                                />
                              </FormGroup>
                            </FormControl>
                          );
                        })}
                      </div>
                      <span className="errorMsg">
                        <ErrorMessage name="operators" />
                      </span>
                    </div>
                  </div>
                  <Button color="success" variant="contained" type="submit">
                    Start
                  </Button>
                  {/* <h2 className="start-title">Start Quiz</h2> */}
                </section>
              </Form>
            );
          }}
        </Formik>
      )}
      {/* ========step 1 end========= */}

      {/* ========step 2 start========= */}
      {step == 2 && (
        <>
          <div className="card-form">
            <div className="score-row">
              <div className="score-header scorecard-row">
                <h1 className="quiz-title">Question {currentQues}</h1>
                <h1 className="timer-title">00:{timer}</h1>
              </div>
              {currentData && (
                <h1 className="quiz-score-title">{`${currentData.digit1} ${currentData.operator} ${currentData.digit2}`}</h1>
              )}
              <div className="customInput">
                <input
                  className="form-control"
                  type="text"
                  id="userAns"
                  label="Outlined"
                  variant="outlined"
                  name="userAns"
                  value={userAns}
                  placeholder="Enter the Answer"
                  onChange={(e) => {
                    setUserAns(e.target.value);
                  }}
                />
              </div>
              <div className="next-btn">
                <Button
                  color="success"
                  variant="contained"
                  onClick={() => {
                    nextQuestion();
                  }}
                >
                  Next
                </Button>
              </div>
              <h1 className="finalscore-title">
                Score: {score}/{currentQues}
              </h1>
            </div>
          </div>
        </>
      )}
      {/* ========step 2 end========= */}

      {/* ========step 3 start========= */}
      {step == 3 && (
        <>
          <div className="card-form">
            <div className="scorecard-header">
              <h1 className="head-title">Cummalative Scorecard</h1>
              {/* <h4 className="card-title">Cummalative Scorecard</h4> */}
            </div>
            <div className="scorecard-row">
              <div className="scorecard">
                <div className="card-row">
                  <h4 className="label-title">Correct Answer: </h4>
                  <h4 className="label-value">{score}</h4>
                </div>
                <div className="card-row">
                  <h4 className="label-title">InCorrect Answer: </h4>
                  <h4 className="label-value">{questions.length - score}</h4>
                </div>

                <div className="card-row">
                  <h4 className="label-title">Score:</h4>
                  <h4 className="label-value">
                    {score} / {questions.length}{" "}
                  </h4>
                </div>
              </div>
              <div className="scorecard q-scorecard">
              {questions.map((item,index)=>{
                 return (
                   <div
                     className={`score-card ${
                       item.result ? "correctscore-card" : "wrongscore-card"
                     }`}
                     key={index}
                   >
                     <div className="card-row">
                       <h4 className="label-title">Q.{index + 1}</h4>
                       <h4 className="label-value">{`${item.digit1} ${item.operator} ${item.digit2}`}</h4>
                     </div>
                     <div className="card-row">
                       <h4 className="label-title">Your Answer: </h4>
                       <h4 className="label-value">
                         {item.userAns ? item.userAns : "Not Answered"}
                       </h4>
                     </div>
                     <div className="card-row">
                       <h4 className="label-title">Correct Answer: </h4>
                       <h4 className="label-value">{item.ans.toFixed(2)}</h4>
                     </div>
                   </div>
                 );
              })}
                
             
              </div>
            </div>
          </div>
        </>
      )}
      {/* ========step 3 end========= */}
    </>
  );
}

export default Step1;
