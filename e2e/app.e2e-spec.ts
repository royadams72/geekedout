import { GeekedoutPage } from './app.po';

describe('geekedout App', () => {
  let page: GeekedoutPage;

  beforeEach(() => {
    page = new GeekedoutPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
