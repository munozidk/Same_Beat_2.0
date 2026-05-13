import React from 'react';
import './ActionButton.css';

interface ActionButtonProps {
    label: string;
    onClick: () => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({ label, onClick }) => {
    return (
        <button className="lime-action-btn" onClick={onClick}>
            {label}
        </button>
    );
};

export default ActionButton;
