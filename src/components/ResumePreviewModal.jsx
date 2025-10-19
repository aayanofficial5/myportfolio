import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { createPortal } from "react-dom";

const ResumePreviewModal = ({ isOpen, onClose, pdfUrl }) => {
  const modalRef = useRef(null);

  // ESC key listener
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleEsc);
    }

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  // Body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Focus management
  useEffect(() => {
    if (isOpen && modalRef.current) {
      const firstFocusable = modalRef.current.querySelector('button, a, [tabindex]:not([tabindex="-1"])');
      if (firstFocusable) {
        firstFocusable.focus();
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-50 backdrop-blur-lg bg-black/60"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              ref={modalRef}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
              className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] flex flex-col overflow-hidden"
            >
              {/* Header */}
              <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
                <h2
                  id="modal-title"
                  className="text-2xl font-bold text-gray-900 dark:text-gray-100"
                >
                  Resume Preview
                </h2>
                <button
                  onClick={onClose}
                  aria-label="Close resume preview"
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <X size={24} className="text-gray-600 dark:text-gray-400" />
                </button>
              </div>

              {/* PDF Preview Area */}
              <div className="flex-1 overflow-hidden p-4">
                <iframe
                  src={pdfUrl}
                  title="Resume Preview"
                  className="w-full h-full border-0 rounded-lg"
                  onError={() => {
                    console.error("Failed to load PDF");
                  }}
                />
                {/* Fallback message would require state management */}
              </div>

              {/* Footer */}
              <div className="flex justify-end gap-4 p-6 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={onClose}
                  className="px-6 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all font-medium"
                >
                  Close
                </button>
                <a
                  href={pdfUrl}
                  download="Resume.pdf"
                  className="px-6 py-3 rounded-lg bg-secondary hover:bg-secondary/90 text-white font-medium transition-all shadow-md"
                >
                  Download PDF
                </a>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
};

export default ResumePreviewModal;
