async function modalDelete(id) {
    let user = await getUserByID(id);
    console.log("user id is " + user.id)
    let deleteForm = document.forms["formDeleteUser"];
    console.log("form is " + deleteForm)
    deleteForm.idDelete.value = user.id;
    deleteForm.usernameDelete.value = user.username;
    deleteForm.emailDelete.value = user.email;
    deleteForm.passwordDeleteUser.value = user.password;


    $('#rolesDeleteUser').empty();
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
                $('#rolesDeleteUser')[0].appendChild(el);
            })
        })
}

async function deleteUser() {
    const editForm = document.forms["formDeleteUser"];

    fetch(`http://localhost:8080/api/` + editForm.idDelete.value, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(() => {
         $('#deleteFormCloseButton').click();
         allUsersTable();
    })
}