import * as vscode from 'vscode';

let myStatusBarItem: vscode.StatusBarItem;
let itemSettings = vscode.workspace.getConfiguration('statusBarCustomItem');
let colorSettings = vscode.workspace.getConfiguration('statusBarCustomColor');

export function activate(context: vscode.ExtensionContext) {
	myStatusBarItem = vscode.window.createStatusBarItem(
		vscode.StatusBarAlignment.Left,
		10000
	);

	context.subscriptions.push(myStatusBarItem);

	updateStatusBar(context);

}

function updateStatusBar(context: vscode.ExtensionContext): void {
	let name = itemSettings.get("text") as string;
	let icon = itemSettings.get("icon") as string;
	let tooltip = itemSettings.get("tooltip") as string;

	let primaryBkColor = colorSettings.get("primaryBkColor") as string;
	let secondaryBkColor = colorSettings.get("secondaryBkColor") as string;
	let foreground = colorSettings.get("foregroundColor") as string;

	myStatusBarItem.text = `${icon} ${name}`;
	myStatusBarItem.tooltip = tooltip;
	myStatusBarItem.show();

	const workbenchConfiguration = vscode.workspace.getConfiguration('workbench');
	const currentColorCustomizations: {
		[index: string]: string;
	} = workbenchConfiguration.get('colorCustomizations') ?? {};

	const colorCustomizations = { ...currentColorCustomizations};

	if(primaryBkColor !== undefined){
		colorCustomizations['statusBar.background'] = primaryBkColor;
	}

	if(secondaryBkColor !== undefined){
		colorCustomizations['statusBar.noFolderBackground'] = secondaryBkColor;
		colorCustomizations['statusBar.debuggingBackground'] = secondaryBkColor;
	}

	if(foreground !== undefined){
		colorCustomizations['statusBar.foregroundColor'] = foreground;
		colorCustomizations['statusBar.debuggingForeground'] = foreground;
	}

	if(currentColorCustomizations !== colorCustomizations){
		workbenchConfiguration.update('colorCustomizations', colorCustomizations, true);
	}

}

