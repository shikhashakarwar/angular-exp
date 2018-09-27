import {} from 'jasmine';
import { GetStartedModule } from './get-started.module';

describe('GetStartedModule', () => {
  let getStartedModule: GetStartedModule;

  beforeEach(() => {
    getStartedModule = new GetStartedModule();
  });

  it('should create an instance', () => {
    expect(getStartedModule).toBeTruthy();
  });
});
