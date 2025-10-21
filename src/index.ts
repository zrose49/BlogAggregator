import { argv } from "process";
import { CommandsRegistry,registerCommand, runCommand } from "./commands/commands";
import { handlerLogin, handlerRegister, handlerReset, handlerUsers } from "./commands/users";
import { handlerAgg } from "./commands/aggregrate";
import { addFeed, resetFeeds } from "./commands/feeds";

let commands: CommandsRegistry = {};

registerCommand(commands,"login",handlerLogin);
registerCommand(commands,"register",handlerRegister);
registerCommand(commands,"reset",handlerReset);
registerCommand(commands,"users", handlerUsers);
registerCommand(commands,"agg",handlerAgg);
registerCommand(commands,"addfeed",addFeed);
registerCommand(commands,"resetfeeds",resetFeeds);

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