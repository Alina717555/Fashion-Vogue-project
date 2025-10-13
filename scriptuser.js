document.addEventListener("DOMContentLoaded", () => {
  const formContainer = document.querySelector(".form-container");
  const form = document.getElementById("loginForm");
  const emailInput = document.getElementById("email");

  const fakeAccounts = {
    Google: [
      { name: 'Alina Amangeldiyeva', email: 'alina.amangeldiyeva@gmail.com' },
      { name: 'Dana Marat', email: 'dana.marat@vogue.com' }
    ],
    Apple: [
      { name: 'Makhmet Aisha', email: 'makhmet.a@icloud.com' }
    ],
    Facebook: [
      { name: 'Bakytkali Bayan', email: 'b.bakytkali@facebook.com' }
    ]
  };

  function finishLogin(provider) {
    formContainer.classList.add("loading");

    setTimeout(() => {
      console.log(`Login with ${provider} successful. Redirecting...`);
      window.location.href = 'home.html';
    }, 1500); 
  }

  function showAccountPicker(provider, accounts) {
    const backdrop = document.createElement('div');
    backdrop.className = 'account-picker-backdrop';

    let accountListHTML = '';
    accounts.forEach(account => {
      const initial = account.name.charAt(0);
      accountListHTML += `
        <li data-email="${account.email}">
          <div class="avatar">${initial}</div>
          <div class="user-info">
            <div class="user-name">${account.name}</div>
            <div class="user-email">${account.email}</div>
          </div>
        </li>
      `;
    });

    backdrop.innerHTML = `
      <div class="account-picker">
        <div class="account-picker-header">
          <h3>Choose an account</h3>
          <p>to continue to Your Website</p>
        </div>
        <ul class="account-list">
          ${accountListHTML}
        </ul>
      </div>
    `;

    document.body.appendChild(backdrop);

    backdrop.querySelectorAll('.account-list li').forEach(item => {
      item.addEventListener('click', () => {
        document.body.removeChild(backdrop);
        finishLogin(provider);
      });
    });

    backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) {
            document.body.removeChild(backdrop);
        }
    });
  }

  document.getElementById("googleBtn").addEventListener("click", () => {
    showAccountPicker("Google", fakeAccounts.Google);
  });

  document.getElementById("appleBtn").addEventListener("click", () => {
    showAccountPicker("Apple", fakeAccounts.Apple);
  });

  document.getElementById("facebookBtn").addEventListener("click", () => {
    showAccountPicker("Facebook", fakeAccounts.Facebook);
  });


  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = emailInput.value.trim();
    if (validateEmail(email)) {
      formContainer.innerHTML = `
        <img src="Images/blacklogo.png" alt="Vogue Logo" class="logo">
        <div class="welcome-message">
          <h2>Check Your Email</h2>
          <p>A sign-in link has been sent to:</p>
          <p><strong>${email}</strong></p>
        </div>
      `;
    } else {
      alert("❌ Please enter a valid email.");
    }
  });

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }
});