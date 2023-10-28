import * as pulumi from '@pulumi/pulumi';

const envMap = new Map<string, string>([
  ['production', 'resumeProduction'],
  ['dev', 'resumeDev'],
]);

const namespaceMap = new Map<string, string>([
  ['production', 'spigell-resume-production'],
  ['dev', 'spigell-resume-dev'],
]);

export class GCPProjects {
  private ref: pulumi.StackReference;
  constructor() {
    this.ref = new pulumi.StackReference('organization/my-cloud-identity/main');

    return this;
  }

  GetInfraRunnerPrivateKey(email: string) {
    const outputs = this.ref.getOutput('infraProject');

    return outputs.apply((outputs) => {
      for (const serviceAccount of outputs['pulumiServiceAccounts']) {
        if (serviceAccount['email'] === email) {
          return serviceAccount['privateKey'];
        }
      }
      throw new Error(
        `Could not find GKE deployer service account for ${email}`
      );
    });
  }

  GetResumeRunnerPrivateKey(env: string) {
    // Get GCP service account from another stack via stack reference
    const outputs = this.ref.getOutput(`${envMap.get(env)}`);

    return outputs.apply((outputs) => outputs['runnerPrivateKey']);
  }

  GetGKEDeployerPrivateKey(env: string) {
    const outputs = this.ref.getOutput('infraProject');

    return outputs.apply((outputs) => {
      for (const serviceAccount of outputs['GkeServiceAccounts']) {
        if (serviceAccount['namespace'] === `${namespaceMap.get(env)}`) {
          return serviceAccount['privateKey'];
        }
      }
      throw new Error(`Could not find GKE deployer service account for ${env}`);
    });
  }
}
