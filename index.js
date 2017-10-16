#!/usr/bin/env node

const program = require('commander');
const spaces = require('./programs/spaces');
const schema = require('./programs/schema');

program
  .version('1.0.0')
  .description('The content command line interface');

spaces(program);
schema(program);

program.parse(process.argv);
