/**
 *
 */

"use strict";
// resul = prompt('titl', 'defolt')
// alert(resul)
//alert("dfghjkl");
//$('body').append('<a>kfdghvhkjlk</a>');
// var app = new Vue({
//     el: '#app',
//     data: {
//         message: 'приветттт'
//     }
// });



//let delModal = document.querySelector('.myFormModal');

async function start() {
    const resp = await fetch("http://localhost:8080/admin/allUser");
    const data = await resp.json();
    klop(data);
   // setTimeout(() => {}, 5000);
}
   // start();
function klop(o){
    console.log(o);
}
//window.addEventListener('DOMContentLoaded', start);
//let users = fetch("http://localhost:8080/admin/allUser").then(res=>res.json());
const tbody = document.querySelector("#tbod");
const tabus = document.querySelector("#tablusers");
let str = "";
let dr;
$(document).ready( async function () {
//async function lop() {
   // if ('content' in document.createElement('template')) {
        let users = await fetch("http://localhost:8080/admin/allUser").then(res => res.json());
        const template = document.querySelector('#product');
         // let temp = '<div class="dc">tecst</div>';
        users.forEach((u) => {
            let rol = "";
            u.roles.forEach((u)=> {
                rol += u.noPrefix + "  \n";
            });
            // const clone = template.content.cloneNode(true);
            // let td = clone.querySelectorAll("td");
            // td[0].textContent = u.id;
            // td[1].textContent = u.username;
            // td[2].textContent = u.password;
            // td[3].textContent = u.email;
            // td[4].textContent = rol;
            // tbody.appendChild(clone);
            str +=`
 <tr id="dele${u.id}"><td>${u.id}</td><td>${u.username}</td><td>${u.password}</td>
                    <td>${u.email}</td><td>${rol}</td>
                    <td><button class="btn btn-info editbtn" >edit</button></td>
                    <td><button class="btn btn-danger delbtn"  >delete</button></td></tr>`;
                   // <td><button id="delet${u.id}" class="btn btn-danger" data-toggle="modal" data-target="#neMod">delete</button></td></tr>`;
            //onclick="deletUser(${id})"
            //document.getElementById(`dele${u.id}`).innerHTML('iuygtf');

            // const ody = document.querySelector(`#delet${u.id}`);
            // console.log(ody.id);
           // setTimeout(()=> {}, 5000);
        })
    //alert();
  // await creat().then(r=>str+=r);
        //alert('k');
    //tbody.innerHTML = str// + await creat();
       // tbody.innerHTML = ;
        //$("#tbod").html(str);
    // tbody.innerText = str;
        // let user=  await fetch("http://localhost:8080/oneUser/2").then(res => res.json());
        // let rol=await user.roles;
        // let roll = rol[0].noPrefix;

        // console.log(user);
        //let roles=await user.then(res => res.json());

        // let tem = "";
        // user.roles.forEach((u)=> {
        //     tem += u.noPrefix+" \n";
        // });
        // let temp=`<tr><td>${user.id}</td><td>${user.username}</td><td>${tem}</td></tr>`;
        // users.forEach((u)=>{
        //     temp += "<tr>";
        //     temp += "<td>" + u.id + "</td>";
        //     temp += "<td>" + u.username + "</td>";
        // })
        // $("#tbod").html(temp);
        // tbody.appendChild(temp);
       //  document.getElementById("#tbod").innerHTML = temp;

       //  users.forEach((u)=>{
       //      const clone = template.content.cloneNode(true);
       //      let td = clone.querySelectorAll("td");
       //      td[0].textContent = u.id;
       //      td[1].textContent = u.username;
       //      td[2].textContent = u.password;
       //      td[3].textContent = u.email;
       //      tbody.appendChild(clone);
       //  })
    tbody.innerHTML = str;
        //await f(str);
       //await creat(str);
    // } else {
    //     alert("oiuytgfdxcvbnm");
    // }
})
//let dr = "";
//console.log(str);
//lop();

