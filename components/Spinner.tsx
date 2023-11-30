import React from "react";

const Spinner = () => {
  return (
    <div
      className="inline-block h-4 w-4 border-2 border-solid border-current border-r-transparent animate-spin rounded-full align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
      role="status"
    >
      <span className="!absolute !-m-px !h-px !w-px !whitespace-nowrap !border-0 !p-0 !overflow-hidden ![clip:rect(0,0,0,0)]">
        Loading...
      </span>
    </div>
  );
};

export default Spinner;
