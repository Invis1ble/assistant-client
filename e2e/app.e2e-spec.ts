import { AssistantClientPage } from './app.po';

describe('assistant-client App', function() {
  let page: AssistantClientPage;

  beforeEach(() => {
    page = new AssistantClientPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
