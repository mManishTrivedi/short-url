import { BaseConfig } from './base.config';
import { LocalConfig } from './local.config';

export default () =>
  (function () {
    const env = process.env.NODE_ENV ? process.env.NODE_ENV : 'local';
    let env_file;
    switch (env) {
      case 'production':
      case 'local':
      default:
        env_file = LocalConfig;
        break;
    }
    // Object merge and override by last-one
    return { ...BaseConfig, ...env_file };
  })();
