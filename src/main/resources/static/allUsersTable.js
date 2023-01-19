// <tr th:each="user : ${users}">
//     <td>
//         <a th:text="${user.getUsername()}"
//            th:href="@{/admin/{id}(id=${user.getId()})}"></a>
//     </td>
//     <td th:text="${user.getId()}"></td>
//     <td th:text="${user.getEmail()}"></td>
//     <td th:text="${user.rolesTrim()}"></td>
//     <td>
//         <div className="d-grid">
//             <button type="button" className="btn btn-info text-light"
//                     data-bs-toggle="modal"
//                     data-bs-target="#modalEdit"
//                     th:data-bs-target="${'#modalEdit'+user.getId()}">Edit
//             </button>
//         </div>
//     </td>
//     <td>
//         <div className="d-grid">
//             <button type="button" className="btn btn-danger text-light"
//                     data-bs-toggle="modal"
//                     data-bs-target="#modalDelete"
//                     th:data-bs-target="${'#modalDelete'+user.getId()}">Delete
//             </button>
//         </div>
//     </td>
// </tr>

$(async function() {
    await allUsersTable();
});

async function allUsersTable() {
    $('#tbodyAllUsersTable').empty()
    fetch("http://localhost:8080/api/")
        .then(res => res.json())
        .then(data => {
            data.forEach(user => {
                let roles = user.roles.map(roles => " " + roles.name.substring(5));
                $("#tbodyAllUsersTable").append(`$(
                        <tr>
                            <td>${user.id}</td>
                            <td>${user.username}</td>                       
                            <td>${user.email}</td>
                            <td>${roles}</td>                                               
                            <td>
                                <button type="button" class="btn btn-info" data-toggle="modal" id="modalEditButton"
                                onclick="modalEdit(${user.id})" data-id="${user.id}" data-target="#modalEdit">Edit</button>
                            </td>
                            <td>
                                <button type="button" class="btn btn-danger" data-toggle="modal" id="buttonDelete"
                                onclick="modalDelete(${user.id})" data-id="${user.id}" data-target="#modalDelete">Delete</button>
                            </td>
                        </tr>)`);
            })
        })
}