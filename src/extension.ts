import * as vscode from 'vscode';

// Variable to keep track of key press count
let keyPressCount = 0;
// Status bar item to display key press count
let statusBarItem: vscode.StatusBarItem;

// Function called when the extension is activated
export function activate(context: vscode.ExtensionContext) {
    console.log('Congratulations, your extension "don-chan-key-combo" is now active!');

    // Create a new status bar item with a command to show key press count
    statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
    statusBarItem.command = 'don-chan-key-combo.showKeyPressCount';
    context.subscriptions.push(statusBarItem);

    // Update the status bar item with the initial key press count
    updateStatusBarItem();

    // Register a command to show an information message with the key press count
    const showKeyPressCountDisposable = vscode.commands.registerCommand('don-chan-key-combo.showKeyPressCount', () => {
        vscode.window.showInformationMessage(`Key presses: ${keyPressCount}`);
    });
    context.subscriptions.push(showKeyPressCountDisposable);

    // Register commands for each number key
    const registerIncrementCommand = (command: string) => {
        const disposable = vscode.commands.registerCommand(command, () => {
            keyPressCount++;
            updateStatusBarItem();
        });
        context.subscriptions.push(disposable);
    };

    // Register increment commands for numbers 0-9
    for (let i = 0; i <= 9; i++) {
        registerIncrementCommand(`don-chan-key-combo.incrementCount${i}`);
    }

    // Register increment commands for Alt and Ctrl keys
    registerIncrementCommand('don-chan-key-combo.incrementCountCtrlLeft');
    registerIncrementCommand('don-chan-key-combo.incrementCountCtrlRight');
    registerIncrementCommand('don-chan-key-combo.incrementCountShiftLeft');
    registerIncrementCommand('don-chan-key-combo.incrementCountShiftRight');
    registerIncrementCommand('don-chan-key-combo.incrementCountAltLeft');
    registerIncrementCommand('don-chan-key-combo.incrementCountAltRight');

    // Event listener for changes in the text document (key presses in the editor)
    const textDocumentChangeDisposable = vscode.workspace.onDidChangeTextDocument(event => {
        // Increment the key press count by the number of content changes
        keyPressCount += event.contentChanges.length;
        // Update the status bar item with the new key press count
        updateStatusBarItem();
    });
    context.subscriptions.push(textDocumentChangeDisposable);

    // Event listener for editor actions (can catch mode changes or command executions)
    const editorSelectionChangeDisposable = vscode.window.onDidChangeTextEditorSelection(event => {
        // If vim mode or another mode is changing the selection (like cursor movements in normal mode)
        if (event.kind === vscode.TextEditorSelectionChangeKind.Command) {
            keyPressCount++;
            updateStatusBarItem();
        }
    });
    context.subscriptions.push(editorSelectionChangeDisposable);

    // Add the status bar item to the subscriptions to manage its lifecycle
    context.subscriptions.push(statusBarItem);
}

// Function called when the extension is deactivated
export function deactivate() {}

// Function to update the status bar item with the current key press count
function updateStatusBarItem(): void {
    statusBarItem.text = `$(keyboard) Key presses: ${keyPressCount}`;
    statusBarItem.show();
}