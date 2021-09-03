import * as github from '@pulumi/github';

export const repoList: github.RepositoryArgs[] = [
  { name: 'my-github', description: 'My github account as Code' },
  {
    name: 'pulumi-k3os',
    template: { owner: 'pulumi', repository: 'pulumi-provider-boilerplate' },
  },
  {
    name: 'otus_golang_hw',
    template: { owner: 'OtusGolang', repository: 'home_work' },
  },
  { name: 'sparrow-plugins', archived: true },
  { name: 'dwm' },
  { name: 'dotfiles' },
  {
    name: 'pokerchained-helper-tg-bot',
    description: 'Unofficial bot for pokerchained (Texas holdem on EOS chain)',
  },
  { name: 'luscheduler' },
  {
    name: 'ansible-role-docker-compose-systemd',
    description: 'Install docker-compose service as systemd unit',
  },
  {
    name: 'docker-teleport',
    description: 'Dockerfile for https://github.com/vadv/teleport',
    homepageUrl: 'https://hub.docker.com/r/spigell/docker-teleport/',
  },
  {
    name: 'packer-archlinux',
    description: 'Packer template for archlinux',
    homepageUrl: 'https://app.vagrantup.com/spigell/boxes/archlinux',
  },
  {
    name: 'telegram-markdown-finder',
    description:
      'Telegram bot which return a part of markdown file by given anchor in request',
  },
  {
    name: 'jira-telegram-listener',
    description: 'simple example of listener for jira',
  },
  { name: 'vltreplicator' },
];

for (let repo of repoList) {
  let r = { ...repo };
  if (!r.hasOwnProperty('hasDownloads')) r.hasDownloads = true;
  if (!r.hasOwnProperty('hasIssues')) r.hasIssues = true;

  let _ = new github.Repository(r.name as string, r);
}
