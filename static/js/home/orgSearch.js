const mockData = ["Organization A", "Organization B", "Organization C", "Organization D", "Organization E", "Organization F", "Organization G", "Organization H", "Organization I", "Organization J"];

const searchInput = document.getElementById("search-input");
const suggestionsList = document.getElementById("results-dropdown");


searchInput.addEventListener("input", function () {

    const value = e.target.value.toLowerCase();
    dropdown.innerHTML = "";

    if(!value)  {
        dropdown.classList.add('d-none');  
        return;
    }

    const filteredData = mockData.filter(item => item.toLowerCase().includes(value));

    if (filteredData.length > 0) {
        dropdown.classList.remove('d-none');
        filteredData.forEach(item => {
            const li = document.createElement("li");
            li.className = 'list-group-item list-group-item-action c-pointer';
            li.style.cursor='pointer';
            li.textContent = item;
            li.addEventListener("click", function () {
                searchInput.value = item;
                dropdown.classList.add('d-none');
            });
            dropdown.appendChild(li);
        });
    } else {
        dropdown.classList.add('d-none');
    }

});

document.addEventListener("click", function (e) {
    if (e.target.closest('.position-relative')) {
        dropdown.classList.add('d-none');
    }
});


