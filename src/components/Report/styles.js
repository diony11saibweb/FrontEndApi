import styled from '@react-pdf/styled-components';

export const ReportContainer = styled.Page`
    padding: 8px;
    display: flex;
`;

export const Header = styled.View`
    display: flex;
    width: 100%;
    padding: 8px;
    border: 1px solid #ededed;
    flex-direction: column;
`;

export const TenantLogoContainer = styled.View`
    width: 100%;
    display: flex;
    align-items: center;
`;

export const TenantLogo = styled.Image`
    width: 120px;
    height: 68px;    
`;

export const HeaderTextContainer = styled.View`
    display: flex;
    flex-direction: column;
    padding: 0 12px;
    align-items: center;
`;

export const HeaderText = styled.Text`
    line-height: 2px;
    font-size: 14px;
    font-weight: bold;
`;

export const HeaderTextSubTitle = styled.Text`
    font-size: 12px;
    line-height: 2px;
`;

export const TitleContainer = styled.View`
    text-align: center;
    width: 100%;
    margin: 12px 0;
`;

export const Title = styled.Text`
    font-size: 18px;
    font-weight: bold;
`;

export const PageHeaderContainer = styled.View`
    display: flex;
    flex-direction: row;
    padding: 4px 12px;
    margin: 12px 0;    
    align-items: center;
`;

export const PageHeaderTextBox = styled.View`
    display: flex;
    width: 50%;
`;

export const PageHeaderText = styled.Text`
    font-size: 14px;
    font-weight: bold;
    text-align: center;
`;

export const DetailsHeaderContainer = styled.View`
    border: 1px solid #9e9e9e;
    background-color: #ededed;    
    display: flex;
    flex-direction: row;
`;

export const DetailsHeaderCell = styled.View`
    display: flex;    
    padding: 4px 12px;
`;

export const DetailsText = styled.Text`
    font-size: 12px;
`;

export const DetailsContainer = styled.View`       
    display: flex;
    flex-direction: row;
    padding: 4px 12px;
    margin-top: 10px;
`;

export const DetailsLineSeparator = styled.View`
    display: flex;    
    width: 100%;
    border: 1px solid #ededed;
`;