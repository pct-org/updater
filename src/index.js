import 'dotenv/config'
import cron from 'node-cron'

import Updater from './Updater'

cron.schedule(
  process.env.CRON_TIME,
  Updater.get(),
  {
    scheduled: true,
  },
)
