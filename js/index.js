import { handleSearchInput, searchSchedules } from './modules/utils.js';

document.addEventListener("DOMContentLoaded", function()
{
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

    let ospanTexts, ofilenames, sspanTexts, sfilenames, nspanTexts, nfilenames;
    import('./modules/data.js').then(async module =>
    {
        ospanTexts = await module.getOspanTexts();
        ofilenames = await module.getOfilenames();
        sspanTexts = await module.getSspanTexts();
        sfilenames = await module.getSfilenames();
        nspanTexts = await module.getNspanTexts();
        nfilenames = await module.getNfilenames();
        generateList(ospanTexts, ofilenames, o_list);
        generateList(sspanTexts, sfilenames, s_list);
        document.body.style.visibility = "visible";
    });

    o_list.addEventListener('click', redirecting_to_iframe);
    s_list.addEventListener('click', redirecting_to_iframe);

    function redirecting_to_iframe(event)
    {
        if (event.target.tagName === 'A')
        {
            event.preventDefault();
            const parts = event.target.href.split('/');
            const newHref = parts.slice(-2).join('/');
            window.location = `plan_index.html?schedule=${newHref}`;
        }
    }

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
});

