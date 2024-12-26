async function loadJSON(url)
{
    const response = await fetch(url);
    return await response.json();
}

export let ospanTexts = Object.keys(await loadJSON('/planyzsk/pyscraper/JSON/o_map.json'));
export let ofilenames = Object.values(await loadJSON('/planyzsk/pyscraper/JSON/o_map.json')).map(value => `${value}.html`);
export let sspanTexts = Object.keys(await loadJSON('/planyzsk/pyscraper/JSON/s_map.json')).map(key => /^\d{2}$/.test(key) ? `s${key}` : key);
export let sfilenames = Object.values(await loadJSON('/planyzsk/pyscraper/JSON/s_map.json')).map(value => `${value}.html`);
export async function getNspanTexts()
{
    const nMap = await loadJSON('/planyzsk/pyscraper/JSON/n_map.json');
    const initialsDict = await loadJSON('/planyzsk/pyscraper/JSON/initials_name_dict.json');

    return Object.keys(nMap).map(key => `${initialsDict[key]} (${key})`);
}
export let nfilenames = Object.values(await loadJSON('/planyzsk/pyscraper/JSON/n_map.json')).map(value => `${value}.html`);