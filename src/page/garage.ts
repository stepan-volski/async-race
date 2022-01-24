import Page from './abstract/page';
import GarageControls from '../components/garageControls';
import CarTrackTable from '../components/carTable';
import GarageController from '../components/garageController';

class Garage extends Page {

  controller: GarageController | null = null;

  constructor() {
    super('Garage');
  }

  render(): void {
    const controlsContainer = '<div id="garageControlsContainer"></div>';
    const carTableContainer = '<div id="carTableContainer"></div>';
    this.pageContainer.innerHTML += controlsContainer;
    this.pageContainer.innerHTML += carTableContainer;
  }

  initComponents(): void {
    this.initialisedComponents.push(new GarageControls());
    this.initialisedComponents.push(new CarTrackTable());
  }

  initController(): void {
    this.controller = new GarageController (this.initialisedComponents);
    this.initialisedComponents.forEach(component => component.setController(this.controller as GarageController))
  }

}

export default Garage;
