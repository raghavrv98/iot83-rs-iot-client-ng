import { render } from '@testing-library/angular';
import { SkeletonLoaderComponent } from './skeleton-loader.component';

let component: SkeletonLoaderComponent;

render(SkeletonLoaderComponent, {
  imports: [],
  declarations: [],
  providers: [],
});

test('it should create SkeletonLoaderComponent', () => {
  component = new SkeletonLoaderComponent();
  expect(component).toBeTruthy();
});

test('it should create SkeletonLoaderComponent', () => {
  const num = 2;
  const arbitrarilyNumber = [undefined, undefined];
  component = new SkeletonLoaderComponent();
  const value = component.elementCountHandler(num);
  expect(value).toEqual(arbitrarilyNumber);
});
