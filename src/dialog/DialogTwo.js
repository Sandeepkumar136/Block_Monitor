import { useDialog } from '../context/DialogContext';

const DialogTwo = () => {
    const { isOpen, closeDialog } = useDialog();

    const handleOutsideClick = (e) => {
        if (e.target.id === 'dialog-overlay-s') {
            closeDialog();
        }
    };

    return (
        isOpen && (
            <div id="dialog-overlay-s" onClick={handleOutsideClick}>
                <div id="dialog-box">
                    <div id="dialog-header">
                        <h2>Dialog Box</h2>
                        <button onClick={closeDialog}>X</button>
                    </div>
                    <div id="dialog-content">
                        <p>Dialog content goes here</p>
                    </div>
                </div>
            </div>
        )
    );
};

export default DialogTwo;
