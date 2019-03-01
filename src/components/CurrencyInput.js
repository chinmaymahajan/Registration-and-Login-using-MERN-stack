import React, { Component } from 'react';
export default class CurrencyInput extends Component {
  constructor(props) {
    super(props);
     this.state = {
      input: ''
    }
  }

handleOnChange = (e) => {
  let input = e.target.value;


     if(input.charAt(0) === '$') {
       if(input.length > 4) {
        let inputArray = input.split("");
         let reverseArray = inputArray.reverse();
         let reverseNumberWithComma = [];

         console.log("inputArray", inputArray, "reverseArray",reverseArray.length)

         for(let i = 0; i < reverseArray.length; i++) {
					 //debugger;
           if(i % 3 === 0 && reverseArray[i] !== ',') {
						 reverseNumberWithComma.push(',');
						 reverseNumberWithComma.push(reverseArray[i]);
					 }
           else reverseNumberWithComma.push(reverseArray[i]);
           console.log("reverseNumberWithComma", reverseNumberWithComma)
         }
         input = reverseNumberWithComma.reverse();
       }

    } else {
      input = input === '' ? '' :  '$' + input;
    }

      this.setState({
      input: input
    });
}
  render() {
    const { input } = this.state;
    console.log(input)
    return (
      <div>
        <input value={input} onChange={this.handleOnChange} />
      </div>
    )
  }
}
