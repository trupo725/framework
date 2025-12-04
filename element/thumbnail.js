element.call(this);
this.element.className += ' thumbnail';
this.picture = document.createElement('img');
this.picture.className = 'picture';
this.element.appendChild(this.picture);
this.name = document.createElement('span');
this.name.className = 'name';
this.element.appendChild(this.name);

this.fill = function(data, metadata){
	this.picture.src = '/media/thumbnail/' + data.id + '.png';
	this.name.textContent = data.name;
	return element.prototype.fill.call(this, data);
};

this.clear = function(){
	this.picture.src = '';
	this.name.textContent = '';
	element.prototype.clear.call(this);
};