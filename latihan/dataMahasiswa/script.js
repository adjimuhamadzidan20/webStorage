const STORAGE = 'DATA_MHS';

// check storage
function storageCheck() {
	return typeof(Storage) !== 'undefined';
}

// wadah menempatkan data mhs
function wadahDataMhs(data) {
	if (storageCheck()) {
		let wadahDataMhs = [];

		if (localStorage.getItem(STORAGE) !== null) {
			wadahDataMhs = JSON.parse(localStorage.getItem(STORAGE));
		}

		wadahDataMhs.unshift(data);
		if (wadahDataMhs.length > 10) {
			wadahDataMhs.pop();
		}

		console.log(localStorage.setItem(STORAGE, JSON.stringify(wadahDataMhs)));
	}
}

// ambil data
function ambilDataMhs() {
	if (storageCheck()) {
		return JSON.parse(localStorage.getItem(STORAGE));
	} else {
		return [];
	}
}

// menampilkan data
function tampilDataMhs() {
	let dataMahasiswa = ambilDataMhs();
	let listData = document.getElementById('list-mhs');

	listData.innerHTML = '';
	for (data of dataMahasiswa) {
		let baris = document.createElement('tr');
		baris.innerHTML = '<td>' + data.namaMhs + '</td>';
		baris.innerHTML += '<td>' + data.fakultas + '</td>';
		baris.innerHTML += '<td>' + data.prodi + '</td>';

		listData.appendChild(baris);
	}
}

// submit data
let form = document.querySelector('.input-data');
form.addEventListener('submit', function(e) {
	let namaMhs = document.getElementById('nama').value;
	let fakultas = document.getElementById('fakultas').value;
	let prodi = document.getElementById('prodi').value;

	// data object 
	const dataMhs = {
		namaMhs : namaMhs,
		fakultas : fakultas,
		prodi : prodi
	}

	wadahDataMhs(dataMhs);
	ambilDataMhs();
	tampilDataMhs();
	e.preventDefault();
})

// load halaman
window.addEventListener('load', function() {
	if (storageCheck()) {
		if (localStorage.getItem(STORAGE) !== null) {
			tampilDataMhs();
		}
	} else {
		console.log('Web browser tidak support web storage');
	}
})

// reset
let resetBtn = document.getElementById('reset');
resetBtn.addEventListener('click', function() {
	if (localStorage.getItem(STORAGE) === null) {
		alert('Belum ada data sama sekali');
	} else {
		let konfir = confirm('Anda yakin ingin reset? data akan terhapus semua');
		if (konfir == true) {
			localStorage.removeItem(STORAGE);
			location.reload();
			alert('Data berhasil direset');
		}
	}
})