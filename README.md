<h1 align="center">
  <img height="200" width="200" src="https://github.com/pct-org/getting-started/blob/master/.github/logo.png" alt="logo" />
  <br />
  Updater
</h1>

<div align="center">
  <a target="_blank" href="https://gitter.im/pct-org/Lobby">
    <img src="https://badges.gitter.im/popcorn-time-desktop.svg" alt="Gitter" />
  </a>
  <a target="_blank" href="https://david-dm.org/pct-org/updater" title="dependencies status">
    <img src="https://david-dm.org/pct-org/updater/status.svg" />
  </a>
  <a target="_blank" href="https://david-dm.org/pct-org/updater?type=dev" title="devDependencies status">
    <img src="https://david-dm.org/pct-org/updater/dev-status.svg" />
  </a>
  <a target="_blank" href="https://github.com/pct-org/updater/pulls">
    <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="PRs Welcome" />
  </a>
</div>


---

## Projects

Popcorn Time consists of several projects, each doing it's own part.

| Project                      | Description |
| ---------------------------- | -------------------------------------------------------- |
| [`@pct-org/getting-started`] | Explains how to get started with this setup              |
| [`@pct-org/graphql-api`]     | Serves the data to the clients from the MongoDB database |
| [`@pct-org/scraper`]         | Scrapes everything and saves it to MongoDB database      |
| [`@pct-org/mongo-models`]    | Models used for MongoDB and GraphQL object types         |
| [`@pct-org/native-app`]      | React Native App                                         |
| [`@pct-org/updater`]         | Updater that automatically updates the projects          |

## Installation

```bash
$ yarn install
```

## Running the updater

**Requirements**
- Copy the `.env.example` file and fill it in

### Development
```bash
$ yarn start:dev
```

### Production

```bash
$ yarn build
$ yarn start
```

## Contributing:

Please see the [contributing guide].

## Issues

File a bug against [pct-org/getting-started prefixed with \[updater\]](https://github.com/pct-org/getting-started/issues/new?title=[updater]%20).

## [License](./LICENSE)

This project is [MIT licensed](./LICENSE).

[contributing guide]: ./CONTRIBUTING.md
[`@pct-org/graphql-api`]: https://github.com/pct-org/graphql-api
[`@pct-org/getting-started`]: https://github.com/pct-org/getting-started
[`@pct-org/mongo-models`]: https://github.com/pct-org/mongo-models
[`@pct-org/native-app`]: https://github.com/pct-org/native-app
[`@pct-org/scraper`]: https://github.com/pct-org/scraper
[`@pct-org/updater`]: https://github.com/pct-org/updater
