const overlay = document.getElementById('modalOverlay');
        const openBtn = document.getElementById('openBtn');
        const closeBtn = document.getElementById('closeBtn');
        const quoteForm = document.getElementById('quoteForm');
        const submitBtn = document.getElementById('submitBtn');
        const formContent = document.getElementById('formContent');
        const successMessage = document.getElementById('successMessage');
        const errorMessage = document.getElementById('errorMessage');

        // Abrir Modal
        openBtn.onclick = () => {
            overlay.classList.add('active');
            document.body.classList.add('modal-open');
        };

        // Cerrar Modal
        const closeModalFunc = () => {
            overlay.classList.remove('active');
            document.body.classList.remove('modal-open');
            // Resetear tras animación
            setTimeout(() => {
                formContent.classList.remove('hidden');
                successMessage.style.display = 'none';
                quoteForm.reset();
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Enviar Solicitud';
            }, 300);
        };

        closeBtn.onclick = closeModalFunc;

        // Cerrar al clickear fuera del contenedor blanco
        overlay.onclick = (e) => {
            if (e.target === overlay) closeModalFunc();
        };

        // Manejo del Envío
        quoteForm.onsubmit = async (e) => {
            e.preventDefault();
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Enviando...';
            errorMessage.style.display = 'none';

            const formData = new FormData(quoteForm);

            try {
                const response = await fetch(quoteForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    formContent.classList.add('hidden');
                    successMessage.style.display = 'block';
                } else {
                    throw new Error('Error de red');
                }
            } catch (err) {
                errorMessage.style.display = 'block';
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Reintentar';
            }
        };