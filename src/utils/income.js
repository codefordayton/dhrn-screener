/**
 * @param {Object} args
 * @param {number} args.householdSize - The size of the household.
 * @param {"300%"|"200%"|"175%"} args.percent - percent of FPL
 */
export const getPercentFPLForHouseholdSize = ({
  householdSize = 1,
  percent,
}) => {
  const federalPovertyLineByHouseholdSize = {
    1: {
      "300%": 43740,
      "200%": 29160,
      "175%": 25515,
    },
    2: {
      "300%": 59160,
      "200%": 39440,
      "175%": 34510,
    },
    3: {
      "300%": 74580,
      "200%": 49720,
      "175%": 43505,
    },
    4: {
      "300%": 90000,
      "200%": 60000,
      "175%": 52500,
    },
    5: {
      "300%": 105420,
      "200%": 70280,
      "175%": 61495,
    },
    6: {
      "300%": 120840,
      "200%": 80560,
      "175%": 70490,
    },
    7: {
      "300%": 136260,
      "200%": 90840,
      "175%": 79485,
    },
    8: {
      "300%": 151680,
      "200%": 101120,
      "175%": 88480,
    },
  };

  return federalPovertyLineByHouseholdSize[householdSize][percent];
};

/**
 * @param {Object} args
 * @param {number} args.householdSize - The size of the household.
 * @param {"80%"|"60%"|"50%"} args.percent - percent of AMI
 */
export const getPercentAMIForHouseholdSize = ({
  householdSize = 1,
  percent,
}) => {
  const AMIByHouseholdSize = {
    1: {
      "80%": 49850,
      "60%": 38850,
      "50%": 31150,
    },
    2: {
      "80%": 57000,
      "60%": 44400,
      "50%": 35600,
    },
    3: {
      "80%": 64100,
      "60%": 49950,
      "50%": 40050,
    },
    4: {
      "80%": 71200,
      "60%": 55450,
      "50%": 44500,
    },
    5: {
      "80%": 76900,
      "60%": 59900,
      "50%": 48100,
    },
    6: {
      "80%": 82600,
      "60%": 64350,
      "50%": 51650,
    },
    7: {
      "80%": 88300,
      "60%": 68800,
      "50%": 55200,
    },
    8: {
      "80%": 94000,
      "60%": 73200,
      "50%": 58750,
    },
  };
  return AMIByHouseholdSize[householdSize][percent];
};
