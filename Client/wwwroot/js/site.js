/*let mouseOverBtn = document.getElementById('mOver');
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
*//*const onlyMouse = animals.filter(animals => animals.species != "mouse");
console.log(onlyMouse);*//*

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
*/
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
    $('#Employee').DataTable({
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
            { data: "guid" },
            { data: "nik" },
            { data: "firstName" },
            { data: "lastName" },
            { data: "birthDate" },
            {
                data: "gender",
                render: function (data) {
                    return data === 0 ? "Female" : "Male";
                }
            },
            { data: "hiringDate" },
            { data: "email" },
            { data: "phoneNumber" },
            {
                render: function (data, type, row, meta) {
                    return `
                    <button type="button" class="btn btn-outline-dark" id="updateBtn-${row.guid}" data-bs-toggle="modal" data-bs-target="#updateEmployee" onclick="openUpdateEmpModal('${row.guid}','${row.nik}', '${row.firstName}', '${row.lastName}', '${row.birthDate}', ${row.gender}, '${row.hiringDate}', '${row.email}', '${row.phoneNumber}')">Update</button> 
                    <button type="button" class="btn btn-outline-dark" onclick="deleteEmployee('${row.guid}')">Delete</button>`
                        ;
                }
            }
        ]
    });
});


// Function to open the update modal and pre-fill the form with employee data
    function openUpdateEmpModal(guid, nik, firstName, lastName, birthDate, gender, hiringDate, email, phoneNumber) {
        // Set the values in the modal form
        document.getElementById('update-employee-nik').value = nik;
        document.getElementById('update-employee-fname').value = firstName;
        document.getElementById('update-employee-lname').value = lastName;
        document.getElementById('update-employee-bdate').value = birthDate;
        document.getElementById('update-employee-hdate').value = hiringDate;
        document.getElementById('update-employee-email').value = email;
        document.getElementById('update-employee-pnumber').value = phoneNumber;

        console.log(gender)
        // Set the gender radio button
        if (gender === 0) {
            document.getElementById('update-employee-gender-f').checked = true;
        } else {
            document.getElementById('update-employee-gender-m').checked = true;
        }

        // Change the modal title and button text
        document.getElementById('updateEmployeeModalTitle').innerText = 'Update Employee';
        $('#updateEmployee').modal('show');

        document.getElementById('updateEmployeeModalBody').addEventListener('submit', function (event) {
            event.preventDefault(); // Prevent form submission
            updateEmployee(guid);
        });
    }

    function updateEmployee(guid) {
        console.log('this guid: ', guid)
        // Retrieve the updated values from the input fields
        var eNik = document.getElementById('update-employee-nik').value;
        var eFirst = document.getElementById('update-employee-fname').value;
        var eLast = document.getElementById('update-employee-lname').value;
        var eBDate = document.getElementById('update-employee-bdate').value;
        var eGender = document.querySelector('input[name="update-employee-gender"]:checked').id.includes('f') ? 0 : 1;
        var eHDate = document.getElementById('update-employee-hdate').value;
        var eEmail = document.getElementById('update-employee-email').value;
        var ePhone = document.getElementById('update-employee-pnumber').value;

        $.ajax({
            url: `https://localhost:7023/api/Employee`,
            method: "PUT",
            data: JSON.stringify({
                '__metadata': {
                    'type': 'SP.Data.EmployeeListItem'
                },
                'guid': guid,
                'nik': eNik,
                'firstName': eFirst,
                'lastName': eLast,
                'birthDate': eBDate,
                'gender': eGender,
                'hiringDate': eHDate,
                'email': eEmail,
                'phoneNumber': ePhone
            }),
            headers: {
                "accept": "application/json;odata=verbose",
                "content-type": "application/json;odata=verbose",
                "X-HTTP-Method": "MERGE",
                "IF-MATCH": "*"
            },
            success: function (data) {
                console.log(data);
                window.location.reload()
                var updatedRowData = [
                    eNik,
                    eFirst,
                    eLast,
                    eBDate,
                    eGender === 0 ? 'Female' : 'Male',
                    eHDate,
                    eEmail,
                    ePhone
                ];
                dataTable.rows().every(function (rowIdx, tableLoop, rowLoop) {
                    var rowData = this.data();
                    if (rowData[0] === guid) {
                        this.data(updatedRowData);
                        this.invalidate();
                        return false;
                    }
                });
                $('#updateEmployee').modal('hide');
            },
            error: function (error) {
                console.log("Error: " + JSON.stringify(error));
            }
        });
    }


function AddEmployee() {
    var eNik = $('#employee-nik').val();
    var eFirst = $('#employee-fname').val();
    var eLast = $('#employee-lname').val();
    var eBDate = $('#employee-bdate').val();
    var eGender = $('#employee-gender').val();
    var eHDate = $('#employee-hdate').val();
    var eEmail = $('#employee-email').val();
    var ePhone = $('#employee-pnumber').val();

    $.ajax({
        async: true, // Async by default is set to “true” load the script asynchronously  
        // URL to post data into sharepoint list  
        url: "https://localhost:7023/api/Employee",
        method: "POST", //Specifies the operation to create the list item  
        data: JSON.stringify({
            '__metadata': {
                'type': 'SP.Data.EmployeeListItem' // it defines the ListEnitityTypeName  
            },
            //Pass the parameters
            'nik': eNik,
            'firstName': eFirst,
            'lastName': eLast,
            'birthDate': eBDate,
            'gender': eGender,
            'hiringDate': eHDate,
            'email': eEmail,
            'phoneNumber': ePhone
        }),
        headers: {
            "accept": "application/json;odata=verbose", //It defines the Data format   
            "content-type": "application/json;odata=verbose", //It defines the content type as JSON  
/*            "X-RequestDigest": $("#__REQUESTDIGEST").val() //It gets the digest value   
*/        },
        success: function (data) {
            console.log(data);
        },
        error: function (error) {
            console.log(JSON.stringify(error));

        }
    })
}

function deleteEmployee(guid) {
    console.log(guid)
    if (confirm("Are you sure you want to delete this employee?")) {
        $.ajax({
            url: `https://localhost:7023/api/Employee/${guid}`,
            type: 'DELETE',
            success: function (result) {
                console.log(result);
                window.location.reload();
            }, error: function (xhr, status, error) {
                console.error('error occured: ', error)
            }
        });
    }
}


function openAddEmpModal() {
    $("#employeeModal").modal("show");
}

/*function openExercise() {
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
*/



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