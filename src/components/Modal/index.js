import React from 'react';

import ModalContainer from './ModalContainer';
import './styles.css';
import PageTitleContainer from '../../styles/PageTitleContainer';
import PageTitle from '../../styles/PageTitle';

/* ======== Styles ========== */
import {
    BaseModal,
    ModalContent,
    ModalCloseButton,
    FadeIn
} from './styles';
/* ======== Styles ========== */

const Modal = ({ fechaModalFunc, titulo, children }) => { 
    
    return (
        <ModalContainer>
            <FadeIn>
                <BaseModal className="animation-fadein">
                    <ModalContent>
                        <PageTitleContainer>
                            <PageTitle>{titulo}</PageTitle>
                            <ModalCloseButton onClick={fechaModalFunc}><i className="pi pi-times"></i></ModalCloseButton>
                        </PageTitleContainer>
                        
                        {children}
                    
                    </ModalContent>          
                </BaseModal>
            </FadeIn>
      </ModalContainer>
    );
}

export default Modal;