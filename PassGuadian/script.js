/* ==========================================================
   SecurePass Vault - Enhanced Script (Pure JS)
   Features:
   - Password History (sessionStorage)
   - Vault Manager (localStorage)
   - Password Checker & Breach Check
   - Smooth UI Interactions & Animations
   ========================================================== */

// --- Helper functions ---
function escapeHtml(s) {
  return s.replace(/[&<>"']/g, c => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
  ));
}
function showTooltip(el, text) {
  const t = document.createElement('span');
  t.className = "tooltip";
  t.textContent = text;
  el.appendChild(t);
  setTimeout(() => t.remove(), 1500);
}
function $$(sel, parent = document) {
  return [...parent.querySelectorAll(sel)];
}

// --- Password History (sessionStorage) ---
loadHistory();

saveHistoryBtn.addEventListener('click', () => {
  const p = generatedPassword.value;
  if (!p) return;
  const arr = JSON.parse(sessionStorage.getItem(sessionHistoryKey) || '[]');
  arr.unshift(p);
  sessionStorage.setItem(sessionHistoryKey, JSON.stringify(arr.slice(0, 20)));
  loadHistory();
});
clearHistory.addEventListener('click', () => {
  if (confirm("Clear all password history?")) {
    sessionStorage.removeItem(sessionHistoryKey);
    loadHistory();
  }
});

// --- Vault (localStorage) ---
function loadVault() {
  const arr = JSON.parse(localStorage.getItem(vaultKey) || '[]');
  vaultItems.innerHTML = '';
  if (arr.length === 0) {
    vaultItems.innerHTML = `<li class="muted">No passwords saved yet.</li>`;
    return;
  }

  arr.forEach((item, idx) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <div>
        <strong>${escapeHtml(item.title)}</strong>
        <div class='muted small'>${escapeHtml(item.password.replace(/./g, '•'))}</div>
      </div>
      <div class='vault-actions'>
        <button class='btn copy' data-idx='${idx}' title='Copy'><i class='fa-regular fa-copy'></i></button>
        <button class='btn show' data-idx='${idx}' title='Show'><i class='fa-solid fa-eye'></i></button>
        <button class='btn del' data-idx='${idx}' title='Delete'><i class='fa-solid fa-trash'></i></button>
      </div>`;
    vaultItems.appendChild(li);
  });

  // Attach action listeners
  $$('.vault-actions .copy', vaultItems).forEach(b =>
    b.addEventListener('click', () => {
      const idx = +b.dataset.idx;
      const arr = JSON.parse(localStorage.getItem(vaultKey) || '[]');
      navigator.clipboard.writeText(arr[idx].password);
      showTooltip(b, 'Copied!');
    })
  );

  $$('.vault-actions .del', vaultItems).forEach(b =>
    b.addEventListener('click', () => {
      if (!confirm("Delete this password from vault?")) return;
      const idx = +b.dataset.idx;
      const arr = JSON.parse(localStorage.getItem(vaultKey) || '[]');
      arr.splice(idx, 1);
      localStorage.setItem(vaultKey, JSON.stringify(arr));
      loadVault();
    })
  );

  $$('.vault-actions .show', vaultItems).forEach(b =>
    b.addEventListener('click', () => {
      const idx = +b.dataset.idx;
      const arr = JSON.parse(localStorage.getItem(vaultKey) || '[]');
      // Show in modal-like alert for simplicity
      alert(`🔐 Title: ${arr[idx].title}\nPassword: ${arr[idx].password}`);
    })
  );
}

vaultSave.addEventListener('click', () => {
  const title = vaultTitle.value.trim();
  const pw = vaultPassword.value.trim();
  if (!title || !pw) return alert('Provide a title and password');

  const arr = JSON.parse(localStorage.getItem(vaultKey) || '[]');
  arr.unshift({ title, password: pw, created: Date.now() });
  localStorage.setItem(vaultKey, JSON.stringify(arr.slice(0, 100)));

  vaultTitle.value = '';
  vaultPassword.value = '';
  loadVault();
});

// Quick-save generated password
saveVaultBtn.addEventListener('click', () => {
  const pw = generatedPassword.value;
  if (!pw) return alert('No password to save');

  const title = 'Generated ' + new Date().toLocaleString();
  const arr = JSON.parse(localStorage.getItem(vaultKey) || '[]');
  arr.unshift({ title, password: pw, created: Date.now() });
  localStorage.setItem(vaultKey, JSON.stringify(arr));
  loadVault();
});

// --- Password Checker live ---
checkInput.addEventListener('input', () => {
  const pw = checkInput.value;
  const { bits, crack, tips } = analyzePassword(pw);
  updateMeter(checkMeterBar, bits);

  checkInfo.textContent = pw
    ? `Entropy: ${bits} bits • Est. crack time: ${crack}`
    : "Enter a password to check strength";

  checkTips.innerHTML = tips.length
    ? tips.map(t => `<div>• ${t}</div>`).join('')
    : '<div>Looks good — still follow best practices.</div>';
});

// --- HIBP Breach check using k-Anonymity ---
async function sha1(str) {
  const buf = new TextEncoder().encode(str);
  const hash = await crypto.subtle.digest('SHA-1', buf);
  return Array.from(new Uint8Array(hash))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')
    .toUpperCase();
}
pwnedBtn.addEventListener('click', async () => {
  const pw = checkInput.value;
  if (!pw) return alert('Enter a password first');

  pwnedResult.textContent = 'Checking...';
  try {
    const h = await sha1(pw);
    const prefix = h.slice(0, 5);
    const suffix = h.slice(5);
    const res = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`);
    if (!res.ok) {
      pwnedResult.textContent = 'Could not check (network issue)';
      return;
    }

    const found = (await res.text())
      .split('\n')
      .find(l => l.split(':')[0] === suffix);

    if (found) {
      const count = found.split(':')[1];
      pwnedResult.textContent = `⚠️ Found in breaches ${count} times!`;
      pwnedResult.style.color = "red";
    } else {
      pwnedResult.textContent = '✅ Not found in breaches';
      pwnedResult.style.color = "limegreen";
    }
  } catch (e) {
    pwnedResult.textContent = 'Error checking breaches';
  }
});

// --- Simple login simulation (localStorage) ---
loginBtn.addEventListener('click', () => {
  const user = prompt('Enter username for demo login');
  if (!user) return;
  localStorage.setItem('spv_user', user);
  alert(`✅ Logged in as ${user} (local demo only)`);
});

// --- Init load ---
loadVault();

// --- Smooth scrolling & nav active state ---
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const id = a.getAttribute('href').slice(1);
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
    document.querySelectorAll('.nav-links a').forEach(x => x.classList.remove('active'));
    a.classList.add('active');
  });
});
