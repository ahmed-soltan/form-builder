import { getFormStates } from "@/actions/form";
import React from "react";
import StatesCards from "./states-cards";

const CardStatesWrapper = async () => {
  const states = await getFormStates();

  return (
    <StatesCards
      visits={states.visits}
      submissions={states.submissions}
      submissionsRate={states.submissionsRate}
      bounceRate={states.bounceRate}
      loading={false}
    />
  );
};

export default CardStatesWrapper;
