import {
  miamiValleyCommunityActionPartnershipWeatherization,
  habitatForHumanityEmergencyHomeRepair,
  countyCorpHomeRepair,
  miamiValleyCommunityActionPartnershipEmergencyHomeRepair,
  rebuildingTogetherDayton,
  habitatForHumanityARPAProgram,
  rebuildingTogetherDaytonARPAProgram,
} from "../program";
import { createCompletedHtml } from "./createCompletedHtml";

export const handleCreateCompletionScreen = (survey) => (surveyModel) => {
  const isEligibleForMiamiValleyCommunityActionPartnershipWeatherization =
    miamiValleyCommunityActionPartnershipWeatherization(surveyModel.data);

  const isEligibleForHabitatForHumanityEmergencyHomeRepair =
    habitatForHumanityEmergencyHomeRepair(surveyModel.data);

  const isEligibleForCountyCorpHomeRepair = countyCorpHomeRepair(
    surveyModel.data
  );

  const isEligibleForMiamiValleyCommunityActionPartnershipEmergencyHomeRepair =
    miamiValleyCommunityActionPartnershipEmergencyHomeRepair(surveyModel.data);

  const isEligibleForRebuildingTogetherDayton = rebuildingTogetherDayton(
    surveyModel.data
  );

  const isEligibleForHabitatForHumanityARPAProgram =
    habitatForHumanityARPAProgram(surveyModel.data);

  const isEligibleForRebuildingTogetherDaytonARPAProgram =
    rebuildingTogetherDaytonARPAProgram(surveyModel.data);

  survey.completedHtml = createCompletedHtml({
    isEligibleForCountyCorpHomeRepair,
    isEligibleForHabitatForHumanityARPAProgram,
    isEligibleForHabitatForHumanityEmergencyHomeRepair,
    isEligibleForMiamiValleyCommunityActionPartnershipEmergencyHomeRepair,
    isEligibleForMiamiValleyCommunityActionPartnershipWeatherization,
    isEligibleForRebuildingTogetherDayton,
    isEligibleForRebuildingTogetherDaytonARPAProgram,
  });

  survey.render();
};
