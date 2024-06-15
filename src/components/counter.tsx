import React from "react";

export const Counter = ({ defaultValue, onValueChange }) => {
  const [count, setCount] = React.useState(defaultValue);

  const handleCount = (type?: string) => {
    let value = count;
    if (type === "increment") {
      value = count + 1;
    } else if (count > 0) {
      value = count - 1;
    }

    if (onValueChange) onValueChange(value);

    setCount(value);
  };
  return (
    <div className=":uno: w-full box-border flex items-center justify-between bg-#cfd1ff p-2 rounded-lg m-auto gap-15px">
      <button
        className="bg-#646cff color-white border-none rounded-md py-1.25 px-2.5 flex justify-center items-center"
        onClick={() => handleCount()}>
        -
      </button>
      <p className="m-0 text-1em font-bold color-#333">{count}</p>
      <button
        className="bg-#646cff color-white border-none rounded-md py-1.25 px-2.5 flex justify-center items-center"
        onClick={() => handleCount("increment")}>
        +
      </button>
    </div>
  );
};
