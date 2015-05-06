package {
import flash.display.Sprite;
public class test extends Sprite {
public function test() {

(function(modules) {
	var installedModules = {};
	function __jinx_require__(moduleId) {
		if(installedModules[moduleId]) return installedModules[moduleId].exports;
		var module = installedModules[moduleId] = {
			exports: {},
			id: moduleId,
			loaded: false
		};
		modules[moduleId].call(module.exports, module, module.exports, __jinx_require__);
		module.loaded = true;
		return module.exports;
	}
	return __jinx_require__(0);
})

([function(module, exports, __jinx_require__) {
__jinx_require__(1)();

include "../../../../../test/app/flash/partials/bar.as";

},
function(module, exports, __jinx_require__) {
/**
Author : Andre Caetano 2015
Jinx Plugin
**/
import flash.system.*;
import flash.text.*;
import flash.display.*;
import flash.events.Event;
import flash.utils.*;

module.exports = function(){
	var w = 120,
	h = 45,
	margin=5,
	t = 0;
	var newTextField = function(){
		var myFormat:TextFormat = new TextFormat();
		myFormat.size = 12;
		myFormat.align = TextFormatAlign.LEFT;
		myFormat.font = (new visitor()).fontName;

		var myText = new TextField;
		myText.defaultTextFormat=myFormat;
		myText.embedFonts=true;
		myText.antiAliasType=AntiAliasType.ADVANCED;
		myText.text="test test";
		myText.selectable=false;
		myText.textColor=0xFFFFFF;
		myText.x=3;
		myText.y=(13*(t+1))-14;
		myText.alpha=0.9;
		panel.addChild(myText);

		++t;
		return myText;
	}

	var panel = new MovieClip();

	panel.x=margin;
	panel.y=(stage.stageHeight/2)-(h/2);
	panel.mouseEnabled=false;
	panel.mouseChildren=false;
	addChild(panel);

	var bkg = (new Bitmap((new BitmapData(w,h,false,0x444444))));
	bkg.alpha=0.75;
	panel.addChild(bkg);

	var rows = [];
	for(var i=0;i<3;i++) rows[i]=newTextField();

	var frames:int=0;
	var prevTimer:Number=0;
	var curTimer:Number=0;

	var childrenCount:int=0;
	function countDisplayList(container:DisplayObjectContainer):void {
		childrenCount+=container.numChildren;
		for (var i=0;i<container.numChildren;i++) if(container.getChildAt(i) is DisplayObjectContainer) countDisplayList(DisplayObjectContainer(container.getChildAt(i)));
	}

	stage.addEventListener(Event.ENTER_FRAME,function(){
		childrenCount=0;
		++frames;
		curTimer=getTimer();
		countDisplayList(stage);
		if(curTimer-prevTimer>=1000){
			rows[0].text="FPS: "+(Math.round(frames*1000/(curTimer-prevTimer)))+" / "+stage.frameRate;
			prevTimer=curTimer;
			frames=0;
		}

		rows[1].text="Memory: "+(Math.floor((System.totalMemory/1024)/10)/100);
		rows[2].text="Particles: "+childrenCount;
	});
}

}]);
}}}