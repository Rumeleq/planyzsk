function getQueryParam(param) 
{
    let urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}
window.onload = function()
{
    document.body.style.visibility = "visible";

let navIframe = document.getElementById('nav-list');
let navContainer = navIframe.contentDocument.getElementById('nav-container');

navContainer.addEventListener('click', function(event)
{
    if (event.target.tagName === 'A')
    {
        event.preventDefault();
        if (event.target.textContent === 'Strona główna')
            window.location = '../planyzsk/index.html';
        else
        {
            let href = event.target.href;
            let parts = href.split('/');
            let newHref = parts.slice(-2).join('/');
            console.log(newHref);
            let iframe = document.getElementById('schedule-frame');
            iframe.src = newHref;
        }
    }
});

let scheduleHref = getQueryParam('schedule');
if (scheduleHref) 
{
    let scheduleIframe = document.getElementById('schedule-frame');
    scheduleIframe.src = scheduleHref;
}
}