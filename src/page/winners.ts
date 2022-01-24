import WinnersTable from '../components/winnersTable';
import Page from './abstract/page';

class Winners extends Page {
  constructor() {
    super('Winners');
  }

  render(): void {
    const winnersContainer = '<div id="winnersTableContainer"></div>';
    this.pageContainer.innerHTML += winnersContainer;
  }

  initComponents(): void {
    this.initialisedComponents.push(new WinnersTable());
  }

  openPage(): void {
    this.pageContainer.style.display = "block";
    const winnersTable = this.initialisedComponents[0] as WinnersTable;
    winnersTable.showActualTable();
  }

}

export default Winners;
