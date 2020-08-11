import React from "react";
import LoaderGif from "images/loader.gif";

const PageLoader = () => {
  return (
    <div className="fixed left-0 right-0 top-0 bottom-0 bg-white lg:flex items-center justify-center z-index-999">
      <img src={LoaderGif} />
    </div>
  );
};

export default PageLoader;
