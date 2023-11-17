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
                outputDiv.textContent = `
    Commands:
    \t- help: Display this message.
    \t- clear: Clear the terminal.
    \t- date: Returns the current date.
    \t- ls: List files.
    \t- wget {file}: Download the file.
    \t- socials: Display links to my socials.
                                        `;
            break;

            case 'clear':
                terminal.innerHTML = '';
                break;

            case 'socials':
                const linkedin = document.createElement('a');
                linkedin.href = 'https://www.linkedin.com/in/nimajnebs/';
                linkedin.textContent = 'LinkedIn';
                outputDiv.appendChild(linkedin);

                outputDiv.appendChild(document.createTextNode('\n'));

                const github = document.createElement('a');
                github.href = 'https://github.com/stolenh0ff'
                github.textContent = 'GitHub';
                outputDiv.appendChild(github);
                break;

            case 'date':
                outputDiv.textContent = new Date().toString();
                break;
            case 'ls':
                outputDiv.textContent = '';
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