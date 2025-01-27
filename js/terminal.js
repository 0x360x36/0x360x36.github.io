document.addEventListener('DOMContentLoaded', function () {
    const terminal = document.getElementById('terminal');
    terminal.style.display = 'flex';
    terminal.style.flexDirection = 'column';
    const commandInput = document.createElement('input');
    commandInput.id = 'command-input';

    let currentPrompt;
    let commandHistory = [];
    let historyIndex = -1;

    function getExternalIP(callback) {
        fetch('https://api.ipify.org?format=json')
            .then(response => response.json())
            .then(data => callback(data.ip))
            .catch(error => console.error('Error fetching external IP:', error));
    }

    function createPrompt(ip) {
        const promptDiv = document.createElement('div');
        promptDiv.className = 'prompt';
        promptDiv.textContent = ip + '@0x360x36.github.io:~$ ';
        commandInput.placeholder = 'type "help"';
        promptDiv.appendChild(commandInput);
        return promptDiv;
    }

    function executeCommand(command) {
        const outputDiv = document.createElement('div');
        outputDiv.className = 'output';
        switch (command.toLowerCase().trim()) {
            case 'help':
                outputDiv.textContent = `
    System
    \t- help: Display this message.
    \t- clear: Clear the terminal.
    \t- date: Returns the current date.
    
    Info
    \t- cv: Display a link to download CV in pdf format.
    \t- socials: Display links to my socials.
                                        `;
                break;

            case '':
                outputDiv.textContent = '';
                break;

            case 'clear':
                terminal.innerHTML = '';
                break;

            case 'cv':
                const cvLink = document.createElement('a');
                cvLink.href = 'assets/CV3.pdf'; // Asegúrate de que esta ruta sea correcta
                cvLink.download = 'Benjamin_Sepulveda_CV.pdf';
                cvLink.textContent = 'Download CV\nsha256: 2bf5119dd59d0dcda0b37136e077bf17f49509fce9f5763f01e9e8700846d348';
                outputDiv.appendChild(cvLink);
                break;

            case 'socials':
                const linkedin = document.createElement('a');
                linkedin.href = 'https://www.linkedin.com/in/nimajnebs/';
                linkedin.textContent = 'LinkedIn';
                linkedin.target = '_blank';
                outputDiv.appendChild(linkedin);
            
                outputDiv.appendChild(document.createTextNode('\n'));
            
                const github = document.createElement('a');
                github.href = 'https://github.com/0x360x36'
                github.textContent = 'GitHub';
                github.target = '_blank';
                outputDiv.appendChild(github);
            
                outputDiv.appendChild(document.createTextNode('\n'));
            
                const email = document.createElement('a');
                email.href = 'mailto:benj.sepulvedas@duocuc.cl';
                email.textContent = 'Mail';
                email.target = '_blank';
                outputDiv.appendChild(email);
                break;

            case 'date':
                outputDiv.textContent = new Date().toString();
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
            commandHistory.push(command);
            historyIndex = commandHistory.length;
        } else if (event.key === 'ArrowUp') {
            if (historyIndex > 0) {
                historyIndex--;
                commandInput.value = commandHistory[historyIndex];
            }
        } else if (event.key === 'ArrowDown') {
            if (historyIndex < commandHistory.length - 1) {
                historyIndex++;
                commandInput.value = commandHistory[historyIndex];
            } else {
                historyIndex = commandHistory.length;
                commandInput.value = '';
            }
        }
    });

    document.body.addEventListener('click', function () {
        commandInput.focus();
    });
});