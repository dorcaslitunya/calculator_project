//select element from html file
const output_operation_element = document.querySelector(".operation .value");
const output_result_element = document.querySelector(".result .value");
const input_element = document.querySelector(".input");
const max_output_number_length = 10;
const output_prescision = 5; //given to the toprecision() that converts it to standard form..takes in number of significant figures as arg






//create an array for all buttons. Each button is an object
//symbol is what we show for the user..the formula is what we use for a calculation
//each button is in a row
let calculator_buttons = [

  {
    name: "delete",
    symbol: "⌫",
    formula: false,
    type: "key"
  }, {
    name: "clear",
    symbol: "C",
    formula: false,
    type: "key"
  }, {
    name: "percentage",
    symbol: "%",
    formula: "/100",
    type: "number"
  }, {
    name: "division",
    symbol: "÷",
    formula: "/",
    type: "operator"
  },


  //new row
  {
    name: "seven",
    symbol: "7",
    formula: 7,
    type: "number"
  }, {
    name: "eight",
    symbol: "8",
    formula: 8,
    type: "number"
  }, {
    name: "nine",
    symbol: "9",
    formula: 9,
    type: "number"
  }, {
    name: "multiplication",
    symbol: "x",
    formula: "*",
    type: "operator"
  },

  //new row
  {
    name: "four",
    symbol: "4",
    formula: 4,
    type: "number"
  }, {
    name: "five",
    symbol: "5",
    formula: 5,
    type: "number"
  }, {
    name: "six",
    symbol: "6",
    formula: 6,
    type: "number"
  }, {
    name: "addition",
    symbol: "+",
    formula: "+",
    type: "operator"
  },

  //new row
  {
    name: "one",
    symbol: "1",
    formula: 1,
    type: "number"
  }, {
    name: "two",
    symbol: "2",
    formula: 2,
    type: "number"
  }, {
    name: "three",
    symbol: "3",
    formula: 3,
    type: "number"
  }, {
    name: "subtraction",
    symbol: "–",
    formula: "-",
    type: "operator"
  },

  //new row
  {
    name: "zero",
    symbol: "0",
    formula: 0,
    type: "number"
  }, {
    name: "dot",
    symbol: ".",
    formula: ".",
    type: "number"
  }, {
    name: "equals",
    symbol: "=",
    formula: "=",
    type: "calculate"
  }
];
//each button will be in a row with each row having 4 buttons

function createButton() {
  const buttons_per_row = 4;
  let added_buttons = 0;
  //loop through all calculator buttons
  //foreach method executes a provided funtion once for each array element
  //first button is the delete button and index is 0
  //check whether row is full

  calculator_buttons.forEach(button => {
    if (added_buttons % buttons_per_row == 0) {
      input_element.innerHTML += '<div class="row"></div>';
    }
    //last-child element matches every element that is the last child of the tag-name
    //it will select the last element of that type..eg the lat row that has been added
    const row = document.querySelector(".row:last-child");
    //foreach is a method that takes in the value of the current element  being executed
    //the name button signifies nothing as its just a parameter name
    row.innerHTML +=
      `<button id = "${button.name}"> ${button.symbol} </button>`;
    added_buttons++;
  });

}

createButton();


//add eventlistner to the input element which is the class for all the  buttons for clicking
input_element.addEventListener("click", event => {
  //get the button that was clicked by the event listener
  const target_btn = event.target;
  calculator_buttons.forEach((button) => {

    //check if the button name in array is the same as the button returned by the  event target
    if (button.name == target_btn.id) {
      //if true, send the button object to the calculator function
      //the button parameter is the button object,eg. the object number 9 or the object division
      //, yani one single button  from your array
      calculator(button);
    }
  });
})



//save each button click of the user into an array..using an object


//CALCULATOR  DATA
let data = {
  /*when a user clicks sth we send the data to our operation array
  when the operation is done, we display the data.operation to the user in our update
  output operation*/
  operation: [],
  result: [],

}


//CALCULATOR
function calculator(button) {
  //I will check my buttons type whether number(0-9,%)
  // or operator(/*+-) or (clear or cancel)key or calculate(=)

  if (button.type == "operator") {
    /*when user clicks an operator, we do not push a symbol but the formula to the result array
    (How to do the operation in JavaScript)*/
    data.operation.push(button.symbol);
    data.result.push(button.formula);

  } else if (button.type == "number") {
    /*we also push that number clicked  to the result array
    operation is what we show to the user whilst he is typing*/
    data.operation.push(button.symbol);
    /*we can also push button  pressed to result array
    the result array is what we use for calculating*/
    data.result.push(button.formula);

  } else if (button.type == "key") {
    /*when user clicks delete,we can use the pop() method to remove it
    when user clicks on clear, we set the operation and result array to an empty array
    Any change that happens,you need to update the operstion array*/
    if (button.name == "clear") {
      data.operation = [];
      data.result = [];
      updateOutputResult(0);

    } else if (button.name == "delete") {

      data.operation.pop();
      data.result.pop();



    }



  } else if (button.type == "calculate") {
    /*when user clicks calculate, we will join all elements to a stringin our result array. Eg we had 9&4 the will be joined
    to becom 94 and saved in a variable and passed to a built in function called Eval.*/
    let join_result = data.result.join('');


    /*eval evaluates a javascript code represented as a string eg eval("alert('hey')") will send an alert
    Once eval has done its work, push the result of eval to the operation and result array and conert
    to string so that you can get the length of it and compare to maximum output*/
    let result_eval ;

    try {

      result_eval=eval(join_result)
      //if it catches any erro
    } catch (error) {
      if (error instanceof SyntaxError) {
        result_eval="Syntax Error!";
        updateOutputResult(result_eval);
        return;

      }

    }
    result_eval = formatResult(result_eval);
    updateOutputResult(result_eval);
    //clear operations
    data.operation = [];
    data.result = [];
    //push the result
    data.operation.push(result_eval);
    data.result.push(result_eval);
    //console.log(data.operation.join(''))
    return;


  }

  updateOutputOperation(data.operation.join(''));


}

//what will be seen on the screen as you type in
function updateOutputOperation(operation) {
  output_operation_element.innerHTML = operation;

}

function updateOutputResult(result) {
  //after JavaScript has manipulated the data
  output_result_element.innerHTML = result;
}


//FORMAT result
function formatResult(result) {


  const max_output_number_length = 10;
  const output_precision = 5;
  if (digitCounter(result) > max_output_number_length) {
    if (isfloat(result)) {
      //converts a float(or any other non-int value) to int
      const result_int = parseInt(result);
      const result_int_length = digitCounter(result_int);

      if (result_int_length > max_output_number_length) {
        //rounds result if necessarry
        return result.toPrecision(output_precision);

      } else {
        //tofixed(no.of digits after the point)..will only show decimal points up to number specified
        //inside my calculaor function,
        //rounds of if necessary
        const num_of_digits_after_point = max_output_number_length - result_int_length;
        return result.toFixed(num_of_digits_after_point);
      }

    } else {
      //if number is an integer>10
      return result.toPrecision(output_precision);

    }

  } else {
    return result;

  }

}

//digit counter
function digitCounter(number) {
  //get length of number
  return number.toString().length;
}

function isfloat(number) {
  return number % 1 != 0;


}
