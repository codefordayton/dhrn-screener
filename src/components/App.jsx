import React from "react";
import Screener from "./Screener"
import Results from "./Results";
import Header from "./Header";
import Footer from "./Footer";

const sendmailEndpoint = "https://faas-nyc1-2ef2e6cc.doserverless.co/api/v1/web/fn-72f50c41-0f6d-47f1-a509-bfc5cbc49013/dhrn/sendmail"

export default function App() {
  const [showSurvey, setShowSurvey] = React.useState(true);
  const [surveyData, setSurveyData] = React.useState(null);
  const [addressData, setAddressData] = React.useState(null);
  const [county, setCounty] = React.useState(null);

  const sendEmail = (surveyData, addressData, county)  => {
    console.log(JSON.stringify({...surveyData, ...addressData, county}));
    fetch(sendmailEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({...surveyData, ...addressData, county})
    });
  }
  const completeSurvey = (sender, options, addressData, county)  => {
    console.log("COMPLETE", sender, options, addressData, county);
    setAddressData(addressData);
    setCounty(county);
    setSurveyData(sender.data);
    setShowSurvey(false);
    sendEmail(sender.data, addressData, county);
  };
  const goBack = () => {
    setShowSurvey(true);
    return true;
  };

  const ScreenerMemo = React.memo(Screener);
  return (
    <div className="flex-grow pb-16">
      <Header />
      {showSurvey && (
        <ScreenerMemo className="flex-1" onComplete={completeSurvey} />
      )}
      {!showSurvey && (
        <Results
          surveyData={surveyData}
          addressData={addressData}
          county={county}
          goBack={goBack}
        />
      )}
      <Footer />
    </div>
  );
}
