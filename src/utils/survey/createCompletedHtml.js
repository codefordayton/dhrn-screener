const createEligibleHtml = () => {
    return (
      <>
          <p className="mt-8">Based on this screening, you should be eligible for one or more Dayton Home Repair Network programs.</p>
          <p className="mt-2">A DEC staff member will receive your information and reach out to you.</p>
      </>
    )
  };

const createNotEligibleHtml = () => {
  return (
    <>
      <p className="mb-4">Unfortunately, you are likely not eligible for any programs included in the DHRN. There are other programs that are available. A staff member from Dayton Energy Collaborative will be reaching out to you soon.</p>
      <p>Here are some other resources that may be helpful:</p>
      <p><a className="underline" href="https://loganco.nyc3.digitaloceanspaces.com/Resources%20for%20Clients.pdf">Client Resources</a></p>
    </>
  )
};

const createNotEligibleDueToFinancesHtml = () => {
  return (
    <>
      <p className="mb-4">Unfortunately, your reported income is too high to be eligible for any of the programs included in the DHRN. There are other programs that are available.A staff member from Dayton Energy Collaborative will be reaching out to you soon.</p>
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
