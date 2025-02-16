document.addEventListener('DOMContentLoaded', function()
{
    const urlBase = '../planyzsk/plan_index.html?schedule=dane';

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


    let compare_button = document.createElement('button');
    compare_button.id = 'compare-button';
    compare_button.textContent = 'Porównaj';
    compare_button.onclick = f_porownaj;
    document.getElementById('plan_name').appendChild(compare_button);


    //Wysyłanie title strony do parenta (plan_index) i ustawienie widoczności strony
    document.body.style.visibility = 'visible';
    window.parent.postMessage({msg_type: title.textContent.trim()}, '*');

});
//Funkcja dodająca/usuwajaca plan do ulubionych
window.appendToStorage = () => {
    const urlBase = '../planyzsk/plan_index.html?schedule=dane';
    //Pobranie aktyalnej localstorage
    let fav_map = new Map(JSON.parse(localStorage.getItem("fav_plans") || "[]"));

    let documentContent = parent.document.getElementById('schedule-frame').contentDocument;
    let iframeUrl = documentContent.URL;

    let lastPart = iframeUrl.substring(iframeUrl.lastIndexOf('/') + 1);
    let fullUrl = `${urlBase}/${lastPart}`;
    //pobranie nazwy planu
    let plan_name = document.getElementById('plan_name');
    //Dodanie/usunięcie planu z ulubionych
    if(!fav_map.has(fullUrl)) {
        fav_map.set(fullUrl, plan_name.innerText);
    } else {
        fav_map.delete(fullUrl);
    }
    localStorage.setItem("fav_plans", JSON.stringify(Array.from(fav_map.entries())));
    setTimeout(function(){
        location.reload();
    }, 600);
}
window.f_porownaj = () => {
    let cur_url = parent.window.location.href;
    let body = parent.document.querySelector('body');
    let compare_frame = parent.document.getElementById('compare-frame');
    let compare_frame2 = document.getElementById('compare-frame');
    if (!compare_frame && !compare_frame2) {
        compare_frame = document.createElement('iframe');
        compare_frame.id = 'compare-frame';
        compare_frame.src = cur_url;
        body.appendChild(compare_frame);
    }
}