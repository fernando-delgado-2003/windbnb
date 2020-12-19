const d = document;

const containerFilters = d.querySelector(".container-filters");
const cityCountry1 = d.querySelector(".city-country-1");
const cityCountry2 = d.querySelector(".city-country-2");
const guest1 = d.querySelector(".guest-1");
const guest2 = d.querySelector(".guest-2");
/**constantes para las section  */
const locationSection = d.querySelector(".location section");
const guestSection = d.querySelector(".guest section");
/**constantes para las section  */
document.addEventListener("DOMContentLoaded", () => {
    fecthData()

    const eventsClick = d.querySelectorAll(".click");
    eventsClick.forEach(click => {
        click.addEventListener("click", (e) => {
            if (e.currentTarget.classList.contains("city-country-1")) {
                filterCityCountry1()
            } else if (e.currentTarget.classList.contains("guest-1")) {

                filterGuest1()

            } else if (e.currentTarget.classList.contains("city-country-2")) {
                filterCityCountry2()
            } else if (e.currentTarget.classList.contains("guest-2")) {
                filterGuest2()
            }
        })
    })

})



const fecthData = async () => {
    try {
        const res = await fetch('stays.json');
        const data = await res.json();
        createCards(data);
        plusAndMinus()
        const search = d.querySelector("#search");
        search.addEventListener("click", () => {
            search1(data)

        })
    } catch (error) {
        console.log(error);
    }
}



function createCards(data) {
    const stays = d.querySelector("#stays");

    for (let i = 0; i < data.length; i++) {
        const card = d.createElement("div");
        const divImgStay = d.createElement("div");
        const divInfoStay = d.createElement("div");
        const superHost = d.createElement("p");
        const description = d.createElement("p");
        const bedNumber = d.createElement("span");
        const rating = d.createElement("span");
        const ratingStar = d.createElement("i");
        const ratingNumber = d.createElement("p");
        const divTitle = d.createElement("div");
        const titleH2 = d.createElement("h2");

        card.classList.add("card", `${data[i].city}-${data[i].country}`, `${data[i].maxGuests}`, "block");
        divImgStay.classList.add("img-stay");
        divInfoStay.classList.add("info-stay");
        superHost.classList.add("super-host");
        description.classList.add("description");
        bedNumber.classList.add("bed");
        rating.classList.add("rating");
        ratingStar.classList.add("fas", "fa-star");
        ratingNumber.classList.add("rating-number");
        divTitle.classList.add("title");




        divImgStay.style.backgroundImage = `url(${data[i].photo})`;
        if (data[i].superHost == true) {
            divInfoStay.appendChild(superHost);
            superHost.textContent = "Super host";
        }
        description.textContent = `${data[i].type} ${data[i].beds} beds`;
        ratingNumber.textContent = `${data[i].rating}`;
        titleH2.textContent = `${data[i].title}`;

        card.appendChild(divImgStay);
        card.appendChild(divInfoStay);
        description.appendChild(bedNumber)
        divInfoStay.appendChild(description);
        divInfoStay.appendChild(rating);
        rating.appendChild(ratingStar);
        rating.appendChild(ratingNumber);
        card.appendChild(divTitle);
        divTitle.appendChild(titleH2);
        stays.appendChild(card);

    }
}
/**
 * 
 * filtro
 * 
 */
function filterCityCountry1() {
    containerFilters.classList.add("active");
    cityCountry2.classList.add("active")

    /**guardar en una funcion */
    d.querySelectorAll(".filter-country-city").forEach(cityCountry => {
        cityCountry.addEventListener("click", (e) => {
            d.querySelector(".value-filter-city-country").innerHTML = e.currentTarget.innerHTML;

        })
    })

    if (!guestSection.classList.contains("active")) {
        displayNoneSectionGuest()
    }

}
function filterCityCountry2() {
    cityCountry2.classList.add("active")
    /**guardar en una funcion */
    d.querySelectorAll(".filter-country-city").forEach(cityCountry => {
        cityCountry.addEventListener("click", (e) => {
            d.querySelector(".value-filter-city-country").innerHTML = e.currentTarget.innerHTML;

        })
    })
    displayBlockSectionCityCountry()
    if (!guestSection.classList.contains("active")) {
        displayNoneSectionGuest()
    }
    //el if remoeve el border del guest2
    if (guest2.classList.contains("active")) {
        guest2.classList.remove("active")
    }

}

function filterGuest1() {
    containerFilters.classList.add("active");
    guest2.classList.add("active")

    if (!locationSection.classList.contains("active")) {
        displayNoneSectionCityCountry()
    }


}
function filterGuest2() {

    guest2.classList.add("active");
    if (!locationSection.classList.contains("active")) {
        displayNoneSectionCityCountry()
    }
    displayBlockSectionGuest()
    //el if remoeve el border del cityCountry2
    if (cityCountry2.classList.contains("active")) {
        cityCountry2.classList.remove("active")
    }


}



