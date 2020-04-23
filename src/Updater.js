import debug from 'debug'
import fs from 'fs'
import path from 'path'
import { exec, cd } from 'shelljs'
import semverMax from 'semver-max'

import { name } from '../package.json'

const { PROJECT_LOCATION } = process.env

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
    return exec(`git ls-remote --tags ${repoUrl} | cut -d/ -f3- | sort -t. -nk1,2 -k3 | awk '/^[^{]*$/{version=$1}END{print version}'`)
      .toString()
      .trim()
  }

  checkForUpdates = () => {
    try {
      this.log('Going to check for update')

      const { version, repository: { url } } = JSON.parse(
        fs.readFileSync(path.resolve(
          PROJECT_LOCATION,
          'package.json',
        )),
      )

      const latestVersion = this.getLatestTag(url)

      this.log(`Got version "${latestVersion}" from "${url}"`)

      if (semverMax(version, latestVersion) !== version) {
        this.log(`'${version}' is no longer the latest version, updating to '${latestVersion}'`)

        this.log(`Pulling changes from '${latestVersion}'`)

        this.log(`Cd into '${PROJECT_LOCATION}'`)
        cd(PROJECT_LOCATION)

        // Call the update command from the getting started
        const yarnPull = exec('yarn pull')

        if (yarnPull.code !== 0) {
          this.log(`Error happened when pulling '${latestVersion}', "${yarnPull.stderr}"`)

          // Be sure to cd back into cwd
          cd(process.cwd())
          return
        }

        this.log('Restarting services')

        // Call the update command from the getting started
        const pm2Restart = exec('yarn pm2 restart all')

        if (pm2Restart.code !== 0) {
          this.log(`Error happened restarting pm2, "${pm2Restart.stderr}"`)

          // Be sure to cd back into cwd
          cd(process.cwd())
        }

      } else {
        this.log(`'${version}' is still the latest version`)
      }
    } catch (e) {
      this.log(`Error: ${e.message || e}`)
    }
  }

})()
