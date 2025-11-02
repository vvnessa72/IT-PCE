document.addEventListener('DOMContentLoaded', () => {
  const addBtn = document.getElementById('add-todo');
  const nameInput = document.getElementById('todo-name');
  const descInput = document.getElementById('todo-desc');
  const todoList = document.getElementById('todo-list');
  const toggleSearch = document.getElementById('toggle-search');
  const searchContainer = document.getElementById('search-container');
  const searchInput = document.getElementById('search-input');
  const clearSearch = document.getElementById('clear-search');

  // --- Toggle search bar ---
  toggleSearch.addEventListener('click', () => {
    const hidden = searchContainer.classList.contains('hidden');
    if (hidden) {
      searchContainer.classList.remove('hidden');
      setTimeout(() => searchContainer.classList.add('active'), 10);
      searchInput.focus();
    } else {
      searchContainer.classList.remove('active');
      setTimeout(() => searchContainer.classList.add('hidden'), 300);
      searchInput.value = '';
      filterTodos('');
    }
  });

  // --- Tambah kegiatan ---
  addBtn.addEventListener('click', () => {
    const name = nameInput.value.trim();
    const desc = descInput.value.trim();

    if (!name) {
      alert('Nama kegiatan harus diisi!');
      return;
    }

    const todoItem = document.createElement('div');
    todoItem.className =
      'bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 border-l-4 border-purple-400 p-4 rounded-xl shadow flex justify-between items-start';

    todoItem.innerHTML = `
      <div>
        <h4 class="text-lg font-semibold text-purple-700">${name}</h4>
        <p class="text-gray-600 mt-1">${desc || 'Tidak ada deskripsi.'}</p>
      </div>
      <button class="text-red-500 font-bold hover:text-red-700 transition text-xl">&times;</button>
    `;

    todoItem.querySelector('button').addEventListener('click', () => {
      todoItem.classList.add('opacity-0', 'scale-95', 'transition');
      setTimeout(() => todoItem.remove(), 300);
    });

    todoList.appendChild(todoItem);
    nameInput.value = '';
    descInput.value = '';
  });

  // --- Fitur search ---
  function filterTodos(query) {
    const items = todoList.querySelectorAll('div');
    items.forEach((item) => {
      const name = item.querySelector('h4').textContent.toLowerCase();
      const desc = item.querySelector('p').textContent.toLowerCase();
      item.style.display = name.includes(query) || desc.includes(query) ? '' : 'none';
    });
  }

  searchInput.addEventListener('input', (e) => {
    filterTodos(e.target.value.toLowerCase());
  });

  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      filterTodos(searchInput.value.toLowerCase());
    }
  });

  // --- Tombol ✕ (clear + tutup kolom search) ---
  clearSearch.addEventListener('click', () => {
    searchInput.value = '';
    filterTodos('');

    // Tutup kolom dengan animasi
    searchContainer.classList.remove('active');
    setTimeout(() => searchContainer.classList.add('hidden'), 300);
  });
});
