import React, { useContext } from 'react';
import styled from 'styled-components';
import { AppContext } from '../../AppContext';

const ToastContainer = () => {
  const { toasts } = useContext(AppContext);

  return (
    <StyledToastWrapper>
      {toasts.map(toast => (
        <div key={toast.id} className={`toast ${toast.type}`}>
          <span className="toast-icon">
            {toast.type === 'success' && '✓'}
            {toast.type === 'warning' && '⚠'}
            {toast.type === 'info' && 'ℹ'}
          </span>
          <span className="toast-text">{toast.text}</span>
        </div>
      ))}
    </StyledToastWrapper>
  );
};

const StyledToastWrapper = styled.div`
  position: fixed;
  bottom: 25px;
  right: 25px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 9999;
  pointer-events: none;

  .toast {
    display: flex;
    align-items: center;
    gap: 10px;
    background: rgba(17, 24, 39, 0.95);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: #fff;
    padding: 12px 20px;
    border-radius: 8px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
    font-family: system-ui, sans-serif;
    font-size: 0.9rem;
    font-weight: 500;
    pointer-events: auto;
    animation: slideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .toast.success {
    border-left: 4px solid #10ac84;
    .toast-icon { color: #10ac84; }
  }

  .toast.warning {
    border-left: 4px solid #ff9f43;
    .toast-icon { color: #ff9f43; }
  }

  .toast.info {
    border-left: 4px solid #00d2ff;
    .toast-icon { color: #00d2ff; }
  }

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(20px) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
`;

export default ToastContainer;
