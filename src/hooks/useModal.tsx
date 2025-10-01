import { type ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";

const useModal = () => {
	const [show, setShow] = useState<boolean>(false);

	const openModal = () => setShow(true);
	const closeModal = () => setShow(false);

	useEffect(() => {
		if (show) {
			document.body.classList.add("overflow-hidden");
		} else {
			document.body.classList.remove("overflow-hidden");
		}

		return () => {
			document.body.classList.remove("overflow-hidden");
		};
	}, [show]);

	const Modal = ({ children }: { children: ReactNode }) => {
		if (!show) return null;
		return createPortal(
			<div className="fixed inset-0 flex justify-center items-center z-50">
				<div
					className="fixed inset-0 bg-neutral-700 opacity-50"
					onClick={closeModal}
					onKeyDown={(e) => {
						if (e.key === "Enter" || e.key === " ") {
							closeModal();
						}
					}}
					aria-label="モーダルを閉じる"
				/>
				<div className="relative z-10">{children}</div>
			</div>,
			document.getElementById("root"),
		);
	};

	return { Modal, openModal, closeModal };
};

export default useModal;
