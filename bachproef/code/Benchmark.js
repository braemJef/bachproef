// Clear cache
localStorage.clear();
let currentTest = null;
let iterateTests = iterateTestsGenerator();
let repeatTest = repeatTestGenerator();
let running = false;

const ITERATIONS = 100;

let results = {};

let tests = [
	{
		framework: 'Angular',
		test: 'AngularAdd100',
		totalAmount: 100,
		amount: 100,
		startTime: null,
		endTime: null,
		gaugeTime: null,
		totalTime: null,
		inputField: null,
		start: AngularStart,
		next: AngularNext,
	},
	{
		framework: 'Angular',
		test: 'AngularAdd500',
		totalAmount: 500,
		amount: 500,
		startTime: null,
		endTime: null,
		gaugeTime: null,
		totalTime: null,
		inputField: null,
		start: AngularStart,
		next: AngularNext,
	},
	{
		framework: 'Angular',
		test: 'AngularAdd1000',
		totalAmount: 1000,
		amount: 1000,
		startTime: null,
		endTime: null,
		gaugeTime: null,
		totalTime: null,
		inputField: null,
		start: AngularStart,
		next: AngularNext,
	},
	{
		framework: 'Vue',
		test: 'VueAdd100',
		totalAmount: 100,
		amount: 100,
		startTime: null,
		endTime: null,
		gaugeTime: null,
		totalTime: null,
		inputField: null,
		start: VueStart,
		next: VueNext,
	},
	{
		framework: 'Vue',
		test: 'VueAdd500',
		totalAmount: 500,
		amount: 500,
		startTime: null,
		endTime: null,
		gaugeTime: null,
		totalTime: null,
		inputField: null,
		start: VueStart,
		next: VueNext,
	},
	{
		framework: 'Vue',
		test: 'VueAdd1000',
		totalAmount: 1000,
		amount: 1000,
		startTime: null,
		endTime: null,
		gaugeTime: null,
		totalTime: null,
		inputField: null,
		start: VueStart,
		next: VueNext,
	},
	{
		framework: 'React',
		test: 'ReactAdd100',
		totalAmount: 100,
		amount: 100,
		startTime: null,
		endTime: null,
		gaugeTime: null,
		totalTime: null,
		inputField: null,
		start: ReactStart,
		next: ReactNext,
	},
	{
		framework: 'React',
		test: 'ReactAdd500',
		totalAmount: 500,
		amount: 500,
		startTime: null,
		endTime: null,
		gaugeTime: null,
		totalTime: null,
		inputField: null,
		start: ReactStart,
		next: ReactNext,
	},
	{
		framework: 'React',
		test: 'ReactAdd1000',
		totalAmount: 1000,
		amount: 1000,
		startTime: null,
		endTime: null,
		gaugeTime: null,
		totalTime: null,
		inputField: null,
		start: ReactStart,
		next: ReactNext,
	}
];

function startTests() {
	if (!running) {
		results = tests.reduce((acc, test) => {
			return ({
				...acc,
				[test.test]: {
          average: null,
          minimum: null,
          maximum: null,
          median: null,
          standardDeviation: null,
          results: new Array(),
        }
			});
		}, {})
		iterateTests.next();
	}
}

function* iterateTestsGenerator() {
	running = true;
	for (let x = 0; x < tests.length; x++) {
		repeatTest = repeatTestGenerator();
		currentTest = tests[x];

		// Replace framework iFrame
		document.getElementById('frameworkContainer').contentWindow.location.href = 'http://localhost:3000/' + currentTest.framework;
		setTimeout(() => {
			repeatTest.next();
		}, 5000);
		yield;
  }
  localStorage.setItem("results", JSON.stringify(results));
	iterateTests = iterateTestsGenerator();
	running = false;
}

function* repeatTestGenerator() {
	for (let x = 0; x < ITERATIONS; x++) {
		currentTest.start();
		yield;
	}
	calculateResults(currentTest);
	document.getElementsByClassName(currentTest.framework)[0].style.display = 'block';

	iterateTests.next();
}

function calculateResults({ test }) {
	const testResults = results[test].results;

	document.getElementsByClassName(test)[0].style.display = 'block';

	// Calculate average
	const avg = average(testResults).toFixed(3);
	document.getElementsByClassName(test + 'Average')[0].innerHTML = `Average: ${avg}ms`;
	results[test].average = avg;

	// Calculate minimum
	const min = Math.min(...testResults).toFixed(3);
	document.getElementsByClassName(test + 'Min')[0].innerHTML = `Minimum: ${min}ms`;
	results[test].minimum = min;

	// Calculate maximum
	const max = Math.max(...testResults).toFixed(3);
	document.getElementsByClassName(test + 'Max')[0].innerHTML = `Maximum: ${max}ms`;
	results[test].maximum = max;

	// Calculate median
	testResults.sort((a, b) => a - b);
	const lowMiddle = Math.floor((testResults.length - 1) / 2);
	const highMiddle = Math.ceil((testResults.length - 1) / 2);
	const median = ((testResults[lowMiddle] + testResults[highMiddle]) / 2).toFixed(3);
	document.getElementsByClassName(test + 'Median')[0].innerHTML = `Median: ${median}ms`;
	results[test].median = median;

	// Calculate standart deviation
	const standardDev = standardDeviation(testResults).toFixed(3);
	document.getElementsByClassName(test + 'StandardDeviation')[0].innerHTML = `Standard deviation: ${standardDev}ms`;
	results[test].standardDeviation = standardDev;
}

