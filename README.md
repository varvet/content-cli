# Content CLI

Command Line Interface (CLI) for the Content Management API (CMA) of  [https://github.com/varvet/content/](https://github.com/varvet/content/). Use to manage spaces and schemas for an organization.

Install with `yarn`:

```sh
$ yarn global add https://github.com/varvet/content-cli
```

See available commands:

```sh
$ content -h
```

## Architecture

The program is built on top of [commander.js](https://github.com/tj/commander.js/) and [inquirer.js](https://github.com/SBoudrias/Inquirer.js/).

## Development

Instructions for how to set up, work with and deploy the project.

### Dependencies

See [package.json](package.json).

### Running the program

```sh
$ node ./index.js
```

Running against a different server:

```sh
$ URL=https://staging.content.varvet.com node ./index.js
```
