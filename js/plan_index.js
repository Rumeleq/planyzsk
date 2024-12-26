import { handleSearchInput } from './modules/utils.js';

let ospanTexts, ofilenames, sspanTexts, sfilenames, nspanTexts, nfilenames;
let is_data_loaded_promise = new Promise(resolve =>
{
    import('./modules/data.js').then(async module =>
    {
        ospanTexts = module.ospanTexts;
        ofilenames = module.ofilenames;
        sspanTexts = module.sspanTexts;
        sfilenames = module.sfilenames;
        nspanTexts = await module.getNspanTexts();
        nfilenames = module.nfilenames;
        resolve();
    });
});

let search_input;
let wasOverThreshold = window.innerWidth > 980;

document.addEventListener('DOMContentLoaded', async function()
{
    await is_data_loaded_promise;

    //Zmiana title strony na title planu w iframe'ie przez message event z iframe'a
    let scheduleTitle = document.querySelector('title');
    let svg = document.querySelector('svg');
    let navContainer = document.getElementById('nav-container');
    let scheduleIframe = document.getElementById('schedule-frame');
    if (window.innerWidth <= 980)
        switchNav(svg, navContainer, scheduleIframe, true);

    window.addEventListener('message', function(event)
    {
        if (event.data.type.trim().startsWith('Plan'))
        {
            this.document.body.style.visibility = "visible";
            scheduleTitle.textContent = event.data.type;
        }
        else if (event.data.type === 'ctrlF')
        {
            handleCtrlF(event, svg, navContainer, scheduleIframe);
        }
        else if (event.data.type === 'kumiGaming')
        {
            window.location.href = event.data.href;
        }
    });

    //Ustawienie src iframe'u na podstawie parametru schedule w URL
    let scheduleHref = getQueryParam('schedule');
    if (scheduleHref) 
        scheduleIframe.src = scheduleHref;
    
    //Generowanie contentu nav bara
    let indexLink = addElement('a', 'nav#nav-container', true);
    indexLink.href = '../planyzsk/index.html';
    indexLink.textContent = 'Strona główna';
    generateList('Oddziały', ofilenames, navContainer);
    generateList('Nauczyciele', nfilenames, navContainer);
    generateList('Sale', sfilenames, navContainer);
    
    //Przechwytywanie kliknięć w linki nav bara i zmiana src iframe'u na odpowiedni link
    navContainer.addEventListener('click', function(event)
    {
        if (event.target.textContent === 'Strona główna' || event.target.tagName !== 'A')
            return;
        event.preventDefault();
        let href = event.target.href;
        href = href.split('/')
        href = href.slice(-2).join('/');
        scheduleIframe.src = href;
        setTimeout(() => 
        {
            if (window.innerWidth <= 980) 
                switchNav(svg, navContainer, scheduleIframe);
        }, 200);
    });
    
    //Zmiana widoczności nav bara po kliknięciu w arrow svg
    svg.addEventListener('click', () =>
        switchNav(svg, navContainer, scheduleIframe));

    document.addEventListener('keydown', (event) => handleCtrlF(event, svg, navContainer, scheduleIframe));

    //Schowanie nav bara, jeśli jest widoczny, po zmniejszeniu okna przeglądarki
    if (window.innerWidth <= 980)
        switchNav(svg, navContainer, scheduleIframe, true);
    window.addEventListener('resize', () =>
        handleMediaQuery(svg, navContainer, scheduleIframe));

    //Obsługa wyszukiwarki
    search_input = document.getElementById('search-input');
    let container = document.getElementById('container');

    search_input.addEventListener('keyup', function() 
    {
        handleSearchInput(container, search_input);
    });

});

function getQueryParam(param) 
{
    let urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

function generateList(listType, filenames, list) 
{
    let spanTexts;
    let labelName = listType;
    switch (listType) 
    {
        case 'Nauczyciele':
            spanTexts = nspanTexts;
            break;
        case 'Sale':
            spanTexts = sspanTexts;
            break;
        case 'Oddziały':
            spanTexts = ospanTexts;
            labelName = 'Klasy';
            break;
    }
    let containerDiv = document.createElement('div');
    containerDiv.classList.add('nav-links');
    containerDiv.id = `${listType[0].toLowerCase()}-links`;
    list.appendChild(containerDiv);
    for (let i = 0; i < filenames.length; i++) 
    {
        let anchor = document.createElement("a");
        anchor.href = "dane/" + filenames[i];
        anchor.textContent = spanTexts[i];
        containerDiv.appendChild(anchor);
    }
}

function addElement(elementToAdd, target, appendFirst) 
{
    let element = document.createElement(elementToAdd);
    let targetElement = document.querySelector(target);
    if (appendFirst)
        targetElement.prepend(element);
    else
        targetElement.appendChild(element);
    return element;
}

function switchNav(svg, navContainer, scheduleIframe, forceHiddenNav = null)
{
    if (forceHiddenNav === null)
    {
        svg.classList.toggle('hidden-nav');
        navContainer.classList.toggle('hidden-nav');
        scheduleIframe.classList.toggle('hidden-nav');
    }
    else
    {
        svg.classList.toggle('hidden-nav', forceHiddenNav);
        navContainer.classList.toggle('hidden-nav', forceHiddenNav);
        scheduleIframe.classList.toggle('hidden-nav', forceHiddenNav);
    }
}

function handleMediaQuery(svg, navContainer, scheduleIframe) 
{
    const isOverThreshold = window.innerWidth > 980;
    if (isOverThreshold === wasOverThreshold)
        return;
    
    if (window.innerWidth <= 980) 
    {
        switchNav(svg, navContainer, scheduleIframe, true);
    }
    else if (window.innerWidth > 980) 
    {
        switchNav(svg, navContainer, scheduleIframe, false);
    }
    wasOverThreshold = isOverThreshold;
}

function handleCtrlF(event, svg, navContainer, scheduleIframe) 
{
    try
    {
       if (event.ctrlKey && event.key === 'f' || event.data.type === 'ctrlF')
       {
           event.preventDefault();
           switchNav(svg, navContainer, scheduleIframe, false);
           search_input.focus();
           search_input.select();
       }
    }
    catch (TypeError) {}
}