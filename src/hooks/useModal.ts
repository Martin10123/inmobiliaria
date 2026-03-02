import { useEffect, useRef, useCallback } from 'react'

interface UseModalOptions {
  isOpen: boolean
  onClose: () => void
  closeOnOutsideClick?: boolean
  closeOnEscape?: boolean
}

/**
 * Hook personalizado para gestionar modales
 * - Bloquea el scroll del body cuando el modal está abierto
 * - Permite cerrar el modal haciendo click fuera de él
 * - Permite cerrar el modal presionando ESC
 * 
 * @example
 * const modalRef = useModal({ isOpen, onClose })
 * 
 * return (
 *   <div onClick={(e) => modalRef.handleBackdropClick(e)}>
 *     <div ref={modalRef.contentRef}>
 *       Modal content
 *     </div>
 *   </div>
 * )
 */
export function useModal({
  isOpen,
  onClose,
  closeOnOutsideClick = true,
  closeOnEscape = true
}: UseModalOptions) {
  const contentRef = useRef<HTMLDivElement>(null)

  // Bloquear scroll del body cuando el modal está abierto
  useEffect(() => {
    if (isOpen) {
      // Guardar el scroll actual
      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth
      
      // Bloquear scroll
      document.body.style.overflow = 'hidden'
      
      // Prevenir shift de layout por la barra de scroll
      if (scrollBarWidth > 0) {
        document.body.style.paddingRight = `${scrollBarWidth}px`
      }
    } else {
      // Restaurar scroll
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
    }

    // Cleanup cuando el componente se desmonta
    return () => {
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
    }
  }, [isOpen])

  // Cerrar al presionar ESC
  useEffect(() => {
    if (!isOpen || !closeOnEscape) return

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, closeOnEscape, onClose])

  // Handler para click en el backdrop
  const handleBackdropClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!closeOnOutsideClick) return
      
      // Solo cerrar si se hace click en el backdrop, no en el contenido
      if (contentRef.current && !contentRef.current.contains(e.target as Node)) {
        onClose()
      }
    },
    [closeOnOutsideClick, onClose]
  )

  return {
    contentRef,
    handleBackdropClick
  }
}
