import React from "react";

import {
    Container,
    Header,
    UserWrapper,
    UserInfo,
    Photo,
    User,
    UserGreeting,
    UserName,
    Icon,
    HighlightCards,
} from "./styles";
import { TouchableOpacity } from "react-native";
import Highlight from "../components/HighlightCard";

const Dashboard = () => {
    return (
        <Container>
            <Header>
                <UserWrapper>
                    <UserInfo>
                        <Photo
                            source={{ uri: "https://github.com/luisescx.png" }}
                        />

                        <User>
                            <UserGreeting>Olá,</UserGreeting>
                            <UserName>Luis</UserName>
                        </User>
                    </UserInfo>
                    <TouchableOpacity>
                        <Icon name="power" />
                    </TouchableOpacity>
                </UserWrapper>
            </Header>

            <HighlightCards>
                <Highlight />
                <Highlight />
                <Highlight />
            </HighlightCards>
        </Container>
    );
};

export default Dashboard;
