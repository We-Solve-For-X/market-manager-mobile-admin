import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { NavigationBar } from "@shoutem/ui"
import { Title } from "@shoutem/ui"
//import Icon from '../icons/icons'
//  Config
import layout from '../../constants/layout'
import colors from '../../constants/colors'

export default HeaderScreen = ({title}) =>{
    return(
        <View style={styles.container}>
            <Title style={styles.text}>{title}</Title>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        height: 56,
        width: '100%',
        backgroundColor: colors.pGrey,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingBottom: 4
    },
    text: {
        color: colors.primary
    }
})
