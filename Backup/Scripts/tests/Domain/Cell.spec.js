/// <reference path='../../jasmine-1.3.1/jasmine.js' />
/// <reference path='../../Domain/Cell.js' />

describe('Cell', function () {
    it('is dead by default', function () {
        var cell = new Cell();
        expect(cell.IsAlive()).toBe(false);
    });

    it('retains state passed as parameter', function () {
        var cell = new Cell(true);
        expect(cell.IsAlive()).toBe(true);
    });
});