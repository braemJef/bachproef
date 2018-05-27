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