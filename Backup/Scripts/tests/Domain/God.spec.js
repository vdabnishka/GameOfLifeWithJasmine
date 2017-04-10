/// <reference path='../../jasmine-1.3.1/jasmine.js' />
/// <reference path='../../Domain/God.js' />

describe('God', function () {
    var plane;

    var actualState;

    var expectedCoordinates = {};
    var expectedState;
    var verifyExpectations;

    var setExpectations = function (expectedX, expectedY, expectedNewState, mockOldState, mockAliveNeighbours) {
        expectedCoordinates = { x: expectedX, y: expectedY };
        expectedState = expectedNewState;

        spyOn(plane, 'GetAliveNeighboursFor').andReturn(mockAliveNeighbours);
        spyOn(plane, 'GetAt').andReturn(new Cell(mockOldState));

        verifyExpectations = true;
    };

    beforeEach(function () {
        plane = new Plane(3, 3);
        verifyExpectations = false;
    });

    afterEach(function () {
        if (verifyExpectations) {
            expect(actualState).toBe(expectedState);

            expect(plane.GetAt).toHaveBeenCalledWith(expectedCoordinates.x, expectedCoordinates.y);
            expect(plane.GetAliveNeighboursFor).toHaveBeenCalledWith(expectedCoordinates.x, expectedCoordinates.y);
        }
    });

    var getNewStateForCoordinates = function (x, y) {
        return new God(plane).GetNewStateFor(x, y).IsAlive();
    };

    it('takes a plane as parameter', function () {
        expect(new God(plane)).toEqual(jasmine.any(God));
    });

    it('leaves a cell dead if it has no alive neighbours', function () {
        setExpectations(1, 1, false, false, 0);
        actualState = getNewStateForCoordinates(1, 1);
    });

    it('makes a dead cell alive if it has 3 alive neighbours', function () {
        setExpectations(1, 1, true, false, 3);
        actualState = getNewStateForCoordinates(1, 1);
    });

    it('leaves a live cell alive if it has 3 alive neighbours', function () {
        setExpectations(1, 1, true, true, 3);
        actualState = getNewStateForCoordinates(1, 1);
    });

    it('leaves a live cell alive if it has 2 alive neighbours', function () {
        setExpectations(1, 1, true, true, 2);
        actualState = getNewStateForCoordinates(1, 1);
    });

    it('leaves a dead cell dead if it has 2 alive neighbours', function () {
        setExpectations(1, 1, false, false, 2);
        actualState = getNewStateForCoordinates(1, 1);
    });

    it('makes a dead cell in a corner alive if it has 3 alive neighbours', function () {
        setExpectations(0, 0, true, false, 3);
        actualState = getNewStateForCoordinates(0, 0);
    });

    it('makes a dead cell on a wall alive if it has 3 alive neighbours', function () {
        setExpectations(1, 0, true, false, 3);
        actualState = getNewStateForCoordinates(1, 0);
    });
});