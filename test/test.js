'use strict';

/*jshint -W079 */
var expect = require('chai').expect;


var bindling = require('../lib/bindling');

after(function(){
	var container = document.querySelector('#test');
	//container.innerHTML = '';
});




describe('bindling', function() {

	var container = document.querySelector('#test');
	var template = require('./template.html');


	it('updates the DOM from the model', function(done) {

		var model = {
			age: 42, 
			name: 'Steve',
			gender: 'male'
		};

		var element = bindling(template, model);

		container.appendChild(element);
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
			update: function(value) {
				this.gender = value;
			},
			increment: function(event) {
				this.age++;
			}
		};

		var element = bindling(template, model);

		container.appendChild(element);
		expect(element).to.not.be.null;

		var gender = element.querySelector('div:nth-of-type(2) span');

		expect(gender.textContent).to.equal('male');

		var input = element.querySelector('div:nth-of-type(2) input');
		input.value = 'female';

		var event = document.createEvent('Event');
		event.initEvent('change', true, true);
		input.dispatchEvent( event );


		setTimeout(function() {
			expect(gender.textContent).to.equal('female');
			done();
		}, 100);
	});			

});

