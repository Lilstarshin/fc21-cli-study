// @ts-check

// Github 레포지토리 관리 CLI를 만들어본다.
// 이슈, 풀 리퀘스트 등의 라벨 관리

/*
node src/main.js list-bugs

git add filename
*/

require('dotenv').config();
const { GITHUB_ACCESS_TOKEN } = process.env;
const { Octokit } = require('octokit');
const { program } = require('commander');

const octokit = new Octokit({ auth: GITHUB_ACCESS_TOKEN });

program
  .command('me')
  .description('Check my profile')
  .action(async () => {
    const {
      data: { login },
    } = await octokit.rest.users.getAuthenticated();
    console.log('Hello, %s', login);
  });

program.version('0.0.1');
program
  .command('list-bugs')
  .description('List issues with bug label')
  .action(async () => {
    const result = await octokit.rest.issues.listForRepo({
      owner: 'Lilstarshin',
      repo: 'fc21-cli-study',
      labels: 'bug',
    });

    const issuesWithBugLabel = result.data.filter(
      (issue) =>
        issue.labels.find((lable) => lable.name === 'bug') !== undefined
    );
    const output = issuesWithBugLabel.map((issue) => ({
      title: issue.title,
      number: issue.number,
    }));

    console.log('##output##', output);
  });

// 풀 리퀘스트를 모두 검사해서, 만약 diff가 큰 풀 리퀘스트가 있다면, 'too-big'이라는 레이블 붙이기.

program
  .command('check-prs')
  .description('Check pull request status')
  .action(async () => {
    console.log('Check PRs');
  });

program.parse();
