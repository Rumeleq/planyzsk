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

    let fav_map = new Map(JSON.parse(localStorage.getItem("fav_plans") || "[]"));

    let parentUrl = window.location !== window.parent.location ? document.referrer : document.URL;
    let add_buton = document.createAttribute('button');
    add_buton.onclick = appendToStorage;
    if(fav_map.has(parentUrl)) {
        add_buton.textContent = 'Usuń z ulubionych';
    }
    else {
        add_buton.textContent = 'Dodaj do ulubionych';
    }




});

window.appendToStorage = () => {
    let fav_map = new Map(JSON.parse(localStorage.getItem("fav_plans") || "[]"));
    let parentUrl = window.location !== window.parent.location ? document.referrer : document.URL;
    if(!fav_map.has(parentUrl)) {
        fav_map.set(parentUrl, plan_name.innerText);
    } else {
        fav_map.delete(parentUrl);
    }
    localStorage.setItem("fav_plans", JSON.stringify(Array.from(fav_map.entries())));
}