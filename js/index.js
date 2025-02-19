import { handleSearchInput, searchSchedules, generateList, checkCtrlD, handleCtrlD, isMobile, addElement } from './modules/utils.js';

document.addEventListener('DOMContentLoaded', async function()
{
    let container = document.getElementById('container');
    let search_input = document.getElementById('search-input');
    let search_button = document.getElementById('search-button');
    let o_links = document.getElementById('o-links');
    let s_links = document.getElementById('s-links');

    if (isMobile())
        search_input.placeholder = 'Szukaj planu';
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

    let section_fav_plans = document.querySelector('#fav-plans');
    section_fav_plans.style.display = localStorage.getItem('fav_plans') === null ? 'none' : 'flex';

    let fav_map = new Map(JSON.parse(localStorage.getItem('fav_plans')));
    let fav_plany_list = document.querySelector('#fav-plans-container');
    for (const [key, value] of fav_map)
    {
        let fav_anchor = addElement('a', fav_plany_list);
        fav_anchor.className = 'fav-plans-link';
        fav_anchor.href = (`${key}`);
        fav_anchor.innerText = (`${value}`);
    }

    let clear_fav_plans_btn = document.querySelector('#clear-fav-plans');
    clear_fav_plans_btn.addEventListener('click', () =>
    {
        if (window.confirm('Czy na pewno chcesz wyczyścić ulubione plany?'))
            localStorage.removeItem('fav_plans');
        section_fav_plans.innerHTML = '';
        section_fav_plans.style.display = 'none';
    });
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