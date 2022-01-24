import Component from './component';

class Controller {
  components: Component[];

  constructor(components: Component[]) {
    this.components = components;
  }

  getComponentByName(name: string): Component {
    return this.components.filter(component => component.name === name)[0];
  }

}

export default Controller;
