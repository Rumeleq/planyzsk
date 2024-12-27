document.addEventListener('DOMContentLoaded', function()
{
    let title = document.querySelector('title');
    document.addEventListener('keydown', function(event) 
    {
        if (event.ctrlKey && event.key === 'f') 
        {
            event.preventDefault();
            window.parent.postMessage({type: 'ctrlF'}, '*');
        }
    });

    if (document.querySelector('a#kumi_gaming') !== null)
    {
        document.querySelector('a#kumi_gaming').addEventListener('click', function(event)
        {
            event.preventDefault();
            const href = this.getAttribute('href');
            window.parent.postMessage({type: 'kumiGaming', href: href}, '*');
        });
    }

    //Wysyłanie title strony do parenta i ustawienie widoczności strony
    document.body.style.visibility = 'visible';
    console.log('Parent window:', window.parent);
    window.parent.postMessage({type: title.textContent.trim()}, '*');
    console.log("Sent title message:", title.textContent.trim());
});