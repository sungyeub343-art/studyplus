const form = document.querySelector('#consult-form');
const toast = document.querySelector('#toast');

if (form && toast) {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const submitButton = form.querySelector('.submit-button');
    submitButton.disabled = true;

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });

      if (!response.ok) {
        throw new Error('Form submission failed');
      }

      form.reset();
      toast.textContent = '상담 신청이 접수되었습니다. 곧 연락드릴게요.';
      toast.classList.add('show');
      window.setTimeout(() => toast.classList.remove('show'), 3500);
    } catch (error) {
      toast.textContent = '전송에 실패했습니다. 잠시 후 다시 시도해주세요.';
      toast.classList.add('show');
      window.setTimeout(() => toast.classList.remove('show'), 3500);
    } finally {
      submitButton.disabled = false;
    }
  });
}

document.querySelectorAll('.menu-button').forEach((button) => {
  button.addEventListener('click', () => {
    const nav = document.querySelector('.nav-links');
    nav.classList.toggle('mobile-open');
  });
});
