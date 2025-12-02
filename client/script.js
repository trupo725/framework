var element = function(){
	this.element = document.createElement('div');
	this.element.className = 'element';
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
	this.type.text = metadata.type;
	this.recommendation.text = metadata.recommendation;
	this.data = data;

	return element.prototype.fill.call(this, data);
};

error.prototype.clear = function(){
	this.type.text = null;
	this.recommendation.text = null;
	this.data = null;

	element.prototype.clear.call(this);
};

var pool = function(template,count){
	this.template = template;
	this.content = [];

	for(let i = 0; i < count; i++){
		this.content[i] = new this.template();
	}
};

pool.prototype.fill = function(data){
	if(!this.content[this.content.length - 1].clean){
		for(let i = this.content.length, ii = i * 2; i < ii; i++){
			this.content[i] = new this.template();
		}
	}
	this.content.unshift(this.content.pop());

	return this.content[0].fill(data);
};

pool.prototype.clear = function(){
	for(let i = 0; !this.content[i].clean; i++){
		this.content[i].clear();
	}
};

var memory = function(){
	this.fragment = document.createDocumentFragment();
	this.error = {};
	this.pool = {};
};

memory.prototype.new = function(name, template, count){
	this.pool[name] = new pool(template, count);
	this.error[name] = new pool(error, 2);
};

memory.prototype.fill = function(data){
	for(let i = 0, ii = data.length; i < ii; i++){
		if(isset(this.pool[data[i].type])){
			this.fragment.appendChild(this.pool[data[i].type].fill(data[i]));
		} else {
			this.fragment.appendChild(this.error[data[i].type].fill(data[i], {
				'type':'loading',
				'recommendation':'Please wait.'
			}));
			// fetch
			fetch('/client/element/' + data.type + '.js', {

			}).then(result => {

			}).then(data => {

			});
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
