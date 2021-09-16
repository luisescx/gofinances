import React from "react";
import { FlatList } from "react-native";
import { Button } from "../../../components/Form/Button";
import { categories } from "../../../utils/categories";
import {
    Container,
    Header,
    Title,
    Category,
    Icon,
    Name,
    Separator,
    Footer,
} from "./styles";

interface Category {
    key: string;
    name: string;
}

interface Props {
    category: string;
    setCategory: (category: Category) => void;
    closeSelectCategory: () => void;
}

const CategorySelect = () => {
    return (
        <Container>
            <Header>
                <Title>Categoria</Title>
            </Header>

            <FlatList
                data={categories}
                keyExtractor={(item) => item.key}
                style={{ flex: 1, width: "100%" }}
                renderItem={({ item }) => (
                    <>
                        <Category>
                            <Icon name={item.icon} />
                            <Name>{item.name}</Name>
                        </Category>
                    </>
                )}
                ItemSeparatorComponent={() => <Separator />}
            />

            <Footer>
                <Button title="Selecionar" />
            </Footer>
        </Container>
    );
};

export default CategorySelect;
