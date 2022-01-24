import { isEngineWorking, toggleEngine, CarData, createWinner, getWinners, updateWinner } from "../service/api";
import Controller from "./abstract/controller";
import CarTable from "./carTable";
import GarageControls from "./garageControls";

class GarageController extends Controller {

  isRaceStarted = false;
  intervalsMap = new Map <number, NodeJS.Timer>();
  raceStartTime: number | null = null;
  carEngineStatus = new Map <number, boolean>();

  carTable = this.getComponentByName('carTable') as CarTable;
  garageControls = this.getComponentByName('garageControls') as GarageControls;

  selectCar(car: CarData): void {
    this.garageControls.setSelectedCar(car);
  }

  async refreshCarTable(): Promise<void> {
    await this.carTable.showActualTable();
  }

  async startCar(id: number): Promise<void> {
    const carImage = document.getElementById(String(id))?.getElementsByTagName('svg')[0] as SVGElement;
    const startBtn = document.getElementById(String(id))?.getElementsByClassName('startBtn')[0] as HTMLButtonElement;
    const stopBtn = document.getElementById(String(id))?.getElementsByClassName('stopBtn')[0] as HTMLButtonElement;
    stopBtn.disabled = false;
    startBtn.disabled = true;

    const distance = window.innerWidth;
    carImage.style.setProperty('--end-position', distance + 'px');
    const travelTime = Math.ceil(await this.getCarVelocity(id) / 10);
    carImage.style.animationDuration = travelTime + "s";
    carImage.classList.remove('stopped');
    carImage.classList.add('driving');

    this.carEngineStatus.set(id, true);
    isEngineWorking(id).then((result) => this.carEngineStatus.set(id, result));

    const drive = () => {
      const currentCarPosition = carImage.getBoundingClientRect().x;

      if (currentCarPosition > distance - 190) {
        finishDriving();
      }

      if (!this.carEngineStatus.get(id)) {
        this.stopCar(id);
      }
    }

    const finishDriving = () => {
      this.stopCar(id);
      if (this.isRaceStarted) {
        this.stopRace(id);
      }
    }

    const intervalId = setInterval(drive, 100);
    this.intervalsMap.set(id, intervalId);

  }

  stopCar(id: number): void {
    const carImage = document.getElementById(String(id))?.getElementsByTagName('svg')[0] as SVGElement;
    const startBtn = document.getElementById(String(id))?.getElementsByClassName('startBtn')[0] as HTMLButtonElement;
    const stopBtn = document.getElementById(String(id))?.getElementsByClassName('stopBtn')[0] as HTMLButtonElement;
    stopBtn.disabled = true;
    startBtn.disabled = false;
    carImage.classList.remove('driving');
    carImage.classList.add('stopped');
    toggleEngine(id, 'stopped');
    const interval = this.intervalsMap.get(id) as NodeJS.Timer;
    clearInterval(interval);
  }

  getCarById(id: number): CarData {
    return this.carTable.getCarById(id);
  }

  startRace(): void {
    this.raceStartTime = Date.now();
    this.isRaceStarted = true;
    this.carTable.getCurrentTablePageItems().map(car => car.id).forEach(id => this.startCar(id));
  }

  stopRace(id: number): void {
    const endTime = Date.now();
    const raceTime = (endTime - (this.raceStartTime as number)) / 1000;
    alert(`${this.getCarById(id).name} won with time ${raceTime}s`);
    this.updateWinner(id, raceTime);
    this.isRaceStarted = false;
    this.resetAllCars();
  }

  resetAllCars():void {
    this.carTable.getCurrentTablePageItems().map(car => car.id).forEach(id => this.stopCar(id));
    Array.from(document.getElementsByClassName("stopped")).forEach(element => element.classList.remove("stopped"));
  }

  async getCarVelocity(id: number): Promise<number> {
    return Number((await toggleEngine(id, 'started')).velocity);
  }

  async updateWinner(id: number, time: number): Promise<void> {
    const allWinners = await getWinners();
    const winner = allWinners.filter(winner => winner.id === id)[0];

    if (winner) {
      winner.wins = winner.wins + 1;
      if (winner.time > time) {
        winner.time = time;
      }
      updateWinner(winner);
    } else {
      createWinner(id, 1, time);
    }
  }

}

export default GarageController;
