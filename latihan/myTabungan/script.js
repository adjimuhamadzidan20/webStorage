// key storage
const KEY_SALDO = 'DATA_SALDO';

// cek storage
function checkStorage() {
	return typeof(Storage) !== 'undefined';
}

// menampilkan isi nilai dari local storage
let tampilSaldo = document.getElementById('jumlah_saldo');
tampilSaldo.innerText = localStorage.getItem(KEY_SALDO);

// simpan tunai
function simpanTunai() {
	let simpan = document.getElementById('simpan');
	simpan.addEventListener('click', function() {
		let inputNominal = Number(document.getElementById('nominal').value);

		if (inputNominal == '') {
			return alert('Mohon masukan nominal terlebih dahulu');
		} 

		else {
			let saldo = Number(localStorage.getItem(KEY_SALDO));
			let jumlah = inputNominal + saldo;
			localStorage.setItem(KEY_SALDO, jumlah);

			let konfir = confirm('Simpan tunai?');
			if (konfir === true) {
				alert('Tabungan anda berhasil bertambah sebesar Rp. ' + localStorage.getItem(KEY_SALDO));
				console.log('Tabungan sudah bertambah Rp. ' + localStorage.getItem(KEY_SALDO));
				tampilSaldo.innerText = localStorage.getItem(KEY_SALDO);
			}
		}

		// mengosongkan kolom input
		document.getElementById('nominal').value = '';
	})
}

// tarik tunai
function tarikTunai() {
	let tarik = document.getElementById('tarikTunai');
	tarik.addEventListener('click', function() {
		let tarikNominal = Number(document.getElementById('tarikNominal').value);

		if (tarikNominal == '') {
			return alert('Mohon masukan nominal terlebih dahulu');
		} 

		else if (tarikNominal >= localStorage.getItem(KEY_SALDO)) {
			alert('Nominal yang ditarik melebihi jumlah saldo');
			document.getElementById('tarikNominal').value = '';
		} 

		else if (tarikNominal !== localStorage.getItem(KEY_SALDO)) {
			let saldo = Number(localStorage.getItem(KEY_SALDO));
			let jumlah =  saldo - tarikNominal;
			localStorage.setItem(KEY_SALDO, jumlah);

			let konfir = confirm('Tarik tunai?');
			if (konfir === true) {
				alert('Penarikan uang berhasil saldo tersisa sebesar Rp. ' + localStorage.getItem(KEY_SALDO));
				console.log('Tabungan tersisa Rp. ' + localStorage.getItem(KEY_SALDO));
				tampilSaldo.innerText = localStorage.getItem(KEY_SALDO);
			}
		}

		// mengosongkan kolom input
		document.getElementById('tarikNominal').value = '';
	})
}

// reset saldo
function resetSaldo() {
	let reset = document.getElementById('reset');
	reset.addEventListener('click', function() {
		if (localStorage.getItem(KEY_SALDO) == 0) {
			alert('Saldo anda masih Rp. 0');
		} 

		else {
			let konfir = confirm('Saldo anda akan direset kembali ke 0 apakah yakin ingin meresetnya?');
			if (konfir == true) {
				localStorage.setItem(KEY_SALDO, 0);
				alert('Reset berhasil');
				console.log('Tabungan direset kembali Rp. ' + localStorage.getItem(KEY_SALDO));
				tampilSaldo.innerText = localStorage.getItem(KEY_SALDO);
			}
		}
	})
}

// menampilkan form input
function navigate() {
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

// proses
if (checkStorage()) {
	if (localStorage.getItem(KEY_SALDO) === null) {
		localStorage.setItem(KEY_SALDO, 0);
	}

	simpanTunai();
	tarikTunai();
	resetSaldo();
	navigate();
}

