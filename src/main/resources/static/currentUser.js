$(async function() {
    await currentUserHeader();
});
async function currentUserHeader() {
    fetch("http://localhost:8080/api/current")
        .then(res => res.json())
        .then(data => {
            const headerUsername = document.getElementById('headerUsername')
            const headerRoles = document.getElementById('headerRoles')
            // const userTableBody = document.getElementById('userTableBody')
            const userDataID = document.getElementById('userDataId')
            const userDataUsername = document.getElementById('userDataUsername')
            const userDataEmail = document.getElementById('userDataEmail')
            const userDataRoles = document.getElementById('userDataRoles')

            let roles = data.roles.map(roles => " " + roles.name.substring(5));

            headerUsername.textContent = data.username
            headerRoles.textContent = roles
            userDataID.textContent = data.id
            userDataUsername.textContent = data.username
            userDataEmail.textContent = data.email
            userDataRoles.textContent = roles


            // userTableBody.textContent =
            // <tr>
            //     <td>${data.id}</td>
            //     <td>${data.username}</td>
            //     <td>${data.email}</td>
            //     <td>${roles}</td> </tr>;

        })
}