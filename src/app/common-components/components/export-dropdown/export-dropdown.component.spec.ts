import { fireEvent, render, screen } from '@testing-library/angular';
import { FilterService } from '../filter/services/filter.service';
import { ExportDropdownComponent } from './export-dropdown.component';


let component: ExportDropdownComponent;

render(ExportDropdownComponent, {
  imports: [],
  declarations: [],
  providers: [],
});

test('it should create ExportDropdownComponent', () => {
  component = new ExportDropdownComponent(new FilterService());
  expect(component).toBeTruthy();
});

test('it should open export as menu', () => {
  const exportButtonClick = fireEvent.click(screen.getByRole('button', { name: /export/i }));
  expect(exportButtonClick).toBeTruthy();
});

test('it should have export menu items', () => {
  const exportAsCSV = screen.getByTestId('exportAsCSV').textContent;
  const exportAsExcel = screen.getByTestId('exportAsExcel').textContent;

  expect(exportAsCSV).toEqual('Export as CSV');
  expect(exportAsExcel).toEqual('Export as Excel');

  expect(fireEvent.click(screen.getByText(/export as csv/i))).toBeTruthy();
});
