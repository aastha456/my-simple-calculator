import readline from "readline/promises";
import { stdin as input, stdout as output } from "process";
import chalk from "chalk";

import { add, subtract, multiply, divide } from "./operations";
import { writeToFile, readFromFile } from "./fileHandler";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function startCalculator() {
  try {
    console.log(chalk.blue("Welcome to the Simple Calculator!"));
    const first = await rl.question(chalk.green("Enter the first number: "));
    const second = await rl.question(chalk.green("Enter the second number: "));

    const num1 = Number(first);
    const num2 = Number(second);

    if (isNaN(num1) || isNaN(num2)) {
      const errorMessage = "Invalid input. Please enter valid numbers.";
      await writeToFile("ERROR: " + errorMessage);
      console.log(chalk.red("Invalid input. Please enter valid numbers."));
      return;
    }

    // console.log("Add");
    // console.log("Subtract");
    // console.log("Multiply");
    // console.log("Divide");

    const choice = await rl.question(
      chalk.green("Choose an operation (add, subtract, multiply, divide): "),
    );

    let result: number;
    let symbol: string;

    switch (choice) {
      case "add":
        result = add(num1, num2);
        symbol = "+";
        break;
      case "subtract":
        result = subtract(num1, num2);
        symbol = "-";
        break;
      case "multiply":
        result = multiply(num1, num2);
        symbol = "*";
        break;
      case "divide":
        if (num2 === 0) {
          const errorMessage = "Cannot divide by zero.";
          await writeToFile("ERROR: " + errorMessage);
          console.log(chalk.red("Cannot divide by zero."));
          return;
        }
        result = divide(num1, num2);
        symbol = "/";
        break;
      default:
        console.log(chalk.red("Invalid operation choice."));
        await writeToFile("ERROR: Invalid operation choice.");
        return;
    }

    const message = [
    `First Number: ${num1}`,
    `Second Number: ${num2}`,
    `Operation: ${choice}`,
    `Result: ${result}`,
    '-----------------------------------------------'
    ].join('\n');

    console.log(chalk.blue("Result: " + result));
    await writeToFile(message);
  } catch (error: any) {
    console.log(chalk.red("ERROR: " + error.message));
    await writeToFile("ERROR: " + error.message);
  } finally {
    const data = await readFromFile();
    console.log(chalk.yellow("Calculation History:"));
    console.log(chalk.yellow(data));
    rl.close();
  }
}

startCalculator();
