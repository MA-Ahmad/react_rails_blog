import React, { useEffect, useState } from "react";
import Dotdotdot from "react-dotdotdot";

const Blogs = props => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const url = "/api/v1/blogs";
    fetch(url)
      .then(response => response.json())
      .then(response => {
        console.log(response);
        setBlogs(response);
      });
  }, []);

  return (
    <div className="container mx-auto my-3">
      <div className="grid grid-cols-4 grid-flow-row gap-4">
        {blogs.map(blog => {
          return (
            <div
              className="max-w-sm rounded overflow-hidden shadow-lg"
              key={blog.id}
            >
              <img
                className="w-full"
                src="https://bit.ly/2Z4KKcF"
                alt="Sunset in the mountains"
              />
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
                <span className="inline-block bg-red-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                  Delete
                </span>
              </div>
            </div>
          );
        })}
      </div>
      {/* <div className="flex mb-4">
        <div className="max-w-sm rounded overflow-hidden shadow-lg">
          <img
            className="w-full"
            src="https://bit.ly/2Z4KKcF"
            alt="Sunset in the mountains"
          />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">The Coldest Sunset</div>
            <p className="text-gray-700 text-base">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Voluptatibus quia, nulla! Maiores et perferendis eaque,
              exercitationem praesentium nihil.
            </p>
          </div>
          <div className="px-3 py-2">
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
              #photography
            </span>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
              #travel
            </span>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
              #winter
            </span>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Blogs;
