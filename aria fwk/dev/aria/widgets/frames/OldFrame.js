/*
 * Copyright Amadeus
 */
/**
 * FIXME: missing doc
 * @class aria.widgets.frames.OldFrame
 */
Aria.classDefinition({
	$classpath : 'aria.widgets.frames.OldFrame',
	$extends : "aria.widgets.frames.Frame",
	$constructor : function (cfg) {
        
        /* FIXME: missing doc of public/private/protected properties of this class */
        
		this.$Frame.constructor.call(this, cfg);
		this.setSkinObj(cfg.skinnableClass);
		var cssRoot = cfg["oldStuff:cssRoot"];
		this._wName = cssRoot ? cssRoot : "DIV";
		var _initState = cfg.state; 
		this._initState = (_initState && this._skinObj.states[_initState])
				? this._skinObj.states[_initState]
				: this._skinObj.states.normal;
		if (this.innerWidth > -1) {
			this.innerWidth -= (this._skinObj.spcLeft + this._skinObj.spcRight + this._skinObj.offsetLeft +6); 
		}
		if (this.innerHeight > -1) {
			this.innerHeight -= (this._skinObj.spcTop + this._skinObj.spcBottom);
		}
		var sprType = this._sprTypes[this._skinObj.sprType];
		this.domElementNbr = sprType.domElementNbr;
	},
	$prototype : {
		$init : function (p) {
			p._sprTypes = {
				0 : {
					markupBegin : p._markupBeginStd,
					markupEnd : p._markupEndStd,
					domElementNbr: 1
				},
				1 : {
					markupBegin : p._markupBeginBgRepeat,
					markupEnd : p._markupEndBgRepeat,
					domElementNbr: 1
				},
				2 : {
					markupBegin : p._markupBeginFixedHeight,
					markupEnd : p._markupEndFixedHeight,
					domElementNbr: 2
				}
			};
		},
		
		/**
		 * The main entry point into the Div begin markup. Here we check whether it is a Div, defined in the AriaSkin
		 * object, that has an image that is repeated as a background.
		 * @param {aria.templates.MarkupWriter} out the writer Object to use to output markup
		 * @private
		 */
		writeMarkupBegin : function (out) {
			var skinObj = this._skinObj;
			var sprType = this._sprTypes[skinObj.sprType];
			sprType.markupBegin.call(this,out);
			skinObj = null;
		},

		/**
		 * The main entry point into the Div end markup. Here we check whether it is a Div, defined in the AriaSkin
		 * object, that has an image that is repeated as a background.
		 * @param {aria.templates.MarkupWriter} out the writer Object to use to output markup
		 * @private
		 */
		writeMarkupEnd : function (out) {
			var skinObj = this._skinObj;
			var sprType = this._sprTypes[skinObj.sprType];
			sprType.markupEnd.call(this,out);
			skinObj = null;
		},
		
		/**
		 * A public method to set this objects skin object
		 * @param {String} widgetName
		 */
		setSkinObj : function (widgetName) {
			this._skinObj = aria.widgets.AriaSkinInterface.getSkinObject(widgetName, this._cfg.sclass);
		},
		
		/**
		 * BEGINNING OF BACKGROUND REPEAT MARKUP METHODS The markup begin method for Divs defined in the AriaSkin object
		 * where the background is an image and is repeated.
		 * @param {aria.templates.MarkupWriter} out the writer Object to use to output markup
		 * @private
		 */
		_markupBeginBgRepeat : function (out) {
			var cfg = this._cfg, skinObj = this._skinObj, _sinit = this._initState, sprH = skinObj.sprHeight, cfgH = cfg.height, cfgW = cfg.width, h = (cfgH === -1)
					? ""
					: (cfgH > sprH) ? ";height:" + sprH + "px" : ";height:" + cfgH + "px", w = (cfgW === -1)
					? ""
					: ";width:" + cfgW + "px";

			out.write(['<span class="x', this._wName, 'bkg_', cfg.sclass, '" style="display:inline-block;color:',
					_sinit.color, ';', 'text-align:', _sinit.textAlign, w, ';padding:', skinObj.spcTop, 'px ',
					skinObj.spcRight, 'px ', skinObj.spcBottom, 'px ', skinObj.spcLeft, 'px', h, '">'].join(''));
			cfg = skinObj =_sinit = sprH = cfgH = cfgW = h = w = null;
		},

		/**
		 * The markup end method for Divs defined in the AriaSkin object where the background is an image and is
		 * repeated.
		 * @param {aria.templates.MarkupWriter} out the writer Object to use to output markup
		 * @private
		 */
		_markupEndBgRepeat : function (out) {
			out.write('</span>');
		},

		/**
		 * BEGINNING OF FIXED HEIGHT MARKUP METHODS The markup begin method for the Divs that have a fixed height
		 * sprite. This means that the this._cfg height param isn't applicable.
		 * @param {aria.templates.MarkupWriter} out the writer Object to use to output markup
		 * @private
		 */
		_markupBeginFixedHeight : function (out) {
			var skinObj = this._skinObj, _sinit = this._initState, cfg = this._cfg, spcL = skinObj.spcLeft, spcR = skinObj.spcRight, 
				spcT = skinObj.spcTop, spcB = skinObj.spcBottom, sprW = skinObj.sprWidth, sprH = skinObj.sprHeight, 
				w = (cfg.width === -1) ? "" : (cfg.width > sprW) ? "width:" + (sprW - spcR) + "px;" : "width:" + (cfg.width - spcR - spcL - 6) + "px;", topPos = _sinit.topPos = _sinit.sprIdx * (sprH + 2);

			// store so the markupEnd method can use it.
			var h = skinObj.h = 'height:' + (sprH - spcT - spcB) + 'px;';

			out.write(['<span class="x', this._wName, 'bkg_', cfg.sclass, '" style="color:', _sinit.color,
					';text-align:', _sinit.textAlign, ';display:inline-block;', h, w, 'padding:', spcT, 'px 0 ', spcB,
					'px ', spcL, 'px;vertical-align:top;background-position:0 -', topPos, 'px;">'].join(''));
			skinObj = _sinit = cfg = spcL = spcR = spcT = spcB = sprW = sprH = w = h = null;
		},

		/**
		 * The markup end method for the Divs that have a fixed height sprite. This means that the cfg this._cfg height
		 * param isn't applicable.
		 * @param {aria.templates.MarkupWriter} out the writer Object to use to output markup
		 * @private
		 */
		_markupEndFixedHeight : function (out) {
			var skinObj = this._skinObj, spcR = skinObj.spcRight;
			out.write(['</span>', '<span class="x', this._wName, 'bkg_', this._cfg.sclass,
					'" style="display:inline-block;', skinObj.h, 'width:', spcR, 'px;', 'padding:', skinObj.spcTop, 'px 0 ',
					skinObj.spcBottom, 'px 0;vertical-align:top;background-position:-', skinObj.sprWidth - spcR, 'px -', this._initState.topPos,
					'px;">&nbsp;</span>'].join(''));
			delete(skinObj.h);
			skinObj = spcR =  null;
		},
	
		/**
		 * BEGINNING OF STANDARD MARKUP METHODS The markup begin method for the Divs, defined in the AriaSkin object,
		 * with complex backgrounds from sprites. The html for this type of Div comes from the aria implementation.
		 * @param {aria.templates.MarkupWriter} out
		 * @private
		 */
		_markupBeginStd : function (out) {

			var cfg = this._cfg, 
				sclass = cfg.sclass, 
				skinObj = this._skinObj,
				_sinit = this._initState, 
				_sprIdx = _sinit.sprIdx, 
				offL = skinObj.offsetLeft, 
				spcL = skinObj.spcLeft, 
				spcT = skinObj.spcTop, 
				spcB = skinObj.spcBottom, 
				spcR = skinObj.spcRight, 
				sprW = skinObj.sprWidth, 
				sprH = skinObj.sprHeight, 
				topPos = _sinit.topPos = (_sprIdx)* sprH + 2 * _sprIdx, // could be >0 if multiple sprites
				cfgW = cfg.width, 
				cfgH = cfg.height,
				w = cfgW > -1 ? cfgW - spcL : sprW - spcL, 
				h = (cfgH === -1)
					? ""
					: (cfgH > sprH) ? ";height:" + (sprH - spcB - spcT) + "px" : ";height:" + (cfgH - spcB - spcT)
							+ "px", wName = this._wName;
			
			if (cfgW > -1 && w > sprW) {
				w = sprW;
			}
			out.write([
						// -------------------------------------- Container
						'<span class="x', wName, '_', sclass,'" style="display:block;text-align:', _sinit.textAlign,
						';color:', _sinit.color, 
						(cfgW > -1 ? ';width:' + w + 'px' : ''),';padding-left:',spcL,'px">',
	
						// -------------------------------------- Top Row
						'<span class="x', wName, 'tr x', wName, 'bkg_', sclass, '" style="display:block;padding-right:',
						spcR, 'px;background-position: -', (sprW - w), 'px -', topPos, 'px;">',
	
						'<span class="x', wName, 'trc x',wName, 'bkg_', sclass, ' x', wName, 'c_', 
						sclass,	'" style="display:block;background-position: 0px -',topPos,
						'px">&nbsp;</span>',
						
						'<span style="padding-top:', spcT, 'px;width:', w - spcR, 'px;padding-right:', (spcR - offL),
						'px;display:block;position:relative;left:', offL, 'px', h, '">',
						'<span class="' + cfg.cssClass + '" style="display:block;overflow:auto; position:relative;', h, ';">'].join(''));		
			
			skinObj = cfg = sclass = _sinit = _sprIdx = offL = spcL = spcT = spcB = spcR = sprW = sprH = 
					topPos = cfgW = cfgH = w = h = wName = null;
		},
		/**
		 * The markup end method for the Divs, defined in the AriaSkin object, with complex backgrounds from sprites.
		 * @param {aria.templates.MarkupWriter} out
		 * @private
		 */
		_markupEndStd : function (out) {
			var sclass = this._cfg.sclass, skinObj = this._skinObj, _sinit = this._initState, spcB = skinObj.spcBottom, 
				bottomPos = _sinit.topPos + skinObj.sprHeight - spcB, cfgW = this._cfg.width, sprW = skinObj.sprWidth, 
				spcL = skinObj.spcLeft, 
				w = cfgW > -1
					? cfgW - spcL
					: sprW - spcL, 
				wName = this._wName;

			if (cfgW > -1 && w > sprW)
				w = sprW;
			
			out.write([
					'</span></span>',
					'</span>',
					// -------------------------------------- Bottom Row
					'<span class="x', wName, 'br x', wName, 'bkg_', sclass,
					'" style="display:block;background-position: -', (sprW - w), 'px -', bottomPos, 'px">',
					'<span class="x', wName, 'brc x', wName, 'bkg_', sclass, ' x', wName, 'c_', sclass,
					'" style="height:', spcB, 'px;display:block;background-position: 0px -', bottomPos,
					'px">&nbsp;</span>', '</span>',
					/* background-position:bottom left; */
					'</span>'].join(''));

			skinObj = sclass = _sinit = spcB = bottomPos = cfgW = sprW = spcL = w = wName = null;
		},

        /**
         * FIXME: Missing doc
         */
		changeState : function (stateName) {
			this.$Frame.changeState.call(this,stateName);
			this._changeState(this.getStateObject(),this._domElt);
		},
		
		/**
		 * The main handler method when a state change is required.
		 * @param {Object} state - A state object as defined in the skin object
		 * @param {DOMObject} dom - this dom object
		 * @private
		 */
		_changeState : function (state, dom) {
			// change the color
			dom.style.color = state.color;
			// change the text align
			dom.style.textAlign = state.textAlign;
			var skinObj = this._skinObj;
			// change the sprite background
			// only for divs with a sprite background
			if (!skinObj.bgRepeat) {
				var divs = dom.getElementsByTagName("span"), sprH = skinObj.sprHeight, sprIdx = state.sprIdx, topPos = state.topPos;
				if (divs.length === 0) {
					divs = dom.parentNode.getElementsByTagName("span");
				}
				if (!topPos) {
					topPos = state.topPos = sprIdx * sprH + 2 * sprIdx;
				}
				var bottomPos = topPos + sprH - skinObj.spcBottom, className;
				for (var i = 0; i < divs.length; i++) {
					className = divs[i].className;
					if (className.match(/x[A-Z]{3}tr/) || className.match(/^x[A-X]{3}bkg_.*$/)) {
						this.__changeBgPos(divs[i], topPos);
					} else if (className.match(/x[A-Z]{3}br/)) {
						this.__changeBgPos(divs[i], bottomPos);
					}

				}
				divs = sprH = sprIdx = topPos = bottomPos = null;
			}
			skinObj = null;
		},
		
		/**
		 * A helper method to change the background position
		 * @param {DOMObject} domObj
		 * @param {Integer} newVal
		 * @private
		 */
		__changeBgPos : function (domObj, newVal) {
			var bgPos = domObj.style.backgroundPosition.split(" ");
			domObj.style.backgroundPosition = bgPos[0] + " -" + newVal + "px";
			bgPos = null;
		},
		
        /**
         * FIXME: missing doc
         */
		linkToDom : function (domElt) {
			this.$Frame.linkToDom.call(this,domElt);
			var getDomElementChild = aria.utils.Dom.getDomElementChild;
			var sprType = this._sprTypes[this._skinObj.sprType];
			this._childRootElt = domElt;
		},
		
		/**
		 * Resize the frame to new dimensions.
		 * TODO: this function is not implemented yet for old frames
		 * @param {Number} width New width, or -1 to fit the content width
		 * @param {Number} height New height, or -1 to fit the content height
		 */
		resize: function (width, height) {
			this.$Frame.resize.call(this, width, height);
			// TODO: implement the resize functionality for old frames
		}


	}
});
