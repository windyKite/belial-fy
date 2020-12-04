import * as commander from 'commander';

const program = new commander.Command();

program
  .version('0.0.1')
  .name('fy')
  .usage('<English>');

program.parse(process.argv);