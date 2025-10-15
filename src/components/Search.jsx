import { StyleSheet, TextInput, View } from 'react-native'
import { colors } from '../theme/colors'

const Search = ({ setKeyword, keyword }) => {
    return (
        <View style={styles.searchContainer}>
            <TextInput
                onChangeText={(text) => setKeyword(text)}
                placeholder='Buscar producto'
                style={styles.textInput}
                value={keyword}
            />
        </View>
    )
}

export default Search

const styles = StyleSheet.create({
    searchContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 8,
        marginBottom: 8,
    },
    textInput: {
        backgroundColor: colors.white,
        borderWidth: 1,
        borderColor: colors.BLACK,
        borderRadius: 16,
        width: "90%",
        paddingLeft: 10
    }
})