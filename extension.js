// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */

const filterScriptFileNames = async nameFilter => {
	const allFiles = await vscode.workspace.findFiles();
	const filteredFiles = allFiles.filter(
		uri => uri.fsPath.includes(nameFilter) && uri.fsPath.includes("groovy")
	);

	// Get information about recently opened files
	const recentlyOpened = vscode.window.state.recentlyOpened;

	// Sort filteredFiles by most recently opened
	filteredFiles.sort((a, b) => {
		const aOpenedIndex = recentlyOpened.findIndex(
			item => item.uri.fsPath === a.fsPath
		);
		const bOpenedIndex = recentlyOpened.findIndex(
			item => item.uri.fsPath === b.fsPath
		);

		// Handle cases where a or b is not in the recentlyOpened array
		if (aOpenedIndex === -1) return 1;
		if (bOpenedIndex === -1) return -1;

		// Sort by the order of opening
		return bOpenedIndex - aOpenedIndex;
	});

	return filteredFiles.map(uri => ({
		label: uri.fsPath.split("\\").slice(-3, -2).join("\\"),
		description: uri.fsPath.split("Code\\").pop(),
		fullPath: uri.fsPath,
	}));
};

function activate(context) {
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "kat-nav" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand(
		"kat-nav.helloWorld",
		function () {
			// The code you place here will be executed every time your command is executed

			// Display a message box to the user
			vscode.window.showInformationMessage("Hello World from !");
		}
	);

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate,
};
