export function showErrorDialog(message, duration = 3000) {
    // Prevent duplicate toasts
    if (document.querySelector("#global-error-toast")) return;

    // Create container
    const toast = document.createElement("div");
    toast.id = "global-error-toast";
    toast.className =
        "fixed top-5 right-5 z-50 flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 shadow-lg max-w-sm animate-slide-in";

    toast.innerHTML = `
        <div class="flex h-8 w-8 items-center justify-center rounded-full bg-red-100 text-red-600">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            stroke-width="2" stroke="currentColor" class="h-5 w-5">
            <path stroke-linecap="round" stroke-linejoin="round"
            d="M12 9v2m0 4h.01M4.93 4.93l14.14 14.14M12 22C6.48 22 2 17.52 2 12S6.48 2 12 2s10 4.48 10 10-4.48 10-10 10z" />
        </svg>
        </div>
        <div class="flex-1">
        <p class="font-medium text-red-700">Error</p>
        <p class="text-sm text-red-600">${message || "An unexpected error occurred."}</p>
        </div>
        <button id="close-toast" class="ml-2 text-gray-400 hover:text-gray-600">✕</button>
    `;

    document.body.appendChild(toast);

    // Add animation style once
    if (!document.getElementById("toast-anim-style")) {
        const style = document.createElement("style");
        style.id = "toast-anim-style";
        style.innerHTML = `
        @keyframes slideIn {
            from { opacity: 0; transform: translateX(20px); }
            to { opacity: 1; transform: translateX(0); }
        }
        .animate-slide-in {
            animation: slideIn 0.3s ease-out;
        }
        `;
        document.head.appendChild(style);
    }

    // Auto close after duration
    const timer = setTimeout(() => closeToast(), duration);

    // Close handler
    function closeToast() {
        if (!toast) return;
        toast.style.transition = "opacity 0.3s ease";
        toast.style.opacity = "0";
        setTimeout(() => toast.remove(), 300);
        clearTimeout(timer);
    }

    // Manual close button
    toast.querySelector("#close-toast").addEventListener("click", closeToast);
    }
