import { TitleBarPropType } from '@/types';
import { NavLink } from 'react-router-dom';

const TitleBar:React.FC<TitleBarPropType> = ({title, link}) => {
  return (
    <div className='flex justify-between md:mt-0 mt-5'>
      <h4 className='text-xl font-medium'>{title}</h4>
      <NavLink to={link} className={"text-[#D20606] flex gap-2 items-center"}>
        <span>View all</span>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='1.3em'
          height='1.3em'
          viewBox='0 0 24 24'>
          <path
            fill='#d20606'
            d='m13.292 12l-4.6-4.6l.708-.708L14.708 12L9.4 17.308l-.708-.708z'></path>
        </svg>
      </NavLink>
    </div>
  );
}

export default TitleBar;