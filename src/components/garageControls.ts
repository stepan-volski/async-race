import { createCar, updateCar, CarData } from '../service/api';
import generateCars from '../utils/utils';
import Component from './abstract/component';
import GarageController from './garageController';

class GarageControls extends Component {
  selectedCar: CarData | null = null;

  constructor() {
    super('garageControls');
    this.render();
    this.initHandlers();
  }

  render(): void {
    const html =  `
    <div class="carControls">
      <input type="text" id="createNameInput">
      <input type="color" id="createColorInput">
      <button type="submit" id="createSubmit">Create</button>
    </div>
    <div class="carControls">
      <input type="text" id="updateNameInput">
      <input type="color" id="updateColorInput">
      <button type="submit" id="updateSubmit" disabled>Update</button>
    </div>
    <div class="raceControls">
      <button id="race">Race</button>
      <button id="reset">Reset</button>
      <button id="generate">Generate Cars</button>
    </div>`;

    (document.getElementById('garageControlsContainer') as HTMLElement).innerHTML += html;
  }

  initHandlers(): void {
    document.getElementById('createSubmit')?.addEventListener('click', this.createCar.bind(this));
    document.getElementById('updateSubmit')?.addEventListener('click', this.updateCar.bind(this));
    document.getElementById('generate')?.addEventListener('click', this.generateCars.bind(this));
    document.getElementById('race')?.addEventListener('click', this.startRace.bind(this));
    document.getElementById('reset')?.addEventListener('click', this.resetRace.bind(this));
  }

  async generateCars(): Promise<void> {
    await generateCars();
    await this.refreshCarTable();
  }

  async createCar(): Promise<void> {
    const createNameInput = document.getElementById('createNameInput') as HTMLInputElement;
    const createColorInput = document.getElementById('createColorInput') as HTMLInputElement;
    const name = createNameInput?.value;
    const color = createColorInput?.value;
    await createCar(name, color);
    await this.refreshCarTable();
    createNameInput.value = '';
    createColorInput.value = '#000000';
  }

  async updateCar(): Promise<void> {
    if (this.selectedCar){
      const updateBtn = document.getElementById('updateSubmit') as HTMLButtonElement;
      const updateNameInput = document.getElementById('updateNameInput') as HTMLInputElement;
      const updateColorInput = document.getElementById('updateColorInput') as HTMLInputElement;
      this.selectedCar.name = updateNameInput?.value;
      this.selectedCar.color = updateColorInput?.value;
      await updateCar(this.selectedCar);
      await this.refreshCarTable();
      updateNameInput.value = '';
      updateColorInput.value = '#000000';
      updateBtn.disabled = true;
      this.selectedCar = null;
    }
  }

  setSelectedCar(car: CarData): void {
    this.selectedCar = car;
    (document.getElementById('updateNameInput') as HTMLInputElement).value = car.name;
    (document.getElementById('updateColorInput') as HTMLInputElement).value = car.color;
    (document.getElementById('updateSubmit') as HTMLButtonElement).disabled = false;
  }

  async refreshCarTable(): Promise<void> {
    await (this.controller as GarageController).refreshCarTable();
  }

  startRace(): void {
    (this.controller as GarageController).startRace();
  }

  resetRace(): void {
    (this.controller as GarageController).resetAllCars();
  }

}

export default GarageControls;
