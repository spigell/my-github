import * as github from '@pulumi/github';
import * as pulumi from '@pulumi/pulumi';
import * as stacks from './stacks';
import { Optional } from 'utility-types';

// Get my own id from github
const me = github.getUser({ username: '' });

const gcp = new stacks.GCPProjects();

// Add custom type for github environments in repository
// Make repository property optional
type CustomRepositoryArgs = Optional<
  github.RepositoryEnvironmentArgs,
  'repository'
>;
type Environment = CustomRepositoryArgs & {
  secrets?: {
    [key: string]: pulumi.Input<string>;
  };
};

type Repository = github.RepositoryArgs & {
  // environments may be not configured
  environments?: Environment[];
  secrets?: {
    [key: string]: pulumi.Input<string>;
  };
};

const repoList: Repository[] = [
  { name: 'my-github', description: 'My github account as Code' },
  {
    name: 'my-images',
    description: 'My container images for personal purposes',
  },
  {
    name: 'my-cloud-identity',
    description:
      'A way to manage my cloud tokens and cloud projects. Managed by Pulumi.',
  },
  {
    name: 'my-blockchain-infra',
    visibility: 'private',
  },
  {
    name: 'my-anki-decks',
    visibility: 'private',
  },
  {
    name: 'my-openai-codex-settings',
    visibility: 'public',
  },
  {
    name: 'my-cloud-resume',
    description: 'sources for my resume. Based on cloud resume challenge',
    secrets: {
      GOOGLE_UPLOADER_CREDENTIALS: gcp.GetResumeRunnerPrivateKey('production'),
    },
    environments: [
      {
        environment: 'production',
        deploymentBranchPolicy: {
          customBranchPolicies: true,
          protectedBranches: false,
        },
        reviewers: [
          {
            users: [me.then((me) => me.id) as unknown as pulumi.Output<number>],
          },
        ],
        secrets: {
          GOOGLE_CREDENTIALS: gcp.GetResumeRunnerPrivateKey('production'),
          GKE_DEPLOYER_CREDENTIALS: gcp.GetGKEDeployerPrivateKey('production'),
        },
      },
      {
        environment: 'dev',
        secrets: {
          GOOGLE_CREDENTIALS: gcp.GetResumeRunnerPrivateKey('dev'),
          GKE_DEPLOYER_CREDENTIALS: gcp.GetGKEDeployerPrivateKey('dev'),
        },
      },
    ],
  },
  {
    name: 'anki-sync',
    description: 'A cli tool for synchronize anki decks from files',
  },
  {
    name: 'anki-i-get-thais-decks',
    description: 'Anki decks based on https://www.youtube.com/@IgetThais',
  },
  { name: 'dwm' },
  { name: 'dotfiles' },
  {
    name: 'hh-responder',
    description: 'a cli tool for searching and applying for vacancies',
  },
  {
    name: 'codexman',
    description: 'a cli tool for managing OpenAI settings',
    visibility: 'private',
  },
  {
    name: 'cdk8s-ollama',
    description: 'Construct for ollama deployments in k8s',
  },
  {
    name: 'pulumi-automation-api-apps',
    description: 'Tools and helpers based on pulumi automation api',
  },
  {
    name: 'hh-responder-searches',
    description: 'My searches for HeadHunter site via hh-responder',
    visibility: 'private',
  },
  {
    name: 'phkh-ollama',
    description: 'PoC for ollama in Hetnzer',
    visibility: 'private',
  },
  {
    name: 'tron-auto-undelegate-bot',
    visibility: 'private',
  },
  {
    name: 'tron-account-watcher',
    visibility: 'private',
  },
  {
    name: 'web3-nodejs-libs',
    description: 'My helpers for building simple WEB3 nodeJS apps.',
  },
  {
    name: 'aptos-thala-prometheus-exporter',
    description: 'Prometheus exporter for thalalabs.xyz',
    visibility: 'private',
  },
  {
    name: 'tem-prometheus-exporter',
    description: 'Unofficial prometheus exporter for tem.cash infra',
    visibility: 'private',
  },
  {
    name: 'euler-prometheus-exporter',
    description: 'Unofficial prometheus exporter for EULER',
    visibility: 'private',
  },
  {
    name: 'fuel-mira-fpt-prices-bot',
    visibility: 'private',
  },
  {
    name: 'fuel-mira-price-notifier',
    visibility: 'private',
  },
  {
    name: 'af2faf',
    visibility: 'private',
  },
  {
    name: 'fuel-mira-trader',
    visibility: 'private',
  },
  {
    name: 'fuel-fluid-tests',
    visibility: 'private',
  },
  {
    name: 'pulumi-hcloud-kube-hetzner',
    description:
      'Optimized and Maintenance-free Kubernetes on Hetzner Cloud in one command! With Pulumi!',
    secrets: {
      GOOGLE_CREDENTIALS: gcp.GetInfraRunnerPrivateKey(
        'spigell-infra-phkh-runner@spigell-infra.iam.gserviceaccount.com',
      ),
    },
  },
  {
    name: 'pulumi-talos-cluster',
    description: 'Create a talos cluster with pulumi!',
    secrets: {
      GOOGLE_CREDENTIALS: gcp.GetInfraRunnerPrivateKey(
        'spigell-infra-talos-runner@spigell-infra.iam.gserviceaccount.com',
      ),
    },
  },
  // Archived go below
  {
    name: 'pulumi-k3os',
    template: { owner: 'pulumi', repository: 'pulumi-provider-boilerplate' },
    archived: true,
  },
  {
    name: 'pulumi-file',
    archived: true,
    template: { owner: 'pulumi', repository: 'pulumi-provider-boilerplate' },
  },
  {
    name: 'pulumi-codex-dynamic-provider',
    description: 'Manage OpenAI environments with Pulumi!',
    visibility: 'private',
    archived: true,
  },
  {
    name: 'do-k8s-challenge-kubegres',
    description:
      'Repository for https://www.digitalocean.com/community/pages/kubernetes-challenge',
    archived: true,
  },
  { name: 'sparrow-plugins', archived: true },
  {
    name: 'pokerchained-helper-tg-bot',
    description: 'Unofficial bot for pokerchained (Texas holdem on EOS chain)',
    archived: true,
  },
  { name: 'luscheduler', archived: true },
  {
    name: 'ansible-role-docker-compose-systemd',
    description: 'Install docker-compose service as systemd unit',
    archived: true,
  },
  {
    name: 'docker-teleport',
    description: 'Dockerfile for https://github.com/vadv/teleport',
    homepageUrl: 'https://hub.docker.com/r/spigell/docker-teleport/',
    archived: true,
  },
  {
    name: 'jira-telegram-listener',
    description: 'simple example of listener for jira',
    archived: true,
  },
  {
    name: 'packer-archlinux',
    description: 'Packer template for archlinux',
    homepageUrl: 'https://app.vagrantup.com/spigell/boxes/archlinux',
    archived: true,
  },
  {
    name: 'telegram-markdown-finder',
    description:
      'Telegram bot which return a part of markdown file by given anchor in request',
    archived: true,
  },
  { name: 'vltreplicator', archived: true },
  { name: 'ycloud-playground', archived: true },
  {
    name: 'tron-js-libs',
    visibility: 'private',
    archived: true,
  },
];

for (let repo of repoList) {
  let r = { ...repo };
  if (!r.hasOwnProperty('hasDownloads')) r.hasDownloads = true;
  if (!r.hasOwnProperty('hasIssues')) r.hasIssues = true;

  new github.Repository(r.name as string, r);
  if (r.secrets) {
    for (let [key, value] of Object.entries(r.secrets)) {
      new github.ActionsSecret(`${r.name}-${key}` as string, {
        repository: r.name as string,
        secretName: key,
        plaintextValue: value,
      });
    }
  }
  if (r.environments) {
    for (let env of r.environments) {
      env.repository = r.name as string;
      new github.RepositoryEnvironment(
        env.environment as string,
        env as github.RepositoryEnvironmentArgs,
      );
      if (env.secrets) {
        for (let [key, value] of Object.entries(env.secrets)) {
          new github.ActionsEnvironmentSecret(
            `${env.environment}-${key}`.toLowerCase(),
            {
              environment: env.environment as string,
              repository: r.name as string,
              secretName: key,
              plaintextValue: value,
            },
          );
        }
      }
    }
  }
}
