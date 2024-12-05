const ospanTexts = ['1A', '1B', '1C', '1D', '2A', '2B', '2C', '2D', '2E', '2F', '2G', '2H', '3A', '3B', '3C', '3D', '3E', '3F', '4A', '4B', '4C', '4D', '4E', '4F', '5A', '5B', '5C', '5D', '5E', '5F', '5G'];
const ofilenames = ['o1.html', 'o2.html', 'o3.html', 'o4.html', 'o5.html', 'o6.html', 'o7.html', 'o8.html', 'o9.html', 'o10.html', 'o11.html', 'o12.html', 'o13.html', 'o14.html', 'o15.html', 'o16.html', 'o17.html', 'o18.html', 'o19.html', 'o20.html', 'o21.html', 'o22.html', 'o23.html', 'o24.html', 'o25.html', 'o26.html', 'o27.html', 'o28.html', 'o29.html', 'o30.html', 'o31.html'];
const sspanTexts = ['s16', 's17', 's18', 's20', 's21', 's22', 's23', 's26', 's27', 's28', 's30', 's31', 's32', 's33', 's34', 's36', 's37', 's38', 's40', 's41', 's42', 's43', 's44', 's46', 's47', 's48', 's50', 's51', 's56', 's57', 's58', 'SG1', 'SG2', 'SG3', 'SG4', 'CKP1', 'CKP2', 'B101', 'B102', 'B103', 'B104', 'B105', 'B106', 'B107', 'B108', 'B109', 'B201', 'B202', 'B203', 'B204', 'B205', 'BSG', 'BSG1', 's61', 's62', 'BSW', 'SwF', 'B108A', 'Piwnica'];
const sfilenames = ['s1.html', 's2.html', 's3.html', 's4.html', 's5.html', 's6.html', 's7.html', 's8.html', 's9.html', 's10.html', 's11.html', 's12.html', 's13.html', 's14.html', 's15.html', 's16.html', 's17.html', 's18.html', 's19.html', 's20.html', 's21.html', 's22.html', 's23.html', 's24.html', 's25.html', 's26.html', 's27.html', 's28.html', 's29.html', 's30.html', 's31.html', 's32.html', 's33.html', 's34.html', 's35.html', 's36.html', 's37.html', 's38.html', 's39.html', 's40.html', 's41.html', 's42.html', 's43.html', 's44.html', 's45.html', 's46.html', 's47.html', 's48.html', 's49.html', 's50.html', 's51.html', 's52.html', 's53.html', 's54.html', 's55.html', 's56.html', 's57.html', 's58.html', 's59.html'];
const nspanTexts = ['J. Andrzejak (AJ)', 'A. Brych (AB)', 'K. Chwałowski (KC)', '1. Ckp (CKP1)', '2. Ckp (CKP2)', 'Z. Filipek (ZF)', 'R. Fiweg (RF)', 'R. Garcon (GR)', 'R. Gilewicz (RG)', 'J. Gimżewski (JG)', 'A. Gizelska (AG)', 'K. Giżyński (GI)', 'E. Gostomska (EG)', 'E. Iwaniec (EI)', 'A. Jaborkhel (JA)', 'M. Jadwiszczok (MJ)', 'K. Jakubowska (KJ)', 'J. Janicki (JJ)', 'G. Kaźmierczak (KG)', 'R. Kocik (RK)', 'K. Kościelniak (KK)', 'W. Kowalewski (WK)', 'A. Kozłowski (KZ)', 'S. Kubica (SK)', 'F. Kuczewski (FK)', 'J. Kułaczkowski (JK)', 'K. Lancmańska (KL)', 'G. Ledachowicz (GL)', 'O. Legner (OL)', 'A. Lerczak (AL)', 'A. Lisiecka (LA)', 'C. Lossy (CL)', 'M. Łażewski (MŁ)', 'K. Makowska (KM)', 'O. Malengowska (OM)', 'P. Matuszak (PM)', 'A. Matyjasek (AM)', 'W. Metello-Kasprzyk (ME)', 'R. Mikołajczak (RM)', 'N. Mocek (NM)', 'F. Napierała (FN)', 'M. Nowak (MN)', 'J. Obstalecka (JO)', 'W. Ostrowski (WO)', 'P. Palacz (PP)', 'A. Pietrzak (PA)', 'J. Rabenda (JR)', 'M. Raus (RA)', 'D. Renk (DR)', 'M. Rękoś (MR)', 'W. Rząsa (WR)', 'U. Skrzypek (SU)', 'I. Smierzchalska (IS)', 'L. Sokołowska (LS)', 'M. Sopa (SG)', 'A. Szewczyczak (SE)', 'P. Szulada (SZ)', 'W. Szumski (WSZ)', 'E. Szutowska-Pietranis (EP)', 'J. Szygenda (SJ)', 'A. Szymaniak (AS)', 'P. Szymczak (PS)', 'M. Szyper (MS)', 'D. Szypko (DS)', 'M. Śliwa (SW)', 'E. Tarabasz (TE)', 'J. Tendera (JT)', 'M. Tomczak-Niewiada (MT)', 'R. Tyma (RT)', 'S. Wartacz (WS)', 'M. Wawrzyniak (MW)', 'M. Witczak (WM)', 'P. Witczak (WZ)', 'K. Wojciechowska (KW)', 'A. Wojcieszak (AW)', 'I. Zawal (ZI)'];
const nfilenames = ['n1.html', 'n2.html', 'n3.html', 'n4.html', 'n5.html', 'n6.html', 'n7.html', 'n8.html', 'n9.html', 'n10.html', 'n11.html', 'n12.html', 'n13.html', 'n14.html', 'n15.html', 'n16.html', 'n17.html', 'n18.html', 'n19.html', 'n20.html', 'n21.html', 'n22.html', 'n23.html', 'n24.html', 'n25.html', 'n26.html', 'n27.html', 'n28.html', 'n29.html', 'n30.html', 'n31.html', 'n32.html', 'n33.html', 'n34.html', 'n35.html', 'n36.html', 'n37.html', 'n38.html', 'n39.html', 'n40.html', 'n41.html', 'n42.html', 'n43.html', 'n44.html', 'n45.html', 'n46.html', 'n47.html', 'n48.html', 'n49.html', 'n50.html', 'n51.html', 'n52.html', 'n53.html', 'n54.html', 'n55.html', 'n56.html', 'n57.html', 'n58.html', 'n59.html', 'n60.html', 'n61.html', 'n62.html', 'n63.html', 'n64.html', 'n65.html', 'n66.html', 'n67.html', 'n68.html', 'n69.html', 'n70.html', 'n71.html', 'n72.html', 'n73.html', 'n74.html', 'n75.html', 'n76.html'];

