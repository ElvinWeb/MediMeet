import PropTypes from "prop-types";
import { useEffect, useState, useCallback, useRef } from "react";

const ConfirmationModal = ({
  isOpen,
  onCancel,
  onConfirm,
  actionType,
  title,
  message,
  confirmText,
  cancelText,
  isLoading = false,
  variant = "destructive",
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const modalRef = useRef(null);
  const confirmButtonRef = useRef(null);

  const getDefaultContent = () => {
    switch (actionType) {
      case "logout":
        return {
          title: "Confirm Logout",
          message:
            "Are you sure you want to logout? You will need to sign in again to access your dashboard.",
          confirmText: "Logout",
          icon: "logout",
        };
      case "delete":
        return {
          title: "Confirm Deletion",
          message:
            "Are you sure you want to delete this item? This action cannot be undone.",
          confirmText: "Delete",
          icon: "trash",
        };
      default:
        return {
          title: "Confirm Action",
          message: "Are you sure you want to proceed with this action?",
          confirmText: "Confirm",
          icon: "warning",
        };
    }
  };

  const defaultContent = getDefaultContent();
  const modalTitle = title || defaultContent.title;
  const modalMessage = message || defaultContent.message;
  const modalConfirmText = confirmText || defaultContent.confirmText;
  const modalCancelText = cancelText || "Cancel";

  const variantStyles = {
    destructive: {
      iconColor: "text-red-600",
      iconBg: "bg-red-100",
      confirmButton: "bg-red-600 hover:bg-red-700",
    },
  };

  const styles = variantStyles[variant] || variantStyles.destructive;

  const getIcon = () => {
    switch (defaultContent.icon) {
      case "logout":
        return (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
        );
      case "trash":
        return (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        );
      default:
        return (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 15.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        );
    }
  };

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setIsAnimating(true);
      setTimeout(() => {
        confirmButtonRef.current?.focus();
        setIsAnimating(false);
      }, 150);
    } else {
      setIsAnimating(true);
      setTimeout(() => {
        setIsVisible(false);
        setIsAnimating(false);
      }, 150);
    }
  }, [isOpen]);

  const handleEscape = useCallback(
    (e) => {
      if (e.key === "Escape" && !isLoading) {
        onCancel();
      }
    },
    [onCancel, isLoading]
  );

  const handleBackdropClick = useCallback(
    (e) => {
      if (e.target === e.currentTarget && !isLoading) {
        onCancel();
      }
    },
    [onCancel, isLoading]
  );

  const handleConfirm = useCallback(async () => {
    try {
      await onConfirm();
    } catch (error) {
      console.error("Confirmation action failed:", error);
    }
  }, [onConfirm]);

  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleEscape);
    } else {
      document.body.style.overflow = "unset";
      document.removeEventListener("keydown", handleEscape);
    }

    return () => {
      document.body.style.overflow = "unset";
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isVisible, handleEscape]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-150 ease-out ${
        isOpen ? "opacity-100" : "opacity-0"
      }`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div
        className={`absolute inset-0 bg-black transition-opacity duration-150 ease-out ${
          isOpen ? "opacity-30" : "opacity-0"
        }`}
        onClick={handleBackdropClick}
        aria-hidden="true"
      />

      <div
        ref={modalRef}
        className={`relative w-full max-w-md transform transition-all duration-150 ease-out ${
          isOpen
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-4 scale-95"
        }`}
      >
        <div className="relative bg-white rounded-lg shadow-xl border border-gray-200 dark:bg-gray-800 dark:border-gray-600">
          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className="absolute top-3 right-3 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed group"
            aria-label="Close modal"
          >
            <svg
              className="w-3 h-3 transition-transform duration-150 group-hover:scale-110"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
          </button>

          <div className="p-6 text-center">
            <div
              className={`mx-auto mb-4 w-12 h-12 ${
                styles.iconBg
              } rounded-full flex items-center justify-center transition-all duration-300 ${
                isOpen ? "scale-100 rotate-0" : "scale-0 rotate-180"
              }`}
            >
              <div
                className={`${styles.iconColor} transition-colors duration-150`}
              >
                {getIcon()}
              </div>
            </div>

            <h3
              id="modal-title"
              className={`mb-2 text-lg font-semibold text-gray-900 dark:text-white transition-all duration-200 delay-75 ${
                isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
              }`}
            >
              {modalTitle}
            </h3>

            <p
              id="modal-description"
              className={`mb-6 text-sm text-gray-500 dark:text-gray-400 leading-relaxed transition-all duration-200 delay-100 ${
                isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
              }`}
            >
              {modalMessage}
            </p>

            <div
              className={`flex flex-col sm:flex-row gap-3 justify-center transition-all duration-200 delay-150 ${
                isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
              }`}
            >
              <button
                ref={confirmButtonRef}
                onClick={handleConfirm}
                disabled={isLoading}
                type="button"
                className={`relative inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-white rounded-lg transition-all duration-150 hover:scale-105 focus:outline-none ${styles.confirmButton} disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 min-w-[100px]`}
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  <span className="transition-transform duration-150">
                    {modalConfirmText}
                  </span>
                )}
              </button>

              <button
                onClick={onCancel}
                disabled={isLoading}
                type="button"
                className="px-5 py-2.5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-gray-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 transition-all duration-150 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 min-w-[100px]"
              >
                <span className="transition-transform duration-150">
                  {modalCancelText}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ConfirmationModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  actionType: PropTypes.oneOf(["logout", "delete", "custom"]),
  title: PropTypes.string,
  message: PropTypes.string,
  confirmText: PropTypes.string,
  cancelText: PropTypes.string,
  isLoading: PropTypes.bool,
  variant: PropTypes.string,
};

export default ConfirmationModal;
