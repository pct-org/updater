import debug from 'debug'
import fs from 'fs'
import path from 'path'
import { exec } from 'shelljs'
import semverMax from 'semver-max'

import { name } from '../package.json'

export default new (class Updater {

  log = debug(`${name}:`)

  get = () => {
    this.log('Cron enabled')

    return this.checkForUpdates
  }

  /**
   * Get's the latest tag from a remote source
   *
   * @param {string} repoUrl - URL to the repo
   * @returns {string}
   */
  getLatestTag = (repoUrl) => {
    return exec(`git ls-remote --tags --sort="v:refname" ${repoUrl} | tail -n1 | sed 's/.*\\///; s/\\^{}//'`)
      .toString()
      .trim()
  }

  checkForUpdates = () => {
    try {
      this.log('Going to update repo')

      const { version, repository: { url } } = JSON.parse(
        fs.readFileSync(path.resolve(
          process.cwd(),
          'package.json',
        )),
      )

      const latestVersion = this.getLatestTag(url)

      if (semverMax(version, latestVersion) !== version) {
        this.log(`'${version}' is no longer the latest version, updating to '${latestVersion}'`)

        this.log(`Pulling changes from '${latestVersion}'`)

        // Call the update command from the getting started
        const yarnPull = exec('yarn pull')

        if (yarnPull.code !== 0) {
          this.log(`Error happened when pulling '${latestVersion}', see above for error`)
          return
        }

        this.log('Restarting services')

        // Call the update command from the getting started
        const pm2Restart = exec('yarn pm2 restart')

        if (pm2Restart.code !== 0) {
          this.log(`Error happened restarting pm2, see above for error`)
        }

      } else {
        this.log(`'${version}' is still the latest version`)
      }
    } catch (e) {
      this.log(`Error: ${e.message || e}`)
    }
  }

})()
