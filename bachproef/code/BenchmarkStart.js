document.getElementById('frameworkContainer').contentWindow.benchmarkNext = function() {
  // End timing
  currentTest.endTime = window.performance.now();
  currentTest.totalTime += currentTest.endTime - currentTest.startTime - ((currentTest.gaugeTime - currentTest.startTime) * 2);
  currentTest.next();
};
currentTest.totalTime = 0;
currentTest.inputField = document.getElementById('frameworkContainer').contentWindow.document.getElementsByClassName("new-todo")[0];
currentTest.next();