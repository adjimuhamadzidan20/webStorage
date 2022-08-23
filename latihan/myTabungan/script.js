// key storage
const dataStorage = 'DATA_SALDO';

// cek storage
function checkStorage() {
	return typeof(Storage) !== 'undefined';
}

if (checkStorage()) {
	if (localStorage.getItem(dataStorage) === null) {
		localStorage.setItem(dataStorage, 0);
	}

	

	let jumlahSaldo = document.getElementById('jumlah_saldo');
	jumlahSaldo.innerText = localStorage.getItem(dataStorage);

	// simpan tunai
	let simpan = document.getElementById('simpan');
	simpan.addEventListener('click', function() {
		let inputNominal = Number(document.getElementById('nominal').value);
		if (inputNominal == '') {
			return alert('Mohon masukan nominal terlebih dahulu');
		} else {
			let saldo = Number(localStorage.getItem(dataStorage));
			let jumlah = inputNominal + saldo;
			localStorage.setItem(dataStorage, jumlah);

			let konfir = confirm('Simpan tunai?');
			if (konfir === true) {
				alert('Tabungan anda berhasil bertambah sebesar Rp. ' + localStorage.getItem(dataStorage));
				console.log('Tabungan sudah bertambah Rp. ' + localStorage.getItem(dataStorage));
				jumlahSaldo.innerText = localStorage.getItem(dataStorage);
			}
		}
	})

	// tarik tunai
	let tarik = document.getElementById('tarikTunai');
	tarik.addEventListener('click', function() {
		let tarikNominal = Number(document.getElementById('tarikNominal').value);
		if (tarikNominal == '') {
			return alert('Mohon masukan nominal terlebih dahulu');
		} else {
			let saldo = Number(localStorage.getItem(dataStorage));
			let jumlah =  saldo - tarikNominal;
			localStorage.setItem(dataStorage, jumlah);

			let konfir = confirm('Tarik tunai?');
			if (konfir === true) {
				alert('Penarikan uang berhasil saldo tersisa sebesar Rp. ' + localStorage.getItem(dataStorage));
				console.log('Tabungan tersisa Rp. ' + localStorage.getItem(dataStorage));
				jumlahSaldo.innerText = localStorage.getItem(dataStorage);
			}
		}
	})

	// menangkap button menu
	let btnTarikTunai = document.getElementById('tarik');
	let btnTabungTunai = document.getElementById('tabung');

	// menangkap masing" form 
	let formTarikTunai = document.querySelector('.tarik-input');
	let formTabungTunai = document.querySelector('.form-input');

	// button menampilkan form input tabung tunai
	btnTabungTunai.addEventListener('click', function() {
		formTarikTunai.style.display = 'none';
		formTabungTunai.style.display = 'block';
	})

	// button menampilkan form input tarik tunai
	btnTarikTunai.addEventListener('click', function() {
		formTarikTunai.style.display = 'block';
		formTabungTunai.style.display = 'none';
	})

}

