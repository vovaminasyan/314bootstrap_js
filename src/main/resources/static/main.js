/**
 *
 */

"use strict";

const tbody = document.querySelector("#tbod");
const tabus = document.querySelector("#tablusers");
let str = "";
let dr;
$(document).ready( async function () {
        let users = await fetch("http://localhost:8080/allUser").then(res => res.json());
        const template = document.querySelector('#product');
        users.forEach((u) => {
            let rol = "";
            u.roles.forEach((u)=> {
                rol += u.noPrefix + "  \n";
            });
            str +=` <tr id="dele${u.id}"><td>${u.id}</td><td>${u.username}</td><td>${u.password}</td>
                    <td>${u.email}</td><td>${rol}</td>
                    <td><button class="btn btn-info editbtn" >edit</button></td>
                    <td><button class="btn btn-danger delbtn"  >delete</button></td></tr>`;
        })
    tbody.innerHTML = str;
})

$(document).ready( async function () {
    let rollist = await fetch("http://localhost:8080/rollist").then(r => r.json());
    let rol = "";
    rollist.forEach((r) => rol += `<option value="${r.role}">${r.noPrefix}</option>`);
    let sel = `<select name="sele" onchange="console.log($('#select').val())" id="select"  multiple class="form-control sel" size="3">
                                                    <option value="">no role</option>
                                                    ${rol}
                                                    </select>`;
    document.getElementById('selector').innerHTML = sel;
})

//функция активизирующая имеющиеся роли при изменении
//$(document).ready( async function () {
async function rol(userRol) {
    console.log(userRol);
    let rollist = await fetch("http://localhost:8080/rollist").then(r => r.json());
    let rol = "";
    let bul;
    for ( let n = 0; n < rollist.length; n++) {
        for (let i = 0; i < userRol.length; i++) {
            if (rollist[n].noPrefix === userRol[i]) {
            rol += `<option value="${rollist[n].role}" selected>${rollist[n].noPrefix}</option>`;
            bul = true;
            break;
            }
        }
        if (bul) {
            bul = false;
            continue;
        }
        rol += `<option value="${rollist[n].role}">${rollist[n].noPrefix}</option>`;
    }
    let sel = `<select name="sele" onchange="console.log($('#selectEdit').val())" id="selectEdit"  multiple class="form-control sel" size="3">
                                                    <option value="">no role</option>
                                                    ${rol}
                                                    </select>`;
    document.getElementById('selectorEdit').innerHTML = sel;
}

$(document).ready(async function() {
    let princ = await fetch("http://localhost:8080/restPrincipal").then(r=>r.json());
    for(let i = 0; i < princ.roles.length; i++) {
        console.log(princ.roles[i].role);
        if(princ.roles[i].role === 'ROLE_ADMIN') {
            console.log('содержит admin')
            return;
        }}
    $('#usertabl').hide();
    visualTablePrincipal();
})

async function visualTablePrincipal() {
    let princ = await fetch("http://localhost:8080/restPrincipal").then(r=>r.json());
    $('#tabl_div').hide();
    //$('#usertabl').hide();
    let rol = "";
    princ.roles.forEach((u)=> {
        rol += u.noPrefix + "  \n";
    });
    let  strPr = `<tr><td>${princ.id}</td><td>${princ.username}</td>
                     <td>${princ.password}</td><td>${princ.email}</td><td>${rol}</td></tr>`;
    let tab = `<h2>User information-page</h2> 
        <div class="tab-pane fade show active border" id="user_panel" role="tabpanel" aria-labelledby="home-tab">
            <div class="pl-3 pt-1 d-flex border-bottom">
                <h4>About user</h4>
            </div>
            <table class="table table-striped table-bordered">
                <thead>
                    <th>id</th>
                    <th>user name</th>
                    <th>password</th>
                    <th>email</th>
                    <th>roles</th>
                </thead>         
                <tbody id="tbodyPrincip">${strPr}</tbody>
            </table>
            </div>
        </div>`
    document.getElementById('us_tab').innerHTML = tab;
}

//показать принципала
$('.action').on('click', async function () {
   visualTablePrincipal();
});

$(document).ready( async function () {
    let princ = await fetch("http://localhost:8080/restPrincipal").then(r => r.json());
    let rol = "";
    princ.roles.forEach((r)=>{rol+= r.noPrefix + "  "});
    document.getElementById('name_navbar').innerHTML = `<b>${princ.email}</b>` + ' with roles: ' + `<b>${rol}</b>`;
})

const usernameCreateValue = document.getElementById('usernameCreate');
const emailCreateValue = document.getElementById('emailCreate');
const passwordCreateValue = document.getElementById('passwordCreate');

