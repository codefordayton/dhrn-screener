import React from "react";
import { FunctionFactory } from "survey-core";
import { checkARPA, checkCountyCorp, checkHabitatForHumanity, checkRebuildingTogether, checkMVCAP } from "../utils/calculations";
import ResultEntry from "./ResultEntry";

// const sendmailEndpoint =
//   "https://faas-nyc1-2ef2e6cc.doserverless.co/api/v1/web/fn-72f50c41-0f6d-47f1-a509-bfc5cbc49013/dhrn/addresses";

export default function Results({ surveyData, addressData, county }) {
  console.log("Results", surveyData, addressData, county);

  function generateResults() {
    // This is where we would generate the results based on the survey data.
    // For now, we'll just return a placeholder.
    const results = [];
    results.push(checkARPA(surveyData));
    results.push(checkCountyCorp(surveyData, county));
    results.push(checkRebuildingTogether(surveyData, county));
    results.push(checkHabitatForHumanity(surveyData, county));
    results.push(checkMVCAP(surveyData, county));

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
    <main className="p-6 mb-12">
      <div>Survey Complete</div>
      <p>
        This page will provide some info on if you are likely to be eligible.
      </p>
      {generateResults()}
    </main>
  );
}
