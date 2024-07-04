# PROCESSO DI PRODUZIONE PROGRAMMA

## TASKS
    1. fare un counter della tastiera per click nei file , esso deve essere visualizzata sulla barra sotto, il totale di click

    2. reset dei click ogni tot secondi che interrompe la combo. 

    3. impostare un ogni tot click complimenti x10 x100 et... 

    4. impostare suuoni tott click di complimen il suono delle combb 

    5. menu personalzzazbile e preset, per chi non vuole sentire gli audio nromalmente 

    6. METTERLO ONLINE?? cosi possiamo vedere quanti click di tastiera abbiamo fatto tra di noi tipo rank e metto ranked diamond etc.. tra di noi 

##  RISOLUZIONI E PROBLEMATICHE DA TENERE CONTO

    #### 1. 
    
        - aggiunti numeri e comandi di controllo attraverso package si richiama e sostituisce e aggiunge a contatore:
https://www.youtube.com/watch?v=kdMG40wUCm4
        da extension.js si richiama con 
                
                registerIncrementCommand('don-chan-key-combo.incrementCountAltRight');
                registerIncrementCommand(`don-chan-key-combo.incrementCount${i}`);

            al file package.json
                ```
            "command": "don-chan-key-combo.incrementCount4",
                "key": "4",
                "when": "editorTextFocus && vim.mode == 'Normal'"
                ```
                ```
                {
                    "command": "don-chan-key-combo.incrementCountAltLeft",
                    "title": "Increment Count for Alt Left"
                }
                ```
        #### 1. Perche ho dovuto farci luce?
        perche non facendo parte della documentazione di vscode potrebbero forse crearmi un giorno dei problemi ma non lo so,
        - in ogni caso per utilizzatori di VIM
        ho messo attraverso i movimenti hjkl il contatore. Come? ho usato sempre dalla documentazione di VSCODE il cambio di selezione come conteggio di ++.

       #### da  sistemare quando si tiene premuto non aumenta i conteggi,
       aggiungereeventuali comandi d, c etc..


### 

gli assets mi sa che devo metterli da qualche parte per farli costruire in vsce.


####
ALLORA SOLUZIONI 
- RISCRIVERE DA 0 E FARE DIRETTAMENTE CLICK DELLA TASTIERA SENZA WORK AROUND PARTICOLARI 
- ALTRIMENTI CERCARE I VS CODE IL COMANDO CTRL 