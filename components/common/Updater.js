import React from 'react'
import { NavigationEvents } from 'react-navigation'
import PropTypes from 'prop-types'

const Updater = (props) => {
  const { shouldRefresh, onRefresh, doneRefresh } = props

  if (shouldRefresh) {
    return (
    <NavigationEvents
      onWillFocus={async () => {
        await onRefresh()
        await doneRefresh()
      }}
    />)
 } else {
    return (null)
 }
}

// ViewLoad.propTypes = {
//   children: PropTypes.oneOfType([
//     PropTypes.string,
//     PropTypes.element,
//     PropTypes.number,
//     PropTypes.arrayOf(PropTypes.oneOfType([
//       PropTypes.string,
//       PropTypes.number,
//       PropTypes.element,
//     ])),
//   ]).isRequired,
//   style: View.propTypes.style,
//   hide: PropTypes.bool,
// };

export default Updater