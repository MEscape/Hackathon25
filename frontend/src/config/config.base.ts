export interface ConfigBaseProps {
  catchErrors: 'always' | 'dev' | 'prod' | 'never';
  api: {
    timeout: number;
  };
}

const BaseConfig: ConfigBaseProps = {
  /**
   * Only enable if we're catching errors in the right environment
   */
  catchErrors: 'always',

  /**
   * API configuration from environment variables
   */
  api: {
    timeout: 10000,
  },
};

export default BaseConfig;
