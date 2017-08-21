import { FriendlyAppNamePipe } from './friendly-app-name.pipe';

describe('FriendlyAppNamePipe', () => {
  it('create an instance', () => {
    const pipe = new FriendlyAppNamePipe();
    expect(pipe).toBeTruthy();
  });
});
