import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'
import Button from './Button'

const Header = ({title, onToggle, showAdd}) => {
  const location = useLocation()
  return (
    <header className='header'>
        <h1 >{title}</h1>
       {location.pathname === '/' && <Button
       onClick = {onToggle} 
       color={showAdd ? 'red' : 'green'} 
       text={showAdd ? 'Cancel' : 'Add'}/>}
    </header>
  )
}

Header.defaultProps = {
    title: 'Task Tracker'
}

Header.propTypes  = { 
    title: PropTypes.string.isRequired
}

//CSS STYLE IN JS
// const headingStyle = {
//     color: 'red',
//     backgroundColor: 'black'
// }

export default Header
