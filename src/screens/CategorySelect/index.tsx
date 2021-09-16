import React from "react";
import { FlatList, StatusBar } from "react-native";
import { Button } from "../../components/Form/Button";
import { categories } from "../../utils/categories";
import theme from "../../global/styles/theme";
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
    category: Category;
    setCategory: (category: Category) => void;
    closeSelectCategory: () => void;
}

const CategorySelect = ({
    closeSelectCategory,
    setCategory,
    category,
}: Props) => {
    const handleSelectedCategory = (newCategory: Category) => {
        console.log(newCategory);
        setCategory(newCategory);
    };

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
                        <Category
                            onPress={() => handleSelectedCategory(item)}
                            isActive={category.key === item.key}
                        >
                            <Icon name={item.icon} />
                            <Name>{item.name}</Name>
                        </Category>
                    </>
                )}
                ItemSeparatorComponent={() => <Separator />}
            />

            <Footer>
                <Button title="Selecionar" onPress={closeSelectCategory} />
            </Footer>
        </Container>
    );
};

export default CategorySelect;
