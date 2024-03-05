const createListItemForProgram = ({ programName, isEligible }) => {
  if (!isEligible) return "";

  return `
    <li>${programName}</li>
  `;
};

export const createCompletedHtml = ({
  isEligibleForCountyCorpHomeRepair,
  isEligibleForHabitatForHumanityARPAProgram,
  isEligibleForHabitatForHumanityEmergencyHomeRepair,
  isEligibleForMiamiValleyCommunityActionPartnershipEmergencyHomeRepair,
  isEligibleForMiamiValleyCommunityActionPartnershipWeatherization,
  isEligibleForRebuildingTogetherDayton,
  isEligibleForRebuildingTogetherDaytonARPAProgram,
}) => {
  const isEligibleForAtLeastOne = [
    isEligibleForCountyCorpHomeRepair,
    isEligibleForHabitatForHumanityARPAProgram,
    isEligibleForHabitatForHumanityEmergencyHomeRepair,
    isEligibleForMiamiValleyCommunityActionPartnershipEmergencyHomeRepair,
    isEligibleForMiamiValleyCommunityActionPartnershipWeatherization,
    isEligibleForRebuildingTogetherDayton,
    isEligibleForRebuildingTogetherDaytonARPAProgram,
  ].includes(true);

  const eligibilityText = isEligibleForAtLeastOne
    ? "<p>You are eligible for:</p>"
    : "<p>You are not eligible for any programs.</p>";

  return `
    <h1>Dayton Home Repair Network</h1>
    <p>Thank you for completing the survey.</p>

    ${eligibilityText}

    <ul>
      ${createListItemForProgram({
        isEligible:
          isEligibleForMiamiValleyCommunityActionPartnershipWeatherization,
        programName: "Miami Valley Community Action Partnership Weatherization",
      })}
      ${createListItemForProgram({
        isEligible: isEligibleForHabitatForHumanityEmergencyHomeRepair,
        programName: "Habitat for Humanity Emergency Home Repair",
      })}
      ${createListItemForProgram({
        isEligible: isEligibleForCountyCorpHomeRepair,
        programName: "County Corp Home Repair",
      })}
      ${createListItemForProgram({
        isEligible:
          isEligibleForMiamiValleyCommunityActionPartnershipEmergencyHomeRepair,
        programName:
          "Miami Valley Community Action Partnership Emergency Home Repair",
      })}
      ${createListItemForProgram({
        isEligible: isEligibleForRebuildingTogetherDayton,
        programName: "Rebuilding Together Dayton",
      })}
      ${createListItemForProgram({
        isEligible: isEligibleForHabitatForHumanityARPAProgram,
        programName: "Habitat for Humanity ARPA",
      })}
      ${createListItemForProgram({
        isEligible: isEligibleForRebuildingTogetherDaytonARPAProgram,
        programName: "Rebuilding Together Dayton ARPA",
      })}
    </ul>
  `;
};
