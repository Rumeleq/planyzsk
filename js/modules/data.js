async function loadJSON(url) {
    const response = await fetch(url);
    return await response.json();
}

// Instead of using top-level await, create functions that return the data
export async function getOspanTexts() {
    const data = await loadJSON('/planyzsk/pyscraper/JSON/o_map.json');
    return Object.keys(data);
}

export async function getOfilenames() {
    const data = await loadJSON('/planyzsk/pyscraper/JSON/o_map.json');
    return Object.values(data).map(value => `${value}.html`);
}

export async function getSspanTexts() {
    const data = await loadJSON('/planyzsk/pyscraper/JSON/s_map.json');
    return Object.keys(data).map(key => /^\d{2}$/.test(key) ? `s${key}` : key);
}

export async function getSfilenames() {
    const data = await loadJSON('/planyzsk/pyscraper/JSON/s_map.json');
    return Object.values(data).map(value => `${value}.html`);
}

export async function getNspanTexts() {
    const nMap = await loadJSON('/planyzsk/pyscraper/JSON/n_map.json');
    const initialsDict = await loadJSON('/planyzsk/pyscraper/JSON/initials_name_dict.json');
    return Object.keys(nMap).map(key => `${initialsDict[key]} (${key})`);
}

export async function getNfilenames() {
    const data = await loadJSON('/planyzsk/pyscraper/JSON/n_map.json');
    return Object.values(data).map(value => `${value}.html`);
}