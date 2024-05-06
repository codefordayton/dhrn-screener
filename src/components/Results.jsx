import React from "react";
import { FunctionFactory } from "survey-core";

const sendmailEndpoint =
  "https://faas-nyc1-2ef2e6cc.doserverless.co/api/v1/web/fn-72f50c41-0f6d-47f1-a509-bfc5cbc49013/dhrn/addresses";

export default function Results({ surveyData, addressData }) {
  console.log("Results", surveyData, addressData);

  function getIncomeThreshold(numPeople, thresholdType) {
    // index 0 corresponds to 1 person, index 1 to 2 people, etc.
    const thresholds = [
      {
        fpl300: 43740,
        fpl200: 29160,
        fpl175: 25515,
        ami80: 49850,
        ami60: 38850,
        ami50: 31150,
      },
      {
        fpl300: 59160,
        fpl200: 39440,
        fpl175: 34510,
        ami80: 57000,
        ami60: 44400,
        ami50: 35600,
      },
      {
        fpl300: 74580,
        fpl200: 49720,
        fpl175: 43505,
        ami80: 64100,
        ami60: 49950,
        ami50: 40050,
      },
      {
        fpl300: 90000,
        fpl200: 60000,
        fpl175: 52500,
        ami80: 71200,
        ami60: 55450,
        ami50: 44500,
      },
      {
        fpl300: 105420,
        fpl200: 70280,
        fpl175: 61495,
        ami80: 76900,
        ami60: 59900,
        ami50: 48100,
      },
      {
        fpl300: 120840,
        fpl200: 80560,
        fpl175: 70490,
        ami80: 82600,
        ami60: 64350,
        ami50: 51650,
      },
      {
        fpl300: 136260,
        fpl200: 90840,
        fpl175: 79485,
        ami80: 88300,
        ami60: 68800,
        ami50: 55200,
      },
      {
        fpl300: 151680,
        fpl200: 101120,
        fpl175: 88480,
        ami80: 94000,
        ami60: 73200,
        ami50: 58750,
      },
    ];
    if (numPeople < 1 || numPeople > 8) {
      numPeople = 8;
    }
    return thresholds[numPeople - 1][thresholdType];
  }

  function checkARPA(data) {
    const results = [];
    // neighborhood
    results.push({
      eligible: null,
      message:
        "Your property must be located in one of the eligible neighborhoods.",
    });
    // own home
    results.push({ eligible: data.ownHome, message: "You must own the home." });
    // home owner occupied
    results.push({
      eligible: !data.otherProperties,
      message: "You must live in the home.",
    });
    // maybe duplexes
    if (data.homeType === "Single Family") {
      results.push({
        eligible: true,
        message: "Single family homes are eligible.",
      });
    } else {
      results.push({
        eligible: null,
        message: "Duplexes are accepted on a case-by-case basis.",
      });
    }
    // name on deed
    results.push({
      eligible: data.nameOnDeed,
      message: "The name on the deed must match the applicant.",
    });
    // taxes up to date
    results.push({
      eligible: data.taxesUpToDate,
      message: "Property taxes must be up to date or on a payment plan.",
    });
    // in home for more than a year
    results.push({
      eligible: null,
      message: "You must have lived in the home for at least one year.",
    });

    const isEligible = !results.some((result) => result.eligible === false);
    console.log("ARPA Results", results, isEligible);
    return { name: "ARPA Program", eligible: isEligible, data: results };
  }

  function checkCountyCorp(data) {
    const results = [];
    // 80% AMI
    const incomeThreshold = getIncomeThreshold(data.familyMembers, "ami80");
    results.push({eligible: (data.income >= incomeThreshold), message: "Your must be below 80% AMI to qualify."});
    // montgomery county
    results.push({
      eligible: null,
      message: "You must be located in Montgomery County.",
    });
    // own home
    results.push({ eligible: data.ownHome, message: "You must own the home." });
    // single family home
    results.push({
      eligible: data.homeType === "Single Family",
      message: "Single family homes are eligible.",
    });
    // require insurance
    results.push({
      eligible: data.insurance,
      message: "You must have homeowners insurance.",
    });
    // can't have done the progam in the last 2 years
    results.push({
      eligible: !data.weatherized,
      message:
        "You can't have participated in the program in the last two years.",
    });

    const isEligible = !results.some((result) => result.eligible === false);
    console.log("County Corp Results", results, isEligible);
    return { name: "County Corp Home Repair", eligible: isEligible, data: results };
  }

  function checkRebuildingTogether(data) {
    const results = [];
    // 200% FPL 
    const incomeThreshold = getIncomeThreshold(data.familyMembers, "fpl200");
    results.push({eligible: (data.income >= incomeThreshold), message: "Your must be below 200% FPL to qualify."});
    // montgomery county
    results.push({
      eligible: null,
      message: "You must be located in Montgomery County.",
    });
    // own home
    results.push({ eligible: data.ownHome, message: "You must own the home." });
    // single family home
    results.push({
      eligible: data.homeType === "Single Family",
      message: "Single family homes are eligible.",
    });
    // older than 60
    results.push({
      eligible: data.age > 60,
      message: "Preference given for home owners over 60 years old.",
    });
    // can't have done the progam in the last 2 years
    results.push({
      eligible: !data.weatherized,
      message:
        "You can't have participated in the program in the last two years.",
    });

    const isEligible = !results.some((result) => result.eligible === false);
    console.log("Rebuilding Together Results", results, isEligible);
    return { name: "Rebuilding Together Dayton", eligible: isEligible, data: results };
  }

  function checkHabitatForHumanity(data) {
    const results = [];
    // clark, greene, or montgomery county
    results.push({
      eligible: null,
      message: "You must be located in Clark, Greene, or Montgomery County.",
    });
    // own home
    results.push({ eligible: data.ownHome, message: "You must own the home." });
    // single family home
    results.push({
      eligible: data.homeType === "Single Family",
      message: "Single family homes are eligible.",
    });
    // require insurance
    results.push({
      eligible: data.insurance,
      message: "You must have homeowners insurance.",
    });
    // can't have done the progam in the last 2 years
    results.push({
      eligible: !data.weatherized,
      message:
        "You can't have participated in the program in the last two years.",
    });

    const isEligible = !results.some((result) => result.eligible === false);
    console.log("Habitat for Humanity Results", results, isEligible);
    return { name: "Habitat for Humanity Emergency Home Repair", eligible: isEligible, data: results };
  }

  function checkMVCAP(data) {
    const results = [];
    // centerpoint at 300%, otherwise 200% FPL 
    const threshold = data.centerpoint ? "fpl300" : "fpl200";
    const incomeThreshold = getIncomeThreshold(data.familyMembers, threshold);
    results.push({eligible: (data.income >= incomeThreshold), message: "Your must be below 200% FPL to qualify. Centerpoint has a program with a 300% FPL threshold."});
    // montgomery, mercer, auglaize, darke, miami, preble, greene, butler, warren county
    results.push({
      eligible: null,
      message:
        "You must be located in Mercer, Auglaize, Darke, Miami, Preble, Butler, Warren, Greene, or Montgomery County.",
    });
    // can't have done the program before
    results.push({
      eligible: !data.weatherized,
      message: "You can't have participated in the program before.",
    });
    // Centerpoint additional funding
    results.push({
      eligible: data.centerpoint,
      message: "You may be eligible for additional funding from Centerpoint.",
    });

    const isEligible = !results.some((result) => result.eligible === false);
    console.log("MVCAP Results", results, isEligible);
    return { name: "Miami Valley Community Action Partnership Weatherization", eligible: isEligible, data: results };
  }

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
              {result.name}: {result.eligible ? "Eligible" : "Not Eligible"}
              <ul>
                {result.data.map((item) => (
                  <li key={item.message}>
                    {item.message}: {item.eligible ? "Eligible" : "Not Eligible"}
                  </li>
                ))}
              </ul>
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
