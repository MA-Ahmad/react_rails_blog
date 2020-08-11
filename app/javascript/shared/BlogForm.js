import React, { useState, useEffect } from "react";
import Alert from "./Alert";

const BlogForm = ({ match, editMode }) => {
  const [alert, setAlert] = useState(false);
  const [color, setColor] = useState("");
  const [message, setMessage] = useState("");

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (editMode) {
      fetch(`/api/v1/blogs/edit/${match.params.id}`)
        .then(response => response.json())
        .then(response => {
          setTitle(response.title);
          setAuthor(response.author);
          setContent(response.content);
        });
    }
  }, [editMode]);

  const handleSubmit = event => {
    event.preventDefault();
    const title = event.target.title.value;
    const author = event.target.author.value;
    const content = event.target.content.value;
    let msg = "Blog created successfully";

    if (title.length == 0 || author.length == 0 || content.length == 0) {
      setAlert(true);
      setColor("red");
      msg = "Please fill the required fields";
      setMessage(msg);
    } else {
      const body = {
        title,
        author,
        content: content.replace(/\n/g, "<br> <br>")
      };

      const url = editMode
        ? `/api/v1/blogs/update/${match.params.id}`
        : "/api/v1/blogs/create";
      const token = document.querySelector('meta[name="csrf-token"]').content;
      fetch(url, {
        method: editMode ? "PUT" : "POST",
        headers: {
          "X-CSRF-Token": token,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      })
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Network response was not ok.");
        })
        .catch(error => console.log(error.message));

      setAlert(true);
      setColor("teal");
      if (editMode) {
        msg = "Blog updated successfully";
      } else {
        setTitle("");
        setAuthor("");
        setContent("");
      }
      setMessage(msg);
    }
  };

  return (
    <>
      {alert ? <Alert color={color} message={message} /> : null}
      <div className="lg:flex items-center justify-center">
        <div className="w-full max-w-md">
          <form
            className="bg-white shadow-md rounded px-6 pt-6 pb-8 mb-4"
            onSubmit={handleSubmit}
          >
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="title"
              >
                Title<span className="color-red">*</span>
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="title"
                type="text"
                placeholder="Title"
                value={title}
                onChange={e => setTitle(e.target.value)}
              />
            </div>
            <div className="mb-2">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="author"
              >
                Author<span className="color-red">*</span>
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="author"
                type="text"
                placeholder="Author"
                value={author}
                onChange={e => setAuthor(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="content"
              >
                Content
              </label>
              <textarea
                className="h-24 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="content"
                type="text"
                placeholder="Content"
                value={content}
                onChange={e => setContent(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                {editMode ? "Update" : "Create"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default BlogForm;
