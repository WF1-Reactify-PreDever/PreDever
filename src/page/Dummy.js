import React from "react";
import { useState } from "react";
import LoginModal from "../modal/LoginModal";
import Header from "../component/Header";
import { Head } from "@react-email/components";

const Dummy = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false)

    const openModal = () => {
        setModalIsOpen(true)
    }

    const closeModal = (event) => {
        setModalIsOpen(false)
        // 이벤트 버블링을 막음
        event.stopPropagation()
    }

    return (
        <>
        <Header />
            <LoginModal
                isOpen={modalIsOpen}
                onRequestClose={closeModal} />
            <button onClick={openModal}>Login</button>
        </>
    )
}

export default Dummy;