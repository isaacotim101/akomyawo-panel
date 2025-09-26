// ** Icons Import

const Footer = () => {
  return (
    <p className='clearfix mb-0'>
      <span className='float-md-start d-block d-md-inline-block mt-25'>
        COPYRIGHT © {new Date().getFullYear()}{' '}
        <a href='https://Akomwayo Ministries.com' target='_blank' rel='noopener noreferrer'>
          Akomwayo Ministries
        </a>
        <span className='d-none d-sm-inline-block'>, All rights Reserved</span>
      </span>
      <span className='float-md-end d-none d-md-block'>
        Version 1.0
        </span>
    </p>
  )
}

export default Footer
