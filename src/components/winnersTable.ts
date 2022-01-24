import Winner from '../entity/winner';
import { WinnerData, getWinners } from '../service/api';
import Component from './abstract/component';

class WinnersTable extends Component {
  winners: WinnerData[];
  currentPageNumber: number;
  pageSize: number;

  constructor() {
    super('winnersTable');
    this.winners = [];
    this.currentPageNumber = 1;
    this.pageSize = 10;

    this.render();
    this.showActualTable();
    this.initHandlers();
  }

  render(): void {
    const html = `
        <h2 id="winnersCount"></h2>
        <h3 id="pageNumberWin">Page #1</h3>

        <div class=" winnerRow tableHeader">
          <div>#</div>
          <div>Car</div>
          <div>Name</div>
          <div>Wins</div>
          <div>Best Time</div>
        </div>

        <div class="winnersContainer"></div>

        <div class="pageNavigation">
          <button id="prevWin">Prev</button>
          <button id="nextWin">Next</button>
        </div>`;
    (
      document.getElementById('winnersTableContainer') as HTMLElement
    ).innerHTML += html;
  }

  async showActualTable(): Promise<void> {
    this.winners = await this.getWinnersFromServer();
    this.renderWinners();
  }

  async getWinnersFromServer(): Promise<WinnerData[]> {
    return await getWinners();
  }

  async renderWinners(): Promise<void> {
    const winnersContainer = (document.getElementsByClassName('winnersContainer')[0] as HTMLElement);
    winnersContainer.innerHTML = '';
    const winnersToRender = this.getCurrentTablePageItems();
    const promises = winnersToRender.map(winnerData => new Winner(winnerData).getHtml());
    const html = await (Promise.all(promises)).then((results) => results.join(''));
    winnersContainer.innerHTML = html;
    this.updateWinnersCount();
    this.updatePositions();
  }

  initHandlers(): void {
    document.getElementById('prevWin')?.addEventListener('click', this.showPrevPage.bind(this));
    document.getElementById('nextWin')?.addEventListener('click', this.showNextPage.bind(this));
  }

  getCurrentTablePageItems(): WinnerData[] {
    return this.winners.slice((this.currentPageNumber - 1) * this.pageSize, this.currentPageNumber * this.pageSize);
  }

  getMaxPageNumber(): number {
    return Math.ceil(this.winners.length / this.pageSize);
  }

  updatePageNumber(): void {
    const num = document.getElementById('pageNumberWin') as HTMLDivElement;
    num.innerText = `Page #${this.currentPageNumber}`;
  }

  updatePositions(): void {
    const rows = Array.from(document.getElementsByClassName('position')) as HTMLElement[];
    rows.forEach((item, index, array) => item.innerText = String(array.indexOf(item) + 1 + 10 * (this.currentPageNumber - 1)));
  }

  updateWinnersCount(): void {
    const num = document.getElementById('winnersCount') as HTMLDivElement;
    num.innerText = `Winners (${this.winners.length})`;
  }

  showPrevPage(): void {
    if (this.currentPageNumber > 1 && this.currentPageNumber <= this.getMaxPageNumber()) {
      this.currentPageNumber -= 1;
      this.renderWinners();
      this.updatePageNumber();
    }
  }

  showNextPage(): void {
    if (this.currentPageNumber >= 1 && this.currentPageNumber < this.getMaxPageNumber()) {
      this.currentPageNumber += 1;
      this.renderWinners();
      this.updatePageNumber();
    }
  }

  getWinnerById(id: number): WinnerData {
    return this.winners.filter(winner => winner.id === id)[0];
  }

}

export default WinnersTable;
