import { NumismaFrontPage } from './app.po';

describe('numisma-front App', () => {
  let page: NumismaFrontPage;

  beforeEach(() => {
    page = new NumismaFrontPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
