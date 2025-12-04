element.call(this);
this.element.className += ' test';

this.fill = function(data, metadata){
	return element.prototype.fill.call(this, data);
};

this.clear = function(){
	element.prototype.clear.call(this);
};