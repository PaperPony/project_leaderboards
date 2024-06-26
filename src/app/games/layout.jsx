import React from "react";

const layout = ({ children }) => {
  return (
    <div className="h-full text-3xl font-bold text-center p-24 bg-gradient-to-b from-violet-200 to-violet-400 dark:bg-gradient-to-t dark:from-gray-900 dark:to-violet-950">
      {children}
    </div>
  );
};

export default layout;
