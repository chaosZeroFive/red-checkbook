import React, { useState, useContext, useEffect } from "react";
import PlanContext from "../../context/plan/planContext";

const PlanForm = () => {
  const planContext = useContext(PlanContext);

  const { addPlan, updatePlan, clearCurrent, current } = planContext;

  useEffect(() => {
    if (current !== null) {
      setPlan(current);
    } else {
      setPlan({
        name: "",
        type: ""
      });
    }
  }, [planContext, current]);

  const [plan, setPlan] = useState({
    name: "",
    type: ""
  });

  const { name, type } = plan;

  const onChange = e => setPlan({ ...plan, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (current === null) {
      addPlan(plan);
    } else {
      updatePlan(plan);
    }
    clearAll();
  };

  const clearAll = () => {
    clearCurrent();
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className="text-primary">{current ? "Edit Plan" : "Add Plan"}</h2>
      <input
        type="text"
        placeholder="Name"
        name="name"
        value={name}
        onChange={onChange}
      />
      <h5>Plan Type</h5>
      <input
        type="radio"
        name="type"
        value="WARNORD"
        checked={type === "WARNORD"}
        onChange={onChange}
      />{" "}
      Warning Order{" "}
      <input
        type="radio"
        name="type"
        value="OPORD"
        checked={type === "OPORD"}
        onChange={onChange}
      />{" "}
      Operations Order
      <div>
        <input
          type="submit"
          value={current ? "Update Plan" : "Add Plan"}
          className="btn btn-primary btn-block"
        />
      </div>
      {current && (
        <div>
          <button className="btn btn-light btn-block" onClick={clearAll}>
            Clear
          </button>
        </div>
      )}
    </form>
  );
};

export default PlanForm;
