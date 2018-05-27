console.log(currentTest.totalTime + 'ms');
results[currentTest.test].results.push(currentTest.totalTime);

// Reset
localStorage.clear();
currentTest.amount = currentTest.totalAmount;
document.getElementById('frameworkContainer').contentWindow.location.reload(true);
setTimeout(() => {
  repeatTest.next()
}, 1000);