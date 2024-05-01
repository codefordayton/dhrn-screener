import React from "react";
import Screener from "./Screener"

export default function App() {

  [showSurvey, setShowSurvey] = React.useState(true);

  const completeSurvey = (sender, options, addressData)  => {
    console.log("COMPLETE", sender, options, addressData);
    setShowSurvey(false);
  }

  const ScreenerMemo = React.memo(Screener);
  return (
  <>
    { showSurvey && <ScreenerMemo onComplete={completeSurvey} setAddressData={setAddressData}/>}
    { !showSurvey && <div>Survey Complete</div>}
  </>);
}
