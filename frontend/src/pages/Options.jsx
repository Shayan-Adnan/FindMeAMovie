import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Button from "../components/Button";
import { questionList } from "../data/questions";

const Options = () => {
  const [selectedOptions, setSelectedOptions] = useState({});

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const [currentSelections, setCurrentSelections] = useState([]);

  const navigate = useNavigate();

  const toggleOption = (value) => {
    setCurrentSelections((prevSelections) => {
      if (prevSelections.includes(value)) {
        // if the value is already in the array, remove it
        return prevSelections.filter((o) => o !== value);
      } else {
        // if the value is not in the array, add it
        return [...prevSelections, value];
      }
    });
  };

  const getNextQuestion = () => {
    if (currentSelections.length > 0) {
      setSelectedOptions((prev) => ({
        ...prev,
        [questionList[currentQuestionIndex].id]: currentSelections,
      }));
    }

    if (currentQuestionIndex < questionList.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setCurrentSelections(
        selectedOptions[questionList[currentQuestionIndex + 1]?.id] || []
      );
    }
  };

  const getPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setCurrentSelections(
        selectedOptions[questionList[currentQuestionIndex - 1]?.id] || []
      );
    }
  };

  const loadResultsPage = () => {
    navigate("/results", {
      state: { selectedOptions },
    });
  };

  useEffect(() => {
    if (Object.keys(selectedOptions).length === questionList.length) {
      loadResultsPage();
    }
  }, [selectedOptions]);

  return (
    <div className=" min-h-screen bg-gradient-to-r from-slate-950 to-slate-900 flex flex-col items-center justify-center text-white px-6 py-12 font-bebas-neue ">
      <div className="max-w-4xl text-center space-y-8">
        {/* Question Text */}
        <h1 className="text-4xl md:text-7xl ">
          {questionList[currentQuestionIndex].question}
        </h1>

        <div className="flex flex-wrap justify-center items-center gap-3">
          {/* Option Buttons */}
          {questionList[currentQuestionIndex].options.map((option, index) => (
            <Button
              key={index}
              text={option.name}
              onClick={() => toggleOption(option.value)}
              nextBtn={false}
              isSelected={currentSelections.includes(option.value)}
            />
          ))}
        </div>

        {/* Navigation Btns*/}
        <div className="flex gap-10 justify-between items-center">
          <button
            className="  text-slate-900 rounded-full bg-gradient-to-r from-cyan-400 to-indigo-600  w-full md:w-auto px-4 md:px-8 py-3 text-lg hover:from-cyan-400 hover:to-indigo-400 transition"
            onClick={getPreviousQuestion}
          >
            <span>Back</span>
          </button>
          <Button
            text="Next"
            onClick={getNextQuestion}
            isNextBtn={true}
            isAnOptionSelected={currentSelections.length > 0}
          />
        </div>
      </div>
      <div className="flex justify-center items-center w-full max-w-xs px-4 md:px-0">
        <Link to="/">
          <button>
            <img
              src="logo-img.png"
              alt="logo"
              className="w-full h-auto object-contain cursor-pointer"
            />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Options;
