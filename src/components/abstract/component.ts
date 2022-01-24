import Controller from "./controller";

class Component {
  controller: Controller | null = null;
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  initHandlers(): void {
    //
  }

  render(): void {
    //
  }

  setController(controller: Controller): void {
    this.controller = controller
  }
}

export default Component;
