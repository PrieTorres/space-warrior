import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "./config/firestore.js";

//import { RecaptchaEnterpriseServiceClient } from '@google-cloud/recaptcha-enterprise';

export const addRank = async (rank) => {
  if (!rank?.name || !rank?.points)
    throw new Error("missing required fields (points and name)");

  try {
    const docRef = await addDoc(collection(db, "rank"), {
      name: rank.name,
      points: rank.points,
      insertedDate: new Date(),
    });
    console.log("Document written with ID: ", docRef.id);
    return docRef;
  } catch (error) {
    console.error("Error adding document: ", error);
    return { error: error?.message, code: error?.code };
  }
}

export const getRanks = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "rank"))
    const ranks = querySnapshot.docs
      .map((doc) => ({ ...doc.data(), id: doc.id }));

    return ranks;
  } catch (error) {
    console.error("unable to get ranking data ", error);
    return [];
  }
}

/*function getAccessToken() {
  return new Promise(function (resolve, reject) {
    const key = require('./service-account.json');
    const jwtClient = new google.auth.JWT(
      key.client_email,
      null,
      key.private_key,
      SCOPES,
      null
    );
    jwtClient.authorize(function (err, tokens) {
      if (err) {
        reject(err);
        return;
      }
      resolve(tokens.access_token);
    });
  });
}*/

/*export async function getToken({
  projectID = process.env.REACT_APP_PROJECT_ID,
  recaptchaKey = process.env.REACT_APP_RECAPTCHA_KEY_ENTERPRISE,
  token = "action-token",
  recaptchaAction = "action-name",
}) {
  //e?.preventDefault();
  //grecaptcha.enterprise.ready(async () => {
  //  const token = await grecaptcha.enterprise.execute('6LfQ1x8qAAAAAMs-XblQ02u27xomLrio5S2twFn3', { action: 'LOGIN' });
  //  return token;
  //});
  const client = new RecaptchaEnterpriseServiceClient(projectID);
  const projectPath = client.projectPath();

  const request = ({
    assessment: {
      event: {
        token: token,
        siteKey: recaptchaKey,
      },
    },
    parent: projectPath,
  });

  const [ response ] = await client.createAssessment(request);

  if (!response.tokenProperties.valid) {
    console.log(`The CreateAssessment call failed because the token was: ${response.tokenProperties.invalidReason}`);
    return null;
  }

  // The `action` property is set by user client in the grecaptcha.enterprise.execute() method.
  if (response.tokenProperties.action === recaptchaAction) {
    // Get the risk score and the reason(s).
    // For more information on interpreting the assessment, see:
    // https://cloud.google.com/recaptcha-enterprise/docs/interpret-assessment
    console.log(`The reCAPTCHA score is: ${response.riskAnalysis.score}`);
    response.riskAnalysis.reasons.forEach((reason) => {
      console.log(reason);
    });

    return response.riskAnalysis.score;
  } else {
    console.log("The action attribute in your reCAPTCHA tag does not match the action you are expecting to score");
    return null;
  }
}*/
