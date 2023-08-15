import React from "react";

export const Loading = () => {
  return (
    <div className="col-12 text-center">
      <span className="fa fa-spinner fa-pulse fa-3x fa-fw text-primary"></span>
      <p className="text-primary">Loading...</p>
    </div>
  );
};
