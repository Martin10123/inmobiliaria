import type { ReactNode } from 'react'
import { X } from 'lucide-react'
import { useModal } from '../../hooks/useModal'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  description?: string
  children: ReactNode
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl'
  closeOnOutsideClick?: boolean
  closeOnEscape?: boolean
  showCloseButton?: boolean
}

/**
 * Componente Modal reutilizable
 * - Bloquea scroll automáticamente
 * - Se puede cerrar haciendo click fuera (opcional)
 * - Se puede cerrar con ESC (opcional)
 * - Tamaños predefinidos
 * 
 * @example
 * <Modal isOpen={isOpen} onClose={handleClose} title="Mi Modal">
 *   <p>Contenido del modal</p>
 * </Modal>
 */
export function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  maxWidth = '2xl',
  closeOnOutsideClick = true,
  closeOnEscape = true,
  showCloseButton = true
}: ModalProps) {
  const { contentRef, handleBackdropClick } = useModal({
    isOpen,
    onClose,
    closeOnOutsideClick,
    closeOnEscape
  })

  if (!isOpen) return null

  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
    '4xl': 'max-w-4xl'
  }

  return (
    <div
      className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div
        ref={contentRef}
        className={`bg-white rounded-lg shadow-xl ${maxWidthClasses[maxWidth]} w-full max-h-[90vh] overflow-hidden flex flex-col`}
      >
        {/* Header */}
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div>
              {title && (
                <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
              )}
              {description && (
                <p className="text-sm text-gray-600 mt-1">{description}</p>
              )}
            </div>
            {showCloseButton && (
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Cerrar modal"
              >
                <X className="w-6 h-6" />
              </button>
            )}
          </div>
        )}

        {/* Content */}
        <div className="overflow-y-auto flex-1">
          {children}
        </div>
      </div>
    </div>
  )
}
