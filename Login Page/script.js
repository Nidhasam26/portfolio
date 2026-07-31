const signUpButton = document.getElementById('signup');
const signInButton = document.getElementById('signin');
const container = document.getElementById('container');

if (signUpButton && signInButton && container) {
  signUpButton.addEventListener('click', () => {
    container.classList.add('active');
  });

  signInButton.addEventListener('click', () => {
    container.classList.remove('active');
  });
}
