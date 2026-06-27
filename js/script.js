document.addEventListener("DOMContentLoaded", () => {
    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.15,
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animateElements = document.querySelectorAll(".animate-up");
    animateElements.forEach((el) => observer.observe(el));

    // --- سكربت البوب أب (Lightbox Modal) ---
    const modal = document.getElementById("mediaModal");
    const modalContent = document.getElementById("modalContent");
    const closeModal = document.querySelector(".close-modal");

    // نحدد كل الصور والفيديوهات اللي جوه قسم المعرض
    const mediaItems = document.querySelectorAll(
        ".media-item img, .media-item video",
    );

    mediaItems.forEach((item) => {
        item.addEventListener("click", function (e) {
            e.preventDefault(); // لمنع السلوك الافتراضي

            // إظهار النافذة
            modal.classList.add("show");

            // تفريغ المحتوى القديم عشان ما يظهرش فوق بعضه
            modalContent.innerHTML = "";

            // لو العنصر المضعوط عليه صورة
            if (this.tagName === "IMG") {
                const img = document.createElement("img");
                img.src = this.src;
                modalContent.appendChild(img);
            }
            // لو العنصر المضعوط عليه فيديو
            else if (this.tagName === "VIDEO") {
                const video = document.createElement("video");
                video.src = this.src;
                video.controls = true;
                video.autoplay = true; // تشغيل تلقائي لما يفتح
                modalContent.appendChild(video);
            }
        });
    });

    // دالة لإغلاق النافذة وتفريغ المحتوى (عشان الفيديو يقف)
    function hideModal() {
        modal.classList.remove("show");
        setTimeout(() => {
            modalContent.innerHTML = "";
        }, 300); // الانتظار حتى تنتهي حركة الإغلاق
    }

    // إغلاق لما ندوس على علامة X
    closeModal.addEventListener("click", hideModal);

    // إغلاق لما ندوس في أي مكان فاضي بره الصورة/الفيديو
    modal.addEventListener("click", function (e) {
        if (e.target === modal) {
            hideModal();
        }
    });

    // إغلاق لما ندوس على زرار ESC في الكيبورد
    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && modal.classList.contains("show")) {
            hideModal();
        }
    });
});