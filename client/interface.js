var main = function(memory){
	view.call(this, memory);
	this.element.id += 'main';
};

main.prototype.fill = function(page){
	view.prototype.fill.call(this, page.content);
};

main.prototype.clear = function(){

};

main.prototype.update = function(){

};

main.prototype.extend = function(){

};

var menu = function(memory){
	view.call(this, memory);
	this.element.id += 'menu';
	this.element.setAttribute('data-state','hidden');
};

menu.prototype.toggle = function(){
	if(this.element.getAttribute('data-state') != 'hidden'){
		this.element.setAttribute('data-state', 'hidden');
	} else {
		this.element.setAttribute('data-state', 'open');
	}
}

var header = function(){
	this.element = document.createElement('header');
	this.element.id = 'header';
	this.navigation = document.createElement('button');
	this.navigation.className = 'button';
	this.navigation.textContent = 'menu';
	this.element.appendChild(this.navigation);
	this.logo = document.createElement('button');
	this.logo.className = 'button';
	this.logo.id = 'logo';
	this.logo.textContent = 'home';
	this.element.appendChild(this.logo);
	this.search = document.createElement('form');
	this.search.className = 'search';
	this.query = document.createElement('input');
	this.query.className = 'query';
	this.search.appendChild(this.query);
	this.submit = document.createElement('button');
	this.submit.className = 'button submit';
	this.submit.textContent = 'search';
	this.search.appendChild(this.submit);
	this.element.appendChild(this.search);
};