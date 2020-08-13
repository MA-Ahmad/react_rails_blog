// import Routes from "../routes/Index";

// export default () => <>{Routes}</>;

import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Home";
import Blogs from "./Blogs";
import Blog from "./Blog";
import BlogForm from "../shared/BlogForm";
import Header from "../shared/Header";

const App = () => {
  const [isDataUpdated, setIsDataUpdated] = useState(false);
  const [editAlert, setEditAlert] = useState(false);
  const [createAlert, setCreateAlert] = useState(false);

  const handleData = status => {
    setIsDataUpdated(status);
  };

  const handleEditAlert = status => {
    setEditAlert(status);
  };

  const handleCreateAlert = status => {
    setCreateAlert(status);
  };

  return (
    <Router>
      <Header />
      <div className="container mx-auto my-3">
        <Switch>
          <Route
            path="/"
            exact
            render={props => {
              return (
                <Home
                  {...props}
                  isDataUpdated={isDataUpdated}
                  handleData={handleData}
                  editAlert={editAlert}
                  createAlert={createAlert}
                />
              );
            }}
          />
          <Route
            path="/blogs"
            exact
            render={props => {
              return (
                <Blogs
                  {...props}
                  isDataUpdated={isDataUpdated}
                  handleData={handleData}
                  editAlert={editAlert}
                  createAlert={createAlert}
                />
              );
            }}
          />
          <Route
            path="/blogs/edit/:id"
            exact
            render={props => {
              return (
                <BlogForm
                  {...props}
                  editMode={true}
                  handleData={handleData}
                  handleEditAlert={handleEditAlert}
                  handleCreateAlert={handleCreateAlert}
                />
              );
            }}
          />
          <Route
            path="/blogs/new"
            exact
            render={props => {
              return (
                <BlogForm
                  {...props}
                  editMode={false}
                  handleData={handleData}
                  handleCreateAlert={handleCreateAlert}
                  handleEditAlert={handleEditAlert}
                />
              );
            }}
          />
          <Route path="/blogs/:id" exact component={Blog} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
