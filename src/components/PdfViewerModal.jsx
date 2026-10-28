import { useEffect } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

// Rendered into <body> so no transformed or filtered ancestor can become the
// containing block of its fixed overlay. Open while `url` is set; it keeps
// the last document on screen while it animates out.
export const PdfViewerModal = ({ title, url, onClose }) => {
  const open = Boolean(url);

  useEffect(() => {
    if (!open) return undefined;
    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={title}
            className="bg-background w-full max-w-5xl h-[85vh] rounded-xl shadow-2xl relative flex flex-col overflow-hidden"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0.15 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="font-semibold text-lg truncate pr-4">{title}</h3>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-secondary transition-colors"
                aria-label="Đóng"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 bg-secondary/20 relative">
              <iframe
                src={url}
                className="w-full h-full border-none"
                title={title}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
};

PdfViewerModal.propTypes = {
  title: PropTypes.string,
  url: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};
