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