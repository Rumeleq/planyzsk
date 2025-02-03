import { handleSearchInput, searchSchedules, generateList, checkCtrlD, handleCtrlD } from './modules/utils.js';

document.addEventListener('DOMContentLoaded', async function()
{
    let container = document.getElementById('container');
    let search_input = document.getElementById('search-input');
    let search_button = document.getElementById('search-button');
    let o_links = document.getElementById('o-links');
    let s_links = document.getElementById('s-links');

    document.addEventListener('keydown', function(event)
    {
        if (checkCtrlD(event))
            handleCtrlD(event, search_input);
    });

    search_button.addEventListener('click', searchSchedules);
    search_input.addEventListener('keyup', () => handleSearchInput(container, search_input));

    await generateList('Oddziały');
    await generateList('Sale');

    o_links.addEventListener('click', redirecting_to_iframe);
    s_links.addEventListener('click', redirecting_to_iframe);

    document.body.style.visibility = 'visible';
});

function redirecting_to_iframe(event)
{
    if (event.target.tagName === 'A')
    {
        event.preventDefault();
        const scheduleParts = event.target.href.split('/');
        const shortHref = scheduleParts.slice(-2).join('/');
        // shortens original href from e.g. [host]/planyzsk/dane/s56.html to dane/s56.html
        window.location = `plan_index.html?schedule=${shortHref}`;
    }
}