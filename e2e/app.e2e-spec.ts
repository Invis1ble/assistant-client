import { AssistantPage } from './app.po';

describe('assistant App', function() {
  let page: AssistantPage;

  beforeEach(() => {
    page = new AssistantPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
