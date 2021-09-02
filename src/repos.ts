import * as github from '@pulumi/github';

export const repoList = [
	{
		name: 'my-github',
		description: 'My github account as Code',
		hasDownloads: true,
		hasIssues: true
	},
	{
		name: 'pulumi-k3os',
	    template: {
	        owner: 'pulumi',
	        repository: 'pulumi-provider-boilerplate',
	    }
	},
]

for (let repo of repoList) {

	if ( !repo.hasOwnProperty('hasDownloads') ) repo.hasDownloads = true;
	if ( !repo.hasOwnProperty('hasIssues') ) repo.hasIssues = true;


	let _ = new github.Repository(repo.name, repo);
}
