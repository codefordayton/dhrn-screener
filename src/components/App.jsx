import { Model } from "survey-core";
import { Survey } from "survey-react-ui";
import "survey-core/defaultV2.min.css";
import { miamiValleyCommunityActionPartnershipWeatherization } from "../utils/program";

import surveyJSON from "../data/survey.json";

export default function App() {
  const survey = new Model(surveyJSON);

  // @TODO: move this into its own function?
  const handleCreateCompletionScreen = (surveyModel) => {
    const isEligibleForMiamiValleyCommunityActionPartnershipWeatherization =
      miamiValleyCommunityActionPartnershipWeatherization(surveyModel.data);

    const isEligibleForHabitatForHumanityEmergencyHomeRepair =
      habitatForHumanityEmergencyHomeRepair(surveyModel.data);

    const isEligibleForCountyCorpHomeRepair = countyCorpHomeRepair(
      surveyModel.data
    );

    const isEligibleForMiamiValleyCommunityActionPartnershipEmergencyHomeRepair =
      miamiValleyCommunityActionPartnershipEmergencyHomeRepair(
        surveyModel.data
      );

    const isEligibleForRebuildingTogetherDayton = rebuildingTogetherDayton(
      surveyModel.data
    );

    const isEligibleForHabitatForHumanityARPAProgram =
      habitatForHumanityARPAProgram(surveyModel.data);

    const isEligibleForRebuildingTogetherDaytonARPAProgram =
      rebuildingTogetherDaytonARPAProgram(surveyModel.data);

    // @TODO: break this down into more functions
    // @TODO: better HTML
    survey.completedHtml = `
      <h1>Congrats!</h1>
      <p>You are eligible for:</p>

      <ul>
        ${
          isEligibleForMiamiValleyCommunityActionPartnershipWeatherization &&
          "<li>Miami Valley Community Action Partnership Weatherization</li>"
        }
        ${
          isEligibleForHabitatForHumanityEmergencyHomeRepair &&
          "<li>Habitat for Humanity Emergency Home Repair</li>"
        }
        ${
          isEligibleForCountyCorpHomeRepair &&
          "<liCounty Corp Home Repair></li>"
        }
        ${
          isEligibleForMiamiValleyCommunityActionPartnershipEmergencyHomeRepair &&
          "<li>Miami Valley Community Action Partnership Emergency Home Repair</li>"
        }
        ${
          isEligibleForRebuildingTogetherDayton &&
          "<li>Rebuilding Together Dayton</li>"
        }
        ${
          isEligibleForHabitatForHumanityARPAProgram &&
          "<li>Habitat for Humanity ARPA</li>"
        }
        ${
          isEligibleForRebuildingTogetherDaytonARPAProgram &&
          "<li>Rebuilding Together Dayton ARPA</li>"
        }
      </ul>
    `;

    survey.render();
  };

  survey.onComplete.add(handleCreateCompletionScreen);

  return <Survey model={survey} />;
}
