import { argv } from "process";
import { CommandsRegistry,registerCommand, runCommand } from "./commands/commands";
import { handlerLogin } from "./commands/users";

let commands: CommandsRegistry = {};

registerCommand(commands,"login",handlerLogin);

console.log(commands);

async function main() {

 let userInput = argv.slice(2);
  //console.log(userInput);

  if(userInput.length < 1) {
    console.error("No arguments were provided!")
    process.exit(1);
  }

let commandName = userInput[0];
//console.log(commandName);

let args = userInput.slice(1);
//console.log(args);

await runCommand(commands,commandName,...args);

process.exit(0);

}

main();