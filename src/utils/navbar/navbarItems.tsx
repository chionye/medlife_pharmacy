
export const NavbarItems = [
  {
    to: "/dashboard/home",
    icon: (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='1.2em'
        height='1.2em'
        viewBox='0 0 24 24'>
        <path
          fill='none'
          stroke='currentColor'
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={1.5}
          d='M8.557 2.75H4.682A1.93 1.93 0 0 0 2.75 4.682v3.875a1.94 1.94 0 0 0 1.932 1.942h3.875a1.94 1.94 0 0 0 1.942-1.942V4.682A1.94 1.94 0 0 0 8.557 2.75m10.761 0h-3.875a1.94 1.94 0 0 0-1.942 1.932v3.875a1.943 1.943 0 0 0 1.942 1.942h3.875a1.94 1.94 0 0 0 1.932-1.942V4.682a1.93 1.93 0 0 0-1.932-1.932m0 10.75h-3.875a1.94 1.94 0 0 0-1.942 1.933v3.875a1.94 1.94 0 0 0 1.942 1.942h3.875a1.94 1.94 0 0 0 1.932-1.942v-3.875a1.93 1.93 0 0 0-1.932-1.932M8.557 13.5H4.682a1.943 1.943 0 0 0-1.932 1.943v3.875a1.93 1.93 0 0 0 1.932 1.932h3.875a1.94 1.94 0 0 0 1.942-1.932v-3.875a1.94 1.94 0 0 0-1.942-1.942'></path>
      </svg>
    ),
    label: "Overview",
  },
  {
    to: "/dashboard/appointments",
    icon: (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='1.3em'
        height='1.3em'
        viewBox='0 0 1024 1024'>
        <path
          fill='currentColor'
          d='M128 384v448h768V384zm-32-64h832a32 32 0 0 1 32 32v512a32 32 0 0 1-32 32H96a32 32 0 0 1-32-32V352a32 32 0 0 1 32-32m64-128h704v64H160zm96-128h512v64H256z'></path>
      </svg>
    ),
    label: "Appointments",
  },
  {
    to: "/dashboard/medication",
    icon: (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='1.3em'
        height='1.3em'
        viewBox='0 0 48 48'>
        <g fill='none'>
          <rect
            width={38}
            height={26}
            x={5}
            y={16}
            stroke='currentColor'
            strokeLinejoin='round'
            strokeWidth={4}
            rx={3}></rect>
          <path
            fill='currentColor'
            d='M19 8h10V4H19zm11 1v7h4V9zm-12 7V9h-4v7zm11-8a1 1 0 0 1 1 1h4a5 5 0 0 0-5-5zM19 4a5 5 0 0 0-5 5h4a1 1 0 0 1 1-1z'></path>
          <path
            stroke='currentColor'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={4}
            d='M18 29h12m-6-6v12'></path>
        </g>
      </svg>
    ),
    label: "Medication",
  },
  {
    to: "/dashboard/wallet",
    icon: (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='1.4em'
        height='1.4em'
        viewBox='0 0 24 24'>
        <path
          fill='currentColor'
          d='M7 15h3a1 1 0 0 0 0-2H7a1 1 0 0 0 0 2M19 5H5a3 3 0 0 0-3 3v9a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3m1 12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6h16Zm0-8H4V8a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1Z'></path>
      </svg>
    ),
    label: "Wallet",
  },
  {
    to: "/dashboard/messages",
    icon: (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='1.5em'
        height='1.5em'
        viewBox='-2 -2.5 24 24'>
        <path
          fill='currentColor'
          d='M3.656 17.979A1 1 0 0 1 2 17.243V15a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H8.003zm.844-3.093a.54.54 0 0 0 .26-.069l2.355-1.638A1 1 0 0 1 7.686 13H12a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v5c0 .54.429.982 1 1c.41.016.707.083.844.226c.128.134.135.36.156.79c.003.063.003.177 0 .37a.5.5 0 0 0 .5.5m11.5-4.87a7 7 0 0 0 0 .37zc.02-.43.028-.656.156-.79c.137-.143.434-.21.844-.226c.571-.018 1-.46 1-1V3a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1H5V2a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2v2.243a1 1 0 0 1-1.656.736L16 13.743z'></path>
      </svg>
    ),
    label: "Messages",
  },
  {
    to: "/dashboard/settings",
    icon: (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='1.3em'
        height='1.3em'
        viewBox='0 0 24 24'>
        <g fill='none' stroke='currentColor' strokeWidth={1.5}>
          <circle cx={12} cy={12} r={3}></circle>
          <path
            strokeLinecap='round'
            d='M3.661 10.64c.473.296.777.802.777 1.36s-.304 1.064-.777 1.36c-.321.203-.529.364-.676.556a2 2 0 0 0-.396 1.479c.052.394.285.798.75 1.605c.467.807.7 1.21 1.015 1.453a2 2 0 0 0 1.479.396c.24-.032.483-.13.819-.308a1.62 1.62 0 0 1 1.567.008c.483.28.77.795.79 1.353c.014.38.05.64.143.863a2 2 0 0 0 1.083 1.083C10.602 22 11.068 22 12 22s1.398 0 1.765-.152a2 2 0 0 0 1.083-1.083c.092-.223.129-.483.143-.863c.02-.558.307-1.074.79-1.353a1.62 1.62 0 0 1 1.567-.008c.336.178.58.276.82.308a2 2 0 0 0 1.478-.396c.315-.242.548-.646 1.014-1.453c.208-.36.369-.639.489-.873m-.81-2.766a1.62 1.62 0 0 1-.777-1.36c0-.559.304-1.065.777-1.362c.321-.202.528-.363.676-.555a2 2 0 0 0 .396-1.479c-.052-.394-.285-.798-.75-1.605c-.467-.807-.7-1.21-1.015-1.453a2 2 0 0 0-1.479-.396c-.24.032-.483.13-.82.308a1.62 1.62 0 0 1-1.566-.008a1.62 1.62 0 0 1-.79-1.353c-.014-.38-.05-.64-.143-.863a2 2 0 0 0-1.083-1.083C13.398 2 12.932 2 12 2s-1.398 0-1.765.152a2 2 0 0 0-1.083 1.083c-.092.223-.129.483-.143.863a1.62 1.62 0 0 1-.79 1.353a1.62 1.62 0 0 1-1.567.008c-.336-.178-.58-.276-.82-.308a2 2 0 0 0-1.478.396C4.04 5.79 3.806 6.193 3.34 7c-.208.36-.369.639-.489.873'></path>
        </g>
      </svg>
    ),
    label: "Settings",
  },
];