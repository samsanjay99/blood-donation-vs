// Function to open modals
function openModal(modalId) {
    document.querySelectorAll('.fixed').forEach(modal => modal.classList.add('hidden'));
    document.getElementById(modalId).classList.remove('hidden');
  }
  
  // Function to close modals when clicking outside the modal content
  document.querySelectorAll('.fixed').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.add('hidden');
      }
    });
  });
  
  // Attach event listeners to links
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const modalId = link.getAttribute('href').substring(1);
      openModal(modalId);
    });
  });
  
  // Admin login functionality
  document.getElementById('admin-login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const adminName = document.getElementById('admin-name').value;
    const adminPassword = document.getElementById('admin-password').value;
  
    if (adminName === 'sanjay' && adminPassword === 'sanjay123') {
      alert('Admin login successful!');
      document.getElementById('admin-login').classList.add('hidden');
    } else {
      alert('Invalid admin credentials');
    }
  });
  
