'use strict';

/*jshint -W079 */
var expect = require('chai').expect;
var domify = require('domify');


var bindling = require('../lib/bindling');

after(function(){
	var container = document.querySelector('#test');
	//container.innerHTML = '';
});




describe('bindling', function() {

	var container = document.querySelector('#test');
	var template = require('./template.html');
	var templateOpen = require('./template-open.html');


	it('updates the DOM from the model', function(done) {

		var model = {
			age: 42, 
			name: 'Steve',
			gender: 'male',
			disabled: false
		};

		var element = bindling(template, model);

		container.appendChild(element);

		/* jshint expr: true */
		expect(element).to.not.be.null;

		var name = element.querySelector('div:nth-of-type(1) span');

		expect(name.textContent).to.equal('Steve');
		model.name = 'Bob';

		setTimeout(function() {
			expect(name.textContent).to.equal('Bob');
			done();
		}, 100);
	});


	it('runs functions trigged by events', function(done) {

		var model = {
			age: 42, 
			name: 'Steve',
			gender: 'male',
			disabled: false,
			update: function(value) {
				this.gender = value;
			},
			increment: function(event) {
				this.age++;
			}
		};

		var element = bindling(template, model);

		container.appendChild(element);
		
		/* jshint expr: true */
		expect(element).to.not.be.null;

		var gender = element.querySelector('div:nth-of-type(2) span');

		expect(gender.textContent).to.equal('male');

		var input = element.querySelector('div:nth-of-type(2) input');

		expect(input.value).to.equal('male');

		input.value = 'female';

		var event = document.createEvent('Event');
		event.initEvent('change', true, true);
		input.dispatchEvent( event );


		setTimeout(function() {
			expect(gender.textContent).to.equal('female');
			done();
		}, 100);
	});


	it('updates an existing DOM selection from the model', function(done) {

		var model = {
			age: 42, 
			name: 'Steve',
			gender: 'male',
			disabled: false
		};

		var element = domify(template);

		container.appendChild(element);

		bindling(container, model);

		/* jshint expr: true */
		expect(element).to.not.be.null;

		var name = element.querySelector('div:nth-of-type(1) span');

		expect(name.textContent).to.equal('Steve');
		model.name = 'Bob';

		setTimeout(function() {
			expect(name.textContent).to.equal('Bob');
			done();
		}, 100);
	});


	it('updates the DOM from the model, with an open template', function(done) {

		container.innerHTML = '';

		var model = {
			age: 42, 
			name: 'Steve',
			gender: 'male',
			disabled: false
		};

		var elements = domify(templateOpen);

		container.appendChild(elements.cloneNode(true));

		bindling(container, model);

		var name = container.querySelector('div:nth-of-type(1) span');

		expect(name.textContent).to.equal('Steve');
		model.name = 'Bob';

		setTimeout(function() {
			expect(name.textContent).to.equal('Bob');
			done();
		}, 100);
	});	


	it('updates the DOM from the model with a binding value', function() {

		var model = {
			age: 42, 
			name: 'Steve',
			gender: 'male',
			disabled: true
		};

		var element = bindling(template, model);

		container.appendChild(element);

		/* jshint expr: true */
		expect(element).to.not.be.null;

		var button = element.querySelector('button');

		expect(button.disabled).to.equal(true);

		var gender = element.querySelector('div:nth-of-type(2) span');

		expect(gender.textContent).to.equal('male');
	});	


	it('updates the DOM from the model with a template value', function(done) {

		var model = {
			age: 42, 
			name: 'Steve',
			gender: 'male',
			disabled: true
		};

		var element = bindling(template, model);

		container.appendChild(element);

		/* jshint expr: true */
		expect(element).to.not.be.null;

		var input = element.querySelector('div:nth-of-type(1) input');

		expect(input.value).to.equal('42 years old');

		model.age = 17;

		setTimeout(function() {
			expect(input.value).to.equal('17 years old');
			done();
		}, 100);
	});				

});

