export const Trash = ({ size = "24" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      stroke="#000000"
      fill="none"
      strokeWidth="1.5"
    >
      <path d="m6 8 .668 8.681c.148 1.924.222 2.885.84 3.423.068.06.14.115.217.165.685.449 1.63.26 3.522-.118.36-.072.54-.108.721-.111h.064c.182.003.361.039.72.11 1.892.379 2.838.568 3.523.12.076-.05.15-.106.218-.166.617-.538.691-1.5.84-3.423L18 8"></path>
      <path
        strokeLinecap="round"
        d="m10.151 12.5.245 3.492M13.849 12.5l-.245 3.492M4 8s4.851 1 8 1 8-1 8-1M8 5l.447-.894A2 2 0 0 1 10.237 3h3.527a2 2 0 0 1 1.789 1.106L16 5"
      ></path>
    </svg>
  );
};

export const Spinner = ({ color = "#fff", size = "20" }) => {
  return (
    <svg
      className="spinner"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      stroke={color}
      fill="none"
      strokeWidth="1.5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 20c-4.416 0-8-3.584-8-8s4.448-7.112 4.448-7.112m0 0v3.616m0-3.616h-4M12 4c4.416 0 8 3.552 8 8 0 5.336-4.448 8-4.448 8m0 0h4m-4 0v-3.552"
      ></path>
    </svg>
  );
};

export const Plus = ({ size = "24", color = "#FFFFFF" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      stroke={color}
      fill="none"
      strokeWidth="2.5"
    >
      <path strokeLinecap="round" d="M18 12H6M12 6v12"></path>
    </svg>
  );
};
