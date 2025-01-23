import { handleSearchInput, generateList } from './modules/utils.js';

let search_input;
let wasOverThreshold = window.innerWidth > 980;

document.addEventListener('DOMContentLoaded', async function()
{
    //Zmiana title strony na title planu w iframe'ie przez message event z iframe'a
    let scheduleTitle = document.querySelector('title');
    let svg = document.querySelector('svg');
    let navContainer = document.getElementById('nav-container');
    let scheduleIframe = document.getElementById('schedule-frame');
    if (window.innerWidth <= 980)
        hideNav(svg, navContainer, scheduleIframe);

    //Ustawienie src iframe'u na podstawie parametru schedule w URL
    let scheduleHref = getQueryParam('schedule');
    if (scheduleHref)
        scheduleIframe.src = scheduleHref;

    window.addEventListener('message', function(event)
    {
        if (event.data.msg_type.startsWith('Plan'))
            scheduleTitle.textContent = event.data.msg_type;
        else if (event.data.msg_type === 'ctrlF')
            handleCtrlF(event, svg, navContainer, scheduleIframe);
        else if (event.data.msg_type === 'kumiGaming')
            window.location.href = event.data.href;
    });

    //Generowanie contentu nav bara
    await generateList('Oddziały');
    await generateList('Nauczyciele');
    await generateList('Sale');

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

    document.addEventListener('keydown', function(event)
    {
        if (event.ctrlKey && event.key === 'f')
            handleCtrlF(event, svg, navContainer, scheduleIframe);
    });

    //Schowanie nav bara, jeśli jest widoczny, po zmniejszeniu okna przeglądarki
    if (window.innerWidth <= 980)
        hideNav(svg, navContainer, scheduleIframe);
    window.addEventListener('resize', () => handleMediaQuery(svg, navContainer, scheduleIframe));

    //Obsługa wyszukiwarki
    search_input = document.getElementById('search-input');
    let container = document.getElementById('container');

    search_input.addEventListener('keyup', () => handleSearchInput(container, search_input));


    document.body.style.visibility = 'visible';

});

function getQueryParam(param) 
{
    let urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

function switchNav(svg, navContainer, scheduleIframe)
{
    svg.classList.toggle('hidden-nav');
    navContainer.classList.toggle('hidden-nav');
    scheduleIframe.classList.toggle('hidden-nav');
}

function hideNav(svg, navContainer, scheduleIframe)
{
    svg.classList.add('hidden-nav');
    navContainer.classList.add('hidden-nav');
    scheduleIframe.classList.add('hidden-nav');
}

function showNav(svg, navContainer, scheduleIframe)
{
    svg.classList.remove('hidden-nav');
    navContainer.classList.remove('hidden-nav');
    scheduleIframe.classList.remove('hidden-nav');
}

function handleMediaQuery(svg, navContainer, scheduleIframe) 
{
    const isOverThreshold = window.innerWidth > 980;
    if (isOverThreshold === wasOverThreshold)
        return;
    
    if (window.innerWidth <= 980)
        hideNav(svg, navContainer, scheduleIframe);
    else if (window.innerWidth > 980)
        showNav(svg, navContainer, scheduleIframe);

    wasOverThreshold = isOverThreshold;
}

function handleCtrlF(event, svg, navContainer, scheduleIframe) 
{
   event.preventDefault();
   showNav(svg, navContainer, scheduleIframe);
   search_input.focus();
   search_input.select();
}