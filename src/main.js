// @ts-check

// Github 레포지토리 관리 CLI를 만들어본다.
// 이슈, 풀 리퀘스트 등의 라벨 관리

/*
node src/main.js list-bugs

git add filename
*/

const { program } = require('commander');

program.version('0.0.1');
program
  .command('list-bug')
  .description('List issues with bug label')
  .action(async () => {
    console.log('List bugs!');
  });

program
  .command('check-prs')
  .description('Check pull request status')
  .action(async () => {
    console.log('Check PRs');
  });

program.parse();