let search_input;
let wasOverThreshold = window.innerWidth > 980;

document.addEventListener('DOMContentLoaded', function() 
{
    //Zmiana title strony na title planu w iframe'ie przez message event z iframe'a
    let scheduleTitle = document.querySelector('title');
    let svg = document.querySelector('svg');
    let navContainer = document.getElementById('nav-container');
    let scheduleIframe = document.getElementById('schedule-frame');

    window.addEventListener('message', function(event)
    {
        if (event.data.type.startsWith("Plan"))
        {
            this.document.body.style.visibility = "visible";
            scheduleTitle.textContent = event.data.type;
        }
        else if (event.data.type === 'ctrlF')
        {
            handleCtrlF(event, svg, navContainer, scheduleIframe);
        }
        else if (event.data.type == 'kumiGaming')
        {
            window.location.href = event.data.href;
        }
    });

    //Ustawienie src iframe'u na podstawie parametru schedule w URL
    let scheduleHref = getQueryParam('schedule');
    if (scheduleHref) 
        scheduleIframe.src = scheduleHref;
    

    //Generowanie contentu nav bara
    let indexLink = addElement('a', 'nav#nav-container', true);
    indexLink.href = '../planyzsk/index.html';
    indexLink.textContent = 'Strona główna';
    generateList('Oddziały', ofilenames, navContainer);
    generateList('Nauczyciele', nfilenames, navContainer);
    generateList('Sale', sfilenames, navContainer);
    
    //Przechwytywanie kliknięć w linki nav bara i zmiana src iframe'u na odpowiedni link
    navContainer.addEventListener('click', function(event)
    {
        console.log('click');
        if (event.target.textContent === 'Strona główna' || event.target.tagName !== 'A')
            return;
        event.preventDefault();
        console.log('click2');
        let href = event.target.href;
        href = href.split('/')
        href = href.slice(-2).join('/');
        scheduleIframe.src = href;
        setTimeout(() => 
        {
            if (window.innerWidth <= 980) 
                switchNav(svg, navContainer, scheduleIframe);
        }, 300);
    });
    
    //Zmiana widoczności nav bara po kliknięciu w arrow svg
    svg.addEventListener('click', () =>
        switchNav(svg, navContainer, scheduleIframe));
    
    document.addEventListener('keydown', (event) => handleCtrlF(event, svg, navContainer, scheduleIframe));

    //Schowanie nav bara, jeśli jest widoczny, po zmniejszeniu okna przeglądarki
    if (window.innerWidth <= 980)
        switchNav(svg, navContainer, scheduleIframe, forceHiddenNav=true);
    window.addEventListener('resize', () =>
        handleMediaQuery(svg, navContainer, scheduleIframe));

    //Obsługa wyszukiwarki
    search_input = document.getElementById('search-input');
    let container = document.getElementById('container');
    
    search_input.addEventListener('keyup', function() 
    {
        if (search_input.value.length > 0)
        {
            if (container.querySelectorAll('div.search-results'))
                container.querySelectorAll('div.search-results').forEach(div => div.remove());
            
            searchSchedules('Nauczyciele');
            searchSchedules('Oddziały');
            searchSchedules('Sale');
            
            if (!container.querySelector('.search-results'))
            {
                const noResults = document.createElement('div');
                noResults.classList.add('search-results');
                noResults.id = 'n';
                noResults.innerHTML = '<h2>Nie znaleziono.</h2>';
                container.appendChild(noResults);
            }
        }
        else
            container.querySelectorAll('.search-results').forEach(result => result.remove());
    });

});

