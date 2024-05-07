import React from 'react';
import { Model } from 'survey-core';
import { Survey } from 'survey-react-ui';
import survey from '../data/survey.json'
import { FunctionFactory } from "survey-core";


import 'survey-core/defaultV2.min.css';

const addressEndpoint = 'https://faas-nyc1-2ef2e6cc.doserverless.co/api/v1/web/fn-72f50c41-0f6d-47f1-a509-bfc5cbc49013/dhrn/addresses';
const zipToCountyEndpoint = 'https://faas-nyc1-2ef2e6cc.doserverless.co/api/v1/web/fn-72f50c41-0f6d-47f1-a509-bfc5cbc49013/dhrn/zipcounty';

export default function Screener({onComplete}) {
  // Using a state variable with this causes the survey to re-render on every state change,
  // but not checking for a change causes multiple checks with the api.
  let lastAddress = null;
  let lastAddressData = null;
  let lastZip = null;
  let lastCounty = null;

  const surveyConfig = new Model(survey);
  surveyConfig.onComplete.add((sender, options) => onComplete(sender, options, lastAddressData, lastCounty));

  function isSingleFamilyLUC(luc) {
    if (luc >= 500 && luc < 515) return true;
    return false;
  }

  function populateFromAddress(addressData) {
    if (!addressData) {
      return;
    }
    lastAddressData = addressData;
    lastAddress = addressData.address;
    surveyConfig.setValue("address", addressData.address);

    if (isSingleFamilyLUC(addressData.luc)) {
      surveyConfig.setValue("homeType", "Single Family");
    } else {
      surveyConfig.setValue("homeType", "Duplex or other Multi-Unit");
    }

    surveyConfig.setValue("taxesUpToDate", addressData.delqamount === "0");
  }

  function validateAddress([address]) {
    console.log("VALIDATE", address);
    if (address === lastAddress) {
      this.returnResult(true);
      return;
    }

    if (!address || address.length < 5) {
      this.returnResult(false);
    }
    lastAddress = address;

    fetch(`${addressEndpoint}?address=` + address)
      .then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            console.log("DATA", data);
            if (data.length === 0) {
              this.returnResult(true);
            } else {
              populateFromAddress(data[0]);
              this.returnResult(true);
            }
          });
        } else {
          this.returnResult(true);
          return;
        }
      })
      .catch(() => {
        this.returnResult(true);
        return;
      });
  }

  function validateZip([zipCode]) {
    console.log("VALIDATE", zipCode);
    if (zipCode === lastZip) {
      this.returnResult(true);
      return;
    }

    if (!zipCode) {
      this.returnResult(false);
    }
    lastZip = zipCode;

    fetch(`${zipToCountyEndpoint}?zip=` + zipCode)
      .then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            if (data && data.result) {
              lastCounty = data.result;
              this.returnResult(true);
            } else {
              this.returnResult(false);
              return;
            }
          });
        } else {
          this.returnResult(false);
          return;
        }
      })
      .catch(() => {
        this.returnResult(false);
        return;
      });
  }

  FunctionFactory.Instance.register("validateAddress", validateAddress, true);
  FunctionFactory.Instance.register("validateZip", validateZip, true);

  return <Survey model={surveyConfig} />;
}
