function getQueryParam(param) 
{
    let urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}
window.onload = function()
{
    document.body.style.visibility = "visible";

    let scheduleHref = getQueryParam('schedule');
    if (scheduleHref) 
    {
        let scheduleIframe = document.getElementById('schedule-frame');
        scheduleIframe.src = scheduleHref;
    }
    window.addEventListener('message', function(event) 
    {
        if (event.data.action === 'navigate') 
        {
            let href = event.data.href;
            let parts = href.split('/');
            let newHref = parts.slice(-2).join('/');
            let scheduleIframe = document.getElementById('schedule-frame');
            scheduleIframe.src = newHref;
        }
    });
}