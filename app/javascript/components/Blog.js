import React, { useState, useEffect } from "react";
import PageLoader from "../shared/PageLoader";

const Blog = ({ match }) => {
  const [blog, setBlog] = useState({});
  useEffect(() => {
    fetch(`/api/v1/blogs/${match.params.id}`)
      .then(response => response.json())
      .then(response => {
        setBlog(response);
      });
  }, []);

  return (
    <>
      {blog.id ? (
        <div className="grid grid-rows-3 grid-flow-col gap-8">
          <div className="row-span-2">
            <img
              className="w-full rounded overflow-hidden shadow-lg"
              src={blog.image}
              alt="Blog image"
            />
          </div>
          <div className="row-span-1 col-span-2"></div>
          <div className="row-span-1 col-span-2">
            <div className="m-1">
              <span className="font-bold">Title:</span>
              <span className="text-lg ml-2">{blog.title}</span>
            </div>
            <div className="m-1">
              <span className="font-bold">Title:</span>
              <span className="text-lg ml-2">{blog.author}</span>
            </div>
            <div className="m-1">
              <span className="font-bold">Content:</span>
              <div>{blog.content}</div>
            </div>
          </div>
          <div className="row-span-1 col-span-1"></div>
        </div>
      ) : (
        <PageLoader />
      )}
    </>
  );
};

export default Blog;
