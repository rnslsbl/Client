let mouseOverBtn = document.getElementById('mOver');
let mouseOutBtn = document.getElementById('mOut');
let clickBtn = document.getElementById('Click');
let row1 = document.querySelector('.row1');
let row2 = document.querySelector('.row2');
let row3 = document.querySelector('.row3');
// Add event listeners
mouseOverBtn.addEventListener('mouseover', MouseOver);
mouseOutBtn.addEventListener('mouseout', MouseOut);
clickBtn.addEventListener('click', Click);

// Event handler functions
function MouseOver() {
    row1.style.backgroundColor = 'yellow';
}

function MouseOut() {
    row2.style.backgroundColor = 'red';
}

function Click() {
    alert('hi');
    row3.style.backgroundColor = 'blue';
    row3.style.color = 'white';
}

const animals = [
    { name: "nemo", species: "fish", class: { name: "invertebrata" } },
    { name: "gary", species: "mouse", class: { name: "mamalia" } },
    { name: "dory", species: "fish", class: { name: "invertebrata" } },
    { name: "tom", species: "mouse", class: { name: "mamalia" } },
    { name: "aji", species: "wibu", class: { name: "mamalia" } }
]

animals.forEach(animal => {
    if (animal.species != "mouse") {
        animal.class.name = "non-mamalia";
    }
});
console.log(animals);

//cara2
/*const onlyMouse = animals.filter(animals => animals.species != "mouse");
console.log(onlyMouse);*/

//pelajari .map
const ubah = animals.map(x => {
    return {
        name: x.name,
        species: x.species,
        isMouse: x.species == "mouse" ? true : false

    }
})
console.log(ubah)
const onlyMouse = [];

animals.forEach(animal => {
    if (animal.species == "mouse") {
        onlyMouse.push(animal);
    }
});

console.log(onlyMouse);


/*$.ajax({
    url: "https://swapi.dev/api/people/"
}).done((result) => {
    let temp = ""
    let number = 0
    $.each(result.results, (key, val) => {
        number += 1
        temp += "<tr>" +
            "<td>" + number + "</td>" +
            "<td>" + val.name + "</td>" +
            "<td>" + val.height + "</td>" +
            "<td>" + val.mass + "</td>" +
            "<td>" + val.hair_color + "</td>" +
            "<td>" + val.gender + "</td>" +
            "</tr>";
    })*/
/*
$.ajax({
    url: "https://pokeapi.co/api/v2/pokemon"
}).done((result) => {
let temp = ""
let number = 0
$.each(result.results, (key, val) => {
    number += 1
    temp += `<tr> +
        <td>${number}</td>
        <td>${val.name}</td>
        <td><button onclick="detail('${val.url}')" type="button" class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#detail">Detail</button></td>
        </tr>`;
})

    $("#tabelSW tbody").html(temp);
}).fail((error) => {
    console.log(error);
})*/

$(document).ready(function () {
    let table = $("#myTable").DataTable({
        dom: 'Bfrtip',
        buttons: [
            'copy', 'csv', 'excel', 'pdf', 'print'
        ],
        ajax: {
            url: "https://localhost:7023/api/Employee",
            dataSrc: "data",
            dataType: "JSON"
        },
        columns: [
            {
                data: null,
                render: function (data, type, row, meta) {
                    return meta.row + meta.settings._iDisplayStart + 1;
                }
            },
            { data: "name" },
            {
                data: "url",
                render: function (data, type, row) {
                    return `<button type="button" class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#pokeDetail" onclick="detail('${data}')">Detail</button>`;
                }
            },
            {
                render: function (data, type, row) {
                    return `<button type="button" class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#employeeModal" onclick="openAddEmpModal()">Add</button>`;               
            }
            },
            {
                render: function (data, type, row) {
                    return `<button type="button" class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#exerciseModal" onclick="openExercise()">Add</button>`;
                }
            }
        ]
    });
});

function openAddEmpModal() {
    $("#employeeModal").modal("show");
}

function openExercise() {
    $("#latihan").modal("show");
}

