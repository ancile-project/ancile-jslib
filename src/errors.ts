export class AncileProgramException extends Error {
  public ancileTraceback: string;

  constructor(traceback: string) {
    super("An error took place while executing your program. Check the traceback in this object for more info");
    this.ancileTraceback = traceback;
  }
}

export class AncilePolicyException extends AncileProgramException {
  constructor() {
    super("The user's policy has prevented this program from runnning.");
  }
}
