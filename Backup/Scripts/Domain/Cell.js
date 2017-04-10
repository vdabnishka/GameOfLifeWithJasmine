var Cell = function (isAlive) {
    var _isAlive = isAlive != undefined ? isAlive : false;

    this.IsAlive = function () {
        return _isAlive;
    };
};