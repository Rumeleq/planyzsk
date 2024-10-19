window.onload = function()
{
    document.body.style.visibility = "visible";
}

const ospanTexts = ['1A', '1B', '1C', '1D', '2A', '2B', '2C', '2D', '2E', '2F', '2G', '2H', '3A', '3B', '3C', '3D', '3E', '3F', '4A', '4B', '4C', '4D', '4E', '4F', '5A', '5B', '5C', '5D', '5E', '5F', '5G'];
const ofilenames = ['o1.html', 'o2.html', 'o3.html', 'o4.html', 'o5.html', 'o6.html', 'o7.html', 'o8.html', 'o9.html', 'o10.html', 'o11.html', 'o12.html', 'o13.html', 'o14.html', 'o15.html', 'o16.html', 'o17.html', 'o18.html', 'o19.html', 'o20.html', 'o21.html', 'o22.html', 'o23.html', 'o24.html', 'o25.html', 'o26.html', 'o27.html', 'o28.html', 'o29.html', 'o30.html', 'o31.html'];
const sspanTexts = ['s16', 's17', 's18', 's20', 's21', 's22', 's23', 's26', 's27', 's28', 's30', 's31', 's32', 's33', 's34', 's36', 's37', 's38', 's40', 's41', 's42', 's43', 's44', 's46', 's47', 's48', 's50', 's51', 's56', 's57', 's58', 'SG1', 'SG2', 'SG3', 'SG4', 'CKP1', 'CKP2', 'B101', 'B102', 'B103', 'B104', 'B105', 'B106', 'B107', 'B108', 'B109', 'B201', 'B202', 'B203', 'B204', 'B205', 'BSG', 'BSG1', 's61', 's62', 'BSW', 'SwF', 'B108A', 'Piwnica'];
const sfilenames = ['s1.html', 's2.html', 's3.html', 's4.html', 's5.html', 's6.html', 's7.html', 's8.html', 's9.html', 's10.html', 's11.html', 's12.html', 's13.html', 's14.html', 's15.html', 's16.html', 's17.html', 's18.html', 's19.html', 's20.html', 's21.html', 's22.html', 's23.html', 's24.html', 's25.html', 's26.html', 's27.html', 's28.html', 's29.html', 's30.html', 's31.html', 's32.html', 's33.html', 's34.html', 's35.html', 's36.html', 's37.html', 's38.html', 's39.html', 's40.html', 's41.html', 's42.html', 's43.html', 's44.html', 's45.html', 's46.html', 's47.html', 's48.html', 's49.html', 's50.html', 's51.html', 's52.html', 's53.html', 's54.html', 's55.html', 's56.html', 's57.html', 's58.html', 's59.html'];
const nspanTexts = ['J. Andrzejak (AJ)', 'A. Brych (AB)', 'K. Chwałowski (KC)', '1. Ckp (CKP1)', '2. Ckp (CKP2)', 'Z. Filipek (ZF)', 'R. Fiweg (RF)', 'R. Garcon (GR)', 'R. Gilewicz (RG)', 'J. Gimżewski (JG)', 'A. Gizelska (AG)', 'K. Giżyński (GI)', 'E. Gostomska (EG)', 'E. Iwaniec (EI)', 'A. Jaborkhel (JA)', 'M. Jadwiszczok (MJ)', 'K. Jakubowska (KJ)', 'J. Janicki (JJ)', 'G. Kaźmierczak (KG)', 'R. Kocik (RK)', 'K. Kościelniak (KK)', 'W. Kowalewski (WK)', 'A. Kozłowski (KZ)', 'S. Kubica (SK)', 'F. Kuczewski (FK)', 'J. Kułaczkowski (JK)', 'K. Lancmańska (KL)', 'G. Ledachowicz (GL)', 'O. Legner (OL)', 'A. Lerczak (AL)', 'A. Lisiecka (LA)', 'C. Lossy (CL)', 'M. Łażewski (MŁ)', 'K. Makowska (KM)', 'O. Malengowska (OM)', 'P. Matuszak (PM)', 'A. Matyjasek (AM)', 'W. Metello-Kasprzyk (ME)', 'R. Mikołajczak (RM)', 'N. Mocek (NM)', 'F. Napierała (FN)', 'M. Nowak (MN)', 'J. Obstalecka (JO)', 'W. Ostrowski (WO)', 'P. Palacz (PP)', 'A. Pietrzak (PA)', 'J. Rabenda (JR)', 'M. Raus (RA)', 'D. Renk (DR)', 'M. Rękoś (MR)', 'W. Rząsa (WR)', 'U. Skrzypek (SU)', 'I. Smierzchalska (IS)', 'L. Sokołowska (LS)', 'M. Sopa (SG)', 'A. Szewczyczak (SE)', 'P. Szulada (SZ)', 'W. Szumski (WSZ)', 'E. Szutowska-Pietranis (EP)', 'J. Szygenda (SJ)', 'A. Szymaniak (AS)', 'P. Szymczak (PS)', 'M. Szyper (MS)', 'D. Szypko (DS)', 'M. Śliwa (SW)', 'E. Tarabasz (TE)', 'J. Tendera (JT)', 'M. Tomczak-Niewiada (MT)', 'R. Tyma (RT)', 'S. Wartacz (WS)', 'M. Wawrzyniak (MW)', 'M. Witczak (WM)', 'P. Witczak (WZ)', 'K. Wojciechowska (KW)', 'A. Wojcieszak (AW)', 'I. Zawal (ZI)'];
const nfilenames = ['n1.html', 'n2.html', 'n3.html', 'n4.html', 'n5.html', 'n6.html', 'n7.html', 'n8.html', 'n9.html', 'n10.html', 'n11.html', 'n12.html', 'n13.html', 'n14.html', 'n15.html', 'n16.html', 'n17.html', 'n18.html', 'n19.html', 'n20.html', 'n21.html', 'n22.html', 'n23.html', 'n24.html', 'n25.html', 'n26.html', 'n27.html', 'n28.html', 'n29.html', 'n30.html', 'n31.html', 'n32.html', 'n33.html', 'n34.html', 'n35.html', 'n36.html', 'n37.html', 'n38.html', 'n39.html', 'n40.html', 'n41.html', 'n42.html', 'n43.html', 'n44.html', 'n45.html', 'n46.html', 'n47.html', 'n48.html', 'n49.html', 'n50.html', 'n51.html', 'n52.html', 'n53.html', 'n54.html', 'n55.html', 'n56.html', 'n57.html', 'n58.html', 'n59.html', 'n60.html', 'n61.html', 'n62.html', 'n63.html', 'n64.html', 'n65.html', 'n66.html', 'n67.html', 'n68.html', 'n69.html', 'n70.html', 'n71.html', 'n72.html', 'n73.html', 'n74.html', 'n75.html', 'n76.html'];

