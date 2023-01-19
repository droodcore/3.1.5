async function modalEdit(id) {
    let user = await getUserByID(id);
    let form = document.forms["formEditUser"];
    form.id.value = user.id;
    form.username.value = user.username;
    form.email.value = user.email;
    form.password.value = null


    $('#rolesEditUser').empty();
    await fetch("http://localhost:8080/api/roles")
        .then(res => res.json())
        .then(roles => {
            roles.forEach(role => {
                let selectedRole = false;
                for (let i = 0; i < user.roles.length; i++) {
                    if (user.roles[i].name === role.name) {
                        selectedRole = true;
                        break;
                    }
                }
                let el = document.createElement("option");
                el.text = role.name.substring(5);
                el.value = role.id;
                if (selectedRole) el.selected = true;
                $('#rolesEditUser')[0].appendChild(el);
            })
        })
}

async function getUserByID(id) {
    let url = `http://localhost:8080/api/${id}`;
    let response = await fetch(url);
    return await response.json()
}

async function editUser() {
    const editForm = document.forms["formEditUser"];

    let editUserRoles = [];
    if (editForm.roles !== undefined) {
        for (let i = 0; i < editForm.roles.options.length; i++) {
            if (editForm.roles.options[i].selected)
                editUserRoles.push({
                    id: editForm.roles.options[i].value,
                    role: "ROLE_" + editForm.roles.options[i].text
                })
        }
    }

    fetch(`http://localhost:8080/api/${editForm.id.value}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: editForm.id.value,
            username: editForm.username.value,
            password: editForm.password.value,
            email: editForm.email.value,
            roles: editUserRoles
        })
    }).then(() => {
        $('#editFormCloseButton').click();
        allUsersTable();
    })
}