import React, { Fragment, useContext, useEffect } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import PlanItem from "./PlanItem";
import Spinner from "../layout/Spinner";
import PlanContext from "../../context/plan/planContext";

const Plans = () => {
  const planContext = useContext(PlanContext);

  const { plans, filtered, getPlans, loading } = planContext;

  useEffect(() => {
    getPlans();
    // eslint-disable-next-line
  }, []);

  if (plans !== null && plans.length === 0 && !loading) {
    return <h4>Please add a Plan</h4>;
  }

  return (
    <Fragment>
      {plans !== null && !loading ? (
        <TransitionGroup>
          {filtered !== null
            ? filtered.map(plan => (
                <CSSTransition key={plan._id} timeout={500} classNames="item">
                  <planItem plan={plan} />
                </CSSTransition>
              ))
            : plans.map(plan => (
                <CSSTransition key={plan._id} timeout={500} classNames="item">
                  <PlanItem plan={plan} />
                </CSSTransition>
              ))}
        </TransitionGroup>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

export default Plans;
