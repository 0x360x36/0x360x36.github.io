document.addEventListener('DOMContentLoaded', function () {
    const terminal = document.getElementById('terminal');
    const commandInput = document.createElement('input');
    commandInput.id = 'command-input';
    terminal.appendChild(commandInput);

    function getExternalIP(callback) {
        fetch('https://api.ipify.org?format=json')
            .then(response => response.json())
            .then(data => callback(data.ip))
            .catch(error => console.error('Error fetching external IP:', error));
    }

    function displayPrompt(ip) {
        const promptText = ip + '@stolenh0ff.github.io:~$ ';
        terminal.innerHTML = '<div class="prompt">' + promptText + '</div>' + terminal.innerHTML;
        terminal.scrollTop = terminal.scrollHeight;
    }

    function executeCommand(command) {
        let output = '';

        switch (command.toLowerCase().trim()) {
            case 'whoami':
                output = 'who knows';
                break;
            case 'help':
                output = 'Lista de comandos:\nver-cv - Muestra tu currículum vitae';
                break;
            default:
                output = 'no, type help';
        }

        terminal.innerHTML = '<div class="output">' + output + '</div>' + terminal.innerHTML;
    }

    getExternalIP(displayPrompt);

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            const command = commandInput.value;
            commandInput.value = '';
            executeCommand(command);
        }
    });

    document.body.addEventListener('click', function () {
        commandInput.focus();
    });
});