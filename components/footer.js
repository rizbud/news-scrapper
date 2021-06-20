import { memo } from 'react'

const Footer = props => {
  return (
    <footer className="flex flex-col items-center justify-center mt-10 py-5 border-t border-gray-200 mx-5">
      Copyright &copy; {new Date().getFullYear()}. Allright Reserved
    </footer>
  )
}

export default memo(Footer)