import { SideNavigationModule } from './side-navigation.module';

describe('SideNavigationModule', () => {
  let sideNavigationModule: SideNavigationModule;

  beforeEach(() => {
    sideNavigationModule = new SideNavigationModule();
  });

  it('should create an instance', () => {
    expect(sideNavigationModule).toBeTruthy();
  });
});
