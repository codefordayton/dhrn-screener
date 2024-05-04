import React from "react";
import Screener from "./Screener"
import Results from "./Results";
import Header from "./Header";
import Footer from "./Footer";

export default function App() {

  [showSurvey, setShowSurvey] = React.useState(true);
  [surveyData, setSurveyData] = React.useState(null);
  [addressData, setAddressData] = React.useState(null);

  const completeSurvey = (sender, options, addressData)  => {
    console.log("COMPLETE", sender, options, addressData);
    setAddressData(addressData);
    setSurveyData(sender.data);
    setShowSurvey(false);
  }

  const ScreenerMemo = React.memo(Screener);
  return (
  <>
    <Header/>
    { showSurvey && <ScreenerMemo onComplete={completeSurvey} />}
    { !showSurvey && <Results surveyData={surveyData} addressData={addressData} />}
    <Footer/>
  </>
  );
}
