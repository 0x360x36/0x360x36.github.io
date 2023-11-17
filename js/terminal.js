document.addEventListener('DOMContentLoaded', function () {
    const terminal = document.getElementById('terminal');
    terminal.style.display = 'flex';
    terminal.style.flexDirection = 'column';
    const commandInput = document.createElement('input');
    commandInput.id = 'command-input';

    let currentPrompt;

    function getExternalIP(callback) {
        fetch('https://api.ipify.org?format=json')
            .then(response => response.json())
            .then(data => callback(data.ip))
            .catch(error => console.error('Error fetching external IP:', error));
    }

    function createPrompt(ip) {
        const promptDiv = document.createElement('div');
        promptDiv.className = 'prompt';
        promptDiv.textContent = ip + '@stolenh0ff.github.io:~$ ';
        promptDiv.appendChild(commandInput);
        return promptDiv;
    }

    function executeCommand(command) {
        const outputDiv = document.createElement('div');
        outputDiv.className = 'output';
        switch (command.toLowerCase().trim()) {
            case 'help':
                outputDiv.textContent = 'Commands:';
                break;
            case 'date':
                outputDiv.textContent = new Date().toString();
                break;
            case 'ls':
            outputDiv.textContent = 'index.html\nstyle.css\nterminal.js';
            break;

            default:
                outputDiv.textContent = 'Unrecognized command, type "help" \n ';
        }
        terminal.appendChild(outputDiv);
        terminal.scrollTop = terminal.scrollHeight;
        currentPrompt = createPrompt(currentPrompt.textContent.split('@')[0]);
        terminal.appendChild(currentPrompt);
        commandInput.focus();
    }

    getExternalIP(ip => {
        currentPrompt = createPrompt(ip);
        terminal.appendChild(currentPrompt);
    });

    commandInput.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            const command = commandInput.value;
            commandInput.value = '';
            executeCommand(command);
        }
    });

    document.body.addEventListener('click', function () {
        commandInput.focus();
    });
});