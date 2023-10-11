#!/usr/bin/env node
import inquirer from 'inquirer';

var questions = [
    {
        type: 'input',
        name: 'birthdate',
        default: '16111999',
        message: 'Type a birthdate in the following format ddmmyyyy example: \"16111999\":'
    },
    {
        type: 'list',
        name: 'sex',
        choices: [
            {
                name: 'male',
                value: true
            },
            {
                name: 'female',
                value: false
            }
        ],
        default: true,
        message: 'Do you want male or female CPR-numbers:'
    },
    {
        type: 'number',
        name: 'count',
        default: 10,
        message: 'How many CPR-numbers do you want:'
    }
]

inquirer
  .prompt(questions)
  .then((answers) => {
    let birthdate = answers.birthdate;
    let sex = answers.sex;
    let count = answers.count;

    let dayMonth = birthdate.substr(0, 3);
    let fullYear = birthdate.substr(4, 7);
    let year = birthdate.substr(6, 7);

    let date = dayMonth + year;
    let numbers = getControlNumbers(fullYear);
    printCprNumbers(date, sex, numbers, count);
  })
  .catch((error) => {
      console.error(error);
  });

  function printCprNumbers(date, sex, controlNumbers, count) {
      var groupedCprNumbers = [];
      var groupedCprNumbersSize = count < 100 ? 3 : 5;
      var initNumber = sex ? 1 : 2;
      var iterations = 0;
      

      controlNumbers.every(controlNumber => {
        for (let i = initNumber; i <= 999 && iterations != count; i += 2) {
            var lastThreeDigits = (1000 + i).toString().slice(1);
            groupedCprNumbers.push(`${date}${controlNumber}${lastThreeDigits}`); 
            iterations++;

            if (groupedCprNumbers.length === groupedCprNumbersSize || iterations == count) {
                console.log(groupedCprNumbers.join(' '))
                groupedCprNumbers = [];
            }
        }
        return iterations < count;  
      });  
  }

  function getControlNumbers(fullYear) {
      let controlNumbers = [];
      let concatNumbers = (newNumbers) => controlNumbers = controlNumbers.concat(newNumbers);

      if (fullYear >= 1900 && fullYear <= 1999 ) concatNumbers([0, 1, 2, 3]);
      if (fullYear >= 1937 && fullYear <= 1999 ) concatNumbers([4, 9]);

      if (fullYear >= 2000 && fullYear <= 2036 ) concatNumbers([4, 9]);
      if (fullYear >= 2000 && fullYear <= 2057 ) concatNumbers([5, 6, 7, 8]);

      if (fullYear >= 1858 && fullYear <= 1899 ) concatNumbers([5, 6, 7, 8]);


      return controlNumbers;
  }



