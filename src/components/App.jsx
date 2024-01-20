import { Model } from 'survey-core';
import { Survey } from 'survey-react-ui';

import 'survey-core/defaultV2.min.css';

const surveyJson = {
  firstPageIsStarted: true,
  startSurveyText: "Take the Survey",
  pages: [{
    elements: [{
      type: "html",
      html: "<h2>In this survey, we will ask you a couple questions about your impressions of our product.</h2>"
    }],
  },{
    elements: [{
      name: "FirstName",
      title: "Enter your first name:",
      type: "text"
    }, {
      name: "LastName",
      title: "Enter your last name:",
      type: "text"
    }]
  }]
};

export default function App() {

  const survey = new Model(surveyJson);

  return <Survey model={survey} />;
}
