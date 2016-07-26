
var cadastrar = document.querySelector('.btn-cadastrar'),
    close = document.querySelector('.close');

cadastrar.addEventListener('click', function(e){

	e.preventDefault();

	getElements();
	hideKnowledge();
})

close.addEventListener('click', function(e){

	e.preventDefault();
	modal();
})

function knowledge() {

	return document.querySelectorAll('.knowledge');
}

function hideKnowledge() {
	
	var knowledges = knowledge();
	
	for (var i = 0, len = knowledges.length; i < len; i++) {

		if (knowledges[i].classList.contains('hide') == false) {

			knowledges[i].classList.add('hide');
			return;
		}	
	}
}

function showKnowledge(option) {
	
	var value = option.value,	
		technologies = knowledge();

	hideKnowledge();
	
	for (var i = 0, len = technologies.length; i < len; i++) {
	   	
		var tech = technologies[i];

		if (value === tech.id) {

	   		tech.classList.remove('hide');
	   		return;	
	   	} 	
	} 
} 

function getElements(){
	
	var elements = document.querySelectorAll('select,textarea,input:checked');
	
	if (checkIsEmpty(elements) == true) {  

		construction(elements);
		clearFields(elements);

	} else {

		return;
	}	
}

function checkIsEmpty(elements) {

	for (var i = 0; i < elements.length; i++) {
		 
		 if (elements[i].value == '' || elements[i].value == '0' || elements[i].checked == false ) {
		 	
		 	 alertError();

		 	 return false;
		 }
	}

	return true;
}

function construction(elements) {

	var collection = [],
	    button = document.createElement('button');	
		button.innerHTML = 'Apply';
		button.classList = 'btn-default btn-apply';

	for (var i = 0; i < elements.length; i++) {
		
		if (elements[i].name == 'tagsProfessional') {

			var option = getOptions(elements[i]),

			    element = document.createElement('h2');	
				element.innerHTML = option.text;
				element.classList = 'job-title';
				collection.push(element);

		} else if (elements[i].name == 'knowledge') {

			var option = elements[i],

			    element = document.createElement('span');	
				element.innerHTML = option.value;
				element.classList = 'job-label';
				collection.push(element);	

		} else if (elements[i].name == 'tagsExperience') {

			var option = getOptions(elements[i]),

			    element = document.createElement('span');
			    element.classList = experience(option);	
				element.innerHTML = option.text;
				collection.splice(1, 0, element);	

		} else if (elements[i].name == 'tagsLocal') {

			var option = getOptions(elements[i]),

			    element = document.createElement('h3');	
				element.innerHTML = option.text;
				element.classList = 'job-local';
				collection.push(element);

		} else {

			var option = elements[i],

			    element = document.createElement('p');	
				element.innerHTML = option.value;
				element.classList = 'job-text';
				collection.push(element);		
		}
	}

	var last = collection.length - 1;

	collection.splice(last, 0, setDate());

	collection.push(button);

	template(collection);
}

function getOptions(select) {

	var option;
	
	for (var i = 0; i < select.options.length; i++) {
		
		option = select.options[i];
		
		if ( option.selected === true ) {

			 return option;
		} 
	}
}

function template(elements){
	
	var jobList = document.querySelector('.jobs-list'),

		jobListItem = document.createElement('li');

		for (var i = 0; i < elements.length; i++) {
			
			jobListItem.appendChild(elements[i]);		
		}	

		return jobList.appendChild(jobListItem);
}

function clearFields(elements){
	
	for (var i = 0; i < elements.length; i++) {
		
		if (elements[i].nodeName == 'SELECT') {

			elements[i].selectedIndex = 0;

		} else if (elements[i].nodeName == 'TEXTAREA') {

			elements[i].value = '';

		} else {

			elements[i].checked = false;
		}
	}	
}

function experience(type) {
	
	if (type.value == '1') {

		return type = 'job-experience junior';

	} else if (type.value == '2') {

		return type = 'job-experience pleno';

	} else {

		return type = 'job-experience senior';
	}
}

function alertError() {

	modal();
}

function setDate() {
	
	var today = new Date(),
		year  = today.getFullYear(),
		month = ("0" + (today.getMonth() + 1)).slice(-2),
		day   = today.getDate(),
		date  = day + "/" + month + "/" + year;

	var	span = document.createElement('h3');	
		span.innerHTML = date;
		span.classList = 'job-date';

		return span;
}

function modal() {

	var modal = document.querySelector('.modal');

	if (modal.classList.contains('show') == true) {
		
		modal.classList.remove('show');
		modal.classList.add('hide');

	} else {

		modal.classList.remove('hide');
		modal.classList.add('show');
	}
}


