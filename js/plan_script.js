import { checkCtrlD, addElement } from './modules/utils.js';

document.addEventListener('DOMContentLoaded', function()
{
    const urlBase = '../planyzsk/plan_index.html?schedule=dane';

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

    //Dodanie id do nazwy planu
    let plan_name = document.querySelector('span:first-of-type');
    plan_name.id = 'plan_name';

    //Stworzenie url do sprawdzenia czy plan jest w ulubionych
    let fav_map = new Map(JSON.parse(localStorage.getItem("fav_plans") || "[]"));

    let documentContent = parent.document.getElementById('schedule-frame').contentDocument.URL;
    let lastPart = documentContent.substring(documentContent.lastIndexOf('/') + 1);
    let fullUrl = `${urlBase}/${lastPart}`;

    //Dodanie checkboxa do dodawania do ulubionych (jeśli plan jest w ulubionych to checkbox jest zaznaczony)
    let add_cbox = document.createElement('input');
    add_cbox.type = 'checkbox';
    add_cbox.id = 'add-to-fav';
    add_cbox.name = 'add-cbox';
    add_cbox.onclick = appendToStorage;
    add_cbox.title = 'Dodaj do ulubionych';
    add_cbox.checked = false;
    if (fav_map.has(fullUrl)) {
        add_cbox.checked = true;
        add_cbox.title = 'Usuń z ulubionych';
    }
    document.getElementById('plan_name').appendChild(add_cbox);

    //Dodanie labela do checkboxa
    let cbox_label = document.createElement('label');
    cbox_label.htmlFor = 'add-cbox';
    cbox_label.textContent = 'Dodaj do ulubionych';
    document.body.appendChild(cbox_label);

    //Wysyłanie title strony do parenta (plan_index) i ustawienie widoczności strony
    document.body.style.visibility = 'visible';
    window.parent.postMessage({msg_type: title.textContent.trim()}, '*');

});

function createTwitchEmbed(event)
{
    event.preventDefault();
    document.body.innerHTML = '';
    let embed = addElement('div', document.body);
    embed.id = 'twitch-embed';

    let script = addElement('script', document.body);
    script.src = 'https://embed.twitch.tv/embed/v1.js';

    script.onload = function()
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