//let namSel;
//let elSel = document.getElementById('selector');
let val = [];
//let v=0;
$(document).ready( async function () {
//async function rol() {
    //e.preventDefault();
    let rollist = await fetch("http://localhost:8080/rollist").then(r => r.json());
    // console.log(rollist); id="${++v}" data-num="${++v}" console.log(val.push($(this).find('option:selected')))
    let rol = "";
    rollist.forEach((r) => rol += `<option value="${r.role}">${r.noPrefix}</option>`);
    let sel = `<select name="sele" onchange="console.log($('#select').val())" id="select"  multiple class="form-control sel" size="3">
                                                    <option value="">no role</option>
                                                    ${rol}
                                                    </select>`;

    //console.log(val);
    //  let formSelect = $('.formSel.sele');
    //  let selOpt = formSelect.options[formSelect.selectedIndex];
// for(let i=0;i<elSel.options.length;i++){
//     if(elSel.options[i].selected)
//         val.push(elSel.options[i].value);
// }
    //val.push(elSel.value);
   // document.getElementById('selectorEdit').innerHTML = sel;
    document.getElementById('selector').innerHTML = sel;
})

//функция активизирующая имеющиеся роли при изменении
//$(document).ready( async function () {
async function rol(userRol) {
    console.log(userRol);
    let rollist = await fetch("http://localhost:8080/rollist").then(r => r.json());
    // console.log(rollist); id="${++v}" data-num="${++v}" console.log(val.push($(this).find('option:selected')))
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
   // document.getElementById('selector').innerHTML = sel;
}

// $('#select').on("change", function (){
//     console.log(this);
// })
// $(document).ready(function () {
//     $('#select').multiselect();
// });


//rol();

