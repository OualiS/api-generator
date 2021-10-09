const inquirer = require('inquirer');

module.exports = {
  askEnvParams: () => {
    const questions = [
      {
        name: 'JWT_KEY',
        type: 'input',
        message: 'Enter your JWT key :',
        validate: function( value ) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter your JWT key.';
          }
        }
      },
      {
        name: 'MONGO_URL',
        type: 'input',
        message: 'Enter your MongoDB URL connection :',
        validate: function(value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter your MongoDB URL connection.';
          }
        }
      }
    ];
    return inquirer.prompt(questions);
  },
};