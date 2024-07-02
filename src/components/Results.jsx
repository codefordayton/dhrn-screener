import React from "react";
// import { checkARPA, checkCountyCorp, checkHabitatForHumanity, checkRebuildingTogether, checkMVCAP } from "../utils/calculations";
// import ResultEntry from "./ResultEntry";
import {
  miamiValleyCommunityActionPartnershipWeatherization,
  habitatForHumanityEmergencyHomeRepair,
  countyCorpHomeRepair,
  miamiValleyCommunityActionPartnershipEmergencyHomeRepair,
  rebuildingTogetherDayton,
  habitatForHumanityARPAProgram,
  rebuildingTogetherDaytonARPAProgram,
} from "../utils/program";
import { createCompletedHtml } from "../utils/survey/createCompletedHtml";

const sendmailEndpoint =
  "https://faas-nyc1-2ef2e6cc.doserverless.co/api/v1/web/fn-72f50c41-0f6d-47f1-a509-bfc5cbc49013/dhrn/sendmail";
export default function Results({ surveyData, addressData, county, goBack }) {
  console.log("Results", surveyData, addressData, county);

  function handleCreateCompletionScreen(surveyData) {
    console.log("Survey", surveyData);
    const isEligibleForMiamiValleyCommunityActionPartnershipWeatherization =
      miamiValleyCommunityActionPartnershipWeatherization(surveyData);

    const isEligibleForHabitatForHumanityEmergencyHomeRepair =
      habitatForHumanityEmergencyHomeRepair(surveyData);

    const isEligibleForCountyCorpHomeRepair = countyCorpHomeRepair(surveyData);

    const isEligibleForMiamiValleyCommunityActionPartnershipEmergencyHomeRepair =
      miamiValleyCommunityActionPartnershipEmergencyHomeRepair(surveyData);

    const isEligibleForRebuildingTogetherDayton =
      rebuildingTogetherDayton(surveyData);

    const isEligibleForHabitatForHumanityARPAProgram =
      habitatForHumanityARPAProgram(surveyData);

    const isEligibleForRebuildingTogetherDaytonARPAProgram =
      rebuildingTogetherDaytonARPAProgram(surveyData);

    return createCompletedHtml({
      isEligibleForCountyCorpHomeRepair,
      isEligibleForHabitatForHumanityARPAProgram,
      isEligibleForHabitatForHumanityEmergencyHomeRepair,
      isEligibleForMiamiValleyCommunityActionPartnershipEmergencyHomeRepair,
      isEligibleForMiamiValleyCommunityActionPartnershipWeatherization,
      isEligibleForRebuildingTogetherDayton,
      isEligibleForRebuildingTogetherDaytonARPAProgram,
      goBack,
    });
  }

  return (
    <main className="p-6 mb-12">
      <div>Survey Complete</div>
      {handleCreateCompletionScreen({
        ...surveyData,
        ...addressData,
        county,
        goBack,
      })}
    </main>
  );
}
