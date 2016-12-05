var shareli;
(function (shareli) {
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game() {
            _super.call(this);
            this.score = 0;
            this.isPause = false;
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }
        var d = __define,c=Game,p=c.prototype;
        p.onAddToStage = function () {
            Game.stageW = this.stage.stageWidth;
            Game.stageH = this.stage.stageHeight;
            //tw.call(change, self);
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.createGameScene();
        };
        p.clickNote = function (note) {
            if (!this.isPause) {
                if (note.noteType == shareli.MusicalNote.NOTE_TYPE_BLACK) {
                    var tw = egret.Tween.get(note);
                    tw.to({ "alpha": 0 }, 100);
                    this.score += 100;
                    this.setScore(this.score);
                }
                else {
                    this.tw.setPaused(true);
                    this.isPause = true;
                }
            }
        };
        p.loopOver = function () {
            if (!this.isPause) {
                this.speed -= 100;
                if (this.speed == 100) {
                    this.tw.pause();
                    this.tip.text = "你胜利了！";
                }
                else {
                    this.y = 0;
                    setTimeout(function () {
                        console.info(this.speed);
                        this.tw = egret.Tween.get(this.trackContainer);
                        this.tw.to({ "y": this.mbLength * shareli.MusicalNoteGroup.NOTE_HEIGHT +
                                Game.stageH - shareli.MusicalNoteGroup.NOTE_HEIGHT }, this.speed)
                            .call(this.loopOver);
                    }, 1000);
                }
            }
        };
        p.setScore = function (score) {
            this.tip.text = score;
        };
        p.createGameScene = function () {
            this.trackContainer = new egret.DisplayObjectContainer();
            this.addChild(this.trackContainer);
            this.speed = 8000;
            this.mb = [
                [0, 0, 1, 0],
                [1, 0, 0, 0],
                [0, 0, 1, 0],
                [0, 1, 0, 0],
                [0, 0, 1, 0],
                [1, 0, 0, 0],
                [0, 0, 1, 0],
                [0, 1, 0, 0],
                [0, 0, 1, 0],
                [1, 0, 0, 0],
                [0, 0, 1, 0],
                [0, 1, 0, 0],
                [0, 0, 1, 0],
                [1, 0, 0, 0],
                [0, 0, 1, 0],
                [0, 1, 0, 0],
                [0, 0, 1, 0],
                [1, 0, 0, 0],
                [0, 0, 1, 0],
                [0, 1, 0, 0],
                [0, 0, 1, 0],
                [1, 0, 0, 0],
                [0, 0, 1, 0],
                [0, 1, 0, 0],
            ];
            this.mbLength = this.mb.length;
            for (var i = 0; i < this.mb.length; i++) {
                var noteGroup = shareli.MusicalNoteGroup.create(this.mb[i]);
                noteGroup.x = 0;
                noteGroup.y = -shareli.MusicalNoteGroup.NOTE_HEIGHT * i;
                this.trackContainer.addChild(noteGroup);
            }
            this.tip = new egret.TextField();
            this.tip.textColor = 0xff0000;
            this.tip.text = "0";
            this.tip.width = Game.stageH;
            this.tip.height = 300;
            this.tip.textAlign = egret.HorizontalAlign.CENTER;
            this.tip.verticalAlign = egret.VerticalAlign.MIDDLE;
            Main.main.addChild(this.tip);
            this.tw = egret.Tween.get(this.trackContainer);
            this.tw.to({ "y": this.mb.length * shareli.MusicalNoteGroup.NOTE_HEIGHT +
                    Game.stageH - shareli.MusicalNoteGroup.NOTE_HEIGHT }, this.speed)
                .call(this.loopOver);
        };
        return Game;
    }(egret.DisplayObjectContainer));
    shareli.Game = Game;
    egret.registerClass(Game,'shareli.Game');
})(shareli || (shareli = {}));
//# sourceMappingURL=Game.js.map