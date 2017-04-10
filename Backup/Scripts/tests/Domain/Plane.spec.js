/// <reference path='../../jasmine-1.3.1/jasmine.js' />
/// <reference path='../../Domain/Plane.js' />

describe('Plane', function () {
    it('takes dimensions as parameters', function () {
        var plane = new Plane(3, 4);
        expect(plane.GetWidth()).toBe(3);
        expect(plane.GetHeight()).toBe(4);
    });

    it('creates cells', function () {
        var plane = new Plane(1, 1);
        expect(plane.GetAt(0, 0)).toEqual(jasmine.any(Cell));
    });

    it('takes initial conditions as a parameter', function () {
        var plane = new Plane(0, 0, [[1]]);
        expect(plane.GetWidth()).toBe(1);
        expect(plane.GetHeight()).toBe(1);
    });

    it('creates the cells according to initial conditions', function () {
        var plane = new Plane(0, 0, [[1]]);
        expect(plane.GetAt(0, 0).IsAlive()).toBe(1);
    });

    it('counts the number of alive neighbours', function () {
        var plane = new Plane(3, 3);
        expect(plane.GetAliveNeighboursFor(1, 1)).toBe(0);

        plane = new Plane(0, 0, [[1, 1, 1], [0, 0, 0], [0, 0, 0]]);
        expect(plane.GetAliveNeighboursFor(1, 1)).toBe(3);

        plane = new Plane(0, 0, [[1, 1, 1], [0, 1, 0], [0, 0, 0]]);
        expect(plane.GetAliveNeighboursFor(1, 1)).toBe(3);
    });

    it('counts the number of alive neighbours for cells on the wall', function () {
        var plane = new Plane(0, 0, [[1, 1, 0]]);
        expect(plane.GetAliveNeighboursFor(1, 0)).toBe(1);
    });
});