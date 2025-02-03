let ospanTexts, ofilenames, sspanTexts, sfilenames, nspanTexts, nfilenames;
let is_data_loaded_promise = new Promise(resolve =>
{
    import('../modules/data.js').then(async module =>
    {
        ospanTexts = await module.getOspanTexts();
        ofilenames = await module.getOfilenames();
        sspanTexts = await module.getSspanTexts();
        sfilenames = await module.getSfilenames();
        nspanTexts = await module.getNspanTexts();
        nfilenames = await module.getNfilenames();
        resolve();
    });
});

function getDisplayName(filename)
{
    return filename.replace(/\s[A-Z]+\.html$/, '');
}

function addElement(elementToAdd, targetElement)
{
    let element = document.createElement(elementToAdd);
    targetElement.appendChild(element);
    return element;
}

export function searchSchedules(scheduleType)
{
    let container = document.getElementById('container');
    let search_input = document.getElementById('search-input');
    let searchTerm = search_input.value.toLowerCase();
    let spanTexts, filenames;
    let header_name = scheduleType;
    switch (scheduleType)
    {
        case 'Nauczyciele':
            spanTexts = nspanTexts;
            filenames = nfilenames;
            break;
        case 'Oddziały':
            spanTexts = ospanTexts;
            filenames = ofilenames;
            header_name = 'Klasy';
            break;
        case 'Sale':
            spanTexts = sspanTexts;
            filenames = sfilenames;
            break;
    }
    const resultsContainer = document.createElement('div');
    resultsContainer.classList.add('search-results');
    resultsContainer.id = `${scheduleType[0].toLowerCase()}-results`;
    resultsContainer.innerHTML = '';
    let resultsLinksContainer = document.createElement('div');
    resultsLinksContainer.classList.add('results-links');
    resultsLinksContainer.innerHTML = '';

    let filteredSchedules;
    if (scheduleType === 'Nauczyciele')
    {
        filteredSchedules = spanTexts.filter(schedule =>
        {
            const scheduleTextLower = schedule.toLowerCase().trim();
            const searchTermLower = searchTerm.toLowerCase().trim();

            return scheduleTextLower.slice(3).startsWith(searchTermLower) ||
                scheduleTextLower.slice(-3, -1).startsWith(searchTermLower);
        });
    }
    else if (scheduleType === 'Oddziały')
    {
        filteredSchedules = spanTexts.filter(schedule =>
            schedule.toLowerCase().trim().includes(searchTerm)
        );
    }
    else if (scheduleType === 'Sale')
    {
        filteredSchedules = spanTexts.filter(schedule =>
        {
            const scheduleTextLower = schedule.toLowerCase().trim();
            const searchTermLower = searchTerm.toLowerCase().trim();

            return scheduleTextLower.startsWith(searchTermLower) ||
                scheduleTextLower.slice(1).startsWith(searchTermLower);
        });
    }

    if (filteredSchedules.length === 0)
        return;

    const header = document.createElement('h3');
    header.textContent = `${header_name}`;
    resultsContainer.appendChild(header);

    filteredSchedules.forEach(schedule =>
    {
        const a = document.createElement('a');
        a.href = 'dane/' + filenames[spanTexts.indexOf(schedule)];
        a.textContent = getDisplayName(schedule);
        resultsLinksContainer.appendChild(a);
        a.addEventListener('click', function(event)
        {
            event.preventDefault();
            const parts = a.href.split('/');
            const newHref = parts.slice(-2).join('/');
            window.location = `plan_index.html?schedule=${newHref}`;
        });
    });

    resultsContainer.appendChild(resultsLinksContainer);
    container.appendChild(resultsContainer);
}

export function handleSearchInput(container, search_input)
{
    if (search_input.value.length > 0)
    {
        if (container.querySelectorAll('div.search-results'))
            container.querySelectorAll('div.search-results').forEach(div => div.remove());

        searchSchedules('Nauczyciele');
        searchSchedules('Oddziały');
        searchSchedules('Sale');

        if (!container.querySelector('.search-results'))
        {
            const noResults = document.createElement('div');
            noResults.classList.add('search-results');
            noResults.id = 'n';
            noResults.innerHTML = '<h2>Nie znaleziono.</h2>';
            container.appendChild(noResults);
        }
    }
    else
        container.querySelectorAll('.search-results').forEach(result => result.remove());
}

export async function generateList(listType)
{
    let spanTexts, containerDiv, filenames;
    let labelName = listType;
    await is_data_loaded_promise;
    switch (listType)
    {
        case 'Oddziały':
            spanTexts = ospanTexts;
            filenames = ofilenames;
            labelName = 'Klasy';
            containerDiv = document.getElementById('o-links');
            break;
        case 'Nauczyciele':
            spanTexts = nspanTexts;
            filenames = nfilenames;
            containerDiv = document.getElementById('n-links');
            break;
        case 'Sale':
            spanTexts = sspanTexts;
            filenames = sfilenames;
            containerDiv = document.getElementById('s-links');
            break;
    }
    for (let i = 0; i < filenames.length; i++)
    {
        let anchor = addElement('a', containerDiv);
        anchor.href = 'dane/' + filenames[i];
        anchor.textContent = spanTexts[i];
    }
}

export function checkCtrlD(event)
{
    if ((event.ctrlKey || event.metaKey) && event.key === 'd')
        return true;

    return false;
}

export function handleCtrlD(event, search_input, svg=null, navContainer=null, scheduleIframe=null, showNav=null)
{
    event.preventDefault();
    if (showNav)
        showNav(svg, navContainer, scheduleIframe);
    search_input.focus();
    search_input.select();
}