import { createCar, CarData } from '../service/api';

async function generateCars(): Promise<void> {
  const num = 100;
  const arr: Promise<CarData>[] = [];
  for (let i = 0; i < num; i++) {
    arr.push(createCar(generateName(), generateColor()));
  }
  await Promise.all(arr);
}

function generateName(): string {
  const makes = ['Mazda', 'Toyota', 'Peugeot', 'Mercedes', 'Volkswagen', 'Volvo', 'Renault', 'Geely', 'Ford', 'Kia'];
  const models = ['polo', 'creta', 'yaris', 'civic', 'duster', 'ceed', 'mustang', 'passat', 'focus', 'rio'];
  return makes[Math.floor(Math.random() * 10)] + " " + models[Math.floor(Math.random() * 10)];
}

function generateColor(): string {
  return "#" + Math.floor(Math.random()*16777215).toString(16);
}

export default generateCars;
