import { SecretManagerServiceClient } from "@google-cloud/secret-manager";
import { Logger as logger } from "@nestjs/common";

export class GoogleSecretsManagerService {
    private client: SecretManagerServiceClient;
    private projectId: string;

    constructor() {
        this.client = new SecretManagerServiceClient();
    }

    async getSecret(secretName: string): Promise<string | undefined> {
        try {
            // First, list all versions of the secret
            const [versions] = await this.client.listSecretVersions({
                parent: `projects/${this.projectId}/secrets/${secretName}`,
            });

            // Find the latest enabled version
            const latestEnabledVersion = versions
                .filter(version => version.state === 'ENABLED')
                .sort((a, b) => {
                    return Number(b.name.split('/').pop()) - Number(a.name.split('/').pop());
                })[0];

            if (!latestEnabledVersion) {
                throw new Error(`No enabled versions found for secret ${secretName}`);
            }

            // Access the latest enabled version
            const [version] = await this.client.accessSecretVersion({
                name: latestEnabledVersion.name,
            });

            if (version.payload && version.payload.data) {
                return version.payload.data.toString();
            } else {
                throw new Error(`No secret data found for ${secretName}`);
            }
        } catch (error) {
            logger.error('Error retrieving secret:', error);
            throw new Error('Failed to load secrets. Stopping the service.');
        }
    }

    async getAllSecrets(secretNames: string[]): Promise<{ [key: string]: string }> {
        this.projectId = await this.client.getProjectId();
        const secrets: { [key: string]: string } = {};
        const promises = [];
        secretNames.forEach((secretName) => {
            promises.push(this.getSecret(secretName).then((secretValue) => { secrets[secretName] = secretValue; }))
        });
        await Promise.all(promises);
        return secrets;
    }
}
