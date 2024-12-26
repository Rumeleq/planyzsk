import { ospanTexts, ofilenames, sspanTexts, sfilenames } from './modules/data.js';
import { handleSearchInput, searchSchedules } from './modules/utils.js';
import { loadJSON } from './modules/data.js';

window.onload = function()
{
    loadJSON('/planyzsk/pyscraper/JSON/o_map.json').then(data => console.log(data));
    document.body.style.visibility = "visible";
}

let container = document.getElementById('container');
let search_input = document.getElementById('search-input');
let search_button = document.getElementById('search-button');
let o_list = document.getElementById('o-list');
let s_list = document.getElementById('s-list');

document.addEventListener('keydown', function(event) 
{
    if (event.ctrlKey && event.key === 'f') 
    {
        event.preventDefault();
        search_input.focus();
        search_input.select();
    }
});

search_button.addEventListener('click', searchSchedules);
search_input.addEventListener('keyup', function() 
{
    handleSearchInput(container, search_input)
});

generateList(ospanTexts, ofilenames, o_list);
generateList(sspanTexts, sfilenames, s_list);

o_list.addEventListener('click', function(event)
{
    if (event.target.tagName === 'A') 
    {
        event.preventDefault();
        const parts = event.target.href.split('/');
        const newHref = parts.slice(-2).join('/');
        window.location = `plan_index.html?schedule=${newHref}`;

    }
});
s_list.addEventListener('click', function(event)
{
    if (event.target.tagName === 'A') 
    {
        event.preventDefault();
        const parts = event.target.href.split('/');
        const newHref = parts.slice(-2).join('/');
        window.location = `plan_index.html?schedule=${newHref}`;
    }
});


function generateList(spanTexts, filenames, list)
{
    for (let i = 0; i < filenames.length; i++)
    {
        let anchor = document.createElement("a");
        anchor.href = "dane/" + filenames[i];
        anchor.textContent = spanTexts[i];
        list.appendChild(anchor);
    }
}