function displayNoneSectionGuest() {
    guestSection.classList.add("active")
}
function displayNoneSectionCityCountry() {
    locationSection.classList.add("active");
}
function displayBlockSectionGuest() {

    guestSection.classList.remove("active")
}
function displayBlockSectionCityCountry() {

    locationSection.classList.remove("active");
}

/**
 * 
 * contador de adultos y niños
 * 
 */
function plusAndMinus() {
    const adultsPlus = d.querySelector("#adults-plus");
    const adultsMinus = d.querySelector("#adults-minus");
    const adultsResult = d.querySelector("#adults-result");
    const childrenPlus = d.querySelector("#children-plus");
    const childrenMinus = d.querySelector("#children-minus");
    const childrenResult = d.querySelector("#children-result");

    adultsPlus.addEventListener("click", (e) => {
        let contador = parseInt(adultsResult.textContent);
        contador++
        adultsResult.textContent = contador;
        sum(adultsResult, childrenResult)
    })

    adultsMinus.addEventListener("click", (e) => {
        let contador = parseInt(adultsResult.textContent);
        let numberOne = 1;
        let result = contador - numberOne;
        if (result < 0) {
            adultsResult.textContent = "0";
        } else {
            adultsResult.textContent = result;

        }
        sum(adultsResult, childrenResult)
    })

    childrenPlus.addEventListener("click", (e) => {
        let contador = parseInt(childrenResult.textContent);
        contador++
        childrenResult.textContent = contador;
        sum(adultsResult, childrenResult)
    })

    childrenMinus.addEventListener("click", (e) => {
        let contador = parseInt(childrenResult.textContent);
        let numberOne = 1;
        let result = contador - numberOne;
        if (result < 0) {
            childrenResult.textContent = "0";
        } else {
            childrenResult.textContent = result;
        }
        sum(adultsResult, childrenResult)
    })

}
function sum(adultsResult, childrenResult) {
    const sumGuests = d.querySelector("#filter-guest");

    let adultsGuest = parseInt(adultsResult.textContent);
    let childrenGuest = parseInt(childrenResult.textContent);
    let result = adultsGuest + childrenGuest;
    sumGuests.textContent = `${result} guests`;

}


function search1() {
    const valueLocationSearch = d.querySelector("#value-filter-country-city");
    const valueGuestSearch = d.querySelector("#filter-guest");
    const cards = d.querySelectorAll(".card");

    let valueGuestSearchSlice = parseInt(valueGuestSearch.textContent.replace(/\D/g, ""));

    displayNoneCards(cards, valueLocationSearch, valueGuestSearchSlice)
}

function displayNoneCards(cards, valueLocationSearch, valueGuestSearchSlice) {
    const stays = d.querySelector("#stays");
    const noStays = d.querySelector(".no-stays");
    cards.forEach(card => {
        /**console.log(parseInt(card.className.replace(/\D/g, "")))*/
        const errorLocation = d.querySelector(".city-country-2 .error");
        let valueLocationReplace = valueLocationSearch.textContent.replace(/\b, \b/g, "-");
        if (valueLocationSearch.textContent == "Add Location" || valueLocationSearch.textContent == "Añade una ubicación") {
            errorLocation.classList.remove("active")
        } else if (!card.classList.contains(valueLocationReplace.replace("Finlandia", "Finland")) || parseInt(valueGuestSearchSlice) > parseInt(card.className.replace(/\D/g, ""))) {
            card.style.display = "none";
            card.classList.remove("block")
            if (stays.classList.contains("active") && noStays.classList.contains("active")) {
                stays.classList.remove("active");
                noStays.classList.remove("active");
            }
            errorLocation.classList.add("active")
            resetFilterActive();
        } else if (card.classList.contains(`${valueLocationSearch.textContent.replace(/\b, \b/g, "-")}`) || parseInt(card.className.replace(/\D/g, "")) || parseInt(card.className.replace(/\D/g, "")) <= parseInt(valueGuestSearchSlice)) {
            card.style.display = "block";
            card.classList.add("block")
            if (stays.classList.contains("active") && noStays.classList.contains("active")) {
                stays.classList.remove("active");
                noStays.classList.remove("active");
            }
            errorLocation.classList.add("active")
            resetFilterActive();
        }
    })
    cityCountry1.querySelector("p").textContent = cityCountry2.querySelector(".value-filter-city-country").textContent;
    guest1.querySelector("p").textContent = guest2.querySelector(".filter-guest").textContent;
    document.querySelector("#number-stays").textContent = `${d.querySelectorAll(".block").length} stays`;
    if (d.querySelectorAll(".block").length == 0) {
        stays.classList.add("active");
        noStays.classList.add("active");
    }
}
function resetFilterActive() {
    containerFilters.classList.remove("active");
    guest2.classList.remove("active");
    cityCountry2.classList.remove("active");
    locationSection.classList.remove("active");
    guestSection.classList.remove("active");
}