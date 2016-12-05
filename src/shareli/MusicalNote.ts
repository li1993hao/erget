
module shareli{
	/**
	 * 音符类
	 */
    export	class MusicalNote extends egret.Shape{
		
		private static cacheDict:Object = {};


		public noteType:string;//音符类型 
		
		static NOTE_TYPE_BLACK:string = "black"; //白块

		static NOTE_TYPE_WHITE:string = "white"; //黑块

		public constructor(){
			super();
		
		}
		
		public  init(noteType:string,x:number,y:number,w:number,h:number){
			this.noteType = noteType;
			this.x = x;
			this.y = y;
			this.width = w;
			this.height = h;
			if(this.noteType === MusicalNote.NOTE_TYPE_BLACK){
				this.graphics.beginFill(0x000000);
			}else{
				this.graphics.beginFill(0xffffff);
			}
			this.graphics.drawRect(0, 0, w, h);
			this.graphics.endFill();
			this.touchEnabled = true;
			this.addEventListener(egret.TouchEvent.TOUCH_TAP, function(){
				Main.game.clickNote(this);
			}, this);
		}

	}

	/**
	 * 一组音符
	 */
	export class MusicalNoteGroup extends egret.DisplayObjectContainer{
			//乐谱
			private musical:Array<Array<number>>;
			static TRACK_NUM:number = 4; //4轨
			static NOTE_HEIGHT = 200; //音符长度

			public constructor(){
				super();
			}

			public static create(group:Array<number>){
				let noteWidth:number = Math.floor(Game.stageW/MusicalNoteGroup.TRACK_NUM);
				var noteGroup:MusicalNoteGroup = new MusicalNoteGroup();

				for(let i=0; i<MusicalNoteGroup.TRACK_NUM; i++){
					let noteType:string;
					if(group[i] == 0){
						noteType = MusicalNote.NOTE_TYPE_WHITE;
					}else{
						noteType = MusicalNote.NOTE_TYPE_BLACK;
					}
				 	var  note:MusicalNote = new MusicalNote();
					 note.init(noteType,i * noteWidth + 1,
					 0,
					 noteWidth,
					 MusicalNoteGroup.NOTE_HEIGHT);

					noteGroup.addChild(note);
				}
				return noteGroup;
			}

	}
}
