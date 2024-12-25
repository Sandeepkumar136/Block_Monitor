import { useSDialog } from "../context/Setting_dialgue";

const DialogTwo = () => {
    const { issOpen, closesDialog } = useSDialog();

    const handleOutsideClick = (e) => {
        if (e.target.id === 'dialog-overlay-s') {
            closesDialog();
        }
    };

    return (
        issOpen && (
            <div id="dialog-overlay-s" onClick={handleOutsideClick}>
                <div id="dialog-box-s">
                    <div id="dialog-header-s">
                        <h2>Dialog Box</h2>
                        <button onClick={closesDialog}>X</button>
                    </div>
                    <div id="dialog-content-s">
                        <p>Dialog content goes here</p>
                    </div>
                </div>
            </div>
        )
    );
};

export default DialogTwo;
