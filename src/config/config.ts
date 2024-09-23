import { GoogleSecretsManagerService } from "src/gsm/gsm.service";
import constants from "./constants";

let secrets: { [key: string]: any } = {};

const loadSecrets = async function () {
    //fetch secrets from gcp secret manager and store in config to be used later
    secrets = await new GoogleSecretsManagerService().getAllSecrets(constants.secretNames);
}

export default () => secrets;
export { loadSecrets };