let search_input = document.getElementById('search-input');
let search_button = document.getElementById('search-button');
let container = document.getElementById('container');
let o_list = document.getElementById('o-list');
let s_list = document.getElementById('s-list');

function generateList(spanTexts, filenames, list)
{
    for (let i = 0; i < filenames.length; i++)
    {
        let anchor = document.createElement("a");
        anchor.href = "dane/" + filenames[i];
        anchor.textContent = spanTexts[i];
        list.appendChild(anchor);
    }
}

function getDisplayName(filename) 
{
    return filename.replace(/\s[A-Z]+\.html$/, '');
}

function searchSchedules()
{
    if (container.querySelector('div.search_results'))
        container.removeChild(container.querySelector('div.search_results'));

    const searchTerm = search_input.value.toLowerCase();
    const resultsContainer = document.createElement('div');
    resultsContainer.classList.add('search_results');
    resultsContainer.innerHTML = '';

    const filteredSchedules = nspanTexts.filter(schedule => 
        schedule.toLowerCase().trim().slice(3).startsWith(searchTerm)
    );
    
    filteredSchedules.forEach(schedule => 
    {
        const a = document.createElement('a');
        const href = "dane/" + nfilenames[nspanTexts.indexOf(schedule)];
        a.href = href;
        a.textContent = getDisplayName(schedule);
        resultsContainer.appendChild(a);
        a.addEventListener('click', function(event)
        {
            event.preventDefault();
            const parts = a.href.split('/');
            const newHref = parts.slice(-2).join('/');
            window.location = `plan_index.html?schedule=${newHref}`;
        });
    });

    if (filteredSchedules.length === 0)
        resultsContainer.innerHTML = '<h2>Nie znaleziono.</h2>';

    container.appendChild(resultsContainer);
}

document.addEventListener('keydown', function(event) 
{
    if (event.ctrlKey && event.key === 'f') 
    {
        event.preventDefault();
        search_input.focus();
    }
});


generateList(ospanTexts, ofilenames, o_list);
generateList(sspanTexts, sfilenames, s_list);

search_button.addEventListener('click', searchSchedules);
search_input.addEventListener('keyup', function(event) 
{
    if (search_input.value.length > 0)
        searchSchedules();
    else
        container.removeChild(container.querySelector('div.search_results'));
});

o_list.addEventListener('click', function(event)
{
    if (event.target.tagName === 'A') 
    {
        event.preventDefault();
        const parts = event.target.href.split('/');
        const newHref = parts.slice(-2).join('/');
        window.location = `plan_index.html?schedule=${newHref}`;

    }
});
s_list.addEventListener('click', function(event)
{
    if (event.target.tagName === 'A') 
    {
        event.preventDefault();
        const parts = event.target.href.split('/');
        const newHref = parts.slice(-2).join('/');
        window.location = `plan_index.html?schedule=${newHref}`;
    }
});