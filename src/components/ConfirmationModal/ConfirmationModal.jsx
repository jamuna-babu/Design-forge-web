import { Modal } from "antd";

const ConfirmationModal = ({
  title = "Confirmation Modal",
  content,
  ...props
}) => {
  return (
    <Modal title={title} {...props}>
      {content}
    </Modal>
  );
};

export default ConfirmationModal;
