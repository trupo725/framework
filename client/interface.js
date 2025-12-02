var main = function(memory){
	view.call(this, memory);
	this.element.id += 'main';
};

main.prototype.fill = function(page){
	view.prototype.fill.call(this, page.content);
};

main.prototype.clear = function(){

};

var menu = function(memory){
	view.call(this, memory);
	this.element.id += 'menu';
};

var header = function(){
	this.element = document.createElement('header');
	this.element.id = 'header';
};