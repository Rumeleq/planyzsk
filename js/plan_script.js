window.onload = function()
{
    document.body.style.visibility = "visible";
}

let title = document.querySelector('title');
let header = document.querySelector('body > span');

if (title.textContent.startsWith("Plan lekcji oddziału"))
{
    header.textContent = header.textContent.slice(0, 2);
}
else if (title.textContent.startsWith("Plan lekcji sali"))
{
    let regex2 = /^\d{2}$/;
    if (header.textContent.match(regex2))
        header.textContent = 's' + header.textContent;
}
else
{
    header.textContent = `${header.textContent.slice(0, 2)} ${header.textContent.slice(2)}`;
}

const wordsToAddSpace = ['Język', 'Pracownia', 'Tworzenie', 'aplikacji', 'Biznes', 'Zajęcia', 'Systemy', 'Wychowanie', 'Programowanie', 'baz', 'programowania', 'Projektowanie', 'Eksploatacja', 'handlowa', 'Działalność', 'usługowa', 'Testowanie', 'dokumentowanie', 'Technika', 'ruchu', 'projektowania', 'danych', 'Historia', 'fizyczne', 'internetowych', 'Informatyka', 'obiektowego','angielski', 'Podstawy', 'hiszpański', 'niemiecki', 'Elektrotechnika', 'Urządzenia', 'instalacje', 'urządzeń', 'montażu', 'Układy', 'elektryczne', 'elektryczna'];
const wordsToAddSpaceAfterFirstCharacter = ['zwychowawcą', 'izarządzanie', 'iurządzeń', 'idokumentowanie', 'ielektronika', 'ielektroniczna', 'iinstalacje']

let tdElements = document.querySelectorAll('td span.p');
tdElements.forEach(td => 
{
    wordsToAddSpace.forEach(word => {
        const regex = new RegExp(`(${word})(?=\\S)`, 'g');
        td.textContent = td.textContent.replace(regex, `$1 `);
    });
    wordsToAddSpaceAfterFirstCharacter.forEach(word => {
        const regex = new RegExp(`(${word.charAt(0)})((${word.substring(1)}))`, 'g');
        td.textContent = td.textContent.replace(regex, `$1 $2`);
    });
    td.textContent = td.textContent.trim();
});
