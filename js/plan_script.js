import { checkCtrlD, addElement } from './modules/utils.js';

document.addEventListener('DOMContentLoaded', function()
{
    const base_url = '../planyzsk/plan_index.html?schedule=dane';

    let title = document.querySelector('title');
    document.addEventListener('keydown', function(event)
    {
        if (checkCtrlD(event))
        {
            event.preventDefault();
            window.parent.postMessage({msg_type: 'ctrlD'}, '*');
        }
    });

    let kumi_gaming_anchor = document.querySelector('a#kumi_gaming');
    if (kumi_gaming_anchor !== null)
        kumi_gaming_anchor.addEventListener('click', createTwitchEmbed);


    //sekcja odpowiedzialna za dodawanie do ulubionych

    //Stworzenie url do sprawdzenia czy plan jest w ulubionych
    let fav_map = new Map(JSON.parse(localStorage.getItem('fav_plans') || '[]'));

    let parent_url = parent.document.getElementById('schedule-frame').contentDocument.URL;
    let last_part = parent_url.substring(parent_url.lastIndexOf('/') + 1);
    console.log(last_part);
    let full_url = `${base_url}/${last_part}`;

    //Dodanie checkboxa do dodawania do ulubionych (jeśli plan jest w ulubionych to checkbox jest zaznaczony)
    let schedule_name_span = document.getElementById('schedule-name');
    let fav_checkbox = addElement('input', schedule_name_span);
    fav_checkbox.type = 'checkbox';
    fav_checkbox.id = 'add-to-fav';
    fav_checkbox.onclick = appendToStorage;
    fav_checkbox.title = 'Dodaj do ulubionych';
    if (fav_map.has(full_url))
    {
        fav_checkbox.checked = true;
        fav_checkbox.title = 'Usuń z ulubionych';
    }
    console.log(fav_map);
    schedule_name_span.appendChild(fav_checkbox);

    //Wysyłanie title strony do parenta (plan_index) i ustawienie widoczności strony
    document.body.style.visibility = 'visible';
    window.parent.postMessage({msg_type: title.textContent.trim()}, '*');
});

//Funkcja dodająca/usuwajaca plan do ulubionych
window.appendToStorage = () =>
{
    const url_base = '../planyzsk/plan_index.html?schedule=dane';
    //Pobranie aktyalnej localstorage
    let fav_map = new Map(JSON.parse(localStorage.getItem('fav_plans') || '[]'));

    let documentContent = parent.document.getElementById('schedule-frame').contentDocument;
    let iframe_url = documentContent.URL;

    let last_part = iframe_url.substring(iframe_url.lastIndexOf('/') + 1);
    let full_url = `${url_base}/${last_part}`;

    let schedule_name_span = document.getElementById('schedule-name');

    //Dodanie/usunięcie planu z ulubionych
    if (!fav_map.has(full_url))
        fav_map.set(full_url, schedule_name_span.innerText);
    else
        fav_map.delete(full_url);

    localStorage.setItem('fav_plans', JSON.stringify(Array.from(fav_map.entries())));
}

function createTwitchEmbed(event)
{
    event.preventDefault();
    document.body.innerHTML = '';
    let embed = addElement('div', document.body);
    embed.id = 'twitch-embed';

    let script = addElement('script', document.body);
    script.src = 'https://embed.twitch.tv/embed/v1.js';

    script.onload = () =>
    {
        new Twitch.Embed('twitch-embed',
            {
                width: '100%',
                height: '100%',
                channel: 'Kumi_Gaming',
                parent: [window.location.hostname]
            });
    };
}