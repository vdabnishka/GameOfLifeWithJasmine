/// <reference path='Cell.js' />

var Plane = function (width, height, initialConditions) {

        var _width;
        var _height;
        var _cells = [];

        var createPlane = function (initialConditions) {
            for (var r = 0; r < _height; r++) {
                _cells.push(createRow(initialConditions != undefined ? initialConditions[r] : undefined));
            }
        };

        var createRow = function (initialState) {
            var row = [];
            for (c = 0; c < _width; c++) {
                row.push(new Cell(initialState != undefined ? initialState[c] : false));
            }

            return row;
        };

        if (initialConditions === undefined) {
            _width = width;
            _height = height;

            for (var r = 0; r < _height; r++) {
                _cells.push(createRow());
            }
        }
        else {
            _height = initialConditions.length;
            _width = initialConditions[0].length;

            for (var r = 0; r < _height; r++) {
                _cells.push(createRow(initialConditions[r]));
            }
        }

    var getMinBoundaryFor = function (index) {
        var min = index - 1;
        if (min < 0) min = 0;

        return min;
    };

    var getMaxColumnFor = function (column) {
        var max = column + 1;

        if (max >= _width) max = _width - 1;

        return max;
    };

    var getMaxRowFor = function (row) {
        var max = row + 1;

        if (max >= _height) max = _height - 1;

        return max;
    };

    this.GetWidth = function () { return _width; };
    this.GetHeight = function () { return _height; };

    this.GetAt = function (x, y) { return _cells[y][x]; };

    this.GetAliveNeighboursFor = function (x, y) {
        var aliveCount = 0;

        for (var r = getMinBoundaryFor(y); r <= getMaxRowFor(y); r++) {
            if ((r < 0) || (r >= this.GetHeight())) continue;

            for (var c = getMinBoundaryFor(x); c <= getMaxColumnFor(x); c++) {
                if ((c < 0) || (c >= this.GetWidth())) continue;

                if ((c === x && r === y)) continue;
                aliveCount += this.GetAt(c, r).IsAlive() ? 1 : 0;
            }
        }

        return aliveCount;
    };
};
