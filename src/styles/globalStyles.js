import styled, { keyframes } from "styled-components";
import { slideInDown, slideOutUp, fadeInLeft } from "react-animations";

import BaseAnimation from "./BaseAnimation";

export const GridOptionsBar = styled.div`
  width: 100%;
  padding-bottom: 22px;
`;

export const PageContainer = styled.div`
  width: 100%;
  background: #fff;
  border-radius: 4px;
  padding: 8px;
  box-shadow: 2px 4px 12px #9e9e9e;
`;

export const PageTitle = styled.h5`
  font-size: 22px;
  font-weight: 500;
  color: #4e2a77;
`;

export const PageTitleContainer = styled.div`
  padding: 8px 10px;
  border-bottom: 1px solid #4e2a77;
  width: 100%;
  margin-bottom: 25px;
`;

/* ======== CSS do Modal ==========  */
export const ModalBodyContainer = styled.section`
  display: flex;
  flex-direction: row;
  border: 1px solid #ededed;
  border-radius: 4px;
`;

export const ModalHalfBordered = styled.div`
  width: 50%;
  border-right: 1px solid #ededed;
  padding: 8px;
`;

export const ModalHalfNoBorder = styled(ModalHalfBordered)`
  border: none;
`;

export const ModalBodyInner = styled.div`
  width: 100%;
  padding: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ModalReportTitleContainer = styled(PageTitleContainer)`
  color: #9e9e9e;
  border-bottom: 1px solid #9e9e9e;
`;

export const ModalReportTitle = styled(PageTitle)`
  font-size: 16px;
  color: #9e9e9e;
`;
/* ======== CSS do Modal ==========  */

/* ======== Animações ==========  */
const FadeInEffect = keyframes`  
  from { opacity: 0; }
  to { opacity: 1; }
`;

export const FadeInAnimation = styled(BaseAnimation)`
  animation-name: ${FadeInEffect};
`;

export const fadeInLeftEffect = keyframes`${fadeInLeft}`;
/* ======== Animações ==========  */
