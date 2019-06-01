import React, { useContext } from "react";
import PropTypes from "prop-types";
import PlanContext from "../../context/plan/planContext";

const PlanItem = ({ plan }) => {
  const planContext = useContext(PlanContext);
  const { deletePlan, setCurrent, clearCurrent } = planContext;

  const { _id, name, type } = plan;

  const onDelete = () => {
    deletePlan(_id);
    clearCurrent();
  };

  return (
    <div className="card bg-light">
      <h3 className="text-primary text-left">
        {name}{" "}
        <span
          style={{ float: "right" }}
          className={
            "badge " + (type === "OPORD" ? "badge-success" : "badge-primary")
          }>
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </span>
      </h3>
      <ul className="list" />
      <p>
        <button
          className="btn btn-dark btn-sm"
          onClick={() => setCurrent(plan)}>
          Edit
        </button>
        <button className="btn btn-danger btn-sm" onClick={onDelete}>
          Delete
        </button>
      </p>
    </div>
  );
};

PlanItem.propTypes = {
  plan: PropTypes.object.isRequired
};

export default PlanItem;
