class Logger {
  constructor() {
    this.devMode = false;
    this.log = (message) => {
      if (this.devMode) {
        console.log(message);
      }
    };
    this.setDevMode = (devMode) => {
      this.devMode = devMode;
    };
  }
}

const LoggerInstance = new Logger();

export default LoggerInstance;
