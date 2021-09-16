import { PAGE_SIZES } from '../pagination-data';
import { PaginationService } from './pagination.service';

describe('PaginationService', () => {
  let service: PaginationService;

  beforeEach(() => {
    service = new PaginationService();
  });

  it('should get all page sizes', (done) => {
    const value = service.getPageSizes();
    expect(value).toBe(PAGE_SIZES);
    done();
  });

  it('it should change page size', (done) => {
    const pageSize = 10;
    const totalRecordsFiltered = 49;
    const arbitrarilyLastPage = 5;
    const lastPage = service.changePageSize(pageSize, totalRecordsFiltered);
    expect(lastPage).toBe(arbitrarilyLastPage);
    done();
  });

  it('it should jump on page according to input page number', (done) => {
    const mockCurrentPage = 1;
    const arbitrarilyCurrentPage = 1;
    const lastPage = 5;
    const currentPage = service.onCurrentPageChangeHandler(mockCurrentPage, lastPage);
    expect(currentPage).toBe(arbitrarilyCurrentPage);
    done();
  });

  it('it should jump on last page if user enter number more then available page', (done) => {
    const mockCurrentPage = 10;
    const arbitrarilyCurrentPage = 5;
    const lastPage = 5;
    const currentPage = service.onCurrentPageChangeHandler(mockCurrentPage, lastPage);
    expect(currentPage).toBe(arbitrarilyCurrentPage);
    done();
  });

  it('it should jump on first page if user enter number less then available page', (done) => {
    const mockCurrentPage = -10;
    const arbitrarilyCurrentPage = 1;
    const lastPage = 5;
    const currentPage = service.onCurrentPageChangeHandler(mockCurrentPage, lastPage);
    expect(currentPage).toBe(arbitrarilyCurrentPage);
    done();
  });

  it('it should jump to previous page when fastBackward is false', (done) => {
    const mockCurrentPage = 2;
    const arbitrarilyCurrentPage = 1;
    const fastBackward = false;
    const currentPage = service.onClickPrevious(fastBackward, mockCurrentPage);
    expect(currentPage).toBe(arbitrarilyCurrentPage);
    done();
  });

  it('it should jump to 3rd previous page when fastBackward is true', (done) => {
    const mockCurrentPage = 5;
    const arbitrarilyCurrentPage = 2;
    const fastBackward = true;
    const currentPage = service.onClickPrevious(fastBackward, mockCurrentPage);
    expect(currentPage).toBe(arbitrarilyCurrentPage);
    done();
  });

  it('it should jump to next page when fastForward is false', (done) => {
    const mockCurrentPage = 1;
    const arbitrarilyCurrentPage = 2;
    const fastForward = false;
    const currentPage = service.onClickNext(fastForward, mockCurrentPage);
    expect(currentPage).toBe(arbitrarilyCurrentPage);
    done();
  });

  it('it should jump to 3rd next page when fastForward is true', (done) => {
    const mockCurrentPage = 1;
    const arbitrarilyCurrentPage = 4;
    const fastForward = true;
    const currentPage = service.onClickNext(fastForward, mockCurrentPage);
    expect(currentPage).toBe(arbitrarilyCurrentPage);
    done();
  });

});
