const createListItemForProgram = ({ programName, programLink, isEligible }) => {
  if (isEligible === "notEligible" || isEligible === "notEligibleFinancial") return null;
  if (programLink) {
    return (
      <li>
        <a className="text-xl/8 underline" href={programLink} target="_blank" rel="noreferrer">
          {programName}
        </a>
      </li>
    );
  }
  return <li className="text-xl/8">{programName}</li>
};

const createEligibleHtml = (isEligibleForCountyCorpHomeRepair,
  isEligibleForHabitatForHumanityARPAProgram,
  isEligibleForHabitatForHumanityEmergencyHomeRepair,
  isEligibleForMiamiValleyCommunityActionPartnershipEmergencyHomeRepair,
  isEligibleForMiamiValleyCommunityActionPartnershipWeatherization,
  isEligibleForRebuildingTogetherDayton,
  isEligibleForRebuildingTogetherDaytonARPAProgram) => {
    return (
      <>
          <p className="mb-4">You may be eligible for the following programs:</p>
          <ul>
            {createListItemForProgram({
              isEligible:
                isEligibleForMiamiValleyCommunityActionPartnershipWeatherization,
              programName: 
                "Miami Valley Community Action Partnership Weatherization",
              programLink: "https://miamivalleycap.org/weatherization/",
            })}
            {createListItemForProgram({
              isEligible: isEligibleForHabitatForHumanityEmergencyHomeRepair,
              programName: "Habitat for Humanity Emergency Home Repair",
              programLink: "https://daytonhabitat.org/what-we-do/critical-repairs.html/",
            })}
            {createListItemForProgram({
              isEligible: isEligibleForCountyCorpHomeRepair,
              programName: "County Corp Home Repair",
              programLink: "https://countycorp.com/programs/consumer-housing-programs/home-repair/",
            })}
            {createListItemForProgram({
              isEligible:
                isEligibleForMiamiValleyCommunityActionPartnershipEmergencyHomeRepair,
              programName:
                "Miami Valley Community Action Partnership Emergency Home Repair",
              programLink: "https://miamivalleycap.org/home-repair/",
            })}
            {createListItemForProgram({
              isEligible: isEligibleForRebuildingTogetherDayton,
              programName: "Rebuilding Together Dayton",
              programLink: "https://www.rtdayton.org/",
            })}
            {createListItemForProgram({
              isEligible: isEligibleForHabitatForHumanityARPAProgram,
              programName: "Habitat for Humanity American Rescue Plan Act (ARPA) Program",
              programLink: null,
            })}
            {createListItemForProgram({
              isEligible: isEligibleForRebuildingTogetherDaytonARPAProgram,
              programName: "Rebuilding Together Dayton American Rescue Plan Act (ARPA) Program",
              programLink: null,
            })}
          </ul>
          <p className="mt-8">Your information has been provided to the Dayton Home Repair Network administrators. They will be in touch soon.</p>
      </>
    )
  };

const createNotEligibleHtml = () => {
  return (
    <>
      <p className="mb-4">Unfortunately, you are likely not eligible for any programs included in the DHRN. There are other programs that are available.</p>
      <p>Here are some other resources that may be helpful:</p>
      <p><a className="underline" href="https://loganco.nyc3.digitaloceanspaces.com/Resources%20for%20Clients.pdf">Client Resources</a></p>
    </>
  )
};

const createNotEligibleDueToFinancesHtml = () => {
  return (
    <>
      <p className="mb-4">Unfortunately, your reported income is too high to be eligible for any of the programs included in the DHRN. There are other programs that are available.</p>
      <p>Here are some other resources that may be helpful:</p>
      <p><a className="underline" href="https://loganco.nyc3.digitaloceanspaces.com/Resources%20for%20Clients.docx">Inflation Reduction Act Documentation</a></p>
      <p><a className="underline" href="https://loganco.nyc3.digitaloceanspaces.com/Resources%20for%20Clients.pdf">Client Resources</a></p>
    </>
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
  ].includes("eligible");

  const isNotEligibleDueToFinances = [
    isEligibleForCountyCorpHomeRepair,
    isEligibleForHabitatForHumanityARPAProgram,
    isEligibleForHabitatForHumanityEmergencyHomeRepair,
    isEligibleForMiamiValleyCommunityActionPartnershipEmergencyHomeRepair,
    isEligibleForMiamiValleyCommunityActionPartnershipWeatherization,
    isEligibleForRebuildingTogetherDayton,
    isEligibleForRebuildingTogetherDaytonARPAProgram,
  ].includes("notEligibleFinancial");

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
      {isEligibleForAtLeastOne ? (
        createEligibleHtml(isEligibleForCountyCorpHomeRepair,
          isEligibleForHabitatForHumanityARPAProgram,
          isEligibleForHabitatForHumanityEmergencyHomeRepair,
          isEligibleForMiamiValleyCommunityActionPartnershipEmergencyHomeRepair,
          isEligibleForMiamiValleyCommunityActionPartnershipWeatherization,
          isEligibleForRebuildingTogetherDayton,
          isEligibleForRebuildingTogetherDaytonARPAProgram)
      ) : isNotEligibleDueToFinances ? (createNotEligibleDueToFinancesHtml()
      ) : (createNotEligibleHtml()
      )}
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
