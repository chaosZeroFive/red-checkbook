import React, { useContext, useRef, useEffect } from "react";
import PlanContext from "../../context/plan/planContext";

const PlanFilter = () => {
  const planContext = useContext(PlanContext);
  const text = useRef("");

  const { filterPlans, clearFilter, filtered } = PlanContext;

  useEffect(() => {
    if (filtered === null) {
      text.current.value = "";
    }
  });

  const onChange = e => {
    if (text.current.value !== "") {
      filterPlans(e.target.value);
    } else {
      clearFilter();
    }
  };

  return (
    <form>
      <input
        ref={text}
        type="text"
        placeholder="Filter Plans..."
        onChange={onChange}
      />
    </form>
  );
};

export default PlanFilter;
