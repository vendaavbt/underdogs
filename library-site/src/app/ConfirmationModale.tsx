import React, { FC } from 'react';

interface ConfirmationModalProps {
    isOpen: boolean;
    onCancel: () => void;
    onConfirm: () => void;
}

const ConfirmationModal: FC<ConfirmationModalProps> = ({ isOpen, onCancel, onConfirm }) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="modal">
            <div className="modal-content">
                <p>Êtes-vous sûr de vouloir supprimer cet utilisateur ?</p>
                <button onClick={onCancel}>Annuler </button>
                <button onClick={onConfirm}>Confirmer</button>
            </div>
        </div>
    );
};

export default ConfirmationModal;
