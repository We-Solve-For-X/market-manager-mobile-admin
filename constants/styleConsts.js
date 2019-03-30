import { StyleSheet } from 'react-native'
import colors from '../constants/colors'

export default styleConsts = StyleSheet.create({
    buttonBorder: {
        borderColor: colors.pBlack,
        borderWidth: 0.5
    },
    viewShadow:{
        shadowColor: 'black',
        shadowOffset: {width: 1, height: 1}, 
        shadowRadius: 5, 
        shadowOpacity: 0.3
    } 
  })
  