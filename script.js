const campaigns = [
    { id: 1, category: 'pendidikan', title: 'Sedekah Peralatan Sekolah', img: 'image/PendidikanDonasi.jpeg', target: 50000000, current: 35000000, 
        description: 'Bagi anak-anak di wilayah terpencil atau daerah pascabencana, peralatan sekolah bukan sekadar alat tulis. Itu adalah simbol harapan. Melalui program Sedekah Peralatan Sekolah, kami mengajak Anda untuk menjadi bagian dari perjalanan pendidikan mereka.'},
    { id: 2, category: 'bencana', title: 'Banjir Bandang di Sumatera', img: 'image/banjirSumatera.jpeg', target: 100000000, current: 85000000,
        description: 'Bagi warga yang terdampak, setiap detik sangatlah berharga. Saat ini mereka membutuhkan uluran tangan untuk bertahan hidup di tengah kondisi yang serba terbatas. Melalui program Tanggap Darurat Banjir Sumatera, kami mengajak Anda untuk menjadi tumpuan harapan bagi mereka yang kehilangan tempat tinggal.'},
    { id: 3, category: 'kesehatan', title: 'Penanganan Korban Bencana Alam', img: 'image/kesehatan.jpeg', target: 75000000, current: 20000000,
        description:'Bagi warga yang kehilangan tempat tinggal atau sedang berjuang di ruang perawatan pascabencana, bantuan medis dan logistik bukan sekadar penyambung hidup. Itu adalah simbol kepedulian. Melalui program Penanganan Korban Bencana Alam, kami mengajak Anda untuk menjadi bagian dari pemulihan kesehatan dan kekuatan mereka untuk bangkit kembali.'},
    { id: 4, category: 'bencana', title: 'Bantuan Tanah Longsor', img: 'image/tanahLongsor.jpeg', target: 40000000, current: 15000000,
        description: 'Bagi warga yang tertimbun material atau kehilangan tempat tinggal akibat pergerakan tanah, bantuan alat berat dan logistik darurat bukan sekadar dukungan fisik. Itu adalah simbol harapan untuk bangkit kembali. Melalui program Bantuan Bencana Tanah Longsor, kami mengajak Anda untuk menjadi bagian dari proses evakuasi dan pemulihan kehidupan mereka.'}
];

function createCard(c) {
    const percent = Math.min((c.current / c.target) * 100, 100);
    const categoryIcons = {
        'pendidikan': 'fa-graduation-cap',
        'bencana': 'fa-house-damage',
        'kesehatan': 'fa-hospital-user'
    };
    
    const icon = categoryIcons[c.category] || 'fa-heart';

    return `
        <div class="card" onclick="openDetail(${c.id})">
            <img src="${c.img}">
            <div class="card-content">
                <small style="color:var(--primary); text-transform:uppercase; font-weight:bold;">
                    <i class="fas ${icon}"></i> ${c.category}
                </small>
                <h4>${c.title}</h4>
                <div class="progress-bg"><div class="progress-fill" style="width:${percent}%"></div></div>
                <p>Terkumpul: <b>Rp ${c.current.toLocaleString()}</b></p>
            </div>
        </div>
    `;
}

function renderHomeCampaigns() {
    const urgentDisplay = document.getElementById('urgentCampaigns');
    // Ambil 3 data pertama
    const urgentData = campaigns.slice(0, 3);
    urgentDisplay.innerHTML = urgentData.map(c => createCard(c)).join('');
}


function renderAllCampaigns(filter = 'semua') {
    const display = document.getElementById('allCampaigns');
    const filtered = filter === 'semua' ? campaigns : campaigns.filter(c => c.category === filter);
    display.innerHTML = filtered.map(c => createCard(c)).join('');
}

function filterCampaign(cat) {
    renderAllCampaigns(cat);
    document.querySelectorAll('.btn-filter').forEach(btn => btn.classList.remove('active'));
   
    if(event.target.classList.contains('btn-filter')) {
        event.target.classList.add('active');
    }
}

function openDetail(id) {
    const c = campaigns.find(item => item.id === id);
    const modal = document.getElementById('modalDetail');
    const content = document.getElementById('modalData');
    
    content.innerHTML = `
        <div class="detail-header">
            <h2 style="color: var(--dark); margin-bottom: 15px;">${c.title}</h2>
        </div>
        <div class="detail-story" style="max-height: 300px; overflow-y: auto; text-align: left; margin-bottom: 20px;">
            <h4 style="margin-bottom: 10px;">Cerita Penggalangan Dana</h4>
            <p style="color: #555; font-size: 0.95rem; line-height: 1.6;">
                ${c.description} </p>
            <hr style="margin: 15px 0; border: 0; border-top: 1px solid #eee;">
            <div class="detail-info-row"><b>Kabar Terbaru</b> <span style="float:right">></span></div>
            <div class="detail-info-row"><b>Pencairan Dana</b> <span style="float:right">></span></div>
        </div>
        <div class="detail-footer" style="display: flex; gap: 10px;">
            <button class="btn-filter" style="flex: 1;">Bagikan</button>
            <button class="btn-primary" style="flex: 2;" onclick="showDonationForm(${c.id})">Donasi Sekarang</button>
        </div>
    `;
    modal.style.display = 'flex';
}

function showDonationForm(id) {
    const c = campaigns.find(item => item.id === id);
    const content = document.getElementById('modalData');
    
    content.innerHTML = `
        <h3>Formulir Donasi</h3>
        <p style="margin-bottom: 15px;">Kampanye: <b>${c.title}</b></p>
        <form id="formDonasi" onsubmit="saveDonation(event, '${c.title}')">
            <input type="text" id="donorName" placeholder="Nama Lengkap" required>
            <input type="number" id="donorAmount" placeholder="Nominal Donasi (Rp)" required min="10000">
            <select id="payMethod">
                <option value="Gopay">Gopay</option>
                <option value="Transfer Bank">Transfer Bank</option>
                <option value="OVO">OVO</option>
            </select>
            <button type="submit" class="btn-primary">Konfirmasi Pembayaran</button>
            <button type="button" class="btn-filter" style="margin-top: 10px; border:none;" onclick="openDetail(${id})">Kembali ke Detail</button>
        </form>
    `;
}

function closeModal() { document.getElementById('modalDetail').style.display = 'none'; }

function saveDonation(e, title) {
    e.preventDefault();
    const amount = document.getElementById('donorAmount').value;
    alert(`Terima kasih! Donasi untuk "${title}" sebesar Rp ${parseInt(amount).toLocaleString()} berhasil.`);
    closeModal();
}

document.getElementById('formRelawan').addEventListener('submit', (e) => {
    e.preventDefault();
    alert("Pendaftaran Relawan Berhasil! Tim kami akan menghubungi Anda melalui email.");
    e.target.reset();
});

window.onload = () => {
    renderHomeCampaigns();
    renderAllCampaigns();
};
