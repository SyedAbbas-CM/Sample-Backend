import { MorganLoggerMiddleware } from './morgan-logger.middleware';

describe('MorganLoggerMiddleware', () => {
  it('should be defined', () => {
    expect(new MorganLoggerMiddleware()).toBeDefined();
  });
});
