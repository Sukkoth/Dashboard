const ConfirmationModal = () => {
    return (
        <div class='modal-body'>
            <h5>Popover in a modal</h5>
            <hr />
            <h5>Tooltips in a modal</h5>
            <p>
                <a href='#' class='tooltip-test' title='Tooltip'>
                    This link
                </a>
                and
                <a href='#' class='tooltip-test' title='Tooltip'>
                    that link
                </a>
                have tooltips on hover.
            </p>
        </div>
    );
};

export default ConfirmationModal;