$(document).ready(async function () {
    $('.btnCreate').on('click', async function (e) {
        e.preventDefault();
        let kl = document.querySelectorAll('#tbod tr');
        console.log(kl[(kl.length)-1]);
        let u = await fetch('http://localhost:8080/restCreat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: usernameCreateValue.value,
                password: passwordCreateValue.value,
                email: emailCreateValue.value,
                roles: $('#select').val()
            })
        }).then(f=>f.json());
        usernameCreateValue.value = "";
        emailCreateValue.value = "";
        passwordCreateValue.value = "";
        document.getElementById('select').value = "";
        document.getElementById('ad_pan').click();
        //let pol = document.getElementById(`dele${u.id-1}`);
        let rol = "";
        u.roles.forEach((u)=> {
            rol += u.noPrefix + " \n";
        });
        row =` <tr id="dele${u.id}"><td>${u.id}</td><td>${u.username}</td><td>${u.password}</td>
                    <td>${u.email}</td><td>${rol}</td>
                    <td><button class="btn btn-info editbtn">edit</button></td>
                    <td><button class="btn btn-danger delbtn">delete</button></td></tr>`;
        if(u.id == null) {
            alert('a user with that name is already exists\n\nесть уже такой');
            return;
        }
        tbody.insertAdjacentHTML('beforeend', row);
    })
})

const idFormEdit = document.getElementById('idFormEdit');
const usernameFormEdit = document.getElementById('usernameFormEdit');
const emailFormEdit = document.getElementById('emailFormEdit');
const passwordFormEdit = document.getElementById('passwordFormEdit');
let row = "";

//кнопка edit в модалке
$(document).ready( function() {
    $('#submitEdit').on('click', async function (e) {
        e.preventDefault();
        let id = idFormEdit.value;
        let pol = document.getElementById(`dele${id}`);
        let u = await fetch('http://localhost:8080/restUpdate', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: idFormEdit.value,
                username: usernameFormEdit.value,
                password: passwordFormEdit.value,
                email: emailFormEdit.value,
                roles: $('#selectEdit').val()
            })
        }).then(u=>u.json());
        let rol = "";
        u.roles.forEach((u)=> {
            rol += u.noPrefix + " \n";
        });
        row =` <tr id="dele${u.id}"><td>${u.id}</td><td>${u.username}</td><td>${u.password}</td>
                    <td>${u.email}</td><td>${rol}</td>
                    <td><button class="btn btn-info editbtn">edit</button></td>
                    <td><button class="btn btn-danger delbtn">delete</button></td></tr>`;
        pol.innerHTML = row;
        $('#editMod').modal('hide');
    })
});

const idValue = document.querySelector('#idForm');

//кнопка для удаления "remove" в модалке
$(document).ready( function(){
    $('#submitDelete').on('click',async function (e) {
        e.preventDefault();
        let id = idValue.value;
        let pol = document.getElementById(`dele${id}`);
        await fetch(`http://localhost:8080/restDelete/${id}`, {
            method: 'DELETE'
        });
        pol.remove();
        $('#neMod').modal('hide');
     });
});


//функция для поиска нужного юзера в таблице, соответствующего кнопке selector и выполняющего с ним функцию handle
const on = (element, even, selector, handle)=>{
    element.addEventListener(even, e=>{
        if(e.target.closest(selector)){
            handle(e)
        }
    })
}

//модальное окно при изменении
on(document, 'click', '.editbtn', (e)=>{
    e.preventDefault();
    const fila = e.target.parentNode.parentNode;
    const id = fila.firstElementChild.innerHTML;
    const username = fila.children[1].innerHTML;
    const password = fila.children[2].innerHTML;
    const email = fila.children[3].innerHTML;
    const role = fila.children[4].innerHTML;
    let rolAr = role.replace(/[^A-Za-z]+/, " ").trim().split(/\s+/);
    rol(rolAr);
    $('#idFormEdit').val(id);
    $('#usernameFormEdit').val(username);
    $('#emailFormEdit').val(email);
    $('#passwordFormEdit').val(password);
    $('#editMod').modal();
})

//модальное окно при удалении
on(document, 'click', '.delbtn', (e)=>{
    e.preventDefault();
    const fila = e.target.parentNode.parentNode;
    const id = fila.firstElementChild.innerHTML;
    const username = fila.children[1].innerHTML;
    const password = fila.children[2].innerHTML;
    const email = fila.children[3].innerHTML;
    const role = fila.children[4].innerHTML;
    $('#idForm').val(id);
    $('#usernameForm').val(username);
    $('#emailForm').val(email);
    $('#roleForm').val(role);
    $('#passwordForm').val(password);
    $('#neMod').modal();
})
