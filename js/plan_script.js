import { wordsToAddSpace, wordsToAddSpaceAfterFirstCharacter, wordsToAddSpaceAfterSecondCharacter } from './modules/data.js';


document.addEventListener('DOMContentLoaded', function()
{
    let title = document.querySelector('title');
    let header = document.querySelector('body > span');
    
    //Ustawianie title strony i headera na podstawie zawartości planu
    if (title.textContent.startsWith("Plan lekcji oddziału"))
    {
        header.textContent = header.textContent.slice(0, 2);
        title.textContent = title.textContent.slice(0, -4);
    }
    else if (title.textContent.startsWith("Plan lekcji sali"))
    {
        let regex2 = /^\d{2}$/;
        if (header.textContent.match(regex2))
        {
            header.textContent = 's' + header.textContent;
            let firstNumberIndex = title.textContent.search(/\d/);
            title.textContent = `${title.textContent.slice(0, firstNumberIndex)} s${title.textContent.slice(firstNumberIndex)}`;
        }
    }
    else
    {
        header.textContent = `${header.textContent.slice(0, 2)} ${header.textContent.slice(2)}`;
        title.textContent = `${title.textContent.slice(0, title.textContent.indexOf('.') + 1)} ${title.textContent.slice(title.textContent.indexOf('.') + 1)}`;
    }

    //Dodawanie spacji w lekcjach
    let tdElements = document.querySelectorAll('td span.p');
    tdElements.forEach(td => 
    {
        wordsToAddSpace.forEach(word => 
        {
            const regex = new RegExp(`(${word})(?!j)(?!$)`, 'g');
            td.textContent = td.textContent.replace(regex, `$1 `);
        });
        wordsToAddSpaceAfterFirstCharacter.forEach(word => 
        {
            const regex = new RegExp(`(${word.charAt(0)})(${word.substring(1)})`, 'g');
            td.textContent = td.textContent.replace(regex, `$1 $2`);
        });
        wordsToAddSpaceAfterSecondCharacter.forEach(word =>
        {
            const regex = new RegExp(`(${word.substring(0, 2)})(${word.substring(2)})`, 'g');
            td.textContent = td.textContent.replace(regex, `$1 $2`);
        });
        td.textContent = td.textContent.trim();
    });
    
    //Dodawanie spacji po przecinkach
    let aElements = document.querySelectorAll('td');
    aElements.forEach(a =>
    {
        const regex = new RegExp(`(,)`, 'g');
        a.innerHTML = a.innerHTML.replace(regex, `$1 `);
    });

    document.addEventListener('keydown', function(event) 
    {
        if (event.ctrlKey && event.key === 'f') 
        {
            event.preventDefault();
            window.parent.postMessage({type: 'ctrlF'}, '*');
        }
    });

    if (document.querySelector('a#kumi_gaming') !== null)
    {
        document.querySelector('a#kumi_gaming').addEventListener('click', function(event)
        {
            event.preventDefault();
            const href = this.getAttribute('href');
            window.parent.postMessage({type: 'kumiGaming', href: href}, '*');
        });
    }

    //Wysyłanie zmodifykowanego title strony do parenta i ustawienie widoczności strony
    document.body.style.visibility = 'visible';
    window.parent.postMessage({type: title.textContent}, '*');
});