const Button = ({
  text,
  onClick,
  isSelected,
  isNextBtn,
  isAnOptionSelected,
}) => {
  let styling;
  if (isNextBtn) {
    styling = `text-slate-900 rounded-full bg-gradient-to-r from-indigo-600 to-cyan-400  w-full md:w-auto px-4 md:px-8 py-3 text-lg hover:from-indigo-400 hover:to-cyan-400 transition ${
      isAnOptionSelected ? "" : "cursor-not-allowed opacity-50"
    }`;
  } else {
    styling = `px-6 py-3 rounded-full text-2xl md:text-4xl transition-colors ${
      isSelected
        ? "bg-gradient-to-r from-emerald-600 to-cyan-400 hover:from-emerald-400 hover:to-cyan-400 transition"
        : "bg-gray-700 hover:bg-gray-600"
    }`;
  }

  return (
    <button
      disabled={isNextBtn ? (isAnOptionSelected ? false : true) : false}
      type="button"
      onClick={onClick}
      className={styling}
    >
      {text}
    </button>
  );
};

export default Button;