//$("#tbod").html('oiuygt');
//console.log(col);
    async function deletUser(id) {
    fetch(`http://localhost:8080/restDelete/${id}`);
   //  const res = await fetch(`http://localhost:8080/oneUser/${id}`, {
   //      method: 'DELETE'
   //  })
   //      .then(res => res.json())//.setTimeout(()=> {}, 1000)
   //      .then(()=>location.reload());
   //  let jas = await res.json();
   // setTimeout(()=> {}, 1000);
   //console.log(jas);
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
<!-- <div class="col-lg">-->
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

async function f(str) {
    // let rol = "";
    // u.roles.forEach((u)=> {
    //     rol += u.noPrefix + " \n";
    // });
    let row =` <tr id="deleop"><td></td><td>${usernameCreateValue.value}</td><td>${passwordCreateValue.value}</td>
                    <td>${emailCreateValue.value}</td><td></td>
                    <td><button class="btn btn-info editbtn">edit</button></td>
                    <td><button class="btn btn-danger delbtn">delete</button></td></tr>`;
    tbody.innerHTML=str+row;
}

const formCreate = document.querySelector('.formCreate');
const usernameCreateValue = document.getElementById('usernameCreate');
const emailCreateValue = document.getElementById('emailCreate');
const passwordCreateValue = document.getElementById('passwordCreate');
//const roleCreateValue = $('#select').val();
//let dr;
// let kl = document.querySelectorAll('#tbod tr');
let par = tbody.parentNode;
let bn = par.children[1].innerHTML;
// console.log(kl);
let poi = $('#tbod tr:last')[0];
console.log(tbody);
//async function creat() {
$(document).ready(async function () {
    $('.btnCreate').on('click', async function (e) {
//formCreate.addEventListener('submit', async (e) => {
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
        let intab = document.getElementById('tbod');
        let rol = "";
        u.roles.forEach((u)=> {
            rol += u.noPrefix + " \n";
        });
        row =` <tr id="dele${u.id}"><td>${u.id}</td><td>${u.username}</td><td>${u.password}</td>
                    <td>${u.email}</td><td>${rol}</td>
                    <td><button class="btn btn-info editbtn">edit</button></td>
                    <td><button class="btn btn-danger delbtn">delete</button></td></tr>`;
       // $(this).hide();
        //document.getElementById('homeCreate').style.display="block";
        // str+='kjhg';
       //  console.log(dr);
       // alert('kjhg');
        // document.getElementById('tbod').html(str);
        //window.history.back();
        //$("#tbod").html(str);
       //  $('#tbod').after(dr);
       // tbody.innerHTML=str+'kjh';
        if(u.id == null) {
            alert('a user with that name is already exists\n\nесть уже такой');
            return;
        }
        intab.insertAdjacentHTML('beforeend', row);
        //return dr;
    })
})
//console.log(creat().then(t=>t.json));

const idFormEdit = document.getElementById('idFormEdit');
const usernameFormEdit = document.getElementById('usernameFormEdit');
const emailFormEdit = document.getElementById('emailFormEdit');
const passwordFormEdit = document.getElementById('passwordFormEdit');
//const roleCreateValue = $('#select').val();
let row = "";

//кнопка edit в модалке
$(document).ready( function() {
    $('#submitEdit').on('click', async function (e) {
//formCreate.addEventListener('submit', async (e) => {
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
         //console.log(u);
        let rol = "";
        u.roles.forEach((u)=> {
            rol += u.noPrefix + " \n";
        });
        row =` <tr id="dele${u.id}"><td>${u.id}</td><td>${u.username}</td><td>${u.password}</td>
                    <td>${u.email}</td><td>${rol}</td>
                    <td><button class="btn btn-info editbtn">edit</button></td>
                    <td><button class="btn btn-danger delbtn">delete</button></td></tr>`;
      //  $(`#dele${id}`)
       // pol.insertAdjacentHTML('afterend',row);
        pol.innerHTML = row;
        // document.getElementById('usertabl').click();
         //$(this).hide();
        $('#editMod').modal('hide');
    })
});


const modalDelete = document.querySelector('.modal-delete');
const idValue = document.querySelector('#idForm');

//кнопка для удаления "remove" в модалке
$(document).ready( function(){
    $('#submitDelete').on('click',async function (e) {
        e.preventDefault();
        let id = idValue.value;
        let pol = document.getElementById(`dele${id}`);
        //console.log(pol);
        await fetch(`http://localhost:8080/restDelete/${id}`, {
            method: 'DELETE'
        });
        //pol.parentNode.removeChild(pol);
        pol.remove();
        $('#neMod').modal('hide');
     });
});

// modalDelete.addEventListener('submit',  (e)=>{
//     //e.preventDefault();
//     let id = idValue.value;
//     fetch(`http://localhost:8080/restDelete/${id}`, {
//         method: 'DELETE'
//     });
// })

//функция для поиска нужного юзера в таблице, соответствующего кнопке selector и выполняющего с ним функцию handle
const on = (element, even, selector, handle)=>{
    element.addEventListener(even, e=>{
       // console.log(element,even,selector, handle,e);
        if(e.target.closest(selector)){
            handle(e)
        }
    })
}

//модальное окно при изменении
on(document, 'click', '.editbtn', (e)=>{
    e.preventDefault();
    // console.log('.delbtn');
    const fila = e.target.parentNode.parentNode;
    const id = fila.firstElementChild.innerHTML;
    const username = fila.children[1].innerHTML;
    const password = fila.children[2].innerHTML;
    const email = fila.children[3].innerHTML;
    const role = fila.children[4].innerHTML;
    let rolAr = role.replace(/[^A-Za-z]+/, " ").trim().split(/\s+/);
    rol(rolAr);
   // console.log(role);
    $('#idFormEdit').val(id);
    $('#usernameFormEdit').val(username);
    $('#emailFormEdit').val(email);
   // $('#roleFormEdit').val(role);
    $('#passwordFormEdit').val(password);
    $('#editMod').modal();
    // console.log(loi);
})

//модальное окно при удалении
on(document, 'click', '.delbtn', (e)=>{
    e.preventDefault();
   // console.log('.delbtn');

    const fila = e.target.parentNode.parentNode;
    const id = fila.firstElementChild.innerHTML;
    const username = fila.children[1].innerHTML;
    const password = fila.children[2].innerHTML;
    const email = fila.children[3].innerHTML;
    const role = fila.children[4].innerHTML;
    //console.log(fila.parentElement.dataset.id);

  //  let delStr = `
        // <div class="modal fade" id="neMod" tabindex="-1"
        //  role="dialog" aria-labelledby="myFormModal"
        //  aria-hidden="true">
        //
        // <div class="modal-dialog" role="document">
        //     <div class="modal-content justify-content-center">
        //         <div class="modal-header text-center">
        //             <h4 class="modal-title text-center">delete user</h4>
        //             <button class="close" data-dismiss="modal">x</button>
        //         </div>
        //         <div class="modal-body">
        //         <form>
        //             <div class="form-group">
        //                 <div class="text-center">ID</div>
        //                 <!--    <div class="col-sm-auto">-->
        //                 <input readonly type="number" class="form-control" name="id" id="idForm">
        //                <!-- type="text" name="id"
        //                      class="form-control" placeholder="Enter Username"/>-->
        //                 <!--    </div>-->
        //
        //              <label for="username" class="col text-center"><b>username</b></label>
        //               <input type="text" class="form-control" name="username" id="usernameForm" placeholder="Enter Username">
        //
        //             <label for="username" class="col text-center"><b>emil</b></label>
        //               <input type="text" class="form-control" name="username" id="emailForm">
        //
        //             <label for="username" class="col text-center"><b>password</b></label>
        //               <input type="text" class="form-control" name="username" id="passwordForm">
        //
        //               <label for="username" class="col text-center"><b>role</b></label>
        //               <input type="text" class="form-control" name="username" id="roleForm">
        //
        //             </form>
        //             <div class="modal-footer">
        //                 <!--                            <button class="close" data-dismiss="modal">x</button>-->
        //                 <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        //                                         <button type="submit" id="submitDelete" class="btn btn-primary">remove</button>
        //                                       <!--  <a href="@{http://localhost:8080/restDelete/${id}}" class="btn btn-danger">Delete</a>-->
        //             </div>
        //         </div>
        //     </div>
        // </div>
        // </div>
        // <!--    </form>--></div>
//`
   // delModal.innerHTML = delStr;
   // const idForm = document.querySelector('#idForm');
    // const neMod = document.querySelector('#neMod');
    // neMod.show();
    // idForm.value = id;
    // $('#usernameForm').value = username;
    $('#idForm').val(id);
    $('#usernameForm').val(username);
    $('#emailForm').val(email);
    $('#roleForm').val(role);
    $('#passwordForm').val(password);
    $('#neMod').modal();
   // console.log(loi);
})

// const idForm = document.querySelector('#idForm');
// let id = idForm.parentNode.parentNode

// if('content' in document.createElement('template')) {
//     const tbody = document.querySelector("#bod");
//     const template = document.querySelector('#productrow');
//     const clone = template.content.cloneNode(true);
//     let td = clone.querySelectorAll("td");
//     td[1].textContent = "Stuff";
//     td[0].textContent = "1234";
//     tbody.appendChild(clone);
//     const clone2 = template.content.cloneNode(true);
//     td = clone2.querySelectorAll("td");
//     td[0].textContent = "34567";
//     td[1].textContent = "acme kidney";
//     tbody.appendChild(clone2);
// }else{
//     alert("oiuytgfdxcvbnm");
// }



// $(document).ready(function(){
//
//     $('.ebtn').on('click',async function (event) {
//         //console.log(this);
//        event.preventDefault();
//         const href = $(this).attr('href');
//         let user = await fetch(href).then(res=>res.json());
//             $('#id2').val(user.id);
//             $('#username2').val(user.username);
//             $('#email2').val(user.email);
//             $('#passw2').val(user.password);
//        // })
//         $('#adMod').modal();
//     });
// });

let buttonLoad;
//
// $(document).ready(function () {
//     buttonLoad = $(".ebtn2");
//     //buttonLoad = $("#bn2");
//     buttonLoad.click(function () {
//        // fetch("http://localhost:8080/admin/allUser").then(res=>res.json()).then(data=>console.log(data));
//        // alert('loading countries....');
//          $('#neMod').modal();
//        loadUsers();
//      });
//  });

// async function loadUsers() {
//     let url = "http://localhost:8080/admin/allUser";
//
//     //let url = 'http://localhost:8080/admin/allUser';
//     let response = await fetch(url).then(r=>r.json());
//    // let commits = await response.json();
//     console.log(response);
//    // alert(commits);
//    //  $.get(url, function (commits) {
//    //      alert(commits);
//    //  }).done(function () {
//    //      alert('Done');
//    //  }).fail(function () {
//    //      alert('Failed');
//    //  });
// }