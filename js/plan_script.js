document.addEventListener('DOMContentLoaded', function()
{
    let title = document.querySelector('title');
    document.addEventListener('keydown', function(event) 
    {
        if (event.ctrlKey && event.key === 'f') 
        {
            event.preventDefault();
            window.parent.postMessage({msg_type: 'ctrlF'}, '*');
        }
    });

    if (document.querySelector('a#kumi_gaming') !== null)
    {
        document.querySelector('a#kumi_gaming').addEventListener('click', function(event)
        {
            event.preventDefault();
            const href = this.getAttribute('href');
            window.parent.postMessage({msg_type: 'kumiGaming', href: href}, '*');
        });
    }
    //Wysyłanie title strony do parenta (plan_index) i ustawienie widoczności strony
    document.body.style.visibility = 'visible';
    window.parent.postMessage({msg_type: title.textContent.trim()}, '*');

    //Dodanie id do nazwy planu
    let plan_name = document.querySelector('span:first-of-type');
    plan_name.id = 'plan_name';

    //Stworzenie url do sprawdzenia czy plan jest w ulubionych
    let fav_map = new Map(JSON.parse(localStorage.getItem("fav_plans") || "[]"));
    let parentUrl = window.location !== window.parent.location ? document.referrer : document.URL;
    parentUrl = parentUrl.substring(0, parentUrl.lastIndexOf('/'));
    let iframeSrc = parent.document.getElementById('schedule-frame').src;
    let lastPart = iframeSrc.substring(iframeSrc.lastIndexOf('/') + 1);
    let fullUrl = `${parentUrl}/${lastPart}`;

    //Dodanie checkboxa do dodawania do ulubionych (jeśli plan jest w ulubionych to checkbox jest zaznaczony)
    let add_cbox = document.createElement('input');
    add_cbox.type = 'checkbox';
    add_cbox.id = 'add-to-fav';
    add_cbox.name = 'add-cbox';
    add_cbox.onclick = appendToStorage;
    add_cbox.checked = fav_map.has(fullUrl);
    document.body.appendChild(add_cbox);

    //Dodanie labela do checkboxa
    let cbox_label = document.createElement('label');
    cbox_label.htmlFor = 'add-cbox';
    cbox_label.textContent = 'Dodaj do ulubionych';
    document.body.appendChild(cbox_label);
});
//Funkcja dodająca/usuwajaca plan do ulubionych
window.appendToStorage = () => {
    //Pobranie aktyalnej localstorage
    let fav_map = new Map(JSON.parse(localStorage.getItem("fav_plans") || "[]"));
    //Stworzenie url
    let parentUrl = window.location !== window.parent.location ? document.referrer : document.URL;
    parentUrl = parentUrl.substring(0, parentUrl.lastIndexOf('/'));
    let iframeSrc = parent.document.getElementById('schedule-frame').src;
    let lastPart = iframeSrc.substring(iframeSrc.lastIndexOf('/') + 1);
    let fullUrl = `${parentUrl}/${lastPart}`;
    //pobranie nazwy planu
    let plan_name = document.getElementById('plan_name');
    //Dodanie/usunięcie planu z ulubionych
    if(!fav_map.has(fullUrl)) {
        fav_map.set(fullUrl, plan_name.innerText);
    } else {
        fav_map.delete(fullUrl);
    }
    localStorage.setItem("fav_plans", JSON.stringify(Array.from(fav_map.entries())));
}