import carImage from '../assets/carImage';
import { WinnerData, getCar } from '../service/api';

class Winner {
  name: string;
  color: string;
  id: number;
  wins: number;
  time: number;

  constructor(winnerData: WinnerData) {
    this.id = winnerData.id;
    this.wins = winnerData.wins;
    this.time = winnerData.time;

    this.name = "";
    this.color = "";
  }

  async getHtml(): Promise<string> {
    const car = await getCar(this.id);
    this.color = car.color;
    this.name = car.name;

    const img = carImage.replace('color_variable', this.color);

    return `
      <div class="winnerRow" id="${this.id}">
        <div class="position"></div>
        <div class="winnerCarImage">${img}</div>
        <div>${this.name}</div>
        <div>${this.wins}</div>
        <div>${this.time}</div>
      </div>`;
  }
}

export default Winner;
