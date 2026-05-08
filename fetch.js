
const fakeUsers = [
    { id: 1, name: "Aisha Rajan", email: "aisha@example.com", role: "Admin" },
    { id: 2, name: "Carlos Mendes", email: "carlos@example.com", role: "Editor" },
    { id: 3, name: "Priya Nair", email: "priya@example.com", role: "Viewer" },
    { id: 4, name: "Tom Eriksson", email: "tom@example.com", role: "Editor" },
    { id: 5, name: "Yuki Tanaka", email: "yuki@example.com", role: "Admin" },
];

function simulateFetch(data, delay = 1500) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(data);
        }, delay);
    });
}

function simulateFailedFetch(message = "Network Error: 503 Service Unavailable", delay = 1200) {
    return new Promise((_, reject) => {
        setTimeout(() => {
            reject(new Error(message));
        }, delay);
    });
}

async function handleFetch() {
    setLoading(true);

    const startTime = Date.now();

    try {
        const users = await simulateFetch(fakeUsers, 1800);

        const elapsed = Date.now() - startTime;
        showSuccess(`Fetched ${users.length} users in ${elapsed}ms`, elapsed);
        renderUsers(users);

    } catch (error) {
        showError(error.message);
    } finally {
        setLoading(false);
    }
}

async function handleFail() {
    setLoading(true);

    try {
        await simulateFailedFetch("Network Error: 503 Service Unavailable", 1400);

    } catch (error) {
        showError(error.message);

    } finally {
        setLoading(false);
    }
}
function handleReset() {
    document.getElementById("status").className = "status hidden";
    document.getElementById("status").textContent = "";
    document.getElementById("output").classList.add("hidden");
    document.getElementById("userList").innerHTML = "";
    document.getElementById("timeTaken").textContent = "";
    setButtonsDisabled(false);
}
function setLoading(isLoading) {
    const status = document.getElementById("status");
    setButtonsDisabled(isLoading);

    if (isLoading) {
        status.innerHTML = '<span class="spinner"></span> Fetching data…';
        status.className = "status loading";
    }
}

function showSuccess(message, elapsed) {
    const status = document.getElementById("status");
    status.textContent = "✓ " + message;
    status.className = "status success";
}

function showError(message) {
    const status = document.getElementById("status");
    status.textContent = "✕ " + message;
    status.className = "status error";
}

function setButtonsDisabled(disabled) {
    document.getElementById("fetchBtn").disabled = disabled;
    document.getElementById("failBtn").disabled = disabled;
    document.getElementById("resetBtn").disabled = disabled;
}

function renderUsers(users) {
    const list = document.getElementById("userList");
    const output = document.getElementById("output");
    const timeTaken = document.getElementById("timeTaken");

    list.innerHTML = "";
    timeTaken.textContent = `${users.length} records`;

    users.forEach((user, index) => {
        const initials = user.name.split(" ").map(n => n[0]).join("").toUpperCase();

        const li = document.createElement("li");
        li.style.animationDelay = `${index * 60}ms`;
        li.innerHTML = `
      <div class="user-avatar">${initials}</div>
      <div class="user-info">
        <span class="user-name">${user.name}</span>
        <span class="user-email">${user.email}</span>
      </div>
      <span class="user-role">${user.role}</span>
    `;
        list.appendChild(li);
    });

    output.classList.remove("hidden");
}