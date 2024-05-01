import { Model } from 'survey-core';
import { Survey } from 'survey-react-ui';
import survey from '../data/survey.json'
import { FunctionFactory } from "survey-core";


import 'survey-core/defaultV2.min.css';

const addressEndpoint = 'https://faas-nyc1-2ef2e6cc.doserverless.co/api/v1/web/fn-72f50c41-0f6d-47f1-a509-bfc5cbc49013/dhrn/addresses';

export default function App() {

  const surveyConfig = new Model(survey);

  function isSingleFamilyLUC(luc) {
    if (luc >= 500 && luc < 515) return true;
    return false;
  }

  function populateFromAddress(addressData) {
    if (!addressData) {
      return;
    }

    surveyConfig.setValue('address', addressData.address);

    if (isSingleFamilyLUC(addressData.luc)) {
      surveyConfig.setValue('homeType', 'Single Family');
    } else {
      surveyConfig.setValue('homeType', 'Duplex or other Multi-Unit');
    }

    surveyConfig.setValue('taxesUpToDate', addressData.delqamount === '0');
  } 

  function validateAddress([address]) {
    console.log("VALIDATE", address);
    if (!address || address.length < 5) {
      this.returnResult(false);
    }
    fetch(`${addressEndpoint}?address=` + address).then(response => {
      if (response.ok) {
        response.json().then(data => {
          console.log("DATA", data)
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
    }).catch(() => {
      this.returnResult(true);
      return;
    });
  }
  FunctionFactory.Instance.register("validateAddress", validateAddress, true);
  surveyConfig.onComplete.add(function (sender) {
    console.log("COMPLETE", sender);
  });
  
  return <Survey model={surveyConfig} />;
}
