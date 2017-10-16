#!/usr/bin/env node

const program = require('commander');
const spaces = require('./programs/spaces');

program
  .version('1.0.0')
  .description('The content command line interface');

spaces(program);

program.parse(process.argv);
