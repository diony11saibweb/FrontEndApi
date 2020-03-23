import React from 'react';
import styled from 'styled-components';

import PageContainer from '../styles/PageContainer';

const Page = styled(PageContainer)`

`;


const Home = () => {
    return (
        <Page>
            <h1>Hello World!!</h1>
        </Page>
    )
};

export default Home;