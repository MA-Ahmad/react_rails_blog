import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../components/Home";
import Blogs from "../components/Blogs";
import Blog from "../components/Blog";
import BlogForm from "../shared/BlogForm";
import Header from "../shared/Header";

export default (
  <Router>
    <Header />
    <div className="container mx-auto my-3">
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/blogs" exact component={Blogs} />
        <Route
          path="/blogs/edit/:id"
          exact
          render={props => {
            return <BlogForm {...props} editMode={true} />;
          }}
        />
        <Route
          path="/blogs/new"
          exact
          render={props => {
            return <BlogForm {...props} editMode={false} />;
          }}
        />
        <Route path="/blogs/:id" exact component={Blog} />
      </Switch>
    </div>
  </Router>
);
