import { useSearchParams } from 'react-router-dom';

function TableMenu({ children, name, handleChange }) {
  let [searchParams] = useSearchParams();
  return (
    <th
      scope='col'
      onClick={() => handleChange(name)}
      style={{
        padding: '0',
        textAlign: 'center',
        position: 'relative',
        cursor: 'pointer',
      }}
    >
      <div className='table-menu'>
        <span>{children}</span>
        <span>
          {searchParams.get('sortBy') === name ? (
            searchParams.get('sortOrder') === 'desc' ? (
              <i className='fas fa-arrow-down'></i>
            ) : (
              <i className='fas fa-arrow-up'></i>
            )
          ) : (
            ''
          )}
        </span>
      </div>
    </th>
  );
}

export default TableMenu;
