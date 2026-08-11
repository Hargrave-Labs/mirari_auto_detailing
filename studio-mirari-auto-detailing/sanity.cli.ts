import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'tqyt69en',
    dataset: 'production'
  },
  deployment: {
    /**
     * Target the existing hosted studio (mirariautodetailing.sanity.studio) so
     * deploys update it rather than prompting to pick or create one.
     */
    appId: 'zcb03rd6kf49t3n4b3rlstnx',
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
     */
    autoUpdates: true,
  }
})
