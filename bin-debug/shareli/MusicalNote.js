var shareli;
(function (shareli) {
    /**
     * 音符类
     */
    var MusicalNote = (function (_super) {
        __extends(MusicalNote, _super);
        function MusicalNote() {
            _super.call(this);
        }
        var d = __define,c=MusicalNote,p=c.prototype;
        p.init = function (noteType, x, y, w, h) {
            this.noteType = noteType;
            this.x = x;
            this.y = y;
            this.width = w;
            this.height = h;
            if (this.noteType === MusicalNote.NOTE_TYPE_BLACK) {
                this.graphics.beginFill(0x000000);
            }
            else {
                this.graphics.beginFill(0xffffff);
            }
            this.graphics.drawRect(0, 0, w, h);
            this.graphics.endFill();
            this.touchEnabled = true;
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                Main.game.clickNote(this);
            }, this);
        };
        MusicalNote.cacheDict = {};
        MusicalNote.NOTE_TYPE_BLACK = "black"; //白块
        MusicalNote.NOTE_TYPE_WHITE = "white"; //黑块
        return MusicalNote;
    }(egret.Shape));
    shareli.MusicalNote = MusicalNote;
    egret.registerClass(MusicalNote,'shareli.MusicalNote');
    /**
     * 一组音符
     */
    var MusicalNoteGroup = (function (_super) {
        __extends(MusicalNoteGroup, _super);
        function MusicalNoteGroup() {
            _super.call(this);
        }
        var d = __define,c=MusicalNoteGroup,p=c.prototype;
        MusicalNoteGroup.create = function (group) {
            var noteWidth = Math.floor(shareli.Game.stageW / MusicalNoteGroup.TRACK_NUM);
            var noteGroup = new MusicalNoteGroup();
            for (var i = 0; i < MusicalNoteGroup.TRACK_NUM; i++) {
                var noteType = void 0;
                if (group[i] == 0) {
                    noteType = MusicalNote.NOTE_TYPE_WHITE;
                }
                else {
                    noteType = MusicalNote.NOTE_TYPE_BLACK;
                }
                var note = new MusicalNote();
                note.init(noteType, i * noteWidth + 1, 0, noteWidth, MusicalNoteGroup.NOTE_HEIGHT);
                noteGroup.addChild(note);
            }
            return noteGroup;
        };
        MusicalNoteGroup.TRACK_NUM = 4; //4轨
        MusicalNoteGroup.NOTE_HEIGHT = 200; //音符长度
        return MusicalNoteGroup;
    }(egret.DisplayObjectContainer));
    shareli.MusicalNoteGroup = MusicalNoteGroup;
    egret.registerClass(MusicalNoteGroup,'shareli.MusicalNoteGroup');
})(shareli || (shareli = {}));
//# sourceMappingURL=MusicalNote.js.map