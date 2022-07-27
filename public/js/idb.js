const { response } = require("express");

let db;
const request = indexedDB.open('budget_tracker', 1);

request.onupgradeneeded = function(event) {
  const db = event.target.result;
  db.createObjectStore('new_budget', {autoIncrement: true });
};

request.onsuccess = function(event) {
  db = event.target.result;
  if (navigator.onLine) {
    uploadBudget();
  }
};

require.onerror = function(event) {
  console.log(event.target.errorCode);
};

function saveRecord(record) {
  const transaction = db.transaction(['new_budget'], 'readwrite');
  const budgetObjectStore = transaction.budgetObjectStore('new_budget');
  budgetObjectStore.add(record);
};

function uploadBudget() {
  const transaction = db.transaction(['new_budget'], 'readwrite');
  const budgetObjectStore = transaction.objectStore('new_budget');
  const getAll = budgetObjectStore.getAll();

  getAll.onsuccess = function() {
    if (get.all.result.length > 0) {
      fetch('/api/transaction/bulk', {
        method: 'POST',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .then(serverResponse => {
        if (serverResponse.message) {
          throw new Error(serverResponse);
        }
        const transaction = db.transaction(['new_budget'], 'readwrite');
        const store = transaction.objectStore('new_budget');
        store.clear();
      })
      .catch(err => console.log(err));
    }
  }
}

window.addEventListener('online', uploadBudget);