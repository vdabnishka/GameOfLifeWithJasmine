/// <reference path='Plane.js' />
/// <reference path='Cell.js' />

var God = function (plane) {
    var _plane = plane;

    this.GetNewStateFor = function (x, y) {
        var aliveNeighbours = _plane.GetAliveNeighboursFor(x, y);
        var cell = _plane.GetAt(x, y);
        return new Cell(aliveNeighbours == 3 || (cell.IsAlive() && aliveNeighbours == 2));
    };
};