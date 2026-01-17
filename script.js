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