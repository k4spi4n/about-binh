import { X, FileText, Download } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLoading } from "../contexts/LoadingContext";
import PropTypes from "prop-types";

export const CVDownloadModal = ({ isOpen, onClose }) => {
  const { triggerLoading } = useLoading();

  const handleDownload = (lang) => {
    onClose();
    const filename = lang === "vi" ? "CV-2026-VI.pdf" : "CV-2026-EN.pdf";
    const downloadName =
      lang === "vi" ? "Thai Binh - CV (Vietnamese).pdf" : "Thai Binh - CV (English).pdf";
    const cvUrl = `${import.meta.env.BASE_URL}documents/${filename}`;

    triggerLoading(() => {
      const link = document.createElement("a");
      link.href = cvUrl;
      link.download = downloadName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-xs"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", duration: 0.4 }}
            className="relative w-full max-w-md overflow-hidden rounded-2xl bg-card border border-border p-6 shadow-2xl z-10"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors duration-200"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            {/* Header */}
            <div className="mb-6 text-center">
              <h3 className="text-xl font-bold text-foreground">
                Tải xuống CV / Download CV
              </h3>
              <p className="text-sm text-muted-foreground mt-2">
                Vui lòng chọn phiên bản ngôn ngữ bạn muốn tải xuống:
              </p>
            </div>

            {/* Options */}
            <div className="space-y-4">
              {/* Vietnamese Option */}
              <button
                onClick={() => handleDownload("vi")}
                className="w-full flex items-center justify-between p-4 rounded-xl bg-secondary/30 border border-border/50 hover:border-primary hover:bg-secondary/60 transition-all duration-300 group text-left cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:scale-110 transition-transform duration-300">
                    <FileText size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Tiếng Việt</h4>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Bản tiếng Việt đầy đủ
                    </p>
                  </div>
                </div>
                <Download
                  size={18}
                  className="text-muted-foreground group-hover:text-primary transition-colors"
                />
              </button>

              {/* English Option */}
              <button
                onClick={() => handleDownload("en")}
                className="w-full flex items-center justify-between p-4 rounded-xl bg-secondary/30 border border-border/50 hover:border-primary hover:bg-secondary/60 transition-all duration-300 group text-left cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:scale-110 transition-transform duration-300">
                    <FileText size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">English</h4>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Full English version
                    </p>
                  </div>
                </div>
                <Download
                  size={18}
                  className="text-muted-foreground group-hover:text-primary transition-colors"
                />
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

CVDownloadModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
