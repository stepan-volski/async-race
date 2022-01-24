import Winners from '../page/winners';
import Garage from '../page/garage';

class Router {
  routes: { garage: Garage; winners: Winners };
  currentPage: 'garage' | 'winners';

  constructor(routes: { garage: Garage; winners: Winners }) {
    this.routes = routes;
    this.currentPage = 'garage';
    this.routes.garage.showPage();
  }

  init(): void {
    document.addEventListener('click', this.changePage.bind(this));
  }

  changePage(event: Event): void {
    const element = event.target as HTMLElement;
    const selectedPage = element.dataset.routerPage as 'garage' | 'winners';

    if (selectedPage && selectedPage != this.currentPage) {
      this.routes[this.currentPage].closePage();
      this.routes[selectedPage].showPage();
      this.currentPage = selectedPage;
    }
  }
}

export default Router;
