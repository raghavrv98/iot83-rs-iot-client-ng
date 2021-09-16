import { render, screen } from '@testing-library/angular';
import { FilterService } from '../filter/services/filter.service';
import { SearchBarComponent } from './search-bar.component';

let component: SearchBarComponent;

render(SearchBarComponent, {
  imports: [],
  declarations: [],
  providers: [],
});

test('it should create FilterComponent', () => {
  component = new SearchBarComponent(new FilterService());
  expect(component).toBeTruthy();
});

test('it should have a search input box', () => {
  expect(screen.getByTestId('searchBox')).toBeInTheDocument();
});
