import carImage from '../assets/carImage';
import { CarData } from '../service/api';

class Car {
  name: string;
  color: string;
  id: number;

  constructor(carData: CarData) {
    this.name = carData.name;
    this.color = carData.color;
    this.id = carData.id;
  }

  getHtml(): string {
    const img = carImage.replace('color_variable', this.color);
    return `
      <div class="carTrack" id="${this.id}">
        <h4 class="carName">${this.name}</h4>
        <div class="carControls">
          <button class="selectBtn">select</button>
          <button class="removeBtn">remove</button>
          <button class="startBtn">start</button>
          <button class="stopBtn" disabled>stop</button>
        </div>
        <div class="carImage">
          ${img}
        </div>
      </div>`;
  }
}

export default Car;
