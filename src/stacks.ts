import * as pulumi from '@pulumi/pulumi';

const envMap = new Map<string, string>([
  ['production', 'resumeProduction'],
  ['dev', 'resumeDev'],
]);

export class GCPProjects {
  private ref: pulumi.StackReference;
  constructor() {
    this.ref = new pulumi.StackReference('spigell/gcp-projects/prod');

    return this;
  }

  GetRunnerPrivateKey(env: string) {
    // Get GCP service account from another stack via stack reference
    const outputs = this.ref.getOutput(`${envMap.get(env)}`);

    return outputs.apply((outputs) => outputs['runnerPrivateKey']);
  }
}
