import { Model } from 'survey-core';
import { Survey } from 'survey-react-ui';
import survey from '../data/survey.json'

import 'survey-core/defaultV2.min.css';

export default function App() {

  const surveyConfig = new Model(survey);

  return <Survey model={surveyConfig} />;
}
