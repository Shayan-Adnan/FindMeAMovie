import React from "react";

const ErrorMessageContainer = ({ errorMessage }) => {
  return (
    <p className="text-rose-500 text-2xl font-semibold bg-slate-900 p-4 rounded-lg shadow-md">
      {errorMessage}
    </p>
  );
};

export default ErrorMessageContainer;
