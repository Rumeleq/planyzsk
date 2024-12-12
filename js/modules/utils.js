import { nfilenames, nspanTexts, ofilenames, ospanTexts, sfilenames, sspanTexts } from "../modules/data.js";

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
        case 'Sale':
            spanTexts = sspanTexts;
            filenames = sfilenames;
            break;
        case 'Oddziały':
            spanTexts = ospanTexts;
            filenames = ofilenames;
            header_name = 'Klasy';
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
            schedule.toLowerCase().trim().slice(3).startsWith(searchTerm)
        );
    }
    else
    {
        filteredSchedules = spanTexts.filter(schedule =>
            schedule.toLowerCase().trim().includes(searchTerm)
        );
    }

    if (filteredSchedules.length === 0)
        return;

    const header = document.createElement('h3');
    header.textContent = `${header_name}`;
    resultsContainer.appendChild(header);

    filteredSchedules.forEach(schedule =>
    {
        const a = document.createElement('a');
        a.href = "dane/" + filenames[spanTexts.indexOf(schedule)];
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

function getDisplayName(filename)
{
    return filename.replace(/\s[A-Z]+\.html$/, '');
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
