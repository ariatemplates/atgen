/*
 * Copyright Amadeus
 */
/**
 * TODOC
 * @class aria.widgets.calendar.CalendarTemplateScript
 */
Aria.tplScriptDefinition({
	$classpath : 'aria.widgets.calendar.CalendarTemplateScript',
	$prototype : {
		onModuleEvent : function (evt) {
			if (evt.name == "update") {
				var valueInfos = evt.properties['value'];
				if (evt.propertiesNbr == 1 && valueInfos) {
					this.updateClass(valueInfos.oldValuePosition);
					this.updateClass(valueInfos.newValuePosition);
					if(evt.propertyshowShortcuts){
						this.$refresh({
						outputSection : "selectedDay"
						});
					}
				} else {
					this.$refresh();
				}
			}
		},

		updateClass : function (position) {
			if (position == null || position.month == null) {
				return;
			}
			var weekWrapper = this.$getChild("month_" + position.month.monthKey, position.weekInMonthIndex);
			var dayWrapper = weekWrapper.getChild((this.settings.showWeekNumbers ? 1 : 0) + position.dayInWeekIndex);
			dayWrapper.classList.setClassName(this.getClassForDay(position.day));
			dayWrapper.$dispose();
			weekWrapper.$dispose();
		},

		clickDay : function (evt) {
			var date = evt.target.getExpando("date");
			if (date) {
				var jsDate = new Date(parseInt(date));
				this.moduleCtrl.dateClick({
					date : jsDate
				});
			}
		},

		getClassForDay : function (day) {
			var res = [];
			var baseCSS = this.skin.baseCSS;
			res.push(baseCSS+"day");
			res.push(baseCSS+"mouseOut");
			if (day.isWeekend && day.isSelectable) {
				res.push(baseCSS+"weekEnd");
			}
			if (day.isSelected) {
				res.push(baseCSS+"selected");
			}
			if (day.isToday) {
				res.push(baseCSS+"today");
			}
			res.push(day.isSelectable ? baseCSS+"selectable" : baseCSS+"unselectable");
			return res.join(' ');
		},

		mouseOverDay : function (evt) {
			var date = evt.target.getExpando("date");
			if (date) {
				evt.target.classList.setClassName(evt.target.getClassName().replace(this.skin.baseCSS+"mouseOut", this.skin.baseCSS+"mouseOver"));
			}
		},

		mouseOutDay : function (evt) {
			var date = evt.target.getExpando("date");
			if (date) {
				evt.target.classList.setClassName(evt.target.getClassName().replace(this.skin.baseCSS+"mouseOver", this.skin.baseCSS+"mouseOut"));
			}
		}
	}
});