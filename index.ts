import * as pulumi from '@pulumi/pulumi';
import * as repos from './src/repos';
import * as keys from './src/keys';

export const repolist = repos.repoList;
export const mainSshKeyUrl = keys.MainSshKey.url;
