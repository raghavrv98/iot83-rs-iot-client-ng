import { AuthGuard } from './auth.guard';
describe('AuthGuard', () => {
  let guard: AuthGuard;
  const router = { navigate: jest.fn(() => true), };
  const mockRouteAndState = (queryParams, url) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const route = { queryParams, };
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const state = { url, };
    return { route, state };
  };

  beforeEach(() => {
    sessionStorage.clear();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    guard = new AuthGuard(router as any);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should return true if url is public and not signed in', () => {
    const { route, state } = mockRouteAndState({}, '/login');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const success = guard.canActivate(route as any, state as any);
    expect(success).toBe(true);
  });

  it('should return true if url is protected and signed in', () => {
    const { route, state } = mockRouteAndState({}, '/home');
    const idToken = 'test-id-token';
    sessionStorage.setItem('id_token', idToken);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const success = guard.canActivate(route as any, state as any);
    expect(success).toBe(true);
  });

  it('should navigate to login if url is protected and not signed in', () => {
    const { route, state } = mockRouteAndState({}, '/home');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const success = guard.canActivate(route as any, state as any);
    expect(success).toBe(true);
    expect(router.navigate).toHaveBeenCalled();
  });

  it('should navigate to home if url is public and signed in', () => {
    const { route, state } = mockRouteAndState({}, '/login');
    const idToken = 'test-id-token';
    sessionStorage.setItem('id_token', idToken);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const success = guard.canActivate(route as any, state as any);
    expect(success).toBe(true);
    expect(router.navigate).toHaveBeenCalled();
  });
});
