let dataTodo = {}; // objek data todo
let LIST_STORAGE = 'TODO_DATA'; // nama localstorage
let listTodo = document.getElementById('listTodo'); // menangkap elemen list

// ========= local storage js =========
// cek web storage support
if (typeof(Storage) !== 'undefined') {
	console.log('web storage support');
} else {
	console.log('web storage tidak support');
}

if (todoDariLokal = localStorage.getItem(LIST_STORAGE)) {
	dataTodo = JSON.parse(todoDariLokal);

	for(let key in dataTodo) {
		createList(key, dataTodo[key]);
	}
}

// sinkronisasi ke localstorage
function sinkronLokalStorage(aktivity, item, status = false) {
	switch (aktivity) {
		case 'TAMBAH_LIST' :
		case 'UPDATE_LIST' :
			dataTodo[item] = status;
			break;
		case 'DELETE_LIST' :
			delete dataTodo[item];
			break;
		default:
			break;
	}

	localStorage.setItem(LIST_STORAGE, JSON.stringify(dataTodo));
	return;
}

// ========= fungsi js =========
// button add
let addList = document.getElementById('add');
add.addEventListener('click', function(event) {
	let validasi = document.forms['formTodo']['list'].value;

	// jika belum menulis sesuatu
	if (validasi == "") {
		alert('Silahkan tuliskan sesuatu..');
	} else {
		// kolom input list
		let inputList = document.getElementById('todo_text');
		createList(inputList.value);
		sinkronLokalStorage('TAMBAH_LIST', inputList.value);

		// mengosongkan kolom input
		inputList.value = '';
	}

	event.preventDefault();
})

// fungsi membuat list
function createList(text, status = false) {
	let selesai = (status) ? 'coret' : '';
	let todoListBaru = `<li> 
                           <span class='${selesai}' onclick='coretList(this)'>${text}</span>
                           <button onclick='deleteList(this)'>Delete <i class="fa-solid fa-trash-can"></i></button>
                        </li>`;

    listTodo.insertAdjacentHTML('afterbegin', todoListBaru);
}

// fungsi coret list
function coretList(e) {
	let status = e.classList.toggle('coret');
	sinkronLokalStorage('UPDATE_LIST', e.innerText, status);
}

// fungsi delete list
function deleteList(e) {
	// konfirmasi hapus list
	let hapus = confirm('Hapus list?');
	if (hapus == true) {
		e.parentElement.remove();
		sinkronLokalStorage('DELETE_LIST', e.previousElementSibling.innerText.trim());
	}
}

