import * as github from "@pulumi/github";
import * as fs from 'fs';

export const MainSshKey = new github.UserSshKey('main', {
    title: 'main',
    key: fs.readFileSync('/home/spigell/.ssh/keys/spigell.pub', 'utf-8'),
});
