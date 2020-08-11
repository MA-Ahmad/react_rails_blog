import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../components/Home";
import Blogs from "../components/Blogs";
import Blog from "../components/Blog";
import NewBlog from "../components/NewBlog";
import Header from "../shared/Header";

export default (
  <Router>
    <Header />
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/blogs" exact component={Blogs} />
      <Route path="/blogs/:id" exact component={Blog} />
    </Switch>
  </Router>
);
