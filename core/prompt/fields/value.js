function Value() {

  this.name = '';
  this.value = false;
  this.promptMessage = false;
  this.validated = true;
  this.conditional = false;
  this.checkConditional = false;
  this.formatPrompt = false;
  this.sanitizeInput = false;
  this.validate = false;
  this.validationError = false;
  this.fieldGroup = false;

  this.cacheInput = function(input) {
    this.value = input;
    return true;
  };
}

module.exports.new = function() {
  return new Value();
}
