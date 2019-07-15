export class AncilePolicyException extends Error {
  constructor() {
    super("The user's policy has prevented this program from runnning.");
  }
}

export class AncileProgramException extends Error {
  public traceback: string;

  constructor(traceback: string) {
    super("An error took place while executing your program. Check the traceback in this object for more info");
    this.traceback = traceback;
  }
}