function standardDeviation(values){
	var avg = average(values);

	var squareDiffs = values.map(function(value){
		var diff = value - avg;
		var sqrDiff = diff * diff;
		return sqrDiff;
	});

	var avgSquareDiff = average(squareDiffs);

	var stdDev = Math.sqrt(avgSquareDiff);
	return stdDev;
}
  
function average(data){
	var sum = data.reduce(function(sum, value){
		return sum + value;
	}, 0);
  
	var avg = sum / data.length;
	return avg;
}

function AngularStart() {
  document.getElementById('frameworkContainer').contentWindow.benchmarkNext = function() {
    // End timing
    currentTest.endTime = window.performance.now();
    currentTest.totalTime += currentTest.endTime - currentTest.startTime - ((currentTest.gaugeTime - currentTest.startTime) * 2);
    currentTest.next();
  };
  currentTest.totalTime = 0;
  currentTest.inputField = document.getElementById('frameworkContainer').contentWindow.document.getElementsByClassName("new-todo")[0];
  currentTest.next();
}

function VueStart() {
  setTimeout(() => {
    document.getElementById('frameworkContainer').contentWindow.benchmarkNext = function() {
      // End timing
      currentTest.endTime = window.performance.now();
      currentTest.totalTime += currentTest.endTime - currentTest.startTime - ((currentTest.gaugeTime - currentTest.startTime) * 2);
      currentTest.next();
    };
    currentTest.totalTime = 0;
    currentTest.inputField = document.getElementById('frameworkContainer').contentWindow.document.getElementsByClassName("new-todo")[0];
    currentTest.next();
  }, 1000);
}

function ReactStart(){
  setTimeout(() => {
    document.getElementById('frameworkContainer').contentWindow.benchmarkNext = function() {
      // End timing
      currentTest.endTime = window.performance.now();
      currentTest.totalTime += currentTest.endTime - currentTest.startTime - ((currentTest.gaugeTime - currentTest.startTime) * 2);
      currentTest.next();
    };
    currentTest.totalTime = 0;
    currentTest.inputField = document.getElementById('frameworkContainer').contentWindow.document.getElementsByClassName("new-todo")[0];
    currentTest.next();
  }, 1000);
}

function AngularNext() {
	if(currentTest.amount > 1){
		setTimeout(() => {
			// Fill in field
			let inputEvent = document.getElementById('frameworkContainer').contentWindow.document.createEvent('Event');
			inputEvent.initEvent('input', true, true);
			currentTest.inputField.value = 'Todo #' + (currentTest.totalAmount - currentTest.amount);
			currentTest.inputField.dispatchEvent(inputEvent);
			currentTest.amount--;

			// Start timing
			currentTest.startTime = window.performance.now();
			currentTest.gaugeTime = window.performance.now();
			currentTest.inputField.dispatchEvent(new KeyboardEvent('keyup', {key: 'Enter'}));
		}, 0);
	}else{
		Finish();
	}
}

function VueNext() {
	if(currentTest.amount > 1){
		setTimeout(() => {
			// Fill in field
			let inputEvent = document.getElementById('frameworkContainer').contentWindow.document.createEvent('Event');
			inputEvent.initEvent('input', true, true);
			currentTest.inputField.value = 'Todo #' + (currentTest.totalAmount - currentTest.amount);
			currentTest.inputField.dispatchEvent(inputEvent);
			currentTest.amount--;
			
			// Create keyPressEvent
			let keyPressEvent = document.getElementById('frameworkContainer').contentWindow.document.createEvent('Event');
			keyPressEvent.initEvent('keydown', true, true);
			keyPressEvent.keyCode = 13;

			// Start timing
			currentTest.startTime = window.performance.now();
			currentTest.gaugeTime = window.performance.now();
			currentTest.inputField.dispatchEvent(keyPressEvent);
		}, 0);
	}else{
		Finish();
	}
}

function ReactNext() {
  if(currentTest.amount > 1){
    setTimeout(() => {
      // Fill in field
      let inputEvent = document.getElementById('frameworkContainer').contentWindow.document.createEvent('Event');
      inputEvent.initEvent('input', true, true);
      currentTest.inputField.value = 'Todo #' + (currentTest.totalAmount - currentTest.amount);
      currentTest.inputField.dispatchEvent(inputEvent);
      currentTest.amount--;
      // Create keyPressEvent
      let keyPressEvent = document.getElementById('frameworkContainer').contentWindow.document.createEvent('Event');
      keyPressEvent.initEvent('keydown', true, true);
      keyPressEvent.keyCode = 13;

      // Start timing
      currentTest.startTime = window.performance.now();
      currentTest.gaugeTime = window.performance.now();
      currentTest.inputField.dispatchEvent(keyPressEvent);
    }, 0);
  }else{
    Finish();
  }
}

function Finish() {
	console.log(currentTest.totalTime + 'ms');
	results[currentTest.test].results.push(currentTest.totalTime);
	
	// Reset
	localStorage.clear();
	currentTest.amount = currentTest.totalAmount;
	document.getElementById('frameworkContainer').contentWindow.location.reload(true);
	setTimeout(() => {
		repeatTest.next()
	}, 1000);
}
