function getQueryParam(param)
{
    let urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}
window.onload = function()
{
    document.body.style.visibility = "visible";
    let scheduleIframe = document.getElementById('schedule-frame');
    let scheduleHref = getQueryParam('schedule');
    if (scheduleHref)
    {
        scheduleIframe = document.getElementById('schedule-frame');
        scheduleIframe.src = scheduleHref;
    }
    let scheduleTitle = document.querySelector('title');
    let svg = document.querySelector('svg');
    let navIFrame = document.getElementById('nav-frame');
    svg.addEventListener('click', function()
    {
        svg.classList.toggle('hidden-nav');
        navIFrame.classList.toggle('hidden-nav');
        scheduleIframe.classList.toggle('hidden-nav');
    });
    
    const mediaQuery = window.matchMedia('(max-width: 980px)');
    
    function handleMediaQuery(e) 
    {
        if (e.matches)
        {
            if (!svg.classList.contains('hidden-nav'))
            {
                svg.classList.add('hidden-nav');
                navIFrame.classList.add('hidden-nav');
                scheduleIframe.classList.add('hidden-nav');
            }
        }
    }
    
    mediaQuery.addEventListener('change', handleMediaQuery);
    handleMediaQuery(mediaQuery);
   
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
        else
            scheduleTitle.textContent = event.data;
    });
}