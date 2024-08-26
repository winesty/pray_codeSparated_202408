const characters = ["지", "기", "금", "지", "원", "위", "대", "강", "시", "천", "주", "조", "화", "정", "영", "세", "불", "망", "만", "사", "지"];
let currentBead = 0;
let selectedItem = null;
let count = 0;
let beadCount = 21;
let beepThreshold = 0; // User-set beep threshold

const touchArea = document.getElementById('touchArea');
const countDisplay = document.getElementById('touchCountDisplay');
const inputButton = document.getElementById('inputButton');
const userInput = document.getElementById('userInput');
const inputList = document.getElementById('inputList');
const beadCountSelector = document.getElementById('beadCount');
const customBeadCountInput = document.getElementById('customBeadCount');
const beepCountInput = document.getElementById('beepCountInput');

function updateListCount() {
    document.getElementById('listCount').textContent = `목록 수: ${inputList.children.length}`;
}

function addInputToList() {
    const input = userInput.value.trim();
    if (input) {
        const item = document.createElement('div');
        item.className = 'inputItem';
        item.innerHTML = `
            <span class="itemText">${input} : 0</span>
            <button class="deleteButton">삭제</button>
            <button class="resetButton">리셋</button>`;
        item.dataset.count = 0;
        item.addEventListener('click', selectItem);
        item.addEventListener('contextmenu', showButtons);
        item.querySelector('.deleteButton').addEventListener('click', deleteItem);
        item.querySelector('.resetButton').addEventListener('click', resetItemCount);
        inputList.insertBefore(item, inputList.firstChild);  // Insert at the top
        userInput.value = '';
        updateListCount();
        selectItem({ target: item });  // Automatically select the newest item
    }
}

function deleteItem(e) {
    e.stopPropagation();  // Prevent triggering selectItem
    const itemToDelete = e.target.closest('.inputItem');
    inputList.removeChild(itemToDelete);
    updateListCount();
    if (selectedItem === itemToDelete) {
        selectedItem = null;  // Deselect if the selected item is deleted
    }
}

function resetItemCount(e) {
    e.stopPropagation();  // Prevent triggering selectItem
    const itemToReset = e.target.closest('.inputItem');
    itemToReset.dataset.count = 0;
    itemToReset.querySelector('.itemText').textContent = `${itemToReset.querySelector('.itemText').textContent.split(':')[0]} : 0`;
}

function selectItem(e) {
    if (selectedItem) {
        selectedItem.style.backgroundColor = '';
    }
    selectedItem = e.currentTarget || e.target;
    selectedItem.style.backgroundColor = 'lightblue';
    count = parseInt(selectedItem.dataset.count);
    countDisplay.textContent = `묵송 회수: ${count}`;
    resetBeadOrder();  // Reset bead lighting order
}

function showButtons(e) {
    e.preventDefault();
    const item = e.target.closest('.inputItem');
    const deleteButton = item.querySelector('.deleteButton');
    const resetButton = item.querySelector('.resetButton');
    deleteButton.style.display = 'block';
    resetButton.style.display = 'block';

    document.addEventListener('click', function hideButtons(event) {
        if (!item.contains(event.target) && !deleteButton.contains(event.target) && !resetButton.contains(event.target)) {
            deleteButton.style.display = 'none';
            resetButton.style.display = 'none';
            document.removeEventListener('click', hideButtons);
        }
    });
}

function createBeads() {
    const radius = 120;
    const centerX = 150;
    const centerY = 150;

    // Remove existing beads
    touchArea.querySelectorAll('.bead').forEach(bead => bead.remove());

    for (let i = 0; i < beadCount; i++) {
        const bead = document.createElement('div');
        bead.className = 'bead';
        bead.textContent = characters[i % characters.length];
        if (i === 0) {
            bead.classList.add('first-bead');
            bead.style.left = `${centerX - 17}px`; // Center the first bead
            bead.style.top = `${centerY - radius - 17}px`; // Place at 12 o'clock
        } else {
            const angle = (i / beadCount) * (2 * Math.PI) - Math.PI / 2;
            const x = centerX + radius * Math.cos(angle) - 14;
            const y = centerY + radius * Math.sin(angle) - 14;
            bead.style.left = `${x}px`;
            bead.style.top = `${y}px`;
        }
        touchArea.appendChild(bead);
    }
}

function lightUpBead() {
    const beads = document.querySelectorAll('.bead');
    beads.forEach(bead => bead.classList.remove('highlight'));
    if (beads.length > 0) {
        beads[currentBead].classList.add('highlight');
        currentBead = (currentBead + 1) % beads.length;
    }
    // Update 묵송 회수
    count++;
    countDisplay.textContent = `묵송 회수: ${count}`;
    if (selectedItem) {
        selectedItem.dataset.count = count;
        selectedItem.querySelector('.itemText').textContent = `${selectedItem.querySelector('.itemText').textContent.split(':')[0]} : ${count}`;
    }

    // Check if the count reaches the user-set beep threshold
    if (beepThreshold > 0 && count % beepThreshold === 0) {
        playBeep();
    }
}

function resetBeadOrder() {
    const beads = document.querySelectorAll('.bead');
    beads.forEach(bead => bead.classList.remove('highlight'));
    currentBead = 0;
}

// Play beep sound
function playBeep() {
    // Triggers a system sound using an alert dialog, which may produce a beep sound
    alert('Beep!');
}

// Event Listeners
beadCountSelector.addEventListener('change', (e) => {
    const value = e.target.value;
    if (value === 'custom') {
        customBeadCountInput.style.display = 'block';
        beadCount = parseInt(customBeadCountInput.value) || 21;
    } else {
        customBeadCountInput.style.display = 'none';
        beadCount = parseInt(value);
    }
    createBeads();
});

customBeadCountInput.addEventListener('input', (e) => {
    beadCount = parseInt(e.target.value) || 21;
    createBeads();
});

beepCountInput.addEventListener('input', (e) => {
    beepThreshold = parseInt(e.target.value);
});

touchArea.addEventListener('mousedown', lightUpBead);
inputButton.addEventListener('click', addInputToList);

// Initial bead creation
createBeads();
