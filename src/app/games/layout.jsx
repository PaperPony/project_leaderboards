import React from "react";

const layout = ({ children }) => {
  return (
    <div>
      <div className="text-3xl font-bold text-center">Game layout.</div>
      <div>{children}</div>
    </div>
  );
};

export default layout;
