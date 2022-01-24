import Car from '../entity/car';
import { getCars, deleteCar, CarData, deleteWinner } from '../service/api';
import Component from './abstract/component';
import GarageController from './garageController';

class CarTable extends Component {
  cars: CarData[];
  currentPageNumber: number;
  pageSize: number;

  constructor() {
    super('carTable');
    this.cars = [];
    this.currentPageNumber = 1;
    this.pageSize = 7;

    this.render();
    this.showActualTable();
    this.initHandlers();
  }

  render(): void {
    const html = `
        <h2 id="carCount"></h2>
        <h3 id="pageNumber">Page #1</h3>
        <div id="carsContainer"></div>
        <div class="pageNavigation">
          <button id="prev">Prev</button>
          <button id="next">Next</button>
        </div>`;
    (
      document.getElementById('carTableContainer') as HTMLElement
    ).innerHTML += html;
  }

  async showActualTable(): Promise<void> {
    this.cars = await this.getCarsFromServer();
    this.renderCars();
  }

  async getCarsFromServer(): Promise<CarData[]> {
    return await getCars();
  }

  renderCars(): void {
    const carsContainer = (document.getElementById('carsContainer') as HTMLElement);
    carsContainer.innerHTML = '';
    const carsToRender = this.getCurrentTablePageItems();
    const html = carsToRender.map(carData => new Car(carData).getHtml()).join('');
    carsContainer.innerHTML = html;
    this.updateCarCount();
  }

  initHandlers(): void {
    document.getElementById('prev')?.addEventListener('click', this.showPrevPage.bind(this));
    document.getElementById('next')?.addEventListener('click', this.showNextPage.bind(this));
    document.addEventListener('click', this.initCarHandlers.bind(this));
  }

  initCarHandlers(event: Event): void {
    const element = event.target as HTMLElement;
    if (element.parentElement?.className === "carControls") {
      const id = Number(element.parentElement?.parentElement?.id);
      const elementClass = element.className;

      switch(elementClass) {
        case 'selectBtn': this.selectCar(id);
          break;
        case 'removeBtn': this.removeCar(id);
          break;
        case 'startBtn': (this.controller as GarageController).startCar(id);
          break;
        case 'stopBtn': (this.controller as GarageController).stopCar(id);
          break;
      }
    }
  }

  getCurrentTablePageItems(): CarData[] {
    return this.cars.slice((this.currentPageNumber - 1) * this.pageSize, this.currentPageNumber * this.pageSize);
  }

  getMaxPageNumber(): number {
    return Math.ceil(this.cars.length / this.pageSize);
  }

  updatePageNumber(): void {
    const num = document.getElementById('pageNumber') as HTMLDivElement;
    num.innerText = `Page #${this.currentPageNumber}`;
  }

  updateCarCount(): void {
    const num = document.getElementById('carCount') as HTMLDivElement;
    num.innerText = `Garage (${this.cars.length})`;
  }

  showPrevPage(): void {
    if (this.currentPageNumber > 1 && this.currentPageNumber <= this.getMaxPageNumber()) {
      this.currentPageNumber -= 1;
      this.renderCars();
      this.updatePageNumber();
    }
  }

  showNextPage(): void {
    if (this.currentPageNumber >= 1 && this.currentPageNumber < this.getMaxPageNumber()) {
      this.currentPageNumber += 1;
      this.renderCars();
      this.updatePageNumber();
    }
  }

  async removeCar(id: number): Promise<void> {
    await deleteCar(id);
    deleteWinner(id);
    this.showActualTable();
  }

  selectCar(id: number): void {
    const carData = this.getCarById(id);
    (this.controller as GarageController).selectCar(carData);
  }

  getCarById(id: number): CarData {
    return this.cars.filter(car => car.id === id)[0];
  }

}

export default CarTable;
