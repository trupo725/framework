var element = function(){
	this.element = document.createElement('div');
	this.element.className = 'element';
	this.element.id = null;
	this.clean = true;
};

element.prototype.fill = function(data){
	this.element.id = data.id;
	this.clean = false;

	return this.element;
};

element.prototype.clear = function(){
	this.element.id = null;
	this.clean = true
};

var error = function(){
	element.call(this);
	this.element.className += ' error';
	this.type = document.createElement('h2');
	this.type.className = 'type';
	this.element.appendChild(this.type);
	this.recommendation = document.createElement('p');
	this.recommendation.className = 'recommendation';
	this.element.appendChild(this.recommendation);
	this.data = null;
};

error.prototype.fill = function(data, metadata){
	this.type.textContent = metadata.type;
	this.recommendation.textContent = metadata.recommendation;
	this.data = data;

	return element.prototype.fill.call(this, data);
};

error.prototype.clear = function(){
	this.type.textContent = null;
	this.recommendation.textContent = null;
	this.data = null;

	element.prototype.clear.call(this);
};

var placeholder = function(){
	element.call(this);
	this.element.className += ' placeholder';
	this.data = null;
};

placeholder.prototype.fill = function(data, metadata){
	this.data = data;

	return element.prototype.fill.call(this, data);
};

placeholder.prototype.clear = function(){
	this.data = null;

	element.prototype.clear.call(this);
};

var pool = function(template, count){
	this.template = template;
	this.content = [];

	for(let i = 0; i < count; i++){
		this.content[i] = new this.template();
	}
};

pool.prototype.fill = function(data, metadata){
	if(!this.content[this.content.length - 1].clean){
		for(let i = this.content.length, ii = i * 2; i < ii; i++){
			this.content[i] = new this.template();
		}
	}
	this.content.unshift(this.content.pop());

	return this.content[0].fill(data, metadata);
};

pool.prototype.clear = function(){
	for(let i = 0; !this.content[i].clean; i++){
		this.content[i].clear();
	}
};

var memory = function(){
	this.fragment = document.createDocumentFragment();
	this.error = {};
	this.placeholder = {};
	this.pool = {};
};

memory.prototype.new = function(name, template, count){
	this.error[name] = new pool(error, 2);
	this.pool[name] = new pool(template, count);
};

memory.prototype.fill = function(data){
	for(let i = 0, ii = data.length; i < ii; i++){
		if(typeof this.pool[data[i].type] !== 'undefined'){
			this.fragment.appendChild(this.pool[data[i].type].fill(data[i]));
		} else {
			if(typeof this.placeholder[data[i].type] == 'undefined'){
				this.placeholder[data[i].type] = new pool(placeholder, 2);
				fetch('/element/' + data[i].type + '.js', {

				}).then(result => {
					return result.text();
				}).then(template => {
					this.pool[data[i].type] = new pool(Function(template), 2);
					for(let iii = 0, iv = this.placeholder[data[i].type].content.length; iii < iv; iii++){
						this.placeholder[data[i].type].content[iii].element.replaceWith(this.pool[data[i].type].fill(data[i]));
						this.placeholder[data[i].type].content[iii].clear()
					}
				});
			}
			this.fragment.appendChild(this.placeholder[data[i].type].fill(data[i], {}));
		}
	}

	return this.fragment;
};

var view = function(memory){
	this.element = document.createElement('div');
	this.element.className = 'view';
	this.memory = memory;
};

view.prototype.fill = function(data){
	this.element.appendChild(this.memory.fill(data));
};

view.prototype.clear = function(){

};

view.prototype.update = function(address, argument){
	fetch('/page/' + address + '.json', {

	}).then(result => {
		return result.json();
	}).then(data => {
		this.fill(data);
	});
};

view.prototype.extend = function(){

};