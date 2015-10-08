var GameFromScratch;
(function (GameFromScratch) {
    var GameManager = (function () {
        function GameManager() {
            if (GameManager._instance) {
                throw new Error("Error:Instantiation failed, use singleton Mode");
            }
            GameManager._instance = this;
        }
        GameManager.getInstance = function () {
            return GameManager._instance;
        };
        GameManager.prototype.update = function () {
        };
        GameManager._instance = new GameManager();
        return GameManager;
    })();
    GameFromScratch.GameManager = GameManager;
})(GameFromScratch || (GameFromScratch = {}));
//# sourceMappingURL=GameManager.js.map