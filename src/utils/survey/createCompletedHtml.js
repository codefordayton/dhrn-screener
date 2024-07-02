const createListItemForProgram = ({ programName, isEligible }) => {
  if (!isEligible) return null;
  return (
    <li>{programName}</li>
  )
};

export const createCompletedHtml = ({
  isEligibleForCountyCorpHomeRepair,
  isEligibleForHabitatForHumanityARPAProgram,
  isEligibleForHabitatForHumanityEmergencyHomeRepair,
  isEligibleForMiamiValleyCommunityActionPartnershipEmergencyHomeRepair,
  isEligibleForMiamiValleyCommunityActionPartnershipWeatherization,
  isEligibleForRebuildingTogetherDayton,
  isEligibleForRebuildingTogetherDaytonARPAProgram,
  goBack,
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

  return (
    <>
      <div className="h-screen">
        <div className="bg-white p-6  md:mx-auto">
          <svg
            viewBox="0 0 24 24"
            className="text-green-600 w-16 h-16 mx-auto my-6"
          >
            <path
              fill="currentColor"
              d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
            ></path>
          </svg>
          <div className="text-center">
            <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
              Thank you for completing the survey!
            </h3>
            <p className="text-gray-600 my-2">Dayton Home Repair Network</p>
            {isEligibleForAtLeastOne ? (
              <p>You may be eligible for the following programs:</p>
            ) : (
              <p>You are not eligible for any programs.</p>
            )}
            <ul>
              {createListItemForProgram({
                isEligible:
                  isEligibleForMiamiValleyCommunityActionPartnershipWeatherization,
                programName:
                  "Miami Valley Community Action Partnership Weatherization",
              })}
              {createListItemForProgram({
                isEligible: isEligibleForHabitatForHumanityEmergencyHomeRepair,
                programName: "Habitat for Humanity Emergency Home Repair",
              })}
              {createListItemForProgram({
                isEligible: isEligibleForCountyCorpHomeRepair,
                programName: "County Corp Home Repair",
              })}
              {createListItemForProgram({
                isEligible:
                  isEligibleForMiamiValleyCommunityActionPartnershipEmergencyHomeRepair,
                programName:
                  "Miami Valley Community Action Partnership Emergency Home Repair",
              })}
              {createListItemForProgram({
                isEligible: isEligibleForRebuildingTogetherDayton,
                programName: "Rebuilding Together Dayton",
              })}
              {createListItemForProgram({
                isEligible: isEligibleForHabitatForHumanityARPAProgram,
                programName: "Habitat for Humanity ARPA",
              })}
              {createListItemForProgram({
                isEligible: isEligibleForRebuildingTogetherDaytonARPAProgram,
                programName: "Rebuilding Together Dayton ARPA",
              })}
            </ul>
            <div className="py-10 text-center">
              <a
                href="#"
                className="px-12 bg-blue-500 hover:bg-indigo-500 text-white font-semibold py-3"
                onClick={goBack}
              >
                GO BACK
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
