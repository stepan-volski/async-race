import Component from "../../components/abstract/component";

class Page {
  name: string;
  initialisedComponents: Component[];
  isPageInited: boolean;
  pageContainer: HTMLElement;

  constructor(name: string) {
    this.name = name;
    this.initialisedComponents = [];
    this.isPageInited = false;
    this.pageContainer = document.createElement('div');
    this.pageContainer.setAttribute("id", `${this.name}`);
    document.body.appendChild(this.pageContainer);
  }

  openPage(): void {
    this.pageContainer.style.display = "block";
  }

  closePage(): void {
    this.pageContainer.style.display = "none";
  }

  showPage(): void {
    if (this.isPageInited) {
      this.openPage();
    } else {
      this.initPage()
    }
  }

  initPage(): void {
    this.render();
    this.initComponents();
    this.initController();
    this.isPageInited = true;
  }

  render(): void {
    //
  }

  initComponents(): void {
  //
  }

  initController(): void {
  //
  }
}

export default Page;
