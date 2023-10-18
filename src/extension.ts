import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "statusbarnamecolor" is now active!');

	let disposable = vscode.commands.registerCommand('statusbarnamecolor.helloWorld', () => {
		vscode.window.showInformationMessage('Hello World from StatusBarNameColor!');
	});

	context.subscriptions.push(disposable);
}

export function deactivate() { }
