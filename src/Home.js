import React, { useState } from "react";

import Navigation from "./Navigation";
import Enrollment from "./Enrollment";
import Recipe from "./Recipe";

const Home = ({ setView }) => {
  const [status, setStatus] = useState("enrollment");
  return (
    <>
      <Navigation setView={setView} setStatus={setStatus} />
      {status === "enrollment" && <Enrollment setStatus={setStatus} />}
      {status === "recipe" && <Recipe />}
    </>
  );
};

export default Home;
