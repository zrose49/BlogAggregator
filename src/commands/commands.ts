export type CommandHandler = (cmdName: string, ...args: string[]) => Promise<void>;

export type CommandsRegistry = Record<string,CommandHandler>;

export async function registerCommand(registry: CommandsRegistry, cmdName: string, handler: CommandHandler) {
    registry[cmdName] = handler;
}

export async function runCommand(registry: CommandsRegistry, cmdName: string, ...args: string[]) {
    try {
    let command = registry[cmdName];
    
    command(cmdName,...args);
    }
    catch(error) {
        console.error(`Unknown command: ${cmdName}`);
        process.exit(1);
    }
}