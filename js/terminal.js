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
        commandInput.placeholder = 'type "help"'; // Agrega esta línea
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
    \t- cv: Displays the CV (Curriculum Vitae)
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
                outputDiv.textContent = `
                        ### Benjamín Sepúlveda ###

        Hi!, I'm Benjamín, currently finishing my undergraduate degree in Network Engineering
        at DUOC UC, i'm really interested in everything related about security oriented to
        virtual environments and network.

        I describe myself as a creative, proactive, and resilient individual when it comes
        to finding solutions and solving problems. My main interests revolve around information
        technologies, security, and information protection within the field of computer
        science (IT). Therefore, I am constantly seeking relevant knowledge on these topics.
        
        Currently I'm working as a Threat Intelligence Analyst, conducting research on
        vulnerabilities and identifying potential threat actors that pose a risk to organizations.

    ## Experience

        NOUS - Threat Intelligence Analyst Intern
            (June 2023 - December 2023)
            I worked at NOUS as a threat intelligence analyst helping the team
            investigate potential risks to organizations by analyzing vulnerabilities.
            I've also built an API in Python and a few tools to automate and optimize
            processes within the department.

    ## Skills

        Platforms
            - Linux Based Distros
            - Windows
            - Mac
        
        Programming Languages
            - Python
            - Bash
            - Web (Javascript, HTML, CSS)

    ## Education
        
        Network Engineering - DUOC UC (2019 - 2023)
        Microsoft Certified: Azure Fundamentals - Microsoft (June - 2023)
        CCNP: Core Networking - Cisco (August - 2022)
        CyberSecurity Essentials - Cisco (January - 2023)

    ## Languages
        - Spanish (Native)
        - English (Proficient)

                                        `;
                break;

            case 'socials':
                const linkedin = document.createElement('a');
                linkedin.href = 'https://www.linkedin.com/in/nimajnebs/';
                linkedin.textContent = 'LinkedIn';
                linkedin.target = '_blank';
                outputDiv.appendChild(linkedin);
            
                outputDiv.appendChild(document.createTextNode('\n'));
            
                const github = document.createElement('a');
                github.href = 'https://github.com/stolenh0ff'
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
        }
    });

    document.body.addEventListener('click', function () {
        commandInput.focus();
    });
});