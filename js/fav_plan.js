function appendToStorage() {
    let fav_map = new Map(JSON.parse(localStorage.getItem("fav_plans") || "[]"));
    let parentUrl = window.location !== window.parent.location ? document.referrer : document.URL;
    if(!fav_map.has(parentUrl)) {
        fav_map.set(parentUrl, plan_name.innerText);
    } else {
        fav_map.delete(parentUrl);
    }
    localStorage.setItem("fav_plans", JSON.stringify(Array.from(fav_map.entries())));
}