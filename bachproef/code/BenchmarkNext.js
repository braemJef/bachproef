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