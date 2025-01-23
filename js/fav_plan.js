function appendToStorage() {
    let fav_list = JSON.parse(localStorage.getItem("fav_plans"))
    console.log(window.location.href)
    if (fav_list === null) {
        fav_list = []
    }
    if(fav_list.includes(window.location.href)) fav_list.splice(fav_list.indexOf(window.location.href), 2)
    fav_list.push([window.location.href, plan_name.innerText])
    localStorage.setItem("fav_plans", JSON.stringify(fav_list))
}