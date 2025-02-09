import { checkCtrlD } from './modules/utils.js';

document.addEventListener('DOMContentLoaded', function()
{
    let title = document.querySelector('title');
    document.addEventListener('keydown', function(event) 
    {
        if (checkCtrlD(event))
        {
            event.preventDefault();
            window.parent.postMessage({msg_type: 'ctrlD'}, '*');
        }
    });

    if (document.querySelector('a#kumi_gaming') !== null)
    {
        document.querySelector('a#kumi_gaming').addEventListener('click', function(event)
        {
            event.preventDefault();
            document.body.innerHTML = '';
            let embed = document.createElement('div');
            embed.id = 'twitch-embed';
            document.body.appendChild(embed);

            let script = document.createElement('script');
            script.src = 'https://embed.twitch.tv/embed/v1.js';
            script.onload = function() {
                new Twitch.Embed('twitch-embed', {
                    width: '100%',
                    height: '100%',
                    channel: 'Kumi_Gaming',
                    parent: [window.location.hostname]
                });
            };
            document.body.appendChild(script);
        });
    }

    //Wysyłanie title strony do parenta (plan_index) i ustawienie widoczności strony
    document.body.style.visibility = 'visible';
    window.parent.postMessage({msg_type: title.textContent.trim()}, '*');
});