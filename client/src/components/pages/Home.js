//REVISED: This fIle has been changed from the original

import React, { useContext, useEffect } from "react";
import Plans from "../plans/Plans";
import PlanForm from "../plans/PlanForm";
import PlanFilter from "../plans/PlanFilter";
import AuthContext from "../../context/auth/authContext";

const Home = () => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    authContext.loadUser();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="grid-2">
      <div>
        <PlanForm />
      </div>
      <div>
        <PlanFilter />
        <Plans />
      </div>
    </div>
  );
};

export default Home;
