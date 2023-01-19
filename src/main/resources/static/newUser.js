async function newRolesFulfill() {
    $('#newRoles').empty();
    await fetch("http://localhost:8080/api/roles")
        .then(res => res.json())
        .then(roles => {
            roles.forEach(role => {
                let el = document.createElement("option");
                el.text = role.name.substring(5);
                el.value = role.id;
                $('#newRoles')[0].appendChild(el);
            })
        })
}

async function newUser() {
    const newForm = document.forms["newUserForm"];

    let newUserRoles = [];
    if (newForm.newRoles !== undefined) {
        for (let i = 0; i < newForm.newRoles.options.length; i++) {
            if (newForm.newRoles.options[i].selected) newUserRoles.push({
                id: newForm.newRoles.options[i].value,
                role: "ROLE_" + newForm.newRoles.options[i].text
            })
        }
    }
    fetch(`http://localhost:8080/api/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: newForm.newUsername.value,
            email: newForm.newEmail.value,
            password: newForm.newPassword.value,
            roles: newUserRoles
        })

    }).then(() => {
        $('#allUsers').click();
        allUsersTable();
    })
}