function getDisplayName(filename) 
{
    return filename.replace(/\s[A-Z]+\.html$/, '');
}

function searchSchedules(scheduleType)
{   
    let searchTerm = search_input.value.toLowerCase();
    let spanTexts, filenames;
    let header_name = scheduleType;
    switch (scheduleType)
    {
        case 'Nauczyciele':
            spanTexts = nspanTexts;
            filenames = nfilenames;
            break;
        case 'Sale':
            spanTexts = sspanTexts;
            filenames = sfilenames;
            break;
        case 'Oddziały':
            spanTexts = ospanTexts;
            filenames = ofilenames;
            header_name = 'Klasy';
            break;
    }
    const resultsContainer = document.createElement('div');
    resultsContainer.classList.add('search-results');
    resultsContainer.id = `${scheduleType[0].toLowerCase()}-results`;
    resultsContainer.innerHTML = '';
    let resultsLinksContainer = document.createElement('div');
    resultsLinksContainer.classList.add('results-links');
    resultsLinksContainer.innerHTML = '';

    let filteredSchedules;
    if (scheduleType == 'Nauczyciele') 
    {
        filteredSchedules = spanTexts.filter(schedule => 
            schedule.toLowerCase().trim().slice(3).startsWith(searchTerm)
        );
    } 
    else 
    {
        filteredSchedules = spanTexts.filter(schedule => 
            schedule.toLowerCase().trim().includes(searchTerm)
        );
    }

    if (filteredSchedules.length == 0)
        return;

    const header = document.createElement('h3');
    header.textContent = `${header_name}`;
    resultsContainer.appendChild(header);

    filteredSchedules.forEach(schedule => 
    {
        const a = document.createElement('a');
        const href = "dane/" + filenames[spanTexts.indexOf(schedule)];
        a.href = href;
        a.textContent = getDisplayName(schedule);
        resultsLinksContainer.appendChild(a);
    });

    resultsContainer.appendChild(resultsLinksContainer);
    container.appendChild(resultsContainer);
}

function getQueryParam(param) 
{
    let urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

function generateList(listType, filenames, list) 
{
    let spanTexts;
    let labelName = listType;
    switch (listType) 
    {
        case 'Nauczyciele':
            spanTexts = nspanTexts;
            break;
        case 'Sale':
            spanTexts = sspanTexts;
            break;
        case 'Oddziały':
            spanTexts = ospanTexts;
            labelName = 'Klasy';
            break;
    }
    let containerDiv = document.createElement('div');
    containerDiv.classList.add('nav-links');
    containerDiv.id = `${listType[0].toLowerCase()}-links`;
    list.appendChild(containerDiv);
    for (let i = 0; i < filenames.length; i++) 
    {
        let anchor = document.createElement("a");
        anchor.href = "dane/" + filenames[i];
        anchor.textContent = spanTexts[i];
        containerDiv.appendChild(anchor);
    }
}

function addElement(elementToAdd, target, appendFirst) 
{
    let element = document.createElement(elementToAdd);
    let targetElement = document.querySelector(target);
    if (appendFirst)
        targetElement.prepend(element);
    else
        targetElement.appendChild(element);
    return element;
}

function switchNav(svg, navContainer, scheduleIframe, forceHiddenNav = null) 
{
    if (forceHiddenNav === null)
    {
        svg.classList.toggle('hidden-nav');
        navContainer.classList.toggle('hidden-nav');
        scheduleIframe.classList.toggle('hidden-nav');
    }
    else
    {
        svg.classList.toggle('hidden-nav', forceHiddenNav);
        navContainer.classList.toggle('hidden-nav', forceHiddenNav);
        scheduleIframe.classList.toggle('hidden-nav', forceHiddenNav);
    }
    search_input.value = `hide - ${forceHiddenNav}`;
}

function handleMediaQuery(svg, navContainer, scheduleIframe) 
{
    const isOverThreshold = window.innerWidth > 980;
    if (isOverThreshold == wasOverThreshold)
        return;
    
    if (window.innerWidth <= 980) 
    {
        switchNav(svg, navContainer, scheduleIframe, forceHiddenNav=true);
    }
    else if (window.innerWidth > 980) 
    {
        switchNav(svg, navContainer, scheduleIframe, forceHiddenNav=false);
    }
    wasOverThreshold = isOverThreshold;
}

function handleCtrlF(event, svg, navContainer, scheduleIframe) 
{
   if (event.ctrlKey && event.key === 'f' || event.data.type === 'ctrlF') 
   {
        event.preventDefault();
        switchNav(svg, navContainer, scheduleIframe, false);
        search_input.focus();
        search_input.select();
   }
}