import * as vscode from 'vscode';

let keyPressCount = 0;
let statusBarItem: vscode.StatusBarItem;

export function activate(context: vscode.ExtensionContext) {
    console.log('Congratulations, your extension "don-chan-key-combo" is now active!');

    statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
    statusBarItem.command = 'don-chan-key-combo.showKeyPressCount';
    context.subscriptions.push(statusBarItem);

    updateStatusBarItem();

    const showKeyPressCountDisposable = vscode.commands.registerCommand('don-chan-key-combo.showKeyPressCount', () => {
        vscode.window.showInformationMessage(`SWAG JOSH Key presses: ${keyPressCount}`);
    });
    context.subscriptions.push(showKeyPressCountDisposable);

    const registerIncrementCommand = (command: string) => {
        const disposable = vscode.commands.registerCommand(command, () => {
            keyPressCount++;
            updateStatusBarItem();
        });
        context.subscriptions.push(disposable);
    };

    for (let i = 0; i <= 9; i++) {
        registerIncrementCommand(`don-chan-key-combo.incrementCount${i}`);
    }


    const textDocumentChangeDisposable = vscode.workspace.onDidChangeTextDocument(event => {
        keyPressCount += event.contentChanges.length;
        updateStatusBarItem();
    });
    context.subscriptions.push(textDocumentChangeDisposable);

    const editorSelectionChangeDisposable = vscode.window.onDidChangeTextEditorSelection(event => {
        if (event.kind === vscode.TextEditorSelectionChangeKind.Command) {
            keyPressCount++;
            updateStatusBarItem();
        }
    });
    context.subscriptions.push(editorSelectionChangeDisposable);

    context.subscriptions.push(statusBarItem);
}

export function deactivate() {}

function updateStatusBarItem(): void {
    statusBarItem.text = `$(keyboard) Key presses: ${keyPressCount}`;
    statusBarItem.show();
}