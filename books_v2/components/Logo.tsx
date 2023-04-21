export default function Logo() {
  return (
    <div className="select-none flex gap-1 items-center">
      <svg
        className="mb-[1px]"
        height="16"
        viewBox="0 0 32 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_45_36)">
          <path
            d="M28.6896 0H23.7241C23.1146 0 22.6206 0.492934 22.6206 1.101V28.0755C22.6206 28.6835 23.1146 29.1765 23.7241 29.1765H28.6896C29.299 29.1765 29.793 28.6835 29.793 28.0755V1.101C29.793 0.492934 29.299 0 28.6896 0Z"
            fill="url(#paint0_radial_45_36)"
          />
          <path
            d="M20.9654 3.85352H15.9999C15.3905 3.85352 14.8965 4.34645 14.8965 4.95451V28.0755C14.8965 28.6836 15.3905 29.1765 15.9999 29.1765H20.9654C21.5749 29.1765 22.0689 28.6836 22.0689 28.0755V4.95451C22.0689 4.34645 21.5749 3.85352 20.9654 3.85352Z"
            fill="url(#paint1_radial_45_36)"
          />
          <path
            d="M13.7803 9.91279L10.322 8.1972C9.77635 7.92649 9.11404 8.14842 8.84272 8.6929L0.49131 25.4526C0.219994 25.9971 0.442419 26.6579 0.988109 26.9287L4.44632 28.6443C4.99201 28.915 5.65432 28.693 5.92564 28.1486L14.2771 11.3888C14.5484 10.8443 14.3259 10.1835 13.7803 9.91279Z"
            fill="url(#paint2_radial_45_36)"
          />
        </g>
        <defs>
          <radialGradient
            id="paint0_radial_45_36"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(22.6206 -3.8535) rotate(79.7618) scale(87.8268 22.0695)"
          >
            <stop stop-color="#0085FF" />
            <stop offset="1" stop-color="#0085FF" stop-opacity="0" />
          </radialGradient>
          <radialGradient
            id="paint1_radial_45_36"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(22.8965 1.10102) rotate(105.871) scale(80.6968 22.8488)"
          >
            <stop stop-color="#0085FF" />
            <stop offset="1" stop-color="#0085FF" stop-opacity="0" />
          </radialGradient>
          <radialGradient
            id="paint2_radial_45_36"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(14.8966 7.70704) rotate(116.737) scale(58.2503 16.8843)"
          >
            <stop stop-color="#0085FF" />
            <stop offset="1" stop-color="#0085FF" stop-opacity="0" />
          </radialGradient>
          <clipPath id="clip0_45_36">
            <rect width="32" height="29.1765" fill="white" />
          </clipPath>
        </defs>
      </svg>

      <p className="font-serif text-xl font-normal text-lapiz-primary tracking-tight">
        Books
      </p>
    </div>
  );
}
