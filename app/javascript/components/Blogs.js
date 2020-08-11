import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Dotdotdot from "react-dotdotdot";
import Alert from "../shared/Alert";
import { Img } from "react-image";
import PageLoader from "../shared/PageLoader";

const Blogs = props => {
  const [blogs, setBlogs] = useState([]);
  const [blogId, setBlogId] = useState("");
  const [deleteAlert, setDeleteAlert] = useState(false);

  useEffect(() => {
    const url = "/api/v1/blogs";
    fetch(url)
      .then(response => response.json())
      .then(response => {
        console.log(response);
        setBlogs(response);
      });
  }, [blogId]);

  const deleteBlog = id => {
    const url = `/api/v1/blogs/destroy/${id}`;
    const token = document.querySelector('meta[name="csrf-token"]').content;
    fetch(url, {
      method: "DELETE",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .catch(error => console.log(error.message));
    setBlogId(id);
    setDeleteAlert(true);
  };

  return (
    <>
      {deleteAlert ? (
        <Alert color="red" message="Blog deleted succesfully" />
      ) : null}
      <div className="grid grid-cols-4 grid-flow-row gap-4">
        {blogs.map(blog => {
          return (
            <div
              className="max-w-sm rounded overflow-hidden shadow-lg"
              key={blog.id}
            >
              <Link to={`/blogs/edit/${blog.id}`}>
                <Img
                  className="w-full"
                  src={"https://bit.ly/2Z4KKcF"}
                  alt="Blog image"
                  loader={<PageLoader />}
                />
              </Link>
              <div className="px-3 py-2 bg-white">
                <div className="font-bold text-xl mb-2">{blog.title}</div>
                <Dotdotdot clamp={3}>
                  <p className="text-gray-700 text-base">{blog.content}</p>
                </Dotdotdot>
              </div>
              <div className="px-3 py-2 bg-white lg:flex items-center justify-between">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                  {blog.author}
                </span>
                <span
                  onClick={() => deleteBlog(blog.id)}
                  className="inline-block bg-red-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 cursor-pointer"
                >
                  Delete
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Blogs;
