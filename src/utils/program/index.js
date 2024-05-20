import {
  getPercentAMIForHouseholdSize,
  getPercentFPLForHouseholdSize,
} from "../income";

/**
 * User information object.
 *
 * @typedef {Object} UserInfo
 * @property {boolean} ownHome - Indicates if the individual owns the home.
 * @property {boolean} nameOnLease  - Indicates if the individual's name is on the deed.
 * @property {boolean} taxesUpToDate - Indicates if taxes are up to date.
 * @property {'single'|'duplex'|'other'} homeType - Type of home (single, duplex, other).
 * @property {boolean} insurance - Indicates if the individual has home insurance.
 * @property {boolean} weatherized - Indicates if the home was previously weatherized by another program.
 * @property {string} name - name of the individual.
 * @property {string} address - Address of the individual.
 * @property {number} income - Monthly income of the individual.
 * @property {boolean} centerpoint - Indicates if central point gas is used.
 * @property {string} email - Email address of the individual.
 * @property {string} phone - Phone number of the individual.
 * @property {number} age - applicant age
 * @property {number} familyMembers - number of ppl in house
 * @property {boolean} receivedHelpInLast2Years - received help from any of the programs within last 2 years
 * @property {boolean} hasLivedInHomeOver1Year - applicant has lived in home for over a year
 * @property {boolean} arpaNeighborhood - applicant is in ARPA neighborhood
 * @property {string} county - county of residence
 */

// --------------------------------------------------------------------
// Program Eligibility Functions
// --------------------------------------------------------------------

/**
 * Check if the given user (row)
 * is eligible for:
 * "Miami Valley Community Action Partnership Weatherization"
 *
 * @param {UserInfo} userInfo - User information object.
 * @returns {boolean} - Returns true if the individual is eligible for home repair assistance.
 */
export const miamiValleyCommunityActionPartnershipWeatherization = (
  userInfo
) => {
  const percentFPLForHouseholdSize = getPercentFPLForHouseholdSize({
    householdSize: userInfo.familyMembers,
    percent: "300%",
  });

  const meetsIncomeReq = userInfo.income * 12 < percentFPLForHouseholdSize;
  const inCounty = ["Montgomery", "Mercer", "Auglaize", "Darke", "Miami", "Preble", "Greene", "Butler", "Warren"].includes(userInfo.county);

  return meetsIncomeReq && !userInfo.weatherized && inCounty;
};

/**
 * Check if the given user (row)
 * is eligible for:
 * "Habitat for Humanity Emergency Home Repair"
 *
 * @param {UserInfo} userInfo - User information object.
 * @returns {boolean} - Returns true if the individual is eligible for home repair assistance.
 */
export const habitatForHumanityEmergencyHomeRepair = (userInfo) => {
  const percentAMIForHouseholdSize = getPercentAMIForHouseholdSize({
    householdSize: userInfo.familyMembers,
    percent: "60%",
  });

  const meetsIncomeReq = userInfo.income * 12 < percentAMIForHouseholdSize;
  const inCounty = ["Montgomery", "Greene", "Clark"].includes(userInfo.county);

  return (
    meetsIncomeReq && inCounty && userInfo.insurance && !userInfo.receivedHelpInLast2Years
  );
};

/**
 * Check if the given user (row)
 * is eligible for:
 * "County Corp Home Repair"
 *
 * @param {UserInfo} userInfo - User information object.
 * @returns {boolean} - Returns true if the individual is eligible for home repair assistance.
 */
export const countyCorpHomeRepair = (userInfo) => {
  const percentAMIForHouseholdSize = getPercentAMIForHouseholdSize({
    householdSize: userInfo.familyMembers,
    percent: "80%",
  });

  const meetsIncomeReq =
    userInfo.monthlyIncome * 12 < percentAMIForHouseholdSize;

  const inCounty = userInfo.county === "Montgomery";
  return (
    meetsIncomeReq &&
    userInfo.hasInsurance &&
    inCounty &&
    !userInfo.receivedHelpInLast2Years
  );
};

/**
 * Check if the given user (row)
 * is eligible for:
 * "Miami Valley Community Action Partnership Emergency Home Repair"
 *
 * @param {UserInfo} userInfo - User information object.
 * @returns {boolean} - Returns true if the individual is eligible for home repair assistance.
 */
export const miamiValleyCommunityActionPartnershipEmergencyHomeRepair = (
  userInfo
) => {
  const percentAMIForHouseholdSize = getPercentFPLForHouseholdSize({
    householdSize: userInfo.familyMembers,
    percent: "200%",
  });

  const meetsIncomeReq =
    userInfo.monthlyIncome * 12 < percentAMIForHouseholdSize;

  const inCounty = ["Montgomery", "Mercer", "Auglaize", "Darke", "Miami", "Preble", "Greene", "Butler", "Warren"].includes(userInfo.county);

  return meetsIncomeReq && !userInfo.receivedHelpInLast2Years && inCounty;
};

/**
 * Check if the given user (row)
 * is eligible for:
 * "Rebuilding Together Dayton"
 *
 * @param {UserInfo} userInfo - User information object.
 * @returns {boolean} - Returns true if the individual is eligible for home repair assistance.
 */
export const rebuildingTogetherDayton = (userInfo) => {
  const percentAMIForHouseholdSize = getPercentFPLForHouseholdSize({
    householdSize: userInfo.familyMembers,
    percent: "200%",
  });

  const meetsIncomeReq = userInfo.income * 12 < percentAMIForHouseholdSize;

  const inCounty = userInfo.county === "Montgomery";

  return (
    meetsIncomeReq && inCounty && userInfo.age >= 60 && !userInfo.receivedHelpInLast2Years
  );
};

/**
 * Check if the given user (row)
 * is eligible for:
 * "Habitat for Humanity ARPA program"
 *
 * @param {UserInfo} userInfo - User information object.
 * @returns {boolean} - Returns true if the individual is eligible for home repair assistance.
 */
export const habitatForHumanityARPAProgram = (userInfo) => {
  const inARPANeighborhood = userInfo.arpaNeighborhood;

  return (
    inARPANeighborhood &&
    userInfo.ownHome &&
    userInfo.nameOnLease &&
    userInfo.taxesUpToDate &&
    userInfo.hasLivedInHomeOver1Year
  );
};

/**
 * Check if the given user (row)
 * is eligible for:
 * "Rebuilding Together Dayton ARPA program"
 *
 * @param {UserInfo} userInfo - User information object.
 * @returns {boolean} - Returns true if the individual is eligible for home repair assistance.
 */
export const rebuildingTogetherDaytonARPAProgram = (userInfo) => {
  const inARPANeighborhood = userInfo.arpaNeighborhood;

  const inCounty = userInfo.county === "Montgomery";

  return (
    inARPANeighborhood &&
    userInfo.ownHome &&
    userInfo.homeType !== "other" &&
    userInfo.nameOnLease &&
    userInfo.taxesUpToDate &&
    inCounty && 
    userInfo.hasLivedInHomeOver1Year
  );
};
