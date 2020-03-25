import React from 'react';

import ModalContainer from './ModalContainer';
import './styles.css';

/* ======== Styles ========== */
import { BaseModal, ModalContent, ModalCloseButton } from './styles';
import { PageTitleContainer, PageTitle, FadeInAnimation } from '~/styles/globalStyles';

/* ======== Styles ========== */

const Modal = ({ fechaModalFunc, titulo, children }) => { 
    
    return (
        <ModalContainer>
            <FadeInAnimation>
                <BaseModal className="animation-fadein">
                    <ModalContent>
                        <PageTitleContainer>
                            <PageTitle>{titulo}</PageTitle>
                            <ModalCloseButton onClick={fechaModalFunc}><i className="pi pi-times"></i></ModalCloseButton>
                        </PageTitleContainer>
                        
                        {children}
                    
                    </ModalContent>          
                </BaseModal>
            </FadeInAnimation>
      </ModalContainer>
    );
}

export default Modal;