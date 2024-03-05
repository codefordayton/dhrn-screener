import { Model } from "survey-core";
import { Survey } from "survey-react-ui";
import "survey-core/defaultV2.min.css";

import surveyJSON from "../data/survey.json";
import { handleCreateCompletionScreen } from "../utils/survey/handleCompleteCompletionScreen";

export default function App() {
  const survey = new Model(surveyJSON);

  survey.onComplete.add(handleCreateCompletionScreen(survey));

  return <Survey model={survey} />;
}
