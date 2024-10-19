window.onload = function()
{
    document.body.style.visibility = "visible";
}

let title = document.querySelector('title');
let header = document.querySelector('body > span');

if (title.textContent.startsWith("Plan lekcji oddziału"))
{
    header.textContent = header.textContent.slice(0, 2);
    title.textContent = title.textContent.slice(0, -4);
}
else if (title.textContent.startsWith("Plan lekcji sali"))
{
    let regex2 = /^\d{2}$/;
    if (header.textContent.match(regex2))
    {
        header.textContent = 's' + header.textContent;
        let firstNumberIndex = title.textContent.search(/\d/);
        title.textContent = `${title.textContent.slice(0, firstNumberIndex)} s${title.textContent.slice(firstNumberIndex)}`;
    }
}
else
{
    header.textContent = `${header.textContent.slice(0, 2)} ${header.textContent.slice(2)}`;
    title.textContent = `${title.textContent.slice(0, title.textContent.indexOf('.') + 1)} ${title.textContent.slice(title.textContent.indexOf('.') + 1)}`;
}

const wordsToAddSpace = ['Język', 'Pracownia', 'Tworzenie', 'aplikacji', 'Biznes', 'Zajęcia', 'Systemy', 'Wychowanie', 'Programowanie', 'baz', 'programowania', 'Projektowanie', 'Eksploatacja', 'handlowa', 'Działalność', 'usługowa', 'Testowanie', 'dokumentowanie', 'Technika', 'ruchu', 'projektowania', 'danych', 'Historia', 'fizyczne', 'internetowych', 'Informatyka', 'obiektowego','angielski', 'Podstawy', 'hiszpański', 'niemiecki', 'Elektrotechnika', 'Urządzenia', 'instalacje', 'urządzeń', 'montażu', 'Układy', 'elektryczne', 'elektryczna', 'Bezpieczeństwo', 'higiena', 'techniki', 'systemów', 'sieci', 'witryn', 'Edukacja', 'dla', 'podstaw', 'utrzymania', 'Pomiary', 'Sieci', 'podstacje', 'trakcyjne', 'elektroniczne', 'instalacji', 'Maszyny', 'urządzenia', 'testowania', 'dokumentowania', 'Kompetencje', 'Witryny', 'aplikacje', 'automatyki', 'Technologie', 'pomiary', 'DSDI', 'Instalacje', 'Wiedza', 'społeczeństwie', 'Przygotowanie', 'praktyczne', 'zawodu', 'maszynisty', 'Organizacja', 'przewozów', 'kolejowych', 'Odprawa', 'pociągów', 'stacji', 'DSD', 'Infrastruktura', 'komputerowe', 'technologii', 'pomiarów', 'sterowania', 'ruchem', 'Bazy', 'Kolejowe', 'pojazdy', 'taboru', 'Tabor', 'elektrycznych', 'pojazdów', 'eksploatacji', 'środków', 'transportu', 'organizacji', 'pracy'];
const wordsToAddSpaceAfterFirstCharacter = ['zwychowawcą', 'izarządzanie', 'iurządzeń', 'idokumentowanie', 'ielektronika', 'ielektroniczna', 'iinstalacje', 'ihigiena', 'ielektroniczne', 'iutrzymania', 'ipodstacje', 'iurządzenia', 'idokumentowania', 'iaplikacje', 'wautomatyce', 'ipomiary', 'ospołeczeństwie', 'ipomiarów'];
const wordsToAddSpaceAfterSecondCharacter = ['dozawodu', 'nastacji'];

let tdElements = document.querySelectorAll('td span.p');
tdElements.forEach(td => 
{
    wordsToAddSpace.forEach(word => 
    {
        const regex = new RegExp(`(${word})(?!j)(?!$)`, 'g');
        td.textContent = td.textContent.replace(regex, `$1 `);
    });
    wordsToAddSpaceAfterFirstCharacter.forEach(word => 
    {
        const regex = new RegExp(`(${word.charAt(0)})(${word.substring(1)})`, 'g');
        td.textContent = td.textContent.replace(regex, `$1 $2`);
    });
    wordsToAddSpaceAfterSecondCharacter.forEach(word =>
    {
        const regex = new RegExp(`(${word.substring(0, 2)})(${word.substring(2)})`, 'g');
        td.textContent = td.textContent.replace(regex, `$1 $2`);
    });
    td.textContent = td.textContent.trim();
});

let aElements = document.querySelectorAll('td');
aElements.forEach(a =>
{
    const regex = new RegExp(`(,)`, 'g');
    a.innerHTML = a.innerHTML.replace(regex, `$1 `);
});