function removeBar() {
    $(".container-progress").empty();
}
function detail(stringUrl) {
    $.ajax({
        url: stringUrl,
    }).done(res => {
        console.log(res);
        $(".nama").html(res.name)
        $("#imgPoke").attr("src", res.sprites.other['official-artwork'].front_default)
        $("#imgPoke2").attr("src", res.sprites.other['official-artwork'].front_shiny)

        $("#height").html(res.height)
        $("#weight").html(res.weight)
        $("#experience").html(res.base_experience)


        $.ajax({
            url: res.species.url
        }).done((species) => {
            const description = species.flavor_text_entries.find(entry => entry.language.name === "en");
            $("#description").text(description.flavor_text);
        }).fail((error) => {
            console.log(error);
        });

        let abilitiesList = '<ul>';
        res.abilities.forEach(ability => {
            abilitiesList += `<li>${ability.ability.name}</li>`;
        });
        abilitiesList += '</ul>';
        $("#ability").html(abilitiesList);


        let temp = "";
        $.each(res.types, (key, val) => {
            const type = val.type.name;
             const badgeSize = "badge-width-1500px";
            temp += `<span class="badge ${type} ${badgeSize}">${type}</span> `;
        });
        $("#badgee").html(temp);

        const baseStats = res.stats;
    console.log(baseStats);

    const hp = baseStats[0].base_stat;
    const attack = baseStats[1].base_stat;
    const defense = baseStats[2].base_stat;
    const spattack = baseStats[3].base_stat;
    const spdefense = baseStats[4].base_stat;
    const speed = baseStats[5].base_stat;

    console.log("HP: ", hp);
    console.log("Attack: ", attack);
    console.log("Defense: ", defense);
    console.log("Special Attack: ", spattack);
    console.log("Special Defense: ", spdefense);
    console.log("Speed: ", speed);

    const progressBar = [
        { name: "Hp", stat: baseStats[0].base_stat },
        { name: "Attack", stat: baseStats[1].base_stat },
        { name: "Defense", stat: baseStats[2].base_stat },
        { name: "Special Attack", stat: baseStats[3].base_stat },
        { name: "Special Defense", stat: baseStats[4].base_stat },
        { name: "Speed", stat: baseStats[5].base_stat },

    ];
        $(".container-progress").empty();

    $.each(progressBar, function (index, progressBar) {
        var progress = $("<div>").addClass("progress mx-auto mb-3");
        var progressBarInner = $("<div>")
            .addClass("progress-bar")
            .attr({
                role: "progressbar",
                style: "width: " + progressBar.stat + "%; background-color: " + getProgressBarColor(progressBar.stat),
                "aria-valuenow": progressBar.stat,
                "aria-valuemin": "0",
                "aria-valuemax": "200"
            })
            .text(progressBar.name + ": " + progressBar.stat);
        progress.append(progressBarInner);
        $(".container-progress").append(progress);

    });
    })
       
    function getProgressBarColor(stat) {
        if (stat >= 70) {
            return "green"; // High stat, green color
        } else if (stat >= 40) {
            return "orange"; // Medium stat, orange color
        } else {
            return "red"; // Low stat, red color
        }
    }

   
}

(function () {
    'use strict'

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                }

                form.classList.add('was-validated')
            }, false)
        })
})()

/*
$.ajax({
    url: "https://pokeapi.co/api/v2/pokemon",
    dataType: "json"
}).done((pokemon) => {
    // Process the fetched data and create the radar chart
    createRadarChart(pokemon);
}).fail((error) => {
    console.log(error);
});

// Function to create the radar chart
function createRadarChart(pokemon) {
    const baseStats = [];
    $.each(pokemon.stats, function (index, stat) {
        baseStats.push(stats.base_stat);
    });
    const data = [
        pokemon.stats[5].base_stat, // HP
        pokemon.stats[4].base_stat, // Attack
        pokemon.stats[3].base_stat, // Defense
        pokemon.stats[2].base_stat, // Special Attack
        pokemon.stats[1].base_stat, // Special Defense
        pokemon.stats[0].base_stat  // Speed
    ];

    // Create the radar chart
    const ctx = document.getElementById("radarChart").getContext("2d");
    new Chart(ctx, {
        type: "radar",
        data: {
            labels: ["HP", "Attack", "Defense", "Special Attack", "Special Defense", "Speed"],
            datasets: [{
                label: pokemon.name,
                data: data,
                backgroundColor: "rgba(0, 123, 255, 0.4)",
                borderColor: "rgba(0, 123, 255, 1)",
                pointBackgroundColor: "rgba(0, 123, 255, 1)",
                pointBorderColor: "#fff",
                pointHoverBackgroundColor: "#fff",
                pointHoverBorderColor: "rgba(0, 123, 255, 1)"
            }]
        },
        options: {
            scale: {
                ticks: {
                    beginAtZero: true,
                    max: 150 // Adjust the maximum value as needed
                }
            }
        }
    });
}*/

/*
const onlyMouse = [];
for (let i = 0; i < animals.length; i++) {
    if (animals[i].species != "mouse") {
        animals[i].class.name = "bukan mamalia";
    } else {
        onlyMouse.push(animals[i]);
    }
};
console.log(animals);
console.log(onlyMouse); */