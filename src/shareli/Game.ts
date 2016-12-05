module shareli {

	export class Game extends egret.DisplayObjectContainer{
		static stageW:number;
		static stageH:number;
		private speed:number;
		private score:number = 0;
		private isPause:boolean = false;
		private mb:Array<Array<number>>;
		private mbLength:number;
		private scrollTimer:egret.Timer;
		private tw:egret.Tween;
		private tip:egret.TextField;
		private trackContainer;

		public constructor() {
			super();
			this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
		}


		private  onAddToStage():void{
			Game.stageW  = this.stage.stageWidth;
			Game.stageH  = this.stage.stageHeight;
            //tw.call(change, self);
			this.removeEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
            this.createGameScene();
		}

		public clickNote(note:MusicalNote){
			if(!this.isPause){
				if(note.noteType == MusicalNote.NOTE_TYPE_BLACK){
					let tw = egret.Tween.get(note);
					tw.to({"alpha": 0}, 100);
					this.score += 100;
					this.setScore(this.score);
				}else{
					this.tw.setPaused(true);
					this.isPause = true;
				}
			}
				
		}

		private loopOver(){
			if(!this.isPause){
				this.speed -= 100;
				if(this.speed == 100){
					this.tw.pause();
					this.tip.text = "你胜利了！";
				}else{
					this.y = 0;
					setTimeout(function(){
						console.info(this.speed);
						this.tw = egret.Tween.get(this.trackContainer);
						this.tw.to({"y": this.mbLength * MusicalNoteGroup.NOTE_HEIGHT + 
						Game.stageH - MusicalNoteGroup.NOTE_HEIGHT}, this.speed)
						.call(this.loopOver);
					}, 1000);
					
				}
			}
		}


		public setScore(score){
			this.tip.text = score;
		}

		public createGameScene(){
			this.trackContainer = new egret.DisplayObjectContainer();
			this.addChild(this.trackContainer);
			this.speed = 8000;
			this.mb = [
					[0,0,1,0],
                    [1,0,0,0],
                    [0,0,1,0],
                    [0,1,0,0],
                    [0,0,1,0],
                    [1,0,0,0],
                    [0,0,1,0],
                    [0,1,0,0],
					[0,0,1,0],
                    [1,0,0,0],
                    [0,0,1,0],
                    [0,1,0,0],
					[0,0,1,0],
                    [1,0,0,0],
                    [0,0,1,0],
                    [0,1,0,0],
					[0,0,1,0],
                    [1,0,0,0],
                    [0,0,1,0],
                    [0,1,0,0],
					[0,0,1,0],
                    [1,0,0,0],
                    [0,0,1,0],
                    [0,1,0,0],
			];
			this.mbLength = this.mb.length;
			for(let i=0; i<this.mb.length; i++){
				var noteGroup:MusicalNoteGroup =  MusicalNoteGroup.create(this.mb[i]);
				noteGroup.x = 0;
				noteGroup.y = - MusicalNoteGroup.NOTE_HEIGHT*i;
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
            this.tw.to({"y": this.mb.length * MusicalNoteGroup.NOTE_HEIGHT + 
				Game.stageH - MusicalNoteGroup.NOTE_HEIGHT}, this.speed)
				.call(this.loopOver);
		}

	}
}