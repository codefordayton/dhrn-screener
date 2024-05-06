import React from "react";
import { FunctionFactory } from "survey-core";
import { checkARPA, checkCountyCorp, checkHabitatForHumanity, checkRebuildingTogether, checkMVCAP } from "../utils/calculations";
import ResultEntry from "./ResultEntry";

// const sendmailEndpoint =
//   "https://faas-nyc1-2ef2e6cc.doserverless.co/api/v1/web/fn-72f50c41-0f6d-47f1-a509-bfc5cbc49013/dhrn/addresses";

export default function Results({ surveyData, addressData }) {
  console.log("Results", surveyData, addressData);

  function generateResults() {
    // This is where we would generate the results based on the survey data.
    // For now, we'll just return a placeholder.
    const results = [];
    results.push(checkARPA(surveyData));
    results.push(checkCountyCorp(surveyData));
    results.push(checkRebuildingTogether(surveyData));
    results.push(checkHabitatForHumanity(surveyData));
    results.push(checkMVCAP(surveyData));

    return (
      <>
        <h2>Results</h2>
        <ul>
          {results.map((result) => (
            <li key={result.name}>
              <ResultEntry data={result} />
            </li>
          ))}
        </ul>
      </>
    );
  }

  return (
    <>
      <div>Survey Complete</div>
      <p>
        This page will provide some info on if you are likely to be eligible.
      </p>
      {generateResults()}
    </>
  );
}
