import {} from 'jasmine';
import { InfoPopupModule } from './info-popup.module';

describe('InfoPopupModule', () => {
  let infoPopupModule: InfoPopupModule;

  beforeEach(() => {
    infoPopupModule = new InfoPopupModule();
  });

  it('should create an instance', () => {
    expect(infoPopupModule).toBeTruthy();
  });
});
