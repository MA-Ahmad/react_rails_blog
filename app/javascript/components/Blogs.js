import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Dotdotdot from "react-dotdotdot";
import Alert from "../shared/Alert";
import { Img } from "react-image";
import PageLoader from "../shared/PageLoader";

const Blogs = props => {
  const [isDataUpdated, setIsDataUpdated] = useState(props.isDataUpdated);
  const [blogs, setBlogs] = useState([]);
  const [createAlert, setCreateAlert] = useState(props.createAlert);
  const [editAlert, setEditAlert] = useState(props.editAlert);
  const [showAlert, setShowAlert] = useState(false);
  const [color, setColor] = useState("");
  const [message, setMessage] = useState("");

  const fetchRequest = () => {
    const url = "/api/v1/blogs";
    fetch(url)
      .then(response => response.json())
      .then(response => {
        setBlogs(response);
      });
    setIsDataUpdated(false);
  };

  useEffect(() => {
    if (createAlert) {
      setShowAlert(true);
      setColor("teal");
      setMessage("Blog created successfully");
    } else if (editAlert) {
      setShowAlert(true);
      setColor("teal");
      setMessage("Blog updated successfully");
    }
    fetchRequest();
  }, [isDataUpdated]);

  const deleteBlog = id => {
    const token = document.querySelector('meta[name="csrf-token"]').content;
    fetch(`/api/v1/blogs/destroy/${id}`, {
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
      .then(() => props.history.push("/"))
      .catch(error => console.log(error.message));
    // setBlogId(id);
    setIsDataUpdated(true);
    setShowAlert(true);
    setColor("red");
    setMessage("Blog deleted successfully");
    setEditAlert(false);
    setCreateAlert(false);
  };

  return (
    <>
      {showAlert ? <Alert color={color} message={message} /> : null}
      <div className="grid grid-cols-4 grid-flow-row gap-4">
        {blogs &&
          blogs.map(blog => {
            return (
              <div
                className="max-w-sm rounded overflow-hidden shadow-lg"
                key={blog.id}
              >
                <Link to={`/blogs/${blog.id}`}>
                  <Img
                    className="w-full"
                    src={"https://bit.ly/2Z4KKcF"}
                    alt="Blog image"
                    loader={<PageLoader />}
                  />
                </Link>
                <div className="px-3 py-2 bg-white h-32">
                  <div className="font-bold text-xl mb-2 truncate">
                    {blog.title}
                  </div>
                  <Dotdotdot clamp={3}>
                    <p className="text-gray-700 text-base">{blog.content}</p>
                  </Dotdotdot>
                </div>
                <div className="px-3 py-2 bg-white lg:flex items-center justify-between">
                  <span
                    className="inline-block bg-green-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 truncate"
                    style={{ maxWidth: "8rem" }}
                  >
                    {blog.author}
                  </span>

                  <div>
                    <Link to={`/blogs/edit/${blog.id}`}>
                      <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 cursor-pointer">
                        Edit
                      </span>
                    </Link>
                    <span
                      onClick={() => deleteBlog(blog.id)}
                      className="inline-block bg-red-200 rounded-full px-3 py-1 ml-2 text-sm font-semibold text-gray-700 cursor-pointer"
                    >
                      Delete
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Blogs;
