import React, {
  FunctionComponent,
  ReactNode,
  MouseEvent,
  useState,
  useRef,
  useEffect,
} from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface OwnProps {
  children?: ReactNode;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;

  variant?: 'primary' | 'secondary' | 'tertiary';

  isDisabled?: boolean;
  isLoading?: boolean;

  customStyles?: string;
}

type Props = OwnProps;

const spinnerVariants = {
  init: { opacity: 0 },
  enter: { opacity: 1 },
  exit: { opacity: 0 },
};

const textVariants = {
  isNotLoading: { x: 0, transition: { delay: 0.15, type: 'tween' } },
  isLoading: { x: 16, transition: { type: 'tween' } },
};

const Button: FunctionComponent<Props> = ({
  children,
  customStyles,
  onClick,
  isDisabled,
  isLoading,
  variant = 'primary',
}) => {
  const [textWidth, setTextWidth] = useState<number>(0);
  const textRef = useRef<any>(null);

  useEffect(() => {
    if (!textRef.current) return;

    const text = textRef.current;
    setTextWidth(text.clientWidth);
  }, [textRef]);

  return (
    <motion.button
      disabled={isDisabled || isLoading}
      onClick={onClick}
      className={`text-sm bg-primary-600 border border-transparent text-text-primary px-8 py-3 rounded-lg font-medium transition hover:bg-primary-700 active:scale-[0.98] transform disabled:!bg-gray-800 relative flex justify-center gap-x-2 ${
        variant === 'secondary' && 'bg-light hover:bg-light/75 !border-gray-900 shadow-md'
      } ${
        variant === 'tertiary' &&
        'bg-transparent hover:bg-transparent !p-0 hover:opacity-75 active:scale-100 active:opacity-50'
      } ${customStyles}`}
    >
      <AnimatePresence>
        {isLoading && (
          <motion.svg
            variants={spinnerVariants}
            initial={'init'}
            animate={'enter'}
            exit={'exit'}
            className={`absolute animate-spin -ml-2 mr-3 h-5 w-5 text-white top-3`}
            style={{ marginRight: textWidth + 10 + 'px' }}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </motion.svg>
        )}
      </AnimatePresence>

      <motion.span
        className={'text-current'}
        variants={textVariants}
        animate={isLoading ? 'isLoading' : 'isNotLoading'}
        ref={textRef}
      >
        {children}
      </motion.span>
    </motion.button>
  );
};

export default Button;
