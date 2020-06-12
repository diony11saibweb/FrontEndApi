import React from 'react';

import ModalContainer from './ModalContainer';
// import './styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/* ======== Styles ========== */
import { BaseModal, ModalContent, ModalCloseButton, TitleBar, CModal } from './styles';
import { PageTitleContainer, PageTitle, FadeInAnimation } from '~/styles/globalStyles';

/* ======== Styles ========== */

const Modal = ({
    isOpen,
    closeDialogFn,
    title,
    size,
    children,
}) => { 
    
    const getDialogSize = () => {
        let dialogSize = '32%';

        switch (size) {
            case 'sm':
                dialogSize = '32%';
                break;
            case 'md':
                dialogSize = '50%';
                break;
            case 'lg':
                dialogSize = '80%';
                break;
        
            default:
                break;                
        }
        return dialogSize;
    }

    return (
        <ModalContainer>
            <BaseModal isOpen={isOpen}>
                <ModalContent size={getDialogSize}>
                    {/* <PageTitleContainer>
                        <PageTitle>{titulo}</PageTitle>
                        <ModalCloseButton onClick={fechaModalFunc}>
                            <FontAwesomeIcon icon="times" />
                        </ModalCloseButton>
                    </PageTitleContainer> */}

                    <TitleBar wd="100%">
                        <h1>{title}</h1>
                        <button type="button" onClick={closeDialogFn}>
                            <FontAwesomeIcon icon="times"color="#61098a" />
                        </button>
                    </TitleBar>
                    
                    <CModal wd="100%" hg="450px">
                        {children}
                    </CModal>
                
                </ModalContent>          
            </BaseModal>
      </ModalContainer>
    );
}

export default Modal;